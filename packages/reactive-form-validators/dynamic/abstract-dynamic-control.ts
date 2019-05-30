import { ViewChildren, Input, AfterViewInit, QueryList} from "@angular/core"
import { AbstractControl, FormGroup, FormArray } from "@angular/forms"
import { FormControlConfig } from "./form-control-config";
import { RxwebActionDirective } from './directives/rxweb-action.directive';
export abstract class AbstractDynamicControl implements AfterViewInit {
    @ViewChildren(RxwebActionDirective) rxwebActions: QueryList<RxwebActionDirective>;
    @Input() formControl: AbstractControl
    @Input() formGroup: FormGroup;
    @Input() formArray: FormArray;

    @Input() controlConfig: FormControlConfig;
    @Input() sectionConfig: any
    @Input() controlsConfig: any 
    @Input() controlTemplates: any;

    ngAfterViewInit(): void {
        
            if (this.rxwebActions && this.rxwebActions.length > 0 && this.controlConfig) {
                this.rxwebActions.forEach(rxwebAction => {
                    rxwebAction.controlConfig = this.controlConfig;
                })
        }
    }

    addItem() {
        if (this.controlsConfig && Array.isArray(this.controlsConfig))
            this.controlsConfig["addItem"]();
    }

    removeItem(index: number) {
        if (this.controlsConfig && Array.isArray(this.controlsConfig))
            this.controlsConfig["removeItem"](index)
    }

}