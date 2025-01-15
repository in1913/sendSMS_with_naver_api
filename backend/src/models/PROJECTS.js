import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true
    },
    projectdesc: {
        type: String
    },
    sms_yn: {
        type: Boolean,
        default: false
    },
    push_yn: {
        type: Boolean,
        default: false
    },
    fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USERS',
        required: true
    },
    createdon: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 9); // 한국 시간대(KST)로 설정
            return now;
        }
    }
}, { collection: 'PROJECTS' });

export default mongoose.model('PROJECTS', projectSchema);