import express from 'express';
import { timesheetsController } from '../../controllers/timesheets/timesheetsController.js';
import { timesheetsValidation } from '../../validations/timesheets/timesheetsValidation.js';

const router = express.Router();

router.post('/timeIn', timesheetsValidation.timeIn, timesheetsController.timeIn);

export default router;
