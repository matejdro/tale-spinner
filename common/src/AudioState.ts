export interface PlayerState {
    paused: boolean;
    playback?: MediaItem;
    volume: number;
}

export interface MediaItem {
    title: string;
    url: string;
    playbackUuid: string;
}
