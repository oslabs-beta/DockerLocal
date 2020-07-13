export { };
const fetch = require('node-fetch').default;
import { Request, Response, NextFunction } from 'express';

const apiController: any = {};

// ********** middleware currently not being used ************

// Middleware to get an authenticated user's list of repositories through node-fetch
apiController.getUserRepos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Destructuring the access token from locals
  // -> stored locally in previous middleware (authController.getNameAndTokenFromCookies)
  const { accessToken } = res.locals;

  // Get authenticated user's first 100 repos
  const url = `https://api.github.com/user/repos?per_page=100`;
  const response = await fetch(url, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Convert response body to json
  const body = await response.json();

  // All repos stored in an object array with repo name and url
  res.locals.repos = [];
  for(const repo of body){
    res.locals.repos.push({name: repo.name, url: repo.url});
  }

  // error handling for getUserRepos
  if (Error){
    return next({
      log: 'Error caught in apiContoller.getUserRepos',
      msg: { err: `Error: ${Error}`}
    });
  }

  return next();
};


module.exports = apiController;