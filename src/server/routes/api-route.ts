export {};
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
const router = require('express').Router();
const db = require('../db/postgres');
require('dotenv/config');

/**
 * @route   GET /api
 * @desc    Testing GET requests for api route
 * @access  Public
 */
router.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

/**
 * @route   GET /api
 * @desc    Testing GET requests for api route
 * @access  Public
 */
router.post('/', (req: Request, res:Response) => {
  res.send('Hitting api POST endpoint');
});