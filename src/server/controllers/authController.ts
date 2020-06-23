export {};

const router = require('express').Router();
// const passport = require('passport');

const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
const deserializeUser = require('../config/passport-setup.js');

// const cookieParser = require('cookie-parser');

const authController = {};

authController.saveAccessToken = (req, res, next) => {
  const { user: accessToken } = req;
  res.locals.accessToken = accessToken;

  res.cookie('accessToken', accessToken, { maxAge: 360000 });
  console.log('ACCESS TOKEN', res.locals.accessToken);

  console.log('COOKIE: ', req.cookies);
  next();
};

module.exports = authController;