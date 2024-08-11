import * as PIXI from 'pixi.js'
import Shared from "./Shared"
import TWEEN from "@tweenjs/tween.js";

class IconFrame extends PIXI.Sprite {
    frame = null
    gradient = null
    frameRectangle = new PIXI.Rectangle(0, 0, 223, 223);
    gradientMask = null
    points = [
        { x: 11, y: 11 },
        { x: 212, y: 11 },
        { x: 212, y: 212 },
        { x: 11, y: 212 },
    ]
    pointsTimes = [400,400,400,400]
    lineWidth = 15
    animtePoints = []
    animtePointsTimes = []
    animateIndex = 0
    haveFrame = true
    gradientRes = "gradientyelow"
    loopAnimation = false
    init(obj) {
        if (obj) {
            if (obj.frameRectangle) {
                this.frameRectangle = obj.frameRectangle
            }
            if (obj.points) {
                this.points = obj.points
            }
            if (obj.lineWidth) {
                this.lineWidth = obj.lineWidth
            }
            this.haveFrame = obj.haveFrame

            if (obj.gradientRes) {
                this.gradientRes = obj.gradientRes
            }
            if (obj.pointsTimes) {
                this.pointsTimes = obj.pointsTimes
            }
        }

        this.animtePoints.push(this.points[0])
        this.animtePoints.push(this.points[1])
        this.animtePoints.push(this.points[2])
        this.animtePoints.push(this.points[3])
        this.animtePoints.push(this.points[0])

        this.animtePointsTimes.push(this.pointsTimes[0])
        this.animtePointsTimes.push(this.pointsTimes[1])
        this.animtePointsTimes.push(this.pointsTimes[2])
        this.animtePointsTimes.push(this.pointsTimes[3])
        this.animtePointsTimes.push(this.pointsTimes[0])
        

        if (this.haveFrame) {
            this.frame = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart1, this.frameRectangle));
            this.addChild(this.frame)
        }


        this.gradient = PIXI.Sprite.from(PIXI.Texture.from(this.gradientRes));
        this.addChild(this.gradient)
        this.gradient.anchor.set(0.5, 0.5)

        this.gradientMask = new PIXI.Graphics();
        this.gradientMask.moveTo(this.points[0].x, this.points[0].y);
        this.gradientMask.lineStyle({
            width: this.lineWidth,
            color: 0xff0000,
            cap: PIXI.LINE_CAP.ROUND
        });
        this.gradientMask.lineTo(this.points[1].x, this.points[1].y);
        this.gradientMask.moveTo(this.points[1].x, this.points[1].y);
        this.gradientMask.lineTo(this.points[2].x, this.points[2].y);
        this.gradientMask.moveTo(this.points[2].x, this.points[2].y);
        this.gradientMask.lineTo(this.points[3].x, this.points[3].y);
        this.gradientMask.moveTo(this.points[3].x, this.points[3].y);
        this.gradientMask.lineTo(this.points[0].x, this.points[0].y);

        this.addChild(this.gradientMask)
        this.gradient.mask = this.gradientMask
        this.gradient.alpha = 0
    }

    animate() {
        new TWEEN.Tween(this.gradient)
            .to({ alpha: 1 }, 50)
            .easing(TWEEN.Easing.Linear.None)
            .start()
        this.animateIndex = 0
        this._animate()
    }


    animateLoop() {
        this.loopAnimation = true
        new TWEEN.Tween(this.gradient)
            .to({ alpha: 1 }, 50)
            .easing(TWEEN.Easing.Linear.None)
            .start()
        this.animateIndex = 0
        this._animate()
    }

    stopLoop() {
        new TWEEN.Tween(this.gradient)
            .to({ alpha: 0 }, 50)
            .easing(TWEEN.Easing.Linear.None)
            .start()
        this.loopAnimation = false
    }



    _animate() {

        this.animateIndex++
        if (this.animateIndex >= this.animtePoints.length) {
            if (this.loopAnimation) {
                this.animateIndex = 1
                //ICON_ANIM_LOOP
            } else {
                return
            }

        }
        if (this.animateIndex === this.animtePoints.length - 1) {
            if (!this.loopAnimation) {
                new TWEEN.Tween(this.gradient)
                    .to({ alpha: 0 }, 150)
                    .delay(200)
                    .easing(TWEEN.Easing.Linear.None)
                    .start()
            }

        }

        new TWEEN.Tween(this.gradient)
            .to({ x: this.animtePoints[this.animateIndex].x, y: this.animtePoints[this.animateIndex].y }, this.animtePointsTimes[this.animateIndex])
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                this._animate()
            }.bind(this))
            .start()
    }




}


export default IconFrame;
