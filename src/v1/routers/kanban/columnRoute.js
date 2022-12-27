import express from 'express';
import { columnController } from '../../controllers/kanban/columnController.js';
import { columnValidation } from '../../src/v1/kanban/columnValidation.js';

const router = express.Router();

router.post('/', columnValidation.createNew, columnController.createNew);
router.put('/:id', columnValidation.update, columnController.update);
router.put('/:sourceColId/:destinationColId', columnController.updateTwoColumn);

export default router;
