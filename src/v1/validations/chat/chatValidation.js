import Joi from 'joi';

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        members: Joi.array().items(Joi.string()).required(),
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

export const chatValidation = { createNew };
