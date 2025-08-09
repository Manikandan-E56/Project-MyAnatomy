import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Clubs.css'

export default function () {
  return (
    <div className='clubs-container'>
        <Header/>
        <h1>Clubs</h1>
        <div className="club-items">

            <div className="clubs">
                <img src="Blood.png" alt="" />
                <h2>Blood Donation</h2>
                <p>Description of the club.</p>
                <button>Join Club</button>
            </div>
            <div className="clubs">
                <img src="dance.png" alt="" />
                <h2>Dance</h2>
                <p>Description of the club.</p>
                <button>Join Club</button>
            </div>
            


        </div>
        

        <Footer/>
    </div>
  )
}
