import { FormControl } from "../../interface/form-control";

export function markAsUntouched(baseMethod: Function) {
    return function (options?: {
        onlySelf?: boolean;
    }): void {
        let _this = <FormControl>this;
        let currentState = this.untouched;
        baseMethod.call(this, options);
        if (currentState != this.untouched)
            _this.runStrategy()
    }
}