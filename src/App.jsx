import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      {/* <div className="bg-all"></div> */}
      <div className="over-all"></div>
      <Outlet />
    </>
  )
}

export default App
