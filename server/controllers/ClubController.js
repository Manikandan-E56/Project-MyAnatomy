import mongoose from 'mongoose';
import Club from '../models/ClubSchema.js';
import Student from '../models/StudentSchema.js';

// --- GET ALL CLUBS ---
// Fetches a list of all clubs, populating the admin's name and a count of members.
export const getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find({}).populate('admin', 'name email');

        // Map over the clubs to add a member count to each object
        const clubsWithMemberCount = clubs.map(club => ({
            _id: club._id,
            name: club.name,
            description: club.description,
            admin: club.admin,
            createdAt: club.createdAt,
            memberCount: club.members.length // Calculate member count
        }));

        res.status(200).json({
            message: 'Clubs fetched successfully',
            clubs: clubsWithMemberCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// --- GET A SINGLE CLUB BY ID ---
// Fetches detailed information for one club, including a list of its members.
export const getClubById = async (req, res) => {
    try {
        const { clubId } = req.params;

        // Check for a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            return res.status(400).json({ message: 'Invalid club ID format' });
        }

        const club = await Club.findById(clubId)
            .populate('admin', 'name email') // Get admin details
            .populate('members', 'name rollNo email'); // Get details of all members

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        res.status(200).json({
            message: 'Club details fetched successfully',
            club
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// --- STUDENT JOINS A CLUB ---
// This is a protected route. Assumes `req.user.id` is available from auth middleware.
export const joinClub = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const { clubId } = req.params;
            const studentId = req.user.id; // From your authentication middleware

            if (!mongoose.Types.ObjectId.isValid(clubId)) {
                return res.status(400).json({ message: 'Invalid club ID format' });
            }

            const club = await Club.findById(clubId).session(session);
            const student = await Student.findById(studentId).session(session);

            if (!club) {
                return res.status(404).json({ message: 'Club not found' });
            }
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            // Check if student is already a member
            if (club.members.includes(studentId)) {
                return res.status(409).json({ message: 'You are already a member of this club' });
            }

            // Perform the two-way update
            club.members.push(studentId);
            student.clubs.push(clubId);

            await club.save({ session });
            await student.save({ session });
        });

        res.status(200).json({ message: 'Successfully joined the club!' });

    } catch (error) {
        // Check if it's a known error to avoid sending a generic 500
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } finally {
        await session.endSession();
    }
};


// --- STUDENT LEAVES A CLUB ---
// This is a protected route. Assumes `req.user.id` is available from auth middleware.
export const leaveClub = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const { clubId } = req.params;
            const studentId = req.user.id; // From your authentication middleware

             if (!mongoose.Types.ObjectId.isValid(clubId)) {
                return res.status(400).json({ message: 'Invalid club ID format' });
            }

            const club = await Club.findById(clubId).session(session);
            const student = await Student.findById(studentId).session(session);

            if (!club) {
                return res.status(404).json({ message: 'Club not found' });
            }
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            // Check if student is NOT a member
            if (!club.members.includes(studentId)) {
                return res.status(400).json({ message: 'You are not a member of this club' });
            }

            // Perform the two-way removal
            // .pull() is a special Mongoose method to remove an item from an array
            club.members.pull(studentId); 
            student.clubs.pull(clubId);

            await club.save({ session });
            await student.save({ session });
        });

        res.status(200).json({ message: 'Successfully left the club.' });

    } catch (error) {
         if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } finally {
        await session.endSession();
    }
};