import createError from 'http-errors';
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from "./routes";
import { isProduction } from "./config";
const app = express();

const corsOptions = {
  origin: true,
  allowedHeaders: [
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "x-jwt-token",
    "x-jwt-refresh-token",
  ],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  credentials: true,
};

// Middlewares
app.use(morgan(isProduction ? "combined" : "dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(routes);

// catch 404 and forward to error handler
app.use(function(next: NextFunction) {
  next(createError(404));
}); 

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
