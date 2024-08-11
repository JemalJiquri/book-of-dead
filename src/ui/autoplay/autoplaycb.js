import * as PIXI from 'pixi.js'

class AutoplayCB extends PIXI.Sprite {
    bg = null
    w = 50
    h = 25
    active = false
    gr = null
    ye = null
    num = 0
    callback_function = null


    init(obj) {

        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.num = obj.num


        this.gr = new PIXI.Graphics();
        this.gr.beginFill(0xcccccc);
        this.gr.drawRoundedRect(
            0,
            0,
            this.w,
            this.h,
            5
        );
        this.gr.endFill();
        this.addChild(this.gr)


        this.ye = new PIXI.Graphics();
        this.ye.beginFill(0xffc41d);
        this.ye.drawRoundedRect(
            0,
            0,
            this.w,
            this.h,
            5
        );
        this.ye.endFill();
        this.addChild(this.ye)
        this.ye.alpha = 0


        this.numtxt = new PIXI.Text(obj.num, window.Lang.default["AUTOPLAYNUM"])
        this.numtxt.anchor.set(0.5, 0.5)
        this.numtxt.position.set(this.w / 2, this.h / 2)
        this.addChild(this.numtxt)


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
            this.callback_function(this)
        }
    }

    setActive(act) {
        this.active = act
        this.ye.alpha = this.active ? 1 : 0
        this.gr.alpha = this.active ? 0 : 1
    }

}


export default AutoplayCB;
