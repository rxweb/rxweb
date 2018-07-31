import { Injectable } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Type, DecoratorName } from "../util"
import {
    alphaNumericValidator, alphaValidator, compareValidator, emailValidator, hexColorValidator, lowercaseValidator,
    maxDateValidator, maxNumberValidator, minDateValidator, minNumberValidator, containsValidator, uppercaseValidator,
    rangeValidator, patternValidator, requiredValidator, creditCardValidator, digitValidator,
    maxLengthValidator, minLengthValidator, passwordValidator, timeValidator, urlValidator, jsonValidator,
    greaterThanEqualToValidator, greaterThanValidator, lessThanEqualToValidator, lessThanValidator
} from '../reactive-form-validators';

import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration, InstanceContainer, PropertyInfo } from '../core/validator.interface';
import { FormBuilderConfiguration } from "../models"
import { ARRAY_PROPERTY, OBJECT_PROPERTY, PROPERTY } from "../const"
import { PropValidationConfig } from "../models/prop-validation-config";
import { AnnotationTypes } from "../core/validator.static";
import { conditionalChangeValidator } from "../reactive-form-validators/conditional-change.validator";
import { Linq } from '../util/linq'


const APP_VALIDATORS: { [key: string]: Function } = {
    "alphaNumeric": alphaNumericValidator,
    "alpha": alphaValidator,
    "compare": compareValidator,
    "email": emailValidator,
    "hexColor": hexColorValidator,
    "lowerCase": lowercaseValidator,
    "maxDate": maxDateValidator,
    "maxNumber": maxNumberValidator,
    "minDate": minDateValidator,
    "minNumber": minNumberValidator,
    "contains": containsValidator,
    "upperCase": uppercaseValidator,
    "maxLength": maxLengthValidator,
    "minLength": minLengthValidator,
    "password": passwordValidator,
    "range": rangeValidator,
    "required": requiredValidator,
    "creditCard": creditCardValidator,
    "digit": digitValidator,
    "pattern": patternValidator,
    "time": timeValidator,
    "url": urlValidator,
    "json": jsonValidator,
    "greaterThan": greaterThanValidator,
    "greaterThanEqualTo": greaterThanEqualToValidator,
    "lessThan": lessThanValidator,
    "lessThanEqualTo": lessThanEqualToValidator
}



@Injectable()
export class RxFormBuilder {
    private nestedProp: string;
    private conditionalObjectProps: any[] = [];
    private conditionalValidationInstance: any = {};
    private builderConfigurationConditionalObjectProps: any[] = [];
    private isNested: boolean = false;
    constructor(private formBuilder: FormBuilder) { }

    private getInstanceContainer(instanceFunc: any): InstanceContainer {
        return defaultContainer.get(instanceFunc);
    }

    private setValue(formGroup: FormGroup, object: any): void {
        for (var col in object) {
            var control = formGroup.get([col]);
            control.setValue(object[col]);
            control.updateValueAndValidity();
        }
    }

    private extractExpressions(fomrBuilderConfiguration: FormBuilderConfiguration): { [key: string]: string[] } {
        if (fomrBuilderConfiguration && fomrBuilderConfiguration.validations) {
            for (var property in fomrBuilderConfiguration.validations) {
                for (var decorator in fomrBuilderConfiguration.validations[property]) {
                    if (fomrBuilderConfiguration.validations[property][decorator].conditionalExpression) {
                        let columns = Linq.expressionColumns(fomrBuilderConfiguration.validations[property][decorator].conditionalExpression);
                        defaultContainer.addChangeValidation(this.conditionalValidationInstance, property, columns);
                    }
                }
            }
        }
        return null;
    }

