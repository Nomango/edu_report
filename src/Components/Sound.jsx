import { Howl, Howler } from 'howler';

function InitSound(props) {
    var bgMusic = new Howl({
        src: ['https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/sound/bg.mp3'],
        loop: true,
        ...props,
    });
    return bgMusic
}

// export default bgMusic

export { InitSound }
