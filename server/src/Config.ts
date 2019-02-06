import {Decoder, object, string} from "@mojotech/json-type-validation";

export interface Config {
    musicPath: string;
}

export const configDecoder: Decoder<Config> = object({
    musicPath: string(),
});
