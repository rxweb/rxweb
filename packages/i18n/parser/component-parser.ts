import { IoOperation } from '../io/io-operation'
import { APP_CONST } from '../const/app-const';
import { extractor } from '../functions/extractor'
import { REGEX_RULES } from '../const/regex-rules'
import { SplitText } from "../utils/split-text"
import { TemplateParserConfig } from '../interface/template-parser-config';
import { StringReplacer } from '../utils/string-replacer';
import { translateJsonContainer } from '../core/translate-json-container';
import { rxWebConfig } from '../core/rxweb-config';
import { FilePathInfo } from '../interface/file-path-info';

export class ComponentParser {
    ioOperation: IoOperation;

    constructor() {
        this.ioOperation = new IoOperation();
    }

    parse(files?: FilePathInfo[]): Array<TemplateParserConfig> {
        let templateParserConfigs = new Array<TemplateParserConfig>();
        let tsFiles = files || this.ioOperation.allFiles(this.ioOperation.translate.component);
        tsFiles.forEach(filePathInfo => {
            var content = this.ioOperation.readText(filePathInfo.filePath);
            if (content.indexOf(APP_CONST.component) != -1) {
                var text = StringReplacer.space(StringReplacer.newLine(content))
                var splitComponents = text.split(APP_CONST.component);
                splitComponents.forEach(x => {
                    let propertyName = this.extractPropertyName(x, APP_CONST.translate)
                    let globalProperty: string = this.extractGlobalPropertyName(x);
                    if (propertyName || globalProperty) {
                        var template = extractor(REGEX_RULES.inLineTemplate, x,2) as string;
                        var translationName = extractor(REGEX_RULES.translationName, x, 2) as string;
                        var templateUrl = extractor(REGEX_RULES.templateUrl, x,2) as string;
                        if (templateUrl)
                            template = this.getTemplateFromUrl(`${filePathInfo.directoryPath}\\${templateUrl.replace(APP_CONST.comma, APP_CONST.blank)}`);
                        if (propertyName) {
                            templateParserConfigs.push({ propertyName: propertyName, template: StringReplacer.space(StringReplacer.newLine(template)), translationName: translationName });
                            this.addScopedTranslation(translationName);
                        }
                        if (globalProperty) {
                            templateParserConfigs.push({ propertyName: globalProperty, template: StringReplacer.space(StringReplacer.newLine(template)), translationName: "global" });
                            this.addScopedTranslation("global");
                        }
                    }
                })
            }
        })
        return templateParserConfigs;
    }

    extractGlobalPropertyName(content:string,) {
        var translate = content.split(APP_CONST.globalTranslate)[1];
        if (translate) {
            translate = SplitText.first(translate, APP_CONST.colon);
            if (translate.indexOf(APP_CONST.semiColon) != -1)
                translate = SplitText.first(translate, APP_CONST.semiColon);
        }
        return translate;
    }

    extractPropertyName(content: string, splitString: string) {
        var translate = content.split(splitString)[1];
        if (translate) {
            translate = SplitText.index(translate, APP_CONST.bracket, 1);
            translate = SplitText.first(translate, APP_CONST.colon);
            if (translate.indexOf(APP_CONST.semiColon) != -1)
                translate = SplitText.first(translate, APP_CONST.semiColon);
        }
        return translate;
    }

    getTemplateFromUrl(templateUrl:string) {
        return this.ioOperation.readText(templateUrl)
    }

    addScopedTranslation(translationName: string) {
        if (translationName) {
            rxWebConfig.config.translate.allowedLanguages.forEach(language => {
                if (!translateJsonContainer.scopedTranslation[translationName])
                    translateJsonContainer.scopedTranslation[translationName] = {};
                if (!translateJsonContainer.scopedTranslation[translationName][language])
                    translateJsonContainer.scopedTranslation[translationName][language] = {}
            })
        }
    }
}
