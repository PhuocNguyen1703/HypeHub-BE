import Joi from 'joi';

const register = async (req, res, next) => {
    const condition = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required().trim(),
        password: Joi.string().min(3).max(20).required().trim(),
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

export const userValidation = { register };
