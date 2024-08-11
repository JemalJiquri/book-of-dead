import TWEEN from '@tweenjs/tween.js';
import Globals from '../Globals';


class MainSound {
    sound = null
    parent = null
    name = ""
    cvolume = 1
    destroyed = false
    play(obj, _parent) {
        this.name = obj.name
        this.parent = _parent
        try {
            if (obj.volume >= 0) {
                this.cvolume = obj.volume
            }

            this.sound = Globals.globalSound.play(obj.name);
            if(obj.loop){
                Globals.globalSound.loop(true, this.sound)
            }
            Globals.globalSound.volume(this.cvolume, this.sound)
            Globals.globalSound.once('play', (soundID) => {
                if (soundID != this.sound) {
                    return
                }
                if (this.destroyed) {
                    Globals.globalSound.stop(this.sound)
                }
            }, this.sound)

            Globals.globalSound.once('end', (soundID) => {
                if (soundID != this.sound) {
                    return
                }
                if(obj.loop){
                    return
                }
                Globals.globalSound.stop(this.sound)
                this.parent.soundCompleted(this)
            }, this.sound)

        } catch (error) {
            console.dir(error)
        }

    }

    destroy() {
        this.destroyed = true
        try {
            if (this.sound > 0) {
                Globals.globalSound.stop(this.sound)
            }
        } catch (error) {
            console.log(error)
        }
    }

    volume(vol,fade) {
        if (vol === undefined) {
            return Globals.globalSound.volume(this.sound)
        }
        if(vol>0){
            this.unMute()
        }
        let cVol = Globals.globalSound.volume(this.sound)
        vol = vol*this.cvolume
        if(fade){
            Globals.globalSound.fade(cVol, vol, 300, this.sound)
        }else{
            Globals.globalSound.volume(vol, this.sound)
        }
        
    }


    mute() {
        try {
            if (this.sound > 0) {
                Globals.globalSound.mute(true, this.sound)
            }
        } catch (error) {
            console.log(error)
        }
    }

    unMute() {
        try {
            if (this.sound > 0) {
                Globals.globalSound.mute(false, this.sound)
            }
        } catch (error) {
            console.log(error)
        }
    }

    fadeOut(time) {
        try {
            if (this.sound > 0) {
                Globals.globalSound.fade(1, 0, time, this.sound)
            }
        } catch (error) {
            console.log(error)
        }
    }

    fadeIn(time) {
        try {
            if (this.sound > 0) {
                Globals.globalSound.fade(0, 1, time, this.sound)
            }
        } catch (error) {
            console.log(error)
        }
    }


}

export default MainSound
