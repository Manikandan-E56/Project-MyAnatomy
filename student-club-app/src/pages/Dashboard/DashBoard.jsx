import React from 'react'
import Header from '../../components/Header/Header';
import './DashBoard.css'; // Assuming you have a CSS file for styling
export default function DashBoard() {
  return (
    <div>
        <Header/>
        <div className="home">
          <div className="header_text">
            <h1>Discover Amazing Student Clubs</h1>
          </div>
          <img src="/dashbg.png" alt="" />
        </div>
        
        
    </div>
  )
}
