function getInstance(model: any, objectArguments: any[]) {
    ///resolution of issue https://github.com/rxweb/rxweb/issues/188
    return Reflect.construct(model, objectArguments);
}

export function getObject(model: any, objectArguments: any[], jObject: { [key: string]: any }) {
    let instance = getInstance(model, objectArguments);
    Object.keys(jObject).forEach(t => {
        instance[t] = jObject[t];
    })
    return instance;
}