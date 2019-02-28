import {Button, Card, MenuItem, Switch} from "@blueprintjs/core";
import {ItemPredicate, ItemRenderer, Suggest} from "@blueprintjs/select";
import {action, computed} from "mobx";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {InitiativeEntry} from "../../../common/src/Initiative";
import {AssetsRepository} from "../logic/AssetsRepository";
import {InitiativeController} from "../logic/InitiativeController";

@observer
class LocalInitiativeCard extends React.Component<InitiativeCardProps, InitiativeEditorState> {
    private nameTextFieldRef = React.createRef<Suggest<string>>();
    private initiativeTextFieldRef = React.createRef<HTMLInputElement>();

    constructor(props: InitiativeCardProps) {
        super(props);
        this.state = {
            name: "",
            friendly: false,
            visible: true,
            initiative: "",
            deleteIndex: "",
        };
    }

    public render(): React.ReactNode {
        const {initiative} = this.props.initiativeController;

        const initiativeCells = initiative.entries.map(
            (entry: InitiativeEntry, index: number) => {
                let colorClass = "row ";
                if (index === initiative.selectedIndex) {
                    colorClass += "is-on-turn";
                } else if (index % 2 === 1) {
                    colorClass += "is-striped";
                }

                return (
                    <div className={colorClass} key={index}>
                        <div className="cell">{entry.name}</div>
                        <div className="cell">{entry.friendly ? "✔" : "❌"}</div>
                        <div className="cell">{entry.initiative.toFixed(2)}</div>
                        <div className="cell">
                            <Switch
                                className="mb-0"
                                checked={entry.visible}
                                onChange={this.handleVisibilityChange(index)}
                            />
                        </div>
                        <div className="cell">
                            <Button text="✏" onClick={this.editAt(index)} className="emoji-button"/>
                        </div>
                        <div className="cell">
                            <Button text="🗑" onClick={this.deleteAt(index)} className="emoji-button"/>
                        </div>
                    </div>);
            });

        return (
            <Card elevation={1} className="card vertical-flex initiative-card">
                <h5>
                    <a href="#">Initiative</a>
                </h5>

                <div className="horizontal-flex mb-20">
                    {/*<input*/}
                    {/*className="mr-10"*/}
                    {/*ref={this.nameTextFieldRef}*/}
                    {/*value={this.state.name}*/}
                    {/*onKeyDown={this.handleKeyEvent}*/}
                    {/*placeholder="Test"*/}
                    {/*onChange={this.handleTextChange("name")}*/}
                    {/*/>*/}
                    <Suggest
                        className="mr-10"
                        ref={this.nameTextFieldRef}
                        query={this.state.name}
                        onQueryChange={this.handleStringChange("name")}
                        items={this.creatureIconNames}
                        inputValueRenderer={this.renderStringValue}
                        itemRenderer={this.renderString}
                        itemPredicate={this.filterString}
                        onItemSelect={this.handleStringChange("name")}
                        resetOnQuery={true}

                    />

                    <input
                        className="mr-10"
                        placeholder="Initiative"
                        ref={this.initiativeTextFieldRef}
                        value={this.state.initiative}
                        onKeyDown={this.handleKeyEvent}
                        onChange={this.handleTextChange("initiative")}
                    />

                    <Switch
                        className="mb-0 mr-10"
                        label="Friendly"
                        checked={this.state.friendly}
                        onChange={this.handleSwitchChange("friendly")}
                    />

                    <Switch
                        className="mb-0"
                        label="Visible"
                        checked={this.state.visible}
                        onChange={this.handleSwitchChange("visible")}
                    />
                </div>

                <div className="table mb-20">
                    <div className="row table-heading">
                        <div className="cell">Name</div>
                        <div className="cell">Friendly</div>
                        <div className="cell">Initiative</div>
                        <div className="cell">Visible</div>
                        <div className="cell">Edit</div>
                        <div className="cell">Delete</div>
                    </div>

                    {initiativeCells}
                </div>

                <Button onClick={this.clear} text="Clear" className="mb-20"/>

                <Button onClick={this.advanceSelector} text="Next"/>
            </Card>
        );
    }

    private handleTextChange = (field: string) => (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({[field]: event.currentTarget.value} as any);
    }

    private handleStringChange = (field: string) => (text: string) => {
        console.log("SS ", text)
        this.setState({[field]: text} as any);
    }

    @action
    private deleteAt = (index: number) => () => {
        this.props.initiativeController.removeEntry(index);
    }

    @action
    private editAt = (index: number) => () => {
        const initiativeController = this.props.initiativeController;
        const {name, friendly, initiative} = initiativeController.initiative.entries[index];

        this.setState({
            name,
            friendly,
            initiative: initiative.toString(),
        });

        initiativeController.removeEntry(index);

        const field = this.initiativeTextFieldRef.current;
        if (field != null) {
            field.focus();
            field.setSelectionRange(0, field.value.length);
        }
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
    private handleVisibilityChange = (index: number) => (event: React.FormEvent<HTMLInputElement>) => {
        this.props.initiativeController.setVisibility(index, (event.target as unknown as any).checked);
    }

    @action
    private addNew = () => {
        const initiativeText = this.state.initiative;
        let newInitiativeValue: number;

        if (initiativeText.startsWith("+") || initiativeText.startsWith("-")) {
            let modifier = parseInt(initiativeText.substr(1), 10);
            if (initiativeText.startsWith("-")) {
                modifier = -modifier;
            }

            newInitiativeValue = Math.max(0, Math.floor(Math.random() * 20 + 1) + modifier + modifier / 100.0);
        } else {
            newInitiativeValue = parseFloat(initiativeText);
        }

        const newEntry: InitiativeEntry = {
            name: this.state.name,
            friendly: this.state.friendly,
            initiative: newInitiativeValue,
            visible: this.state.visible,
        };

        this.props.initiativeController.addEntry(newEntry);

        const field = this.nameTextFieldRef.current;
        if (field != null) {
            //field.setSelectionRange(0, field.value.length);
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

    @computed
    private get creatureIconNames(): string[] {
        return this.props.assetsRepository.creatureIcons
            .map((item) => item.substr(0, item.indexOf(".")));
    }

    private renderStringValue = (text: string) => text;
    private renderString: ItemRenderer<string> = (text, {handleClick, modifiers, query}) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                key={text}
                onClick={handleClick}
                text={text}
            />
        );
    }

    private filterString: ItemPredicate<string> = (query, text) => {
        return text.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
}

interface InitiativeEditorState {
    name: string;
    friendly: boolean;
    visible: boolean;
    initiative: string;
    deleteIndex: string;
}

export interface InitiativeCardProps {
    initiativeController: InitiativeController;
    assetsRepository: AssetsRepository;
}

export const InitiativeCard = inject((stores: InitiativeCardProps) => ({
    ...stores,
}))(LocalInitiativeCard as unknown as React.ComponentClass<{}>);
