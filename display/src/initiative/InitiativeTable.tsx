import React, {Component} from "react";
import {InitiativeData} from "../../../common/src/Initiative";

export class InitiativeTable extends Component<InitiativeData> {
    public render(): React.ReactNode {
        const rows = this.props.entries.filter((item) => item.visible).map((item, index) => {
            const alignmentClasses = item.friendly ? "greenBackground" : "redBackground";
            const selected = this.props.selectedIndex === index;
            const onTurnClass = selected ? "onTurn" : "";

            const rowClasses = `row ${onTurnClass}`;
            const badgeClasses = `${alignmentClasses} badge`;

            let itemIcon: string;
            if (item.iconUrl != null) {
                itemIcon = item.iconUrl;
            } else {
                itemIcon = TRANSPARENT_PIXELS;
            }

            return (
                <div className={rowClasses} key={index}>
                    <div className="cell no-grow-cell center-align mr-20">
                        <img
                            className="creature-icon"
                            src={itemIcon}
                        />
                    </div>
                    <div className="cell left-align">
                        {item.name}
                    </div>
                    <div className="cell no-grow-cell">
                        <div className={badgeClasses}>&nbsp;</div>
                    </div>
                    <div className="cell right-align">{item.initiative.toFixed(2)}</div>
                </div>
            );
        });

        return (
            <section className="table">
                {rows}
            </section>
        );
    }
}

const TRANSPARENT_PIXELS: string = "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
