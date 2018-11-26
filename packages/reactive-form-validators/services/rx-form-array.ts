import { FormArray } from "@angular/forms";


export class RxFormArray extends FormArray {

      constructor(private arrayObject:any[],controls, validatorOrOpts?:any, asyncValidator?:any){
        super(controls, validatorOrOpts, asyncValidator);
      }

      push(control:any){
       let formGroup:any = this.root;
       if(this.arrayObject)
            if(control.modelInstance)
                this.arrayObject.push(control.modelInstance);
        super.push(control);
        if(formGroup["valueChangedSync"])
          formGroup.valueChangedSync()  
      }

      removeAt(index:number){
        let formGroup:any = this.root;
        this.arrayObject.splice(index,1);
        super.removeAt(index);
        if(formGroup["valueChangedSync"])
          formGroup.valueChangedSync()  
      }
}
