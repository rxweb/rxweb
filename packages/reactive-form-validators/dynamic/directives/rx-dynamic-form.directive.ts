import { Directive, AfterContentInit, ContentChildren, Input, QueryList } from "@angular/core"
import { FormGroup, FormArray } from "@angular/forms"
import { ControlTemplateDirective } from "./control-template.directive"
import { RxWebControlComponent } from "../component/rxweb-control.component"
import { RxwebDynamicFormComponent } from '../component/rxweb-dynamic-form.component'
@Directive({
    selector: '[rxDynamicForm]',
})
export class RxDynamicForm implements AfterContentInit {
    @ContentChildren(RxWebControlComponent) columnComponents: QueryList<RxWebControlComponent>;
    @ContentChildren(RxwebDynamicFormComponent) dynamicFormComponent: QueryList<RxwebDynamicFormComponent>;
    @ContentChildren(ControlTemplateDirective) controlTemplates: QueryList<ControlTemplateDirective>;
    @Input('rxDynamicForm') configs: any; 
    @Input('formGroup') formGroup: FormGroup;
    ngAfterContentInit(): void {
        setTimeout(() => {
            if (this.columnComponents && this.columnComponents.length > 0) {
                this.columnComponents.forEach(columnComponent => {
                    columnComponent.formControlConfig = this.configs.controlsConfig ? this.configs.controlsConfig[columnComponent.name] : undefined;
                    columnComponent.sectionConfig = this.configs.sectionsConfig ? this.configs.sectionsConfig[columnComponent.name] : undefined;
                    let controlsConfig = this.configs.controlsConfig
                    if (columnComponent.sectionConfig) {
                        let formControl = this.formGroup ? this.formGroup.controls[columnComponent.sectionConfig.formName] : undefined
                        if (formControl instanceof FormGroup)
                            columnComponent.formGroup = formControl as FormGroup;
                        else if (formControl instanceof FormArray) {
                            controlsConfig = this.configs.controlsConfig[columnComponent.sectionConfig.formName];
                            columnComponent.formArray = formControl as FormArray;
                        }

                        columnComponent.configs = { controlsConfig: controlsConfig, sectionsConfig: columnComponent.sectionConfig.sectionsConfig };
                    }
                    columnComponent.controlTemplates = this.controlTemplates;
                    columnComponent.process();
                })
            } else if (this.dynamicFormComponent && this.dynamicFormComponent.length > 0) {
                this.dynamicFormComponent.forEach(t => {
                    t.controlTemplates = this.controlTemplates;
                })
            }
           
        })
    }
}