import { Request, Response, NextFunction } from 'express';
const { exec } = require('child_process');
const myShellScript = exec('sh src/server/findDockerfiles.sh');
import fs = require('fs');
let portNo = 5001;
const dockerPortNo = portNo;
let buildPathArray: string[] = [];
let containerNameArray: string[] = [];


const dockerController = { };

dockerController.getFilePaths = (req: Request, res: Response, next: NextFunction) => {
    myShellScript.stdout.on('data', (data: string) => {
        const output = data;
        const filePathArray: string[] = output.split('\n').slice(0,-1);
        let buildPath: string;
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

    myShellScript.stderr.on('data', (data: Error)=>{
        // console.error(data);
        return next({err:data});
    })

}

dockerController.getContainerNames = (req: Request, res: Response, next: NextFunction) => {
    buildPathArray = res.locals.buildPathArray;
    let containerName: string;
    for (const buildPath of buildPathArray){
        for (let char = buildPath.length-1; char >= 0; char--){
            if (buildPath[char] === '/'){
                // VERIFY SLICE IS PRINTING BEFORE THE FOLDER
                containerName = buildPath.slice(0, char);
                containerNameArray.push(containerName);
                }
          }
    }
    res.locals.containerNameArray = containerNameArray;
}

dockerController.createDockerCompose = (req: Request, res: Response, next: NextFunction) => {
    buildPathArray = res.locals.buildPathArray
    containerNameArray = res.locals.containerNameArray;
    let filePath: string;
    let containerName: string;
    for (let i = 0; i < buildPathArray.length; i++){
        filePath = buildPathArray[i];
        containerName = containerNameArray[i];
        portNo++;
        fs.appendFile('docker-compose.yml',
        `  ${containerName}:
        build: ${filePath}
        ports:
          - ${portNo}:${dockerPortNo}\n`, (err: Error) => {
            if (err) throw err;
        });
    }

}

module.exports = dockerController;