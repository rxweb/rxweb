function getInstance(model: any, objectArguments: any[]) {
    let classInstance = Object.create(model.prototype)
    try{
        model.apply(classInstance, objectArguments);
    }catch(ex){
        ///resolution of issue https://github.com/rxweb/rxweb/issues/188
        classInstance = Reflect.construct(model,objectArguments);
    }
    return classInstance;
}

export function getObject(model: any, objectArguments: any[], jObject: { [key: string]: any }) {
    let instance = getInstance(model, objectArguments);
    Object.keys(jObject).forEach(t => {
        instance[t] = jObject[t];
    })
    return instance;
}