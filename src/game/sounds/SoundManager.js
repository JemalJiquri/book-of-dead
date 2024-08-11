import { v4 as uuidv4 } from 'uuid';
import MainSound from './MainSound'
import {Howler} from 'howler';

class SoundManager {
    sounds = {}
    muteState = false
    bgSound = null
    bgSoundState = 0
    stopSounds = ["fsSelectSymbol1Snd","transformSymbol", "win1Snd", "win2Snd",
        "win3Snd", "win4Snd", "win5Snd", "win6Snd", "win7Snd", "win8Snd",
        "win9Snd", "win10Snd", "win11Snd"]

    play(obj) {
        if (this.muteState) {
            //return null
        }
        var snd = new MainSound()
        snd.play(obj, this)
        snd.uuid = uuidv4();
        this.sounds[snd.uuid] = snd
        //console.log("PLAYSND "+obj.name)
        if (this.stopSounds.indexOf(obj.name)>=0) {
            if (this.bgSound) {
                try {
                    if (this.bgSound.sound) {
                        //this.bgSound.sound.volume = 0.0
                        //clearTimeout(this.bgSoundState)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            this.bgSoundState = setTimeout(() => {
                //this.restoreBG()
            }, 700);

        }




        return snd
    }

    mute() {
        Howler.mute(true)
        this.muteState = true
    }

    unMute() {
        Howler.mute(false)
        this.muteState = false
    }

    isMuted() {
        return this.muteState
    }

    soundCompleted(sound) {
        if (sound == null) {
            return;
        }
        if (this.sounds[sound.uuid]) {
            this.sounds[sound.uuid].destroy()
        }
        delete this.sounds[sound.uuid]
    }
}

export default SoundManager
