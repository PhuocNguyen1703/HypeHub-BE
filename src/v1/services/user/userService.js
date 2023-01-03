import { userModel } from '../../models/user/userModel.js';
import bcrypt from 'bcrypt';
import cloneDeep from 'lodash/cloneDeep.js';

const register = async (data) => {
    const { password } = data;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const transformData = { ...data, password: hashed };

    try {
        const newUser = await userModel.register(transformData);
        const getNewUser = await userModel.findOneById(newUser.insertedId.toString());

        return getNewUser;
    } catch (error) {
        throw error;
    }
};

const getUser = async (userId) => {
    try {
        const user = await userModel.getUser(userId);

        if (!user) {
            throw new Error('User not found!!');
        }

        return user;
    } catch (error) {
        throw error;
    }
};

const getAllUser = async () => {
    try {
        const users = await userModel.getAllUser();

        let transformUsers = cloneDeep(users);

        //Filter deleted user
        transformUsers = transformUsers.filter((user) => !user._destroy);

        return transformUsers;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (userId, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };

        const updateUser = await userModel.updateUser(userId, updateData);

        return updateUser;
    } catch (error) {
        throw error;
    }
};

export const userService = { register, getUser, getAllUser, updateUser };
