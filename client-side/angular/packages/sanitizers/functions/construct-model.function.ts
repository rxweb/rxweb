import { defineProp } from '../functions/define-prop.function'

export function constructModel(constructor, args, active) {
    var modelInstance: any = function () {
        ///resolution of issue https://github.com/rxweb/rxweb/issues/462
        return Reflect.construct(constructor, args);
    }
    modelInstance.prototype = constructor.prototype;
    let instance = new modelInstance();
    Object.keys(active.activeModel).forEach(t => {
        defineProp(instance, t, active.activeModel[t],active.columns[t]);
    })
    return instance;
}