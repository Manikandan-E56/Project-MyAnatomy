import React from 'react'
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import './Posts.css';
export default function Posts() {
  return (
    
        <div className="posts-container">
        <Header/>
            <h1>Posts Page</h1>
            <p>This is where you can view and manage posts related to student clubs.</p>
            
            <Footer/>
        </div>
    
  )
}
