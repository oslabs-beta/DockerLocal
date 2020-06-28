export {};
import { Request, Response } from "express";
import { shell } from "electron";
const apiController = require("../controllers/apiController");
const authController = require("../controllers/authController");
const shellController = require("../controllers/shellController");
const router = require("express").Router();
require("dotenv/config");

router.get(
  "/repos",
  authController.getNameAndTokenFromCookies,
  apiController.getUserRepos,
  shellController.cloneRepo,
  (req: Request, res: Response) => res.status(200).json(res.locals.repos)
);

router.post("/", (req: Request, res: Response) =>
  res.send("Hitting api POST endpoint")
);

module.exports = router;
