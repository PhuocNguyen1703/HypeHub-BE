import { messageService } from '../../services/chat/messageService.js';

const createNew = async (req, res) => {
    try {
        const result = await messageService.createNew(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getAllMessage = async (req, res) => {
    const { chatId } = req.params;

    try {
        const result = await messageService.getAllMessage(chatId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const update = async (req, res) => {
  const { messageId } = req.params;
  
  try {
      const result = await messageService.update(messageId, req.body);
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({
          errors: error.message,
      });
  }
};

export const messageController = { createNew, getAllMessage,update };
