import { Injectable } from "@angular/core"
import { FormGroup, FormArray, FormControl, ValidatorFn, AsyncValidatorFn, FormBuilder } from "@angular/forms"
import { Type } from "../util"
import { BaseFormBuilder } from './base-form-builder';


import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration, InstanceContainer, PropertyInfo } from '../core/validator.interface';

import { FormBuilderConfiguration} from "../models"
import { ARRAY_PROPERTY, OBJECT_PROPERTY, PROPERTY, FUNCTION_STRING, OBJECT_STRING, RX_WEB_VALIDATOR, NUMBER, BOOLEAN, STRING, MODEL } from "../const"
import { PropValidationConfig } from "../models/prop-validation-config";

import { AnnotationTypes } from "../core/validator.static";
import { conditionalChangeValidator } from "../reactive-form-validators/conditional-change.validator";
import { Linq } from '../util/linq'
import { APP_VALIDATORS } from '../const/app-validators.const'
import { RxFormControl } from './form-control';
import { RxFormGroup } from './rx-form-group'
import { RxFormArray } from './rx-form-array';
import { andValidator } from '../reactive-form-validators/and.validator'
import { orValidator } from '../reactive-form-validators/or.validator'
import { notValidator } from '../reactive-form-validators/not.validator'
import { AppFormGroup } from '../models/interface/i-form-group'
import { RegexValidator } from "../util/regex-validator";
import { getInstance } from "../util/instance-provider.function";
import { IAbstractControl } from "../models/interface/i-abstract-control"
const LOGICAL_VALIDATORS: { [key: string]: Function } = { and: andValidator, or: orValidator, not: notValidator }
const ASYNC: string = "async"
const ENTITY_OBJECT: string = "entityObject";
@Injectable()
export class RxFormBuilder extends BaseFormBuilder {
    private nestedProp: string;
    private conditionalObjectProps: any[] = [];
    private conditionalValidationInstance: any = {};
    private builderConfigurationConditionalObjectProps: any[] = [];
    private formGroupPropOtherValidator: { [key: string]: any } = {};
    private currentFormGroupPropOtherValidator: { [key: string]: any } = {};
    private isNested: boolean = false;
    private isGroupCalled: boolean = false;
    private isNestedBinding: boolean = false;
    
    constructor() {
        super();
    }



    private getInstanceContainer(instanceFunc: any, entityObject: any): InstanceContainer {
        return this.instaceProvider(instanceFunc, entityObject);
    }

    private setValue(formGroup: FormGroup, object: any): void {
        for (var col in object) {
            var control = formGroup.get([col]);
            control.setValue(object[col]);
            control.updateValueAndValidity();
        }
    }

    private extractExpressions(fomrBuilderConfiguration: FormBuilderConfiguration): { [key: string]: string[] } {
        if (fomrBuilderConfiguration && fomrBuilderConfiguration.dynamicValidation) {
            for (var property in fomrBuilderConfiguration.dynamicValidation) {
                for (var decorator in fomrBuilderConfiguration.dynamicValidation[property]) {
                    if (fomrBuilderConfiguration.dynamicValidation[property][decorator].conditionalExpression) {
                        let columns = Linq.expressionColumns(fomrBuilderConfiguration.dynamicValidation[property][decorator].conditionalExpression);
                        defaultContainer.addChangeValidation(this.conditionalValidationInstance, property, columns);
                    }
                }
            }
        }
        return null;
    }

    private addAsyncValidation(property: PropertyInfo, propertyValidators: DecoratorConfiguration[], propValidationConfig: PropValidationConfig) {
        let asyncValidators = [];
        if (propertyValidators) {
            for (let propertyValidator of propertyValidators) {
                if (propertyValidator.isAsync)
                    propertyValidator.config.forEach(t => { asyncValidators.push(t) });
            }
        }
        if (propValidationConfig && propValidationConfig[ASYNC]) {
            propValidationConfig[ASYNC].forEach(t => { asyncValidators.push(t) })
        }
        return asyncValidators;
    }

