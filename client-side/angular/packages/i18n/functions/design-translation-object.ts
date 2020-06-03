import { isObject } from '../functions/is-object'

export function designTranslationObject(translationObject: {[key:string]:any}, language:string) {
    let scopedLanguageTranslation:any = {};
    for (var column in translationObject) {
        if (isObject(translationObject[column])) {
            scopedLanguageTranslation[column] = designTranslationObject(translationObject[column], language);
        } else
            scopedLanguageTranslation[column] = "Missing Text of " + language;
    }
    return scopedLanguageTranslation;
}
