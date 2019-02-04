import React, {Component} from "react";
import {AudioScene} from "../../common/src/AudioScene";
import "./App.css";
import AudioCoordinator from "./AudioCoordinator";

class App extends Component<any, AudioScene> {
    constructor(props: Readonly<any>) {
        super(props);

        this.onEffectEnded = this.onEffectEnded.bind(this);
        this.onMusicEnded = this.onMusicEnded.bind(this);
        this.startPlayingScreamEffect = this.startPlayingScreamEffect.bind(this);
        this.toggleMusicPause = this.toggleMusicPause.bind(this);
        this.toggleEffectPause = this.toggleEffectPause.bind(this);

        this.state = {
            music: {
                paused: false,
                url: "test_audio/music.mp3",
                playbackUuid: Math.random().toFixed(10),
            },
        };
    }

    public render() {
        return (
            <div className="App">
                <AudioCoordinator
                    musicEndCallback={this.onMusicEnded}
                    effectEndCallback={this.onEffectEnded}
                    {...this.state}
                /> <br/>

                <button onClick={this.toggleMusicPause}>Pause/Resume music</button>
                <br/>
                <br/>
                <button onClick={this.startPlayingScreamEffect}>Scream!</button>
                <br/>
                <button onClick={this.toggleEffectPause}>Pause/Resume scream</button>
            </div>
        );
    }

    private onEffectEnded(): void {
        this.setState({
                ...this.state,
                soundEffect: undefined,
            },
        );
    }

    private onMusicEnded(): void {
    }

    private startPlayingScreamEffect() {
        this.playEffect("test_audio/wilhelm.wav");
    }

    private toggleMusicPause() {
        const music = this.state.music;

        this.setState({
                ...this.state,
                music: {
                    ...music,
                    paused: !music.paused,
                },
            },
        );
    }

    private toggleEffectPause() {
        const effect = this.state.soundEffect;
        if (effect === undefined) {
            return;
        }

        this.setState({
                ...this.state,
                soundEffect: {
                    ...effect,
                    paused: !effect.paused,
                },
            },
        );
    }

    private playEffect(url: string) {
        this.setState({
                ...this.state,
                soundEffect: {
                    url,
                    paused: false,
                    playbackUuid: Math.random().toFixed(10),
                },
            },
        );
    }
}

export default App;
