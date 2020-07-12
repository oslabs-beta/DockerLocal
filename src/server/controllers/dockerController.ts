export { };
import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import fs = require('fs');
let portNo = 5001;
let dockerPortNo = portNo;

// WORKING ASSUMPTIONS:
// All chosen directories will be stored in the same folder so that findDockerfiles.sh will access it
// My Repos folder will exist before dockerController is run
// Docker-Compose file will be stored in DockerLocal/myProjects
// Dockerfiles will have docker in the name and no other files will have docker in the name
// Dockerfiles will be located in the root folder of a project and so will be descriptive of the project(i.e. Container Name)

const dockerController: any = {};

/**
 * @middlware getFilePaths
 * @description Insert and run (findDockerfile.sh) inside repo root directory to find all dockerfile build paths
 */
dockerController.getFilePaths = (req: Request, res: Response, next: NextFunction): void => {
  // the name of the project folder that you are storing all the repos inside DockerLocal/myProjects/
  const projectFolder: string = req.body.projectName;
  const buildPathArray: string[] = [];
  const myShellScript = exec(`sh src/scripts/findDockerfiles.sh ${projectFolder}`);
  myShellScript.stdout.on('data', (data: string) => {
    const output = data;
    // get filepaths from one long data string
    const filePathArray: string[] = output.split('\n').slice(0, -1);
    let buildPath: string;
    // make filepaths into buildpaths by removing the name of the file from the path
    // "src/server/happy/dockerfile" => "src/server/happy"
    for (const filePath of filePathArray) {
      for (let char = filePath.length - 1; char >= 0; char--) {
        if (filePath[char] === '/') {
          buildPath = filePath.substring(0, char);
          buildPathArray.push(buildPath);
          break;
        }
      }
    }
    res.locals.buildPathArray = buildPathArray;
    return next();
  });
  // shell script errror handling
  myShellScript.stderr.on('data', (data: Error) => {
    return next({
      log: "ERROR IN SHELL SCRIPT",
      msg: { err: `error ${data}` }
    });
  })
}


/**
 * @middlware getContainerNames
 * @description Use build paths to get Container Names
 */
dockerController.getContainerNames = (req: Request, res: Response, next: NextFunction): void => {
  const containerNameArray: string[] = [];
  const { buildPathArray } = res.locals;
  let containerName: string;
  // use folder names as the container name
  // "src/server/happy" => "happy"
  for (const buildPath of buildPathArray) {
    for (let char = buildPath.length - 1; char >= 0; char--) {
      if (buildPath[char] === '/') {
        containerName = buildPath.substring(char + 1);
        containerNameArray.push(containerName);
        break;
      }
    }
  }
  res.locals.containerNameArray = containerNameArray;
  return next();
}


/**
 * @middlware getContainerNames
 * @description Use container names and build paths to create docker compose file
 */
dockerController.createDockerCompose = (req: Request, res: Response, next: NextFunction): void => {
  const projectFolder: string = req.body.projectName;
  const { buildPathArray } = res.locals;
  const { containerNameArray } = res.locals;
  let directory: string;
  let containerName: string;
  const composeFilePath = `./myProjects/${projectFolder}/docker-compose.yaml`
  // making docker compose file
  // indentation is important in yaml files
  // checking if compose file already exists. If it does not, it will make one
    // spacing matters so it looks weird on purpose
    // replaces the docker compose file each time so that we can create a docker compose file with 'leave one out'
    fs.writeFileSync(composeFilePath, `version: "3"\nservices:\n`,
      (error: Error) => {
        if (error) return next({
          log: 'ERROR IN CREATING COMPOSE FILE ',
          msg: { err: `ERROR: ${error}` }
        })
      });
  // Taking the 'checked' repositories and storing each name into an array
  const { repos } = res.locals;
  const repoArray = [];
  for (const repo of repos) {
    repoArray.push(repo.repoName);
  }
  for (let i = 0; i < buildPathArray.length; i++) {
    // Checking if the array of names includes the repositories stored locally
    // get all the repos stored in the project
    directory = buildPathArray[i];
    containerName = containerNameArray[i];
    // for each buildPath of the Dockerfile, get the Repo folder
    const repoFolder = directory.slice(14 + projectFolder.length, directory.length - containerName.length - 1);
    // goes through each repo folder that has a dockerfile in the Project Folder
    // if the repo folder is in the 'checked' repositories array then add it to the docker compose file
    // will also ignore docker-sompose file we create that is stored in root project folder
    if (repoArray.includes(repoFolder)) {
      portNo++;
      dockerPortNo++;
      // appending the file with the configurations for each service
      fs.appendFileSync(composeFilePath,
        `  ${containerName}:\n    build: "${directory}"\n    ports:\n      - ${portNo}:${dockerPortNo}\n`,
        (error: Error) => {
          if (error) return next({
            log: "ERROR IN CREATEDOCKERCOMPOSE",
            msg: { err: `error: ${error}` }
          });
        });
    }
  }
  return next();
}

module.exports = dockerController;