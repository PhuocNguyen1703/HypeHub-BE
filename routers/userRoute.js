import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser, updateUserFaceID } from '../controllers/userController.js';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/', getAllUsers);
router.put('/:id', verifyToken, updateUser);
router.patch('/:id', verifyToken, updateUserFaceID);
router.delete('/:id', verifyTokenAndUserAuthorization, deleteUser);

export default router;
