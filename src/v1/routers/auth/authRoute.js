import express from 'express';
import { authController } from '../../controllers/auth/authController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { authService } from '../../services/auth/authService.js';
import { authValidation } from '../../validations/auth/authValidation.js';

const router = express.Router();

router.post('/login', authValidation.login, authController.login);
router.post('/refresh', authService.requestRefreshToken);
router.post('/logout', authMiddleware.verifyToken, authController.logout);

export default router;
