import * as PIXI from 'pixi.js'
import DesktopBuilder from './desktopbuilder';
import ButtonConstants from "../buttons/buttonconstants"
import TWEEN from '@tweenjs/tween.js';


class DesktopButtonsHolder extends PIXI.Sprite {
    gambleHolder = null
    buttonsHolder = []
    spinBtn = null
    autoSpinButton = null
    leftBtn = null
    rightBtn = null
    idleModeHolder = null



    paytableBtn = null
    linesBar = null
    linesBarTxt = null
    minusLineBtn = null
    plusLineBtn = null
    betBar = null
    betBarTxt = null
    minusBetBtn = null
    plusBetBtn = null
    coinValueChangeBtn = null
    infoBar = null
    infoTextBigLine = null
    infoTextSmallLineLineUp = null
    bonusInfoWin = null
    bonusInfoWinAmt = null
    bonusInfoWinCoins = null
    infoTextSmallLineLineDown = null
    cointTextBar = null
    chooseTextInBar = null
    betTextBar = null
    betTextInBar = null
    betTextInBetBar = null
    coinsAnim = null
    gambleWaitSound = null
    currentBonusFinal = 0
    currentBonusWin = 0

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.Globals = obj.Globals

        var db = new DesktopBuilder()
        db.build(this)
        this.update()
    }

 

    update(){
        this.betBarTxt.text = window.Lang.default['BETTEXT'].str.replace("%d", this.Globals.bet)
        this.coinValueChangeBtn.buttonText2.text = window.Lang.default['CREDITBTNTEXTA'].str.replace("%c", this.Globals.currency).replace("%d", (this.Globals.coinValue / 100).toFixed(2))
        this.linesBarTxt.text = window.Lang.default['LINETEXT'].str.replace("%d", this.Globals.activLine)
        this.Globals.totalBet = this.bet * this.coinValue * this.activLine
        this.chooseTextInBar.text = window.Lang.default['COINSBARTEXT'].str.replace("%d", parseInt((this.Globals.balansCoinsValue) / this.Globals.coinValue))
        this.betTextInBetBar.text = window.Lang.default['BETBARTEXTBET'].str.replace("%d", parseInt(this.Globals.bet * this.Globals.activLine))
    }



    
    updateAutoSpinTextText(cnt) {
        this.autoSpinButton.buttonText2.text = "" + cnt
    }
    coinValueButtonClick() {
        this.Globals.coinValue = this.Globals.coinValueArr[this.Globals.coinValueArr.indexOf(this.Globals.coinValue) + 1]
        if (this.Globals.coinValueArr.indexOf(this.Globals.coinValue) === -1) this.Globals.coinValue = this.Globals.coinValueArr[0]
        this.callback_function({ name: ButtonConstants.BTN_UD_COIN_SET })
    }
    getConfig() {
        // this.Globals.activLine this.Globals.coinValue this.Globals.bet
        return {
            betSettings: {
                coins: this.Globals.bet,
                coin: this.Globals.coinValue,
                lines: this.Globals.activLine
            }
        }
    }

    gambleStarted() {
        if (this.gambleWaitSound) {
            this.gambleWaitSound.mute()
            window.SoundManager.soundCompleted(this.gambleWaitSound)
            this.gambleWaitSound = null
        }
        
        this.leftBtn.blink({ blink: false })
        this.rightBtn.blink({ blink: false })
        this.rightBtn.setEnabled(false)
    }

    
    setGambleMode(mode) { 
        if (mode) {
            setTimeout(() => {
                this.Globals.Game.mainScene.bgSound.mute()
            }, 100);

            if (this.gambleWaitSound) {
                console.log('removing gamble sound')
                this.gambleWaitSound.mute()
                window.SoundManager.soundCompleted(this.gambleWaitSound)
                this.gambleWaitSound = null
            }
            this.gambleWaitSound = window.SoundManager.play({ name: "gambleWait", loop: true })
            this.leftBtn.setButton({
                text: window.Lang.default["COLLECT"],
                name: ButtonConstants.BTN_COLLECT
            })
            this.rightBtn.setButton({
                text: window.Lang.default["GAMBLE"],
                name: ButtonConstants.BTN_GAMBLE
            })
            this.leftBtn.blink({ blink: true, time: 500, delay: 500 })
            this.rightBtn.blink({ blink: true, time: 500, delay: 0 })
        } else {
            if (this.gambleWaitSound) {
                console.log('removing gamble sound')
                this.gambleWaitSound.mute()
                window.SoundManager.soundCompleted(this.gambleWaitSound)
                this.gambleWaitSound = null
            }
            this.leftBtn.setButton({
                text: window.Lang.default["MAXBETBUTTON"],
                name: ButtonConstants.BTN_MAX_BET
            })
            this.rightBtn.setButton({
                text: window.Lang.default['AUTOPLAYBUTTON'],
                name: ButtonConstants.BTN_AUTO_PLAY
            })
            this.leftBtn.blink({ blink: false })
            this.rightBtn.blink({ blink: false })
            this.rightBtn.setEnabled(true)
        }
    }

    //resize(){

    //}

    setSpinMode(mode, lockState) {
        //element.setEnabled(!mode,true)
        switch (lockState) {
            case 1:
                console.log(`this.spinBtn.setEnabled true`)
                this.spinBtn.setEnabled(true)
                break;
            case 2:
                console.log(`this.spinBtn.setEnabled false`)
                this.spinBtn.setEnabled(false)
                break;
            default:
                break;
        }
        if (!mode) {
            this.spinBtn.setButton({
                text: window.Lang.default['STOP'],
                name: ButtonConstants.BTN_STOP
            })
        } else {
            this.spinBtn.setButton({
                text: window.Lang.default['SPIN'],
                name: ButtonConstants.BTN_SPIN
            })
        }
    }

    setAutoMode(mode) {
        this.autoMode = mode
        console.log(`this.spinBtn.setEnabled ${!mode}, true`)
        this.spinBtn.setEnabled(!mode, true)
        this.leftBtn.setEnabled(!mode, true)

        this.spinBtn.alpha = mode ? 0 : 1
        this.autoSpinButton.alpha = mode ? 1 : 0
        if (mode) {
            this.rightBtn.setButton({
                text: window.Lang.default["STOP"],
                name: ButtonConstants.BTN_STOP
            })

            this.rightBtn.alpha = 1
            this.rightBtn.buttonMode = true;
            this.rightBtn.interactive = true;

            //this.minusLineBtn this.plusLineBtn this.minusBetBtn this.plusBetBtn


            this.linesBar.buttonMode = false;
            this.linesBar.interactive = false;

            this.betBar.buttonMode = false;
            this.betBar.interactive = false;

            this.minusLineBtn.setEnabled(false, true)
            this.plusLineBtn.setEnabled(false, true)

            this.minusBetBtn.setEnabled(false, true)
            this.plusBetBtn.setEnabled(false, true)
            this.coinValueChangeBtn.setEnabled(false, false)


        } else {
            this.rightBtn.setButton({
                text: window.Lang.default['AUTOPLAYBUTTON'],
                name: ButtonConstants.BTN_AUTO_PLAY
            })
            this.linesBar.buttonMode = true;
            this.linesBar.interactive = true;

            this.betBar.buttonMode = true;
            this.betBar.interactive = true;

            this.minusLineBtn.setEnabled(true, true)
            this.plusLineBtn.setEnabled(true, true)

            this.minusBetBtn.setEnabled(true, true)
            this.plusBetBtn.setEnabled(true, true)
            this.coinValueChangeBtn.setEnabled(true, true)
        }
    }
 
    unlockSpinAndAuto(spin, auto) {
        console.log(`this.spinBtn.setEnabled ${!spin}, true`)
        this.spinBtn.setEnabled(!spin, true)
        this.rightBtn.setEnabled(!auto, true)
    }

    lockButtons(mode, play) { 
        for (let i = 0; i < this.buttonsHolder.length; i++) {
            const element = this.buttonsHolder[i];
            element.setEnabled(!mode, true)
        }

        this.coinValueChangeBtn.setEnabled(!mode, false)
        if (play) {
            console.log(`this.spinBtn.setEnabled ${!mode}, true`)
            this.spinBtn.setEnabled(!mode, true)
        }

        if (this.autoMode) {
            console.log("this.spinBtn.setEnabled true, true")
            this.spinBtn.setEnabled(true, true)
        }
    }

    updateBonusText(txt) {
        this.bonusInfoWinAmt.text = txt
        if (this.currentBonusWin <= 200) {
            this.currentFontSize = 26
        }
        if (this.currentBonusWin > 200) {
            this.currentFontSize = 30
        }
        if (this.currentBonusWin > 400) {
            this.currentFontSize = 35
        }
        if (this.currentBonusWin > 600) {
            this.currentFontSize = 45
        }
        if (this.currentBonusWin > 1000) {
            this.currentFontSize = 55
        }
        if (this.currentBonusWin > 1200) {
            this.currentFontSize = 70
        }
        //if (oldFontSize !== this.currentFontSize) {
        window.Lang.default["BONUS_WIN_AMT"].fontSize = this.currentFontSize
        this.bonusInfoWinAmt.style = new PIXI.TextStyle(window.Lang.default["BONUS_WIN_AMT"])

        //}
        var metr = PIXI.TextMetrics.measureText(txt, new PIXI.TextStyle(window.Lang.default["BONUS_WIN_AMT"]))
        this.bonusInfoWin.position.set((this.infoBar.width) / 2 - metr.width / 2 - 10, (this.infoBar.height) / 2)
        this.bonusInfoWinCoins.position.set((this.infoBar.width) / 2 + metr.width / 2 + 10, (this.infoBar.height) / 2)
    }

    updateInfoText(msgs, _bonusMode = false) {

        if (!this.bonusMode && _bonusMode) {
            window.Lang.default["BONUS_WIN_AMT"].fontSize = 26
            this.bonusInfoWinAmt.style = new PIXI.TextStyle(window.Lang.default["BONUS_WIN_AMT"])
            this.currentBonusFinal = 0
            this.currentBonusWin = 0
        }
        this.bonusMode = _bonusMode

        if (this.bonusMode) {
            this.infoTextSmallLineLineUp.text = ""
            this.infoTextSmallLineLineDown.text = ""
            this.infoTextBigLine.text = ""

            this.bonusInfoWin.alpha = 1
            this.bonusInfoWinCoins.alpha = 1
            this.bonusInfoWinAmt.alpha = 1
            //currentBonusWin
            if (this.currentBonusFinal !== msgs[0]) {

                if (this.currentBonusFinal < msgs[0]) {
                    this.currentBonusFinal = msgs[0]
                } else {
                    return
                }


                if (this.counterTween) {
                    this.counterTween.stop()
                }

                this.counterTween = new TWEEN.Tween(this)
                    .to({ currentBonusWin: this.currentBonusFinal }, 1000)
                    .delay(10)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(function () {
                        this.coinsAnim.addCoin()
                        this.updateBonusText("" + parseInt(this.currentBonusWin))
                    }.bind(this))
                    .onComplete(function () {
                        this.updateBonusText("" + msgs[0])
                    }.bind(this))
                    .start()
            }


            return
        } else {
            this.bonusInfoWin.alpha = 0
            this.bonusInfoWinCoins.alpha = 0
            this.bonusInfoWinAmt.alpha = 0
            this.currentBonusWin = 0
            this.currentFontSize = 26
        }

        if (msgs.length === 0) {
            this.infoTextSmallLineLineUp.text = ""
            this.infoTextSmallLineLineDown.text = ""
            this.infoTextBigLine.text = ""
        }
        if (msgs.length === 1) {
            this.infoTextSmallLineLineUp.text = ""
            this.infoTextSmallLineLineDown.text = ""
            this.infoTextBigLine.text = msgs[0]
        }
        if (msgs.length === 2) {
            this.infoTextSmallLineLineUp.text = msgs[0]
            this.infoTextSmallLineLineDown.text = msgs[1]
            this.infoTextBigLine.text = ""
        }

    }


}

export default DesktopButtonsHolder;
