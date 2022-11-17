import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routers/authRoute.js';
import userRoute from './routers/userRoute.js';
import emailRoute from './routers/emailRoute.js';
import chatRoute from './routers/chatRoute.js';
import messageRoute from './routers/messageRoute.js';
import todoRoute from './routers/todoRoute.js';
import uploadRoute from './routers/uploadRoute.js';
import kanbanRoute from './routers/kanbanRoute.js';
import timeSheetsRoute from './routers/timeSheets.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_DB, () => {
    console.log('Connected to Mongo DB');
});

//http://localhost:3000
//'https://reliable-jelly-47e173.netlify.app'
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/email', emailRoute);
app.use('/chat', chatRoute);
app.use('/message', messageRoute);
app.use('/todo', todoRoute);
app.use('/kanban', kanbanRoute);
app.use('/timeSheets', timeSheetsRoute);
app.use('/upload', uploadRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('server is running');
});
