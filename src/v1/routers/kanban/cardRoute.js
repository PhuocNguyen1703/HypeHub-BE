import express from 'express';
import { cardController } from '../../controllers/kanban/cardController.js';
import { cardValidation } from '../../src/v1/kanban/cardValidation.js';

const router = express.Router();

router.post('/', cardValidation.createNew, cardController.createNew);
router.put('/:id', cardValidation.update, cardController.update);

export default router;
