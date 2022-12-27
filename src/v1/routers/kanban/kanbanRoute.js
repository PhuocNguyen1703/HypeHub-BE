import express from 'express';
import columnRoute from './columnRoute.js';
import cardRoute from './cardRoute.js';
import boardRoute from './boardRoute.js';

const router = express.Router();

router.use('/boards', boardRoute);
router.use('/columns', columnRoute);
router.use('/cards', cardRoute);

export default router;
