import * as PIXI from 'pixi.js'
import MobileSlider from '../mobileslider'
import MobileScrollContainer from "../mobilescrollcontainer"
import MobileSwitchBtn from "../../mobileswitchbtn"
import ButtonConstants from "../../../buttons/buttonconstants"
import BTGButton from '../../../buttons/btgbutton';

class TabBets extends PIXI.Sprite {
    b1Holder = null
    b2Holder = null
    b3Holder = null
    mainHolder = null
    scrollContainer = null
    bgHolder = null
    scrollH = 0
    contH = 1000
    sliders = []

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
        this.sliders = []
        this.createBlock1()
        this.createBlock2(obj)
        this.createBlock3()

        this.scrollContainer = new MobileScrollContainer()
        this.scrollContainer.init({
            container: this
        })


    }


    getConfig() {
        //this.onAnyWin this.onWinFree balancedecSlider balanceincSlider
        return {
            num: this.autoSlider.num,
            stopOnWin: this.onAnyWin.active,
            stopOnFree: this.onWinFree.active,
            singleWin: this.singleWinSlider.num,
            balInc: this.balanceincSlider.num,
            balDec: this.balancedecSlider.num,
            betSettings: {
                coin: this.coinSlider.num,
                coins: this.coinsSlider.num,
                lines: this.linesSlider.num,
            }
        }
    }

    isDraggingSlider() {
        for (let i = 0; i < this.sliders.length; i++) {
            const element = this.sliders[i];
            if (element.mousePressed) {
                return true
            }
        }
        return false
    }




    createBlock3() {
        this.b3Holder = new PIXI.Sprite()
        this.b3t1Txt = new PIXI.Text(
            "Auto Play",
            window.Lang.default["MOB_MENU_BET_TAB_BIG"])
        this.b3t1Txt.anchor.set(0, 0)
        this.b3t1Txt.position.set(17, 262)
        this.b3Holder.addChild(this.b3t1Txt)



        this.autoSlider = new MobileSlider()
        this.autoSlider.x = 50
        this.autoSlider.y = 342
        this.autoSlider.init({
            current: 0,
            steps: Array.from({ length: 91 }, (_, i) => 10 + i),
            showMinMax: true,
            w: 130,
            col: 0xf5cf41 //cccccc
        })
        this.b3Holder.addChild(this.autoSlider)
        this.sliders.push(this.autoSlider)


        this.startAutoBtn = new BTGButton();
        this.startAutoBtn.init({
            bg: { data: 'startauto', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_AUTOPLAY_OK
        })
        this.startAutoBtn.scale.set(0.5, 0.5)
        this.startAutoBtn.position.set(250, 310)
        this.addChild(this.startAutoBtn);


        this.b3t2Txt = new PIXI.Text(
            "Stop Autoplay",
            window.Lang.default["MOB_MENU_BET_TAB_BIG"])
        this.b3t2Txt.anchor.set(0, 0)
        this.b3t2Txt.position.set(17, 380)
        this.b3Holder.addChild(this.b3t2Txt)


        this.b3t3Txt = new PIXI.Text(
            "If single win exceeds ()",
            window.Lang.default["MOB_MENU_BET_TAB_BIG"])
        this.b3t3Txt.anchor.set(0, 0)
        this.b3t3Txt.position.set(17, 420)
        this.b3Holder.addChild(this.b3t3Txt)

        this.singleWinSlider = new MobileSlider()
        this.singleWinSlider.x = 50
        this.singleWinSlider.y = 492
        this.singleWinSlider.init({
            current: 0,
            steps: Array.from({ length: 20001 }, (_, i) => 0 + i),
            showMinMax: true,
            w: 190,
            col: 0xf5cf41 //cccccc
        })
        this.b3Holder.addChild(this.singleWinSlider)
        this.sliders.push(this.singleWinSlider)




        this.b3t4Txt = new PIXI.Text(
            "If balance increases by ()",
            window.Lang.default["MOB_MENU_BET_TAB_BIG"])
        this.b3t4Txt.anchor.set(0, 0)
        this.b3t4Txt.position.set(17, 540)
        this.b3Holder.addChild(this.b3t4Txt)

        this.balanceincSlider = new MobileSlider()
        this.balanceincSlider.x = 50
        this.balanceincSlider.y = 610
        this.balanceincSlider.init({
            current: 0,
            steps: Array.from({ length: 20001 }, (_, i) => 0 + i),
            showMinMax: true,
            w: 190,
            col: 0xf5cf41 //cccccc
        })
        this.b3Holder.addChild(this.balanceincSlider)
        this.sliders.push(this.balanceincSlider)

        this.b3t5Txt = new PIXI.Text(
            "If balance decreases by ()",
            window.Lang.default["MOB_MENU_BET_TAB_BIG"])
        this.b3t5Txt.anchor.set(0, 0)
        this.b3t5Txt.position.set(17, 660)
        this.b3Holder.addChild(this.b3t5Txt)

        this.balancedecSlider = new MobileSlider()
        this.balancedecSlider.x = 50
        this.balancedecSlider.y = 730
        this.balancedecSlider.init({
            current: 0,
            steps: Array.from({ length: 20001 }, (_, i) => 0 + i),
            showMinMax: true,
            w: 190,
            col: 0xf5cf41 //cccccc
        })
        this.b3Holder.addChild(this.balancedecSlider)
        this.sliders.push(this.balancedecSlider)



        this.onAnyWin = new MobileSwitchBtn()
        this.onAnyWin.init({
            txt: window.Lang.default["MOB_AUTOPLAYSTOPWIN"],
            name: ButtonConstants.BTN_STATUSBAR_SPACE,
            w: 200
        })
        this.onAnyWin.position.set(17, 790)
        this.addChild(this.onAnyWin)

        this.onWinFree = new MobileSwitchBtn()
        this.onWinFree.init({
            txt: window.Lang.default["MOB_AUTOPLAYSTOPFREE"],
            name: ButtonConstants.BTN_STATUSBAR_SPACE,
            w: 200
        })
        this.onWinFree.position.set(17, 840)
        this.addChild(this.onWinFree)

        this.mainHolder.addChild(this.b3Holder)
    }




    buttonClicked(btn) {
        if (this.callback_function) {
            this.callback_function(btn)
        }
    }

    update(obj) {
        console.log(obj)
        if (obj.coin !== undefined) {
            this.coinSlider.setVal(obj.coin)
        }

        if (obj.coins !== undefined) {
            this.coinsSlider.setVal(obj.coins)
        }

        if (obj.lines !== undefined) {
            this.linesSlider.setVal(obj.lines)
        }
        if (obj.betincash !== undefined) {
            this.b1t2Txt.text = obj.betincash
        }

        if (obj.betincoins !== undefined) {
            this.b1t4Txt.text = obj.betincoins
        }
        console.log(obj.autPlayConfig)
        if (obj.autPlayConfig !== undefined) {
            if (obj.autPlayConfig !== null) {
                this.onAnyWin.setActive(obj.autPlayConfig.stopOnWin)
                this.onWinFree.setActive(obj.autPlayConfig.stopOnFree)
                this.autoSlider.setVal(obj.autPlayConfig.num)
                this.singleWinSlider.setVal(obj.autPlayConfig.singleWin)
                this.balanceincSlider.setVal(obj.autPlayConfig.balInc)
                this.balancedecSlider.setVal(obj.autPlayConfig.balDec)
            }
            
            /*balDec: 0
                : 4363
                betSettings: {coin: 100, coins: 1, lines: 10}
                
                
            balInc: this.balanceincSlider.num,
            balDec: this.balancedecSlider.num,
            betSettings: {
                coin: this.coinSlider.num,
                coins: this.coinsSlider.num,
                lines: this.linesSlider.num,
            }
                
                
                */
            
        }

    }

    lockButtons(mode, play) {
        console.log(`lockButtons ${mode} ${play}`)
        this.coinSlider.interactiveChildren = !mode;
        this.coinSlider.interactive = !mode;
        this.coinSlider.alpha = !mode ? 1 : 0.9

        this.coinsSlider.interactiveChildren = !mode;
        this.coinsSlider.interactive = !mode;
        this.coinsSlider.alpha = !mode ? 1 : 0.9

        this.linesSlider.interactiveChildren = !mode;
        this.linesSlider.interactive = !mode;
        this.linesSlider.alpha = !mode ? 1 : 0.9
    }

    createBlock2(obj) {
        this.b2Holder = new PIXI.Sprite()

        this.b2t1Txt = new PIXI.Text(
            "Coins:",
            window.Lang.default["MOB_MENU_BET_TAB_BIG"])
        this.b2t1Txt.anchor.set(0, 0)
        this.b2t1Txt.position.set(17, 80)
        this.b2Holder.addChild(this.b2t1Txt)


        //MOB_MENU_BET_TAB_BIG
        this.coinsSlider = new MobileSlider()
        this.coinsSlider.x = 110
        this.coinsSlider.y = 87
        this.coinsSlider.init({
            current: 3,
            steps: obj.Globals.betArr,
            showMinMax: true,
            w: 150,
            col: 0xf5cf41,
            name: ButtonConstants.BTN_UD_COINS_SET,
            callback_function: this.callback_function
        })
        this.b2Holder.addChild(this.coinsSlider)
        this.sliders.push(this.coinsSlider)


        this.b2t2Txt = new PIXI.Text(
            "Coin value:",
            window.Lang.default["MOB_MENU_BET_TAB_BIG"])
        this.b2t2Txt.anchor.set(0, 0)
        this.b2t2Txt.position.set(17, 150)
        this.b2Holder.addChild(this.b2t2Txt)


        //MOB_MENU_BET_TAB_BIG
        this.coinSlider = new MobileSlider()

        this.coinSlider.x = 160
        this.coinSlider.y = 157
        this.coinSlider.init({
            current: 3,
            steps: obj.Globals.coinValueArr,
            showMinMax: true,
            w: 120,
            col: 0xf5cf41,
            divider: 100,
            name: ButtonConstants.BTN_UD_COIN_SET,
            callback_function: this.callback_function
        })
        this.b2Holder.addChild(this.coinSlider)
        this.sliders.push(this.coinSlider)



        this.b2t3Txt = new PIXI.Text(
            "Lines:",
            window.Lang.default["MOB_MENU_BET_TAB_BIG"])
        this.b2t3Txt.anchor.set(0, 0)
        this.b2t3Txt.position.set(17, 220)
        this.b2Holder.addChild(this.b2t3Txt)


        //MOB_MENU_BET_TAB_BIG
        this.linesSlider = new MobileSlider()

        this.linesSlider.x = 110
        this.linesSlider.y = 227
        this.linesSlider.init({
            current: 3,
            steps: obj.Globals.linesArr,
            showMinMax: true,
            w: 150,
            col: 0xf5cf41,
            name: ButtonConstants.BTN_UD_LINES_SET,
            callback_function: this.callback_function
        })
        this.b2Holder.addChild(this.linesSlider)
        this.sliders.push(this.linesSlider)
        this.mainHolder.addChild(this.b2Holder)
    }

    createBlock1() {
        //block1
        this.b1Holder = new PIXI.Sprite()
        this.bg1FGraphics = new PIXI.Graphics();
        this.b1Holder.addChild(this.bg1FGraphics)
        this.b1Holder.y = 10

        //MOB_MENU_BET_TAB_SMALL_L
        this.b1t1Txt = new PIXI.Text(
            "Bet in Coin",
            window.Lang.default["MOB_MENU_BET_TAB_SMALL_L"])
        this.b1t1Txt.anchor.set(0, 0.5)
        this.b1t1Txt.position.set(17, 12)
        this.b1Holder.addChild(this.b1t1Txt)

        this.b1t2Txt = new PIXI.Text(
            "10",
            window.Lang.default["MOB_MENU_BET_TAB_SMALL_R"])
        this.b1t2Txt.anchor.set(1, 0.5)
        this.b1t2Txt.position.set(17, 12)
        this.b1Holder.addChild(this.b1t2Txt)


        this.b1t3Txt = new PIXI.Text(
            "Bet in Cash",
            window.Lang.default["MOB_MENU_BET_TAB_SMALL_L"])
        this.b1t3Txt.anchor.set(0, 0.5)
        this.b1t3Txt.position.set(17, 12)
        this.b1Holder.addChild(this.b1t3Txt)

        this.b1t4Txt = new PIXI.Text(
            "11",
            window.Lang.default["MOB_MENU_BET_TAB_SMALL_R"])
        this.b1t4Txt.anchor.set(1, 0.5)
        this.b1t4Txt.position.set(17, 12)
        this.b1Holder.addChild(this.b1t4Txt)



        this.mainHolder.addChild(this.b1Holder)
    }

    resize(w, h) {
        this.scrollH = h
        this.bgFGraphics.clear()
        this.bgFGraphics.beginFill(0xffffff, 1)
        this.bgFGraphics.drawRect(0, 0, w, 1000)
        this.bgFGraphics.endFill()


        this.bg1FGraphics.clear()
        this.bg1FGraphics.beginFill(0xa2a2a2)
        this.bg1FGraphics.drawRoundedRect(15, 0, w - 30, 25, 5)
        this.bg1FGraphics.endFill()

        this.bg1FGraphics.beginFill(0xffffff)
        this.bg1FGraphics.drawRoundedRect(16, 1, w - 32, 23, 5)
        this.bg1FGraphics.endFill()


        this.bg1FGraphics.lineStyle(1, 0xa2a2a2)
        this.bg1FGraphics.moveTo(w / 2, 0)
        this.bg1FGraphics.lineTo(w / 2, 25)
        this.bg1FGraphics.endFill()


        this.bgFGraphics.beginFill(0xd3d3d3)
        this.bgFGraphics.drawRect(0, 252, w, 2)
        this.bgFGraphics.endFill()

        this.b1t2Txt.position.set(w / 2 - 5, 12)
        this.b1t3Txt.position.set(w / 2 + 5, 12)
        this.b1t4Txt.position.set(w - 20, 12)
    }


}

export default TabBets;
