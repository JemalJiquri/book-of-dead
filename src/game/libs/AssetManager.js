import * as PIXI from 'pixi.js'


class AssetManager {
    loader = null
    loaderConfig = null
    parent = null
    state = 'preload'


    load(_loaderConfig, _parent) {
        console.log("AssetManager load");


        this.loaderConfig = _loaderConfig
        this.parent = _parent

        this.loader = PIXI.Loader.shared;
        if (this.loaderConfig.preload.length > 0) {
            for (let index = 0; index < this.loaderConfig.preload.length; index++) {
                this.loader.add(this.loaderConfig.preload[index][0], window.SETTINGS.AssetFolder + this.loaderConfig.preload[index][1]);
            }
        } else {
            this.onComplete()
        }
        this.loader.onProgress.add(this.onProgress.bind(this));
        this.loader.onError.add(this.onError.bind(this));
        this.loader.onComplete.add(this.onComplete.bind(this));
        this.loader.load();

        //onProgress onPreLoad  onLoad  onPostLoad onError
    }

    onProgress(e) {
        if (this.parent) {
            this.parent.onProgress(e.progress);
        }
    }

    onError(e) {
        console.log("onError " + e.message);
        if (this.parent) {
            this.parent.onError(e);
        }
    }

    onComplete(e) {

        var nextArray = []
        if (this.state === 'preload') {
            if (this.parent) {
                this.parent.onPreLoad();
            }
            this.state = 'load'
            nextArray = this.loaderConfig.load
        }else if (this.state === 'load') {
            if (this.parent) {
                this.parent.onLoad();
            }
            this.state = 'postload'
            nextArray = this.loaderConfig.postload
        }else if (this.state === 'postload') {
            if (this.parent) {
                this.parent.onPostLoad();
            }
        }
        
        
        if (nextArray.length > 0) {
            for (let index = 0; index < nextArray.length; index++) {
                this.loader.add(nextArray[index][0], window.SETTINGS.AssetFolder + nextArray[index][1]);
            }
            this.loader.load();
        }



    }

}

export default AssetManager
