// import mongoose from 'mongoose';

// const clubSchema = new mongoose.Schema({
//     name: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
//     description: { 
//         type: String, 
//         required: true 
//     },

   
//     admin: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Admin',
//         required: true,
//         unique: true 
//     },

//     members: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Student'
//     }],
// }, {
//     timestamps: true
// });

// export default mongoose.model('Club', clubSchema);



import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    // Each club has ONE admin
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
     conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Club", clubSchema);
