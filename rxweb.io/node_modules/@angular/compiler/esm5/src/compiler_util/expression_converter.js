/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import * as cdAst from '../expression_parser/ast';
import { Identifiers } from '../identifiers';
import * as o from '../output/output_ast';
var EventHandlerVars = /** @class */ (function () {
    function EventHandlerVars() {
    }
    EventHandlerVars.event = o.variable('$event');
    return EventHandlerVars;
}());
export { EventHandlerVars };
var ConvertActionBindingResult = /** @class */ (function () {
    function ConvertActionBindingResult(
    /**
     * Render2 compatible statements,
     */
    stmts, 
    /**
     * Variable name used with render2 compatible statements.
     */
    allowDefault) {
        this.stmts = stmts;
        this.allowDefault = allowDefault;
        /**
         * This is bit of a hack. It converts statements which render2 expects to statements which are
         * expected by render3.
         *
         * Example: `<div click="doSomething($event)">` will generate:
         *
         * Render3:
         * ```
         * const pd_b:any = ((<any>ctx.doSomething($event)) !== false);
         * return pd_b;
         * ```
         *
         * but render2 expects:
         * ```
         * return ctx.doSomething($event);
         * ```
         */
        // TODO(misko): remove this hack once we no longer support ViewEngine.
        this.render3Stmts = stmts.map(function (statement) {
            if (statement instanceof o.DeclareVarStmt && statement.name == allowDefault.name &&
                statement.value instanceof o.BinaryOperatorExpr) {
                var lhs = statement.value.lhs;
                return new o.ReturnStatement(lhs.value);
            }
            return statement;
        });
    }
    return ConvertActionBindingResult;
}());
export { ConvertActionBindingResult };
/**
 * Converts the given expression AST into an executable output AST, assuming the expression is
 * used in an action binding (e.g. an event handler).
 */
export function convertActionBinding(localResolver, implicitReceiver, action, bindingId, interpolationFunction) {
    if (!localResolver) {
        localResolver = new DefaultLocalResolver();
    }
    var actionWithoutBuiltins = convertPropertyBindingBuiltins({
        createLiteralArrayConverter: function (argCount) {
            // Note: no caching for literal arrays in actions.
            return function (args) { return o.literalArr(args); };
        },
        createLiteralMapConverter: function (keys) {
            // Note: no caching for literal maps in actions.
            return function (values) {
                var entries = keys.map(function (k, i) { return ({
                    key: k.key,
                    value: values[i],
                    quoted: k.quoted,
                }); });
                return o.literalMap(entries);
            };
        },
        createPipeConverter: function (name) {
            throw new Error("Illegal State: Actions are not allowed to contain pipes. Pipe: " + name);
        }
    }, action);
    var visitor = new _AstToIrVisitor(localResolver, implicitReceiver, bindingId, interpolationFunction);
    var actionStmts = [];
    flattenStatements(actionWithoutBuiltins.visit(visitor, _Mode.Statement), actionStmts);
    prependTemporaryDecls(visitor.temporaryCount, bindingId, actionStmts);
    var lastIndex = actionStmts.length - 1;
    var preventDefaultVar = null;
    if (lastIndex >= 0) {
        var lastStatement = actionStmts[lastIndex];
        var returnExpr = convertStmtIntoExpression(lastStatement);
        if (returnExpr) {
            // Note: We need to cast the result of the method call to dynamic,
            // as it might be a void method!
            preventDefaultVar = createPreventDefaultVar(bindingId);
            actionStmts[lastIndex] =
                preventDefaultVar.set(returnExpr.cast(o.DYNAMIC_TYPE).notIdentical(o.literal(false)))
                    .toDeclStmt(null, [o.StmtModifier.Final]);
        }
    }
    return new ConvertActionBindingResult(actionStmts, preventDefaultVar);
}
export function convertPropertyBindingBuiltins(converterFactory, ast) {
    return convertBuiltins(converterFactory, ast);
}
var ConvertPropertyBindingResult = /** @class */ (function () {
    function ConvertPropertyBindingResult(stmts, currValExpr) {
        this.stmts = stmts;
        this.currValExpr = currValExpr;
    }
    return ConvertPropertyBindingResult;
}());
export { ConvertPropertyBindingResult };
export var BindingForm;
(function (BindingForm) {
    // The general form of binding expression, supports all expressions.
    BindingForm[BindingForm["General"] = 0] = "General";
    // Try to generate a simple binding (no temporaries or statements)
    // otherwise generate a general binding
    BindingForm[BindingForm["TrySimple"] = 1] = "TrySimple";
})(BindingForm || (BindingForm = {}));
/**
 * Converts the given expression AST into an executable output AST, assuming the expression
 * is used in property binding. The expression has to be preprocessed via
 * `convertPropertyBindingBuiltins`.
 */
