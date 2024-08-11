import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js";
import Constants from "../rheel/Constants";


class GradientLine extends PIXI.Sprite {
    view = null
    gmask = null
    THICKNESS = 13
    gradient = null
    points = []
    currentAnimPos = 0
    currentAnimStep = 0
    id = 0
    pointsView = null
    animationObj = null
    eventListener = null
    isBonus = false

    bonusTimeout = 0
    tw1 = null
    tw2 = null
    tw3 = null


    init(id, config, _eventListener) {
        this.eventListener = _eventListener ? _eventListener : function () { }
        this.id = id;
        this.points = []
        this.points.push({
            x: 0,
            y: config.lines[id][0][1] * config.itemHeight + config.itemHeight / 2
        })


        for (let index = 0; index < config.lines[id].length; index++) {
            const point = config.lines[id][index];
            this.points.push({
                x: point[0] * config.itemWidth + config.itemWidth / 2,
                y: point[1] * config.itemHeight + config.itemHeight / 2
            })

        }
        this.points.push({
            x: config.lines[id][config.lines[id].length - 1][0] * config.itemWidth + config.itemWidth - 20,
            y: config.lines[id][config.lines[id].length - 1][1] * config.itemHeight + config.itemHeight / 2
        })



        this.view = new PIXI.Graphics();
        this.view.moveTo(0, 0);

        for (let index = 0; index < config.lineColors.length - 1; index++) {
            var _THICKNESS = this.THICKNESS - index * 2;
            this.view.lineStyle({
                width: _THICKNESS,
                color: config.lineColors[index],
                cap: PIXI.LINE_CAP.ROUND
            });

            for (let index2 = 0; index2 < this.points.length - 1; index2++) {
                const point = this.points[index2];
                const point2 = this.points[index2 + 1];
                this.view.moveTo(point.x, point.y);
                this.view.lineTo(point2.x, point2.y);
            }
        }



        this.view.endFill();
        this.gmask = new PIXI.Graphics();
        this.gmask.moveTo(0, 0);
        this.gmask.lineStyle({
            width: this.THICKNESS,
            color: 0xffffff,
            cap: PIXI.LINE_CAP.ROUND
        });
        for (let index3 = 0; index3 < this.points.length - 1; index3++) {
            const point = this.points[index3];
            const point2 = this.points[index3 + 1];
            this.gmask.moveTo(point.x, point.y);
            this.gmask.lineTo(point2.x, point2.y);
        }

        //this.view.beginFill(0xff0000);
        //this.view.drawRect(0, 0, 200, 100);
        this.addChild(this.view)
        this.addChild(this.gmask)

        this.gradient = PIXI.Sprite.from(PIXI.Texture.from("gradient"));
        this.gradient.anchor.set(0.5, 0.5)
        this.gradient.x = this.points[0].x - this.gradient.width / 2
        this.gradient.y = this.points[0].y
        this.gradient.mask = this.gmask
        this.addChild(this.gradient)
        this.gradient.alpha = 0


        this.pointsView = new PIXI.Sprite()


        let pointsBGSize = { w: 110, h: 60 }
        let pointsBG = new PIXI.Graphics();
        pointsBG.beginFill(0x000000, 0.8);
        pointsBG.drawRect(0, 0, pointsBGSize.w, pointsBGSize.h);


        this.pointsView.addChild(pointsBG)
        this.addChild(this.pointsView)

        this.pointsText = new PIXI.BitmapText("5", {
            fontSize: 34,
            lineHeight: 34,
            letterSpacing: 0,
            fill: 0xf9d786,
            align: "center",
            fontName: "BigWinFont",
        })
        this.pointsText.anchor.set(0.5);
        this.pointsText.x = pointsBGSize.w / 2
        this.pointsText.y = pointsBGSize.h / 2 - 8
        this.pointsView.addChild(this.pointsText)


        this.pointsView.x = this.points[1].x - pointsBGSize.w / 2
        this.pointsView.y = this.points[1].y - pointsBGSize.h / 2

        this.alpha = 0
        
    }

    stop(){
        this.alpha = 0
        clearTimeout(this.bonusTimeout)
        if(this.tw1){
            this.tw1.stop()
            this.tw1 = null
        }

        if(this.tw2){
            this.tw2.stop()
            this.tw2 = null
        }

        if(this.tw3){
            this.tw3.stop()
            this.tw3 = null
        }
    }

    animate(obj, _bonus,sndname) {
        this.alpha = 1
        this.isBonus = _bonus > 0


        this.animationObj = obj
        this.gradient.x = this.points[0].x - this.gradient.width / 2
        this.gradient.y = this.points[0].y
        this.gradient.alpha = 1
        this.currentAnimPos = 0
        this.currentAnimStep = 0


        this.pointsText.text = obj[3]

        if (this.isBonus) {
            this.removeChild(this.gradient)
            this.gradient = PIXI.Sprite.from(PIXI.Texture.from("gradientbig"));
            this.gradient.anchor.set(0.5, 0.5)
            this.gradient.x = this.points[0].x - this.gradient.width / 2
            this.gradient.y = this.points[0].y
            this.gradient.mask = this.gmask
            this.addChild(this.gradient)
            this.gradient.alpha = 1



            this.pointsView.alpha = 0
            this.bonusTimeout = setTimeout(function () {
                if(sndname!==undefined){
                    if(sndname.length>0){
                        window.SoundManager.play({ name: sndname, loop: false })
                    }
                }
                
                this.eventListener({ type: Constants.BONUS_LINE_ANIM_START, line: this, winData: this.animationObj })
                this.tw1 = new TWEEN.Tween(this)
                    .to({ alpha: 1 }, 50)
                    .easing(TWEEN.Easing.Linear.None)
                    .start()
                this.animateNext()
            }.bind(this), _bonus)
        } else {
            this.tw1 = new TWEEN.Tween(this)
                .to({ alpha: 1 }, 50)
                .easing(TWEEN.Easing.Linear.None)
                .start()
            this.animateNext()
        }


    }

    restartAnimation() {
        this.currentAnimStep++
        if (this.currentAnimStep >= 2) {
            return
        }
        this.animate(this.animationObj)
    }

    animateNext() {
        this.currentAnimPos++
        if (this.currentAnimPos >= this.points.length) {
            this.gradient.alpha = 0
            this.currentAnimPos = 0
            if (!this.isBonus) {
                this.tw2 = new TWEEN.Tween(this)
                    .to({ alpha: 0 }, 50)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        this.tw2 = null
                        this.eventListener({ type: Constants.LINE_ANIM_FINISHED, id: this.id })
                    }.bind(this))
                    .start()
            } else {
                this.eventListener({ type: Constants.BONUS_LINE_ANIM_FINISHED, id: this.id })
            }

            return
        }
        this.tw3 = new TWEEN.Tween(this.gradient)
            .to({ x: this.points[this.currentAnimPos].x, y: this.points[this.currentAnimPos].y }, this.isBonus ? 70 : 200)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                this.tw3 = null
                this.animateNext()
            }.bind(this))
            .start()
    }







}


export default GradientLine;
