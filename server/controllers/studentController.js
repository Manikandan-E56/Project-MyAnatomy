const express = require('express');
const Student = require('../models/studentSchema');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

const register = async (req, res) => {

    try {
        const { name, registerNumber, email, password } = req.body;

        if (!name || !registerNumber || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (typeof name !== 'string' || name.trim() === "") {
            return res.status(400).json({ message: 'Invalid name' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingStudent = await Student.findOne({ email })
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newStudent = await Student.create({ name, registerNumber, email, password: hashedPassword });
        console.log("Student created:", newStudent);
        return res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }

}

const login = async (req, res) => {
    try {
        const { registerNumber, password } = req.body;

        if(registerNumber === "" || registerNumber.trim() === "" || password === "" || password.trim() === "") {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const exisitingStudent = await Student.findOne({ registerNumber});
        if(exisitingStudent) {
            const checkPassword = await bcrypt.compare(password, exisitingStudent.password);
            if(checkPassword) {
                return res.status(200).json({ message: 'Login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ message: 'Student not found' });
        }
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}


module.exports = { register, login };