import {observable} from "mobx";
import {shuffle} from "../utils/Shuffle";
import {AudioPlayer, QueueEntry} from "./AudioPlayer";
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
            (fileName) => {
                // noinspection UnnecessaryLocalVariableJS
                const entry: QueueEntry = {
                    url: serverRequest(`music/${categoryName}/${fileName}`),
                    title: fileName,
                };
                return entry;
            });

        const musicShuffled = shuffle(musicMapped);

        this.currentCategory = categoryName;

        this.stop();
        this.enqueue(musicShuffled);
        this.resume();
    }

    protected onQueueEnded(): void {
        this.playCategory(this.currentCategory!);
    }
}
