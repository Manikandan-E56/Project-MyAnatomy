import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        required: true 
    },

   
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin',
        required: true,
        unique: true 
    },

    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student'
    }],
}, {
    timestamps: true
});

export default mongoose.model('Club', clubSchema);