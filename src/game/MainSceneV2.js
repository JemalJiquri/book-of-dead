import * as PIXI from 'pixi.js'
import Globals from './Globals';
import BonusBG from './BonusBG';
import ErrorPopup from './ErrorPopup';

//curl -i -X POST  -H "Authorization:314cb6c78a38b96f11ad37e61cbae7851003" -H "Content-Type:application/json" -d '{"txnId": "Test_v000007","playerId": "-21","gameId": "bookofdead1","betPerLines": 100,"freeSpins": 5,"currency": "USD","promoCode": "Demi1","validityDays": 3}' 'https://demo-f.betsense.ge/BSFreeSpins'


import Rheels from './libs/reels/bookofdead/Rheels';
import BonusRheels from './libs/reels/bookofdead/BonusRheels';
import Autoplay from "../ui/autoplay/autoplay";
import Constants from './libs/reels/rheel/Constants';
import DesktopButtonsHolder from '../ui/desktop/desktopbuttonsholder';
import MobileButtonsHolder from '../ui/mobile/mobilebuttonsholder';
import ButtonConstants from '../ui/buttons/buttonconstants';
import Doubleholder from '../ui/doubleholder/doubleholder';
import Config from './libs/reels/bookofdead/Config';
import PayTable from './paytable/Paytable';
import AutoplayManager from './AutoplayManager';
import StatusBar from "../ui/statusbar/StatusBar"
import StatusBarMenu from "../ui/statusbar/StatusBarMenu"
import MainSceneHelper from "./MainSceneHelper"
import ConfirmPopup from "./ConfirmPopup"
import FreeSpin from './freespins/freespin';

//git add . && git commit -m "fixes" && git push -u origin main
//git submodule foreach git pull origin main

//{"IM":{"BonusStrikes":0,"WinnerLinesB":null,"ActiveReels":null,"Bet":1,"WinnerLines":[[4,5,2,5]],"Reels":[[3,2,5],[1,5,3],[4,6,5],[6,0,4],[0,9,2]],"WildReels":null,"ScatterWin":[],"TotalWin":5,"Bonus":false,"ExtraWin":0,"SpinID":470171,"Chips":9770,"FreeSpins":0,"TotalFreeSpin":0,"BonusFreeSpins":0},"SID":"","SLOTID":10045,"UID":-25,"MT":2}


class MainSceneV2 extends PIXI.Sprite {

  mainBg = null
  bg = null
  logo = null
  rheels = null
  desktopButtonsHolder = null
  payTable = null
  fastStop = false
  doubleholder = null
  colorsArr = {}
  bonusBG = null
  totalFreeSpins = 0
  linesArray = null
  bonusWon = null
  freeSpinWin = 0
  autoPlayManager = null
  switchToBonusSound = false
  canSpin = true
  gambleMode = false
  spacepressed = false
  autPlayConfig = null;
  mainSceneHelper = null
  reelRotating = false
  currentWin = 0
  currentCoinVal = 1
  currentBet = 0
  freeFreeSpinsView = null
  stopCounter = 0
  lastStopCounter = 0
  aTotalFreeSpins = 10
  bonusMode = false
  fsLeft = 0
  nextFreeSpins = null

  init() {
    console.log("init main scens")
    Config.LOG = false
    this.colorsArr[ButtonConstants.BTN_GAMBLE_BLACK] = 0
    this.colorsArr[ButtonConstants.BTN_GAMBLE_RED] = 1
    this.colorsArr[ButtonConstants.BTN_GAMBLE_CLUBS] = 2
    this.colorsArr[ButtonConstants.BTN_GAMBLE_DIAMOND] = 3
    this.colorsArr[ButtonConstants.BTN_GAMBLE_HEART] = 4
    this.colorsArr[ButtonConstants.BTN_GAMBLE_SPYDE] = 5
    console.log(this.colorsArr)
    // this.mainHolder = new PIXI.Sprite()
    // this.addChild(this.mainHolder) 




    this.lastStopCounter = Math.round(new Date().getTime() / 1000);

    this.freeFreeSpinsView = new PIXI.Sprite.from(PIXI.Texture.from('freeFreeSpins'));
    this.freeFreeSpinsViewTxt = new PIXI.Text("0/0", window.Lang.default["FREE9"])
    this.freeFreeSpinsViewTxt.anchor.set(0.5, 0.5)
    this.freeFreeSpinsViewTxt.position.set(242 / 2, 142 / 2)
    this.freeFreeSpinsView.addChild(this.freeFreeSpinsViewTxt)
    console.log('remove freeFreeSpinsView')
    this.freeFreeSpinsView.alpha = 0

    if (window.SETTINGS.isMobile) {
      this.mainBg = new PIXI.Sprite.from(PIXI.Texture.from('mobilebg'));
      this.mainBg.anchor.set(0.5, 0.5)

      this.slotBg = new PIXI.Sprite.from(PIXI.Texture.from('mobilereelsbg'));
      //this.slotBg.anchor.set(0.5, 0.5)
      this.freeFreeSpinsView.x = 0
      this.freeFreeSpinsView.scale.set(0.5, 0.5)
    } else {
      this.mainBg = new PIXI.Sprite.from(PIXI.Texture.from('maingamebg'));
      this.slotBg = new PIXI.Sprite();
      this.freeFreeSpinsView.x = 1350
    }

    this.addChild(this.mainBg);
    this.addChild(this.slotBg);


    this.addChild(this.freeFreeSpinsView);

    this.bonusBG = new BonusBG();
    this.bonusBG.init()
    this.mainBg.addChild(this.bonusBG);
    this.bonusBG.x = 920
    this.bonusBG.y = 65

    console.log(Globals.session)
    if (!Globals.getSession().sound) {
      window.SoundManager.mute()
    }
    if (this.bgSound) {
      this.bgSound.mute()
    }

    if (window.SETTINGS.isMobile) {
      this.desktopButtonsHolder = new MobileButtonsHolder()
      this.desktopButtonsHolder.init({
        callback_function: this.buttonClicked.bind(this),
        Globals: Globals
      })
      this.addChild(this.desktopButtonsHolder)

      this.desktopButtonsHolder.resize(window.innerWidth, window.innerHeight)
      this.statusBar = this.desktopButtonsHolder

      this.bonusBG.x = this.slotBg.width / 2
      this.bonusBG.y = -15
      this.slotBg.addChild(this.bonusBG)
    } else {
      this.desktopButtonsHolder = new DesktopButtonsHolder()
      this.desktopButtonsHolder.init({
        callback_function: this.buttonClicked.bind(this),
        Globals: Globals
      })
      this.desktopButtonsHolder.x = 300
      this.desktopButtonsHolder.y = 640
      this.addChild(this.desktopButtonsHolder)



      this.statusBar = new StatusBar()
      this.statusBar.init({
        callback_function: this.buttonClicked.bind(this)
      })
      this.addChild(this.statusBar)
    }


    this.updateStatusBar()


    this.mainSceneHelper = new MainSceneHelper(this)
    this.resize()

    document.addEventListener("keydown", this.onKeyDown.bind(this))
    document.addEventListener("keyup", this.onKeyUp.bind(this))





  }



