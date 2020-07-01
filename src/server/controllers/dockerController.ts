import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import fs = require('fs');
let portNo = 5001;
const dockerPortNo = portNo;
let buildPathArray: string[] = [];
let containerNameArray: string[] = [];

// WORKING ASSUMPTIONS:
// All chosen directories will be stored in the same folder so that findDockerfiles will access it
// My Repos folder will exist before dockerController is run
// Docker-Compose file will be stored in DockerLocal/MyRepos
// Dockerfiles will have docker in the name and no other files will have docker in the name
// Dockerfiles will be located in the root folder of a project and so will be descriptive of the project(i.e. Container Name)

export const dockerController: any = { };

// insert and run (findDockerfile.sh) inside repo root directory to find all dockerfile build paths
// give this function a folder that contains all pof t
dockerController.getFilePaths = (req: Request, res: Response, next: NextFunction): void => {
    // the name of the project folder that you are storing all the repos inside DockerLocal/MyRepos/
    const projectFolder: string = req.body.projectName;
    const myShellScript = exec(`sh src/scripts/findDockerfiles.sh ${projectFolder}`);
    myShellScript.stdout.on('data', (data: string) => {
        const output = data;
        // get filepaths from one long data string
        const filePathArray: string[] = output.split('\n').slice(0,-1);
        let buildPath: string;
        // make filepaths into buildpaths by removing the name of the file from the path
        // "src/server/happy/dockerfile" => "src/server/happy"
        for (const filePath of filePathArray){
          for (let char = filePath.length - 1; char >= 0; char--){
              if (filePath[char] === '/'){
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
    myShellScript.stderr.on('data', (data: Error)=>{
        return next({
            log: "ERROR IN SHELL SCRIPT",
            msg: {err: `error ${data}`}});
    })

}

// Use build paths to get Container Names
dockerController.getContainerNames = (req: Request, res: Response, next: NextFunction): void => {
    buildPathArray = res.locals.buildPathArray;
    let containerName: string;
    // use folder names as the container name
    // "src/server/happy" => "happy"
    for (const buildPath of buildPathArray){
        for (let char = buildPath.length - 1; char >= 0; char--){
            if (buildPath[char] === '/'){
                containerName = buildPath.substring(char + 1);
                containerNameArray.push(containerName);
                }
          }
    }
    res.locals.containerNameArray = containerNameArray;
    // error handling
    if (Error) return next({
        log: "ERROR IN GET CONTAINER NAMES",
        msg: {err: `error ${Error}`}
    });
    return next();
}

// Use container names and build paths to create docker compose file
dockerController.createDockerCompose = (req: Request, res: Response, next: NextFunction): void => {
    buildPathArray = res.locals.buildPathArray
    containerNameArray = res.locals.containerNameArray;
    let directory: string;
    let containerName: string;
    const composeFilePath = "./myRepos/docker-compose.yaml"
    // making docker compose file
    // indentation is important in yaml files

    // checking if compose file already exists. If it does not, it will make one
    if(!fs.existsSync(composeFilePath)){
        // spacing matters so it looks weird on purpose
        fs.writeFile(composeFilePath, `version: '3'
        services:
        `, (error) => {
            if(error) return next({
                log: 'ERROR IN CREATING COMPOSE FILE ',
                msg: {err: `ERROR: ${error}`}
            })
        });
      }

    // appending the file with the configurations for each service
    for (let i = 0; i < buildPathArray.length; i++){
        directory = buildPathArray[i];
        containerName = containerNameArray[i];
        portNo++;
        fs.appendFile(composeFilePath,
        `  ${containerName}:
        build: ${directory}
        ports:
          - ${portNo}:${dockerPortNo}\n`, (error: Error) => {
            if (error) return next({
                log: "ERROR IN CREATEDOCKERCOMPOSE",
                msg: {err:`error: ${error}`}
            });
        });
    }
    return next();
}