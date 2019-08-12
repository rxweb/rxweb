import { Input } from "@angular/core";
import { FormControlConfig, ControlConfig } from "../services/form-control-config"
import { DynamicFormBuildConfig } from "../models/interface/dynamic-form-build-config";

import { DYNAMIC_ELEMENT_DESIGN_TREE } from '../const/dynamic-element-design-tree.const';
import { BOOTSTRAP_DESIGN_CONFIG } from '../const/bootstrap-design-config.const';
import { DomManipulation } from '../domain/dom-manipulation'
import { ApplicationUtil } from '../util/application-util';
import { objectPropValue } from '../functions/object-prop-value.function';

import { PREPEND_BOTH, PREPEND_LEFT, PREPEND_RIGHT, INPUT_TEXT,SQUARE_ERROR, SQUARE_SMALL, SQUARE_LABEL,SQUARE_CONTROL,ADVANCE, INPUT, TEXT, RANGE, FILE, STRING, CONTROL } from '../const/app.const';
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

    getView(name: string) {
        return DYNAMIC_ELEMENT_DESIGN_TREE[name];
    }

    get viewClassPath(): any {
        return BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode];
    }

    @Input() uiBindings: any[];

    constructor(protected element: Node, private renderer) { }


    build() {
        this.uiBindings.forEach(controlConfigName => {
            this.designForm(controlConfigName, this.element, this.currentViewMode[0], this.currentViewMode[1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode]);
        })
    }

    designForm(controlConfigName, element, viewRoot, viewChild, classPath: any, childrenControlConfig?: FormControlConfig) {
        let controlConfig = childrenControlConfig || this.getControlConfig(controlConfigName);
        if (controlConfig) {
            if (controlConfig && !controlConfig.config.skipDefaultView)
                this.createElement(viewRoot, viewChild, element, controlConfig, classPath);
            else {
                let currentView = this.getView(controlConfig.config.type);
                this.createElement(currentView[0], currentView[1], element, controlConfig, BOOTSTRAP_DESIGN_CONFIG.elementClassPath[controlConfig.config.type]);
            }
        } else if (this.viewMode == ADVANCE && Array.isArray(controlConfigName)) {
            let config: any = {};
            let domManipulation = this.createElement(this.currentViewMode[0], [], element, config, BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode])
            controlConfigName.forEach(t => {
                this.designForm(t, domManipulation.element, this.currentViewMode[1][0], this.currentViewMode[1][1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode].child["0"])
            })
        }
    }


    createElement(elementName: string, collections: any[], parentElement: any, controlConfig: FormControlConfig, elementClassPath: any) {
        elementClassPath = elementClassPath ? elementClassPath : {};
        let dynamicNodeConfig: DynamicNodeConfig = {
            controlConfig: controlConfig, additionalClasses: elementClassPath, renderer: this.renderer, collections: collections, controlConfigProcessor:this
        }
        let domManipulation = new DomManipulation(parentElement, elementName, dynamicNodeConfig);
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
                        let isIncrease = this.createChildNodes(collections, controlConfig, childElementsClassConfig, elementCount, i, domManipulation);
                        if (isIncrease)
                            i = i + 1;
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

    private getName(name: string, controlConfig: FormControlConfig) {
        name = name.replace(new RegExp(/\[/g), '').replace(new RegExp(/\]/g), '');
        name = (name == CONTROL) ? this.getControlName(controlConfig.config.type) : name;
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
            case SQUARE_LABEL:
                isCreate = controlConfig.label != undefined;
                break;
            case SQUARE_SMALL:
                isCreate = controlConfig.description != undefined;
                break;
            case SQUARE_ERROR:
                isCreate = controlConfig.formControl != undefined && controlConfig.formControl.validator != undefined;
                break;
        }
        return isCreate;
    }
}