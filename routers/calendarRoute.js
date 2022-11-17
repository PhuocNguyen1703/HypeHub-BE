import express from 'express';
import { createCalendar, getAllCalendar } from '../controllers/calendarControllers.js';

const router = express.Router();

router.post('/', createCalendar);
router.get('/', getAllCalendar);

export default router;
