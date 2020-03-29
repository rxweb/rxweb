import { TranslateConfig } from "../interface/translate-config";
import { TranslateContainerConfig } from "../interface/translate-container-config";
import { defineProperty } from "../functions/define-property";
import { overrideDestroyMethod } from "../functions/override-destroy";

export const translateContainer:
    {
        set(instance: Function, config: TranslateConfig): void;
        getByName(name: string): TranslateContainerConfig;
        get(instance: any): TranslateContainerConfig;
        defineProperty(instance: Function, propertyName: string, config: TranslateConfig): void;
    } = new (class {
        store: TranslateContainerConfig[] = new Array<TranslateContainerConfig>();

        set(instance: Function, config: TranslateConfig): void {
            this.store.push({ instance: instance, config: config });
        }

        get(instance: Function): TranslateContainerConfig {
            let containerConfig = this.store.filter(t => t.instance == instance);
            return containerConfig.length > 0 ?containerConfig[0] : undefined;
        }

        getByName(name: string): TranslateContainerConfig {
            let containerConfig = this.store.filter(t => t.config.name == name);
            return containerConfig.length > 0 ? containerConfig[0] : undefined;
        }

        defineProperty(instance: Function, propertyName: string, config?: TranslateConfig) {
            let isPropertyKey = (propertyName != undefined);
            var model: Function = !isPropertyKey ? instance : instance.constructor;
            let modelName = config === undefined ? "global":config.name;
            defineProperty(model, propertyName, modelName);
            if (modelName != "global") {
                this.set(model, config)
                let count = this.store.filter(t => t.instance == model).length;
                if (count == 1)
                    overrideDestroyMethod(model, config.name);
            }
        }
    })();