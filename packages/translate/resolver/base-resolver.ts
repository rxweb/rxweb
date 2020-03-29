import { TranslateContainerConfig } from "../interface/translate-container-config";
import { MultiLingualData } from "../core/multilingual-data";
import { translateContainer } from "../core/translate-container";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { ActivatedRouteSnapshot } from "@angular/router";

export class BaseResolver {
    constructor(private baseConfig: RxTranslateConfig) { }

    xhr: XMLHttpRequest;
    containerConfig: TranslateContainerConfig;
    loadEventFunction: any;
    resolveGlobal(config: TranslateContainerConfig) {
        translateContainer.set(config.instance, config.config );
        this.resolve(config);
    }

    resolve(config: TranslateContainerConfig) {
        this.containerConfig = config;
        var promise = new Promise<boolean>((resolve, reject) => {
            this.xhr = new XMLHttpRequest();
            this.xhr.open("GET", this.getPath());
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
                MultiLingualData.addOrUpdate(this.containerConfig.config.name, body);
            } 
            setTimeout(() => { MultiLingualData.clearInActives(this.baseConfig) }, 10);
            this.xhr.removeEventListener('load', this.loadEventFunction);
            resolve(true);
        }

    }

    getPath() {
        let url = '';
        if (this.containerConfig.config.filePath)
            url = `/${this.containerConfig.config.filePath.replace("#lcode#", this.baseConfig.languageCode)}`;
        else
            url = `/${this.baseConfig.filePath.replace("#lcode#", this.baseConfig.languageCode).replace("#file#", this.containerConfig.config.name) }`;
        return url
    }

    resolveRoute(route: ActivatedRouteSnapshot) {
        let containerConfig = translateContainer.get(route.component);
        if (containerConfig && !MultiLingualData.contains(containerConfig.config.name)) {
            return this.resolve(containerConfig)
        } else
            return true;
    }

    resolveByName(name: string) {
        let containerConfig = translateContainer.getByName(name);
        return this.resolve(containerConfig);
    }
}