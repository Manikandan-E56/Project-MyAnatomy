import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    rollNo: { 
        type: String, 
        required: true, 
        unique: true 
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
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }],
    role: { 
        type: String, 
        required: true,
        default: 'student'
    }
}, {
    timestamps: true
});

export default mongoose.model('Student', studentSchema); 