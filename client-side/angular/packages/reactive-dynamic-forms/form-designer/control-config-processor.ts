﻿import { Input, ComponentFactoryResolver, ViewContainerRef, Directive } from "@angular/core";
import { FormControlConfig, ControlConfig } from "../services/form-control-config"
import { DynamicFormBuildConfig } from "../models/interface/dynamic-form-build-config";
import { DYNAMIC_ELEMENT_DESIGN_TREE } from '../const/dynamic-element-design-tree.const';
import { BOOTSTRAP_DESIGN_CONFIG } from '../const/bootstrap-design-config.const';
import { DomManipulation } from '../domain/dom/dom-manipulation'
import { ApplicationUtil } from '../util/application-util';
import { objectPropValue } from '../functions/object-prop-value.function';

import { INLINE,PREPEND_BOTH, PREPEND_LEFT, PREPEND_RIGHT, INPUT_TEXT,SQUARE_ERROR, SQUARE_SMALL, SQUARE_LABEL,SQUARE_CONTROL,ADVANCE, INPUT, TEXT, RANGE, FILE, STRING, CONTROL } from '../const/app.const';
import { DynamicNodeConfig } from "../models/interface/dynamic-node-config";

export class ControlConfigProcessor {
    isBuild: boolean = false;
    _viewMode: any;
    @Input('rxwebDynamicForm') dynamicFormBuildConfig: DynamicFormBuildConfig;

    @Input() set viewMode(value: string) {
        this._viewMode = value;
        if (this.isBuild)
            this.build();
    }

    get viewMode(): string {
        return this._viewMode;
    }

    get currentViewMode(): any {
        return DYNAMIC_ELEMENT_DESIGN_TREE.viewMode[this.viewMode];
    }

    getView(name: string, controlConfig: FormControlConfig) {
        if (this.viewMode == INLINE)
            name = this.getName(name,controlConfig,true);
        return DYNAMIC_ELEMENT_DESIGN_TREE[name];
    }

