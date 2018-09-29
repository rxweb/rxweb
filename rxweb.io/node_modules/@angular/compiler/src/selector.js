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
        define("@angular/compiler/src/selector", ["require", "exports", "@angular/compiler/src/ml_parser/html_tags"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var html_tags_1 = require("@angular/compiler/src/ml_parser/html_tags");
    var _SELECTOR_REGEXP = new RegExp('(\\:not\\()|' + //":not("
        '([-\\w]+)|' + // "tag"
        '(?:\\.([-\\w]+))|' + // ".class"
        // "-" should appear first in the regexp below as FF31 parses "[.-\w]" as a range
        '(?:\\[([-.\\w*]+)(?:=([\"\']?)([^\\]\"\']*)\\5)?\\])|' + // "[name]", "[name=value]",
        // "[name="value"]",
        // "[name='value']"
        '(\\))|' + // ")"
        '(\\s*,\\s*)', // ","
    'g');
    /**
     * A css selector contains an element name,
     * css classes and attribute/value pairs with the purpose
     * of selecting subsets out of them.
     */
    var CssSelector = /** @class */ (function () {
        function CssSelector() {
            this.element = null;
            this.classNames = [];
            /**
             * The selectors are encoded in pairs where:
             * - even locations are attribute names
             * - odd locations are attribute values.
             *
             * Example:
             * Selector: `[key1=value1][key2]` would parse to:
             * ```
             * ['key1', 'value1', 'key2', '']
             * ```
             */
            this.attrs = [];
            this.notSelectors = [];
        }
        CssSelector.parse = function (selector) {
            var results = [];
            var _addResult = function (res, cssSel) {
                if (cssSel.notSelectors.length > 0 && !cssSel.element && cssSel.classNames.length == 0 &&
                    cssSel.attrs.length == 0) {
                    cssSel.element = '*';
                }
                res.push(cssSel);
            };
            var cssSelector = new CssSelector();
            var match;
            var current = cssSelector;
            var inNot = false;
            _SELECTOR_REGEXP.lastIndex = 0;
            while (match = _SELECTOR_REGEXP.exec(selector)) {
                if (match[1]) {
                    if (inNot) {
                        throw new Error('Nesting :not is not allowed in a selector');
                    }
                    inNot = true;
                    current = new CssSelector();
                    cssSelector.notSelectors.push(current);
                }
                if (match[2]) {
                    current.setElement(match[2]);
                }
                if (match[3]) {
                    current.addClassName(match[3]);
                }
                if (match[4]) {
                    current.addAttribute(match[4], match[6]);
                }
                if (match[7]) {
                    inNot = false;
                    current = cssSelector;
                }
                if (match[8]) {
                    if (inNot) {
                        throw new Error('Multiple selectors in :not are not supported');
                    }
                    _addResult(results, cssSelector);
                    cssSelector = current = new CssSelector();
                }
            }
            _addResult(results, cssSelector);
            return results;
        };
        CssSelector.prototype.isElementSelector = function () {
            return this.hasElementSelector() && this.classNames.length == 0 && this.attrs.length == 0 &&
                this.notSelectors.length === 0;
        };
        CssSelector.prototype.hasElementSelector = function () { return !!this.element; };
        CssSelector.prototype.setElement = function (element) {
            if (element === void 0) { element = null; }
            this.element = element;
        };
        /** Gets a template string for an element that matches the selector. */
        CssSelector.prototype.getMatchingElementTemplate = function () {
            var tagName = this.element || 'div';
            var classAttr = this.classNames.length > 0 ? " class=\"" + this.classNames.join(' ') + "\"" : '';
            var attrs = '';
            for (var i = 0; i < this.attrs.length; i += 2) {
                var attrName = this.attrs[i];
                var attrValue = this.attrs[i + 1] !== '' ? "=\"" + this.attrs[i + 1] + "\"" : '';
                attrs += " " + attrName + attrValue;
            }
            return html_tags_1.getHtmlTagDefinition(tagName).isVoid ? "<" + tagName + classAttr + attrs + "/>" :
                "<" + tagName + classAttr + attrs + "></" + tagName + ">";
        };
        CssSelector.prototype.getAttrs = function () {
            var result = [];
            if (this.classNames.length > 0) {
                result.push('class', this.classNames.join(' '));
            }
            return result.concat(this.attrs);
        };
        CssSelector.prototype.addAttribute = function (name, value) {
            if (value === void 0) { value = ''; }
            this.attrs.push(name, value && value.toLowerCase() || '');
        };
        CssSelector.prototype.addClassName = function (name) { this.classNames.push(name.toLowerCase()); };
        CssSelector.prototype.toString = function () {
            var res = this.element || '';
            if (this.classNames) {
                this.classNames.forEach(function (klass) { return res += "." + klass; });
            }
            if (this.attrs) {
                for (var i = 0; i < this.attrs.length; i += 2) {
                    var name_1 = this.attrs[i];
                    var value = this.attrs[i + 1];
                    res += "[" + name_1 + (value ? '=' + value : '') + "]";
                }
            }
            this.notSelectors.forEach(function (notSelector) { return res += ":not(" + notSelector + ")"; });
            return res;
        };
        return CssSelector;
    }());
    exports.CssSelector = CssSelector;
    /**
     * Reads a list of CssSelectors and allows to calculate which ones
     * are contained in a given CssSelector.
     */
    var SelectorMatcher = /** @class */ (function () {
        function SelectorMatcher() {
            this._elementMap = new Map();
            this._elementPartialMap = new Map();
            this._classMap = new Map();
            this._classPartialMap = new Map();
            this._attrValueMap = new Map();
            this._attrValuePartialMap = new Map();
            this._listContexts = [];
        }
        SelectorMatcher.createNotMatcher = function (notSelectors) {
            var notMatcher = new SelectorMatcher();
            notMatcher.addSelectables(notSelectors, null);
            return notMatcher;
        };
        SelectorMatcher.prototype.addSelectables = function (cssSelectors, callbackCtxt) {
            var listContext = null;
            if (cssSelectors.length > 1) {
                listContext = new SelectorListContext(cssSelectors);
                this._listContexts.push(listContext);
            }
            for (var i = 0; i < cssSelectors.length; i++) {
                this._addSelectable(cssSelectors[i], callbackCtxt, listContext);
            }
        };
        /**
         * Add an object that can be found later on by calling `match`.
         * @param cssSelector A css selector
         * @param callbackCtxt An opaque object that will be given to the callback of the `match` function
         */
        SelectorMatcher.prototype._addSelectable = function (cssSelector, callbackCtxt, listContext) {
            var matcher = this;
            var element = cssSelector.element;
            var classNames = cssSelector.classNames;
            var attrs = cssSelector.attrs;
            var selectable = new SelectorContext(cssSelector, callbackCtxt, listContext);
            if (element) {
                var isTerminal = attrs.length === 0 && classNames.length === 0;
                if (isTerminal) {
                    this._addTerminal(matcher._elementMap, element, selectable);
                }
                else {
                    matcher = this._addPartial(matcher._elementPartialMap, element);
                }
            }
            if (classNames) {
                for (var i = 0; i < classNames.length; i++) {
                    var isTerminal = attrs.length === 0 && i === classNames.length - 1;
                    var className = classNames[i];
                    if (isTerminal) {
                        this._addTerminal(matcher._classMap, className, selectable);
                    }
                    else {
                        matcher = this._addPartial(matcher._classPartialMap, className);
                    }
                }
            }
            if (attrs) {
                for (var i = 0; i < attrs.length; i += 2) {
                    var isTerminal = i === attrs.length - 2;
                    var name_2 = attrs[i];
                    var value = attrs[i + 1];
                    if (isTerminal) {
                        var terminalMap = matcher._attrValueMap;
                        var terminalValuesMap = terminalMap.get(name_2);
                        if (!terminalValuesMap) {
                            terminalValuesMap = new Map();
                            terminalMap.set(name_2, terminalValuesMap);
                        }
                        this._addTerminal(terminalValuesMap, value, selectable);
                    }
                    else {
                        var partialMap = matcher._attrValuePartialMap;
                        var partialValuesMap = partialMap.get(name_2);
                        if (!partialValuesMap) {
                            partialValuesMap = new Map();
                            partialMap.set(name_2, partialValuesMap);
                        }
                        matcher = this._addPartial(partialValuesMap, value);
                    }
                }
            }
        };
        SelectorMatcher.prototype._addTerminal = function (map, name, selectable) {
            var terminalList = map.get(name);
            if (!terminalList) {
                terminalList = [];
                map.set(name, terminalList);
            }
            terminalList.push(selectable);
        };
        SelectorMatcher.prototype._addPartial = function (map, name) {
            var matcher = map.get(name);
            if (!matcher) {
                matcher = new SelectorMatcher();
                map.set(name, matcher);
            }
            return matcher;
        };
        /**
         * Find the objects that have been added via `addSelectable`
         * whose css selector is contained in the given css selector.
         * @param cssSelector A css selector
         * @param matchedCallback This callback will be called with the object handed into `addSelectable`
         * @return boolean true if a match was found
        */
        SelectorMatcher.prototype.match = function (cssSelector, matchedCallback) {
            var result = false;
            var element = cssSelector.element;
            var classNames = cssSelector.classNames;
            var attrs = cssSelector.attrs;
            for (var i = 0; i < this._listContexts.length; i++) {
                this._listContexts[i].alreadyMatched = false;
            }
            result = this._matchTerminal(this._elementMap, element, cssSelector, matchedCallback) || result;
            result = this._matchPartial(this._elementPartialMap, element, cssSelector, matchedCallback) ||
                result;
            if (classNames) {
                for (var i = 0; i < classNames.length; i++) {
                    var className = classNames[i];
                    result =
                        this._matchTerminal(this._classMap, className, cssSelector, matchedCallback) || result;
                    result =
                        this._matchPartial(this._classPartialMap, className, cssSelector, matchedCallback) ||
                            result;
                }
            }
            if (attrs) {
                for (var i = 0; i < attrs.length; i += 2) {
                    var name_3 = attrs[i];
                    var value = attrs[i + 1];
                    var terminalValuesMap = this._attrValueMap.get(name_3);
                    if (value) {
                        result =
                            this._matchTerminal(terminalValuesMap, '', cssSelector, matchedCallback) || result;
                    }
                    result =
                        this._matchTerminal(terminalValuesMap, value, cssSelector, matchedCallback) || result;
                    var partialValuesMap = this._attrValuePartialMap.get(name_3);
                    if (value) {
                        result = this._matchPartial(partialValuesMap, '', cssSelector, matchedCallback) || result;
                    }
                    result =
                        this._matchPartial(partialValuesMap, value, cssSelector, matchedCallback) || result;
                }
            }
            return result;
        };
        /** @internal */
        SelectorMatcher.prototype._matchTerminal = function (map, name, cssSelector, matchedCallback) {
            if (!map || typeof name !== 'string') {
                return false;
            }
            var selectables = map.get(name) || [];
            var starSelectables = map.get('*');
            if (starSelectables) {
                selectables = selectables.concat(starSelectables);
            }
            if (selectables.length === 0) {
                return false;
            }
            var selectable;
            var result = false;
            for (var i = 0; i < selectables.length; i++) {
                selectable = selectables[i];
                result = selectable.finalize(cssSelector, matchedCallback) || result;
            }
            return result;
        };
        /** @internal */
        SelectorMatcher.prototype._matchPartial = function (map, name, cssSelector, matchedCallback) {
            if (!map || typeof name !== 'string') {
                return false;
            }
            var nestedSelector = map.get(name);
            if (!nestedSelector) {
                return false;
            }
            // TODO(perf): get rid of recursion and measure again
            // TODO(perf): don't pass the whole selector into the recursion,
            // but only the not processed parts
            return nestedSelector.match(cssSelector, matchedCallback);
        };
        return SelectorMatcher;
    }());
    exports.SelectorMatcher = SelectorMatcher;
    var SelectorListContext = /** @class */ (function () {
        function SelectorListContext(selectors) {
            this.selectors = selectors;
            this.alreadyMatched = false;
        }
        return SelectorListContext;
    }());
    exports.SelectorListContext = SelectorListContext;
    // Store context to pass back selector and context when a selector is matched
    var SelectorContext = /** @class */ (function () {
        function SelectorContext(selector, cbContext, listContext) {
            this.selector = selector;
            this.cbContext = cbContext;
            this.listContext = listContext;
            this.notSelectors = selector.notSelectors;
        }
        SelectorContext.prototype.finalize = function (cssSelector, callback) {
            var result = true;
            if (this.notSelectors.length > 0 && (!this.listContext || !this.listContext.alreadyMatched)) {
                var notMatcher = SelectorMatcher.createNotMatcher(this.notSelectors);
                result = !notMatcher.match(cssSelector, null);
            }
            if (result && callback && (!this.listContext || !this.listContext.alreadyMatched)) {
                if (this.listContext) {
                    this.listContext.alreadyMatched = true;
                }
                callback(this.selector, this.cbContext);
            }
            return result;
        };
        return SelectorContext;
    }());
    exports.SelectorContext = SelectorContext;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvc2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCx1RUFBMkQ7SUFFM0QsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FDL0IsY0FBYyxHQUFhLFNBQVM7UUFDaEMsWUFBWSxHQUFXLFFBQVE7UUFDL0IsbUJBQW1CLEdBQUksV0FBVztRQUNsQyxpRkFBaUY7UUFDakYsdURBQXVELEdBQUksNEJBQTRCO1FBQzVCLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDOUUsUUFBUSxHQUFtRCxNQUFNO1FBQ2pFLGFBQWEsRUFBOEMsTUFBTTtJQUNyRSxHQUFHLENBQUMsQ0FBQztJQUVUOzs7O09BSUc7SUFDSDtRQUFBO1lBQ0UsWUFBTyxHQUFnQixJQUFJLENBQUM7WUFDNUIsZUFBVSxHQUFhLEVBQUUsQ0FBQztZQUMxQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBSyxHQUFhLEVBQUUsQ0FBQztZQUNyQixpQkFBWSxHQUFrQixFQUFFLENBQUM7UUF3R25DLENBQUM7UUF0R1EsaUJBQUssR0FBWixVQUFhLFFBQWdCO1lBQzNCLElBQU0sT0FBTyxHQUFrQixFQUFFLENBQUM7WUFDbEMsSUFBTSxVQUFVLEdBQUcsVUFBQyxHQUFrQixFQUFFLE1BQW1CO2dCQUN6RCxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDbEYsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUM1QixNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztpQkFDdEI7Z0JBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFN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Yy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Z2V0SHRtbFRhZ0RlZmluaXRpb259IGZyb20gJy4vbWxfcGFyc2VyL2h0bWxfdGFncyc7XG5cbmNvbnN0IF9TRUxFQ1RPUl9SRUdFWFAgPSBuZXcgUmVnRXhwKFxuICAgICcoXFxcXDpub3RcXFxcKCl8JyArICAgICAgICAgICAvL1wiOm5vdChcIlxuICAgICAgICAnKFstXFxcXHddKyl8JyArICAgICAgICAgLy8gXCJ0YWdcIlxuICAgICAgICAnKD86XFxcXC4oWy1cXFxcd10rKSl8JyArICAvLyBcIi5jbGFzc1wiXG4gICAgICAgIC8vIFwiLVwiIHNob3VsZCBhcHBlYXIgZmlyc3QgaW4gdGhlIHJlZ2V4cCBiZWxvdyBhcyBGRjMxIHBhcnNlcyBcIlsuLVxcd11cIiBhcyBhIHJhbmdlXG4gICAgICAgICcoPzpcXFxcWyhbLS5cXFxcdypdKykoPzo9KFtcXFwiXFwnXT8pKFteXFxcXF1cXFwiXFwnXSopXFxcXDUpP1xcXFxdKXwnICsgIC8vIFwiW25hbWVdXCIsIFwiW25hbWU9dmFsdWVdXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJbbmFtZT1cInZhbHVlXCJdXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJbbmFtZT0ndmFsdWUnXVwiXG4gICAgICAgICcoXFxcXCkpfCcgKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcIilcIlxuICAgICAgICAnKFxcXFxzKixcXFxccyopJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcIixcIlxuICAgICdnJyk7XG5cbi8qKlxuICogQSBjc3Mgc2VsZWN0b3IgY29udGFpbnMgYW4gZWxlbWVudCBuYW1lLFxuICogY3NzIGNsYXNzZXMgYW5kIGF0dHJpYnV0ZS92YWx1ZSBwYWlycyB3aXRoIHRoZSBwdXJwb3NlXG4gKiBvZiBzZWxlY3Rpbmcgc3Vic2V0cyBvdXQgb2YgdGhlbS5cbiAqL1xuZXhwb3J0IGNsYXNzIENzc1NlbGVjdG9yIHtcbiAgZWxlbWVudDogc3RyaW5nfG51bGwgPSBudWxsO1xuICBjbGFzc05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAvKipcbiAgICogVGhlIHNlbGVjdG9ycyBhcmUgZW5jb2RlZCBpbiBwYWlycyB3aGVyZTpcbiAgICogLSBldmVuIGxvY2F0aW9ucyBhcmUgYXR0cmlidXRlIG5hbWVzXG4gICAqIC0gb2RkIGxvY2F0aW9ucyBhcmUgYXR0cmlidXRlIHZhbHVlcy5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogU2VsZWN0b3I6IGBba2V5MT12YWx1ZTFdW2tleTJdYCB3b3VsZCBwYXJzZSB0bzpcbiAgICogYGBgXG4gICAqIFsna2V5MScsICd2YWx1ZTEnLCAna2V5MicsICcnXVxuICAgKiBgYGBcbiAgICovXG4gIGF0dHJzOiBzdHJpbmdbXSA9IFtdO1xuICBub3RTZWxlY3RvcnM6IENzc1NlbGVjdG9yW10gPSBbXTtcblxuICBzdGF0aWMgcGFyc2Uoc2VsZWN0b3I6IHN0cmluZyk6IENzc1NlbGVjdG9yW10ge1xuICAgIGNvbnN0IHJlc3VsdHM6IENzc1NlbGVjdG9yW10gPSBbXTtcbiAgICBjb25zdCBfYWRkUmVzdWx0ID0gKHJlczogQ3NzU2VsZWN0b3JbXSwgY3NzU2VsOiBDc3NTZWxlY3RvcikgPT4ge1xuICAgICAgaWYgKGNzc1NlbC5ub3RTZWxlY3RvcnMubGVuZ3RoID4gMCAmJiAhY3NzU2VsLmVsZW1lbnQgJiYgY3NzU2VsLmNsYXNzTmFtZXMubGVuZ3RoID09IDAgJiZcbiAgICAgICAgICBjc3NTZWwuYXR0cnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgY3NzU2VsLmVsZW1lbnQgPSAnKic7XG4gICAgICB9XG4gICAgICByZXMucHVzaChjc3NTZWwpO1xuICAgIH07XG4gICAgbGV0IGNzc1NlbGVjdG9yID0gbmV3IENzc1NlbGVjdG9yKCk7XG4gICAgbGV0IG1hdGNoOiBzdHJpbmdbXXxudWxsO1xuICAgIGxldCBjdXJyZW50ID0gY3NzU2VsZWN0b3I7XG4gICAgbGV0IGluTm90ID0gZmFsc2U7XG4gICAgX1NFTEVDVE9SX1JFR0VYUC5sYXN0SW5kZXggPSAwO1xuICAgIHdoaWxlIChtYXRjaCA9IF9TRUxFQ1RPUl9SRUdFWFAuZXhlYyhzZWxlY3RvcikpIHtcbiAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICBpZiAoaW5Ob3QpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lc3RpbmcgOm5vdCBpcyBub3QgYWxsb3dlZCBpbiBhIHNlbGVjdG9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgaW5Ob3QgPSB0cnVlO1xuICAgICAgICBjdXJyZW50ID0gbmV3IENzc1NlbGVjdG9yKCk7XG4gICAgICAgIGNzc1NlbGVjdG9yLm5vdFNlbGVjdG9ycy5wdXNoKGN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKG1hdGNoWzJdKSB7XG4gICAgICAgIGN1cnJlbnQuc2V0RWxlbWVudChtYXRjaFsyXSk7XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgY3VycmVudC5hZGRDbGFzc05hbWUobWF0Y2hbM10pO1xuICAgICAgfVxuICAgICAgaWYgKG1hdGNoWzRdKSB7XG4gICAgICAgIGN1cnJlbnQuYWRkQXR0cmlidXRlKG1hdGNoWzRdLCBtYXRjaFs2XSk7XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2hbN10pIHtcbiAgICAgICAgaW5Ob3QgPSBmYWxzZTtcbiAgICAgICAgY3VycmVudCA9IGNzc1NlbGVjdG9yO1xuICAgICAgfVxuICAgICAgaWYgKG1hdGNoWzhdKSB7XG4gICAgICAgIGlmIChpbk5vdCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVsdGlwbGUgc2VsZWN0b3JzIGluIDpub3QgYXJlIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBfYWRkUmVzdWx0KHJlc3VsdHMsIGNzc1NlbGVjdG9yKTtcbiAgICAgICAgY3NzU2VsZWN0b3IgPSBjdXJyZW50ID0gbmV3IENzc1NlbGVjdG9yKCk7XG4gICAgICB9XG4gICAgfVxuICAgIF9hZGRSZXN1bHQocmVzdWx0cywgY3NzU2VsZWN0b3IpO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgaXNFbGVtZW50U2VsZWN0b3IoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGFzRWxlbWVudFNlbGVjdG9yKCkgJiYgdGhpcy5jbGFzc05hbWVzLmxlbmd0aCA9PSAwICYmIHRoaXMuYXR0cnMubGVuZ3RoID09IDAgJiZcbiAgICAgICAgdGhpcy5ub3RTZWxlY3RvcnMubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgaGFzRWxlbWVudFNlbGVjdG9yKCk6IGJvb2xlYW4geyByZXR1cm4gISF0aGlzLmVsZW1lbnQ7IH1cblxuICBzZXRFbGVtZW50KGVsZW1lbnQ6IHN0cmluZ3xudWxsID0gbnVsbCkgeyB0aGlzLmVsZW1lbnQgPSBlbGVtZW50OyB9XG5cbiAgLyoqIEdldHMgYSB0ZW1wbGF0ZSBzdHJpbmcgZm9yIGFuIGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3Rvci4gKi9cbiAgZ2V0TWF0Y2hpbmdFbGVtZW50VGVtcGxhdGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCB0YWdOYW1lID0gdGhpcy5lbGVtZW50IHx8ICdkaXYnO1xuICAgIGNvbnN0IGNsYXNzQXR0ciA9IHRoaXMuY2xhc3NOYW1lcy5sZW5ndGggPiAwID8gYCBjbGFzcz1cIiR7dGhpcy5jbGFzc05hbWVzLmpvaW4oJyAnKX1cImAgOiAnJztcblxuICAgIGxldCBhdHRycyA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRycy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgY29uc3QgYXR0ck5hbWUgPSB0aGlzLmF0dHJzW2ldO1xuICAgICAgY29uc3QgYXR0clZhbHVlID0gdGhpcy5hdHRyc1tpICsgMV0gIT09ICcnID8gYD1cIiR7dGhpcy5hdHRyc1tpICsgMV19XCJgIDogJyc7XG4gICAgICBhdHRycyArPSBgICR7YXR0ck5hbWV9JHthdHRyVmFsdWV9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0SHRtbFRhZ0RlZmluaXRpb24odGFnTmFtZSkuaXNWb2lkID8gYDwke3RhZ05hbWV9JHtjbGFzc0F0dHJ9JHthdHRyc30vPmAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPCR7dGFnTmFtZX0ke2NsYXNzQXR0cn0ke2F0dHJzfT48LyR7dGFnTmFtZX0+YDtcbiAgfVxuXG4gIGdldEF0dHJzKCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHRoaXMuY2xhc3NOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXN1bHQucHVzaCgnY2xhc3MnLCB0aGlzLmNsYXNzTmFtZXMuam9pbignICcpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5jb25jYXQodGhpcy5hdHRycyk7XG4gIH1cblxuICBhZGRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nID0gJycpIHtcbiAgICB0aGlzLmF0dHJzLnB1c2gobmFtZSwgdmFsdWUgJiYgdmFsdWUudG9Mb3dlckNhc2UoKSB8fCAnJyk7XG4gIH1cblxuICBhZGRDbGFzc05hbWUobmFtZTogc3RyaW5nKSB7IHRoaXMuY2xhc3NOYW1lcy5wdXNoKG5hbWUudG9Mb3dlckNhc2UoKSk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGxldCByZXM6IHN0cmluZyA9IHRoaXMuZWxlbWVudCB8fCAnJztcbiAgICBpZiAodGhpcy5jbGFzc05hbWVzKSB7XG4gICAgICB0aGlzLmNsYXNzTmFtZXMuZm9yRWFjaChrbGFzcyA9PiByZXMgKz0gYC4ke2tsYXNzfWApO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdHRycykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF0dHJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmF0dHJzW2ldO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuYXR0cnNbaSArIDFdO1xuICAgICAgICByZXMgKz0gYFske25hbWV9JHt2YWx1ZSA/ICc9JyArIHZhbHVlIDogJyd9XWA7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubm90U2VsZWN0b3JzLmZvckVhY2gobm90U2VsZWN0b3IgPT4gcmVzICs9IGA6bm90KCR7bm90U2VsZWN0b3J9KWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWFkcyBhIGxpc3Qgb2YgQ3NzU2VsZWN0b3JzIGFuZCBhbGxvd3MgdG8gY2FsY3VsYXRlIHdoaWNoIG9uZXNcbiAqIGFyZSBjb250YWluZWQgaW4gYSBnaXZlbiBDc3NTZWxlY3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdG9yTWF0Y2hlciB7XG4gIHN0YXRpYyBjcmVhdGVOb3RNYXRjaGVyKG5vdFNlbGVjdG9yczogQ3NzU2VsZWN0b3JbXSk6IFNlbGVjdG9yTWF0Y2hlciB7XG4gICAgY29uc3Qgbm90TWF0Y2hlciA9IG5ldyBTZWxlY3Rvck1hdGNoZXIoKTtcbiAgICBub3RNYXRjaGVyLmFkZFNlbGVjdGFibGVzKG5vdFNlbGVjdG9ycywgbnVsbCk7XG4gICAgcmV0dXJuIG5vdE1hdGNoZXI7XG4gIH1cblxuICBwcml2YXRlIF9lbGVtZW50TWFwID0gbmV3IE1hcDxzdHJpbmcsIFNlbGVjdG9yQ29udGV4dFtdPigpO1xuICBwcml2YXRlIF9lbGVtZW50UGFydGlhbE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBTZWxlY3Rvck1hdGNoZXI+KCk7XG4gIHByaXZhdGUgX2NsYXNzTWFwID0gbmV3IE1hcDxzdHJpbmcsIFNlbGVjdG9yQ29udGV4dFtdPigpO1xuICBwcml2YXRlIF9jbGFzc1BhcnRpYWxNYXAgPSBuZXcgTWFwPHN0cmluZywgU2VsZWN0b3JNYXRjaGVyPigpO1xuICBwcml2YXRlIF9hdHRyVmFsdWVNYXAgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgU2VsZWN0b3JDb250ZXh0W10+PigpO1xuICBwcml2YXRlIF9hdHRyVmFsdWVQYXJ0aWFsTWFwID0gbmV3IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIFNlbGVjdG9yTWF0Y2hlcj4+KCk7XG4gIHByaXZhdGUgX2xpc3RDb250ZXh0czogU2VsZWN0b3JMaXN0Q29udGV4dFtdID0gW107XG5cbiAgYWRkU2VsZWN0YWJsZXMoY3NzU2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdLCBjYWxsYmFja0N0eHQ/OiBhbnkpIHtcbiAgICBsZXQgbGlzdENvbnRleHQ6IFNlbGVjdG9yTGlzdENvbnRleHQgPSBudWxsICE7XG4gICAgaWYgKGNzc1NlbGVjdG9ycy5sZW5ndGggPiAxKSB7XG4gICAgICBsaXN0Q29udGV4dCA9IG5ldyBTZWxlY3Rvckxpc3RDb250ZXh0KGNzc1NlbGVjdG9ycyk7XG4gICAgICB0aGlzLl9saXN0Q29udGV4dHMucHVzaChsaXN0Q29udGV4dCk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3NzU2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9hZGRTZWxlY3RhYmxlKGNzc1NlbGVjdG9yc1tpXSwgY2FsbGJhY2tDdHh0LCBsaXN0Q29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBvYmplY3QgdGhhdCBjYW4gYmUgZm91bmQgbGF0ZXIgb24gYnkgY2FsbGluZyBgbWF0Y2hgLlxuICAgKiBAcGFyYW0gY3NzU2VsZWN0b3IgQSBjc3Mgc2VsZWN0b3JcbiAgICogQHBhcmFtIGNhbGxiYWNrQ3R4dCBBbiBvcGFxdWUgb2JqZWN0IHRoYXQgd2lsbCBiZSBnaXZlbiB0byB0aGUgY2FsbGJhY2sgb2YgdGhlIGBtYXRjaGAgZnVuY3Rpb25cbiAgICovXG4gIHByaXZhdGUgX2FkZFNlbGVjdGFibGUoXG4gICAgICBjc3NTZWxlY3RvcjogQ3NzU2VsZWN0b3IsIGNhbGxiYWNrQ3R4dDogYW55LCBsaXN0Q29udGV4dDogU2VsZWN0b3JMaXN0Q29udGV4dCkge1xuICAgIGxldCBtYXRjaGVyOiBTZWxlY3Rvck1hdGNoZXIgPSB0aGlzO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjc3NTZWxlY3Rvci5lbGVtZW50O1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBjc3NTZWxlY3Rvci5jbGFzc05hbWVzO1xuICAgIGNvbnN0IGF0dHJzID0gY3NzU2VsZWN0b3IuYXR0cnM7XG4gICAgY29uc3Qgc2VsZWN0YWJsZSA9IG5ldyBTZWxlY3RvckNvbnRleHQoY3NzU2VsZWN0b3IsIGNhbGxiYWNrQ3R4dCwgbGlzdENvbnRleHQpO1xuXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGlzVGVybWluYWwgPSBhdHRycy5sZW5ndGggPT09IDAgJiYgY2xhc3NOYW1lcy5sZW5ndGggPT09IDA7XG4gICAgICBpZiAoaXNUZXJtaW5hbCkge1xuICAgICAgICB0aGlzLl9hZGRUZXJtaW5hbChtYXRjaGVyLl9lbGVtZW50TWFwLCBlbGVtZW50LCBzZWxlY3RhYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdGNoZXIgPSB0aGlzLl9hZGRQYXJ0aWFsKG1hdGNoZXIuX2VsZW1lbnRQYXJ0aWFsTWFwLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2xhc3NOYW1lcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGlzVGVybWluYWwgPSBhdHRycy5sZW5ndGggPT09IDAgJiYgaSA9PT0gY2xhc3NOYW1lcy5sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzW2ldO1xuICAgICAgICBpZiAoaXNUZXJtaW5hbCkge1xuICAgICAgICAgIHRoaXMuX2FkZFRlcm1pbmFsKG1hdGNoZXIuX2NsYXNzTWFwLCBjbGFzc05hbWUsIHNlbGVjdGFibGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hdGNoZXIgPSB0aGlzLl9hZGRQYXJ0aWFsKG1hdGNoZXIuX2NsYXNzUGFydGlhbE1hcCwgY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhdHRycykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBjb25zdCBpc1Rlcm1pbmFsID0gaSA9PT0gYXR0cnMubGVuZ3RoIC0gMjtcbiAgICAgICAgY29uc3QgbmFtZSA9IGF0dHJzW2ldO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJzW2kgKyAxXTtcbiAgICAgICAgaWYgKGlzVGVybWluYWwpIHtcbiAgICAgICAgICBjb25zdCB0ZXJtaW5hbE1hcCA9IG1hdGNoZXIuX2F0dHJWYWx1ZU1hcDtcbiAgICAgICAgICBsZXQgdGVybWluYWxWYWx1ZXNNYXAgPSB0ZXJtaW5hbE1hcC5nZXQobmFtZSk7XG4gICAgICAgICAgaWYgKCF0ZXJtaW5hbFZhbHVlc01hcCkge1xuICAgICAgICAgICAgdGVybWluYWxWYWx1ZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgU2VsZWN0b3JDb250ZXh0W10+KCk7XG4gICAgICAgICAgICB0ZXJtaW5hbE1hcC5zZXQobmFtZSwgdGVybWluYWxWYWx1ZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9hZGRUZXJtaW5hbCh0ZXJtaW5hbFZhbHVlc01hcCwgdmFsdWUsIHNlbGVjdGFibGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcnRpYWxNYXAgPSBtYXRjaGVyLl9hdHRyVmFsdWVQYXJ0aWFsTWFwO1xuICAgICAgICAgIGxldCBwYXJ0aWFsVmFsdWVzTWFwID0gcGFydGlhbE1hcC5nZXQobmFtZSk7XG4gICAgICAgICAgaWYgKCFwYXJ0aWFsVmFsdWVzTWFwKSB7XG4gICAgICAgICAgICBwYXJ0aWFsVmFsdWVzTWFwID0gbmV3IE1hcDxzdHJpbmcsIFNlbGVjdG9yTWF0Y2hlcj4oKTtcbiAgICAgICAgICAgIHBhcnRpYWxNYXAuc2V0KG5hbWUsIHBhcnRpYWxWYWx1ZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtYXRjaGVyID0gdGhpcy5fYWRkUGFydGlhbChwYXJ0aWFsVmFsdWVzTWFwLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRUZXJtaW5hbChcbiAgICAgIG1hcDogTWFwPHN0cmluZywgU2VsZWN0b3JDb250ZXh0W10+LCBuYW1lOiBzdHJpbmcsIHNlbGVjdGFibGU6IFNlbGVjdG9yQ29udGV4dCkge1xuICAgIGxldCB0ZXJtaW5hbExpc3QgPSBtYXAuZ2V0KG5hbWUpO1xuICAgIGlmICghdGVybWluYWxMaXN0KSB7XG4gICAgICB0ZXJtaW5hbExpc3QgPSBbXTtcbiAgICAgIG1hcC5zZXQobmFtZSwgdGVybWluYWxMaXN0KTtcbiAgICB9XG4gICAgdGVybWluYWxMaXN0LnB1c2goc2VsZWN0YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRQYXJ0aWFsKG1hcDogTWFwPHN0cmluZywgU2VsZWN0b3JNYXRjaGVyPiwgbmFtZTogc3RyaW5nKTogU2VsZWN0b3JNYXRjaGVyIHtcbiAgICBsZXQgbWF0Y2hlciA9IG1hcC5nZXQobmFtZSk7XG4gICAgaWYgKCFtYXRjaGVyKSB7XG4gICAgICBtYXRjaGVyID0gbmV3IFNlbGVjdG9yTWF0Y2hlcigpO1xuICAgICAgbWFwLnNldChuYW1lLCBtYXRjaGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXI7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgb2JqZWN0cyB0aGF0IGhhdmUgYmVlbiBhZGRlZCB2aWEgYGFkZFNlbGVjdGFibGVgXG4gICAqIHdob3NlIGNzcyBzZWxlY3RvciBpcyBjb250YWluZWQgaW4gdGhlIGdpdmVuIGNzcyBzZWxlY3Rvci5cbiAgICogQHBhcmFtIGNzc1NlbGVjdG9yIEEgY3NzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBtYXRjaGVkQ2FsbGJhY2sgVGhpcyBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBvYmplY3QgaGFuZGVkIGludG8gYGFkZFNlbGVjdGFibGVgXG4gICAqIEByZXR1cm4gYm9vbGVhbiB0cnVlIGlmIGEgbWF0Y2ggd2FzIGZvdW5kXG4gICovXG4gIG1hdGNoKGNzc1NlbGVjdG9yOiBDc3NTZWxlY3RvciwgbWF0Y2hlZENhbGxiYWNrOiAoKGM6IENzc1NlbGVjdG9yLCBhOiBhbnkpID0+IHZvaWQpfG51bGwpOlxuICAgICAgYm9vbGVhbiB7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjc3NTZWxlY3Rvci5lbGVtZW50ICE7XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGNzc1NlbGVjdG9yLmNsYXNzTmFtZXM7XG4gICAgY29uc3QgYXR0cnMgPSBjc3NTZWxlY3Rvci5hdHRycztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlzdENvbnRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9saXN0Q29udGV4dHNbaV0uYWxyZWFkeU1hdGNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXN1bHQgPSB0aGlzLl9tYXRjaFRlcm1pbmFsKHRoaXMuX2VsZW1lbnRNYXAsIGVsZW1lbnQsIGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8IHJlc3VsdDtcbiAgICByZXN1bHQgPSB0aGlzLl9tYXRjaFBhcnRpYWwodGhpcy5fZWxlbWVudFBhcnRpYWxNYXAsIGVsZW1lbnQsIGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8XG4gICAgICAgIHJlc3VsdDtcblxuICAgIGlmIChjbGFzc05hbWVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lc1tpXTtcbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIHRoaXMuX21hdGNoVGVybWluYWwodGhpcy5fY2xhc3NNYXAsIGNsYXNzTmFtZSwgY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjaykgfHwgcmVzdWx0O1xuICAgICAgICByZXN1bHQgPVxuICAgICAgICAgICAgdGhpcy5fbWF0Y2hQYXJ0aWFsKHRoaXMuX2NsYXNzUGFydGlhbE1hcCwgY2xhc3NOYW1lLCBjc3NTZWxlY3RvciwgbWF0Y2hlZENhbGxiYWNrKSB8fFxuICAgICAgICAgICAgcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhdHRycykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBjb25zdCBuYW1lID0gYXR0cnNbaV07XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cnNbaSArIDFdO1xuXG4gICAgICAgIGNvbnN0IHRlcm1pbmFsVmFsdWVzTWFwID0gdGhpcy5fYXR0clZhbHVlTWFwLmdldChuYW1lKSAhO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICByZXN1bHQgPVxuICAgICAgICAgICAgICB0aGlzLl9tYXRjaFRlcm1pbmFsKHRlcm1pbmFsVmFsdWVzTWFwLCAnJywgY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjaykgfHwgcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9XG4gICAgICAgICAgICB0aGlzLl9tYXRjaFRlcm1pbmFsKHRlcm1pbmFsVmFsdWVzTWFwLCB2YWx1ZSwgY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjaykgfHwgcmVzdWx0O1xuXG4gICAgICAgIGNvbnN0IHBhcnRpYWxWYWx1ZXNNYXAgPSB0aGlzLl9hdHRyVmFsdWVQYXJ0aWFsTWFwLmdldChuYW1lKSAhO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLl9tYXRjaFBhcnRpYWwocGFydGlhbFZhbHVlc01hcCwgJycsIGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPVxuICAgICAgICAgICAgdGhpcy5fbWF0Y2hQYXJ0aWFsKHBhcnRpYWxWYWx1ZXNNYXAsIHZhbHVlLCBjc3NTZWxlY3RvciwgbWF0Y2hlZENhbGxiYWNrKSB8fCByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXRjaFRlcm1pbmFsKFxuICAgICAgbWFwOiBNYXA8c3RyaW5nLCBTZWxlY3RvckNvbnRleHRbXT4sIG5hbWU6IHN0cmluZywgY3NzU2VsZWN0b3I6IENzc1NlbGVjdG9yLFxuICAgICAgbWF0Y2hlZENhbGxiYWNrOiAoKGM6IENzc1NlbGVjdG9yLCBhOiBhbnkpID0+IHZvaWQpfG51bGwpOiBib29sZWFuIHtcbiAgICBpZiAoIW1hcCB8fCB0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgc2VsZWN0YWJsZXM6IFNlbGVjdG9yQ29udGV4dFtdID0gbWFwLmdldChuYW1lKSB8fCBbXTtcbiAgICBjb25zdCBzdGFyU2VsZWN0YWJsZXM6IFNlbGVjdG9yQ29udGV4dFtdID0gbWFwLmdldCgnKicpICE7XG4gICAgaWYgKHN0YXJTZWxlY3RhYmxlcykge1xuICAgICAgc2VsZWN0YWJsZXMgPSBzZWxlY3RhYmxlcy5jb25jYXQoc3RhclNlbGVjdGFibGVzKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdGFibGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgc2VsZWN0YWJsZTogU2VsZWN0b3JDb250ZXh0O1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzZWxlY3RhYmxlID0gc2VsZWN0YWJsZXNbaV07XG4gICAgICByZXN1bHQgPSBzZWxlY3RhYmxlLmZpbmFsaXplKGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8IHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX21hdGNoUGFydGlhbChcbiAgICAgIG1hcDogTWFwPHN0cmluZywgU2VsZWN0b3JNYXRjaGVyPiwgbmFtZTogc3RyaW5nLCBjc3NTZWxlY3RvcjogQ3NzU2VsZWN0b3IsXG4gICAgICBtYXRjaGVkQ2FsbGJhY2s6ICgoYzogQ3NzU2VsZWN0b3IsIGE6IGFueSkgPT4gdm9pZCl8bnVsbCk6IGJvb2xlYW4ge1xuICAgIGlmICghbWFwIHx8IHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5lc3RlZFNlbGVjdG9yID0gbWFwLmdldChuYW1lKTtcbiAgICBpZiAoIW5lc3RlZFNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFRPRE8ocGVyZik6IGdldCByaWQgb2YgcmVjdXJzaW9uIGFuZCBtZWFzdXJlIGFnYWluXG4gICAgLy8gVE9ETyhwZXJmKTogZG9uJ3QgcGFzcyB0aGUgd2hvbGUgc2VsZWN0b3IgaW50byB0aGUgcmVjdXJzaW9uLFxuICAgIC8vIGJ1dCBvbmx5IHRoZSBub3QgcHJvY2Vzc2VkIHBhcnRzXG4gICAgcmV0dXJuIG5lc3RlZFNlbGVjdG9yLm1hdGNoKGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFNlbGVjdG9yTGlzdENvbnRleHQge1xuICBhbHJlYWR5TWF0Y2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZWxlY3RvcnM6IENzc1NlbGVjdG9yW10pIHt9XG59XG5cbi8vIFN0b3JlIGNvbnRleHQgdG8gcGFzcyBiYWNrIHNlbGVjdG9yIGFuZCBjb250ZXh0IHdoZW4gYSBzZWxlY3RvciBpcyBtYXRjaGVkXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JDb250ZXh0IHtcbiAgbm90U2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHNlbGVjdG9yOiBDc3NTZWxlY3RvciwgcHVibGljIGNiQ29udGV4dDogYW55LFxuICAgICAgcHVibGljIGxpc3RDb250ZXh0OiBTZWxlY3Rvckxpc3RDb250ZXh0KSB7XG4gICAgdGhpcy5ub3RTZWxlY3RvcnMgPSBzZWxlY3Rvci5ub3RTZWxlY3RvcnM7XG4gIH1cblxuICBmaW5hbGl6ZShjc3NTZWxlY3RvcjogQ3NzU2VsZWN0b3IsIGNhbGxiYWNrOiAoKGM6IENzc1NlbGVjdG9yLCBhOiBhbnkpID0+IHZvaWQpfG51bGwpOiBib29sZWFuIHtcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5ub3RTZWxlY3RvcnMubGVuZ3RoID4gMCAmJiAoIXRoaXMubGlzdENvbnRleHQgfHwgIXRoaXMubGlzdENvbnRleHQuYWxyZWFkeU1hdGNoZWQpKSB7XG4gICAgICBjb25zdCBub3RNYXRjaGVyID0gU2VsZWN0b3JNYXRjaGVyLmNyZWF0ZU5vdE1hdGNoZXIodGhpcy5ub3RTZWxlY3RvcnMpO1xuICAgICAgcmVzdWx0ID0gIW5vdE1hdGNoZXIubWF0Y2goY3NzU2VsZWN0b3IsIG51bGwpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ICYmIGNhbGxiYWNrICYmICghdGhpcy5saXN0Q29udGV4dCB8fCAhdGhpcy5saXN0Q29udGV4dC5hbHJlYWR5TWF0Y2hlZCkpIHtcbiAgICAgIGlmICh0aGlzLmxpc3RDb250ZXh0KSB7XG4gICAgICAgIHRoaXMubGlzdENvbnRleHQuYWxyZWFkeU1hdGNoZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2sodGhpcy5zZWxlY3RvciwgdGhpcy5jYkNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=