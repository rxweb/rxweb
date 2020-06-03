import { FormControlConfig } from "@rxweb/reactive-dynamic-forms"

export class SourceSyncConditionalModel extends FormControlConfig{
    private _filter: any[];
    set filter(value: any[]) {
        this._filter = value;
    }

    get filter() {
        return this._filter.filter(t => t.countryId == this.controlsConfig.country.value);
    }
}