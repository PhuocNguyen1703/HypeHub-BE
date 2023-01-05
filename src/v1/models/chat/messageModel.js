import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../../../../config/mongodb.js';

const messageCollectionName = 'messages';
const messageSchema = Joi.object({
    chatId: Joi.string().required(),
    senderId: Joi.string().required(),
    content: Joi.string().default(null),
    fileUrl: Joi.string().allow('').default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await messageSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(messageCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data);

        const insertValue = {
            ...validatedValue,
            chatId: ObjectId(validatedValue.chatId),
            senderId: ObjectId(validatedValue.senderId),
        };
        const result = await getDB().collection(messageCollectionName).insertOne(insertValue);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllMessage = async (chatId) => {
    try {
        const result = await getDB()
            .collection(messageCollectionName)
            .find({ chatId: ObjectId(chatId) })
            .toArray();

        return result || [];
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (messageId, data) => {
    try {
        const updateData = { ...data };

        const result = await getDB()
            .collection(messageCollectionName)
            .findOneAndUpdate({ _id: ObjectId(messageId) }, { $set: updateData }, { returnDocument: 'after' });

        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const messageModel = { findOneById, createNew, getAllMessage, update };
