import express from 'express';
import { emailController } from '../../controllers/email/emailController.js';
import { emailValidation } from '../../validations/email/emailValidation.js';

const router = express.Router();

router.post('/', emailValidation.createNew, emailController.createNew);
router.get('/receiver/:userId', emailController.getReceiveEmail);
router.get('/sender/:userId', emailController.getSendEmail);
router.put('/:emailId', emailValidation.update, emailController.update);

export default router;
