export {};
import { Request, Response, NextFunction } from "express";
import CryptoJS = require("crypto-js");

const authController: any = {};

// Middleware to get username and access token from passport-setup.js's done callback (payload)
authController.saveAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Destructure username/accessToken from req.user
  const { username, accessToken }: any = req.user;

  // CryptoJS -> encrypt accessToken with AES and a "super_secret" password
  const encrypted = CryptoJS.AES.encrypt(
    accessToken,
    "super_secret"
  ).toString();
  // Save encrypted token as cookie
  res.cookie("token", encrypted, { maxAge: 360000 });

  // Save username as cookie
  res.cookie("username", username, { maxAge: 360000 });

  // error handling
  if (!(username || encrypted)){
    return next({
      log: `Error caught in authContoller.saveAccessToken: Missing username: ${username} or encrypted: ${Boolean(encrypted)}`,
      msg: { err: 'authContoller.saveAccessToken: ERROR: Check server logs for details'}
    })
  }

  return next();
};

// Middleware to get username and access token from cookies and store each in locals
authController.getNameAndTokenFromCookies = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Destructure username and token from cookies
  const { username, token }: {username: string; token: string} = req.cookies;

  // CryptoJS -> decrypt accessToken and convert back to original
  const decrypted = CryptoJS.AES.decrypt(token, "super_secret").toString(
    CryptoJS.enc.Utf8
  );

  // Store decrypted access token in locals
  res.locals.accessToken = decrypted;

  // Store username in locals
  res.locals.username = username;

  // error handling
  if (!(decrypted || username)){
    return next({
      log: `Error caught in authContoller.getNameAndTokenFromCookies: Missing ${username}, decrypt: ${Boolean(decrypted)}`,
      msg: { err: 'authController.getNameAndTokenFromCookies: ERROR: Check server logs for details'}
    });
  }

  return next();
};

// USE THIS MIDDLEWARE TO GET CHECKED REPO DATA
authController.saveUserInfoAndRepos = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // save username, access token and repos from request body
  const { username, accessToken, repos, projectName }: {username: string; accessToken: string; repos: string []; projectName: string} = req.body;
  res.locals.username = username;
  res.locals.accessToken = accessToken;
  res.locals.repos = repos;
  res.locals.projectName = projectName;

  // error handling
  if (!(username || accessToken || repos || projectName)){
    return next({
      log: `Error caught in authController.saveUserInfoAndRepos: Missing username: ${username}, accessToken:${Boolean(accessToken)} , repos:${repos}, or projectName ${projectName}`,
      msg: { err: `authController.saveUserInfoAndRepos: ERROR: Check server logs for details`}
    });
  }

  return next();
};

module.exports = authController;