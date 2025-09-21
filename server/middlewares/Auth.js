// authetication
import jwt from 'jsonwebtoken';
import Admin from '../models/AdminSchema.js';
import Student from '../models/studentSchema.js';


// A single middleware to handle authentication for both roles
export const authMiddleware = (requiredRole) => async (req, res, next) => {
    try {
        // 1. Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided, authorization denied.' });
        }
        const token = authHeader.split(' ')[1];

        // 2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find the user (check both collections)
        let user = await Admin.findById(decoded.id) || await Student.findById(decoded.id);

        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // 4. Check if the user's role matches the required role
        if (requiredRole && user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
        }

        // 5. Attach user info to the request object
        req.user = {
            id: user._id,
            role: user.role,
        };
        
        
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid.', error: error.message });
    }
};

// You can then export specific versions for convenience in your routes
export const adminAuth = authMiddleware('admin');
export const studentAuth = authMiddleware('student');