import { DecoratorConfiguration, InstanceContainer, PropertyInfo } from './validator.interface';
import { Linq } from "../util/linq";

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
            if (instance)
                instance.properties.push(propertyInfo);
            else
            {
                instance = this.addInstanceContainer(instanceFunc);
                instance.properties.push(propertyInfo);
            }
        }

        addAnnotation(instanceFunc: any, decoratorConfiguration: DecoratorConfiguration): void {
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
