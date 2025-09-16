import mongoose from 'mongoose';
import Post from '../models/PostSchema.js';
import Admin from '../models/AdminSchema.js';
import Club from '../models/ClubSchema.js';


export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const authorId = req.user.id; 

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

       
        const admin = await Admin.findById(authorId);
        if (!admin || !admin.club) {
            return res.status(403).json({ message: 'Admin not found or not associated with a club' });
        }

        const newPost = await Post.create({
            title,
            description,
            author: authorId,
            club: admin.club
        });

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const getPostsByClub = async (req, res) => {
    try {
        const { clubId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            return res.status(400).json({ message: 'Invalid club ID format' });
        }

        const posts = await Post.find({ club: clubId })
            .populate('author', 'name') // Populate author's name
            .sort({ createdAt: -1 }); // Show newest posts first

        // Add an RSVP count to each post
        const postsWithRsvpCount = posts.map(post => ({
            ...post.toObject(),
            rsvpCount: post.rsvps.length
        }));

        res.status(200).json({ message: 'Posts fetched successfully', posts: postsWithRsvpCount });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, description } = req.body;
        const adminId = req.user.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Authorization check: Is the logged-in admin the author of the post?
        if (post.author.toString() !== adminId) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        post.title = title || post.title;
        post.description = description || post.description;
        const updatedPost = await post.save();

        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// --- ADMIN: DELETE A POST ---
// Protected route. Only the admin who created the post can delete it.
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const adminId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Authorization check
        if (post.author.toString() !== adminId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// --- STUDENT: RSVP TO A POST ---
// Protected route for students. Assumes req.user.id is the student's ID.
export const rsvpToPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const studentId = req.user.id; // From your student authentication middleware

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if student has already RSVP'd
        if (post.rsvps.includes(studentId)) {
            return res.status(409).json({ message: 'You have already RSVP\'d to this event' });
        }

        post.rsvps.push(studentId);
        await post.save();

        res.status(200).json({ message: 'RSVP successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// --- STUDENT: CANCEL AN RSVP ---
// Protected route for students.
export const cancelRsvp = async (req, res) => {
    try {
        const { postId } = req.params;
        const studentId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if student has an RSVP to cancel
        if (!post.rsvps.includes(studentId)) {
            return res.status(400).json({ message: 'You have not RSVP\'d to this event' });
        }

        // Use .pull() to remove the student's ID from the array
        post.rsvps.pull(studentId);
        await post.save();

        res.status(200).json({ message: 'Your RSVP has been cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};