import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoute from './src/v1/routers/auth/authRoute.js';
import userRoute from './src/v1/routers/userRoute.js';
import emailRoute from './src/v1/routers/emailRoute.js';
import chatRoute from './src/v1/routers/chatRoute.js';
import messageRoute from './src/v1/routers/messageRoute.js';
import todoRoute from './src/v1/routers/todoRoute.js';
import calendarRoute from './src/v1/routers/calendarRoute.js';
import uploadRoute from './src/v1/routers/uploadRoute.js';
import kanbanRoute from './src/v1/routers/kanban/kanbanRoute.js';
import timeSheetsRoute from './src/v1/routers/timeSheets.js';
import { connectDB } from './config/mongodb.js';

dotenv.config();

connectDB()
    .then(() => console.log('Connected successfully to mongoDB'))
    .then(() => bootServer())
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

//http://localhost:3000
//'https://reliable-jelly-47e173.netlify.app'
const bootServer = () => {
    const app = express();

    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
            optionsSuccessStatus: 200,
        }),
    );
    app.use(cookieParser());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    //Routes
    app.use('/v1/api/auth', authRoute);
    app.use('/v1/api/user', userRoute);
    app.use('/v1/api/email', emailRoute);
    app.use('/v1/api/chat', chatRoute);
    app.use('/v1/api/message', messageRoute);
    app.use('/v1/api/todo', todoRoute);
    app.use('/v1/api/calendar', calendarRoute);
    app.use('/v1/api/kanban', kanbanRoute);
    app.use('/v1/api/timeSheets', timeSheetsRoute);
    app.use('/v1/api/upload', uploadRoute);

    app.listen(process.env.PORT || 5000, () => {
        console.log('server is running');
    });
};
