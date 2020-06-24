export {};

const passport = require('passport');
require('dotenv').config();

const GithubStrategy = require('passport-github2');

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

// const db = require('../db/postgres.js');

const fetch = require('node-fetch');
console.log("INSIDE PASSPORTSETUP" , GITHUB_CLIENT_ID)
// Configure the Github strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Github API on the user's
// behalf, along with the user's profile.  The function must invoke callback
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

passport.use(
  new GithubStrategy(
    {
      //https://github.com/login/oauth/authorize
      //will be given through API. used to identify our app to github
      clientID: GITHUB_CLIENT_ID,
      //will be given through API. used to identify our app to github
      clientSecret: GITHUB_CLIENT_SECRET,
      //callback url that sends client to github login page
      callbackURL: '/auth/github/callback',
    },
    (accessToken: string, refreshToken: string, profile: object | null, done: ()=> void) => {
      //basic 4 params -> getting github profile information from auth-route
      /** passport callback fn
       * accessToken - is how we will make an API call on behalf of the user. It is sent to us by github in the response.
       * refreshToken - is a token that can refresh the access token if it 'times out'.
       * profile - is the user's record in Github. We associate this profile with a user record in our application database.
       * done - after getting successully authenticated - run this callback function
       * routes to 'authenticated page' w/ correct user information
       **/
      console.log("INSIDE PASSPORTSETUP FUNCTION")
      const { username } = profile;
      console.log('PASSPORT CALLBACK FIRED FOR USER: ', username);

      // const selectQuery = `SELECT * FROM users WHERE githandle='${username}'`;
      // const insertQuery = `INSERT INTO users (id, githandle) VALUES (uuid_generate_v4(), $1) RETURNING *`;
      // db.query(selectQuery)
      //   .then(data => {
      //     if (data.rows.length > 0) {
      done();
      //     } else {
      //       db.query(insertQuery, [username])
      //         .then(user => {
      //           return done(null, accessToken);
      //         })
      //         .catch(err => console.log('INSERT QUERY', err));
      //     }
      //   })
      //   .catch(err => console.log('SELECT QUERY', err));
    }
  )
);

/**  Configure Passport authenticated session persistence.
 *
 * In order to restore authentication state across HTTP requests, Passport needs
 * to serialize users into and deserialize users out of the session.  We
 * supply the user ID when serializing, and query the user record by ID
 * from the database when deserializing.
 **/
// passport.serializeUser(function (user, done) {
//   console.log('IN SERIALIZE ', user)
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   const findUserQuery = `SELECT * FROM users WHERE id = $1`;
//   db.query(findUserQuery, [id]).then(user => {
//     done(null, user); // done is used to progress to the next middleware
//   });
// });

// module.exports = passport.deserializeUser;