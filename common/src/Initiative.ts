export interface InitiativeData {
    selectedIndex: number;
    entries: InitiativeEntry[];
}

export interface InitiativeEntry {
    name: string;
    initiative: number;
    friendly: boolean;
    visible: boolean;
}
