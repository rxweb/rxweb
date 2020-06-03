import { isObject } from "../functions/is-object";
import { translateJsonContainer } from "../core/translate-json-container";
import { rxWebConfig } from "../core/rxweb-config";
import { IoOperation } from "../io/io-operation";
import { Notify } from "../core/notify";

export class OptimizerService {
    private optimizationPath: string;
    constructor(private ioOperation: IoOperation) { }

    optimize(path:string) {
        this.optimizationPath = `${this.ioOperation.basePath}\\${path}`;
        if (this.ioOperation.exists(this.optimizationPath)) {
            Object.keys(translateJsonContainer.scopedTranslationSyntaxs).forEach(translationName => {
                this.clean(translateJsonContainer.scopedTranslationSyntaxs[translationName], translateJsonContainer.scopedTranslation[translationName][rxWebConfig.config.translate.defaultLanguage], this.getOtherLanguageTranslations(translationName), this.propValues(translateJsonContainer.scopedTranslation[translationName][rxWebConfig.config.translate.defaultLanguage]));
            })
            this.minify()
            Notify.timeEnd("All files has been minified,");
        }
    }

    minify() {
        rxWebConfig.config.translate.allowedLanguages.forEach(language => {
            var folderPath = `${this.optimizationPath}\\${language}`;
            if (this.ioOperation.exists(folderPath)) {
                Object.keys(translateJsonContainer.scopedTranslation).forEach(translationName => {
                    var filePath = `${folderPath}\\${translationName}.${language}.json`;
                    if (this.ioOperation.exists(filePath))
                        this.ioOperation.createFile(filePath, JSON.stringify(translateJsonContainer.scopedTranslation[translationName][language]))
                })
            }
        })
    }

    private propValues(translation: { [key: string]: any }) {
        let values: string[] = [];
        for (var column in translation) {
            if (isObject(translation[column]))
                values.concat(this.propValues(translation[column]))
            else
                values.push(translation[column])
        }
        return values;
    }

    private clean(usedKeys: string[], translationObject: { [key: string]: any }, translations: Array<{ [key: string]: any }>, values:string[],parentPath: string = "") {
        for (var column in translationObject) {
            let path = parentPath ? `${parentPath}.${column}` : column;
            if (isObject(translationObject[column])) {
                let keys = this.clean(usedKeys, translationObject[column], this.resolveTranslationsByColumnName(column, translations), values,path);
                if (keys.length == 0)
                    this.removeUnUsedColumn(column, translations, translationObject);
            } else
                if (usedKeys.filter(t => t == path.trim()).length == 0 && values.filter(t => t.indexOf(path.trim()) != -1).length == 0)
                    this.removeUnUsedColumn(column, translations, translationObject);
        }
        return Object.keys(translationObject);
    }

    private getOtherLanguageTranslations(translationName: string) {
        let translations: Array<{ [key: string]: any }> = new Array<{ [key: string]: any }>();
        Object.keys(translateJsonContainer.scopedTranslation[translationName]).forEach(language => { if (language != rxWebConfig.config.translate.defaultLanguage) translations.push(translateJsonContainer.scopedTranslation[translationName][language]) });
        return translations;
    }

    private resolveTranslationsByColumnName(columnName: string, translationObjects: Array<{ [key: string]: any }>) {
        let translations: Array<{ [key: string]: any }> = new Array<{ [key: string]: any }>();
        translationObjects.forEach(translation => { if (translation[columnName]) translations.push(translation) });
        return translations;
    }

    private removeUnUsedColumn(columnName: string, translationObjects: Array<{ [key: string]: any }>, currentTranslation: { [key: string]: any }) {
        this.remove(currentTranslation, columnName);
        translationObjects.forEach(translation => { this.remove(translation, columnName); })
    }

    private remove(object: { [key: string]: any }, columnName: string) {
        delete object[columnName];
    }
}
