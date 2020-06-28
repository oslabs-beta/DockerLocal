export {};
const fetch = require("node-fetch").default;
import { Request, Response, NextFunction } from "express";

const shellController: any = {};

shellController.getUserRepos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = res.locals;

  const url = `https://api.github.com/user/repos?visibility="private"`;
  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const body = await response.json();
  res.locals.repos = [];
  for (let repo of body) {
    console.log(body);
    res.locals.repos.push({
      name: repo.name,
      url: repo.url,
      clone_token: repo.owner.temp_clone_token,
    });
  }
  console.log(res.locals.repos);
  return next();
};

module.exports = shellController;
