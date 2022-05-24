import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import useStateRef from 'react-usestateref';
import useSound from 'use-sound';
import { toggleMuted } from './assets/js/muteSlice';
import { InitSound } from './Components/Sound';

function App() {
  const muted = useSelector((state) => state.mute.value);
  const dispatch = useDispatch();

  const [bgMusic, setBgMusic, bgMusicRef] = useStateRef(null);
  const bgPlaying = useRef(false);

  const PlaySound = () => { if (!bgPlaying.current) { bgMusicRef.current.play(); bgPlaying.current = true; } }
  const StopSound = () => { if (bgPlaying.current) { bgMusicRef.current.stop(); bgPlaying.current = false; } }
  const PauseSound = () => { if (bgPlaying.current) { bgMusicRef.current.pause(); bgPlaying.current = false; } }

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    setBgMusic(InitSound());
    console.log('music loaded');
    PlaySound();
    return () => { mounted.current = false; };
  }, [])
  return (
    <>
      <div className='bg-all'></div>
      <div className="logo-load"><h2 className='loading-text'>Loading</h2></div>
      <div className="logo-load spinning"></div>
      <div className='bg-cover'>
        <img className='bg' src='/assets/img/cover.png'></img>
        <img className='ball' src='/assets/img/ball.png'></img>
      </div>
      <div className={['sound-logo', muted ? 'muted' : 'spinning'].join(' ')}
        onClick={() => {
          // console.log('muted', muted);
          if (!bgMusic) {
            return;
          }
          if (muted) {
            PlaySound();
          } else {
            StopSound();
          }
          dispatch(toggleMuted());
        }}
      >
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </div>
      <Outlet context={{
        PlaySound,
        StopSound,
        PauseSound,
      }} />
    </>
  )
}

export default App
