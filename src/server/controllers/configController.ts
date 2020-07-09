export { };
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
const fs = require('fs');
const path = require('path');

const configController: any = {};

//for GET
configController.readJSONFromFile = async (req: Request, res: Response, next: NextFunction) => {
  //Get JSON data from local file
  //save to res.locals.projects

  const filePath = path.join(__dirname, '../../src/server/controllers/user-projects/projects.json');

  await fs.readFile(filePath, 'utf8',
    (err: ErrorRequestHandler, data: JSON) => {
      if (err) return next({
        log: "Error caught in configController- readJSONFromFile",
        status: 400,
        msg: {
          err: err,
        }
      })
      else{
      res.locals.projects = data;
      return next();
    };
  });
};

//for POST
configController.writeJSONToFile = async (req: Request, res: Response, next: NextFunction) => {
  //takes in json from req.body;
  //writes req.body JSON to local file

  const filePath = path.join(__dirname, '../../src/server/controllers/user-projects/projects.json');

  await fs.writeFile(filePath, JSON.stringify(req.body),
    (err: ErrorRequestHandler) => {
      if (err) return next({
        log: "Error caught in configController- writeJSONToFile",
        status: 500,
        msg: {
          err: err,
        }
      })
      else{
        return next();
      }
    });
};

module.exports = configController;