import { chatService } from '../../services/chat/chatService.js';

const createNew = async (req, res) => {
    try {
        const result = await chatService.createNew(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getChatList = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await chatService.getChatList(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getConversation = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const result = await chatService.getConversation(firstId, secondId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const update = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const result = await chatService.update(firstId, secondId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const chatController = { createNew, getChatList, getConversation, update };
