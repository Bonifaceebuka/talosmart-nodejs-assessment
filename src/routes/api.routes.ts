//@ts-nocheck
import express from "express";
import { signUp, signIn} from '../controllers/auth.controller';
import { newSavingsGroup } from '../controllers/savings.controller';
import { sendInvitation, viewInvitation, acceptOrDecline} from '../controllers/savingsGroupInvitation.controller';
import { authValidationRules,authValidationErrors }from '../validators/auth.validator';
import { savingsGroupValidationRules, savingsGroupValidationErrors }from '../validators/savingsGroup.validator';
import { savingsGroupInvitationValidationRules, savingsGroupInvitationValidationErrors }from '../validators/SavingsGroupInvitation.validator';
import auth from "../middlewares/apiAuth.middleware";

const router = express.Router();
router.post('/auth/signup',authValidationRules, authValidationErrors, signUp);
router.post('/auth/signin',authValidationRules, authValidationErrors, signIn);

router.post('/savings/create_group', auth, savingsGroupValidationRules, savingsGroupValidationErrors,  newSavingsGroup);
router.post('/savings/send_invitation/:group_id', auth, savingsGroupInvitationValidationRules, savingsGroupInvitationValidationErrors, sendInvitation);
router.get('/savings/view_invitation/:invitation_id', auth, viewInvitation);
router.get('/savings/act_on_invitation/:invitation_id', auth, acceptOrDecline);


export default router;