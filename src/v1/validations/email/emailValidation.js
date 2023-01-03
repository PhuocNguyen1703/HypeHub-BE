import Joi from 'joi';

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        sender: Joi.string().email().required().trim(),
        receiver: Joi.string().email().required().trim(),
        subject: Joi.string().trim(),
        content: Joi.string(),
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
        subject: Joi.string().trim(),
        content: Joi.string().trim(),
        status: Joi.object({
            watched: Joi.boolean(),
            star: Joi.boolean(),
            spam: Joi.boolean(),
        }),
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

export const emailValidation = { createNew, update };
