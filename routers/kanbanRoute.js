import express from 'express';
import { createSection } from '../controllers/kanbanControllers';

const router = express.Router();

router.post('/', createSection);

export default router;
