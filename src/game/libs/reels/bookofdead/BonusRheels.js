import * as PIXI from 'pixi.js'

import Rheel from "../rheel/Rheel"
import BonusLines from "../rheel/BonusLines"
import Lines from "../rheel/Lines"
import Constants from "../rheel/Constants";
import Config from "./Config";
import Shared from "./Shared"
import BookWaitAnim from "./BookWaitAnim"
import Etrat from "./Etrat"



export default class BonusRheels extends PIXI.Sprite {

    config = Config
    rheels = []
    lines = []
    bonusLines = []
    eventListener = null
    im = null
    stoppedRheels = 0
    bookWaitIndex = 0
    bookWaitAnim = null
    bookBonus = null
    featureIcon = -1
    etrat = null


    init(_eventListener, _items, _featureIcon) {
        this.featureIcon = _featureIcon


        Shared.init()
        this.config.eventListener = this.eventHandler.bind(this)
        this.config.featureIcon = this.featureIcon
        this.eventListener = _eventListener ? _eventListener : function () { }
        this.rheels = []

        for (let index = 0; index < 5; index++) {
            var rheel = new Rheel()
            if (_items) {
                rheel.init(this.config, index, _items[index])
            } else {
                rheel.init(this.config, index, null)
            }

            rheel.x = this.config.itemWidth * index
            rheel.y = 0
            this.rheels.push(rheel)
            this.addChild(rheel)

        }
    }

    postCall(obj) {
        setTimeout(function () {
            this.eventListener(obj)
        }.bind(this), 5)

    }

    showEtrat(obj) {
        if (this.etrat) {
            this.etrat.hide()
            this.etrat = null
        }

        this.etrat = new Etrat()
        this.etrat.init(obj)
        this.etrat.show(0)

        this.addChild(this.etrat)
    }

    hideEtrat() {
        if (this.etrat) {
            this.etrat.hide(0)
            this.etrat = null
        }
    }


    initLines(linesArr) {
        Config.lines = []

        for (let i = 0; i < linesArr.length; i++) {
            const element = linesArr[i];
            var line = []
            for (let j = 0; j < element.length; j++) {
                line.push([j, element[j] - 1])
            }
            Config.lines.push(line)
        }
        if (Config.LOG) console.log(Config.lines)

        this.lines = new Lines()
        this.lines.init(this.config, this.eventHandler.bind(this))
        this.addChild(this.lines)

        this.bonusLines = new BonusLines()
        this.bonusLines.init(this.config, this.eventHandler.bind(this))
        this.addChild(this.bonusLines)
    }


    start() {
        window.SoundManager.play({ name: "reelrun", loop: false })
        this.reelsilent = window.SoundManager.play({ name: "reelsilent", loop: true })
        if (this.etrat) {
            this.etrat.hide()
            this.etrat = null
        }
        if (this.bookBonus) {
            this.removeChild(this.bookBonus)
            this.bookBonus = null
        }


        this.lines.stop()
        this.bonusLines.stop()


        for (let index = 0; index < this.rheels.length; index++) {
            const rheel = this.rheels[index];
            rheel.start(0)
        }
    }



    stop(im, fast, cfast) {
        this.im = im
        this.stoppedRheels = 0
        if (this.reelsilent) {
            this.reelsilent.fadeOut(100)
        }
        var booksCount = 0
        if (fast) {
            for (let index = 0; index < im.Reels.length; index++) {
                const items = im.Reels[index];
                this.rheels[index].stop(items, Constants.RHEEL_STOP_FAST)
            }
        } else {
            for (let index = 0; index < im.Reels.length; index++) {
                const items = im.Reels[index];
                var oldBookCount = booksCount
                for (let t = 0; t < items.length; t++) {
                    if (items[t] === 9) {
                        booksCount++
                    }
                }
                if (booksCount >= 2 && oldBookCount > 1) {
                    //this.rheels[index].stop(items, Constants.RHEEL_STOP_WAIT_BOOK)
                    this.bookWaitIndex = index - 1
                    for (let k = 0; k <= index - 1; k++) {
                        this.rheels[k].animateIcons(9, true)
                    }
                    this.addBookWaitAnim()
                    return
                } else {
                    this.rheels[index].stop(items, cfast ? Constants.RHEEL_STOP_CFAST : Constants.RHEEL_STOP_SIMPLE)
                }
            }
        }

    }

