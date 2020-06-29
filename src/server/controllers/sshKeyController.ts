export {};

const exec = require("child_process").execFile;

import { Request, Response, NextFunction } from "express";
const fetch = require("node-fetch").default;
const fs = require("fs");

const sshKeyController: any = {};

function execShellCommand(shellCommand: string) {
  return new Promise((resolve, reject) => {
    exec(shellCommand, (error: string, stdout: string, stderr: string) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

/**
 * @middleware  Create SSH key to be used for connection to clone/update github repos
 * @desc    Executes sshKeygen.sh
 */
sshKeyController.createSSHkey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // shell script adds the github.com domain name to the known_hosts file using the ssh-keyscan command
  // script then clones github repo using SSH connection
  const shellCommand = "/home/katty/Code/DockerLocal/src/scripts/sshKeygen.sh";

  await execShellCommand(shellCommand);

  return next();
};

/**
 * @middleware  Push SSH key to user's github account
 * @desc    Uses a post request to github API
 */
sshKeyController.addSSHkeyToGithub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, username } = res.locals;

  console.log("before read sshKey");
  const sshKey = fs.readFileSync("./tmpKeys/dockerKey.pub", "utf8");

  const reqBody = JSON.stringify({
    title: `${username}@DockerLocal`,
    key: sshKey,
  });

  const url = `https://api.github.com/user/keys`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    body: reqBody,
  });
  // const jsonResponse = await response.json();
  // const { key_id } = jsonResponse.body;
  console.log(response);

  return next();
};

/**
 * @middleware  Deletes public SSH key from user's github account and private/public keys from ./tmpKeys folder
 * @desc    Uses a post request to github API
 */
sshKeyController.deleteSSHkey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, username } = res.locals;

  const sshKeyId = `${username}@DockerLocal`;

  const shellCommand =
    "/home/katty/Code/DockerLocal/src/scripts/sshKeyDelete.sh";

  await execShellCommand(shellCommand);

  // await exec(shellCommand, (error: any, stdout: any, stderr: any) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.error(`stderr: ${stderr}`);
  // });

  const url = `https://api.github.com/user/keys/${sshKeyId}`;
  const response = await fetch(url, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response);
  return next();
};

module.exports = sshKeyController;
