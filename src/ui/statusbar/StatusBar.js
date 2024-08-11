import * as PIXI from 'pixi.js'
import BTGButton from '../buttons/btgbutton';
import ButtonConstants from '../buttons/buttonconstants';

class StatusBar extends PIXI.Sprite {


    bg = null

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.bg = PIXI.Sprite.from(PIXI.Texture.from('statusbar/blackbg'));
        this.addChild(this.bg)

        //statusbar/menu
        this.menuBtn = new BTGButton();
        this.menuBtn.init({
            bg: { data: 'statusbar/menu', alpha: 0.8, x: 0, y: 0 },
            hover: { data: 'statusbar/menu', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_MENU
        })
        this.addChild(this.menuBtn);


        this.soundOnBtn = new BTGButton();
        this.soundOnBtn.init({
            bg: { data: 'statusbar/soundon', alpha: 0.8, x: 0, y: 0 },
            hover: { data: 'statusbar/soundon', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_SOUND
        })
        this.addChild(this.soundOnBtn);

        this.soundOffBtn = new BTGButton();
        this.soundOffBtn.init({
            bg: { data: 'statusbar/soundoff', alpha: 0.8, x: 0, y: 0 },
            hover: { data: 'statusbar/soundoff', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_SOUND
        })
        this.addChild(this.soundOffBtn);
        this.soundOffBtn.alpha = 0


        this.fastOnBtn = new BTGButton();
        this.fastOnBtn.init({
            bg: { data: 'statusbar/faston', alpha: 0.8, x: 0, y: 0 },
            hover: { data: 'statusbar/faston', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_FAST
        })
        this.addChild(this.fastOnBtn);

        this.fastOffBtn = new BTGButton();
        this.fastOffBtn.init({
            bg: { data: 'statusbar/fast', alpha: 0.8, x: 0, y: 0 },
            hover: { data: 'statusbar/fast', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_FAST
        })
        this.addChild(this.fastOffBtn);


        this.closeBtn = new BTGButton();
        this.closeBtn.init({
            bg: { data: 'statusbar/close', alpha: 0.8, x: 0, y: 0 },
            hover: { data: 'statusbar/close', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_CLOSE
        })
        this.addChild(this.closeBtn);

        this.helpBtn = new BTGButton();
        this.helpBtn.init({
            bg: { data: 'statusbar/help', alpha: 0.8, x: 0, y: 0 },
            hover: { data: 'statusbar/help', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_STATUSBAR_HELP
        })
        this.addChild(this.helpBtn);


        this.logo = PIXI.Sprite.from(PIXI.Texture.from('statusbar/logo'));
        this.addChild(this.logo)
        this.logo.alpha = 0.6
        //this.resize(this.bg.width,20)


        this.balanceText = new PIXI.Text(window.Lang.default["SB_TXT"].str.replace("%s", "Balance").replace("%d", ""), window.Lang.default["SB_TXT"])
        this.balanceText.anchor.set(1, 0.5)
        this.addChild(this.balanceText)

        this.betText = new PIXI.Text(window.Lang.default["SB_TXT"].str.replace("%s", "Bet").replace("%d", ""), window.Lang.default["SB_TXT"])
        this.betText.anchor.set(0.5, 0.5)
        this.addChild(this.betText)

        this.winText = new PIXI.Text(window.Lang.default["SB_TXT"].str.replace("%s", "Win").replace("%d", ""), window.Lang.default["SB_TXT"])
        this.winText.anchor.set(0, 0.5)
        this.addChild(this.winText)
    }



    resize(w, h) {

        this.bg.width = w
        this.bg.height = h
        var scaleRatio = h / 30

        this.menuBtn.scale.set(scaleRatio, scaleRatio)
        this.menuBtn.position.set(10 * scaleRatio, 6 * scaleRatio)

        this.soundOnBtn.scale.set(scaleRatio, scaleRatio)
        this.soundOnBtn.position.set(50 * scaleRatio, 5 * scaleRatio)

        this.soundOffBtn.scale.set(scaleRatio, scaleRatio)
        this.soundOffBtn.position.set(49 * scaleRatio, 0)

        this.fastOffBtn.scale.set(scaleRatio, scaleRatio)
        this.fastOffBtn.position.set(89 * scaleRatio, 0)

        this.fastOnBtn.scale.set(scaleRatio, scaleRatio)
        this.fastOnBtn.position.set(90 * scaleRatio, 2)
        
        this.helpBtn.scale.set(scaleRatio, scaleRatio)
        this.helpBtn.position.set(120 * scaleRatio, 7)
        


        this.closeBtn.scale.set(scaleRatio * 0.75, scaleRatio * 0.75)
        this.closeBtn.position.set(w - 35 * scaleRatio, 2)

        this.logo.scale.set(scaleRatio, scaleRatio)
        this.logo.position.set(w - 135 * scaleRatio, 2)
        //
        //this.betTxt2.position.set(this.menuBtn.x - 30 * this.scaleM - textMetrics3.width, -25)

        
        const textMetrics3 = PIXI.TextMetrics.measureText(this.betText.text, new PIXI.TextStyle(window.Lang.default["SB_TXT"]));
        
        this.balanceText.scale.set(scaleRatio, scaleRatio)
        this.balanceText.position.set(w / 2 - (textMetrics3.width/2+20) * scaleRatio, h / 2)

        this.betText.scale.set(scaleRatio, scaleRatio)
        this.betText.position.set(w / 2, h / 2)

        this.winText.scale.set(scaleRatio, scaleRatio)
        this.winText.position.set(w / 2 + (textMetrics3.width/2+20) * scaleRatio, h / 2)

    }
    
    update(obj) {
        if (obj.menu !== undefined) {
            if (obj.menu === 1) {
                this.menuBtn.buttonMode = true;
                this.menuBtn.interactive = true;
                this.menuBtn.alpha = 1;
            } else {
                this.menuBtn.buttonMode = false;
                this.menuBtn.interactive = false;
                this.menuBtn.alpha = 0.5;
            }
        }

        if (obj.sound !== undefined) {
            this.soundOnBtn.buttonMode = obj.sound === 1;
            this.soundOnBtn.interactive = obj.sound === 1;
            this.soundOnBtn.alpha = obj.sound;

            this.soundOffBtn.buttonMode = obj.sound !== 1;
            this.soundOffBtn.interactive = obj.sound !== 1;
            this.soundOffBtn.alpha = 1 - obj.sound;
        }

        if (obj.fast !== undefined) {
            this.fastOnBtn.buttonMode = obj.fast === 1;
            this.fastOnBtn.interactive = obj.fast === 1;
            this.fastOnBtn.alpha = obj.fast;

            this.fastOffBtn.buttonMode = obj.fast !== 1;
            this.fastOffBtn.interactive = obj.fast !== 1;
            this.fastOffBtn.alpha = 1 - obj.fast;
        }

        if (obj.balance !== undefined) {
            this.balanceText.text = window.Lang.default["SB_TXT"].str.replace("%s", "Balance").replace("%d", obj.balance)
        }

        if (obj.bet !== undefined) {
            this.betText.text = window.Lang.default["SB_TXT"].str.replace("%s", "Bet").replace("%d", obj.bet)
        }

        if (obj.win !== undefined) {
            this.winText.text = window.Lang.default["SB_TXT"].str.replace("%s", "Win").replace("%d", obj.win)
        }
        this.resize(this.bg.width,this.bg.height)
    }

    buttonClicked(obj) {
        this.callback_function(obj)
    }
}


export default StatusBar;
