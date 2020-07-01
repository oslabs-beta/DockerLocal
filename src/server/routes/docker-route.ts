import express, { Request, Response } from 'express';
export const router = express.Router();
import { dockerController } from '../controllers/dockerController';


router.get(
    '/docker',
    dockerController.getFilePaths,
    dockerController.getContainerNames,
    dockerController.createDockerCompose,
    (req: Request, res: Response) => {
        res.status(200).sendFile('./myRepos/docker-compose.yml')
    }
    )