    get viewClassPath(): any {
        return BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode];
    }

    @Input() uiBindings: any[];

    constructor(protected element: any, private renderer, private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }


    build() {
        this.uiBindings.forEach(controlConfigName => {
            this.designForm(controlConfigName, this.element, this.currentViewMode[0], this.currentViewMode[1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode]);
        })
    }

    designForm(controlConfigName, element, viewRoot, viewChild, classPath: any, childrenControlConfig?: FormControlConfig) {
        let controlConfig = childrenControlConfig || this.getControlConfig(controlConfigName);
        if (controlConfig) {
            if (this.viewMode != INLINE && controlConfig && !controlConfig.config.skipDefaultView)
                this.createElement(viewRoot, viewChild, element, controlConfig, classPath);
            else {
                let currentView = this.getView(controlConfig.config.type, controlConfig);
                if (currentView)
                    this.createElement(currentView[0], currentView[1], element, controlConfig, this.getClassPath(controlConfig.config.type, controlConfig, this._viewMode == INLINE));
                else
                    this.createDomManipulation(controlConfig.config.type, [], element, controlConfig, [], true)
            }
        } else if (this.viewMode == ADVANCE && Array.isArray(controlConfigName)) {
            let config: any = new ControlConfig({ }, {});
            let domManipulation = this.createElement(this.currentViewMode[0], [], element, config, BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode])
            controlConfigName.forEach(t => {
                this.designForm(t, domManipulation.element, this.currentViewMode[1][0], this.currentViewMode[1][1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode].child["0"])
            })
        }
    }


    createElement(elementName: string, collections: any[], parentElement: any, controlConfig: FormControlConfig, elementClassPath: any) {
        if (!elementName.startsWith("#")) {
            elementClassPath = elementClassPath ? elementClassPath : {};
            let domManipulation = this.createDomManipulation(elementName, collections, parentElement, controlConfig, elementClassPath);
            this.createChildrens(collections, domManipulation, controlConfig, elementClassPath)
            if (controlConfig.config && controlConfig.config.childrens && controlConfig.config.childrens.length > 0) {
                controlConfig.config.childrens.forEach((t, i) => {
                    let childrenControlConfig = undefined;
                    if (!(typeof t == STRING) && !Array.isArray(t))
                        childrenControlConfig = new ControlConfig({ ...t, ...{ skipDefaultView: true } }, {});
                    this.designForm(t, domManipulation.element, this.currentViewMode[0], this.currentViewMode[1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode], childrenControlConfig);
                })
            }
            return domManipulation;
        } else
            this.createDomManipulation(elementName, collections, parentElement, controlConfig, elementClassPath,true);//this.createComponentView(controlConfig, parentElement);
    }

    private createDomManipulation(elementName: string, collections: any[], parentElement: any, controlConfig: FormControlConfig, elementClassPath: any, isComponentView: boolean = false) {
        let dynamicNodeConfig: DynamicNodeConfig = {
            controlConfig: controlConfig, additionalClasses: elementClassPath, renderer: this.renderer, collections: collections, controlConfigProcessor: this,
            viewContainerRef: isComponentView ? this.viewContainerRef : undefined,
            componentFactoryResolver: isComponentView ? this.componentFactoryResolver : undefined,
            dynamicFormBuildConfig: this.dynamicFormBuildConfig
        }
        return new DomManipulation(parentElement, elementName, dynamicNodeConfig);
    }

    createChildrens(collections, domManipulation, controlConfig, elementClassPath,isSubscribe:boolean = true) {
        let elementCount = 0;
        let childElementsClassConfig = elementClassPath.child ? elementClassPath.child : {};
        for (var i = 0; i < collections.length; i++) {
            let collection = collections[i];
            if (!ApplicationUtil.isObject(collection)) {
                if (this.isCreateElement(collections[i], controlConfig)) {
                    if (collection == SQUARE_CONTROL && controlConfig.config.type == undefined && controlConfig.config.childControlConfigs) {
                        controlConfig.config.childControlConfigs.forEach(x => {
                            let childControlConfig = this.getControlConfig(x);
                            this.createChildNodes(collections, childControlConfig, childElementsClassConfig, elementCount, i, domManipulation);
                        })
                    } else {
                        if (collection == SQUARE_CONTROL && controlConfig.config.type.startsWith("#"))
                            this.createDomManipulation(controlConfig.config.type, [], domManipulation.element, controlConfig,[],true)
                        else {
                            let isIncrease = this.createChildNodes(collections, controlConfig, childElementsClassConfig, elementCount, i, domManipulation);
                            if (isIncrease)
                                i = i + 1;
                        }
                    }
                }
                elementCount++;
            } else {
                if (collection.for)
                    this.runForCollection(collection, domManipulation, controlConfig, elementClassPath);
                if (isSubscribe)
                domManipulation.parseObject(collections[i], isSubscribe);
            }
        }
    }

    private createChildNodes(collections, controlConfig, childElementsClassConfig, elementCount, i, domManipulation) {
        let isNextCollection: boolean = false;
        let nextCollection = this.getCollection(collections[i], controlConfig);
        let childClasses = this.getAdditionalClasses(collections[i], childElementsClassConfig, elementCount, controlConfig);
        if (!nextCollection) {
            nextCollection = [collections[i], collections[i + 1]];
            isNextCollection = true;
        }
        this.createElement(nextCollection[0], nextCollection[1], domManipulation.element, controlConfig, childClasses);
        return isNextCollection;
    }
    private runForCollection(collection: any, domManipulation, controlConfig, elementClassPath) {
        Object.keys(collection.for).forEach(t => {
            let source = objectPropValue(t, controlConfig);
            source.forEach((x, index) => {
                let item = collection.for[t].call(controlConfig, x, index);
                this.createChildrens(item, domManipulation, controlConfig, elementClassPath);
            })

        })
    }

    private getAdditionalClasses(name: string, childClasses: { [key: string]: any }, index: number, controlConfig: FormControlConfig) {
        name = this.getName(name, controlConfig)
        let additionalClasses = BOOTSTRAP_DESIGN_CONFIG.elementClassPath[name];
        let childrenClasses = childClasses[index] ? childClasses[index] : {
            class: []
        };
        if (additionalClasses) {
            if (childrenClasses.class)
                additionalClasses = { class: additionalClasses.class.concat(childrenClasses.class), listenerProps: additionalClasses.listenerProps, child: additionalClasses.child }
            return additionalClasses
        }

        return childrenClasses;
    }

    private getCollection(name: string,controlConfig: FormControlConfig) {
        if (name[0] == "[") {
            name = this.getName(name, controlConfig);
            return DYNAMIC_ELEMENT_DESIGN_TREE[name];
        }
        return undefined;
    }

    private getControlName(name: string) {
        let controlName: string = '';
        switch (name) {
            case "number":
            case "color":
            case "date":
            case "email":
            case "password":
            case "tel":
            case "time":
            case "url":
            case "color":
            case RANGE:
            case FILE:
            case TEXT:
                controlName = INPUT;
                break;
            default:
                controlName = name;

        }
        return controlName;
    }

    private getControlConfig(name: string) {
        return this.dynamicFormBuildConfig.controlsConfig[name];
    }

    private getName(name: string, controlConfig: FormControlConfig,isInline:boolean = false) {
        name = name.replace(new RegExp(/\[/g), '').replace(new RegExp(/\]/g), '');
        name = (name == CONTROL || isInline) ? this.getControlName(controlConfig.config.type) : name;
        switch (name) {
            case INPUT:
                name = this.prependControl(name,controlConfig);
                break;
            case INPUT_TEXT:
                name = INPUT;
                break;
        }
        return name;
    }

    private prependControl(name: string, controlConfig: FormControlConfig) {
        if (controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.right && controlConfig.config.ui.prependText.left)
            name = PREPEND_BOTH;
        else if (name == INPUT && controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.left)
            name = PREPEND_LEFT;
        else if (name == INPUT && controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.right)
            name = PREPEND_RIGHT;
        return name;
    }

    private isCreateElement(collection: any, controlConfig: FormControlConfig) {
        let isCreate = true;
        switch (collection) {
            case "[img]":
                isCreate = controlConfig.img != undefined;
            case SQUARE_LABEL:
                isCreate = controlConfig.label != undefined;
                break;
            case SQUARE_SMALL:
                isCreate = controlConfig.description != undefined;
                break;
            case SQUARE_ERROR:
                isCreate = controlConfig.formControl != undefined && (controlConfig.formControl.validator != undefined || controlConfig.formControl.asyncValidator != undefined) ;
                break;
        }
        return isCreate;
    }

    private getClassPath(name: string,controlConfig:FormControlConfig,isInline:boolean) {
        if (this.viewMode == INLINE)
            name = this.getName(name,controlConfig,isInline);
        return BOOTSTRAP_DESIGN_CONFIG.elementClassPath[name];
    }
}