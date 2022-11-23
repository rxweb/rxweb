import { FormControl } from "../../interface/form-control";

export function markAsTouched(baseMethod: Function) {
    return function (options?: {
        onlySelf?: boolean;
    }): void {
        let _this = <FormControl>this;
        let currentState = this.touched;
        baseMethod.call(this, options);
        if (currentState != this.touched)
            _this.runStrategy()
    }
}