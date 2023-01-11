import Joi from 'joi';

const timeIn = async (req, res, next) => {
    const condition = Joi.object({
        userId: Joi.string().required(),
        date: Joi.date().required(),
        fullName: Joi.string(),
        email: Joi.string().email().required(),
        timeIn: Joi.date(),
    });

    try {
        await condition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(400).json({
            errors: new Error(error).message,
        });
    }
};

export const timesheetsValidation = { timeIn };
