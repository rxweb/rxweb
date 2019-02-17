import { FormBuilderConfiguration } from '../models/form-builder-configuration'
import { AutoInstanceConfig } from '../models/interface/auto-instance-config.interface'
import { defaultContainer } from '../core/defaultContainer';
import { InstanceContainer,PropertyInfo} from '../core/validator.interface';
import { ARRAY_PROPERTY, OBJECT_PROPERTY, PROPERTY } from "../const"
import { EntityService } from './entity.service';
import { RegexValidator } from '../util/regex-validator';

export class BaseFormBuilder {
    private entityService: EntityService;
    constructor() {
        this.entityService = new EntityService();
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
            return classInstance && typeof classInstance != "function" ? classInstance : this.getInstance(model, []);
        } else {
            classInstance = classInstance && typeof classInstance != "function" ? classInstance : this.getInstance(model, autoInstanceConfig.arguments || [])
            if (autoInstanceConfig.objectPropInstanceConfig && autoInstanceConfig.objectPropInstanceConfig.length > 0) {
                autoInstanceConfig.objectPropInstanceConfig.forEach(t => {
                    let objectProperty = instanceContainer.properties.filter(property => property.name == t.propertyName && property.propertyType == OBJECT_PROPERTY)[0];
                    if (objectProperty)
                        classInstance[t.propertyName] = this.getInstance(objectProperty.entity, t.arguments || []);
                })
            }
            if (autoInstanceConfig.arrayPropInstanceConfig && autoInstanceConfig.arrayPropInstanceConfig.length > 0) {
                autoInstanceConfig.arrayPropInstanceConfig.forEach(t => {
                    let property = instanceContainer.properties.filter(property => property.name == t.propertyName && property.propertyType == ARRAY_PROPERTY)[0];
                    if (property) {
                        classInstance[t.propertyName] = [];
                        for (var i = 0; i < t.rowItems; i++) {
                            classInstance[t.propertyName].push(this.getInstance(property.entity, t.arguments || []))
                        }
                    }
                })
            }
            return classInstance;
        }
    }

    protected updateObject(model: any, entityObject: any) {
        let instanceContainer = defaultContainer.get(model);
        let classInstance = this.getInstance(model, []);
        if (instanceContainer) {
            instanceContainer.properties.forEach(t => {
                switch (t.propertyType) {
                    case PROPERTY:
                        classInstance[t.name] = this.getValue(entityObject,t)
                        break;
                    case OBJECT_PROPERTY:
                        let objectValue = this.getValue(entityObject,t);
                        if (objectValue)
                            classInstance[t.name] = this.updateObject(t.entity,objectValue)
                        break;
                    case ARRAY_PROPERTY:
                        let arrayObjectValue = this.getValue(entityObject,t);
                        if (arrayObjectValue && Array.isArray(arrayObjectValue)) {
                            classInstance[t.name] = [];
                            for (let row of arrayObjectValue) {
                                let instanceObject = this.updateObject(t.entity, row)
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
        let instance:any = defaultContainer.get(instanceFunc);
        let prototype: any = entityObject ? entityObject.__proto__ : this.getInstance(instanceFunc, []).__proto__;
        if (prototype.__proto__) {
            let isLoop = false;
            do {
                isLoop = prototype.__proto__.constructor != Object;
                if (isLoop) {
                    let extendClassInstance: any = defaultContainer.get(prototype.__proto__.constructor);
                    instance = this.entityService.merge(this.entityService.clone(instance), this.entityService.clone(extendClassInstance))
                    prototype = prototype.__proto__;
                }
            } while (isLoop)

        }
                return instance;
    }


    private getInstance(model: any, objectArguments: any[]) {
        let classInstance = Object.create(model.prototype)
        model.apply(classInstance, objectArguments);
        return classInstance;
    }

    protected getDefaultValue(propertyInfo:PropertyInfo,value:any){
        return (propertyInfo.defaultValue != undefined && !RegexValidator.isNotBlank(value)) ?
            propertyInfo.defaultValue:
            value;
    }

    private getValue(entityObject:{[key:string]:any},propertyInfo:PropertyInfo){
        let propValue = (propertyInfo.dataPropertyName) ? entityObject[propertyInfo.dataPropertyName] : entityObject[propertyInfo.name];
        return this.getDefaultValue(propertyInfo,propValue);
    }
}
