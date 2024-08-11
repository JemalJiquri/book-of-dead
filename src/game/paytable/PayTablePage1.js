import * as PIXI from 'pixi.js'
import IconBook from '../libs/reels/bookofdead/IconBook.js';
import IconMan from '../libs/reels/bookofdead/IconMan.js';
import IconFeaturePic from "../libs/reels/bookofdead/IconFeaturePic.js"
import TWEEN from "@tweenjs/tween.js";
//src/game/libs/reels/bookofdead/IconBook.js

class PayTablePage1 extends PIXI.Sprite {

    mainBg = null
    framesList = []
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
    mansList = []
    mansListIndex = 0
    mansHolder = null

    tweenPointer = null
    timeout1 = 0
    timeout2 = 0
    timeout3 = 0

    init() {
        this.initTexture()
        this.initText()
    }



    initTexture() {

        this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menuarrow'));
        this.addChild(this.pageTextures)
        this.pageTextures.alpha = 1
        this.pageTextures.x = 580
        this.pageTextures.y = 140

        this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menustrip'));
        this.addChild(this.pageTextures)
        this.pageTextures.alpha = 1
        this.pageTextures.x = 645
        this.pageTextures.y = 190
        this.pageTextures.rotation = 33

        this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menustrip'));
        this.addChild(this.pageTextures)
        this.pageTextures.alpha = 1
        this.pageTextures.x = 145
        this.pageTextures.y = 250

        this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menubigstrip'));
        this.addChild(this.pageTextures)
        this.pageTextures.alpha = 1
        this.pageTextures.x = 345
        this.pageTextures.y = 578


        this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menubigstrip'));
        this.addChild(this.pageTextures)
        this.pageTextures.alpha = 1
        this.pageTextures.x = 345
        this.pageTextures.y = 635


        this.book1 = new IconBook()
        this.book1.init(this.bookItem)
        this.book1.position.set(105, 60)
        this.book1.animateLoop()
        this.book1.scale.set(0.6, 0.6)
        this.addChild(this.book1)

        this.book2 = new IconBook()
        this.book2.init(this.bookItem)
        this.book2.position.set(265, 60)
        this.book2.animateLoop()
        this.book2.scale.set(0.6, 0.6)
        this.addChild(this.book2)

        this.book3 = new IconBook()
        this.book3.init(this.bookItem)
        this.book3.position.set(425, 60)
        this.book3.animateLoop()
        this.book3.scale.set(0.6, 0.6)
        this.addChild(this.book3)



        this.book4 = new IconBook()
        this.book4.init(this.bookItem)
        this.book4.position.set(215, 315)
        this.book4.scale.set(0.6, 0.6)
        this.addChild(this.book4)




        this.splash1 = new PIXI.Sprite.from(PIXI.Texture.from('splash1'));
        this.splash1.position.set(710, 100)
        this.addChild(this.splash1);

        this.splash2 = new PIXI.Sprite.from(PIXI.Texture.from('splash2'));
        this.splash2.position.set(710, 100)
        this.splash2.alpha = 0
        this.addChild(this.splash2);

        this.splash3 = new PIXI.Sprite.from(PIXI.Texture.from('splash3'));
        this.splash3.position.set(710, 100)
        this.splash3.alpha = 0
        this.addChild(this.splash3);

        this.splash4 = new PIXI.Sprite.from(PIXI.Texture.from('splash4'));
        this.splash4.position.set(710, 100)
        this.splash4.alpha = 0
        this.addChild(this.splash4);

        this.framesList.push(this.splash1)
        this.framesList.push(this.splash2)
        this.framesList.push(this.splash3)
        this.framesList.push(this.splash4)

        this.line = new PIXI.Sprite.from(PIXI.Texture.from('paytable/menubigstrip'));
        this.line.position.set(650, 400)
        this.addChild(this.line);

        this.mansHolder = new PIXI.Sprite()
        this.addChild(this.mansHolder);
        this.animateSplash()

    }

    restartAnimations() {
        clearTimeout(this.timeout1)
        clearTimeout(this.timeout2)
        clearTimeout(this.timeout3)
        if (this.tweenPointer) {
            this.tweenPointer.stop()
        }
        while (this.mansHolder.children[0]) {
            this.mansHolder.removeChild(this.mansHolder.children[0]);
        }
        this.framesList = []
        this.splash1.alpha = 1
        this.splash2.alpha = 0
        this.splash3.alpha = 0
        this.splash4.alpha = 0
        this.framesList.push(this.splash1)
        this.framesList.push(this.splash2)
        this.framesList.push(this.splash3)
        this.framesList.push(this.splash4)
        this.animateSplash()
    }
    

