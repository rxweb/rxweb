import { RxFormGroup, RxFormArray, RxFormControl, RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormControlConfig } from './form-control-config';
import { getInstance } from '../functions/get-instance.function';
import { ApplicationUtil } from '../util/application-util';
const /** @type {?} */ ARRAY = "array";
export class RxDynamicFormBuilder {
    /**
     * @param {?} fields
     * @param {?} dynamicFormConfig
     * @return {?}
     */
    formGroup(fields, dynamicFormConfig) {
        this.formConfiguration = dynamicFormConfig;
        let /** @type {?} */ entityObject = {};
        let /** @type {?} */ formFieldConfigs = new Array();
        let /** @type {?} */ modelConfig = {};
        let /** @type {?} */ formGroup = new RxFormGroup({}, entityObject, {}, undefined);
        fields.forEach((x, i) => {
            if (x.type == ARRAY) {
                this.createFormArray(modelConfig, x, /** @type {?} */ (ApplicationUtil.getRootFormGroup(formGroup)), entityObject);
            }
            else {
                let /** @type {?} */ splitName = x.name.split('.');
                let /** @type {?} */ name = x.name;
                if (splitName.length > 1) {
                    entityObject[splitName[0]] = {};
                    formGroup.addControl(splitName[0], new RxFormGroup({}, entityObject[splitName[0]], {}, undefined));
                    formGroup = /** @type {?} */ (formGroup.controls[splitName[0]]);
                    name = splitName[1];
                }
                else
                    formGroup = /** @type {?} */ (ApplicationUtil.getRootFormGroup(formGroup));
                let /** @type {?} */ modelInstance = this.getDynamicModelInstance(x, modelConfig, entityObject, name);
                formGroup.addControl(name, modelInstance.formControl);
                formFieldConfigs.push(modelInstance);
            }
        });
        if (this.formConfiguration.additionalConfig)
            this.formConfiguration.additionalConfig.forEach(t => this.getModelInstance(t, modelConfig));
        this.completeModelConfig(modelConfig);
        return {
            controlsConfig: modelConfig,
            formGroup: /** @type {?} */ (ApplicationUtil.getRootFormGroup(formGroup))
        };
    }
    /**
     * @param {?} modelConfig
     * @return {?}
     */
    completeModelConfig(modelConfig) {
        for (var /** @type {?} */ column in modelConfig)
            if (Array.isArray(modelConfig[column]))
                modelConfig[column].forEach(x => this.completeModelConfig(x));
            else {
                modelConfig[column].isPlainTextMode = this.formConfiguration ? this.formConfiguration.isPlainTextMode : false;
                modelConfig[column].complete();
            }
    }
    /**
     * @param {?} modelConfig
     * @param {?} field
     * @param {?} formGroup
     * @param {?} entityObject
     * @return {?}
     */
    createFormArray(modelConfig, field, formGroup, entityObject) {
        modelConfig[field.name] = [];
        entityObject[field.name] = [];
        let /** @type {?} */ formArray = new RxFormArray(entityObject[field.name], []);
        if (field.controlConfigs) {
            if (field.rows)
                field.rows.forEach(row => {
                    formArray.controls.push(this.createDynamicFormGroup(field, modelConfig[field.name], this.getRefObject(entityObject[field.name]), row));
                });
            if (field.minimumRepeatCount && field.minimumRepeatCount > 0) {
                let /** @type {?} */ countLeft = field.minimumRepeatCount - (formArray.controls.length);
                for (var /** @type {?} */ i = 0; i < countLeft; i++)
                    formArray.controls.push(this.createDynamicFormGroup(field, modelConfig[field.name], this.getRefObject(entityObject[field.name]), { fields: [] }));
            }
            this.addTwoProp(modelConfig[field.name], field, entityObject[field.name], formArray);
            formGroup.addControl(field.name, formArray);
        }
    }
    /**
     * @param {?} entityObject
     * @return {?}
     */
    getRefObject(entityObject) {
        let /** @type {?} */ jObject = {};
        entityObject.push(jObject);
        return jObject;
    }
    /**
     * @param {?} modelConfig
     * @param {?} x
     * @param {?} entityObject
     * @param {?} formArray
     * @return {?}
     */
    addTwoProp(modelConfig, x, entityObject, formArray) {
        modelConfig.__proto__.addItem = () => {
            formArray.controls.push(this.createDynamicFormGroup(x, modelConfig, this.getRefObject(entityObject), { fields: [] }));
        };
        modelConfig.__proto__.removeItem = (index) => {
            formArray.removeAt(index);
            modelConfig.splice(index, 1);
        };
    }
    /**
     * @param {?} x
     * @param {?} modelConfig
     * @param {?} entityObject
     * @param {?} row
     * @return {?}
     */
    createDynamicFormGroup(x, modelConfig, entityObject, row) {
        let /** @type {?} */ nestedFormGroup = new RxFormGroup({}, entityObject, {}, undefined);
        let /** @type {?} */ jObject = {};
        modelConfig.push(jObject);
        Object.keys(x.controlConfigs).forEach(key => {
            let /** @type {?} */ field = row.fields.filter(x => x.name == key)[0];
            let /** @type {?} */ formControlConfig = Object.assign({}, x.controlConfigs[key], { name: key });
            if (field)
                formControlConfig = Object.assign({}, formControlConfig, field);
            let /** @type {?} */ modelInstance = this.getDynamicModelInstance(formControlConfig, jObject, entityObject, key);
            nestedFormGroup.addControl(key, modelInstance.formControl);
        });
        return nestedFormGroup;
    }
    /**
     * @param {?} x
     * @param {?} modelConfig
     * @return {?}
     */
    getModelInstance(x, modelConfig) {
        let /** @type {?} */ configModel = (x.modelName) && this.formConfiguration && this.formConfiguration.controlConfigModels ? this.formConfiguration.controlConfigModels.filter((y) => y.modelName == x.modelName)[0] : undefined;
        let /** @type {?} */ modelArguments = [x, modelConfig];
        let /** @type {?} */ model = undefined;
        if (configModel) {
            model = configModel.model;
            if (configModel.arguments)
                configModel.arguments.forEach(t => modelArguments.push(t));
        }
        else
            model = FormControlConfig;
        let /** @type {?} */ modelInstance = getInstance(model, modelArguments);
        modelConfig[x.name] = modelInstance;
        return modelInstance;
    }
    /**
     * @param {?} x
     * @param {?} modelConfig
     * @param {?} entityObject
     * @param {?} name
     * @return {?}
     */
    getDynamicModelInstance(x, modelConfig, entityObject, name) {
        let /** @type {?} */ modelInstance = this.getModelInstance(x, modelConfig);
        let /** @type {?} */ validators = [];
        let /** @type {?} */ asyncValidators = [];
        if (x.validators)
            this.validatorBindings(validators, x.validators);
        if (modelInstance.validator)
            validators.push(modelInstance.validator.bind(modelInstance));
        if (modelInstance.asyncValidator)
            asyncValidators.push(modelInstance.asyncValidator.bind(modelInstance));
        if (modelInstance)
            entityObject[x.name] = x.value;
        let /** @type {?} */ baseObject = {};
        baseObject[x.name] = x.value;
        entityObject[x.name] = x.value;
        modelInstance.formControl = new RxFormControl(x.value, validators, asyncValidators, entityObject, baseObject, name, undefined);
        return modelInstance;
    }
    /**
     * @param {?} validations
     * @param {?} validationConfig
     * @return {?}
     */
    validatorBindings(validations, validationConfig) {
        for (var /** @type {?} */ column in RxwebValidators) {
            if (validationConfig[column]) {
                validations.push(RxwebValidators[column](validationConfig[column]));
            }
        }
        return validations;
    }
}
function RxDynamicFormBuilder_tsickle_Closure_declarations() {
    /** @type {?} */
    RxDynamicFormBuilder.prototype.formConfiguration;
}
//# sourceMappingURL=dynamic-form-builder.js.map