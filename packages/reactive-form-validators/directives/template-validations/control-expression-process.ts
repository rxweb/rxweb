import { Input } from "@angular/core";
import {  AbstractControl,FormControl,ValidatorFn } from '@angular/forms';
import { AnnotationTypes } from "../../core/validator.static";
import { defaultContainer } from "../../core/defaultContainer";
import { Linq } from "../../util/linq";
import { conditionalChangeValidator } from '../../reactive-form-validators/conditional-change.validator';

export abstract class ControlExpressionProcess
{

  protected validator: ValidatorFn;
  protected conditionalValidator:ValidatorFn;
  protected controlConfig:{[key:string]:any} = {};
  
  @Input() name:string;

  @Input() formControlName:string;

 isProcessed:boolean = false;
 protected controls:{[key:string]:FormControl};

  private process(control:AbstractControl,name:string){
      let validationRule:any = {};
      let controls = control.parent.controls;
          Object.keys(controls).forEach(fieldName => {
                let formControl:any = controls[fieldName];
                if(formControl.validatorConfig){
                  Object.keys(AnnotationTypes).forEach(validatorName=>{
                    if (formControl.validatorConfig[validatorName] && formControl.validatorConfig[validatorName].conditionalExpression) {
                       let columns = Linq.expressionColumns(formControl.validatorConfig[validatorName].conditionalExpression);
                        defaultContainer.addChangeValidation(validationRule, fieldName, columns);
                      }
                    if (formControl.validatorConfig[validatorName] && ((validatorName == AnnotationTypes.compare || validatorName == AnnotationTypes.greaterThan || validatorName == AnnotationTypes.greaterThanEqualTo || validatorName == AnnotationTypes.lessThan || validatorName == AnnotationTypes.lessThanEqualTo  || validatorName == AnnotationTypes.different  || validatorName == AnnotationTypes.factor) || (validatorName == AnnotationTypes.creditCard && formControl.validatorConfig[validatorName].fieldName))) {
                        defaultContainer.setConditionalValueProp(validationRule, formControl.validatorConfig[validatorName].fieldName, fieldName)
                    }
                  })
              }
          })
        this.isProcessed = true;
        if(!this.conditionalValidator && validationRule.conditionalValidationProps && validationRule.conditionalValidationProps[name])
            this.conditionalValidator = conditionalChangeValidator(validationRule.conditionalValidationProps[name]);
  }

  setModelConfig(control:AbstractControl){
    if(this.controlConfig && this.controlConfig.validatorConfig){
      control["validatorConfig"] = this.controlConfig.validatorConfig;
      this.controlConfig = undefined;
    }
  }

  expressionProcessor(control:AbstractControl){
      this.setModelConfig(control);
      if(this.formControlName){
      if(!this.isProcessed && control.parent && !control.parent["model"]){
          this.process(control,this.formControlName);      
      }
      }else if(!this.isProcessed && this.name && control.parent && control.parent["marked"]){
        this.process(control,this.name);      
      }
    }
}
