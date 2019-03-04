import { FormGroup,FormArray,FormControl ,AbstractControl,ValidatorFn,AsyncValidatorFn } from "@angular/forms";
import { RxFormControl } from "./form-control";
import { EntityService } from './entity.service';
import { RegexValidator } from '../util/regex-validator';
import { ApplicationUtil } from '../util/app-util';
import { RxFormArray } from './rx-form-array';
import { FormDataProvider } from "../domain/form-data";


export class RxFormGroup extends FormGroup  {
    private baseObject:{ [key:string] : any}
    private entityService: EntityService;
    private formDataProvider: FormDataProvider;
    constructor(private model:any,private entityObject:{[key:string]:any},controls: {
        [key: string]: AbstractControl;
    }, validatorOrOpts?: any, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null){
      super(controls,validatorOrOpts,asyncValidator);
      this.baseObject = Object.assign({}, this.entityObject)
        this.entityService = new EntityService();
        this.formDataProvider = new FormDataProvider();
    }

    isDirty():boolean {
          let isDirty:boolean = false;
          for(let name in this.value)
          {
              let currentValue = this.modelInstance[name];
               if(!(this.controls[name] instanceof FormGroup || this.controls[name] instanceof FormArray)){
                 isDirty = ApplicationUtil.notEqualTo(this.baseObject[name],currentValue);
                }else if (this.controls[name] instanceof RxFormGroup)
                  isDirty = (<RxFormGroup>this.controls[name]).isDirty();
                 else if(this.controls[name] instanceof FormArray){
                      for (let formGroup of (<FormArray>this.controls[name]).controls) {
                            isDirty = (<RxFormGroup>formGroup).isDirty();
                      }
                 }
                  if(isDirty)
                    break;
          }
          return isDirty;
    };

    resetForm() : void {
        for(let name in this.controls)
      {
        if(this.controls[name] instanceof RxFormGroup)
          (<RxFormGroup>this.controls[name]).resetForm();
        else if(this.controls[name] instanceof FormArray)
          {
              for(let formGroup of (<FormArray>this.controls[name]).controls){
                (<RxFormGroup>formGroup).resetForm();
              }
          }else{
          if (RegexValidator.isNotBlank(this.baseObject[name]))
            this.controls[name].setValue(this.baseObject[name]);
          else
            this.controls[name].setValue(undefined);
          }
      }
    }


    patchModelValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        }): void {
        if (value) {
            for (let name in this.controls) {
                if (this.controls instanceof RxFormGroup && value[name])
                    (<RxFormGroup>this.controls[name]).patchModelValue(value[name],options);
                else if (this.controls[name] instanceof FormArray && Array.isArray(value[name])) {
                    let index = 0;
                    for (let formGroup of (<FormArray>this.controls[name]).controls) {
                        if (value[name][index])
                            (<RxFormGroup>formGroup).patchModelValue(value[name][index], options);
                        index = index + 1;
                    }
                } else 
                    if (value[name] !== undefined)
                        this.controls[name].patchValue(value[name],options);
            }
        }
    }


    getErrorSummary(onlyMessage:boolean) : { [key:string] : any }{
      let jObject : {[key:string]:any}  = {};
        Object.keys(this.controls).forEach(columnName=>{
          if(this.controls[columnName] instanceof FormGroup){
            let error  = (<RxFormGroup>this.controls[columnName]).getErrorSummary(false);
            if(Object.keys(error).length > 0)
            jObject[columnName] = error;
          }
          else if(this.controls[columnName] instanceof FormArray)
          {
              let index = 0;
              for(let formGroup of (<FormArray>this.controls[columnName]).controls){
                let error = (<RxFormGroup>formGroup).getErrorSummary(false);
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

    valueChangedSync(){
        Object.keys(this.controls).forEach(columnName=>{
            if(!(this.controls[columnName] instanceof FormArray || this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof FormGroup || this.controls[columnName] instanceof RxFormGroup) && !(this.entityObject[columnName] instanceof FormControl || this.entityObject[columnName] instanceof RxFormControl) && ApplicationUtil.notEqualTo((<RxFormControl>this.controls[columnName]).getControlValue() , this.entityObject[columnName])) {
                  this.controls[columnName].setValue(this.entityObject[columnName],{updateChanged:true});
            } else if((this.controls[columnName] instanceof FormArray || this.controls[columnName] instanceof RxFormArray)){
                for(let formGroup of (<FormArray>this.controls[columnName]).controls){
                    (<RxFormGroup>formGroup).valueChangedSync();
                }
            } else if((this.controls[columnName] instanceof RxFormGroup)){
                      (<RxFormGroup>this.controls[columnName]).valueChangedSync();
            }
        })
    }

    refreshDisable(){
      Object.keys(this.controls).forEach(columnName=>{
        if(!(this.controls[columnName] instanceof FormArray || this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof FormGroup || this.controls[columnName] instanceof RxFormGroup)) {
              (<RxFormControl>this.controls[columnName]).refresh();
        } else if((this.controls[columnName] instanceof RxFormGroup)){
                  (<RxFormGroup>this.controls[columnName]).refreshDisable();
        }
    })

    }

    bindErrorMessages(){
      Object.keys(this.controls).forEach(columnName=>{
        if(!(this.controls[columnName] instanceof FormArray || this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof FormGroup || this.controls[columnName] instanceof RxFormGroup)) {
              (<RxFormControl>this.controls[columnName]).bindError();
        } else if((this.controls[columnName] instanceof RxFormGroup)){
                  (<RxFormGroup>this.controls[columnName]).bindErrorMessages();
        }
    })
    }
    
    get modelInstanceValue() {
          return this.entityService.clone(this.entityObject);
    }

    get modelInstance(){
      return this.entityObject;
    }

    get controlsError() : { [key: string]: any } {
        return this.getErrorSummary(true);
    }

    toFormData(): FormData {
        return this.formDataProvider.convertToFormData(this.value);
    }
}
