import { DesignClass } from "./design-class";
import { TemplateConfig, ElementConfig } from "../interface/config/template-config";
import { GridConfig } from "../interface/config/grid-config"
import { FilterCollection } from "./filter-collection";
import { FooterDesignClass } from './footer-design-class';

export class GridTemplate extends FilterCollection {
    private _footerLeftTemplate: TemplateConfig;
    private _footerCenterTemplate: TemplateConfig;
    private _footerRightTemplate: TemplateConfig;
    private _topFooterLeftTemplate: TemplateConfig;
    private _topFooterCenterTemplate: TemplateConfig;
    private _topFooterRightTemplate: TemplateConfig;
    footerDesignClass: FooterDesignClass;
    constructor(source: any[], model: Function, gridConfiguration: GridConfig) {
        super(source, model, gridConfiguration);
        this.designClass = new DesignClass();
        this.footerDesignClass = new FooterDesignClass();
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

    get topFooterTemplate() {
        return {
            div: {
                class: this.footerDesignClass.rootClass,
                childrens: [this.topFooterLeftTemplate, this.topFooterCenterTemplate, this.topFooterRightTemplate]
            }
        }
    }

    get footerTemplate() {
        return {
            div: {
                class: this.footerDesignClass.rootClass,
                childrens: [this.footerLeftTemplate, this.footerCenterTemplate, this.footerRightTemplate]
            }
        }
    }

    set footerLeftTemplate(value: TemplateConfig) {
        this._footerLeftTemplate = value;
    }

    get footerLeftTemplate() {
        return this._footerLeftTemplate;
    }

    set topFooterLeftTemplate(value: TemplateConfig) {
        this._topFooterLeftTemplate = value;
    }

    get topFooterLeftTemplate() {
        return this._topFooterLeftTemplate;
    }

    set footerCenterTemplate(value: TemplateConfig) {
        this._footerCenterTemplate = value;
    }

    get footerCenterTemplate() {
        return this._footerCenterTemplate;
    }

    set topFooterCenterTemplate(value: TemplateConfig) {
        this._topFooterCenterTemplate = value;
    }

    get topFooterCenterTemplate() {
        return this._topFooterCenterTemplate;
    }

    set footerRightTemplate(value: TemplateConfig) {
        this._footerRightTemplate = value;
    }

    get footerRightTemplate() {
        return this._footerRightTemplate;
    }

    set topFooterRightTemplate(value: TemplateConfig) {
        this._topFooterRightTemplate = value;
    }

    get topFooterRightTemplate() {
        return this._topFooterRightTemplate;
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