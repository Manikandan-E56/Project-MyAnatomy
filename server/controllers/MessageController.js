import Message from '../models/MessageSchema.js';
import Club from '../models/ClubSchema.js';
import Conversation from '../models/ConversationSchema.js';

// --- GET MESSAGES (with sender name) ---
const getClubMessages = async (req, res) => {
  try {
    const { clubId } = req.params;

    const club = await Club.findById(clubId);
    if (!club || !club.conversationId) {
      return res.status(200).json([]); // No conversation yet
    }

    const messages = await Message.find({ conversationId: club.conversationId })
      .populate({ path: "sender", select: "name" }) // ✅ populate name
      .sort({ createdAt: "asc" });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
};

// --- POST MESSAGE (with sender name) ---
const postClubMessage = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { sender, content, senderModel } = req.body;

    if (!sender || !content || !senderModel) {
      return res.status(400).json({ message: "Sender, content, and senderModel are required" });
    }
    if (!["Student", "Admin"].includes(senderModel)) {
      return res.status(400).json({ message: "Invalid sender model" });
    }

    const club = await Club.findById(clubId);
    if (!club || !club.conversationId) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    // Save message
    const newMessage = new Message({
      conversationId: club.conversationId,
      sender,
      content,
      senderModel,
    });
    await newMessage.save();

    // Update conversation lastMessage
    await Conversation.findByIdAndUpdate(club.conversationId, {
      lastMessage: {
        content,
        sender,
        createdAt: new Date(),
      },
    });

    // Populate sender name
    const savedMessage = await Message.findById(newMessage._id)
      .populate({ path: "sender", select: "name" });

    // Broadcast via socket.io
    const io = req.app.get("socketio");
    if (io) {
      io.to(club.conversationId.toString()).emit("receiveMessage", savedMessage);
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to post message", error: error.message });
  }
};

// GET /api/admin/myclub/:clubId
const getAdminClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.status(200).json({ club });
  } catch (error) {
    res.status(500).json({ message: "Error fetching club", error: error.message });
  }
};

export { getClubMessages, postClubMessage, getAdminClub };
