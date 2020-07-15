export { };
import express, { Request, Response } from 'express';
const router = express.Router();
const configController = require('../controllers/configController');

// /config endpoint to send back saved project data from local file
router.get('/',
configController.readJSONFromFile,
(req: Request, res: Response) => res.status(200).send(JSON.parse(res.locals.projects)));

// /config endpoint to write incoming json object to local file
router.post('/',
configController.writeJSONToFile,
(req: Request, res: Response) => res.sendStatus(201));

module.exports = router;