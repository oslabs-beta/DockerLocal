export {};

const exec = require("child_process").execFile;

import { Request, Response, NextFunction } from "express";
const fetch = require("node-fetch").default;
const fs = require("fs");

const sshKeyController: any = {};

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
  const shellCommand = "./src/scripts/sshKeygen.sh";

  const shellResult = await execShellCommand(shellCommand, []);
  console.log(shellResult);
  console.log("Finished Generating a Key");
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

  const jsonResponse = await response.json();
  const { id } = jsonResponse;
  res.locals.keyId = id;
  console.log("Finished adding key to github");
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
  const { accessToken, username, keyId } = res.locals;

  const shellCommand = "./src/scripts/sshKeyDelete.sh";

  await execShellCommand(shellCommand, []);

  const url = `https://api.github.com/user/keys/${keyId}`;
  const response = await fetch(url, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("Finished Deleting Key");
  return next();
};

module.exports = sshKeyController;
