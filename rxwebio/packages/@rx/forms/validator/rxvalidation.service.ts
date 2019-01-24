import { Injectable } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { CustomValidation, AnnotationParamConfig, AnnotationModel } from "./validator.model";
import {
  alphaNumericValidator,
  alphaValidator,
  compareValidator,
  emailValidator,
  hexColorValidator,
  lowercaseValidator,
  maxDateValidator,
  maxNumberValidator,
  minDateValidator,
  minNumberValidator,
  containsValidator,
  uppercaseValidator, rangeValidator, customValidator, customChangeValidator, requiredValidator, patternValidator, numericValidator
} from './validators/rxvalidators';
import { defaultContainer } from '../../core/defaultContainer';
import { AnnotationTypes } from '../../core/validator.static';
import { AnnotationConfiguration, InstanceContainer } from '../../core/validator.interface';
import { ApplicationConfiguration } from '../../core/applicationconfiguration';
@Injectable()
export class RxValidation {
  private nestedProp: string;
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

  getFormGroup(object: Object, customValidations?: CustomValidation[], propConstructor?: any): FormGroup {
    var instanceContainer = (propConstructor) ? this.getInstanceContainer(propConstructor) : this.getInstanceContainer(object.constructor);
    var requiredFileds = {};
    if (instanceContainer && instanceContainer.tableName)
      requiredFileds = ApplicationConfiguration.get(`mandatoryFields.${instanceContainer.tableName}`)
    var formGroupObject = {};
    var formChildGroup = undefined;
    var formArrayGroup = undefined;
    let annotationProps = [];
    if (customValidations)
      annotationProps = customValidations.filter(t => t.annotationProps);
    Object.keys(object).forEach((key, index) => {
      var validations: any[] = [];
      if (instanceContainer) {
        let annotations = instanceContainer.propertyAnnotations.filter(t => t.propertyIndex === index);
        if (annotations.length === 0)
          annotations = instanceContainer.propertyAnnotations.filter(t => t.propertyName === key);
        if (annotations.length > 0)
          for (let annotation of annotations) {
            switch (annotation.annotationType) {
              case AnnotationTypes.required:
                validations.push(requiredValidator());
                break;
              case AnnotationTypes.minLength:
                validations.push(Validators.minLength(annotation.checkValue));
                break;
              case AnnotationTypes.maxLength:
                validations.push(Validators.maxLength(annotation.checkValue));
                break;
              case AnnotationTypes.pattern:
                validations.push(patternValidator(annotation.checkValue, annotation.patternType));
                break;
              case AnnotationTypes.compare:
                validations.push(compareValidator(annotation.checkValue, annotation.controlLabel));
                break;
              case AnnotationTypes.contains:
                validations.push(containsValidator(annotation.checkValue));
                break;
              case AnnotationTypes.alpha:
                validations.push(alphaValidator(annotation.isWithWhiteSpace));
                break;
              case AnnotationTypes.numeric:
                validations.push(numericValidator());
                break;
              case AnnotationTypes.alphaNumeric:
                validations.push(alphaNumericValidator(annotation.isWithWhiteSpace));
                break;
              case AnnotationTypes.email:
                validations.push(emailValidator());
                break;
              case AnnotationTypes.hexColor:
                validations.push(hexColorValidator());
                break;
              case AnnotationTypes.lowercase:
                validations.push(lowercaseValidator());
                break;
              case AnnotationTypes.maxDate:
                validations.push(maxDateValidator(annotation.checkValue));
                break;
              case AnnotationTypes.maxNumber:
                validations.push(maxNumberValidator(annotation.checkValue));
                break;
              case AnnotationTypes.minDate:
                validations.push(minDateValidator(annotation.checkValue));
                break;
              case AnnotationTypes.minNumber:
                validations.push(minNumberValidator(annotation.checkValue));
                break;
              case AnnotationTypes.uppercase:
                validations.push(uppercaseValidator());
                break;
              case AnnotationTypes.range:
                validations.push(rangeValidator(annotation.minRangeValue, annotation.maxRangeValue));
                break;
              case AnnotationTypes.nested:
                if (object[key] instanceof Array) {
                  formArrayGroup = [];
                  let customValidation: any;
                  if (customValidations)
                    customValidation = customValidations.filter(t => t.nestedProperty === key);
                  for (let subObject of object[key]) {
                    formArrayGroup.push(this.getFormGroup(subObject, customValidation, undefined));
                  }
                  formArrayGroup = this.formBuilder.array(formArrayGroup);
                }
                else {
                  if (object[key])
                    formChildGroup = this.getFormGroup(object[key]);
                }
                break;
            }
          }
        if (requiredFileds && requiredFileds[key]) {
          validations.push(requiredValidator(requiredFileds[key]));
        }
      }
      if (customValidations) {
        let result = customValidations.filter(t => t.changeProps && t.changeProps.indexOf(key) != -1);
        if (result && result.length > 0) {
          validations.push(customChangeValidator(result[0]));
        } else {
          result = customValidations.filter(t => t.requiredProps && t.requiredProps.indexOf(key) != -1);
          if (result && result.length > 0) {
            validations.push(customValidator(result[0], key));
          }
        }
        for (let annotation of annotationProps) {
          let annotationProp = annotation.annotationProps[key];
          if (annotationProp)
            this.additionalAnnotation(validations, key, annotationProp);
        }
      }
      formGroupObject[key] = formArrayGroup || formChildGroup || [object[key], validations];
      formChildGroup = undefined;
      formArrayGroup = undefined;
    })
    return this.formBuilder.group(formGroupObject);
  }

  additionalAnnotation(validations: any[], type, annotation: AnnotationModel) {
    if (annotation.required)
      validations.push(requiredValidator());
    if (annotation.minLength)
      validations.push(Validators.minLength(annotation.minLength.checkValue));
    if (annotation.maxLength)
      validations.push(Validators.maxLength(annotation.maxLength.checkValue));
    if (annotation.pattern)
      validations.push(patternValidator(annotation.pattern.checkValue, annotation.pattern.patternType));
    if (annotation.compare)
      validations.push(compareValidator(annotation.compare.checkValue, annotation.compare.controlLabel));
    if (annotation.contains)
      validations.push(containsValidator(annotation.contains.checkValue));
    if (annotation.alpha)
      validations.push(alphaValidator(annotation.alpha.isWithWhiteSpace));
    if (annotation.numeric)
      validations.push(numericValidator());
    if (annotation.alphaNumeric)
      validations.push(alphaNumericValidator(annotation.alphaNumeric.isWithWhiteSpace));
    if (annotation.email)
      validations.push(emailValidator());
    if (annotation.hexColor)
      validations.push(hexColorValidator());
    if (annotation.lowercase)
      validations.push(lowercaseValidator());
    if (annotation.maxDate)
      validations.push(maxDateValidator(annotation.maxDate.checkValue));
    if (annotation.maxNumber)
      validations.push(maxNumberValidator(annotation.maxNumber.checkValue));
    if (annotation.minDate)
      validations.push(minDateValidator(annotation.minDate.checkValue));
    if (annotation.minNumber)
      validations.push(minNumberValidator(annotation.minNumber.checkValue));
    if (annotation.uppercase)
      validations.push(uppercaseValidator());
    if (annotation.range)
      validations.push(rangeValidator(annotation.range.minRangeValue, annotation.range.maxRangeValue));
  }
}
