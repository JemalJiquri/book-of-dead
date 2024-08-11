import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import Globals from './Globals';


class Preloader extends PIXI.Sprite {
    preloader = null
    circles = null
    progress = 0
    progressBg = null
    currentTween = null
    progressLine = null

    init() {
        this.preloader = new PIXI.Sprite()
        this.circles = new PIXI.Sprite()
        //1b2545
        //0d2345
        //0x0d2345
        this.colorBG = new PIXI.Graphics();
        this.colorBG.beginFill(0x0d2345,0.6);
        this.colorBG.drawRect(0, 0, 220, 220);
        this.colorBG.endFill()
        this.addChild(this.colorBG)


        this.progressBg = PIXI.Sprite.from(PIXI.Loader.shared.resources.prel2.texture);
        this.progressBg.anchor.set(0, 0);
        this.preloader.addChild(this.progressBg)


        this.logo = new PIXI.Sprite.from(PIXI.Texture.from('playngologo'));
        this.logo.scale.set(0.4, 0.4);
        this.logo.y = 40
        this.logo.x = 140
        this.logo.alpha = 0.4
        this.progressBg.addChild(this.logo)




        this.progressLine = PIXI.Sprite.from(PIXI.Loader.shared.resources.prel4.texture);
        this.progressLine.anchor.set(0, 0);
        this.progressLine.x = 2
        this.progressBg.addChild(this.progressLine)
        this.addChild(this.preloader);
        this.resize()

        //4c84c5

        this.p1 = this.createPoint()
        this.circles.addChild(this.p1)

        this.p2 = this.createPoint()
        this.circles.addChild(this.p2)

        this.p3 = this.createPoint()
        this.circles.addChild(this.p3)

        this.addChild(this.circles)
        this.animatePoint1(0)
        this.animatePoint2(150)
        this.animatePoint3(300)

        this.setProgress(0)
    }

    animatePoint3(delay) {
        
        if(delay === undefined){
            delay = 0
        }
        this.p3.rotation = 0
        new TWEEN.Tween(this.p3)
            .to({ rotation: 2 * Math.PI }, 1000)
            .easing(TWEEN.Easing.Cubic.Out)
            .delay(delay)
            .onComplete(function () {
                if(this.parent == null){
                    return
                }
                this.animatePoint3()
            }.bind(this))
            .start()
    }

    animatePoint2(delay) {
        
        if(delay === undefined){
            delay = 0
        }
        this.p2.rotation = 0
        new TWEEN.Tween(this.p2)
            .to({ rotation: 2 * Math.PI }, 1000)
            .easing(TWEEN.Easing.Cubic.Out)
            .delay(delay)
            .onComplete(function () {
                if(this.parent == null){
                    return
                }
                this.animatePoint2()
            }.bind(this))
            .start()
    }

    animatePoint1(delay) {
        
        if(delay === undefined){
            delay = 0
        }
        this.p1.rotation = 0
        new TWEEN.Tween(this.p1)
            .to({ rotation: 2 * Math.PI }, 1000)
            .easing(TWEEN.Easing.Cubic.Out)
            .delay(delay)
            .onComplete(function () {
                if(this.parent == null){
                    return
                }
                this.animatePoint1()
            }.bind(this))
            .start()
    }

    createPoint() {
        var circleView = new PIXI.Graphics();
        circleView.beginFill(0x4c84c5, 1);
        circleView.drawCircle(0, 0, 8);
        circleView.endFill()

        var circle = new PIXI.Sprite()
        circleView.y = -30
        circle.addChild(circleView)
        return circle
    }


    resize() {
        this.preloader.scale.x = this.preloader.scale.y = 0.6
        this.preloader.x = (Globals.windowWidth - 490 * 0.6) / 2
        this.preloader.y = (Globals.windowHeight - 100)

        this.circles.x = Globals.windowWidth / 2
        this.circles.y = 200

        this.colorBG.clear()
        this.colorBG.beginFill(0x0d2345,0.6);
        this.colorBG.drawRect(0, 0, Globals.windowWidth, Globals.windowHeight);
        this.colorBG.endFill()
    }


    setProgress(_progress) {
        if (this.currentTween) {
            this.currentTween.stop()
        }

        this.currentTween = new TWEEN.Tween(this)
            .to({ progress: _progress / 100 }, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                this._setProgress()
            }.bind(this)).start()
    }


    _setProgress() {
        this.progressLine.width = (this.progressBg.width - 4) * this.progress
    }

}

export default Preloader
