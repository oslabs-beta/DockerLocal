export { };
const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');
import { Request, Response } from 'express';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;


//using passport to authenticate the github
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user','repo','admin:public_key'],
    'X-OAuth-Scopes': ['repo', 'user'],
    'X-Accepted-OAuth-Scopes': ['repo','user']
  }));

//Github callback function (authentication)
<<<<<<< HEAD
<<<<<<< HEAD
  //if successful
    //save username/accessToken to cookies
    //redirect to /api/repos
  //if unsuccessful
    //redirect to /fail 
=======
=======
>>>>>>> b9980be0d11a403ec8c1a72c4f60d683ab9bf670
//if successful
//save username/accessToken to cookies
//redirect to /api/repos
//if unsuccessful
//redirect to /fail
<<<<<<< HEAD
>>>>>>> 9686311dc6ea81664e4fd43601ee1e1f26bec112
=======
>>>>>>> b9980be0d11a403ec8c1a72c4f60d683ab9bf670
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/fail'
  }),
  authController.saveAccessToken,
  (req: Request, res: Response) => res.redirect(MAIN_WINDOW_WEBPACK_ENTRY)
);

module.exports = router;
