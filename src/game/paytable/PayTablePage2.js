import * as PIXI from 'pixi.js'
import IconMan from    '../libs/reels/bookofdead/IconMan.js';
import IconPharao from '../libs/reels/bookofdead/IconPharao.js';
import IconBird from   '../libs/reels/bookofdead/IconBird.js';
import IconWolf from '../libs/reels/bookofdead/IconWolf.js';
import IconFeaturePic from "../libs/reels/bookofdead/IconFeaturePic.js"


class PayTablePage2 extends PIXI.Sprite {

    manItem = {
        id: 8,
        name: "Man",
        itemClass: IconMan,
        itemFeatureClass: IconFeaturePic,
        itemOrigin: 'allIcons/icon0016',
        itemRotate: 'allIcons/icon0017',
    }

    birdItem = {
        id: 5,
        name: "Bird",
        itemClass: IconBird,
        itemFeatureClass: IconFeaturePic,
        itemOrigin: 'allIcons/icon0010',
        itemRotate: 'allIcons/icon0011',
    }

    wolfItem = {
        id: 6,
        name: "Wolf",
        itemClass: IconWolf,
        itemFeatureClass: IconFeaturePic,
        itemOrigin: 'allIcons/icon0012',
        itemRotate: 'allIcons/icon0013',
    }

    pharaoItem = {
        id: 7,
        name: "Pharao",
        itemClass: IconPharao,
        itemFeatureClass: IconFeaturePic,
        itemOrigin: 'allIcons/icon0014',
        itemRotate: 'allIcons/icon0015',
    }

    items = []
    animIndex = 0



    manIcon = null

    init() {

        this.initTexture();
        this.initText();
    }


    initTexture() {

        for (let i = 0; i < 4; i++) {
            this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menublockx'));
            this.addChild(this.pageTextures)
            this.pageTextures.scale.x = 1.15
            this.pageTextures.scale.y = 1.13
            this.pageTextures.x = 150 + (this.pageTextures.width + 25) * i
            this.pageTextures.y = 70
        }

        this.pageTextures = PIXI.Sprite.from(PIXI.Texture.from('paytable/menulinebar'));
        this.addChild(this.pageTextures)
        this.pageTextures.alpha = 1
        this.pageTextures.x = 17
        this.pageTextures.y = 495
        this.pageTextures.scale.x = 1.16
        this.pageTextures.scale.y = 1.16


        this.createIconLine(this.manItem,0,[
            {cnt:"X5", coeff:"5000"},
            {cnt:"X4", coeff:"1000"},
            {cnt:"X3", coeff:"100"},
            {cnt:"X2", coeff:"10"}

        ])
        this.createIconLine(this.pharaoItem,1,[
            {cnt:"X5", coeff:"2000"},
            {cnt:"X4", coeff:"400"},
            {cnt:"X3", coeff:"40"},
            {cnt:"X2", coeff:"5"}
        ])
        this.createIconLine(this.wolfItem,2,[
            {cnt:"X5", coeff:"750"},
            {cnt:"X4", coeff:"100"},
            {cnt:"X3", coeff:"30"},
            {cnt:"X2", coeff:"5"}
        ])
        this.createIconLine(this.birdItem,3,[
            {cnt:"X5", coeff:"750"},
            {cnt:"X4", coeff:"100"},
            {cnt:"X3", coeff:"30"},
            {cnt:"X2", coeff:"5"}
        ])

        this.animIndex = -1
        this.animateNext()

    }

    animateNext(){
        this.animIndex++
        if(this.animIndex>=this.items.length){
            this.animIndex = 0
        }
        this.items[this.animIndex].animate()
        this.timeout1 = setTimeout(function () {
            this.animateNext()
        }.bind(this), 3000);
    }


    createIconLine(conf,index,wins){
        var icn = new conf.itemClass()
        icn.init(conf, 0)
        icn.position.set(183+index*240, 93)
        icn.scale.set(0.7, 0.7)
        this.addChild(icn)
        this.items.push(icn)


        for (let i = 0; i < wins.length; i++) {
            const element = wins[i];
            var wtxt = new PIXI.Text(element.cnt, window.Lang.default["PAY_TABLE_WIN"])
            wtxt.anchor.set(0, 0)
            wtxt.position.set(200+index*240, 280+i*40)
            this.addChild(wtxt)

            var wtxt2 = new PIXI.Text(element.coeff, window.Lang.default["PAY_TABLE_WIN2"])
            wtxt2.anchor.set(0, 0)
            wtxt2.position.set(250+index*240, 280+i*40)
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


export default PayTablePage2
