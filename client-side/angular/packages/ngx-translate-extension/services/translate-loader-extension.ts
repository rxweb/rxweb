import { TranslationResolver } from "@rxweb/translate"
import { Observable } from "rxjs"
import { Injectable } from "@angular/core";
@Injectable()
export class TranslateLoaderExtension {
    constructor(private translationResolver: TranslationResolver) {
    }

    getTranslation(lang: string): Observable<any> {
        let translation = this.getName(lang);
        this.translationResolver.addConfig(translation.translationName);
        return this.translationResolver.resolve(translation.translationName, translation.lang);
    }

    getName(lang: string) {
        var splitText = lang.split('_');
        if (this.translationResolver.allowedLanguages.indexOf(splitText[0]) !== -1)
            lang = "global"
        return splitText.length > 1 ? {
            lang: splitText[1],
            translationName: splitText[0]
        } : { lang: splitText[0], translationName: lang };
    }

}
