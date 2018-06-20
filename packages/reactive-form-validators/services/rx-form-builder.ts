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
    "time":timeValidator,
    "url":urlValidator,
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
    constructor(private formBuilder: FormBuilder) { }

    private getInstanceContainer(instanceFunc: Function): InstanceContainer {
        return defaultContainer.get(instanceFunc);
    }

    setValue(formGroup: FormGroup, object: any): void {
        for (var col in object) {
            var control = formGroup.get([col]);
            control.setValue(object[col]);
            control.updateValueAndValidity();
        }
    }

    private addFormControl(property: PropertyInfo, propertyValidators: DecoratorConfiguration[], propValidationConfig: PropValidationConfig, instance: InstanceContainer) {
        let validators = [];
        let columns = [];
        if (instance.conditionalValidationProps && instance.conditionalValidationProps[property.name]) {
            validators.push(conditionalChangeValidator(instance.conditionalValidationProps[property.name]));
        }
        if (this.conditionalObjectProps.length > 0)
        {
            let propConditions = this.conditionalObjectProps.filter(t => t.propName == property.name);
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

    additionalValidation(validations: any[], propValidationConfig: PropValidationConfig) {
        for (var col in AnnotationTypes) {
            if (propValidationConfig[AnnotationTypes[col]] && col != "custom")
                validations.push(APP_VALIDATORS[AnnotationTypes[col]](propValidationConfig[AnnotationTypes[col]]));
            else if (col == AnnotationTypes.custom)
                validations.push(propValidationConfig[col]);
        }
            
    }

    checkObjectPropAdditionalValidation<T>(instanceContainer: InstanceContainer, object: T) {
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

    formGroup<T>(object: T, formBuilderConfiguration?: FormBuilderConfiguration, entity?: Type<T>): FormGroup {
        let instanceContainer: InstanceContainer = (entity) ? this.getInstanceContainer(entity) : this.getInstanceContainer(object.constructor);
        this.checkObjectPropAdditionalValidation(instanceContainer, object);
        let formGroupObject = {};
        let formChildGroup = undefined;
        let formArrayGroup = undefined;
        var additionalValidations: { [key: string]: PropValidationConfig } = {};
        instanceContainer.properties.forEach(property => {
            let isIncludeProp = true;
            if (formBuilderConfiguration && formBuilderConfiguration.excludeProps && formBuilderConfiguration.excludeProps.length > 0)
                isIncludeProp = formBuilderConfiguration.excludeProps.indexOf(property.name) == -1
            if (formBuilderConfiguration && formBuilderConfiguration.additionalValidations)
                additionalValidations = formBuilderConfiguration.additionalValidations;
            if (isIncludeProp) {
                switch (property.propertyType) {
                    case PROPERTY:
                        var propertyValidators = instanceContainer.propertyAnnotations.filter(t => t.propertyName == property.name);
                        formGroupObject[property.name] = [object[property.name], this.addFormControl(property, propertyValidators, additionalValidations[property.name], instanceContainer)];
                        break;
                    case OBJECT_PROPERTY:
                        if (object[property.name] && object[property.name] instanceof Object) {
                            if (instanceContainer && instanceContainer.conditionalObjectProps)
                                this.conditionalObjectProps  = instanceContainer.conditionalObjectProps.filter(t => t.objectPropName == property.name)
                            formGroupObject[property.name] = this.formGroup(object[property.name], formBuilderConfiguration, property.entity);
                            this.conditionalObjectProps = [];
                        }
                        break;
                    case ARRAY_PROPERTY:
                        if (object[property.name] && object[property.name] instanceof Array)
                            var formArrayGroup = [];
                        let index = 0;
                        for (let subObject of object[property.name]) {
                            if (instanceContainer && instanceContainer.conditionalObjectProps)
                                this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(t => t.objectPropName == property.name && t.arrayIndex ==index)
                            formArrayGroup.push(this.formGroup(subObject, formBuilderConfiguration, property.entity));
                            index++;
                            this.conditionalObjectProps = [];
                        }
                        formGroupObject[property.name] = this.formBuilder.array(formArrayGroup);
                        break;
                }
            }

        })
        return this.formBuilder.group(formGroupObject);
    }
}
