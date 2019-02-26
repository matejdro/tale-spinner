import {Button, Card, H5, Icon, Slider} from "@blueprintjs/core";
import {action, computed} from "mobx";
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
        this.updateVolume = this.updateVolume.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <Card elevation={1} className="card vertical-flex">
                <a href="#" className="mb-10">Music</a>
                <MusicStylePicker className="mb-20"/>

                <div className="mb-20">{this.currentTrackTitle}</div>

                <Slider
                    max={100}
                    min={0}
                    stepSize={1}
                    labelStepSize={10}
                    showTrackFill={true}
                    value={this.volumePercent}
                    onChange={this.updateVolume}
                    className="volumeSlider mb-20"
                 />

                    <Button onClick={() => this.togglePlayPause()}>
                        <Icon icon={this.playPauseIcon}/>
                    </Button>
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

    @computed
    private get volumePercent(): number {
        return Math.round(this.props.musicPlayer!.playerState.volume * 100);
    }

    @action
    private updateVolume(newVolume: number): void {
        this.props.musicPlayer!.setVolume(newVolume / 100.0);
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
