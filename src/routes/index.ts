import express, { NextFunction, Response, Request } from "express";
import apiRoutes from "./api.routes";
import { isProduction } from "../config";
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) =>
  res.status(200).json({
    success: true,
    message: "This service is operational",
  })
);

router.use("/api", apiRoutes);

// catch 404 and forward to error handler
router.use((request: Request, response: Response, next: NextFunction) => {
  const err = new Error("Route does not exist");
  next(err);
});

// error handler
router.use((err: any, request: Request, response: Response, next: NextFunction) => {
  const status = err.status || 500;

  response.status(status).json({
    success: false,
    message: err.message || "Something happened",
    stack: isProduction ? undefined : err.stack,
  });
});

export default router;
