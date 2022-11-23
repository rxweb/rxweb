import { ValueChangeNotification } from './value-change-notification';
const /** @type {?} */ FILTER = "filter";
const /** @type {?} */ FUNCTION = "function";
const /** @type {?} */ ERRORS = "errors";
export class PropDescriptor extends ValueChangeNotification {
    /**
     * @return {?}
     */
    checkFilterFunction() {
        let /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), FILTER);
        this.isDefinedFilter = (descriptor && !descriptor.get && !descriptor.set && typeof this[FILTER] == FUNCTION);
    }
    /**
     * @param {?} propName
     * @return {?}
     */
    defineProp(propName) {
        let /** @type {?} */ value = this.props[propName];
        let /** @type {?} */ oldValue = null;
        Object.defineProperty(this.props, propName, {
            get: () => { return value; },
            set: (v) => {
                value = v;
                this.notifyValueChanged(`props.${propName}`, value, oldValue, true);
                oldValue = value;
            }
        });
    }
    /**
     * @return {?}
     */
    overrideProps() {
        ["disabled", "label", "placeholder", "hide", "description", "focus", "readonly", "class", "source"].forEach(t => {
            let /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), t);
            let /** @type {?} */ value = null;
            let /** @type {?} */ oldValue = null;
            Object.defineProperty(this, t, {
                get: () => { return descriptor ? descriptor.get.call(this) : value; },
                set: (v) => {
                    value = v;
                    if (descriptor && descriptor.set)
                        descriptor.set.call(this, v);
                    super.notifyValueChanged(t, value, oldValue);
                    oldValue = v;
                }
            });
        });
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    overrideErrorsProp(formControl) {
        let /** @type {?} */ value = formControl.errors;
        let /** @type {?} */ oldValue = formControl.errorMessage;
        Object.defineProperty(formControl, ERRORS, {
            get: () => { return value; },
            set: (v) => {
                value = v;
                this.notifyValueChanged(`errorMessage`, value, oldValue);
                oldValue = value;
            }
        });
    }
}
function PropDescriptor_tsickle_Closure_declarations() {
    /** @type {?} */
    PropDescriptor.prototype.isDefinedFilter;
    /** @type {?} */
    PropDescriptor.prototype.props;
}
//# sourceMappingURL=prop-descriptor.js.map