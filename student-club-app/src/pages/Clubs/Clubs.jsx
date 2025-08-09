import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Clubs.css'

export default function () {
  return (
    <div className='clubs-container'>
        <Header/>
        <h1>Clubs Page</h1>
        <p>This is where you can view and manage student clubs.</p>
        <Footer/>
    </div>
  )
}
