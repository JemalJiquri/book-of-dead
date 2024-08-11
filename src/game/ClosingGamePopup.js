import * as PIXI from 'pixi.js'

class ClosingGamePopup extends PIXI.Sprite {
    bg = null

    init(obj) {
        this.bgAlpha = new PIXI.Graphics();
        this.bgAlpha.alpha = 0.4
        this.bgAlpha.beginFill(0x000000);
        this.bgAlpha.drawRect(0, 0, obj.w, obj.h);
        this.bgAlpha.endFill();
        this.bgAlpha.interactive = true
        this.addChild(this.bgAlpha)
        
        this.bg = new PIXI.Sprite.from(PIXI.Texture.from('closing'));
        this.addChild(this.bg)

        this.autotext = new PIXI.Text("Closing game...", window.Lang.default["AUTOPLAYHEADER"])
        this.autotext.anchor.set(0.5, 0.5)
        this.autotext.position.set(this.bg.width / 2, this.bg.height / 2)
        this.bg.addChild(this.autotext)



        this.resize(obj.w, obj.h)

    }
    resize(w, h) {
        this.bgAlpha.x = -(w - this.bg.width) / 2
        this.bgAlpha.y = -(h - this.bg.height) / 2
        this.x = (w - this.bg.width) / 2
        this.y = (h - this.bg.height) / 2
    }

}

export default ClosingGamePopup
