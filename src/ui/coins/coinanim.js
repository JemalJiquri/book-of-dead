import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';



class CoinAnim extends PIXI.Sprite {
    coinsViews = [
        'coinsAnim/coins01_%frame%',
        'coinsAnim/coins02_%frame%',
        'coinsAnim/coins03_%frame%',
        'coinsAnim/coins04_%frame%',
        'coinsAnim/coins05_%frame%'
    ]
    animationSprite = null
    p0 = { x: 0, y: 0 }
    c0 = { x: 0, y: 0 }
    c1 = { x: 0, y: 0 }
    p1 = { x: 0, y: 0 }
    isMobile = false
    init(delay,ism) {
        this.isMobile = ism
        var view = this.coinsViews[Math.floor(Math.random() * this.coinsViews.length)];
        this.animationSprite = this.getAnimatedSprite(view, 0, 18)
        this.animationSprite.gotoAndPlay(parseInt(Math.random() * 18))
        this.animationSprite.loop = true
        this.animationSprite.animationSpeed = .44
        this.animationSprite.scale.x = this.animationSprite.scale.y = this.isMobile?0.6:1
        this.addChild(this.animationSprite)
        this.alpha = 0

        this.fall(delay)
    }


    fall(_delay) {
        var direction = (Math.random() < 0.5 ? 1 : -1)
        this.x = 40 * Math.random() * direction
        this.p0.x = this.x
        this.p0.y = this.y

        let sc = this.isMobile?0.5:1

        this.c0.x = this.x + (50 + 100*sc * Math.random()) * direction
        this.c0.y = this.y - 140*sc - 150*sc * Math.random()

        this.c1.x = this.c0.x
        this.c1.y = this.c0.y

        this.p1.x = this.c0.x
        this.p1.y = 300
        if(Math.random()<0.3){
            setTimeout(() => {
                window.SoundManager.play({ name: "counter", loop: false })
            }, 200*Math.random());
        }



        var twObj = { progress: 0 }
        new TWEEN.Tween(twObj)
            .to({ progress: 1 }, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .delay(_delay)
            .onStart(function () {
                this.alpha = 1
            }.bind(this))
            .onUpdate(function () {
                var p = this.Bezier(this.p0, this.c0, this.c1, this.p1, twObj.progress);
                this.x = p.x;
                this.y = p.y;
            }.bind(this))
            .onComplete(function () {
                this.parent.removeChild(this)
            }.bind(this))
            .start()
    }



    getAnimatedSprite(pattern, startindex, endindex) {
        //Scatter_BG_3_Glow/Scatter_BG_3_Glow_00001
        const textures = [];
        for (let index = startindex; index <= endindex; index++) {
            var index_str = "" + index
            if (index < 10) {
                index_str = "0" + index
            }
            var current = pattern.replace('%frame%', index_str)
            const texture = PIXI.Texture.from(current);
            textures.push(texture);
        }

        return new PIXI.AnimatedSprite(textures);
    }

    Bezier(a, b, c, d, t) {
        var point = { x: 0, y: 0 },
            mt = 1 - t,
            mt2 = mt * mt,
            mt3 = mt2 * mt;
        point.x = a.x * mt3 + b.x * 3 * mt2 * t + c.x * 3 * mt * t * t + d.x * t * t * t;
        point.y = a.y * mt3 + b.y * 3 * mt2 * t + c.y * 3 * mt * t * t + d.y * t * t * t;
        return point;
    }




}


export default CoinAnim;
