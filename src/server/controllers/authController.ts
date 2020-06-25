export { };
import { Request, Response, NextFunction } from 'express';

const authController: any = {};

authController.saveAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const { username }: any = req.user;
  const { accessToken }: any = req.user;
  console.log(username, accessToken)
  res.cookie('accessToken', accessToken, { maxAge: 360000 });
  res.cookie('username', username, { maxAge: 360000 });
  res.locals.accessToken = accessToken;
  res.locals.username = username;
  console.log('COOKIE: ', req.cookies);
  next();
};

module.exports = authController;