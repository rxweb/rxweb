var ArrayValidators = (function () {
    function ArrayValidators() {
    }
    ArrayValidators.minLength = function (minLength, ignoreNullAndUndefined) {
        if (ignoreNullAndUndefined === void 0) { ignoreNullAndUndefined = false; }
        return function (control) {
            if (control) {
                var isArray = control.value instanceof Array;
                if (!isArray)
                    throw new Error('Control value must be array!');
                var val = control.value;
                var isValid = false;
                if (!ignoreNullAndUndefined)
                    isValid = val.length >= minLength;
                else
                    isValid = val.filter(function (v) { return v != null; }).length >= minLength;
                if (isValid)
                    return null;
                return { 'arrayMinLength': minLength };
            }
        };
    };
    ArrayValidators.maxLength = function (maxLength, ignoreNullAndUndefined) {
        if (ignoreNullAndUndefined === void 0) { ignoreNullAndUndefined = false; }
        return function (control) {
            if (control) {
                var isArray = control.value instanceof Array;
                if (!isArray)
                    throw new Error('Control value must be array!');
                var val = control.value;
                var isValid = false;
                if (!ignoreNullAndUndefined)
                    isValid = val.length <= maxLength;
                else
                    isValid = val.filter(function (v) { return v != null; }).length <= maxLength;
                if (isValid)
                    return null;
                return { 'arrayMaxLength': maxLength };
            }
        };
    };
    ArrayValidators.eqLength = function (length, ignoreNullAndUndefined) {
        if (ignoreNullAndUndefined === void 0) { ignoreNullAndUndefined = false; }
        return function (control) {
            if (control) {
                var isArray = control.value instanceof Array;
                if (!isArray)
                    throw new Error('Control value must be array!');
                var val = control.value;
                var isValid = false;
                if (!ignoreNullAndUndefined)
                    isValid = val.length === length;
                else
                    isValid = val.filter(function (v) { return v != null; }).length === length;
                if (isValid)
                    return null;
                return { 'arrayMaxLength': length };
            }
        };
    };
    return ArrayValidators;
}());
export { ArrayValidators };
//# sourceMappingURL=ArrayValidators.js.map