export interface CustomTemplateConfig{
    templateName: string;
    childrenTemplateNames?: string[];
    replacers?: {[key:string]:any}
}