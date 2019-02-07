import {observable} from "mobx";
import shuffle from "shuffle.ts";
import {AudioPlayer} from "./AudioPlayer";
import {AudioRepository} from "./AudioRepository";
import {serverRequest} from "./ServerConnection";

export class MusicAudioPlayer extends AudioPlayer {
    @observable
    public currentCategory?: string;

    private musicRepository: AudioRepository;

    constructor(musicRepository: AudioRepository) {
        super();
        this.musicRepository = musicRepository;
    }

    public async playCategory(categoryName: string) {
        const musicFiles = await AudioRepository.getItems(categoryName);

        const musicMapped = musicFiles.map(
            (fileName) => serverRequest(`music/${categoryName}/${fileName}`),
        );

        shuffle(musicFiles);

        this.currentCategory = categoryName;

        this.stop();
        this.enqueue(musicMapped);
        this.resume();
    }

    protected onQueueEnded(): void {
        this.playCategory(this.currentCategory!);
    }
}
