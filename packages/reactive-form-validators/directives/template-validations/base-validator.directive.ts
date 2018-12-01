import { Validator,ValidatorFn, AbstractControl,FormControl } from '@angular/forms';
import {INPUT,SELECT,CHECKBOX,TEXTAREA,KEYPRESS, ONCHANGE,ONKEYUP,ONCLICK,
RADIO,FILE, ELEMENT_VALUE,BLUR,FOCUS,CHANGE,BLANK
  } from "../../const";

import { ControlExpressionProcess } from './control-expression-process'


export class BaseValidator extends ControlExpressionProcess implements Validator{

    protected validators:ValidatorFn[];
    protected element: any;
    protected eventName:string;

    protected setEventName() {
      var eventName:string = '';
      switch(this.element.tagName) {
        case INPUT:
        case TEXTAREA:
         eventName = (this.element.type == CHECKBOX || this.element.type == RADIO || this.element.type == FILE) ?  CHANGE : INPUT;
        break;
        case SELECT:
         eventName = CHANGE;
        break;
      }
      this.eventName = eventName.toLowerCase();
    }

  validate(control: AbstractControl): { [key: string]: any } {
    if (control["conditionalValidator"]) {
      this.conditionalValidator = control["conditionalValidator"];
      delete control["conditionalValidator"];
    }
    if (this.conditionalValidator)
      this.conditionalValidator(control);
    if (!this.isProcessed)
      this.setModelConfig(control);
    return  this.validator ? this.validator(control) : null;
    }
}
