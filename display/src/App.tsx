import React, {Component} from "react";
import io from "socket.io-client";
import {DisplayState} from "../../common/src/DisplayState";
import {InitiativeData} from "../../common/src/Initiative";
import "./App.css";
import AudioCoordinator from "./audio/AudioCoordinator";
import {InitiativeTable} from "./initiative/InitiativeTable";
import {serverRequest} from "./ServerConnection";

class App extends Component<{}, DisplayState> {
    private socket: SocketIOClient.Socket;

    private initiative: InitiativeData = {
        selectedIndex: 1,
        entries: [
            {
                name: "Reinhardt",
                initiative: 20,
                friendly: true,
            },
            {
                name: "Ivan",
                initiative: 18,
                friendly: false,
            },
            {
                name: "Popi",
                initiative: 16,
                friendly: false,
            },
            {
                name: "Gwyn",
                initiative: 15,
                friendly: true,
            },
            {
                name: "GR",
                initiative: 14,
                friendly: true,
            },
            {
                name: "Severiss",
                initiative: 14,
                friendly: true,
            },
            {
                name: "Chtulu",
                initiative: 13,
                friendly: false,
            },
        ],
    };

    constructor(props: Readonly<any>) {
        super(props);

        this.onEffectEnded = this.onEffectEnded.bind(this);
        this.onMusicEnded = this.onMusicEnded.bind(this);

        this.socket = io(serverRequest(""));

        this.socket.on("broadcast-state", (state: DisplayState) => {
            this.setState(state);
        });
    }

    public render() {
        return <InitiativeTable {...this.initiative} />;

        if (!this.state) {
            return null;
        }

        return (
            <div className="App">
                <AudioCoordinator
                    musicEndCallback={this.onMusicEnded}
                    effectEndCallback={this.onEffectEnded}
                    {...this.state.audio}
                />

                return <InitiativeTable {...this.initiative} />;
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
