import { TemplateCategory } from "../enums/template-category";
import { TemplateConfig } from "@rxweb/dom";
import { ClassConfig } from "../interface/class-config";
import { controlsTemplateContainer } from "./controls-template-container";

export function register(templateCategory: TemplateCategory, customTemplates: { [key: string]: TemplateConfig }, classConfig?: ClassConfig) {
    controlsTemplateContainer.addTemplate(templateCategory, customTemplates, classConfig)
}