import { TranslateConfig } from "../interface/translate-config";
import { TranslateContainerConfig } from "../interface/translate-container-config";
import { defineProperty } from "../functions/define-property";
import { defineAsyncProperty } from "../functions/define-async-property";
import { overrideDestroyMethod } from "../functions/override-destroy";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { AsyncTranslateConfig } from "../interface/async-translate-config";

export const translateContainer:
    {
        set(instance: Function, config: TranslateConfig): void;
        getByName(name: string): TranslateContainerConfig;
        get(instance: any): TranslateContainerConfig;
        defineProperty(instance: Function, propertyName: string, config: TranslateConfig): TranslateContainerConfig;
        defineAsyncProperty(instance: Function, propertyName: string, config: AsyncTranslateConfig): void;
        config: RxTranslateConfig;
    } = new (class {
        store: TranslateContainerConfig[] = new Array<TranslateContainerConfig>();
        config: RxTranslateConfig;
        set(instance: Function, config: TranslateConfig): void {
            this.store.push({ instance: instance, config: config });
        }

        get(instance: Function): TranslateContainerConfig {
            let containerConfig = this.store.filter(t => t.instance == instance);
            return containerConfig.length > 0 ?containerConfig[0] : undefined;
        }

        getByName(name: string): TranslateContainerConfig {
            let containerConfig = this.store.filter(t => t.config.translationName == name);
            return containerConfig.length > 0 ? containerConfig[0] : undefined;
        }


        defineAsyncProperty(instance: Function, propertyName: string, config: AsyncTranslateConfig) {
            let isPropertyKey = (propertyName != undefined);
            var model: Function = !isPropertyKey ? instance : instance.constructor;
            defineAsyncProperty(model, propertyName, config);
        }

        defineProperty(instance: Function, propertyName: string, config?: TranslateConfig): TranslateContainerConfig {
            let isPropertyKey = (propertyName != undefined);
            var model: Function = !isPropertyKey ? instance : instance.constructor;
            let modelName = config === undefined ? "global" : config.translationName;
            defineProperty(model, propertyName, modelName);
            if (modelName != "global") {
                let instanceConfig: TranslateContainerConfig = { instance: model, config: config };
                this.set(model, config)
                let count = this.store.filter(t => t.instance == model).length;
                if (count == 1)
                    overrideDestroyMethod(model, config.translationName);
                return instanceConfig;
            }
        }
    })();