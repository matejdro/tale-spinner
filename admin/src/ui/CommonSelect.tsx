import {MenuItem} from "@blueprintjs/core";
import {ItemPredicate, ItemRenderer} from "@blueprintjs/select";
import * as React from "react";

export const renderStringValue = (text: string) => text;
export const renderString: ItemRenderer<string> = (text, {handleClick, modifiers}) => {
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
};

export const filterString: ItemPredicate<string> = (query, text) => {
    return text.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};
