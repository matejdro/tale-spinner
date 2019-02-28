import {Button, Card, Icon, Slider} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import {action, computed} from "mobx";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {ComponentWithClassName} from "../../../common/src/ComponentWithClassName";
import {AssetsRepository} from "../logic/AssetsRepository";
import {EffectsAudioPlayer} from "../logic/EffectsAudioPlayer";
import {filterString, renderString} from "./CommonSelect";

const EffectsSelect = Select.ofType<string>();

@observer
class LocalEffectsController extends React.Component<EffectsControllerProps> {
    constructor(props: Readonly<EffectsControllerProps>) {
        super(props);

        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.updateVolume = this.updateVolume.bind(this);
    }

    public render(): React.ReactNode {
        const {assetsRepository, effectsPlayer} = this.props;

        const {currentEffect} = effectsPlayer;

        return (
            <Card elevation={1} className={"card vertical-flex " + this.props.className}>
                <a href="#" className="mb-10">Effects</a>
                <EffectsSelect
                    itemRenderer={renderString}
                    items={assetsRepository.soundEffects}
                    itemPredicate={filterString}
                    onItemSelect={this.handleEffectSelect}
                    className="mb-20"
                >

                    <Button
                        rightIcon="caret-down"
                        text={currentEffect ? currentEffect : "[NOTHING SELECTED"}
                    />

                </EffectsSelect>

                <Slider
                    max={100}
                    min={0}
                    stepSize={1}
                    labelStepSize={10}
                    showTrackFill={true}
                    value={this.volumePercent}
                    onChange={this.updateVolume}
                    className="volumeSlider mb-20"
                />

                <Button onClick={() => this.togglePlayPause()}>
                    <Icon icon={this.playPauseIcon}/>
                </Button>
            </Card>);
    }

    @computed
    private get playPauseIcon(): "play" | "pause" {
        const {effectsPlayer} = this.props;

        const playState = effectsPlayer.playerState;
        return playState.playback === undefined || playState.paused ? "play" : "pause";
    }

    @computed
    private get volumePercent(): number {
        const {effectsPlayer} = this.props;

        return Math.round(effectsPlayer.playerState.volume * 100);
    }

    @action
    private updateVolume(newVolume: number): void {
        const {effectsPlayer} = this.props;

        effectsPlayer.setVolume(newVolume / 100.0);
    }

    private togglePlayPause(): void {
        const {effectsPlayer} = this.props;

        const playState = effectsPlayer.playerState;

        if (!playState.playback || playState.paused) {
            effectsPlayer.resume();
        } else {
            effectsPlayer.pause();
        }
    }

    private handleEffectSelect = (currentEffect: string) => {
        const {effectsPlayer} = this.props;

        effectsPlayer.playEffect(currentEffect);
    }
}

export interface EffectsControllerProps extends ComponentWithClassName {
    assetsRepository: AssetsRepository;
    effectsPlayer: EffectsAudioPlayer;
}

export const EffectsController = inject((stores: EffectsControllerProps) => ({
    ...stores,
}))(LocalEffectsController as unknown as React.ComponentClass<ComponentWithClassName>);
