export { };
import { Request, Response, NextFunction } from 'express';
const { exec } = require('child_process');
const myShellScript = exec('sh src/scripts/findDockerfiles.sh');
import fs = require('fs');
let portNo = 5001;
const dockerPortNo = portNo;
let buildPathArray: string[] = [];
let containerNameArray: string[] = [];


const dockerController: any = { };

// insert and run (findDockerfile.sh) inside repo root directory to find all dockerfile build paths
dockerController.getFilePaths = (req: Request, res: Response, next: NextFunction) => {
    myShellScript.stdout.on('data', (data: string) => {
        const output = data;
        // get filepaths from one long data string
        const filePathArray: string[] = output.split('\n').slice(0,-1);
        let buildPath: string;
        // make filepaths into buildpaths by removing the name of the file from the path
        // "src/server/happy/dopckerfile" => "src/server/happy"
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

// Use build paths to get Cotainer Names
dockerController.getContainerNames = (req: Request, res: Response, next: NextFunction) => {
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
dockerController.createDockerCompose = (req: Request, res: Response, next: NextFunction) => {
    buildPathArray = res.locals.buildPathArray
    containerNameArray = res.locals.containerNameArray;
    let filePath: string;
    let containerName: string;
    // making docker compose file
    // indentation is important in yaml files
    for (let i = 0; i < buildPathArray.length; i++){
        filePath = buildPathArray[i];
        containerName = containerNameArray[i];
        portNo++;
        fs.appendFile('./myRepos/docker-compose.yml',
        `  ${containerName}:
        build: ${filePath}
        ports:
          - ${portNo}:${dockerPortNo}\n`, (err: Error) => {
            if (err) return next({
                log: "ERROR IN CREATEDOCKERCOMPOSE",
                msg: {err:`error: ${err}`}
            });
        });
    }
    return next();
}

module.exports = dockerController;