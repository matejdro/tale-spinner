import React, {Component} from 'react';
import './App.css';
import {AudioPlayer} from "./AudioPlayer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <AudioPlayer url="test_audio/music.mp3" paused={false} />
            </div>
        );
    }
}

export default App;
