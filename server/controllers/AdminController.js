import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/AdminSchema.js";
import Club from "../models/ClubSchema.js";
import Conversation from "../models/ConversationSchema.js";

// A helper function to create a JWT
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const adminregister = async (req, res) => {
  const { name, password, phone, email, clubName, securityKey } = req.body;

  if (!name || !password || !phone || !email || !clubName || !securityKey) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (process.env.ADMIN_SECURITY_KEY !== securityKey) {
    return res.status(401).json({ message: "Invalid security key" });
  }

  const session = await mongoose.startSession();

  try {
    let newAdmin, newClub, newConversation;

    await session.withTransaction(async () => {
      // --- Duplicate Checks ---
      const existingAdminByEmail = await Admin.findOne({ email }).session(session);
      if (existingAdminByEmail) {
        throw { statusCode: 409, message: "Email already registered" };
      }

      const existingAdminByPhone = await Admin.findOne({ phone }).session(session);
      if (existingAdminByPhone) {
        throw { statusCode: 409, message: "Phone number already registered" };
      }

      const existingClub = await Club.findOne({ name: clubName }).session(session);
      if (existingClub) {
        throw { statusCode: 409, message: "Club name already taken" };
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      // --- Create Documents ---
      newAdmin = new Admin({ name, email, phone, password: hashedPassword, role: "admin" });
      newClub = new Club({ name: clubName, description: `Official club for ${clubName}.`, admin: newAdmin._id });
      newAdmin.club = newClub._id;

      // --- NEW CHAT LOGIC ---
      // 1. Create a new conversation for the club
      newConversation = new Conversation({
        participants: [newAdmin._id], // Add the admin as the first participant
      });
      await newConversation.save({ session });

      // 2. Link the conversation to the club
      newClub.conversationId = newConversation._id;
      // --- END NEW CHAT LOGIC ---

      await newAdmin.save({ session });
      await newClub.save({ session });
    });

    const token = createToken(newAdmin._id);

    return res.status(201).json({
      message: "Admin, Club, and Group Chat registered successfully",
      token,
      adminId: newAdmin._id,
      clubId: newClub._id,
      conversationId: newConversation._id,
    });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal Server Error" : err.message;
    return res.status(statusCode).json({ message, error: err.message });
  } finally {
    if (session) await session.endSession();
  }
};

const adminlogin = async (req, res) => {
  // No errors found, this function is well-written.
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingAdmin = await Admin.findOne({ email }).populate(
      "club",
      "name"
    );
    if (!existingAdmin) {
      return res
        .status(404)
        .json({ message: "Admin not found with this email" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(existingAdmin._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: existingAdmin._id,
        name: existingAdmin.name,
        email: existingAdmin.email,
        club: existingAdmin.club,
        role: existingAdmin.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const AdminProfile = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!clubId) {
      return res.status(400).json({ message: "Club ID is required" });
    }

    const adminid = await ClubSchema.findById(clubId).select("admin");

    const admin = await Admin.findById(adminid.admin).populate(
      "club",
      "name description"
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const responseData = {
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      club: {
        club_name: admin.club.name, // Map `name` to `club_name` here
        description: admin.club.description,
      },
    };

    res
      .status(200)
      .json({
        message: "Admin profile fetched successfully",
        admin: responseData,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const dashboard = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!clubId) {
      return res.status(400).json({ message: "Club ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID format" });
    }

    const club = await Club.findById(clubId).select("name description members ");

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({
      message: "Admin dashboard data",
      club,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { adminregister, adminlogin, AdminProfile, dashboard };
