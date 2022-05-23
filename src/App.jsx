import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div className='bg-all'></div>
      <div className="logo-load"><h2 className='loading-text'>Loading</h2></div>
      <div className="logo-load spinning"></div>
      {/* <div className="over-all"></div> */}
      <Outlet />
    </>
  )
}

export default App
