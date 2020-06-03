import { FormControlConfig } from "@rxweb/reactive-dynamic-forms"

export class ConditionalClassModel extends FormControlConfig {
    private _class: string[];

    get class() {
        if (this.controlsConfig.firstName.value == "Bharat")
            return ["conditional-class"];
        return [];
    }

    set class(value:string[]) {
        this._class = value;
    }
}