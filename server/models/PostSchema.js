import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
   
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },

    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true,
    },
 
    rsvps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
}, {
    timestamps: true
});

export default mongoose.model('Post', postSchema);