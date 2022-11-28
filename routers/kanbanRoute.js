import express from 'express';
import { boardController } from '../controllers/kanban/boardController.js';
import {
    createSection,
    createTask,
    deleteSection,
    getAllSection,
    getAllTask,
    updateSection,
} from '../controllers/kanbanControllers.js';

const router = express.Router();

// router.post('/', createSection);
// router.get('/:userId', getAllSection);
// router.put('/:sectionId', updateSection);
// router.delete('/:sectionId', deleteSection);

// router.post('/task', createTask);
// router.get('/task/:sectionId', getAllTask);

router.post('/', boardController.createNew);

export default router;
