import { ValueChangeNotification } from "./value-change-notification";

const FILTER: string = "filter";
const FUNCTION: string = "function";
const ERRORS: string = "errors";
export class PropDescriptor extends ValueChangeNotification{
    protected isDefinedFilter: boolean;

    props: { [key: string]: any };

    protected checkFilterFunction() {
        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), FILTER);
        this.isDefinedFilter = (descriptor && !descriptor.get && !descriptor.set && typeof this[FILTER] == FUNCTION);
    }


    defineProp(propName: string) {
        let value = this.props[propName];
        let oldValue = null;
        Object.defineProperty(this.props, propName,
            {
                get: () => { return value },
                set: (v) => {
                    value = v;
                    this.notifyValueChanged(`props.${propName}`, value, oldValue, true);
                    oldValue = value;
                }
            })
    }


    protected overrideProps() {
        ["disabled", "label", "placeholder", "hide", "description", "focus", "readonly", "class", "source"].forEach(t => {
            let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), t);
            let value = null;
            let oldValue = null;
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
        })
    }


    protected overrideErrorsProp(formControl: any) {
        let value = formControl.errors;
        let oldValue = formControl.errorMessage;
        Object.defineProperty(formControl, ERRORS,
            {
                get: () => { return value },
                set: (v) => {
                    value = v;
                    this.notifyValueChanged(`errorMessage`, value, oldValue);
                    oldValue = value;
                }
            })
    }





}