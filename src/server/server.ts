/* eslint-disable @typescript-eslint/no-var-requires */
export {};
import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import path = require("path");
const passportSetup = require("../../src/server/config/passport-setup");
import passport = require("passport");
require("dotenv/config");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// disables 'powered by express' header
app.disable('x-powered-by')

// only allow CORS from react front end
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
const reactOrigin = MAIN_WINDOW_WEBPACK_ENTRY.substring(0, MAIN_WINDOW_WEBPACK_ENTRY.lastIndexOf("/"))
const corsOptions = { origin: reactOrigin}
app.use(cors(corsOptions));

// Bring in routes
const authRoute = require('../../src/server/routes/auth-route');
const apiRoute = require('../../src/server/routes/api-route');
const dockerRoute = require('../../src/server/routes/docker-route');
const configRoute = require("../../src/server/routes/config-route");

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());

// Use routes
app.use('/auth', authRoute);
app.use('/api', apiRoute);
app.use('/docker', dockerRoute);
app.use("/config", configRoute);

// Serve static files
app.use(express.static("assets"));

// Home endpoint
app.get("/", (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, "../../src/index.html"))
);

// Handle redirections
app.get("*", (req: Request, res: Response) => res.sendStatus(200));

// Failed auth redirect
app.get("/fail", (req: Request, res: Response) =>
  res.status(200).send("❌ FAILURE TO AUTHENTICATE ❌")
);

// Global Error handler
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Set up default error
    const defaultError = {
      log: "Error caught in global error handler",
      status: 500,
      msg: {
        err,
      },
    };

    // Update default error message with provided error if there is one
    const output = Object.assign(defaultError, err);
    console.log(output.log);
    res.send(output.msg);
  }
);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

