import * as PIXI from 'pixi.js'
import BTGButton from '../ui/buttons/btgbutton';

class ErrorPopup extends PIXI.Sprite {
    bg = null
    callback_function = null
    errors = [
        { code: 0, msg: "Error while Authorising", header: "Error", button: "CLOSE" },
        { code: 1, msg: "ExecutionError", header: "Error", button: "CLOSE" },
        { code: 2, msg: "Game is Already Started", header: "Error", button: "CLOSE" },
        { code: 3, msg: "Unknown Player", header: "Error", button: "CLOSE" },
        { code: 4, msg: "Unknown Connection", header: "Error", button: "CLOSE" },
        { code: 5, msg: "Wrong Message", header: "Error", button: "CLOSE" },
        { code: 6, msg: "Under Maintenance", header: "Error", button: "CLOSE" },
        { code: 7, msg: "Wrong Action", header: "Error", button: "CLOSE" },
        { code: 8, msg: "AnteNotInRange", header: "Error", button: "CLOSE" },
        { code: 9, msg: "BonusNotInRange", header: "Error", button: "CLOSE" },
        { code: 10, msg: "Not Enough Chips", header: "Error", button: "CLOSE" },
        { code: 11, msg: "InvalidInsure", header: "Error", button: "CLOSE" },
        { code: 12, msg: "Invalid Bet/Lines", header: "Error", button: "CLOSE" },
        { code: 29, msg: "System Error", header: "Error", button: "CLOSE" },
        { code: 1000, msg: "The session has timed out. Please logon \nagain to continue playing.\n\nIf you were in the middle of playing a game,\n your current progress is stored and your game can \nbe continued once you have logged on again", header: "Your session has timed out", button: "EXIT" },
        { code: 999, msg: "Not Enough Chips", header: "Error", button: "CLOSE" }
    ]

    holder = null
    errorCode = 0
    init(obj) {

        var errorText = "unknown error"
        var headerText = "Error"
        var buttonText = "CLOSE"
        for (let i = 0; i < this.errors.length; i++) {
            const element = this.errors[i];
            if (element.code === obj.code) {
                errorText = element.msg
                headerText = element.header
                buttonText = element.button
                this.errorCode = element.code
            }
        }
        this.callback_function = obj.callback_function
        console.log(obj)
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


        this.bg = new PIXI.Sprite.from(PIXI.Texture.from('error'));
        this.holder.addChild(this.bg)

        this.headerTxt = new PIXI.Text(headerText, window.Lang.default["AUTOPLAYHEADER"])
        this.headerTxt.anchor.set(0.5, 0.5)
        this.headerTxt.position.set(this.bg.width / 2, 20)
        this.bg.addChild(this.headerTxt)


        this.msgTxt = new PIXI.Text(errorText, window.Lang.default["ERRORMSG"])
        this.msgTxt.anchor.set(0.5, 0.5)
        this.msgTxt.position.set(this.bg.width / 2, this.bg.height / 2)
        this.bg.addChild(this.msgTxt)




        this.closeBtn = new BTGButton();
        this.closeBtn.init({
            bg: { data: 'autoredbtn', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['ERRORCLOSE'],
            callback_function: this.buttonClicked.bind(this),
            name: "noneeded"
        })
        this.closeBtn.buttonText.text = buttonText
        this.closeBtn.position.set(this.bg.width / 2 - 55, this.bg.height - 50)
        this.bg.addChild(this.closeBtn);


        this.resize(obj.w, obj.h)
    }

    buttonClicked() {
        if(this.errorCode === 1000){
            document.location = window.SETTINGS.ReturnUrl
        }else{
            if (this.parent) {
                if(this.callback_function){
                    this.callback_function()
                }
                this.parent.removeChild(this)
            }
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

export default ErrorPopup
