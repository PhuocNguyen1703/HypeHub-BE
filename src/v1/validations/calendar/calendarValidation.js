import Joi from 'joi';

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        userId: Joi.string().required(),
        title: Joi.string().min(3).max(20).trim().required(),
        type: Joi.string(),
        date: Joi.date(),
        startTime: Joi.string(),
        endTime: Joi.string(),
        content: Joi.string(),
        theme: Joi.string(),
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

const update = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(3).max(20).trim(),
    });

    try {
        await condition.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
        next();
    } catch (error) {
        res.status(400).json({
            errors: new Error(error).message,
        });
    }
};

export const calendarValidation = { createNew, update };
