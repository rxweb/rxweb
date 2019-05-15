export const DynamicReactiveFormConfig:
    {
        registerComponent(componentConfig: { [key: string]: any }): any[],
        removeComponent(typeNames: string[]): void,
        getComponent(typeName: string): any
    } = new (class {

        private componentsConfig: { [key: string]: any };

        registerComponent(componentsConfig: { [key: string]: any }):any[] {
            let entryComponents = [];
            if (!this.componentsConfig)
                this.componentsConfig = {};
            Object.keys(componentsConfig).forEach(key => {
                let componentConfig = componentsConfig[key];
                this.componentsConfig[key] = componentConfig;
                entryComponents.push(componentConfig.component);
            });
            return entryComponents;
        }

        removeComponent(typeNames: string[]): void {
            typeNames.forEach(name => delete this.componentsConfig[name])
        }

        getComponent(typeName: string):any {
            let componentConfig = this.componentsConfig[typeName];
            return componentConfig;
        }

    });
        