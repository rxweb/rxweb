export function getInstance(model: any, objectArguments: any[]) {
    let classInstance = Object.create(model.prototype)
    try{
        model.apply(classInstance, objectArguments);
    }catch(ex){
        ///resolution of issue https://github.com/rxweb/rxweb/issues/188
        classInstance = Reflect.construct(model,objectArguments);
    }
    return classInstance;
}