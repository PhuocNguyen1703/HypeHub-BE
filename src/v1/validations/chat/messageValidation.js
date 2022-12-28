import Joi from 'joi';

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        chatId: Joi.string().required(),
        senderId: Joi.string().required(),
        content: Joi.string(),
        fileUrl: Joi.string(),
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
        content: Joi.string(),
        fileUrl: Joi.string(),
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

export const messageValidation = { createNew, update };
