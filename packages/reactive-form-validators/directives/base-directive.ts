import {Input, ElementRef } from "@angular/core"
import { FormGroup  } from "@angular/forms"
import {INPUT,SELECT,CHECKBOX,TEXTAREA,KEYPRESS, ONCHANGE,ONKEYUP,ONCLICK,
RADIO,FILE
  } from "../const";
export abstract class BaseDirective {
    element:HTMLElement;
    htmlElements:string[] = ["input","select","textarea"]
    validationRule:any = {};

    @Input() formGroup: FormGroup;

    constructor(private elementRef: ElementRef){
      this.element = this.elementRef.nativeElement;
    }

    bindEvents():void {
      if(this.validationRule && this.validationRule.conditionalValidationProps){
                for(var columnName in this.validationRule.conditionalValidationProps){
                      let controlElement = this.getControl(columnName);
                      if(controlElement && controlElement.length > 0)
                        controlElement[0][this.getEventName(controlElement[0])] = this.validationChange(this.validationRule.conditionalValidationProps[columnName],this.formGroup);
                }      
      }
    }

    getEventName(element:any){
      var eventName:string = '';
      switch(element.tagName){
        case INPUT:
        case TEXTAREA:
         eventName = (element.type == CHECKBOX || element.type == RADIO || element.type == FILE) ?  ONCHANGE : ONKEYUP;
        break;
        case SELECT:
         eventName = ONCHANGE;
        break;
      }
      return eventName;
    }

    getControl(name:string) {
      var element = null;
      for(var i=0;i<this.htmlElements.length;i++) {
          element = this.element.querySelectorAll(`${this.htmlElements[i]}[formControlName='${name}']`);
          if(element)
            break;
      }
      return element;
    }

    validationChange(props:string[],formGroup:FormGroup) {
      return () =>{
        props.forEach((name:string) => {
            if(formGroup.controls[name])
              formGroup.controls[name].updateValueAndValidity();
        })
      }
    }
}
