import { userService } from '../../services/user/userService.js';

const register = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await userService.getUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await userService.updateUser(userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.message,
        });
    }
};

export const userController = { register, getUser, getAllUser, updateUser };
