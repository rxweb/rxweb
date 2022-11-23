import { ElementEventProcessor } from './element-event-processor';
import { ADDITIONAL_CLASS, BOOLEAN, NONE, BLANK, DISPLAY, FUNCTION, STRING, ATTR, PROP, CLASS, STYLE } from '../const/app.const';
/**
 * @abstract
 */
export class ElementPropsAccessor extends ElementEventProcessor {
    /**
     * @param {?} dynamicNodeConfig
     */
    constructor(dynamicNodeConfig) {
        super(dynamicNodeConfig);
        this.oldAdditionalClasses = [];
        this.oldClasses = [];
    }
    /**
     * @param {?} attr
     * @param {?} isSubscribe
     * @return {?}
     */
    bindAttribute(attr, isSubscribe) {
        Object.keys(attr).forEach(attributeName => {
            let /** @type {?} */ value = (attributeName !== STYLE) ? this.getValue(attr[attributeName]) : attr[attributeName];
            switch (attributeName) {
                case ADDITIONAL_CLASS:
                case CLASS:
                    this.setClass(value, attributeName);
                    break;
                case STYLE:
                    Object.keys(attr[attributeName]).forEach(x => {
                        let /** @type {?} */ value = this.getValue(attr[attributeName][x]);
                        this.setStyleProp(x, value);
                        if (isSubscribe && this.isSubscribeProp(attr[attributeName][x]))
                            this.setPropSubscription(attr[attributeName][x], ATTR, x, '', STYLE);
                    });
                    break;
                default:
                    this.addOrRemoveAttribute(attributeName, value);
                    break;
            }
            if (isSubscribe && attributeName !== STYLE && this.isSubscribeProp(attr[attributeName]))
                this.setPropSubscription(attr[attributeName], ATTR, attributeName);
        });
    }
    /**
     * @param {?} prop
     * @param {?} isSubscribe
     * @return {?}
     */
    bindProp(prop, isSubscribe) {
        Object.keys(prop).forEach(propName => {
            let /** @type {?} */ value = this.getValue(prop[propName]);
            if (value)
                this.setProperty(propName, value);
            if (isSubscribe && this.isSubscribeProp(prop[propName]))
                this.setPropSubscription(prop[propName], PROP, propName);
        });
    }
    /**
     * @param {?} classes
     * @param {?} type
     * @return {?}
     */
    setClass(classes, type) {
        classes = this.getClassNames(type == ADDITIONAL_CLASS ? this.dynamicNodeConfig.additionalClasses.class : classes);
        type == ADDITIONAL_CLASS ? this.addOrRemoveClasses(this.oldAdditionalClasses, false) : this.addOrRemoveClasses(this.oldClasses, false);
        this.addOrRemoveClasses(classes);
        switch (type) {
            case ADDITIONAL_CLASS:
                this.oldAdditionalClasses = classes;
                break;
            case CLASS:
                this.oldClasses = classes;
                break;
        }
    }
    /**
     * @param {?} propName
     * @param {?} value
     * @return {?}
     */
    setStyleProp(propName, value) {
        switch (propName) {
            case DISPLAY:
                value = (typeof value == BOOLEAN) ? value : !(value);
                value = (value) ? NONE : BLANK;
                break;
        }
        this.addOrRemoveStyle(propName, value);
    }
    /**
     * @param {?} propertyName
     * @param {?} value
     * @return {?}
     */
    setProperty(propertyName, value) {
        this.dynamicNodeConfig.renderer.setProperty(this.element, propertyName, value);
    }
    /**
     * @param {?} classes
     * @param {?=} isAdd
     * @return {?}
     */
    addOrRemoveClasses(classes, isAdd = true) {
        if (isAdd)
            classes.forEach(t => this.dynamicNodeConfig.renderer.addClass(this.element, t));
        else
            classes.forEach(t => this.dynamicNodeConfig.renderer.removeClass(this.element, t));
    }
    /**
     * @param {?} styleName
     * @param {?} value
     * @return {?}
     */
    addOrRemoveStyle(styleName, value) {
        if (value)
            this.dynamicNodeConfig.renderer.setStyle(this.element, styleName, value);
        else
            this.dynamicNodeConfig.renderer.removeStyle(this.element, styleName);
    }
    /**
     * @param {?} attributeName
     * @param {?} value
     * @return {?}
     */
    addOrRemoveAttribute(attributeName, value) {
        if (value)
            this.dynamicNodeConfig.renderer.setAttribute(this.element, attributeName, value);
        else
            this.dynamicNodeConfig.renderer.removeAttribute(this.element, attributeName);
    }
    /**
     * @param {?} classes
     * @return {?}
     */
    getClassNames(classes) {
        let /** @type {?} */ elementClasses = [];
        if (classes)
            classes.forEach(t => {
                if (typeof t == STRING)
                    elementClasses.push(t);
                else if (typeof t == FUNCTION) {
                    let /** @type {?} */ elementClass = t.call(this.controlConfig);
                    if (elementClass && !Array.isArray(elementClass))
                        elementClasses.push(elementClass);
                    else if (Array.isArray(elementClass))
                        elementClass.forEach(x => elementClasses.push(x));
                }
            });
        return elementClasses;
    }
}
function ElementPropsAccessor_tsickle_Closure_declarations() {
    /** @type {?} */
    ElementPropsAccessor.prototype.oldAdditionalClasses;
    /** @type {?} */
    ElementPropsAccessor.prototype.oldClasses;
}
//# sourceMappingURL=element-props-accessor.js.map