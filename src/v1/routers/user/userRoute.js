import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser, updateUserFaceID } from '../../controllers/userController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);
router.patch('/:id', authMiddleware.verifyToken, updateUser);
router.patch('/:id', authMiddleware.verifyToken, updateUserFaceID);
router.delete('/:id', authMiddleware.verifyTokenAndUserAuthorization, deleteUser);

export default router;
