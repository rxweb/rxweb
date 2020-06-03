import { ValueChangeNotification } from "./value-change-notification";
import { OverrideConfigProp } from "../models/interface/override-config-prop";

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

   
    overrideProp(props:OverrideConfigProp){
        Object.keys(props).forEach(t=>{
            Object.defineProperty(this,t,props[t]);    
        })

    }

    defineProp(propName: string) {
        let value = this.props[propName];
        let oldValue = null;
        Object.defineProperty(this.props, propName,
            {
                get: () => { return value },
                set: (v) => {
                    value = v;
                    this.notifyValueChanged(`props.${propName}`, value, oldValue, false);
                    oldValue = value;
                }
            })
    }


    protected overrideProps() {
        ["disabled", "label", "placeholder", "hide", "description", "focus", "readonly", "class", "source"].forEach(t => {
           let descriptor = this.getDescriptor(t);
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
        let errorMessage = '';
        let oldValue = formControl.errorMessage;
        Object.defineProperty(formControl, ERRORS,
            {
                get: () => { return value },
                set: (v) => {
                    value = v;
                    errorMessage = formControl.errorMessage;
                    this.notifyValueChanged(`errorMessage`, errorMessage || "", oldValue);
                    oldValue = formControl.errorMessage;
                }
            })
        formControl[ERRORS] = formControl[ERRORS];
    }

    protected getDescriptor(propName:string){

        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), propName);
        if(!descriptor)
            descriptor = Object.getOwnPropertyDescriptor(this, propName);
            return descriptor;
    }



}