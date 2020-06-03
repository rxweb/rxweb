import { GridCustomTemplate } from "./grid-custom-templates";
import { CustomTemplateConfig } from "../interface/config/custom-template-config";
import { GridColumnConfig } from "../interface/config/grid-column-config";
import { TemplateConfig, ElementConfig } from "../interface/config/template-config";

export function customTemplateParser(configuredTemplate: CustomTemplateConfig, columnConfig: GridColumnConfig) {
    var replacers: { [key: string]: any } = { columnName: columnConfig.name };
    if (configuredTemplate.replacers)
        Object.keys(configuredTemplate.replacers).forEach(t => replacers[t] = configuredTemplate.replacers[t]);
    var template = GridCustomTemplate.getTemplate(configuredTemplate.templateName);
    var cloned = template;
    if (template)
        cloned = mergeChildrens(configuredTemplate, { ...template });
    return template ? parse(cloned, replacers, columnConfig,true) : undefined;
}

function mergeChildrens(configuredTemplate: CustomTemplateConfig, cloned: TemplateConfig) {
    if (configuredTemplate && configuredTemplate.childrenTemplateNames)
    configuredTemplate.childrenTemplateNames.forEach(t => {
        Object.keys(cloned).forEach(x => {
            let elementConfig = cloned[x] as ElementConfig;
            elementConfig.childrens.push(GridCustomTemplate.getTemplate(t));
        })
    })
    return cloned;
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