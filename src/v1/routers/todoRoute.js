import express from 'express';
import { todoController } from '../controllers/todo/todoController.js';
import { todoValidation } from '../validations/todo/todoValidation.js';

const router = express.Router();

router.post('/', todoValidation.createNew, todoController.createNew);
router.get('/:userId', todoController.getAllTodo);
router.put('/:todoId', todoValidation.update, todoController.update);

export default router;
