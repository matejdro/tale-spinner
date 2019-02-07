import {Button, Card, H5, Icon, Slider} from "@blueprintjs/core";
import {observable} from "mobx";
import {Provider} from "mobx-react";
import React, {Component} from "react";
import "./App.css";
import {AudioRepository} from "./logic/AudioRepository";
import {MusicAudioPlayer} from "./logic/MusicAudioPlayer";
import {MusicStylePicker} from "./ui/MusicStylePicker";

class VoumeStore {
    @observable
    public volumeLevel: number = 50;
}

// Disable tslint temporarily
// tslint:disable-next-line
class App extends Component<{}, ValueHolder> {
    private audioRepsitory: AudioRepository = new AudioRepository();
    private musicPlayer: MusicAudioPlayer = new MusicAudioPlayer(this.audioRepsitory);

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            value: 5,
        };

        this.onSliderMoved = this.onSliderMoved.bind(this);
    }

    public render() {
        return (
            <>
                <Provider musicPlayer={this.musicPlayer} audioRepository={this.audioRepsitory}>
                    <Card elevation={1} className="card">
                        <H5>
                            <a href="#">Music</a>
                        </H5>
                        <p>
                            <MusicStylePicker/>
                        </p>

                        <p>24. The Vikings Have Their Tea (score) - How To Train Your Dragon OST (152kbit_Opus).ogg</p>

                        <p><Slider
                            max={100}
                            min={0}
                            stepSize={1}
                            labelStepSize={10}
                            showTrackFill={true}
                            value={this.state.value}
                            onChange={this.onSliderMoved}
                            className="volumeSlider"
                        /></p>

                        <p>
                            <Button>
                                <Icon icon={"play"}/><Icon icon={"pause"}/>
                            </Button>
                            &nbsp;
                            <Button><Icon icon={"step-forward"}/></Button>
                        </p>
                    </Card>
                </Provider>
            </>
        );
    }

    private onSliderMoved(newValue: number) {
        this.setState({
            value: newValue,
        });
    }
}

interface ValueHolder {
    value: number;
}

export default App;
