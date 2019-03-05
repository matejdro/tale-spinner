import _ from "lodash";
import {observable} from "mobx";
import {InitiativeData, InitiativeEntry} from "../../../common/src/Initiative";

export class InitiativeController {
    @observable
    public initiative: InitiativeData = {
        selectedIndex: -1,
        entries: [],
    };

    public addEntry(entry: InitiativeEntry) {
        let newEntries = this.initiative.entries.slice();
        newEntries.push(entry);

        newEntries = _.sortBy(newEntries, (a: InitiativeEntry) => -a.initiative);

        this.initiative = {
            ...this.initiative,
            entries: newEntries,
        };
    }

    public removeEntry(index: number) {
        let newEntries = this.initiative.entries.slice();
        newEntries.splice(index, 1);

        newEntries = _.sortBy(newEntries, (a: InitiativeEntry) => -a.initiative);

        this.initiative = {
            ...this.initiative,
            entries: newEntries,
        };
    }

    public setVisibility(index: number, visible: boolean) {
        let newEntries = this.initiative.entries.slice();
        newEntries[index] = {
            ...newEntries[index],
            visible,
        };

        newEntries = _.sortBy(newEntries, (a: InitiativeEntry) => -a.initiative);

        this.initiative = {
            ...this.initiative,
            entries: newEntries,
        };
    }

    public advanceSelector() {
        const entries = this.initiative.entries;
        if (entries.length === 0) {
            return;
        }

        let cur = this.initiative.selectedIndex;
        let next = (cur + 1) % entries.length;

        while (next !== cur && !entries[next].visible) {
            next = (next + 1) % entries.length;

            if (cur < 0) {
                cur = 0;
            }
        }

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
