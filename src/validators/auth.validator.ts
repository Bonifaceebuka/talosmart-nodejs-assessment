const { check, validationResult } = require('express-validator');
import { Response, Request, NextFunction } from 'express';

const authValidationRules = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Email must be a valid email address!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required!')
];

const authValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req).array();
  if (result && result.length === 0) 
  {
    return next()
  }
  else{
      const error = result[0].msg;
      res.status(422).json({ success: false, message: error });
  }
}

export {
    authValidationErrors,
    authValidationRules
}