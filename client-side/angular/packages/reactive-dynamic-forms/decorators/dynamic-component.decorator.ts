import { dynamicContainer } from '../core/dynamicContainer';

export function dynamicComponent(name:string) {
    return function (
        target: Object
    ) {
        dynamicContainer.registerComponent(name, target)
    } 
}

