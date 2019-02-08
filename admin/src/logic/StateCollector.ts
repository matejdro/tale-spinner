import {computed} from "mobx";
import {DisplayState} from "../../../common/src/DisplayState";
import {AudioPlayer} from "./AudioPlayer";

export class StateCollector {
    private musicPlayer: AudioPlayer;

    constructor(musicPlayer: AudioPlayer) {
        this.musicPlayer = musicPlayer;
    }

    @computed
    get displayState(): DisplayState {
        return {
            audio: {
                music: this.musicPlayer.playerState,
                soundEffect: {paused: false},
            },
        };
    }
}
