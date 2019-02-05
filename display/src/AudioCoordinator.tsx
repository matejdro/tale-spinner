import React, {Component} from "react";
import {AudioScene} from "../../common/src/AudioScene";
import {AudioState} from "../../common/src/AudioState";
import {AudioPlayer} from "./AudioPlayer";

class AudioCoordinator extends Component<AudioCoordinatorProps> {

    public static getAudioKey(audioState: AudioState) {
        return `${audioState.url}|${audioState.playbackUuid}`;
    }

    public render(): React.ReactNode {
        let musicState = this.props.music;
        const pauseMusic = musicState.paused ||
            (this.props.soundEffect !== undefined && !this.props.soundEffect.paused);

        if (pauseMusic !== musicState.paused) {
            musicState = {...musicState, paused: pauseMusic};
        }

        return (
            <>
                <AudioPlayer
                    key={AudioCoordinator.getAudioKey(musicState)}
                    finishListener={this.props.musicEndCallback}
                    {...musicState}
                />

                {
                    this.props.soundEffect && (
                        <AudioPlayer
                            finishListener={this.props.effectEndCallback}
                            key={AudioCoordinator.getAudioKey(this.props.soundEffect)}
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
