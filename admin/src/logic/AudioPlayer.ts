import {observable} from "mobx";
import {AudioState} from "../../../common/src/AudioState";

export abstract class AudioPlayer {
    @observable
    public playState?: AudioState = undefined;

    private musicQueue: QueueEntry[] = [];

    constructor() {
        this.onPlaybackFinished = this.onPlaybackFinished.bind(this);
    }

    public enqueue(urls: QueueEntry[]): void {
        this.musicQueue.push(...urls);
    }

    public pause(): void {
        if (!this.playState) {
            return;
        }

        this.playState = {
            ...this.playState,
            paused: true,
        };
    }

    public resume(): void {
        if (this.playState === undefined) {
            this.enqueueNext();
        } else {
            this.playState = {
                ...this.playState,
                paused: false,
            };
        }
    }

    public stop(): void {
        this.playState = undefined;
        this.musicQueue = [];
    }

    public onPlaybackFinished(): void {
        if (this.musicQueue.length === 0) {
            this.onQueueEnded();
            return;
        }

        this.enqueueNext();
    }

    protected abstract onQueueEnded(): void;

    private enqueueNext(): void {
        const nextEntry = this.musicQueue.shift();
        if (!nextEntry) {
            return;
        }

        let newPlayState: AudioState;
        if (this.playState === undefined) {
            newPlayState = {
                url: "",
                title: "",
                paused: false,
                playbackUuid: "",
            };
        } else {
            newPlayState = {...this.playState};
        }

        newPlayState.title = nextEntry.title;
        newPlayState.url = nextEntry.url;
        newPlayState.playbackUuid = Math.random().toFixed(10);

        this.playState = newPlayState;
    }
}

export interface QueueEntry {
    title: string;
    url: string;
}
