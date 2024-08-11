import * as PIXI from 'pixi.js'
import Icon from '../libs/reels/rheel/Icon';
import IconFeature from '../libs/reels/bookofdead/IconFeature';


class PayTablePage3 extends PIXI.Sprite {

    aItem = {
        id: 4,
        name: "A",
        itemClass: Icon,
        itemFeatureClass: IconFeature,
        featureIconOffset: 6,
        itemOrigin: 'allIcons/icon0008',
        itemRotate: 'allIcons/icon0009',
        itemAnimate: "icon4_animFr"
    }

    kItem = {
        id: 3,
        name: "K",
        itemClass: Icon,
        itemFeatureClass: IconFeature,
        featureIconOffset: 7,
        itemOrigin: 'allIcons/icon0006',
        itemRotate: 'allIcons/icon0007',
        itemAnimate: "icon3_animFr"
    }

    qItem = {
        id: 2,
        name: "Q",
        itemClass: Icon,
        itemFeatureClass: IconFeature,
        featureIconOffset: 8,
        itemOrigin: 'allIcons/icon0004',
        itemRotate: 'allIcons/icon0005',
        itemAnimate: "icon2_animFr"
    }

    jItem = {
        id: 1,
        name: "J",
        itemClass: Icon,
        itemFeatureClass: IconFeature,
        featureIconOffset: 9,
        itemOrigin: 'allIcons/icon0002',
        itemRotate: 'allIcons/icon0003',
        itemAnimate: "icon1_animFr"
    }

    tItem = {
        id: 0,
        name: "10",
        itemClass: Icon,
        itemFeatureClass: IconFeature,
        featureIconOffset: 10,
        itemOrigin: 'allIcons/icon0000',
        itemRotate: 'allIcons/icon0001',
        itemAnimate: "icon0_animFr"
    }

    items = []
    animIndex = 0



    manIcon = null

    init() {

        this.initTexture();
        this.initText();
    }


    initTexture() {

        for (let i = 0; i < 5; i++) {
            this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menublockx'));
            this.addChild(this.pageTextures)
            this.pageTextures.scale.x = 1.15
            this.pageTextures.scale.y = 1.13
            this.pageTextures.x = 60 + (this.pageTextures.width + 10) * i
            this.pageTextures.y = 70
        }

        this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menulinebar'));
        this.addChild(this.pageTextures)
        this.pageTextures.alpha = 1
        this.pageTextures.x = 17
        this.pageTextures.y = 495
        this.pageTextures.scale.x = 1.16
        this.pageTextures.scale.y = 1.16

        //aItem  kItem qItem jItem tItem

        this.createIconLine(this.aItem, 0, [
            { cnt: "X5", coeff: "150" },
            { cnt: "X4", coeff: "40" },
            { cnt: "X3", coeff: "5" }
        ])
        this.createIconLine(this.kItem, 1, [
            { cnt: "X5", coeff: "150" },
            { cnt: "X4", coeff: "40" },
            { cnt: "X3", coeff: "5" }
        ])
        this.createIconLine(this.qItem, 2, [
            { cnt: "X5", coeff: "100" },
            { cnt: "X4", coeff: "25" },
            { cnt: "X3", coeff: "5" }
        ])
        this.createIconLine(this.jItem, 3, [
            { cnt: "X5", coeff: "100" },
            { cnt: "X4", coeff: "25" },
            { cnt: "X3", coeff: "5" }
        ])

        this.createIconLine(this.tItem, 4, [
            { cnt: "X5", coeff: "100" },
            { cnt: "X4", coeff: "25" },
            { cnt: "X3", coeff: "5" }
        ])

        this.animIndex = -1
        this.animateNext()

    }

    animateNext() {
        this.animIndex++
        if (this.animIndex >= this.items.length) {
            this.animIndex = 0
        }
        this.items[this.animIndex].animate()
        this.timeout1 = setTimeout(function () {
            this.animateNext()
        }.bind(this), 3000);
    }


    createIconLine(conf, index, wins) {
        var icn = new conf.itemClass()
        icn.init(conf, 0)
        icn.position.set(83 + index * 230, 93)
        icn.scale.set(0.7, 0.7)
        this.addChild(icn)
        this.items.push(icn)


        for (let i = 0; i < wins.length; i++) {
            const element = wins[i];
            var wtxt = new PIXI.Text(element.cnt, window.Lang.default["PAY_TABLE_WIN"])
            wtxt.anchor.set(0, 0)
            wtxt.position.set(100 + index * 230, 280 + i * 40)
            this.addChild(wtxt)

            var wtxt2 = new PIXI.Text(element.coeff, window.Lang.default["PAY_TABLE_WIN2"])
            wtxt2.anchor.set(0, 0)
            wtxt2.position.set(150 + index * 230, 280 + i * 40)
            this.addChild(wtxt2)
        }
    }



    initText() {
        this.pageTexts = new PIXI.Text(window.Lang.default["MENUPAGEATEXF"].str, window.Lang.default["MENUPAGEATEXF"])
        this.pageTexts.anchor.set(0, 0)
        this.pageTexts.position.set(330, 595)
        this.addChild(this.pageTexts)

    }
    restartAnimations() {

    }

}


export default PayTablePage3
