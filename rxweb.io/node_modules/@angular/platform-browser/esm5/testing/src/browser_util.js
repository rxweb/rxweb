/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone, ɵglobal as global } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
export var browserDetection;
var BrowserDetection = /** @class */ (function () {
    function BrowserDetection(ua) {
        this._overrideUa = ua;
    }
    Object.defineProperty(BrowserDetection.prototype, "_ua", {
        get: function () {
            if (typeof this._overrideUa === 'string') {
                return this._overrideUa;
            }
            return getDOM() ? getDOM().getUserAgent() : '';
        },
        enumerable: true,
        configurable: true
    });
    BrowserDetection.setup = function () { browserDetection = new BrowserDetection(null); };
    Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
        get: function () { return this._ua.indexOf('Firefox') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
        get: function () {
            return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
                this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isEdge", {
        get: function () { return this._ua.indexOf('Edge') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIE", {
        get: function () { return this._ua.indexOf('Trident') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
        get: function () {
            return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
        get: function () {
            return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isSlow", {
        get: function () { return this.isAndroid || this.isIE || this.isIOS7; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsNativeIntlApi", {
        // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
        // This detector is needed in tests to make the difference between:
        // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
        // 2) IE9/IE10: they use the polyfill, and so no discrepancies
        get: function () {
            return !!global.Intl && global.Intl !== global.IntlPolyfill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isChromeDesktop", {
        get: function () {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
                this._ua.indexOf('Edge') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isOldChrome", {
        // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
        // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).
        get: function () {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
                this._ua.indexOf('Edge') == -1;
        },
        enumerable: true,
        configurable: true
    });
    return BrowserDetection;
}());
export { BrowserDetection };
BrowserDetection.setup();
export function dispatchEvent(element, eventType) {
    getDOM().dispatchEvent(element, getDOM().createEvent(eventType));
}
export function el(html) {
    return getDOM().firstChild(getDOM().content(getDOM().createTemplate(html)));
}
export function normalizeCSS(css) {
    return css.replace(/\s+/g, ' ')
        .replace(/:\s/g, ':')
        .replace(/'/g, '"')
        .replace(/ }/g, '}')
        .replace(/url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, function () {
        var match = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            match[_i] = arguments[_i];
        }
        return "url(\"" + match[2] + "\")";
    })
        .replace(/\[(.+)=([^"\]]+)\]/g, function () {
        var match = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            match[_i] = arguments[_i];
        }
        return "[" + match[1] + "=\"" + match[2] + "\"]";
    });
}
var _singleTagWhitelist = ['br', 'hr', 'input'];
export function stringifyElement(el /** TODO #9100 */) {
    var result = '';
    if (getDOM().isElementNode(el)) {
        var tagName = getDOM().tagName(el).toLowerCase();
        // Opening tag
        result += "<" + tagName;
        // Attributes in an ordered way
        var attributeMap = getDOM().attributeMap(el);
        var keys = Array.from(attributeMap.keys()).sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var attValue = attributeMap.get(key);
            var lowerCaseKey = key.toLowerCase();
            if (typeof attValue !== 'string') {
                result += " " + lowerCaseKey;
            }
            else {
                result += " " + lowerCaseKey + "=\"" + attValue + "\"";
            }
        }
        result += '>';
        // Children
        var childrenRoot = getDOM().templateAwareRoot(el);
        var children = childrenRoot ? getDOM().childNodes(childrenRoot) : [];
        for (var j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (_singleTagWhitelist.indexOf(tagName) == -1) {
            result += "</" + tagName + ">";
        }
    }
    else if (getDOM().isCommentNode(el)) {
        result += "<!--" + getDOM().nodeValue(el) + "-->";
    }
    else {
        result += getDOM().getText(el);
    }
    return result;
}
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQsTUFBTSxDQUFDLElBQUksZ0JBQWtDLENBQUM7QUFFOUM7SUFZRSwwQkFBWSxFQUFlO1FBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFBQyxDQUFDO0lBVnZELHNCQUFZLGlDQUFHO2FBQWY7WUFDRSxJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQ3hDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUN6QjtZQUVELE9BQU8sTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFFTSxzQkFBSyxHQUFaLGNBQWlCLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBSWpFLHNCQUFJLHVDQUFTO2FBQWIsY0FBMkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXJFLHNCQUFJLHVDQUFTO2FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUks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QUFDO1FBQ3ZFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6QztRQUVELGNBQWM7UUFDZCxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUM5QyxNQUFNLElBQUksT0FBSyxPQUFPLE1BQUcsQ0FBQztTQUMzQjtLQUNGO1NBQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDckMsTUFBTSxJQUFJLFNBQU8sTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFLLENBQUM7S0FDOUM7U0FBTTtRQUNMLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDaEM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTTtJQUNKLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Tmdab25lLCDJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5leHBvcnQgbGV0IGJyb3dzZXJEZXRlY3Rpb246IEJyb3dzZXJEZXRlY3Rpb247XG5cbmV4cG9ydCBjbGFzcyBCcm93c2VyRGV0ZWN0aW9uIHtcbiAgcHJpdmF0ZSBfb3ZlcnJpZGVVYTogc3RyaW5nfG51bGw7XG4gIHByaXZhdGUgZ2V0IF91YSgpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgdGhpcy5fb3ZlcnJpZGVVYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vdmVycmlkZVVhO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRET00oKSA/IGdldERPTSgpLmdldFVzZXJBZ2VudCgpIDogJyc7XG4gIH1cblxuICBzdGF0aWMgc2V0dXAoKSB7IGJyb3dzZXJEZXRlY3Rpb24gPSBuZXcgQnJvd3NlckRldGVjdGlvbihudWxsKTsgfVxuXG4gIGNvbnN0cnVjdG9yKHVhOiBzdHJpbmd8bnVsbCkgeyB0aGlzLl9vdmVycmlkZVVhID0gdWE7IH1cblxuICBnZXQgaXNGaXJlZm94KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignRmlyZWZveCcpID4gLTE7IH1cblxuICBnZXQgaXNBbmRyb2lkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdNb3ppbGxhLzUuMCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQW5kcm9pZCcpID4gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID09IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0lFTW9iaWxlJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNFZGdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID4gLTE7IH1cblxuICBnZXQgaXNJRSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ1RyaWRlbnQnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzV2Via2l0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0lFTW9iaWxlJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNJT1M3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5fdWEuaW5kZXhPZignaVBob25lIE9TIDcnKSA+IC0xIHx8IHRoaXMuX3VhLmluZGV4T2YoJ2lQYWQgT1MgNycpID4gLTEpICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0lFTW9iaWxlJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNTbG93KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc0FuZHJvaWQgfHwgdGhpcy5pc0lFIHx8IHRoaXMuaXNJT1M3OyB9XG5cbiAgLy8gVGhlIEludGwgQVBJIGlzIG9ubHkgbmF0aXZlbHkgc3VwcG9ydGVkIGluIENocm9tZSwgRmlyZWZveCwgSUUxMSBhbmQgRWRnZS5cbiAgLy8gVGhpcyBkZXRlY3RvciBpcyBuZWVkZWQgaW4gdGVzdHMgdG8gbWFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuOlxuICAvLyAxKSBJRTExL0VkZ2U6IHRoZXkgaGF2ZSBhIG5hdGl2ZSBJbnRsIEFQSSwgYnV0IHdpdGggc29tZSBkaXNjcmVwYW5jaWVzXG4gIC8vIDIpIElFOS9JRTEwOiB0aGV5IHVzZSB0aGUgcG9seWZpbGwsIGFuZCBzbyBubyBkaXNjcmVwYW5jaWVzXG4gIGdldCBzdXBwb3J0c05hdGl2ZUludGxBcGkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKDxhbnk+Z2xvYmFsKS5JbnRsICYmICg8YW55Pmdsb2JhbCkuSW50bCAhPT0gKDxhbnk+Z2xvYmFsKS5JbnRsUG9seWZpbGw7XG4gIH1cblxuICBnZXQgaXNDaHJvbWVEZXNrdG9wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTE7XG4gIH1cblxuICAvLyBcIk9sZCBDaHJvbWVcIiBtZWFucyBDaHJvbWUgM1gsIHdoZXJlIHRoZXJlIGFyZSBzb21lIGRpc2NyZXBhbmNpZXMgaW4gdGhlIEludGwgQVBJLlxuICAvLyBBbmRyb2lkIDQuNCBhbmQgNS5YIGhhdmUgc3VjaCBicm93c2VycyBieSBkZWZhdWx0IChyZXNwZWN0aXZlbHkgMzAgYW5kIDM5KS5cbiAgZ2V0IGlzT2xkQ2hyb21lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZS8zJykgPiAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTE7XG4gIH1cbn1cblxuQnJvd3NlckRldGVjdGlvbi5zZXR1cCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChlbGVtZW50OiBhbnksIGV2ZW50VHlwZTogYW55KTogdm9pZCB7XG4gIGdldERPTSgpLmRpc3BhdGNoRXZlbnQoZWxlbWVudCwgZ2V0RE9NKCkuY3JlYXRlRXZlbnQoZXZlbnRUeXBlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbChodG1sOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gIHJldHVybiA8SFRNTEVsZW1lbnQ+Z2V0RE9NKCkuZmlyc3RDaGlsZChnZXRET00oKS5jb250ZW50KGdldERPTSgpLmNyZWF0ZVRlbXBsYXRlKGh0bWwpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVDU1MoY3NzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY3NzLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgICAgLnJlcGxhY2UoLzpcXHMvZywgJzonKVxuICAgICAgLnJlcGxhY2UoLycvZywgJ1wiJylcbiAgICAgIC5yZXBsYWNlKC8gfS9nLCAnfScpXG4gICAgICAucmVwbGFjZSgvdXJsXFwoKFxcXCJ8XFxzKSguKykoXFxcInxcXHMpXFwpKFxccyopL2csICguLi5tYXRjaDogc3RyaW5nW10pID0+IGB1cmwoXCIke21hdGNoWzJdfVwiKWApXG4gICAgICAucmVwbGFjZSgvXFxbKC4rKT0oW15cIlxcXV0rKVxcXS9nLCAoLi4ubWF0Y2g6IHN0cmluZ1tdKSA9PiBgWyR7bWF0Y2hbMV19PVwiJHttYXRjaFsyXX1cIl1gKTtcbn1cblxuY29uc3QgX3NpbmdsZVRhZ1doaXRlbGlzdCA9IFsnYnInLCAnaHInLCAnaW5wdXQnXTtcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlFbGVtZW50KGVsOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pOiBzdHJpbmcge1xuICBsZXQgcmVzdWx0ID0gJyc7XG4gIGlmIChnZXRET00oKS5pc0VsZW1lbnROb2RlKGVsKSkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBnZXRET00oKS50YWdOYW1lKGVsKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gT3BlbmluZyB0YWdcbiAgICByZXN1bHQgKz0gYDwke3RhZ05hbWV9YDtcblxuICAgIC8vIEF0dHJpYnV0ZXMgaW4gYW4gb3JkZXJlZCB3YXlcbiAgICBjb25zdCBhdHRyaWJ1dGVNYXAgPSBnZXRET00oKS5hdHRyaWJ1dGVNYXAoZWwpO1xuICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gQXJyYXkuZnJvbShhdHRyaWJ1dGVNYXAua2V5cygpKS5zb3J0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgY29uc3QgYXR0VmFsdWUgPSBhdHRyaWJ1dGVNYXAuZ2V0KGtleSk7XG4gICAgICBjb25zdCBsb3dlckNhc2VLZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICh0eXBlb2YgYXR0VmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3VsdCArPSBgICR7bG93ZXJDYXNlS2V5fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgKz0gYCAke2xvd2VyQ2FzZUtleX09XCIke2F0dFZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICc+JztcblxuICAgIC8vIENoaWxkcmVuXG4gICAgY29uc3QgY2hpbGRyZW5Sb290ID0gZ2V0RE9NKCkudGVtcGxhdGVBd2FyZVJvb3QoZWwpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRyZW5Sb290ID8gZ2V0RE9NKCkuY2hpbGROb2RlcyhjaGlsZHJlblJvb3QpIDogW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZ2lmeUVsZW1lbnQoY2hpbGRyZW5bal0pO1xuICAgIH1cblxuICAgIC8vIENsb3NpbmcgdGFnXG4gICAgaWYgKF9zaW5nbGVUYWdXaGl0ZWxpc3QuaW5kZXhPZih0YWdOYW1lKSA9PSAtMSkge1xuICAgICAgcmVzdWx0ICs9IGA8LyR7dGFnTmFtZX0+YDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZ2V0RE9NKCkuaXNDb21tZW50Tm9kZShlbCkpIHtcbiAgICByZXN1bHQgKz0gYDwhLS0ke2dldERPTSgpLm5vZGVWYWx1ZShlbCl9LS0+YDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gZ2V0RE9NKCkuZ2V0VGV4dChlbCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogdHJ1ZX0pO1xufVxuIl19