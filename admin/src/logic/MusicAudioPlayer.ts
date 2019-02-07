import {observable} from "mobx";
import {AudioPlayer} from "./AudioPlayer";
import {AudioRepository} from "./AudioRepository";

export class MusicAudioPlayer extends AudioPlayer {
    @observable
    public currentCategory?: string;

    private musicRepository: AudioRepository;

    constructor(musicRepository: AudioRepository) {
        super();
        this.musicRepository = musicRepository;
    }

    public playCategory(categoryName: string) {
        // TODO
    }

    protected onQueueEnded(): void {
    }
}
