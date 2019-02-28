import {Provider} from "mobx-react";
import React, {Component} from "react";
import "./App.css";
import {AssetsRepository} from "./logic/AssetsRepository";
import {InitiativeController} from "./logic/InitiativeController";
import {MusicAudioPlayer} from "./logic/MusicAudioPlayer";
import {SocketClient} from "./logic/SocketClient";
import {StateCollector} from "./logic/StateCollector";
import {InitiativeCard} from "./ui/InitiativeCard";
import {MusicController} from "./ui/MusicController";

// Disable tslint temporarily
// tslint:disable-next-line
class App extends Component<{}, {}> {
    private audioRepository: AssetsRepository = new AssetsRepository();
    private musicPlayer: MusicAudioPlayer = new MusicAudioPlayer(this.audioRepository);

    private initiativeController: InitiativeController = new InitiativeController();

    private stateCollector = new StateCollector(this.musicPlayer, this.initiativeController);
    private socketClient = new SocketClient(this.stateCollector);

    constructor(props: Readonly<{}>) {
        super(props);

        this.socketClient.onMusicEnded = this.musicPlayer.onPlaybackFinished;
    }

    public render() {
        return (
            <>
                <Provider
                    musicPlayer={this.musicPlayer}
                    audioRepository={this.audioRepository}
                    initiativeController={this.initiativeController}
                >
                    <>
                        <MusicController className="mb-20"/>
                        <InitiativeCard/>

                    </>
                </Provider>

            </>
        );
    }
}

export default App;
