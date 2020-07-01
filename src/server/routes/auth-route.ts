export {};
const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');
import { Request, Response } from 'express';

// using passport to authenticate the github
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email']
  }));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/fail'
  }),
  authController.saveAccessToken,
  (req: Request, res: Response) => res.redirect('/api/repos')
);

module.exports = router;