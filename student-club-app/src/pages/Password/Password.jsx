import React, { useState } from "react";
import Header from "../../components/Header/Header"; // Assuming this path is correct
import "./Password.css";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";

export default function Password() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
   
    console.log("Attempting to change password with:", {
      currentPassword,
      newPassword,
    });
    toast.success("Password change request submitted!");
  };

  return (
    <div className="password-page">
      <Header />
      <div className="password-container">
        
        <div className="user-info">
          <h1>User Details</h1>
          <div className="info-item">
            <label>Name:</label>
            <span>Alice</span>
          </div>
          <div className="info-item">
            <label>Roll No:</label>
            <span>7178221234</span>
          </div>
        </div>

        
        <form className="change-password-form" onSubmit={handleSubmit}>
          <h2>Change Password</h2>
          <div className="form-group">
            <label htmlFor="current-pass">Current Password</label>
            <input
              type="password"
              id="current-pass"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-pass">New Password</label>
            <input
              type="password"
              id="new-pass"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-pass">Confirm New Password</label>
            <input
              type="password"
              id="confirm-pass"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="changepass-btn" type="submit">
            Update Password
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}