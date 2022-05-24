import { useState } from 'react';
import useSound from 'use-sound';

// const [muted, SetMuted] = useState(false);

function PlaySoundClick() {
    const [soundClick] = useSound('/assets/sound/click.mp3');
    PLaySound(soundClick);
}

function PLaySound(sound) {
    // if (muted) {
    //     return;
    // }
    sound();
}

export { PlaySoundClick }
