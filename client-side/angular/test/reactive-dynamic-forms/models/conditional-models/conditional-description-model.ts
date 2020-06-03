import { FormControlConfig } from "@rxweb/reactive-dynamic-forms"

export class ConditionalDescriptionModel extends FormControlConfig {
    private _description: string;

    get description() {
        if (this.controlsConfig.firstName.value == "Bharat")
            this._description = `You can enter your last name`
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}