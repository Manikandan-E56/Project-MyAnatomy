// src/App.jsx

import React from "react";
import Login from "./components/Stlogin/Login";
import SignUp from "./components/Stlogin/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashBoard from "./pages/Dashboard/DashBoard";
import Password from "./pages/Password/Password";
import About from "./pages/About/About";
import Posts from "./pages/Posts/Posts";
import Clubs from "./pages/Clubs/Clubs";
import { ToastContainer } from "react-toastify";
import StudentProvider from "./Context/StudentContext";
import Alogin from './components/Login/Login'
import Asignup from './components/Login/Login'
import PostCreate from './pages/PostCreate/PostCreate'
import ClubMember from "./pages/Clubemember/ClubMember";

import Settings from './pages/Settings/Settings'

function App() {
  return (
    <>
      <BrowserRouter>
      <StudentProvider>
        <ToastContainer />
          <Routes>
            
            {/* Admin */}

             <Route path="/post" element={<Posts />} />
            <Route path="/Adminlogin" element={<Alogin />} />
            <Route path="/createAdmin" element={<Asignup />} />
            <Route path="/postcreate" element={<PostCreate />} />
            <Route path="/clubmember" element={<ClubMember />} />
            <Route path="/settings" element={<Password />} />

            {/* Student */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/password" element={<Password />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/posts" element={<Posts />} />
            <Route path="/clubs" element={<Clubs />} />
          </Routes>
        </StudentProvider>
      </BrowserRouter>
    </>
    
  );
}

export default App;
