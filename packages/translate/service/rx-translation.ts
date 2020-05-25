import { translateConfigContainer } from '../core/translate-config-container'
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { BaseResolver } from "../resolver/base-resolver";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class RxTranslation {
    constructor(private httpClient: HttpClient) {

    }
    get language() {
        return translateConfigContainer.config.languageCode;
    }

    change(languageCode: string, onComplete?: Function) {
        var baseResolver = new BaseResolver(translateConfigContainer.config, this.httpClient);
        baseResolver.languageChanged(languageCode,onComplete);
    }


    translate(text: string, data: { [key: string]: any }) {
        let extractor = extract(['{', '}']);
        let keys = extractor(text);
        keys.forEach(key => {
            text = text.replace(`{${key}}`, getValue(key, data));
        })
        return text;
    }
}