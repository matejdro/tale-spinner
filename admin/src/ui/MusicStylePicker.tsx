import {Button, ButtonGroup} from "@blueprintjs/core";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {AudioRepository} from "../logic/AudioRepository";
import {MusicAudioPlayer} from "../logic/MusicAudioPlayer";

@inject("audioRepository", "musicPlayer")
@observer
export class MusicStylePicker extends React.Component<MusicStylePickerProps> {
    constructor(props: Readonly<MusicStylePickerProps>) {
        super(props);
    }

    public render(): React.ReactNode {
        const currentCategory = this.props.musicPlayer!.currentCategory;

        const buttons = this.props.audioRepository!.musicCategories.map((categoryName) => {
            const intent = currentCategory === categoryName ? "primary" : "none";

            return (
                <Button
                    text={categoryName}
                    key={categoryName}
                    intent={intent}
                    onClick={() => {
                        this.props.musicPlayer!.playCategory(categoryName);
                    }}
                />);
        });

        return (
            <ButtonGroup>
                {buttons}
            </ButtonGroup>
        );
    }
}

export interface MusicStylePickerProps {
    audioRepository?: AudioRepository;
    musicPlayer?: MusicAudioPlayer;
}
