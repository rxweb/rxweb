import { TranslationResolver } from "@rxweb/translate"
import { Observable } from "rxjs"

export class TranslateLoaderExtension {
    constructor(private translationResolver: TranslationResolver) {
    }

    getTranslation(lang: string): Observable<any> {
            return this.translationResolver.resolve(this.getName(lang),lang);
    }

    getName(lang: string) {
        lang = lang.split('_')[0];
        if (this.translationResolver.allowedLanguages.indexOf(lang) !== -1)
            lang = "global"
        return lang;
    }

}
