const { check, validationResult } = require('express-validator');
import { Response, Request, NextFunction } from 'express';

const savingsGroupValidationRules = [
  check('group_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Group name is required!'),
   check('group_description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Group description is required!')
];

const savingsGroupValidationErrors = (req: Request, res: Response, next: NextFunction) => {
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
    savingsGroupValidationErrors,
    savingsGroupValidationRules
}