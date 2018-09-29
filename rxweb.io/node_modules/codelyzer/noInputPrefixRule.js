"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var sprintf_js_1 = require("sprintf-js");
var ngWalker_1 = require("./angular/ngWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new InputWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-input-prefix',
        type: 'maintainability',
        description: 'Input names should not be prefixed with the configured disallowed prefixes.',
        rationale: "HTML attributes are not prefixed. It's considered best not to prefix Inputs.\n    * Example: 'enabled' is prefered over 'isEnabled'.\n    ",
        options: {
            'type': 'array',
            'items': [
                { 'type': 'string' }
            ],
        },
        optionExamples: [
            '["is", "can", "should"]'
        ],
        optionsDescription: 'Options accept a string array of disallowed input prefixes.',
        typescriptOnly: true
    };
    Rule.FAILURE_STRING = 'In the class "%s", the input property "%s" should not be prefixed with %s';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var InputWalker = (function (_super) {
    __extends(InputWalker, _super);
    function InputWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputWalker.prototype.visitNgInput = function (property, input, args) {
        var className = property.parent.name.text;
        var memberName = property.name.text;
        var options = this.getOptions();
        var prefixLength;
        if (memberName) {
            var foundInvalid = options.find(function (x) { return memberName.startsWith(x); });
            prefixLength = foundInvalid ? foundInvalid.length : 0;
        }
        if (prefixLength > 0 &&
            !(memberName.length >= prefixLength + 1 && memberName[prefixLength] !== memberName[prefixLength].toUpperCase())) {
            var failureConfig = [Rule.FAILURE_STRING, className, memberName, options.join(', ')];
            var errorMessage = sprintf_js_1.sprintf.apply(null, failureConfig);
            this.addFailure(this.createFailure(property.getStart(), property.getWidth(), errorMessage));
        }
    };
    return InputWalker;
}(ngWalker_1.NgWalker));
