import Joi from 'joi';

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        boardId: Joi.string().required(),
        columnId: Joi.string().required(),
        title: Joi.string().required().min(3).max(50).trim(),
        label: Joi.string().max(10).trim().allow(''),
        tagColor: Joi.string(),
        description: Joi.string().allow('').trim(),
        cover:Joi.string().allow('')
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
        title: Joi.string().min(3).max(50).trim(),
        boardId: Joi.string(),
        columnId: Joi.string(),
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

export const cardValidation = { createNew, update };
