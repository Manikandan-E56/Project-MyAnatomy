import express from 'express';
import {
    createPost,
    getPostsByadmin,
    getPostsByClubs,
    updatePost,
    deletePost,
    rsvpToPost,
    cancelRsvp
} from '../controllers/PostController.js';

// Import both admin and student authentication middleware
import { adminAuth, studentAuth } from '../middlewares/Auth.js';


const router = express.Router();


router.post('/create', adminAuth, createPost);


// router.put('/:postId', adminAuth, updatePost);


// router.delete('/:postId', adminAuth, deletePost);


// --- Student-Only Routes ---


router.post('/:postId/rsvp', studentAuth, rsvpToPost);


router.post('/:postId/cancel-rsvp', studentAuth, cancelRsvp);


// --- Public Route ---

router.get('/student/:stdId', getPostsByClubs);// Example of a public route to get a post by ID')


router.get('/club/:clubId', getPostsByadmin);

export default router;