import {Input, Directive ,forwardRef,ElementRef} from '@angular/core';
import {ValidationErrors, AbstractControl, NG_ASYNC_VALIDATORS,AsyncValidator } from '@angular/forms';
import {ImageConfig} from '../../models/config'
import { APP_VALIDATORS } from "../../const/app-validators.const";
const VALIDATOR_CONFIG = "validatorConfig";
@Directive({
    selector: "input[type=file]",
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => ImageFileControlDirective),
        multi: true
    }]
})
export class ImageFileControlDirective implements AsyncValidator  {
    element:any
    isProcessed:boolean = false;

    private imageValidation:Function;

    @Input() set image(config:ImageConfig){
      this.imageValidation = APP_VALIDATORS.image(config);
    }

    constructor(private elementRef: ElementRef){
        this.element = elementRef.nativeElement as Node;
    }

    setConfig(control:AbstractControl){
        let image = "image";
        if(!this[image] && control[VALIDATOR_CONFIG] && control[VALIDATOR_CONFIG][image])
          this[image] = control[VALIDATOR_CONFIG][image];
      this.isProcessed = true;
    }

    validate(control: AbstractControl): Promise<ValidationErrors | null> {
      if(!this.isProcessed)
        this.setConfig(control);
      if(this.imageValidation){
          return this.imageValidation(control,this.element.files);
      }
      return new Promise((resolve, reject) => { resolve(null); })
    }    
}
