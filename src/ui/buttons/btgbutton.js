import * as PIXI from 'pixi.js'
import MainButton from './mainbutton'

class BTGButton extends MainButton {
    bg = null
    bg2 = null
    pressed = null
    icon = null
    fg = null
    buttonText = null
    buttonText2 = null

    init(obj) {
        super.init()
        if (obj.snd) {
            this.clicklSound = obj.snd
        }
        if (obj.bg) {
            this.bg = PIXI.Sprite.from(PIXI.Texture.from(obj.bg.data));
            this.bg.x = obj.bg.x
            this.bg.y = obj.bg.y
            this.bg.alpha = obj.bg.alpha
            this.addChild(this.bg)
        }

        if (obj.bg2) {
            this.bg2 = PIXI.Sprite.from(PIXI.Texture.from(obj.bg2.data));
            this.bg2.x = obj.bg2.x
            this.bg2.y = obj.bg2.y
            this.bg2.alpha = obj.bg2.alpha
            this.addChild(this.bg2)
        }
        if (obj.hover) {
            this.hover = PIXI.Sprite.from(PIXI.Texture.from(obj.hover.data));
            this.hover.x = obj.hover.x
            this.hover.y = obj.hover.y
            this.hover.alpha = obj.hover.alpha
            this.addChild(this.hover)
        }


        if (obj.pressed) {
            this.pressed = PIXI.Sprite.from(PIXI.Texture.from(obj.pressed.data));
            this.fade_element = this.pressed
            this.pressed.x = obj.pressed.x
            this.pressed.y = obj.pressed.y
            this.pressed.alpha = obj.pressed.alpha
            this.addChild(this.pressed)
        }

        if (obj.icon) {
            this.icon = PIXI.Sprite.from(PIXI.Texture.from(obj.icon.data));
            this.icon.x = obj.icon.x
            this.icon.y = obj.icon.y
            this.icon.alpha = obj.icon.alpha
            this.addChild(this.icon)
        }


        if (obj.disabled) {
            this.disabled = PIXI.Sprite.from(PIXI.Texture.from(obj.disabled.data));
            this.disabled.x = obj.disabled.x
            this.disabled.y = obj.disabled.y
            this.disabled.alpha = obj.disabled.alpha
            this.addChild(this.disabled)
        }

        if (obj.fg) {
            this.fg = PIXI.Sprite.from(PIXI.Texture.from(obj.fg.data));
            this.fg.x = obj.fg.x
            this.fg.y = obj.fg.y
            this.fg.alpha = obj.fg.alpha
            this.addChild(this.fg)
        }
        if (obj.text) {
            this.buttonText = new PIXI.Text(obj.text.str,
                {
                    fontFamily: obj.text.fontFamily,
                    fontSize: obj.text.fontSize,
                    fill: obj.text.fill,
                    align: obj.text.align,
                    fontWeight: obj.text.fontWeight
                });
            this.buttonText.anchor.set(0.5, 0.5);
            this.buttonText.position.set(this.bg.width / 2 + obj.text.offsetX, this.bg.height / 2 + obj.text.offsetY);
            this.addChild(this.buttonText)
        }
        if (obj.text2) {
            this.buttonText2 = new PIXI.Text(obj.text2.str,
                {
                    fontFamily: obj.text2.fontFamily,
                    fontSize: obj.text2.fontSize,
                    fill: obj.text2.fill,
                    align: obj.text2.align,
                    fontWeight: obj.text2.fontWeight
                });
            this.buttonText2.anchor.set(0.5, 0.5);
            this.buttonText2.position.set(this.bg.width / 2 + obj.text2.offsetX, this.bg.height / 2 + obj.text2.offsetY);
            this.addChild(this.buttonText2)
        }
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        if (obj.name) {
            this.name = obj.name
        } else {
            throw new Error("name is mandatory")
        }

    }

    blinkTimeout = 0
    blinkInterval = 0

    //{blink:true,time:500,delay:500}
    blink(blinkconf) {
        clearTimeout(this.blinkTimeout)
        clearInterval(this.blinkInterval)
        if (blinkconf.blink) {
            this.blinkTimeout = setTimeout(function () {
                var btnAnimAlp = false
                this.blinkInterval = setInterval(function () {
                    btnAnimAlp = !btnAnimAlp
                    this.pressed.alpha = btnAnimAlp ? 0 : 1;
                }.bind(this), blinkconf.time);
            }.bind(this), blinkconf.delay);

        } else {
            clearTimeout(this.blinkTimeout)
            clearInterval(this.blinkInterval)
            this.pressed.alpha = 0
        }
    }

    setButton(obj) {
        if (obj.bg) {
            this.removeChild(this.bg)
            this.bg = PIXI.Sprite.from(PIXI.Texture.from(obj.bg.data));
            this.bg.x = obj.bg.x
            this.bg.y = obj.bg.y
            this.bg.alpha = obj.bg.alpha
            this.addChild(this.bg)
        }
        if (obj.text) {
            this.buttonText.text = obj.text.str
        }
        if (obj.text2) {
            this.buttonText2.text = obj.text2.str
        }

        if (obj.name) {
            this.name = obj.name
        } else {
            throw new Error("name is mandatory")
        }
    }

    setEnabled(mode) {
        if (this.disabled) {
            this.disabled.alpha = mode ? 0 : 1
        }

        this.buttonMode = mode;
        this.interactive = mode;
    }

    get_size() {
        if (this.bg) {
            return { width: this.bg.width, height: this.bg.height }
        }

        if (this.bg2) {
            return { width: this.bg2.width, height: this.bg2.height }
        }
        if (this.pressed) {
            return { width: this.pressed.width, height: this.pressed.height }
        }

        if (this.fg) {
            return { width: this.fg.width, height: this.fg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default BTGButton;
