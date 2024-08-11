import * as PIXI from 'pixi.js'

class AutoplayDrag extends PIXI.Sprite {
    bg = null
    w = 50
    h = 25
    active = false
    yefg = null
    num = 0
    callback_function = null
    lineHolder = null
    mousePressed = false
    steps = []
    init(obj) {
        this.steps = obj.steps
        this.lineHolder = new PIXI.Sprite()
        this.addChild(this.lineHolder)
        //autoplaydragline autoplaydragliney autoplaydrag 
        this.grbg = PIXI.Sprite.from(PIXI.Texture.from("autoplaydragline"));
        this.grbg.position.set(5, 10)
        this.lineHolder.addChild(this.grbg)

        this.yefgline = PIXI.Sprite.from(PIXI.Texture.from("autoplaydragliney"));
        this.yefgline.anchor.set(0, 0)
        this.yefgline.position.set(12, 12)
        this.yefgline.width = 2
        this.lineHolder.addChild(this.yefgline) 

        this.yefg = PIXI.Sprite.from(PIXI.Texture.from("autoplayswitchfgyellow"));
        this.yefg.anchor.set(0.5, 0.5)
        this.yefg.position.set(12, 12)
        this.lineHolder.addChild(this.yefg)



        this.lineHolder.buttonMode = true;
        this.lineHolder.interactive = true;



        this.numh = PIXI.Sprite.from(PIXI.Texture.from("autoplaydrag"));
        this.numh.position.set(255, 0)
        this.addChild(this.numh)

        this.autostoptext = new PIXI.Text(obj.txt.str, obj.txt)
        this.autostoptext.anchor.set(0, 0)
        this.autostoptext.position.set(5, 25)
        this.addChild(this.autostoptext)

        this.autostoptext = new PIXI.Text(this.steps[0], window.Lang.default["AUTOPLAYSTOPY"])
        this.autostoptext.anchor.set(0.5, 0.5)
        this.autostoptext.position.set(295, 14)
        this.addChild(this.autostoptext)



        if (window.SETTINGS.isMobile) {
            this.lineHolder.on('touchstart', this.onButtonDown.bind(this))
            this.lineHolder.on('touchend', this.onButtonUp.bind(this))
            this.lineHolder.on('touchendoutside', this.onButtonUp.bind(this))
            this.lineHolder.on('pointertap', this.onClick.bind(this))
            this.lineHolder.on('touchmove', this.mouseMove.bind(this))
        } else {
            this.lineHolder.on('mousedown', this.onButtonDown.bind(this))
            this.lineHolder.on('mouseup', this.onButtonUp.bind(this))
            this.lineHolder.on('mouseupoutside', this.onButtonUp.bind(this))
            this.lineHolder.on('click', this.onClick.bind(this))
            this.lineHolder.on('mousemove', this.mouseMove.bind(this))
        }

        //console.log()
    }

    mouseMove(interactionEvent) {
        if (this.mousePressed) {
            var holder = this.lineHolder
            if(window.PixiApp.stage){
                holder = window.PixiApp.stage
            }
            if (window.InteractionManager.hitTest(interactionEvent.data.global, holder)) {
                var point = { x: 0, y: 0 }
                point = interactionEvent.data.getLocalPosition(this.lineHolder, point)
                var percent = (point.x - 12) / (245 - 12)
                if (percent < 0) {
                    percent = 0
                }
                if (percent > 0.99) {
                    percent = 0.99
                }
                this.processMove(percent)
            }
        }

    }

    processMove(percent) {
        var step = parseInt(this.steps.length * percent)
        this.num = this.steps[step]
        this.autostoptext.text = this.steps[step]
        this.yefg.position.set((245 - 12) * percent + 12, 12)
        this.yefgline.width = (245 - 12) * percent
    }



    onButtonDown(e) {
        this.mousePressed = true
    }

    onButtonUp(e) {
        this.mousePressed = false
    }

    onClick() {
        if (this.callback_function) {
            this.callback_function(this)
        }
    }

    setValue(val) {
        var index = this.steps.indexOf(val)
        if(index>=0){
            var percent = index/this.steps.length
            if (percent < 0) {
                percent = 0
            }
            if (percent > 0.99) {
                percent = 0.99
            }
            this.processMove(percent)
        }
    }


    setActive(act) {

    }

}


export default AutoplayDrag;
