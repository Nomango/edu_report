import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { toggleMuted } from './assets/js/muteSlice';

function App() {
  const muted = useSelector((state) => state.mute.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className='bg-all'></div>
      <div className="logo-load"><h2 className='loading-text'>Loading</h2></div>
      <div className="logo-load spinning"></div>
      <div className='bg-cover'>
        <img className='bg' src='/assets/img/cover.png'></img>
        <img className='ball' src='/assets/img/ball.png'></img>
      </div>
      <div className={['sound-logo', muted ? 'muted' : 'spinning'].join(' ')} onClick={() => { dispatch(toggleMuted()) }}>
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </div>
      <Outlet />
    </>
  )
}

export default App
