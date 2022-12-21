import express from 'express';
import { boardController } from '../../controllers/kanban/boardController.js';
import { boardValidation } from '../../validations/kanban/boardValidation.js';

const router = express.Router();

router.post('/', boardValidation.createNew, boardController.createNew);
router.get('/user/:userId', boardController.getAllBoardFromUserId);
router.get('/:id', boardController.getAllBoard);
router.put('/:id', boardValidation.update, boardController.update);

export default router;
