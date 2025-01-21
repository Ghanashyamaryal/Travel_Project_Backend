import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);



const Connect = async () => {
    try {
        const db = await mongoose.connect(MONGO_URL);
        console.log(`Database connected successfully: ${db.connection.name}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

export default Connect;
