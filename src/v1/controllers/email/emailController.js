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
    const { userId } = req.params;

    try {
        const result = await emailService.getReceiveEmail(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getSendEmail = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await emailService.getSendEmail(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const update = async (req, res) => {
    const { emailId } = req.params;

    try {
        const result = await emailService.update(emailId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const emailController = { createNew, getReceiveEmail, getSendEmail, update };
