

import ButtonConstants from '../ui/buttons/buttonconstants';
import Globals from './Globals';

class AutoplayManager { 
    autoConfig = null
    exit = false

    init(_autoConfig, autostart) {
        this.autoConfig = _autoConfig
        this.autoConfig.desktopButtonsHolder.updateAutoSpinTextText(this.autoConfig.num)
        //ButtonConstants.BTN_SPIN
        if (autostart) {
            setTimeout(() => {
                this.autoConfig.num--
                this.autoConfig.desktopButtonsHolder.updateAutoSpinTextText(this.autoConfig.num)
                this.autoConfig.callback_function({ name: ButtonConstants.BTN_SPIN })
            }, 10);
        }

    }

    next(msg) {

        if(this.exit){
            return false
        }

        if (window.SETTINGS.isMobile) {
            if(this.autoConfig.desktopButtonsHolder.mobMenu!=null){
                return false
            }
        }


        if (Globals.HelpPage) {
            if (Globals.HelpPage.state.visible) {
                return false
            }
        }
        if (this.autoConfig.stopOnWin) {
            if (msg.TotalWin > 0) {
                return false
            }
        }
        if (this.autoConfig.stopOnFree) {
            if (msg.Bonus) {
                return false
            }
        }
        if (this.autoConfig.singleWin > 0) {
            console.log("autoConfig.singleWin "+(msg.TotalWin*Globals.coinValue)+" "+(this.autoConfig.singleWin*100)+" "+Globals.coinValue)
            if ((msg.TotalWin*Globals.coinValue) >= this.autoConfig.singleWin*100) {
                return false
            }
        }

        if (this.autoConfig.balInc > 0) {
            if (msg.Chips >= (this.autoConfig.balance + this.autoConfig.balInc*100)) {
                return false
            }
        }
        console.log("bal check ",msg.Chips,(this.autoConfig.balance - this.autoConfig.balDec*100),this.autoConfig.balDec)
        if (this.autoConfig.balDec > 0) {
            if (msg.Chips <= (this.autoConfig.balance - this.autoConfig.balDec*100)) {
                console.log("return")
                return false
            }
        }


        if (this.autoConfig.num === 0) {
            return false
        }
        setTimeout(() => {
            this.autoConfig.num--
            this.autoConfig.desktopButtonsHolder.updateAutoSpinTextText(this.autoConfig.num)
            this.autoConfig.callback_function({ name: ButtonConstants.BTN_SPIN })
        }, 100);
        return true
    }

}

export default AutoplayManager;
