import * as PIXI from 'pixi.js'


class MainButton extends PIXI.Sprite {
    callback_function = null
    fade_element = null
    mouseOver = false
    clicklSound = "btnclick"
    init() {

        this.buttonMode = true;
        this.interactive = true;


        if (window.SETTINGS.isMobile) {
            this.on('touchstart', this.onButtonDown.bind(this))
            this.on('touchend', this.onButtonUp.bind(this))
            this.on('touchendoutside', this.onButtonUp.bind(this))
            this.on('pointertap', this.onClick.bind(this))
        } else {
            this.on('mousedown', this.onButtonDown.bind(this))
            this.on('mouseup', this.onButtonUp.bind(this))
            this.on('mouseupoutside', this.onButtonUp.bind(this))
            this.on('mouseover', this.onButtonOver.bind(this))
            this.on('mouseout', this.onButtonOut.bind(this))
            this.on('click', this.onClick.bind(this))
        }
    }

    onClick() {
        window.SoundManager.play({ name: this.clicklSound, loop: false })
        if (this.callback_function) {
            this.callback_function(this)
        }
    }

    onButtonDown() {
        if (this.fade_element) {
            this.fade_element.alpha = 1
        }
    }

    onButtonUp() {
        if (this.fade_element) {
            this.fade_element.alpha = 0
        }

    }

    onButtonOver() {
        if (this.hover) {
            this.hover.alpha = 1
        }
        this.mouseOver = true
    }

    onButtonOut() {
        if (this.hover) {
            this.hover.alpha = 0
        }
        this.mouseOver = false
    }

}

export default MainButton;
