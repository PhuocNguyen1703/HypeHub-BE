import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routers/authRoute.js';
import userRoute from './routers/userRoute.js';
import ChatRoute from './routers/chatRoute.js';
import MessageRoute from './routers/messageRoute.js';
import UploadRoute from './routers/uploadRoute.js';
import KanbanRoute from './routers/kanbanRoute.js';
import TimeSheetsRoute from './routers/timeSheets.js';

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
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
app.use('/upload', UploadRoute);
app.use('/kanban', KanbanRoute);
app.use('/timeSheets', TimeSheetsRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('server is running');
});
