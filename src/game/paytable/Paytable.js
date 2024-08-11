import * as PIXI from 'pixi.js'
import PayTablePage1 from './PayTablePage1';
import PayTablePage2 from './PayTablePage2';
import PayTablePage3 from './PayTablePage3';
import BTGButton from '../../ui/buttons/btgbutton';




class PayTable extends PIXI.Sprite {

    mainBg = null
    pages = []
    activPageIcon = null
    currentPage = 0

    init(game) {
        this.game = game
        this.mainBg = PIXI.Sprite.from(PIXI.Texture.from('paytable/paytableBg'));
        this.addChild(this.mainBg)


        this.leftBtn = new BTGButton();
        this.leftBtn.init({
            bg: { data: 'paytable/menuBtn', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: "PREV"


        })
        this.addChild(this.leftBtn);
        this.leftBtn.x = 138;
        this.leftBtn.y = 650;
        this.leftBtn.rotation = 22


        this.rightBtn = new BTGButton();
        this.rightBtn.init({
            bg: { data: 'paytable/menuBtn', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: "NEXT"

        })
        this.addChild(this.rightBtn);
        this.rightBtn.x = this.leftBtn.x + this.leftBtn.get_size().height;
        this.rightBtn.y = this.leftBtn.y - this.leftBtn.get_size().height;


        this.exitBtn = new BTGButton();
        this.exitBtn.init({
            bg: { data: 'paytable/menuBtn', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
            name: "EXIT"


        })
        this.exitBtn.x = this.leftBtn.x + this.leftBtn.get_size().height;
        this.exitBtn.y = this.leftBtn.y - this.leftBtn.get_size().height + 5;
        this.exitBtn.rotation = 33
        this.addChild(this.exitBtn);

        let pageIcon = null

        for (let i = 0; i < 3; i++) {
            pageIcon = PIXI.Sprite.from(PIXI.Texture.from('paytable/pageicon'));
            this.mainBg.addChild(pageIcon)
            pageIcon.x = 121 + (pageIcon.width + 11) * i
            pageIcon.y = 598

        }

        this.activPageIcon = PIXI.Sprite.from(PIXI.Texture.from('paytable/activpageicon'));
        this.mainBg.addChild(this.activPageIcon)
        this.activPageIcon.x = 121
        this.activPageIcon.y = 598


        var payTablePage1 = new PayTablePage1()
        payTablePage1.init()
        this.addChild(payTablePage1)
        this.pages.push(payTablePage1)

        var payTablePage2 = new PayTablePage2()
        payTablePage2.init()
        payTablePage2.alpha = 0
        this.addChild(payTablePage2)
        this.pages.push(payTablePage2)

        var payTablePage3 = new PayTablePage3()
        payTablePage3.init()
        payTablePage3.alpha = 0
        this.addChild(payTablePage3)
        this.pages.push(payTablePage3)



        //this.currentPage = 2
        //this.changePage()

    }

    buttonClicked(btn) {
        console.log(btn.name)
        switch (btn.name) {
            case "PREV":
                this.currentPage--
                if (this.currentPage < 0) {
                    this.currentPage = this.pages.length - 1
                }
                break;
            case "NEXT":
                this.currentPage++
                if (this.currentPage > this.pages.length - 1) {
                    this.currentPage = 0
                }
                break;
            case "EXIT":
                this.exit()
                break
            default:
                break;
        }

        this.changePage()
    }

    changePage() {
        this.activPageIcon.x = 121 + (this.activPageIcon.width + 11) * this.currentPage
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].alpha = 0;
        }
        this.pages[this.currentPage].alpha = 1;
        this.pages[this.currentPage].restartAnimations()
    }




    next() {
        console.log("next")
        if(this.alpha === 0){
            this.alpha = 1
            this.currentPage = -1
        }
        this.currentPage++
        if (this.currentPage > this.pages.length - 1) {
            this.exit()
        }
        this.changePage()
    }

    exit() {
        this.currentPage = 0
        this.alpha = 0
        this.interactive = false;
    }

    tackeAndConnect(test) {

        this.activPageindex = (this.activPageindex + test) % 3
        if (this.activPageindex === -1) this.activPageindex = 2
        this.changePage()
    }

}


export default PayTable
