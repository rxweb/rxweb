"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const interface_1 = require("../tree/interface");
function _getTypeOfResult(value) {
    if (value === undefined) {
        return 'undefined';
    }
    else if (value === null) {
        return 'null';
    }
    else if (typeof value == 'function') {
        return `Function()`;
    }
    else if (typeof value != 'object') {
        return `${typeof value}(${JSON.stringify(value)})`;
    }
    else {
        if (Object.getPrototypeOf(value) == Object) {
            return `Object(${JSON.stringify(value)})`;
        }
        else if (value.constructor) {
            return `Instance of class ${value.constructor.name}`;
        }
        else {
            return 'Unknown Object';
        }
    }
}
/**
 * When a rule or source returns an invalid value.
 */
class InvalidRuleResultException extends core_1.BaseException {
    constructor(value) {
        super(`Invalid rule result: ${_getTypeOfResult(value)}.`);
    }
}
exports.InvalidRuleResultException = InvalidRuleResultException;
class InvalidSourceResultException extends core_1.BaseException {
    constructor(value) {
        super(`Invalid source result: ${_getTypeOfResult(value)}.`);
    }
}
exports.InvalidSourceResultException = InvalidSourceResultException;
function callSource(source, context) {
    const result = source(context);
    if (core_1.isObservable(result)) {
        // Only return the last Tree, and make sure it's a Tree.
        return result.pipe(operators_1.defaultIfEmpty(), operators_1.last(), operators_1.tap(inner => {
            if (!inner || !(interface_1.TreeSymbol in inner)) {
                throw new InvalidSourceResultException(inner);
            }
        }));
    }
    else if (result && interface_1.TreeSymbol in result) {
        return rxjs_1.of(result);
    }
    else {
        return rxjs_1.throwError(new InvalidSourceResultException(result));
    }
}
exports.callSource = callSource;
function callRule(rule, input, context) {
    return input.pipe(operators_1.mergeMap(inputTree => {
        const result = rule(inputTree, context);
        if (!result) {
            return rxjs_1.of(inputTree);
        }
        else if (typeof result == 'function') {
            // This is considered a Rule, chain the rule and return its output.
            return callRule(result, rxjs_1.of(inputTree), context);
        }
        else if (core_1.isObservable(result)) {
            // Only return the last Tree, and make sure it's a Tree.
            return result.pipe(operators_1.defaultIfEmpty(), operators_1.last(), operators_1.tap(inner => {
                if (!inner || !(interface_1.TreeSymbol in inner)) {
                    throw new InvalidRuleResultException(inner);
                }
            }));
        }
        else if (interface_1.TreeSymbol in result) {
            return rxjs_1.of(result);
        }
        else {
            return rxjs_1.throwError(new InvalidRuleResultException(result));
        }
    }));
}
exports.callRule = callRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvcnVsZXMvY2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUFtRTtBQUNuRSwrQkFBa0U7QUFDbEUsOENBQXFFO0FBRXJFLGlEQUFxRDtBQUdyRCwwQkFBMEIsS0FBVTtJQUNsQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDdkIsT0FBTyxXQUFXLENBQUM7S0FDcEI7U0FBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDekIsT0FBTyxNQUFNLENBQUM7S0FDZjtTQUFNLElBQUksT0FBTyxLQUFLLElBQUksVUFBVSxFQUFFO1FBQ3JDLE9BQU8sWUFBWSxDQUFDO0tBQ3JCO1NBQU0sSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7UUFDbkMsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sRUFBRTtZQUMxQyxPQUFPLFVBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQzVCLE9BQU8scUJBQXFCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEQ7YUFBTTtZQUNMLE9BQU8sZ0JBQWdCLENBQUM7U0FDekI7S0FDRjtBQUNILENBQUM7QUFHRDs7R0FFRztBQUNILGdDQUF3QyxTQUFRLG9CQUFhO0lBQzNELFlBQVksS0FBVTtRQUNwQixLQUFLLENBQUMsd0JBQXdCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0Y7QUFKRCxnRUFJQztBQUdELGtDQUEwQyxTQUFRLG9CQUFhO0lBQzdELFlBQVksS0FBVTtRQUNwQixLQUFLLENBQUMsMEJBQTBCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0Y7QUFKRCxvRUFJQztBQUdELG9CQUEyQixNQUFjLEVBQUUsT0FBeUI7SUFDbEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRS9CLElBQUksbUJBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN4Qix3REFBd0Q7UUFDeEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUNoQiwwQkFBYyxFQUFFLEVBQ2hCLGdCQUFJLEVBQUUsRUFDTixlQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxzQkFBVSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLElBQUksNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0M7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0tBQ0g7U0FBTSxJQUFJLE1BQU0sSUFBSSxzQkFBVSxJQUFJLE1BQU0sRUFBRTtRQUN6QyxPQUFPLFNBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM3QjtTQUFNO1FBQ0wsT0FBTyxpQkFBVSxDQUFDLElBQUksNEJBQTRCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUM3RDtBQUNILENBQUM7QUFuQkQsZ0NBbUJDO0FBR0Qsa0JBQ0UsSUFBVSxFQUNWLEtBQXVCLEVBQ3ZCLE9BQXlCO0lBRXpCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sU0FBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxPQUFPLE1BQU0sSUFBSSxVQUFVLEVBQUU7WUFDdEMsbUVBQW1FO1lBQ25FLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxTQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDM0Q7YUFBTSxJQUFJLG1CQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0Isd0RBQXdEO1lBQ3hELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FDaEIsMEJBQWMsRUFBRSxFQUNoQixnQkFBSSxFQUFFLEVBQ04sZUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNWLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLHNCQUFVLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ3BDLE1BQU0sSUFBSSwwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0M7WUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0g7YUFBTSxJQUFJLHNCQUFVLElBQUksTUFBTSxFQUFFO1lBQy9CLE9BQU8sU0FBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxPQUFPLGlCQUFVLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUM7QUE5QkQsNEJBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgaXNPYnNlcnZhYmxlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWZhdWx0SWZFbXB0eSwgbGFzdCwgbWVyZ2VNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFJ1bGUsIFNjaGVtYXRpY0NvbnRleHQsIFNvdXJjZSB9IGZyb20gJy4uL2VuZ2luZS9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVHJlZSwgVHJlZVN5bWJvbCB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcblxuXG5mdW5jdGlvbiBfZ2V0VHlwZU9mUmVzdWx0KHZhbHVlPzoge30pOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnbnVsbCc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYEZ1bmN0aW9uKClgO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBgJHt0eXBlb2YgdmFsdWV9KCR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfSlgO1xuICB9IGVsc2Uge1xuICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpID09IE9iamVjdCkge1xuICAgICAgcmV0dXJuIGBPYmplY3QoJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9KWA7XG4gICAgfSBlbHNlIGlmICh2YWx1ZS5jb25zdHJ1Y3Rvcikge1xuICAgICAgcmV0dXJuIGBJbnN0YW5jZSBvZiBjbGFzcyAke3ZhbHVlLmNvbnN0cnVjdG9yLm5hbWV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdVbmtub3duIE9iamVjdCc7XG4gICAgfVxuICB9XG59XG5cblxuLyoqXG4gKiBXaGVuIGEgcnVsZSBvciBzb3VyY2UgcmV0dXJucyBhbiBpbnZhbGlkIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgSW52YWxpZFJ1bGVSZXN1bHRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodmFsdWU/OiB7fSkge1xuICAgIHN1cGVyKGBJbnZhbGlkIHJ1bGUgcmVzdWx0OiAke19nZXRUeXBlT2ZSZXN1bHQodmFsdWUpfS5gKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkU291cmNlUmVzdWx0RXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHZhbHVlPzoge30pIHtcbiAgICBzdXBlcihgSW52YWxpZCBzb3VyY2UgcmVzdWx0OiAke19nZXRUeXBlT2ZSZXN1bHQodmFsdWUpfS5gKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxsU291cmNlKHNvdXJjZTogU291cmNlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KTogT2JzZXJ2YWJsZTxUcmVlPiB7XG4gIGNvbnN0IHJlc3VsdCA9IHNvdXJjZShjb250ZXh0KTtcblxuICBpZiAoaXNPYnNlcnZhYmxlKHJlc3VsdCkpIHtcbiAgICAvLyBPbmx5IHJldHVybiB0aGUgbGFzdCBUcmVlLCBhbmQgbWFrZSBzdXJlIGl0J3MgYSBUcmVlLlxuICAgIHJldHVybiByZXN1bHQucGlwZShcbiAgICAgIGRlZmF1bHRJZkVtcHR5KCksXG4gICAgICBsYXN0KCksXG4gICAgICB0YXAoaW5uZXIgPT4ge1xuICAgICAgICBpZiAoIWlubmVyIHx8ICEoVHJlZVN5bWJvbCBpbiBpbm5lcikpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNvdXJjZVJlc3VsdEV4Y2VwdGlvbihpbm5lcik7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gIH0gZWxzZSBpZiAocmVzdWx0ICYmIFRyZWVTeW1ib2wgaW4gcmVzdWx0KSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGVPZihyZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBJbnZhbGlkU291cmNlUmVzdWx0RXhjZXB0aW9uKHJlc3VsdCkpO1xuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxSdWxlKFxuICBydWxlOiBSdWxlLFxuICBpbnB1dDogT2JzZXJ2YWJsZTxUcmVlPixcbiAgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCxcbik6IE9ic2VydmFibGU8VHJlZT4ge1xuICByZXR1cm4gaW5wdXQucGlwZShtZXJnZU1hcChpbnB1dFRyZWUgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJ1bGUoaW5wdXRUcmVlLCBjb250ZXh0KTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKGlucHV0VHJlZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzdWx0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFRoaXMgaXMgY29uc2lkZXJlZCBhIFJ1bGUsIGNoYWluIHRoZSBydWxlIGFuZCByZXR1cm4gaXRzIG91dHB1dC5cbiAgICAgIHJldHVybiBjYWxsUnVsZShyZXN1bHQsIG9ic2VydmFibGVPZihpbnB1dFRyZWUpLCBjb250ZXh0KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZShyZXN1bHQpKSB7XG4gICAgICAvLyBPbmx5IHJldHVybiB0aGUgbGFzdCBUcmVlLCBhbmQgbWFrZSBzdXJlIGl0J3MgYSBUcmVlLlxuICAgICAgcmV0dXJuIHJlc3VsdC5waXBlKFxuICAgICAgICBkZWZhdWx0SWZFbXB0eSgpLFxuICAgICAgICBsYXN0KCksXG4gICAgICAgIHRhcChpbm5lciA9PiB7XG4gICAgICAgICAgaWYgKCFpbm5lciB8fCAhKFRyZWVTeW1ib2wgaW4gaW5uZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFJ1bGVSZXN1bHRFeGNlcHRpb24oaW5uZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoVHJlZVN5bWJvbCBpbiByZXN1bHQpIHtcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YocmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEludmFsaWRSdWxlUmVzdWx0RXhjZXB0aW9uKHJlc3VsdCkpO1xuICAgIH1cbiAgfSkpO1xufVxuIl19