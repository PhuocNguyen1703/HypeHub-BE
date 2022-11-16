import EmailModel from '../models/emailModel.js';

export const createEmail = async (req, res) => {
    const newEmail = new EmailModel(req.body);

    try {
        const result = await newEmail.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllEmails = async (req, res) => {

};
