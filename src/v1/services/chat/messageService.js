import cloneDeep from 'lodash/cloneDeep.js';
import { messageModel } from '../../models/chat/messageModel.js';

const createNew = async (data) => {
    try {
        const createdMessage = await messageModel.createNew(data);
        const getNewMessage = await messageModel.findOneById(createdMessage.insertedId.toString());

        return getNewMessage;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllMessage = async (chatId) => {
    try {
        const message = await messageModel.getAllMessage(chatId);

        if (!message) {
            throw new Error('Message not found!!');
        }

        let transformMessage = cloneDeep(message);

        transformMessage = transformMessage.filter((message) => !message._destroy);

        return transformMessage;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (messageId, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };

        const updatedMessage = await messageModel.update(messageId, updateData);

        return updatedMessage;
    } catch (error) {
        throw new Error(error);
    }
};

export const messageService = { createNew, getAllMessage, update };
