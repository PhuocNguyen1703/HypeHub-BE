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

export const userController = { register };
