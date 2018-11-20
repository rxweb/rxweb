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

    ngAfterContentInit(): void {
       if(this.ngForm){
        this.configureModelValidations();
      }
    }

    private configureModelValidations(){
        this.clearTimeout = window.setTimeout(()=>{
          window.clearTimeout(this.clearTimeout);
          this.ngForm.form["marked"] = true;
          Object.keys(this.ngForm.form.controls).forEach(key=>{
              this.ngForm.form.controls[key].updateValueAndValidity();
          })
          delete this.ngForm.form["marked"];
        },500)
    }

    ngOnDestroy() {

    }
}
