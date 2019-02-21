import {AudioScene} from "./AudioScene";
import {InitiativeData} from "./Initiative";

export interface DisplayState {
    audio: AudioScene;
    initiative: InitiativeData;
}