  onKeyDown(e) {
    if (window.SETTINGS.isMobile) {
      return
    }
    if (!this.desktopButtonsHolder.spinBtn.buttonMode) {
      if (this.autoPlayManager == null) {
        return
      }
    }
    if (this.errorPopup) {
      return
    }
    if (this.fsPopup) {
      return
    }
    if (Globals.HelpPage.isOpened()) {
      return
    }
    if (this.autoplay) {
      return
    }
    if (this.settingsPopup) {
      return
    }

    if (this.spacepressed) {
      return
    }

    this.spacepressed = true
    if (!window.isMobile) {
      if (e.key === ' ') {
        if (Globals.session.space) {
          console.log("canSpinsss " + this.canSpin + " " + this.desktopButtonsHolder.spinBtn.buttonMode + " " + this.gambleMode)
          if (!this.bonusMode) {
            if (this.autoPlayManager != null) {
              this.buttonClicked({ name: ButtonConstants.BTN_STOP, type: "manual" })
              return
            }
            if (this.canSpin || this.gambleMode) {
              if (this.desktopButtonsHolder.spinBtn) {
                if (this.desktopButtonsHolder.spinBtn.buttonMode) {
                  console.log("playbnt")
                  window.SoundManager.play({ name: "btnclick", loop: false })
                }
              }

              if (this.canSpin) {
                this.buttonClicked({ name: ButtonConstants.BTN_SPIN, type: "manual" })
              }

            } else {
              if (this.desktopButtonsHolder.spinBtn) {
                if (this.desktopButtonsHolder.spinBtn.buttonMode) {
                  console.log("playbnt")
                  window.SoundManager.play({ name: "btnclick", loop: false })
                }
              }

              this.buttonClicked({ name: ButtonConstants.BTN_STOP, type: "manual" })
            }
          } else {
            if (!this.canSpin) {
              console.log("ffffffffffffffffffffffffff")
              window.SoundManager.play({ name: "btnclick", loop: false })
              this.buttonClicked({ name: ButtonConstants.BTN_STOP, type: "manual" })
            } else {
              this.buttonClicked({ name: ButtonConstants.BTN_SPIN, type: "manual" })
            }

          }

        }
      }
    }
  }

  onKeyUp(e) {
    if (e.key === ' ') {
      this.spacepressed = false
    }
  }

  updateStatusBar() {
    //console.log(`this.currentWin=${this.currentWin}`)
    this.statusBar.update({
      bet: (Globals.bet * Globals.coinValue * Globals.activLine / 100).toFixed(2),
      sound: Globals.session.sound ? 1 : 0,
      fast: Globals.session.fast ? 1 : 0,
      //menu: Globals.menu ? 1 : 0,
      win: this.currentWin > 0 ? (this.currentWin / 100).toFixed(2) : "",
      balance: (Globals.balansCoinsValue / 100).toFixed(2),
      autPlayConfig: this.autPlayConfig
    })

    if (this.settingsPopup) {
      //coin coins lines sound fast auto space Globals.activLine
      this.settingsPopup.update({
        sound: Globals.session.sound ? 1 : 0,
        fast: Globals.session.fast ? 1 : 0,
        space: Globals.session.space ? 1 : 0,
        coin: (Globals.coinValue / 100).toFixed(2),
        coins: Globals.bet,
        lines: Globals.activLine
      })
    }

    if (window.SETTINGS.isMobile) {
      this.desktopButtonsHolder.update({
        sound: Globals.session.sound ? 1 : 0,
        fast: Globals.session.fast ? 1 : 0,
        left: Globals.session.left ? 1 : 0,
        coin: Globals.coinValue,
        coins: Globals.bet,
        lines: Globals.activLine,
        betincoins: (Globals.bet * Globals.coinValue * Globals.activLine / 100).toFixed(2),
        betincash: Globals.bet * Globals.coinValue * Globals.activLine,// * Globals.activLine,
        bet: ((Globals.bet * Globals.coinValue * Globals.activLine) / 100).toFixed(2),// * Globals.activLine,
        balance: (Globals.balansCoinsValue / 100).toFixed(2),
        autPlayConfig: this.autPlayConfig
      })
    }
    //betincash  betincoins

    this.desktopButtonsHolder.update()
  }
  prevVolume = 0.0
  checkBGSound(b) {

    if (this.bgSound) {
      if (this.prevVolume == 0) {
        this.prevVolume = this.bgSound.volume()
      }
      if (b) {
        console.log("prevVolume off")
        this.bgSound.volume(0)
      } else {
        console.log("prevVolume on")
        if (Globals.session.sound) {
          this.bgSound.volume(this.prevVolume)
        }
      }
    }
  }


