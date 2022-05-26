import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, Fade } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Outlet } from 'react-router-dom'
import useStateRef from 'react-usestateref';
import useSound from 'use-sound';
import { toggleMuted as toggleMutedAction } from './assets/js/muteSlice';
import { InitSound } from './Components/Sound';

function App() {
  const store = useStore();
  const muted = useSelector((state) => state.mute.value);
  const dispatch = useDispatch();

  const [bgMusic, setBgMusic, bgMusicRef] = useStateRef(null);
  const bgPlaying = useRef(false);

  const PlaySound = () => { if (!bgPlaying.current && !store.getState().mute.value) { console.log('play music'); bgMusicRef.current.play(); bgPlaying.current = true; } }
  const StopSound = () => { if (bgPlaying.current) { bgMusicRef.current.stop(); bgPlaying.current = false; } }
  const PauseSound = () => { if (bgPlaying.current) { bgMusicRef.current.pause(); bgPlaying.current = false; } }

  const toggleMuted = () => {
    // console.log('muted', muted);
    if (!bgMusic) {
      return;
    }
    if (muted) {
      setTimeout(() => {
        PlaySound();
      }, 100);
    } else {
      setTimeout(() => {
        StopSound();
      }, 100);
    }
    dispatch(toggleMutedAction());
  }

  const [loading, setLoading] = React.useState(true);
  const [showBall, setShowBall] = React.useState(true);
  const [showMuted, setShowMuted] = React.useState(true);

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
      <Collapse in={loading}>
        <div className='bg-all'></div>
      </Collapse>
      <Fade in={loading}>
        <div className="logo-load" style={{ transition: `opacity 1s` }}>
          <h2 className='loading-text'>加载中</h2>
          <div className="waiting-text spinning"></div>
        </div>
      </Fade>
      <div className='bg-cover'>
        <img className='bg' src='https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/cover.png'></img>
        <img className='ball' src='https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/ball.png' style={{ display: showBall ? 'block' : 'none' }}></img>
      </div>
      <div className={['sound-logo', muted ? 'muted' : 'spinning', showMuted && !loading ? null : 'hidden'].join(' ')} onClick={toggleMuted}>
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </div>
      <Outlet context={{
        PlaySound,
        StopSound,
        PauseSound,
        loading,
        setLoading,
        setShowBall,
        setShowMuted,
      }} />
    </>
  )
}

export default App
