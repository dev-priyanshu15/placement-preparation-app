import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl:string = process.env.DB_URL || '';

/**
 * Connects to the MongoDB database using Mongoose.
 * If the connection fails, it will retry after 5 seconds.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 * @throws {Error} If there's an error during the connection attempt.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`Database connected with ${data.connection.host}`)
        })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;