import * as PIXI from 'pixi.js'
import AutoplayCB from "./autoplaycb"
import SwitchBtn from "../buttons/switchbtn"
import AutoplayDrag from "./autoplaydrag"
import BTGButton from '../buttons/btgbutton';
import ButtonConstants from "../buttons/buttonconstants"
import TWEEN from '@tweenjs/tween.js';

class Autoplay extends PIXI.Sprite {
    bg = null
    autoSteps = [10, 20, 50, 75, 100]
    autosteps = []
    currentMult = 0
    num = 0
    callback_function = null

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.currentMult = obj.currentMult

        this.bgAlpha = new PIXI.Graphics();
        this.bgAlpha.alpha = 0.4
        this.bgAlpha.beginFill(0x000000);
        this.bgAlpha.drawRect(0, 0, obj.w, obj.h);
        this.bgAlpha.endFill();
        this.bgAlpha.interactive = true
        this.addChild(this.bgAlpha)
        this.resize(obj.w, obj.h)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("autoplaybg"));
        this.addChild(this.bg)

        this.autotext = new PIXI.Text(window.Lang.default["AUTOPLAYHEADER"].str, window.Lang.default["AUTOPLAYHEADER"])
        this.autotext.anchor.set(0.5, 0.5)
        this.autotext.position.set(this.bg.width / 2, 40)
        this.addChild(this.autotext)


        for (let i = 0; i < this.autoSteps.length; i++) {
            const element = this.autoSteps[i];
            var autocb = new AutoplayCB()
            autocb.init({
                num: element,
                callback_function: this.numClicked.bind(this)
            })
            autocb.y = 65
            autocb.x = i * (autocb.w + 20) + 53
            this.addChild(autocb)
            this.autosteps.push(autocb)
        }

        this.autosteps[2].setActive(true)
        this.num = this.autosteps[2].num



        this.autostoptext = new PIXI.Text(window.Lang.default["AUTOPLAYSTOP"].str, window.Lang.default["AUTOPLAYSTOP"])
        this.autostoptext.anchor.set(0, 0)
        this.autostoptext.position.set(50, 110)
        this.addChild(this.autostoptext)


        this.switchOnWin = new SwitchBtn()
        this.switchOnWin.init({ txt: window.Lang.default["AUTOPLAYSTOPWIN"] })
        this.switchOnWin.position.set(50, 135)
        this.addChild(this.switchOnWin)

        this.switchOnFree = new SwitchBtn()
        this.switchOnFree.init({ txt: window.Lang.default["AUTOPLAYSTOPFREE"] })
        this.switchOnFree.position.set(210, 135)
        this.addChild(this.switchOnFree)
        this.switchOnFree.setActive(true)

        
        this.autoplaySingleWin = new AutoplayDrag()
        this.autoplaySingleWin.init({ steps: obj.singleWin, txt: window.Lang.default["AUTOPLAYSTOPSINGLE"] })
        this.autoplaySingleWin.position.set(50, 220)
        this.addChild(this.autoplaySingleWin)


        this.autoplayBalanceInc = new AutoplayDrag()
        this.autoplayBalanceInc.init({ steps: obj.balInc, txt: window.Lang.default["AUTOPLAYSTOPBALINC"] })
        this.autoplayBalanceInc.position.set(50, 270)
        this.addChild(this.autoplayBalanceInc)

        this.autoplayBalanceDec = new AutoplayDrag()
        this.autoplayBalanceDec.init({ steps: obj.balDec, txt: window.Lang.default["AUTOPLAYSTOPBALDEC"] })
        this.autoplayBalanceDec.position.set(50, 320)
        this.addChild(this.autoplayBalanceDec)

        this.cancelBtn = new BTGButton();
        this.cancelBtn.init({
            bg: { data: 'autoredbtn', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['AUTOPLAYCA'],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_AUTOPLAY_CANCEL
        })
        this.cancelBtn.position.set(50, 400)
        this.addChild(this.cancelBtn);

        this.okBtn = new BTGButton();
        this.okBtn.init({
            bg: { data: 'autogreenbtn', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['AUTOPLAYOK'],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_AUTOPLAY_OK
        })
        this.okBtn.position.set(280, 400)
        this.addChild(this.okBtn);


        this.alpha = 0
        new TWEEN.Tween(this)
            .to({ alpha: 1 }, 200)
            .easing(TWEEN.Easing.Linear.None)
            .delay(200)
            .start()

    }

    buttonClicked(obj) {
        if (obj.name === ButtonConstants.BTN_AUTOPLAY_CANCEL) {
            this.remove()
            return;
        }
        if (this.callback_function) {
            this.callback_function(obj)
        }
    }

    resize(w, h) {
        this.bgAlpha.x = -(w - 450) / 2
        this.bgAlpha.y = -(h - 480) / 2
        this.x = (w - 450) / 2
        this.y = (h - 480) / 2
    }

    remove() {
        new TWEEN.Tween(this)
            .to({ alpha: 0 }, 200)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                if (this.parent) {
                    this.parent.autoplay = null
                    this.parent.removeChild(this)
                }
            }.bind(this))
            .start()
    }

    numClicked(obj) {
        console.log(obj.num)
        this.num = obj.num
        for (let i = 0; i < this.autosteps.length; i++) {
            this.autosteps[i].setActive(this.autosteps[i].num === this.num)
        }
    }

    setConfig(obj){
        if(obj.num){
            this.num = obj.num
            for (let i = 0; i < this.autosteps.length; i++) {
                this.autosteps[i].setActive(this.autosteps[i].num === this.num)
            }
        }
        if (obj.stopOnWin !== undefined) {
            this.switchOnWin.setActive(obj.stopOnWin)
        }
        if (obj.stopOnFree !== undefined) {
            this.switchOnFree.setActive(obj.stopOnFree)
        }

        if (obj.singleWin !== undefined) {
            this.autoplaySingleWin.setValue(obj.singleWin)
        }
        if (obj.balInc !== undefined) {
            this.autoplayBalanceInc.setValue(obj.balInc)
        }
        if (obj.balDec !== undefined) {
            this.autoplayBalanceDec.setValue(obj.balDec)
        }
        
    }

    getConfig() {
        return {
            num: this.num,
            stopOnWin: this.switchOnWin.active,
            stopOnFree: this.switchOnFree.active,
            singleWin: this.autoplaySingleWin.num,
            balInc: this.autoplayBalanceInc.num,
            balDec: this.autoplayBalanceDec.num,
        }
    }


}


export default Autoplay;
