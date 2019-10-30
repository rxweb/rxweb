import { TemplateConfig } from "../interface/config/template-config";

export class GridCustomTemplate {
    private static customTemplates: { [key: string]: TemplateConfig } = {};

    static register(templates: { [key: string]: TemplateConfig }) {
        if(templates)
            Object.keys(templates).forEach(templateKey => GridCustomTemplate.customTemplates[templateKey] = templates[templateKey]);
    }

    static getTemplate(templateName: string) {
        return GridCustomTemplate.customTemplates[templateName];
    }
}