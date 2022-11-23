import { FormControl } from "../../interface/form-control";

export function markAsPristine(baseMethod: Function) {
    return function (options?: {
        onlySelf?: boolean;
    }): void {
        let _this = <FormControl>this;
        let currentState = this.pristine;
        baseMethod.call(this, options);
        if (currentState != this.pristine)
            _this.runStrategy()
    }
}