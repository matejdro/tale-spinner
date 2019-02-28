import {observable} from "mobx";
import {AssetsRepository} from "./AssetsRepository";
import {AudioPlayer, QueueEntry} from "./AudioPlayer";
import {serverRequest} from "./ServerConnection";

export class EffectsAudioPlayer extends AudioPlayer {
    @observable
    public currentEffect?: string;

    private assetsRepository: AssetsRepository;

    constructor(assetsRepository: AssetsRepository) {
        super();
        this.assetsRepository = assetsRepository;
    }

    public resume(): void {
        if (this.currentEffect && !this.playerState.playback && this.musicQueue.length === 0) {
            this.playEffect(this.currentEffect);
        }

        super.resume();
    }

    public async playEffect(effectName: string) {
        this.currentEffect = effectName;

        const queueEntry: QueueEntry = {
            url: serverRequest(`effects/${effectName}`),
            title: effectName,
        };

        this.stop();
        this.enqueue([queueEntry]);
    }

    protected onQueueEnded(): void {
        this.stop();
    }
}