  eventHandler(obj) {
    switch (obj.type) {
      case Constants.BONUS_LINE_ALL_ANIM_FINISHED:
        console.log(this.IM)
        var winFreeSpin = false
        if (this.IM.Bonus) {
          if (this.IM.TotalFreeSpinsB) {
            winFreeSpin = true
          }
        }
        if (this.IM.BonusFreeSpins === 0 && !winFreeSpin) {
          let items = this.rheels.im.Reels

          if (this.bgSound) {
            this.bgSound.mute()
            window.SoundManager.soundCompleted(this.bgSound)
          }
          this.bgSound = window.SoundManager.play({ name: "background1", loop: true, volume: 1 })
          window.SoundManager.bgSound = this.bgSound
          this.switchToBonusSound = false

          if (this.rheels) {
            this.slotBg.removeChild(this.rheels);
            this.rheels = null
          }

          this.bonusBG.removeIcon()
          this.rheels = new Rheels()
          if (this.freeFreeSpinsView.alpha == 0) {
            this.statusBar.update({ menu: 1 })
          }
          
          this.rheels.init(this.eventHandler.bind(this), items, null)
          this.rheels.x = 313
          this.rheels.y = 138
          this.slotBg.addChild(this.rheels)
          this.rheels.initLines(this.linesArray)
          this.rheels.showEtrat({ totalWin: this.bonusWon.Win / Globals.coinValue })
          console.log("desktopButtonsHolder.lockButtons(true, true)")
          this.desktopButtonsHolder.lockButtons(true, true)

          this.desktopButtonsHolder.updateInfoText([this.bonusWon.Win / Globals.coinValue], true)
          setTimeout(() => {
            this.rheels.hideEtrat()
            console.log('bonusWon BONUS_LINE_ALL_ANIM_FINISHED ' + this.bonusWon.Win)
            this.desktopButtonsHolder.updateInfoText(
              [window.Lang.default["BONUS_WON_TXT"].str.replace("%s", this.bonusWon.Win / Globals.coinValue)])

            if (this.autoPlayManager != null) {
              this.autoPlayManager = null
              this.desktopButtonsHolder.setAutoMode(false)
              console.log("setSpinMode")
              this.desktopButtonsHolder.setSpinMode(true, 1)
            }
            if (this.autoPlayManager === null) {
              this.desktopButtonsHolder.setGambleMode(this.bonusWon.Win > 0)
              this.gambleMode = this.bonusWon.Win > 0
              this.checkBGSound(this.bonusWon.Win > 0)
              if (this.freeFreeSpinsView.alpha == 0) {
                console.log("desktopButtonsHolder.lockButtons(false, true)")
                this.desktopButtonsHolder.lockButtons(false, true)
              } else {
                this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
                if (this.gambleMode) {
                  if (this.desktopButtonsHolder.leftBtn) {
                    this.desktopButtonsHolder.leftBtn.setEnabled(true, true)
                  }
                  if (this.desktopButtonsHolder.rightBtn) {
                    this.desktopButtonsHolder.rightBtn.setEnabled(true, true)
                  }
                }

              }
            } else {
              //this.autoPlayManager.exit = true
              this.processAutoPlay()
            }
            this.bonusMode = false
            this.canSpin = true
          }, 3000);

        } else {
          var time = 1000
          var bonusWon = false
          var freeSpinsLeft = this.totalFreeSpins - this.IM.BonusFreeSpins + 1
          if (this.IM.Bonus) {
            if (this.IM.TotalFreeSpinsB) {
              this.totalFreeSpins = this.IM.TotalFreeSpinsB
              freeSpinsLeft = this.totalFreeSpins - this.IM.LeftFreeSpins + 1
              console.log('win free spin')
              time = 3000
              bonusWon = true
              this.rheels.showEtrat({ freeWon: this.IM.FreeSpinsWon })
              if (this.bgSound && !this.bonusMode) {
                this.bgSound.mute()
                window.SoundManager.soundCompleted(this.bgSound)
                window.SoundManager.play({ name: "fsSummarySnd", loop: false, volume: 0.4 })
              }else{
                if (window.SoundManager.bgSound) {
                  window.SoundManager.bgSound.volume(0.0, true)
              }
              }
              
              console.log("setSpinMode")
              this.desktopButtonsHolder.setSpinMode(true, 1)
              console.log("canSpin set to true")
              this.canSpin = true
              this.reelRotating = false
            }
          }
          //this.bonusWon.Win
          this.desktopButtonsHolder.updateInfoText([this.freeSpinWin], true)
          this.addChild(this.desktopButtonsHolder)
          setTimeout(() => {
            if (this.IM.BonusFreeSpins > 0) {
              this.bonusBG.updateCnt(freeSpinsLeft, this.totalFreeSpins)
            }
            if (this.autoPlayManager === null) {
              console.log("desktopButtonsHolder.lockButtons(true, true)")
              this.desktopButtonsHolder.lockButtons(true, true)
              this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
              if (this.desktopButtonsHolder.paytableBtn) {
                this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
              }

            }

            if (!bonusWon) {
              if (this.autoPlayManager === null) {
                this.buttonClicked({ name: ButtonConstants.BTN_SPIN, type: "manual" })
              } else {
                this.processAutoPlay()
                if (this.autoPlayManager === null) {
                  this.buttonClicked({ name: ButtonConstants.BTN_SPIN, type: "manual" })
                }
              }
            } else {
              this.processAutoPlay()
            }
          }, time);
        }
        this.resize()
        break

      case Constants.RHEEL_BONUS_ITEM_COMPLETED:
        console.log(this.IM)
        if (this.autoPlayManager === null) {
          console.log("desktopButtonsHolder.lockButtons(true, true)")
         
          setTimeout(() => {
            this.desktopButtonsHolder.lockButtons(true, true)
            this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
          }, 2000);
          
        }
        this.reelRotating = false
        if (this.IM.Bonus) {
          this.totalFreeSpins = this.IM.FreeSpinsWon
          this.bonusBG.setIcon(this.IM.BonusIcon)
          this.bonusBG.updateCnt(this.IM.FreeSpinsWon - this.IM.LeftFreeSpins + 1, this.IM.FreeSpinsWon)

          let items = this.rheels.im.Reels
          var bookBonus = this.rheels.bookBonus
          if (this.rheels) {
            this.slotBg.removeChild(this.rheels);
            this.rheels = null
          }
          this.switchToBonusSound = true

          this.rheels = new BonusRheels()
          this.rheels.bookBonus = bookBonus

          if (this.autoPlayManager === null) {
            this.desktopButtonsHolder.setGambleMode(false)
            this.checkBGSound(false)
          }
          console.log("setSpinMode")
          setTimeout(() => {
            this.desktopButtonsHolder.setSpinMode(true, 1)
          }, 2000);
          
          console.log("canSpin set to true")
          this.canSpin = true
          this.rheels.init(this.eventHandler.bind(this), items, this.IM.BonusIcon)
          this.rheels.x = 313
          this.rheels.y = 138
          this.slotBg.addChild(this.rheels)
          this.rheels.initLines(this.linesArray)
          this.rheels.addChild(this.rheels.bookBonus)
          this.processAutoPlay()
          this.resize()
          if (this.desktopButtonsHolder.paytableBtn) {
            this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
          }
          //this.desktopButtonsHolder.updateInfoText([this.IM.TotalWin], true)
        }
        break;

      case Constants.LINE_ANIM_START:
        if (!(this.bonusMode || this.IM.Bonus)) {
          this.desktopButtonsHolder.updateInfoText([
            window.Lang.default["BOD_WIN"].str.replace("%d", this.IM.TotalWin),
            window.Lang.default["BOD_WIN_LINE"].str.replace("%d", obj.winData[3]).replace("%l", obj.winData[0] + 1)
          ])
        }

        break;

      case Constants.RHEEL_BONUS_ANIM_STARTED:
        console.log("desktopButtonsHolder.lockButtons(true, this.autoPlayManager === null)")
        this.desktopButtonsHolder.lockButtons(true, this.autoPlayManager === null)
        if (this.desktopButtonsHolder.paytableBtn) {
          this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
        }
        break;

      case Constants.RHEELS_ANIM_STOP:
        //this.updateStatusBar()
        console.log(this.IM)
        if (this.bgSound) {
          console.log(this.bgSound)
        }
        if (this.IM.TotalWin > 0) {
          //this.currentWin = this.IM.TotalWin / this.currentCoinVal
          this.mainSceneHelper.playWinSound(this.IM.TotalWin, this.currentBet * Globals.activLine)
        }


        if (!this.IM.Bonus) {
          this.reelRotating = false
        }

        if (!this.bonusMode) {
          this.desktopButtonsHolder.updateInfoText([""])
          //if (this.freeSpinWin > 0) {
          //console.log('bonusWon RHEELS_ANIM_STOP ' + this.bonusWon.Win)
          //this.desktopButtonsHolder.updateInfoText([window.Lang.default["BONUS_WON_TXT"].str.replace("%s", this.freeSpinWin)])
          // this.freeSpinWin = 0
          // }
        } else {
          if (this.IM.Bonus) {
            this.desktopButtonsHolder.updateInfoText([this.IM.TotalWin], true)
          }
          //
        }

        if (this.autoPlayManager === null) {
          if (!(this.IM.Bonus || this.bonusMode)) {
            setTimeout(() => {
              console.log("setSpinMode " + this.doubleholder)
              if (this.doubleholder == null) {
                this.desktopButtonsHolder.setSpinMode(true, 1)
              }
              this.canSpin = true
            }, this.IM.TotalWin > 0 ? 500 : 50);
          } else {
            console.log("setSpinMode")
            this.desktopButtonsHolder.setSpinMode(true, 2)
          }

          if (!(this.IM.Bonus || this.bonusMode)) {
            this.desktopButtonsHolder.setGambleMode(this.IM.TotalWin > 0)
            this.checkBGSound(this.IM.TotalWin > 0)
            this.statusBar.update({ menu: 1 })
          }

          if (this.IM.Bonus || this.IM.BonusFreeSpins > 0) {
            console.log("desktopButtonsHolder.lockButtons(true, true)")
            this.desktopButtonsHolder.lockButtons(true, true)
          } else {
            //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            console.log("desktopButtonsHolder.lockButtons(false, false) "+this.bonusMode)
            if (this.freeFreeSpinsView.alpha == 0) {
              if(!this.bonusMode){
                this.desktopButtonsHolder.lockButtons(false, false)
              }
              
            }

          }

          if (this.freeFreeSpinsView.alpha > 0) {
            if (!this.IM.Bonus && this.IM.BonusFreeSpins === 0 && !this.bonusMode) {
              console.log("desktopButtonsHolder.lockButtons(true, true)")
              this.desktopButtonsHolder.lockButtons(true, true)
              this.statusBar.update({ menu: 0 })
              setTimeout(() => {
                this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
                this.canSpin = true
              }, this.IM.TotalWin > 0 ? 500 : 50);

              if (!(this.IM.Bonus || this.bonusMode)) {
                this.desktopButtonsHolder.setGambleMode(false)
                this.desktopButtonsHolder.setGambleMode(this.IM.TotalWin > 0)
                this.checkBGSound(this.IM.TotalWin > 0)
              }
              if (this.IM.TotalWin) {
                if (this.desktopButtonsHolder.leftBtn) {
                  this.desktopButtonsHolder.leftBtn.setEnabled(true, true)
                }
              }
            }

          }
          if (this.desktopButtonsHolder.paytableBtn) {
            this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
          }
        } else {
          //this.fsLeft
          /*if(this.freeFreeSpinsView.alpha>0 && this.IM.TotalWin > 0){
            this.fsLeft = this.fsLeft-1
            this.freeFreeSpinsViewTxt.text = (this.aTotalFreeSpins - this.fsLeft) + "/" +
            this.aTotalFreeSpins
          }*/



          console.log("fsLEft " + (this.aTotalFreeSpins - this.fsLeft))
          this.gambleMode = this.IM.TotalWin > 0
          console.log("RHEELS_ANIM_STOP this.gambleMode " + this.gambleMode)
          if (this.IM.WinnerLines.length === 0) {
            if (!this.IM.Bonus) {
              if (!this.bonusMode) {
                this.processAutoPlay()
              }
            }
          }
        }

        if (this.IM.Chips) {
          Globals.balansCoinsValue = this.IM.Chips
          this.desktopButtonsHolder.update()
        }
        this.updateStatusBar()
        break;

      case Constants.LINE_ALL_ANIM_FINISHED:
        if (!this.IM.Bonus) {
          if (!this.bonusMode) {

            this.processAutoPlay()
          }
        }
        break;


      default:
        break;
    }


  }

