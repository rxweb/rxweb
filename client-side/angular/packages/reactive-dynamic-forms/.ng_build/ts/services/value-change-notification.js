import { isNotMatched } from '../util/is-not-matched';
export class ValueChangeNotification {
    constructor() {
        this.attributeChangeSubscriptions = new Array();
    }
    /**
     * @param {?} controlId
     * @param {?} subscription
     * @param {?} func
     * @return {?}
     */
    onPropValueChanged(controlId, subscription, func) {
        this.attributeChangeSubscriptions.push({ controlId: controlId, names: subscription.names, props: subscription.props, func: func });
    }
    /**
     * @param {?} name
     * @param {?} value
     * @param {?} oldValue
     * @param {?=} isProps
     * @return {?}
     */
    notifyValueChanged(name, value, oldValue, isProps = false) {
        if ((!isProps && this.isNotEqual(oldValue, value)) && this.onPropValueChanged) {
            let /** @type {?} */ subscriptions = this.attributeChangeSubscriptions.filter(t => t.names.indexOf(name) != -1);
            subscriptions.forEach(subscribe => {
                if (subscribe.props && subscribe.props[name])
                    subscribe.func(subscribe.props[name]);
            });
        }
    }
    /**
     * @param {?} leftValue
     * @param {?} rightValue
     * @return {?}
     */
    isNotEqual(leftValue, rightValue) {
        if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
            let /** @type {?} */ isNotEqual = leftValue.length != rightValue.length;
            if (!isNotEqual)
                for (var /** @type {?} */ i = 0; i < leftValue.length; i++) {
                    isNotEqual = isNotMatched(leftValue[i], rightValue[i]);
                    if (isNotEqual)
                        break;
                }
            return isNotEqual;
        }
        return leftValue != rightValue;
    }
    /**
     * @param {?} controlId
     * @return {?}
     */
    destroy(controlId) {
        for (var /** @type {?} */ i = 0; i < this.attributeChangeSubscriptions.length; i++) {
            if (this.attributeChangeSubscriptions[i].controlId == controlId) {
                this.attributeChangeSubscriptions.splice(i, 1);
                break;
            }
        }
    }
}
function ValueChangeNotification_tsickle_Closure_declarations() {
    /** @type {?} */
    ValueChangeNotification.prototype.attributeChangeSubscriptions;
}
//# sourceMappingURL=value-change-notification.js.map