    animateSplash() {
        if (this.framesList.length === 0) {
            this.addManIcons()
        } else {
            var item = this.framesList.shift()
            item.alpha = 1
            this.timeout1 = setTimeout(function () {
                this.animateSplash()
            }.bind(this), 300);
        }

    }


    addManIcons() {
        this.mansListIndex = 0
        this.mansList = []

        while (this.mansHolder.children[0]) {
            this.mansHolder.removeChild(this.mansHolder.children[0]);
        }


        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 3; y++) {
                var man = new IconMan()
                man.init(this.manItem, 1)
                man.position.set(723 + x * 82, 113 + y * 76)
                man.alpha = 0
                man.scale.set(0.34, 0.34)
                //710, 100
                var blicka = PIXI.Sprite.from(PIXI.Texture.from("blicka"));
                blicka.anchor.set(0.5, 0.5)
                blicka.position.set(763 + x * 82, 153 + y * 76)
                blicka.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT
                blicka.alpha = 0
                this.mansList.push({ icon: man, blicka: blicka })

                this.mansHolder.addChild(man)
                this.mansHolder.addChild(blicka)

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
            this.tweenPointer = new TWEEN.Tween(current.blicka.scale)
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
            this.timeout2 = setTimeout(function () {
                for (let index = 0; index < this.mansList.length; index++) {
                    const element = this.mansList[index].icon;
                    element.animate()
                }
                this.timeout3 = setTimeout(function () {
                    this.animateMansLoop()
                }.bind(this), 5000);
            }.bind(this), 1000);
        }
    }


    initText() {
        this.pageTexts = new PIXI.Text(window.Lang.default["MENUPAGEATEXA"].str, window.Lang.default["MENUPAGEATEXA"])
        this.pageTexts.anchor.set(0, 0)
        this.pageTexts.position.set(140, 230)
        this.addChild(this.pageTexts)


        this.pageTexts = new PIXI.Text(window.Lang.default["MENUPAGEATEXB"].str, window.Lang.default["MENUPAGEATEXB"])
        this.pageTexts.anchor.set(0, 0)
        this.pageTexts.position.set(260, 270)
        this.addChild(this.pageTexts)


        this.pageTexts = new PIXI.Text(window.Lang.default["MENUPAGEATEXC"].str, window.Lang.default["MENUPAGEATEXC"])
        this.pageTexts.anchor.set(0, 0)
        this.pageTexts.position.set(55, 460)
        this.addChild(this.pageTexts)

        this.pageTexts = new PIXI.Text(window.Lang.default["MENUPAGEATEXD"].str, window.Lang.default["MENUPAGEATEXD"])
        this.pageTexts.anchor.set(0, 0)
        this.pageTexts.position.set(695, 465)
        this.addChild(this.pageTexts)

        this.pageTexts = new PIXI.Text(window.Lang.default["MENUPAGEATEXE"].str, window.Lang.default["MENUPAGEATEXE"])
        this.pageTexts.anchor.set(0, 0)
        this.pageTexts.position.set(430, 595)
        this.addChild(this.pageTexts)


        var scatterWinx5 = new PIXI.Text("X5", window.Lang.default["PAY_TABLE_WIN"])
        scatterWinx5.anchor.set(0, 0)
        scatterWinx5.position.set(360, 320)
        this.addChild(scatterWinx5)

        var scatterWinx4 = new PIXI.Text("X4", window.Lang.default["PAY_TABLE_WIN"])
        scatterWinx4.anchor.set(0, 0)
        scatterWinx4.position.set(360, 365)
        this.addChild(scatterWinx4)

        var scatterWinx3 = new PIXI.Text("X3", window.Lang.default["PAY_TABLE_WIN"])
        scatterWinx3.anchor.set(0, 0)
        scatterWinx3.position.set(360, 410)
        this.addChild(scatterWinx3)

        

        var scatterWinx200 = new PIXI.Text("200", window.Lang.default["PAY_TABLE_WIN2"])
        scatterWinx200.anchor.set(0, 0)
        scatterWinx200.position.set(410, 320)
        this.addChild(scatterWinx200)

        var scatterWinx20 = new PIXI.Text("20", window.Lang.default["PAY_TABLE_WIN2"])
        scatterWinx20.anchor.set(0, 0)
        scatterWinx20.position.set(410, 365)
        this.addChild(scatterWinx20)

        var scatterWinx2 = new PIXI.Text("2", window.Lang.default["PAY_TABLE_WIN2"])
        scatterWinx2.anchor.set(0, 0)
        scatterWinx2.position.set(410, 410)
        this.addChild(scatterWinx2)





    }


}


export default PayTablePage1
