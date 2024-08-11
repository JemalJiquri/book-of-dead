import * as PIXI from 'pixi.js'
import MobileScrollContainer from "../mobilescrollcontainer"



class TabRules extends PIXI.Sprite {
    mainHolder = null
    scrollContainer = null
    scrollH = 0
    contH = 1851
    size = {w:1,h:1}

    init(obj) {
        this.bgFGraphics = new PIXI.Graphics();
        this.bgHolder = new PIXI.Sprite()
        //this.bgHolder.addChild(this.bgFGraphics)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from(obj.img));
        this.size.w = this.bg.width
        this.size.h = this.bg.height
        this.bgHolder.addChild(this.bg)
        this.addChild(this.bgHolder)
        this.scrollContainer = new MobileScrollContainer()
        this.scrollContainer.init({
            container: this
        })
        

    }

    isDraggingSlider() {

        return false
    }


    resize(w, h) {
        this.scrollH = h
        
        var ratio = w/this.size.w
        this.contH = this.size.h*ratio
        this.bg.scale.set(ratio,ratio)

        this.bgFGraphics.clear()
        this.bgFGraphics.beginFill(0xffffff, 1)
        this.bgFGraphics.drawRect(0, 0, w, 1000)
        this.bgFGraphics.endFill()

    }


}

export default TabRules;
