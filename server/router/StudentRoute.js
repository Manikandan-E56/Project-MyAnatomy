import express from 'express';
import { register, login, GetStudentProfile,StudentMyClubs, dashboard } from '../controllers/studentController.js';
import { studentAuth } from '../middlewares/Auth.js';


const router = express.Router();


router.post('/register', register);


router.post('/login', login);

router.get('/dashboard/:stdId',studentAuth, dashboard);

router.get('/profile/:stdId',studentAuth, GetStudentProfile);

router.get('/myclubs/:stdId',studentAuth, StudentMyClubs);


export default router;