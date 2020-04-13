import { RxTranslateConfig } from "../interface/rx-translate-config";

export const MultiLingualData:
    {
        addOrUpdate(key: string, data: { [key: string]: any }, translationName: string, languageCode?: string);
        remove(key: string);
        get(key: string);
        clearInActives(config: RxTranslateConfig);
        getActiveKeys();
        contains(key: string, languageCode: string);
    } = new (class {

        private data: { [key: string]: any } = {};
        private keys: { [key: string]: boolean } = {};
        private contentKeysByLanguage: { [key: string]: string } = {};

        addOrUpdate(key: string, data: { [key: string]: any }, translationName: string, languageCode?: string) {
            this.data[key] = data;
            this.keys[translationName] = true;
            if (languageCode)
                this.contentKeysByLanguage[key] = languageCode
        }

        contains(key: string, languageCode: string) {
            return this.data[key] ? this.contentKeysByLanguage[key] == languageCode : false;
        }

        get(key: string): string {
            return this.data[key] ? this.data[key] : {};
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