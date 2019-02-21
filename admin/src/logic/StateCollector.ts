import {computed} from "mobx";
import {DisplayState} from "../../../common/src/DisplayState";
import {AudioPlayer} from "./AudioPlayer";
import {InitiativeController} from "./InitiativeController";

export class StateCollector {
    private musicPlayer: AudioPlayer;
    private initiativeController: InitiativeController;

    constructor(musicPlayer: AudioPlayer, initiativeController: InitiativeController) {
        this.musicPlayer = musicPlayer;
        this.initiativeController = initiativeController;
    }

    @computed
    get displayState(): DisplayState {
        return {
            audio: {
                music: this.musicPlayer.playerState,
                soundEffect: {paused: false, volume: 0.0},
            },
            initiative: this.initiativeController.initiative,
        };
    }
}
