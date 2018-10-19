import { Directive, Input, AfterContentInit,OnDestroy,ElementRef } from "@angular/core"
import { FormGroup } from "@angular/forms";
import { AnnotationTypes } from "../core/validator.static";
import { defaultContainer } from "../core/defaultContainer";
import { BaseDirective } from "./base-directive"
import { Linq } from "../util/linq";

@Directive({
    selector: '[formGroup]',
})
export class RxwebFormDirective extends BaseDirective implements AfterContentInit, OnDestroy {
    
    
    constructor(elementRef: ElementRef) {
      super(elementRef);
    }

    @Input() formGroup: FormGroup;

    ngAfterContentInit(): void {
      if(this.formGroup && !this.formGroup["model"]){
        Object.keys(this.formGroup.controls).forEach(fieldName => {
              let formControl:any = this.formGroup.controls[fieldName];
              if(formControl.config){
                  if (formControl.config && formControl.config.conditionalExpression) {
                     let columns = Linq.expressionColumns(formControl.config.conditionalExpression);
                      defaultContainer.addChangeValidation(this.validationRule, fieldName, columns);
                    }
                  if (formControl.config && ((formControl.type == AnnotationTypes.compare || formControl.type == AnnotationTypes.greaterThan || formControl.type == AnnotationTypes.greaterThanEqualTo || formControl.type == AnnotationTypes.lessThan || formControl.type == AnnotationTypes.lessThanEqualTo  || formControl.type == AnnotationTypes.different  || formControl.type == AnnotationTypes.factor) || (formControl.type == AnnotationTypes.creditCard && formControl.config.fieldName))) {
                      defaultContainer.setConditionalValueProp(this.validationRule, formControl.config.fieldName, fieldName)
                  }
            }
        })
        super.bindEvents();
      }
    }

    ngOnDestroy() {

    }
}
