export {};

import { Request, Response, NextFunction } from "express";

// import helper function to execute shell scripts
const execShellCommand = require("./helpers/shellHelper");

const gitController: any = {};

/**
 * @middleware  Clone Github repositor(y/ies) using an SSH connection
 * @desc    Clones git repository from github. Expects repository info to be in res.locals.
 */
gitController.cloneRepo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, repos } = res.locals;

  /** Use below line for testing.
   *  Replace repoName with a string that is the name of a private repository on your Github account  */
  const repoName = "DockerLocal";
  // const repoName = repos[1].name;

  // TODO: integrate loop into this middleware to handle an array of objects with repo info
  // all repos indicated in the array should be cloned

  // shell script clones github repo using SSH connection
  const shellCommand = "./src/scripts/cloneRepo.sh";

  const shellResp = await execShellCommand(shellCommand, [username, repoName]);
  console.log(shellResp);
  console.log("Finished Cloning Repo");
  return next();
};

module.exports = gitController;
