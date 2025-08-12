import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    clubname: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

export default mongoose.model('Admin', adminSchema);
