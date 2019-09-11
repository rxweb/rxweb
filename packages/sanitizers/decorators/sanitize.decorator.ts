import { sanitizerContainer } from '../core/sanitizerContainer';
import { constructModel } from '../functions/construct-model.function'
export function sanitize(target: any) {
    let active = sanitizerContainer.getActive();
    sanitizerContainer.clear();
    if (active.target.constructor == target) {
        var original = target;
        var constructor: any = function (...args) {
            return constructModel(original, args,active);
        }
        constructor.prototype = original.prototype;
        return constructor;
    }
    return target;
}