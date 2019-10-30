import { DesignClass } from "./design-class";
import { TemplateConfig, ElementConfig } from "../interface/config/template-config";
import { FilterCollection } from "./filter-collection";

export class GridTemplate extends FilterCollection {


    constructor(source:any[],model:Function) {
        super(source, model);
        this.designClass = new DesignClass();
    }
	 

    designClass: DesignClass;

    get headerTemplate() {
        return this._headerTemplate;
    }

    set headerTemplate(value: TemplateConfig) {
        this._headerTemplate = value;
    }

    get bodyTemplate() {
        return this._bodyTemplate;
    }
    set bodyTemplate(value: TemplateConfig) {
        this._bodyTemplate = value;
    }

    get tableElementConfig(): ElementConfig {
        return {
            class: this.designClass.tableClass,
            childrens: [this.headerTemplate, this.bodyTemplate]
        };
    }


    set pagingDropDownTemplate(value: TemplateConfig) {
        this._dropdownTemplate = value;
    }

    get pagingDropdownTemplate() {
        return this._dropdownTemplate;
    }

    set pagingTextTemplate(value: TemplateConfig) {
        this._pagingTextTemplate = value;
    }

    get pagingTextTemplate() {
        return this._pagingTextTemplate;
    }

    set paginatorTemplate(value: TemplateConfig) {
        this._paginatorTemplate = value;
    }

    get paginatorTemplate() {
        return this._paginatorTemplate;
    }

    private _paginatorTemplate: TemplateConfig;
    private _pagingTextTemplate: TemplateConfig;
    private _dropdownTemplate: TemplateConfig;
    private _headerTemplate: TemplateConfig;
    private _bodyTemplate: TemplateConfig;

}