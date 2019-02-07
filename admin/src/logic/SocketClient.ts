import io from "socket.io-client";
import {serverRequest} from "./ServerConnection";
import {StateCollector} from "./StateCollector";

export class SocketClient {
    private stateCollector: StateCollector;
    private socket: SocketIOClient.Socket;

    constructor(stateCollector: StateCollector) {
        this.stateCollector = stateCollector;
        this.socket = io(serverRequest(""));
    }
}
