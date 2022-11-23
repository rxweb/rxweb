import { COLON, BLANK, STRING, SQUARE } from '../const/app.const';
import { objectPropValue } from '../functions/object-prop-value.function';
const /** @type {?} */ PROPS = ":props.";
const /** @type {?} */ GLOBAL_MATCH = "g";
const /** @type {?} */ DOT = ".";
/**
 * @abstract
 */
export class BaseObjectAccessor {
    /**
     * @param {?} dynamicNodeConfig
     */
    constructor(dynamicNodeConfig) {
        this.dynamicNodeConfig = dynamicNodeConfig;
        this.subscribeProps = {
            names: [], props: {}
        };
        this.controlConfig = this.dynamicNodeConfig.controlConfig;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    getPropName(text) {
        if (text[0] == COLON || (text[0] == SQUARE)) {
            return text.replace(new RegExp(COLON, GLOBAL_MATCH), BLANK).replace(new RegExp(SQUARE, GLOBAL_MATCH), BLANK);
        }
        return text;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    getValue(text) {
        if (typeof text == STRING && ((text[0] == COLON) || (text[0] == SQUARE))) {
            text = text.replace(new RegExp(COLON, GLOBAL_MATCH), BLANK).replace(new RegExp(SQUARE, GLOBAL_MATCH), BLANK);
            return objectPropValue(text, this.controlConfig);
        }
        return text;
    }
    /**
     * @param {?} propName
     * @param {?} type
     * @param {?} attributeName
     * @param {?=} valuePropName
     * @param {?=} parentPropName
     * @return {?}
     */
    setPropSubscription(propName, type, attributeName, valuePropName = '', parentPropName = '') {
        if (propName.startsWith(PROPS))
            this.defineProp(propName);
        let /** @type {?} */ prop = this.getPropName(propName);
        if (!this.subscribeProps.props[prop])
            this.subscribeProps.props[prop] = {};
        if (!this.subscribeProps.props[prop][type])
            this.subscribeProps.props[prop][type] = {};
        if (parentPropName) {
            this.subscribeProps.props[prop][type][parentPropName] = {};
            this.subscribeProps.props[prop][type][parentPropName][attributeName] = (valuePropName) ? valuePropName : propName;
        }
        else
            this.subscribeProps.props[prop][type][attributeName] = (valuePropName) ? valuePropName : propName;
        if (this.subscribeProps.names.indexOf(prop) == -1)
            this.subscribeProps.names.push(prop);
    }
    /**
     * @param {?} propName
     * @return {?}
     */
    isSubscribeProp(propName) {
        return (typeof propName == STRING && (propName[0] == COLON));
    }
    /**
     * @param {?} propName
     * @return {?}
     */
    defineProp(propName) {
        let /** @type {?} */ splitText = propName.split(DOT);
        if (splitText.length > 1) {
            let /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.controlConfig.props), splitText[1]);
            if (!descriptor)
                this.controlConfig.defineProp(splitText[1]);
        }
    }
}
function BaseObjectAccessor_tsickle_Closure_declarations() {
    /** @type {?} */
    BaseObjectAccessor.prototype.controlConfig;
    /** @type {?} */
    BaseObjectAccessor.prototype.subscribeProps;
    /** @type {?} */
    BaseObjectAccessor.prototype.dynamicNodeConfig;
}
//# sourceMappingURL=base-object-accessor.js.map