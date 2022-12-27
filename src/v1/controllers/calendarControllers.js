import CalendarModel from '../models/calendarModel.js';

export const createCalendar = async (req, res) => {
    const newCalendar = new CalendarModel(req.body);

    try {
        const result = await newCalendar.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllCalendar = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await CalendarModel.find({ userId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
