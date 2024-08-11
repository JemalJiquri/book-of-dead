import * as PIXI from 'pixi.js'
import Shared from "./Shared"
import IconFrame from "./IconFrame"
import TWEEN from "@tweenjs/tween.js";
import Config from "./Config";
class IconFeature extends PIXI.Sprite {
    backgroundRectangle = new PIXI.Rectangle(223 * 4, 0, 223, 223);

    background = null
    front = null
    holder = null
    id = null
    init(obj) {
        this.id = obj.id
        this.holder = new PIXI.Sprite()
        this.addChild(this.holder)


        this.background = PIXI.Sprite.from(new PIXI.Texture(Shared.animationPart2, this.backgroundRectangle))
        this.holder.addChild(this.background)

        this.front = PIXI.Sprite.from(new PIXI.Texture(
            Shared.animationPart2,
            new PIXI.Rectangle(223 * obj.featureIconOffset, 0, 223, 223)
        ))
        this.holder.addChild(this.front)
        this.front.anchor.set(0.5, 0.5)
        this.front.x = this.front.width / 2
        this.front.y = this.front.height / 2

        this.frame = new IconFrame()
        this.frame.init({
            frameRectangle: new PIXI.Rectangle(223 * 12, 0, 223, 223),
            haveFrame: true,
            gradientRes: "gradientbook"
        })
        //
        this.holder.addChild(this.frame)
    }
    filterBlack() {
    }

    show(delay, replaceItem) {
        if(Config.LOG)console.log(replaceItem)
        this.holder.alpha = 0
        setTimeout(function () {

            this.blicka = PIXI.Sprite.from(PIXI.Texture.from("blicka"));
            this.addChild(this.blicka)
            this.blicka.anchor.set(0.5, 0.5)
            this.blicka.x = this.front.width / 2
            this.blicka.y = this.front.height / 2
            this.holder.alpha = 0
            this.blicka.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT
            window.SoundManager.play({ name: "transformSymbol", loop: false }) 
            new TWEEN.Tween(this.blicka.scale)
                .to({ x: 6, y: 6 }, 200)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () {
                    this.holder.alpha = 1
                    this.blicka.alpha = 0
                    if(replaceItem){
                        if(replaceItem.parent){
                            replaceItem.parent.removeChild(replaceItem)
                        }else{
                            if(Config.LOG)console.log("replaceItem.parent is null")
                        }
                    }else{
                        if(Config.LOG)console.log("replaceItem is null")
                    }
                    
                }.bind(this))
                .start()
        }.bind(this), delay)
    }


    animate() {
        this.frame.animate()
    }



}


export default IconFeature;
