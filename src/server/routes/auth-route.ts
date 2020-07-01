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
<<<<<<< HEAD
  //if successful
    //save username/accessToken to cookies
    //redirect to /api/repos
  //if unsuccessful
    //redirect to /fail 
=======
//if successful
//save username/accessToken to cookies
//redirect to /api/repos
//if unsuccessful
//redirect to /fail
>>>>>>> 9686311dc6ea81664e4fd43601ee1e1f26bec112
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/fail",
  }),
  authController.saveAccessToken,
  (req: Request, res: Response) => res.redirect("/api/repos")
);

module.exports = router;
