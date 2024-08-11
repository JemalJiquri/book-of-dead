import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js";
import Constants from "./Constants";



export default class Rheel extends PIXI.Sprite {

    holder = null
    holderMask = null
    lastItems = []
    eventListener = null
    stopHandler = null
    startHandler = null
    stopItems = []
    stopItemsTmp = []
    isFastChecked = false
    items = []
    itemHeight = 100
    itemWidth = 100

    rotateSpeed = 100
    rheelHeight = 3
    stopType = Constants.RHEEL_STOP_SIMPLE
    currentTween = null

    offset = {
        up: {
            height: 100,
            time: 50,
            tween: TWEEN.Easing.Cubic.Out
        },
        down: {
            height: 100,
            time: 50,
            tween: TWEEN.Easing.Cubic.Out
        }
    }
    featureIcon = -1


    init(obj, _id, _items) {
        this.id = _id
        this.eventListener = obj.eventListener ? obj.eventListener : function () { }
        this.items = obj.items
        this.itemHeight = obj.itemHeight
        this.itemWidth = obj.itemWidth
        this.rotateSpeed = obj.rotateSpeed
        this.rheelHeight = obj.rheelHeight
        this.offset = obj.offset ? obj.offset : this.offset
        this.featureIcon = obj.featureIcon

        this.holder = new PIXI.Sprite()
        this.addChild(this.holder);
        this.holderMask = this.createMask(this.itemWidth, this.itemHeight * this.rheelHeight)
        this.addChild(this.holderMask);
        this.holder.mask = this.holderMask

        //_items

        for (let index = 0; index < this.rheelHeight; index++) {
            var randomItem = this.items[Math.floor(Math.random() * this.items.length)]
            if (_items != null) {
                randomItem = this.items[_items[index]]
            }
            var item = PIXI.Sprite.from(PIXI.Texture.from(randomItem.itemOrigin));
            item.y = this.itemHeight * index
            this.holder.addChild(item);
        }
    }

    animateAll() {
        for (let index = 0; index < this.lastItems.length; index++) {
            this.lastItems[index].animate()
        }
    }

    animateIcons(iconid, anim) {
        setTimeout(function () {
            for (let index = 0; index < this.lastItems.length; index++) {
                if (this.lastItems[index].id === iconid) {
                    if (anim) {
                        if (this.lastItems[index].animateLoop) {
                            this.lastItems[index].animateLoop()
                        }
                    } else {
                        if (this.lastItems[index].stopLoop) {
                            this.lastItems[index].stopLoop()
                        }
                    }
                }
            }
        }.bind(this), 1500)

    }

    swapFeaturedIcons() {
        var lastItemsOld = this.lastItems
        this.lastItems = []
        console.log(lastItemsOld)
        var delay = this.id * 200
        for (let i = lastItemsOld.length - 1; i >= 0; i--) {
            const element = lastItemsOld[i];
            if (element.id == this.featureIcon) {
                this.lastItems.push(element)
            } else {
                var featureItemObj = this.items[this.featureIcon]
                var featureItem = new featureItemObj.itemFeatureClass()
                featureItem.init(featureItemObj)
                featureItem.x = element.x
                featureItem.y = element.y
                featureItem.show(delay, element)
                this.holder.addChild(featureItem);
                this.lastItems.push(element)
            }
            delay = delay + 100
        }
    }


    animateFeatureIcons(iconid, anim) {
        console.log(iconid)
        for (let index = 0; index < this.lastItems.length; index++) {
            if (this.lastItems[index].id === iconid) {
                if (anim) {
                    if (this.lastItems[index].animate) {
                        this.lastItems[index].animate()
                    }
                } else {
                    if (this.lastItems[index].stopLoop) {
                        this.lastItems[index].stopLoop()
                    }
                }
            }
        }

    }

    pause(){
        this.currentTween.pause()
    }
    
    resume(){
        this.currentTween.resume()
    }


    start(_delay) {

        
        this.isFastChecked = false
        this.holder.mask = this.holderMask
        this.holderMask.alpha = 1

        this.stopItemsTmp = []
        this.stopItems = []
        this.lastItems = []

        for (let index = 0; index < this.rheelHeight; index++) {
            var randomItem = this.items[Math.floor(Math.random() * this.items.length)]
            var item = PIXI.Sprite.from(PIXI.Texture.from(randomItem.itemRotate));
            item.y = -this.itemHeight * (index + 1)-35
            this.lastItems.push(item)
            this.holder.addChild(item);
        }


        this.currentTween = new TWEEN.Tween(this.holder)
            .to({ y: -this.offset.up.height }, this.offset.up.time)
            .delay(_delay)
            .easing(this.offset.up.tween)
            .onComplete(function () {
                this.eventListener({ type: Constants.RHEEL_HALF_START, id: this.id })
                this.currentTween = new TWEEN.Tween(this.holder)
                    .to({ y: this.itemHeight * this.rheelHeight }, this.rotateSpeed)
                    .easing(TWEEN.Easing.Exponential.In)
                    .delay(this.offset.up.endDelay)
                    .onStart(function () {
                        this.eventListener({ type: Constants.RHEEL_START, id: this.id })
                    }.bind(this))
                    .onComplete(function () {
                        while (this.holder.children[0]) {
                            this.holder.removeChild(this.holder.children[0]);
                        }
                        for (let index = 0; index < this.lastItems.length; index++) {
                            this.holder.addChild(this.lastItems[index]);
                            this.lastItems[index].y = this.itemHeight * (this.lastItems.length - index - 1)
                        }
                        
                        this.holder.y = 0
                        this.process()
                    }.bind(this))
                    .start()
            }.bind(this))
            .start()

    }
   
