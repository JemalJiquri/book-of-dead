import * as PIXI from 'pixi.js'
import BTGButton from '../buttons/btgbutton';
import ButtonConstants from "../buttons/buttonconstants"

class MobileBottomMenu extends PIXI.Sprite {

    callback_function = null
    bgGraphics = null
    bgGraphics2 = null
    heightM = 55
    coinsBet = null
    scaleM = 1
    cw = { w: 0, h: 0 }
    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }


        this.bgGraphics = new PIXI.Graphics();
        this.addChild(this.bgGraphics)


        this.bgGraphics2 = new PIXI.Graphics();
        this.addChild(this.bgGraphics2)
        this.bgGraphics2.filters = []
        this.menuBtn = new BTGButton();
        this.menuBtn.init({
            bg: { data: 'mobilemenubtn', alpha: 1, x: 0, y: 0 },
            callback_function: this.callback_function.bind(this),
            name: ButtonConstants.BTN_MOB_OPEN_MENU
        })
        
        this.addChild(this.menuBtn);


        this.homeBtn = new BTGButton();
        this.homeBtn.init({
            bg: { data: 'mobilehome', alpha: 1, x: 0, y: 0 },
            callback_function: this.callback_function.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_CLOSE
        })
        
        this.addChild(this.homeBtn);

        this.menuCloseBtn = new BTGButton();
        this.menuCloseBtn.init({
            bg: { data: 'mobilebackbtn', alpha: 1, x: 0, y: 0 },
            callback_function: this.callback_function.bind(this),
            name: ButtonConstants.BTN_MOB_CLOSE_MENU
        })

        //this.addChild(this.menuCloseBtn);



        this.balanceTxt = new PIXI.Text("Balance:", window.Lang.default["MOB_BOTTOM_TEXT"])
        this.balanceTxt.anchor.set(0, 0.5)
        this.addChild(this.balanceTxt)

        this.betTxt = new PIXI.Text("Bet:", window.Lang.default["MOB_BOTTOM_TEXT"])
        this.betTxt.anchor.set(0, 0.5)
        this.addChild(this.betTxt)

        this.winTxt = new PIXI.Text("Win:", window.Lang.default["MOB_BOTTOM_TEXT"])
        this.winTxt.anchor.set(1, 0.5)
        this.addChild(this.winTxt)


        //MOB_BOTTOM_TEXT_W
        this.coinsTxt = new PIXI.Text("Coins:", window.Lang.default["MOB_BOTTOM_TEXT_W"])
        this.coinsTxt.anchor.set(0, 0.5)
        this.addChild(this.coinsTxt)

        this.coinsVal = new PIXI.Text("0", window.Lang.default["MOB_BOTTOM_TEXT_Y"])
        this.coinsVal.anchor.set(0, 0.5)
        this.addChild(this.coinsVal)


        this.betTxt2 = new PIXI.Text("Bet:", window.Lang.default["MOB_BOTTOM_TEXT_W"])
        this.betTxt2.anchor.set(1.1, 0.5)
        this.addChild(this.betTxt2)

        this.betVal = new PIXI.Text("0", window.Lang.default["MOB_BOTTOM_TEXT_Y"])
        this.betVal.anchor.set(1, 0.5)
        this.addChild(this.betVal)


    }

    swapMenuBtn(opened) {
        console.log(opened)
        if (opened) {
            this.removeChild(this.menuBtn)
            this.addChild(this.menuCloseBtn)
        } else {
            this.removeChild(this.menuCloseBtn)
            this.addChild(this.menuBtn)
        }
    }

    renderBG(w, h) {
        this.bgGraphics.clear()
        //1a1a1a  0x313131
        this.bgGraphics.beginFill(0x1a1a1a)

        this.bgGraphics.moveTo(0, 0)
        this.bgGraphics.lineTo(w, 0)
        this.bgGraphics.lineTo(w, this.heightM)
        this.bgGraphics.lineTo(0, this.heightM)
        this.bgGraphics.lineTo(0, 0)
        this.bgGraphics.endFill()

        this.bgGraphics2.clear()
        if (w < h) {
            this.bgGraphics2.y = - this.heightM
            this.bgGraphics2.beginFill(0x313131)
            this.bgGraphics2.moveTo(0, 0)
            this.bgGraphics2.lineTo(w, 0)
            this.bgGraphics2.lineTo(w, this.heightM)
            this.bgGraphics2.lineTo(0, this.heightM)
            this.bgGraphics2.lineTo(0, 0)
            this.bgGraphics2.endFill()

            this.bgGraphics2.beginFill(0x141414)
            this.bgGraphics2.moveTo(0, this.heightM)
            this.bgGraphics2.lineTo(w, this.heightM)
            this.bgGraphics2.lineTo(w, this.heightM + 2)
            this.bgGraphics2.lineTo(0, this.heightM + 2)
            this.bgGraphics2.lineTo(0, this.heightM)
            this.bgGraphics2.endFill()

            this.bgGraphics2.beginFill(0x191919)
            this.bgGraphics2.moveTo(0, this.heightM + 2)
            this.bgGraphics2.lineTo(w, this.heightM + 2)
            this.bgGraphics2.lineTo(w, this.heightM + 3)
            this.bgGraphics2.lineTo(0, this.heightM + 3)
            this.bgGraphics2.lineTo(0, this.heightM + 2)
            this.bgGraphics2.endFill()
        }
    }



    resize(w, h) {

        this.scaleM = 1
        this.cw = { w: w, h: h }
        if (w > h) {
            this.scaleM = w / 1024
            this.heightM = 35
        } else {
            this.scaleM = h / 1024
            this.heightM = 55
        }
        this.renderBG(w, h)


        this.menuCloseBtn.scale.set(this.scaleM, this.scaleM)
        this.menuCloseBtn.y = -this.menuCloseBtn.get_size().height * this.scaleM
        this.menuCloseBtn.x = w - (this.menuCloseBtn.get_size().width + 10) * this.scaleM

        this.menuBtn.scale.set(this.scaleM, this.scaleM)
        this.menuBtn.y = -this.menuBtn.get_size().height * this.scaleM
        this.menuBtn.x = w - (this.menuBtn.get_size().width + 10) * this.scaleM

        
        this.homeBtn.scale.set(this.scaleM, this.scaleM)
        this.homeBtn.y = -this.homeBtn.get_size().height * this.scaleM
        this.homeBtn.x = 20 * this.scaleM

        this.resizeTexts()
        this.y = h - this.heightM
    }

    update(obj) {
        if(obj === undefined){
            return
        }
        //console.log(obj)
        if (obj.balance !== undefined) {
            this.balanceTxt.text = "Balance: "+obj.balance
        }

        if (obj.bet !== undefined) {
            this.betTxt.text = "Bet: "+obj.bet
        }

        if (obj.win !== undefined) {
            this.winTxt.text = "Win: "+obj.win
        }

       
        this.resizeTexts()
    }



    resizeTexts() {
        if (this.cw.w > this.cw.h) {
            this.balanceTxt.position.set(20 * this.scaleM, (this.heightM-20))

            const textMetrics = PIXI.TextMetrics.measureText(this.balanceTxt.text, new PIXI.TextStyle(window.Lang.default["MOB_BOTTOM_TEXT"]));
            this.betTxt.position.set(40 * this.scaleM + textMetrics.width, (this.heightM-20))
            this.winTxt.position.set(this.cw.w - 20 * this.scaleM, (this.heightM-20))


            this.coinsTxt.anchor.set(1, 0.5)
            this.coinsVal.anchor.set(1, 0.5)
            this.betTxt2.anchor.set(0, 0.5)
            this.betVal.anchor.set(0, 0.5)

            this.coinsVal.position.set(this.cw.w / 2 - 50 * this.scaleM, (this.heightM-20))
            const textMetrics2 = PIXI.TextMetrics.measureText(this.coinsVal.text, new PIXI.TextStyle(window.Lang.default["MOB_BOTTOM_TEXT_W"]));
            this.coinsTxt.position.set(this.cw.w / 2 - 50 * this.scaleM - textMetrics2.width, (this.heightM-20))



            this.betTxt2.position.set(this.cw.w / 2 + 50 * this.scaleM, (this.heightM-20))
            const textMetrics3 = PIXI.TextMetrics.measureText(this.betTxt2.text, new PIXI.TextStyle(window.Lang.default["MOB_BOTTOM_TEXT_W"]));
            this.betVal.position.set(this.cw.w / 2 + 50 * this.scaleM + textMetrics3.width, (this.heightM-20))


        } else {
            this.balanceTxt.position.set(20 * this.scaleM, 25 * this.scaleM)
            this.betTxt.position.set(20 * this.scaleM, 55 * this.scaleM)
            this.winTxt.position.set(this.cw.w - 20 * this.scaleM, 55 * this.scaleM)

            this.coinsTxt.anchor.set(0, 0.5)
            this.coinsVal.anchor.set(0, 0.5)
            this.betTxt2.anchor.set(1.1, 0.5)
            this.betVal.anchor.set(1, 0.5)

            this.coinsTxt.position.set((95+20) * this.scaleM, -25)
            const textMetrics2 = PIXI.TextMetrics.measureText(this.coinsTxt.text, new PIXI.TextStyle(window.Lang.default["MOB_BOTTOM_TEXT_W"]));
            this.coinsVal.position.set((95+30) * this.scaleM + textMetrics2.width, -25)


            this.betVal.position.set(this.menuBtn.x - 20 * this.scaleM, -25)
            const textMetrics3 = PIXI.TextMetrics.measureText(this.betVal.text, new PIXI.TextStyle(window.Lang.default["MOB_BOTTOM_TEXT_W"]));
            this.betTxt2.position.set(this.menuBtn.x - 30 * this.scaleM - textMetrics3.width, -25)

        }
    }

}

export default MobileBottomMenu;
