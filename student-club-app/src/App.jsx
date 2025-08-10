// src/App.jsx

import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashBoard from "./pages/Dashboard/DashBoard";
import Password from "./pages/Password/Password";
import About from "./pages/About/About";
import Posts from "./pages/Posts/Posts";
import Clubs from "./pages/Clubs/Clubs";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/password" element={<Password />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/clubs" element={<Clubs />} />
          </Routes>
        
      </BrowserRouter>
    </>
    
  );
}

export default App;
