export {};
const router = require('express').Router();
const passport = require('passport');

// const authController = require('../controllers/authController.js');
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
//github login

//  using passport to authenticate the github
// (after requiring the passport-setup.js in the server.js and adding the appropriate /auth route)

router.get('/', (req: Request, res: Response) => {
  res.send('auth home')
})

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

/**
 * @route   GET 
 * @desc    <desc>
 * @access  Public
 */
// router.get('github/auth/fail', (req: Request, res: Response) => {
//   res.status(200).send('FAILURE TO AUTHENTICATE');
// });

/**
 * @route   GET 
 * @desc    <desc>
 * @access  Public
 */
router.get(
  '/github/callback',
  passport.authenticate('github', {
    //if failure to authenticate:
    //placeholder
    failureRedirect: '/fail',
  }),
  (req: Request, res: Response) => {
    //if successful authentication:

    console.log('SUCCESSFUL AUTHENTICATION');
    res.send('SUCCESSFUL AUTHENTICATION');
  }
);

module.exports = router;
