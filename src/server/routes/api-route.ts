export {};
import { Request, Response } from "express";
import { shell } from "electron";
const apiController = require("../controllers/apiController");
const authController = require("../controllers/authController");
const gitController = require("../controllers/gitController");
const sshKeyController = require("../controllers/sshKeyController");
const router = require("express").Router();
require("dotenv/config");

// -> /api/repos will get the username and access token from cookies then fetch a list
<<<<<<< HEAD
<<<<<<< HEAD
//  of user repos (and display these repos as json on the client side) 
=======
//  of user repos (and display these repos as json on the client side)
>>>>>>> 9686311dc6ea81664e4fd43601ee1e1f26bec112
=======
//  of user repos (and display these repos as json on the client side)
>>>>>>> b9980be0d11a403ec8c1a72c4f60d683ab9bf670
router.get(
  "/repos",
  authController.getNameAndTokenFromCookies,
  apiController.getUserRepos,
  sshKeyController.createSSHkey,
  sshKeyController.addSSHkeyToGithub,
  gitController.cloneRepo,
  sshKeyController.deleteSSHkey,
  (req: Request, res: Response) => res.status(200).json(res.locals.repos)
);

<<<<<<< HEAD
<<<<<<< HEAD
//dummy post request (placeholder)
router.post('/', (req: Request, res: Response) => res.send('Hitting api POST endpoint'));
=======
router.post("/", (req: Request, res: Response) =>
  res.send("Hitting api POST endpoint")
);
>>>>>>> 971ddc0011119671de11cf04a19a0e47ccfef815
=======
//dummy post request (placeholder)
router.post('/', (req: Request, res: Response) => res.send('Hitting api POST endpoint'));
>>>>>>> b9980be0d11a403ec8c1a72c4f60d683ab9bf670

module.exports = router;
