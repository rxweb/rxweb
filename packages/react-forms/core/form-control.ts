import * as React from 'react';
import { } from "../interface/i-form-control";

export abstract class FormControl<IFormControl> extends React.Component<IFormControl>{
    onChange: () => void;

    constructor(props) {
        super(props);
        props.formControl.subscribe(this.stateChange.bind(this));
    }

    private stateChange() {
        if (this.onChange)
            this.onChange();
        this.setState({});
    }

}