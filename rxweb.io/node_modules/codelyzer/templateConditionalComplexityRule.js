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
var compiler = require("@angular/compiler");
var compiler_1 = require("@angular/compiler");
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
        ruleName: 'template-conditional-complexity',
        type: 'functionality',
        description: 'The condition complexity shouldn\'t exceed a rational limit in a template.',
        rationale: 'An important complexity complicates the tests and the maintenance.',
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
            '[true, 4]'
        ],
        optionsDescription: 'Determine the maximum number of Boolean operators allowed.',
        typescriptOnly: true,
        hasFix: false
    };
    Rule.COMPLEXITY_FAILURE_STRING = 'The condition complexity (cost \'%s\') exceeded the defined limit (cost \'%s\'). The conditional expression should be move in the component\'s template.';
    Rule.COMPLEXITY_MAX = 3;
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TemplateConditionalComplexityVisitor = (function (_super) {
    __extends(TemplateConditionalComplexityVisitor, _super);
    function TemplateConditionalComplexityVisitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemplateConditionalComplexityVisitor.prototype.visitDirectiveProperty = function (prop, context) {
        if (prop.sourceSpan) {
            var directive = prop.sourceSpan.toString();
            if (directive.startsWith('*ngIf')) {
                var expr = directive.split(/\*ngIf\s*=\s*/)[1].slice(1, -1).replace(/[\n\r]/g, '');
                var expressionParser = new compiler.Parser(new compiler.Lexer());
                var ast_1 = expressionParser.parseAction(expr, null);
                var complexity = 0;
                var conditions = [];
                var condition = ast_1.ast;
                if (condition.operation) {
                    complexity++;
                    conditions.push(condition);
                }
                while (conditions.length > 0) {
                    condition = conditions.pop();
                    if (condition.operation) {
                        if (condition.left instanceof compiler_1.Binary) {
                            complexity++;
                            conditions.push(condition.left);
                        }
                        if (condition.right instanceof compiler_1.Binary) {
                            conditions.push(condition.right);
                        }
                    }
                }
                var options = this.getOptions();
                var complexityMax = options.length ? options[0] : Rule.COMPLEXITY_MAX;
                if (complexity > complexityMax) {
                    var span = prop.sourceSpan;
                    var failureConfig = [String(complexity), String(Rule.COMPLEXITY_MAX)];
                    failureConfig.unshift(Rule.COMPLEXITY_FAILURE_STRING);
                    this.addFailure(this.createFailure(span.start.offset, span.end.offset - span.start.offset, sprintf_js_1.sprintf.apply(this, failureConfig)));
                }
            }
        }
        _super.prototype.visitDirectiveProperty.call(this, prop, context);
    };
    return TemplateConditionalComplexityVisitor;
}(basicTemplateAstVisitor_1.BasicTemplateAstVisitor));
