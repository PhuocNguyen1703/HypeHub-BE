import cloneDeep from 'lodash/cloneDeep.js';
import { calendarModel } from '../../models/calendar/calendarModel.js';

const createNew = async (data) => {
    try {
        const createdCalendar = await calendarModel.createNew(data);
        const getNewCalendar = await calendarModel.findOneById(createdCalendar.insertedId.toString());

        return getNewCalendar;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllCalendar = async (userId) => {
    try {
        const calendar = await calendarModel.getAllCalendar(userId);

        if (!calendar) {
            throw new Error('Calendar not found!!');
        }

        let transformCalendar = cloneDeep(calendar);

        transformCalendar = transformCalendar.filter((calendar) => !calendar._destroy);

        return transformCalendar;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (calendarId, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };

        const updatedCalendar = await calendarModel.update(calendarId, updateData);

        return updatedCalendar;
    } catch (error) {
        throw new Error(error);
    }
};

export const calendarService = { createNew, getAllCalendar, update };
