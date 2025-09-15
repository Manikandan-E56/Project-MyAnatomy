import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
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
    phone: { 
        type: String, 
        required: true, 
        unique: true 
    },
    
    // --- CHANGE IS HERE ---
    // An admin is now associated with only ONE club.
    // The field is no longer an array.
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true ,
    },
    
    role: { 
        type: String, 
        required: true,
        default: 'admin'
    }
}, {
    timestamps: true
});

export default mongoose.model('Admin', adminSchema);