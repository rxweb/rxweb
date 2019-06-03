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
        if (!this.formGroup)
            this.formGroup = this.configs ? this.configs.formGroup : undefined;
         if (this.dynamicFormComponent && this.dynamicFormComponent.length > 0) {
            this.dynamicFormComponent.forEach(t => {
                if (t.sectionsConfig) {
                    Object.keys(t.sectionsConfig).forEach(x => {
                        let formControl = this.formGroup && t.sectionsConfig[x].formName ? this.formGroup.controls[t.sectionsConfig[x].formName] : this.formGroup;
                        if (formControl instanceof FormGroup) {
                            t.sectionsConfig[x].formGroup = formControl as FormGroup;
                            t.sectionsConfig[x].controlsConfig = this.configs.controlsConfig;
                        }
                        else if (formControl instanceof FormArray) {
                            t.sectionsConfig[x].controlsConfig = this.configs.controlsConfig[t.sectionsConfig[x].formName];
                            t.sectionsConfig[x].formArray = formControl as FormArray;
                        }
                    })
                }
                else
                    t.sectionsConfig = {};
                t.controlTemplates = this.controlTemplates;
            })
        }

    }
}