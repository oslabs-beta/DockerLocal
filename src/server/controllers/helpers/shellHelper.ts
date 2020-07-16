export {};

const exec = require("child_process").execFile;

/**
 * @function Executes a shell command and return it as a Promise.
 * @param shellCommand {"./src/scripts/cloneRepo.sh"}
 * @param args {[repoOwner, repoName, projectName ]}
 * @return {Promise<string>}
 */

function execShellCommand(shellCommand: string, args: string []): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      shellCommand,
      args,
      (error: string, stdout: string, stderr: string) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout? stdout : stderr);
      }
    );
  });
}

module.exports = execShellCommand;
