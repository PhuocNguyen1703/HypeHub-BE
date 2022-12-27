import { calendarService } from '../../services/calendar/calendarService.js';

const createNew = async (req, res) => {
    try {
        const result = await calendarService.createNew(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getAllCalendar = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await calendarService.getAllCalendar(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { calendarId } = req.params;
        const result = await calendarService.update(calendarId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const calendarController = { createNew, getAllCalendar, update };
