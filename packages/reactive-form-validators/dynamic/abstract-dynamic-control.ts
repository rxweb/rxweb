import { Input } from "@angular/core"
import { AbstractControl, FormGroup, FormArray } from "@angular/forms"
import { FormControlConfig } from "./form-control-config";

export abstract class AbstractDynamicControl {
    @Input() formControl: AbstractControl
    @Input() formGroup: FormGroup;
    @Input() formArray: FormArray;

    @Input() controlConfig: FormControlConfig;
    @Input() sectionConfig: any
    @Input() configs: any


    addItem() {
        if (this.configs && this.configs.controlsConfig && Array.isArray(this.configs.controlsConfig))
            this.configs.controlsConfig.addItem();
    }

    removeItem(index: number) {
        if (this.configs && this.configs.controlsConfig && Array.isArray(this.configs.controlsConfig))
            this.configs.controlsConfig.removeItem(index)
    }

}