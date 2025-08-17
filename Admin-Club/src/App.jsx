// src/App.jsx

import React from "react";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/Signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import PostCreate from "./pages/PostCreate/PostCreate";
import ClubMember from "./pages/Clubemember/ClubMember";
import Posts from "./pages/Post/Posts";
import Settings from "./pages/Settings/Settings";
import AdminProvider from "./Contexts/AdminContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AdminProvider>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/postcreate" element={<PostCreate />} />
            <Route path="/clubmember" element={<ClubMember />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AdminProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
