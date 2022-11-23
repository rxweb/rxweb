import { DecoratorConfiguration, InstanceContainer, PropertyInfo} from './validator.interface';
import { Linq } from "../util/linq";
import { AnnotationTypes } from "./validator.static";
import { PROPERTY, RXCODE, ARRAY_PROPERTY, OBJECT_PROPERTY } from "../const";
import { PropsConfig } from "../models/config/props-config"
import { DECORATORS } from "../const/decorators.const";

export const defaultContainer:
    {
        get<T>(instanceFunc: any): InstanceContainer,
        addAnnotation(instanceFunc: any, decoratorConfiguration: DecoratorConfiguration): void,
        addInstanceContainer(instanceFunc: any): void,
        addProperty(instanceFunc: any, propertyInfo: PropertyInfo): void,
        addChangeValidation(instance: InstanceContainer, propertyName: string, columns: any[]): void,
        init(target: any, parameterIndex: any, propertyKey: string, annotationType: string, config: any, isAsync: boolean): void,
        initPropertyObject(name: string, propertyType: string, entity: any, target: any, config?: any): void,
        modelIncrementCount: number,
        clearInstance(instance: any): void,
        setConditionalValueProp(instance: InstanceContainer, propName: string, refPropName: string): void,
        addDecoratorConfig(target: any, parameterIndex: any, propertyKey: string, config: any, decoratorType: string): void,
        setLogicalConditional(instance: any, annotationType: string, fieldName: string, propertyName: string): void,
        addSanitizer(target: any, parameterIndex: any, propertyKey: string, decoratorType: string, value?: any): void,
        addPropsConfig(target: any, configs: PropsConfig[]): void,
        isExperimental: boolean;
    } = new (class {
        isExperimental: boolean;
        private instances: InstanceContainer[] = [];
        modelIncrementCount: number = 0;
        get<T>(instanceFunc: any): InstanceContainer {
            let instance: InstanceContainer = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            return instance;
        }

        getInstance(target: any, parameterIndex: any, propertyKey: string, decoratorType: string) {
            let isPropertyKey = (propertyKey != undefined);
            let instanceFunc = !isPropertyKey ? target : target.constructor
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (!instance)
                instance = this.addInstanceContainer(instanceFunc);
            return instance;
        }
        addPropsConfig(target: any, configs: PropsConfig[]) {
            let instanceContainer = this.instances.filter(instance => instance.instance == target)[0];
            if (instanceContainer) {
                for (let config of configs) {
                    for (let prop of config.propNames) {
                        let propertyInfo = instanceContainer.properties.filter(t => t.name == prop && (t.propertyType !== OBJECT_PROPERTY && t.propertyType !== ARRAY_PROPERTY))[0];
                        if (propertyInfo) {
                            this.addPropConfig(target, [propertyInfo], config)
                        } else
                            if (prop === ":all:")
                                this.addPropConfig(target, instanceContainer.properties.filter(t => t.propertyType !== OBJECT_PROPERTY && t.propertyType !== ARRAY_PROPERTY), config);
                    }
                }
            } else if (configs === undefined)
                this.addInstanceContainer(target);
            
        }
        addPropConfig(target:any,properties: PropertyInfo[], config: PropsConfig) {
            for (var propertyInfo of properties) {
                let excludeProp: boolean = false;
                if (config.excludePropNames)
                    excludeProp = config.excludePropNames.filter(t => t == propertyInfo.name)[0] !== undefined;
                if (!excludeProp) {
                    if (config.validationConfig)
                        for (let typeName in config.validationConfig) {
                            this.init({ constructor: target }, 0, propertyInfo.name, typeName, config.validationConfig[typeName] === true ? undefined : config.validationConfig[typeName], false);
                        }
                    if (config.error)
                        this.addDecoratorConfig({ constructor: target }, 0, propertyInfo.name, config.error, DECORATORS.error)
                    if (config.disable)
                        this.addDecoratorConfig({ constructor: target }, 0, propertyInfo.name, config.disable, DECORATORS.disabled)
                    if (config.elementClass)
                        this.addDecoratorConfig({ constructor: target }, 0, propertyInfo.name, config.elementClass, DECORATORS.elementClass)
                    if (config.ignore)
                        propertyInfo.ignore = config.ignore
                }
            }
        }
        addSanitizer(target: any, parameterIndex: any, propertyKey: string, decoratorType: string, value?: any) {
            let instance = this.getInstance(target, parameterIndex, propertyKey, decoratorType);
            if (instance) {
                if (!instance.sanitizers[propertyKey])
                    instance.sanitizers[propertyKey] = [];
                instance.sanitizers[propertyKey].push({ name: decoratorType, config: value });
            }
        }

        addDecoratorConfig(target: any, parameterIndex: any, propertyKey: string, config: any, decoratorType: string): void {
            let isPropertyKey = (propertyKey != undefined);
            let instanceFunc = !isPropertyKey ? target : target.constructor
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (!instance)
                instance = this.addInstanceContainer(instanceFunc);
            instance.nonValidationDecorators[decoratorType].conditionalExpressions[propertyKey] = config.conditionalExpression;
            let columns = Linq.expressionColumns(config.conditionalExpression, true);
            columns.forEach(column => {
                if (column.argumentIndex !== -1) {
                    let columnName = (!column.objectPropName) ? `${column.propName}${RXCODE}${column.argumentIndex}` : `${column.objectPropName}.${column.propName}${RXCODE}${column.argumentIndex}`;
                    if (!instance.nonValidationDecorators[decoratorType].changeDetection[columnName])
                        instance.nonValidationDecorators[decoratorType].changeDetection[columnName] = [];
                    let disabledColumns = instance.nonValidationDecorators[decoratorType].changeDetection[columnName];
                    if (disabledColumns.indexOf(columnName) === -1)
                        disabledColumns.push(propertyKey);
                } else {
                    if (!instance.nonValidationDecorators[decoratorType].controlProp[propertyKey])
                        instance.nonValidationDecorators[decoratorType].controlProp[propertyKey] = {};
                    instance.nonValidationDecorators[decoratorType].controlProp[propertyKey][column.propName.replace(";", "")] = true;
                }
            })
        }


        init(target: any, parameterIndex: any, propertyKey: string, annotationType: string, config: any, isAsync: boolean): void {
            var decoratorConfiguration: DecoratorConfiguration = {
                propertyIndex: parameterIndex,
                propertyName: propertyKey,
                annotationType: annotationType,
                config: config,
                isAsync: isAsync,
                isValidator : annotationType !== "updateOn"
            }
            let isPropertyKey = (propertyKey != undefined);
            this.addAnnotation(!isPropertyKey ? target : target.constructor, decoratorConfiguration);
        }

        initPropertyObject(name: string, propertyType: string, entity: any, target: any, config?: any) {
            var propertyInfo: PropertyInfo = {
                name: name,
                propertyType: propertyType,
                entity: entity,
                dataPropertyName: config ? config.name : undefined,
                entityProvider: config ? config.entityProvider : undefined,
                defaultValue:config ? config.defaultValue : undefined,
                objectConfig:config && config.autoCreate ? {autoCreate:config.autoCreate}: undefined
            }
            defaultContainer.addProperty(target.constructor, propertyInfo); 
        }

        addInstanceContainer(instanceFunc: any): InstanceContainer {
            let instanceContainer: InstanceContainer = {
                instance: instanceFunc,
                propertyAnnotations: [],
                properties: [],
                nonValidationDecorators: {
                    disabled: {
                        conditionalExpressions: {},
                        changeDetection: {},
                        controlProp: {}
                    }, error: {
                        conditionalExpressions: {},
                        changeDetection: {},
                        controlProp: {}
                    }, elementClass: {
                        conditionalExpressions: {},
                        changeDetection: {},
                        controlProp: {}
                    }
                },
                sanitizers: {}
            }
            this.instances.push(instanceContainer);
            return instanceContainer;
        }


        addProperty(instanceFunc: any, propertyInfo: PropertyInfo, isFromAnnotation: boolean = false): void {
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (instance) {
                this.addPropertyInfo(instance, propertyInfo, !isFromAnnotation);
            }
            else {
                instance = this.addInstanceContainer(instanceFunc);
                this.addPropertyInfo(instance, propertyInfo);
            }
        }

        addPropertyInfo(instance: InstanceContainer, propertyInfo: PropertyInfo, isAddProperty: boolean = false) {
            var property = this.getProperty(instance, propertyInfo);
            if (!property)
                instance.properties.push(propertyInfo);
            else if (isAddProperty)
                this.updateProperty(property, propertyInfo);
            if(property && propertyInfo.messageNexus)
                property.messageNexus = propertyInfo.messageNexus;
        }

        addAnnotation(instanceFunc: any, decoratorConfiguration: DecoratorConfiguration): void {
            this.addProperty(instanceFunc, { propertyType: PROPERTY, name: decoratorConfiguration.propertyName }, true);
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (instance)
                instance.propertyAnnotations.push(decoratorConfiguration);
            else {
                instance = this.addInstanceContainer(instanceFunc);
                instance.propertyAnnotations.push(decoratorConfiguration);
            }
            if (decoratorConfiguration.config && decoratorConfiguration.config.conditionalExpression) {
                let columns = Linq.expressionColumns(decoratorConfiguration.config.conditionalExpression);
                this.addChangeValidation(instance, decoratorConfiguration.propertyName, columns);
            }
            if (decoratorConfiguration.config && decoratorConfiguration.config.dynamicConfig) {
                let columns = Linq.dynamicConfigParser(decoratorConfiguration.config.dynamicConfig, decoratorConfiguration.propertyName);
                this.addChangeValidation(instance, decoratorConfiguration.propertyName, columns);
            }
            this.setConditionalColumns(instance, decoratorConfiguration);
        }

        setConditionalColumns(instance: any, decoratorConfiguration: DecoratorConfiguration) {
            if (instance && decoratorConfiguration.config) {
                if (decoratorConfiguration.annotationType == AnnotationTypes.and || decoratorConfiguration.annotationType == AnnotationTypes.or || decoratorConfiguration.annotationType == AnnotationTypes.not) {
                    Object.keys(decoratorConfiguration.config.validation).forEach(t => {
                        if (typeof decoratorConfiguration.config.validation[t] !== "boolean")
                            this.setLogicalConditional(instance, t, decoratorConfiguration.config.validation[t].fieldName, decoratorConfiguration.propertyName)
                    })
                } else
                    this.setLogicalConditional(instance, decoratorConfiguration.annotationType, decoratorConfiguration.config.fieldName, decoratorConfiguration.propertyName);
            }
        }

        setLogicalConditional(instance: any, annotationType: string, fieldName: string, propertyName: string) {
            if (instance && ((annotationType == AnnotationTypes.compare || annotationType == AnnotationTypes.greaterThan || annotationType == AnnotationTypes.greaterThanEqualTo || annotationType == AnnotationTypes.lessThan || annotationType == AnnotationTypes.lessThanEqualTo || annotationType == AnnotationTypes.different || annotationType == AnnotationTypes.factor || annotationType == AnnotationTypes.minTime || annotationType == AnnotationTypes.maxTime) || (annotationType == AnnotationTypes.creditCard && fieldName) || ((annotationType == AnnotationTypes.minDate || annotationType == AnnotationTypes.maxDate) && fieldName))) {
                this.setConditionalValueProp(instance, fieldName, propertyName)
            }
        }
        setConditionalValueProp(instance: InstanceContainer, propName: string, refPropName: string) {
            if (propName) {
                let splitProps = propName.split ? propName.split('.') : '';
                if (splitProps.length < 2) {
                    if (!instance.conditionalValidationProps)
                        instance.conditionalValidationProps = {};
                    if (!instance.conditionalValidationProps[propName])
                        instance.conditionalValidationProps[propName] = [];
                    if (instance.conditionalValidationProps[propName].indexOf(refPropName) == -1)
                        instance.conditionalValidationProps[propName].push(refPropName);
                } else
                    this.addChangeValidation(instance, refPropName, [{ argumentIndex: 1, objectPropName: splitProps[0], propName: splitProps[1], referencePropName: refPropName }])
            }
        }
        addChangeValidation(instance: InstanceContainer, propertyName: string, columns: any[]): void {
            if (instance) {
                if (!instance.conditionalValidationProps)
                    instance.conditionalValidationProps = {};

                columns.forEach(t => {
                    if (t.propName && !t.objectPropName) {
                        if (!instance.conditionalValidationProps[t.propName])
                            instance.conditionalValidationProps[t.propName] = [];
                        if (instance.conditionalValidationProps[t.propName].indexOf(propertyName) == -1)
                            instance.conditionalValidationProps[t.propName].push(propertyName);
                    } else {
                        if (t.propName && t.objectPropName) {
                            if (!instance.conditionalObjectProps)
                                instance.conditionalObjectProps = [];
                            t.referencePropName = propertyName;
                            instance.conditionalObjectProps.push(t);
                        }
                    }
                })
            }
        }

        clearInstance(instanceFunc: any) {
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (instance) {
                let indexOf = this.instances.indexOf(instance);
                this.instances.splice(indexOf, 1);
            }
        }

        getProperty(instance: InstanceContainer, propertyInfo: PropertyInfo) {
            return instance.properties.filter(t => t.name == propertyInfo.name)[0]
        }

        updateProperty(property: PropertyInfo, currentProperty: PropertyInfo) {
            property.dataPropertyName = currentProperty.dataPropertyName;
            property.defaultValue = currentProperty.defaultValue;
        }
    })();