    private addFormControl(property: PropertyInfo, propertyValidators: DecoratorConfiguration[], propValidationConfig: PropValidationConfig, instance: InstanceContainer, entity: any) {
        let validators = [];
        let columns = [];
        if ((instance.conditionalValidationProps && instance.conditionalValidationProps[property.name]) || (this.conditionalValidationInstance.conditionalValidationProps && this.conditionalValidationInstance.conditionalValidationProps[property.name])) {
            let props = [];
            if ((instance.conditionalValidationProps && instance.conditionalValidationProps[property.name]))
                instance.conditionalValidationProps[property.name].forEach(t => props.push(t))
            if (this.conditionalValidationInstance.conditionalValidationProps && this.conditionalValidationInstance.conditionalValidationProps[property.name])
                this.conditionalValidationInstance.conditionalValidationProps[property.name].forEach(t => props.push(t));
            validators.push(conditionalChangeValidator(props));
        }
        if (this.conditionalObjectProps.length > 0 || this.builderConfigurationConditionalObjectProps.length > 0) {
            let propConditions = [];
            if (this.conditionalObjectProps)
                propConditions = this.conditionalObjectProps.filter(t => t.propName == property.name);
            if (this.builderConfigurationConditionalObjectProps)
                this.builderConfigurationConditionalObjectProps.filter(t => t.propName == property.name).forEach(t => propConditions.push(t));
            propConditions.forEach(t => {
                if (t.referencePropName && columns.indexOf(t.referencePropName) == -1)
                    columns.push(t.referencePropName);
            })
            if (columns.length > 0)
                validators.push(conditionalChangeValidator(columns));
        }
        for (let propertyValidator of propertyValidators) {
            if (!propertyValidator.isAsync)
                switch (propertyValidator.annotationType) {
                    case AnnotationTypes.rule:
                        validators.push(APP_VALIDATORS[propertyValidator.annotationType](propertyValidator.config, entity))
                        break;
                    case AnnotationTypes.and:
                    case AnnotationTypes.or:
                    case AnnotationTypes.not:
                        validators.push(LOGICAL_VALIDATORS[propertyValidator.annotationType](propertyValidator.config))
                        break;
                    default:
                        validators.push(APP_VALIDATORS[propertyValidator.annotationType](propertyValidator.config))
                        break;
                }
        }
        if (propValidationConfig)
            this.additionalValidation(validators, propValidationConfig);
        if (this.currentFormGroupPropOtherValidator[property.name])
            this.currentFormGroupPropOtherValidator[property.name].forEach(t => { validators.push(t); })
        return validators;
    }

    private additionalValidation(validations: any[], propValidationConfig: PropValidationConfig | any) {
        for (var col in AnnotationTypes) {
            if (propValidationConfig[AnnotationTypes[col]] && col != "custom") {
                validations.push(APP_VALIDATORS[AnnotationTypes[col]](propValidationConfig[AnnotationTypes[col]]));
            }
            else if (col == AnnotationTypes.custom && propValidationConfig[AnnotationTypes[col]])
                validations.push(propValidationConfig[col]);
        }
    }

    private getEntity<T>(object: T, formBuilderConfiguration: FormBuilderConfiguration, propertyName: string,isSameObjectConstructor:boolean = false) {
        if (formBuilderConfiguration && formBuilderConfiguration.genericEntities && formBuilderConfiguration.genericEntities[propertyName])
            return formBuilderConfiguration.genericEntities[propertyName];
        return isSameObjectConstructor ? object.constructor : undefined;
    }

    private getObjectPropertyInstance(object: { [key: string]: any }, propertyInfo: PropertyInfo, formBuilderConfiguration: FormBuilderConfiguration) {
        if (propertyInfo.propertyType == OBJECT_PROPERTY && object[propertyInfo.name])
            return object[propertyInfo.name].constructor;
        else if (propertyInfo.propertyType == ARRAY_PROPERTY && object[propertyInfo.name] && object[propertyInfo.name].length > 0)
            return object[propertyInfo.name][0].constructor;
        return this.getEntity(object, formBuilderConfiguration, propertyInfo.name)

    }

