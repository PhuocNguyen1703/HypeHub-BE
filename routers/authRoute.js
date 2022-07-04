import express from 'express';
import { loginUser, logOut, registerUser, requestRefreshToken } from '../Controllers/authControllers.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/refresh', requestRefreshToken);
router.post('/logout', logOut);

export default router;
