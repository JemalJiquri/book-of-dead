import * as PIXI from 'pixi.js'
import Constants from "./Constants";

class Lines extends PIXI.Sprite {
    lines = []
    winnerLines = null
    winAnimIndex = 0
    eventListener = null
    lineAnimIndex = 0
    nextTimeout = 0
    init(config, _eventListener) {
        console.dir(config)
        this.eventListener = _eventListener ? _eventListener : function () { }
        for (let index = 0; index < config.lines.length; index++) {
            var line = new config.lineClass()
            line.init(index, config, this.eventHandler.bind(this))
            this.addChild(line)
            this.lines.push(line)
        }
    }

    animate(_winnerLines) {
        this.stopped = false
        this.winnerLines = _winnerLines
        this.winAnimIndex = -1
        this.lineAnimIndex = 0
        console.log("this.winnerLines")
        console.log(this.winnerLines)
        this.nextLineAnimation()
    }

    stop(){
        this.stopped = true
        clearTimeout(this.nextTimeout)
        for (let i = 0; i < this.lines.length; i++) {
            const element = this.lines[i];
            element.stop()
        }
    }

    animateNextRound() {
        if(this.stopped){
            return
        }
        this.winAnimIndex = -1
        this.nextLineAnimation()
    }


    nextLineAnimation() {
        if(this.stopped){
            return
        }
        
        this.winAnimIndex++
        if (this.winAnimIndex >= this.winnerLines.length) {
            this.winAnimIndex = 0
            this.lineAnimIndex++
            this.eventListener({ type: Constants.LINE_ALL_ANIM_FINISHED })
            return
        }

        var wl = this.winnerLines[this.winAnimIndex]

        var line = this.lines[wl[0]]
        this.eventListener({ type: Constants.LINE_ANIM_START, line: line, winData: wl })
        this.lines[wl[0]].animate(wl)
    }

    eventHandler(obj) {
        if(this.stopped){
            return
        }
        this.eventListener(obj)
        if (obj.type === Constants.LINE_ANIM_FINISHED) {
            var tim = 600
            if(this.winAnimIndex == 0){
                tim = 900
            }
            this.nextTimeout = setTimeout(function () {
                this.nextLineAnimation()
            }.bind(this), tim);
        }
    }


}


export default Lines;
