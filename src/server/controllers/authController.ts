export {};
import { Request, Response, NextFunction } from "express";
const CryptoJS = require("crypto-js");

const authController: any = {};

//Middleware to get username and access token from passport-setup.js's done callback (payload)
authController.saveAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Destructure username/accessToken from req.user
  const { username, accessToken }: any = req.user;

  //CryptoJS -> encrypt accessToken with AES and a "super_secret" password
  const encrypted = CryptoJS.AES.encrypt(
    accessToken,
    "super_secret"
  ).toString();
  //Save encrypted token as cookie
  res.cookie("token", encrypted, { maxAge: 360000 });

  //Save username as cookie
  res.cookie("username", username, { maxAge: 360000 });

  return next();
};

//Middleware to get username and access token from cookies and store each in locals
authController.getNameAndTokenFromCookies = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Destructure username and token from cookies
  const { username, token }: any = req.cookies;

  //CryptoJS -> decrypt accessToken and convert back to original
  const decrypted = CryptoJS.AES.decrypt(token, "super_secret").toString(
    CryptoJS.enc.Utf8
  );

  //Store decrypted access token in locals
  res.locals.accessToken = decrypted;

  //Store username in locals
  res.locals.username = username;

  return next();
};

authController.saveUserInfoAndRepos = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // save username, access token and repos from request body
  const { username, accessToken, repos, projectName }: any = req.body;
  res.locals.username = username;
  res.locals.accessToken = accessToken;
  res.locals.repos = repos;
  res.locals.projectName = projectName;
  return next();
};

module.exports = authController;
