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
): Promise<void> => {

  const { repos, projectName } = res.locals;
  const shellCommand = "./src/scripts/cloneRepo.sh";

  // make an array of promises to clone all selected repos
  const promises = repos.map(async (currentRepo: any) => {
    const repoOwner = currentRepo.repoOwner;
    const repoName = currentRepo.repoName;

    // shell script clones github repo using SSH connection
    const shellResp = await execShellCommand(shellCommand, [
      repoOwner,
      repoName,
      projectName,
    ]);
    return shellResp;
  });

  // execute cloning ALL repos
  await Promise.all(promises).catch(
    err => next({
    log: `Error cloning repos in gitController.cloneRepos`,
    msg: {
      err
    }
  })
 )

  return next();
};

module.exports = gitController;
