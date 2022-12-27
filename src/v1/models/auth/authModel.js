import Joi from 'joi';
import { getDB } from '../../../../config/mongodb.js';

const authCollectionName = 'users';
const userSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(3).max(20).required().trim(),
    firstName: Joi.string().default(null),
    lastName: Joi.string().default(null),
    fullName: Joi.string().default(null),
    isAdmin: Joi.boolean().default(false),
    avatar: Joi.string().default(null),
    banner: Joi.string().default(null),
    birth: Joi.date().default(null),
    gender: Joi.string().default(null),
    hashtag: Joi.string().default(null),
    livesIn: Joi.string().default(null),
    phone: Joi.number().default(null),
    position: Joi.string().default(null),
    streetAddress: Joi.string().default(null),
    faceId: Joi.string().default(null),
    _destroy: Joi.boolean().default(false),
});

const login = async (email) => {
    try {
        const result = await getDB().collection(authCollectionName).find({ email: email }).toArray();

        return result[0];
    } catch (error) {
        throw new Error(error);
    }
};

export const authModel = { login };
