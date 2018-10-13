import { FormBuilder,FormGroup,FormArray,FormControl } from "@angular/forms";
import { RxFormControl } from "./form-control";
import { EntityService } from './entity.service';
import { FormGroupExtension } from './form-group';
import { RegexValidator } from '../util/regex-validator'
import { ApplicationUtil } from '../util/app-util'
export class BuilderForm extends FormBuilder {
    private keys:string[]
    private keyIndex : number = -1;
    private baseObject:{[key:string]:any} = {};
    private entityService : EntityService
    private currentFormGroup:FormGroupExtension;
    private objectKeys:string[] = [];
    private entityObject:{[key:string]:any};
    private formControls:any;

    constructor(){
        super();
        this.entityService = new EntityService();
    }

    init(entityObject:{[key:string]:any},formControls:any){
        this.formControls = formControls;
        this.entityObject = entityObject;
        this.keys = Object.keys(formControls)
        this.baseObject = this.entityService.clone(entityObject);
        this.cleanBaseObject();
    }


  group(controlsConfig: any, extra: any): FormGroup {
      this.currentFormGroup = <FormGroupExtension> super.group(controlsConfig, extra);
      this.currentFormGroup.isDirty = this.dirty(this.baseObject,this.objectKeys);
      this.currentFormGroup.resetForm = this.resetForm(this.baseObject,this.objectKeys);
      this.currentFormGroup.getErrorSummary = this.errorSummary();
      this.currentFormGroup["valueChangedSync"] = this.valueChangedSync(this.entityObject);
      return this.currentFormGroup;
    }

  valueChangedSync(entityObject:{[key:string]:string}){
    return function(){
        Object.keys(this.controls).forEach(columnName=>{
            if(!(this.controls[columnName] instanceof FormArray) && !(this.controls[columnName] instanceof FormGroup) && this.controls[columnName].value != entityObject[columnName]) {
                  this.controls[columnName].setValue(entityObject[columnName],{updateChanged:true});
            } else if((this.controls[columnName] instanceof FormArray)){
                for(let formGroup of this.controls[columnName].controls){
                    if(formGroup["valueChangedSync"])
                    formGroup["valueChangedSync"]();
                }
            } else if((this.controls[columnName] instanceof FormGroup)){
                    if(this.controls[columnName]["valueChangedSync"])
                      this.controls[columnName]["valueChangedSync"]();
            }
        })
    }
  }
   
    errorSummary(){
      return function(onlyMessage: boolean ) {
        let jObject : {[key:string]:any}  = {};
        Object.keys(this.controls).forEach(columnName=>{
          if(this.controls[columnName] instanceof FormGroup){
            let error  = this.controls[columnName].getErrorSummary();
            if(Object.keys(error).length > 0)
            jObject[columnName] = error;
          }
          else if(this.controls[columnName] instanceof FormArray)
          {
              let index = 0;
              for(let formGroup of this.controls[columnName].controls){
                let error = formGroup.getErrorSummary();
                if(Object.keys(error).length > 0){
                error.index = index;
                if(!jObject[columnName])
                    jObject[columnName] = [];
                jObject[columnName].push(error);  
              }
              index++;
              }
          }else{
            if(this.controls[columnName].errors){
              let error = this.controls[columnName].errors;
              if(onlyMessage)
              for(let validationName in error)
                jObject[columnName] = error[validationName].message;
              else
                jObject[columnName] = error;
              }
          }
        })
        return jObject;
      }
    }

   

    control(formState:any, validator:any, asyncValidator:any){
        var keyName = this.nextKey()
        return  new RxFormControl(formState, validator, asyncValidator,this.entityObject,this.baseObject,keyName);
    }

    resetForm(baseObject:{[key:string]:any},objectKeys:string[]) {
      return function (): void{
      for(let name in this.controls)
      {
        if(this.controls[name] instanceof FormGroup)
          this.controls[name].resetForm();
        else if(this.controls[name] instanceof FormArray)
          {
              for(let formGroup of this.controls[name].controls){
                formGroup.resetForm();
              }
          }else{
          if (RegexValidator.isNotBlank(baseObject[name]))
            this.controls[name].setValue(baseObject[name]);
          else
            this.controls[name].setValue(undefined);
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
               if(!(this.controls[name] instanceof FormGroup || this.controls[name] instanceof FormArray)){
                 isDirty = ApplicationUtil.notEqualTo(baseObject[name],currentValue);
                }
                  if(isDirty)
                    break;
            }
        if (!isDirty) {
          for (let name of objectKeys) {
            if (this.controls[name] instanceof FormGroup) {
              isDirty = this.controls[name].isDirty();
            }
            else {
              for (let formGroup of this.controls[name].controls) {
                isDirty = formGroup.isDirty();
              }
            }
            if (isDirty)
              break;
          }
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
