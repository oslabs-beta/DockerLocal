export { };
import express, { Request, Response } from 'express';
import path from 'path';
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
         // sends compose file to front end
         const projectFolder = req.body.projectName;
         // sends compose file to front end

         //SEND BACK PATH 
         res.status(200).sendFile(path.resolve(__dirname, `../../myProjects/${projectFolder}/docker-compose.yaml`));
     }
    )

module.exports = router;