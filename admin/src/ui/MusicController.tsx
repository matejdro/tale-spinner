import {Button, Card, H5, Icon, Slider} from "@blueprintjs/core";
import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {MusicAudioPlayer} from "../logic/MusicAudioPlayer";
import {MusicStylePicker} from "./MusicStylePicker";

@inject("musicPlayer")
@observer
export class MusicController extends React.Component<MusicControllerProps> {
    constructor(props: Readonly<MusicControllerProps>) {
        super(props);

        this.togglePlayPause = this.togglePlayPause.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <Card elevation={1} className="card">
                <H5>
                    <a href="#">Music</a>
                </H5>
                <p>
                    <MusicStylePicker/>
                </p>

                <p>{this.currentTrackTitle}</p>

                <p><Slider
                    max={100}
                    min={0}
                    stepSize={1}
                    labelStepSize={10}
                    showTrackFill={true}
                    className="volumeSlider"
                /></p>

                <p>
                    <Button onClick={() => this.togglePlayPause()}>
                        <Icon icon={this.playPauseIcon}/>
                    </Button>
                    &nbsp;
                </p>
            </Card>);
    }

    @computed
    private get currentTrackTitle(): string {
        const playState = this.props.musicPlayer!.playerState.playback;
        return playState !== undefined ? playState.title : "[STOPPED]";
    }

    @computed
    private get playPauseIcon(): "play" | "pause" {
        const playState = this.props.musicPlayer!.playerState;
        return playState.playback === undefined || playState.paused ? "play" : "pause";
    }

    private togglePlayPause(): void {
        const playState = this.props.musicPlayer!.playerState;
        if (!playState.playback) {
            return;
        }

        if (playState.paused) {
            this.props.musicPlayer!.resume();
        } else {
            this.props.musicPlayer!.pause();
        }
    }
}

export interface MusicControllerProps {
    musicPlayer?: MusicAudioPlayer;
}
