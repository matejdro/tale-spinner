import {observable} from "mobx";
import {InitiativeData, InitiativeEntry} from "../../../common/src/Initiative";

export class InitiativeController {
    @observable
    public initiative: InitiativeData = {
        selectedIndex: -1,
        entries: [],
    };

    public addEntry(entry: InitiativeEntry) {
        const newEntries = this.initiative.entries.slice();
        newEntries.push(entry);

        newEntries.sort((a: InitiativeEntry, b: InitiativeEntry) => b.initiative - a.initiative);

        this.initiative = {
            ...this.initiative,
            entries: newEntries,
        };
    }

    public removeEntry(index: number) {
        const newEntries = this.initiative.entries.slice();
        newEntries.splice(index, 1);

        newEntries.sort((a: InitiativeEntry, b: InitiativeEntry) => b.initiative - a.initiative);

        this.initiative = {
            ...this.initiative,
            entries: newEntries,
        };
    }

    public advanceSelector() {
        const next = (this.initiative.selectedIndex + 1) % this.initiative.entries.length;

        this.initiative = {
            ...this.initiative,
            selectedIndex: next,
        };
    }

    public clear() {
        this.initiative = {
            ...this.initiative,
            entries: [],
        };
    }
}
