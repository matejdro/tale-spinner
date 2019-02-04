import {Component} from "react";
import {AudioPlayer, AudioPlayerProps} from "./AudioPlayer";
import * as React from "react";

class AudioCoordinator extends Component<AudioScene> {
    render(): React.ReactNode {
        const players = Array<React.ReactNode>();

        let musicState = this.props.music;
        const playMusic = !musicState.paused && (this.props.soundEffect === undefined || this.props.soundEffect.paused);

        if (!playMusic !== musicState.paused) {
            musicState = Object.assign({}, musicState, {paused: !playMusic})
        }

        players.push(<AudioPlayer {...musicState} key="music" />);

        if (this.props.soundEffect !== undefined) {
            players.push(<AudioPlayer {...this.props.soundEffect} key="effects" />);
        }


        return players;
    }
}

export type AudioScene = {
    music: AudioPlayerProps,
    soundEffect?: AudioPlayerProps
}

export default AudioCoordinator