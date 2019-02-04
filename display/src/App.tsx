import React, {Component} from 'react';
import './App.css';
import AudioCoordinator, {AudioScene} from "./AudioCoordinator";

class App extends Component<any, AudioScene> {
    constructor(props: Readonly<any>) {
        super(props);

        this.state = {
            music : {
                url: "test_audio/music.mp3",
                paused: false
            },
            soundEffect : {
                url : "test_audio/wilhelm.wav",
                paused: false
            }
        }
    }

    render() {
        return (
            <div className="App">
                <AudioCoordinator {...this.state} />
            </div>
        );
    }
}

export default App;
