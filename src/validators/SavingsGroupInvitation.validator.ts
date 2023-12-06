const { check, validationResult } = require('express-validator');
import { Response, Request, NextFunction } from 'express';

const savingsGroupInvitationValidationRules = [
  check('invitee_email')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Invitee email is required!')
  .isEmail()
  .withMessage('Invitee email must be a valid email address!')
];

const savingsGroupInvitationValidationErrors = (req: Request, res: Response, next: NextFunction) => {
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
    savingsGroupInvitationValidationErrors,
    savingsGroupInvitationValidationRules
}