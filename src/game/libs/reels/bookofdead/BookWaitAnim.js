import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js";
import IconFrame from "./IconFrame"

class BookWaitAnim extends PIXI.Sprite {
    front = null
    frame = null
    init() {
        this.frame = new IconFrame()
        this.frame.init({
            gradientRes: "gradientyelowbig",
            haveFrame: false,
            points: [
                { x: 11, y: 9 },
                { x: 212, y: 9 },
                { x: 212, y: 657 },
                { x: 11, y: 657 },
            ],
            pointsTimes: [
                400, 100, 400, 100
            ],
            lineWidth: 20
        })

        this.addChild(this.frame)

        this.front = PIXI.Sprite.from(PIXI.Texture.from("gradientyelowbigpart"));
        this.front.y = -130
        this.front.alpha = 0.0
        this.front.blendMode = PIXI.BLEND_MODES.OVERLAY
        this.addChild(this.front)

    }

    animateLoop() {
        this.frame.animateLoop()
        new TWEEN.Tween(this.front)
            .to({ alpha: 0.4 }, 50)
            .easing(TWEEN.Easing.Linear.None)
            .start()
    }

    stopLoop(delay) {
        setTimeout(function () {
            new TWEEN.Tween(this.front)
                .to({ alpha: 0.0, y: -500 }, 300)
                .easing(TWEEN.Easing.Linear.None)
                .start()

            new TWEEN.Tween(this.frame)
                .to({ alpha: 0.0 }, 200)
                .onComplete(function () {
                    this.frame.stopLoop()
                    this.parent.removeChild(this)
                }.bind(this))
                .easing(TWEEN.Easing.Linear.None)
                .start()
        }.bind(this), delay);

    }





}


export default BookWaitAnim;
