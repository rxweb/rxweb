import { TranslateContainerConfig } from "../interface/translate-container-config";
import { MultiLingualData } from "../core/multilingual-data";
import { translateContainer } from "../core/translate-container";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { ActivatedRouteSnapshot } from "@angular/router";
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { translateConfigContainer } from "../core/translate-config-container";
import { getKeyName } from "../functions/get-key-name";
export class BaseResolver {
    constructor(private baseConfig: RxTranslateConfig) {
        this.cloneBaseConfig = { ...baseConfig };
    }
    cloneBaseConfig: RxTranslateConfig;
    xhr: XMLHttpRequest;
    containerConfig: TranslateContainerConfig;
    loadEventFunction: any;

    resolveGlobal(config: TranslateContainerConfig, isGlobal: boolean = true) {
        if(isGlobal)
            translateContainer.set(config.instance, config.config);
        this.resolve(config);
    }

    resolve(config: TranslateContainerConfig, languageCode: string = "", isRouteLanguageChanged: boolean = false) {
        this.containerConfig = config;
        var promise = new Promise<boolean>((resolve, reject) => {
            if ((this.containerConfig && !MultiLingualData.contains(getKeyName(this.containerConfig.config.translationName, this.cloneBaseConfig.languageCode), this.cloneBaseConfig.languageCode)) || (this.containerConfig && isRouteLanguageChanged)) {
                this.xhr = new XMLHttpRequest();
                this.xhr.open("GET", this.getPath(languageCode));
                this.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
                this.loadEventFunction = this.onLoad(resolve)
                this.xhr.addEventListener('load', this.loadEventFunction);
                this.xhr.send();
            } else
                resolve(true);
        });
        return promise;
    }

    onLoad(resolve) {
        return () => {
            let body = null;
            let statusCode = this.xhr.status;
            if (statusCode !== 204)
                body = typeof this.xhr.response === 'undefined' ? this.xhr.responseText : this.xhr.response;
            let isSuccess = statusCode >= 200 && statusCode < 300;
            if (isSuccess) {
                if (typeof body === "string")
                    body = JSON.parse(body);
                MultiLingualData.addOrUpdate(getKeyName(this.containerConfig.config.translationName, this.cloneBaseConfig.languageCode), body, this.containerConfig.config.translationName, this.cloneBaseConfig.languageCode);
                if (translateConfigContainer.activePageTranslationName == this.containerConfig.config.translationName)
                    this.setPageTitle(body)
            }
            setTimeout(() => { MultiLingualData.clearInActives(this.cloneBaseConfig) }, 10);
            resolve(true);
            setTimeout(() => { this.xhr.removeEventListener('load', this.loadEventFunction); }, 5)
        }

    }

    getPath(languageCode: string = "") {
        let url = '';
        let splitKeywords = ['{{', '}}'];
        languageCode = this.containerConfig.config.language || languageCode || this.cloneBaseConfig.languageCode;
        if (this.containerConfig.config.filePath) {
            let text = this.replace(splitKeywords, this.containerConfig.config.filePath, { "language-code": languageCode })
            url = `/${text}`;
        }
        else {
            let text = this.replace(splitKeywords, this.cloneBaseConfig.filePath, { "language-code": languageCode, "translation-name": this.containerConfig.config.translationName })
            url = `/${text}`;
        }

        return url
    }

    resolveRoute(route: ActivatedRouteSnapshot) {
        let isRouteLanguageChanged = route.params && route.params["languageCode"] && route.params["languageCode"] != this.cloneBaseConfig.languageCode;
        let containerConfig = translateContainer.get(route.component);
        if (containerConfig && containerConfig.config)
            translateConfigContainer.activePageTranslationName = containerConfig.config.translationName;
        if (isRouteLanguageChanged) {
            this.updateLanguageByParam(route);
            this.cloneBaseConfig.languageCode = route.params["languageCode"];
            translateConfigContainer.loading = true;
            var promise = new Promise<boolean>((resolve, reject) => {
                this.resolve(containerConfig, '', isRouteLanguageChanged).then(x => {
                    this.baseConfig.languageCode = this.cloneBaseConfig.languageCode;
                    translateConfigContainer.loading = false;
                    resolve(x);
                })
            })
            return promise;
        }
        return this.resolve(containerConfig, '', isRouteLanguageChanged);
    }

    updateLanguageByParam(route: ActivatedRouteSnapshot) {
        if (route.params && route.params["languageCode"] && (!this.baseConfig.languageCode || this.baseConfig.languageCode !== route.params["languageCode"])) {
            setTimeout(() => this.languageChanged(route.params["languageCode"]), 10)
        }
    }

    languageChanged(languageCode: string) {
        let keys = this.getKeys(this.baseConfig.languageCode);
        this.cloneBaseConfig.languageCode = languageCode;
        this.changeTranslation(keys, 0);
    }

    resolveByName(name: string) {
        let containerConfig = translateContainer.getByName(name);
        return this.resolve(containerConfig);
    }

    private getKeys(languageCode: string) {
        return MultiLingualData.getActiveKeys().map(key => {
            return key.replace(`_${languageCode}`, '');
        });
    }

    private changeTranslation(keys, index) {
        if (keys.length > index) {
            translateConfigContainer.loading = true;
            var baseResolver = new BaseResolver(this.cloneBaseConfig);
            baseResolver.resolveByName(keys[index]).then(x => {
                let nextIndex = index + 1;
                this.changeTranslation(keys, nextIndex);
            });
        } else {
            translateConfigContainer.config.languageCode= this.cloneBaseConfig.languageCode;
            translateConfigContainer.loading = false;
        }
            
    }
    private replace(extractKeys: any, text: string, data: { [key: string]: any }): string {
        let extractor = extract(extractKeys);
        let keys = extractor(text);
        keys.forEach(key => {
            text = text.replace(`{{${key}}}`, getValue(key, data));
        })
        return text;
    }

    private setPageTitle(body: { [key: string]: string }) {
        if (body && body["pageTitle"])
            document.body.title = body["pageTitle"];
    }


}