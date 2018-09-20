import { FormBuilder,FormGroup,FormArray,FormControl } from "@angular/forms";
import { RxFormControl } from "./form-control";
import { EntityService } from './entity.service';
import { RxFormGroup } from './form-group';
export class BuilderForm extends FormBuilder {
    private keys:string[]
    private keyIndex : number = -1;
    private baseObject:{[key:string]:any} = {};
    private entityService : EntityService
    private currentFormGroup:RxFormGroup;
    private objectKeys:string[] = [];
    constructor(private entityObject:{[key:string]:any},private formControls){
        super();
        this.keys = Object.keys(formControls)
        this.entityService = new EntityService();
        this.baseObject = this.entityService.clone(this.entityObject);
        this.cleanBaseObject();
    }


    group(controlsConfig:any, extra:any) : FormGroup {
      this.currentFormGroup = <RxFormGroup> super.group(controlsConfig, extra);
      this.currentFormGroup.isDirty = this.dirty(this.baseObject,this.objectKeys);
      this.currentFormGroup.resetForm = this.resetForm(this.baseObject,this.objectKeys);
      return this.currentFormGroup;
    }

    
    control(formState:any, validator:any, asyncValidator:any){
        var keyName = this.nextKey()
        return  new RxFormControl(formState, validator, asyncValidator,this.entityObject,this.baseObject,keyName);
    }

    resetForm(baseObject:{[key:string]:any},objectKeys:string[]) {
      return function():void{
      this.reset(baseObject);
      for(var name in objectKeys)
      {
        if(this.controls[name] instanceof FormGroup)
          this.controls[name].resetForm();
        else
          {
              for(let formGroup of this.controls[name].controls){
                formGroup.resetForm();
              }
          }
      }
    }
    }  

    dirty(baseObject:{[key:string]:any},objectKeys:string[]) {
      return function():boolean{
          let otherKeys:string[] = [];
          let valueObject = this.value;
          let isDirty:boolean = false;
          for(let name in this.value)
            {
              let currentValue = this.controls[name].value;
              if(currentValue != null && currentValue != undefined && currentValue  != "" ) {
               if(!(this.controls[name] instanceof FormGroup || this.controls[name] instanceof FormArray)){
                  isDirty = baseObject[name] != currentValue ;
                }
              } else
                isDirty = !((currentValue  == null || currentValue  == undefined || currentValue  == "") && (baseObject[name] == undefined || baseObject[name] == null))
                  if(isDirty)
                    break;
            }

          for(let name of objectKeys) {
            if(otherKeys[name] instanceof FormGroup)
             isDirty = this.controls[name].isDirty();
            else{
              for(let formGroup of this.controls[name].controls){
                isDirty = formGroup.isDirty();
              }
            }
          if(isDirty)
            break; 
          }
          return isDirty;
          }
    }

    private nextKey() {
            if(this.keyIndex == -1)
              this.keyIndex = 0;
            else
              this.keyIndex++;
            var keyName = this.keys[this.keyIndex];
            let control = this.formControls[keyName];
            if ((control instanceof FormControl || control instanceof FormGroup ||
                control instanceof FormArray)) {
                return this.nextKey()
            } else 
                return keyName;
        }


    private cleanBaseObject() {
      Object.keys(this.baseObject).forEach((name)=>  {
        if(Array.isArray(this.baseObject[name]) || typeof this.baseObject[name] == "object"){
            this.objectKeys.push(name);
            delete (this.baseObject[name]);
        }
      })
    }


  
}
