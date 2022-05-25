import { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    muted: state.muted
  }
}

class Background extends Component {
  ref = player => {
    this.player = player;
    console.log('player=', player);
  }

  state = {
    url: '/assets/video/start.mp4',
    pip: false,
    playing: false,
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
  }

  play() {
    console.log('start playing video');
    this.setState({ playing: true });
  }

  stop() {
    console.log('stop playing video');
    this.setState({ playing: false });
  }

  render() {
    const { url, playing, controls, light, volume, muted, loop, playbackRate, pip } = this.state;
    // console.log('playing=', playing);
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
        muted={muted || this.props.muted}

        width={'100%'}
        height={'100%'}
        onReady={() => {
          setTimeout(() => {
            this.props.onReady();
          }, 500);
        }}
        // onStart={() => {
        //   if (this.state.firstDone) {
        //     setTimeout(() => {
        //       console.log('start video first done');
        //       this.setState({ firstDone: false });
        //       if (this.onReady) {
        //         this.onReady();
        //       }
        //     }, 5000);
        //   }
        // }}
        onProgress={(state) => {
          // console.log('process=', state);
          if (this.state.firstDone && state.playedSeconds >= 5.0) {
            console.log('start video first done');
            this.setState({ firstDone: false });
            if (this.props.onFinished) {
              this.props.onFinished();
            }
          }
        }}
        onEnded={() => {
          if (!this.player)
            return;
          // console.log('start video ended');
          this.setState({ muted: true });
          // setTimeout(() => {
          //   this.player.seekTo(6.0);
          // }, 1000);
        }}
        onError={e => {
          console.log('onError', e);
          setTimeout(() => {
            // 设置一个延迟播放，因为chrome禁止自动播放声音
            this.setState({ muted: true });
            this.player.seekTo(0);
          }, 100);
        }}
        style={{
          display: 'none',
          position: 'fixed',
          zIndex: 5,
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
// export default connect(mapStateToProps)(Background);
