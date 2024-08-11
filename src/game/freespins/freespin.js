import * as PIXI from 'pixi.js'
import BTGButton from '../../ui/buttons/btgbutton';




class FreeSpin extends PIXI.Sprite {

    mainBg = null
    holder = null
    activateBtn = null
    init(_obj) {
        this.obj = _obj
        this.bgAlpha = new PIXI.Graphics();
        this.bgAlpha.alpha = 0.1
        this.bgAlpha.beginFill(0x000000);
        this.bgAlpha.drawRect(0, 0,
            this.obj.w * window.devicePixelRatio * 5,
            this.obj.h * window.devicePixelRatio * 5);
        this.bgAlpha.endFill();
        this.bgAlpha.interactive = true
        this.addChild(this.bgAlpha)

        this.holder = new PIXI.Sprite()
        this.addChild(this.holder)

        this.mainBg = PIXI.Sprite.from(PIXI.Texture.from('freebtnbg'));
        this.holder.addChild(this.mainBg)



        //FREE1
        this.txt1 = new PIXI.Text(
            window.Lang.default["FREE1"].str,
            window.Lang.default["FREE1"])
        this.txt1.anchor.set(0.5, 0)
        this.txt1.position.set(914 / 2, 10)
        this.holder.addChild(this.txt1)

        this.txt2 = new PIXI.Text(
            window.Lang.default["FREE2"].str,
            window.Lang.default["FREE2"])
        this.txt2.anchor.set(0.5, 0)
        this.txt2.position.set(914 / 2, 60)
        this.holder.addChild(this.txt2)

        this.activateBtn = new BTGButton();
        this.activateBtn.init({
            bg: { data: 'activatebtn', alpha: 1, x: 0, y: 0 },
            hover: { data: 'activatebtnhover', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: "ACTIVATE"
        })

        this.txt3 = new PIXI.Text(
            window.Lang.default["FREE3"].str.replace('%s', this.obj.count),
            window.Lang.default["FREE3"])
        this.txt3.anchor.set(0.5, 0)
        this.txt3.position.set(290 / 2, 10)
        this.activateBtn.addChild(this.txt3)


        this.txt4 = new PIXI.Text(
            window.Lang.default["FREE4"].str.replace('%s', (this.obj.price/10).toFixed(2)).replace('%c', this.obj.curr),
            window.Lang.default["FREE4"])
        this.txt4.anchor.set(0.5, 0)
        this.txt4.position.set(290 / 2, 40)
        this.activateBtn.addChild(this.txt4)

        this.txt5 = new PIXI.Text(
            window.Lang.default["FREE5"].str,
            window.Lang.default["FREE5"])
        this.txt5.anchor.set(0.5, 0)
        this.txt5.position.set(290 / 2, 100)
        this.activateBtn.addChild(this.txt5)

        this.holder.addChild(this.activateBtn);
        this.activateBtn.x = 313;
        this.activateBtn.y = 140;



        this.txt6 = new PIXI.Text(
            window.Lang.default["FREE6"].str.replace('%s', (this.obj.price/10*this.obj.count).toFixed(2) ).replace('%c', this.obj.curr),
            window.Lang.default["FREE6"])
        this.txt6.anchor.set(0.5, 0)
        this.txt6.position.set(914 / 2, 310)
        this.holder.addChild(this.txt6)


        this.leftBtn = new BTGButton();
        this.leftBtn.init({
            bg: { data: 'freebtn', alpha: 1, x: 0, y: 0 },
            callback_function: this.exit.bind(this),
            hover: { data: 'freebtnhover', alpha: 0, x: 0, y: 0 },
            name: "CLOSE",
            text: window.Lang.default["FREE7"]

        })
        this.holder.addChild(this.leftBtn);
        this.leftBtn.x = 240;
        this.leftBtn.y = 370;

        this.rightBtn = new BTGButton();
        this.rightBtn.init({
            bg: { data: 'freebtn', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            hover: { data: 'freebtnhover', alpha: 0, x: 0, y: 0 },
            name: "CANCEL",
            text2: window.Lang.default["FREE8"]

        })
        this.holder.addChild(this.rightBtn);
        this.rightBtn.x = 495;
        this.rightBtn.y = 370;

    }

    resize(w, h) {
        this.bgAlpha.x = 0
        this.bgAlpha.y = 0
        if (window.SETTINGS.isMobile) {
            this.holder.scale.set(0.4, 0.4)
            this.holder.x = (w - 914 * 0.4) / 2
            this.holder.y = (h - 530 * 0.4) / 2
        } else {
            this.holder.x = 460
            this.holder.y = 238
        }
    }

    buttonClicked(btn) {
        this.obj.fsHandler(btn.name)
    }





    exit() {
        this.alpha = 0
        this.interactive = false;
        if (this.parent) {
            this.parent.removeChild(this)
        }
    }


}


export default FreeSpin
