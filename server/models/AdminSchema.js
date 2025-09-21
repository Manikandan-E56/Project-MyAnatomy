import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true, unique: true },

//     // Each admin belongs to ONE club
//     club: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Club",
//       required: true,
//       unique: true,
//     },

//     role: { type: String, default: "admin", required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Admin", adminSchema);


// In models/AdminSchema.js

// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true, unique: true },

//   // Each admin belongs to ONE club
//   club: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Club",
//     required: true, 
    
//   },

//   role: { type: String, default: "admin", required: true },
// }, { timestamps: true });

// export default mongoose.model("Admin", adminSchema);


// In models/AdminSchema.js


const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
  club: {
    type: mongoose.Types.ObjectId,
    ref: 'Club',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);