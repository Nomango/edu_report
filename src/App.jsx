import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import useStateRef from 'react-usestateref';
import useSound from 'use-sound';
import { toggleMuted } from './assets/js/muteSlice';

function App() {
  const muted = useSelector((state) => state.mute.value);
  const dispatch = useDispatch();

  const [play, { sound, stop }] = useSound('/assets/sound/bg.mp3', { soundEnabled: !muted, interrupt: true });
  play();
  // const PlayMusic = () => {
  //   try {
  //     sound.loop(true);
  //     console.log('set loop success');
  //   } catch (e) {
  //     console.log(e);
  //     console.log('sound', sound);
  //     setTimeout(PlayMusic, 1000);
  //   }
  // }
  // const mounted = useRef(false);
  // useEffect(() => {
  //   mounted.current = true;
  //   play();
  //   // window.addEventListener('mousedown', () => {
  //   //   if (!playingRef) {
  //   //     setPlaying(true);
  //   //     setTimeout(() => {
  //   //       console.log('play music');
  //   //       play({ forceSoundEnabled: true });
  //   //       PlayMusic();
  //   //     }, 1000);
  //   //   }
  //   // })
  //   return () => { mounted.current = false; };
  // }, [])
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
          if (muted) {
            play({ forceSoundEnabled: true });
          } else {
            stop();
          }
          dispatch(toggleMuted());
        }}
      >
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </div>
      <Outlet />
    </>
  )
}

export default App
