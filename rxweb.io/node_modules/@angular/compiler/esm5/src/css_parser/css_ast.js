/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { CssToken, CssTokenType } from './css_lexer';
export var BlockType;
(function (BlockType) {
    BlockType[BlockType["Import"] = 0] = "Import";
    BlockType[BlockType["Charset"] = 1] = "Charset";
    BlockType[BlockType["Namespace"] = 2] = "Namespace";
    BlockType[BlockType["Supports"] = 3] = "Supports";
    BlockType[BlockType["Keyframes"] = 4] = "Keyframes";
    BlockType[BlockType["MediaQuery"] = 5] = "MediaQuery";
    BlockType[BlockType["Selector"] = 6] = "Selector";
    BlockType[BlockType["FontFace"] = 7] = "FontFace";
    BlockType[BlockType["Page"] = 8] = "Page";
    BlockType[BlockType["Document"] = 9] = "Document";
    BlockType[BlockType["Viewport"] = 10] = "Viewport";
    BlockType[BlockType["Unsupported"] = 11] = "Unsupported";
})(BlockType || (BlockType = {}));
var CssAst = /** @class */ (function () {
    function CssAst(location) {
        this.location = location;
    }
    Object.defineProperty(CssAst.prototype, "start", {
        get: function () { return this.location.start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CssAst.prototype, "end", {
        get: function () { return this.location.end; },
        enumerable: true,
        configurable: true
    });
    return CssAst;
}());
export { CssAst };
var CssStyleValueAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssStyleValueAst, _super);
    function CssStyleValueAst(location, tokens, strValue) {
        var _this = _super.call(this, location) || this;
        _this.tokens = tokens;
        _this.strValue = strValue;
        return _this;
    }
    CssStyleValueAst.prototype.visit = function (visitor, context) { return visitor.visitCssValue(this); };
    return CssStyleValueAst;
}(CssAst));
export { CssStyleValueAst };
var CssRuleAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssRuleAst, _super);
    function CssRuleAst(location) {
        return _super.call(this, location) || this;
    }
    return CssRuleAst;
}(CssAst));
export { CssRuleAst };
var CssBlockRuleAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssBlockRuleAst, _super);
    function CssBlockRuleAst(location, type, block, name) {
        if (name === void 0) { name = null; }
        var _this = _super.call(this, location) || this;
        _this.location = location;
        _this.type = type;
        _this.block = block;
        _this.name = name;
        return _this;
    }
    CssBlockRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssBlock(this.block, context);
    };
    return CssBlockRuleAst;
}(CssRuleAst));
export { CssBlockRuleAst };
var CssKeyframeRuleAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssKeyframeRuleAst, _super);
    function CssKeyframeRuleAst(location, name, block) {
        return _super.call(this, location, BlockType.Keyframes, block, name) || this;
    }
    CssKeyframeRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssKeyframeRule(this, context);
    };
    return CssKeyframeRuleAst;
}(CssBlockRuleAst));
export { CssKeyframeRuleAst };
var CssKeyframeDefinitionAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssKeyframeDefinitionAst, _super);
    function CssKeyframeDefinitionAst(location, steps, block) {
        var _this = _super.call(this, location, BlockType.Keyframes, block, mergeTokens(steps, ',')) || this;
        _this.steps = steps;
        return _this;
    }
    CssKeyframeDefinitionAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssKeyframeDefinition(this, context);
    };
    return CssKeyframeDefinitionAst;
}(CssBlockRuleAst));
export { CssKeyframeDefinitionAst };
var CssBlockDefinitionRuleAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssBlockDefinitionRuleAst, _super);
    function CssBlockDefinitionRuleAst(location, strValue, type, query, block) {
        var _this = _super.call(this, location, type, block) || this;
        _this.strValue = strValue;
        _this.query = query;
        var firstCssToken = query.tokens[0];
        _this.name = new CssToken(firstCssToken.index, firstCssToken.column, firstCssToken.line, CssTokenType.Identifier, _this.strValue);
        return _this;
    }
    CssBlockDefinitionRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssBlock(this.block, context);
    };
    return CssBlockDefinitionRuleAst;
}(CssBlockRuleAst));
export { CssBlockDefinitionRuleAst };
var CssMediaQueryRuleAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssMediaQueryRuleAst, _super);
    function CssMediaQueryRuleAst(location, strValue, query, block) {
        return _super.call(this, location, strValue, BlockType.MediaQuery, query, block) || this;
    }
    CssMediaQueryRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssMediaQueryRule(this, context);
    };
    return CssMediaQueryRuleAst;
}(CssBlockDefinitionRuleAst));
export { CssMediaQueryRuleAst };
var CssAtRulePredicateAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssAtRulePredicateAst, _super);
    function CssAtRulePredicateAst(location, strValue, tokens) {
        var _this = _super.call(this, location) || this;
        _this.strValue = strValue;
        _this.tokens = tokens;
        return _this;
    }
    CssAtRulePredicateAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssAtRulePredicate(this, context);
    };
    return CssAtRulePredicateAst;
}(CssAst));
export { CssAtRulePredicateAst };
var CssInlineRuleAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssInlineRuleAst, _super);
    function CssInlineRuleAst(location, type, value) {
        var _this = _super.call(this, location) || this;
        _this.type = type;
        _this.value = value;
        return _this;
    }
    CssInlineRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssInlineRule(this, context);
    };
    return CssInlineRuleAst;
}(CssRuleAst));
export { CssInlineRuleAst };
var CssSelectorRuleAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssSelectorRuleAst, _super);
    function CssSelectorRuleAst(location, selectors, block) {
        var _this = _super.call(this, location, BlockType.Selector, block) || this;
        _this.selectors = selectors;
        _this.strValue = selectors.map(function (selector) { return selector.strValue; }).join(',');
        return _this;
    }
    CssSelectorRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssSelectorRule(this, context);
    };
    return CssSelectorRuleAst;
}(CssBlockRuleAst));
export { CssSelectorRuleAst };
var CssDefinitionAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssDefinitionAst, _super);
    function CssDefinitionAst(location, property, value) {
        var _this = _super.call(this, location) || this;
        _this.property = property;
        _this.value = value;
        return _this;
    }
    CssDefinitionAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssDefinition(this, context);
    };
    return CssDefinitionAst;
}(CssAst));
export { CssDefinitionAst };
var CssSelectorPartAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssSelectorPartAst, _super);
    function CssSelectorPartAst(location) {
        return _super.call(this, location) || this;
    }
    return CssSelectorPartAst;
}(CssAst));
export { CssSelectorPartAst };
var CssSelectorAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssSelectorAst, _super);
    function CssSelectorAst(location, selectorParts) {
        var _this = _super.call(this, location) || this;
        _this.selectorParts = selectorParts;
        _this.strValue = selectorParts.map(function (part) { return part.strValue; }).join('');
        return _this;
    }
    CssSelectorAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssSelector(this, context);
    };
    return CssSelectorAst;
}(CssSelectorPartAst));
export { CssSelectorAst };
var CssSimpleSelectorAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssSimpleSelectorAst, _super);
    function CssSimpleSelectorAst(location, tokens, strValue, pseudoSelectors, operator) {
        var _this = _super.call(this, location) || this;
        _this.tokens = tokens;
        _this.strValue = strValue;
        _this.pseudoSelectors = pseudoSelectors;
        _this.operator = operator;
        return _this;
    }
    CssSimpleSelectorAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssSimpleSelector(this, context);
    };
    return CssSimpleSelectorAst;
}(CssSelectorPartAst));
export { CssSimpleSelectorAst };
var CssPseudoSelectorAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssPseudoSelectorAst, _super);
    function CssPseudoSelectorAst(location, strValue, name, tokens, innerSelectors) {
        var _this = _super.call(this, location) || this;
        _this.strValue = strValue;
        _this.name = name;
        _this.tokens = tokens;
        _this.innerSelectors = innerSelectors;
        return _this;
    }
    CssPseudoSelectorAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssPseudoSelector(this, context);
    };
    return CssPseudoSelectorAst;
}(CssSelectorPartAst));
export { CssPseudoSelectorAst };
var CssBlockAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssBlockAst, _super);
    function CssBlockAst(location, entries) {
        var _this = _super.call(this, location) || this;
        _this.entries = entries;
        return _this;
    }
    CssBlockAst.prototype.visit = function (visitor, context) { return visitor.visitCssBlock(this, context); };
    return CssBlockAst;
}(CssAst));
export { CssBlockAst };
/*
 a style block is different from a standard block because it contains
 css prop:value definitions. A regular block can contain a list of Ast entries.
 */
var CssStylesBlockAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssStylesBlockAst, _super);
    function CssStylesBlockAst(location, definitions) {
        var _this = _super.call(this, location, definitions) || this;
        _this.definitions = definitions;
        return _this;
    }
    CssStylesBlockAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssStylesBlock(this, context);
    };
    return CssStylesBlockAst;
}(CssBlockAst));
export { CssStylesBlockAst };
var CssStyleSheetAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssStyleSheetAst, _super);
    function CssStyleSheetAst(location, rules) {
        var _this = _super.call(this, location) || this;
        _this.rules = rules;
        return _this;
    }
    CssStyleSheetAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssStyleSheet(this, context);
    };
    return CssStyleSheetAst;
}(CssAst));
export { CssStyleSheetAst };
var CssUnknownRuleAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssUnknownRuleAst, _super);
    function CssUnknownRuleAst(location, ruleName, tokens) {
        var _this = _super.call(this, location) || this;
        _this.ruleName = ruleName;
        _this.tokens = tokens;
        return _this;
    }
    CssUnknownRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssUnknownRule(this, context);
    };
    return CssUnknownRuleAst;
}(CssRuleAst));
export { CssUnknownRuleAst };
var CssUnknownTokenListAst = /** @class */ (function (_super) {
    tslib_1.__extends(CssUnknownTokenListAst, _super);
    function CssUnknownTokenListAst(location, name, tokens) {
        var _this = _super.call(this, location) || this;
        _this.name = name;
        _this.tokens = tokens;
        return _this;
    }
    CssUnknownTokenListAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssUnknownTokenList(this, context);
    };
    return CssUnknownTokenListAst;
}(CssRuleAst));
export { CssUnknownTokenListAst };
export function mergeTokens(tokens, separator) {
    if (separator === void 0) { separator = ''; }
    var mainToken = tokens[0];
    var str = mainToken.strValue;
    for (var i = 1; i < tokens.length; i++) {
        str += separator + tokens[i].strValue;
    }
    return new CssToken(mainToken.index, mainToken.column, mainToken.line, mainToken.type, str);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2FzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jc3NfcGFyc2VyL2Nzc19hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUlILE9BQU8sRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRW5ELE1BQU0sQ0FBTixJQUFZLFNBYVg7QUFiRCxXQUFZLFNBQVM7SUFDbkIsNkNBQU0sQ0FBQTtJQUNOLCtDQUFPLENBQUE7SUFDUCxtREFBUyxDQUFBO0lBQ1QsaURBQVEsQ0FBQTtJQUNSLG1EQUFTLENBQUE7SUFDVCxxREFBVSxDQUFBO0lBQ1YsaURBQVEsQ0FBQTtJQUNSLGlEQUFRLENBQUE7SUFDUix5Q0FBSSxDQUFBO0lBQ0osaURBQVEsQ0FBQTtJQUNSLGtEQUFRLENBQUE7SUFDUix3REFBVyxDQUFBO0FBQ2IsQ0FBQyxFQWJXLFNBQVMsS0FBVCxTQUFTLFFBYXBCO0FBcUJEO0lBQ0UsZ0JBQW1CLFFBQXlCO1FBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO0lBQUcsQ0FBQztJQUNoRCxzQkFBSSx5QkFBSzthQUFULGNBQTZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMxRCxzQkFBSSx1QkFBRzthQUFQLGNBQTJCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUV4RCxhQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7O0FBRUQ7SUFBc0MsNENBQU07SUFDMUMsMEJBQVksUUFBeUIsRUFBUyxNQUFrQixFQUFTLFFBQWdCO1FBQXpGLFlBQ0Usa0JBQU0sUUFBUSxDQUFDLFNBQ2hCO1FBRjZDLFlBQU0sR0FBTixNQUFNLENBQVk7UUFBUyxjQUFRLEdBQVIsUUFBUSxDQUFROztJQUV6RixD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LEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxHQUFHLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7S0FDdkM7SUFFRCxPQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDOUYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQYXJzZUxvY2F0aW9uLCBQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4uL3BhcnNlX3V0aWwnO1xuXG5pbXBvcnQge0Nzc1Rva2VuLCBDc3NUb2tlblR5cGV9IGZyb20gJy4vY3NzX2xleGVyJztcblxuZXhwb3J0IGVudW0gQmxvY2tUeXBlIHtcbiAgSW1wb3J0LFxuICBDaGFyc2V0LFxuICBOYW1lc3BhY2UsXG4gIFN1cHBvcnRzLFxuICBLZXlmcmFtZXMsXG4gIE1lZGlhUXVlcnksXG4gIFNlbGVjdG9yLFxuICBGb250RmFjZSxcbiAgUGFnZSxcbiAgRG9jdW1lbnQsXG4gIFZpZXdwb3J0LFxuICBVbnN1cHBvcnRlZFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENzc0FzdFZpc2l0b3Ige1xuICB2aXNpdENzc1ZhbHVlKGFzdDogQ3NzU3R5bGVWYWx1ZUFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NJbmxpbmVSdWxlKGFzdDogQ3NzSW5saW5lUnVsZUFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NBdFJ1bGVQcmVkaWNhdGUoYXN0OiBDc3NBdFJ1bGVQcmVkaWNhdGVBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzS2V5ZnJhbWVSdWxlKGFzdDogQ3NzS2V5ZnJhbWVSdWxlQXN0LCBjb250ZXh0PzogYW55KTogYW55O1xuICB2aXNpdENzc0tleWZyYW1lRGVmaW5pdGlvbihhc3Q6IENzc0tleWZyYW1lRGVmaW5pdGlvbkFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NNZWRpYVF1ZXJ5UnVsZShhc3Q6IENzc01lZGlhUXVlcnlSdWxlQXN0LCBjb250ZXh0PzogYW55KTogYW55O1xuICB2aXNpdENzc1NlbGVjdG9yUnVsZShhc3Q6IENzc1NlbGVjdG9yUnVsZUFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NTZWxlY3Rvcihhc3Q6IENzc1NlbGVjdG9yQXN0LCBjb250ZXh0PzogYW55KTogYW55O1xuICB2aXNpdENzc1NpbXBsZVNlbGVjdG9yKGFzdDogQ3NzU2ltcGxlU2VsZWN0b3JBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzUHNldWRvU2VsZWN0b3IoYXN0OiBDc3NQc2V1ZG9TZWxlY3RvckFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NEZWZpbml0aW9uKGFzdDogQ3NzRGVmaW5pdGlvbkFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NCbG9jayhhc3Q6IENzc0Jsb2NrQXN0LCBjb250ZXh0PzogYW55KTogYW55O1xuICB2aXNpdENzc1N0eWxlc0Jsb2NrKGFzdDogQ3NzU3R5bGVzQmxvY2tBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzU3R5bGVTaGVldChhc3Q6IENzc1N0eWxlU2hlZXRBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzVW5rbm93blJ1bGUoYXN0OiBDc3NVbmtub3duUnVsZUFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NVbmtub3duVG9rZW5MaXN0KGFzdDogQ3NzVW5rbm93blRva2VuTGlzdEFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENzc0FzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICBnZXQgc3RhcnQoKTogUGFyc2VMb2NhdGlvbiB7IHJldHVybiB0aGlzLmxvY2F0aW9uLnN0YXJ0OyB9XG4gIGdldCBlbmQoKTogUGFyc2VMb2NhdGlvbiB7IHJldHVybiB0aGlzLmxvY2F0aW9uLmVuZDsgfVxuICBhYnN0cmFjdCB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQ3NzU3R5bGVWYWx1ZUFzdCBleHRlbmRzIENzc0FzdCB7XG4gIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyB0b2tlbnM6IENzc1Rva2VuW10sIHB1YmxpYyBzdHJWYWx1ZTogc3RyaW5nKSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdENzc1ZhbHVlKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDc3NSdWxlQXN0IGV4dGVuZHMgQ3NzQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbikgeyBzdXBlcihsb2NhdGlvbik7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0Jsb2NrUnVsZUFzdCBleHRlbmRzIENzc1J1bGVBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgdHlwZTogQmxvY2tUeXBlLCBwdWJsaWMgYmxvY2s6IENzc0Jsb2NrQXN0LFxuICAgICAgcHVibGljIG5hbWU6IENzc1Rva2VufG51bGwgPSBudWxsKSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzQmxvY2sodGhpcy5ibG9jaywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0tleWZyYW1lUnVsZUFzdCBleHRlbmRzIENzc0Jsb2NrUnVsZUFzdCB7XG4gIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBQYXJzZVNvdXJjZVNwYW4sIG5hbWU6IENzc1Rva2VuLCBibG9jazogQ3NzQmxvY2tBc3QpIHtcbiAgICBzdXBlcihsb2NhdGlvbiwgQmxvY2tUeXBlLktleWZyYW1lcywgYmxvY2ssIG5hbWUpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzS2V5ZnJhbWVSdWxlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NLZXlmcmFtZURlZmluaXRpb25Bc3QgZXh0ZW5kcyBDc3NCbG9ja1J1bGVBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RlcHM6IENzc1Rva2VuW10sIGJsb2NrOiBDc3NCbG9ja0FzdCkge1xuICAgIHN1cGVyKGxvY2F0aW9uLCBCbG9ja1R5cGUuS2V5ZnJhbWVzLCBibG9jaywgbWVyZ2VUb2tlbnMoc3RlcHMsICcsJykpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzS2V5ZnJhbWVEZWZpbml0aW9uKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NCbG9ja0RlZmluaXRpb25SdWxlQXN0IGV4dGVuZHMgQ3NzQmxvY2tSdWxlQXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZywgdHlwZTogQmxvY2tUeXBlLFxuICAgICAgcHVibGljIHF1ZXJ5OiBDc3NBdFJ1bGVQcmVkaWNhdGVBc3QsIGJsb2NrOiBDc3NCbG9ja0FzdCkge1xuICAgIHN1cGVyKGxvY2F0aW9uLCB0eXBlLCBibG9jayk7XG4gICAgY29uc3QgZmlyc3RDc3NUb2tlbjogQ3NzVG9rZW4gPSBxdWVyeS50b2tlbnNbMF07XG4gICAgdGhpcy5uYW1lID0gbmV3IENzc1Rva2VuKFxuICAgICAgICBmaXJzdENzc1Rva2VuLmluZGV4LCBmaXJzdENzc1Rva2VuLmNvbHVtbiwgZmlyc3RDc3NUb2tlbi5saW5lLCBDc3NUb2tlblR5cGUuSWRlbnRpZmllcixcbiAgICAgICAgdGhpcy5zdHJWYWx1ZSk7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NCbG9jayh0aGlzLmJsb2NrLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzTWVkaWFRdWVyeVJ1bGVBc3QgZXh0ZW5kcyBDc3NCbG9ja0RlZmluaXRpb25SdWxlQXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBzdHJWYWx1ZTogc3RyaW5nLCBxdWVyeTogQ3NzQXRSdWxlUHJlZGljYXRlQXN0LFxuICAgICAgYmxvY2s6IENzc0Jsb2NrQXN0KSB7XG4gICAgc3VwZXIobG9jYXRpb24sIHN0clZhbHVlLCBCbG9ja1R5cGUuTWVkaWFRdWVyeSwgcXVlcnksIGJsb2NrKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc01lZGlhUXVlcnlSdWxlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NBdFJ1bGVQcmVkaWNhdGVBc3QgZXh0ZW5kcyBDc3NBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZywgcHVibGljIHRva2VuczogQ3NzVG9rZW5bXSkge1xuICAgIHN1cGVyKGxvY2F0aW9uKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc0F0UnVsZVByZWRpY2F0ZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzSW5saW5lUnVsZUFzdCBleHRlbmRzIENzc1J1bGVBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgdHlwZTogQmxvY2tUeXBlLCBwdWJsaWMgdmFsdWU6IENzc1N0eWxlVmFsdWVBc3QpIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NJbmxpbmVSdWxlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NTZWxlY3RvclJ1bGVBc3QgZXh0ZW5kcyBDc3NCbG9ja1J1bGVBc3Qge1xuICBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc2VsZWN0b3JzOiBDc3NTZWxlY3RvckFzdFtdLCBibG9jazogQ3NzQmxvY2tBc3QpIHtcbiAgICBzdXBlcihsb2NhdGlvbiwgQmxvY2tUeXBlLlNlbGVjdG9yLCBibG9jayk7XG4gICAgdGhpcy5zdHJWYWx1ZSA9IHNlbGVjdG9ycy5tYXAoc2VsZWN0b3IgPT4gc2VsZWN0b3Iuc3RyVmFsdWUpLmpvaW4oJywnKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc1NlbGVjdG9yUnVsZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzRGVmaW5pdGlvbkFzdCBleHRlbmRzIENzc0FzdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgbG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHByb3BlcnR5OiBDc3NUb2tlbiwgcHVibGljIHZhbHVlOiBDc3NTdHlsZVZhbHVlQXN0KSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzRGVmaW5pdGlvbih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ3NzU2VsZWN0b3JQYXJ0QXN0IGV4dGVuZHMgQ3NzQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbikgeyBzdXBlcihsb2NhdGlvbik7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1NlbGVjdG9yQXN0IGV4dGVuZHMgQ3NzU2VsZWN0b3JQYXJ0QXN0IHtcbiAgcHVibGljIHN0clZhbHVlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBzZWxlY3RvclBhcnRzOiBDc3NTaW1wbGVTZWxlY3RvckFzdFtdKSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICAgIHRoaXMuc3RyVmFsdWUgPSBzZWxlY3RvclBhcnRzLm1hcChwYXJ0ID0+IHBhcnQuc3RyVmFsdWUpLmpvaW4oJycpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzU2VsZWN0b3IodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1NpbXBsZVNlbGVjdG9yQXN0IGV4dGVuZHMgQ3NzU2VsZWN0b3JQYXJ0QXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgdG9rZW5zOiBDc3NUb2tlbltdLCBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBwc2V1ZG9TZWxlY3RvcnM6IENzc1BzZXVkb1NlbGVjdG9yQXN0W10sIHB1YmxpYyBvcGVyYXRvcjogQ3NzVG9rZW4pIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NTaW1wbGVTZWxlY3Rvcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzUHNldWRvU2VsZWN0b3JBc3QgZXh0ZW5kcyBDc3NTZWxlY3RvclBhcnRBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGxvY2F0aW9uOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBzdHJWYWx1ZTogc3RyaW5nLCBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIHRva2VuczogQ3NzVG9rZW5bXSwgcHVibGljIGlubmVyU2VsZWN0b3JzOiBDc3NTZWxlY3RvckFzdFtdKSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzUHNldWRvU2VsZWN0b3IodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0Jsb2NrQXN0IGV4dGVuZHMgQ3NzQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIGVudHJpZXM6IENzc0FzdFtdKSB7IHN1cGVyKGxvY2F0aW9uKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NCbG9jayh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG4vKlxuIGEgc3R5bGUgYmxvY2sgaXMgZGlmZmVyZW50IGZyb20gYSBzdGFuZGFyZCBibG9jayBiZWNhdXNlIGl0IGNvbnRhaW5zXG4gY3NzIHByb3A6dmFsdWUgZGVmaW5pdGlvbnMuIEEgcmVndWxhciBibG9jayBjYW4gY29udGFpbiBhIGxpc3Qgb2YgQXN0IGVudHJpZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDc3NTdHlsZXNCbG9ja0FzdCBleHRlbmRzIENzc0Jsb2NrQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIGRlZmluaXRpb25zOiBDc3NEZWZpbml0aW9uQXN0W10pIHtcbiAgICBzdXBlcihsb2NhdGlvbiwgZGVmaW5pdGlvbnMpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzU3R5bGVzQmxvY2sodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1N0eWxlU2hlZXRBc3QgZXh0ZW5kcyBDc3NBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgcnVsZXM6IENzc0FzdFtdKSB7IHN1cGVyKGxvY2F0aW9uKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc1N0eWxlU2hlZXQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1Vua25vd25SdWxlQXN0IGV4dGVuZHMgQ3NzUnVsZUFzdCB7XG4gIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBydWxlTmFtZTogc3RyaW5nLCBwdWJsaWMgdG9rZW5zOiBDc3NUb2tlbltdKSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzVW5rbm93blJ1bGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1Vua25vd25Ub2tlbkxpc3RBc3QgZXh0ZW5kcyBDc3NSdWxlQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHRva2VuczogQ3NzVG9rZW5bXSkge1xuICAgIHN1cGVyKGxvY2F0aW9uKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc1Vua25vd25Ub2tlbkxpc3QodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlVG9rZW5zKHRva2VuczogQ3NzVG9rZW5bXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnJyk6IENzc1Rva2VuIHtcbiAgY29uc3QgbWFpblRva2VuID0gdG9rZW5zWzBdO1xuICBsZXQgc3RyID0gbWFpblRva2VuLnN0clZhbHVlO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHN0ciArPSBzZXBhcmF0b3IgKyB0b2tlbnNbaV0uc3RyVmFsdWU7XG4gIH1cblxuICByZXR1cm4gbmV3IENzc1Rva2VuKG1haW5Ub2tlbi5pbmRleCwgbWFpblRva2VuLmNvbHVtbiwgbWFpblRva2VuLmxpbmUsIG1haW5Ub2tlbi50eXBlLCBzdHIpO1xufVxuIl19