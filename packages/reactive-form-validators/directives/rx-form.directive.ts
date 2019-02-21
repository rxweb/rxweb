import { Directive, Input, AfterContentInit, OnDestroy} from "@angular/core"
import { FormGroup,FormArray } from "@angular/forms";
import { AnnotationTypes } from "../core/validator.static";
import { defaultContainer } from "../core/defaultContainer";
import { BaseDirective } from "./base-directive"
import { Linq } from "../util/linq";
import { conditionalChangeValidator } from '../reactive-form-validators/conditional-change.validator';
import { CONDITIONAL_VALIDATOR  } from '../const/app.const'

@Directive({
  selector: '[formGroup],[rxwebForm]',
})
export class RxwebFormDirective extends BaseDirective implements AfterContentInit, OnDestroy {
  private clearTimeout: number = 0;
  private validationRule: any = {};
  @Input() formGroup: FormGroup;
  @Input('rxwebForm') ngForm;

  ngAfterContentInit(): void {
    if (this.formGroup && !this.formGroup["model"] && this.formGroup.parent == null) {
      this.expressionProcessor(this.formGroup.controls);
      this.setConditionalValidator(this.formGroup.controls)
    } else if (this.ngForm) {
      this.configureModelValidations();
    }
  }

  private configureModelValidations() {
    this.clearTimeout = window.setTimeout(() => {
      window.clearTimeout(this.clearTimeout);
      this.applyValidations(this.ngForm.form.controls);
      this.expressionProcessor(this.ngForm.form.controls);
      this.setConditionalValidator(this.ngForm.form.controls)
      this.updateValueAndValidity(this.ngForm.form.controls);
    }, 500)
  }

  private updateValueAndValidity(controls:any){
    Object.keys(controls).forEach(key => {
      if(controls[key] instanceof FormGroup)
      this.updateValueAndValidity(controls[key].controls);
      else if(controls[key] instanceof FormArray)
      this.updateValueAndValidity(controls[key].controls);
      else
      controls[key].updateValueAndValidity();
    })
  }

  private expressionProcessor(controls: { [key: string]: any },rootFieldName:string = "") {
    Object.keys(controls).forEach(fieldName => {
      let formControl: any = controls[fieldName];
      if (formControl.validatorConfig) {
        Object.keys(AnnotationTypes).forEach(validatorName => {
          if (formControl.validatorConfig[validatorName] && formControl.validatorConfig[validatorName].conditionalExpression) {
            let columns = Linq.expressionColumns(formControl.validatorConfig[validatorName].conditionalExpression);
            defaultContainer.addChangeValidation(this.validationRule, rootFieldName+fieldName, columns);
          }
          if(formControl.validatorConfig[validatorName] && (validatorName == AnnotationTypes.and || validatorName == AnnotationTypes.or || validatorName == AnnotationTypes.not)){
            Object.keys(formControl.validatorConfig[validatorName].validation).forEach(t=>{
                if(typeof formControl.validatorConfig[validatorName].validation[t] !== "boolean")
                defaultContainer.setLogicalConditional(this.validationRule,t,formControl.validatorConfig[validatorName].validation[t].fieldName,fieldName)
            })
        }else if (formControl.validatorConfig[validatorName] && ((validatorName == AnnotationTypes.compare || validatorName == AnnotationTypes.greaterThan || validatorName == AnnotationTypes.greaterThanEqualTo || validatorName == AnnotationTypes.lessThan || validatorName == AnnotationTypes.lessThanEqualTo || validatorName == AnnotationTypes.different || validatorName == AnnotationTypes.factor) || (validatorName == AnnotationTypes.creditCard && formControl.validatorConfig[validatorName].fieldName) || ((validatorName == AnnotationTypes.minDate || validatorName == AnnotationTypes.maxDate) && formControl.validatorConfig[validatorName].fieldName))) {
            defaultContainer.setConditionalValueProp(this.validationRule, formControl.validatorConfig[validatorName].fieldName, fieldName)
          }
        })
      }else if(formControl instanceof FormGroup){
            this.expressionProcessor(formControl.controls,`${fieldName}.`);
      }else if(formControl instanceof FormArray){
            if(formControl.controls)
            formControl.controls.forEach((t:any,i)=>{
                  if(t.controls)
                      this.expressionProcessor(t.controls,`${fieldName}[]`);
            })
      }

    })
  }

  private setConditionalValidator(controls) {
    Object.keys(controls).forEach(fieldName => {
      if (this.validationRule.conditionalValidationProps && this.validationRule.conditionalValidationProps[fieldName]) {
        controls[fieldName][CONDITIONAL_VALIDATOR] = conditionalChangeValidator(this.validationRule.conditionalValidationProps[fieldName]);
      }
    });
  }

  ngOnDestroy() {

  }
}
