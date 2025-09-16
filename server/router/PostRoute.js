import express from 'express';
import {
    createPost,
    getPostsByClub,
    updatePost,
    deletePost,
    rsvpToPost,
    cancelRsvp
} from '../controllers/PostController.js';

// Import both admin and student authentication middleware
import { adminAuth, studentAuth } from '../middlewares/Auth.js';


const router = express.Router();

// --- Admin-Only Routes ---

// @route   POST /api/posts/create
// @desc    Create a new post for the admin's club
// @access  Private (Admins only)
router.post('/create', adminAuth, createPost);

// @route   PUT /api/posts/:postId
// @desc    Update a post
// @access  Private (Admins only)
router.put('/:postId', adminAuth, updatePost);

// @route   DELETE /api/posts/:postId
// @desc    Delete a post
// @access  Private (Admins only)
router.delete('/:postId', adminAuth, deletePost);


// --- Student-Only Routes ---

// @route   POST /api/posts/:postId/rsvp
// @desc    RSVP to a post/event
// @access  Private (Students only)
router.post('/:postId/rsvp', studentAuth, rsvpToPost);

// @route   POST /api/posts/:postId/cancel-rsvp
// @desc    Cancel an RSVP to a post/event
// @access  Private (Students only)
router.post('/:postId/cancel-rsvp', studentAuth, cancelRsvp);


// --- Public Route ---

// @route   GET /api/posts/club/:clubId
// @desc    Get all posts for a specific club
// @access  Public
router.get('/club/:clubId', getPostsByClub);

export default router;