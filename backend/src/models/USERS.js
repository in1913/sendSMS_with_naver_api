import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    position:{
        type: String
    },
    createdon: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 9); // 한국 시간대(KST)로 설정
            return now;
        }
    }
}, { collection: 'USERS' });

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    try {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (err) {
        next(err);
    }
});


export default mongoose.model('USERS', userSchema);

