import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../../../../config/mongodb.js';

const emailCollectionName = 'emails';
const emailSchema = Joi.object({
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    senderEmail: Joi.string().required(),
    receiverEmail: Joi.string().required(),
    subject: Joi.string().default(null),
    content: Joi.string().default(null),
    status: Joi.object({
        watched: Joi.boolean(),
        star: Joi.boolean(),
        spam: Joi.boolean(),
    }).default({
        watched: false,
        star: false,
        spam: false,
    }),
    draft: Joi.boolean().default(false),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await emailSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(emailCollectionName)
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
            senderId: ObjectId(validatedValue.senderId),
            receiverId: ObjectId(validatedValue.receiverId),
        };
        const result = await getDB().collection(emailCollectionName).insertOne(insertValue);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getReceiveEmail = async (receiverId) => {
    try {
        const result = await getDB()
            .collection(emailCollectionName)
            .find({ receiverId: ObjectId(receiverId) })
            .toArray();
        return result || [];
    } catch (error) {
        throw new Error(error);
    }
};

const getSendEmail = async (senderId) => {
    try {
        const result = await getDB()
            .collection(emailCollectionName)
            .find({ senderId: ObjectId(senderId) })
            .toArray();
        return result || [];
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (emailId, data) => {
    try {
        const updateData = { ...data };

        const result = await getDB()
            .collection(emailCollectionName)
            .findOneAndUpdate({ _id: ObjectId(emailId) }, { $set: updateData }, { returnDocument: 'after' });
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const emailModel = { findOneById, createNew, getReceiveEmail, getSendEmail, update };
