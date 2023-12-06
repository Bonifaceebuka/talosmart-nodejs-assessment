//@ts-nocheck
import express from "express";
import { signUp, signIn} from '../controllers/auth.controller';
import { listItems, showDetails } from '../controllers/items.controller';
import { authValidationRules,authValidationErrors }from '../validators/auth.validator';

const router = express.Router();
router.post('/auth/signup',authValidationRules, authValidationErrors, signUp);
router.post('/auth/signin',authValidationRules, authValidationErrors, signIn);

router.get('/items',  listItems);
router.get('/items/:item_id', showDetails);

export default router;