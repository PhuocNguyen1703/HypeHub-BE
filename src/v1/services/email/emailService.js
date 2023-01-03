import cloneDeep from 'lodash/cloneDeep.js';
import { ObjectId } from 'mongodb';
import { emailModel } from '../../models/email/emailModel.js';

const createNew = async (data) => {
    const { sender, receiver } = data;
    try {
        const senderInfo = await emailModel.findOneByEmail(sender);
        const receiverInfo = await emailModel.findOneByEmail(receiver);

        if (!senderInfo) throw 'Sender incorrect!';
        if (!receiverInfo) throw 'Receiver not found!';

        const transformData = {
            ...data,
            sender: { id: ObjectId(senderInfo._id), email: senderInfo.email, fullName: senderInfo.fullName },
            receiver: { id: ObjectId(receiverInfo._id), email: receiverInfo.email, fullName: receiverInfo.fullName },
        };
        const createdEmail = await emailModel.createNew(transformData);
        const getNewEmail = await emailModel.findOneById(createdEmail.insertedId.toString());

        return getNewEmail;
    } catch (error) {
        throw new Error(error);
    }
};

const getReceiveEmail = async (userId) => {
    try {
        const email = await emailModel.getReceiveEmail(userId);

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

const getSendEmail = async (userId) => {
    try {
        const email = await emailModel.getSendEmail(userId);

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
