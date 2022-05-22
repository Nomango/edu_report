import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="preloader"></div>
      <div className="block-1"></div>
      <div className="block-2"></div>
      <div className="logo-load"><img src="assets/img/logo.svg" alt="" /></div>
      <div className="logo-load spinning"></div>
      {/* <div className="bg-all"></div> */}
      <div className="over-all"></div>
      <Outlet />
    </>
  )
}

export default App
