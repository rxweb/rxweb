import { IoOperation } from "../io/io-operation"
import { rxWebConfig } from "../core/rxweb-config";
import { translateJsonContainer } from "../core/translate-json-container";
import { SplitText } from "../utils/split-text";
import { MissingFileService } from './missing-file-service'
import { ComponentParser } from "../parser/component-parser";
import { TemplateParser } from "../parser/template-parser";
import { OptimizerService } from "./optimizer-service";
import { InterfaceGenerator } from "../generate/interface.generator";
import { RXWEB_CONFIG_JSON } from "../template/rxweb.json.template";
import { TranslateAnswerConfig } from "../interface/translate-answer-config";
import { installTranslatePackage } from "../resolve/install-translate-package";
import { getModuleTemplate } from "../template/rxweb-module.template";
import { getFilePathInfos } from "../functions/get-file-path-infos";
import { Notify } from "../core/notify";
import { WEBPACK_PLUGIN } from "../template/rxweb-webpack-plugin.template";
import { TranslateCommandArgument } from "../interface/translate-command-argument";
export class TranslateService {
    constructor(private commandArguments?: TranslateCommandArgument) {
        this.ioOperation = new IoOperation();
        this.templateParser = new TemplateParser();
        this.componentParser = new ComponentParser();
        this.missingFileService = new MissingFileService(this.ioOperation);
        this.optimizerService = new OptimizerService(this.ioOperation);
        this.interfaceGenerator = new InterfaceGenerator();
    }
    init(answer?: TranslateAnswerConfig) {
        Notify.startTime();
        this.configSetup(answer);
        this.ioOperation.setupFolder();
        if (this.ioOperation.translate.i18n) {
            this.setScopedTranslation();
            if (rxWebConfig.config.translate.action.createMissingFiles)
                this.missingFileService.createIfMissing();
            if (this.ioOperation.translate.component) {
                let templateParserConfigs = this.componentParser.parse();
                this.templateParser.parse(templateParserConfigs);
                if (this.commandArguments && rxWebConfig.config.translate.action.removeNotInUsedKeys) {
                    this.optimizerService.optimize(this.commandArguments.optimizePath);
                }

            }
            if (!this.commandArguments && rxWebConfig.config.translate.path.generate.interface)
                this.interfaceGenerator.build();
        }
        if (answer)
            installTranslatePackage(answer);
    }

    webpack(files: string[]) {
        Notify.startTime();
        this.configSetup();
        let fileInfos = getFilePathInfos(files);
        if (fileInfos.length > 0) {
            let templateParserConfigs = this.componentParser.parse(fileInfos);
            templateParserConfigs.forEach(templatParserConfig => {
                this.setScopedTranslation(templatParserConfig.translationName);
            })
            if (rxWebConfig.config.translate.action.createMissingKeys) {
                this.templateParser.parse(templateParserConfigs);
            }
            if (rxWebConfig.config.translate.path.generate.interface)
                this.interfaceGenerator.build(true);
        }
        Notify.timeEnd("Key Extraction Completed")
    }


    private configSetup(answer?: TranslateAnswerConfig) {
        if (this.ioOperation.isExistsConfig)
            rxWebConfig.config = this.ioOperation.readJSON(this.ioOperation.configPath);
        else {
            this.updateConfig(answer);
            rxWebConfig.config = RXWEB_CONFIG_JSON;
            this.ioOperation.createJSONFile(this.ioOperation.configPath, RXWEB_CONFIG_JSON);
            this.ioOperation.createFile(this.ioOperation.modulePath, getModuleTemplate())
            this.ioOperation.createFile(this.ioOperation.webpackPath, WEBPACK_PLUGIN)

        }
    }

    private updateConfig(answer: TranslateAnswerConfig) {
        RXWEB_CONFIG_JSON.translate.path.i18n = answer.i18n ? answer.i18n : "src/assets/i18n";
        RXWEB_CONFIG_JSON.translate.path.generate.interface = answer.interface ? answer.interface : "src/app/i18n-models";
        RXWEB_CONFIG_JSON.translate.path.component = answer.component ? answer.component : "src/app";
    }

    private getLanguageFolders() {
        return this.ioOperation.getDirectoriesOrFiles(this.ioOperation.translate.i18n);
    }

    private setScopedTranslation(translationName?: string) {
        translateJsonContainer.languageFolderNames = this.getLanguageFolders();
        translateJsonContainer.languageFolderNames.forEach(language => {
            let languageFolder = `${this.ioOperation.translate.i18n}\\${language}`;
            let languageFiles = translationName ? [`${translationName}.${language}.json`] : this.ioOperation.getDirectoriesOrFiles(languageFolder);
            languageFiles.forEach(fileName => {
                let filePath = `${languageFolder}\\${fileName}`
                let tName = SplitText.first(fileName, `.${language}`);
                this.scopedTranslation(tName, filePath, language)
            })
        })

    }

    private scopedTranslation(translationName: string, filePath: string, language: string) {
        if (this.ioOperation.exists(filePath)) {
            let translation = this.ioOperation.readJSON(filePath);
            if (!translateJsonContainer.scopedTranslation[translationName])
                translateJsonContainer.scopedTranslation[translationName] = {};
            translateJsonContainer.scopedTranslation[translationName][language] = translation;
        }
    }

    private ioOperation: IoOperation
    private componentParser: ComponentParser;
    private templateParser: TemplateParser;
    private missingFileService: MissingFileService;
    private optimizerService: OptimizerService;
    private interfaceGenerator: InterfaceGenerator;
}
