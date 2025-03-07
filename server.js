import express from 'express';
import mongoose from 'mongoose';
import authRouter from './auto_router.js'
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://localhost:27017/auto_user'; // Строка подключения к вашей базе данных

const app = express();

app.use(express.json());
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 
    } catch (e) {
        console.log(e);
    }
};

start();



