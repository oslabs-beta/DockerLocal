export { };
const router = require('express').Router();
const configController = require('../controllers/configController');
import { Request, Response } from 'express';

// /config endpoint to send back saved project data from local file
router.get('/', 
configController.readJSONFromFile, 
(req: Request, res: Response) => res.status(200).send(JSON.parse(res.locals.projects)));
  
// /config endpoint to write incoming json object to local file
router.post('/', 
configController.writeJSONToFile, 
(req: Request, res: Response) => res.sendStatus(200));

module.exports = router;