import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB CONNECTED!!");
    } catch (err) {
        console.error("FAILED TO CONNECT TO DB -", err);
    }
};

export default { connect: connectDB };
