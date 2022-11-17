import EmailModel from '../models/emailModel.js';

export const createEmail = async (req, res) => {
    const { senderId, receiverId } = req.body;

    const newEmail = new EmailModel(req.body);

    try {
        const result = await newEmail.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getReceiveEmails = async (req, res) => {
    const { receiverId } = req.params;

    try {
        const result = await EmailModel.find({ receiverId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getSenderEmails = async (req, res) => {
    const { senderId } = req.params;

    try {
        const result = await EmailModel.find({ senderId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
