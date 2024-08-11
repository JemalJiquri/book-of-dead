import React from 'react';
import AssetManager from './libs/AssetManager'
import SoundManager from './sounds/SoundManager'
import * as PIXI from 'pixi.js'
import Globals from './Globals'
import Preloader from './Preloader'
import TWEEN from '@tweenjs/tween.js';
import { isMobile } from 'react-device-detect';
import GameWebsocket from "./libs/websocket/gamewebsocket"
import MainSceneV2 from './MainSceneV2';
import SplashScreen from './SplashScreen';
import HelpPage from './HelpPage';

import * as Playngo_URL_Lang from '../ui/en.json'
import * as Rheel_Lang from './libs/reels/bookofdead/en.json'
import * as Lang from './en.json'
import ErrorPopup from './ErrorPopup';
//src/libs/rheels/src/bookofdead/en.json
import { Howl } from 'howler';


function animate(time) {
  requestAnimationFrame(animate)
  TWEEN.update(time)
}
requestAnimationFrame(animate)

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  console.dir(errorMsg)
  return false;
}



class Game extends React.Component {
  preloader = null
  eventKey = null
  stateKey = null
  mainScene = null
  bgOriginSize = null

  ws = null
  WEBSOCKET_URL = null
  state = {
    helpVisible: false
  }

  //https://demo-x.betsense.ge/games/btg/extrachilli/resourses/atlass/Animations5.json
  //git submodule foreach git pull origin main
  componentDidMount() {
    console.log('App componentDidMount')
    //http://demo-x.betsense.ge http://localhost
    if (window.location.href != null) {
      if (window.location.href.indexOf("demo-x.betsense.ge") > 0 || window.location.href.indexOf("localhost") > 0) {
        //window.SETTINGS.PORT = 8443
        console.log("window.SETTINGS.PORT ", window.SETTINGS.PORT)
      }
    }

    //Rheel_Lang
    var lang = {}
    lang = Object.assign(lang, Playngo_URL_Lang.default)
    lang = Object.assign(lang, Lang.default)
    lang = Object.assign(lang, Rheel_Lang.default)

    window.Lang = { default: lang }
    console.dir(window.Lang)


    window.SETTINGS.isMobile = isMobile

    window.SETTINGS.Currency = 'FUN'
    window.SETTINGS.Balance = 1000
    window.SETTINGS.Feature = {}
    // window.SETTINGS.CurrencyBets = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

    Globals.Game = this;
    window.SoundManager = new SoundManager()
    if (window.SETTINGS.ASSETPATH.length > 0) {
      window.SETTINGS.AssetFolder = window.SETTINGS.ASSETPATH + "/" + window.SETTINGS.GAME + "/assets/"
    } else {
      window.SETTINGS.AssetFolder = "assets/"
    }

    console.dir(window.SETTINGS)
    this.WEBSOCKET_URL = "wss://" + window.SETTINGS.IP + ":" + window.SETTINGS.PORT
    var _stateKey, keys = {
      hidden: "visibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      msHidden: "msvisibilitychange"
    };
    for (_stateKey in keys) {
      if (_stateKey in document) {
        this.eventKey = keys[_stateKey];
        this.stateKey = _stateKey
        break;
      }
    }
    if (this.eventKey) {
      console.dir('eventKey ' + this.eventKey + " " + this.stateKey)
      document.addEventListener(this.eventKey, this.visiblityChanged.bind(this));
    }



    //Globals.width Globals.height
    Globals.PixiApp = new PIXI.Application(
      {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: Globals.backgroundColor,
        antialias: true,
        autoDensity: true,
        preserveDrawingBuffer: true,
        transparent: false,
        //resizeTo:window,
        resolution: window.devicePixelRatio
      }
    );

    window.PixiApp = Globals.PixiApp

    window.InteractionManager = new PIXI.InteractionManager(Globals.PixiApp.renderer)


    let urls = []
    for (let i = 0; i < Globals.LoaderConfig.sounds.urls.length; i++) {
      const element = Globals.LoaderConfig.sounds.urls[i];
      urls.push(window.SETTINGS.AssetFolder + "audio/" + element)
    }
    console.log(urls)
    Globals.globalSound = new Howl({
      src: urls,
      sprite: Globals.LoaderConfig.sounds.sprite,
      autoplay: false,
      loop: false,
      volume: 0.5,
    });


    

    var a = new AssetManager()
    a.load(Globals.LoaderConfig, this)
    //window.SETTINGS.AssetFolder + "audio/all.snds" 

    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.style.background = "black";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.getElementById("maingame").appendChild(Globals.PixiApp.view);
    this.updateSize()
    window.addEventListener('resize', this.updateSize.bind(this));
  }



  updateSize() {
    setTimeout(() => {
      this._updateSize()
    }, 100);
  }

