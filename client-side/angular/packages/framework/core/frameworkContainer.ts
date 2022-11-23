import { DecoratorConfig, ComponentPropConfig, PropertyInfo } from "../interface/component-prop-config";
import { ComponentDecoratorConfig } from "../interface/component-decorator-config";
import { AuthorizeBootstrapConfig } from "../interface/config/authorize-bootstrap-config";
import { getInstance } from "../functions/get-instance";
import { IAuthorize } from "../interface/config/i-authorize";
import { IMultilingual } from "../interface/config/i-multilingual";

export const frameworkContainer:
    {
        get(instanceFunc: any): ComponentPropConfig
        addAnnotation(instanceFunc: any, decoratorConfig: DecoratorConfig): void,
        addDecorator(instance: any, type: string, config: any),
        getDecoratorInfo(instanceFunc: Function): ComponentDecoratorConfig,
        authorize: IAuthorize,
        multilingual: IMultilingual
        setAuthorizeAndMultilingualDecorator(decorators: {
            authorize?: IAuthorize,
            multilingual?: IMultilingual
        }):void
    } = new (class {
        private componentPropConfigs: ComponentPropConfig[] = [];
        private componentConfigs: ComponentDecoratorConfig[] = [];
        authorize: IAuthorize;
        multilingual: IMultilingual;


        setAuthorizeAndMultilingualDecorator(decorators: {
            authorize?: IAuthorize,
            multilingual?: IMultilingual
        }) {
            if (decorators.authorize)
                this.authorize = getInstance(decorators.authorize, []);
            if (decorators.multilingual)
                this.multilingual = getInstance(decorators.multilingual, []);
        }

        get(instanceFunc: Function): ComponentPropConfig {
            let instance: ComponentPropConfig = this.componentPropConfigs.filter(instance => instance.instance === instanceFunc)[0];
            return instance;
        }

        getDecoratorInfo(instanceFunc: Function): ComponentDecoratorConfig {
            let instance: ComponentDecoratorConfig = this.componentConfigs.filter(instance => instance.instance === instanceFunc)[0];
            return instance;
        }

        addDecorator(instance: any, type: string, config: any) {
            var componentConfig = this.componentConfigs.filter(t => t.instance == instance)[0];
            if (componentConfig)
                componentConfig.decorators.push({ type: type, config: config });
            else {
                componentConfig = {
                    instance: instance,
                    decorators: [{ type: type, config: config }]
                };
                this.componentConfigs.push(componentConfig)
            }
        }

        addAnnotation(instance: any, decoratorConfig: DecoratorConfig) {
            var componentPropConfig = this.componentPropConfigs.filter(t => t.instance == instance)[0];
            if (componentPropConfig) {
                this.addProperty(componentPropConfig, decoratorConfig);
            } else {
                componentPropConfig = {
                    instance: instance,
                    properties:new Array<PropertyInfo>()
                }
                this.componentPropConfigs.push(componentPropConfig);
                this.addProperty(componentPropConfig, decoratorConfig);
            }
        }

        private addProperty(componentPropConfig: ComponentPropConfig, decoratorConfig: DecoratorConfig) {
            if (!componentPropConfig.properties)
                componentPropConfig.properties = new Array<PropertyInfo>();
            var propertyInfo = componentPropConfig.properties.filter(t => t.name == decoratorConfig.propName)[0];
            if (propertyInfo)
                propertyInfo.propertyAnnotations.push({ type: decoratorConfig.type, config: decoratorConfig.config })
            else {
                componentPropConfig.properties.push({
                    name: decoratorConfig.propName,
                    propertyAnnotations: [{ type: decoratorConfig.type, config: decoratorConfig.config }]
                })
            }
        }
        
    })();
