export { };
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import fs = require('fs');
import path = require('path');

const configController: any = {};

// for GET
// check for folder
configController.readJSONFromFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Get JSON data from local file
  // save to res.locals.projects

  const filePath = path.join(__dirname, '../../user-projects/projects.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    res.locals.projects = data;
    return next();
  } catch (error) {
      return next({
        log: "Error caught in configController- readJSONFromFile",
        status: 500,
        msg: {
          err: `ERROR:${error}`
        }
      })
  }

};

// for POST
configController.writeJSONToFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // takes in json from req.body;
  // writes req.body JSON to local file

  const filePath = path.join(__dirname, '../../user-projects/projects.json');

  try{
    fs.writeFileSync(filePath, JSON.stringify(req.body));
    return next();
  } catch (error) {
    return next({
      log: "Error caught in configController- writeJSONToFile",
      status: 500,
      msg: {
        err: `ERROR: ${error}`,
      }
    })
  }
};

module.exports = configController;