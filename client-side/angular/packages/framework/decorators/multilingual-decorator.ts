import { baseDecoratorFunction } from "./base-decorator.function"
import { MultilingualConfig } from "../interface/config/multilingual-config";
import { frameworkContainer } from "../core/frameworkContainer";
export function multilingual(config: MultilingualConfig) {
    return function (
        target: Object
    ) {
        frameworkContainer.addDecorator(target, "multilingual",config)
    } 
}

