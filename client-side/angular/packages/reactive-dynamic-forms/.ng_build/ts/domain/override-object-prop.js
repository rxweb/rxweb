import { ElementPropsAccessor } from './element-props-accessor';
const /** @type {?} */ VALUE = "value";
/**
 * @abstract
 */
export class OverrideObjectProp extends ElementPropsAccessor {
    /**
     * @param {?} dynamicNodeConfig
     */
    constructor(dynamicNodeConfig) { super(dynamicNodeConfig); }
    /**
     * @return {?}
     */
    overrideValueProp() {
        let /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.controlConfig), VALUE);
        let /** @type {?} */ value = this.controlConfig.value;
        let /** @type {?} */ oldValue = null;
        Object.defineProperty(this.controlConfig, VALUE, {
            get: () => { return descriptor ? descriptor.get.call(this.controlConfig) : value; },
            set: (v) => {
                value = v;
                if (this.controlConfig.formControl.value != v) {
                    this.controlConfig.formControl.setValue(v);
                    this.resetElementValue(v);
                    this.controlConfig.value = v;
                }
                else {
                    this.controlConfig.notifyValueChanged(VALUE, v, oldValue);
                    if (descriptor)
                        descriptor.set.call(this.controlConfig, v);
                    this.controlConfig.refresh();
                }
                this.controlConfig.config.value = v;
                oldValue = v;
            }
        });
        this.overrideFormControlProp();
        if (this.controlConfig.formControl.value)
            this.resetElementValue(this.controlConfig.formControl.value);
    }
    /**
     * @return {?}
     */
    overrideFormControlProp() {
        let /** @type {?} */ value = this.controlConfig.formControl.value;
        Object.defineProperty(this.controlConfig.formControl, VALUE, {
            get: () => { return value; },
            set: (v) => {
                value = v;
                var /** @type {?} */ t = setTimeout(() => {
                    if (value != this.controlConfig.value) {
                        this.controlConfig.value = value;
                        this.resetElementValue(value);
                    }
                }, 50);
            }
        });
    }
}
//# sourceMappingURL=override-object-prop.js.map