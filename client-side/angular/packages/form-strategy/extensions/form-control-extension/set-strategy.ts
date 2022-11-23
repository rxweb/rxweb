import { FormControlStrategy } from "../../model/form-control-strategy";

export function setStrategy(name:string,strategy: FormControlStrategy) {
    strategy.formControl = this;
    strategy.name = name;
    this._strategy = strategy;
}