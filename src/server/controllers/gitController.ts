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
  console.log('request')

  const { repos } = res.locals;

  /** Use below line for testing.
   *  Replace repoName with a string that is the name of a private repository on your Github account  */
  // const repoName = "DockerLocal";
  // await repos.forEach(async ({ repoName, repoOwner}) =>  {
    console.log('******* cloning repos   *******')
    for (let i = 0; i < repos.length; i += 1) {

      const currentRepo = repos[i];
      
      const repoName = currentRepo.repoName;
      const repoOwner = currentRepo.repoOwner;
      console.log('******* ', repoName, repoOwner, '*******')
      
      // TODO: integrate loop into this middleware to handle an array of objects with repo info
      // all repos indicated in the array should be cloned
      
      // shell script clones github repo using SSH connection
      const shellCommand = "./src/scripts/cloneRepo.sh";
      
      const shellResp = await execShellCommand(shellCommand, [repoOwner, repoName]);
      console.log(shellResp);
      console.log("Finished Cloning Repo");
    }
  // })
    return next();
  };
  
module.exports = gitController;
