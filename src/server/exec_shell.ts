const exec = require('child_process').exec;
const myShellScript = exec('sh src/server/findDockerfiles.sh');
// contains the filepaths to use for docker compose file build
const buildPathArray: string[] = [];

myShellScript.stdout.on('data', (data: string)=>{
    const output = data;
    // get the file paths of all the places with dockerfiles
    const filePathArray: string[] = output.split('\n').slice(0,-1);
    // remove filename out of filepath and provide just dirname
    for (const filePath of filePathArray){
      // const filePath: string = filePathArray[i];
      for (let char = filePath.length-1; char >= 0; char--){
          if (filePath[char] === '/'){
              const buildPath: string = filePath.substring(0, char);
              buildPathArray.push(buildPath);
              break;
              }
        }
    }
});

// test buildPath Array is correct now that file has been changed to ts
console.log(buildPathArray);

myShellScript.stderr.on('data', (data: Error)=>{
    console.error(data);
})

// REMOVE the following line after typescript test is complete
// module.exports = buildPathArray;