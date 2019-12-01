import {ImageConfig} from '../../models/config'
import { APP_VALIDATORS } from "../../const/app-validators.const";
const VALIDATOR_CONFIG = "validatorConfig";

export class ImageFileControlDirective {
    element:any
    isProcessed:boolean = false;

    private imageValidation!:Function;

    get image(): any {
        return this.imageValidation;
    }

    set image(config:any){
      this.imageValidation = APP_VALIDATORS.image(config);
    }

    constructor(private elementRef: any){
        this.element = elementRef.nativeElement as Node;
    }

    setConfig(control:any){
        let image = "image";
        if (!this.image && control[VALIDATOR_CONFIG] && control[VALIDATOR_CONFIG][image])
            this.image = control[VALIDATOR_CONFIG][image];
      this.isProcessed = true;
    }

    validate(control: any): Promise<{[key:string]:any} | null> {
      if(!this.isProcessed)
        this.setConfig(control);
      if(this.imageValidation){
          return this.imageValidation(control,this.element.files);
      }
      return new Promise((resolve, reject) => { resolve(null); })
    }    
}