  processAutoPlay() {
    if (this.autoPlayManager === null) {
      console.log('processAutoPlay this.autoPlayManager == null')
      return
    }
    console.log('this.reelRotating ' + this.reelRotating + " " + Globals.HelpPage.state.visible)
    if (this.reelRotating) {
      return
    }



    this.rheels.lines.stop()
    if (!this.autoPlayManager.next(this.IM)) {
      console.log('processAutoPlay finished ' + this.IM.Bonus + " " + this.bonusMode)
      console.log("setSpinMode")
      this.desktopButtonsHolder.setSpinMode(true, 1)
      console.log("canSpin set to true")
      this.canSpin = true
      this.desktopButtonsHolder.setAutoMode(false)
      this.statusBar.update({ menu: 1 })
      if (!(this.bonusMode || this.IM.Bonus)) {
        this.desktopButtonsHolder.setGambleMode(this.IM.TotalWin > 0)
        this.checkBGSound(this.IM.TotalWin > 0)
      }
      if ((this.bonusMode || this.IM.Bonus)) {
        this.statusBar.update({ menu: 0 })
        console.log("desktopButtonsHolder.lockButtons(true, true)")
        this.desktopButtonsHolder.lockButtons(true, true)
        this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
      }

      this.autoPlayManager = null

    } else {
      console.log("autoConfig.num " + this.autoPlayManager.autoConfig.num)
    }
  }

  //session


  simulate() {
    this.rheels.start()
    setTimeout(function () {
      this.messageReaded({ "IM": { "BonusStrikes": 3, "WinnerLinesB": null, "ActiveReels": null, "Bet": 5, "WinnerLines": [[1, 1, 4, 125], [3, 6, 2, 25]], "Reels": [[9, 4, 0], [9, 6, 1], [9, 2, 1], [1, 2, 6], [2, 1, 7]], "WildReels": null, "ScatterWin": [[50, -1, 0]], "TotalWin": 200, "Bonus": true, "ExtraWin": 0, "SpinID": 449082, "Chips": 99975, "FreeSpins": 0, "TotalFreeSpin": 0, "BonusFreeSpins": 0, "BonusIcon": 4, "FreeSpinsWon": 10, "LeftFreeSpins": 10, "TotalFreeSpinsB": 10 }, "SID": "", "SLOTID": 10045, "UID": 59, "MT": 2 }, false)
    }.bind(this), 2000);


  }

