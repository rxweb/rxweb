import { DecoratorConfiguration, InstanceContainer, PropertyInfo } from './validator.interface';
import { Linq } from "../util/linq";
import { AnnotationTypes } from "./validator.static";
import { PROPERTY,OBJECT_PROPERTY } from "../const";

export const defaultContainer:
    {
        get<T>(instanceFunc: any): InstanceContainer,
        addAnnotation(instanceFunc: any, decoratorConfiguration: DecoratorConfiguration): void,
        addInstanceContainer(instanceFunc: any): void,
        addProperty(instanceFunc: any, propertyInfo: PropertyInfo): void,
        addChangeValidation(instance: InstanceContainer, propertyName: string, columns: any[]): void,
        init(target: any,parameterIndex:any,propertyKey:string, annotationType:string, config:any,isAsync:boolean) : void,
        initPropertyObject(name:string,propertyType:string,entity:any,target:any,config?:any) : void,
        modelIncrementCount:number,
        clearInstance(instance:any):void,
        setConditionalValueProp(instance: InstanceContainer, propName: string, refPropName: string):void
    } = new (class {
        private instances: InstanceContainer[] = [];
        modelIncrementCount:number = 0;
        get<T>(instanceFunc: any): InstanceContainer {
            let instance: InstanceContainer = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            return instance;
        }


        init(target:any,parameterIndex: any, propertyKey: string, annotationType: string, config: any,isAsync:boolean): void {
          var decoratorConfiguration: DecoratorConfiguration = {
            propertyIndex: parameterIndex,
            propertyName: propertyKey,
            annotationType: annotationType,
            config: config,
            isAsync:isAsync
          }
          let isPropertyKey = (propertyKey != undefined);
          this.addAnnotation(!isPropertyKey ? target : target.constructor, decoratorConfiguration);  
        }

        initPropertyObject(name:string,propertyType:string,entity:any,target:any,config?:any){
            var propertyInfo: PropertyInfo = {
                name: name,
                propertyType: propertyType,
                entity: entity,
                dataPropertyName: config ? config.name : undefined
            }
            defaultContainer.addProperty(target.constructor, propertyInfo);
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


        addProperty(instanceFunc: any, propertyInfo: PropertyInfo,isFromAnnotation:boolean = false): void {
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (instance) {
                this.addPropertyInfo(instance, propertyInfo,!isFromAnnotation);
            }
            else {
                instance = this.addInstanceContainer(instanceFunc);
                this.addPropertyInfo(instance, propertyInfo);
            }
        }

        addPropertyInfo(instance: InstanceContainer, propertyInfo: PropertyInfo,isAddProperty:boolean = false) {
            var property = this.getProperty(instance,propertyInfo);
            if (!property)
                instance.properties.push(propertyInfo);
            else if(isAddProperty)
                this.updateProperty(property,propertyInfo);
        }

        addAnnotation(instanceFunc: any, decoratorConfiguration: DecoratorConfiguration): void {
            this.addProperty(instanceFunc, { propertyType: PROPERTY, name: decoratorConfiguration.propertyName },true);
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
            if (instance && decoratorConfiguration.config && ((decoratorConfiguration.annotationType == AnnotationTypes.compare || decoratorConfiguration.annotationType == AnnotationTypes.greaterThan || decoratorConfiguration.annotationType == AnnotationTypes.greaterThanEqualTo || decoratorConfiguration.annotationType == AnnotationTypes.lessThan || decoratorConfiguration.annotationType == AnnotationTypes.lessThanEqualTo  || decoratorConfiguration.annotationType == AnnotationTypes.different  || decoratorConfiguration.annotationType == AnnotationTypes.factor) || (decoratorConfiguration.annotationType == AnnotationTypes.creditCard && decoratorConfiguration.config.fieldName) || ((decoratorConfiguration.annotationType == AnnotationTypes.minDate || decoratorConfiguration.annotationType == AnnotationTypes.maxDate) && decoratorConfiguration.config.fieldName))) {
                this.setConditionalValueProp(instance, decoratorConfiguration.config.fieldName, decoratorConfiguration.propertyName)
            }
        }

        setConditionalValueProp(instance: InstanceContainer, propName: string, refPropName: string) {
            if (!instance.conditionalValidationProps)
                instance.conditionalValidationProps = {};
            if (!instance.conditionalValidationProps[propName])
                instance.conditionalValidationProps[propName] = [];
            if (instance.conditionalValidationProps[propName].indexOf(refPropName) == -1)
                instance.conditionalValidationProps[propName].push(refPropName);
        }
        addChangeValidation(instance: InstanceContainer, propertyName: string, columns: any[]) :void {
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

      clearInstance(instanceFunc:any){
        let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
        if(instance){
        let indexOf = this.instances.indexOf(instance);
        this.instances.splice(indexOf,1);
        }
      }

      getProperty(instance: InstanceContainer, propertyInfo: PropertyInfo) {
        return instance.properties.filter(t => t.name == propertyInfo.name)[0]
      }

      updateProperty(property:PropertyInfo,currentProperty:PropertyInfo){
        property.dataPropertyName = currentProperty.dataPropertyName;
        property.defaultValue = currentProperty.defaultValue;
      }
    })();
