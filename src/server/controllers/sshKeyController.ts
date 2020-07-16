export {};

import { Request, Response, NextFunction } from "express";
const fetch = require("node-fetch").default;
const fs = require("fs");

// import helper function to execute shell scripts
const execShellCommand = require("./helpers/shellHelper");

const sshKeyController: any = {};

/**
 * @middleware  Create SSH key to be used for connection to clone/update github repos
 * @desc    Executes sshKeygen.sh
 */
sshKeyController.createSSHkey = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  // shell script adds the github.com domain name to the known_hosts file using the ssh-keyscan command
  // script then clones github repo using SSH connection
  const shellCommand = "./src/scripts/sshKeygen.sh";

  const shellResult = await execShellCommand(shellCommand, [])
  if (shellResult instanceof Error){
    return next({
      log: `Error caught in sshKeyController.createSSHkey: execShellCommand produces error: ${shellResult}`,
      msg: {err:`sshKeyController.createSSHkey: ERROR: Check server logs for details`},
    })
  }
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
): Promise<void> => {
  const { accessToken, username } = res.locals;

  const sshKey = fs.readFileSync("./tmpKeys/dockerKey.pub", "utf8");

  // create the request body which we will use to create the ssh key on Github
  const reqBody = JSON.stringify({
    title: `${username}@DockerLocal`,
    key: sshKey,
  });

  // send a post request to Github api to add the ssh key to user's keys
  const url = `https://api.github.com/user/keys`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    body: reqBody,
  }).catch((err: Error) => next({
    log:  `Error caught in sshKeyController.addSSHkeyToGithub: Issue sending post request to Github API: ${err}`,
    msg: {err:'sshKeyController.addSSHkeyToGithub: ERROR: Check server logs for details'}
  }));

  // converts the response body into JSON
  const jsonResponse = await response.json();

  // save the key id from the response. this will be used to delete the key from Github after we are done using it
  const { id } = jsonResponse;
  res.locals.keyId = id;

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
): Promise<void> => {
  const { accessToken, keyId } = res.locals;

  const shellCommand = "./src/scripts/sshKeyDelete.sh";

  await execShellCommand(shellCommand, []);

  const url = `https://api.github.com/user/keys/${keyId}`;
  await fetch(url, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch((err: Error) => next({
    log:  `Error caught in sshKeyController.deleteSSHkey: deleting key from github produces error: ${err}`,
    msg: {err: 'sshKeyController.deleteSSHkey: ERROR: Check server logs for details'}
  }));

  return next();
};

module.exports = sshKeyController;
