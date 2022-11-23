import { translateJsonContainer } from "../core/translate-json-container";
import { rxWebConfig } from "../core/rxweb-config";
import { designTranslationObject } from '../functions/design-translation-object'
import { isObject } from '../functions/is-object'
import { IoOperation } from "../io/io-operation";
export class MissingKeyService {
    private ioOperation: IoOperation
    constructor() {
        this.ioOperation = new IoOperation();
    }

    createIfMissing() {
        Object.keys(translateJsonContainer.scopedTranslation).forEach(translationName => {
            let translationScope = translateJsonContainer.scopedTranslation[translationName];
            Object.keys(translationScope).forEach(language => {
                if (language != rxWebConfig.config.translate.defaultLanguage) {
                    var translation = this.setMissingProperty(translationScope[rxWebConfig.config.translate.defaultLanguage], translationScope[language], language);
                    if (translation.isModified) {
                        translationScope[language] = translation.translation;
                        if (!translateJsonContainer.modifiedScopedTranslations[translationName])
                            translateJsonContainer.modifiedScopedTranslations[translationName] = {};
                        translateJsonContainer.modifiedScopedTranslations[translationName][language] = translation.translation;
                    }
                }
            })
        })
        this.updateFiles();
    }

    private updateFiles() {
        if (translateJsonContainer.modifiedScopedTranslations) {
            Object.keys(translateJsonContainer.modifiedScopedTranslations).forEach(translationName => {
                Object.keys(translateJsonContainer.modifiedScopedTranslations[translationName]).forEach(language => {
                    let languageFolder = `${this.ioOperation.translate.i18n}\\${language}`;
                    var filePath = `${languageFolder}\\${translationName}.${language}.json`;
                    this.ioOperation.createDirectory(languageFolder)
                    this.ioOperation.createJSONFile(filePath, translateJsonContainer.modifiedScopedTranslations[translationName][language])
                })
            })
        }
    }

    private setMissingProperty(baseTranslation: { [key: string]: any }, translation: { [key: string]: any }, language: string) {
        var isModified = false;
        for (var column in baseTranslation) {
            if (isObject(baseTranslation[column])) {
                if (translation[column]) {
                    var jObject = this.setMissingProperty(baseTranslation[column], translation[column], language)
                    if (jObject.isModified) {
                        translation[column] = jObject.translation;
                        isModified = true;
                    }
                }
                else {
                    translation[column] = designTranslationObject(baseTranslation[column], language);
                    isModified = true;
                }

            } else if ((translation[column] === undefined)) {
                translation[column] = "Missing Text of " + language;
                isModified = true;
            }
        }
        return {
            translation: translation, isModified: isModified
        };
    }
}
