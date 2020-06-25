export {};
import { Request, Response } from 'express';
const apiController = require('../controllers/apiController');
const router = require('express').Router();
require('dotenv/config');

router.get('/', apiController.getUserRepos,(req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post('/', (req: Request, res:Response) => {
  res.send('Hitting api POST endpoint');
});

module.exports = router;