import React, {Component} from "react";
import {InitiativeData} from "../../../common/src/Initiative";

export class InitiativeTable extends Component<InitiativeData> {
    public render(): React.ReactNode {
        const rows = this.props.entries.map((item, index) => {
            const alignmentClasse = item.friendly ? "greenBackground" : "redBackground";
            const selected = this.props.selectedIndex === index;
            const onTurnClass = selected ? "onTurn" : "";

            const rowClasses = `row ${onTurnClass} row`;
            const badgeClasses = `${alignmentClasse} badge`;

            return (
                <div className={rowClasses} key={index}>
                    <div className="col">{item.name}</div>
                    <div className="col">
                        <div className={badgeClasses}>&nbsp;</div>
                    </div>
                    <div className="col">{item.initiative}</div>
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
