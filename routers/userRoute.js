import express from 'express';
import { deleteUser, getUser, updateUser } from '../controllers/userController.js';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } from '../controllers/verifyToken.js';

const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyTokenAndAdmin, updateUser);
router.delete('/:id', verifyTokenAndUserAuthorization, deleteUser);

export default router;
