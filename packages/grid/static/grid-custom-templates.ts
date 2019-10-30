import { TemplateConfig } from "../interface/config/template-config";

export class GridCustomTemplate {
    private static customTemplates: { [key: string]: TemplateConfig } = {};

    static register(templates: { [key: string]: TemplateConfig }) {
        if(templates)
            Object.keys(templates).forEach(templateKey => this.customTemplates[templateKey] = templates[templateKey]);
    }

    static get(templateName: string) {
        return this.customTemplates[templateName];
    }
}