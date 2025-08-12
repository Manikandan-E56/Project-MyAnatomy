import Admin from '../models/AdminSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

const security_key=222333
const adminregister = async (req, res) => {
    try {
        const { name, password, phone, email, clubname,securitykey } = req.body;

        if (!name || !password || !phone || !email || !clubname) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (typeof name !== 'string' || name.trim() === "") {
            return res.status(400).json({ message: 'Invalid name' });
        }

        if(securitykey ===security_key ){
            return res.status(400).json({message:"security key was wrong"});
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newAdmin = await Admin.create({ name, password: hashedPassword, phone, email, clubname });

        console.log("Admin created:", newAdmin);
        const token = createToken(newAdmin._id);

        return res.status(201).json({ message: 'Admin registered successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const checkPassword = await bcrypt.compare(password, existingAdmin.password);
        if (!checkPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = createToken(existingAdmin._id);
        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export { adminregister, adminlogin };
