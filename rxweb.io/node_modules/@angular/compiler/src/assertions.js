/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/assertions", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function assertArrayOfStrings(identifier, value) {
        if (value == null) {
            return;
        }
        if (!Array.isArray(value)) {
            throw new Error("Expected '" + identifier + "' to be an array of strings.");
        }
        for (var i = 0; i < value.length; i += 1) {
            if (typeof value[i] !== 'string') {
                throw new Error("Expected '" + identifier + "' to be an array of strings.");
            }
        }
    }
    exports.assertArrayOfStrings = assertArrayOfStrings;
    var INTERPOLATION_BLACKLIST_REGEXPS = [
        /^\s*$/,
        /[<>]/,
        /^[{}]$/,
        /&(#|[a-z])/i,
        /^\/\//,
    ];
    function assertInterpolationSymbols(identifier, value) {
        if (value != null && !(Array.isArray(value) && value.length == 2)) {
            throw new Error("Expected '" + identifier + "' to be an array, [start, end].");
        }
        else if (value != null) {
            var start_1 = value[0];
            var end_1 = value[1];
            // black list checking
            INTERPOLATION_BLACKLIST_REGEXPS.forEach(function (regexp) {
                if (regexp.test(start_1) || regexp.test(end_1)) {
                    throw new Error("['" + start_1 + "', '" + end_1 + "'] contains unusable interpolation symbol.");
                }
            });
        }
    }
    exports.assertInterpolationSymbols = assertInterpolationSymbols;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9hc3NlcnRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBRUgsOEJBQXFDLFVBQWtCLEVBQUUsS0FBVTtRQUNqRSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFhLFVBQVUsaUNBQThCLENBQUMsQ0FBQztTQUN4RTtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEMsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBYSxVQUFVLGlDQUE4QixDQUFDLENBQUM7YUFDeEU7U0FDRjtJQUNILENBQUM7SUFaRCxvREFZQztJQUVELElBQU0sK0JBQStCLEdBQUc7UUFDdEMsT0FBTztRQUNQLE1BQU07UUFDTixRQUFRO1FBQ1IsYUFBYTtRQUNiLE9BQU87S0FDUixDQUFDO0lBRUYsb0NBQTJDLFVBQWtCLEVBQUUsS0FBVTtRQUN2RSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNqRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWEsVUFBVSxvQ0FBaUMsQ0FBQyxDQUFDO1NBQzNFO2FBQU0sSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3hCLElBQU0sT0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQVcsQ0FBQztZQUNqQyxJQUFNLEtBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFXLENBQUM7WUFDL0Isc0JBQXNCO1lBQ3RCLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07Z0JBQzVDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUcsQ0FBQyxFQUFFO29CQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQUssT0FBSyxZQUFPLEtBQUcsK0NBQTRDLENBQUMsQ0FBQztpQkFDbkY7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQWJELGdFQWFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0QXJyYXlPZlN0cmluZ3MoaWRlbnRpZmllcjogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkICcke2lkZW50aWZpZXJ9JyB0byBiZSBhbiBhcnJheSBvZiBzdHJpbmdzLmApO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAnJHtpZGVudGlmaWVyfScgdG8gYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncy5gKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgSU5URVJQT0xBVElPTl9CTEFDS0xJU1RfUkVHRVhQUyA9IFtcbiAgL15cXHMqJC8sICAgICAgICAvLyBlbXB0eVxuICAvWzw+XS8sICAgICAgICAgLy8gaHRtbCB0YWdcbiAgL15be31dJC8sICAgICAgIC8vIGkxOG4gZXhwYW5zaW9uXG4gIC8mKCN8W2Etel0pL2ksICAvLyBjaGFyYWN0ZXIgcmVmZXJlbmNlLFxuICAvXlxcL1xcLy8sICAgICAgICAvLyBjb21tZW50XG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SW50ZXJwb2xhdGlvblN5bWJvbHMoaWRlbnRpZmllcjogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmICEoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09IDIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAnJHtpZGVudGlmaWVyfScgdG8gYmUgYW4gYXJyYXksIFtzdGFydCwgZW5kXS5gKTtcbiAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgY29uc3Qgc3RhcnQgPSB2YWx1ZVswXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgZW5kID0gdmFsdWVbMV0gYXMgc3RyaW5nO1xuICAgIC8vIGJsYWNrIGxpc3QgY2hlY2tpbmdcbiAgICBJTlRFUlBPTEFUSU9OX0JMQUNLTElTVF9SRUdFWFBTLmZvckVhY2gocmVnZXhwID0+IHtcbiAgICAgIGlmIChyZWdleHAudGVzdChzdGFydCkgfHwgcmVnZXhwLnRlc3QoZW5kKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFsnJHtzdGFydH0nLCAnJHtlbmR9J10gY29udGFpbnMgdW51c2FibGUgaW50ZXJwb2xhdGlvbiBzeW1ib2wuYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==