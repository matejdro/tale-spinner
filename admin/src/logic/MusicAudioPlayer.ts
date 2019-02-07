import {observable} from "mobx";
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

        this.currentCategory = categoryName;

        this.stop();
        this.enqueue(musicMapped);
        this.resume();
    }

    protected onQueueEnded(): void {
    }
}
