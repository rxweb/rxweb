export * from './module/translate.module'
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

export abstract class TranslateLoader {
    abstract getTranslation(lang: string): Observable<any>;
}

@Injectable()
export class TranslateFakeLoader extends TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of({});
    }
}
export * from './services/translate.service';
export * from './pipes/translate.pipe';
export * from './services/request.state';