    private addFormControl(property: PropertyInfo, propertyValidators: DecoratorConfiguration[], propValidationConfig: PropValidationConfig, instance: InstanceContainer) {
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
            validators.push(APP_VALIDATORS[propertyValidator.annotationType](propertyValidator.config, ))
        }
        if (propValidationConfig)
            this.additionalValidation(validators, propValidationConfig);
        return validators;
    }

    private additionalValidation(validations: any[], propValidationConfig: PropValidationConfig) {
        for (var col in AnnotationTypes) {
            if (propValidationConfig[AnnotationTypes[col]] && col != "custom") {
                validations.push(APP_VALIDATORS[AnnotationTypes[col]](propValidationConfig[AnnotationTypes[col]]));
            }
            else if (col == AnnotationTypes.custom && propValidationConfig[AnnotationTypes[col]])
                validations.push(propValidationConfig[col]);
        }
    }

    private checkObjectPropAdditionalValidation<T>(instanceContainer: InstanceContainer, object: T) {
        var props = instanceContainer.properties.filter(t => t.propertyType == OBJECT_PROPERTY || t.propertyType == ARRAY_PROPERTY)
        props.forEach(t => {
            let instance = this.getInstanceContainer(t.entity);
            if (instance.conditionalValidationProps) {
                for (var key in instance.conditionalValidationProps) {
                    var prop = instance.properties.filter(t => t.name == key)[0];
                    if (!prop)
                        prop = instanceContainer.properties.filter(t => t.name == key)[0];
                    if (prop) {
                        if (!instanceContainer.conditionalValidationProps)
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
        })
    }

    getObject(model: any | { [key: string]: any }, entityObject?: { [key: string]: any } | FormBuilderConfiguration, formBuilderConfiguration?: FormBuilderConfiguration): {[key:string]:any} {
        let json: { [key: string]: any } = {};

        if (typeof model == "function")
            json.model = model;

        if (entityObject && !(entityObject instanceof FormBuilderConfiguration))
            json.entityObject = entityObject;

        if (entityObject instanceof FormBuilderConfiguration && !formBuilderConfiguration)
            json.formBuilderConfiguration = entityObject;
        else if (!(entityObject instanceof FormBuilderConfiguration) && formBuilderConfiguration)
            json.formBuilderConfiguration = formBuilderConfiguration;
        
        if (!entityObject) {
            json.entityObject = model;
            if (typeof model == "object")
                json.model = model.constructor;
        } else if (model && (entityObject instanceof FormBuilderConfiguration) && (typeof model == "object")) {
            json["entityObject"] = model;
            json["model"] = model.constructor;
        }
        return json;
    }

    formGroup<T>(model: Type<T> | { [key: string]: any }, entityObject?: { [key: string]: any } | FormBuilderConfiguration, formBuilderConfiguration?: FormBuilderConfiguration): FormGroup {
        let json = this.getObject(model, entityObject, formBuilderConfiguration);
        model = json.model;
        entityObject = json.entityObject;
        formBuilderConfiguration = json.formBuilderConfiguration;
        if (formBuilderConfiguration)
            this.extractExpressions(formBuilderConfiguration);
        let instanceContainer: InstanceContainer = this.getInstanceContainer(model);
        this.checkObjectPropAdditionalValidation(instanceContainer, entityObject);
        let formGroupObject = {};
        let formChildGroup = undefined;
        let formArrayGroup = undefined;
        var additionalValidations: { [key: string]: PropValidationConfig } = {};
        instanceContainer.properties.forEach(property => {
            let isIncludeProp = true;
            if (formBuilderConfiguration && formBuilderConfiguration.excludeProps && formBuilderConfiguration.excludeProps.length > 0)
                isIncludeProp = formBuilderConfiguration.excludeProps.indexOf(property.name) == -1
            if (formBuilderConfiguration && formBuilderConfiguration.validations)
                additionalValidations = formBuilderConfiguration.validations;
            if (isIncludeProp) {
                switch (property.propertyType) {
                    case PROPERTY:
                        var propertyValidators = instanceContainer.propertyAnnotations.filter(t => t.propertyName == property.name);
                        formGroupObject[property.name] = [entityObject[property.name], this.addFormControl(property, propertyValidators, additionalValidations[property.name], instanceContainer)];
                        this.isNested = false;
                        break;
                    case OBJECT_PROPERTY:
                        if (entityObject[property.name] && entityObject[property.name] instanceof Object) {
                            this.isNested = true;
                            if (instanceContainer && instanceContainer.conditionalObjectProps)
                                this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(t => t.objectPropName == property.name)
                            if (this.conditionalValidationInstance && this.conditionalValidationInstance.conditionalObjectProps)
                                this.builderConfigurationConditionalObjectProps = this.conditionalValidationInstance.conditionalObjectProps.filter(t => t.objectPropName == property.name);
                            formGroupObject[property.name] = this.formGroup(property.entity, entityObject[property.name], formBuilderConfiguration);
                            this.conditionalObjectProps = [];
                            this.builderConfigurationConditionalObjectProps = [];
                            this.isNested = false;
                        }
                        break;
                    case ARRAY_PROPERTY:
                        if (entityObject[property.name] && entityObject[property.name] instanceof Array) {
                            this.isNested = true;
                            var formArrayGroup = [];
                            let index = 0;
                            for (let subObject of entityObject[property.name]) {
                                if (instanceContainer && instanceContainer.conditionalObjectProps)
                                    this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(t => t.objectPropName == property.name && t.arrayIndex == index)
                                if (this.conditionalValidationInstance && this.conditionalValidationInstance.conditionalObjectProps)
                                    this.builderConfigurationConditionalObjectProps = this.conditionalValidationInstance.conditionalObjectProps.filter(t => t.objectPropName == property.name && t.arrayIndex == index);
                                formArrayGroup.push(this.formGroup(property.entity, subObject, formBuilderConfiguration));
                                index++;
                                this.conditionalObjectProps = [];
                                this.builderConfigurationConditionalObjectProps = [];
                            }
                            formGroupObject[property.name] = this.formBuilder.array(formArrayGroup);
                            this.isNested = false;
                        }
                        break;
                }
            }

        })
        if (!this.isNested) {
            this.conditionalValidationInstance = {};
            this.builderConfigurationConditionalObjectProps = [];
        }
        return this.formBuilder.group(formGroupObject);
    }
}
