import { FormControl } from "../../interface/form-control"

export function updateValueAndValidity(baseUpdateValueAndValidity:Function) {
    return function (opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let _this = <FormControl>this;
        if (_this.strategy && !_this.strategy.marked)
            _this.strategy.configureNotification();
        baseUpdateValueAndValidity.call(this,opts)
    }
}