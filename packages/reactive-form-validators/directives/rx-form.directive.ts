import { Directive, Input, AfterContentInit,OnDestroy,ElementRef } from "@angular/core"
import { FormGroup } from "@angular/forms";
import { AnnotationTypes } from "../core/validator.static";
import { defaultContainer } from "../core/defaultContainer";

@Directive({
    selector: '[formValidator]',
})
export class RxwebFormDirective implements AfterContentInit, OnDestroy {
    element:HTMLElement;
    
    constructor(private elementRef: ElementRef) {
      this.element = this.elementRef.nativeElement;
    }

    @Input() formGroup: FormGroup;

    validationRule:any = {};

isPassed : boolean  = false;
    ngAfterContentInit(): void {
      if(this.formGroup){
        Object.keys(this.formGroup.controls).forEach(fieldName => {
              let formControl:any = this.formGroup.controls[fieldName];
              if(formControl.config){
                  if (formControl.config && (formControl.type == AnnotationTypes.compare || formControl.type == AnnotationTypes.greaterThan || formControl.type == AnnotationTypes.greaterThanEqualTo || formControl.type == AnnotationTypes.lessThan || formControl.type == AnnotationTypes.lessThanEqualTo  || formControl.type == AnnotationTypes.different  || formControl.type == AnnotationTypes.factor)) {
                      var x = this.element.querySelectorAll("input[formControlName='password']")
console.log(x)
                      if(x[0]){
                        x[0].onkeyup = ()=>{
            for(var col in this.validationRule.conditionalValidationProps){
                for(var i=0;i<this.validationRule.conditionalValidationProps[col].length; i++){
                        this.formGroup.controls[this.validationRule.conditionalValidationProps[col][i]].updateValueAndValidity();
                }
            }

                        }
                      }
                      defaultContainer.setConditionalValueProp(this.validationRule, formControl.config.fieldName, fieldName)
                  }
            }
        })
      }
    }

    ngOnDestroy() {

    }
}
