import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

//upload image(banner or avatar)
router.post('/images', uploadImage);

export default router;
