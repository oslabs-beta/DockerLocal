export { };
const fetch = require('node-fetch').default;
import { Request, Response, NextFunction } from 'express';

const apiController: any = {};

apiController.getUserRepos = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  const { username } = req.cookies;
  console.log(username, accessToken)
  console.log('inside getuserrepos')
  console.log(`making fetch request to: https://api.github.com/users/${username}/repos`)
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await fetch(url, {
    method: 'get',
    headers: {
      Authorization: `${accessToken}`
    }
  });

  const body = await response.json();
  res.locals.repos = [];
  for(let repo of body){
    res.locals.repos.push({name: repo.name, url: repo.url});
  }
  console.log(res.locals.repos);
};

module.exports = apiController;