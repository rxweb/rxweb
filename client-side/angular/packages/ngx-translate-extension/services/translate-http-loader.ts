import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TranslateLoader } from "@ngx-translate/core"
import { TranslateModuleConfig } from '../interface/translate-module-config'
import { Inject, Injectable } from "@angular/core";
import { replacer } from "@rxweb/translate"
import { configContainer } from "../const/config.container";
@Injectable()
export class TranslateHttpLoader implements TranslateLoader {
    private config: TranslateModuleConfig
    constructor(private http: HttpClient) {}

    public getTranslation(lang: any): Observable<Object> {
        this.config = configContainer.config;
        return this.http.get(this.getUrl(lang));
    }

    getUrl(lang:any) {
        let splitKeywords = ['{{', '}}'];
        let text = '';
        if (lang && lang.translationName && !lang.filePath) 
            text = replacer(splitKeywords, this.config.filePath || this.defaultFilePath, { "language-code": lang.lang, "translation-name": lang.translationName })
        else if (lang && lang.filePath) 
            text = replacer(splitKeywords, lang.filePath, { "language-code": lang.lang, "translation-name": lang.translationName })
        else 
            text = replacer(splitKeywords, this.config.globalFilePath || this.defaultGlobalFilePath, { "language-code": lang })
        return `/${text}`;
    }

    private defaultFilePath: string = `assets/i18n/{{translation-name}}/{{language-code}}.json`;

    private defaultGlobalFilePath: string = `assets/i18n/{{language-code}}.json`
}