import { RxTranslateConfig } from "../interface/rx-translate-config";
import { TranslationModelData } from "../interface/translation-model-data";

export const MultiLingualData:
    {
        addOrUpdate(key: string, data: { [key: string]: any }, translationName: string, languageCode?: string);
        addOrUpdateComponent(key: string, data: { [key: string]: any }, instance: Function, refMarkedId: number);
        getComponentPropValue(key: string, instance: Function, refMarkedId: number);
        removeComponentPropValue(instance: Function, refMarkedId: number, keyName?: string);
        remove(key: string);
        get(key: string);
        clearInActives(config: RxTranslateConfig);
        getActiveKeys();
        contains(key: string, languageCode: string);
        data: { [key: string]: any };
    } = new (class {
        private translationModelData: Array<TranslationModelData> = new Array<TranslationModelData>();
        data: { [key: string]: any } = {};
        private keys: { [key: string]: boolean } = {};
        private contentKeysByLanguage: { [key: string]: string } = {};

        addOrUpdate(key: string, data: { [key: string]: any }, translationName: string, languageCode?: string) {
            this.data[key] = data;
            this.keys[translationName] = true;
            if (languageCode)
                this.contentKeysByLanguage[key] = languageCode
        }


        addOrUpdateComponent(key: string, data: { [key: string]: any }, instance: Function, refMarkedId: number) {
            let indexOf = this.translationModelData.findIndex(t => t.instance == instance && t.key == key && t.rxRefMarkedId == refMarkedId);
            if (indexOf != -1)
                this.translationModelData[indexOf] = { key: key, data: data, instance: instance, rxRefMarkedId: refMarkedId };
            else
                this.translationModelData.push({ key: key, data: data, instance: instance, rxRefMarkedId: refMarkedId });
        }

        getComponentPropValue(key: string, instance: Function, refMarkedId: number) {
            let indexOf = this.translationModelData.findIndex(t => t.instance == instance && t.key == key && t.rxRefMarkedId == refMarkedId);
            return indexOf != -1 ? this.translationModelData[indexOf].data : undefined;
        }

        removeComponentPropValue(instance: Function, refMarkedId: number, keyName?: string) {
            let indexOf = -1;
            if (keyName)
                indexOf = this.translationModelData.findIndex(t => t.instance == instance && t.rxRefMarkedId == refMarkedId && t.key == keyName);
            else {
                let result = this.translationModelData.filter(t => t.instance == instance && t.rxRefMarkedId == refMarkedId);
                for (let data of result) {
                    this.translationModelData.splice(this.translationModelData.indexOf(data), 1)
                }
            }
            return indexOf != -1 ? this.translationModelData.splice(indexOf, 1) : undefined;
        }

        contains(key: string, languageCode: string) {
            return this.data[key] ? this.contentKeysByLanguage[key] == languageCode : false;
        }

        get(key: string): string {
            return this.data[key] ? this.data[key] : undefined;
        }

        clearInActives(config: RxTranslateConfig) {
            if (!config.cacheActiveLanguageObject || (!config.cacheActiveLanguageObject && !config.cacheLanguageWiseObject))
                Object.keys(this.keys).forEach(t => {
                    if (!this.keys[t] && this.data[t]) {
                        delete this.data[t];
                    }
                })
        }

        getActiveKeys(): string[] {
            return Object.keys(this.keys);
        }

        remove(key: string) {
            this.keys[key] = undefined;
        }

    });