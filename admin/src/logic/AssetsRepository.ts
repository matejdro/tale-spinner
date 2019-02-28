import axios from "axios";
import {observable} from "mobx";
import {serverRequest} from "./ServerConnection";

export class AssetsRepository {
    public static async getMusicFiles(category: string): Promise<string[]> {
        const response = await axios.get(serverRequest("musicList"), {
            params: {
                category,
            },
        });

        return response.data;
    }

    @observable
    public musicCategories: string[] = [];

    constructor() {
        this.refreshData();
    }

    public async refreshData(): Promise<void> {
        const response = await axios.get(serverRequest("musicCollections"));

        this.musicCategories = response.data;
    }
}
