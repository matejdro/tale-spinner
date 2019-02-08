import {autorun} from "mobx";
import io from "socket.io-client";
import {debounce} from "ts-debounce";
import {DisplayState} from "../../../common/src/DisplayState";
import {serverRequest} from "./ServerConnection";
import {StateCollector} from "./StateCollector";

export class SocketClient {
    public onMusicEnded?: () => void;
    public onEffectEnded?: () => void;

    private stateCollector: StateCollector;
    private socket: SocketIOClient.Socket;

    constructor(stateCollector: StateCollector) {
        this.stateCollector = stateCollector;
        this.socket = io(serverRequest(""));

        this.transmitState = debounce(this.transmitState, 250);

        autorun(() => {
            const state = this.stateCollector.displayState;
            this.transmitState(state);
        });

        this.socket.on("onEffectEnded", () => {
            if (this.onEffectEnded) {
                this.onEffectEnded();
            }
        });

        this.socket.on("onMusicEnded", () => {
            if (this.onMusicEnded) {
                this.onMusicEnded();
            }
        });
    }

    private transmitState(state: DisplayState): void {
        this.socket.emit("broadcast-state", state);
    }
}
