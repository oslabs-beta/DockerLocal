export { };

require("dotenv").config();
const passport = require("passport");
const GithubStrategy = require("passport-github2");
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
// Configure the Github strategy for use by Passport.

// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Github API on the user's
// behalf, along with the user's profile.  The function must invoke callback
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

passport.use(
  new GithubStrategy(
    {
      // https://github.com/login/oauth/authorize
      // will be given through API. used to identify our app to github
      clientID: GITHUB_CLIENT_ID,
      // will be given through API. used to identify our app to github
      clientSecret: GITHUB_CLIENT_SECRET,
      // callback url that sends client to github login page
      callbackURL: "/auth/github/callback",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      // basic 4 params -> getting github profile information from auth-route
      /** passport callback fn
       * accessToken - is how we will make an API call on behalf of the user. It is sent to us by github in the response.
       * refreshToken - is a token that can refresh the access token if it 'times out'.
       * profile - is the user's record in Github. We associate this profile with a user record in our application database.
       * done - after getting successully authenticated - run this callback function
       * routes to 'authenticated page' w/ correct user information
      **/
      const { username } = profile;

      // in case we want to use profile picture
      const { avatar_url:profilePic } = profile;

      const payload: object = {
        username,
        accessToken,
      };
      done(null, payload);
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
passport.serializeUser((payload: object, done: Function) => done(null, payload));

passport.deserializeUser((payload: string, done: Function) =>done(null, payload));

module.exports = passport.serializeUser, passport.deserializeUser;
