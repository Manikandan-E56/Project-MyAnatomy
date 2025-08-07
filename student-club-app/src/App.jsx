// src/App.jsx

import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Route, Routes,BrowserRouter } from "react-router-dom";
import DashBoard from "./pages/Dashboard/DashBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/dashboard' element={<DashBoard/>}/>
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
