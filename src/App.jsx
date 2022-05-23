import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div className='bg-all'></div>
      <div className="logo-load"><h2 className='loading-text'>Loading</h2></div>
      <div className="logo-load spinning"></div>
      <div className='bg-cover'>
        <img className='bg' src='/assets/img/cover.png'></img>
        <img className='ball' src='/assets/img/ball.png'></img>
      </div>
      <Outlet />
    </>
  )
}

export default App
