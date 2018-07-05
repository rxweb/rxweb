import { DecoratorConfiguration, InstanceContainer, PropertyInfo } from './validator.interface';
import { Linq } from "../util/linq";
import { AnnotationTypes } from "./validator.static";
import { PROPERTY } from "../const";

export const defaultContainer:
    {
        get<T>(instanceFunc: any): InstanceContainer,
        addAnnotation(instanceFunc: any, decoratorConfiguration: DecoratorConfiguration): void,
        addInstanceContainer(instanceFunc: any): void
        addProperty(instanceFunc: any, propertyInfo: PropertyInfo): void
    } = new (class {
        private instances: InstanceContainer[] = [];

        get<T>(instanceFunc: any): InstanceContainer {
            let instance: InstanceContainer = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            return instance;
        }

        addInstanceContainer(instanceFunc: any): InstanceContainer {
            let instanceContainer: InstanceContainer = {
                instance: instanceFunc,
                propertyAnnotations: [],
                properties: []
            }
            this.instances.push(instanceContainer);
            return instanceContainer;
        }

        addProperty(instanceFunc: any, propertyInfo: PropertyInfo): void {
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (instance) {
                this.addPropertyInfo(instance, propertyInfo);
            }
            else {
                instance = this.addInstanceContainer(instanceFunc);
                this.addPropertyInfo(instance, propertyInfo);
            }
        }

        addPropertyInfo(instance: InstanceContainer, propertyInfo: PropertyInfo) {
            var property = instance.properties.filter(t => t.name == propertyInfo.name)[0]
            if (!property)
                instance.properties.push(propertyInfo);
        }

        addAnnotation(instanceFunc: any, decoratorConfiguration: DecoratorConfiguration): void {
            this.addProperty(instanceFunc, { propertyType: PROPERTY, name: decoratorConfiguration.propertyName });
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (instance)
                instance.propertyAnnotations.push(decoratorConfiguration);
            else {
                instance = this.addInstanceContainer(instanceFunc);
                instance.propertyAnnotations.push(decoratorConfiguration);
            }
            if (decoratorConfiguration.config && decoratorConfiguration.config.conditionalExpressions) {
                let columns = Linq.expressionColumns(decoratorConfiguration.config.conditionalExpressions);
                this.addChangeValidation(instance, decoratorConfiguration.propertyName, columns);
            }
            if (instance && decoratorConfiguration.config && (decoratorConfiguration.annotationType == AnnotationTypes.compare || decoratorConfiguration.annotationType == AnnotationTypes.greaterThan || decoratorConfiguration.annotationType == AnnotationTypes.greaterThanEqualTo || decoratorConfiguration.annotationType == AnnotationTypes.lessThan || decoratorConfiguration.annotationType == AnnotationTypes.lessThanEqualTo)) {
                this.setConditionalValueProp(instance, decoratorConfiguration.config.fieldName, decoratorConfiguration.propertyName)
            }
        }

        private setConditionalValueProp(instance: InstanceContainer, propName: string, refPropName: string) {
            if (!instance.conditionalValidationProps)
                instance.conditionalValidationProps = {};
            if (!instance.conditionalValidationProps[propName])
                instance.conditionalValidationProps[propName] = [];
            if (instance.conditionalValidationProps[propName].indexOf(refPropName) == -1)
                instance.conditionalValidationProps[propName].push(refPropName);
        }
        addChangeValidation(instance: InstanceContainer, propertyName: string, columns: any[]) {
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
    })();
