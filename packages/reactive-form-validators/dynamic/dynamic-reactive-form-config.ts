import { ComponentConfig } from "../models/config/component-config"
export const DynamicReactiveFormConfig:
    {
        registerComponent(componentConfig: { [key: string]: ComponentConfig }): any[],
        removeComponent(typeNames: string[]): void,
        getComponentConfig(typeName: string): any
    } = new (class {

        private componentConfigs: { [key: string]: ComponentConfig } = {};

        registerComponent(configs: { [key: string]: ComponentConfig }):any[] {
            let entryComponents = [];
            Object.keys(configs).forEach(key => {
                this.componentConfigs[key] = configs[key];
                entryComponents.push(this.componentConfigs[key].component);
            });
            return entryComponents;
        }

        removeComponent(typeNames: string[]): void {
            typeNames.forEach(name => delete this.componentConfigs[name])
        }

        getComponentConfig(typeName: string):any {
            let componentConfig = this.componentConfigs[typeName];
            return componentConfig;
        }

    });
        