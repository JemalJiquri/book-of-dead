import * as PIXI from 'pixi.js'
import BTGButton from '../ui/buttons/btgbutton';

class ConfirmPopup extends PIXI.Sprite {
    bg = null

    holder = null
    callback_function = null
    init(obj) {

        this.holder = new PIXI.Sprite()

        this.bgAlpha = new PIXI.Graphics();
        this.bgAlpha.alpha = 0.4
        this.bgAlpha.beginFill(0x000000);
        this.bgAlpha.drawRect(0, 0, 
            obj.w * window.devicePixelRatio*5, 
            obj.h * window.devicePixelRatio*5);
        this.bgAlpha.endFill();
        this.bgAlpha.interactive = true
        this.addChild(this.bgAlpha)
        this.addChild(this.holder)


        this.bg = new PIXI.Sprite.from(PIXI.Texture.from('autoplaybgsmall'));
        this.holder.addChild(this.bg)

        this.headerTxt = new PIXI.Text(obj.headerText, window.Lang.default["AUTOPLAYHEADER"])
        this.headerTxt.anchor.set(0.5, 0.5)
        this.headerTxt.position.set(this.bg.width / 2, 40)
        this.bg.addChild(this.headerTxt)


        this.msgTxt = new PIXI.Text(obj.bodyText, window.Lang.default["ERRORMSG2"])
        this.msgTxt.anchor.set(0.5, 0.5)
        this.msgTxt.position.set(this.bg.width / 2, this.bg.height / 2)
        this.bg.addChild(this.msgTxt)


        this.callback_function = obj.callback_function

        this.closeBtn = new BTGButton();
        this.closeBtn.init({
            bg: { data: 'autoredbtn', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['ERRORCLOSE'],
            callback_function: this.buttonClicked.bind(this),
            name: "noneeded"
        })
        this.closeBtn.buttonText.text = "NO"
        this.closeBtn.position.set(45, this.bg.height - 70)
        this.bg.addChild(this.closeBtn);

        this.okBtn = new BTGButton();
        this.okBtn.init({
            bg: { data: 'autogreenbtn', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['ERRORCLOSE'],
            callback_function: this.buttonYesClicked.bind(this),
            name: "noneeded"
        })
        this.okBtn.buttonText.text = "YES"
        this.okBtn.position.set(300, this.bg.height - 70)
        this.bg.addChild(this.okBtn);
        

        this.resize(obj.w, obj.h)
    }
    buttonYesClicked() {
        if(this.callback_function){
            this.callback_function(true)
        }
        if (this.parent) {
            this.parent.removeChild(this)
        }
        
    }
    
    buttonClicked() {
        if(this.callback_function){
            this.callback_function(false)
        }
        if (this.parent) {
            this.parent.removeChild(this)
        }
        
    }


    resize(w, h) {


        this.bgAlpha.x = 0
        this.bgAlpha.y = 0

        if (window.SETTINGS.isMobile) {
            this.holder.scale.set(0.5, 0.5)
            this.holder.x = (w - 400 * 0.5) / 2
            this.holder.y = (h - 305 * 0.5) / 2
        } else {
            this.holder.x = 713
            this.holder.y = 338
        }



    }

}

export default ConfirmPopup
