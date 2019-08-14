import { ElementPropsAccessor } from './element-props-accessor';
import { DynamicNodeConfig } from "../../models/interface/dynamic-node-config";

const VALUE: string = "value";
export abstract class OverrideObjectProp extends ElementPropsAccessor {

    

    constructor(dynamicNodeConfig: DynamicNodeConfig) { super(dynamicNodeConfig); }

    overrideValueProp() {
        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.controlConfig), VALUE);
        let value = this.controlConfig.value;
        let oldValue = null;
        Object.defineProperty(this.controlConfig, VALUE, {
            get: () => { return descriptor ? descriptor.get.call(this.controlConfig) : value },
            set: (v) => {
                value = v;
                if (this.controlConfig.formControl.value != v) {
                    this.controlConfig.formControl.setValue(v);
                    this.resetElementValue(v)
                    this.controlConfig.value = v
                } else {
                    this.controlConfig.notifyValueChanged(VALUE, v, oldValue);
                    if (descriptor)
                        descriptor.set.call(this.controlConfig, v);
                    this.controlConfig.refresh();
                }
                this.controlConfig.config.value = v;
                oldValue = v;
            }
        })
        this.overrideFormControlProp();
        if (this.controlConfig.formControl.value)
            this.resetElementValue(this.controlConfig.formControl.value);
    }

    private overrideFormControlProp() {
        let value = this.controlConfig.formControl.value;
        Object.defineProperty(this.controlConfig.formControl, VALUE, {
            get: () => { return value },
            set: (v) => {
                value = v;
                var t = setTimeout(() => {
                    if (value != this.controlConfig.value) {
                        this.controlConfig.value = value;
                        this.resetElementValue(value);
                    }
                }, 50)
            }
        })
    }
}