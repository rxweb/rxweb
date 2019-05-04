import { FormArray } from "@angular/forms";
import { VALUE_CHANGED_SYNC,PATCH } from "../const/app.const";


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
        if(formGroup[VALUE_CHANGED_SYNC])
          formGroup.valueChangedSync()  
      }

      patch() {
          if (this.parent)
              this.parent[PATCH]();
      }



      removeAt(index:number){
        let formGroup:any = this.root;
        this.arrayObject.splice(index,1);
        super.removeAt(index);
        if(formGroup[VALUE_CHANGED_SYNC])
          formGroup.valueChangedSync()  
      }
}
