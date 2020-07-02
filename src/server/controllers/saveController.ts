export { };
import { Request, Response, NextFunction } from 'express';
const fs = require('fs');
const path = require('path');

const saveController: any = {};

//for GET
saveController.readJSONFromFile = async (req: Request, res: Response, next: NextFunction) => {
  //Get JSON data from local file
  //Save to res.locals.projects
  fs.readFile(path.join(__dirname, '../../src/server/controllers/user-projects/projects.json'), 'utf8', (err, data) => {
    (err) ? console.log(err) : res.locals.projects = data;
    console.log('GET', res.locals.projects);
  });

  return next();
};

//for POST
saveController.writeJSONToFile = (req: Request, res: Response, next: NextFunction) => {
  //takes in json from req.body;
  //writes req.body JSON to local file
  const filePath = path.join(__dirname, '../../src/server/controllers/user-projects/projects.json');
  fs.writeFile(filePath, JSON.stringify(req.body), (err) => (err) ? console.log(err) : console.log('Success!'));
  return next();
};

module.exports = saveController;

