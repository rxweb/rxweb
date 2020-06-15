import { FormControl } from "../../interface/form-control";

export function runStrategy(isSelf: boolean = true) {
    let _this = <FormControl>this;
    if (_this.parent && _this.strategy) {
        _this.strategy.notify()
    }
}

