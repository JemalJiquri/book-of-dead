import * as PIXI from 'pixi.js'
import CoinAnim from "./coinanim"


class CoinsAnim extends PIXI.Sprite {
    isMobile = false
    init(ism) {
        this.isMobile = ism
    }

    addCoins(cnt) {
        for (let i = 0; i < cnt; i++) {
            var c = new CoinAnim()
            c.init(i * 50,this.isMobile)
            this.addChild(c)
        }
    }
    addCoin() {
        var c = new CoinAnim()
        c.init(50,this.isMobile)
        this.addChild(c)
    }



}


export default CoinsAnim;
