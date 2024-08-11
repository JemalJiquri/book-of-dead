import * as PIXI from 'pixi.js'
import TabButton from "./tabs/tabbutton"
import TabBets from "./tabs/tabbets"
import TabSettings from "./tabs/tabsettings"
import TabRules from "./tabs/tabrules"

import TWEEN from '@tweenjs/tween.js';


class MobileMenu extends PIXI.Sprite {

    upTabs = [
        {
            txt: "BET",
            btn: null,
            page: null
        },
        {
            txt: "SETTINGS",
            btn: null,
            page: null
        },
        {
            txt: "PAYTABLE",
            btn: null,
            page: null
        },
        {
            txt: "GAME RULES",
            btn: null,
            page: null
        }
    ]
    currentTab = 0
    bgGraphics = null
    pagesHolder = null
    pagesMask = null
    mousePressed = false
    mouseX = 0
    mouseY = 0
    pagesHolderX = 0
    currentWidth = 0
    firstMouseCheck = false

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.Globals = obj.Globals
        this.bgGraphics = new PIXI.Graphics();
        this.addChild(this.bgGraphics)


        this.headTxt = new PIXI.Text(window.Lang.default["MOB_MENU_HEAD"].str, window.Lang.default["MOB_MENU_HEAD"])
        this.headTxt.anchor.set(0, 0)
        this.headTxt.position.set(5, 5)
        this.addChild(this.headTxt)

        this.hlGraphics = new PIXI.Graphics();
        this.addChild(this.hlGraphics)

        this.pagesHolder = new PIXI.Sprite()
        this.pagesHolder.y = 42
        this.addChild(this.pagesHolder)

        this.initTabs();

        this.hlGraphics2 = new PIXI.Graphics();
        this.addChild(this.hlGraphics2)

        this.pagesMask = new PIXI.Graphics();
        this.addChild(this.pagesMask)
        this.pagesHolder.mask = this.pagesMask