    private checkObjectPropAdditionalValidation<T>(instanceContainer: InstanceContainer, object: T, formBuilderConfiguration: FormBuilderConfiguration) {
        var props = instanceContainer.properties.filter(t => t.propertyType == OBJECT_PROPERTY || t.propertyType == ARRAY_PROPERTY)
        props.forEach(t => {
            let entity = t.entity;
            if (!t.entity)
                entity = this.getObjectPropertyInstance(object, t, formBuilderConfiguration)
            if (entity) {
                let instance = this.getInstanceContainer(entity, null);
                if (instance.conditionalValidationProps) {
                    for (var key in instance.conditionalValidationProps) {
                        var prop = instanceContainer.properties.filter(t => t.name == key)[0];
                        if (prop) {
                            if (!instanceContainer.conditionalValidationProps)
                                instanceContainer.conditionalValidationProps = {};
                            if (!instanceContainer.conditionalValidationProps[key])
                                instanceContainer.conditionalValidationProps[key] = [];
                            instance.conditionalValidationProps[key].forEach(x => {
                                if (t.propertyType != ARRAY_PROPERTY)
                                    instanceContainer.conditionalValidationProps[key].push([t.name, x].join('.'))
                                else
                                    instanceContainer.conditionalValidationProps[key].push([t.name, x].join('[]'))
                            })
                        }
                    }
                }

            }
        })
    }

    private getObject(model: any | { [key: string]: any }, entityObject?: { [key: string]: any } | FormBuilderConfiguration, formBuilderConfiguration?: FormBuilderConfiguration): { [key: string]: any } {
        let json: { [key: string]: any } = {};

        if (typeof model == FUNCTION_STRING)
            json.model = model;

        if (typeof model == FUNCTION_STRING && (entityObject instanceof FormBuilderConfiguration)) {
            json.entityObject = this.createClassObject(json.model, entityObject)
        }
        if (entityObject && !(entityObject instanceof FormBuilderConfiguration))
            json.entityObject = entityObject;

        if (entityObject instanceof FormBuilderConfiguration && !formBuilderConfiguration)
            json.formBuilderConfiguration = entityObject;
        else if (!(entityObject instanceof FormBuilderConfiguration) && formBuilderConfiguration) {
            json.formBuilderConfiguration = formBuilderConfiguration;
            json.entityObject = this.createClassObject(json.model, json.formBuilderConfiguration, json.entityObject)
        }


        if (!entityObject) {
            if (typeof model == OBJECT_STRING)
                json.model = model.constructor;
            json.entityObject = this.createClassObject(json.model, json.formBuilderConfiguration, model)
        } else if (model && (entityObject instanceof FormBuilderConfiguration) && (typeof model == OBJECT_STRING)) {
            json[MODEL] = model.constructor;
            json[ENTITY_OBJECT] = this.createClassObject(json.model, json.formBuilderConfiguration, model)
        }
        return json;
    }



    control(value?: any, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): IAbstractControl  {
        return new RxFormControl(value, validators, asyncValidators, {}, {}, '', []);
    }

    array(values: [{ [key: string]: any }], validatorConfig?: FormBuilderConfiguration) {
        let formArray = this.group({ temp: values }, validatorConfig).get("temp") as FormArray;
        var formBuilder = new FormBuilder();
        return formBuilder.array(formArray.controls);
    }

    group(groupObject: { [key: string]: any }, validatorConfig?: FormBuilderConfiguration): FormGroup {
        let modelInstance = super.createInstance();
        let entityObject = {};
        this.formGroupPropOtherValidator = {};
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.createValidatorFormGroup(groupObject, entityObject, modelInstance, validatorConfig);
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.isGroupCalled = true;
        let formGroup = this.formGroup(modelInstance.constructor, entityObject, validatorConfig);
        this.isGroupCalled = false;
        this.formGroupPropOtherValidator = {};
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.formGroupPropOtherValidator = {};
        return formGroup;
    }

