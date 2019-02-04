import React, {Component} from 'react';
import './App.css';
import AudioCoordinator, {AudioScene} from "./AudioCoordinator";

class App extends Component<any, AudioScene> {
    constructor(props: Readonly<any>) {
        super(props);

        this.state = {
            music: {
                url: "test_audio/music.mp3",
                paused: false,
                finishListener: () => this.onMusicEnded()
            }
        }
    }

    render() {
        return (
            <div className="App">
                <AudioCoordinator {...this.state} /> <br/>

                <button onClick={() => this.toggleMusicPause()}>Pause/Resume music</button>
                <br/>
                <br/>
                <button onClick={() => this.playEffect()}>Scream!</button>
                <br/>
                <button onClick={() => this.toggleEffectPause()}>Pause/Resume scream</button>
            </div>
        );
    }

    private onEffectEnded(): void {
        this.setState(
            Object.assign({}, this.state, {soundEffect: undefined})
        );
    }

    private onMusicEnded(): void {
    }

    private playEffect() {
        this.setState(
            Object.assign({}, this.state, {
                soundEffect: {
                    url: "test_audio/wilhelm.wav",
                    paused: false,
                    finishListener: () => this.onEffectEnded()
                }
            })
        );
    }

    private toggleMusicPause() {
        let music = this.state.music;

        this.setState(
            Object.assign({}, this.state, {
                music: Object.assign({}, music, {paused: !music.paused})
            })
        );
    }

    private toggleEffectPause() {
        let effect = this.state.soundEffect;
        if (effect === undefined) {
            return;
        }


        this.setState(
            Object.assign({}, this.state, {
                soundEffect: Object.assign({}, effect, {paused: !effect.paused})
            })
        );
    }
}

export default App;
