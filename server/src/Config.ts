import {Decoder, object, string} from "@mojotech/json-type-validation";
import * as fs from "fs";
import * as path from "path";

export interface Config {
    musicPath: string;
    creatureIconsPath: string;
}

const configDecoder: Decoder<Config> = object({
    musicPath: string(),
    creatureIconsPath: string(),
});

export function loadConfig(): Config {
    const configFile = path.join(process.cwd(), "config.json");

    if (!fs.existsSync(configFile)) {
        throw new Error("config.json missing");
    }

    const configText = fs.readFileSync(configFile, "utf8");

    try {
        return configDecoder.runWithException(JSON.parse(configText));
    } catch (e) {
        throw new Error("config.json decoding failed: " + e.message);
    }
}
