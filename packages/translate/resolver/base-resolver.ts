import { TranslateContainerConfig } from "../interface/translate-container-config";
import { MultiLingualData } from "../core/multilingual-data";
import { translateContainer } from "../core/translate-container";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { ActivatedRouteSnapshot } from "@angular/router";
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { translateConfigContainer } from "../core/translate-config-container";
import { getKeyName } from "../functions/get-key-name";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
export class BaseResolver {
    constructor(private baseConfig: RxTranslateConfig, private httpClient: HttpClient) {
        this.cloneBaseConfig = { ...baseConfig };
    }
    cloneBaseConfig: RxTranslateConfig;
    xhr: XMLHttpRequest;
    containerConfig: TranslateContainerConfig;
    loadEventFunction: any;

    resolveGlobal(config: TranslateContainerConfig, isGlobal: boolean = true) {
        if (isGlobal)
            translateContainer.set(config.instance, config.config);
        if ((isGlobal && !this.baseConfig.forNgxTranslate) || !isGlobal)
            this.resolve(config);
    }

    resolve(config: TranslateContainerConfig, languageCode: string = "", isRouteLanguageChanged: boolean = false): Observable<boolean> {
        this.containerConfig = config;
        if ((this.containerConfig && this.cloneBaseConfig.isTest) || (this.containerConfig && !MultiLingualData.contains(getKeyName(this.containerConfig.config.translationName, languageCode || this.cloneBaseConfig.languageCode), languageCode || this.cloneBaseConfig.languageCode)) || (this.containerConfig && isRouteLanguageChanged)) {
            if (!translateConfigContainer.customLoader) {
                let url = this.getPath(languageCode);
                if (url)
                    return this.httpClient.get(url).pipe(map(this.setData.bind(this)));
            } else {
                let lang: any = this.containerConfig.config.language || languageCode || this.cloneBaseConfig.languageCode;
                if (config.config.translationName != "global")
                    lang = { ...config.config, ...{ filePath: this.getPath(languageCode), lang: lang } };
                return translateConfigContainer.customLoader.getTranslation(lang).pipe(map(this.setData.bind(this)))
            }
        } else
            return of(true);
    }

    setData(body: any) {
        let name = getKeyName(this.containerConfig.config.translationName, this.cloneBaseConfig.languageCode);
        let data = body;
        if (translateConfigContainer.resolver)
            data = translateConfigContainer.resolver(name.replace("global_", "").replace("global", ""), data);
        MultiLingualData.addOrUpdate(name, data, this.containerConfig.config.translationName, this.cloneBaseConfig.languageCode);
        if (translateConfigContainer.activePageTranslationName == this.containerConfig.config.translationName)
            this.setPageTitle(body)
        setTimeout(() => { MultiLingualData.clearInActives(this.cloneBaseConfig) }, 10);
        return body;
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
                let name = getKeyName(this.containerConfig.config.translationName, this.cloneBaseConfig.languageCode);
                MultiLingualData.addOrUpdate(name, body, this.containerConfig.config.translationName, this.cloneBaseConfig.languageCode);
                if (translateConfigContainer.resolver)
                    translateConfigContainer.resolver(name.replace("global_", "").replace("global", ""), MultiLingualData.get(name));
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
        if (this.containerConfig.config.filePath || this.cloneBaseConfig.filePath) {
            if (this.containerConfig.config.filePath) {
                let text = this.replace(splitKeywords, this.containerConfig.config.filePath, { "language-code": languageCode, "translation-name": this.containerConfig.config.translationName })
                url = `/${text}`;
            }
            else {
                let text = this.replace(splitKeywords, this.cloneBaseConfig.filePath, { "language-code": languageCode, "translation-name": this.containerConfig.config.translationName })
                url = `/${text}`;
            }
        }
        return url
    }

    resolveRoute(route: ActivatedRouteSnapshot) {
        if (route.component) {
            let isRouteLanguageChanged = route.params && route.params["languageCode"] && route.params["languageCode"] != this.cloneBaseConfig.languageCode;
            let containerConfig = translateContainer.get(route.component);
            if (containerConfig && containerConfig.config)
                translateConfigContainer.activePageTranslationName = containerConfig.config.translationName;
            if (isRouteLanguageChanged) {
                this.updateLanguageByParam(route);
                this.cloneBaseConfig.languageCode = route.params["languageCode"];
                translateConfigContainer.loading = true;
            }
            return this.resolve(containerConfig, '', isRouteLanguageChanged).pipe(map((response: boolean) => {
                this.baseConfig.languageCode = this.cloneBaseConfig.languageCode;
                translateConfigContainer.loading = false;
                return true;
            }))
        }
        return true;
    }

    updateLanguageByParam(route: ActivatedRouteSnapshot) {
        if (route.params && route.params["languageCode"] && (!this.baseConfig.languageCode || this.baseConfig.languageCode !== route.params["languageCode"])) {
            setTimeout(() => this.languageChanged(route.params["languageCode"]), 10)
        }
    }

    languageChanged(languageCode: string, onComplete?: Function) {
        let keys = this.getKeys(this.baseConfig.languageCode);
        this.cloneBaseConfig.languageCode = languageCode;
        this.changeTranslation(keys, 0, onComplete);
    }

    resolveByName(name: string,languageCode:string = null) {
        let containerConfig = translateContainer.getByName(name);
        return this.resolve(containerConfig, languageCode);
    }
    fakeResolveByName(name: string, fakeData: any, resolve: Function) {
        this.containerConfig = translateContainer.getByName(name);
        if (!this.containerConfig)
            this.containerConfig = {
                config: { translationName: name, }, instance: null
            }
        this.xhr = <any>{
            status: 200, response: fakeData, removeEventListener: (x, y) => { }
        };
        this.onLoad(resolve)();
    }
    private getKeys(languageCode: string) {
        return MultiLingualData.getActiveKeys().map(key => {
            return key.replace(`_${languageCode}`, '');
        });
    }

    private changeTranslation(keys, index, onComplete?: Function) {
        if (keys.length > index) {
            translateConfigContainer.loading = true;
            var baseResolver = new BaseResolver(this.cloneBaseConfig, this.httpClient);
            baseResolver.resolveByName(keys[index]).subscribe(x => {
                let nextIndex = index + 1;
                this.changeTranslation(keys, nextIndex, onComplete);
            });
        } else {
            translateConfigContainer.config.languageCode = this.cloneBaseConfig.languageCode;
            translateConfigContainer.loading = false;
            if (onComplete)
                onComplete();
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
            document.title = body["pageTitle"];
    }


}