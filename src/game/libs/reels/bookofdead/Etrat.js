import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js";

class Etrat extends PIXI.Sprite {
    etrat_B = null
    etrat_B_Holder = null
    etrat_B_Mask = null

    etrat_L = null
    etrat_R = null

    init(obj) {
        //etrat_B etrat_L etrat_R

        this.etrat_B_Holder = new PIXI.Sprite()
        this.addChild(this.etrat_B_Holder)


        this.etrat_B = PIXI.Sprite.from(PIXI.Texture.from("etrat_B"));
        this.etrat_B_Holder.x = 14
        this.etrat_B_Holder.y = -14
        this.etrat_B_Holder.addChild(this.etrat_B)

        //RHEEL_YOUWONADD RHEEL_FREE
        if (obj.freeWon) {
            window.SoundManager.play({ name: "freespinRetrigger", loop: false })
            if(window.SoundManager.bgSound){
                window.SoundManager.bgSound.volume(0.0,true)
            }
            this.free = new PIXI.Text(
                window.Lang.default["RHEEL_FREEADD"].str,
                window.Lang.default["RHEEL_FREEADD"])
            this.free.anchor.set(0.5, 0.5)
            this.free.position.set(this.etrat_B.width / 2, this.etrat_B.height / 2 + 40)
            this.etrat_B_Holder.addChild(this.free)

            this.youwon = new PIXI.Text(
                window.Lang.default["RHEEL_YOUWONADD"].str.replace("%s", obj.freeWon),
                window.Lang.default["RHEEL_YOUWONADD"])
            this.youwon.anchor.set(0.5, 0.5)
            this.youwon.position.set(this.etrat_B.width / 2, this.etrat_B.height / 2 - 40)
            this.etrat_B_Holder.addChild(this.youwon)
        }

        if (obj.totalWin) {
            window.SoundManager.play({ name: "freespinSummary", loop: false })
            if(window.SoundManager.bgSound){
                window.SoundManager.bgSound.volume(0.1,true)
            }
            this.free = new PIXI.Text(
                window.Lang.default["RHEEL_TOTAL_WIN"].str,
                window.Lang.default["RHEEL_TOTAL_WIN"])
            this.free.anchor.set(0.5, 0.5)
            this.free.position.set(this.etrat_B.width / 2, this.etrat_B.height / 2 - 40)
            this.etrat_B_Holder.addChild(this.free)

            this.youwon = new PIXI.Text(
                window.Lang.default["RHEEL_TOTAL_WIN_VAL"].str.replace("%s", obj.totalWin),
                window.Lang.default["RHEEL_TOTAL_WIN_VAL"])
            this.youwon.anchor.set(0.5, 0.5)
            this.youwon.position.set(this.etrat_B.width / 2, this.etrat_B.height / 2 + 40)
            this.etrat_B_Holder.addChild(this.youwon)
        }


        this.etrat_B_Mask = this.createMask(40, this.etrat_B.height)
        this.etrat_B_Mask.x = (this.etrat_B.width - 20) / 2
        this.etrat_B_Mask.y = -14
        this.etrat_B_Holder.mask = this.etrat_B_Mask
        this.addChild(this.etrat_B_Mask)
        //this.etrat_B.width

        this.etrat_L = PIXI.Sprite.from(PIXI.Texture.from("etrat_L"));
        this.etrat_L.x = this.etrat_B.width / 2 - this.etrat_L.width / 2
        this.etrat_L.y = -14
        this.addChild(this.etrat_L)

        this.etrat_R = PIXI.Sprite.from(PIXI.Texture.from("etrat_R"));
        this.etrat_R.x = this.etrat_B.width / 2 + this.etrat_R.width / 2
        this.etrat_R.y = -14
        this.addChild(this.etrat_R)

    }

    show(delay) {
        new TWEEN.Tween(this.etrat_B_Mask)
            .to({ width: this.etrat_B.width, x: 0 }, 700)
            .easing(TWEEN.Easing.Linear.None)
            .delay(delay)
            .start()

        new TWEEN.Tween(this.etrat_L)
            .to({ x: 0 }, 700)
            .easing(TWEEN.Easing.Linear.None)
            .delay(delay)
            .start()

        new TWEEN.Tween(this.etrat_R)
            .to({ x: this.etrat_B.width - this.etrat_R.width + 15 }, 700)
            .easing(TWEEN.Easing.Linear.None)
            .delay(delay)
            .start()
    }

    hide(delay) {
        new TWEEN.Tween(this.etrat_B_Mask)
            .to({ width: 40, x: (this.etrat_B.width - 20) / 2 }, 500)
            .easing(TWEEN.Easing.Linear.None)
            .delay(delay)
            .start()

        new TWEEN.Tween(this.etrat_L)
            .to({ x: this.etrat_B.width / 2 - this.etrat_L.width / 2 }, 500)
            .easing(TWEEN.Easing.Linear.None)
            .delay(delay)
            .start()

        new TWEEN.Tween(this.etrat_R)
            .to({ x: this.etrat_B.width / 2 + this.etrat_R.width / 2 }, 500)
            .easing(TWEEN.Easing.Linear.None)
            .delay(delay)
            .onComplete(function () {
                if (this.parent) {
                    this.parent.removeChild(this)
                }
            }.bind(this))
            .start()
    }

    createMask(width, height) {
        var holderMask = new PIXI.Graphics();
        holderMask.beginFill(0x8bc5ff, 1);
        holderMask.moveTo(0, 0);
        holderMask.lineTo(width, 0);
        holderMask.lineTo(width, height);
        holderMask.lineTo(0, height);
        holderMask.lineTo(0, 0);
        return holderMask
    }



}


export default Etrat;
