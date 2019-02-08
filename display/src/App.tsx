import React, {Component} from "react";
import io from "socket.io-client";
import {DisplayState} from "../../common/src/DisplayState";
import "./App.css";
import AudioCoordinator from "./AudioCoordinator";
import {serverRequest} from "./ServerConnection";

class App extends Component<{}, DisplayState> {
    private socket: SocketIOClient.Socket;

    constructor(props: Readonly<any>) {
        super(props);

        this.onEffectEnded = this.onEffectEnded.bind(this);
        this.onMusicEnded = this.onMusicEnded.bind(this);

        this.state = {
            audio: {},
        };

        this.socket = io(serverRequest(""));

        this.socket.on("broadcast-state", (state: DisplayState) => {
            this.setState(state);
        });
    }

    public render() {
        return (
            <div className="App">
                <AudioCoordinator
                    musicEndCallback={this.onMusicEnded}
                    effectEndCallback={this.onEffectEnded}
                    {...this.state.audio}
                /> <br/>
            </div>
        );
    }

    private onEffectEnded(): void {
        this.socket.emit("onEffectEnded");
    }

    private onMusicEnded(): void {
        this.socket.emit("onMusicEnded");
    }
}

export default App;
