import {Button, Card, EditableText, Switch} from "@blueprintjs/core";
import {action} from "mobx";
import {inject} from "mobx-react";
import * as React from "react";
import {InitiativeEntry} from "../../../common/src/Initiative";
import {InitiativeController} from "../logic/InitiativeController";

class LocalInitiativeCard extends React.Component<InitiativeCardProps, InitiativeEditorState> {
    private firstTextFieldRef = React.createRef<HTMLInputElement>();

    constructor(props: InitiativeCardProps) {
        super(props);

        this.state = {
            name: "",
            friendly: false,
            initiative: "",
            deleteIndex: "",
        };
    }

    public render(): React.ReactNode {
        return (
            <Card elevation={1} className="card vertical-flex" style={{width: "300px"}}>
                <h5>
                    <a href="#">Initiative</a>
                </h5>

                <input
                    className="mb-10"
                    ref={this.firstTextFieldRef}
                    value={this.state.name}
                    onKeyDown={this.handleKeyEvent}
                    placeholder="Test"
                    onChange={this.handleTextChange("name")}
                />

                <Switch
                    className="mb-10"
                    label="Friendly"
                    checked={this.state.friendly}
                    onChange={this.handleSwitchChange("friendly")}
                />

                <input
                    className="mb-20"
                    placeholder="Initiative"
                    value={this.state.initiative}
                    onKeyDown={this.handleKeyEvent}
                    onChange={this.handleTextChange("initiative")}
                />

                <EditableText
                    className="mb-20"
                    placeholder="Delete Index"
                    value={this.state.deleteIndex}
                    onConfirm={this.deleteAtIndex}
                    onChange={this.handleEditableTextChange("deleteIndex")}
                    selectAllOnFocus={true}
                />

                <Button onClick={this.clear} text="Izbriši vse" className="mb-20"/>

                <Button onClick={this.advanceSelector} text="Naslednji"/>

            </Card>
        );
    }

    private handleEditableTextChange = (field: string) => (value: string) => {
        this.setState({[field]: value} as any);
    }

    private handleTextChange = (field: string) => (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({[field]: event.currentTarget.value} as any);
    }

    private handleKeyEvent = (event: React.KeyboardEvent<HTMLElement>) => {
        const {which} = event;

        if (which === 13) {
            this.addNew();
        }
    }

    private handleSwitchChange = (field: string) => (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({[field]: (event.target as unknown as any).checked} as any);
    }

    @action
    private addNew = () => {
        const newEntry: InitiativeEntry = {
            name: this.state.name,
            friendly: this.state.friendly,
            initiative: parseInt(this.state.initiative, 10),
        };

        this.props.initiativeController.addEntry(newEntry);

        const field = this.firstTextFieldRef.current;
        if (field != null) {
            field.focus();
            field.setSelectionRange(0, field.value.length);
        }
    }

    @action
    private deleteAtIndex = () => {
        const index = parseInt(this.state.deleteIndex, 10);
        this.props.initiativeController.removeEntry(index);

        this.setState({
            deleteIndex: "",
        });
    }

    @action
    private clear = () => {
        this.props.initiativeController.clear();
    }

    @action
    private advanceSelector = () => {
        this.props.initiativeController.advanceSelector();
    }
}

interface InitiativeEditorState {
    name: string;
    friendly: boolean;
    initiative: string;
    deleteIndex: string;
}

export interface InitiativeCardProps {
    initiativeController: InitiativeController;
}

export const InitiativeCard = inject((stores: InitiativeCardProps) => ({
    ...stores,
}))(LocalInitiativeCard as unknown as React.ComponentClass<{}>);
