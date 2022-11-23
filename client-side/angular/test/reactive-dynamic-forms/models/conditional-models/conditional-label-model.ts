import { FormControlConfig } from "@rxweb/reactive-dynamic-forms"

export class ConditionalLabelModel extends FormControlConfig {
    private _label: string;

    get label() {
        if (this.controlsConfig.firstName.value == "Bharat")
            this._label = `Enter Your Last Name`
        return this._label;
    }

    set label(value: string) {
        this._label = value;
    }
}