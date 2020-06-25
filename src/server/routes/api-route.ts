export {};
import { Request, Response } from 'express';
const apiController = require('../controllers/apiController');
const authController = require('../controllers/authController');
const router = require('express').Router();
require('dotenv/config');

router.get('/repos', authController.getNameAndTokenFromCookies, apiController.getUserRepos, (req: Request, res: Response) => {
  res.status(200).json(res.locals.repos);
});

router.post('/', (req: Request, res:Response) => {
  res.send('Hitting api POST endpoint');
});

module.exports = router;