import { RxFormGroup } from "../services/rx-form-group";
import { FormGroupDirective } from "../directives/form-group.directive";

export const formGroupContainer:
    {
        get(groupKey: string): RxFormGroup,
        saveFormGroup(formGroup: RxFormGroup),
        mapElement(groupKey: string, element: HTMLElement),
        destroy(groupKey: string)
    } = new (class {
        private formGroups: { [key: string]: RxFormGroup } = {};

        private groupKeyElements: { [key: string]: HTMLElement } = {};

        private formGroupDirectives: { [key: string]: FormGroupDirective} = {};

        get(groupKey: string): RxFormGroup {
            return this.formGroups[groupKey];
        }

        saveFormGroup(formGroup: RxFormGroup) {
            
            let groupKey:any = formGroup.path;
            this.formGroups[formGroup.path] = formGroup;
            this.bindIt(groupKey);
        }

        mapElement(groupKey: string, element: HTMLElement) {
            this.groupKeyElements[groupKey] = element;
            this.bindIt(groupKey)
        }

        bindIt(groupKey: string) {
            if (this.groupKeyElements[groupKey] && this.formGroups[groupKey]) {
                setTimeout(() => {
                    this.formGroupDirectives[groupKey] = new FormGroupDirective(this.groupKeyElements[groupKey], this.formGroups[groupKey]);
                },100)
                
            }
            
        }

        destroy(groupKey: string) {
            if (this.formGroupDirectives[groupKey]) {
                this.formGroupDirectives[groupKey].destroy();
                delete this.formGroupDirectives[groupKey];
            }
        }
    })();