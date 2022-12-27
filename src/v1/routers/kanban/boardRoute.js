import express from 'express';
import { boardController } from '../../controllers/kanban/boardController.js';
import { boardValidation } from '../../src/v1/kanban/boardValidation.js';

const router = express.Router();

router.post('/', boardValidation.createNew, boardController.createNew);
router.get('/user/:userId', boardController.getAllBoardFromUserId);
router.get('/:boardId', boardController.getAllBoard);
router.put('/:boardId', boardValidation.update, boardController.update);

export default router;
