import { ValidatorFn, AsyncValidatorFn } from "@angular/forms"

import { RxFormGroup } from '../services/rx-form-group';
import { RxFormArray } from '../services/rx-form-array';
import { RxFormControl } from '../services/form-control';
import { DynamicFormConfiguration } from "../models";
import { FormControlConfig } from "./";
import { getInstance } from "../util/instance-provider.function";
const ARRAY: string = "array";
export class DynamicFormBuilder {
    constructor(private validatorBindings: Function, private formConfiguration: DynamicFormConfiguration) {}

    dynamicFormGroup(fields: any[], formConfiguration: DynamicFormConfiguration) {
        let formControls: { [key: string]: any } = {};
        let entityObject: { [key: string]: any } = {};
        let formFieldConfigs = new Array<FormControlConfig>();
        let modelConfig = {};
        let formGroup = new RxFormGroup({}, entityObject, {}, undefined);
        fields.forEach((x, i) => {
            if (x.type == ARRAY) {
                this.createFormArray(modelConfig, x, formGroup, entityObject);
            } else {
                let splitName = x.name.split('.');
                let name = x.name;
                if (splitName.length > 1) {
                    entityObject[splitName[0]] = {};
                    formGroup.addControl(splitName[0], new RxFormGroup({}, entityObject[splitName[0]], {}, undefined));
                    formGroup = formGroup.controls[splitName[0]] as RxFormGroup;
                    name = splitName[1];
                } else
                    formGroup = formGroup.parent != null ? formGroup.parent as RxFormGroup : formGroup;
                let modelInstance = this.getDynamicModelInstance(x, modelConfig, entityObject, name);
                formGroup.addControl(name, modelInstance.formControl);
                formFieldConfigs.push(modelInstance)
            }
        });
        this.completeModelConfig(modelConfig);
        return {
            controlsConfig: modelConfig,
            formGroup: formGroup
        };
    }


    private completeModelConfig(modelConfig:any) {
        for (var column in modelConfig)
            if (Array.isArray(modelConfig[column]))
                modelConfig[column].forEach(x => this.completeModelConfig(x));
            else {
                modelConfig[column].isPlainTextMode = this.formConfiguration.isPlainTextMode;
                modelConfig[column].complete();
            }
            
    }

    private createFormArray(modelConfig: any, field: { [key: string]: any }, formGroup: RxFormGroup, entityObject: {[key:string]:any}) {
        modelConfig[field.name] = [];
        entityObject[field.name] = [];
        let formArray = new RxFormArray(entityObject[field.name], []);
        
        if (field.controlConfigs) {
            field.rows.forEach(row => {
                formArray.controls.push(this.createDynamicFormGroup(field, modelConfig[field.name], this.getRefObject(entityObject[field.name]), row));
            })
            if (field.minimumRepeatCount && field.minimumRepeatCount > 0) {
                let countLeft = field.minimumRepeatCount - (formArray.controls.length)
                for (var i = 0; i < countLeft; i++)
                    formArray.controls.push(this.createDynamicFormGroup(field, modelConfig[field.name], this.getRefObject(entityObject[field.name]), { fields: [] }));
            }
            this.addTwoProp(modelConfig[field.name], field, entityObject[field.name], formArray);
            formGroup.addControl(field.name, formArray);
        }
    }

    private getRefObject(entityObject:any[]) {
        let jObject = {};
        entityObject.push(jObject);
        return jObject;
    }


    private addTwoProp(modelConfig: any, x, entityObject, formArray) {
        modelConfig.__proto__.addItem = () => {
            formArray.controls.push(this.createDynamicFormGroup(x, modelConfig, this.getRefObject(entityObject), { fields: [] }));
        }

        modelConfig.__proto__.removeItem = (index: number) => {
            formArray.removeAt(index);
            modelConfig.splice(index, 1);
        }
    }

    private createDynamicFormGroup(x, modelConfig, entityObject, row) {
        let nestedFormGroup = new RxFormGroup({}, entityObject, {}, undefined);
        let jObject = {};
        modelConfig.push(jObject);
        Object.keys(x.controlConfigs).forEach(key => {
            let field = row.fields.filter(x => x.name == key)[0];
            let formControlConfig = { ...x.controlConfigs[key], ...{ name: key } };
            if (field)
                formControlConfig = { ...formControlConfig, ...field };
            let modelInstance = this.getDynamicModelInstance(formControlConfig, jObject, entityObject, key);
            nestedFormGroup.addControl(key, modelInstance.formControl);
        })
        return nestedFormGroup;
    }

    private getDynamicModelInstance(x, modelConfig, entityObject, name) {
        let modelName = x.modelName ? x.modelName : "default";
        let configModel = this.formConfiguration.fieldConfigModels.filter((x) => x.modelName == modelName)[0];
        let modelInstance = getInstance(configModel.model, [x, modelConfig]);
        modelConfig[x.name] = modelInstance;
        let validators: ValidatorFn[] = [];
        let asyncValidators: AsyncValidatorFn[] = [];
        if (x.validators)
            this.validatorBindings(validators, x.validators);
        if (modelInstance.validator)
            validators.push(modelInstance.validator.bind(modelInstance));
        if (modelInstance.asyncValidator)
            asyncValidators.push(modelInstance.asyncValidator.bind(modelInstance));
        if (modelInstance)
            entityObject[x.name] = x.value;
        let baseObject = {};
        baseObject[x.name] = x.value;
        entityObject[x.name] = x.value;
        modelInstance.formControl = new RxFormControl(x.value, validators, asyncValidators, entityObject, baseObject, name, undefined, modelInstance);
        return modelInstance;
    }
}