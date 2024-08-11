import * as PIXI from 'pixi.js'


class TabButton extends PIXI.Sprite {
    
    
    textWidth = 50
    hlGraphics = null
    headTxt = null
    index = 0
    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.index = obj.index
        
        this.headTxt = new PIXI.Text(
            obj.txt, 
            window.Lang.default["MOB_MENU_TAB_BETS"])
        this.headTxt.anchor.set(0, 0)
        this.headTxt.position.set(5, 5)
        this.addChild(this.headTxt)
        
        const style = new PIXI.TextStyle(window.Lang.default["MOB_MENU_TAB_BETS"]);
        const textMetrics = PIXI.TextMetrics.measureText(obj.txt, style);
        this.textWidth = textMetrics.width

        this.hlGraphics = new PIXI.Graphics();
        this.addChild(this.hlGraphics)
        this.hlGraphics.clear()
        this.hlGraphics.beginFill(0xf5c745)
        this.hlGraphics.drawRect(5, 20, textMetrics.width, 2)
        this.hlGraphics.endFill()
        
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

    setActive(active){
        this.hlGraphics.alpha = active?1:0
        this.headTxt.tint = active?0xffffff:0xbebebe
        
    }


}

export default TabButton;
