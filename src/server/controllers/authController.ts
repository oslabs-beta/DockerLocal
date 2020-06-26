export { };
import { Request, Response, NextFunction } from 'express';
const CryptoJS = require("crypto-js");

const authController: any = {};

authController.saveAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const { username }: any = req.user;
  const { accessToken }: any = req.user;

  const encrypted = CryptoJS.AES.encrypt(accessToken, "super_secret").toString();

  res.cookie('token', encrypted, { maxAge: 360000 });
  res.cookie('username', username, { maxAge: 360000 });

  return next();
};

authController.getNameAndTokenFromCookies = (req: Request, res: Response, next: NextFunction) => {
  const { username, token }: any = req.cookies;
  
  const decrypted = CryptoJS.AES.decrypt(token, 'super_secret').toString(CryptoJS.enc.Utf8);

  res.locals.accessToken = decrypted;
  res.locals.username = username;

  return next();
}

module.exports = authController;