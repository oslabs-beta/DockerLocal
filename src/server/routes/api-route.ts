/* eslint-disable @typescript-eslint/no-var-requires */
export {};
import express, { Request, Response } from "express";
const router = express.Router();
const authController = require("../controllers/authController");
const gitController = require("../controllers/gitController");
const sshKeyController = require("../controllers/sshKeyController");
require("dotenv/config");

router.post(
  "/clonerepos",
  authController.saveUserInfoAndRepos,
  sshKeyController.createSSHkey,
  sshKeyController.addSSHkeyToGithub,
  gitController.cloneRepo,
  sshKeyController.deleteSSHkey,
  (req: Request, res: Response) => res.status(201).json(res.locals.repos)
);

module.exports = router;
