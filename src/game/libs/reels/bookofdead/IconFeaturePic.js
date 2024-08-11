import * as PIXI from 'pixi.js'
import Config from "./Config";
import TWEEN from "@tweenjs/tween.js";

class IconFeaturePic extends PIXI.Sprite {
    holder = null
    id = null
    icon = null


    init(obj) {
        this.id = obj.id
        this.holder = new PIXI.Sprite()
        this.addChild(this.holder)
        this.icon = new obj.itemClass()
        this.icon.init(obj, 1)
        this.holder.addChild(this.icon)

    }
    filterBlack() {
    }

    show(delay, replaceItem) {
        this.holder.alpha = 0
        setTimeout(function () {

            this.blicka = PIXI.Sprite.from(PIXI.Texture.from("blicka"));
            this.addChild(this.blicka)
            this.blicka.anchor.set(0.5, 0.5)


            this.blicka.x = Config.itemWidth / 2
            this.blicka.y = Config.itemHeight / 2
            this.holder.alpha = 0
            this.blicka.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT
            window.SoundManager.play({ name: "transformSymbol", loop: false }) 
            new TWEEN.Tween(this.blicka.scale)
                .to({ x: 6, y: 6 }, 200)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () {
                    this.holder.alpha = 1
                    this.blicka.alpha = 0
                    replaceItem.parent.removeChild(replaceItem)
                }.bind(this))
                .start()
        }.bind(this), delay)
    }


    animate() {
        this.icon.animate()
    }



}


export default IconFeaturePic;
