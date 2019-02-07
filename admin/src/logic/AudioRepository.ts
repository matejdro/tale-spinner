import axios from "axios";
import {observable} from "mobx";
import {serverRequest} from "./ServerConnection";

export class AudioRepository {
    @observable
    public musicCategories: string[] = [];

    constructor() {
        this.refreshCategories();
    }

    public async refreshCategories(): Promise<void> {
        const response = await axios.get(serverRequest("musicCollections"));

        this.musicCategories = response.data;
    }
}
