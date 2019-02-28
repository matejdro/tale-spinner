import {computed} from "mobx";
import {DisplayState} from "../../../common/src/DisplayState";
import {AudioPlayer} from "./AudioPlayer";
import {InitiativeController} from "./InitiativeController";

export class StateCollector {
    private musicPlayer: AudioPlayer;
    private effectsPlayer: AudioPlayer;
    private initiativeController: InitiativeController;

    constructor(musicPlayer: AudioPlayer, effectsPlayer: AudioPlayer, initiativeController: InitiativeController) {
        this.musicPlayer = musicPlayer;
        this.effectsPlayer = effectsPlayer;
        this.initiativeController = initiativeController;
    }

    @computed
    get displayState(): DisplayState {
        return {
            audio: {
                music: this.musicPlayer.playerState,
                soundEffect: this.effectsPlayer.playerState,
            },
            initiative: this.initiativeController.initiative,
        };
    }
}
