import * as PIXI from 'pixi.js'
import BTGButton from './btgbutton';

class UpDown extends PIXI.Sprite {

    active = false
    bg = null
    callback_function = null
    steps = []


    init(obj) {

        //counterarrowdown counterarrowup 
        console.log(obj)
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.bg = PIXI.Sprite.from(PIXI.Texture.from("counterbg"));
        this.addChild(this.bg)
        this.steps = obj.steps

        this.upBtn = new BTGButton();
        this.upBtn.init({
            bg: { data: 'counterarrowup', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['UPDOWNPLUS'],
            callback_function: this.buttonClicked.bind(this),
            name: obj.up
        })
        this.upBtn.position.set(20, -30)
        this.addChild(this.upBtn);

        this.downdBtn = new BTGButton();
        this.downdBtn.init({
            bg: { data: 'counterarrowdown', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['UPDOWNMINUS'],
            callback_function: this.buttonClicked.bind(this),
            name: obj.down
        })
        this.downdBtn.position.set(20, 54)
        this.addChild(this.downdBtn);

        this.headerText = new PIXI.Text(obj.header, window.Lang.default["UPDOWNH1"])
        this.headerText.anchor.set(0.5, 0.5)
        this.headerText.position.set(35, 10)
        this.addChild(this.headerText)


        this.valueText = new PIXI.Text("10", window.Lang.default["UPDOWNH2"])
        this.valueText.anchor.set(0.5, 0.5)
        this.valueText.position.set(35, 30)
        this.addChild(this.valueText)
    }


    setValue(value) {
        //console.log(value)
        //console.log(this.steps.indexOf(value))
        this.valueText.text = value
        var index = this.steps.indexOf(value)
        this.downdBtn.alpha = index === 0 ? 0.4 : 1
        this.downdBtn.buttonMode = !(index === 0);
        this.downdBtn.interactive = !(index === 0);

        this.upBtn.alpha = index === (this.steps.length - 1) ? 0.4 : 1
        this.upBtn.buttonMode = !(index === (this.steps.length - 1));
        this.upBtn.interactive = !(index === (this.steps.length - 1));
    }



    buttonClicked(obj) {
        if (this.callback_function) {
            this.callback_function(obj)
        }
    }


}


export default UpDown;
