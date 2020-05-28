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
        additionalGet(instance: any): TranslateContainerConfig[];
        defineProperty(instance: Function, propertyName: string, config: TranslateConfig): TranslateContainerConfig;
        defineAsyncProperty(instance: Function, propertyName: string, config: AsyncTranslateConfig): void;
        setComponentState(key: string, instance: Function);
        getComponentState(key: string);
        config: RxTranslateConfig;
        getActiveTranslations(): Array<TranslateContainerConfig>
    } = new (class {
        store: TranslateContainerConfig[] = new Array<TranslateContainerConfig>();
        additionalStore: TranslateContainerConfig[] = new Array<TranslateContainerConfig>();
        config: RxTranslateConfig;
        componentState: { [key: string]: Function } = {};
        set(instance: Function, config: TranslateConfig): void {
            let translateConfig = this.store.filter(t => t.instance == instance)[0]
            if (!translateConfig)
                this.store.push({ instance: instance, config: config });
            else 
                this.additionalStore.push({ instance: instance, config: config });
        }

        get(instance: Function): TranslateContainerConfig {
            let containerConfig = this.store.filter(t => t.instance == instance);
            return containerConfig.length > 0 ?containerConfig[0] : undefined;
        }

        additionalGet(instance: Function): TranslateContainerConfig[] {
            return this.additionalStore.filter(t => t.instance == instance);
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
            defineProperty(model, propertyName, modelName, config ? config.language : undefined);
            if (modelName != "global" && propertyName) {
                let instanceConfig: TranslateContainerConfig = { instance: model, config: config };
                this.set(model, config)
                let count = this.store.filter(t => t.instance == model).length;
                if (count == 1)
                    overrideDestroyMethod(model, config.translationName);
                return instanceConfig;
            } else if (!propertyName)
                this.set(model, config);
        }

        setComponentState(key: string, instance: Function) {
            this.componentState[key] = instance;
        }

        getComponentState(key: string) {
            return this.componentState[key];
        }

        getActiveTranslations() {
            return this.store;
        }
    })();