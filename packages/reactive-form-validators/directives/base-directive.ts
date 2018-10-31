import {Input, ContentChildren,QueryList } from "@angular/core"
import { FormGroup , AbstractControl} from "@angular/forms"

import { AnnotationTypes } from "../core/validator.static";
import { RxFormControlDirective } from './template-validations/rxformcontrol.directive'

export abstract class BaseDirective {
    validationRule:any = {};
    @Input() formGroup: FormGroup;
    @ContentChildren(RxFormControlDirective) ngModelElements: QueryList<RxFormControlDirective>;
    
    bindEvents(isReactiveForm:boolean = true):void {
      this.setControl();
      if(this.validationRule && this.validationRule.conditionalValidationProps){
                for(var columnName in this.validationRule.conditionalValidationProps){
                      if(this.ngModelElements){
                        let modelDirective = this.ngModelElements.filter(t=>t.name == columnName || t.formControlName == columnName)[0];
                        if(modelDirective)
                        {
                            let jObject : {[key:string]:any} = {};
                            this.validationRule.conditionalValidationProps[columnName].forEach(x=>{
                              jObject[x] = this.formGroup.controls[x];
                            })
                            modelDirective.validationControls  = jObject;
                        }
                      }
                }      
      }
      if(isReactiveForm)
        this.handleNumeric();
    }

    private setControl(){
      for(var fieldName in this.formGroup.controls){
          let modelDirective = this.ngModelElements.filter(t=>t.name == fieldName || t.formControlName == fieldName)[0];
          if(modelDirective && !modelDirective.formControl)
            modelDirective.formControl = this.formGroup.controls[fieldName];
      }
    }

     handleNumeric(){
        for(var controlName in this.formGroup.controls){
          let control:any = this.formGroup.controls[controlName];
          if(control.validatorConfig && control.validatorConfig[AnnotationTypes.numeric] && control.validatorConfig[AnnotationTypes.numeric].isFormat){
                let formControlDirective = this.ngModelElements.filter(t=> t.formControlName == controlName)[0];
                if(formControlDirective)
                    formControlDirective.bindNumericElementEvent(control.validatorConfig[AnnotationTypes.numeric]);
          }
      }
    }
}
