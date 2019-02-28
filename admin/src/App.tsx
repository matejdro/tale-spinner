import {Provider} from "mobx-react";
import React, {Component} from "react";
import "./App.css";
import {AssetsRepository} from "./logic/AssetsRepository";
import {EffectsAudioPlayer} from "./logic/EffectsAudioPlayer";
import {InitiativeController} from "./logic/InitiativeController";
import {MusicAudioPlayer} from "./logic/MusicAudioPlayer";
import {SocketClient} from "./logic/SocketClient";
import {StateCollector} from "./logic/StateCollector";
import {EffectsController} from "./ui/EffectsController";
import {InitiativeCard} from "./ui/InitiativeCard";
import {MusicController} from "./ui/MusicController";

// Disable tslint temporarily
// tslint:disable-next-line
class App extends Component<{}, {}> {
    private assetsRepository: AssetsRepository = new AssetsRepository();
    private musicPlayer: MusicAudioPlayer = new MusicAudioPlayer(this.assetsRepository);
    private effectsPlayer: EffectsAudioPlayer = new EffectsAudioPlayer(this.assetsRepository);

    private initiativeController: InitiativeController = new InitiativeController();

    private stateCollector = new StateCollector(this.musicPlayer, this.effectsPlayer, this.initiativeController);
    private socketClient = new SocketClient(this.stateCollector);

    constructor(props: Readonly<{}>) {
        super(props);

        this.socketClient.onMusicEnded = this.musicPlayer.onPlaybackFinished;
        this.socketClient.onEffectEnded = this.effectsPlayer.onPlaybackFinished;
    }

    public render() {
        return (
            <>
                <Provider
                    musicPlayer={this.musicPlayer}
                    assetsRepository={this.assetsRepository}
                    initiativeController={this.initiativeController}
                    effectsPlayer={this.effectsPlayer}
                >
                    <>
                        <div className="center-hozirontal horizontal-flex">
                            <MusicController className="mb-20 mr-10"/>
                            <EffectsController className="mb-20"/>
                        </div>
                        <InitiativeCard/>

                    </>
                </Provider>

            </>
        );
    }
}

export default App;
