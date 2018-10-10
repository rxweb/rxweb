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
var basicTemplateAstVisitor_1 = require("./angular/templates/basicTemplateAstVisitor");
var ngWalker_1 = require("./angular/ngWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: TemplateConditionalComplexityVisitor,
        }));
    };
    Rule.metadata = {
        ruleName: 'template-cyclomatic-complexity',
        type: 'functionality',
        description: 'Checks cyclomatic complexity against a specified limit. It is a quantitative measure of the number of linearly independent paths through a program\'s source code',
        rationale: 'Cyclomatic complexity over some threshold indicates that the logic should be moved outside the template.',
        options: {
            type: 'array',
            items: {
                type: 'string'
            },
            minLength: 0,
            maxLength: 2,
        },
        optionExamples: [
            'true',
            '[true, 6]'
        ],
        optionsDescription: 'Determine the maximum number of the cyclomatic complexity.',
        typescriptOnly: true,
        hasFix: false
    };
    Rule.COMPLEXITY_FAILURE_STRING = 'The cyclomatic complexity exceeded the defined limit (cost \'%s\'). Your template should be refactored.';
    Rule.COMPLEXITY_MAX = 5;
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TemplateConditionalComplexityVisitor = (function (_super) {
    __extends(TemplateConditionalComplexityVisitor, _super);
    function TemplateConditionalComplexityVisitor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.complexity = 0;
        return _this;
    }
    TemplateConditionalComplexityVisitor.prototype.visitDirectiveProperty = function (prop, context) {
        if (prop.sourceSpan) {
            var directive = prop.sourceSpan.toString();
            if (directive.startsWith('*ngFor') || directive.startsWith('*ngIf') ||
                directive.startsWith('*ngSwitchCase') || directive.startsWith('*ngSwitchDefault')) {
                this.complexity++;
            }
        }
        var options = this.getOptions();
        var complexityMax = options.length ? options[0] : Rule.COMPLEXITY_MAX;
        if (this.complexity > complexityMax) {
            var span = prop.sourceSpan;
            var failureConfig = [String(Rule.COMPLEXITY_MAX)];
            failureConfig.unshift(Rule.COMPLEXITY_FAILURE_STRING);
            this.addFailure(this.createFailure(span.start.offset, span.end.offset - span.start.offset, sprintf_js_1.sprintf.apply(this, failureConfig)));
        }
        _super.prototype.visitDirectiveProperty.call(this, prop, context);
    };
    return TemplateConditionalComplexityVisitor;
}(basicTemplateAstVisitor_1.BasicTemplateAstVisitor));