  _updateSize() {
    Globals.PixiApp.view.style.width = window.innerWidth + 'px';
    Globals.PixiApp.view.style.height = window.innerHeight + 'px';

    Globals.PixiApp.view.style.left = "0"
    Globals.PixiApp.view.style.top = "0"
    Globals.PixiApp.view.style.transformOrigin = "0px 0px"

    Globals.PixiApp.renderer.resize(window.innerWidth, window.innerHeight);
    //Globals.PixiApp.renderer.view.addEventListener("webglcontextrestored", (t) => this.onContextRestored(t))
    console.log(window.innerWidth + " " + window.innerHeight)
    Globals.windowWidth = window.innerWidth
    Globals.windowHeight = window.innerHeight
    if (this.preloader) {
      this.preloader.resize()
    }
    if (this.mainScene) {
      this.mainScene.resize();
    }
    if (this.splashScreen) {
      this.splashScreen.resize();
    }
    Globals.PixiApp.renderer.render(Globals.PixiApp.stage)
  }

  oldSndState = false
  visiblityChanged() {
    if (!document[this.stateKey]) {
      console.log('visible')
      Globals.session.sound = this.oldSndState
      if (Globals.session.sound) {
        window.SoundManager.unMute()
        if (this.mainScene) {
          this.mainScene.playBGSound()
        }
      }
    } else {
      this.oldSndState = Globals.session.sound
      window.SoundManager.mute()
      console.log('hidden')
    }

  }

  onError(error) {
    console.log('App onError ' + error)
  }

  onProgress(progress) {
    if (this.preloader) {
      this.preloader.setProgress(progress)
    }
  }

  onPreLoad() {


    this.preloader = new Preloader()
    this.preloader.init()
    Globals.PixiApp.stage.addChild(this.preloader);


  }

  onLoad() {
    //window.SETTINGS.AssetFolder

    this.ws = new GameWebsocket()
    this.ws.init(this);
    this.ws.connect()
  }

  convertURIToBinary(dataURI) {
    let BASE64_MARKER = ';base64,';
    let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64 = dataURI.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let arr = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      arr[i] = raw.charCodeAt(i);
    }
    return new Blob([arr], { type: 'audio/mp3' });
  }

  send(mt, im) {
    var message = {
      UID: parseInt(window.SETTINGS.UID),
      SID: window.SETTINGS.SID,
      MT: mt,
      SLOTID: window.SETTINGS.SLOTID,
      rnd: 100000000 + parseInt(Math.random() * 100000000)
    }
    if (im != null) {
      message.IM = im
    }


    this.ws.send(JSON.stringify(message))
  }



  messageReaded(msg) {
    switch (msg.MT) {
      case 1:

        Globals.linesArr = msg.IM.Lines.LinesCountConfig
        Globals.balansCoinsValue = msg.IM.Chips
        Globals.coinValueArr = msg.IM.CurrencyBets
        Globals.coinValue = Globals.coinValueArr[0]
        for (let i = 0; i < msg.IM.Currencies.length; i++) {
          const element = msg.IM.Currencies[i];
          if (element.order === msg.IM.CurrencyID) {
            Globals.currency = element.symbol
            Globals.currencyName = element.name

          }

        }

        if (this.preloader) {
          Globals.PixiApp.stage.removeChild(this.preloader);
          this.preloader = null
        }
        this.mainScene = new MainSceneV2()
        this.mainScene.init()


        if (Globals.getSession().splashScreen) {
          this.splashScreen = new SplashScreen()
          this.splashScreen.init(this)
          Globals.PixiApp.stage.addChild(this.splashScreen);
        } else {
          Globals.PixiApp.stage.addChild(this.mainScene);
        }
        //this.statusChanged(GameWebsocket.DISCONNECTED)
        break;

      default:
        break;
    }

    if (this.mainScene) {
      this.mainScene.messageReaded(msg);
    }

  }

  closeSplash() {
    Globals.PixiApp.stage.removeChild(this.splashScreen);
    Globals.PixiApp.stage.addChild(this.mainScene);
  }

  statusChanged(status) {
    console.log("statusChanged " + status);
    if (status === GameWebsocket.CONNECTED) {
      this.send(1, null)

    }
    if (status === GameWebsocket.DISCONNECTED) {
      console.log("DISCONNECTED")
      var ep = new ErrorPopup()
      ep.init({
        w: window.innerWidth,
        h: window.innerHeight,
        code: 1000
      })
      if (this.mainScene) {
        this.mainScene.addChild(ep)
      } else {
        Globals.PixiApp.stage.addChild(ep)
      }

    }

  }




  onPostLoad() {
    console.log('App postLoaded')
  }

  render() {
    return <div id="maingameholder" style={{ padding: 0, margin: 0 }}>
      <div id="maingame" style={{ padding: 0, margin: 0 }}>

      </div>
      <HelpPage helpVisible={this.state.helpVisible} />
    </div>;
  }
}


export default Game;
