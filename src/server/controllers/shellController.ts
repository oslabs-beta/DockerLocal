export {};
const { exec } = require("child_process");
import { Request, Response, NextFunction } from "express";

const shellController: any = {};

shellController.cloneRepo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = res.locals;

  // TODO: add username and repo name as variables to

  const shellCommand =
    "~/Code/DockerLocal/src/scripts/cloneRepo.sh " + username;
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
