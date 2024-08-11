import * as PIXI from 'pixi.js'

class MobileSwitchBtn extends PIXI.Sprite {

    active = false
    callback_function = null
    buttonName = ""
    circleHolder = null
    bgHolder = null
    circleSize = 30
    obj = null
    init(obj) {

        if (obj.callback_function) {
            this.callback_function = obj.callback_function
            this.buttonName = obj.name
        }

        this.obj = obj
        if (this.obj.icon) {
            this.icon = PIXI.Sprite.from(PIXI.Texture.from(this.obj.icon));
            this.icon.x = 0
            //this.icon.y = 3
            this.icon.scale.set(0.5,0.5)
            this.addChild(this.icon)



            this.autostoptext = new PIXI.Text(obj.txt.str, obj.txt)
            this.autostoptext.anchor.set(0, 0)
            this.autostoptext.position.set(35, 7)
            this.addChild(this.autostoptext)
        } else {
            this.autostoptext = new PIXI.Text(obj.txt.str, obj.txt)
            this.autostoptext.anchor.set(0, 0)
            this.autostoptext.position.set(0, 7)
            this.addChild(this.autostoptext)
        }





        this.dragGraphics = new PIXI.Graphics();

        this.dragGraphics.beginFill(0xcbcbcb)
        this.dragGraphics.drawCircle(this.circleSize / 2, this.circleSize / 2, this.circleSize / 2)
        this.dragGraphics.endFill()

        this.dragGraphics.beginFill(0xffffff)
        this.dragGraphics.drawCircle(this.circleSize / 2, this.circleSize / 2, this.circleSize / 2 - 2)
        this.dragGraphics.endFill()

        this.dragGraphics.beginFill(0xcbcbcb)
        this.dragGraphics.drawCircle(this.circleSize / 2, this.circleSize / 2, this.circleSize / 4)
        this.dragGraphics.endFill()

        this.dragGraphics.beginFill(0xf5cf41)
        this.dragGraphics.drawCircle(this.circleSize / 2, this.circleSize / 2, this.circleSize / 4 - 2)
        this.dragGraphics.endFill()

        this.circleHolder = new PIXI.Sprite()
        this.circleHolder.addChild(this.dragGraphics)




        this.bgGraphics = new PIXI.Graphics();
        this.bgGraphics.beginFill(0xcbcbcb)
        this.bgGraphics.drawRoundedRect(
            2,
            1,
            this.circleSize * 2,
            this.circleSize - 2,
            this.circleSize)
        this.bgGraphics.endFill()

        this.bgGraphics.beginFill(0x676767)
        this.bgGraphics.drawRoundedRect(
            3,
            2,
            this.circleSize * 2 - 2,
            this.circleSize - 4,
            this.circleSize)
        this.bgGraphics.endFill()
        //0xcbcbcb


        this.bgHolder = new PIXI.Sprite()
        this.bgHolder.addChild(this.bgGraphics)
        this.addChild(this.bgHolder)
        this.addChild(this.circleHolder)

        this.bgHolder.x = obj.w
        this.circleHolder.x = obj.w

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

    resize(w){
        this.obj.w = w - this.circleSize * 4-10
        this.bgHolder.x = w - this.circleSize * 4-10
        this.circleHolder.x = w - this.circleSize * 4-10
        this.setActive(this.active)
    }

    setActive(act) {
        this.active = act
        var color = 0x676767
        if (this.active) {
            this.circleHolder.x = this.obj.w + this.circleSize + 2
            color = 0xf5cf41
        } else {
            this.circleHolder.x = this.obj.w
        }
        this.bgGraphics.clear()
        this.bgGraphics.beginFill(0xcbcbcb)
        this.bgGraphics.drawRoundedRect(
            2,
            1,
            this.circleSize * 2,
            this.circleSize - 2,
            this.circleSize)
        this.bgGraphics.endFill()

        this.bgGraphics.beginFill(color)
        this.bgGraphics.drawRoundedRect(
            3,
            2,
            this.circleSize * 2 - 2,
            this.circleSize - 4,
            this.circleSize)
        this.bgGraphics.endFill()
    }

}


export default MobileSwitchBtn;
