import { Directive, ContentChildren, QueryList, Input, AfterContentInit, OnDestroy, ElementRef, Renderer } from "@angular/core"
import { FormGroup, AbstractControl } from "@angular/forms";
import { AnnotationTypes } from "../core/validator.static";
import { defaultContainer } from "../core/defaultContainer";
import { BaseDirective } from "./base-directive"
import { Linq } from "../util/linq";
import { conditionalChangeValidator } from '../reactive-form-validators/conditional-change.validator';
import { DecimalProvider } from "../domain/element-processor/decimal.provider"

import { ApplicationUtil } from '../util/app-util';


@Directive({
  selector: '[formGroup],[rxwebForm]',
})
export class RxwebFormDirective extends BaseDirective implements AfterContentInit, OnDestroy {
  private clearTimeout: number = 0;
  private validationRule: any = {};
  @Input() formGroup: FormGroup;
  @Input('rxwebForm') ngForm;

  ngAfterContentInit(): void {
    if (this.formGroup && !this.formGroup["model"]) {
      this.expressionProcessor(this.formGroup.controls);
      this.setConditionalValidator(this.formGroup.controls)
    } else if (this.ngForm) {
      this.configureModelValidations();
    }
  }

  private configureModelValidations() {
    this.clearTimeout = window.setTimeout(() => {
      window.clearTimeout(this.clearTimeout);
      this.expressionProcessor(this.ngForm.form.controls);
      this.setConditionalValidator(this.ngForm.form.controls)
      Object.keys(this.ngForm.form.controls).forEach(key => {
        this.ngForm.form.controls[key].updateValueAndValidity();
      })
    }, 500)
  }

  private expressionProcessor(controls: { [key: string]: any }) {
    Object.keys(controls).forEach(fieldName => {
      let formControl: any = controls[fieldName];
      if (formControl.validatorConfig) {
        Object.keys(AnnotationTypes).forEach(validatorName => {
          if (formControl.validatorConfig[validatorName] && formControl.validatorConfig[validatorName].conditionalExpression) {
            let columns = Linq.expressionColumns(formControl.validatorConfig[validatorName].conditionalExpression);
            defaultContainer.addChangeValidation(this.validationRule, fieldName, columns);
          }
          if (formControl.validatorConfig[validatorName] && ((validatorName == AnnotationTypes.compare || validatorName == AnnotationTypes.greaterThan || validatorName == AnnotationTypes.greaterThanEqualTo || validatorName == AnnotationTypes.lessThan || validatorName == AnnotationTypes.lessThanEqualTo || validatorName == AnnotationTypes.different || validatorName == AnnotationTypes.factor) || (validatorName == AnnotationTypes.creditCard && formControl.validatorConfig[validatorName].fieldName) || ((validatorName == AnnotationTypes.minDate || validatorName == AnnotationTypes.maxDate) && formControl.validatorConfig[validatorName].fieldName))) {
            defaultContainer.setConditionalValueProp(this.validationRule, formControl.validatorConfig[validatorName].fieldName, fieldName)
          }
        })
      }
    })
  }

  private setConditionalValidator(controls) {
    Object.keys(controls).forEach(fieldName => {
      if (this.validationRule.conditionalValidationProps && this.validationRule.conditionalValidationProps[fieldName]) {
        controls[fieldName]["conditionalValidator"] = conditionalChangeValidator(this.validationRule.conditionalValidationProps[fieldName]);
      }
    });
  }

  ngOnDestroy() {

  }
}
