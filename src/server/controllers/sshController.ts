export {};
const { exec } = require("child_process");
import { Request, Response, NextFunction } from "express";
const fetch = require("node-fetch").default;
const fs = require("fs");

const sshController: any = {};

/**
 * @middleware  Create SSH key to be used for connection to clone/update github repos
 * @desc    Executes sshKeygen.sh
 */
sshController.createSSHkey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // shell script adds the github.com domain name to the known_hosts file using the ssh-keyscan command
  // script then clones github repo using SSH connection
  const shellCommand = "~/Code/DockerLocal/src/scripts/sshKeygen.sh";
  exec(shellCommand, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  return next();
};

/**
 * @middleware  Push SSH key to user's github account
 * @desc    Uses a post request to github API
 */
sshController.addSSHkeyToGithub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, username } = res.locals;

  const sshKey = fs.readFileSync("./tmp/dockerKey.pub");

  const url = `https://api.github.com/user/keys`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      title: `${username}@DockerLocal`,
      key: `${sshKey}`,
    },
  });

  console.log(response);
  return next();
};

/**
 * @middleware  Deletes public SSH key from user's github account and private/public keys from ./tmp folder
 * @desc    Uses a post request to github API
 */
sshController.deleteSSHkey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, username } = res.locals;

  const sshKeyPub = "./tmp/dockerKey.pub";
  const sshKeyPrivate = "./tmp/dockerKey";
  const sshKeyId = `${username}@DockerLocal`;

  try {
    // remove public SSH key from ./tmp
    fs.unlinkSync(sshKeyPub);
  } catch (err) {
    // TODO: add error handling depending on whether file was removed successfully
    console.error(err);
  }

  try {
    // remove private SSH key from ./tmp
    fs.unlinkSync(sshKeyPrivate);
  } catch (err) {
    // TODO: add error handling depending on whether file was removed successfully
    console.error(err);
  }

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

module.exports = sshController;
