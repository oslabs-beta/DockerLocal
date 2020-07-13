export {};
import { Request, Response } from "express";
const authController = require("../controllers/authController");
const gitController = require("../controllers/gitController");
const sshKeyController = require("../controllers/sshKeyController");
const router = require("express").Router();
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
