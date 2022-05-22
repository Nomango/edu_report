import { Component } from 'react';
import ReactPlayer from 'react-player';
import StartVideo from '../assets/videos/start.mp4';

class Background extends Component {
  ref = player => {
    this.player = player;
    console.log('player=', player);
  }

  state = {
    url: StartVideo,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: null,
    muted: false,
    playbackRate: 1.0,
    loop: false,
    firstDone: true,
  }

  constructor(props) {
    super(props);
    this.onReady = props.onReady;
    console.log('start playing');
  }

  render() {
    const { url, playing, controls, light, volume, muted, loop, playbackRate, pip } = this.state;
    console.log('playing=', playing);
    return (
      <ReactPlayer
        className={'start-video'}
        ref={this.ref}
        url={url}
        pip={pip}
        playing={playing}
        controls={controls}
        light={light}
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}

        width={'100%'}
        height={'100%'}
        onProgress={(state) => {
          if (this.state.firstDone && state.playedSeconds >= 5.5) {
            console.log('start video first done');
            this.setState({ firstDone: false });
            if (this.onReady) {
              this.onReady();
            }
          }
        }}
        onEnded={() => {
          if (!this.player)
            return;
          // console.log('start video ended');
          this.setState({ muted: true });
          setTimeout(() => {
            this.player.seekTo(6.0);
          }, 1000);
        }}
        style={{
          position: 'fixed',
          // top: '50%',
          // left: '50%',
          zIndex: 5,
          // height: '100vh',
          // width: '100%',
          // transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
        config={{
          file: {
            attributes: {
              // disablePictureInPicture: true,
              controlsList: "nodownload",
              style: {
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              },
            },
            forceVideo: true
          }
        }}
      >
      </ReactPlayer>
    )
  }
}

export default Background;
