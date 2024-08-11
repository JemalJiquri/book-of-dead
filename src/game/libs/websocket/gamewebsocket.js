

export class GameWebsocket {
    msg_buffer = "";
    static END_MESSAGE = 'øø';
    static END_MESSAGE_SEND = "\uc3b8\uc3b8";
    static DISCONNECTED = 'DISCONNECTED'
    static CONNECTED = 'CONNECTED'
    GAME = null;
    websocket = null;
    debug = true
    interfaceReq = [
        { name: "WEBSOCKET_URL", type: "string", fatal: true },
        { name: "messageReaded", type: "function", fatal: true },
        { name: "statusChanged", type: "function", fatal: true }
    ];

    init(_game) {
        this.GAME = _game;

        if (this.GAME === null) {
            throw new Error("Game Object is null");
        }

        this.interfaceReq.forEach(item => {
            if (typeof this.GAME[item.name] !== item.type) {
                if (item.fatal) {
                    throw new Error("Game." + item.name + " is not defined");
                } else {
                    console.log(
                        "Game." +
                        item.name +
                        " is not defined, you will not receive this event"
                    );
                }
            }
        });

        return this;
    }

    connect() {
        if(this.debug)console.log("Start websocket to " + this.GAME.WEBSOCKET_URL);
        try {
            var _this = this;
            this.websocket = new WebSocket(this.GAME.WEBSOCKET_URL);
            this.websocket.binaryType = "arraybuffer";
            this.websocket.onerror = function (evt) {
                _this.onerror(evt);
            };
            this.websocket.onopen = function (evt) {
                _this.onopen(evt);
            };
            this.websocket.onmessage = function (evt) {
                _this.onmessage(evt);
            };
            this.websocket.onclose = function (evt) {
                _this.onerror(evt);
            };
        } catch (err) {
            console.log(err);
        }
        return this;
    }

    send(msg) {
        if(this.debug)console.log("Send > " + msg);
        if (this.websocket.readyState === WebSocket.OPEN) {
            var messageTosend = msg
            var bytearray = new Uint8Array(messageTosend.length+4);
            for (var i = 0; i < messageTosend.length; ++i) {
                bytearray[i] = messageTosend.charCodeAt(i);
            }
            bytearray[messageTosend.length] = 0xc3
            bytearray[messageTosend.length+1] = 0xb8
            bytearray[messageTosend.length+2] = 0xc3
            bytearray[messageTosend.length+3] = 0xb8
            this.websocket.send(bytearray.buffer);

            //this.websocket.send(msg + GameWebsocket.END_MESSAGE);
        }
    }


    onerror(evt) {
        this.GAME.statusChanged(GameWebsocket.DISCONNECTED);
        console.log("onerror ", evt);
    }

    disconnect() {
        this.GAME.statusChanged(GameWebsocket.DISCONNECTED);

        this.websocket.onerror = null;
        this.websocket.onopen = null;
        this.websocket.onmessage = null;
        this.websocket.onclose = null;
        this.msg_buffer = "";
        this.websocket.close();
    }

    onopen(evt) {
        if(this.debug)console.log("onopen ");
        this.GAME.statusChanged(GameWebsocket.CONNECTED);
    }

    async onmessage(evt) {
        var msg = new TextDecoder("UTF-8").decode(evt.data)
        this.msg_buffer += msg;
        if (this.msg_buffer.indexOf(GameWebsocket.END_MESSAGE) !== -1) {
            var splited = this.msg_buffer.split(GameWebsocket.END_MESSAGE);
            splited.forEach(item => {
                
                if (item.length > 0) {
                    try {
                        if(this.debug)console.log("Recv < " + item);
                        this.GAME.messageReaded(JSON.parse(item));
                    } catch (error) {
                        console.dir(error)
                    }
                    
                }
            });

            this.msg_buffer = splited[splited.length - 1];
        }
    }
}

export default GameWebsocket;
