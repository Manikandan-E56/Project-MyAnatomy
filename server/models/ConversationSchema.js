import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    // An array of user IDs participating in the conversation
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin", // Or "User" if you have a general user model
      },
    ],
    // The last message sent in the conversation, for quick previews
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId },
      createdAt: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
