import { TemplateCategory } from "../enums/template-category";
import { TemplateConfig } from "@rxweb/dom";
import { ClassConfig } from "../interface/class-config";

export const controlsTemplateContainer:
    {
        get(templateCategory: TemplateCategory): { [key: string]: TemplateConfig },
        addTemplate(templateCategory: TemplateCategory, customTemplates: { [key: string]: TemplateConfig }, templateClass: ClassConfig): void,
        getClass(templateCategory: TemplateCategory): ClassConfig
    } = new (class {
        private controls: {
            [key: number]: { [key: string]: TemplateConfig }
        } = {};

        private controlClassConfig: {
            [key: number]: ClassConfig 
        } = {};

        getClass(templateCategory: TemplateCategory): ClassConfig {
            return this.controlClassConfig[templateCategory];
        }

        get(templateCategory: TemplateCategory): { [key: string]: TemplateConfig } {
            return this.controls[templateCategory];
        }
        addTemplate(templateCategory: TemplateCategory, customTemplates: { [key: string]: TemplateConfig }, templateClass: ClassConfig): void {
            this.controls[templateCategory] = customTemplates;
            this.controlClassConfig[templateCategory] = templateClass;
        }
    })();
