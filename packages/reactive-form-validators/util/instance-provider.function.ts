import { InstanceContainer } from '../core/validator.interface';
import { defaultContainer } from '../core/defaultContainer';
import { clone, merge } from '../services/entity.service';

export function instanceProvider(instanceFunc: any, entityObject?: any): InstanceContainer {
    let instance: any = defaultContainer.get(instanceFunc);
    let prototype: any = entityObject ? entityObject.__proto__ : getInstance(instanceFunc, []).__proto__;
    if (prototype.__proto__) {
        let isLoop = false;
        do {
            isLoop = prototype.__proto__.constructor != Object;
            if (isLoop) {
                let extendClassInstance: any = defaultContainer.get(prototype.__proto__.constructor);
                instance = merge(clone(instance), clone(extendClassInstance))
                prototype = prototype.__proto__;
            }
        } while (isLoop)

    }
    return instance;
}


export function getInstance(model: any, objectArguments: any[]) {
    let classInstance = Object.create(model.prototype)
    model.apply(classInstance, objectArguments);
    return classInstance;
}