import * as PIXI from 'pixi.js'

class SwitchBtn extends PIXI.Sprite {

    active = false
    grbg = null
    grfg = null
    yebg = null
    yefg = null
    callback_function = null


    init(obj) {

        if (obj.callback_function) {
            this.callback_function = obj.callback_function
            this.buttonName = obj.name
        }

        this.grbg = PIXI.Sprite.from(PIXI.Texture.from("autoplayswitchbggrey"));
        this.addChild(this.grbg)

        this.grfg = PIXI.Sprite.from(PIXI.Texture.from("autoplayswitchfggrey"));
        this.grfg.position.set(-5, -4)
        this.addChild(this.grfg)

        this.yebg = PIXI.Sprite.from(PIXI.Texture.from("autoplayswitchbgyellow"));
        this.addChild(this.yebg)

        this.yefg = PIXI.Sprite.from(PIXI.Texture.from("autoplayswitchfgyellow"));
        this.yefg.position.set(10, -4)
        this.addChild(this.yefg)
        this.yebg.alpha = 0
        this.yefg.alpha = 0

        this.autostoptext = new PIXI.Text(obj.txt.str, obj.txt)
        this.autostoptext.anchor.set(0, 0)
        this.autostoptext.position.set(40, 2)
        this.addChild(this.autostoptext)




        this.buttonMode = true;
        this.interactive = true;

        if (window.SETTINGS.isMobile) {
            this.on('pointertap', this.onClick.bind(this))
        } else {
            this.on('click', this.onClick.bind(this))
        }

    }

    onClick() {
        window.SoundManager.play({ name: "btnclick", loop: false })
        if (this.callback_function) {
            this.callback_function({ name: this.buttonName })
        } else {
            this.setActive(!this.active)
        }

    }

    setActive(act) {
        this.active = act
        this.yebg.alpha = this.active ? 1 : 0
        this.yefg.alpha = this.active ? 1 : 0
        this.grbg.alpha = this.active ? 0 : 1
        this.grfg.alpha = this.active ? 0 : 1
    }

}


export default SwitchBtn;
