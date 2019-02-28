import {observable} from "mobx";
import {shuffle} from "../utils/Shuffle";
import {AssetsRepository} from "./AssetsRepository";
import {AudioPlayer, QueueEntry} from "./AudioPlayer";
import {serverRequest} from "./ServerConnection";

export class MusicAudioPlayer extends AudioPlayer {
    @observable
    public currentCategory?: string;

    private assetsRepository: AssetsRepository;

    constructor(assetsRepository: AssetsRepository) {
        super();
        this.assetsRepository = assetsRepository;
    }

    public async playCategory(categoryName: string) {
        const musicFiles = await AssetsRepository.getMusicFiles(categoryName);

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
