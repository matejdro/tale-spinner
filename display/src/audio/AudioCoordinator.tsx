import React, {Component} from "react";
import {AudioScene} from "../../../common/src/AudioScene";
import {MediaItem} from "../../../common/src/AudioState";
import {AudioPlayer} from "./AudioPlayer";

class AudioCoordinator extends Component<AudioCoordinatorProps> {

    public static getAudioKey(playback: MediaItem) {
        return `${playback.url}|${playback.playbackUuid}`;
    }

    public render(): React.ReactNode {
        let musicState = this.props.music;
        if (musicState.playback) {
            const pauseMusic = musicState.paused ||
                (this.props.soundEffect.playback !== undefined && !this.props.soundEffect.paused);

            if (pauseMusic !== musicState.paused) {
                musicState = {...musicState, paused: pauseMusic};
            }
        }

        return (
            <>
                {
                    musicState.playback && (
                        <AudioPlayer
                            finishListener={this.props.musicEndCallback}
                            key={AudioCoordinator.getAudioKey(musicState.playback)}
                            {...musicState}
                        />
                    )
                }

                {
                    this.props.soundEffect.playback && (
                        <AudioPlayer
                            finishListener={this.props.effectEndCallback}
                            key={AudioCoordinator.getAudioKey(this.props.soundEffect.playback)}
                            {...this.props.soundEffect}
                        />
                    )
                }
            </>
        );
    }
}

interface AudioCoordinatorProps extends AudioScene {
    musicEndCallback: () => void;
    effectEndCallback: () => void;

}

export default AudioCoordinator;
