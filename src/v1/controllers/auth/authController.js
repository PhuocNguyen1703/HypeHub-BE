import { authService } from '../../services/auth/authService.js';

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            errors: error.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        const result = await authService.logout(req, res);
        return result;
    } catch (error) {
        res.status(404).json({
            errors: error.message,
        });
    }
};

export const authController = { login, logout };