    private applyAllPropValidator(propName: string, validatorConfig: FormBuilderConfiguration, modelInstance: any) {
        if (validatorConfig && validatorConfig.applyAllProps) {
            if (!(validatorConfig.excludeProps && validatorConfig.excludeProps.length > 0 && validatorConfig.excludeProps.indexOf(propName) == -1)) {
                validatorConfig.applyAllProps.forEach((t: any) => {
                    if (t.name == RX_WEB_VALIDATOR) {
                        t(propName, modelInstance)
                    } else {
                        if (!this.currentFormGroupPropOtherValidator[propName])
                            this.currentFormGroupPropOtherValidator[propName] = [];
                        this.currentFormGroupPropOtherValidator[propName].push(t)
                    }
                })
            }
        }
    }

    private dynamicValidationPropCheck(propName: string, validatorConfig: FormBuilderConfiguration) {
        return (validatorConfig == undefined) ? true : (!validatorConfig.dynamicValidationConfigurationPropertyName) ? true : validatorConfig.dynamicValidationConfigurationPropertyName == propName ? false : true;
    }

    private isNotObject(value) {
        return value instanceof Date || value === null || typeof value != OBJECT_STRING;
    }

    private createValidatorFormGroup(groupObject: { [key: string]: any }, entityObject: { [key: string]: any }, modelInstance: any, validatorConfig: FormBuilderConfiguration) {
        for (var propName in groupObject) {

            var prop = groupObject[propName];
            if (prop instanceof Array && prop.length > 0 && this.isNotObject(prop[0])) {
                let propValidators = (prop.length > 1 && prop[1] instanceof Array) ? prop[1] : (prop.length == 2) ? [prop[1]] : [];
                let propertyAdded: boolean = false;
                for (var i = 0; i < propValidators.length; i++) {
                    if (propValidators[i].name == RX_WEB_VALIDATOR) {
                        propValidators[i](propName, modelInstance);
                        propertyAdded = true;
                    }
                    else {
                        if (!this.currentFormGroupPropOtherValidator[propName])
                            this.currentFormGroupPropOtherValidator[propName] = [];
                        this.currentFormGroupPropOtherValidator[propName].push(propValidators[i])
                    }
                }
                if (!propertyAdded)
                    defaultContainer.initPropertyObject(propName, PROPERTY, undefined, typeof modelInstance == OBJECT_STRING ? modelInstance : { constructor: modelInstance });
                this.applyAllPropValidator(propName, validatorConfig, modelInstance)
            } else if (prop === null || prop === undefined || typeof prop == STRING || typeof prop == NUMBER || typeof prop == BOOLEAN || prop instanceof Date) {
                defaultContainer.initPropertyObject(propName, PROPERTY, undefined, typeof modelInstance == OBJECT_STRING ? modelInstance : { constructor: modelInstance });
                this.applyAllPropValidator(propName, validatorConfig, modelInstance)
            } else if (prop instanceof Array) {
                if (prop instanceof FormArray) {
                    entityObject[propName] = prop;
                } else {
                    let propModelInstance = super.createInstance();
                    if (typeof modelInstance == "function")
                        modelInstance.constructor = modelInstance;
                    defaultContainer.initPropertyObject(propName, ARRAY_PROPERTY, propModelInstance.constructor, modelInstance);
                    entityObject[propName] = [];
                    for (let row of prop) {
                        let jObject = {};
                        entityObject[propName].push(jObject)
                        this.createValidatorFormGroup(row, jObject, propModelInstance.constructor, validatorConfig);
                    }

                }

            } else if (typeof prop == OBJECT_STRING && !(prop instanceof FormControl || prop instanceof RxFormControl)) {

                let formGroup: any = (prop instanceof FormArray) ? prop.controls[0] : prop
                if (!formGroup.model && (prop instanceof FormGroup || prop instanceof RxFormGroup)) {
                    formGroup = this.group(formGroup.controls);
                }
                if (prop instanceof FormGroup || prop instanceof RxFormGroup) {
                    entityObject[propName] = prop;
                    defaultContainer.initPropertyObject(propName, OBJECT_PROPERTY, formGroup.model, modelInstance);
                } else if (prop instanceof FormArray) {
                    entityObject[propName] = prop;
                    defaultContainer.initPropertyObject(propName, ARRAY_PROPERTY, formGroup.model, modelInstance);
                } else {
                    if (this.dynamicValidationPropCheck(propName, validatorConfig)) {
                        this.formGroupPropOtherValidator[propName] = {};
                        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator[propName];
                        let propModelInstance = super.createInstance();
                        entityObject[propName] = {};
                        entityObject[propName].constructor = propModelInstance.constructor;
                        defaultContainer.initPropertyObject(propName, OBJECT_PROPERTY, entityObject[propName].constructor, modelInstance.constructor == Function ? { constructor: modelInstance } : modelInstance);
                        let objectValidationConfig = this.getValidatorConfig(validatorConfig, groupObject, propName + ".")
                        this.createValidatorFormGroup(groupObject[propName], entityObject[propName], entityObject[propName].constructor, objectValidationConfig);
                    } else entityObject[propName] = groupObject[propName];
                }

            }
            if (typeof prop == STRING || typeof prop == NUMBER || typeof prop == BOOLEAN || prop instanceof Date) {
                entityObject[propName] = prop
            }
            else if ((prop && prop.length > 0 && this.isNotObject(prop[0]) && !(prop instanceof FormControl || prop instanceof RxFormControl) && !(prop instanceof FormArray))) {
                entityObject[propName] = prop[0]
            } else if (prop instanceof FormArray) {
                entityObject[propName] = prop
            } else if (prop instanceof FormControl || prop instanceof RxFormControl) {
                entityObject[propName] = prop
                defaultContainer.initPropertyObject(propName, PROPERTY, undefined, modelInstance.constructor ? modelInstance : { constructor: modelInstance });
            }
        }
    }

