import { sanitize } from './sanitize.function'

export function defineProp(target: any, propName: string, sanitizers: any,changeDetection:string[]) {
    let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), propName);
    let value: any = target[propName];
    let oldValue = null;
    Object.defineProperty(target, propName, {
        get: () => { return descriptor ? descriptor.get() : value },
        set: (v) => {
                value = sanitize(sanitizers, v, target);
                if (descriptor)
                    descriptor.set(value);
                if (changeDetection)
                    changeDetection.forEach(prop => {
                        if (target[prop] !== undefined)
                            target[prop] = target[prop];
                    })
        },
        enumerable: true,
        configurable: true
    })

    if (value)
        target[propName] = value;
}