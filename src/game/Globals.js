class Globals {
    static width = 1821
    static height = 1024

    static minWidth = 1300


    static windowWidth = 1821
    static windowHeight = 1024

    static isTest = false
    static backgroundColor = 0x000
    static session = {
        splashScreen: true,
        sound: true,
        fast: false,
        space: false,
        left: false
    }



    static LoaderConfig = {
        preload: [
            ["playngologo", "playngologo.png"],
            ["prel2", "preloader/prel2.png"],
            ["prel3", "preloader/prel3.png"],
            ["prel4", "preloader/prel4.png"],
            ["prel5", "preloader/prel5.png"],

        ],
        load: [
            ["maingamebg", "maingamebg.jpg"],
            ["mobilebg", "mobilebg.jpg"],
            ["mobilereelsbg", "mobilereelsbg.png"],
            ["splashbg", "splash/splashbg.jpg"],
            ["splash1", "splash/splash1.png"],
            ["splash2", "splash/splash2.png"],
            ["splash3", "splash/splash3.png"],
            ["splash4", "splash/splash4.png"],
            ["splashbtn", "splash/splashbtn.png"],
            ["splashcb", "splash/splashcb.png"],
            ["splashcb2", "splash/splashcb2.png"],

            ["error", "error.png"],
            ["closing", "closing.png"],
            ["logo", "logo.png"],
            ["paytable", "paytable/paytable.json"],
            ["menuppaytabletext", "mobile/menupaytabletextland.png"],
            ["menuprulettext", "mobile/menuprulettext.png"],
            ["double", "double/double.json"],
            ["mainbutton", "btn/mainbutton.json"],
            ["mainbutton2", "btn/mainbutton2.json"],
            ["startSpinButton", "btn/startSpinButton.png"],
            ["snallButton", "btn/snallButton.png"],
            ["snallButtonPressed", "btn/snallButtonPressed.png"],
            ["minus_btn", "btn/minus_btn.png"],
            ["plus_btn", "btn/plus_btn.png"],
            ["credit_btn", "btn/credit_btn.png"],
            ["coinctextbar", "btn/coinctextbar.png"],
            ["infoBar", "btn/infoBar.png"],
            ["betBaner", "btn/betBaner.png"],
            ["allIcons_feature", "atl/allIcons_feature.json"],
            ["allIcons", "atl/allIcons.json"],
            ["gradient", "bmp/gradient.png"],
            ["gradientbook", "bmp/gradientbook.png"],
            ["gradientyelowbig", "bmp/gradientyelowbig.png"],
            ["gradientyelowbigpart", "bmp/gradientyelowbigpart.png"],
            ["gradientyelow", "bmp/gradientyelow.png"],
            ["gradientbig", "bmp/gradientbig.png"],
            ["icon0_animFr", "bmp/icon0_animFr.png"],
            ["icon1_animFr", "bmp/icon1_animFr.png"],
            ["icon2_animFr", "bmp/icon2_animFr.png"],
            ["icon3_animFr", "bmp/icon3_animFr.png"],
            ["icon4_animFr", "bmp/icon4_animFr.png"],
            ["freeTxtBg", "bmp/freeTxtBg.png"],
            ["animation_part1", "bmp/animation_part1.png"],
            ["animation_part2", "bmp/animation_part2.png"],
            ["blick", "bmp/blick.png"],
            ["blicka", "bmp/blicka.png"],
            ["BigWinFont", "fonts/BigWinFont.xml"],
            ["bonus_book_anim", "bonus/bonus_book_anim.json"],
            ["bonusbird", "bmp/bonusbird.png"],
            ["etrat_B", "bmp/etrat_B.png"],
            ["etrat_L", "bmp/etrat_L.png"],
            ["etrat_R", "bmp/etrat_R.png"],
            ["coinsAnim", "atl/coinsAnim.json"],

            ["autoplaybg", "autoplay/autoplaybg.png"],
            ["autoplayswitchbggrey", "autoplay/autoplayswitchbggrey.png"],
            ["autoplayswitchfggrey", "autoplay/autoplayswitchfggrey.png"],
            ["autoplayswitchbgyellow", "autoplay/autoplayswitchbgyellow.png"],
            ["autoplayswitchfgyellow", "autoplay/autoplayswitchfgyellow.png"],
            ["autoplaydrag", "autoplay/autoplaydrag.png"],
            ["autoplaydragline", "autoplay/autoplaydragline.png"],
            ["autoplaydragliney", "autoplay/autoplaydragliney.png"],
            ["autogreenbtn", "autoplay/autogreenbtn.png"],
            ["autoredbtn", "autoplay/autoredbtn.png"],
            ["autoSpinButton", "autoplay/autoSpinButton.png"],
            ["autoplaybgsmall", "autoplay/autoplaybgsmall.png"],

            ["statusbar", "statusbar.json"],


            ["counterarrowdown", "settings/counterarrowdown.png"],
            ["counterarrowup", "settings/counterarrowup.png"],
            ["counterbg", "settings/counterbg.png"],

            ["menufast", "mobile/menufast.png"],
            ["menuhand", "mobile/menuhand.png"],
            ["menusound", "mobile/menusound.png"],

            ["mobilebutton", "mobile/mobilebutton.png"],
            ["mobilemenubtn", "mobile/mobilemenubtn.png"],
            ["mobilebackbtn", "mobile/mobilebackbtn.png"],
            ["spinmobile", "mobile/spinmobile.png"],
            ["spinmobileauto", "mobile/spinmobileauto.png"],
            ["startauto", "mobile/startauto.png"],
            ["mobilehome", "mobile/mobilehome.png"],

            ["freebtnbg", "freespins/freebtnbg.png"],
            ["freebtn", "freespins/freebtn.png"],
            ["activatebtn", "freespins/activatebtn.png"],
            ["freebtnhover", "freespins/freebtnhover.png"],
            ["activatebtnhover", "freespins/activatebtnhover.png"],
            ["freeFreeSpins", "freespins/freeFreeSpins.png"],
            ["all_sounds2", "audio/all.snds"]
        ],
        //background1
        postload: [
            //["all_sounds", "audio/all_sounds.mp3"]
            /*["background1", "audio/background1.mp3"],
            ["background2", "audio/background2.mp3"],
            ["btnclick", "audio/btnclick.mp3"],
            ["fx_chime", "audio/fx_chime.mp3"],
            ["gamblesuspense", "audio/gamblesuspense.mp3"],
            ["loseDouble", "audio/loseDouble.mp3"],
            ["gamblewin", "audio/gamblewin.mp3"],
            ["gambleCollect", "audio/gambleCollect.mp3"],
            ["reelrun", "audio/reelrun.mp3"],
            ["reelsilent", "audio/reelsilent.mp3"],
            ["reelstop", "audio/reelstop.mp3"],
            ["reelWaitSnd", "audio/reelWaitSnd.mp3"],
            ["teaser_1", "audio/teaser_1.mp3"],
            ["teaser_2", "audio/teaser_2.mp3"],
            ["teaser_3", "audio/teaser_3.mp3"],
            ["teaser_4", "audio/teaser_4.mp3"],
            ["teaser_5", "audio/teaser_5.mp3"],

            ["fsSelectSymbol1Snd", "audio/fsSelectSymbol1Snd.mp3"],
            ["fsSelectSymbol2Snd", "audio/fsSelectSymbol2Snd.mp3"],
            ["fsSelectSymbol3Snd", "audio/fsSelectSymbol3Snd.mp3"],
            ["fsSelectSymbol4Snd", "audio/fsSelectSymbol4Snd.mp3"],
            ["fsSelectSymbol5Snd", "audio/fsSelectSymbol5Snd.mp3"],
            ["fsSelectSymbolFinalSnd", "audio/fsSelectSymbolFinalSnd.mp3"],
            ["fsSummarySnd", "audio/fsSummarySnd.mp3"],
            ["fsIntroAnimationSnd", "audio/fsIntroAnimationSnd.mp3"],
            ["counter", "audio/counter.mp3"],
            ["win1Snd", "audio/win1Snd.mp3"],
            ["win2Snd", "audio/win2Snd.mp3"],
            ["win3Snd", "audio/win3Snd.mp3"],
            ["win4Snd", "audio/win4Snd.mp3"],
            ["win5Snd", "audio/win5Snd.mp3"],
            ["win6Snd", "audio/win6Snd.mp3"],
            ["win7Snd", "audio/win7Snd.mp3"],
            ["win8Snd", "audio/win8Snd.mp3"],
            ["win9Snd", "audio/win9Snd.mp3"],
            ["win10Snd", "audio/win10Snd.mp3"],
            ["win11Snd", "audio/win11Snd.mp3"],
            ["wincountstop", "audio/wincountstop.mp3"],
            ["collectSnd", "audio/collectSnd.mp3"],
            ["transformSymbol", "audio/transformSymbol.mp3"],
            ["gambleWait", "audio/gambleWait.mp3"],
            ["ambienceStem1", "audio/ambienceStem1.mp3"],
            ["ambienceStem2", "audio/ambienceStem2.mp3"],*/
        ],
        sounds: {
            "urls": [
                "all_sounds.ogg",
                "all_sounds.m4a",
                "all_sounds.mp3",
                "all_sounds.ac3"
            ],
            "sprite": {
                "background1": [
                    0,
                    66552.9931972789
                ],
                "background2": [
                    68000,
                    17084.081632653066
                ],
                "btnclick": [
                    87000,
                    940.4081632653032
                ],
                "collectSnd": [
                    89000,
                    4963.265306122452
                ],
                "counter": [
                    95000,
                    208.9795918367372
                ],
                "expandingLine10": [
                    97000,
                    2637.006802721089
                ],
                "expandingLine1": [
                    101000,
                    2671.995464852614
                ],
                "expandingLine2": [
                    105000,
                    2545.986394557829
                ],
                "expandingLine3": [
                    109000,
                    2629.9999999999955
                ],
                "expandingLine4": [
                    113000,
                    2603.0158730158773
                ],
                "expandingLine5": [
                    117000,
                    2613.310657596372
                ],
                "expandingLine6": [
                    121000,
                    2640.0000000000005
                ],
                "expandingLine7": [
                    125000,
                    2568.004535147395
                ],
                "expandingLine8": [
                    129000,
                    2677.006802721081
                ],
                "expandingLine9": [
                    133000,
                    2504.9886621315236
                ],
                "freespinIntro": [
                    137000,
                    6250
                ],
                "freespinRetrigger": [
                    145000,
                    4581.995464852611
                ],
                "freespinSummary": [
                    151000,
                    6342.993197278901
                ],
                "fsIntroAnimationSnd": [
                    159000,
                    8698.775510204086
                ],
                "fsSelectSymbol1Snd": [
                    169000,
                    2533.877551020396
                ],
                "fsSelectSymbol2Snd": [
                    173000,
                    2194.285714285712
                ],
                "fsSelectSymbol3Snd": [
                    177000,
                    2168.1632653061342
                ],
                "fsSelectSymbol4Snd": [
                    181000,
                    2481.6326530612114
                ],
                "fsSelectSymbol5Snd": [
                    185000,
                    2194.285714285712
                ],
                "fsSelectSymbolFinalSnd": [
                    189000,
                    3970.61224489795
                ],
                "fsSummarySnd": [
                    194000,
                    6426.122448979584
                ],
                "fx_chime": [
                    202000,
                    261.2244897959215
                ],
                "gambleCollect": [
                    204000,
                    4885.963718820875
                ],
                "gamblesuspense": [
                    210000,
                    5302.857142857136
                ],
                "gambleWait": [
                    217000,
                    5042.6984126984
                ],
                "gamblewin": [
                    224000,
                    4911.020408163267
                ],
                "loseDouble": [
                    230000,
                    6478.367346938768
                ],
                "reelrun": [
                    238000,
                    444.08163265305234
                ],
                "reelsilent": [
                    240000,
                    914.285714285711
                ],
                "reelstop": [
                    242000,
                    522.448979591843
                ],
                "reelWaitSnd": [
                    244000,
                    9691.42857142856
                ],
                "teaser_1": [
                    255000,
                    3134.693877551001
                ],
                "teaser_2": [
                    260000,
                    3813.8775510204255
                ],
                "teaser_3": [
                    265000,
                    4440.8163265306375
                ],
                "teaser_4": [
                    271000,
                    4414.693877551031
                ],
                "teaser_5": [
                    277000,
                    4414.693877551031
                ],
                "transformSymbol": [
                    283000,
                    1344.0136054421714
                ],
                "win10Snd": [
                    286000,
                    7303.990929705207
                ],
                "win11Snd": [
                    295000,
                    12036.009070294767
                ],
                "win1Snd": [
                    309000,
                    5822.993197278891
                ],
                "win2Snd": [
                    316000,
                    5711.9954648526345
                ],
                "win3Snd": [
                    323000,
                    6279.002267573674
                ],
                "win4Snd": [
                    331000,
                    6765.011337868486
                ],
                "win5Snd": [
                    339000,
                    6793.990929705216
                ],
                "win6Snd": [
                    347000,
                    6898.004535147379
                ],
                "win7Snd": [
                    355000,
                    6969.002267573671
                ],
                "win8Snd": [
                    363000,
                    8201.995464852587
                ],
                "win9Snd": [
                    373000,
                    8488.004535147411
                ],
                "wincountstop": [
                    383000,
                    5903.673469387741
                ]
            }
        }
    }

    static globalSound = null
    static PixiApp = null;
    static Game = null
    static WS = null
    //debug
    static debugGraphics = null
    static debugElements = []
    static buffers = []
    //total bet
    static activLine = 10
    static linesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    static bet = 1
    static betArr = [1, 2, 3, 4, 5]
    static coinValue = 1
    static coinValueArr = [1, 2, 3, 4, 5]
    static totalBet = this.bet * this.coinValue * this.activLine
    static balansCoinsValue = 12000
    static currency = "$"
    static currencyName = "USD"
    static menu = true

    static saveSession() {
        if (Globals.isLocalStorageAvailable()) {
            localStorage.setItem('bodsession', JSON.stringify(Globals.session));
        }
    }

    static getSession() {
        if (Globals.isLocalStorageAvailable()) {
            if (localStorage.getItem('bodsession') != null) {
                Globals.session = JSON.parse(localStorage.getItem('bodsession'))
            }
            console.log(Globals.session)
            if (!('sound' in Globals.session)) {
                Globals.session.sound = true
            }

            if (!('fast' in Globals.session)) {
                Globals.session.fast = false
            }

            if (!('left' in Globals.session)) {
                Globals.session.left = false
            }

            if (!('space' in Globals.session)) {
                Globals.session.space = true
            }
        }
        return Globals.session
    }


    static isLocalStorageAvailable() {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

}


export default Globals;

