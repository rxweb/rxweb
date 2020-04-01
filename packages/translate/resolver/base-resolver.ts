import { TranslateContainerConfig } from "../interface/translate-container-config";
import { MultiLingualData } from "../core/multilingual-data";
import { translateContainer } from "../core/translate-container";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { ActivatedRouteSnapshot } from "@angular/router";
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { translateConfigContainer } from "../core/translate-config-container";
export class BaseResolver {
    constructor(private baseConfig: RxTranslateConfig) { }

    xhr: XMLHttpRequest;
    containerConfig: TranslateContainerConfig;
    loadEventFunction: any;
    resolveGlobal(config: TranslateContainerConfig) {
        translateContainer.set(config.instance, config.config );
        this.resolve(config);
    }

    resolve(config: TranslateContainerConfig,languageCode:string = "") {
        this.containerConfig = config;
        var promise = new Promise<boolean>((resolve, reject) => {
            this.xhr = new XMLHttpRequest();
            this.xhr.open("GET", this.getPath(languageCode));
            this.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            this.loadEventFunction = this.onLoad(resolve)
            this.xhr.addEventListener('load', this.loadEventFunction);
            
            this.xhr.send();
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
                MultiLingualData.addOrUpdate(this.containerConfig.config.translationName, body);
            } 
            setTimeout(() => { MultiLingualData.clearInActives(this.baseConfig) }, 10);
            resolve(true);
            setTimeout(() => { this.xhr.removeEventListener('load', this.loadEventFunction); }, 5)
        }

    }

    getPath(languageCode:string = "") {
        let url = '';
        let splitKeywords = ['{{', '}}'];
        languageCode = this.containerConfig.config.language || languageCode || this.baseConfig.languageCode;
        if (this.containerConfig.config.filePath) {
            let text = this.replace(splitKeywords, this.containerConfig.config.filePath, { "language-code": languageCode})
            url = `/${text}`;
        }
        else {
            let text = this.replace(splitKeywords, this.baseConfig.filePath, { "language-code": languageCode, "translation-name": this.containerConfig.config.translationName })
            url = `/${text}`;
        }
            
        return url
    }

    resolveRoute(route: ActivatedRouteSnapshot) {
        this.updateLanguageByParam(route);
        let containerConfig = translateContainer.get(route.component);
        if (containerConfig && !MultiLingualData.contains(containerConfig.config.translationName)) {
            return this.resolve(containerConfig)
        } else
            return true;
    }

    updateLanguageByParam(route: ActivatedRouteSnapshot) {
        if (route.params && route.params["languageCode"] && (!this.baseConfig.languageCode || this.baseConfig.languageCode !== route.params["languageCode"])) {
            this.baseConfig.languageCode = route.params["languageCode"];
            translateConfigContainer.config = this.baseConfig;
            setTimeout(()=> this.languageChanged(),10)
        }
    }

    languageChanged() {
        let keys = MultiLingualData.getActiveKeys();
        this.changeTranslation(keys, 0);
    }

    resolveByName(name: string) {
        let containerConfig = translateContainer.getByName(name);
        return this.resolve(containerConfig);
    }

    private changeTranslation(keys, index) {
        if (keys.length > index) {
            var baseResolver = new BaseResolver(this.baseConfig);
            baseResolver.resolveByName(keys[index]).then(x => {
                let nextIndex = index + 1;
                this.changeTranslation(keys, nextIndex);
            });
        }
    }
    private replace(extractKeys:any,text: string, data: { [key: string]: any }):string {
        let extractor = extract(extractKeys);
        let keys = extractor(text);
        keys.forEach(key => {
            text = text.replace(`{{${key}}}`, getValue(key, data));
        })
        return text;
    }
}