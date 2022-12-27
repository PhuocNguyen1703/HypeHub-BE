import { userModel } from '../../models/user/userModel.js';
import bcrypt from 'bcrypt';

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
        throw new Error(error);
    }
};

export const userService = { register };
