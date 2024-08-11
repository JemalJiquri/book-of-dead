import * as PIXI from 'pixi.js'
import Constants from "./Constants";

class BonusLines extends PIXI.Sprite {
    lines = []
    winnerLines = null
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

        for (let i = 0; i < this.winnerLines.length; i++) {
            const element = this.winnerLines[i];
            this.lines[element[0]].animate(element,1+i*250,"expandingLine"+(i+1))
        }
        setTimeout(function () {
            if(window.SoundManager.bgSound){
                window.SoundManager.bgSound.volume(1,true)
            }
            
            this.eventListener({ type: Constants.BONUS_LINE_ALL_ANIM_FINISHED })
        }.bind(this),1000+ this.winnerLines.length*150);
    }

    stop(){
        this.stopped = true
        for (let i = 0; i < this.lines.length; i++) {
            const element = this.lines[i];
            element.stop()
        }
    }



    eventHandler(obj) {
        if(this.stopped){
            return
        }
        this.eventListener(obj)
        
    }


}


export default BonusLines;
