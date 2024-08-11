import * as PIXI from 'pixi.js'
import Config from './libs/reels/bookofdead/Config';

class BonusBG extends PIXI.Sprite {
    bg = null
    logo = null
    featureIcon = null
    featureItem = null

    init() {
        this.bg = new PIXI.Sprite.from(PIXI.Texture.from('freeTxtBg'));
        this.bg.anchor.set(0.5, 0.5)
        this.addChild(this.bg)
        this.bg.alpha = 0

        this.txt = new PIXI.Text(
            window.Lang.default["BOD_FREE"].str.replace("%d", 0).replace("%l", 10),
            window.Lang.default["BOD_FREE"])
        this.txt.anchor.set(0.5, 0.5)
        this.txt.position.set(0, -10)
        this.txt.alpha = 0
        this.addChild(this.txt)
        //window.Lang.default["BOD_FREE"].str.replace("%d", 0).replace("%l", 0)


        this.logo = new PIXI.Sprite.from(PIXI.Texture.from('logo'));
        this.addChild(this.logo);
        this.logo.anchor.set(0.5, 0.5)
        this.logo.x = 0
        this.logo.y = 0

    }

    removeIcon() {
        if (this.featureItem) {
            this.removeChild(this.featureItem)
        }
        this.bg.alpha = 0
        this.logo.alpha = 1
        this.txt.alpha = 0
    }


    setIcon(icon) {
        if (this.featureItem) {
            this.removeChild(this.featureItem)
        }
        this.featureIcon = icon
        this.bg.alpha = 1
        this.logo.alpha = 0
        this.txt.alpha = 1

        var featureItemObj = Config.items[this.featureIcon]
        this.featureItem = new featureItemObj.itemFeatureClass()
        this.featureItem.init(featureItemObj)
        this.featureItem.anchor.set(0.5, 0.5)
        this.featureItem.scale.x = this.featureItem.scale.y = 0.42
        this.featureItem.y = -60
        this.featureItem.x = -430
        this.addChild(this.featureItem)
    }

    updateCnt(spinned, total) {
        this.txt.text = window.Lang.default["BOD_FREE"].str.replace("%d", spinned).replace("%l", total)
    }



}

export default BonusBG