        this.pagesHolder.interactive = true;
        if (window.SETTINGS.isMobile) {
            this.pagesHolder.on('touchstart', this.onButtonDown.bind(this))
            this.pagesHolder.on('touchend', this.onButtonUp.bind(this))
            this.pagesHolder.on('touchendoutside', this.onButtonUp.bind(this))
            this.pagesHolder.on('touchmove', this.mouseMove.bind(this))
        } else {
            this.pagesHolder.on('mousedown', this.onButtonDown.bind(this))
            this.pagesHolder.on('mouseup', this.onButtonUp.bind(this))
            this.pagesHolder.on('mouseupoutside', this.onButtonUp.bind(this))
            this.pagesHolder.on('mousemove', this.mouseMove.bind(this))
        }

    }

    lockButtons(mode, play) {
        console.log(`lockButtons ${mode} ${play}`)
        if(this.upTabs[0].page.lockButtons!==undefined){
            this.upTabs[0].page.lockButtons(mode, play)
        }
    }

    mouseMove(e) {
        if (this.mousePressed) {
            if (!this.firstMouseCheck) {
                for (let i = 0; i < this.upTabs.length; i++) {
                    const element = this.upTabs[i].page;
                    if (element.isDraggingSlider()) {
                        this.mousePressed = false
                        this.pagesHolder.x = this.pagesHolderX
                        return
                    }
                }

                var deltaX = Math.abs(this.mouseX - e.data.global.x)
                var deltaY = Math.abs(this.mouseY - e.data.global.y)
                if (deltaX < deltaY) {
                    this.mousePressed = false
                    this.pagesHolder.x = this.pagesHolderX
                    return
                }
                this.firstMouseCheck = true
                console.log(` ${deltaX} ${deltaY} `)
            }

            var currentX = e.data.global.x
            var scroll = currentX - this.mouseX
            
            this.pagesHolder.x = this.pagesHolderX + scroll
            if(this.pagesHolder.x>0){
                this.pagesHolder.x=0
            }
            var lastTab = this.upTabs[this.upTabs.length-1].page
            console.log(lastTab.x+" "+this.pagesHolder.x)
            if(this.pagesHolder.x<-lastTab.x){
                this.pagesHolder.x = -lastTab.x
            }
            //-element.page.x 
        }
    }

    onButtonDown(e) {
        this.mousePressed = true
        this.mouseX = e.data.global.x
        this.mouseY = e.data.global.y
        this.pagesHolderX = this.pagesHolder.x
        this.firstMouseCheck = false
    }

    onButtonUp() {
        this.mousePressed = false
        var currentItem = 0
        var minDist = 100000
        for (let i = 0; i < this.upTabs.length; i++) {
            const element = this.upTabs[i].page;
            var dist = Math.abs(-element.x - this.pagesHolder.x)
            if (dist < minDist) {
                minDist = dist
                currentItem = i
            }
        }
        this.tabCallback({ index: currentItem },false)
    }

    initTabs() {
        var lastX = 10
        for (let i = 0; i < this.upTabs.length; i++) {
            const element = this.upTabs[i];
            element.btn = new TabButton()
            element.btn.init({
                callback_function: this.tabCallback.bind(this),
                txt: element.txt,
                index: i
            })
            element.btn.x = lastX
            element.btn.y = 20
            element.btn.setActive(i === 0)
            lastX = lastX + element.btn.textWidth + 10
            this.addChild(element.btn)
        }

        this.upTabs[0].page = new TabBets()
        this.upTabs[0].page.init({
            callback_function: this.tabPageCallback.bind(this),
            Globals:this.Globals
        })
        this.upTabs[0].page.y = 0
        this.pagesHolder.addChild(this.upTabs[0].page)


        this.upTabs[1].page = new TabSettings()
        this.upTabs[1].page.init({
            callback_function: this.tabPageCallback.bind(this),
            Globals:this.Globals
        })
        this.upTabs[1].page.y = 0
        this.pagesHolder.addChild(this.upTabs[1].page)

        

        this.upTabs[2].page = new TabRules()
        this.upTabs[2].page.init({
            img: "menuppaytabletext",
            w:100
        })
        this.upTabs[2].page.y = 0
        this.pagesHolder.addChild(this.upTabs[2].page)

        this.upTabs[3].page = new TabRules()
        this.upTabs[3].page.init({
            img: "menuprulettext"
        })
        this.upTabs[3].page.y = 0
        this.pagesHolder.addChild(this.upTabs[3].page)


        console.log(this.upTabs)

    }

    update(obj) {
        console.log(obj)
        this.upTabs[0].page.update(obj)
        this.upTabs[1].page.update(obj)
    }

    tabPageCallback(tab) {
        if (this.callback_function) {
            this.callback_function(tab)
        }
    }

    getConfig() {
        return this.upTabs[0].page.getConfig()
    }
    
    tabCallback(tab,fast) {
        if (this.openTween) {
            this.openTween.stop()
        }
        this.currentTab = tab
        for (let i = 0; i < this.upTabs.length; i++) {
            const element = this.upTabs[i];
            element.btn.setActive(i === tab.index)
            if (i === tab.index) {
                if(fast){
                    this.pagesHolder.x = -element.page.x 
                }else{
                    this.openTween = new TWEEN.Tween(this.pagesHolder)
                    .to({ x: -element.page.x }, 200)
                    .easing(TWEEN.Easing.Linear.None)
                    .start()
                   
                }
                
            }
        }
    }

    resize(w, h) {
        var heightM = 35
        if (w > h) {
            heightM = 35
        } else {
            heightM = 110
        }
        this.currentWidth = w
        this.bgGraphics.clear()
        this.bgGraphics.beginFill(0x171717)
        this.bgGraphics.drawRect(0, 0, w, h-heightM)
        this.bgGraphics.endFill()


        this.hlGraphics.clear()
        this.hlGraphics.beginFill(0x555555)
        this.hlGraphics.drawRect(0, 20, w, 2)
        this.hlGraphics.endFill()

        this.hlGraphics2.clear()
        this.hlGraphics2.beginFill(0xd3d3d3)
        this.hlGraphics2.drawRect(0, 42, w, 2)
        this.hlGraphics2.endFill()

        for (let i = 0; i < this.upTabs.length; i++) {
            const element = this.upTabs[i];
            if (element.page) {
                element.page.resize(w, h - 44 * 2)
                element.page.x = i * w
            }
        }

        this.pagesMask.clear()
        this.pagesMask.beginFill(0xd3d3d3)
        this.pagesMask.drawRect(0, 44, w, h - (heightM+44))
        this.pagesMask.endFill()

        this.tabCallback(this.currentTab,true)
    }

}

export default MobileMenu;
