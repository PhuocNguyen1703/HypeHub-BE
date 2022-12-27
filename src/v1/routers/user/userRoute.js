import express from 'express';
import { userController } from '../../controllers/user/userController.js';
import { deleteUser, getAllUsers, getUser, updateUser, updateUserFaceID } from '../../controllers/userController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { userValidation } from '../../validations/user/userValidation.js';

const router = express.Router();

router.post('/register', userValidation.register, userController.register);
router.get('/:id', getUser);
router.get('/', getAllUsers);
router.patch('/:id', authMiddleware.verifyToken, updateUser);
router.patch('/:id', authMiddleware.verifyToken, updateUserFaceID);
router.delete('/:id', authMiddleware.verifyTokenAndUserAuthorization, deleteUser);

export default router;
