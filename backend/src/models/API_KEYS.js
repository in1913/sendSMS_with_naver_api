import mongoose from "mongoose";

const apikeySchema = new mongoose.Schema({
    accessKey: {
        type: String,
        required: true,
        unique: true
    },
    secretKey: {
        type: String,
        required: true,
        unique: true
    },
    fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USERS',
        required: true,
    },
    createdon: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 9); // 한국 시간대(KST)로 설정
            return now;
        }
    }
}, { collection: 'API_KEYS' });

export default mongoose.model('API_KEYS', apikeySchema);