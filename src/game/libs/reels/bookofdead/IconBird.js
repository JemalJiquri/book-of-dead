import * as PIXI from 'pixi.js'
import Shared from "./Shared"
import IconFrame from "./IconFrame"
import TWEEN from "@tweenjs/tween.js";

class IconBird extends PIXI.Sprite {
    background = null
    frame = null
    front = null
    backgroundRectangle = new PIXI.Rectangle(223, 0, 223, 223);
    frontRectangle = new PIXI.Rectangle(223 * 2, 0, 223, 223);
    frontAnimStep = 0;
    id = null
    bwFilter = null
    init(obj, _frame) {
        this.id = obj.id

        this.background = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart1, this.backgroundRectangle))
        this.addChild(this.background)

        this.frame = new IconFrame()
        if (_frame > 0) {
            this.frame.init({
                frameRectangle: new PIXI.Rectangle(223 * 12, 0, 223, 223),
                haveFrame: true,
                gradientRes: "gradientbook"
            })
        } else {
            this.frame.init()
            
        }
        this.addChild(this.frame)


        this.front = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart1, this.frontRectangle))
        this.addChild(this.front)
        this.front.anchor.set(0.5, 0.5)
        this.front.x = this.front.width / 2
        this.front.y = this.front.height / 2

        this.bwFilter = new PIXI.Graphics();
        this.bwFilter.beginFill(0x000000, 0.6);
        this.bwFilter.drawRect(0, 0, 220, 220);
        this.bwFilter.endFill()
        this.bwFilter.alpha = 0
        this.addChild(this.bwFilter)
    }

    animate() {
        this.frontAnimStep = 0
        this.frame.animate()
        this.frontNextStep()
    }

    stopAnimation(){
        
    }

    filterBlack(on) {
        new TWEEN.Tween(this.bwFilter)
            .to({ alpha: on ? 1 : 0 }, 100)
            .easing(TWEEN.Easing.Linear.None)
            .start()
    }

    frontNextStep() {
        if (this.frontAnimStep >= 4) {
            return;
        }
        this.frontAnimStep++;

        new TWEEN.Tween(this.front.scale)
            .to({
                x: 1.04 + 0.03 * this.frontAnimStep,
                y: 1.04 + 0.03 * this.frontAnimStep
            }, 150 + 10 * this.frontAnimStep)
            .easing(TWEEN.Easing.Sinusoidal.In)
            .onComplete(function () {
                new TWEEN.Tween(this.front.scale)
                    .to({
                        x: 1,
                        y: 1
                    }, 150 + 10 * this.frontAnimStep)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .onComplete(function () {
                        this.frontNextStep()
                    }.bind(this))
                    .start()
            }.bind(this))
            .start()
    }

}


export default IconBird;
