const exec = require('child_process').exec;
const myShellScript = exec('sh src/server/findDockerfiles.sh');
const buildPathArray = [];
//
myShellScript.stdout.on('data', (data)=>{
    const output = data;
    // get the file paths of all the places with dockerfiles
    const filePathArray = output.split('\n').slice(0,-1);
    // contains the filepaths to use for docker compose file build 
    const buildPathArray = [];
    // remove filename out of filepath and provide just dirname
    for (let i = 0; i < filePathArray.length; i++){
      const filePath = filePathArray[i];
      for (let char = filePath.length-1; char >= 0; char--){
          if (filePath[char] === '/'){
              const buildPath = filePathArray[i].substring(0, char);
              buildPathArray.push(buildPath);
              break;
              }
        }
    }
});
myShellScript.stderr.on('data', (data)=>{
    console.error(data);
})

module.exports = buildPathArray;