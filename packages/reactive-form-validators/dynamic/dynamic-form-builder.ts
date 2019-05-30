import { ValidatorFn, AsyncValidatorFn } from "@angular/forms"

import { RxFormGroup } from '../services/rx-form-group';
import { RxFormArray } from '../services/rx-form-array';
import { RxFormControl } from '../services/form-control';
import { DynamicFormConfiguration } from "../models";
import { FormControlConfig } from "./";
import { getInstance } from "../util/instance-provider.function";
import { DynamicFormBuildConfig } from '../models/config/dynamic-form-build-config'
import { defaultContainer } from "../core/defaultContainer";
import { ApplicationUtil } from "../util/app-util"
const ARRAY: string = "array";
export class DynamicFormBuilder {
    constructor(private validatorBindings: Function, private formConfiguration: DynamicFormConfiguration) {}

    dynamicFormGroup(fields: any[], formConfiguration: DynamicFormConfiguration): DynamicFormBuildConfig {
        let formControls: { [key: string]: any } = {};
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

    private getDynamicModelInstance(x, modelConfig, entityObject, name) {
        let modelName = x.modelName || '';
        let configModel = (x.modelName) && this.formConfiguration && this.formConfiguration.fieldConfigModels ? this.formConfiguration.fieldConfigModels.filter((y) => y.modelName == x.modelName)[0] : undefined;
        let modelArguments = [x, modelConfig];
        let model = undefined;
        if ((x.modelName && configModel && !configModel.model) || (x.modelName && (!this.formConfiguration || !this.formConfiguration.fieldConfigModels))) {
            let actionContainer = defaultContainer.getActionContainer(x.modelName);
            if (actionContainer)
                model = actionContainer.instance;
        } else if (configModel) {
            model = configModel.model;
            if (configModel.arguments)
                configModel.arguments.forEach(t => modelArguments.push(t));
        } else
            model = FormControlConfig;
        let modelInstance = getInstance(model, modelArguments);
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