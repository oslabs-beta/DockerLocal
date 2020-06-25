export { };
const fetch = require('node-fetch')
const apiController = {};
import { Request, Response, NextFunction } from 'express';

const authController: any = {};

authController.saveAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  const { username } = req.cookies;
  console.log(username, accessToken)
  console.log('inside getuserrepos')
  await fetch(`https://api.github.com/users/${username}/repos`, {
    method: 'get',
    headers: {
      Authorization: `token ${accessToken}`
    }
  })
};

module.exports = apiController;