import Student from '../models/StudentSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });
};

// --- STUDENT REGISTER ---
const register = async (req, res) => {
    try {
        const { name, rollNo, email, password, role } = req.body;

        if (!name || !rollNo || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingStudent = await Student.findOne({ $or: [{ email }, { rollNo }] });
        if (existingStudent) {
            const message = existingStudent.email === email 
                ? 'Email is already registered' 
                : 'Roll number is already registered';
            return res.status(409).json({ message }); // 409 Conflict is more specific
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newStudent = await Student.create({
            name,
            rollNo,
            email,
            password: hashedPassword,
            role: role || 'student' 
        });

       
        const token = createToken(newStudent._id);

      
        return res.status(201).json({
            message: 'Student registered successfully',
            token,
            student: {
                id: newStudent._id,
                name: newStudent.name,
                email: newStudent.email,
                rollNo: newStudent.rollNo
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// --- STUDENT LOGIN ---
const login = async (req, res) => {
    try {
        const { rollNo, password } = req.body;

        if (!rollNo || !password) {
            return res.status(400).json({ message: 'Roll number and password are required' });
        }

     
        const existingStudent = await Student.findOne({ rollNo }).populate('clubs', 'name description');
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student with this roll number not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingStudent.password);
        if (!isPasswordCorrect) {
         
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = createToken(existingStudent._id);

      
        return res.status(200).json({
            message: 'Login successful',
            token,
            student: {
                id: existingStudent._id,
                name: existingStudent.name,
                email: existingStudent.email,
                rollNo: existingStudent.rollNo,
                clubs: existingStudent.clubs // Array of joined clubs
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

export { login, register };