import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../../../../config/mongodb.js';

const timesheetsCollectionName = 'timesheets';
const timesheetsSchema = Joi.object({
    userId: Joi.string().required(),
    date: Joi.date().required(),
    fullName: Joi.string(),
    email: Joi.string().email().required(),
    timeIn: Joi.date().default(null),
    timeOut: Joi.date().default(null),
    status: Joi.string().default('Pending'),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await timesheetsSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(timesheetsCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const findOneByDate = async (date) => {
    try {
        const result = await getDB().collection(timesheetsCollectionName).findOne({ date: date });

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const timeIn = async (data) => {
    try {
        const validatedValue = await validateSchema(data);
        const insertValue = { ...validatedValue, userId: ObjectId(validatedValue.userId) };

        const result = await getDB().collection(timesheetsCollectionName).insertOne(insertValue);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const timesheetsModel = { findOneById, findOneByDate, timeIn };
