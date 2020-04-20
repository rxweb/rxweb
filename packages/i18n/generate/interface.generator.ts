import { translateJsonContainer } from "../core/translate-json-container";
import { rxWebConfig } from "../core/rxweb-config";
import { InterfaceTemplate } from "../template/interface.template";
import { isObject } from "../functions/is-object";
import { pascalCase } from "../functions/pascal-case";
import { IoOperation } from "../io/io-operation";
export class InterfaceGenerator {
    files: InterfaceTemplate[];
    constructor() {
        this.files = new Array<InterfaceTemplate>();
    }
    build(isFromWebpack: boolean = false) {
        let translations = (isFromWebpack) ? translateJsonContainer.scopedTranslation : translateJsonContainer.modifiedScopedTranslations;
        if (Object.keys(translations).length > 0) {
            Object.keys(translations).forEach(translationName => {
                let translation = translateJsonContainer.scopedTranslation[translationName][rxWebConfig.config.translate.defaultLanguage];
                this.designTemplate(translation, translationName)
            })
            this.generate();
        }
    }

    private generate() {
        let ioOperation = new IoOperation();
        ioOperation.createDirectory(ioOperation.translate.interface);

        this.files.forEach(interfaceTemplate => {
            let filePath = `${ioOperation.translate.interface}\\${interfaceTemplate.fileName}.ts`;
            let action = ioOperation.exists(filePath) ? "UPDATED" : "CREATED";
            ioOperation.createFile(filePath, interfaceTemplate.toString(),action)
        })
    }

    designTemplate(translation: { [key: string]: any }, translationName: string, columnName: string = "") {
        if (Object.keys(translation).length > 0) {
            var interfaceTemplate = new InterfaceTemplate();
            let pascalCaseName = pascalCase(columnName);
            interfaceTemplate.name = columnName ? `${pascalCase(translationName)}${pascalCaseName}Translation` : `${pascalCase(translationName)}Translation`;
            interfaceTemplate.fileName = columnName ? `${translationName.toLowerCase()}-${pascalCaseName.toLowerCase()}-translation` : `${translationName.toLowerCase()}-translation`;
            for (let column in translation) {
                if (isObject(translation[column])) {
                    let template = this.designTemplate(translation[column], translationName, column)
                    interfaceTemplate.imports.appendLine(`import { ${template.name} } from './${template.fileName}'`)
                    interfaceTemplate.properties.appendLine(`    ${column} : ${template.name};`)
                } else {
                    interfaceTemplate.properties.appendLine(`    ${column} : string;`);
                    interfaceTemplate.properties.newLine();
                }
            }
            interfaceTemplate.properties.appendLine(`    languageCode : string;`)
            interfaceTemplate.properties.appendLine(`    get: (key:string) => string;`)
            this.files.push(interfaceTemplate);
            return interfaceTemplate;
        }
        return undefined;
    }
}
