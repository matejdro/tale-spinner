import {observable} from "mobx";
import {AudioState} from "../../../common/src/AudioState";

export abstract class AudioPlayer {
    @observable
    public playState?: AudioState = undefined;

    public enqueue(urls: string[]): void {
        // TODO
    }

    public pause(): void {
        // TODO
    }

    public resume(): void {
        // TODO
    }

    public stop(): void {
        // TODO
    }

    protected abstract onQueueEnded(): void;
}
