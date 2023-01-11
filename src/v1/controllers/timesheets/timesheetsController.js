import { timesheetsService } from '../../services/timesheets/timesheetsService.js';

const timeIn = async (req, res) => {
    try {
        const result = await timesheetsService.timeIn(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const timesheetsController = { timeIn };
