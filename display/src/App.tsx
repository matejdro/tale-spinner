import React, {Component} from 'react';
import './App.css';
import AudioCoordinator from "./AudioCoordinator";
import {AudioState} from "../../common/AudioState";

class App extends Component<any, AudioScene> {
    constructor(props: Readonly<any>) {
        super(props);

        this.onEffectEnded = this.onEffectEnded.bind(this);
        this.onMusicEnded = this.onMusicEnded.bind(this);
        this.playEffect = this.playEffect.bind(this);
        this.toggleMusicPause = this.toggleMusicPause.bind(this);
        this.toggleEffectPause = this.toggleEffectPause.bind(this);

        this.state = {
            music: {
                url: "test_audio/music.mp3",
                paused: false
            }
        }
    }

    render() {
        return (
            <div className="App">
                <AudioCoordinator
                    musicEndCallback={this.onMusicEnded}
                    effectEndCallback={this.onEffectEnded}
                    {...this.state} /> <br/>

                <button onClick={this.toggleMusicPause}>Pause/Resume music</button>
                <br/>
                <br/>
                <button onClick={this.playEffect}>Scream!</button>
                <br/>
                <button onClick={this.toggleEffectPause}>Pause/Resume scream</button>
            </div>
        );
    }

    private onEffectEnded(): void {
        this.setState({
                ...this.state,
                soundEffect: undefined
            }
        );
    }

    private onMusicEnded(): void {
    }

    private playEffect() {
        this.setState({
                ...this.state,
                soundEffect: {
                    ...this.state.music,
                    url: "test_audio/wilhelm.wav",
                    paused: false
                }
            }
        );
    }

    private toggleMusicPause() {
        let music = this.state.music;

        this.setState({
                ...this.state,
                music: {
                    ...music,
                    paused: !music.paused
                }
            }
        );
    }

    private toggleEffectPause() {
        let effect = this.state.soundEffect;
        if (effect === undefined) {
            return;
        }


        this.setState({
                ...this.state,
                soundEffect: {
                    ...effect,
                    paused: !effect.paused
                }
            }
        );
    }
}

export interface AudioScene {
    music: AudioState,
    soundEffect?: AudioState
}

export default App;
