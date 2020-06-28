import fs = require('fs');
import  buildPathArray from './exec_shell';
const name1 = 'happy';
let filePath1= 'sad';
const portNo = 5001;
const dockerPortNo = 80;

for (const i of buildPathArray){
    filePath1 = buildPathArray[i];
    fs.appendFile('docker-compose.yml',
    `  ${name1}:
    build: ${filePath1}
    ports:
      - ${portNo}:${dockerPortNo}`, (err: Error) => {
        if (err) throw err;
    });
}


// user clicks on repo
// repo begins dowloading from github :check
// Download repo name - get an aaray of repo inside DockerLocal/MyRepos/
// inside  DockerLocal/MyRepos/ look for all dockerfiles
   // insert and run (findDockerfile.sh) inside repo root directory
// Get buildPaths of Dockerfile
// read through each dockerfile to figure out the service name?
// ho should i figure out service name? I'll take from the FROM in the dockerfile.
// Make a copy of the template and Use buildpath and servicename to create yml file
// give user docker compose yml file