import * as PIXI from 'pixi.js'
import Shared from "./Shared"
import IconFrame from "./IconFrame"
import TWEEN from "@tweenjs/tween.js";

class IconWolf extends PIXI.Sprite {
    backgroundRectangle = new PIXI.Rectangle(6 * 223, 0, 223, 223);
    frontRectangle = new PIXI.Rectangle(7 * 223, 0, 223, 223);
    headRectangle = new PIXI.Rectangle(8 * 223, 0, 223, 223);

    front = null
    head = null
    background = null
    frontAnimStep = 0
    id = null
    bwFilter = null


    init(obj, _frame) {
        this.id = obj.id
        this.background = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart1, this.backgroundRectangle))
        this.addChild(this.background)


        this.front = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart1, this.frontRectangle))
        this.addChild(this.front)
        this.front.x = this.front.width / 2
        this.front.y = this.front.height / 2
        this.front.anchor.set(0.5, 0.5)

        let frontMask = new PIXI.Graphics();
        frontMask.beginFill(0x00ff00);
        frontMask.drawRect(11, 11, 205, 205);
        frontMask.endFill()
        this.front.mask = frontMask
        this.addChild(frontMask)


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

        this.head = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart1, this.headRectangle))
        this.addChild(this.head)
        this.head.x = this.head.width / 2
        this.head.y = this.head.height / 2
        this.head.anchor.set(0.5, 0.5)

        this.bwFilter = new PIXI.Graphics();
        this.bwFilter.beginFill(0x000000,0.6);
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
        this.frontAnimStep = 0
        this.frame.animate()
        this.frontNextStep()
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

        new TWEEN.Tween(this.head.scale)
            .to({
                x: 1.04 + 0.03 * this.frontAnimStep,
                y: 1.04 + 0.03 * this.frontAnimStep
            }, 150 + 10 * this.frontAnimStep)
            .easing(TWEEN.Easing.Sinusoidal.In)
            .onComplete(function () {
                new TWEEN.Tween(this.head.scale)
                    .to({
                        x: 1,
                        y: 1
                    }, 150 + 10 * this.frontAnimStep)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start()
            }.bind(this))
            .start()
    }

}


export default IconWolf;
