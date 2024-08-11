import * as PIXI from 'pixi.js'
import BTGButton from '../buttons/btgbutton';
import ButtonConstants from "../buttons/buttonconstants"
import CoinsAnim from "../coins/coinsanim"


class DesktopBuilder {

    build(thisobj) {
        
        thisobj.coinsAnim = new CoinsAnim()
        thisobj.coinsAnim.init(false)


        thisobj.gambleHolder = new PIXI.Sprite()
        thisobj.gambleHolder.alpha = 0
        thisobj.addChild(thisobj.gambleHolder)

        thisobj.buttonsHolder = []
        thisobj.spinBtn = new BTGButton();
        thisobj.spinBtn.init({
            bg: { data: 'mainbutton/startSpinButton', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/startSpinButton', alpha: 0, x: 0, y: 0 },
            disabled: { data: 'mainbutton2/startSpinButton', alpha: 0, x: 0, y: 0 },
            text: window.Lang.default['SPIN'],
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_SPIN
        })
        thisobj.addChild(thisobj.spinBtn);

        thisobj.autoSpinButton = new BTGButton();
        thisobj.autoSpinButton.init({
            bg: { data: 'autoSpinButton', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['AUTOBTNTXT'],
            text2: window.Lang.default['AUTOBTNTXT2'],
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_SPIN
        })
        thisobj.autoSpinButton.alpha = 0
        thisobj.autoSpinButton.buttonMode = false;
        thisobj.autoSpinButton.interactive = false;
        thisobj.addChild(thisobj.autoSpinButton);




        thisobj.idleModeHolder = new PIXI.Sprite()
        thisobj.idleModeHolder.position.set(681,284)
        thisobj.addChild(thisobj.idleModeHolder)
        
        thisobj.leftBtn = new BTGButton();
        thisobj.leftBtn.init({
            bg: { data: 'mainbutton/snallButton', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/snallButton', alpha: 0, x: 0, y: 0 },
            disabled: { data: 'mainbutton2/snallButton', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'mainbutton/snallButtonPressed', alpha: 0, x: 0, y: -2 },
            text: window.Lang.default['MAXBETBUTTON'],
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_MAX_BET
        })
        thisobj.idleModeHolder.addChild(thisobj.leftBtn);
        thisobj.buttonsHolder.push(thisobj.leftBtn)


        thisobj.rightBtn = new BTGButton();
        thisobj.rightBtn.init({
            bg: { data: 'mainbutton/snallButton', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/snallButton', alpha: 0, x: 0, y: 0 },
            disabled: { data: 'mainbutton2/snallButton', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'mainbutton/snallButtonPressed', alpha: 0, x: 0, y: -2 },
            text: window.Lang.default['AUTOPLAYBUTTON'],
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_AUTO_PLAY

        })
        thisobj.idleModeHolder.addChild(thisobj.rightBtn);
        thisobj.rightBtn.position.set(355,0)
        thisobj.buttonsHolder.push(thisobj.rightBtn)












        thisobj.paytableBtn = new BTGButton();
        thisobj.paytableBtn.init({
            bg: { data: 'mainbutton/snallButton', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/snallButton', alpha: 0, x: 0, y: 0 },
            disabled: { data: 'mainbutton2/snallButton', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'mainbutton/snallButtonPressed', alpha: 0, x: 0, y: -2 },
            text: window.Lang.default['PAYTABLEBUTTON'],
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_PAY_TABLE
        })
        thisobj.addChild(thisobj.paytableBtn);
        thisobj.buttonsHolder.push(thisobj.paytableBtn)


        //mainbutton/betBaner

        thisobj.linesBar = new PIXI.Sprite.from(PIXI.Texture.from('mainbutton/betBaner'));

        thisobj.linesBarTxt = new PIXI.Text("", window.Lang.default["LINETEXT"])
        thisobj.linesBarTxt.anchor.set(0.5, 0.5)
        thisobj.linesBarTxt.position.set(thisobj.linesBar.width / 2, thisobj.linesBar.height / 2)
        thisobj.linesBar.addChild(thisobj.linesBarTxt)

        thisobj.addChild(thisobj.linesBar);
        

        thisobj.minusLineBtn = new BTGButton();
        thisobj.minusLineBtn.init({
            bg: { data: 'mainbutton/minus_btn', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/minus_btn', alpha: 0, x: 0, y: 0 },
            disabled: { data: 'mainbutton2/minus_btn', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'mainbutton/minus_btn', alpha: 0, x: 0, y: 0 },
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_UD_LINES_DOWN
        })
        thisobj.linesBar.addChild(thisobj.minusLineBtn);
        thisobj.buttonsHolder.push(thisobj.minusLineBtn)

        thisobj.plusLineBtn = new BTGButton();
        thisobj.plusLineBtn.init({
            bg: { data: 'mainbutton/plus_btn', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/plus_btn', alpha: 0, x: 0, y: 0 },
            disabled: { data: 'mainbutton2/plus_btn', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'mainbutton/plus_btn', alpha: 0, x: 0, y: 0 },
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_UD_LINES_UP
        })
        thisobj.linesBar.addChild(thisobj.plusLineBtn);
        thisobj.buttonsHolder.push(thisobj.plusLineBtn)

        thisobj.minusLineBtn.x = -thisobj.plusLineBtn.get_size().width
        thisobj.minusLineBtn.y = 3
        thisobj.plusLineBtn.x = thisobj.linesBar.width
        thisobj.plusLineBtn.y = 3




        thisobj.betBar = new PIXI.Sprite.from(PIXI.Texture.from('mainbutton/betBaner'));
        thisobj.betBarTxt = new PIXI.Text("", window.Lang.default["BETTEXT"])
        thisobj.betBarTxt.anchor.set(0.5, 0.5)
        thisobj.betBarTxt.position.set(thisobj.betBar.width / 2, thisobj.betBar.height / 2)
        thisobj.betBar.addChild(thisobj.betBarTxt)
        thisobj.addChild(thisobj.betBar);
        


        thisobj.minusBetBtn = new BTGButton();
        thisobj.minusBetBtn.init({
            bg: { data: 'mainbutton/minus_btn', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/minus_btn', alpha: 0, x: 0, y: 0 },
            disabled: { data: 'mainbutton2/minus_btn', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'mainbutton/minus_btn', alpha: 0, x: 0, y: 0 },
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_UD_COINS_DOWN
        })
        thisobj.betBar.addChild(thisobj.minusBetBtn);
        thisobj.buttonsHolder.push(thisobj.minusBetBtn)

        thisobj.plusBetBtn = new BTGButton();
        thisobj.plusBetBtn.init({
            bg: { data: 'mainbutton/plus_btn', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/plus_btn', alpha: 0, x: 0, y: 0 },
            disabled: { data: 'mainbutton2/plus_btn', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'mainbutton/plus_btn', alpha: 0, x: 0, y: 0 },
            callback_function: thisobj.callback_function.bind(thisobj),
            name: ButtonConstants.BTN_UD_COINS_UP
        })
        thisobj.betBar.addChild(thisobj.plusBetBtn);
        thisobj.buttonsHolder.push(thisobj.plusBetBtn)

        thisobj.minusBetBtn.x = -thisobj.plusBetBtn.get_size().width
        thisobj.minusBetBtn.y = 3
        thisobj.plusBetBtn.y = 3
        thisobj.plusBetBtn.x = thisobj.betBar.width


        thisobj.coinValueChangeBtn = new BTGButton();
        thisobj.coinValueChangeBtn.init({
            bg: { data: 'mainbutton/credit_btn', alpha: 1, x: 0, y: 0 },
            hover: { data: 'mainbutton/credit_btn', alpha: 0, x: 0, y: 0 },
            text: window.Lang.default['CREDITBTNTEXT'],
            text2: window.Lang.default['CREDITBTNTEXTA'],
            callback_function: thisobj.coinValueButtonClick.bind(thisobj),
            name: ButtonConstants.BTN_COIN_CHANGE
        })
        //thisobj.buttonsHolder.push(thisobj.coinValueChangeBtn)
        thisobj.addChild(thisobj.coinValueChangeBtn);
        

        thisobj.infoBar = PIXI.Sprite.from(PIXI.Texture.from('mainbutton/infoBar'));
        thisobj.addChild(thisobj.infoBar)

        thisobj.infoTextBigLine = new PIXI.Text(window.Lang.default["INFO_BIG_LINE"].str, window.Lang.default["INFO_BIG_LINE"])
        thisobj.infoTextBigLine.anchor.set(0.5, 0.5)
        thisobj.infoTextBigLine.position.set((thisobj.infoBar.width) / 2, (thisobj.infoBar.height) / 2)
        thisobj.infoBar.addChild(thisobj.infoTextBigLine)

        thisobj.infoTextSmallLineLineUp = new PIXI.Text("", window.Lang.default["INFO_SMALL_LINE"])
        thisobj.infoTextSmallLineLineUp.anchor.set(0.5, 0.5)
        thisobj.infoTextSmallLineLineUp.position.set(thisobj.infoBar.width / 2, thisobj.infoBar.height / 2 - 10)
        thisobj.infoBar.addChild(thisobj.infoTextSmallLineLineUp)

        //BONUS_INFO_COINS BONUS_INFO_WIN BONUS_WIN_AMT

        thisobj.infoBar.addChild(thisobj.coinsAnim)



        thisobj.bonusInfoWin = new PIXI.Text(window.Lang.default["BONUS_INFO_WIN"].str, window.Lang.default["BONUS_INFO_WIN"])
        thisobj.bonusInfoWin.anchor.set(1, 0.5)
        thisobj.bonusInfoWin.alpha = 0
        thisobj.bonusInfoWin.position.set((thisobj.infoBar.width) / 2, (thisobj.infoBar.height) / 2)
        thisobj.infoBar.addChild(thisobj.bonusInfoWin)

        thisobj.bonusInfoWinAmt = new PIXI.Text("100", window.Lang.default["BONUS_WIN_AMT"])
        thisobj.bonusInfoWinAmt.anchor.set(0.5, 0.5)
        thisobj.bonusInfoWinAmt.alpha = 0
        thisobj.bonusInfoWinAmt.position.set((thisobj.infoBar.width) / 2, (thisobj.infoBar.height) / 2)
        thisobj.infoBar.addChild(thisobj.bonusInfoWinAmt)

        thisobj.bonusInfoWinCoins = new PIXI.Text(window.Lang.default["BONUS_INFO_COINS"].str, window.Lang.default["BONUS_INFO_COINS"])
        thisobj.bonusInfoWinCoins.anchor.set(0, 0.5)
        thisobj.bonusInfoWinCoins.alpha = 0
        thisobj.bonusInfoWinCoins.position.set((thisobj.infoBar.width) / 2, (thisobj.infoBar.height) / 2)
        thisobj.infoBar.addChild(thisobj.bonusInfoWinCoins)


        thisobj.infoTextSmallLineLineDown = new PIXI.Text("", window.Lang.default["INFO_SMALL_LINE"])
        thisobj.infoTextSmallLineLineDown.anchor.set(0.5, 0.5)
        thisobj.infoTextSmallLineLineDown.position.set(thisobj.infoBar.width / 2, thisobj.infoBar.height / 2 + 10)
        thisobj.infoBar.addChild(thisobj.infoTextSmallLineLineDown)


        thisobj.cointTextBar = PIXI.Sprite.from(PIXI.Texture.from('mainbutton/coinctextbar'));
        thisobj.addChild(thisobj.cointTextBar)

        thisobj.chooseTextInBar = new PIXI.Text(window.Lang.default["COINSBARTEXT"].str, window.Lang.default["COINSBARTEXT"])
        thisobj.chooseTextInBar.anchor.set(0, 0)
        thisobj.chooseTextInBar.position.set((thisobj.cointTextBar.width - thisobj.chooseTextInBar.width) / 2, (thisobj.cointTextBar.height - thisobj.chooseTextInBar.height) / 2)
        thisobj.cointTextBar.addChild(thisobj.chooseTextInBar)

        thisobj.betTextBar = PIXI.Sprite.from(PIXI.Texture.from('mainbutton/bettextbar'));
        thisobj.addChild(thisobj.betTextBar)

        thisobj.betTextInBar = new PIXI.Text(window.Lang.default["BETBARTEXT"].str, window.Lang.default["BETBARTEXT"])
        thisobj.betTextInBar.anchor.set(0, 0)
        thisobj.betTextInBar.position.set((thisobj.betTextBar.width - thisobj.betTextInBar.width) / 2, (thisobj.betTextBar.height - thisobj.betTextInBar.height) / 2)
        thisobj.betTextBar.addChild(thisobj.betTextInBar)

        thisobj.betTextInBetBar = new PIXI.Text(window.Lang.default["BETBARTEXTBET"].str, window.Lang.default["BETBARTEXTBET"])
        thisobj.betTextInBetBar.anchor.set(0, 0)
        thisobj.betTextInBetBar.position.set((thisobj.betTextBar.width - thisobj.betTextInBetBar.width) / 2, (thisobj.betTextBar.height - thisobj.betTextInBetBar.height) / 2)
        thisobj.betTextBar.addChild(thisobj.betTextInBetBar)

        thisobj.betTextInBar.position.x -= thisobj.betTextInBetBar.width
        thisobj.betTextInBetBar.position.x += thisobj.betTextInBetBar.width / 2




        
        this.resizeBtn(thisobj)


    }

    resizeBtn(thisobj) {

        if (thisobj.cointTextBar != null) {
            thisobj.cointTextBar.x = 0
            thisobj.cointTextBar.y = 200
        }

        if (thisobj.coinValueChangeBtn != null) {
            thisobj.coinValueChangeBtn.x = thisobj.cointTextBar.x + (thisobj.cointTextBar.width - thisobj.coinValueChangeBtn.get_size().width) / 2
            thisobj.coinValueChangeBtn.y = thisobj.cointTextBar.y + thisobj.cointTextBar.height * 1.5
        }

        if (thisobj.infoBar != null) {
            thisobj.infoBar.x = thisobj.cointTextBar.x + thisobj.cointTextBar.width + 10
            thisobj.infoBar.y = thisobj.cointTextBar.y + (thisobj.cointTextBar.height - thisobj.infoBar.height) / 2
        }

        if (thisobj.coinsAnim) {
            thisobj.coinsAnim.x = thisobj.infoBar.width / 2
            thisobj.coinsAnim.y = thisobj.infoBar.height / 2
        }

        if (thisobj.betBar != null) {
            thisobj.betBar.x = thisobj.infoBar.x + thisobj.plusBetBtn.get_size().width
            thisobj.betBar.y = thisobj.coinValueChangeBtn.y + (thisobj.coinValueChangeBtn.get_size().height - thisobj.betBar.height)
        }
        ////thisobj.minusBetBtn thisobj.plusBetBtn
        if (thisobj.linesBar != null) {
            thisobj.linesBar.x = thisobj.betBar.x + thisobj.betBar.width + thisobj.minusBetBtn.get_size().width + thisobj.plusBetBtn.get_size().width + 10
            thisobj.linesBar.y = thisobj.coinValueChangeBtn.y + (thisobj.coinValueChangeBtn.get_size().height - thisobj.linesBar.height)
        }

        if (thisobj.betTextBar != null) {
            thisobj.betTextBar.x = thisobj.infoBar.x + thisobj.infoBar.width + 10
            thisobj.betTextBar.y = thisobj.cointTextBar.y + (thisobj.cointTextBar.height - thisobj.betTextBar.height) / 2
        }

        if (thisobj.spinBtn != null) {
            thisobj.spinBtn.x = thisobj.betTextBar.x + (thisobj.betTextBar.width - thisobj.spinBtn.get_size().width) / 2
            thisobj.spinBtn.y = thisobj.coinValueChangeBtn.y + (thisobj.coinValueChangeBtn.get_size().height - thisobj.spinBtn.get_size().height)
            thisobj.autoSpinButton.x = thisobj.spinBtn.x
            thisobj.autoSpinButton.y = thisobj.spinBtn.y

        }


        if (thisobj.paytableBtn != null) {
            thisobj.paytableBtn.x = thisobj.betTextBar.x + thisobj.betTextBar.width + 10
            thisobj.paytableBtn.y = thisobj.cointTextBar.y + (thisobj.cointTextBar.height - thisobj.paytableBtn.get_size().height) / 2
        }
    }



}

export default DesktopBuilder;
