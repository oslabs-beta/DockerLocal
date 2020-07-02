export { };
const router = require('express').Router();
const saveController = require('../controllers/saveController');
import { Request, Response, response } from 'express';


router.get('/', saveController.readJSONFromFile, (req: Request, res: Response) => {
  // /save endpoint to send back saved project data from local file

  res.status(200).send(res.locals.projects);
});

router.post('/', saveController.writeJSONToFile, (req: Request, res: Response) => {
  // /save endpoint to write incoming json object to local file
  res.sendStatus(200);
});

module.exports = router;