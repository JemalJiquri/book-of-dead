import TWEEN from '@tweenjs/tween.js';

class MobileScrollContainer {
    container = null
    mousePressed = false
    currentTween = null
    currentY = 0
    currentPos = 0
    startTime = 0

    mouseX = 0
    mouseY = 0
    startY = 0
    firstMouseCheck = false

    init(obj) {
        //console.log(obj)
        this.container = obj.container
        this.container.bgHolder.interactive = true;


        if (window.SETTINGS.isMobile) {
            this.container.bgHolder.on('touchstart', this.onButtonDown.bind(this))
            this.container.bgHolder.on('touchend', this.onButtonUp.bind(this))
            this.container.bgHolder.on('touchendoutside', this.onButtonUp.bind(this))
            this.container.bgHolder.on('touchmove', this.mouseMove.bind(this))
        } else {
            this.container.bgHolder.on('mousedown', this.onButtonDown.bind(this))
            this.container.bgHolder.on('mouseup', this.onButtonUp.bind(this))
            this.container.bgHolder.on('mouseupoutside', this.onButtonUp.bind(this))
            this.container.bgHolder.on('mousemove', this.mouseMove.bind(this))
        }
    }

    mouseMove(e) {
        if (this.mousePressed) {
            if (this.currentTween) {
                this.currentTween.stop()
            }

            if(!this.firstMouseCheck){
                var deltaX = Math.abs(this.mouseX - e.data.global.x)
                var deltaY = Math.abs(this.mouseY - e.data.global.y)
                if(deltaY<=deltaX){
                    this.mousePressed = false
                    this.container.y = this.startY
                    return
                }
                this.firstMouseCheck = true
                console.log(` ${deltaX} ${deltaY} `)
            }

            var newY = e.data.global.y - this.mouseY
            this.mouseY = e.data.global.y

            this.currentPos = this.currentPos + newY
            if (this.currentPos > 40) {
                this.currentPos = 40
            }

            var maxPos = this.container.contH - this.container.scrollH
            if (this.currentPos < -maxPos - 40) {
                this.currentPos = -maxPos - 40
            }
            this.container.y = this.currentPos
        }
    }

    onButtonDown(e) {
        this.mousePressed = true
        this.mouseY = e.data.global.y
        this.mouseX = e.data.global.x
        this.currentPos = this.container.y
        this.startY = this.container.y
        this.startTime = Date.now()
        this.firstMouseCheck = false
    }

    onButtonUp(e) {
        if(this.startY == this.container.y){
            return
        }
        console.log("mobilescroll",this.startY,this.container.y)
        this.mousePressed = false
        if (this.currentTween) {
            this.currentTween.stop()
        }
        var maxPos = this.container.contH - this.container.scrollH
        if (this.currentPos < -maxPos) {
            this.currentTween = new TWEEN.Tween(this.container)
                .to({ y: -maxPos }, 300)
                .easing(TWEEN.Easing.Sinusoidal.Out)
                .start()
            return
        }
        if (this.currentPos > 0) {
            this.currentTween = new TWEEN.Tween(this.container)
                .to({ y: 0 }, 300)
                .easing(TWEEN.Easing.Sinusoidal.Out)
                .start()
            return
        }


        var endTime = Date.now() - this.startTime

        if (endTime < 400) {
            var endY = this.container.y - this.startY

            var newY = endY > 0 ? this.container.y + 100 : this.container.y - 100
            //if(endY<0)
            if (newY > 0) {
                newY = 0
            }
            this.currentTween = new TWEEN.Tween(this.container)
                .to({ y: newY }, 500)
                .easing(TWEEN.Easing.Sinusoidal.Out)
                .start()
        }

    }

}

export default MobileScrollContainer