  fsHandler(msg) {
    this.fsLeft = 0
    console.log(msg)
    switch (msg) {
      case 'CANCEL':
        Globals.Game.send(46, {})
        if (this.fsPopup) {
          this.fsPopup.exit()
          this.fsPopup = null
        }
        break;
      case 'ACTIVATE':
        clearTimeout(this.fsCloseTimeout)
        Globals.Game.send(45, {})
        console.log("desktopButtonsHolder.lockButtons(true, true)")
        this.desktopButtonsHolder.lockButtons(true, true)
        this.statusBar.update({ menu: 0 })
        this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
        if (this.desktopButtonsHolder.paytableBtn) {
          this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
        }

        break;

      default:
        break;
    }
  }
  fswinshowed = false
  messageReaded(msg) {

    if (msg.IM.TotalWin > 0) {
      msg.IM.Collected = false
    } else {
      msg.IM.Collected = true
    }

    console.log(msg)
    switch (msg.MT) {
      //AdjaraFreeSpins 7
      case 1:
        this.IM = msg.IM
        this.linesArray = msg.IM.LinesArray
        /** */
        if (this.IM.AdjaraFreeSpins) {
          if (!this.IM.AdjaraFreeSpins.FreeSpinMode && this.IM.AdjaraFreeSpins.TotalFreeSpins > 0) {
            this.fsPopup = new FreeSpin()
            this.fsPopup.init({
              count: this.IM.AdjaraFreeSpins.FreeSpins,
              price: this.IM.AdjaraFreeSpins.Bet,
              curr: Globals.currencyName,
              w: window.innerWidth,
              h: window.innerHeight,
              fsHandler: this.fsHandler.bind(this)
            })
            this.fsPopup.resize(window.innerWidth, window.innerHeight)
            this.addChild(this.fsPopup)
          }
          if (this.IM.AdjaraFreeSpins.FreeSpinMode) {
            console.log("desktopButtonsHolder.lockButtons(true, true)")
            this.desktopButtonsHolder.lockButtons(true, true)
            this.statusBar.update({ menu: 0 })
            this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
            if (this.desktopButtonsHolder.paytableBtn) {
              this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
            }
            this.aTotalFreeSpins = this.IM.AdjaraFreeSpins.TotalFreeSpins
            this.freeFreeSpinsView.alpha = 1

            this.freeFreeSpinsViewTxt.text = (this.aTotalFreeSpins - this.IM.AdjaraFreeSpins.FreeSpins) + "/" +
              this.aTotalFreeSpins
            console.log("this.freeFreeSpinsViewTxt " + this.freeFreeSpinsViewTxt.text)
            this.fsLeft = this.IM.AdjaraFreeSpins.FreeSpins
            Globals.coinValue = parseInt(this.IM.AdjaraFreeSpins.Bet)
            this.desktopButtonsHolder.update()
            this.updateStatusBar()
          }


        }
        if (this.IM.HandInfo) {
          if (this.IM.HandInfo.FreeSpinStateB) {
            if (this.IM.HandInfo.FreeSpinStateB.FreeSpinsWon > 0) {
              this.statusBar.update({ menu: 0 })
              this.bonusMode = true
              if (this.bgSound) {
                this.bgSound.mute()
                window.SoundManager.soundCompleted(this.bgSound)
              }
              this.bgSound = window.SoundManager.play({ name: "background2", loop: true, volume: 0.6 })
              window.SoundManager.bgSound = this.bgSound
              this.rheels = new BonusRheels()
              this.rheels.init(this.eventHandler.bind(this), null, this.IM.HandInfo.FreeSpinStateB.BonusIcon)
              this.rheels.x = 313
              this.rheels.y = 138
              this.slotBg.addChild(this.rheels)
              this.rheels.initLines(this.linesArray)
              console.log("desktopButtonsHolder.lockButtons(true, true)")
              this.desktopButtonsHolder.lockButtons(true, true)

              this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
              if (this.desktopButtonsHolder.paytableBtn) {
                this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
              }
              this.totalFreeSpins = this.IM.HandInfo.FreeSpinStateB.TotalFreeSpinsB
              this.bonusBG.setIcon(this.IM.HandInfo.FreeSpinStateB.BonusIcon)
              this.bonusBG.updateCnt(this.totalFreeSpins - this.IM.HandInfo.FreeSpinStateB.LeftFreeSpins + 1, this.totalFreeSpins)


              console.log(Globals.coinValueArr)
              var betInited = false
              for (let p = 0; p < Globals.coinValueArr.length; p++) {
                if (!betInited) {
                  const element = parseInt(this.IM.HandInfo.FreeSpinStateB.Bet / Globals.coinValueArr[p]);
                  if (Globals.betArr.indexOf(element) >= 0) {
                    Globals.bet = Globals.betArr[Globals.betArr.indexOf(element)]
                    Globals.coinValue = Globals.coinValueArr[p]
                    console.log(`bet=${Globals.bet}, coinval ${Globals.coinValueArr[p]}, element=${element}`)
                    betInited = true
                  }
                }

              }
              if (!betInited) {
                Globals.coinValue = parseInt(this.IM.HandInfo.FreeSpinStateB.Bet)
              }

              Globals.activLine = this.IM.HandInfo.FreeSpinStateB.Line


              this.desktopButtonsHolder.update()


            }
          }
        }

        if (this.rheels === null) {
          this.rheels = new Rheels()
          this.rheels.init(this.eventHandler.bind(this), null)
          this.rheels.x = 313
          this.rheels.y = 138
          this.slotBg.addChild(this.rheels)
          this.rheels.initLines(this.linesArray)
        }
        if (!this.bonusMode) {
          this.bgSound = window.SoundManager.play({ name: "background1", loop: true, volume: 1 })
          window.SoundManager.bgSound = this.bgSound
        }
        this.resize()
        //this.simulate()
        break;

      case 2:
        this.IM = msg.IM
        this.currentWin = this.IM.TotalWin
        this.IM.TotalWin = parseInt(this.IM.TotalWin / this.currentCoinVal)
        if (this.IM.WinnerLines.length > 0) {
          let newArray = this.IM.WinnerLines.slice();
          for (let i = 0; i < newArray.length; i++) {
            newArray[i][3] = parseInt(newArray[i][3] / this.currentCoinVal)
          }

          this.IM.WinnerLines = newArray
          console.log(this.IM.WinnerLines)
        }

        if (msg.IM.Bonus) {
          this.statusBar.update({ menu: 0 })
          this.currentWin = 0
        }

        if (msg.IM.Bonus && !this.bonusMode) {
          this.bonusMode = true
        }
        //this.currentCoinVal

        console.log(msg.IM)
        this.rheels.stop(msg.IM, this.fastStop, Globals.session.fast)

        break;

      case 3:
        this.IM = msg.IM
        this.doubleholder.winLost(this.IM.DoubleEnd === 0 || this.IM.Win > 0)
        if (this.IM.DoubleEnd === 0) {
          this.doubleholder.winCoin = this.IM.Win
          this.doubleholder.updateWinText();
          this.doubleholder.cardAnimation(this.IM.Card[1]);
          this.doubleholder.lockButtons(false)
        } else {
          this.desktopButtonsHolder.setGambleMode(false)
          this.checkBGSound(false)
          //this.desktopButtonsHolder.setSpinMode(true, 1)
          console.log("canSpin set to true")
          this.canSpin = true
          this.doubleholder.cardAnimation(this.IM.Card[1]);
          if (this.freeFreeSpinsView.alpha > 0) {
            console.log("desktopButtonsHolder.lockButtons(true, true)")
            this.desktopButtonsHolder.lockButtons(true, true)
            this.statusBar.update({ menu: 0 })
            this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
            if (this.desktopButtonsHolder.paytableBtn) {
              this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
            }
          }
          if (this.IM.Win > 0) {
            this.desktopButtonsHolder.updateInfoText([
              window.Lang.default["BOD_WIN"].str.replace("%d", this.IM.Win),
              window.Lang.default["BOD_WIN_GAMBLE_LIMIT"].str
            ])
            setTimeout(() => {
              window.SoundManager.play({ name: "gambleCollect", loop: false, volume: 2 })
            }, 1000);

          }
          setTimeout(function () {
            if (this.doubleholder) {
              this.doubleholder.showHide(false);
              if (this.bgSound && Globals.session.sound) {
                this.bgSound.unMute()
              }

              if (this.IM.Win == 0) {
                this.statusBar.update({
                  win: " "
                })
              }






              //(this.currentWin / 100).toFixed(2) BOD_WIN BOD_WIN_GAMBLE_LIMIT
              console.log("desktopButtonsHolder.lockButtons(false, false)")
              this.desktopButtonsHolder.lockButtons(false, false)
              this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
              if (this.desktopButtonsHolder.paytableBtn) {
                this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
              }
              this.doubleholder = null
              if (this.freeFreeSpinsView.alpha > 0) {
                console.log("desktopButtonsHolder.lockButtons(true, true)")
                this.desktopButtonsHolder.lockButtons(true, true)
                this.statusBar.update({ menu: 0 })
                this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
                if (this.desktopButtonsHolder.paytableBtn) {
                  this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
                }
              }
            }
          }.bind(this), 3000)
        }
        break;

      case 6:
        //bonus won
        this.freeSpinWin = msg.IM.FreeSpinWin / Globals.coinValue
        if (this.bonusMode && msg.IM.FreeSpinWin === 0) {
          this.freeSpinWin = msg.IM.TotalWin / Globals.coinValue
        }
        console.log(`aaaaaaaaaaaaa ${this.bonusMode} ${this.freeSpinWin} ${msg.IM.FreeSpinWin} ${Globals.coinValue}`)
        Globals.balansCoinsValue = msg.IM.Chips
        this.desktopButtonsHolder.update()
        this.statusBar.update({
          balance: (msg.IM.Chips / 100).toFixed(2)
        })
        if (msg.IM.FreeSpinsEnd) {
          this.currentWin = msg.IM.TotalWin
          this.statusBar.update({
            win: this.currentWin > 0 ? (this.currentWin / 100).toFixed(2) : ""
          })
        }

        if (msg.IM.TotalWin > 0) {
          if (!this.bonusMode) {
            this.currentWin = msg.IM.TotalWin
          } else {
            this.currentWin = 0
          }

          this.statusBar.update({
            win: this.currentWin > 0 ? (this.currentWin / 100).toFixed(2) : ""
          })
        }



        let activeFS = this.freeFreeSpinsView.alpha > 0 || msg.IM.CasinoFreeSpinsWin > 0
        if (msg.IM.AdjaraFreeSpins > 0) {
          if (this.fsLeft < msg.IM.AdjaraFreeSpins) {
            msg.IM.AdjaraFreeSpins = this.fsLeft
          }
          if (msg.IM.CasinoFreeSpinsWin == undefined || msg.IM.CasinoFreeSpinsWin == 0) {
            if ((this.aTotalFreeSpins - msg.IM.AdjaraFreeSpins) <= this.aTotalFreeSpins) {
              this.freeFreeSpinsViewTxt.text = (this.aTotalFreeSpins - msg.IM.AdjaraFreeSpins) + "/" +
                this.aTotalFreeSpins
            } else {
              this.freeFreeSpinsViewTxt.text = this.aTotalFreeSpins + "/" +
                this.aTotalFreeSpins
            }
          }


          console.log("this.freeFreeSpinsViewTxt " + this.freeFreeSpinsViewTxt.text)
          console.log(msg.IM.AdjaraFreeSpins)
          this.fsLeft = msg.IM.AdjaraFreeSpins
        } else {
          if (!this.fswinshowed) {
            console.log('remove freeFreeSpinsView')
            this.freeFreeSpinsViewTxt.text = "0/0"
            this.freeFreeSpinsView.alpha = 0
          }

          this.fsLeft = 0
          //this.statusBar.update({ menu: 1 })
        }
        if (msg.IM.CasinoFreeSpinsWin != undefined) {
          this.freeSpinWin = msg.IM.CasinoFreeSpinsWin
          console.log('bonusWon CasinoFreeSpinsWin ' + msg.IM.CasinoFreeSpinsWin + " " + activeFS + " " + this.fsLeft)
          this.desktopButtonsHolder.updateInfoText([window.Lang.default["BONUS_WON_TXT"].str.replace("%s", msg.IM.CasinoFreeSpinsWin)])
          this.statusBar.update({
            win: (msg.IM.CasinoFreeSpinsWin / 100).toFixed(2)
          })
          if (msg.IM.CasinoFreeSpinsWin > 0) {
            this.freeFreeSpinsViewTxt.text = "WON\n" + (msg.IM.CasinoFreeSpinsWin / 100).toFixed(2)
          } else {
            this.freeFreeSpinsViewTxt.text = "WON\n0.00"
          }

          this.freeFreeSpinsView.alpha = 1
          this.fswinshowed = true

          this.fsCloseTimeout = setTimeout(() => {
            this.fsLeft = 0
            console.log('remove freeFreeSpinsView')
            this.freeFreeSpinsView.alpha = 0
            this.freeFreeSpinsViewTxt.text = "0/0"

            if (this.autoPlayManager == null) {
              this.statusBar.update({ menu: 1 })
              console.log("desktopButtonsHolder.lockButtons(false, true)")
              this.desktopButtonsHolder.lockButtons(false, true)
            }
          }, 3000);

        }

        if (this.nextFreeSpins != null && msg.IM.TotalWin == 0) {
          console.log('next free spins activate ' + msg.IM.TotalWin + " " + msg.IM.CasinoFreeSpinsWin)
          if (this.autoPlayManager != null) {
            this.autoPlayManager.exit = true
          }
          this.fsPopup = new FreeSpin()
          this.fsPopup.init({
            count: this.nextFreeSpins.FreeSpins,
            price: this.nextFreeSpins.Bet,
            curr: Globals.currencyName,
            w: window.innerWidth,
            h: window.innerHeight,
            fsHandler: this.fsHandler.bind(this)
          })
          this.fsPopup.resize(window.innerWidth, window.innerHeight)
          this.addChild(this.fsPopup)
          this.nextFreeSpins = null
        }

        break;

      case 7:
        this.bonusWon = msg.IM

        break;

      case 45:
        if (msg.IM.FreeSpinMode) {
          this.aTotalFreeSpins = msg.IM.TotalFreeSpins
          this.freeFreeSpinsViewTxt.text = (this.aTotalFreeSpins - msg.IM.FreeSpins) + "/" +
            this.aTotalFreeSpins
          console.log("this.freeFreeSpinsViewTxt " + this.freeFreeSpinsViewTxt.text)
          this.freeFreeSpinsView.alpha = 1
          this.fsLeft = msg.IM.FreeSpins
          if (this.fsPopup) {
            this.fsPopup.exit()
            this.fsPopup = null
          }

          console.log(Globals.coinValueArr)
          console.log(parseInt(msg.IM.Bet))
          Globals.coinValue = parseInt(msg.IM.Bet)
          this.desktopButtonsHolder.update()
          this.updateStatusBar()
        } else {
          this.nextFreeSpins = msg.IM
          //this.freeFreeSpinsViewTxt.text = ""
          //console.log('remove freeFreeSpinsView')
          if (!this.fswinshowed) {
            //this.freeFreeSpinsView.alpha = 0
          }
          this.fswinshowed = false
          this.fsLeft = 0
          this.statusBar.update({ menu: 1 })

        }


        break;
      case 51:
        //error
        this.errorPopup = new ErrorPopup()
        this.errorPopup.init({
          w: window.innerWidth,
          h: window.innerHeight,
          code: msg.IM.ErrorCode,
          callback_function: this.errorClosed.bind(this)
        })
        this.addChild(this.errorPopup)


        if (!this.canSpin) {
          if (this.rheels) {
            this.rheels.destroy()
            this.slotBg.removeChild(this.rheels);
            this.rheels = null
          }

          this.rheels = new Rheels()

          this.rheels.init(this.eventHandler.bind(this), null)
          this.rheels.x = 313
          this.rheels.y = 138
          this.slotBg.addChild(this.rheels)
          this.rheels.initLines(this.linesArray)
          this.resize()
          console.log("setSpinMode")
          this.desktopButtonsHolder.setSpinMode(true, 1)
          console.log("canSpin set to true")
          this.canSpin = true
          this.reelRotating = false
          console.log("desktopButtonsHolder.lockButtons(false, false)")
          this.desktopButtonsHolder.lockButtons(false, false)
        }

        if (this.autoPlayManager) {
          this.desktopButtonsHolder.setAutoMode(false)
          this.statusBar.update({ menu: 1 })
          this.autoPlayManager = null
          return
        }


        if (window.SETTINGS.isMobile) {
          this.mainSceneHelper.resizeMobile()
        } else {
          this.mainSceneHelper.resizeDesktop()
        }
        break;
      default:
        break;
    }
  }