    private getValidatorConfig(validatorConfig: FormBuilderConfiguration, entityObject: any, rootPropertyName: string, arrayPropertyName?: string): any {
        let validationProps = {};
        let excludeProps = [];
        let includeProps = [];
        let ignoreUndefinedProps = [];
        if (validatorConfig) {
            for (var propName in validatorConfig.dynamicValidation) {
                if (propName.indexOf(rootPropertyName) != -1 || (arrayPropertyName && propName.indexOf(arrayPropertyName) != -1)) {
                    let splitProp = propName.split(".")[1];
                    if (splitProp)
                        validationProps[splitProp] = validatorConfig.dynamicValidation[propName]
                }
            }
            if (validatorConfig.excludeProps)
                excludeProps = this.getProps(validatorConfig.excludeProps, rootPropertyName);

            if (validatorConfig.includeProps)
                includeProps = this.getProps(validatorConfig.includeProps, rootPropertyName);
            if (validatorConfig.ignoreUndefinedProps)
                ignoreUndefinedProps = this.getProps(validatorConfig.ignoreUndefinedProps, rootPropertyName,true);
            return { ignoreUndefinedProps: ignoreUndefinedProps, includeProps: includeProps, dynamicValidation: (validatorConfig.dynamicValidationConfigurationPropertyName && entityObject[validatorConfig.dynamicValidationConfigurationPropertyName]) ? entityObject[validatorConfig.dynamicValidationConfigurationPropertyName] : validationProps, excludeProps: excludeProps }
        }
        return {}

    }

