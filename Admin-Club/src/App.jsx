// src/App.jsx

import React from "react";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import PostCreate from "./pages/PostCreate";


function App() {
  return (
    <>
      
      <BrowserRouter>
        <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/postcreate" element={<PostCreate />} />
           
          </Routes>
       </BrowserRouter>
    </>
    
  );
}

export default App;
