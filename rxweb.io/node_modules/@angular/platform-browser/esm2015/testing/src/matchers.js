/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵglobal as global } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
/**
 * Jasmine matchers that check Angular specific conditions.
 * @record
 * @template T
 */
export function NgMatchers() { }
/**
 * Expect the value to be a `Promise`.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toBePromise'}
 * @type {?}
 */
NgMatchers.prototype.toBePromise;
/**
 * Expect the value to be an instance of a class.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toBeAnInstanceOf'}
 * @type {?}
 */
NgMatchers.prototype.toBeAnInstanceOf;
/**
 * Expect the element to have exactly the given text.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toHaveText'}
 * @type {?}
 */
NgMatchers.prototype.toHaveText;
/**
 * Expect the element to have the given CSS class.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toHaveCssClass'}
 * @type {?}
 */
NgMatchers.prototype.toHaveCssClass;
/**
 * Expect the element to have the given CSS styles.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toHaveCssStyle'}
 * @type {?}
 */
NgMatchers.prototype.toHaveCssStyle;
/**
 * Expect a class to implement the interface of the given class.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toImplement'}
 * @type {?}
 */
NgMatchers.prototype.toImplement;
/**
 * Expect an exception to contain the given error text.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toContainError'}
 * @type {?}
 */
NgMatchers.prototype.toContainError;
/**
 * Invert the matchers.
 * @type {?}
 */
NgMatchers.prototype.not;
/** @type {?} */
const _global = /** @type {?} */ ((typeof window === 'undefined' ? global : window));
/** *
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toHaveText'}
  @type {?} */
