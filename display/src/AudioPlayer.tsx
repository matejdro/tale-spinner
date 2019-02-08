import React, {Component} from "react";
import {PlayerState} from "../../common/src/AudioState";

export class AudioPlayer extends Component<AudioPlayerProps> {
    private audio = new Audio();

    constructor(props: Readonly<AudioPlayerProps>) {
        super(props);

        this.audio.addEventListener("ended", props.finishListener);
    }

    public componentDidMount(): void {
        this.audio.volume = this.props.volume;
        this.audio.autoplay = !this.props.paused;
        this.audio.src = this.props.playback!.url;
        this.audio.load();
    }

    public componentDidUpdate(prevProps: Readonly<AudioPlayerProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.paused !== this.props.paused) {
            if (this.props.paused) {
                this.audio.pause();
            } else {
                this.audio.play();
            }
        }

        this.audio.volume = this.props.volume;
    }

    public componentWillUnmount(): void {
        this.audio.pause();
        this.audio.removeEventListener("ended", this.props.finishListener);
    }

    public render(): React.ReactNode {
        return null;
    }
}

export interface AudioPlayerProps extends PlayerState {
    finishListener: () => void;
}
