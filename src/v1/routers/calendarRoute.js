import express from 'express';
import { calendarController } from '../controllers/calendar/calendarController.js';
import { calendarValidation } from '../validations/calendar/calendarValidation.js';

const router = express.Router();

router.post('/', calendarValidation.createNew, calendarController.createNew);
router.get('/:userId', calendarController.getAllCalendar);
router.put('/:calendarId', calendarValidation.update, calendarController.update);

export default router;
