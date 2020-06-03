import { FormGroup,AbstractControl } from "@angular/forms"
import { defaultContainer } from "../core/defaultContainer";
import { InstanceContainer } from "../core/validator.interface";
import { OBJECT_PROPERTY } from "../const/validator.const"
import { ApplicationUtil } from "../util/app-util";
import { RXCODE, MODEL_INSTANCE } from "../const/app.const";
import { instanceProvider } from "../util/instance-provider.function"

export class DisableProvider{
    
    constructor(private decoratorType: string, private entityObject: {[key:string]:any}){

    }

    

    getFormGroupName(currentFormGroup:FormGroup) {
        let keyName = '';
        if (currentFormGroup.parent)
        for (var controlName of Object.keys(currentFormGroup.parent.controls))
            if (currentFormGroup.parent.controls[controlName] == currentFormGroup) {
                keyName = controlName;
                break;
            }
        return keyName;
    }

    zeroArgumentProcess(control:AbstractControl,columnName:string){
        let disabledColumns = [];    
        this.getDisabledColumns(<FormGroup>control.parent,`${columnName}${RXCODE}0`,false).forEach(t=>disabledColumns.push(t));
        let path = this.topControlPath(control,columnName);
        let splitPath = path.split(".");
        if(splitPath.length > 1){
            let rootFormGroup = ApplicationUtil.getRootFormGroup(control);
            this.getDisabledColumns(rootFormGroup,`${path}${RXCODE}0`,true).forEach(t=>disabledColumns.push(t));
            let controlPath:string = '';
            for(var i=0;i<splitPath.length -2;i++){
                let controlName = splitPath[i];
                controlPath =`${path.replace(`${controlName}.`,'')}${RXCODE}-0`
                if(rootFormGroup.controls[controlName]){
                    this.getDisabledColumns(<FormGroup>rootFormGroup.controls[controlName],controlPath,true,controlName).forEach(t=>disabledColumns.push(t));
                    rootFormGroup = <FormGroup>rootFormGroup.controls[controlName];
                }
            }
        }
        return disabledColumns;
    }

    private getDisabledColumns(formGroup:FormGroup,columnName:string,isRoot:Boolean,pathName:string = ""){
        if(formGroup[MODEL_INSTANCE]){
            let instanceContainer = instanceProvider(formGroup[MODEL_INSTANCE].constructor,this.entityObject);
            return this.getChangeDetectionColumns(instanceContainer,columnName,isRoot,pathName)
        }return [];
    }

    private getChangeDetectionColumns(instanceContainer:InstanceContainer,columnName:string,isRoot:Boolean,pathName:string = ""){
        let conditionalDisableControls = [];
        let columns = instanceContainer.nonValidationDecorators[this.decoratorType].changeDetection[columnName]
        if(columns){
            columns.forEach(t=>{
                conditionalDisableControls.push({controlPath:pathName ? `${pathName}.${t}`: t,conditionalExpression:instanceContainer.nonValidationDecorators[this.decoratorType].conditionalExpressions[t],isRoot:isRoot})
            })
        }
        return conditionalDisableControls;
    }

    private topControlPath(control:AbstractControl | FormGroup,columnName:string){
        if(control.parent)
            {
                let name = this.getFormGroupName((<FormGroup>control.parent))
                if(name)
                {
                    columnName = `${name}.${columnName}`
                    return this.topControlPath(control.parent,columnName)
                }
            }
            return columnName;
    }

    childControlDisabledExpression(formGroup:FormGroup,columnName:string,path:string = "") :any[] {
        let disabledColumns = [];
        if(formGroup[MODEL_INSTANCE]){
            let instanceContainer = defaultContainer.get(formGroup[MODEL_INSTANCE].constructor);
            if(instanceContainer){
                this.getChangeDetectionColumns(instanceContainer,columnName,true,path).forEach(t=>disabledColumns.push(t));
                var props = instanceContainer.properties.filter(t => t.propertyType == OBJECT_PROPERTY)
            props.forEach(t => {
                if(formGroup.controls[t.name]){
                    let columns = this.getDisabledColumns(<FormGroup>formGroup.controls[t.name],columnName,true,path ? `${path}.${t.name}` :`${t.name}` )
                    columns.forEach(x=>disabledColumns.push(x));
                    this.childControlDisabledExpression((<FormGroup>formGroup.controls[t.name]),columnName,path ? `${path}.${t.name}` :`${t.name}`).forEach(y=>disabledColumns.push(y))
                }
            })
            }
        }
        return disabledColumns;
    }

    oneArgumentProcess(control:AbstractControl | FormGroup,columnName:string):any[]{
        let path = this.topControlPath(control,columnName);
        let rootFormGroup = ApplicationUtil.getRootFormGroup(control);
        let childColumns = this.childControlDisabledExpression(rootFormGroup,path);
        return childColumns;
    }
}