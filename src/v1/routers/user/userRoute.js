import express from 'express';
import { userController } from '../../controllers/user/userController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { userValidation } from '../../validations/user/userValidation.js';

const router = express.Router();

router.post('/register', authMiddleware.verifyTokenAndAdmin, userValidation.register, userController.register);
router.get('/:userId', authMiddleware.verifyTokenAndAdmin, userController.getUser);
router.get('/', authMiddleware.verifyToken, userController.getAllUser);
router.put(
    '/:userId',
    authMiddleware.verifyTokenAndUserAuthorization,
    userValidation.updateUser,
    userController.updateUser,
);
router.put('/remove/:userId', authMiddleware.verifyTokenAndAdmin, userController.updateUser);

export default router;
