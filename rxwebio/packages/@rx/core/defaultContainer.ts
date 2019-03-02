import {AnnotationConfiguration,InstanceContainer } from './validator.interface';

export const defaultContainer:
    {
        get<T>(instanceFunc: any): InstanceContainer,
        addAnnotation(instanceFunc: any, annotationConfiguration: AnnotationConfiguration): void,
        addInstanceContainer(instanceFunc: any, tableName?: string): void,
        addPropertyName(instanceFunc:any,propertyName:string):void
    } = new (class {
        private instances: InstanceContainer[] = [];

        get<T>(instanceFunc: any): InstanceContainer {
            let instance: InstanceContainer = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            return instance;
        }

        addPropertyName(instanceFunc: any, propertyName: string): void {
            let instance: InstanceContainer = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (!instance) {
              instance = {
                instance : instanceFunc,
                propertyAnnotations :[],
                propertyName: propertyName,
                tableName:''
              }
                this.instances.push(instance);
            } else {
                instance.propertyName = propertyName;
            }
        }

        addInstanceContainer(instanceFunc: any,tableName?:string): void {
            let instance: InstanceContainer = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (!instance) {
              instance = {
                instance: instanceFunc,
                propertyAnnotations: [],
                propertyName: '',
                tableName: ''
              }
                if (tableName) {
                    instance.tableName = tableName
                }
                this.instances.push(instance);
            } else {
                if (tableName) {
                    instance.tableName = tableName
                }
            }

        }

        addAnnotation(instanceFunc: any, annotationConfiguration: AnnotationConfiguration): void {
            let instance = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            if (instance)
                instance.propertyAnnotations.push(annotationConfiguration);
            else {
                let instance: InstanceContainer = {
                    instance: instanceFunc, propertyAnnotations: [annotationConfiguration], tableName: '', propertyName:''
                }
                this.instances.push(instance);
            }
        }

    })();