  errorClosed() {
    this.errorPopup = null
  }

  playBGSound() {
    if (this.bgSound == null) {
      if (this.bonusMode) {
        this.bgSound = window.SoundManager.play({ name: "background2", loop: true, volume: 0.6 })
        window.SoundManager.bgSound = this.bgSound
      } else {
        this.bgSound = window.SoundManager.play({ name: "background1", loop: true, volume: 1 })
        window.SoundManager.bgSound = this.bgSound
      }
    }
  }

  buttonClicked(obj) {
    console.log(obj.name)
    if (
      obj.name === ButtonConstants.BTN_GAMBLE_RED ||
      obj.name === ButtonConstants.BTN_GAMBLE_BLACK ||
      obj.name === ButtonConstants.BTN_GAMBLE_HEART ||
      obj.name === ButtonConstants.BTN_GAMBLE_CLUBS ||
      obj.name === ButtonConstants.BTN_GAMBLE_SPYDE ||
      obj.name === ButtonConstants.BTN_GAMBLE_DIAMOND
    ) {
      if (this.doubleholder !== null) {
        this.doubleholder.lockButtons(true)
      }
      var color = this.colorsArr[obj.name]
      console.log("selected " + color)
      Globals.Game.send(3, { Color: color })
    }
    if (obj.name === ButtonConstants.BTN_STATUSBAR_SOUND) {
      Globals.session.sound = !Globals.session.sound
      if (Globals.session.sound) {
        window.SoundManager.unMute()
        this.playBGSound()
      } else {
        window.SoundManager.mute()
      }
      Globals.saveSession()
      this.updateStatusBar()
    }
    if (obj.name === ButtonConstants.BTN_STATUSBAR_LEFT) {
      Globals.session.left = !Globals.session.left
      Globals.saveSession()
      this.updateStatusBar()
    }



    if (this.doubleholder !== null) {
      if (obj.name === ButtonConstants.BTN_COLLECT) {
        window.SoundManager.play({ name: "collectSnd", loop: false })
        if (this.doubleholder) {
          if (this.bgSound && Globals.session.sound) {
            this.bgSound.unMute()
          }
          this.doubleholder.showHide(false);
          this.doubleholder = null
          this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
        }
      } else if (obj.name === ButtonConstants.BTN_SPIN) {
        if (this.doubleholder) {
          if (this.bgSound && Globals.session.sound) {
            this.bgSound.unMute()
          }
          this.doubleholder.showHide(false);
          this.doubleholder = null
          this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
        }
      } else {
        return
      }
    }

    this.mainSceneHelper.buttonClicked(obj)




    if (obj.name === ButtonConstants.BTN_STATUSBAR_MENU_CLOSE) {
      if (this.settingsPopup) {
        this.settingsPopup.closePopup()
      }
      this.settingsPopup = null
    }

    if (obj.name === ButtonConstants.BTN_STATUSBAR_MENU) {
      if (this.settingsPopup) {
        this.settingsPopup.closePopup()
      }
      this.settingsPopup = new StatusBarMenu();
      this.settingsPopup.init({
        w: Globals.width,
        h: Globals.height,
        coinVal: Globals.coinValueArr,
        coinsVal: Globals.betArr,
        linesVal: Globals.linesArr,
        callback_function: this.buttonClicked.bind(this)
      })
      this.updateStatusBar()
      this.addChild(this.settingsPopup)
    }

    if (obj.name === ButtonConstants.BTN_AUTOPLAY_OK) {
      let autoConfig = null
      if (window.SETTINGS.isMobile) {
        autoConfig = this.desktopButtonsHolder.getConfig()
        this.autPlayConfig = this.desktopButtonsHolder.getConfig()
        if (autoConfig == null) {
          console.log('autoConfig is null')
          return
        }
        this.desktopButtonsHolder.closeMenu()
        this.desktopButtonsHolder.mobileBottomMenu.swapMenuBtn(false)
      } else {
        autoConfig = this.autoplay.getConfig()
        this.autPlayConfig = this.autoplay.getConfig()
      }


      this.desktopButtonsHolder.setGambleMode(false)
      this.checkBGSound(false)
      this.desktopButtonsHolder.setSpinMode(false)

      this.desktopButtonsHolder.setAutoMode(true)
      this.statusBar.update({ menu: 0 })
      if (this.autoplay) {
        this.autoplay.remove()
        this.autoplay = null
      }

      //
      console.log(autoConfig)
      //autoConfig.num = 4
      this.autoPlayManager = new AutoplayManager()
      autoConfig.callback_function = this.buttonClicked.bind(this)
      autoConfig.desktopButtonsHolder = this.desktopButtonsHolder
      autoConfig.balance = this.IM.Chips
      this.autoPlayManager.init(autoConfig, !this.reelRotating)
      console.log("canSpin set to false")
      this.canSpin = false
    }



    if (obj.name === ButtonConstants.BTN_AUTO_PLAY) {
      if (this.autoplay) {
        this.autoplay.remove()
        this.autoplay = null
      }
      var sMax = 100 * Globals.coinValue

      var singleWin = []
      for (let i = 0; i * Globals.coinValue <= sMax + Globals.coinValue; i++) {
        singleWin.push(i * Globals.coinValue)
      }

      var balInc = []
      for (let i = 0; i < singleWin.length; i++) {
        balInc.push(singleWin[i] * 10)
      }

      //single 0.01 100
      // 1 10000
      //inc/dec 1000
      //1 100000
      this.autoplay = new Autoplay()
      this.autoplay.init({
        singleWin: singleWin,
        balInc: balInc,
        balDec: balInc,
        w: Globals.width,
        h: Globals.height,
        currentMult: Globals.coinValue,
        callback_function: this.buttonClicked.bind(this)
      })
      if (this.autPlayConfig) {
        this.autoplay.setConfig(this.autPlayConfig)
      }
      this.addChild(this.autoplay)
    }

    if (obj.name === ButtonConstants.BTN_STOP) {
      if (this.autoPlayManager) {
        console.log("stop auto this.gambleMode " + this.gambleMode + " " + this.bonusMode + " " + this.canSpin)
        this.desktopButtonsHolder.setAutoMode(false)
        if (this.canSpin) {
          this.statusBar.update({ menu: 1 })
        }

        let prevGam = this.gambleMode
        if (!this.bonusMode) {
          if (this.gambleMode) {
            this.desktopButtonsHolder.setSpinMode(true)
            this.desktopButtonsHolder.setGambleMode(this.IM.TotalWin > 0)
            this.checkBGSound(this.IM.TotalWin > 0)

            if (this.freeFreeSpinsView.alpha > 0) {
              console.log("desktopButtonsHolder.lockButtons(true, false)")
              this.desktopButtonsHolder.lockButtons(true, false)
              this.statusBar.update({ menu: 0 })
              if (this.desktopButtonsHolder.leftBtn) {
                this.desktopButtonsHolder.leftBtn.setEnabled(true, true)
              }
              if (this.desktopButtonsHolder.rightBtn) {
                this.desktopButtonsHolder.rightBtn.setEnabled(true, true)
              }
            }
            this.canSpin = true
          } else {
            if (this.freeFreeSpinsView.alpha > 0) {
              console.log("desktopButtonsHolder.lockButtons(true, false)")
              this.desktopButtonsHolder.lockButtons(true, false)
              this.statusBar.update({ menu: 0 })
            }
          }
          this.gambleMode = false
        } else {
          console.log("desktopButtonsHolder.lockButtons(true, false)")
          this.desktopButtonsHolder.lockButtons(true, false)
          this.statusBar.update({ menu: 0 })
        }
        this.autoPlayManager = null
        if (!this.canSpin) {
          if (!prevGam) {
            console.log('lockinggggggggg')
            console.log("desktopButtonsHolder.lockButtons(true, true)")
            this.desktopButtonsHolder.lockButtons(true, true)
            ////this.statusBar.update({ menu: 0 })
          }

        }
        return
      } else {
        this.fastStop = true
        console.log("setSpinMode")
        this.desktopButtonsHolder.setSpinMode(true, 2)
        this.rheels.fastStop()
        //this.lastStopCounter stopCounter
        if (!this.bonusMode) {
          setTimeout(() => {
            if (this.stopCounter <= 3) {
              var tim = Math.round(new Date().getTime() / 1000);
              if (tim - this.lastStopCounter < 2) {
                this.stopCounter++
                if (this.stopCounter === 3) {
                  if (!Globals.session.fast) {
                    this.rheels.pause()
                    var p = new ConfirmPopup()
                    p.init({
                      headerText: "Fast Play",
                      bodyText: "It seems you prefer to play a \nbit faster. Would you like to enable \nFast Play mode?",
                      w: window.innerWidth,
                      h: window.innerHeight,
                      callback_function: (state) => {
                        if (state) {
                          Globals.session.fast = true
                          Globals.saveSession()
                          this.updateStatusBar()
                        }

                        this.rheels.resume()
                      }
                    })
                    this.addChild(p)
                  }

                }
              }
              console.log(tim - this.lastStopCounter)
              this.lastStopCounter = tim
            }
          }, 100);
        }



        return
      }
    }

    if (obj.name === ButtonConstants.BTN_GAMBLE) {
      if (this.payTable != null) {
        this.payTable.exit()
      }
      this.doubleholder = new Doubleholder()
      this.doubleholder.init(this.buttonClicked.bind(this), this.IM.TotalWin)
      this.doubleholder.x = 295
      this.doubleholder.y = 120
      this.doubleholder.showHide(true);

      this.rheels.reset()
      this.desktopButtonsHolder.updateInfoText([""])
      this.desktopButtonsHolder.gambleStarted()
      if (window.SETTINGS.isMobile) {
        this.doubleholder.x = 0
        this.doubleholder.y = 0
        this.doubleholder.scale.x = this.doubleholder.scale.y = 0.64
      }
      console.log("desktopButtonsHolder.lockButtons(true, false)")
      this.desktopButtonsHolder.lockButtons(true, false)
      if (this.desktopButtonsHolder.leftBtn) {
        this.desktopButtonsHolder.leftBtn.setEnabled(true, true)
      }
      this.desktopButtonsHolder.unlockSpinAndAuto(true, true)
      this.slotBg.addChild(this.doubleholder)
      if (this.bgSound) {
        this.bgSound.mute()
      }
      this.desktopButtonsHolder.setSpinMode(true, 2)
      //this.rheels.reset()
    }


    if (obj.name === ButtonConstants.BTN_COLLECT) {
      this.IM.Collected = true
      window.SoundManager.play({ name: "collectSnd", loop: false })
      Globals.Game.send(3, { Color: -1 })
      this.desktopButtonsHolder.updateInfoText([""])
      this.rheels.reset()
      this.currentWin = ' '
      this.statusBar.update({
        win: ' '
      })
      console.log("desktopButtonsHolder.lockButtons(false, false)")
      this.desktopButtonsHolder.lockButtons(false, false)
      this.desktopButtonsHolder.setGambleMode(false)
      this.checkBGSound(false)

      if (this.freeFreeSpinsView.alpha > 0) {
        console.log("desktopButtonsHolder.lockButtons(false, false)")
        this.desktopButtonsHolder.lockButtons(true, true)
        this.statusBar.update({ menu: 0 })
        this.desktopButtonsHolder.unlockSpinAndAuto(false, false)
        if (this.desktopButtonsHolder.paytableBtn) {
          this.desktopButtonsHolder.paytableBtn.setEnabled(true, true)
        }
      }
    }



    if (obj.name === ButtonConstants.BTN_SPIN) {

      if (!this.bonusMode) {
        if (this.freeFreeSpinsView.alpha > 0) {
          this.fsLeft = this.fsLeft - 1
          if (this.fsLeft >= 0) {
            this.freeFreeSpinsViewTxt.text = (this.aTotalFreeSpins - this.fsLeft) + "/" +
              this.aTotalFreeSpins
            console.log("this.freeFreeSpinsViewTxt " + this.freeFreeSpinsViewTxt.text)
          }

        }
      }



      this.lastStopCounter = Math.round(new Date().getTime() / 1000);
      if (this.payTable != null) {
        this.payTable.exit()
      }
      if (this.switchToBonusSound) {
        this.switchToBonusSound = false
        this.bonusMode = true
        if (this.bgSound) {
          this.bgSound.mute()
          window.SoundManager.soundCompleted(this.bgSound)
        }
        this.bgSound = window.SoundManager.play({ name: "background2", loop: true, volume: 0.6 })
        window.SoundManager.bgSound = this.bgSound
      }
      this.currentWin = ' '
      this.statusBar.update({
        win: ' '
      })
      this.statusBar.update({ menu: 0 })
      this.rheels.start()
      this.fastStop = false
      this.reelRotating = true
      if (this.autoPlayManager == null) {
        this.desktopButtonsHolder.setGambleMode(false)
        this.checkBGSound(false)
        console.log("desktopButtonsHolder.lockButtons(true, false)")
        this.desktopButtonsHolder.lockButtons(true, false)
      }

      this.desktopButtonsHolder.setSpinMode(false)
      console.log("canSpin set to false")
      this.canSpin = false

      if (!this.bonusMode) {
        this.desktopButtonsHolder.updateInfoText([window.Lang.default["BOD_LUCK"].str])
      }



      if (!this.IM.Collected) {
        this.IM.Collected = true
        if (this.autoPlayManager == null) {
          if (!this.bonusMode) {
            window.SoundManager.play({ name: "collectSnd", loop: false })
          }

        }

        Globals.Game.send(3, { Color: -1 })
      }
      this.currentBet = Globals.bet
      this.currentCoinVal = Globals.coinValue
      this.gambleMode = false
      Globals.Game.send(2, {
        Lines: Globals.activLine,
        Bet: Globals.bet * Globals.coinValue
      })
    }

    this.updateStatusBar()
  }

  btnPaytableClick() {
    console.log("paytable btn klick")
    if (this.payTable === null) {
      this.payTable = new PayTable()
      this.payTable.init({
        callback_function: this.buttonClicked.bind(this)
      })
      this.payTable.x = 287
      this.payTable.y = 100
      this.addChild(this.payTable)
    } else {
      this.payTable.next()
    }

  }

  resize() {
    if (window.SETTINGS.isMobile) {
      try {
        this.mainSceneHelper.resizeMobile()
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        this.mainSceneHelper.resizeMobile()
      }, 100);

    } else {
      this.mainSceneHelper.resizeDesktop()
    }
  }


}


export default MainSceneV2
