export function getInstance(model: any, objectArguments: any[]) {
    let classInstance = Object.create(model.prototype)
    model.apply(classInstance, objectArguments);
    return classInstance;
}