import React from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const Navigate = useNavigate();


  return (
    <>
      <div className="sidebar">
        <h2>Admin DashBoard</h2>
        <ul>
          <li onClick={() => Navigate("/posts")}>Posts</li>
          <li onClick={() => Navigate("/postcreate")}>Create Post</li>
          <li onClick={() => Navigate("/clubmember")}>Club Members</li>
          <li onClick={() => Navigate("/settings")}>Settings</li>
        </ul>
      </div>
    </>
  );
}