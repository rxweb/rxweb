import { ModelDecoratorConfiguration } from "../interfaces/model-decorator-configuration";
import { RouterModuleConfig } from "../interfaces/router-module-config";

export const routeContainer:
    {
        add(routerConfig: RouterModuleConfig),
        get(): RouterModuleConfig,
        setUser(user: { [key: string]: any }),
        addModelDecorator(target: Function, data: any, type: string),
        getModelDecorator(target: Function, type: string): ModelDecoratorConfiguration
        getUser(): { [key: string]: any };
    } = new (class {
        state: RouterModuleConfig = {};
        user: { [key: string]: any };
        modelDecorators: Array<ModelDecoratorConfiguration> = new Array<ModelDecoratorConfiguration>();

        add(routerConfig: RouterModuleConfig) {
            this.state = routerConfig;
        }

        get(): RouterModuleConfig {
            return this.state;
        }

        getUser() {
            return this.user;
        }

        setUser(user: { [key: string]: any }) {
            this.user = user;
        }

        addModelDecorator(target: Function, data: any, type: string) {
            this.modelDecorators.push({ target: target, functions: data, type: type });
        }

        getModelDecorator(target: Function, type: string): ModelDecoratorConfiguration {
            return this.modelDecorators.filter(t => t.target == target && t.type == type)[0];
        }

    })();