    stop(items, type) {
        console.log(type)
        this.stopType = type
        this.stopItemsTmp = items
        var timeout = 210 * this.id
        
        if (this.stopType !== Constants.RHEEL_STOP_SIMPLE) {
            timeout = 0
        }
        if (this.stopType == Constants.RHEEL_STOP_CFAST) {
            timeout = 50
            this.isFastChecked = true
            this.stopType = Constants.RHEEL_STOP_FAST
        }

        setTimeout(function () {
            this.stopItems = items
        }.bind(this), timeout)
    }

    fastStop() {
        this.stopItems = this.stopItemsTmp
    }

    process() {
        this.lastItems = []
        for (let index = 0; index < this.rheelHeight; index++) {
            var randomItem = this.items[Math.floor(Math.random() * this.items.length)]
            var item = null
            if (this.stopItems.length > 0) {
                var itemID = this.stopItems[this.stopItems.length - 1 - index]
                randomItem = this.items[itemID]
                if (this.featureIcon == itemID) {
                    item = new randomItem.itemFeatureClass()
                } else {
                    item = new randomItem.itemClass()
                }

                item.init(randomItem)
            } else {
                item = PIXI.Sprite.from(PIXI.Texture.from(randomItem.itemRotate));
            }

            item.y = -this.itemHeight * (index + 1)
            this.lastItems.push(item)
            this.holder.addChild(item);
        }


        if (this.stopItems.length > 0) {
            var __y = this.itemHeight * this.rheelHeight + this.offset.down.height
            var __time = this.rotateSpeed
            if(this.isFastChecked){
                __time = this.rotateSpeed/2+this.id*70
            }
            var __tween = TWEEN.Easing.Linear.None
            if (this.stopType === Constants.RHEEL_STOP_WAIT_BOOK) {
                __y = this.itemHeight * this.rheelHeight
                __time = this.rotateSpeed * 4
                __tween = TWEEN.Easing.Quartic.Out
            }
            this.currentTween = new TWEEN.Tween(this.holder)
                .to({ y: __y }, __time)
                .easing(__tween)
                .onComplete(function () {
                    this.eventListener({ type: Constants.RHEEL_HALF_STOP, id: this.id })
                    while (this.holder.children[0]) {
                        this.holder.removeChild(this.holder.children[0]);
                    }
                    let haveBook = false
                    for (let index = 0; index < this.lastItems.length; index++) {
                        this.holder.addChild(this.lastItems[index]);
                        if(this.lastItems[index].id == 9){
                            haveBook = true
                        }
                        this.lastItems[index].y = this.itemHeight * (this.lastItems.length - index - 1)
                    }
                    if (this.stopType === Constants.RHEEL_STOP_WAIT_BOOK) {
                        this.holder.y = 0
                        setTimeout(function () {
                            this.eventListener({ type: Constants.RHEEL_STOP, id: this.id })
                            this.holder.mask = null
                            this.holderMask.alpha = 0
                        }.bind(this), 100)
                    }
                    if (
                        this.stopType === Constants.RHEEL_STOP_SIMPLE ||
                        this.stopType === Constants.RHEEL_STOP_FAST
                    ) {
                        this.holder.y = this.offset.down.height
                        window.SoundManager.play({ name: "reelstop", loop: false,volume:0.5 })
                        if(haveBook){
                            setTimeout(() => {
                                window.SoundManager.play({ name: "teaser_1", loop: false }) 
                            }, 100);
                            
                        }
                        // 
                        new TWEEN.Tween(this.holder)
                            .to({ y: 0 }, this.offset.down.time)
                            .delay(this.offset.down.endDelay)
                            .easing(this.offset.down.tween)
                            .onComplete(function () {
                                this.eventListener({ type: Constants.RHEEL_STOP, id: this.id })
                                this.holder.mask = null
                                this.holderMask.alpha = 0
                            }.bind(this))
                            .start()
                    }
                }.bind(this))
                .start()
        } else {
            this.currentTween = new TWEEN.Tween(this.holder)
                .to({ y: this.itemHeight * this.rheelHeight }, this.rotateSpeed)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () {
                    while (this.holder.children[0]) {
                        this.holder.removeChild(this.holder.children[0]);
                    }
                    for (let index = 0; index < this.lastItems.length; index++) {
                        this.holder.addChild(this.lastItems[index]);
                        this.lastItems[index].y = this.itemHeight * (this.lastItems.length - index - 1)
                    }
                    this.holder.y = 0
                    setTimeout(function () {
                        this.process()
                    }.bind(this), 0)
                }.bind(this))
                .start()
        }


    }




    filterBlack(on) {
        for (let index = 0; index < this.lastItems.length; index++) {
            this.lastItems[index].filterBlack(on)
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


