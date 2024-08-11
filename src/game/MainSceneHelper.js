import Globals from './Globals';
import ButtonConstants from '../ui/buttons/buttonconstants';
import ClosingGamePopup from './ClosingGamePopup';

class MainSceneHelper {
    parent = null
    constructor(_parent) {
        this.parent = _parent
    }


    playWinSound(win, bet) {
        let arr = [.5, 1, 2, 4, 8, 12, 20, 80, 160, 500, 1e3]
        let soundIndex = 0
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if ((win / bet) >= element) {
                soundIndex = i + 1
            }
        }
        console.log("soundIndex=" + soundIndex + ", win=" + win + ", bet=" + bet)
        if(soundIndex>=1 && soundIndex<=11){
            window.SoundManager.play({ name: "win" + soundIndex + "Snd", loop: false, volume: 1 })
        }
        
    }

    buttonClicked(obj) {


        if (obj.name === ButtonConstants.BTN_STATUSBAR_FAST) {
            Globals.session.fast = !Globals.session.fast
            Globals.saveSession()
            this.parent.updateStatusBar()
        }

        if (obj.name === ButtonConstants.BTN_STATUSBAR_HELP) {
            if (Globals.HelpPage) {
                Globals.HelpPage.openHelp()
            }
            
        }

        if (
            obj.name === ButtonConstants.BTN_UD_COINS_SET ||
            obj.name === ButtonConstants.BTN_UD_COIN_SET ||
            obj.name === ButtonConstants.BTN_UD_LINES_SET
        ) {
            let cfg = this.parent.desktopButtonsHolder.getConfig()
            let cvi = Globals.betArr.indexOf(cfg.betSettings.coins)
            Globals.bet = Globals.betArr[cvi]


            cvi = Globals.coinValueArr.indexOf(cfg.betSettings.coin)
            Globals.coinValue = Globals.coinValueArr[cvi]

            cvi = Globals.linesArr.indexOf(cfg.betSettings.lines)
            Globals.activLine = Globals.linesArr[cvi]

            this.parent.updateStatusBar()
        }



        if (
            obj.name === ButtonConstants.BTN_UD_COIN_UP ||
            obj.name === ButtonConstants.BTN_UD_COIN_DOWN
        ) {
            let cvi = Globals.coinValueArr.indexOf(Globals.coinValue)
            console.log(cvi)
            if (obj.name === ButtonConstants.BTN_UD_COIN_UP) {
                cvi++
            } else {
                cvi--
            }
            if (cvi > Globals.coinValueArr.length - 1) {
                cvi = Globals.coinValueArr.length - 1
            }
            if (cvi < 0) {
                cvi = 0
            }
            Globals.coinValue = Globals.coinValueArr[cvi]
            this.parent.updateStatusBar()
        }

        if (
            obj.name === ButtonConstants.BTN_UD_COINS_UP ||
            obj.name === ButtonConstants.BTN_UD_COINS_DOWN
        ) {
            let cvi = Globals.betArr.indexOf(Globals.bet)
            console.log(cvi)
            if (obj.name === ButtonConstants.BTN_UD_COINS_UP) {
                cvi++
            } else {
                cvi--
            }
            if (cvi > Globals.betArr.length - 1) {
                cvi = Globals.betArr.length - 1
            }
            if (cvi < 0) {
                cvi = 0
            }
            Globals.bet = Globals.betArr[cvi]
            this.parent.updateStatusBar()
        }

        if (
            obj.name === ButtonConstants.BTN_UD_LINES_UP ||
            obj.name === ButtonConstants.BTN_UD_LINES_DOWN
        ) {
            let cvi = Globals.linesArr.indexOf(Globals.activLine)
            console.log(cvi)
            if (obj.name === ButtonConstants.BTN_UD_LINES_UP) {
                cvi++
            } else {
                cvi--
            }
            if (cvi > Globals.linesArr.length - 1) {
                cvi = Globals.linesArr.length - 1
            }
            if (cvi < 0) {
                cvi = 0
            }
            Globals.activLine = Globals.linesArr[cvi]
            this.parent.updateStatusBar()
        }


        if (obj.name === ButtonConstants.BTN_MAX_BET) {
            Globals.bet = Globals.betArr[Globals.betArr.length - 1]
            Globals.activLine = Globals.linesArr[Globals.linesArr.length - 1]

            this.parent.desktopButtonsHolder.update()
        }

        if (obj.name === ButtonConstants.BTN_STATUSBAR_CLOSE) {
            console.log("closing")

            var cg = new ClosingGamePopup()
            cg.init({
                w: Globals.width,
                h: Globals.height,
            })
            this.parent.addChild(cg)

            document.location = window.SETTINGS.ReturnUrl
        }


        if (obj.name === ButtonConstants.BTN_STATUSBAR_SPACE) {
            Globals.session.space = !Globals.session.space
            this.parent.updateStatusBar()
            Globals.saveSession()
        }



        if (obj.name === ButtonConstants.BTN_PAY_TABLE) {
            this.parent.btnPaytableClick()
        }


        if (obj.name === ButtonConstants.BTN_MOB_OPEN_MENU) {
            this.parent.desktopButtonsHolder.openMenu()
            this.parent.desktopButtonsHolder.mobileBottomMenu.swapMenuBtn(true)
            this.parent.updateStatusBar()
        }
        if (obj.name === ButtonConstants.BTN_MOB_CLOSE_MENU) {
            this.parent.desktopButtonsHolder.closeMenu()
            this.parent.desktopButtonsHolder.mobileBottomMenu.swapMenuBtn(false)
        }

    }


    resizeMobile() {
        console.log("Main resizeMobile  ")
        var _w = window.innerWidth
        var _h = window.innerHeight

        var _sw = 0
        var _sh = 0
        if (window.innerWidth < window.innerHeight) {
            _sw = _w / Globals.width
            _sh = _h / Globals.height
        } else {
            _sw = _w / Globals.width
            _sh = _h / Globals.height
        }


        var minS = Math.min(_sw, _sh);
        if (minS > 1) {
            minS = 1;
        }
        if (minS < 0.3) {
            minS = 0.3;
        }
        Globals.windowWidth = window.innerWidth
        Globals.windowHeight = window.innerHeight
        Globals.scale = minS
        this.parent.freeFreeSpinsView.x = _w-242/2
        
        this.parent.desktopButtonsHolder.resize(Globals.windowWidth, Globals.windowHeight)
        var sfbg = 1
        var sfr = 1
        if (Globals.windowWidth < Globals.windowHeight) {
            sfbg = Globals.windowHeight / 1200
            sfr = Globals.windowWidth / 795
            this.parent.slotBg.x = (Globals.windowWidth - 795 * sfr) / 2
            this.parent.slotBg.y = ((Globals.windowHeight - 456 * sfr) - 456 * sfr) / 2
        } else {

            //var _w = Globals.windowWidth * 0.6

            sfr = Globals.windowHeight / 456 * 0.6
            sfbg = window.outerWidth / 1200
            this.parent.slotBg.x = (Globals.windowWidth - 795 * sfr) / 2
            this.parent.slotBg.y = (Globals.windowHeight - (456 + 60) * sfr) / 2
        }
        //780 456
        console.log(`sfr = ${sfr} ${Globals.windowWidth} ${Globals.windowHeight}`)
        if (this.parent.rheels) {
            this.parent.rheels.x = 25
            this.parent.rheels.y = 28
            this.parent.rheels.scale.x = this.parent.rheels.scale.y = 0.62
        }

        this.parent.bonusBG.scale.x = this.parent.bonusBG.scale.y = 0.5

        this.parent.slotBg.scale.x = this.parent.slotBg.scale.y = sfr
        this.parent.mainBg.scale.x = this.parent.mainBg.scale.y = sfbg


        this.parent.mainBg.x = Globals.windowWidth / 2
        this.parent.mainBg.y = Globals.windowHeight / 2

    }

    resizeDesktop() {
        console.log("Main Resize  ")
        var _w = window.innerWidth
        var _h = window.innerHeight

        var _sw = 0
        var _sh = 0
        if (window.innerWidth < window.innerHeight) {
            _sw = _w / Globals.width
            _sh = _h / Globals.height
        } else {
            _sw = _w / Globals.width
            _sh = _h / Globals.height
        }


        var minS = Math.min(_sw, _sh);
        if (minS > 1) {
            minS = 1;
        }
        if (minS < 0.3) {
            minS = 0.3;
        }

        this.parent.statusBar.resize(Globals.width, 30)
        this.parent.statusBar.y = Globals.height - 30
        Globals.windowWidth = window.innerWidth
        Globals.windowHeight = window.innerHeight
        Globals.scale = minS
        this.parent.scale.x = this.parent.scale.y = Globals.scale

        this.parent.x = (_w - Globals.width * Globals.scale) / 2
        this.parent.y = (_h - Globals.height * Globals.scale) / 2

    }






}


export default MainSceneHelper
