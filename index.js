import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routers/authRoute.js';
import userRoute from './routers/userRoute.js';
import ChatRoute from './routers/chatRoute.js';
import MessageRoute from './routers/messageRoute.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_DB, () => {
    console.log('Connected to Mongo DB');
});

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);

app.listen(process.env.PORT, () => {
    console.log('server is running');
});
