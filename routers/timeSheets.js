import express from 'express';
import { createSheet } from '../controllers/timeSheetControllers.js';

const router = express.Router();

router.post('/', createSheet);

export default router;
