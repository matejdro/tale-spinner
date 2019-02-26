export interface InitiativeData {
    selectedIndex: number;
    entries: InitiativeEntry[];
}

export interface InitiativeEntry {
    name: string;
    iconUrl?: string;
    initiative: number;
    friendly: boolean;
    visible: boolean;
}
