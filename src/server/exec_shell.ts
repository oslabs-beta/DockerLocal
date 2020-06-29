const { exec } = require('child_process');
const myShellScript = exec('sh src/server/findDockerfiles.sh');
import fs = require('fs');
const name1 = 'happy';
let filePath1= 'sad';
let portNo = 5001;
const dockerPortNo = 80;
// contains the filepaths to use for docker compose file build
const buildPathArray: string[] = [];

myShellScript.stdout.on('data', (data: string)=>{
    const output = data;
    // get the file paths of all paths with dockerfiles
    const filePathArray: string[] = output.split('\n').slice(0,-1);
    // remove filename out of filepath and provide just dirname
    for (const filePath of filePathArray){
      for (let char = filePath.length-1; char >= 0; char--){
          if (filePath[char] === '/'){
              const buildPath: string = filePath.substring(0, char);
              buildPathArray.push(buildPath);
              break;
              }
        }
    }
    // build Path Array now exists
    for (const buildPath of buildPathArray){
        filePath1 = buildPath;
        portNo++;
        fs.appendFile('docker-compose.yml',
        `  ${name1}:
        build: ${filePath1}
        ports:
          - ${portNo}:${dockerPortNo}\n`, (err: Error) => {
            if (err) throw err;
        });
    }

});

// test buildPath Array is correct now that file has been changed to ts
// console.log(buildPathArray);

myShellScript.stderr.on('data', (data: Error)=>{
    console.error(data);
})

// REMOVE the following line after typescript test is complete
// module.exports = buildPathArray;


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
