export {};

const exec = require("child_process").execFile;

function execShellCommand(shellCommand: string, args: Array<string>) {
  return new Promise((resolve, reject) => {
    exec(
      shellCommand,
      args,
      (error: string, stdout: string, stderr: string) => {
        if (error) {
          console.warn(error);
        }
        console.warn(stderr);
        resolve(stdout ? stdout : stderr);
      }
    );
  });
}

module.exports = execShellCommand;
