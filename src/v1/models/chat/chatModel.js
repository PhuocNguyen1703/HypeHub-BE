import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../../../../config/mongodb.js';

const chatCollectionName = 'chats';
const chatSchema = Joi.object({
    members: Joi.array().items(Joi.string()).required(),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await chatSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(chatCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data);

        const result = await getDB().collection(chatCollectionName).insertOne(validatedValue);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getChatList = async (userId) => {
    try {
        const result = await getDB()
            .collection(chatCollectionName)
            .find({ members: { $in: [userId] } })
            .toArray();

        return result || [];
    } catch (error) {
        throw new Error(error);
    }
};

const getConversation = async (firstId, secondId) => {
    try {
        const result = await getDB()
            .collection(chatCollectionName)
            .find({ members: { $all: [firstId, secondId] } })
            .toArray();

        return result || [];
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (firstId, secondId, data) => {
    try {
        const updateData = { ...data };

        const result = await getDB()
            .collection(chatCollectionName)
            .findOneAndUpdate(
                { members: { $all: [firstId, secondId] } },
                { $set: updateData },
                { returnDocument: 'after' },
            );

        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const chatModel = { findOneById, createNew, getChatList, getConversation, update };
