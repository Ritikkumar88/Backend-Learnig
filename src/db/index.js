import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

// databse connection
const connectDB = async () => {
    try {
        const connectionInstence = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected!!! DB host: ${connectionInstence.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error " , error);
        process.exit(1);
    }
}


export default connectDB;
