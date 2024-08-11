import * as PIXI from 'pixi.js'
import Globals from './Globals';
import IconBook from './libs/reels/bookofdead/IconBook';
import IconMan from './libs/reels/bookofdead/IconMan';
import Shared from "./libs/reels/bookofdead/Shared"
import IconFeaturePic from "./libs/reels/bookofdead/IconFeaturePic"
import TWEEN from "@tweenjs/tween.js";
import BTGButton from '../ui/buttons/btgbutton';

//git add . && git commit -m "fixes" && git push -u origin main
//git submodule foreach git pull origin main




class SplashScreen extends PIXI.Sprite {

    mainBg = null
    framesList = []
    mansList = []
    mansListIndex = 0
    bookItem = {
        id: 9,
        name: "Book",
        itemClass: IconBook,
        itemFeatureClass: IconFeaturePic,
        itemOrigin: 'allIcons/icon0018',
        itemRotate: 'allIcons/icon0019',
    }

    manItem = {
        id: 8,
        name: "Man",
        itemClass: IconMan,
        itemFeatureClass: IconFeaturePic,
        itemOrigin: 'allIcons/icon0016',
        itemRotate: 'allIcons/icon0017',
    }

    init(game) {
        this.game = game
        Shared.init()
        this.mainBg = new PIXI.Sprite.from(PIXI.Texture.from('splashbg'));
        this.addChild(this.mainBg);

        this.SPLASH_FREE = new PIXI.Text(
            window.Lang.default["SPLASH_FREE"].str,
            window.Lang.default["SPLASH_FREE"])
        this.SPLASH_FREE.anchor.set(0.5, 0.5)
        this.SPLASH_FREE.position.set(580, 170)
        this.addChild(this.SPLASH_FREE)

        this.SPLASH_FREE_DESC = new PIXI.Text(
            window.Lang.default["SPLASH_FREE_DESC"].str,
            window.Lang.default["SPLASH_FREE_DESC"])
        this.SPLASH_FREE_DESC.anchor.set(0.5, 0.5)
        this.SPLASH_FREE_DESC.position.set(580, 630)
        this.addChild(this.SPLASH_FREE_DESC)

        this.SPLASH_FREE_DESC2 = new PIXI.Text(
            window.Lang.default["SPLASH_FREE_DESC2"].str,
            window.Lang.default["SPLASH_FREE_DESC2"])
        this.SPLASH_FREE_DESC2.anchor.set(0.5, 0.5)
        this.SPLASH_FREE_DESC2.position.set(1230, 630)
        this.addChild(this.SPLASH_FREE_DESC2)


        this.book1 = new IconBook()
        this.book1.init(this.bookItem)
        this.book1.position.set(340, 340)
        this.book1.animateLoop()
        this.book1.scale.set(0.7, 0.7)
        this.addChild(this.book1)

        this.book2 = new IconBook()
        this.book2.init(this.bookItem)
        this.book2.position.set(500, 340)
        this.book2.animateLoop()
        this.book2.scale.set(0.7, 0.7)
        this.addChild(this.book2)

        this.book3 = new IconBook()
        this.book3.init(this.bookItem)
        this.book3.position.set(660, 340)
        this.book3.animateLoop()
        this.book3.scale.set(0.7, 0.7)
        this.addChild(this.book3)

        //framesList

        this.splash1 = new PIXI.Sprite.from(PIXI.Texture.from('splash1'));
        this.splash1.position.set(1000, 200)
        this.addChild(this.splash1);

        this.splash2 = new PIXI.Sprite.from(PIXI.Texture.from('splash2'));
        this.splash2.position.set(1000, 200)
        this.splash2.alpha = 0
        this.addChild(this.splash2);

        this.splash3 = new PIXI.Sprite.from(PIXI.Texture.from('splash3'));
        this.splash3.position.set(1000, 200)
        this.splash3.alpha = 0
        this.addChild(this.splash3);

        this.splash4 = new PIXI.Sprite.from(PIXI.Texture.from('splash4'));
        this.splash4.position.set(1000, 200)
        this.splash4.alpha = 0
        this.addChild(this.splash4);

        this.framesList.push(this.splash1)
        this.framesList.push(this.splash2)
        this.framesList.push(this.splash3)
        this.framesList.push(this.splash4)



        //splashbtn
        this.splashbtn = new BTGButton();
        this.splashbtn.init({
            bg: { data: 'splashbtn', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['SPLASH_CONT'],
            callback_function: this.buttonClicked.bind(this),
            name: "splashbtn"

        })
        this.splashbtn.position.set(750,880)
        this.addChild(this.splashbtn);

        this.splashcb = new BTGButton();
        this.splashcb.init({
            bg: { data: 'splashcb', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: "splashcb"

        })
        this.splashcb.position.set(1110,900)
        this.addChild(this.splashcb);

        
        this.splashcb2 = new PIXI.Sprite.from(PIXI.Texture.from('splashcb2'));
        this.splashcb2.position.set(1114,900)
        this.splashcb2.alpha = 0
        this.addChild(this.splashcb2);


        this.SPLASH_FREE_CB2 = new PIXI.Text(
            window.Lang.default["SPLASH_FREE_CB2"].str,
            window.Lang.default["SPLASH_FREE_CB2"])
        this.SPLASH_FREE_CB2.anchor.set(0, 0.5)
        this.SPLASH_FREE_CB2.position.set(1164,920)
        this.addChild(this.SPLASH_FREE_CB2)

        setTimeout(function () {
            this.animateSplash()
        }.bind(this), 300);
        this.resize()
    }

    buttonClicked(btn){
        console.log(btn.name)
        if(btn.name === "splashcb"){
            Globals.session.splashScreen = !Globals.session.splashScreen
            this.splashcb2.alpha = !Globals.session.splashScreen?1:0
            Globals.saveSession()
        }
        if(btn.name === "splashbtn"){
            this.book1.stopLoop()
            this.book2.stopLoop()
            this.book3.stopLoop()
            this.game.closeSplash()
        }
    }

    animateSplash() {
        if (this.framesList.length === 0) {
            this.addManIcons()
        } else {
            var item = this.framesList.shift()
            item.alpha = 1
            setTimeout(function () {
                this.animateSplash()
            }.bind(this), 300);
        }

    }

    addManIcons() {
        this.mansListIndex = 0
        this.mansList = []
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 3; y++) {
                var man = new IconMan()
                man.init(this.manItem, 1)
                man.position.set(1013 + x * 82, 213 + y * 76)
                man.alpha = 0
                man.scale.set(0.34, 0.34)

                var blicka = PIXI.Sprite.from(PIXI.Texture.from("blicka"));
                blicka.anchor.set(0.5, 0.5)
                blicka.position.set(1053 + x * 82, 253 + y * 76)
                blicka.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT
                blicka.alpha = 0
                this.mansList.push({ icon: man, blicka: blicka })

                this.addChild(man)
                this.addChild(blicka)

            }

        }
        this.animateMans()

    }

    animateMans() {
        if (this.mansListIndex >= this.mansList.length) {
            this.animateMansLoop()

        } else {
            var current = this.mansList[this.mansListIndex]
            current.blicka.alpha = 1
            new TWEEN.Tween(current.blicka.scale)
                .to({ x: 2, y: 2 }, 150)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () {
                    current.icon.alpha = 1
                    current.blicka.alpha = 0
                    this.animateMans()
                }.bind(this))
                .start()
        }
        this.mansListIndex++

    }

    animateMansLoop() {
        if (this.parent) {
            setTimeout(function () {
                for (let index = 0; index < this.mansList.length; index++) {
                    const element = this.mansList[index].icon;
                    element.animate()
                }
                setTimeout(function () {
                    this.animateMansLoop()
                }.bind(this), 5000);
            }.bind(this), 1000);
        }
    }

    resize() {
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

        Globals.windowWidth = window.innerWidth
        Globals.windowHeight = window.innerHeight
        Globals.scale = minS
        this.scale.x = this.scale.y = Globals.scale

        this.x = (_w - Globals.width * Globals.scale) / 2
        this.y = (_h - Globals.height * Globals.scale) / 2

    }



}


export default SplashScreen
