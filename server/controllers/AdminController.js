import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/AdminSchema.js';
import Club from '../models/ClubSchema.js'; // <-- IMPORT Club model


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

// --- ADMIN REGISTER ---
const adminregister = async (req, res) => {
   
    const session = await mongoose.startSession();

    try {
      
        await session.withTransaction(async () => {
            const { name, password, phone, email, clubName, securityKey, role } = req.body;

         
            if (!name || !password || !phone || !email || !clubName || !securityKey) {
                // Use 400 for bad request from user
                return res.status(400).json({ message: 'All fields are required' });
            }

            // IMPROVEMENT: Move security key to .env file for safety
            if (process.env.ADMIN_SECURITY_KEY !== securityKey) {
                // FIX: Logic was reversed (was ===). Use 401 for Unauthorized.
                return res.status(401).json({ message: "Invalid security key" });
            }

            // --- 2. Check for Duplicates ---
            const existingAdmin = await Admin.findOne({ email }).session(session);
            if (existingAdmin) {
                return res.status(409).json({ message: 'Email is already registered' }); // 409 Conflict is more specific
            }

            const existingClub = await Club.findOne({ name: clubName }).session(session);
            if (existingClub) {
                return res.status(409).json({ message: 'Club name is already taken' });
            }

            // --- 3. Create Documents and Link Them ---
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create the new admin document (but don't save yet)
            const newAdmin = new Admin({
                name,
                password: hashedPassword,
                phone,
                email,
                role: role || 'admin' 
               
            });

           
            const newClub = new Club({
                name: clubName,
                description: `Official club for ${clubName}.`, 
                admin: newAdmin._id 
            });

           
            newAdmin.club = newClub._id;

            
            await newAdmin.save({ session });
            await newClub.save({ session });

           
            const token = createToken(newAdmin._id);
            return res.status(201).json({
                message: 'Admin and Club registered successfully',
                token,
                adminId: newAdmin._id,
                clubId: newClub._id
            });
        });
    } catch (err) {
        
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    } finally {
        await session.endSession();
    }
};


const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingAdmin = await Admin.findOne({ email }).populate('club', 'name'); // IMPROVEMENT: Also fetch club name
        if (!existingAdmin) {
            return res.status(404).json({ message: 'Admin not found with this email' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Use 401 for bad auth
        }

        const token = createToken(existingAdmin._id);
        
        return res.status(200).json({ 
            message: 'Login successful', 
            token,
            admin: {
                id: existingAdmin._id,
                name: existingAdmin.name,
                email: existingAdmin.email,
                club: existingAdmin.club 
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export { adminregister, adminlogin };