import { translateContainer } from "./translate-container";
import { getKeyName } from '../functions/get-key-name'
import { MultiLingualData } from '../core/multilingual-data'
import { BaseResolver } from '../resolver/base-resolver'
import { translateConfigContainer } from '../core/translate-config-container'
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";
@Injectable()
export class TranslationResolver {
    constructor(private httpClient:HttpClient) {

    }

    private _allowedLanguages:Array<string> = [];

    set resolver(value: Function) {
        translateConfigContainer.resolver = value;
    }

    get allowedLanguages() {
        return this._allowedLanguages;
    }

    get activeTranslationsLength() {
        return translateContainer.getActiveTranslations().length;
    }

    set ngxTranslate(value: any) {
        translateConfigContainer.ngxTranslate = value;
        translateConfigContainer.customLoader = value.customLoader;
    }

    get injector() {
        return translateConfigContainer.injector;
    }
    get pending() {
        return translateConfigContainer.loading;
    }

    get activeLanguage() {
        return translateConfigContainer.config.languageCode;
    }

    set activeLanguage(lang:string) {
        translateConfigContainer.config.languageCode=lang;
    }


    get translations() {
        return MultiLingualData.data;
    }

    getTranslationName(nodeName: string,languageCode:string = null) {
        let instance = translateContainer.getComponentState(nodeName);
        if (instance) {
            let translateConfig = translateContainer.get(instance);
            if (translateConfig && translateConfig.config)
                return getKeyName(translateConfig.config.translationName, languageCode);
        }
        return null;
    }



    getTranslationNameByInstance(instance: any, languageCode: string = null) {
        let translateConfig = translateContainer.get(instance);
        if (translateConfig && translateConfig.config)
            return getKeyName(translateConfig.config.translationName, languageCode);
        return null;
    }

    get(modelName: string, languageCode: string = '') {
        return MultiLingualData.get(this.getKeyName(modelName,languageCode));
    }

    getKeyName(modelName: string, languageCode: string = '') {
        return getKeyName(modelName, languageCode);
    }
    resolve(modelName,languageCode:string) {
        var baseResolver = new BaseResolver(translateConfigContainer.config, this.httpClient);
        return baseResolver.resolveByName(modelName, languageCode);
    }
}