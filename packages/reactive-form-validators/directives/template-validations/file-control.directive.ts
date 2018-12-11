import {Input, Directive ,forwardRef,ElementRef} from '@angular/core';
import { AbstractControl, NG_VALIDATORS,Validator,ValidatorFn } from '@angular/forms';
import {ExtensionConfig,SizeConfig,FileConfig} from '../../models/config'
import { APP_VALIDATORS } from "../../const/app-validators.const";
const VALIDATOR_CONFIG = "validatorConfig";
const FILE_VALIDATOR_NAMES:string[] = ["extension","fileSize","file"];
@Directive({
    selector: "input[type=file]",
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => FileControlDirective),
        multi: true
    }]
})
export class FileControlDirective implements Validator {
    files:any;
    element:any
    isProcessed:boolean = false;
    private validators:Function[] = [];

    @Input() set extension(config:ExtensionConfig){
      this.pushValidator(FILE_VALIDATOR_NAMES[0],config)
    }
    @Input() set fileSize(config:SizeConfig){
      this.pushValidator(FILE_VALIDATOR_NAMES[1],config)
    }

    @Input() set file(config:FileConfig){
      this.pushValidator(FILE_VALIDATOR_NAMES[2],config)
    }

    

    constructor(private elementRef: ElementRef){
        this.element = elementRef.nativeElement as Node;
    }

    setConfig(control:AbstractControl){
      FILE_VALIDATOR_NAMES.forEach(t=>{
        if(!this[t] && control[VALIDATOR_CONFIG] && control[VALIDATOR_CONFIG][t])
          this[t] = control[VALIDATOR_CONFIG][t];
      })
      this.isProcessed = true;
    }

    pushValidator(validatorName:string,config:ExtensionConfig | SizeConfig | FileConfig){
      if(config)
        this.validators.push(APP_VALIDATORS[validatorName](config))
    }
    
    validate(control: AbstractControl): { [key: string]: any } {
      if(!this.isProcessed)
        this.setConfig(control);
      var result = null;
      for(var validator of this.validators){
          result = validator(control,this.element.files);
          if(result)
            break;
      }
      return result
    }    
}
