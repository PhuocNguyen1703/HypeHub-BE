import { timesheetsModel } from '../../models/timesheets/timesheetsModel.js';

const timeIn = async (data) => {
    try {
        const createdTimeIn = await timesheetsModel.timeIn(data);
        const getNewTimeIn = await timesheetsModel.findOneById(createdTimeIn.insertedId.toString());

        return getNewTimeIn;
    } catch (error) {
        throw new Error(error);
    }
};

export const timesheetsService = { timeIn };
