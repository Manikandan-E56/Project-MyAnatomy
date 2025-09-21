import express from 'express';
import { getAllClubs, getClubById, getClubMembers, joinClub,  removeStudentFromClub } from '../controllers/ClubController.js';
import { adminAuth, studentAuth } from '../middlewares/Auth.js'; // Middleware to protect student routes

const router = express.Router();

// @route   GET /api/clubs
// @desc    Get a list of all clubs
// @access  Public
router.get('/', getAllClubs);

// @route   GET /api/clubs/:clubId
// @desc    Get detailed information for a single club
// @access  Public
router.get('/:clubId',studentAuth, getClubById);

// @route   POST /api/clubs/:clubId/join
// @desc    Allow a logged-in student to join a club
// @access  Private (Students only)
router.post('/:clubId/join', studentAuth, joinClub);

// @route   POST /api/clubs/:clubId/leave
// @desc    Allow a logged-in student to leave a club
// @access  Private (Students only)
router.delete('/admin/:clubId/remove/:studentId', adminAuth, removeStudentFromClub);


router.get('/admin/members/:clubId', adminAuth, getClubMembers);

export default router;