import React from 'react'
import './Header.css'; // Assuming you have a CSS file for styling

export default function Header() {
  return (
    <>
        <header>
            <div className="navcontent">
                <img src="/slack.png" alt="" />
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Clubs</li>
                    <li>Events</li>
                    
                </ul>
                <button>sign in</button>
            </div>
        </header>
    </>
  )
}
