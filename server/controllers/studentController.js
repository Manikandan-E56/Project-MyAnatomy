import Student from '../models/studentSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });
};

const register = async (req, res) => {
    try {
        const { name, rollNo, email, password } = req.body;

        if (!name || !rollNo || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Invalid name' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newStudent = await Student.create({ name, rollNo, email, password: hashedPassword });

        console.log('Student created:', newStudent);
        const token = createToken(newStudent._id);

        return res.status(201).json({ message: 'Student registered successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { rollNo, password } = req.body;

        if (!rollNo || !password || rollNo.trim() === '' || password.trim() === '') {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const existingStudent = await Student.findOne({ rollNo });
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const checkPassword = await bcrypt.compare(password, existingStudent.password);
        if (!checkPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = createToken(existingStudent._id);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

export { login, register };
