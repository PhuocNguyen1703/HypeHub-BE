import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../../../../config/mongodb.js';

const calendarCollectionName = 'calendars';
const calendarSchema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(3).max(20).trim().required(),
    type: Joi.string(),
    date: Joi.date(),
    startTime: Joi.string().default(null),
    endTime: Joi.string().default(null),
    content: Joi.string().default(null),
    theme: Joi.string(),
    completed: Joi.boolean().default(false),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await calendarSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(calendarCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data);
        const insertValue = { ...validatedValue, userId: ObjectId(validatedValue.userId) };
        const result = await getDB().collection(calendarCollectionName).insertOne(insertValue);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllCalendar = async (userId) => {
    try {
        const result = await getDB()
            .collection(calendarCollectionName)
            .find({ userId: ObjectId(userId) })
            .toArray();
        return result || [];
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (calendarId, data) => {
    try {
        const updateData = { ...data };

        const result = await getDB()
            .collection(calendarCollectionName)
            .findOneAndUpdate({ _id: ObjectId(calendarId) }, { $set: updateData }, { returnDocument: 'after' });
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const calendarModel = { createNew, findOneById, getAllCalendar, update };