    fastStop() {
        for (let index = 0; index < this.rheels.length; index++) {
            const rheel = this.rheels[index];
            rheel.fastStop()
        }
    }

    addBookWaitAnim() {
        this.bookWaitIndex++
        if (this.bookWaitIndex >= this.rheels.length) {
            for (let k = 0; k < this.rheels.length; k++) {
                this.rheels[k].animateIcons(9, false)
            }
            return
        }

        if (Config.LOG) console.log(this.bookWaitIndex)
        this.bookWaitAnim = new BookWaitAnim()
        this.bookWaitAnim.init()

        this.bookWaitAnim.x = this.config.itemWidth * this.bookWaitIndex

        this.addChild(this.bookWaitAnim)
        this.bookWaitAnim.animateLoop()

        setTimeout(function () {
            this.bookWaitAnim.stopLoop(500)
            this.rheels[this.bookWaitIndex].stop(this.im.Reels[this.bookWaitIndex], Constants.RHEEL_STOP_WAIT_BOOK)
            this.addBookWaitAnim()
        }.bind(this), 3000);


    }

    addActiveIcons() {
        if (this.im.WinnerLinesB == null) {
            return false
        }

        for (let i = 0; i < this.im.ActiveReels.length; i++) {
            this.rheels[this.im.ActiveReels[i]].swapFeaturedIcons()
        }
        if (window.SoundManager.bgSound) {
            window.SoundManager.bgSound.volume(0.1, true)
        }
        setTimeout(function () {
            this.bonusLines.animate(this.im.WinnerLinesB)

        }.bind(this), 1100)

        return true
    }

    eventHandler(obj) {
        if (Config.LOG) console.log(obj)
        this.postCall(obj)
        if (obj.type === Constants.RHEEL_STOP) {
            this.stoppedRheels++
            if (this.stoppedRheels >= this.rheels.length) {
                this.postCall({ type: Constants.RHEELS_ANIM_STOP })
                if (this.im.WinnerLines.length > 0) {
                    this.lines.animate(this.im.WinnerLines)
                    if (window.SoundManager.bgSound) {
                        window.SoundManager.bgSound.volume(0.1, true)
                    }
                } else {
                    var activeIcons = this.addActiveIcons()
                    if (!activeIcons) {
                        this.postCall({ type: Constants.BONUS_LINE_ALL_ANIM_FINISHED })
                    }
                }
            }
        }

        if (obj.type === Constants.LINE_ALL_ANIM_FINISHED) {
            if (Config.LOG) console.log("bonus mode ")
            var activeIcons = this.addActiveIcons()
            if (!activeIcons) {

                this.postCall({ type: Constants.BONUS_LINE_ALL_ANIM_FINISHED })
            }
        }

        if (obj.type === Constants.LINE_ANIM_FINISHED) {
            for (let index = 0; index < this.rheels.length; index++) {
                const rheel = this.rheels[index];
                rheel.filterBlack(false)
            }
        }

        if (obj.type === Constants.LINE_ANIM_START) {
            for (let index = 0; index < this.rheels.length; index++) {
                const rheel = this.rheels[index];
                rheel.filterBlack(true)
            }

            var line = this.config.lines[obj.winData[0]]
            var cnt = obj.winData[2]
            var rheel = null
            var items = null
            for (let i = 0; i < cnt; i++) {
                const element = line[i];
                rheel = this.rheels[element[0]]
                items = rheel.lastItems.slice().reverse()
                items[line[i][1]].filterBlack(false)
            }

            for (let i = 0; i < cnt; i++) {
                const element = line[i];
                rheel = this.rheels[element[0]]
                items = rheel.lastItems.slice().reverse()
                items[line[i][1]].animate()
            }
        }


    }

    createMask(width, height) {
        var holderMask = new PIXI.Graphics();
        holderMask.beginFill(0x8bc5ff, 1);
        holderMask.moveTo(0, 0);
        holderMask.lineTo(width, 0);
        holderMask.lineTo(width, height);
        holderMask.lineTo(0, height);
        holderMask.lineTo(0, 0);
        return holderMask
    }

}


