import express from 'express';
import { loginUser, logOut, registerUser, requestRefreshToken } from '../../controllers/authControllers.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/refresh', requestRefreshToken);
router.post('/logout', verifyToken, logOut);

export default router;