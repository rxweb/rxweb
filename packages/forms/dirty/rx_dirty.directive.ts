import { Directive, forwardRef, ElementRef, Renderer, OnChanges, Input, HostListener, AfterViewInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from "@angular/forms";
import { DecimalPipe } from "@angular/common";

import { ELEMENT_VALUE, BLUR_EVENT, FOCUS_EVENT, TARGET_ELEMENT_VALUE, BLANK_STRING, KEYUP_EVENT } from "../../util/constants/constants";
import { ApplicationConfiguration } from "../../core";
import { RegularExpression } from "../../core/regularexpression";


@Directive({
  selector: '[rxDirty]',
})
export class RxDirtyDirective  {

  @Input('rxDirty') set formObject(value: { [key: string]: any }) {
    if (value) {
      this.currentObject = value;
      this.afterViewInit();
    }
    
  }
  currentObject: { [key: string]: any };
  formValue: { [key: string]: any }

  currentValue: { [key: string]: any }

  constructor() {
  }


  afterViewInit(): void {
    var t = setTimeout(() => {
      this.formValue = Object.assign({}, this.currentObject.formGroup.value);
      this.currentObject.formGroup.valueChanges.subscribe(t => {
        this.currentValue = Object.assign({}, this.currentObject.formGroup.value);
        this.currentObject.isDirty = this.isDirty(this.formValue, this.currentValue);
      })
    }, 500);
  }

  isDirty(valueObject: { [key: string]: any }, newObject: { [key: string]: any }): boolean {
    let jObject = {};
    let isDirty: boolean = false;
    for (var col in valueObject) {
      if (!Array.isArray(valueObject[col])) {
        isDirty = !(newObject[col] == valueObject[col]);
      } else if (Array.isArray(valueObject[col])) {
        isDirty = this.jsonArray(valueObject[col], newObject[col]);
      } else if (this.isObject(valueObject[col])) {
        isDirty = this.jsonObject(valueObject[col], newObject[col]);
      }
      if (isDirty)
        break;
    }
    return isDirty;
  }
  isObject(obj): boolean {
    return (typeof obj === "object" && obj !== null) || typeof obj === "function";
  }
  jsonObject(jObject,currentObject): boolean {
    var json = {};
    let isDirty: boolean = false;
    for (var col in jObject) {
      isDirty = !(currentObject[col] == jObject[col]);
      if (isDirty)
        break;
    }
    return isDirty;
  }
  jsonArray(jArray, currentArray) {
    let isDirty: boolean = false;
    for (var i = 0; i < jArray.length; i++) {
      for (var col in jArray[i]) {
        if (this.isObject(jArray[i][col])) {
          isDirty = this.jsonObject(jArray[i][col], currentArray[i][col]);
        } else {
          isDirty = !(currentArray[i][col] = jArray[i][col]);
        }
        if (isDirty)
          break;
      }
      if (isDirty)
        break;
    }
    return isDirty;
  }

}
