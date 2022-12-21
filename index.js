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
import calendarRoute from './routers/calendarRoute.js';
import uploadRoute from './routers/uploadRoute.js';
import kanbanRoute from './routers/kanban/kanbanRoute.js';
import timeSheetsRoute from './routers/timeSheets.js';
import { connectDB } from './config/mongodb.js';

dotenv.config();

connectDB()
    .then(() => console.log('Connected successfully to mongoDB'))
    .then(() => bootServer())
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

// mongoose.connect(process.env.MONGO_DB, () => {
//     console.log('Connected to Mongo DB');
// });

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_DB);
//         console.log('Connected to Mongo DB');
//     } catch (error) {
//         console.log("Error, can't connect to DB");
//     }
// };
// connectDB();

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
    app.use('/api/auth', authRoute);
    app.use('/api/user', userRoute);
    app.use('/api/email', emailRoute);
    app.use('/api/chat', chatRoute);
    app.use('/api/message', messageRoute);
    app.use('/api/todo', todoRoute);
    app.use('/api/calendar', calendarRoute);
    app.use('/api/kanban', kanbanRoute);
    app.use('/api/timeSheets', timeSheetsRoute);
    app.use('/api/upload', uploadRoute);

    app.listen(process.env.PORT || 5000, () => {
        console.log('server is running');
    });
};
