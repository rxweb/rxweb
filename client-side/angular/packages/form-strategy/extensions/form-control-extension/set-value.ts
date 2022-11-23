import { FormControl } from "../../interface/form-control";

export function setValue(baseSetValue: Function) {
    return function (value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void {
        let _this = <FormControl>this;
        baseSetValue.call(this,value,options);
        _this.runStrategy()
    }
}