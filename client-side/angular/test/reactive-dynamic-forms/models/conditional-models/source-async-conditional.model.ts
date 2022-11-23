import { FormControlConfig } from "@rxweb/reactive-dynamic-forms"

export class SourceAsyncConditionalModel extends FormControlConfig{
    filter() {
        let promise = new Promise<any>((resolve, reject) => {
            let source = [{ text: "Gujarat", value: 1, countryId: 1 }, { text: "Delhi", value: 2, countryId: 1 }, { text: "NY", value: 3, countryId: 2 }]
            this.source = source.filter(t => t.countryId == this.controlsConfig.country.value);
        });
    }
}