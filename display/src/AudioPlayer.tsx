import React, {Component} from "react";
import {AudioState} from "../../common/AudioState";

export class AudioPlayer extends Component<AudioPlayerProps> {
    private audio = new Audio();

    constructor(props: Readonly<AudioPlayerProps>) {
        super(props);

        this.audio.addEventListener("ended", props.finishListener)
    }

    componentDidMount(): void {
        this.updatePlayer(undefined)
    }

    componentDidUpdate(prevProps: Readonly<AudioState>, prevState: Readonly<{}>, snapshot?: any): void {
        this.updatePlayer(prevProps)
    }

    private updatePlayer(prevProps?: Readonly<AudioState>): void {
        if (prevProps == undefined || prevProps.url != this.props.url) {
            this.audio.autoplay = !this.props.paused;
            this.audio.src = this.props.url;
            this.audio.load()
        } else if (prevProps.paused != this.props.paused) {
            if (this.props.paused) {
                this.audio.pause()
            } else {
                this.audio.play()
            }
        }
    }

    render(): React.ReactNode {
        return null;
    }
}

export interface AudioPlayerProps extends AudioState {
    finishListener : () => void
}