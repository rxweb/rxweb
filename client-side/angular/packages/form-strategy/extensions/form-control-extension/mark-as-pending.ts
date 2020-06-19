import { FormControl } from "../../interface/form-control";

export function markAsPending(baseMethod: Function) {
    return function (options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void  {
        let _this = <FormControl>this;
        let currentState = this.pending;
        baseMethod.call(this, options);
        if (currentState != this.pending)
            _this.runStrategy()
    }
}