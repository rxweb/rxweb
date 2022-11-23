import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@rxweb/ngx-translate-extension";

@Injectable()
export class TranslateHttpLoader implements TranslateLoader {
    constructor(private http: HttpClient) { }

    public getTranslation(lang: any): Observable<Object> {
        if (lang && lang.translationName && !lang.filePath)
            return this.http.get(`assets/i18n/${lang.translationName}/${lang.lang}.json`);
        else if (lang && lang.filePath)
            return this.http.get(lang.filePath);
        return this.http.get(`assets/i18n/${lang}.json`);
    }
}
