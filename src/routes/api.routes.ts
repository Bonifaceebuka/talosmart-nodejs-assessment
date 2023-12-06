//@ts-nocheck
import express from "express";
import { signUp, signIn} from '../controllers/auth.controller';
import { listItems, showItem } from '../controllers/items.controller';
import { authValidationRules,authValidationErrors }from '../validators/auth.validator';
import auth from "../middlewares/apiAuth.middleware";

const router = express.Router();
router.post('/auth/signup',authValidationRules, authValidationErrors, signUp);
router.post('/auth/signin',authValidationRules, authValidationErrors, signIn);

router.post('/items/', auth,  listItems);
router.post('/items/:item_id', auth, showItem);

export default router;