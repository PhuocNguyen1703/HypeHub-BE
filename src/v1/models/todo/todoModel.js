import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../../../../config/mongodb.js';

const todoCollectionName = 'todos';
const todoSchema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(3).max(20).trim().required(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    content: Joi.string().trim().default(null),
    tag: Joi.array().items(Joi.string()).default([]),
    completed: Joi.boolean().default(false),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await todoSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(todoCollectionName)
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
        const result = await getDB().collection(todoCollectionName).insertOne(insertValue);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllTodo = async (userId) => {
    try {
        const result = await getDB()
            .collection(todoCollectionName)
            .find({ userId: ObjectId(userId) })
            .toArray();
        return result || [];
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (todoId, data) => {
    try {
        const updateData = { ...data };

        const result = await getDB()
            .collection(todoCollectionName)
            .findOneAndUpdate({ _id: ObjectId(todoId) }, { $set: updateData }, { returnDocument: 'after' });
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const todoModel = { createNew, findOneById, getAllTodo, update };
