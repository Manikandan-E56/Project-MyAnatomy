import express from 'express';
import { adminregister, adminlogin } from '../controllers/AdminController.js';

const router = express.Router();

// @route   POST /api/admins/register
// @desc    Register a new admin and their club
// @access  Public
router.post('/register', adminregister);

// @route   POST /api/admins/login
// @desc    Log in an admin
// @access  Public
router.post('/login', adminlogin);

export default router;