import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js";
import Config from "./Config"
import Constants from '../rheel/Constants';

class BookBonusPopup extends PIXI.Sprite {

    params = null
    view = null
    randomItems = []
    currentAnimIcon = null
    init(obj) {
        this.params = obj
        //bonus_book_anim/banner
        this.bg = PIXI.Sprite.from(PIXI.Texture.from("bonus_book_anim/banner"));
        this.bg.anchor.set(0.5, 0.5)
        this.bg.y = 50
        this.addChild(this.bg)

        this.view = new PIXI.Sprite()
        this.view.y = 50
        var bb1 = PIXI.Sprite.from(PIXI.Texture.from("bonusbird"));
        bb1.x = -400
        bb1.y = -380
        this.view.addChild(bb1)

        var bb2 = PIXI.Sprite.from(PIXI.Texture.from("bonusbird"));
        bb2.x = -400
        bb2.y = 100
        this.view.addChild(bb2)

        var bb3 = PIXI.Sprite.from(PIXI.Texture.from("bonusbird"));
        bb3.x = 400
        bb3.y = -380
        bb3.scale.x = -1
        this.view.addChild(bb3)

        var bb4 = PIXI.Sprite.from(PIXI.Texture.from("bonusbird"));
        bb4.x = 400
        bb4.y = 100
        bb4.scale.x = -1
        this.view.addChild(bb4)


        this.congrat = new PIXI.Text(window.Lang.default["RHEEL_CONGRAT"].str, window.Lang.default["RHEEL_CONGRAT"])
        this.congrat.anchor.set(0.5, 0.5)
        this.congrat.position.set(250, -240)
        this.view.addChild(this.congrat)


        this.youwon = new PIXI.Text(
            window.Lang.default["RHEEL_YOUWON"].str.replace("%s", this.params.freespins),
            window.Lang.default["RHEEL_YOUWON"])
        this.youwon.anchor.set(0.5, 0.5)
        this.youwon.position.set(250, -130)
        this.view.addChild(this.youwon)



        this.free = new PIXI.Text(
            window.Lang.default["RHEEL_FREE"].str,
            window.Lang.default["RHEEL_FREE"])
        this.free.anchor.set(0.5, 0.5)
        this.free.position.set(250, -70)
        this.view.addChild(this.free)

        this.press = new PIXI.Text(
            window.Lang.default["RHEEL_PRESS"].str,
            window.Lang.default["RHEEL_PRESS"])
        this.press.anchor.set(0.5, 0.5)
        this.press.position.set(250, 80)
        this.view.addChild(this.press)


        let lastItem = ""
        for (let index = 0; index < 40; index++) {
            const element = Config.items[Math.floor(Math.random() * (Config.items.length - 1))].itemOrigin;
            if (lastItem != element) {
                lastItem = element
                var ritem = PIXI.Sprite.from(PIXI.Texture.from(element));
                ritem.x = -350
                ritem.y = -180
                ritem.alpha = 0
                this.view.addChild(ritem)
                this.randomItems.push(ritem)
            }

            if (this.randomItems.length >= 20) {
                break
            }
        }

        for (let k = 0; k < Config.items.length; k++) {
            if (Config.items[k].id == this.params.item) {
                if (Config.LOG) console.log("this.params.item " + this.params.item)
                var fitem = PIXI.Sprite.from(PIXI.Texture.from(Config.items[k].itemOrigin));
                fitem.x = -350
                fitem.y = -180
                fitem.alpha = 0
                this.view.addChild(fitem)
                this.randomItems.push(fitem)
                break
            }
        }





        this.addChild(this.view)
        this.view.alpha = 0
    }


    open() {
        new TWEEN.Tween(this.scale)
            .to({ x: 1, y: 1 }, 800)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                this.animateRandomItem()
            }.bind(this))
            .start()
    }

    animateRandomItem() {
        new TWEEN.Tween(this.view)
            .to({ alpha: 1 }, 400)
            .easing(TWEEN.Easing.Linear.None)
            .start()


        this.animateIcons()

    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    animateIcons() {
        if (this.randomItems.length <= 0) {
            this.params.eventListener({ type: Constants.RHEEL_BONUS_ITEM_COMPLETED })
            return
        }
        if (this.currentAnimIcon) {
            this.view.removeChild(this.currentAnimIcon)
        }

        this.currentAnimIcon = this.randomItems.shift()
        if (this.randomItems.length == 0) {
            window.SoundManager.play({ name: "fsSelectSymbolFinalSnd", loop: false })
            setTimeout(() => {
                window.SoundManager.play({ name: "fsSummarySnd", loop: false })
            }, 1000);

        } else {
            window.SoundManager.play({ name: "fsSelectSymbol" + this.getRandomInt(1, 5) + "Snd", loop: false })
        }

        new TWEEN.Tween(this.currentAnimIcon)
            .to({ alpha: 1 }, 200)
            .onComplete(function () {
                this.animateIcons()
            }.bind(this))
            .easing(TWEEN.Easing.Linear.None)
            .start()

    }


}


export default BookBonusPopup;
