import * as React from "react";
import {Component} from "react";
import {AudioPlayer} from "./AudioPlayer";
import {AudioScene} from "./App";

class AudioCoordinator extends Component<AudioCoordinatorProps> {
    render(): React.ReactNode {
        const players = Array<React.ReactNode>();

        let musicState = this.props.music;
        const playMusic = !musicState.paused && (this.props.soundEffect === undefined || this.props.soundEffect.paused);

        if (!playMusic !== musicState.paused) {
            musicState = {...musicState, paused: !playMusic}
        }

        players.push(<AudioPlayer finishListener={this.props.musicEndCallback} {...musicState} key="music"/>);

        if (this.props.soundEffect !== undefined) {
            players.push(<AudioPlayer finishListener={this.props.effectEndCallback} {...this.props.soundEffect}
                                      key="effects"/>);
        }


        return players;
    }
}

interface AudioCoordinatorProps extends AudioScene {
    musicEndCallback: () => void
    effectEndCallback: () => void

}

export default AudioCoordinator