import { Input } from '@angular/core';
import { ControlConfig } from '../services/form-control-config';
import { DYNAMIC_ELEMENT_DESIGN_TREE } from '../const/dynamic-element-design-tree.const';
import { BOOTSTRAP_DESIGN_CONFIG } from '../const/bootstrap-design-config.const';
import { DomManipulation } from '../domain/dom-manipulation';
import { ApplicationUtil } from '../util/application-util';
import { objectPropValue } from '../functions/object-prop-value.function';
import { PREPEND_BOTH, PREPEND_LEFT, PREPEND_RIGHT, INPUT_TEXT, SQUARE_ERROR, SQUARE_SMALL, SQUARE_LABEL, SQUARE_CONTROL, ADVANCE, INPUT, TEXT, RANGE, FILE, STRING, CONTROL } from '../const/app.const';
export class ControlConfigProcessor {
    /**
     * @param {?} element
     * @param {?} renderer
     */
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.isBuild = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set viewMode(value) {
        this._viewMode = value;
        if (this.isBuild)
            this.build();
    }
    /**
     * @return {?}
     */
    get viewMode() {
        return this._viewMode;
    }
    /**
     * @return {?}
     */
    get currentViewMode() {
        return DYNAMIC_ELEMENT_DESIGN_TREE.viewMode[this.viewMode];
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getView(name) {
        return DYNAMIC_ELEMENT_DESIGN_TREE[name];
    }
    /**
     * @return {?}
     */
    get viewClassPath() {
        return BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode];
    }
    /**
     * @return {?}
     */
    build() {
        this.uiBindings.forEach(controlConfigName => {
            this.designForm(controlConfigName, this.element, this.currentViewMode[0], this.currentViewMode[1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode]);
        });
    }
    /**
     * @param {?} controlConfigName
     * @param {?} element
     * @param {?} viewRoot
     * @param {?} viewChild
     * @param {?} classPath
     * @param {?=} childrenControlConfig
     * @return {?}
     */
    designForm(controlConfigName, element, viewRoot, viewChild, classPath, childrenControlConfig) {
        let /** @type {?} */ controlConfig = childrenControlConfig || this.getControlConfig(controlConfigName);
        if (controlConfig) {
            if (controlConfig && !controlConfig.config.skipDefaultView)
                this.createElement(viewRoot, viewChild, element, controlConfig, classPath);
            else {
                let /** @type {?} */ currentView = this.getView(controlConfig.config.type);
                this.createElement(currentView[0], currentView[1], element, controlConfig, BOOTSTRAP_DESIGN_CONFIG.elementClassPath[controlConfig.config.type]);
            }
        }
        else if (this.viewMode == ADVANCE && Array.isArray(controlConfigName)) {
            let /** @type {?} */ config = {};
            let /** @type {?} */ domManipulation = this.createElement(this.currentViewMode[0], [], element, config, BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode]);
            controlConfigName.forEach(t => {
                this.designForm(t, domManipulation.element, this.currentViewMode[1][0], this.currentViewMode[1][1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode].child["0"]);
            });
        }
    }
    /**
     * @param {?} elementName
     * @param {?} collections
     * @param {?} parentElement
     * @param {?} controlConfig
     * @param {?} elementClassPath
     * @return {?}
     */
    createElement(elementName, collections, parentElement, controlConfig, elementClassPath) {
        elementClassPath = elementClassPath ? elementClassPath : {};
        let /** @type {?} */ dynamicNodeConfig = {
            controlConfig: controlConfig, additionalClasses: elementClassPath, renderer: this.renderer, collections: collections, controlConfigProcessor: this
        };
        let /** @type {?} */ domManipulation = new DomManipulation(parentElement, elementName, dynamicNodeConfig);
        this.createChildrens(collections, domManipulation, controlConfig, elementClassPath);
        if (controlConfig.config && controlConfig.config.childrens && controlConfig.config.childrens.length > 0) {
            controlConfig.config.childrens.forEach((t, i) => {
                let /** @type {?} */ childrenControlConfig = undefined;
                if (!(typeof t == STRING) && !Array.isArray(t))
                    childrenControlConfig = new ControlConfig(Object.assign({}, t, { skipDefaultView: true }), {});
                this.designForm(t, domManipulation.element, this.currentViewMode[0], this.currentViewMode[1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode], childrenControlConfig);
            });
        }
        return domManipulation;
    }
    /**
     * @param {?} collections
     * @param {?} domManipulation
     * @param {?} controlConfig
     * @param {?} elementClassPath
     * @param {?=} isSubscribe
     * @return {?}
     */
    createChildrens(collections, domManipulation, controlConfig, elementClassPath, isSubscribe = true) {
        let /** @type {?} */ elementCount = 0;
        let /** @type {?} */ childElementsClassConfig = elementClassPath.child ? elementClassPath.child : {};
        for (var /** @type {?} */ i = 0; i < collections.length; i++) {
            let /** @type {?} */ collection = collections[i];
            if (!ApplicationUtil.isObject(collection)) {
                if (this.isCreateElement(collections[i], controlConfig)) {
                    if (collection == SQUARE_CONTROL && controlConfig.config.type == undefined && controlConfig.config.childControlConfigs) {
                        controlConfig.config.childControlConfigs.forEach(x => {
                            let /** @type {?} */ childControlConfig = this.getControlConfig(x);
                            this.createChildNodes(collections, childControlConfig, childElementsClassConfig, elementCount, i, domManipulation);
                        });
                    }
                    else {
                        let /** @type {?} */ isIncrease = this.createChildNodes(collections, controlConfig, childElementsClassConfig, elementCount, i, domManipulation);
                        if (isIncrease)
                            i = i + 1;
                    }
                }
                elementCount++;
            }
            else {
                if (collection.for)
                    this.runForCollection(collection, domManipulation, controlConfig, elementClassPath);
                if (isSubscribe)
                    domManipulation.parseObject(collections[i], isSubscribe);
            }
        }
    }
    /**
     * @param {?} collections
     * @param {?} controlConfig
     * @param {?} childElementsClassConfig
     * @param {?} elementCount
     * @param {?} i
     * @param {?} domManipulation
     * @return {?}
     */
    createChildNodes(collections, controlConfig, childElementsClassConfig, elementCount, i, domManipulation) {
        let /** @type {?} */ isNextCollection = false;
        let /** @type {?} */ nextCollection = this.getCollection(collections[i], controlConfig);
        let /** @type {?} */ childClasses = this.getAdditionalClasses(collections[i], childElementsClassConfig, elementCount, controlConfig);
        if (!nextCollection) {
            nextCollection = [collections[i], collections[i + 1]];
            isNextCollection = true;
        }
        this.createElement(nextCollection[0], nextCollection[1], domManipulation.element, controlConfig, childClasses);
        return isNextCollection;
    }
    /**
     * @param {?} collection
     * @param {?} domManipulation
     * @param {?} controlConfig
     * @param {?} elementClassPath
     * @return {?}
     */
    runForCollection(collection, domManipulation, controlConfig, elementClassPath) {
        Object.keys(collection.for).forEach(t => {
            let /** @type {?} */ source = objectPropValue(t, controlConfig);
            source.forEach((x, index) => {
                let /** @type {?} */ item = collection.for[t].call(controlConfig, x, index);
                this.createChildrens(item, domManipulation, controlConfig, elementClassPath);
            });
        });
    }
    /**
     * @param {?} name
     * @param {?} childClasses
     * @param {?} index
     * @param {?} controlConfig
     * @return {?}
     */
    getAdditionalClasses(name, childClasses, index, controlConfig) {
        name = this.getName(name, controlConfig);
        let /** @type {?} */ additionalClasses = BOOTSTRAP_DESIGN_CONFIG.elementClassPath[name];
        let /** @type {?} */ childrenClasses = childClasses[index] ? childClasses[index] : {
            class: []
        };
        if (additionalClasses) {
            if (childrenClasses.class)
                additionalClasses = { class: additionalClasses.class.concat(childrenClasses.class), listenerProps: additionalClasses.listenerProps, child: additionalClasses.child };
            return additionalClasses;
        }
        return childrenClasses;
    }
    /**
     * @param {?} name
     * @param {?} controlConfig
     * @return {?}
     */
    getCollection(name, controlConfig) {
        if (name[0] == "[") {
            name = this.getName(name, controlConfig);
            return DYNAMIC_ELEMENT_DESIGN_TREE[name];
        }
        return undefined;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getControlName(name) {
        let /** @type {?} */ controlName = '';
        switch (name) {
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
    /**
     * @param {?} name
     * @return {?}
     */
    getControlConfig(name) {
        return this.dynamicFormBuildConfig.controlsConfig[name];
    }
    /**
     * @param {?} name
     * @param {?} controlConfig
     * @return {?}
     */
    getName(name, controlConfig) {
        name = name.replace(new RegExp(/\[/g), '').replace(new RegExp(/\]/g), '');
        name = (name == CONTROL) ? this.getControlName(controlConfig.config.type) : name;
        switch (name) {
            case INPUT:
                name = this.prependControl(name, controlConfig);
                break;
            case INPUT_TEXT:
                name = INPUT;
                break;
        }
        return name;
    }
    /**
     * @param {?} name
     * @param {?} controlConfig
     * @return {?}
     */
    prependControl(name, controlConfig) {
        if (controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.right && controlConfig.config.ui.prependText.left)
            name = PREPEND_BOTH;
        else if (name == INPUT && controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.left)
            name = PREPEND_LEFT;
        else if (name == INPUT && controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.right)
            name = PREPEND_RIGHT;
        return name;
    }
    /**
     * @param {?} collection
     * @param {?} controlConfig
     * @return {?}
     */
    isCreateElement(collection, controlConfig) {
        let /** @type {?} */ isCreate = true;
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
ControlConfigProcessor.propDecorators = {
    'dynamicFormBuildConfig': [{ type: Input, args: ['rxwebDynamicForm',] },],
    'viewMode': [{ type: Input },],
    'uiBindings': [{ type: Input },],
};
function ControlConfigProcessor_tsickle_Closure_declarations() {
    /** @type {?} */
    ControlConfigProcessor.propDecorators;
    /** @type {?} */
    ControlConfigProcessor.prototype.isBuild;
    /** @type {?} */
    ControlConfigProcessor.prototype._viewMode;
    /** @type {?} */
    ControlConfigProcessor.prototype.dynamicFormBuildConfig;
    /** @type {?} */
    ControlConfigProcessor.prototype.uiBindings;
    /** @type {?} */
    ControlConfigProcessor.prototype.element;
    /** @type {?} */
    ControlConfigProcessor.prototype.renderer;
}
//# sourceMappingURL=control-config-processor.js.map