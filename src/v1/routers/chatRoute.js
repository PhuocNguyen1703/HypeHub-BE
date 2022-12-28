import express from 'express';
import { chatController } from '../controllers/chat/chatController.js';
import { chatValidation } from '../validations/chat/chatValidation.js';

const router = express.Router();

router.post('/', chatValidation.createNew, chatController.createNew);
router.get('/:userId', chatController.getChatList);
router.get('/find/:firstId/:secondId', chatController.getConversation);

export default router;
