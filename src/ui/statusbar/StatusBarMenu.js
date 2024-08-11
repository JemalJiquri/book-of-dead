import * as PIXI from 'pixi.js'
import SwitchBtn from "../buttons/switchbtn"
import BTGButton from '../buttons/btgbutton';
import ButtonConstants from '../buttons/buttonconstants';
import UpDown from '../buttons/updown';
import TWEEN from '@tweenjs/tween.js';


class StatusBarMenu extends PIXI.Sprite {


    bg = null

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.bgAlpha = new PIXI.Graphics();
        this.bgAlpha.alpha = 0.4
        this.bgAlpha.beginFill(0x000000);
        this.bgAlpha.drawRect(0, 0, obj.w, obj.h);
        this.bgAlpha.endFill();
        this.bgAlpha.interactive = true
        this.addChild(this.bgAlpha)
        this.resize(obj.w, obj.h)



        this.bg = PIXI.Sprite.from(PIXI.Texture.from('autoplaybg'));
        this.addChild(this.bg)


        this.headerText = new PIXI.Text("Settings", window.Lang.default["AUTOPLAYHEADER"])
        this.headerText.anchor.set(0.5, 0.5)
        this.headerText.position.set(this.bg.width / 2, 60)
        this.addChild(this.headerText)




        this.soundBtn = new SwitchBtn()
        this.soundBtn.init({
            txt: window.Lang.default["SETTINGSSOUND"],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_SOUND
        })
        this.soundBtn.position.set(50, 295)
        this.addChild(this.soundBtn)

        this.fastBtn = new SwitchBtn()
        this.fastBtn.init({
            txt: window.Lang.default["SETTINGSFAST"],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_FAST
        })
        this.fastBtn.position.set(50, 345)
        this.addChild(this.fastBtn)

        /*
        this.autoBtn = new SwitchBtn()
        this.autoBtn.init({
            txt: window.Lang.default["SETTINGSAUTO"],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_AUTO
        })
        this.autoBtn.position.set(240, 295)
        this.addChild(this.autoBtn)
        */
        
        this.spaceBtn = new SwitchBtn()
        this.spaceBtn.init({
            txt: window.Lang.default["SETTINGSSPACE"],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_SPACE
        })
        this.spaceBtn.position.set(240, 345)
        this.addChild(this.spaceBtn)



        this.coinVal = new UpDown()
        this.coinVal.init({
            steps: obj.coinVal,
            callback_function: this.buttonClicked.bind(this),
            header: "COIN VALUE",
            up: ButtonConstants.BTN_UD_COIN_UP,
            down: ButtonConstants.BTN_UD_COIN_DOWN
        })
        this.coinVal.position.set(50, 165)
        this.addChild(this.coinVal)


        this.coinsVal = new UpDown()
        this.coinsVal.init({
            steps: obj.coinsVal,
            callback_function: this.buttonClicked.bind(this),
            header: "COINS",
            up: ButtonConstants.BTN_UD_COINS_UP,
            down: ButtonConstants.BTN_UD_COINS_DOWN
        })
        this.coinsVal.position.set(175, 165)
        this.addChild(this.coinsVal)

        this.linesVal = new UpDown()
        this.linesVal.init({
            steps: obj.linesVal,
            callback_function: this.buttonClicked.bind(this),
            header: "LINES",
            up: ButtonConstants.BTN_UD_LINES_UP,
            down: ButtonConstants.BTN_UD_LINES_DOWN
        })
        this.linesVal.position.set(300, 165)
        this.addChild(this.linesVal)

        this.okBtn = new BTGButton();
        this.okBtn.init({
            bg: { data: 'autogreenbtn', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['AUTOPLAYOK'],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_MENU_CLOSE
        })
        this.okBtn.position.set(160, 400)
        this.addChild(this.okBtn);


        //obj.coin
        //obj.coins
        //obj.lines

        this.update({
            coin: obj.coinVal[0],
            coins: obj.coinsVal[0],
            lines: obj.linesVal[0],
        })


        this.alpha = 0
        new TWEEN.Tween(this)
            .to({ alpha: 1 }, 200)
            .easing(TWEEN.Easing.Linear.None)
            .start()
    }

    resize(w, h) {
        this.bgAlpha.x = -(w - 450) / 2
        this.bgAlpha.y = -(h - 480) / 2
        this.x = (w - 450) / 2
        this.y = (h - 480) / 2
    }

    
    update(obj) {
        if (obj.coin !== undefined) {
            this.coinVal.setValue(obj.coin)
        }

        if (obj.coins !== undefined) {
            this.coinsVal.setValue(obj.coins)
        }

        if (obj.lines !== undefined) {
            this.linesVal.setValue(obj.lines)
        }

        if (obj.sound !== undefined) {
            this.soundBtn.setActive(obj.sound)
        }
        if (obj.fast !== undefined) {
            this.fastBtn.setActive(obj.fast)
        }
        if (obj.auto !== undefined) {
            //this.autoBtn.setActive(obj.auto)
        }
        if (obj.space !== undefined) {
            this.spaceBtn.setActive(obj.space)
        }
    }

    closePopup() {
        new TWEEN.Tween(this)
            .to({ alpha: 0 }, 200)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                if (this.parent) {
                    this.parent.removeChild(this)
                }
            }.bind(this))
            .start()
    }

    buttonClicked(obj) {
        this.callback_function(obj)
    }
}


export default StatusBarMenu;
