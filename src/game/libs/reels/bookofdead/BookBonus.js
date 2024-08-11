import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js";
import Config from "./Config"
import IconBook from "./IconBook"
import BookBonusPopup from "./BookBonusPopup"

class BookBonus extends PIXI.Sprite {

    params = null
    books = []


    init(obj) {
        this.params = obj
        if(Config.LOG)console.log(this.params.im)

        for (let i = 0; i < this.params.rheels.length; i++) {
            const element = this.params.rheels[i];
            var items = element.lastItems.slice().reverse()
            for (let j = 0; j < items.length; j++) {
                const item = items[j];
                if (item.id === 9) {
                    item.alpha = 0
                    var b = new IconBook()
                    b.init({ id: 9 })
                    b.x = i * Config.itemWidth
                    b.y = j * Config.itemHeight
                    this.addChild(b)
                    this.books.push(b)
                }
            }
        }

        this.animate()

    }

    animate() {
        window.SoundManager.play({ name: "fsIntroAnimationSnd", loop: false }) 
        for (let index = 0; index < this.books.length - 1; index++) {
            const element = this.books[index];
            new TWEEN.Tween(element)
                .to({
                    x: 2 * Config.itemWidth,
                    y: Config.itemHeight
                }, 1000)
                .easing(TWEEN.Easing.Quintic.In)
                .start()
        }

        new TWEEN.Tween(this.books[this.books.length - 1])
            .to({
                x: 2 * Config.itemWidth,
                y: Config.itemHeight
            }, 1000)
            .easing(TWEEN.Easing.Quintic.In)
            .onComplete(function () {
                for (let k = 0; k < this.books.length - 1; k++) {
                    this.removeChild(this.books[k])
                }
                var lastBook = this.books[this.books.length - 1]
                new TWEEN.Tween(lastBook.background)
                    .to({ alpha: 0 }, 200)
                    .easing(TWEEN.Easing.Quintic.In)
                    .start()

                this.addBookOpenAnimation()
            }.bind(this))
            .start()
    }

    eventHandler(obj) {
        this.params.eventListener(obj)
    }

    addBookOpenAnimation() {
        let textureArray = [];

        for (let i = 1; i <= 14; i++) {
            var n = "0"
            if (i > 9) {
                n = ""
            }
            let texture = PIXI.Texture.from("bonus_book_anim/book_" + n + i);
            textureArray.push(texture);
        };

        let animatedSprite = new PIXI.AnimatedSprite(textureArray);
        animatedSprite.x = 2 * Config.itemWidth
        animatedSprite.y = Config.itemHeight
        animatedSprite.play()
        animatedSprite.loop = false
        animatedSprite.animationSpeed = 0.6
        this.addChild(animatedSprite)
        this.removeChild(this.books[this.books.length - 1])
        animatedSprite.onComplete = function () {
            if(Config.LOG)console.log("animcompleted")
            var bb = new BookBonusPopup()
            bb.x = 2 * Config.itemWidth + Config.itemWidth / 2
            bb.y = Config.itemHeight + Config.itemHeight / 2 - 5
            bb.scale.x = bb.scale.y = 0.28
            bb.init({
                item: this.params.im.BonusIcon,
                freespins: this.params.im.FreeSpinsWon,
                eventListener:this.eventHandler.bind(this)
            })
            bb.open()
            this.addChild(bb)
            this.removeChild(animatedSprite)
        }.bind(this)
    }

}


export default BookBonus;
