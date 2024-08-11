import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js";

class Icon extends PIXI.Sprite {
    itemOrigin = null
    itemAnimate = null
    animateCount = 3
    id = null
    bwFilter = null
    init(obj) {
        this.id = obj.id
        this.itemOrigin = PIXI.Sprite.from(PIXI.Texture.from(obj.itemOrigin));
        this.addChild(this.itemOrigin)

        this.itemAnimate = PIXI.Sprite.from(PIXI.Texture.from(obj.itemAnimate));
        this.addChild(this.itemAnimate)
        this.itemAnimate.alpha = 0

        this.bwFilter = new PIXI.Graphics();
        this.bwFilter.beginFill(0x000000, 0.4);
        this.bwFilter.drawRect(0, 0, 220, 220);
        this.bwFilter.endFill()
        this.bwFilter.alpha = 0
        this.addChild(this.bwFilter)
    }

    filterBlack(on) {
        new TWEEN.Tween(this.bwFilter)
            .to({ alpha: on ? 1 : 0 }, 100)
            .easing(TWEEN.Easing.Linear.None)
            .start()
    }

    animate() {
        this.animateCount = 4
        this._animate()
    }


    _animate() {
        this.animateCount--

        if (this.animateCount <= 0) {
            return;
        }

        new TWEEN.Tween(this.itemAnimate)
            .to({ alpha: 1 }, 100)
            .delay(0)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                new TWEEN.Tween(this.itemAnimate)
                    .to({ alpha: 0 }, 100)
                    .delay(100)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        setTimeout(function () {
                            this._animate()
                        }.bind(this), 200);
                    }.bind(this))
                    .start()
            }.bind(this))
            .start()
    }


}


export default Icon;