export const expect = _global.expect;
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
(/** @type {?} */ (Map)).prototype['jasmineToString'] = function () {
    /** @type {?} */
    const m = this;
    if (!m) {
        return '' + m;
    }
    /** @type {?} */
    const res = [];
    m.forEach((v, k) => { res.push(`${String(k)}:${String(v)}`); });
    return `{ ${res.join(',')} }`;
};
_global.beforeEach(function () {
    // Custom handler for Map as we use Jasmine 2.4, and support for maps is not
    // added until Jasmine 2.6.
    jasmine.addCustomEqualityTester(function compareMap(actual, expected) {
        if (actual instanceof Map) {
            /** @type {?} */
            let pass = actual.size === expected.size;
            if (pass) {
                actual.forEach((v, k) => {
                    pass = pass && jasmine.matchersUtil.equals(v, expected.get(k));
                });
            }
            return pass;
        }
        else {
            // TODO(misko): we should change the return, but jasmine.d.ts is not null safe
            return /** @type {?} */ ((undefined));
        }
    });
    jasmine.addMatchers({
        toBePromise: function () {
            return {
                compare: function (actual) {
                    /** @type {?} */
                    const pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return { pass: pass, /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + actual + ' to be a promise'; } };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual, expectedClass) {
                    /** @type {?} */
                    const pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    /** @type {?} */
                    const actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            /**
             * @param {?} isNot
             * @return {?}
             */
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: getDOM().hasClass(actual, className) == !isNot,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        }
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual, styles) {
                    /** @type {?} */
                    let allPassed;
                    if (typeof styles === 'string') {
                        allPassed = getDOM().hasStyle(actual, styles);
                    }
                    else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach(prop => {
                            allPassed = allPassed && getDOM().hasStyle(actual, prop, styles[prop]);
                        });
                    }
                    return {
                        pass: allPassed,
                        /**
                         * @return {?}
                         */
                        get message() {
                            /** @type {?} */
                            const expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${typeof styles === 'string' ? 'property' : 'styles'} "${expectedValueStr}"`;
                        }
                    };
                }
            };
        },
        toContainError: function () {
            return {
                compare: function (actual, expectedText) {
                    /** @type {?} */
                    const errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                    };
                }
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    /** @type {?} */
                    const intProps = Object.keys(expectedInterface.prototype);
                    /** @type {?} */
                    const missedMethods = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return 'Expected ' + actualObject + ' to have the following methods: ' +
                                missedMethods.join(', ');
                        }
                    };
                }
            };
        }
    });
});
/**
 * @param {?} n
 * @return {?}
 */
function elementText(n) {
    /** @type {?} */
    const hasNodes = (n) => {
        /** @type {?} */
        const children = getDOM().childNodes(n);
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (getDOM().isCommentNode(n)) {
        return '';
    }
    if (getDOM().isElementNode(n) && getDOM().tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(getDOM().getDistributedNodes(n)));
    }
    if (getDOM().hasShadowRoot(n)) {
        return elementText(getDOM().childNodesAsList(getDOM().getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(getDOM().childNodesAsList(n));
    }
    return /** @type {?} */ ((getDOM().getText(n)));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZFNUQsTUFBTSxPQUFPLHFCQUFRLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDOzs7Ozs7OztBQVN2RSxhQUFhLE1BQU0sR0FBMEMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7Ozs7QUFPNUUsbUJBQUMsR0FBVSxFQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEdBQUc7O0lBQzFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNmLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDTixPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDZjs7SUFDRCxNQUFNLEdBQUcsR0FBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRSxPQUFPLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0NBQy9CLENB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T0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNwQztJQUVELElBQUksTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxJQUFJLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFFO1FBQ2pFLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEY7SUFFRCxJQUFJLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM3QixPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDZixPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsMEJBQU8sTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHO0NBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmltcG9ydCB7ybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuXG5cbi8qKlxuICogSmFzbWluZSBtYXRjaGVycyB0aGF0IGNoZWNrIEFuZ3VsYXIgc3BlY2lmaWMgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01hdGNoZXJzPFQgPSBhbnk+IGV4dGVuZHMgamFzbWluZS5NYXRjaGVyczxUPiB7XG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIHZhbHVlIHRvIGJlIGEgYFByb21pc2VgLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9CZVByb21pc2UnfVxuICAgKi9cbiAgdG9CZVByb21pc2UoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSB2YWx1ZSB0byBiZSBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9CZUFuSW5zdGFuY2VPZid9XG4gICAqL1xuICB0b0JlQW5JbnN0YW5jZU9mKGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSBleGFjdGx5IHRoZSBnaXZlbiB0ZXh0LlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gICAqL1xuICB0b0hhdmVUZXh0KGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIGNsYXNzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlQ3NzQ2xhc3MnfVxuICAgKi9cbiAgdG9IYXZlQ3NzQ2xhc3MoZXhwZWN0ZWQ6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1Mgc3R5bGVzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlQ3NzU3R5bGUnfVxuICAgKi9cbiAgdG9IYXZlQ3NzU3R5bGUoZXhwZWN0ZWQ6IHtbazogc3RyaW5nXTogc3RyaW5nfXxzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYSBjbGFzcyB0byBpbXBsZW1lbnQgdGhlIGludGVyZmFjZSBvZiB0aGUgZ2l2ZW4gY2xhc3MuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0ltcGxlbWVudCd9XG4gICAqL1xuICB0b0ltcGxlbWVudChleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGFuIGV4Y2VwdGlvbiB0byBjb250YWluIHRoZSBnaXZlbiBlcnJvciB0ZXh0LlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9Db250YWluRXJyb3InfVxuICAgKi9cbiAgdG9Db250YWluRXJyb3IoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEludmVydCB0aGUgbWF0Y2hlcnMuXG4gICAqL1xuICBub3Q6IE5nTWF0Y2hlcnM8VD47XG59XG5cbmNvbnN0IF9nbG9iYWwgPSA8YW55Pih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyk7XG5cbi8qKlxuICogSmFzbWluZSBtYXRjaGluZyBmdW5jdGlvbiB3aXRoIEFuZ3VsYXIgbWF0Y2hlcnMgbWl4ZWQgaW4uXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gKi9cbmV4cG9ydCBjb25zdCBleHBlY3Q6IDxUID0gYW55PihhY3R1YWw6IFQpID0+IE5nTWF0Y2hlcnM8VD4gPSBfZ2xvYmFsLmV4cGVjdDtcblxuXG4vLyBTb21lIE1hcCBwb2x5ZmlsbHMgZG9uJ3QgcG9seWZpbGwgTWFwLnRvU3RyaW5nIGNvcnJlY3RseSwgd2hpY2hcbi8vIGdpdmVzIHVzIGJhZCBlcnJvciBtZXNzYWdlcyBpbiB0ZXN0cy5cbi8vIFRoZSBvbmx5IHdheSB0byBkbyB0aGlzIGluIEphc21pbmUgaXMgdG8gbW9ua2V5IHBhdGNoIGEgbWV0aG9kXG4vLyB0byB0aGUgb2JqZWN0IDotKFxuKE1hcCBhcyBhbnkpLnByb3RvdHlwZVsnamFzbWluZVRvU3RyaW5nJ10gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgbSA9IHRoaXM7XG4gIGlmICghbSkge1xuICAgIHJldHVybiAnJyArIG07XG4gIH1cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBtLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB7IHJlcy5wdXNoKGAke1N0cmluZyhrKX06JHtTdHJpbmcodil9YCk7IH0pO1xuICByZXR1cm4gYHsgJHtyZXMuam9pbignLCcpfSB9YDtcbn07XG5cbl9nbG9iYWwuYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgLy8gQ3VzdG9tIGhhbmRsZXIgZm9yIE1hcCBhcyB3ZSB1c2UgSmFzbWluZSAyLjQsIGFuZCBzdXBwb3J0IGZvciBtYXBzIGlzIG5vdFxuICAvLyBhZGRlZCB1bnRpbCBKYXNtaW5lIDIuNi5cbiAgamFzbWluZS5hZGRDdXN0b21FcXVhbGl0eVRlc3RlcihmdW5jdGlvbiBjb21wYXJlTWFwKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgbGV0IHBhc3MgPSBhY3R1YWwuc2l6ZSA9PT0gZXhwZWN0ZWQuc2l6ZTtcbiAgICAgIGlmIChwYXNzKSB7XG4gICAgICAgIGFjdHVhbC5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4ge1xuICAgICAgICAgIHBhc3MgPSBwYXNzICYmIGphc21pbmUubWF0Y2hlcnNVdGlsLmVxdWFscyh2LCBleHBlY3RlZC5nZXQoaykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPKG1pc2tvKTogd2Ugc2hvdWxkIGNoYW5nZSB0aGUgcmV0dXJuLCBidXQgamFzbWluZS5kLnRzIGlzIG5vdCBudWxsIHNhZmVcbiAgICAgIHJldHVybiB1bmRlZmluZWQgITtcbiAgICB9XG4gIH0pO1xuICBqYXNtaW5lLmFkZE1hdGNoZXJzKHtcbiAgICB0b0JlUHJvbWlzZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSkge1xuICAgICAgICAgIGNvbnN0IHBhc3MgPSB0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYWN0dWFsLnRoZW4gPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgcmV0dXJuIHtwYXNzOiBwYXNzLCBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsICsgJyB0byBiZSBhIHByb21pc2UnOyB9fTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9CZUFuSW5zdGFuY2VPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgZXhwZWN0ZWRDbGFzczogYW55KSB7XG4gICAgICAgICAgY29uc3QgcGFzcyA9IHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3M7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IHBhc3MsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsICsgJyB0byBiZSBhbiBpbnN0YW5jZSBvZiAnICsgZXhwZWN0ZWRDbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0hhdmVUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZFRleHQ6IHN0cmluZykge1xuICAgICAgICAgIGNvbnN0IGFjdHVhbFRleHQgPSBlbGVtZW50VGV4dChhY3R1YWwpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBhY3R1YWxUZXh0ID09IGV4cGVjdGVkVGV4dCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWxUZXh0ICsgJyB0byBiZSBlcXVhbCB0byAnICsgZXhwZWN0ZWRUZXh0OyB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9IYXZlQ3NzQ2xhc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtjb21wYXJlOiBidWlsZEVycm9yKGZhbHNlKSwgbmVnYXRpdmVDb21wYXJlOiBidWlsZEVycm9yKHRydWUpfTtcblxuICAgICAgZnVuY3Rpb24gYnVpbGRFcnJvcihpc05vdDogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYWN0dWFsOiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGdldERPTSgpLmhhc0NsYXNzKGFjdHVhbCwgY2xhc3NOYW1lKSA9PSAhaXNOb3QsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGBFeHBlY3RlZCAke2FjdHVhbC5vdXRlckhUTUx9ICR7aXNOb3QgPyAnbm90ICcgOiAnJ310byBjb250YWluIHRoZSBDU1MgY2xhc3MgXCIke2NsYXNzTmFtZX1cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9IYXZlQ3NzU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIHN0eWxlczoge1trOiBzdHJpbmddOiBzdHJpbmd9fHN0cmluZykge1xuICAgICAgICAgIGxldCBhbGxQYXNzZWQ6IGJvb2xlYW47XG4gICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBhbGxQYXNzZWQgPSBnZXRET00oKS5oYXNTdHlsZShhY3R1YWwsIHN0eWxlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsbFBhc3NlZCA9IE9iamVjdC5rZXlzKHN0eWxlcykubGVuZ3RoICE9PSAwO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgICBhbGxQYXNzZWQgPSBhbGxQYXNzZWQgJiYgZ2V0RE9NKCkuaGFzU3R5bGUoYWN0dWFsLCBwcm9wLCBzdHlsZXNbcHJvcF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGFsbFBhc3NlZCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICBjb25zdCBleHBlY3RlZFZhbHVlU3RyID0gdHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycgPyBzdHlsZXMgOiBKU09OLnN0cmluZ2lmeShzdHlsZXMpO1xuICAgICAgICAgICAgICByZXR1cm4gYEV4cGVjdGVkICR7YWN0dWFsLm91dGVySFRNTH0gJHshYWxsUGFzc2VkID8gJyAnIDogJ25vdCAnfXRvIGNvbnRhaW4gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgQ1NTICR7dHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycgPyAncHJvcGVydHknIDogJ3N0eWxlcyd9IFwiJHtleHBlY3RlZFZhbHVlU3RyfVwiYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0NvbnRhaW5FcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgZXhwZWN0ZWRUZXh0OiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBhY3R1YWwudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogZXJyb3JNZXNzYWdlLmluZGV4T2YoZXhwZWN0ZWRUZXh0KSA+IC0xLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiAnRXhwZWN0ZWQgJyArIGVycm9yTWVzc2FnZSArICcgdG8gY29udGFpbiAnICsgZXhwZWN0ZWRUZXh0OyB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9JbXBsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsT2JqZWN0OiBhbnksIGV4cGVjdGVkSW50ZXJmYWNlOiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBpbnRQcm9wcyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkSW50ZXJmYWNlLnByb3RvdHlwZSk7XG5cbiAgICAgICAgICBjb25zdCBtaXNzZWRNZXRob2RzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgIGludFByb3BzLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgIGlmICghYWN0dWFsT2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZVtrXSkgbWlzc2VkTWV0aG9kcy5wdXNoKGspO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IG1pc3NlZE1ldGhvZHMubGVuZ3RoID09IDAsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsT2JqZWN0ICsgJyB0byBoYXZlIHRoZSBmb2xsb3dpbmcgbWV0aG9kczogJyArXG4gICAgICAgICAgICAgICAgICBtaXNzZWRNZXRob2RzLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGVsZW1lbnRUZXh0KG46IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGhhc05vZGVzID0gKG46IGFueSkgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZ2V0RE9NKCkuY2hpbGROb2RlcyhuKTtcbiAgICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgfTtcblxuICBpZiAobiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIG4ubWFwKGVsZW1lbnRUZXh0KS5qb2luKCcnKTtcbiAgfVxuXG4gIGlmIChnZXRET00oKS5pc0NvbW1lbnROb2RlKG4pKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKGdldERPTSgpLmlzRWxlbWVudE5vZGUobikgJiYgZ2V0RE9NKCkudGFnTmFtZShuKSA9PSAnQ09OVEVOVCcpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGdldERPTSgpLmdldERpc3RyaWJ1dGVkTm9kZXMobikpKTtcbiAgfVxuXG4gIGlmIChnZXRET00oKS5oYXNTaGFkb3dSb290KG4pKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KGdldERPTSgpLmNoaWxkTm9kZXNBc0xpc3QoZ2V0RE9NKCkuZ2V0U2hhZG93Um9vdChuKSkpO1xuICB9XG5cbiAgaWYgKGhhc05vZGVzKG4pKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KGdldERPTSgpLmNoaWxkTm9kZXNBc0xpc3QobikpO1xuICB9XG5cbiAgcmV0dXJuIGdldERPTSgpLmdldFRleHQobikgITtcbn1cbiJdfQ==