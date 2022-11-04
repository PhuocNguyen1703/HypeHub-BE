import express from 'express';
import { createSection, createTask, getAllSection, getAllTask } from '../controllers/kanbanControllers.js';

const router = express.Router();

router.post('/', createSection);
router.get('/:userId', getAllSection);
router.post('/task', createTask);
router.get('/task/:sectionId', getAllTask);

export default router;
