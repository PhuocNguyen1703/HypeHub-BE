import cloneDeep from 'lodash/cloneDeep.js';
import { emailModel } from '../../models/email/emailModel.js';

const createNew = async (data) => {
    try {
        const createdTodo = await emailModel.createNew(data);
        const getNewTodo = await emailModel.findOneById(createdTodo.insertedId.toString());

        return getNewTodo;
    } catch (error) {
        throw new Error(error);
    }
};

const getReceiveEmail = async (receiverId) => {
    try {
        const email = await emailModel.getReceiveEmail(receiverId);

        if (!email) {
            throw new Error('Email not found!!');
        }

        let transformEmail = cloneDeep(email);

        transformEmail = transformEmail.filter((email) => !email._destroy);

        return transformEmail;
    } catch (error) {
        throw new Error(error);
    }
};

const getSendEmail = async (senderId) => {
    try {
        const email = await emailModel.getSendEmail(senderId);

        if (!email) {
            throw new Error('Email not found!!');
        }

        let transformEmail = cloneDeep(email);

        transformEmail = transformEmail.filter((email) => !email._destroy);

        return transformEmail;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (emailId, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };

        const updatedEmail = await emailModel.update(emailId, updateData);

        return updatedEmail;
    } catch (error) {
        throw new Error(error);
    }
};

export const emailService = { createNew, getReceiveEmail, getSendEmail, update };
