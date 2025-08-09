import React from 'react'
import './Footer.css';

export default function Footer() {
  return (
    <>
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Student Club App. All rights reserved.</p>
                
            </div>
        </footer>
    </>
  )
}
