import {observable} from "mobx";
import {MediaItem, PlayerState} from "../../../common/src/AudioState";

export abstract class AudioPlayer {
    @observable
    public playerState: PlayerState = {
        paused: false,
        volume: 0.5,
    };

    private musicQueue: QueueEntry[] = [];

    constructor() {
        this.onPlaybackFinished = this.onPlaybackFinished.bind(this);
    }

    public enqueue(urls: QueueEntry[]): void {
        this.musicQueue.push(...urls);
    }

    public pause(): void {
        if (!this.playerState.playback) {
            return;
        }

        this.playerState = {
            ...this.playerState,
            paused: true,
        };
    }

    public resume(): void {
        if (this.playerState.playback === undefined) {
            this.enqueueNext();
        } else {
            this.playerState = {
                ...this.playerState,
                paused: false,
            };
        }
    }

    public stop(): void {
        this.playerState = {
            ...this.playerState,
            playback: undefined,
        };
        this.musicQueue = [];
    }

    public setVolume(newVolume: number): void {
        this.playerState = {
            ...this.playerState,
            volume: newVolume,
        };
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

        let newPlayback: MediaItem;
        if (this.playerState.playback === undefined) {
            newPlayback = {
                url: "",
                title: "",
                playbackUuid: "",
            };
        } else {
            newPlayback = {...this.playerState.playback};
        }

        newPlayback.title = nextEntry.title;
        newPlayback.url = nextEntry.url;
        newPlayback.playbackUuid = Math.random().toFixed(10);

        this.playerState = {
            ...this.playerState,
            playback: newPlayback,
        };
    }
}

export interface QueueEntry {
    title: string;
    url: string;
}
