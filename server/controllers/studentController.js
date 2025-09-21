import Student from '../models/studentSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

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
                role: existingStudent.role,
                clubs: existingStudent.clubs 
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const GetStudentProfile = async (req, res) => { 
    try{
        const {stdId} = req.params;
       

        if (!stdId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }
        const student = await Student.findById(stdId).select('name email rollNo clubs').populate('clubs', 'name description');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student profile fetched successfully', student });


    }catch(err){
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

const StudentMyClubs = async (req, res) => {
    try {
        const { stdId } = req.params;

        if (!stdId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }

        const student = await Student.findById(stdId)
            .select('clubs') // Select only the 'clubs' field from the student
            .populate({
                path: 'clubs', // The field to populate in the Student model
                select: 'name', // Select the 'name' field from each club
                populate: {
                    path: 'admin', 
                    select: 'name email' 
                }
            });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        
        res.status(200).json({ message: 'Student clubs fetched successfully', clubs: student.clubs });

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const dashboard = async (req, res) => {
  try {
    const { stdId } = req.params;

    if (!stdId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(stdId)) {
      return res.status(400).json({ message: "Invalid student ID format" });
    }

    const student = await Student.findById(stdId).select("name");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student dashboard data",
      student,
    });
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { login, register, GetStudentProfile,StudentMyClubs, dashboard };