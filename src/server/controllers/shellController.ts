export {};
const { exec } = require("child_process");
import { Request, Response, NextFunction } from "express";

const shellController: any = {};

shellController.cloneRepo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = res.locals;

  exec("~/Code/cloneRepo.sh", (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  console.log("tried to run shell script");

  return next();
};

module.exports = shellController;
