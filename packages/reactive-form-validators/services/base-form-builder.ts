import { FormBuilderConfiguration } from '../models/form-builder-configuration'
import { AutoInstanceConfig } from '../models/interface/auto-instance-config.interface'
import { defaultContainer } from '../core/defaultContainer';
import { InstanceContainer,PropertyInfo} from '../core/validator.interface';
import { ARRAY_PROPERTY, OBJECT_PROPERTY, PROPERTY } from "../const"
import { RegexValidator } from '../util/regex-validator';
import { SANITIZERS } from "../util/sanitizers"
import { instanceProvider, getInstance } from "../util/instance-provider.function"

export class BaseFormBuilder {
    constructor() {
    }

    protected createInstance() {
        let instance = {};
        defaultContainer.modelIncrementCount = defaultContainer.modelIncrementCount + 1;
        let modelName = `RxWebModel${defaultContainer.modelIncrementCount}`
        instance.constructor = Function(`"use strict";return(function ${modelName}(){ })`)()
        return instance;
    }

    protected createClassObject(model: any, formBuilderConfiguration: FormBuilderConfiguration, classInstance?: any) {
        let instanceContainer = defaultContainer.get(model);
        let autoInstanceConfig: AutoInstanceConfig = formBuilderConfiguration ? formBuilderConfiguration.autoInstanceConfig : undefined;
        if (!autoInstanceConfig) {
            return classInstance && typeof classInstance != "function" ? classInstance : getInstance(model, []);
        } else {
            classInstance = classInstance && typeof classInstance != "function" ? classInstance : getInstance(model, autoInstanceConfig.arguments || [])
            if (autoInstanceConfig.objectPropInstanceConfig && autoInstanceConfig.objectPropInstanceConfig.length > 0) {
                autoInstanceConfig.objectPropInstanceConfig.forEach(t => {
                    let objectProperty = instanceContainer.properties.filter(property => property.name == t.propertyName && property.propertyType == OBJECT_PROPERTY)[0];
                    if (objectProperty) {
                        let data =classInstance[t.propertyName];
                        classInstance[t.propertyName] = getInstance(objectProperty.entity, t.arguments || []);
                        if (data)
                            this.setObjectValue(data, classInstance[t.propertyName]);
                    }
                })
            }
            if (autoInstanceConfig.arrayPropInstanceConfig && autoInstanceConfig.arrayPropInstanceConfig.length > 0) {
                autoInstanceConfig.arrayPropInstanceConfig.forEach(t => {
                    let property = instanceContainer.properties.filter(property => property.name == t.propertyName && property.propertyType == ARRAY_PROPERTY)[0];
                    if (property) {
                        let data = classInstance[t.propertyName];
                        classInstance[t.propertyName] = [];
                        for (var i = 0; i < t.rowItems; i++) {
                            let instance = getInstance(property.entity, t.arguments || []);
                            if (data && data[i])
                                this.setObjectValue(data[i], instance);
                            classInstance[t.propertyName].push(instance)
                        }
                    }
                })
            }
            return classInstance;
        }
    }

    protected updateObject(model: any, entityObject: any, formBuilderConfiguration: FormBuilderConfiguration) {
        let instanceContainer = instanceProvider(model);
        let classInstance = getInstance(model, []);
        if (instanceContainer) {
            instanceContainer.properties.forEach(t => {
                let entity = ((t.propertyType == OBJECT_PROPERTY || t.propertyType == ARRAY_PROPERTY) && t.entity) ? t.entity: (formBuilderConfiguration && formBuilderConfiguration.genericEntities) ? formBuilderConfiguration.genericEntities[t.name] : undefined;
                switch (t.propertyType) {
                    case PROPERTY:
                        classInstance[t.name] = this.getValue(entityObject, t, formBuilderConfiguration)
                        break;
                    case OBJECT_PROPERTY:
                        let objectValue = this.getValue(entityObject, t, formBuilderConfiguration);
                        if (objectValue)
                            classInstance[t.name] = this.updateObject(entity, objectValue, formBuilderConfiguration )
                        break;
                    case ARRAY_PROPERTY:
                        let arrayObjectValue = this.getValue(entityObject, t, formBuilderConfiguration);
                        if (arrayObjectValue && Array.isArray(arrayObjectValue)) {
                            classInstance[t.name] = [];
                            for (let row of arrayObjectValue) {
                                let instanceObject = this.updateObject(entity, row, formBuilderConfiguration )
                                classInstance[t.name].push(instanceObject);
                            }
                        }
                        break;
                }
            })
        }
        return classInstance;
    }


    protected instaceProvider(instanceFunc: any, entityObject: any): InstanceContainer {
        return instanceProvider(instanceFunc, entityObject);
    }

    protected getDefaultValue(propertyInfo: PropertyInfo, value: any, formBuilderConfiguration: FormBuilderConfiguration) {
        let defaultValue = (formBuilderConfiguration && formBuilderConfiguration.propsConfig && formBuilderConfiguration.propsConfig[propertyInfo.name] && formBuilderConfiguration.propsConfig[propertyInfo.name].defaultValue && !RegexValidator.isNotBlank(value)) ? formBuilderConfiguration.propsConfig[propertyInfo.name].defaultValue : (propertyInfo.defaultValue != undefined && !RegexValidator.isNotBlank(value)) ?
            propertyInfo.defaultValue :
            value
        return defaultValue;
    }

    protected sanitizeValue(instanceContainer: InstanceContainer, propertyName: string, value: any, entityObject: any, baseObject: any) {
        if (instanceContainer.sanitizers && instanceContainer.sanitizers[propertyName]) {
            for (let sanitizer of instanceContainer.sanitizers[propertyName])
                value = SANITIZERS[sanitizer.name](value,sanitizer.config);
        }
        if (entityObject[propertyName] !== undefined && entityObject[propertyName] !== value)
            entityObject[propertyName] = value;
        if (baseObject[propertyName] !== undefined && baseObject[propertyName] !== value)
            baseObject[propertyName] = value;
        return value;
    }

    private getValue(entityObject: { [key: string]: any }, propertyInfo: PropertyInfo, formBuilderConfiguration: FormBuilderConfiguration) {
        let propValue = (propertyInfo.dataPropertyName) ? entityObject[propertyInfo.dataPropertyName] : entityObject[propertyInfo.name];
        return this.getDefaultValue(propertyInfo,propValue,formBuilderConfiguration);
    }

    private setObjectValue(entityObject: {[key:string]:any},classInstance:any) {
        for (var column in entityObject) {
            classInstance[column] = entityObject[column];
        }
    }
}
