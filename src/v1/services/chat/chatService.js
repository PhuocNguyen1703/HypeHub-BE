import cloneDeep from 'lodash/cloneDeep.js';
import { chatModel } from '../../models/chat/chatModel.js';

const createNew = async (data) => {
    try {
        const createdChat = await chatModel.createNew(data);
        const getNewChat = await chatModel.findOneById(createdChat.insertedId.toString());

        return getNewChat;
    } catch (error) {
        throw new Error(error);
    }
};

const getChatList = async (userId) => {
    try {
        const chat = await chatModel.getChatList(userId);

        if (!chat) {
            throw new Error('Chat not found!!');
        }

        let transformChat = cloneDeep(chat);

        transformChat = transformChat.filter((chat) => !chat._destroy);

        return transformChat;
    } catch (error) {
        throw new Error(error);
    }
};

const getConversation = async (firstId, secondId) => {
    try {
        const conversation = await chatModel.getConversation(firstId, secondId);

        if (!conversation) {
            throw new Error('Conversation not found!!');
        }

        let transformConversation = cloneDeep(conversation);

        transformConversation = transformConversation.filter((conversation) => !conversation._destroy);

        return transformConversation;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (firstId, secondId, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };

        const updatedChat = await chatModel.update(firstId, secondId, updateData);

        return updatedChat;
    } catch (error) {
        throw new Error(error);
    }
};

export const chatService = { createNew, getChatList, getConversation, update };
