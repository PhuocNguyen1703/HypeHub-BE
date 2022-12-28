import { emailService } from '../../services/email/emailService.js';

const createNew = async (req, res) => {
    try {
        const result = await emailService.createNew(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getReceiveEmail = async (req, res) => {
    const { receiverId } = req.params;

    try {
        const result = await emailService.getReceiveEmail(receiverId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getSendEmail = async (req, res) => {
    const { senderId } = req.params;

    try {
        const result = await emailService.getSendEmail(senderId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { emailId } = req.params;
        const result = await emailService.update(emailId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const emailController = { createNew, getReceiveEmail, getSendEmail, update };
