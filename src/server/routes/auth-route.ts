const router = require('express').Router();
const passport = require('passport');

const authController = require('../controllers/authController.js');

//github login

//  using passport to authenticate the github
// (after requiring the passport-setup.js in the server.js and adding the appropriate /auth route)

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
router.get('/fail', (req, res) => {
  res.status(200).send('FAILURE TO AUTHENTICATE');
});

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
  authController.saveAccessToken,
  (req, res) => {
    //if successful authentication:

    console.log('SUCCESSFUL AUTHENTICATION');
    res.redirect('/dashboard');
  }
);

module.exports = router;