export function convertPropertyBinding(localResolver, implicitReceiver, expressionWithoutBuiltins, bindingId, form, interpolationFunction) {
    if (!localResolver) {
        localResolver = new DefaultLocalResolver();
    }
    var currValExpr = createCurrValueExpr(bindingId);
    var stmts = [];
    var visitor = new _AstToIrVisitor(localResolver, implicitReceiver, bindingId, interpolationFunction);
    var outputExpr = expressionWithoutBuiltins.visit(visitor, _Mode.Expression);
    if (visitor.temporaryCount) {
        for (var i = 0; i < visitor.temporaryCount; i++) {
            stmts.push(temporaryDeclaration(bindingId, i));
        }
    }
    else if (form == BindingForm.TrySimple) {
        return new ConvertPropertyBindingResult([], outputExpr);
    }
    stmts.push(currValExpr.set(outputExpr).toDeclStmt(o.DYNAMIC_TYPE, [o.StmtModifier.Final]));
    return new ConvertPropertyBindingResult(stmts, currValExpr);
}
function convertBuiltins(converterFactory, ast) {
    var visitor = new _BuiltinAstConverter(converterFactory);
    return ast.visit(visitor);
}
function temporaryName(bindingId, temporaryNumber) {
    return "tmp_" + bindingId + "_" + temporaryNumber;
}
export function temporaryDeclaration(bindingId, temporaryNumber) {
    return new o.DeclareVarStmt(temporaryName(bindingId, temporaryNumber), o.NULL_EXPR);
}
function prependTemporaryDecls(temporaryCount, bindingId, statements) {
    for (var i = temporaryCount - 1; i >= 0; i--) {
        statements.unshift(temporaryDeclaration(bindingId, i));
    }
}
var _Mode;
(function (_Mode) {
    _Mode[_Mode["Statement"] = 0] = "Statement";
    _Mode[_Mode["Expression"] = 1] = "Expression";
})(_Mode || (_Mode = {}));
function ensureStatementMode(mode, ast) {
    if (mode !== _Mode.Statement) {
        throw new Error("Expected a statement, but saw " + ast);
    }
}
function ensureExpressionMode(mode, ast) {
    if (mode !== _Mode.Expression) {
        throw new Error("Expected an expression, but saw " + ast);
    }
}
function convertToStatementIfNeeded(mode, expr) {
    if (mode === _Mode.Statement) {
        return expr.toStmt();
    }
    else {
        return expr;
    }
}
var _BuiltinAstConverter = /** @class */ (function (_super) {
    tslib_1.__extends(_BuiltinAstConverter, _super);
    function _BuiltinAstConverter(_converterFactory) {
        var _this = _super.call(this) || this;
        _this._converterFactory = _converterFactory;
        return _this;
    }
    _BuiltinAstConverter.prototype.visitPipe = function (ast, context) {
        var _this = this;
        var args = tslib_1.__spread([ast.exp], ast.args).map(function (ast) { return ast.visit(_this, context); });
        return new BuiltinFunctionCall(ast.span, args, this._converterFactory.createPipeConverter(ast.name, args.length));
    };
    _BuiltinAstConverter.prototype.visitLiteralArray = function (ast, context) {
        var _this = this;
        var args = ast.expressions.map(function (ast) { return ast.visit(_this, context); });
        return new BuiltinFunctionCall(ast.span, args, this._converterFactory.createLiteralArrayConverter(ast.expressions.length));
    };
    _BuiltinAstConverter.prototype.visitLiteralMap = function (ast, context) {
        var _this = this;
        var args = ast.values.map(function (ast) { return ast.visit(_this, context); });
        return new BuiltinFunctionCall(ast.span, args, this._converterFactory.createLiteralMapConverter(ast.keys));
    };
    return _BuiltinAstConverter;
}(cdAst.AstTransformer));
var _AstToIrVisitor = /** @class */ (function () {
    function _AstToIrVisitor(_localResolver, _implicitReceiver, bindingId, interpolationFunction) {
        this._localResolver = _localResolver;
        this._implicitReceiver = _implicitReceiver;
        this.bindingId = bindingId;
        this.interpolationFunction = interpolationFunction;
        this._nodeMap = new Map();
        this._resultMap = new Map();
        this._currentTemporary = 0;
        this.temporaryCount = 0;
    }
    _AstToIrVisitor.prototype.visitBinary = function (ast, mode) {
        var op;
        switch (ast.operation) {
            case '+':
                op = o.BinaryOperator.Plus;
                break;
            case '-':
                op = o.BinaryOperator.Minus;
                break;
            case '*':
                op = o.BinaryOperator.Multiply;
                break;
            case '/':
                op = o.BinaryOperator.Divide;
                break;
            case '%':
                op = o.BinaryOperator.Modulo;
                break;
            case '&&':
                op = o.BinaryOperator.And;
                break;
            case '||':
                op = o.BinaryOperator.Or;
                break;
            case '==':
                op = o.BinaryOperator.Equals;
                break;
            case '!=':
                op = o.BinaryOperator.NotEquals;
                break;
            case '===':
                op = o.BinaryOperator.Identical;
                break;
            case '!==':
                op = o.BinaryOperator.NotIdentical;
                break;
            case '<':
                op = o.BinaryOperator.Lower;
                break;
            case '>':
                op = o.BinaryOperator.Bigger;
                break;
            case '<=':
                op = o.BinaryOperator.LowerEquals;
                break;
            case '>=':
                op = o.BinaryOperator.BiggerEquals;
                break;
            default:
                throw new Error("Unsupported operation " + ast.operation);
        }
        return convertToStatementIfNeeded(mode, new o.BinaryOperatorExpr(op, this._visit(ast.left, _Mode.Expression), this._visit(ast.right, _Mode.Expression)));
    };
    _AstToIrVisitor.prototype.visitChain = function (ast, mode) {
        ensureStatementMode(mode, ast);
        return this.visitAll(ast.expressions, mode);
    };
    _AstToIrVisitor.prototype.visitConditional = function (ast, mode) {
        var value = this._visit(ast.condition, _Mode.Expression);
        return convertToStatementIfNeeded(mode, value.conditional(this._visit(ast.trueExp, _Mode.Expression), this._visit(ast.falseExp, _Mode.Expression)));
    };
    _AstToIrVisitor.prototype.visitPipe = function (ast, mode) {
        throw new Error("Illegal state: Pipes should have been converted into functions. Pipe: " + ast.name);
    };
    _AstToIrVisitor.prototype.visitFunctionCall = function (ast, mode) {
        var convertedArgs = this.visitAll(ast.args, _Mode.Expression);
        var fnResult;
        if (ast instanceof BuiltinFunctionCall) {
            fnResult = ast.converter(convertedArgs);
        }
        else {
            fnResult = this._visit(ast.target, _Mode.Expression).callFn(convertedArgs);
        }
        return convertToStatementIfNeeded(mode, fnResult);
    };
    _AstToIrVisitor.prototype.visitImplicitReceiver = function (ast, mode) {
        ensureExpressionMode(mode, ast);
        return this._implicitReceiver;
    };
    _AstToIrVisitor.prototype.visitInterpolation = function (ast, mode) {
        ensureExpressionMode(mode, ast);
        var args = [o.literal(ast.expressions.length)];
        for (var i = 0; i < ast.strings.length - 1; i++) {
            args.push(o.literal(ast.strings[i]));
            args.push(this._visit(ast.expressions[i], _Mode.Expression));
        }
        args.push(o.literal(ast.strings[ast.strings.length - 1]));
        if (this.interpolationFunction) {
            return this.interpolationFunction(args);
        }
        return ast.expressions.length <= 9 ?
            o.importExpr(Identifiers.inlineInterpolate).callFn(args) :
            o.importExpr(Identifiers.interpolate).callFn([args[0], o.literalArr(args.slice(1))]);
    };
    _AstToIrVisitor.prototype.visitKeyedRead = function (ast, mode) {
        var leftMostSafe = this.leftMostSafeNode(ast);
        if (leftMostSafe) {
            return this.convertSafeAccess(ast, leftMostSafe, mode);
        }
        else {
            return convertToStatementIfNeeded(mode, this._visit(ast.obj, _Mode.Expression).key(this._visit(ast.key, _Mode.Expression)));
        }
    };
    _AstToIrVisitor.prototype.visitKeyedWrite = function (ast, mode) {
        var obj = this._visit(ast.obj, _Mode.Expression);
        var key = this._visit(ast.key, _Mode.Expression);
        var value = this._visit(ast.value, _Mode.Expression);
        return convertToStatementIfNeeded(mode, obj.key(key).set(value));
    };
    _AstToIrVisitor.prototype.visitLiteralArray = function (ast, mode) {
        throw new Error("Illegal State: literal arrays should have been converted into functions");
    };
    _AstToIrVisitor.prototype.visitLiteralMap = function (ast, mode) {
        throw new Error("Illegal State: literal maps should have been converted into functions");
    };
    _AstToIrVisitor.prototype.visitLiteralPrimitive = function (ast, mode) {
        // For literal values of null, undefined, true, or false allow type interference
        // to infer the type.
        var type = ast.value === null || ast.value === undefined || ast.value === true || ast.value === true ?
            o.INFERRED_TYPE :
            undefined;
        return convertToStatementIfNeeded(mode, o.literal(ast.value, type));
    };
    _AstToIrVisitor.prototype._getLocal = function (name) { return this._localResolver.getLocal(name); };
    _AstToIrVisitor.prototype.visitMethodCall = function (ast, mode) {
        if (ast.receiver instanceof cdAst.ImplicitReceiver && ast.name == '$any') {
            var args = this.visitAll(ast.args, _Mode.Expression);
            if (args.length != 1) {
                throw new Error("Invalid call to $any, expected 1 argument but received " + (args.length || 'none'));
            }
            return args[0].cast(o.DYNAMIC_TYPE);
        }
        var leftMostSafe = this.leftMostSafeNode(ast);
        if (leftMostSafe) {
            return this.convertSafeAccess(ast, leftMostSafe, mode);
        }
        else {
            var args = this.visitAll(ast.args, _Mode.Expression);
            var result = null;
            var receiver = this._visit(ast.receiver, _Mode.Expression);
            if (receiver === this._implicitReceiver) {
                var varExpr = this._getLocal(ast.name);
                if (varExpr) {
                    result = varExpr.callFn(args);
                }
            }
            if (result == null) {
                result = receiver.callMethod(ast.name, args);
            }
            return convertToStatementIfNeeded(mode, result);
        }
    };
    _AstToIrVisitor.prototype.visitPrefixNot = function (ast, mode) {
        return convertToStatementIfNeeded(mode, o.not(this._visit(ast.expression, _Mode.Expression)));
    };
    _AstToIrVisitor.prototype.visitNonNullAssert = function (ast, mode) {
        return convertToStatementIfNeeded(mode, o.assertNotNull(this._visit(ast.expression, _Mode.Expression)));
    };
    _AstToIrVisitor.prototype.visitPropertyRead = function (ast, mode) {
        var leftMostSafe = this.leftMostSafeNode(ast);
        if (leftMostSafe) {
            return this.convertSafeAccess(ast, leftMostSafe, mode);
        }
        else {
            var result = null;
            var receiver = this._visit(ast.receiver, _Mode.Expression);
            if (receiver === this._implicitReceiver) {
                result = this._getLocal(ast.name);
            }
            if (result == null) {
                result = receiver.prop(ast.name);
            }
            return convertToStatementIfNeeded(mode, result);
        }
    };
    _AstToIrVisitor.prototype.visitPropertyWrite = function (ast, mode) {
        var receiver = this._visit(ast.receiver, _Mode.Expression);
        if (receiver === this._implicitReceiver) {
            var varExpr = this._getLocal(ast.name);
            if (varExpr) {
                throw new Error('Cannot assign to a reference or variable!');
            }
        }
        return convertToStatementIfNeeded(mode, receiver.prop(ast.name).set(this._visit(ast.value, _Mode.Expression)));
    };
    _AstToIrVisitor.prototype.visitSafePropertyRead = function (ast, mode) {
        return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
    };
    _AstToIrVisitor.prototype.visitSafeMethodCall = function (ast, mode) {
        return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
    };
    _AstToIrVisitor.prototype.visitAll = function (asts, mode) {
        var _this = this;
        return asts.map(function (ast) { return _this._visit(ast, mode); });
    };
    _AstToIrVisitor.prototype.visitQuote = function (ast, mode) {
        throw new Error("Quotes are not supported for evaluation!\n        Statement: " + ast.uninterpretedExpression + " located at " + ast.location);
    };
    _AstToIrVisitor.prototype._visit = function (ast, mode) {
        var result = this._resultMap.get(ast);
        if (result)
            return result;
        return (this._nodeMap.get(ast) || ast).visit(this, mode);
    };
    _AstToIrVisitor.prototype.convertSafeAccess = function (ast, leftMostSafe, mode) {
        // If the expression contains a safe access node on the left it needs to be converted to
        // an expression that guards the access to the member by checking the receiver for blank. As
        // execution proceeds from left to right, the left most part of the expression must be guarded
        // first but, because member access is left associative, the right side of the expression is at
        // the top of the AST. The desired result requires lifting a copy of the the left part of the
        // expression up to test it for blank before generating the unguarded version.
        // Consider, for example the following expression: a?.b.c?.d.e
        // This results in the ast:
        //         .
        //        / \
        //       ?.   e
        //      /  \
        //     .    d
        //    / \
        //   ?.  c
        //  /  \
        // a    b
        // The following tree should be generated:
        //
        //        /---- ? ----\
        //       /      |      \
        //     a   /--- ? ---\  null
        //        /     |     \
        //       .      .     null
        //      / \    / \
        //     .  c   .   e
        //    / \    / \
        //   a   b  ,   d
        //         / \
        //        .   c
        //       / \
        //      a   b
        //
        // Notice that the first guard condition is the left hand of the left most safe access node
        // which comes in as leftMostSafe to this routine.
        var guardedExpression = this._visit(leftMostSafe.receiver, _Mode.Expression);
        var temporary = undefined;
        if (this.needsTemporary(leftMostSafe.receiver)) {
            // If the expression has method calls or pipes then we need to save the result into a
            // temporary variable to avoid calling stateful or impure code more than once.
            temporary = this.allocateTemporary();
            // Preserve the result in the temporary variable
            guardedExpression = temporary.set(guardedExpression);
            // Ensure all further references to the guarded expression refer to the temporary instead.
            this._resultMap.set(leftMostSafe.receiver, temporary);
        }
        var condition = guardedExpression.isBlank();
        // Convert the ast to an unguarded access to the receiver's member. The map will substitute
        // leftMostNode with its unguarded version in the call to `this.visit()`.
        if (leftMostSafe instanceof cdAst.SafeMethodCall) {
            this._nodeMap.set(leftMostSafe, new cdAst.MethodCall(leftMostSafe.span, leftMostSafe.receiver, leftMostSafe.name, leftMostSafe.args));
        }
        else {
            this._nodeMap.set(leftMostSafe, new cdAst.PropertyRead(leftMostSafe.span, leftMostSafe.receiver, leftMostSafe.name));
        }
        // Recursively convert the node now without the guarded member access.
        var access = this._visit(ast, _Mode.Expression);
        // Remove the mapping. This is not strictly required as the converter only traverses each node
        // once but is safer if the conversion is changed to traverse the nodes more than once.
        this._nodeMap.delete(leftMostSafe);
        // If we allocated a temporary, release it.
        if (temporary) {
            this.releaseTemporary(temporary);
        }
        // Produce the conditional
        return convertToStatementIfNeeded(mode, condition.conditional(o.literal(null), access));
    };
    // Given a expression of the form a?.b.c?.d.e the the left most safe node is
    // the (a?.b). The . and ?. are left associative thus can be rewritten as:
    // ((((a?.c).b).c)?.d).e. This returns the most deeply nested safe read or
    // safe method call as this needs be transform initially to:
    //   a == null ? null : a.c.b.c?.d.e
    // then to:
    //   a == null ? null : a.b.c == null ? null : a.b.c.d.e
    _AstToIrVisitor.prototype.leftMostSafeNode = function (ast) {
        var _this = this;
        var visit = function (visitor, ast) {
            return (_this._nodeMap.get(ast) || ast).visit(visitor);
        };
        return ast.visit({
            visitBinary: function (ast) { return null; },
            visitChain: function (ast) { return null; },
            visitConditional: function (ast) { return null; },
            visitFunctionCall: function (ast) { return null; },
            visitImplicitReceiver: function (ast) { return null; },
            visitInterpolation: function (ast) { return null; },
            visitKeyedRead: function (ast) { return visit(this, ast.obj); },
            visitKeyedWrite: function (ast) { return null; },
            visitLiteralArray: function (ast) { return null; },
            visitLiteralMap: function (ast) { return null; },
            visitLiteralPrimitive: function (ast) { return null; },
            visitMethodCall: function (ast) { return visit(this, ast.receiver); },
            visitPipe: function (ast) { return null; },
            visitPrefixNot: function (ast) { return null; },
            visitNonNullAssert: function (ast) { return null; },
            visitPropertyRead: function (ast) { return visit(this, ast.receiver); },
            visitPropertyWrite: function (ast) { return null; },
            visitQuote: function (ast) { return null; },
            visitSafeMethodCall: function (ast) { return visit(this, ast.receiver) || ast; },
            visitSafePropertyRead: function (ast) {
                return visit(this, ast.receiver) || ast;
            }
        });
    };
    // Returns true of the AST includes a method or a pipe indicating that, if the
    // expression is used as the target of a safe property or method access then
    // the expression should be stored into a temporary variable.
    _AstToIrVisitor.prototype.needsTemporary = function (ast) {
        var _this = this;
        var visit = function (visitor, ast) {
            return ast && (_this._nodeMap.get(ast) || ast).visit(visitor);
        };
        var visitSome = function (visitor, ast) {
            return ast.some(function (ast) { return visit(visitor, ast); });
        };
        return ast.visit({
            visitBinary: function (ast) { return visit(this, ast.left) || visit(this, ast.right); },
            visitChain: function (ast) { return false; },
            visitConditional: function (ast) {
                return visit(this, ast.condition) || visit(this, ast.trueExp) ||
                    visit(this, ast.falseExp);
            },
            visitFunctionCall: function (ast) { return true; },
            visitImplicitReceiver: function (ast) { return false; },
            visitInterpolation: function (ast) { return visitSome(this, ast.expressions); },
            visitKeyedRead: function (ast) { return false; },
            visitKeyedWrite: function (ast) { return false; },
            visitLiteralArray: function (ast) { return true; },
            visitLiteralMap: function (ast) { return true; },
            visitLiteralPrimitive: function (ast) { return false; },
            visitMethodCall: function (ast) { return true; },
            visitPipe: function (ast) { return true; },
            visitPrefixNot: function (ast) { return visit(this, ast.expression); },
            visitNonNullAssert: function (ast) { return visit(this, ast.expression); },
            visitPropertyRead: function (ast) { return false; },
            visitPropertyWrite: function (ast) { return false; },
            visitQuote: function (ast) { return false; },
            visitSafeMethodCall: function (ast) { return true; },
            visitSafePropertyRead: function (ast) { return false; }
        });
    };
    _AstToIrVisitor.prototype.allocateTemporary = function () {
        var tempNumber = this._currentTemporary++;
        this.temporaryCount = Math.max(this._currentTemporary, this.temporaryCount);
        return new o.ReadVarExpr(temporaryName(this.bindingId, tempNumber));
    };
    _AstToIrVisitor.prototype.releaseTemporary = function (temporary) {
        this._currentTemporary--;
        if (temporary.name != temporaryName(this.bindingId, this._currentTemporary)) {
            throw new Error("Temporary " + temporary.name + " released out of order");
        }
    };
    return _AstToIrVisitor;
}());
function flattenStatements(arg, output) {
    if (Array.isArray(arg)) {
        arg.forEach(function (entry) { return flattenStatements(entry, output); });
    }
    else {
        output.push(arg);
    }
}
var DefaultLocalResolver = /** @class */ (function () {
    function DefaultLocalResolver() {
    }
    DefaultLocalResolver.prototype.getLocal = function (name) {
        if (name === EventHandlerVars.event.name) {
            return EventHandlerVars.event;
        }
        return null;
    };
    return DefaultLocalResolver;
}());
function createCurrValueExpr(bindingId) {
    return o.variable("currVal_" + bindingId); // fix syntax highlighting: `
}
function createPreventDefaultVar(bindingId) {
    return o.variable("pd_" + bindingId);
}
function convertStmtIntoExpression(stmt) {
    if (stmt instanceof o.ExpressionStatement) {
        return stmt.expr;
    }
    else if (stmt instanceof o.ReturnStatement) {
        return stmt.value;
    }
    return null;
}
var BuiltinFunctionCall = /** @class */ (function (_super) {
    tslib_1.__extends(BuiltinFunctionCall, _super);
    function BuiltinFunctionCall(span, args, converter) {
        var _this = _super.call(this, span, null, args) || this;
        _this.args = args;
        _this.converter = converter;
        return _this;
    }
    return BuiltinFunctionCall;
}(cdAst.FunctionCall));
export { BuiltinFunctionCall };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbl9jb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvY29tcGlsZXJfdXRpbC9leHByZXNzaW9uX2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxLQUFLLEtBQUssTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxQztJQUFBO0lBQXFFLENBQUM7SUFBL0Isc0JBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQUMsdUJBQUM7Q0FBQSxBQUF0RSxJQUFzRTtTQUF6RCxnQkFBZ0I7QUFJN0I7SUFLRTtJQUNJOztPQUVHO0lBQ0ksS0FBb0I7SUFDM0I7O09BRUc7SUFDSSxZQUEyQjtRQUozQixVQUFLLEdBQUwsS0FBSyxDQUFlO1FBSXBCLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JHO1FBQ0gsc0VBQXNFO1FBQ3RFLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFNBQXNCO1lBQ25ELElBQUksU0FBUyxZQUFZLENBQUMsQ0FBQyxjQUFjLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSTtnQkFDNUUsU0FBUyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ25ELElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBaUIsQ0FBQztnQkFDOUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsT0FBTyxT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ZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgY2RBc3QgZnJvbSAnLi4vZXhwcmVzc2lvbl9wYXJzZXIvYXN0JztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4uL2lkZW50aWZpZXJzJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRIYW5kbGVyVmFycyB7IHN0YXRpYyBldmVudCA9IG8udmFyaWFibGUoJyRldmVudCcpOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYWxSZXNvbHZlciB7IGdldExvY2FsKG5hbWU6IHN0cmluZyk6IG8uRXhwcmVzc2lvbnxudWxsOyB9XG5cbmV4cG9ydCBjbGFzcyBDb252ZXJ0QWN0aW9uQmluZGluZ1Jlc3VsdCB7XG4gIC8qKlxuICAgKiBTdG9yZSBzdGF0ZW1lbnRzIHdoaWNoIGFyZSByZW5kZXIzIGNvbXBhdGlibGUuXG4gICAqL1xuICByZW5kZXIzU3RtdHM6IG8uU3RhdGVtZW50W107XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqXG4gICAgICAgKiBSZW5kZXIyIGNvbXBhdGlibGUgc3RhdGVtZW50cyxcbiAgICAgICAqL1xuICAgICAgcHVibGljIHN0bXRzOiBvLlN0YXRlbWVudFtdLFxuICAgICAgLyoqXG4gICAgICAgKiBWYXJpYWJsZSBuYW1lIHVzZWQgd2l0aCByZW5kZXIyIGNvbXBhdGlibGUgc3RhdGVtZW50cy5cbiAgICAgICAqL1xuICAgICAgcHVibGljIGFsbG93RGVmYXVsdDogby5SZWFkVmFyRXhwcikge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgYml0IG9mIGEgaGFjay4gSXQgY29udmVydHMgc3RhdGVtZW50cyB3aGljaCByZW5kZXIyIGV4cGVjdHMgdG8gc3RhdGVtZW50cyB3aGljaCBhcmVcbiAgICAgKiBleHBlY3RlZCBieSByZW5kZXIzLlxuICAgICAqXG4gICAgICogRXhhbXBsZTogYDxkaXYgY2xpY2s9XCJkb1NvbWV0aGluZygkZXZlbnQpXCI+YCB3aWxsIGdlbmVyYXRlOlxuICAgICAqXG4gICAgICogUmVuZGVyMzpcbiAgICAgKiBgYGBcbiAgICAgKiBjb25zdCBwZF9iOmFueSA9ICgoPGFueT5jdHguZG9Tb21ldGhpbmcoJGV2ZW50KSkgIT09IGZhbHNlKTtcbiAgICAgKiByZXR1cm4gcGRfYjtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIGJ1dCByZW5kZXIyIGV4cGVjdHM6XG4gICAgICogYGBgXG4gICAgICogcmV0dXJuIGN0eC5kb1NvbWV0aGluZygkZXZlbnQpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIC8vIFRPRE8obWlza28pOiByZW1vdmUgdGhpcyBoYWNrIG9uY2Ugd2Ugbm8gbG9uZ2VyIHN1cHBvcnQgVmlld0VuZ2luZS5cbiAgICB0aGlzLnJlbmRlcjNTdG10cyA9IHN0bXRzLm1hcCgoc3RhdGVtZW50OiBvLlN0YXRlbWVudCkgPT4ge1xuICAgICAgaWYgKHN0YXRlbWVudCBpbnN0YW5jZW9mIG8uRGVjbGFyZVZhclN0bXQgJiYgc3RhdGVtZW50Lm5hbWUgPT0gYWxsb3dEZWZhdWx0Lm5hbWUgJiZcbiAgICAgICAgICBzdGF0ZW1lbnQudmFsdWUgaW5zdGFuY2VvZiBvLkJpbmFyeU9wZXJhdG9yRXhwcikge1xuICAgICAgICBjb25zdCBsaHMgPSBzdGF0ZW1lbnQudmFsdWUubGhzIGFzIG8uQ2FzdEV4cHI7XG4gICAgICAgIHJldHVybiBuZXcgby5SZXR1cm5TdGF0ZW1lbnQobGhzLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZW1lbnQ7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgSW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gKGFyZ3M6IG8uRXhwcmVzc2lvbltdKSA9PiBvLkV4cHJlc3Npb247XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGdpdmVuIGV4cHJlc3Npb24gQVNUIGludG8gYW4gZXhlY3V0YWJsZSBvdXRwdXQgQVNULCBhc3N1bWluZyB0aGUgZXhwcmVzc2lvbiBpc1xuICogdXNlZCBpbiBhbiBhY3Rpb24gYmluZGluZyAoZS5nLiBhbiBldmVudCBoYW5kbGVyKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRBY3Rpb25CaW5kaW5nKFxuICAgIGxvY2FsUmVzb2x2ZXI6IExvY2FsUmVzb2x2ZXIgfCBudWxsLCBpbXBsaWNpdFJlY2VpdmVyOiBvLkV4cHJlc3Npb24sIGFjdGlvbjogY2RBc3QuQVNULFxuICAgIGJpbmRpbmdJZDogc3RyaW5nLCBpbnRlcnBvbGF0aW9uRnVuY3Rpb24/OiBJbnRlcnBvbGF0aW9uRnVuY3Rpb24pOiBDb252ZXJ0QWN0aW9uQmluZGluZ1Jlc3VsdCB7XG4gIGlmICghbG9jYWxSZXNvbHZlcikge1xuICAgIGxvY2FsUmVzb2x2ZXIgPSBuZXcgRGVmYXVsdExvY2FsUmVzb2x2ZXIoKTtcbiAgfVxuICBjb25zdCBhY3Rpb25XaXRob3V0QnVpbHRpbnMgPSBjb252ZXJ0UHJvcGVydHlCaW5kaW5nQnVpbHRpbnMoXG4gICAgICB7XG4gICAgICAgIGNyZWF0ZUxpdGVyYWxBcnJheUNvbnZlcnRlcjogKGFyZ0NvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAvLyBOb3RlOiBubyBjYWNoaW5nIGZvciBsaXRlcmFsIGFycmF5cyBpbiBhY3Rpb25zLlxuICAgICAgICAgIHJldHVybiAoYXJnczogby5FeHByZXNzaW9uW10pID0+IG8ubGl0ZXJhbEFycihhcmdzKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlTGl0ZXJhbE1hcENvbnZlcnRlcjogKGtleXM6IHtrZXk6IHN0cmluZywgcXVvdGVkOiBib29sZWFufVtdKSA9PiB7XG4gICAgICAgICAgLy8gTm90ZTogbm8gY2FjaGluZyBmb3IgbGl0ZXJhbCBtYXBzIGluIGFjdGlvbnMuXG4gICAgICAgICAgcmV0dXJuICh2YWx1ZXM6IG8uRXhwcmVzc2lvbltdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyaWVzID0ga2V5cy5tYXAoKGssIGkpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGsua2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1b3RlZDogay5xdW90ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIG8ubGl0ZXJhbE1hcChlbnRyaWVzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVQaXBlQ29udmVydGVyOiAobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbGxlZ2FsIFN0YXRlOiBBY3Rpb25zIGFyZSBub3QgYWxsb3dlZCB0byBjb250YWluIHBpcGVzLiBQaXBlOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhY3Rpb24pO1xuXG4gIGNvbnN0IHZpc2l0b3IgPVxuICAgICAgbmV3IF9Bc3RUb0lyVmlzaXRvcihsb2NhbFJlc29sdmVyLCBpbXBsaWNpdFJlY2VpdmVyLCBiaW5kaW5nSWQsIGludGVycG9sYXRpb25GdW5jdGlvbik7XG4gIGNvbnN0IGFjdGlvblN0bXRzOiBvLlN0YXRlbWVudFtdID0gW107XG4gIGZsYXR0ZW5TdGF0ZW1lbnRzKGFjdGlvbldpdGhvdXRCdWlsdGlucy52aXNpdCh2aXNpdG9yLCBfTW9kZS5TdGF0ZW1lbnQpLCBhY3Rpb25TdG10cyk7XG4gIHByZXBlbmRUZW1wb3JhcnlEZWNscyh2aXNpdG9yLnRlbXBvcmFyeUNvdW50LCBiaW5kaW5nSWQsIGFjdGlvblN0bXRzKTtcbiAgY29uc3QgbGFzdEluZGV4ID0gYWN0aW9uU3RtdHMubGVuZ3RoIC0gMTtcbiAgbGV0IHByZXZlbnREZWZhdWx0VmFyOiBvLlJlYWRWYXJFeHByID0gbnVsbCAhO1xuICBpZiAobGFzdEluZGV4ID49IDApIHtcbiAgICBjb25zdCBsYXN0U3RhdGVtZW50ID0gYWN0aW9uU3RtdHNbbGFzdEluZGV4XTtcbiAgICBjb25zdCByZXR1cm5FeHByID0gY29udmVydFN0bXRJbnRvRXhwcmVzc2lvbihsYXN0U3RhdGVtZW50KTtcbiAgICBpZiAocmV0dXJuRXhwcikge1xuICAgICAgLy8gTm90ZTogV2UgbmVlZCB0byBjYXN0IHRoZSByZXN1bHQgb2YgdGhlIG1ldGhvZCBjYWxsIHRvIGR5bmFtaWMsXG4gICAgICAvLyBhcyBpdCBtaWdodCBiZSBhIHZvaWQgbWV0aG9kIVxuICAgICAgcHJldmVudERlZmF1bHRWYXIgPSBjcmVhdGVQcmV2ZW50RGVmYXVsdFZhcihiaW5kaW5nSWQpO1xuICAgICAgYWN0aW9uU3RtdHNbbGFzdEluZGV4XSA9XG4gICAgICAgICAgcHJldmVudERlZmF1bHRWYXIuc2V0KHJldHVybkV4cHIuY2FzdChvLkRZTkFNSUNfVFlQRSkubm90SWRlbnRpY2FsKG8ubGl0ZXJhbChmYWxzZSkpKVxuICAgICAgICAgICAgICAudG9EZWNsU3RtdChudWxsLCBbby5TdG10TW9kaWZpZXIuRmluYWxdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBDb252ZXJ0QWN0aW9uQmluZGluZ1Jlc3VsdChhY3Rpb25TdG10cywgcHJldmVudERlZmF1bHRWYXIpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1aWx0aW5Db252ZXJ0ZXIgeyAoYXJnczogby5FeHByZXNzaW9uW10pOiBvLkV4cHJlc3Npb247IH1cblxuZXhwb3J0IGludGVyZmFjZSBCdWlsdGluQ29udmVydGVyRmFjdG9yeSB7XG4gIGNyZWF0ZUxpdGVyYWxBcnJheUNvbnZlcnRlcihhcmdDb3VudDogbnVtYmVyKTogQnVpbHRpbkNvbnZlcnRlcjtcbiAgY3JlYXRlTGl0ZXJhbE1hcENvbnZlcnRlcihrZXlzOiB7a2V5OiBzdHJpbmcsIHF1b3RlZDogYm9vbGVhbn1bXSk6IEJ1aWx0aW5Db252ZXJ0ZXI7XG4gIGNyZWF0ZVBpcGVDb252ZXJ0ZXIobmFtZTogc3RyaW5nLCBhcmdDb3VudDogbnVtYmVyKTogQnVpbHRpbkNvbnZlcnRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRQcm9wZXJ0eUJpbmRpbmdCdWlsdGlucyhcbiAgICBjb252ZXJ0ZXJGYWN0b3J5OiBCdWlsdGluQ29udmVydGVyRmFjdG9yeSwgYXN0OiBjZEFzdC5BU1QpOiBjZEFzdC5BU1Qge1xuICByZXR1cm4gY29udmVydEJ1aWx0aW5zKGNvbnZlcnRlckZhY3RvcnksIGFzdCk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb252ZXJ0UHJvcGVydHlCaW5kaW5nUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0bXRzOiBvLlN0YXRlbWVudFtdLCBwdWJsaWMgY3VyclZhbEV4cHI6IG8uRXhwcmVzc2lvbikge31cbn1cblxuZXhwb3J0IGVudW0gQmluZGluZ0Zvcm0ge1xuICAvLyBUaGUgZ2VuZXJhbCBmb3JtIG9mIGJpbmRpbmcgZXhwcmVzc2lvbiwgc3VwcG9ydHMgYWxsIGV4cHJlc3Npb25zLlxuICBHZW5lcmFsLFxuXG4gIC8vIFRyeSB0byBnZW5lcmF0ZSBhIHNpbXBsZSBiaW5kaW5nIChubyB0ZW1wb3JhcmllcyBvciBzdGF0ZW1lbnRzKVxuICAvLyBvdGhlcndpc2UgZ2VuZXJhdGUgYSBnZW5lcmFsIGJpbmRpbmdcbiAgVHJ5U2ltcGxlLFxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBleHByZXNzaW9uIEFTVCBpbnRvIGFuIGV4ZWN1dGFibGUgb3V0cHV0IEFTVCwgYXNzdW1pbmcgdGhlIGV4cHJlc3Npb25cbiAqIGlzIHVzZWQgaW4gcHJvcGVydHkgYmluZGluZy4gVGhlIGV4cHJlc3Npb24gaGFzIHRvIGJlIHByZXByb2Nlc3NlZCB2aWFcbiAqIGBjb252ZXJ0UHJvcGVydHlCaW5kaW5nQnVpbHRpbnNgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFByb3BlcnR5QmluZGluZyhcbiAgICBsb2NhbFJlc29sdmVyOiBMb2NhbFJlc29sdmVyIHwgbnVsbCwgaW1wbGljaXRSZWNlaXZlcjogby5FeHByZXNzaW9uLFxuICAgIGV4cHJlc3Npb25XaXRob3V0QnVpbHRpbnM6IGNkQXN0LkFTVCwgYmluZGluZ0lkOiBzdHJpbmcsIGZvcm06IEJpbmRpbmdGb3JtLFxuICAgIGludGVycG9sYXRpb25GdW5jdGlvbj86IEludGVycG9sYXRpb25GdW5jdGlvbik6IENvbnZlcnRQcm9wZXJ0eUJpbmRpbmdSZXN1bHQge1xuICBpZiAoIWxvY2FsUmVzb2x2ZXIpIHtcbiAgICBsb2NhbFJlc29sdmVyID0gbmV3IERlZmF1bHRMb2NhbFJlc29sdmVyKCk7XG4gIH1cbiAgY29uc3QgY3VyclZhbEV4cHIgPSBjcmVhdGVDdXJyVmFsdWVFeHByKGJpbmRpbmdJZCk7XG4gIGNvbnN0IHN0bXRzOiBvLlN0YXRlbWVudFtdID0gW107XG4gIGNvbnN0IHZpc2l0b3IgPVxuICAgICAgbmV3IF9Bc3RUb0lyVmlzaXRvcihsb2NhbFJlc29sdmVyLCBpbXBsaWNpdFJlY2VpdmVyLCBiaW5kaW5nSWQsIGludGVycG9sYXRpb25GdW5jdGlvbik7XG4gIGNvbnN0IG91dHB1dEV4cHI6IG8uRXhwcmVzc2lvbiA9IGV4cHJlc3Npb25XaXRob3V0QnVpbHRpbnMudmlzaXQodmlzaXRvciwgX01vZGUuRXhwcmVzc2lvbik7XG5cbiAgaWYgKHZpc2l0b3IudGVtcG9yYXJ5Q291bnQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2l0b3IudGVtcG9yYXJ5Q291bnQ7IGkrKykge1xuICAgICAgc3RtdHMucHVzaCh0ZW1wb3JhcnlEZWNsYXJhdGlvbihiaW5kaW5nSWQsIGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZm9ybSA9PSBCaW5kaW5nRm9ybS5UcnlTaW1wbGUpIHtcbiAgICByZXR1cm4gbmV3IENvbnZlcnRQcm9wZXJ0eUJpbmRpbmdSZXN1bHQoW10sIG91dHB1dEV4cHIpO1xuICB9XG5cbiAgc3RtdHMucHVzaChjdXJyVmFsRXhwci5zZXQob3V0cHV0RXhwcikudG9EZWNsU3RtdChvLkRZTkFNSUNfVFlQRSwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSkpO1xuICByZXR1cm4gbmV3IENvbnZlcnRQcm9wZXJ0eUJpbmRpbmdSZXN1bHQoc3RtdHMsIGN1cnJWYWxFeHByKTtcbn1cblxuZnVuY3Rpb24gY29udmVydEJ1aWx0aW5zKGNvbnZlcnRlckZhY3Rvcnk6IEJ1aWx0aW5Db252ZXJ0ZXJGYWN0b3J5LCBhc3Q6IGNkQXN0LkFTVCk6IGNkQXN0LkFTVCB7XG4gIGNvbnN0IHZpc2l0b3IgPSBuZXcgX0J1aWx0aW5Bc3RDb252ZXJ0ZXIoY29udmVydGVyRmFjdG9yeSk7XG4gIHJldHVybiBhc3QudmlzaXQodmlzaXRvcik7XG59XG5cbmZ1bmN0aW9uIHRlbXBvcmFyeU5hbWUoYmluZGluZ0lkOiBzdHJpbmcsIHRlbXBvcmFyeU51bWJlcjogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB0bXBfJHtiaW5kaW5nSWR9XyR7dGVtcG9yYXJ5TnVtYmVyfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wb3JhcnlEZWNsYXJhdGlvbihiaW5kaW5nSWQ6IHN0cmluZywgdGVtcG9yYXJ5TnVtYmVyOiBudW1iZXIpOiBvLlN0YXRlbWVudCB7XG4gIHJldHVybiBuZXcgby5EZWNsYXJlVmFyU3RtdCh0ZW1wb3JhcnlOYW1lKGJpbmRpbmdJZCwgdGVtcG9yYXJ5TnVtYmVyKSwgby5OVUxMX0VYUFIpO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGVtcG9yYXJ5RGVjbHMoXG4gICAgdGVtcG9yYXJ5Q291bnQ6IG51bWJlciwgYmluZGluZ0lkOiBzdHJpbmcsIHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10pIHtcbiAgZm9yIChsZXQgaSA9IHRlbXBvcmFyeUNvdW50IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBzdGF0ZW1lbnRzLnVuc2hpZnQodGVtcG9yYXJ5RGVjbGFyYXRpb24oYmluZGluZ0lkLCBpKSk7XG4gIH1cbn1cblxuZW51bSBfTW9kZSB7XG4gIFN0YXRlbWVudCxcbiAgRXhwcmVzc2lvblxufVxuXG5mdW5jdGlvbiBlbnN1cmVTdGF0ZW1lbnRNb2RlKG1vZGU6IF9Nb2RlLCBhc3Q6IGNkQXN0LkFTVCkge1xuICBpZiAobW9kZSAhPT0gX01vZGUuU3RhdGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIHN0YXRlbWVudCwgYnV0IHNhdyAke2FzdH1gKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbnN1cmVFeHByZXNzaW9uTW9kZShtb2RlOiBfTW9kZSwgYXN0OiBjZEFzdC5BU1QpIHtcbiAgaWYgKG1vZGUgIT09IF9Nb2RlLkV4cHJlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGFuIGV4cHJlc3Npb24sIGJ1dCBzYXcgJHthc3R9YCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29udmVydFRvU3RhdGVtZW50SWZOZWVkZWQobW9kZTogX01vZGUsIGV4cHI6IG8uRXhwcmVzc2lvbik6IG8uRXhwcmVzc2lvbnxvLlN0YXRlbWVudCB7XG4gIGlmIChtb2RlID09PSBfTW9kZS5TdGF0ZW1lbnQpIHtcbiAgICByZXR1cm4gZXhwci50b1N0bXQoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXhwcjtcbiAgfVxufVxuXG5jbGFzcyBfQnVpbHRpbkFzdENvbnZlcnRlciBleHRlbmRzIGNkQXN0LkFzdFRyYW5zZm9ybWVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29udmVydGVyRmFjdG9yeTogQnVpbHRpbkNvbnZlcnRlckZhY3RvcnkpIHsgc3VwZXIoKTsgfVxuICB2aXNpdFBpcGUoYXN0OiBjZEFzdC5CaW5kaW5nUGlwZSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBjb25zdCBhcmdzID0gW2FzdC5leHAsIC4uLmFzdC5hcmdzXS5tYXAoYXN0ID0+IGFzdC52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gICAgcmV0dXJuIG5ldyBCdWlsdGluRnVuY3Rpb25DYWxsKFxuICAgICAgICBhc3Quc3BhbiwgYXJncywgdGhpcy5fY29udmVydGVyRmFjdG9yeS5jcmVhdGVQaXBlQ29udmVydGVyKGFzdC5uYW1lLCBhcmdzLmxlbmd0aCkpO1xuICB9XG4gIHZpc2l0TGl0ZXJhbEFycmF5KGFzdDogY2RBc3QuTGl0ZXJhbEFycmF5LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGFyZ3MgPSBhc3QuZXhwcmVzc2lvbnMubWFwKGFzdCA9PiBhc3QudmlzaXQodGhpcywgY29udGV4dCkpO1xuICAgIHJldHVybiBuZXcgQnVpbHRpbkZ1bmN0aW9uQ2FsbChcbiAgICAgICAgYXN0LnNwYW4sIGFyZ3MsIHRoaXMuX2NvbnZlcnRlckZhY3RvcnkuY3JlYXRlTGl0ZXJhbEFycmF5Q29udmVydGVyKGFzdC5leHByZXNzaW9ucy5sZW5ndGgpKTtcbiAgfVxuICB2aXNpdExpdGVyYWxNYXAoYXN0OiBjZEFzdC5MaXRlcmFsTWFwLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGFyZ3MgPSBhc3QudmFsdWVzLm1hcChhc3QgPT4gYXN0LnZpc2l0KHRoaXMsIGNvbnRleHQpKTtcblxuICAgIHJldHVybiBuZXcgQnVpbHRpbkZ1bmN0aW9uQ2FsbChcbiAgICAgICAgYXN0LnNwYW4sIGFyZ3MsIHRoaXMuX2NvbnZlcnRlckZhY3RvcnkuY3JlYXRlTGl0ZXJhbE1hcENvbnZlcnRlcihhc3Qua2V5cykpO1xuICB9XG59XG5cbmNsYXNzIF9Bc3RUb0lyVmlzaXRvciBpbXBsZW1lbnRzIGNkQXN0LkFzdFZpc2l0b3Ige1xuICBwcml2YXRlIF9ub2RlTWFwID0gbmV3IE1hcDxjZEFzdC5BU1QsIGNkQXN0LkFTVD4oKTtcbiAgcHJpdmF0ZSBfcmVzdWx0TWFwID0gbmV3IE1hcDxjZEFzdC5BU1QsIG8uRXhwcmVzc2lvbj4oKTtcbiAgcHJpdmF0ZSBfY3VycmVudFRlbXBvcmFyeTogbnVtYmVyID0gMDtcbiAgcHVibGljIHRlbXBvcmFyeUNvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfbG9jYWxSZXNvbHZlcjogTG9jYWxSZXNvbHZlciwgcHJpdmF0ZSBfaW1wbGljaXRSZWNlaXZlcjogby5FeHByZXNzaW9uLFxuICAgICAgcHJpdmF0ZSBiaW5kaW5nSWQ6IHN0cmluZywgcHJpdmF0ZSBpbnRlcnBvbGF0aW9uRnVuY3Rpb246IEludGVycG9sYXRpb25GdW5jdGlvbnx1bmRlZmluZWQpIHt9XG5cbiAgdmlzaXRCaW5hcnkoYXN0OiBjZEFzdC5CaW5hcnksIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICBsZXQgb3A6IG8uQmluYXJ5T3BlcmF0b3I7XG4gICAgc3dpdGNoIChhc3Qub3BlcmF0aW9uKSB7XG4gICAgICBjYXNlICcrJzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLlBsdXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnLSc6XG4gICAgICAgIG9wID0gby5CaW5hcnlPcGVyYXRvci5NaW51cztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICcqJzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLk11bHRpcGx5O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJy8nOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuRGl2aWRlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyUnOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuTW9kdWxvO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyYmJzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLkFuZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd8fCc6XG4gICAgICAgIG9wID0gby5CaW5hcnlPcGVyYXRvci5PcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc9PSc6XG4gICAgICAgIG9wID0gby5CaW5hcnlPcGVyYXRvci5FcXVhbHM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnIT0nOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuTm90RXF1YWxzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz09PSc6XG4gICAgICAgIG9wID0gby5CaW5hcnlPcGVyYXRvci5JZGVudGljYWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnIT09JzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLk5vdElkZW50aWNhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLkxvd2VyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz4nOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuQmlnZ2VyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLkxvd2VyRXF1YWxzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLkJpZ2dlckVxdWFscztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIG9wZXJhdGlvbiAke2FzdC5vcGVyYXRpb259YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnZlcnRUb1N0YXRlbWVudElmTmVlZGVkKFxuICAgICAgICBtb2RlLFxuICAgICAgICBuZXcgby5CaW5hcnlPcGVyYXRvckV4cHIoXG4gICAgICAgICAgICBvcCwgdGhpcy5fdmlzaXQoYXN0LmxlZnQsIF9Nb2RlLkV4cHJlc3Npb24pLCB0aGlzLl92aXNpdChhc3QucmlnaHQsIF9Nb2RlLkV4cHJlc3Npb24pKSk7XG4gIH1cblxuICB2aXNpdENoYWluKGFzdDogY2RBc3QuQ2hhaW4sIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICBlbnN1cmVTdGF0ZW1lbnRNb2RlKG1vZGUsIGFzdCk7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zLCBtb2RlKTtcbiAgfVxuXG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBjZEFzdC5Db25kaXRpb25hbCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIGNvbnN0IHZhbHVlOiBvLkV4cHJlc3Npb24gPSB0aGlzLl92aXNpdChhc3QuY29uZGl0aW9uLCBfTW9kZS5FeHByZXNzaW9uKTtcbiAgICByZXR1cm4gY29udmVydFRvU3RhdGVtZW50SWZOZWVkZWQoXG4gICAgICAgIG1vZGUsIHZhbHVlLmNvbmRpdGlvbmFsKFxuICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaXQoYXN0LnRydWVFeHAsIF9Nb2RlLkV4cHJlc3Npb24pLFxuICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaXQoYXN0LmZhbHNlRXhwLCBfTW9kZS5FeHByZXNzaW9uKSkpO1xuICB9XG5cbiAgdmlzaXRQaXBlKGFzdDogY2RBc3QuQmluZGluZ1BpcGUsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbGxlZ2FsIHN0YXRlOiBQaXBlcyBzaG91bGQgaGF2ZSBiZWVuIGNvbnZlcnRlZCBpbnRvIGZ1bmN0aW9ucy4gUGlwZTogJHthc3QubmFtZX1gKTtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogY2RBc3QuRnVuY3Rpb25DYWxsLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgY29uc3QgY29udmVydGVkQXJncyA9IHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIGxldCBmblJlc3VsdDogby5FeHByZXNzaW9uO1xuICAgIGlmIChhc3QgaW5zdGFuY2VvZiBCdWlsdGluRnVuY3Rpb25DYWxsKSB7XG4gICAgICBmblJlc3VsdCA9IGFzdC5jb252ZXJ0ZXIoY29udmVydGVkQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZuUmVzdWx0ID0gdGhpcy5fdmlzaXQoYXN0LnRhcmdldCAhLCBfTW9kZS5FeHByZXNzaW9uKS5jYWxsRm4oY29udmVydGVkQXJncyk7XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCBmblJlc3VsdCk7XG4gIH1cblxuICB2aXNpdEltcGxpY2l0UmVjZWl2ZXIoYXN0OiBjZEFzdC5JbXBsaWNpdFJlY2VpdmVyLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgZW5zdXJlRXhwcmVzc2lvbk1vZGUobW9kZSwgYXN0KTtcbiAgICByZXR1cm4gdGhpcy5faW1wbGljaXRSZWNlaXZlcjtcbiAgfVxuXG4gIHZpc2l0SW50ZXJwb2xhdGlvbihhc3Q6IGNkQXN0LkludGVycG9sYXRpb24sIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICBlbnN1cmVFeHByZXNzaW9uTW9kZShtb2RlLCBhc3QpO1xuICAgIGNvbnN0IGFyZ3MgPSBbby5saXRlcmFsKGFzdC5leHByZXNzaW9ucy5sZW5ndGgpXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFzdC5zdHJpbmdzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKG8ubGl0ZXJhbChhc3Quc3RyaW5nc1tpXSkpO1xuICAgICAgYXJncy5wdXNoKHRoaXMuX3Zpc2l0KGFzdC5leHByZXNzaW9uc1tpXSwgX01vZGUuRXhwcmVzc2lvbikpO1xuICAgIH1cbiAgICBhcmdzLnB1c2goby5saXRlcmFsKGFzdC5zdHJpbmdzW2FzdC5zdHJpbmdzLmxlbmd0aCAtIDFdKSk7XG5cbiAgICBpZiAodGhpcy5pbnRlcnBvbGF0aW9uRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVycG9sYXRpb25GdW5jdGlvbihhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdC5leHByZXNzaW9ucy5sZW5ndGggPD0gOSA/XG4gICAgICAgIG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5pbmxpbmVJbnRlcnBvbGF0ZSkuY2FsbEZuKGFyZ3MpIDpcbiAgICAgICAgby5pbXBvcnRFeHByKElkZW50aWZpZXJzLmludGVycG9sYXRlKS5jYWxsRm4oW2FyZ3NbMF0sIG8ubGl0ZXJhbEFycihhcmdzLnNsaWNlKDEpKV0pO1xuICB9XG5cbiAgdmlzaXRLZXllZFJlYWQoYXN0OiBjZEFzdC5LZXllZFJlYWQsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICBjb25zdCBsZWZ0TW9zdFNhZmUgPSB0aGlzLmxlZnRNb3N0U2FmZU5vZGUoYXN0KTtcbiAgICBpZiAobGVmdE1vc3RTYWZlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0U2FmZUFjY2Vzcyhhc3QsIGxlZnRNb3N0U2FmZSwgbW9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChcbiAgICAgICAgICBtb2RlLCB0aGlzLl92aXNpdChhc3Qub2JqLCBfTW9kZS5FeHByZXNzaW9uKS5rZXkodGhpcy5fdmlzaXQoYXN0LmtleSwgX01vZGUuRXhwcmVzc2lvbikpKTtcbiAgICB9XG4gIH1cblxuICB2aXNpdEtleWVkV3JpdGUoYXN0OiBjZEFzdC5LZXllZFdyaXRlLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgY29uc3Qgb2JqOiBvLkV4cHJlc3Npb24gPSB0aGlzLl92aXNpdChhc3Qub2JqLCBfTW9kZS5FeHByZXNzaW9uKTtcbiAgICBjb25zdCBrZXk6IG8uRXhwcmVzc2lvbiA9IHRoaXMuX3Zpc2l0KGFzdC5rZXksIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIGNvbnN0IHZhbHVlOiBvLkV4cHJlc3Npb24gPSB0aGlzLl92aXNpdChhc3QudmFsdWUsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCBvYmoua2V5KGtleSkuc2V0KHZhbHVlKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IGNkQXN0LkxpdGVyYWxBcnJheSwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSWxsZWdhbCBTdGF0ZTogbGl0ZXJhbCBhcnJheXMgc2hvdWxkIGhhdmUgYmVlbiBjb252ZXJ0ZWQgaW50byBmdW5jdGlvbnNgKTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbE1hcChhc3Q6IGNkQXN0LkxpdGVyYWxNYXAsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYElsbGVnYWwgU3RhdGU6IGxpdGVyYWwgbWFwcyBzaG91bGQgaGF2ZSBiZWVuIGNvbnZlcnRlZCBpbnRvIGZ1bmN0aW9uc2ApO1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogY2RBc3QuTGl0ZXJhbFByaW1pdGl2ZSwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIC8vIEZvciBsaXRlcmFsIHZhbHVlcyBvZiBudWxsLCB1bmRlZmluZWQsIHRydWUsIG9yIGZhbHNlIGFsbG93IHR5cGUgaW50ZXJmZXJlbmNlXG4gICAgLy8gdG8gaW5mZXIgdGhlIHR5cGUuXG4gICAgY29uc3QgdHlwZSA9XG4gICAgICAgIGFzdC52YWx1ZSA9PT0gbnVsbCB8fCBhc3QudmFsdWUgPT09IHVuZGVmaW5lZCB8fCBhc3QudmFsdWUgPT09IHRydWUgfHwgYXN0LnZhbHVlID09PSB0cnVlID9cbiAgICAgICAgby5JTkZFUlJFRF9UWVBFIDpcbiAgICAgICAgdW5kZWZpbmVkO1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCBvLmxpdGVyYWwoYXN0LnZhbHVlLCB0eXBlKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhbChuYW1lOiBzdHJpbmcpOiBvLkV4cHJlc3Npb258bnVsbCB7IHJldHVybiB0aGlzLl9sb2NhbFJlc29sdmVyLmdldExvY2FsKG5hbWUpOyB9XG5cbiAgdmlzaXRNZXRob2RDYWxsKGFzdDogY2RBc3QuTWV0aG9kQ2FsbCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIGlmIChhc3QucmVjZWl2ZXIgaW5zdGFuY2VvZiBjZEFzdC5JbXBsaWNpdFJlY2VpdmVyICYmIGFzdC5uYW1lID09ICckYW55Jykge1xuICAgICAgY29uc3QgYXJncyA9IHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIF9Nb2RlLkV4cHJlc3Npb24pIGFzIGFueVtdO1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYEludmFsaWQgY2FsbCB0byAkYW55LCBleHBlY3RlZCAxIGFyZ3VtZW50IGJ1dCByZWNlaXZlZCAke2FyZ3MubGVuZ3RoIHx8ICdub25lJ31gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoYXJnc1swXSBhcyBvLkV4cHJlc3Npb24pLmNhc3Qoby5EWU5BTUlDX1RZUEUpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZnRNb3N0U2FmZSA9IHRoaXMubGVmdE1vc3RTYWZlTm9kZShhc3QpO1xuICAgIGlmIChsZWZ0TW9zdFNhZmUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRTYWZlQWNjZXNzKGFzdCwgbGVmdE1vc3RTYWZlLCBtb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYXJncyA9IHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgICAgbGV0IHJlc3VsdDogYW55ID0gbnVsbDtcbiAgICAgIGNvbnN0IHJlY2VpdmVyID0gdGhpcy5fdmlzaXQoYXN0LnJlY2VpdmVyLCBfTW9kZS5FeHByZXNzaW9uKTtcbiAgICAgIGlmIChyZWNlaXZlciA9PT0gdGhpcy5faW1wbGljaXRSZWNlaXZlcikge1xuICAgICAgICBjb25zdCB2YXJFeHByID0gdGhpcy5fZ2V0TG9jYWwoYXN0Lm5hbWUpO1xuICAgICAgICBpZiAodmFyRXhwcikge1xuICAgICAgICAgIHJlc3VsdCA9IHZhckV4cHIuY2FsbEZuKGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZXIuY2FsbE1ldGhvZChhc3QubmFtZSwgYXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udmVydFRvU3RhdGVtZW50SWZOZWVkZWQobW9kZSwgcmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICB2aXNpdFByZWZpeE5vdChhc3Q6IGNkQXN0LlByZWZpeE5vdCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCBvLm5vdCh0aGlzLl92aXNpdChhc3QuZXhwcmVzc2lvbiwgX01vZGUuRXhwcmVzc2lvbikpKTtcbiAgfVxuXG4gIHZpc2l0Tm9uTnVsbEFzc2VydChhc3Q6IGNkQXN0Lk5vbk51bGxBc3NlcnQsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICByZXR1cm4gY29udmVydFRvU3RhdGVtZW50SWZOZWVkZWQoXG4gICAgICAgIG1vZGUsIG8uYXNzZXJ0Tm90TnVsbCh0aGlzLl92aXNpdChhc3QuZXhwcmVzc2lvbiwgX01vZGUuRXhwcmVzc2lvbikpKTtcbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogY2RBc3QuUHJvcGVydHlSZWFkLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgY29uc3QgbGVmdE1vc3RTYWZlID0gdGhpcy5sZWZ0TW9zdFNhZmVOb2RlKGFzdCk7XG4gICAgaWYgKGxlZnRNb3N0U2FmZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydFNhZmVBY2Nlc3MoYXN0LCBsZWZ0TW9zdFNhZmUsIG1vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzdWx0OiBhbnkgPSBudWxsO1xuICAgICAgY29uc3QgcmVjZWl2ZXIgPSB0aGlzLl92aXNpdChhc3QucmVjZWl2ZXIsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgICAgaWYgKHJlY2VpdmVyID09PSB0aGlzLl9pbXBsaWNpdFJlY2VpdmVyKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2dldExvY2FsKGFzdC5uYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICByZXN1bHQgPSByZWNlaXZlci5wcm9wKGFzdC5uYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlXcml0ZShhc3Q6IGNkQXN0LlByb3BlcnR5V3JpdGUsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICBjb25zdCByZWNlaXZlcjogby5FeHByZXNzaW9uID0gdGhpcy5fdmlzaXQoYXN0LnJlY2VpdmVyLCBfTW9kZS5FeHByZXNzaW9uKTtcbiAgICBpZiAocmVjZWl2ZXIgPT09IHRoaXMuX2ltcGxpY2l0UmVjZWl2ZXIpIHtcbiAgICAgIGNvbnN0IHZhckV4cHIgPSB0aGlzLl9nZXRMb2NhbChhc3QubmFtZSk7XG4gICAgICBpZiAodmFyRXhwcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhc3NpZ24gdG8gYSByZWZlcmVuY2Ugb3IgdmFyaWFibGUhJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChcbiAgICAgICAgbW9kZSwgcmVjZWl2ZXIucHJvcChhc3QubmFtZSkuc2V0KHRoaXMuX3Zpc2l0KGFzdC52YWx1ZSwgX01vZGUuRXhwcmVzc2lvbikpKTtcbiAgfVxuXG4gIHZpc2l0U2FmZVByb3BlcnR5UmVhZChhc3Q6IGNkQXN0LlNhZmVQcm9wZXJ0eVJlYWQsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0U2FmZUFjY2Vzcyhhc3QsIHRoaXMubGVmdE1vc3RTYWZlTm9kZShhc3QpLCBtb2RlKTtcbiAgfVxuXG4gIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBjZEFzdC5TYWZlTWV0aG9kQ2FsbCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbnZlcnRTYWZlQWNjZXNzKGFzdCwgdGhpcy5sZWZ0TW9zdFNhZmVOb2RlKGFzdCksIG1vZGUpO1xuICB9XG5cbiAgdmlzaXRBbGwoYXN0czogY2RBc3QuQVNUW10sIG1vZGU6IF9Nb2RlKTogYW55IHsgcmV0dXJuIGFzdHMubWFwKGFzdCA9PiB0aGlzLl92aXNpdChhc3QsIG1vZGUpKTsgfVxuXG4gIHZpc2l0UXVvdGUoYXN0OiBjZEFzdC5RdW90ZSwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcihgUXVvdGVzIGFyZSBub3Qgc3VwcG9ydGVkIGZvciBldmFsdWF0aW9uIVxuICAgICAgICBTdGF0ZW1lbnQ6ICR7YXN0LnVuaW50ZXJwcmV0ZWRFeHByZXNzaW9ufSBsb2NhdGVkIGF0ICR7YXN0LmxvY2F0aW9ufWApO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXQoYXN0OiBjZEFzdC5BU1QsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9yZXN1bHRNYXAuZ2V0KGFzdCk7XG4gICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICByZXR1cm4gKHRoaXMuX25vZGVNYXAuZ2V0KGFzdCkgfHwgYXN0KS52aXNpdCh0aGlzLCBtb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFNhZmVBY2Nlc3MoXG4gICAgICBhc3Q6IGNkQXN0LkFTVCwgbGVmdE1vc3RTYWZlOiBjZEFzdC5TYWZlTWV0aG9kQ2FsbHxjZEFzdC5TYWZlUHJvcGVydHlSZWFkLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgLy8gSWYgdGhlIGV4cHJlc3Npb24gY29udGFpbnMgYSBzYWZlIGFjY2VzcyBub2RlIG9uIHRoZSBsZWZ0IGl0IG5lZWRzIHRvIGJlIGNvbnZlcnRlZCB0b1xuICAgIC8vIGFuIGV4cHJlc3Npb24gdGhhdCBndWFyZHMgdGhlIGFjY2VzcyB0byB0aGUgbWVtYmVyIGJ5IGNoZWNraW5nIHRoZSByZWNlaXZlciBmb3IgYmxhbmsuIEFzXG4gICAgLy8gZXhlY3V0aW9uIHByb2NlZWRzIGZyb20gbGVmdCB0byByaWdodCwgdGhlIGxlZnQgbW9zdCBwYXJ0IG9mIHRoZSBleHByZXNzaW9uIG11c3QgYmUgZ3VhcmRlZFxuICAgIC8vIGZpcnN0IGJ1dCwgYmVjYXVzZSBtZW1iZXIgYWNjZXNzIGlzIGxlZnQgYXNzb2NpYXRpdmUsIHRoZSByaWdodCBzaWRlIG9mIHRoZSBleHByZXNzaW9uIGlzIGF0XG4gICAgLy8gdGhlIHRvcCBvZiB0aGUgQVNULiBUaGUgZGVzaXJlZCByZXN1bHQgcmVxdWlyZXMgbGlmdGluZyBhIGNvcHkgb2YgdGhlIHRoZSBsZWZ0IHBhcnQgb2YgdGhlXG4gICAgLy8gZXhwcmVzc2lvbiB1cCB0byB0ZXN0IGl0IGZvciBibGFuayBiZWZvcmUgZ2VuZXJhdGluZyB0aGUgdW5ndWFyZGVkIHZlcnNpb24uXG5cbiAgICAvLyBDb25zaWRlciwgZm9yIGV4YW1wbGUgdGhlIGZvbGxvd2luZyBleHByZXNzaW9uOiBhPy5iLmM/LmQuZVxuXG4gICAgLy8gVGhpcyByZXN1bHRzIGluIHRoZSBhc3Q6XG4gICAgLy8gICAgICAgICAuXG4gICAgLy8gICAgICAgIC8gXFxcbiAgICAvLyAgICAgICA/LiAgIGVcbiAgICAvLyAgICAgIC8gIFxcXG4gICAgLy8gICAgIC4gICAgZFxuICAgIC8vICAgIC8gXFxcbiAgICAvLyAgID8uICBjXG4gICAgLy8gIC8gIFxcXG4gICAgLy8gYSAgICBiXG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIHRyZWUgc2hvdWxkIGJlIGdlbmVyYXRlZDpcbiAgICAvL1xuICAgIC8vICAgICAgICAvLS0tLSA/IC0tLS1cXFxuICAgIC8vICAgICAgIC8gICAgICB8ICAgICAgXFxcbiAgICAvLyAgICAgYSAgIC8tLS0gPyAtLS1cXCAgbnVsbFxuICAgIC8vICAgICAgICAvICAgICB8ICAgICBcXFxuICAgIC8vICAgICAgIC4gICAgICAuICAgICBudWxsXG4gICAgLy8gICAgICAvIFxcICAgIC8gXFxcbiAgICAvLyAgICAgLiAgYyAgIC4gICBlXG4gICAgLy8gICAgLyBcXCAgICAvIFxcXG4gICAgLy8gICBhICAgYiAgLCAgIGRcbiAgICAvLyAgICAgICAgIC8gXFxcbiAgICAvLyAgICAgICAgLiAgIGNcbiAgICAvLyAgICAgICAvIFxcXG4gICAgLy8gICAgICBhICAgYlxuICAgIC8vXG4gICAgLy8gTm90aWNlIHRoYXQgdGhlIGZpcnN0IGd1YXJkIGNvbmRpdGlvbiBpcyB0aGUgbGVmdCBoYW5kIG9mIHRoZSBsZWZ0IG1vc3Qgc2FmZSBhY2Nlc3Mgbm9kZVxuICAgIC8vIHdoaWNoIGNvbWVzIGluIGFzIGxlZnRNb3N0U2FmZSB0byB0aGlzIHJvdXRpbmUuXG5cbiAgICBsZXQgZ3VhcmRlZEV4cHJlc3Npb24gPSB0aGlzLl92aXNpdChsZWZ0TW9zdFNhZmUucmVjZWl2ZXIsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIGxldCB0ZW1wb3Jhcnk6IG8uUmVhZFZhckV4cHIgPSB1bmRlZmluZWQgITtcbiAgICBpZiAodGhpcy5uZWVkc1RlbXBvcmFyeShsZWZ0TW9zdFNhZmUucmVjZWl2ZXIpKSB7XG4gICAgICAvLyBJZiB0aGUgZXhwcmVzc2lvbiBoYXMgbWV0aG9kIGNhbGxzIG9yIHBpcGVzIHRoZW4gd2UgbmVlZCB0byBzYXZlIHRoZSByZXN1bHQgaW50byBhXG4gICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGUgdG8gYXZvaWQgY2FsbGluZyBzdGF0ZWZ1bCBvciBpbXB1cmUgY29kZSBtb3JlIHRoYW4gb25jZS5cbiAgICAgIHRlbXBvcmFyeSA9IHRoaXMuYWxsb2NhdGVUZW1wb3JhcnkoKTtcblxuICAgICAgLy8gUHJlc2VydmUgdGhlIHJlc3VsdCBpbiB0aGUgdGVtcG9yYXJ5IHZhcmlhYmxlXG4gICAgICBndWFyZGVkRXhwcmVzc2lvbiA9IHRlbXBvcmFyeS5zZXQoZ3VhcmRlZEV4cHJlc3Npb24pO1xuXG4gICAgICAvLyBFbnN1cmUgYWxsIGZ1cnRoZXIgcmVmZXJlbmNlcyB0byB0aGUgZ3VhcmRlZCBleHByZXNzaW9uIHJlZmVyIHRvIHRoZSB0ZW1wb3JhcnkgaW5zdGVhZC5cbiAgICAgIHRoaXMuX3Jlc3VsdE1hcC5zZXQobGVmdE1vc3RTYWZlLnJlY2VpdmVyLCB0ZW1wb3JhcnkpO1xuICAgIH1cbiAgICBjb25zdCBjb25kaXRpb24gPSBndWFyZGVkRXhwcmVzc2lvbi5pc0JsYW5rKCk7XG5cbiAgICAvLyBDb252ZXJ0IHRoZSBhc3QgdG8gYW4gdW5ndWFyZGVkIGFjY2VzcyB0byB0aGUgcmVjZWl2ZXIncyBtZW1iZXIuIFRoZSBtYXAgd2lsbCBzdWJzdGl0dXRlXG4gICAgLy8gbGVmdE1vc3ROb2RlIHdpdGggaXRzIHVuZ3VhcmRlZCB2ZXJzaW9uIGluIHRoZSBjYWxsIHRvIGB0aGlzLnZpc2l0KClgLlxuICAgIGlmIChsZWZ0TW9zdFNhZmUgaW5zdGFuY2VvZiBjZEFzdC5TYWZlTWV0aG9kQ2FsbCkge1xuICAgICAgdGhpcy5fbm9kZU1hcC5zZXQoXG4gICAgICAgICAgbGVmdE1vc3RTYWZlLFxuICAgICAgICAgIG5ldyBjZEFzdC5NZXRob2RDYWxsKFxuICAgICAgICAgICAgICBsZWZ0TW9zdFNhZmUuc3BhbiwgbGVmdE1vc3RTYWZlLnJlY2VpdmVyLCBsZWZ0TW9zdFNhZmUubmFtZSwgbGVmdE1vc3RTYWZlLmFyZ3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbm9kZU1hcC5zZXQoXG4gICAgICAgICAgbGVmdE1vc3RTYWZlLFxuICAgICAgICAgIG5ldyBjZEFzdC5Qcm9wZXJ0eVJlYWQobGVmdE1vc3RTYWZlLnNwYW4sIGxlZnRNb3N0U2FmZS5yZWNlaXZlciwgbGVmdE1vc3RTYWZlLm5hbWUpKTtcbiAgICB9XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb252ZXJ0IHRoZSBub2RlIG5vdyB3aXRob3V0IHRoZSBndWFyZGVkIG1lbWJlciBhY2Nlc3MuXG4gICAgY29uc3QgYWNjZXNzID0gdGhpcy5fdmlzaXQoYXN0LCBfTW9kZS5FeHByZXNzaW9uKTtcblxuICAgIC8vIFJlbW92ZSB0aGUgbWFwcGluZy4gVGhpcyBpcyBub3Qgc3RyaWN0bHkgcmVxdWlyZWQgYXMgdGhlIGNvbnZlcnRlciBvbmx5IHRyYXZlcnNlcyBlYWNoIG5vZGVcbiAgICAvLyBvbmNlIGJ1dCBpcyBzYWZlciBpZiB0aGUgY29udmVyc2lvbiBpcyBjaGFuZ2VkIHRvIHRyYXZlcnNlIHRoZSBub2RlcyBtb3JlIHRoYW4gb25jZS5cbiAgICB0aGlzLl9ub2RlTWFwLmRlbGV0ZShsZWZ0TW9zdFNhZmUpO1xuXG4gICAgLy8gSWYgd2UgYWxsb2NhdGVkIGEgdGVtcG9yYXJ5LCByZWxlYXNlIGl0LlxuICAgIGlmICh0ZW1wb3JhcnkpIHtcbiAgICAgIHRoaXMucmVsZWFzZVRlbXBvcmFyeSh0ZW1wb3JhcnkpO1xuICAgIH1cblxuICAgIC8vIFByb2R1Y2UgdGhlIGNvbmRpdGlvbmFsXG4gICAgcmV0dXJuIGNvbnZlcnRUb1N0YXRlbWVudElmTmVlZGVkKG1vZGUsIGNvbmRpdGlvbi5jb25kaXRpb25hbChvLmxpdGVyYWwobnVsbCksIGFjY2VzcykpO1xuICB9XG5cbiAgLy8gR2l2ZW4gYSBleHByZXNzaW9uIG9mIHRoZSBmb3JtIGE/LmIuYz8uZC5lIHRoZSB0aGUgbGVmdCBtb3N0IHNhZmUgbm9kZSBpc1xuICAvLyB0aGUgKGE/LmIpLiBUaGUgLiBhbmQgPy4gYXJlIGxlZnQgYXNzb2NpYXRpdmUgdGh1cyBjYW4gYmUgcmV3cml0dGVuIGFzOlxuICAvLyAoKCgoYT8uYykuYikuYyk/LmQpLmUuIFRoaXMgcmV0dXJucyB0aGUgbW9zdCBkZWVwbHkgbmVzdGVkIHNhZmUgcmVhZCBvclxuICAvLyBzYWZlIG1ldGhvZCBjYWxsIGFzIHRoaXMgbmVlZHMgYmUgdHJhbnNmb3JtIGluaXRpYWxseSB0bzpcbiAgLy8gICBhID09IG51bGwgPyBudWxsIDogYS5jLmIuYz8uZC5lXG4gIC8vIHRoZW4gdG86XG4gIC8vICAgYSA9PSBudWxsID8gbnVsbCA6IGEuYi5jID09IG51bGwgPyBudWxsIDogYS5iLmMuZC5lXG4gIHByaXZhdGUgbGVmdE1vc3RTYWZlTm9kZShhc3Q6IGNkQXN0LkFTVCk6IGNkQXN0LlNhZmVQcm9wZXJ0eVJlYWR8Y2RBc3QuU2FmZU1ldGhvZENhbGwge1xuICAgIGNvbnN0IHZpc2l0ID0gKHZpc2l0b3I6IGNkQXN0LkFzdFZpc2l0b3IsIGFzdDogY2RBc3QuQVNUKTogYW55ID0+IHtcbiAgICAgIHJldHVybiAodGhpcy5fbm9kZU1hcC5nZXQoYXN0KSB8fCBhc3QpLnZpc2l0KHZpc2l0b3IpO1xuICAgIH07XG4gICAgcmV0dXJuIGFzdC52aXNpdCh7XG4gICAgICB2aXNpdEJpbmFyeShhc3Q6IGNkQXN0LkJpbmFyeSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0Q2hhaW4oYXN0OiBjZEFzdC5DaGFpbikgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBjZEFzdC5Db25kaXRpb25hbCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogY2RBc3QuRnVuY3Rpb25DYWxsKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogY2RBc3QuSW1wbGljaXRSZWNlaXZlcikgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0SW50ZXJwb2xhdGlvbihhc3Q6IGNkQXN0LkludGVycG9sYXRpb24pIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICB2aXNpdEtleWVkUmVhZChhc3Q6IGNkQXN0LktleWVkUmVhZCkgeyByZXR1cm4gdmlzaXQodGhpcywgYXN0Lm9iaik7IH0sXG4gICAgICB2aXNpdEtleWVkV3JpdGUoYXN0OiBjZEFzdC5LZXllZFdyaXRlKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBjZEFzdC5MaXRlcmFsQXJyYXkpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICB2aXNpdExpdGVyYWxNYXAoYXN0OiBjZEFzdC5MaXRlcmFsTWFwKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogY2RBc3QuTGl0ZXJhbFByaW1pdGl2ZSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IGNkQXN0Lk1ldGhvZENhbGwpIHsgcmV0dXJuIHZpc2l0KHRoaXMsIGFzdC5yZWNlaXZlcik7IH0sXG4gICAgICB2aXNpdFBpcGUoYXN0OiBjZEFzdC5CaW5kaW5nUGlwZSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0UHJlZml4Tm90KGFzdDogY2RBc3QuUHJlZml4Tm90KSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgdmlzaXROb25OdWxsQXNzZXJ0KGFzdDogY2RBc3QuTm9uTnVsbEFzc2VydCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogY2RBc3QuUHJvcGVydHlSZWFkKSB7IHJldHVybiB2aXNpdCh0aGlzLCBhc3QucmVjZWl2ZXIpOyB9LFxuICAgICAgdmlzaXRQcm9wZXJ0eVdyaXRlKGFzdDogY2RBc3QuUHJvcGVydHlXcml0ZSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0UXVvdGUoYXN0OiBjZEFzdC5RdW90ZSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBjZEFzdC5TYWZlTWV0aG9kQ2FsbCkgeyByZXR1cm4gdmlzaXQodGhpcywgYXN0LnJlY2VpdmVyKSB8fCBhc3Q7IH0sXG4gICAgICB2aXNpdFNhZmVQcm9wZXJ0eVJlYWQoYXN0OiBjZEFzdC5TYWZlUHJvcGVydHlSZWFkKSB7XG4gICAgICAgIHJldHVybiB2aXNpdCh0aGlzLCBhc3QucmVjZWl2ZXIpIHx8IGFzdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJldHVybnMgdHJ1ZSBvZiB0aGUgQVNUIGluY2x1ZGVzIGEgbWV0aG9kIG9yIGEgcGlwZSBpbmRpY2F0aW5nIHRoYXQsIGlmIHRoZVxuICAvLyBleHByZXNzaW9uIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiBhIHNhZmUgcHJvcGVydHkgb3IgbWV0aG9kIGFjY2VzcyB0aGVuXG4gIC8vIHRoZSBleHByZXNzaW9uIHNob3VsZCBiZSBzdG9yZWQgaW50byBhIHRlbXBvcmFyeSB2YXJpYWJsZS5cbiAgcHJpdmF0ZSBuZWVkc1RlbXBvcmFyeShhc3Q6IGNkQXN0LkFTVCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZpc2l0ID0gKHZpc2l0b3I6IGNkQXN0LkFzdFZpc2l0b3IsIGFzdDogY2RBc3QuQVNUKTogYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gYXN0ICYmICh0aGlzLl9ub2RlTWFwLmdldChhc3QpIHx8IGFzdCkudmlzaXQodmlzaXRvcik7XG4gICAgfTtcbiAgICBjb25zdCB2aXNpdFNvbWUgPSAodmlzaXRvcjogY2RBc3QuQXN0VmlzaXRvciwgYXN0OiBjZEFzdC5BU1RbXSk6IGJvb2xlYW4gPT4ge1xuICAgICAgcmV0dXJuIGFzdC5zb21lKGFzdCA9PiB2aXNpdCh2aXNpdG9yLCBhc3QpKTtcbiAgICB9O1xuICAgIHJldHVybiBhc3QudmlzaXQoe1xuICAgICAgdmlzaXRCaW5hcnkoYXN0OiBjZEFzdC5CaW5hcnkpOlxuICAgICAgICAgIGJvb2xlYW57cmV0dXJuIHZpc2l0KHRoaXMsIGFzdC5sZWZ0KSB8fCB2aXNpdCh0aGlzLCBhc3QucmlnaHQpO30sXG4gICAgICB2aXNpdENoYWluKGFzdDogY2RBc3QuQ2hhaW4pIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgdmlzaXRDb25kaXRpb25hbChhc3Q6IGNkQXN0LkNvbmRpdGlvbmFsKTpcbiAgICAgICAgICBib29sZWFue3JldHVybiB2aXNpdCh0aGlzLCBhc3QuY29uZGl0aW9uKSB8fCB2aXNpdCh0aGlzLCBhc3QudHJ1ZUV4cCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICB2aXNpdCh0aGlzLCBhc3QuZmFsc2VFeHApO30sXG4gICAgICB2aXNpdEZ1bmN0aW9uQ2FsbChhc3Q6IGNkQXN0LkZ1bmN0aW9uQ2FsbCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IGNkQXN0LkltcGxpY2l0UmVjZWl2ZXIpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogY2RBc3QuSW50ZXJwb2xhdGlvbikgeyByZXR1cm4gdmlzaXRTb21lKHRoaXMsIGFzdC5leHByZXNzaW9ucyk7IH0sXG4gICAgICB2aXNpdEtleWVkUmVhZChhc3Q6IGNkQXN0LktleWVkUmVhZCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICB2aXNpdEtleWVkV3JpdGUoYXN0OiBjZEFzdC5LZXllZFdyaXRlKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgIHZpc2l0TGl0ZXJhbEFycmF5KGFzdDogY2RBc3QuTGl0ZXJhbEFycmF5KSB7IHJldHVybiB0cnVlOyB9LFxuICAgICAgdmlzaXRMaXRlcmFsTWFwKGFzdDogY2RBc3QuTGl0ZXJhbE1hcCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IGNkQXN0LkxpdGVyYWxQcmltaXRpdmUpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgdmlzaXRNZXRob2RDYWxsKGFzdDogY2RBc3QuTWV0aG9kQ2FsbCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgIHZpc2l0UGlwZShhc3Q6IGNkQXN0LkJpbmRpbmdQaXBlKSB7IHJldHVybiB0cnVlOyB9LFxuICAgICAgdmlzaXRQcmVmaXhOb3QoYXN0OiBjZEFzdC5QcmVmaXhOb3QpIHsgcmV0dXJuIHZpc2l0KHRoaXMsIGFzdC5leHByZXNzaW9uKTsgfSxcbiAgICAgIHZpc2l0Tm9uTnVsbEFzc2VydChhc3Q6IGNkQXN0LlByZWZpeE5vdCkgeyByZXR1cm4gdmlzaXQodGhpcywgYXN0LmV4cHJlc3Npb24pOyB9LFxuICAgICAgdmlzaXRQcm9wZXJ0eVJlYWQoYXN0OiBjZEFzdC5Qcm9wZXJ0eVJlYWQpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgdmlzaXRQcm9wZXJ0eVdyaXRlKGFzdDogY2RBc3QuUHJvcGVydHlXcml0ZSkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICB2aXNpdFF1b3RlKGFzdDogY2RBc3QuUXVvdGUpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IGNkQXN0LlNhZmVNZXRob2RDYWxsKSB7IHJldHVybiB0cnVlOyB9LFxuICAgICAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogY2RBc3QuU2FmZVByb3BlcnR5UmVhZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWxsb2NhdGVUZW1wb3JhcnkoKTogby5SZWFkVmFyRXhwciB7XG4gICAgY29uc3QgdGVtcE51bWJlciA9IHRoaXMuX2N1cnJlbnRUZW1wb3JhcnkrKztcbiAgICB0aGlzLnRlbXBvcmFyeUNvdW50ID0gTWF0aC5tYXgodGhpcy5fY3VycmVudFRlbXBvcmFyeSwgdGhpcy50ZW1wb3JhcnlDb3VudCk7XG4gICAgcmV0dXJuIG5ldyBvLlJlYWRWYXJFeHByKHRlbXBvcmFyeU5hbWUodGhpcy5iaW5kaW5nSWQsIHRlbXBOdW1iZXIpKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVsZWFzZVRlbXBvcmFyeSh0ZW1wb3Jhcnk6IG8uUmVhZFZhckV4cHIpIHtcbiAgICB0aGlzLl9jdXJyZW50VGVtcG9yYXJ5LS07XG4gICAgaWYgKHRlbXBvcmFyeS5uYW1lICE9IHRlbXBvcmFyeU5hbWUodGhpcy5iaW5kaW5nSWQsIHRoaXMuX2N1cnJlbnRUZW1wb3JhcnkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbXBvcmFyeSAke3RlbXBvcmFyeS5uYW1lfSByZWxlYXNlZCBvdXQgb2Ygb3JkZXJgKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmxhdHRlblN0YXRlbWVudHMoYXJnOiBhbnksIG91dHB1dDogby5TdGF0ZW1lbnRbXSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgKDxhbnlbXT5hcmcpLmZvckVhY2goKGVudHJ5KSA9PiBmbGF0dGVuU3RhdGVtZW50cyhlbnRyeSwgb3V0cHV0KSk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0LnB1c2goYXJnKTtcbiAgfVxufVxuXG5jbGFzcyBEZWZhdWx0TG9jYWxSZXNvbHZlciBpbXBsZW1lbnRzIExvY2FsUmVzb2x2ZXIge1xuICBnZXRMb2NhbChuYW1lOiBzdHJpbmcpOiBvLkV4cHJlc3Npb258bnVsbCB7XG4gICAgaWYgKG5hbWUgPT09IEV2ZW50SGFuZGxlclZhcnMuZXZlbnQubmFtZSkge1xuICAgICAgcmV0dXJuIEV2ZW50SGFuZGxlclZhcnMuZXZlbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUN1cnJWYWx1ZUV4cHIoYmluZGluZ0lkOiBzdHJpbmcpOiBvLlJlYWRWYXJFeHByIHtcbiAgcmV0dXJuIG8udmFyaWFibGUoYGN1cnJWYWxfJHtiaW5kaW5nSWR9YCk7ICAvLyBmaXggc3ludGF4IGhpZ2hsaWdodGluZzogYFxufVxuXG5mdW5jdGlvbiBjcmVhdGVQcmV2ZW50RGVmYXVsdFZhcihiaW5kaW5nSWQ6IHN0cmluZyk6IG8uUmVhZFZhckV4cHIge1xuICByZXR1cm4gby52YXJpYWJsZShgcGRfJHtiaW5kaW5nSWR9YCk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRTdG10SW50b0V4cHJlc3Npb24oc3RtdDogby5TdGF0ZW1lbnQpOiBvLkV4cHJlc3Npb258bnVsbCB7XG4gIGlmIChzdG10IGluc3RhbmNlb2Ygby5FeHByZXNzaW9uU3RhdGVtZW50KSB7XG4gICAgcmV0dXJuIHN0bXQuZXhwcjtcbiAgfSBlbHNlIGlmIChzdG10IGluc3RhbmNlb2Ygby5SZXR1cm5TdGF0ZW1lbnQpIHtcbiAgICByZXR1cm4gc3RtdC52YWx1ZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGNsYXNzIEJ1aWx0aW5GdW5jdGlvbkNhbGwgZXh0ZW5kcyBjZEFzdC5GdW5jdGlvbkNhbGwge1xuICBjb25zdHJ1Y3RvcihzcGFuOiBjZEFzdC5QYXJzZVNwYW4sIHB1YmxpYyBhcmdzOiBjZEFzdC5BU1RbXSwgcHVibGljIGNvbnZlcnRlcjogQnVpbHRpbkNvbnZlcnRlcikge1xuICAgIHN1cGVyKHNwYW4sIG51bGwsIGFyZ3MpO1xuICB9XG59XG4iXX0=