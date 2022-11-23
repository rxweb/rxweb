import 'rxjs/add/operator/distinctUntilChanged'; // fn distinctUntilChanged
var ConditionalValidator = (function () {
    function ConditionalValidator() {
    }
    /**
    *  Валидатор, который применяет валидатор при некотором заданом условии.
    * @param {ConditionalFunc} conditional Условие для применения валидатора
    * @param {ValidatorFn} validator Валидатор, который будет применен
    * @param {Boolean} trackParentOnly Подписка только на изменение значения родителя (По-умолчанию подписка на root)
    */
    ConditionalValidator.set = function (conditional, validator, trackParentOnly) {
        if (trackParentOnly === void 0) { trackParentOnly = null; }
        var revalidateSub;
        return function (control) {
            if (control && control.parent) {
                if (!revalidateSub) {
                    revalidateOnChanges(control, trackParentOnly);
                    revalidateSub = true;
                }
                if (conditional(control.root)) {
                    return validator(control);
                }
            }
            return null;
        };
    };
    /* Не реализован */
    ConditionalValidator.setAsync = function (conditional, validator) {
        throw new Error('Not implemented'); // todo: implement
    };
    ConditionalValidator.equivalent = function (controlKey, expectedValue) {
        return function (rootGroup) {
            var control = rootGroup.get(controlKey);
            if (!control)
                return expectedValue === undefined;
            return expectedValue === control.value;
        };
    };
    return ConditionalValidator;
}());
export { ConditionalValidator };
function revalidateOnChanges(control, trackParentOnly) {
    if (trackParentOnly === void 0) { trackParentOnly = null; }
    var parentControl = trackParentOnly ? control.parent : control.root;
    parentControl.valueChanges
        .distinctUntilChanged(function (a, b) {
        // These will always be plain objects coming from the form, do a simple comparison
        if (a && !b || !a && b) {
            return false;
        }
        else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        else if (a && b) {
            for (var i in a) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
        }
        return true;
    })
        .subscribe(function () {
        control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
}
//# sourceMappingURL=ConditionalValidator.js.map