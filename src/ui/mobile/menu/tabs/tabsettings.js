import * as PIXI from 'pixi.js'
import MobileSwitchBtn from "../../mobileswitchbtn"
import ButtonConstants from "../../../buttons/buttonconstants"

class TabSettings extends PIXI.Sprite {
    mainHolder = null

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.mainHolder = new PIXI.Sprite()
        this.addChild(this.mainHolder)

        this.bgFGraphics = new PIXI.Graphics();
        this.bgHolder = new PIXI.Sprite()
        this.bgHolder.addChild(this.bgFGraphics)

        this.mainHolder.addChild(this.bgHolder)

       
        this.soundsCB = new MobileSwitchBtn()
        this.soundsCB.init({
            txt: window.Lang.default["MOB_SETT_SOUND"],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_SOUND,
            w: 200,
            icon: "menusound"
        })
        this.soundsCB.position.set(17, 30)
        this.addChild(this.soundsCB)


        this.lhmCB = new MobileSwitchBtn()
        this.lhmCB.init({
            txt: window.Lang.default["MOB_SETT_LEFT"],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_LEFT,
            w: 200,
            icon: "menuhand"
        })
        this.lhmCB.position.set(17, 80)
        this.addChild(this.lhmCB)

        this.fastCB = new MobileSwitchBtn()
        this.fastCB.init({
            txt: window.Lang.default["MOB_SETT_FAST"],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_FAST,
            w: 200,
            icon: "menufast"
        })
        this.fastCB.position.set(17, 130)
        this.addChild(this.fastCB)


    }

    update(obj) {
        if (obj.fast !== undefined) {
            this.fastCB.setActive(obj.fast === 1)
        }
        if (obj.sound !== undefined) {
            this.soundsCB.setActive(obj.sound === 1)
        }
        if (obj.left !== undefined) {
            this.lhmCB.setActive(obj.left === 1)
        }
    }


    isDraggingSlider() {

        return false
    }

    buttonClicked(btn) {
        if (this.callback_function) {
            this.callback_function(btn)
        }
    }





    resize(w, h) {
        this.scrollH = h
        this.bgFGraphics.clear()
        this.bgFGraphics.beginFill(0xffffff, 1)
        this.bgFGraphics.drawRect(0, 0, w, h)
        this.bgFGraphics.endFill()
        this.soundsCB.resize(w)
        this.lhmCB.resize(w)
        this.fastCB.resize(w)

    }


}

export default TabSettings;
