import { Directive,ContentChildren,QueryList, Input, AfterContentInit,OnDestroy,ElementRef,Renderer } from "@angular/core"
import { FormGroup,AbstractControl } from "@angular/forms";
import { AnnotationTypes } from "../core/validator.static";
import { defaultContainer } from "../core/defaultContainer";
import { BaseDirective } from "./base-directive"
import { Linq } from "../util/linq";
import { DecimalProvider } from "../domain/element-processor/decimal.provider"

import { ApplicationUtil } from '../util/app-util';


@Directive({
    selector: '[formGroup],[rxwebForm]',
})
export class RxwebFormDirective extends BaseDirective implements AfterContentInit, OnDestroy {
    private clearTimeout:number = 0;
    @Input('rxwebForm') ngForm;

    constructor(elementRef: ElementRef,decimalProvider:DecimalProvider,renderer: Renderer,) {
      super(elementRef,decimalProvider,renderer);
    }

    ngAfterContentInit(): void {
      
      if(this.formGroup && !this.formGroup["model"]){
        this.expressionProcessor(this.formGroup.controls);
        super.bindEvents();
      } else if(this.ngModelElements && this.ngModelElements.length > 0){
       if(this.ngForm){
        this.configureModelValidations();
      }
      }
    }

    private configureModelValidations(){
        this.clearTimeout = window.setTimeout(()=>{
          window.clearTimeout(this.clearTimeout);
          this.formGroup = this.ngForm.form;
          let controls = {}
                this.ngModelElements.forEach(t=>{
                      controls[t.name] = {};
                      Object.keys(AnnotationTypes).forEach(validatorName=>{
                        if(t[validatorName])
                          ApplicationUtil.configureControl(controls[t.name],t[validatorName],validatorName);
                      })
                });
                this.expressionProcessor(controls);
                this.bindEvents();
        },500)
    }

    private expressionProcessor(controls:{[key:string]:any}){
      Object.keys(controls).forEach(fieldName => {
                let formControl:any = controls[fieldName];
                if(formControl.validatorConfig){
                  Object.keys(AnnotationTypes).forEach(validatorName=>{
                    if (formControl.validatorConfig[validatorName] && formControl.validatorConfig[validatorName].conditionalExpression) {
                       let columns = Linq.expressionColumns(formControl.validatorConfig[validatorName].conditionalExpression);
                        defaultContainer.addChangeValidation(this.validationRule, fieldName, columns);
                      }
                    if (formControl.validatorConfig[validatorName] && ((validatorName == AnnotationTypes.compare || validatorName == AnnotationTypes.greaterThan || validatorName == AnnotationTypes.greaterThanEqualTo || validatorName == AnnotationTypes.lessThan || validatorName == AnnotationTypes.lessThanEqualTo  || validatorName == AnnotationTypes.different  || validatorName == AnnotationTypes.factor) || (validatorName == AnnotationTypes.creditCard && formControl.validatorConfig[validatorName].fieldName))) {
                        defaultContainer.setConditionalValueProp(this.validationRule, formControl.validatorConfig[validatorName].fieldName, fieldName)
                    }
                  })
              }
          })
    }

    ngOnDestroy() {

    }
}
