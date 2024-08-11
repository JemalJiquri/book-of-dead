import * as PIXI from 'pixi.js'

class MobileSlider extends PIXI.Sprite {

    config = null
    bgGraphics = null
    dragSprite = null
    lineHolder = null
    mousePressed = false
    percent = 0
    dragTxtHolder = null
    num = 0
    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.config = obj
        this.name = obj.name
        
        
        this.percent = this.config.current/this.config.steps.length
        this.num = this.config.steps[parseInt(this.percent * this.config.steps.length)]
        this.lineHolder = new PIXI.Sprite()
        this.lineHolder.buttonMode = true;
        this.lineHolder.interactive = true;

        this.bgFGraphics = new PIXI.Graphics();
        this.bgFGraphics.beginFill(0xffffff, 0.1)
        this.bgFGraphics.drawRect(0, -15, this.config.w, 35)
        this.bgFGraphics.endFill()
        this.lineHolder.addChild(this.bgFGraphics)

        this.bgGraphics = new PIXI.Graphics();
        this.lineHolder.addChild(this.bgGraphics)


        this.dragSprite = new PIXI.Sprite()

        var dragGraphics = new PIXI.Graphics();

        var circleSize = 30
        dragGraphics.beginFill(0xcbcbcb)
        dragGraphics.drawCircle(0, 0, circleSize / 2)
        dragGraphics.endFill()

        dragGraphics.beginFill(0xffffff)
        dragGraphics.drawCircle(0, 0, circleSize / 2 - 2)
        dragGraphics.endFill()

        dragGraphics.beginFill(0xcbcbcb)
        dragGraphics.drawCircle(0, 0, circleSize / 4)
        dragGraphics.endFill()

        dragGraphics.beginFill(this.config.col)
        dragGraphics.drawCircle(0, 0, circleSize / 4 - 2)
        dragGraphics.endFill()


        var dragTxtGraphics = new PIXI.Graphics();

        dragTxtGraphics.beginFill(this.config.col)
        dragTxtGraphics.drawRoundedRect(
            -circleSize * 1.5 / 2,
            -circleSize * 0.8 - 20,
            circleSize * 1.5,
            circleSize * 0.8,
            3)
        dragTxtGraphics.endFill()

        dragTxtGraphics.beginFill(this.config.col)
        dragTxtGraphics.moveTo(0, 0);
        dragTxtGraphics.lineTo(-10, -25);
        dragTxtGraphics.lineTo(10, -25);
        dragTxtGraphics.lineTo(0, 0);
        dragTxtGraphics.endFill()




        this.headTxt = new PIXI.Text(
            this.config.steps[this.config.current],
            window.Lang.default["MOB_MENU_SLIDER"])
        this.headTxt.anchor.set(0.5, 0.5)
        this.headTxt.position.set(0, -circleSize * 0.8 - 20 + circleSize * 0.8 / 2)
        this.dragTxtHolder = new PIXI.Sprite()


        this.dragTxtHolder.addChild(dragTxtGraphics)
        this.dragTxtHolder.addChild(this.headTxt)
        this.dragSprite.addChild(this.dragTxtHolder)
        this.dragSprite.addChild(dragGraphics)

        this.addChild(this.lineHolder)
        this.addChild(this.dragSprite)

        this.draw()

        if (this.config.showMinMax) {
            var mitxt = this.config.steps[0]
            var matxt = this.config.steps[this.config.steps.length-1]
            if(this.config.divider>0){
                mitxt = (this.config.steps[0]/this.config.divider).toFixed(2)
                matxt = (this.config.steps[this.config.steps.length-1]/this.config.divider).toFixed(2)
            }
            this.minTxt = new PIXI.Text(
                mitxt,
                window.Lang.default["MOB_MENU_SLIDER_MIN"])
            this.minTxt.anchor.set(1, 0.5)
            this.minTxt.position.set(-circleSize/2-5, 2)
            this.addChild(this.minTxt)

            this.maxTxt = new PIXI.Text(
                matxt,
                window.Lang.default["MOB_MENU_SLIDER_MAX"])
            this.maxTxt.anchor.set(0, 0.5)
            this.maxTxt.position.set(this.config.w+circleSize/2+5, 2)
            this.addChild(this.maxTxt)
        }



        if (window.SETTINGS.isMobile) {
            this.lineHolder.on('touchstart', this.onButtonDown.bind(this))
            this.lineHolder.on('touchend', this.onButtonUp.bind(this))
            this.lineHolder.on('touchendoutside', this.onButtonUp.bind(this))
            this.lineHolder.on('touchmove', this.mouseMove.bind(this))
        } else {
            this.lineHolder.on('mousedown', this.onButtonDown.bind(this))
            this.lineHolder.on('mouseup', this.onButtonUp.bind(this))
            this.lineHolder.on('mouseupoutside', this.onButtonUp.bind(this))
            this.lineHolder.on('mousemove', this.mouseMove.bind(this))
        }
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
                var percent = (point.x - 12) / (this.config.w - 12)
                if (percent < 0) {
                    percent = 0
                }
                if (percent > 0.99) {
                    percent = 1
                }
                this.percent = percent
                //console.log(this.percent)
                this.draw()
                this.updateVal()
            }
        }
    }


    setVal(current){
        //console.log(this.config)
        var c = this.config.steps.indexOf(current)
        this.percent = (c)/(this.config.steps.length)
        if(c === (this.config.steps.length-1)){
            this.percent = 1
        }
        //console.log(this.config.name+" "+this.percent+" "+current+" "+c+" "+this.config.steps)
        this.draw()
        this.updateVal()
    }

    updateVal() {
        if(this.percent>=1){
            this.num = this.config.steps[this.config.steps.length-1]
        }else{
            this.num = this.config.steps[parseInt(this.percent * this.config.steps.length)]
        }
        
        var nnn = this.num
        if(this.config.divider>0){
            nnn = (this.num/this.config.divider).toFixed(2)
        }
        this.headTxt.text = "" + nnn
    }

    draw() {
        var dw = this.config.w //- this.config.w/this.config.steps.length
        //console.log("dwdw "+dw)
        this.bgGraphics.clear()
        this.bgGraphics.beginFill(0xc0c0c0)
        this.bgGraphics.drawRoundedRect(0, 0, dw, 5, 3)
        this.bgGraphics.endFill()

        this.bgGraphics.beginFill(0xffffff)
        this.bgGraphics.drawRoundedRect(1, 1, dw - 2, 5 - 2, 3)
        this.bgGraphics.endFill()

        this.bgGraphics.beginFill(this.config.col)
        this.bgGraphics.drawRoundedRect(1, 1, this.percent * dw, 5 - 2, 3)
        this.bgGraphics.endFill()

        this.dragSprite.x = this.percent * this.config.w
    }


    onButtonDown(e) {
        this.mousePressed = true
        this.mouseMove(e)
        this.dragTxtHolder.y = -5
    }

    onButtonUp(e) {
        this.mousePressed = false
        this.dragTxtHolder.y = 0
        if(this.callback_function){
            this.callback_function(this)
        }
    }


    




}

export default MobileSlider;
