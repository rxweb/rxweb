import { DecoratorConfig } from "../interface/decorator-config";

export const localizationContainer:
    {
        addModelDecorator(target: Function, data: any, type: string),
        getModelDecorator(target: Function, type: string): DecoratorConfig
    } = new (class {
        modelDecorators: Array<DecoratorConfig> = new Array<DecoratorConfig>();

        addModelDecorator(target: Function, data: any, name: string) {
            this.modelDecorators.push({ target: target, config: data, name: name });
        }

        getModelDecorator(target: Function, name: string): DecoratorConfig {
            return this.modelDecorators.filter(t => t.target == target && t.name == name)[0];
        }

    })();