    private getProps(properties: string[], rootPropertyName: string,isIgnoreProp:boolean = false) {
        let props: string[] = [];
        for (let prop of properties) {
            if (prop.indexOf(rootPropertyName) != -1) {
                let splitProps = prop.split(".");
                if (splitProps.length == 2) {
                    props.push(splitProps[1]);
                } else if (splitProps.length > 2) {
                    splitProps.splice(0, 1);
                    props.push(splitProps.join("."))
                }
            }
        }
        if (isIgnoreProp && properties.filter(x => x == rootPropertyName.replace('.', '')).length == 1)
            props.push(':self:');

        return props;
    }

    formGroup<T>(model: Type<T> | { [key: string]: any }, entityObject?: { [key: string]: any } | FormBuilderConfiguration, formBuilderConfiguration?: FormBuilderConfiguration): RxFormGroup | FormGroup | AppFormGroup<T> {
        let json = this.getObject(model, entityObject, formBuilderConfiguration);
        model = json.model;
        entityObject = json.entityObject;
        if (entityObject.constructor != model && !this.isGroupCalled) {
            entityObject = json.entityObject = this.updateObject(model, json.entityObject, formBuilderConfiguration);
        }
        formBuilderConfiguration = json.formBuilderConfiguration;
        if (formBuilderConfiguration)
            this.extractExpressions(formBuilderConfiguration);
        let instanceContainer: InstanceContainer = this.getInstanceContainer(model, entityObject);
        this.checkObjectPropAdditionalValidation(instanceContainer, entityObject, formBuilderConfiguration);
        let formGroupObject = {};
        let formChildGroup = undefined;
        let formArrayGroup = undefined;
        var additionalValidations: { [key: string]: PropValidationConfig } = {};
        instanceContainer.properties.forEach(property => {
            let isIncludeProp = true;
            if (formBuilderConfiguration) {
                if (formBuilderConfiguration.excludeProps && formBuilderConfiguration.excludeProps.length > 0)
                    isIncludeProp = formBuilderConfiguration.excludeProps.indexOf(property.name) == -1
                if (formBuilderConfiguration.dynamicValidation)
                    additionalValidations = formBuilderConfiguration.dynamicValidation;
                if (formBuilderConfiguration.includeProps  && formBuilderConfiguration.includeProps.length > 0)
                    isIncludeProp = formBuilderConfiguration.includeProps.indexOf(property.name) != -1
                if (formBuilderConfiguration.ignoreUndefinedProps   && formBuilderConfiguration.ignoreUndefinedProps.length > 0 ) {
                    isIncludeProp = !(property.propertyType == PROPERTY && !RegexValidator.isNotBlank(json.entityObject[property.name]) && (formBuilderConfiguration.ignoreUndefinedProps.indexOf(property.name) !== -1 || formBuilderConfiguration.ignoreUndefinedProps.indexOf(":self:") !== -1));
                }

            }

            if (property.ignore)
                isIncludeProp = !property.ignore.call(json.entityObject, json.entityObject);
            if (isIncludeProp) {
                switch (property.propertyType) {
                    case PROPERTY:
                        if (!(entityObject[property.name] instanceof FormControl || entityObject[property.name] instanceof RxFormControl)) {
                            var propertyValidators = instanceContainer.propertyAnnotations.filter(t => t.propertyName == property.name);
                            let sanitizeValue = super.sanitizeValue(instanceContainer, property.name, super.getDefaultValue(property, entityObject[property.name], formBuilderConfiguration), json.entityObject, Object.assign({}, json.entityObject));
                            if (entityObject[property.name] === undefined && sanitizeValue)
                                entityObject[property.name] = sanitizeValue;
                            formGroupObject[property.name] = new RxFormControl(sanitizeValue, this.addFormControl(property, propertyValidators, additionalValidations[property.name], instanceContainer, entityObject), this.addAsyncValidation(property, propertyValidators, additionalValidations[property.name]), json.entityObject, Object.assign({}, json.entityObject), property.name, instanceContainer.sanitizers[property.name]);
                            this.isNested = false;
                        } else
                            formGroupObject[property.name] = super.getDefaultValue(property, entityObject[property.name], formBuilderConfiguration);
                        break;
                    case OBJECT_PROPERTY:
                        let objectValue = entityObject[property.name];
                        if (objectValue && objectValue instanceof Object && !(objectValue instanceof FormGroup || objectValue instanceof RxFormGroup)) {
                            this.isNestedBinding = this.isNested = true;
                            if (instanceContainer && instanceContainer.conditionalObjectProps)
                                this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(t => t.objectPropName == property.name)
                            if (this.conditionalValidationInstance && this.conditionalValidationInstance.conditionalObjectProps)
                                this.builderConfigurationConditionalObjectProps = this.conditionalValidationInstance.conditionalObjectProps.filter(t => t.objectPropName == property.name);
                            if (this.formGroupPropOtherValidator[property.name])
                                this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator[property.name];
                            let objectValidationConfig = this.getValidatorConfig(formBuilderConfiguration, objectValue, `${property.name}.`)
                            let entity = property.entityProvider ? property.entityProvider.call(entityObject) : undefined;
                            formGroupObject[property.name] = this.formGroup(entity || property.entity || this.getEntity(objectValue, formBuilderConfiguration, property.name, true), objectValue, objectValidationConfig);
                            this.conditionalObjectProps = [];
                            this.builderConfigurationConditionalObjectProps = [];
                            this.isNestedBinding = this.isNested = false;
                        } else if (objectValue instanceof FormGroup || objectValue instanceof RxFormGroup)
                            formGroupObject[property.name] = objectValue;
                        break;
                    case ARRAY_PROPERTY:
                        let arrayObjectValue = entityObject[property.name];
                        if (arrayObjectValue && arrayObjectValue instanceof Array && !(arrayObjectValue instanceof FormArray)) {
                            this.isNestedBinding = this.isNested = true;
                            var formArrayGroup = [];
                            let index = 0;
                            let entity = property.entityProvider ? property.entityProvider.call(entityObject) : undefined;
                            for (let subObject of arrayObjectValue) {
                                if (instanceContainer && instanceContainer.conditionalObjectProps)
                                    this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(t => t.objectPropName == property.name && t.arrayIndex == index)
                                if (this.conditionalValidationInstance && this.conditionalValidationInstance.conditionalObjectProps)
                                    this.builderConfigurationConditionalObjectProps = this.conditionalValidationInstance.conditionalObjectProps.filter(t => t.objectPropName == property.name && t.arrayIndex == index);
                                if (this.formGroupPropOtherValidator[property.name])
                                    this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator[property.name];
                                let objectValidationConfig = this.getValidatorConfig(formBuilderConfiguration, subObject, `${property.name}.`, `${property.name}[${index}].`)
                                formArrayGroup.push(this.formGroup(entity || property.entity || this.getEntity(subObject, formBuilderConfiguration, property.name,true), subObject, objectValidationConfig));
                                index++;
                                this.conditionalObjectProps = [];
                                this.builderConfigurationConditionalObjectProps = [];
                            }
                            formGroupObject[property.name] = new RxFormArray(arrayObjectValue, formArrayGroup, null, null, property.arrayConfig);
                            this.isNestedBinding = this.isNested = false;
                        } else if (arrayObjectValue instanceof FormArray)
                            formGroupObject[property.name] = arrayObjectValue;
                        else if (property.arrayConfig && property.arrayConfig.createBlank)
                            formGroupObject[property.name] = new RxFormArray([], [], null, null, property.arrayConfig)
                        break;
                }
            }

        })
        if (!this.isNested) {
            this.conditionalValidationInstance = {};
            this.builderConfigurationConditionalObjectProps = [];
        }
        let formGroup = new RxFormGroup(json.model, json.entityObject, formGroupObject, undefined);
        if (!this.isNestedBinding && !this.isGroupCalled)
            formGroup.refreshDisable();
        return formGroup;

    }
}
