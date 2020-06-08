import { translateConfigContainer } from '../core/translate-config-container'
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { BaseResolver } from "../resolver/base-resolver";
import { HttpClient } from '@angular/common/http';
import { Injectable, ApplicationRef } from '@angular/core';
import { viewRefContainer } from '../core/view-ref-container';
@Injectable()
export class RxTranslation {
    constructor(private httpClient: HttpClient, private ref: ApplicationRef) {

    }
    get language() {
        return translateConfigContainer.config.languageCode;
    }

    change(languageCode: string, onComplete?: Function) {
        var baseResolver = new BaseResolver(translateConfigContainer.config, this.httpClient);
        baseResolver.languageChanged(languageCode, () => { viewRefContainer.markForCheck(); if (onComplete) onComplete() });
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