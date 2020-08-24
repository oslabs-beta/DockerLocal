export { };
import express, { Request, Response } from 'express';
import path from 'path';
import fs = require('fs');
const router = express.Router();
const authController = require('../controllers/authController');
const dockerController = require('../controllers/dockerController');

// creates docker compose file using project folder names
router.post(
  '/',
  authController.saveUserInfoAndRepos,
  dockerController.getFilePaths,
  dockerController.getContainerNames,
  dockerController.createDockerCompose,
  (req: Request, res: Response) => {
    // gets project folder name to provide docker compose correct file path to front end
    // so end user knows where to find their docker compose file in their system
    const projectFolder = req.body.projectName;
    // send docker compose filepath and yaml file to front end
    const composeFilePath = path.resolve(__dirname, `../../myProjects/${projectFolder}/docker-compose.yaml`);
    const fileAsJSON = fs.readFileSync(composeFilePath, "utf8");
    const payload = {
      path: composeFilePath,
      file: fileAsJSON
    }
    res.status(200).send(payload);
  }
)

module.exports = router;