import express from 'express';
import { boardController } from '../../controllers/kanban/boardController.js';
import { boardValidation } from '../../validations/kanban/boardValidation.js';

const router = express.Router();

// router.post('/', createSection);
// router.get('/:userId', getAllSection);
// router.put('/:sectionId', updateSection);
// router.delete('/:sectionId', deleteSection);

// router.post('/task', createTask);
// router.get('/task/:sectionId', getAllTask);

router.post('/', boardValidation.createNew, boardController.createNew);
router.get('/:id', boardController.getAllBoard);

export default router;
