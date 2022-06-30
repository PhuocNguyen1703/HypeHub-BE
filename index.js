import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routers/authRoute.js';
import userRoute from './routers/userRoute.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_DB, () => {
    console.log('Connected to Mongo DB');
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);

app.listen(process.env.PORT, () => {
    console.log('server is running');
});
