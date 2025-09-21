import express from 'express';
import { adminregister, adminlogin, AdminProfile,dashboard } from '../controllers/AdminController.js';
import { adminAuth } from '../middlewares/Auth.js';

const router = express.Router();

// @route   POST /api/admins/register
// @desc    Register a new admin and their club
// @access  Public
router.post('/register', adminregister);

// @route   POST /api/admins/login
// @desc    Log in an admin
// @access  Public
router.post('/login', adminlogin);

router.get('/dashboard/:clubId',adminAuth, dashboard);

router.get('/profile/:clubId',adminAuth, AdminProfile);

export default router;