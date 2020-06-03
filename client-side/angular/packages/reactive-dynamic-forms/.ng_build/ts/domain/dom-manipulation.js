import { SOURCE, SELECT, ADDITIONAL_CLASS, PROP, ATTR, EVENTS, INPUT, TEXTAREA, READONLY } from '../const/app.const';
import { ControlState } from '../statics/control-state';
import { OverrideObjectProp } from './override-object-prop';
export class DomManipulation extends OverrideObjectProp {
    /**
     * @param {?} parentNode
     * @param {?} elementName
     * @param {?} dynamicNodeConfig
     */
    constructor(parentNode, elementName, dynamicNodeConfig) {
        super(dynamicNodeConfig);
        this.subscribers = [];
        this.elementIndex = 0;
        this.eventListeners = [];
        this.actionListeners = {};
        this.elementClasses = [];
        this.nodeName = elementName;
        super.createNodeElement(parentNode, elementName);
        this.bindAdditionalClasses();
        this.controlId = ControlState.controlId = ControlState.controlId + 1;
        ControlState.controls[this.controlId] = this;
        this.addOrRemoveAttribute("data-rxwebid", this.controlId);
    }
    /**
     * @param {?} jObject
     * @param {?} isSubscribe
     * @return {?}
     */
    parseObject(jObject, isSubscribe) {
        this.domConfig = jObject;
        this.process(jObject, isSubscribe);
        this.overrideProp();
        this.subscribeValueChange();
    }
    /**
     * @return {?}
     */
    subscribeValueChange() {
        if (Object.keys(this.subscribeProps).length > 0)
            this.controlConfig.onPropValueChanged(this.controlId, this.subscribeProps, (x, y) => {
                this.process(x, false);
            });
    }
    /**
     * @param {?} jObject
     * @param {?} isSubscribe
     * @return {?}
     */
    process(jObject, isSubscribe) {
        Object.keys(jObject).forEach(propName => {
            switch (propName) {
                case PROP:
                    this.bindProp(jObject[propName], isSubscribe);
                    break;
                case ATTR:
                    this.bindAttribute(jObject[propName], isSubscribe);
                    break;
                case EVENTS:
                    this.bindEvents(jObject[propName], isSubscribe);
                    break;
                case SOURCE:
                    if (!isSubscribe) {
                        while (this.element.firstElementChild)
                            this.removeChildren(this.element.firstElementChild);
                        this.dynamicNodeConfig.controlConfigProcessor.createChildrens(this.dynamicNodeConfig.collections, this, this.controlConfig, this.dynamicNodeConfig.additionalClasses, false);
                    }
                    else
                        this.setPropSubscription(SOURCE, SOURCE, SOURCE);
                    break;
            }
        });
    }
    /**
     * @return {?}
     */
    overrideProp() {
        switch (this.nodeName) {
            case INPUT:
            case SELECT:
            case TEXTAREA:
                if (this.domConfig.overrideProp == undefined || this.domConfig.overrideProp)
                    this.overrideValueProp();
                this.setPropSubscription(READONLY, ATTR, ADDITIONAL_CLASS, ADDITIONAL_CLASS);
                break;
        }
    }
    /**
     * @return {?}
     */
    bindAdditionalClasses() {
        let /** @type {?} */ additionalClasses = this.dynamicNodeConfig.additionalClasses;
        if (additionalClasses && additionalClasses.class) {
            this.setClass(additionalClasses.class, ADDITIONAL_CLASS);
            if (additionalClasses.listenerProps)
                additionalClasses.listenerProps.forEach(t => this.setPropSubscription(t, ATTR, ADDITIONAL_CLASS, ADDITIONAL_CLASS));
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        let /** @type {?} */ eventCount = this.eventListeners.length;
        for (var /** @type {?} */ i = 0; i < eventCount; i++) {
            this.eventListeners[0]();
            this.eventListeners.splice(0, 1);
        }
        this.eventListeners = [];
        this.element.onClick = null;
        this.element.parentElement.removeChild(this.element);
        this.controlConfig.destroy(this.controlId);
    }
}
function DomManipulation_tsickle_Closure_declarations() {
    /** @type {?} */
    DomManipulation.prototype.subscribers;
    /** @type {?} */
    DomManipulation.prototype.elementIndex;
    /** @type {?} */
    DomManipulation.prototype.commentNode;
    /** @type {?} */
    DomManipulation.prototype.nodeName;
    /** @type {?} */
    DomManipulation.prototype.domConfig;
    /** @type {?} */
    DomManipulation.prototype.element;
    /** @type {?} */
    DomManipulation.prototype.eventListeners;
    /** @type {?} */
    DomManipulation.prototype.controlId;
    /** @type {?} */
    DomManipulation.prototype.actionListeners;
    /** @type {?} */
    DomManipulation.prototype.elementClasses;
}
//# sourceMappingURL=dom-manipulation.js.map