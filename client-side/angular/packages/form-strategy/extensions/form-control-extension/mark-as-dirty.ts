import { FormControl } from "../../interface/form-control";

export function markAsDirty(baseMethod: Function) {
    return function (options?: {
        onlySelf?: boolean;
    }): void {
        let _this = <FormControl>this;
        let currentState = this.dirty;
        baseMethod.call(this, options);
        if (currentState != this.dirty)
            _this.runStrategy()
    }
}