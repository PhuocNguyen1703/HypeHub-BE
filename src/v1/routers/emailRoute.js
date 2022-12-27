import express from 'express';
import { createEmail, getReceiveEmails, getSenderEmails } from '../controllers/emailControllers.js';

const router = express.Router();

router.post('/', createEmail);
router.get('/:receiveId', getReceiveEmails);
router.get('/:senderId', getSenderEmails);

export default router;
