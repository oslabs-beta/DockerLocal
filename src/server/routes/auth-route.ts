export {};
const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
import { Request, Response } from "express";

//using passport to authenticate the github
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email", "admin:public_key"],
  })
);

//Github callback function (authentication)
  //if successful
    //save username/accessToken to cookies
    //redirect to /api/repos
  //if unsuccessful
    //redirect to /fail 
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/fail",
  }),
  authController.saveAccessToken,
<<<<<<< HEAD
  (req: Request, res: Response) => res.redirect('/test')
=======
  (req: Request, res: Response) => res.redirect("/api/repos")
>>>>>>> 971ddc0011119671de11cf04a19a0e47ccfef815
);

module.exports = router;
