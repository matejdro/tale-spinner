export interface PlayerState {
    paused: boolean;
    playback?: MediaItem;
}

export interface MediaItem {
    title: string;
    url: string;
    playbackUuid: string;
}
