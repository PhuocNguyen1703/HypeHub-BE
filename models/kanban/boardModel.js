import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';

const boardCollectionName = 'boards';
const boardSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await boardSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(boardCollectionName).insertOne(value);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const boardModel = { findOneById, createNew };
