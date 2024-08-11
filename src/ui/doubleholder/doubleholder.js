import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import BTGButton from '../buttons/btgbutton';
import ButtonConstants from '../buttons/buttonconstants';

class Doubleholder extends PIXI.Sprite {
    bg = null
    winCoin = null
    chooseText = null
    colorText = null
    suitText = null
    prevousText = null
    doubleWinText = null
    qadrupleWinText = null
    redBtn = null
    blackBtn = null
    heartBtn = null
    brickBtn = null
    crossBtn = null
    mainCard = null
    winCard = null
    pastCardArr = []
    doubleCardArr = []
    qadrupleCardArr = []
    callback_function = null
    bgMask = null
    status = true
    bgSound = null
    rotating = false
    unlockafter = false
    unlockstate = false


    init(_callback_function, _winCoin) {
        this.callback_function = _callback_function
        this.winCoin = _winCoin
        this.initButton();
        this.initText();
        this.initPastCard([]);
        this.updateWinText();
        this.buttonAnim();
    }

    showHide(_status) { 
        this.status = _status
        if (this.status) {
            this.bgSound = window.SoundManager.play({ name: "gamblesuspense", loop: true,volume:0.5 })
        } else {
            if (this.bgSound) {
                this.bgSound.fadeOut(500)
            }
        }
        this.bg.y = 0
        if(this.status){
            this.bg.alpha = 0
        }
        new TWEEN.Tween(this.bg)
            .to({ alpha: this.status ? 1 : 0 }, 200)
            .delay(300)
            .easing(this.status ? TWEEN.Easing.Cubic.Out : TWEEN.Easing.Cubic.In)
            .onComplete(function () {
                if (!this.status) {
                    if (this.parent) {
                        this.parent.removeChild(this)
                    }
                }
            }.bind(this)).start()
    }

    winLost(state) {
        if (state) {
            window.SoundManager.play({ name: "gamblewin", loop: false })
        } else {
            window.SoundManager.play({ name: "loseDouble", loop: false,volume:0.5  })
        }
    }

    initButton() {

        this.bg = PIXI.Sprite.from(PIXI.Texture.from('double/doublebg'));
        this.addChild(this.bg)
        this.bg.y = -this.bg.height

        this.bgMask = this.createMask(this.bg.width, this.bg.height)
        this.bg.mask = this.bgMask
        this.addChild(this.bgMask)

        //bgMask

        this.redBtn = new BTGButton();
        this.redBtn.init({
            bg: { data: 'double/gamblebutton_r1', alpha: 1, x: 0, y: 0 },
            bg2: { data: 'double/gamblebutton_r2', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'double/gamblebutton_r2', alpha: 0, x: 0, y: 0 },
            snd: "fx_chime",
            text: window.Lang.default['DOUBLEREDBTNTEXT'],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_GAMBLE_RED

        })
        this.bg.addChild(this.redBtn);
        this.redBtn.x = 190;
        this.redBtn.y = 300;
        this.redBtn.y = 300;


        this.doubleCardArr.push(this.redBtn)



        this.blackBtn = new BTGButton();
        this.blackBtn.init({
            bg: { data: 'double/gamblebutton_b1', alpha: 1, x: 0, y: 0 },
            bg2: { data: 'double/gamblebutton_b2', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'double/gamblebutton_b2', alpha: 0, x: 0, y: 0 },
            snd: "fx_chime",
            text: window.Lang.default['DOUBLEBLECKBTNTEXT'],
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_GAMBLE_BLACK
        })
        this.bg.addChild(this.blackBtn);
        this.blackBtn.x = this.redBtn.x;
        this.blackBtn.y = this.redBtn.y + this.redBtn.get_size().height;
        this.doubleCardArr.push(this.blackBtn)



        this.heartBtn = new BTGButton();
        this.heartBtn.init({
            bg: { data: 'double/gamblebutton_h1', alpha: 1, x: 0, y: 0 },
            bg2: { data: 'double/gamblebutton_h2', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'double/gamblebutton_h2', alpha: 0, x: 0, y: 0 },
            snd: "fx_chime",
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_GAMBLE_HEART
        })
        this.bg.addChild(this.heartBtn);
        this.heartBtn.x = 845;
        this.heartBtn.y = this.redBtn.y;
        this.qadrupleCardArr.push(this.heartBtn)



        this.diamondBtn = new BTGButton();
        this.diamondBtn.init({
            bg: { data: 'double/gamblebutton_br1', alpha: 1, x: 0, y: 0 },
            bg2: { data: 'double/gamblebutton_br2', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'double/gamblebutton_br2', alpha: 0, x: 0, y: 0 },
            snd: "fx_chime",
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_GAMBLE_DIAMOND
        })
        this.bg.addChild(this.diamondBtn);
        this.diamondBtn.x = this.heartBtn.x + this.heartBtn.get_size().width;
        this.diamondBtn.y = this.heartBtn.y;
        this.qadrupleCardArr.push(this.diamondBtn)


        this.clubsBtn = new BTGButton();
        this.clubsBtn.init({
            bg: { data: 'double/gamblebutton_c1', alpha: 1, x: 0, y: 0 },
            bg2: { data: 'double/gamblebutton_c2', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'double/gamblebutton_c2', alpha: 0, x: 0, y: 0 },
            snd: "fx_chime",
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_GAMBLE_CLUBS
        })
        this.bg.addChild(this.clubsBtn);
        this.clubsBtn.x = this.heartBtn.x;
        this.clubsBtn.y = this.heartBtn.y + this.heartBtn.get_size().height;
        this.qadrupleCardArr.push(this.clubsBtn)


        this.spideBtn = new BTGButton();
        this.spideBtn.init({
            bg: { data: 'double/gamblebutton_s1', alpha: 1, x: 0, y: 0 },
            bg2: { data: 'double/gamblebutton_s2', alpha: 0, x: 0, y: 0 },
            pressed: { data: 'double/gamblebutton_s2', alpha: 0, x: 0, y: 0 },
            snd: "fx_chime",
            callback_function: this.buttonClicked.bind(this),
            name: ButtonConstants.BTN_GAMBLE_SPYDE
        })
        this.bg.addChild(this.spideBtn);
        this.spideBtn.x = this.heartBtn.x + this.heartBtn.get_size().width;
        this.spideBtn.y = this.heartBtn.y + this.heartBtn.get_size().height;
        this.qadrupleCardArr.push(this.spideBtn)


        this.mainCard = PIXI.Sprite.from(PIXI.Texture.from('double/gamblecardbg'));
        this.bg.addChild(this.mainCard)
        this.mainCard.x = 520;
        this.mainCard.y = 210;
    }

