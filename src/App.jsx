import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, Fade } from '@material-ui/core';
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

  const PlaySound = () => { if (!bgPlaying.current && !muted) { bgMusicRef.current.play(); bgPlaying.current = true; } }
  const StopSound = () => { if (bgPlaying.current) { bgMusicRef.current.stop(); bgPlaying.current = false; } }
  const PauseSound = () => { if (bgPlaying.current) { bgMusicRef.current.pause(); bgPlaying.current = false; } }

  const [loading, setLoading] = React.useState(true);


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
      {/* <Collapse in={loading} > */}
        <div className='bg-all'></div>
      {/* </Collapse> */}
      {/* <Fade in={loading} style={{ transitionDuration: '1s' }}> */}
        <div className="logo-load">
          <h2 className='loading-text'>加载中</h2>
          <div className="waiting-text spinning"></div>
        </div>
      {/* </Fade> */}
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
        setLoading,
      }} />
    </>
  )
}

export default App
