import mongoose from 'mongoose';
import Club from '../models/ClubSchema.js';
import Student from '../models/studentSchema.js';

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

        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            return res.status(400).json({ message: 'Invalid club ID format' });
        }

        // Fetch the club but DO NOT populate the full members array
        const club = await Club.findById(clubId).populate('admin', 'name email');

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Create a response object and add the member count
        const clubResponse = {
            ...club.toObject(), // Convert mongoose doc to plain object
            memberCount: club.members.length // Add the count here
        };
        
        // Remove the members array from the response to keep it lean
        delete clubResponse.members; 

        res.status(200).json({
            message: 'Club details fetched successfully',
            club: clubResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



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
       
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } finally {
        await session.endSession();
    }
};



export const removeStudentFromClub = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { clubId, studentId } = req.params;

        // Perform the updates using findByIdAndUpdate and $pull
        const clubUpdate = await Club.findByIdAndUpdate(
            clubId,
            { $pull: { members: studentId } },
            { new: true, session }
        );

        const studentUpdate = await Student.findByIdAndUpdate(
            studentId,
            { $pull: { clubs: clubId } },
            { new: true, session }
        );

        if (!clubUpdate || !studentUpdate) {
            throw new Error("Could not find student or club to update.");
        }
        
        await session.commitTransaction();
        res.status(200).json({ message: 'Successfully removed student from the club.' });

    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ message: error.message });
    } finally {
        session.endSession();
    }
};


export const getClubMembers = async (req, res) => {
    try {
        const { clubId } = req.params;
        
       

        const club = await Club.findById(clubId)
            .populate({
                path: 'members',
                select: 'name rollNo email',
                
            });

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        res.status(200).json({
            message: 'Members fetched successfully',
            members: club.members
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};