import express from 'express';
import { createTodo, getAllTodo } from '../controllers/todoControllers.js';

const router = express.Router();

router.post('/', createTodo);
router.get('/', getAllTodo);

export default router;
