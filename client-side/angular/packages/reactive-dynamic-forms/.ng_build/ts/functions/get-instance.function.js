/**
 * @param {?} model
 * @param {?} objectArguments
 * @return {?}
 */
export function getInstance(model, objectArguments) {
    let /** @type {?} */ classInstance = Object.create(model.prototype);
    try {
        model.apply(classInstance, objectArguments);
    }
    catch ( /** @type {?} */ex) {
        ///resolution of issue https://github.com/rxweb/rxweb/issues/188
        classInstance = Reflect.construct(model, objectArguments);
    }
    return classInstance;
}
//# sourceMappingURL=get-instance.function.js.map