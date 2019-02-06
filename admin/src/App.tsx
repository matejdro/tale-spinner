import {Button, ButtonGroup, Card, H5, Icon, Slider} from "@blueprintjs/core";
import React, {Component} from "react";
import "./App.css";

class App extends Component<{}, ValueHolder> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            value: 5,
        };

        this.onSliderMoved = this.onSliderMoved.bind(this);
    }

    public render() {
        return (
            <>
                <Card elevation={1} className="card">
                    <H5>
                        <a href="#">Music</a>
                    </H5>
                    <p>

                        <ButtonGroup>
                            <Button text="Combat"/>
                            <Button text="Generic"/>
                            <Button text="Horror"/>
                            <Button text="Tavern"/>
                        </ButtonGroup>
                    </p>

                    <p>24. The Vikings Have Their Tea (score) - How To Train Your Dragon OST (152kbit_Opus).ogg</p>

                    <p><Slider
                        max={100}
                        min={0}
                        stepSize={1}
                        labelStepSize={10}
                        showTrackFill={true}
                        value={this.state.value}
                        onChange={this.onSliderMoved}
                        className="volumeSlider"
                    /></p>

                    <p>
                        <Button>
                            <Icon icon={"play"}/><Icon icon={"pause"}/>
                        </Button>
                        &nbsp;
                        <Button><Icon icon={"step-forward"}/></Button>
                    </p>
                </Card>
            </>
        );
    }

    private onSliderMoved(newValue: number) {
        this.setState({
            value: newValue,
        });
    }
}

interface ValueHolder {
    value: number;
}

export default App;
