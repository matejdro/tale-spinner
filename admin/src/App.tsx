import {Provider} from "mobx-react";
import React, {Component} from "react";
import "./App.css";
import {AudioRepository} from "./logic/AudioRepository";
import {MusicAudioPlayer} from "./logic/MusicAudioPlayer";
import {StateCollector} from "./logic/StateCollector";
import {MusicController} from "./ui/MusicController";

// Disable tslint temporarily
// tslint:disable-next-line
class App extends Component<{}, {}> {
    private audioRepsitory: AudioRepository = new AudioRepository();
    private musicPlayer: MusicAudioPlayer = new MusicAudioPlayer(this.audioRepsitory);

    private stateCollector = new StateCollector(this.musicPlayer);

    constructor(props: Readonly<{}>) {
        super(props);
    }

    public render() {
        return (
            <>
                <Provider musicPlayer={this.musicPlayer} audioRepository={this.audioRepsitory}>
                    <MusicController/>
                </Provider>
            </>
        );
    }
}

export default App;
