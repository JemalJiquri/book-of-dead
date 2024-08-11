import * as PIXI from 'pixi.js'
import BTGButton from '../buttons/btgbutton';
import ButtonConstants from "../buttons/buttonconstants"
import MobileBottomMenu from './mobilebottommenu'
import TWEEN from '@tweenjs/tween.js';
import CoinsAnim from "../coins/coinsanim"
import MobileMenu from './menu/mobilemenu';
class MobileButtonsHolder extends PIXI.Sprite {

    buttonsHolder = []
    callback_function = null
    mobileBottomMenu = null
    infoBar = null
    bonusMode = false
    counterTween = null
    currentBonusWin = 0
    currentBonusFinal = 0
    currentFontSize = 26
    leftHand = false
    mobMenu = null

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.Globals = obj.Globals
        this.coinsAnim = new CoinsAnim()
        this.coinsAnim.init(true)

        this.initButton();


    }

    initButton() {

        this.spinButton = new BTGButton();
        this.spinButton.init({
            bg: { data: 'spinmobile', alpha: 1, x: 0, y: 0 },
            callback_function: this.callback_function.bind(this),
            name: ButtonConstants.BTN_SPIN
        })
        this.addChild(this.spinButton);

        this.autoSpinButton = new BTGButton();
        this.autoSpinButton.init({
            bg: { data: 'spinmobileauto', alpha: 0.9, x: 0, y: 0 },
            text: window.Lang.default['MOB_AUTO'],
            callback_function: this.callback_function.bind(this),
            name: ButtonConstants.BTN_STOP
        })
        this.autoSpinButton.alpha = 0
        this.autoSpinButton.buttonMode = false;
        this.autoSpinButton.interactive = false;
        this.addChild(this.autoSpinButton);

        this.gambleButton = new BTGButton();
        this.gambleButton.init({
            bg: { data: 'mobilebutton', alpha: 1, x: 0, y: 0 },
            callback_function: this.callback_function.bind(this),
            text: window.Lang.default["MOB_GAMBLE"],
            name: ButtonConstants.BTN_GAMBLE
        })
        this.addChild(this.gambleButton);

        this.collectButton = new BTGButton();
        this.collectButton.init({
            bg: { data: 'mobilebutton', alpha: 1, x: 0, y: 0 },
            callback_function: this.callback_function.bind(this),
            text: window.Lang.default["MOB_COLLECT"],
            name: ButtonConstants.BTN_COLLECT
        })
        this.addChild(this.collectButton);

        this.gambleButton.alpha = 0
        this.gambleButton.buttonMode = false;
        this.gambleButton.interactive = false;


        this.collectButton.alpha = 0
        this.collectButton.buttonMode = false;
        this.collectButton.interactive = false;

        this.mobileBottomMenu = new MobileBottomMenu()
        this.mobileBottomMenu.init({
            callback_function: this.callback_function.bind(this)
        })
        this.addChild(this.mobileBottomMenu)

        this.infoBar = new PIXI.Sprite()
        this.addChild(this.infoBar)
        this.infoBar.position.set(100, 100)

        this.infoTextSmallLineLineUp = new PIXI.Text("", window.Lang.default["MOB_INFO_SMALL_LINE"])
        this.infoTextSmallLineLineUp.anchor.set(0.5, 1)
        this.infoTextSmallLineLineUp.position.set(this.infoBar.width / 2, - 20)
        this.infoBar.addChild(this.infoTextSmallLineLineUp)

        this.infoTextSmallLineLineDown = new PIXI.Text("", window.Lang.default["MOB_INFO_SMALL_LINE"])
        this.infoTextSmallLineLineDown.anchor.set(0.5, 1)
        this.infoTextSmallLineLineDown.position.set(this.infoBar.width / 2, 0)
        this.infoBar.addChild(this.infoTextSmallLineLineDown)


        this.infoTextBigLine = new PIXI.Text(window.Lang.default["MOB_INFO_BIG_LINE"].str, window.Lang.default["MOB_INFO_BIG_LINE"])
        this.infoTextBigLine.anchor.set(0.5, 1)
        this.infoTextBigLine.position.set((this.infoBar.width) / 2, (this.infoBar.height) / 2)
        this.infoBar.addChild(this.infoTextBigLine)


        this.bonusInfoWin = new PIXI.Text(window.Lang.default["MOB_BONUS_INFO_WIN"].str, window.Lang.default["MOB_BONUS_INFO_WIN"])
        this.bonusInfoWin.anchor.set(1, 1)
        this.bonusInfoWin.alpha = 0
        this.bonusInfoWin.position.set((this.infoBar.width) / 2, (this.infoBar.height) / 2)
        this.infoBar.addChild(this.bonusInfoWin)

        this.bonusInfoWinAmt = new PIXI.Text("", window.Lang.default["MOB_BONUS_WIN_AMT"])
        this.bonusInfoWinAmt.anchor.set(0.5, 1)
        this.bonusInfoWinAmt.alpha = 0
        this.bonusInfoWinAmt.position.set((this.infoBar.width) / 2, (this.infoBar.height) / 2)
        this.infoBar.addChild(this.bonusInfoWinAmt)

        this.bonusInfoWinCoins = new PIXI.Text(window.Lang.default["MOB_BONUS_INFO_COINS"].str, window.Lang.default["MOB_BONUS_INFO_COINS"])
        this.bonusInfoWinCoins.anchor.set(0, 1)
        this.bonusInfoWinCoins.alpha = 0
        this.bonusInfoWinCoins.position.set((this.infoBar.width) / 2, (this.infoBar.height) / 2)
        this.infoBar.addChild(this.bonusInfoWinCoins)
        this.infoBar.addChild(this.coinsAnim)
    }
    sizes = { w: 0, h: 0 }
    resize(w, h) {
        this.sizes.w = w
        this.sizes.h = h
        var scaleF = 1
        this.mobileBottomMenu.resize(w, h)
        if (w > h) {
            scaleF = w / 1024
            if (this.leftHand) {
                this.spinButton.x = 20 * scaleF
                this.spinButton.y = h / 2 - (this.spinButton.get_size().height / 2) * scaleF
                //
                this.autoSpinButton.x = 20 * scaleF
                this.autoSpinButton.y = h / 2 - (this.autoSpinButton.get_size().height / 2) * scaleF


                this.infoBar.position.set(w / 2, h - this.mobileBottomMenu.heightM)

                this.gambleButton.position.set(w - this.gambleButton.get_size().width * scaleF - 20, h / 2 - (this.gambleButton.get_size().height / 2 + 20) * scaleF)
                this.collectButton.position.set(w - this.collectButton.get_size().width * scaleF - 20, h / 2 + (this.collectButton.get_size().height / 2 + 20) * scaleF)

            } else {
                this.spinButton.x = w - this.spinButton.get_size().width * scaleF - 20
                this.spinButton.y = h / 2 - (this.spinButton.get_size().height / 2) * scaleF

                this.autoSpinButton.x = w - this.autoSpinButton.get_size().width * scaleF - 20
                this.autoSpinButton.y = h / 2 - (this.autoSpinButton.get_size().height / 2) * scaleF


                this.infoBar.position.set(w / 2, h - this.mobileBottomMenu.heightM)

                this.gambleButton.position.set(20 * scaleF, h / 2 - (this.gambleButton.get_size().height / 2 + 20) * scaleF)
                this.collectButton.position.set(20 * scaleF, h / 2 + (this.collectButton.get_size().height / 2 + 20) * scaleF)

            }
        } else {
            scaleF = h / 1024
            this.spinButton.x = w / 2 - this.spinButton.get_size().width / 2 * scaleF
            this.spinButton.y = h * 2 / 3 - (this.spinButton.get_size().height / 2) * scaleF

            this.autoSpinButton.x = w / 2 - this.autoSpinButton.get_size().width / 2 * scaleF
            this.autoSpinButton.y = h * 2 / 3 - (this.autoSpinButton.get_size().height / 2) * scaleF
            this.infoBar.position.set(w / 2, this.spinButton.y - 10 * scaleF)

            this.gambleButton.position.set(w / 2 - (this.gambleButton.get_size().width + 40) * scaleF, this.spinButton.y + this.spinButton.get_size().height * scaleF)
            this.collectButton.position.set(w / 2 + (40) * scaleF, this.spinButton.y + this.spinButton.get_size().height * scaleF)

        }
        this.spinButton.scale.set(scaleF)
        this.autoSpinButton.scale.set(scaleF)
        this.gambleButton.scale.set(scaleF)
        this.collectButton.scale.set(scaleF)


        //


        if (this.mobMenu) {
            this.mobMenu.resize(w, h)
        }

    }

    getConfig() {
        if (this.mobMenu) {
            return this.mobMenu.getConfig()
        }
        return null
    } 

    openMenu() {
        this.mobMenu = new MobileMenu()
        this.mobMenu.init({
            callback_function: this.callback_function.bind(this),
            Globals: this.Globals
        })
        this.addChild(this.mobMenu)
        this.addChild(this.mobileBottomMenu)
        if(this.lastLockState.length>0){
            this.mobMenu.lockButtons(this.lastLockState[0],this.lastLockState[1])
        }
        
        this.mobMenu.resize(window.innerWidth, window.innerHeight)
    }

    closeMenu() {
        if (this.mobMenu) {
            this.removeChild(this.mobMenu)
            this.mobMenu = null
        }
    }

    menuActive = 1
    update(obj) {
        if (obj === undefined) {
            this.mobileBottomMenu.betTxt.text = "Bet: " + (this.Globals.bet * this.Globals.activLine * this.Globals.coinValue / 100).toFixed(2)
            this.Globals.totalBet = this.bet * this.coinValue * this.activLine
            this.mobileBottomMenu.coinsVal.text = "" + parseInt((this.Globals.balansCoinsValue) / this.Globals.coinValue)
            this.mobileBottomMenu.betVal.text = "" + parseInt(this.Globals.bet * this.Globals.activLine)
            this.mobileBottomMenu.resizeTexts()
            return
        }
        console.log(obj)
        if (this.mobMenu) {
            obj.menu = this.menuActive
            this.mobMenu.update(obj)
        }
        if (this.mobileBottomMenu) {
            this.mobileBottomMenu.update(obj)
        }
        if (obj.left !== undefined) {
            this.leftHand = obj.left === 1
            this.resize(this.sizes.w, this.sizes.h)
        }
        if (obj.menu !== undefined) {
            this.menuActive = obj.menu
        }
        
    }


    updateBonusText(txt) {
        this.bonusInfoWinAmt.text = txt

        var metr = PIXI.TextMetrics.measureText(txt, new PIXI.TextStyle(window.Lang.default["MOB_BONUS_WIN_AMT"]))
        this.bonusInfoWin.position.set((this.infoBar.width) / 2 - metr.width / 2 - 10, (this.infoBar.height) / 2)
        this.bonusInfoWinCoins.position.set((this.infoBar.width) / 2 + metr.width / 2 + 10, (this.infoBar.height) / 2)
    }

    updateInfoText(msgs, _bonusMode = false) {
        if (!this.bonusMode && _bonusMode) {
            window.Lang.default["MOB_BONUS_WIN_AMT"].fontSize = 16
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
                this.currentBonusFinal = msgs[0]

                if (this.counterTween) {
                    this.counterTween.stop()
                }

                this.counterTween = new TWEEN.Tween(this)
                    .to({ currentBonusWin: msgs[0] }, 1000)
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
            this.currentFontSize = 16
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

    gambleStarted() {
        if (this.gambleWaitSound) {
            this.gambleWaitSound.mute()
            window.SoundManager.soundCompleted(this.gambleWaitSound)
            this.gambleWaitSound = null
        }
        this.gambleButton.alpha = 0
        this.gambleButton.buttonMode = false;
        this.gambleButton.interactive = false;
    }
    gambleWaitSound = null
    setGambleMode(mode) {
        if (mode) {
            if (this.gambleWaitSound) {
                this.gambleWaitSound.mute()
                window.SoundManager.soundCompleted(this.gambleWaitSound)
                this.gambleWaitSound = null
            } 
            this.gambleWaitSound = window.SoundManager.play({ name: "gambleWait", loop: true })
        } else {
            if (this.gambleWaitSound) {
                this.gambleWaitSound.mute()
                window.SoundManager.soundCompleted(this.gambleWaitSound)
                this.gambleWaitSound = null
            }
        }
        this.gambleButton.alpha = mode ? 1 : 0
        this.gambleButton.buttonMode = mode;
        this.gambleButton.interactive = mode;

        this.collectButton.alpha = mode ? 1 : 0
        this.collectButton.buttonMode = mode;
        this.collectButton.interactive = mode;
    }

    lastLockState = []
    lockButtons(mode, play) {
        this.lastLockState = [mode, play]
        console.log(`lockButtons ${mode} ${play}`)
        if (play) {
            this.spinButton.setEnabled(!mode, true)
        }

        if (this.mobMenu) {
            this.mobMenu.lockButtons(mode, play)
        }
    }

    unlockSpinAndAuto(spin, auto) {
        this.spinButton.setEnabled(!spin, true)
    }

    setSpinMode(mode, lockState) {
        console.log(`setSpinMode ${mode} ${lockState}`)
        switch (lockState) {
            case 1:
                this.spinButton.setEnabled(true)
                break;
            case 2:
                this.spinButton.setEnabled(false)
                break;
            default:
                break;
        }

        if (!mode) {
            this.spinButton.setButton({
                name: ButtonConstants.BTN_STOP,
                //bg: { data: 'spinmobileauto', alpha: 1, x: 0, y: 0 },
            })
            //this.spinButton.alpha = 0
        } else {
            this.spinButton.setButton({
                name: ButtonConstants.BTN_SPIN,
                //bg: { data: 'spinmobile', alpha: 1, x: 0, y: 0 },
            })
            this.spinButton.alpha = 1
        }
    }


    setAutoMode(mode) {
        //this.spinButton.scale.set(scaleF)
        //this.autoSpinButton.scale.set(scaleF)
        this.spinButton.alpha = mode ? 0 : 1
        this.spinButton.buttonMode = !mode;
        this.spinButton.interactive = !mode;

        this.autoSpinButton.alpha = mode ? 1 : 0
        this.autoSpinButton.buttonMode = mode;
        this.autoSpinButton.interactive = mode;

    }

    updateAutoSpinTextText(cnt) {
        this.autoSpinButton.buttonText.text = "" + cnt
    }
}

export default MobileButtonsHolder;
