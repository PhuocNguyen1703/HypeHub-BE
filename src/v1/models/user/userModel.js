import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../../../../config/mongodb.js';

const userCollectionName = 'users';
const userSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(8).required().trim(),
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
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await userSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(userCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const register = async (data) => {
    const { email } = data;

    try {
        const oldUser = await getDB().collection(userCollectionName).find({ email: email }).toArray();

        if (oldUser.length >= 1) throw 'User already exists';

        const validatedValue = await validateSchema(data);
        const newUser = await getDB().collection(userCollectionName).insertOne(validatedValue);

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};

const getUser = async (userId) => {
    try {
        const user = await getDB()
            .collection(userCollectionName)
            .find({ _id: ObjectId(userId) })
            .toArray();

        return user[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getAllUser = async () => {
    try {
        const result = await getDB().collection(userCollectionName).find().toArray();
        return result || [];
    } catch (error) {
        throw new Error(error);
    }
};

const updateUser = async (userId, data) => {
    try {
        const updateData = { ...data };

        const result = await getDB()
            .collection(userCollectionName)
            .findOneAndUpdate({ _id: ObjectId(userId) }, { $set: updateData }, { returnDocument: 'after' });

        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const userModel = { userCollectionName, findOneById, register, getUser, getAllUser, updateUser };
