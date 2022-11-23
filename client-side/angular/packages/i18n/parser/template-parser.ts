import { TemplateParserConfig } from "../interface/template-parser-config";
import { REGEX_RULES } from "../const/regex-rules";
import { translateJsonContainer } from "../core/translate-json-container";
import { rxWebConfig } from "../core/rxweb-config";
import { MissingKeyService } from "../service/missing-key-service";

export class TemplateParser {

    translationWiseKeys: { [key: string]: string[] } = {};

    parse(templateParserConfigs: Array<TemplateParserConfig>) {
        templateParserConfigs.forEach(templateParserConfig => {
            let matchTemplateSyntaxs = templateParserConfig.template.match(REGEX_RULES.templateSyntax);
            if (matchTemplateSyntaxs) {
                matchTemplateSyntaxs.forEach(key => {
                    if (key.indexOf(`{{${templateParserConfig.propertyName}.`) !== -1) {
                        if (!this.translationWiseKeys[templateParserConfig.translationName])
                            this.translationWiseKeys[templateParserConfig.translationName] = [];
                        if (key.indexOf("|") !== -1)
                            key = key.split("|")[0];
                        this.translationWiseKeys[templateParserConfig.translationName].push(key.replace(`{{${templateParserConfig.propertyName}.`, "").replace("}", ""))
                    }
                })
            }
            let attributeSyntaxs = templateParserConfig.template.match(/\".*?"/g)
            if (attributeSyntaxs) {
                attributeSyntaxs.forEach(key => {
                    if (key.indexOf(`"${templateParserConfig.propertyName}.`) !== -1) {
                        if (!this.translationWiseKeys[templateParserConfig.translationName])
                            this.translationWiseKeys[templateParserConfig.translationName] = [];
                        this.translationWiseKeys[templateParserConfig.translationName].push(key.replace(/[&\/\\#, +()$~%'":*?<>{}]/g, "").replace(`${templateParserConfig.propertyName}.`, ""))
                    }
                })
            }
        })
        this.checkObjectKeys();
        this.checkKeys();
        if (rxWebConfig.config.translate.action.createMissingKeys) {
            let missingKeyService = new MissingKeyService();
            missingKeyService.createIfMissing();
        }
        translateJsonContainer.scopedTranslationSyntaxs = this.translationWiseKeys;


    }

    private checkObjectKeys() {
        let keys = { ...this.translationWiseKeys }
        Object.keys(keys).forEach(t => {
            keys[t].forEach((x, i) => {
                if (this.translationWiseKeys[t].filter(y => y.indexOf(`${x}.`) != -1).length > 0)
                    this.translationWiseKeys[t].splice(i, 1);
            })
        })
    }

    checkKeys() {
        Object.keys(this.translationWiseKeys).forEach(translationName => {
            let scopedTranslation = translateJsonContainer.scopedTranslation[translationName]
            let defaultLanguageTranslation = scopedTranslation[rxWebConfig.config.translate.defaultLanguage];
            let isModified = false;
            this.translationWiseKeys[translationName].forEach(key => {
                var splitTexts = key.split('.');
                let jObject;
                let cloneObject;
                let index = 0;
                for (let prop of splitTexts) {
                    if (!jObject) {
                        if (index == splitTexts.length - 1)
                            jObject = defaultLanguageTranslation;
                        else
                            jObject = cloneObject = defaultLanguageTranslation[prop]
                    }
                    else
                        cloneObject = jObject[prop]
                    if (cloneObject === undefined) {
                        if (index == splitTexts.length - 1) {
                            if (!jObject[prop]) {
                                isModified = true;
                                jObject[prop] = `${rxWebConfig.config.translate.defaultLanguage} ${prop} Absent!`
                            }
                        }
                        else {
                            if (jObject == undefined)
                                jObject = defaultLanguageTranslation;
                            jObject[prop] = {};
                            jObject = jObject[prop]
                        }
                    } else
                        jObject = cloneObject;
                    index++;
                }
            })
            if (isModified) {
                if (!translateJsonContainer.modifiedScopedTranslations[translationName])
                    translateJsonContainer.modifiedScopedTranslations[translationName] = {};
                translateJsonContainer.modifiedScopedTranslations[translationName][rxWebConfig.config.translate.defaultLanguage] = defaultLanguageTranslation;
            }

        })
    }
}
