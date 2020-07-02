export { };
import express, { Request, Response } from 'express';
import path from 'path';
const router = express.Router();
const dockerController = require('../controllers/dockerController');

// creates docker compose file using project folder names
router.post(
    '/',
    dockerController.getFilePaths,
    dockerController.getContainerNames,
    dockerController.createDockerCompose,
     (req: Request, res: Response) => {
         // sends compose file to front end
         res.status(200).sendFile(path.resolve(__dirname, '../../myRepos/docker-compose.yaml'));
     }
    )

module.exports = router;