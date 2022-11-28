import express from 'express';
import { columnController } from '../../controllers/kanban/columnController.js';
import { columnValidation } from '../../validations/kanban/columnValidation.js';

const router = express.Router();

router.post('/', columnValidation.createNew, columnController.createNew);
router.put('/:id', columnValidation.update, columnController.update);


export default router;
