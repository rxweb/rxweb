import { IoOperation } from "../io/io-operation";
import { translateJsonContainer } from "../core/translate-json-container";
import { rxWebConfig } from "../core/rxweb-config";
import { designTranslationObject } from '../functions/design-translation-object'
export class MissingFileService {

    constructor(private ioOperation: IoOperation) { }

    createIfMissing() {
        Object.keys(translateJsonContainer.scopedTranslation).forEach(translationName => {
            let translationScope = translateJsonContainer.scopedTranslation[translationName];
            if (!(Object.keys(translationScope).length == rxWebConfig.config.translate.allowedLanguages.length)) {
                rxWebConfig.config.translate.allowedLanguages.forEach(language => {
                    let languageFolder = `${this.ioOperation.translate.i18n}\\${language}`;
                    this.ioOperation.createDirectory(languageFolder)
                    if (!translationScope[language]) {
                        var filePath = `${languageFolder}\\${translationName}.${language}.json`;
                        let json = translateJsonContainer.scopedTranslation[translationName][language] = designTranslationObject(translationScope[rxWebConfig.config.translate.defaultLanguage], language);
                        if (!this.ioOperation.exists(filePath)) {
                            this.ioOperation.createJSONFile(filePath, json)
                        }
                    }
                })
            }
        })
    }
}
