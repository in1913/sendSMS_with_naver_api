import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .catch((error) => {
        console.log('Error connecting to MongoDB');
    })
    .then(() => {
        console.log('Connected to MongoDB');
    });
};

mongoose.connection.on('error', (error) => {
    console.log('Error connecting to MongoDB');
});

export default connect;