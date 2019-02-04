import * as React from "react";
import {Component} from "react";
import {AudioPlayer} from "./AudioPlayer";
import {AudioScene} from "../../common/src/AudioScene";
import {AudioState} from "../../common/src/AudioState";

class AudioCoordinator extends Component<AudioCoordinatorProps> {
    render(): React.ReactNode {
        let musicState = this.props.music;
        const pauseMusic = musicState.paused || (this.props.soundEffect !== undefined && !this.props.soundEffect.paused);

        if (pauseMusic !== musicState.paused) {
            musicState = {...musicState, paused: pauseMusic}
        }

        return (
            <>
                <AudioPlayer finishListener={this.props.musicEndCallback} {...musicState}
                             key={AudioCoordinator.getAudioKey(musicState)}/>

                {this.props.soundEffect && (
                    <AudioPlayer finishListener={this.props.effectEndCallback} {...this.props.soundEffect}
                                 key={AudioCoordinator.getAudioKey(this.props.soundEffect)}/>
                )
                }
            </>
        );
    }

    static getAudioKey(audioState: AudioState) {
        return `${audioState.url}|${audioState.playbackUuid}`
    }
}

interface AudioCoordinatorProps extends AudioScene {
    musicEndCallback: () => void
    effectEndCallback: () => void

}

export default AudioCoordinator