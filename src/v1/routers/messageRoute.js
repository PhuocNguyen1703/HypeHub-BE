import express from 'express';
import { messageController } from '../controllers/chat/messageController.js';
import { messageValidation } from '../validations/chat/messageValidation.js';

const router = express.Router();

router.post('/', messageValidation.createNew, messageController.createNew);
router.get('/:chatId', messageController.getAllMessage);
router.put('/:messageId',messageValidation.update,messageController.update)

export default router;
