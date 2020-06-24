export {};
const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');
import { Request, Response } from 'express';

//using passport to authenticate the github
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/fail',
  }),
  authController.saveAccessToken,
  (req: Request, res: Response) => {
    console.log(req.cookies)
    const { username }: any = req.cookies;
    console.log('authenticated for user:',username)
    res.status(200).send(`✔️ logged in as ${username} ✔️`);
  }
);

module.exports = router;