    lockButtons(mode) {
        var buttonsHolder = [
            this.redBtn,
            this.blackBtn,
            this.heartBtn,
            this.diamondBtn,
            this.clubsBtn,
            this.spideBtn
        ]
        console.log('this.rotating '+this.rotating)
        if(!this.rotating){
            for (let i = 0; i < buttonsHolder.length; i++) {
                buttonsHolder[i].setEnabled(!mode, true)
            }
        }else{
            this.unlockafter = true
            this.unlockstate = mode
        }

    }


    createMask(width, height) {
        var holderMask = new PIXI.Graphics();
        holderMask.beginFill(0x8bc5ff, 1);
        holderMask.moveTo(0, 0);
        holderMask.lineTo(width, 0);
        holderMask.lineTo(width, height);
        holderMask.lineTo(0, height);
        holderMask.lineTo(0, 0);
        return holderMask
    }


    initText() {
        this.chooseText = new PIXI.Text(window.Lang.default["DOUBLETEXTX"].str, window.Lang.default["DOUBLETEXTX"])
        this.chooseText.anchor.set(0, 0)
        this.chooseText.position.set(270, 110)
        this.bg.addChild(this.chooseText)

        this.colorText = new PIXI.Text(window.Lang.default["DOUBLECOLORTEXT"].str, window.Lang.default["DOUBLECOLORTEXT"])
        this.colorText.anchor.set(0, 0)
        this.colorText.position.set(230, 185)
        this.bg.addChild(this.colorText)

        this.suitText = new PIXI.Text(window.Lang.default["DOUBLESUITTEXT"].str, window.Lang.default["DOUBLESUITTEXT"])
        this.suitText.anchor.set(0, 0)
        this.suitText.position.set(885, 185)
        this.bg.addChild(this.suitText)

        this.prevousText = new PIXI.Text(window.Lang.default["DOUBLEPREVIOUSTEXT"].str, window.Lang.default["DOUBLEPREVIOUSTEXT"])
        this.prevousText.anchor.set(0, 0)
        this.prevousText.position.set(240, 550)
        this.bg.addChild(this.prevousText)

        this.doubleWinText = new PIXI.Text(window.Lang.default["DOUBLEWINTEXT"].str, window.Lang.default["DOUBLEWINTEXT"])
        this.doubleWinText.anchor.set(0.5, 0)
        this.doubleWinText.position.set(300, 230)
        this.bg.addChild(this.doubleWinText)

        this.qadrupleWinText = new PIXI.Text(window.Lang.default["DOUBLEWINTEXT"].str, window.Lang.default["DOUBLEWINTEXT"])
        this.qadrupleWinText.anchor.set(0.5, 0)
        this.qadrupleWinText.position.set(940, 230)
        this.bg.addChild(this.qadrupleWinText)

    }

    updateWinText() {
        this.doubleWinText.text = window.Lang.default["DOUBLEWINTEXT"].str.replace("%d", this.winCoin * 2);
        this.qadrupleWinText.text = window.Lang.default["DOUBLEWINTEXT"].str.replace("%d", this.winCoin * 4);
    }

