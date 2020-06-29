export {};
const { exec } = require("child_process");
import { Request, Response, NextFunction } from "express";

const shellController: any = {};

shellController.cloneRepo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, repos } = res.locals;

  // TODO: add repoName from res.locals
  const repoName = repos[1].name;

  // shell script clones github repo using SSH connection
  const shellCommand =
    "~/Code/DockerLocal/src/scripts/cloneRepo.sh " + username + ` ${repoName}`;
  console.log(shellCommand);
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

module.exports = shellController;
