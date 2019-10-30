import { GridCustomTemplate } from "./grid-custom-templates";
import { CustomTemplateConfig } from "../interface/config/custom-template-config";
import { GridColumnConfig } from "../interface/config/grid-column-config";

export function customTemplateParser(configuredTemplate: CustomTemplateConfig, columnConfig: GridColumnConfig) {
    var replacers: { [key: string]: any } = { columnName: columnConfig.name };
    if (configuredTemplate.replacers)
        Object.keys(configuredTemplate.replacers).forEach(t => replacers[t] = configuredTemplate.replacers[t]);
    var template = GridCustomTemplate.getTemplate(configuredTemplate.templateName);
    return template ? parse(template, replacers, columnConfig,true) : undefined;
}

export function parse(jsonObject: { [key: string]: any }, replacer: { [key: string]: any }, columnConfig: GridColumnConfig,isRoot:boolean) {
    let jObject: any = {};
    if (isObjectType(jsonObject)) {
        for (var columnName in jsonObject) {
            if (Array.isArray(jsonObject[columnName])) {
                jObject[columnName] = [];
                for (let row of jsonObject[columnName]) {
                    if (isObject(row)) {
                        row = parse(row, replacer, columnConfig, true);
                        jObject[columnName].push(row)
                    }
                    else
                        jObject[columnName].push(row)
                }
            } else if (typeof jsonObject[columnName] == "object") {
                jObject[columnName] = parse(jsonObject[columnName], replacer, columnConfig, false);
                if (isRoot)
                    jObject[columnName].parameterConfig = columnConfig;
            }
            
            else
                jObject[columnName] = replaceText(jsonObject[columnName], replacer)
        }
        return jObject;
    }
    else
        return jsonObject;
}

function replaceText(text: string, replacer: {[key:string]:any}) {
    if (typeof text == "string" && (text[0] == ":")) {
        text = text.replace(new RegExp(":", "g"), "");
        return replacer[text];
    }
    return text;
}

function isObjectType(value: any) {
    return !(typeof value == "string" || typeof value === "number" || typeof value === "boolean" || value instanceof Date);
}

function isObject(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]';
}