    cardAnimation(indexWinCard) {
        // gamble_card_1
        let cardWidth = this.mainCard.width
        let cardX = this.mainCard.x

        this.winCard = PIXI.Sprite.from(PIXI.Texture.from('double/gamble_card_' + indexWinCard));
        this.bg.addChild(this.winCard)
        this.winCard.x = this.mainCard.x + this.winCard.width / 2;
        this.winCard.y = this.mainCard.y;
        this.winCard.width = 0

        // this.showLastPastCard(indexWinCard)
        this.unlockafter = false
        this.rotating = true
        new TWEEN.Tween(this.mainCard)
            .to({ width: 0, x: this.mainCard.x + this.mainCard.width / 2 }, 300)
            .delay(10)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                new TWEEN.Tween(this.winCard)
                    .to({ width: cardWidth, x: cardX }, 300)
                    .delay(100)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        this.showLastPastCard(indexWinCard)
                        new TWEEN.Tween(this.winCard)
                            .to({ width: 0, x: this.winCard.x + this.winCard.width / 2 }, 300)
                            .delay(1000)
                            .easing(TWEEN.Easing.Linear.None)
                            .onComplete(function () {
                                new TWEEN.Tween(this.mainCard)
                                    .to({ width: cardWidth, x: cardX }, 300)
                                    .delay(100)
                                    .easing(TWEEN.Easing.Linear.None)
                                    .onComplete(()=>{
                                        this.rotating = false
                                        console.log('finished '+this.unlockafter)
                                        //this.unlockstate
                                        if(this.unlockafter){
                                            this.lockButtons(this.unlockstate)
                                        }
                                    })
                                    .start()
                            }.bind(this)).start()
                    }.bind(this)).start()
            }.bind(this)).start()
    }


    initPastCard(inecCardArr = []) {
        for (let i = 0; i < inecCardArr.length; i++) {
            let lastCard = PIXI.Sprite.from(PIXI.Texture.from('double/tiny_card_' + inecCardArr[i]));
            this.bg.addChild(lastCard)
            lastCard.scale.x = 0.75
            lastCard.scale.y = 0.75
            lastCard.x = 580 + lastCard.height * i;
            lastCard.y = 540;
            this.pastCardArr.push(lastCard)
        }

    }

    buttonAnim() {
        if (!this.status) {
            return
        }
        new TWEEN.Tween(this.doubleCardArr[0])
            .to({}, 100)
            .delay(500)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                this.changeColor(true)
                new TWEEN.Tween(this.doubleCardArr[0])
                    .to({}, 100)
                    .delay(500)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        this.changeColor(false)
                        this.buttonAnim()
                    }.bind(this)).start()
            }.bind(this)).start()
    }

    changeColor(status) {
        if (status) {
            for (let i = 0; i < this.doubleCardArr.length; i++) {
                if (this.doubleCardArr[i].mouseOver) {
                    this.doubleCardArr[i].bg.alpha = 1;
                    this.doubleCardArr[i].bg2.alpha = 0;
                } else {
                    this.doubleCardArr[i].bg.alpha = 0;
                    this.doubleCardArr[i].bg2.alpha = 1;
                }

            }
            for (let i = 0; i < this.qadrupleCardArr.length; i++) {
                this.qadrupleCardArr[i].bg.alpha = 1;
                this.qadrupleCardArr[i].bg2.alpha = 0;

            }
        } else {
            for (let i = 0; i < this.doubleCardArr.length; i++) {
                this.doubleCardArr[i].bg.alpha = 1;
                this.doubleCardArr[i].bg2.alpha = 0;
            }
            for (let i = 0; i < this.qadrupleCardArr.length; i++) {
                if (this.qadrupleCardArr[i].mouseOver) {
                    this.qadrupleCardArr[i].bg.alpha = 1;
                    this.qadrupleCardArr[i].bg2.alpha = 0;
                } else {
                    this.qadrupleCardArr[i].bg.alpha = 0;
                    this.qadrupleCardArr[i].bg2.alpha = 1;
                }
            }
        }

    }


    showLastPastCard(lastCardindex) {
        if (this.pastCardArr.length === 0) {
            this.initPastCard([lastCardindex])
        } else {
            for (let i = 0; i < this.pastCardArr.length; i++) {
                new TWEEN.Tween(this.pastCardArr[i])
                    .to({ x: this.pastCardArr[i].x + this.pastCardArr[i].width }, 300)
                    .delay(100)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        let lastCard = PIXI.Sprite.from(PIXI.Texture.from('double/tiny_card_' + lastCardindex));
                        this.bg.addChild(lastCard)
                        lastCard.x = 580;
                        lastCard.y = 540;
                        lastCard.scale.x = 0.75
                        lastCard.scale.y = 0.75
                        this.pastCardArr.push(lastCard)
                    }.bind(this)).start()
            }
        }


    }

    buttonClicked(btn) {
        if (this.callback_function) {
            this.callback_function(btn)
        }
    }

}

export default Doubleholder;
