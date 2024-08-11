import * as PIXI from 'pixi.js'
import Shared from "./Shared"
import TWEEN from "@tweenjs/tween.js";
import IconFrame from "./IconFrame"

class IconBook extends PIXI.Sprite {
    backgroundRectangle = new PIXI.Rectangle(223 * 0, 0, 223, 223);
    backgroundRectangleLight = new PIXI.Rectangle(223 * 2, 0, 223, 223);
    frontRectangle = new PIXI.Rectangle(223 * 1, 0, 223, 223);
    frontRectangleLight = new PIXI.Rectangle(223 * 3, 0, 223, 223);
    lightRectangle = new PIXI.Rectangle(0, 0, 253, 918);

    background = null
    backgroundLight = null
    front = null
    frontLight = null
    light = null
    id = null
    frame = null

    bwFilter = null
    loopAnimation = false

    init(obj) {
        this.id = obj.id
        this.background = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart2, this.backgroundRectangle))
        this.addChild(this.background)

        this.backgroundLight = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart2, this.backgroundRectangleLight))
        this.backgroundLight.alpha = 0
        this.addChild(this.backgroundLight)


        this.frame = new IconFrame()
        this.frame.init({
            gradientRes: "gradientbook",
            haveFrame: false
        })
        this.addChild(this.frame)


        this.front = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart2, this.frontRectangle))
        this.front.anchor.set(0.5, 0.5)
        this.front.x = this.front.width / 2
        this.front.y = this.front.height / 2
        this.addChild(this.front)


        this.frontLight = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart2, this.frontRectangleLight))
        this.frontLight.anchor.set(0.5, 0.5)
        this.frontLight.x = this.frontLight.width / 2
        this.frontLight.y = this.frontLight.height / 2
        this.frontLight.alpha = 0
        this.addChild(this.frontLight)

        this.light = PIXI.Sprite.from(PIXI.Texture.from("blick"));
        this.light.anchor.set(0.5, 0.5)
        this.light.x = this.frontLight.width / 2
        this.light.y = this.frontLight.height / 2
        this.light.blendMode = PIXI.BLEND_MODES.OVERLAY
        this.light.alpha = 0
        this.addChild(this.light)

        this.bwFilter = new PIXI.Graphics();
        this.bwFilter.beginFill(0x000000, 0.6);
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

    animateLoop() {
        if(this.loopAnimation){
            return
        }
        this.loopAnimation = true

        this.frontAnimStep = 0
        this.backgroundLight.alpha = 1
        this.frontLight.alpha = 1
        this.light.alpha = 1
        if (this.parent) {
            this.parent.addChildAt(this, 0)
        }

        this.frame.animateLoop()
        this.animateRotate()

    }

    stopLoop(){
        this.frame.stopLoop()
        this.loopAnimation = false
        this.backgroundLight.alpha = 0
        this.frontLight.alpha = 0
        this.light.alpha = 0
    }

    animateRotate() {
        if(!this.loopAnimation){
            return
        }
        this.light.rotation = 0
        this.currentTween = new TWEEN.Tween(this.light)
            .to({ rotation: 2 * Math.PI }, 3800)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                this.animateRotate()
            }.bind(this))
            .start()
    }


    animate() {
        this.frontAnimStep = 0
        this.backgroundLight.alpha = 1
        this.frontLight.alpha = 1
        this.light.alpha = 1
        this.light.rotation = 0
        this.frontNextStep()
        if (this.parent) {
            this.parent.addChildAt(this, 0)
        }

        new TWEEN.Tween(this.light)
            .to({ rotation: Math.PI / 4 }, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                new TWEEN.Tween(this.light)
                    .to({ rotation: (Math.PI / 4) * 2 }, 1000)
                    .easing(TWEEN.Easing.Linear.None)
                    .start()
            }.bind(this))
            .start()
    }

    frontNextStep() {
        if (this.frontAnimStep >= 4) {
            this.backgroundLight.alpha = 0
            this.frontLight.alpha = 0
            this.light.alpha = 0
            return;
        }
        this.frontAnimStep++;

        new TWEEN.Tween(this.frontLight.scale)
            .to({
                x: 1.04 + 0.03 * this.frontAnimStep,
                y: 1.04 + 0.03 * this.frontAnimStep
            }, 150 + 10 * this.frontAnimStep)
            .easing(TWEEN.Easing.Sinusoidal.In)
            .onComplete(function () {
                new TWEEN.Tween(this.frontLight.scale)
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


export default IconBook;
