import { ValidatorFn, AsyncValidatorFn } from "@angular/forms"

import { RxFormGroup, RxFormArray, RxFormControl, RxwebValidators } from '@rxweb/reactive-form-validators';
import { DynamicFormConfiguration } from "../models/interface";
import { FormControlConfig } from "./form-control-config";
import { getInstance } from "../functions/get-instance.function";
import { DynamicFormBuildConfig } from '../models/interface/dynamic-form-build-config'
import { ApplicationUtil } from "../util/application-util";

const ARRAY: string = "array";
export class RxDynamicFormBuilder {
    private formConfiguration: DynamicFormConfiguration;
    formGroup(fields: any[], dynamicFormConfig?: DynamicFormConfiguration): DynamicFormBuildConfig {
        this.formConfiguration = dynamicFormConfig || {};
        let entityObject: { [key: string]: any } = {};
        let formFieldConfigs = new Array<FormControlConfig>();
        let modelConfig = {};
        let formGroup = new RxFormGroup({}, entityObject, {}, undefined);
        fields.forEach((x, i) => {
            if (x.type == ARRAY) {
                this.createFormArray(modelConfig, x, ApplicationUtil.getRootFormGroup(formGroup) as RxFormGroup, entityObject);
            } else {
                let splitName = x.name.split('.');
                let name = x.name;
                if (splitName.length > 1) {
                    entityObject[splitName[0]] = {};
                    formGroup.addControl(splitName[0], new RxFormGroup({}, entityObject[splitName[0]], {}, undefined));
                    formGroup = formGroup.controls[splitName[0]] as RxFormGroup;
                    name = splitName[1];
                } else
                    formGroup = ApplicationUtil.getRootFormGroup(formGroup) as RxFormGroup;
                let modelInstance = this.getDynamicModelInstance(x, modelConfig, entityObject, name);
                formGroup.addControl(name, modelInstance.formControl);
                formFieldConfigs.push(modelInstance)
            }
        });
        if (this.formConfiguration.additionalConfig)
            this.formConfiguration.additionalConfig.forEach(t => this.getModelInstance(t, modelConfig));
        this.completeModelConfig(modelConfig);
        return  {
            controlsConfig: modelConfig,
            formGroup: ApplicationUtil.getRootFormGroup(formGroup) as RxFormGroup
        };
    }


    private completeModelConfig(modelConfig:any) {
        for (var column in modelConfig)
            if (Array.isArray(modelConfig[column]))
                modelConfig[column].forEach(x => this.completeModelConfig(x));
            else {
                modelConfig[column].isPlainTextMode = this.formConfiguration  ? this.formConfiguration.isPlainTextMode : false;
                modelConfig[column].complete();
            }
            
    }

    private createFormArray(modelConfig: any, field: { [key: string]: any }, formGroup: RxFormGroup, entityObject: {[key:string]:any}) {
        modelConfig[field.name] = [];
        entityObject[field.name] = [];
        let formArray = new RxFormArray(entityObject[field.name], []);
        
        if (field.controlConfigs) {
            if (field.rows)
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

    private getModelInstance(x,modelConfig) {
        let configModel = (x.modelName) && this.formConfiguration && this.formConfiguration.controlConfigModels ? this.formConfiguration.controlConfigModels.filter((y) => y.modelName == x.modelName)[0] : undefined;
        let modelArguments = [x, modelConfig];
        let model = undefined;
        if (configModel) {
            model = configModel.model;
            if (configModel.arguments)
                configModel.arguments.forEach(t => modelArguments.push(t));
        } else
            model = FormControlConfig;
        let modelInstance = getInstance(model, modelArguments);
        modelConfig[x.name] = modelInstance;
        return modelInstance
    }

    private getDynamicModelInstance(x, modelConfig, entityObject, name) {
        let modelInstance = this.getModelInstance(x, modelConfig);
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
        modelInstance.formControl = new RxFormControl(x.value, validators, asyncValidators, entityObject, baseObject, name, undefined);
        return modelInstance;
    }

    private validatorBindings(validations: any[], validationConfig: any) {
        for (var column in RxwebValidators) {
            if (validationConfig[column]) {
                validations.push(RxwebValidators[column](validationConfig[column]));
            }
        }
        return validations;
    }
}