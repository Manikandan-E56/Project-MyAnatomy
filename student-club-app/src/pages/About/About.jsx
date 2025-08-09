import React from 'react'
import './About.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function About() {
  return (
    <div className="about-page">
    <Header />
        <div className='about-container'>
            <h1>About Us</h1>
            <p>Welcome to our student club app! This platform is designed to connect students with various clubs and events happening on campus. Whether you're looking to join a club, participate in events, or simply learn more about what's available, this app has got you covered.</p>
            <h2>Features</h2>
            <ul>
                <li>Browse and join clubs</li>
                <li>Stay updated with upcoming events</li>
                <li>Connect with fellow students</li>
                <li>Manage your club memberships</li>
            </ul>
            <h2>Contact Us</h2> 
            <p>If you have any questions or feedback, feel free to reach out to us at <a href=''>student@gmail.com</a> </p>

            </div>
            <Footer/>
    </div>
  )
}
