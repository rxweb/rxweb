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
        define("@angular/compiler/src/output/output_interpreter", ["require", "exports", "tslib", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/output/ts_emitter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var o = require("@angular/compiler/src/output/output_ast");
    var ts_emitter_1 = require("@angular/compiler/src/output/ts_emitter");
    function interpretStatements(statements, reflector) {
        var ctx = new _ExecutionContext(null, null, null, new Map());
        var visitor = new StatementInterpreter(reflector);
        visitor.visitAllStatements(statements, ctx);
        var result = {};
        ctx.exports.forEach(function (exportName) { result[exportName] = ctx.vars.get(exportName); });
        return result;
    }
    exports.interpretStatements = interpretStatements;
    function _executeFunctionStatements(varNames, varValues, statements, ctx, visitor) {
        var childCtx = ctx.createChildWihtLocalVars();
        for (var i = 0; i < varNames.length; i++) {
            childCtx.vars.set(varNames[i], varValues[i]);
        }
        var result = visitor.visitAllStatements(statements, childCtx);
        return result ? result.value : null;
    }
    var _ExecutionContext = /** @class */ (function () {
        function _ExecutionContext(parent, instance, className, vars) {
            this.parent = parent;
            this.instance = instance;
            this.className = className;
            this.vars = vars;
            this.exports = [];
        }
        _ExecutionContext.prototype.createChildWihtLocalVars = function () {
            return new _ExecutionContext(this, this.instance, this.className, new Map());
        };
        return _ExecutionContext;
    }());
    var ReturnValue = /** @class */ (function () {
        function ReturnValue(value) {
            this.value = value;
        }
        return ReturnValue;
    }());
    function createDynamicClass(_classStmt, _ctx, _visitor) {
        var propertyDescriptors = {};
        _classStmt.getters.forEach(function (getter) {
            // Note: use `function` instead of arrow function to capture `this`
            propertyDescriptors[getter.name] = {
                configurable: false,
                get: function () {
                    var instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
                    return _executeFunctionStatements([], [], getter.body, instanceCtx, _visitor);
                }
            };
        });
        _classStmt.methods.forEach(function (method) {
            var paramNames = method.params.map(function (param) { return param.name; });
            // Note: use `function` instead of arrow function to capture `this`
            propertyDescriptors[method.name] = {
                writable: false,
                configurable: false,
                value: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
                    return _executeFunctionStatements(paramNames, args, method.body, instanceCtx, _visitor);
                }
            };
        });
        var ctorParamNames = _classStmt.constructorMethod.params.map(function (param) { return param.name; });
        // Note: use `function` instead of arrow function to capture `this`
        var ctor = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
            _classStmt.fields.forEach(function (field) { _this[field.name] = undefined; });
            _executeFunctionStatements(ctorParamNames, args, _classStmt.constructorMethod.body, instanceCtx, _visitor);
        };
        var superClass = _classStmt.parent ? _classStmt.parent.visitExpression(_visitor, _ctx) : Object;
        ctor.prototype = Object.create(superClass.prototype, propertyDescriptors);
        return ctor;
    }
    var StatementInterpreter = /** @class */ (function () {
        function StatementInterpreter(reflector) {
            this.reflector = reflector;
        }
        StatementInterpreter.prototype.debugAst = function (ast) { return ts_emitter_1.debugOutputAstAsTypeScript(ast); };
        StatementInterpreter.prototype.visitDeclareVarStmt = function (stmt, ctx) {
            var initialValue = stmt.value ? stmt.value.visitExpression(this, ctx) : undefined;
            ctx.vars.set(stmt.name, initialValue);
            if (stmt.hasModifier(o.StmtModifier.Exported)) {
                ctx.exports.push(stmt.name);
            }
            return null;
        };
        StatementInterpreter.prototype.visitWriteVarExpr = function (expr, ctx) {
            var value = expr.value.visitExpression(this, ctx);
            var currCtx = ctx;
            while (currCtx != null) {
                if (currCtx.vars.has(expr.name)) {
                    currCtx.vars.set(expr.name, value);
                    return value;
                }
                currCtx = currCtx.parent;
            }
            throw new Error("Not declared variable " + expr.name);
        };
        StatementInterpreter.prototype.visitWrappedNodeExpr = function (ast, ctx) {
            throw new Error('Cannot interpret a WrappedNodeExpr.');
        };
        StatementInterpreter.prototype.visitTypeofExpr = function (ast, ctx) {
            throw new Error('Cannot interpret a TypeofExpr');
        };
        StatementInterpreter.prototype.visitReadVarExpr = function (ast, ctx) {
            var varName = ast.name;
            if (ast.builtin != null) {
                switch (ast.builtin) {
                    case o.BuiltinVar.Super:
                        return ctx.instance.__proto__;
                    case o.BuiltinVar.This:
                        return ctx.instance;
                    case o.BuiltinVar.CatchError:
                        varName = CATCH_ERROR_VAR;
                        break;
                    case o.BuiltinVar.CatchStack:
                        varName = CATCH_STACK_VAR;
                        break;
                    default:
                        throw new Error("Unknown builtin variable " + ast.builtin);
                }
            }
            var currCtx = ctx;
            while (currCtx != null) {
                if (currCtx.vars.has(varName)) {
                    return currCtx.vars.get(varName);
                }
                currCtx = currCtx.parent;
            }
            throw new Error("Not declared variable " + varName);
        };
        StatementInterpreter.prototype.visitWriteKeyExpr = function (expr, ctx) {
            var receiver = expr.receiver.visitExpression(this, ctx);
            var index = expr.index.visitExpression(this, ctx);
            var value = expr.value.visitExpression(this, ctx);
            receiver[index] = value;
            return value;
        };
        StatementInterpreter.prototype.visitWritePropExpr = function (expr, ctx) {
            var receiver = expr.receiver.visitExpression(this, ctx);
            var value = expr.value.visitExpression(this, ctx);
            receiver[expr.name] = value;
            return value;
        };
        StatementInterpreter.prototype.visitInvokeMethodExpr = function (expr, ctx) {
            var receiver = expr.receiver.visitExpression(this, ctx);
            var args = this.visitAllExpressions(expr.args, ctx);
            var result;
            if (expr.builtin != null) {
                switch (expr.builtin) {
                    case o.BuiltinMethod.ConcatArray:
                        result = receiver.concat.apply(receiver, tslib_1.__spread(args));
                        break;
                    case o.BuiltinMethod.SubscribeObservable:
                        result = receiver.subscribe({ next: args[0] });
                        break;
                    case o.BuiltinMethod.Bind:
                        result = receiver.bind.apply(receiver, tslib_1.__spread(args));
                        break;
                    default:
                        throw new Error("Unknown builtin method " + expr.builtin);
                }
            }
            else {
                result = receiver[expr.name].apply(receiver, args);
            }
            return result;
        };
        StatementInterpreter.prototype.visitInvokeFunctionExpr = function (stmt, ctx) {
            var args = this.visitAllExpressions(stmt.args, ctx);
            var fnExpr = stmt.fn;
            if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
                ctx.instance.constructor.prototype.constructor.apply(ctx.instance, args);
                return null;
            }
            else {
                var fn = stmt.fn.visitExpression(this, ctx);
                return fn.apply(null, args);
            }
        };
        StatementInterpreter.prototype.visitReturnStmt = function (stmt, ctx) {
            return new ReturnValue(stmt.value.visitExpression(this, ctx));
        };
        StatementInterpreter.prototype.visitDeclareClassStmt = function (stmt, ctx) {
            var clazz = createDynamicClass(stmt, ctx, this);
            ctx.vars.set(stmt.name, clazz);
            if (stmt.hasModifier(o.StmtModifier.Exported)) {
                ctx.exports.push(stmt.name);
            }
            return null;
        };
        StatementInterpreter.prototype.visitExpressionStmt = function (stmt, ctx) {
            return stmt.expr.visitExpression(this, ctx);
        };
        StatementInterpreter.prototype.visitIfStmt = function (stmt, ctx) {
            var condition = stmt.condition.visitExpression(this, ctx);
            if (condition) {
                return this.visitAllStatements(stmt.trueCase, ctx);
            }
            else if (stmt.falseCase != null) {
                return this.visitAllStatements(stmt.falseCase, ctx);
            }
            return null;
        };
        StatementInterpreter.prototype.visitTryCatchStmt = function (stmt, ctx) {
            try {
                return this.visitAllStatements(stmt.bodyStmts, ctx);
            }
            catch (e) {
                var childCtx = ctx.createChildWihtLocalVars();
                childCtx.vars.set(CATCH_ERROR_VAR, e);
                childCtx.vars.set(CATCH_STACK_VAR, e.stack);
                return this.visitAllStatements(stmt.catchStmts, childCtx);
            }
        };
        StatementInterpreter.prototype.visitThrowStmt = function (stmt, ctx) {
            throw stmt.error.visitExpression(this, ctx);
        };
        StatementInterpreter.prototype.visitCommentStmt = function (stmt, context) { return null; };
        StatementInterpreter.prototype.visitJSDocCommentStmt = function (stmt, context) { return null; };
        StatementInterpreter.prototype.visitInstantiateExpr = function (ast, ctx) {
            var args = this.visitAllExpressions(ast.args, ctx);
            var clazz = ast.classExpr.visitExpression(this, ctx);
            return new (clazz.bind.apply(clazz, tslib_1.__spread([void 0], args)))();
        };
        StatementInterpreter.prototype.visitLiteralExpr = function (ast, ctx) { return ast.value; };
        StatementInterpreter.prototype.visitExternalExpr = function (ast, ctx) {
            return this.reflector.resolveExternalReference(ast.value);
        };
        StatementInterpreter.prototype.visitConditionalExpr = function (ast, ctx) {
            if (ast.condition.visitExpression(this, ctx)) {
                return ast.trueCase.visitExpression(this, ctx);
            }
            else if (ast.falseCase != null) {
                return ast.falseCase.visitExpression(this, ctx);
            }
            return null;
        };
        StatementInterpreter.prototype.visitNotExpr = function (ast, ctx) {
            return !ast.condition.visitExpression(this, ctx);
        };
        StatementInterpreter.prototype.visitAssertNotNullExpr = function (ast, ctx) {
            return ast.condition.visitExpression(this, ctx);
        };
        StatementInterpreter.prototype.visitCastExpr = function (ast, ctx) {
            return ast.value.visitExpression(this, ctx);
        };
        StatementInterpreter.prototype.visitFunctionExpr = function (ast, ctx) {
            var paramNames = ast.params.map(function (param) { return param.name; });
            return _declareFn(paramNames, ast.statements, ctx, this);
        };
        StatementInterpreter.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
            var paramNames = stmt.params.map(function (param) { return param.name; });
            ctx.vars.set(stmt.name, _declareFn(paramNames, stmt.statements, ctx, this));
            if (stmt.hasModifier(o.StmtModifier.Exported)) {
                ctx.exports.push(stmt.name);
            }
            return null;
        };
        StatementInterpreter.prototype.visitBinaryOperatorExpr = function (ast, ctx) {
            var _this = this;
            var lhs = function () { return ast.lhs.visitExpression(_this, ctx); };
            var rhs = function () { return ast.rhs.visitExpression(_this, ctx); };
            switch (ast.operator) {
                case o.BinaryOperator.Equals:
                    return lhs() == rhs();
                case o.BinaryOperator.Identical:
                    return lhs() === rhs();
                case o.BinaryOperator.NotEquals:
                    return lhs() != rhs();
                case o.BinaryOperator.NotIdentical:
                    return lhs() !== rhs();
                case o.BinaryOperator.And:
                    return lhs() && rhs();
                case o.BinaryOperator.Or:
                    return lhs() || rhs();
                case o.BinaryOperator.Plus:
                    return lhs() + rhs();
                case o.BinaryOperator.Minus:
                    return lhs() - rhs();
                case o.BinaryOperator.Divide:
                    return lhs() / rhs();
                case o.BinaryOperator.Multiply:
                    return lhs() * rhs();
                case o.BinaryOperator.Modulo:
                    return lhs() % rhs();
                case o.BinaryOperator.Lower:
                    return lhs() < rhs();
                case o.BinaryOperator.LowerEquals:
                    return lhs() <= rhs();
                case o.BinaryOperator.Bigger:
                    return lhs() > rhs();
                case o.BinaryOperator.BiggerEquals:
                    return lhs() >= rhs();
                default:
                    throw new Error("Unknown operator " + ast.operator);
            }
        };
        StatementInterpreter.prototype.visitReadPropExpr = function (ast, ctx) {
            var result;
            var receiver = ast.receiver.visitExpression(this, ctx);
            result = receiver[ast.name];
            return result;
        };
        StatementInterpreter.prototype.visitReadKeyExpr = function (ast, ctx) {
            var receiver = ast.receiver.visitExpression(this, ctx);
            var prop = ast.index.visitExpression(this, ctx);
            return receiver[prop];
        };
        StatementInterpreter.prototype.visitLiteralArrayExpr = function (ast, ctx) {
            return this.visitAllExpressions(ast.entries, ctx);
        };
        StatementInterpreter.prototype.visitLiteralMapExpr = function (ast, ctx) {
            var _this = this;
            var result = {};
            ast.entries.forEach(function (entry) { return result[entry.key] = entry.value.visitExpression(_this, ctx); });
            return result;
        };
        StatementInterpreter.prototype.visitCommaExpr = function (ast, context) {
            var values = this.visitAllExpressions(ast.parts, context);
            return values[values.length - 1];
        };
        StatementInterpreter.prototype.visitAllExpressions = function (expressions, ctx) {
            var _this = this;
            return expressions.map(function (expr) { return expr.visitExpression(_this, ctx); });
        };
        StatementInterpreter.prototype.visitAllStatements = function (statements, ctx) {
            for (var i = 0; i < statements.length; i++) {
                var stmt = statements[i];
                var val = stmt.visitStatement(this, ctx);
                if (val instanceof ReturnValue) {
                    return val;
                }
            }
            return null;
        };
        return StatementInterpreter;
    }());
    function _declareFn(varNames, statements, ctx, visitor) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _executeFunctionStatements(varNames, args, statements, ctx, visitor);
        };
    }
    var CATCH_ERROR_VAR = 'error';
    var CATCH_STACK_VAR = 'stack';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X2ludGVycHJldGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL291dHB1dC9vdXRwdXRfaW50ZXJwcmV0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBTUgsMkRBQWtDO0lBQ2xDLHNFQUF3RDtJQUV4RCw2QkFDSSxVQUF5QixFQUFFLFNBQTJCO1FBQ3hELElBQU0sR0FBRyxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQWUsQ0FBQyxDQUFDO1FBQzVFLElBQU0sT0FBTyxHQUFHLElBQUksb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFNLE1BQU0sR0FBeUIsRUFBRSxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVSxJQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFSRCxrREFRQztJQUVELG9DQUNJLFFBQWtCLEVBQUUsU0FBZ0IsRUFBRSxVQUF5QixFQUFFLEdBQXNCLEVBQ3ZGLE9BQTZCO1FBQy9CLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEUsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQ7UUFHRSwyQkFDVyxNQUE4QixFQUFTLFFBQWEsRUFBUyxTQUFzQixFQUNuRixJQUFzQjtZQUR0QixXQUFNLEdBQU4sTUFBTSxDQUF3QjtZQUFTLGFBQVEsR0FBUixRQUFRLENBQUs7WUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFhO1lBQ25GLFNBQUksR0FBSixJQUFJLENBQWtCO1lBSmpDLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFJYSxDQUFDO1FBRXJDLG9EQUF3QixHQUF4QjtZQUNFLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksR0FBRyxFQUFlLENBQUMsQ0FBQztRQUM1RixDQUFDO1FBQ0gsd0JBQUM7SUFBRCxDQUFDLEFBVkQsSUFVQztJQUVEO1FBQ0UscUJBQW1CLEtBQVU7WUFBVixVQUFLLEdBQUwsS0FBSyxDQUFLO1FBQUcsQ0FBQztRQUNuQyxrQkFBQztJQUFELENBQUMsQUFGRCxJQUVDO0lBRUQsNEJBQ0ksVUFBdUIsRUFBRSxJQUF1QixFQUFFLFFBQThCO1FBQ2xGLElBQU0sbUJBQW1CLEdBQXlCLEVBQUUsQ0FBQztRQUVyRCxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQXFCO1lBQy9DLG1FQUFtRTtZQUNuRSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLO2dCQUNuQixHQUFHLEVBQUU7b0JBQ0gsSUFBTSxXQUFXLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsRixPQUFPLDBCQUEwQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2hGLENBQUM7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE1BQXFCO1lBQ3ZELElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBVixDQUFVLENBQUMsQ0FBQztZQUMxRCxtRUFBbUU7WUFDbkUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQU0sQ0FBQyxHQUFHO2dCQUNuQyxRQUFRLEVBQUUsS0FBSztnQkFDZixZQUFZLEVBQUUsS0FBSztnQkFDbkIsS0FBSyxFQUFFO29CQUFTLGNBQWM7eUJBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYzt3QkFBZCx5QkFBYzs7b0JBQzVCLElBQU0sV0FBVyxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEYsT0FBTywwQkFBMEIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMxRixDQUFDO2FBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxFQUFWLENBQVUsQ0FBQyxDQUFDO1FBQ3BGLG1FQUFtRTtRQUNuRSxJQUFNLElBQUksR0FBRztZQUFBLGlCQUtaO1lBTHFCLGNBQWM7aUJBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztnQkFBZCx5QkFBYzs7WUFDbEMsSUFBTSxXQUFXLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xGLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxJQUFPLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsMEJBQTBCLENBQ3RCLGNBQWMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEYsQ0FBQyxDQUFDO1FBQ0YsSUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEcsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUMxRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDtRQUNFLDhCQUFvQixTQUEyQjtZQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFHLENBQUM7UUFDbkQsdUNBQVEsR0FBUixVQUFTLEdBQW9DLElBQVksT0FBTyx1Q0FBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEcsa0RBQW1CLEdBQW5CLFVBQW9CLElBQXNCLEVBQUUsR0FBc0I7WUFDaEUsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDcEYsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN0QyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDN0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsZ0RBQWlCLEdBQWpCLFVBQWtCLElBQW9CLEVBQUUsR0FBc0I7WUFDNUQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNsQixPQUFPLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNuQyxPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQVEsQ0FBQzthQUM1QjtZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQXlCLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsbURBQW9CLEdBQXBCLFVBQXFCLEdBQTJCLEVBQUUsR0FBc0I7WUFDdEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCw4Q0FBZSxHQUFmLFVBQWdCLEdBQWlCLEVBQUUsR0FBc0I7WUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCwrQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBa0IsRUFBRSxHQUFzQjtZQUN6RCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBTSxDQUFDO1lBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLFFBQVEsR0FBRyxDQUFDLE9BQU8sRUFBRTtvQkFDbkIsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUs7d0JBQ3JCLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7b0JBQ2hDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJO3dCQUNwQixPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVO3dCQUMxQixPQUFPLEdBQUcsZUFBZSxDQUFDO3dCQUMxQixNQUFNO29CQUNSLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVO3dCQUMxQixPQUFPLEdBQUcsZUFBZSxDQUFDO3dCQUMxQixNQUFNO29CQUNSO3dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTRCLEdBQUcsQ0FBQyxPQUFTLENBQUMsQ0FBQztpQkFDOUQ7YUFDRjtZQUNELElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNsQixPQUFPLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzdCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2xDO2dCQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBUSxDQUFDO2FBQzVCO1lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBeUIsT0FBUyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNELGdEQUFpQixHQUFqQixVQUFrQixJQUFvQixFQUFFLEdBQXNCO1lBQzVELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDeEIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsaURBQWtCLEdBQWxCLFVBQW1CLElBQXFCLEVBQUUsR0FBc0I7WUFDOUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCxvREFBcUIsR0FBckIsVUFBc0IsSUFBd0IsRUFBRSxHQUFzQjtZQUNwRSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEQsSUFBSSxNQUFXLENBQUM7WUFDaEIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDeEIsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNwQixLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVzt3QkFDOUIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLE9BQWYsUUFBUSxtQkFBVyxJQUFJLEVBQUMsQ0FBQzt3QkFDbEMsTUFBTTtvQkFDUixLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsbUJBQW1CO3dCQUN0QyxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO3dCQUM3QyxNQUFNO29CQUNSLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJO3dCQUN2QixNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksT0FBYixRQUFRLG1CQUFTLElBQUksRUFBQyxDQUFDO3dCQUNoQyxNQUFNO29CQUNSO3dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTBCLElBQUksQ0FBQyxPQUFTLENBQUMsQ0FBQztpQkFDN0Q7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNELHNEQUF1QixHQUF2QixVQUF3QixJQUEwQixFQUFFLEdBQXNCO1lBQ3hFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkIsSUFBSSxNQUFNLFlBQVksQ0FBQyxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO2dCQUM1RSxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN6RSxPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNMLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM3QjtRQUNILENBQUM7UUFDRCw4Q0FBZSxHQUFmLFVBQWdCLElBQXVCLEVBQUUsR0FBc0I7WUFDN0QsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQ0Qsb0RBQXFCLEdBQXJCLFVBQXNCLElBQWlCLEVBQUUsR0FBc0I7WUFDN0QsSUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM3QyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxrREFBbUIsR0FBbkIsVUFBb0IsSUFBMkIsRUFBRSxHQUFzQjtZQUNyRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsMENBQVcsR0FBWCxVQUFZLElBQWMsRUFBRSxHQUFzQjtZQUNoRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNwRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUNqQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsZ0RBQWlCLEdBQWpCLFVBQWtCLElBQW9CLEVBQUUsR0FBc0I7WUFDNUQsSUFBSTtnQkFDRixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3JEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQ2hELFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUMzRDtRQUNILENBQUM7UUFDRCw2Q0FBYyxHQUFkLFVBQWUsSUFBaUIsRUFBRSxHQUFzQjtZQUN0RCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsK0NBQWdCLEdBQWhCLFVBQWlCLElBQW1CLEVBQUUsT0FBYSxJQUFTLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRSxvREFBcUIsR0FBckIsVUFBc0IsSUFBd0IsRUFBRSxPQUFhLElBQVMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLG1EQUFvQixHQUFwQixVQUFxQixHQUFzQixFQUFFLEdBQXNCO1lBQ2pFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2RCxZQUFXLEtBQUssWUFBTCxLQUFLLDZCQUFJLElBQUksTUFBRTtRQUM1QixDQUFDO1FBQ0QsK0NBQWdCLEdBQWhCLFVBQWlCLEdBQWtCLEVBQUUsR0FBc0IsSUFBUyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLGdEQUFpQixHQUFqQixVQUFrQixHQUFtQixFQUFFLEdBQXNCO1lBQzNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNELG1EQUFvQixHQUFwQixVQUFxQixHQUFzQixFQUFFLEdBQXNCO1lBQ2pFLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QyxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUNoQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNqRDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELDJDQUFZLEdBQVosVUFBYSxHQUFjLEVBQUUsR0FBc0I7WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0QscURBQXNCLEdBQXRCLFVBQXVCLEdBQW9CLEVBQUUsR0FBc0I7WUFDakUsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELDRDQUFhLEdBQWIsVUFBYyxHQUFlLEVBQUUsR0FBc0I7WUFDbkQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUNELGdEQUFpQixHQUFqQixVQUFrQixHQUFtQixFQUFFLEdBQXNCO1lBQzNELElBQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBVixDQUFVLENBQUMsQ0FBQztZQUN6RCxPQUFPLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUNELHVEQUF3QixHQUF4QixVQUF5QixJQUEyQixFQUFFLEdBQXNCO1lBQzFFLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBVixDQUFVLENBQUMsQ0FBQztZQUMxRCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1RSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDN0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0Qsc0RBQXVCLEdBQXZCLFVBQXdCLEdBQXlCLEVBQUUsR0FBc0I7WUFBekUsaUJBc0NDO1lBckNDLElBQU0sR0FBRyxHQUFHLGNBQU0sT0FBQSxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFJLEVBQUUsR0FBRyxDQUFDLEVBQWxDLENBQWtDLENBQUM7WUFDckQsSUFBTSxHQUFHLEdBQUcsY0FBTSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUksRUFBRSxHQUFHLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQztZQUVyRCxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BCLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNO29CQUMxQixPQUFPLEdBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUztvQkFDN0IsT0FBTyxHQUFHLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDekIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVM7b0JBQzdCLE9BQU8sR0FBRyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZO29CQUNoQyxPQUFPLEdBQUcsRUFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUN6QixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRztvQkFDdkIsT0FBTyxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUU7b0JBQ3RCLE9BQU8sR0FBRyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJO29CQUN4QixPQUFPLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSztvQkFDekIsT0FBTyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU07b0JBQzFCLE9BQU8sR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRO29CQUM1QixPQUFPLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTTtvQkFDMUIsT0FBTyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUs7b0JBQ3pCLE9BQU8sR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxXQUFXO29CQUMvQixPQUFPLEdBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTTtvQkFDMUIsT0FBTyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVk7b0JBQ2hDLE9BQU8sR0FBRyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ3hCO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQW9CLEdBQUcsQ0FBQyxRQUFVLENBQUMsQ0FBQzthQUN2RDtRQUNILENBQUM7UUFDRCxnREFBaUIsR0FBakIsVUFBa0IsR0FBbUIsRUFBRSxHQUFzQjtZQUMzRCxJQUFJLE1BQVcsQ0FBQztZQUNoQixJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekQsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNELCtDQUFnQixHQUFoQixVQUFpQixHQUFrQixFQUFFLEdBQXNCO1lBQ3pELElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6RCxJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNELG9EQUFxQixHQUFyQixVQUFzQixHQUF1QixFQUFFLEdBQXNCO1lBQ25FLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELGtEQUFtQixHQUFuQixVQUFvQixHQUFxQixFQUFFLEdBQXNCO1lBQWpFLGlCQUlDO1lBSEMsSUFBTSxNQUFNLEdBQXVCLEVBQUUsQ0FBQztZQUN0QyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSSxFQUFFLEdBQUcsQ0FBQyxFQUExRCxDQUEwRCxDQUFDLENBQUM7WUFDekYsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNELDZDQUFjLEdBQWQsVUFBZSxHQUFnQixFQUFFLE9BQVk7WUFDM0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0Qsa0RBQW1CLEdBQW5CLFVBQW9CLFdBQTJCLEVBQUUsR0FBc0I7WUFBdkUsaUJBRUM7WUFEQyxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUksRUFBRSxHQUFHLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFFRCxpREFBa0IsR0FBbEIsVUFBbUIsVUFBeUIsRUFBRSxHQUFzQjtZQUNsRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxHQUFHLFlBQVksV0FBVyxFQUFFO29CQUM5QixPQUFPLEdBQUcsQ0FBQztpQkFDWjthQUNGO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0gsMkJBQUM7SUFBRCxDQUFDLEFBalFELElBaVFDO0lBRUQsb0JBQ0ksUUFBa0IsRUFBRSxVQUF5QixFQUFFLEdBQXNCLEVBQ3JFLE9BQTZCO1FBQy9CLE9BQU87WUFBQyxjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7O1lBQUssT0FBQSwwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDO1FBQXBFLENBQW9FLENBQUM7SUFDbEcsQ0FBQztJQUVELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQztJQUNoQyxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuXG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4uL2NvbXBpbGVfcmVmbGVjdG9yJztcblxuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dF9hc3QnO1xuaW1wb3J0IHtkZWJ1Z091dHB1dEFzdEFzVHlwZVNjcmlwdH0gZnJvbSAnLi90c19lbWl0dGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVycHJldFN0YXRlbWVudHMoXG4gICAgc3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSwgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBjdHggPSBuZXcgX0V4ZWN1dGlvbkNvbnRleHQobnVsbCwgbnVsbCwgbnVsbCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XG4gIGNvbnN0IHZpc2l0b3IgPSBuZXcgU3RhdGVtZW50SW50ZXJwcmV0ZXIocmVmbGVjdG9yKTtcbiAgdmlzaXRvci52aXNpdEFsbFN0YXRlbWVudHMoc3RhdGVtZW50cywgY3R4KTtcbiAgY29uc3QgcmVzdWx0OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBjdHguZXhwb3J0cy5mb3JFYWNoKChleHBvcnROYW1lKSA9PiB7IHJlc3VsdFtleHBvcnROYW1lXSA9IGN0eC52YXJzLmdldChleHBvcnROYW1lKTsgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIF9leGVjdXRlRnVuY3Rpb25TdGF0ZW1lbnRzKFxuICAgIHZhck5hbWVzOiBzdHJpbmdbXSwgdmFyVmFsdWVzOiBhbnlbXSwgc3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCxcbiAgICB2aXNpdG9yOiBTdGF0ZW1lbnRJbnRlcnByZXRlcik6IGFueSB7XG4gIGNvbnN0IGNoaWxkQ3R4ID0gY3R4LmNyZWF0ZUNoaWxkV2lodExvY2FsVmFycygpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhck5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2hpbGRDdHgudmFycy5zZXQodmFyTmFtZXNbaV0sIHZhclZhbHVlc1tpXSk7XG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gdmlzaXRvci52aXNpdEFsbFN0YXRlbWVudHMoc3RhdGVtZW50cywgY2hpbGRDdHgpO1xuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0LnZhbHVlIDogbnVsbDtcbn1cblxuY2xhc3MgX0V4ZWN1dGlvbkNvbnRleHQge1xuICBleHBvcnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHBhcmVudDogX0V4ZWN1dGlvbkNvbnRleHR8bnVsbCwgcHVibGljIGluc3RhbmNlOiBhbnksIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZ3xudWxsLFxuICAgICAgcHVibGljIHZhcnM6IE1hcDxzdHJpbmcsIGFueT4pIHt9XG5cbiAgY3JlYXRlQ2hpbGRXaWh0TG9jYWxWYXJzKCk6IF9FeGVjdXRpb25Db250ZXh0IHtcbiAgICByZXR1cm4gbmV3IF9FeGVjdXRpb25Db250ZXh0KHRoaXMsIHRoaXMuaW5zdGFuY2UsIHRoaXMuY2xhc3NOYW1lLCBuZXcgTWFwPHN0cmluZywgYW55PigpKTtcbiAgfVxufVxuXG5jbGFzcyBSZXR1cm5WYWx1ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55KSB7fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEeW5hbWljQ2xhc3MoXG4gICAgX2NsYXNzU3RtdDogby5DbGFzc1N0bXQsIF9jdHg6IF9FeGVjdXRpb25Db250ZXh0LCBfdmlzaXRvcjogU3RhdGVtZW50SW50ZXJwcmV0ZXIpOiBGdW5jdGlvbiB7XG4gIGNvbnN0IHByb3BlcnR5RGVzY3JpcHRvcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgX2NsYXNzU3RtdC5nZXR0ZXJzLmZvckVhY2goKGdldHRlcjogby5DbGFzc0dldHRlcikgPT4ge1xuICAgIC8vIE5vdGU6IHVzZSBgZnVuY3Rpb25gIGluc3RlYWQgb2YgYXJyb3cgZnVuY3Rpb24gdG8gY2FwdHVyZSBgdGhpc2BcbiAgICBwcm9wZXJ0eURlc2NyaXB0b3JzW2dldHRlci5uYW1lXSA9IHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZUN0eCA9IG5ldyBfRXhlY3V0aW9uQ29udGV4dChfY3R4LCB0aGlzLCBfY2xhc3NTdG10Lm5hbWUsIF9jdHgudmFycyk7XG4gICAgICAgIHJldHVybiBfZXhlY3V0ZUZ1bmN0aW9uU3RhdGVtZW50cyhbXSwgW10sIGdldHRlci5ib2R5LCBpbnN0YW5jZUN0eCwgX3Zpc2l0b3IpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBfY2xhc3NTdG10Lm1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2Q6IG8uQ2xhc3NNZXRob2QpIHtcbiAgICBjb25zdCBwYXJhbU5hbWVzID0gbWV0aG9kLnBhcmFtcy5tYXAocGFyYW0gPT4gcGFyYW0ubmFtZSk7XG4gICAgLy8gTm90ZTogdXNlIGBmdW5jdGlvbmAgaW5zdGVhZCBvZiBhcnJvdyBmdW5jdGlvbiB0byBjYXB0dXJlIGB0aGlzYFxuICAgIHByb3BlcnR5RGVzY3JpcHRvcnNbbWV0aG9kLm5hbWUgIV0gPSB7XG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlQ3R4ID0gbmV3IF9FeGVjdXRpb25Db250ZXh0KF9jdHgsIHRoaXMsIF9jbGFzc1N0bXQubmFtZSwgX2N0eC52YXJzKTtcbiAgICAgICAgcmV0dXJuIF9leGVjdXRlRnVuY3Rpb25TdGF0ZW1lbnRzKHBhcmFtTmFtZXMsIGFyZ3MsIG1ldGhvZC5ib2R5LCBpbnN0YW5jZUN0eCwgX3Zpc2l0b3IpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIGNvbnN0IGN0b3JQYXJhbU5hbWVzID0gX2NsYXNzU3RtdC5jb25zdHJ1Y3Rvck1ldGhvZC5wYXJhbXMubWFwKHBhcmFtID0+IHBhcmFtLm5hbWUpO1xuICAvLyBOb3RlOiB1c2UgYGZ1bmN0aW9uYCBpbnN0ZWFkIG9mIGFycm93IGZ1bmN0aW9uIHRvIGNhcHR1cmUgYHRoaXNgXG4gIGNvbnN0IGN0b3IgPSBmdW5jdGlvbiguLi5hcmdzOiBhbnlbXSkge1xuICAgIGNvbnN0IGluc3RhbmNlQ3R4ID0gbmV3IF9FeGVjdXRpb25Db250ZXh0KF9jdHgsIHRoaXMsIF9jbGFzc1N0bXQubmFtZSwgX2N0eC52YXJzKTtcbiAgICBfY2xhc3NTdG10LmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4geyB0aGlzW2ZpZWxkLm5hbWVdID0gdW5kZWZpbmVkOyB9KTtcbiAgICBfZXhlY3V0ZUZ1bmN0aW9uU3RhdGVtZW50cyhcbiAgICAgICAgY3RvclBhcmFtTmFtZXMsIGFyZ3MsIF9jbGFzc1N0bXQuY29uc3RydWN0b3JNZXRob2QuYm9keSwgaW5zdGFuY2VDdHgsIF92aXNpdG9yKTtcbiAgfTtcbiAgY29uc3Qgc3VwZXJDbGFzcyA9IF9jbGFzc1N0bXQucGFyZW50ID8gX2NsYXNzU3RtdC5wYXJlbnQudmlzaXRFeHByZXNzaW9uKF92aXNpdG9yLCBfY3R4KSA6IE9iamVjdDtcbiAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlLCBwcm9wZXJ0eURlc2NyaXB0b3JzKTtcbiAgcmV0dXJuIGN0b3I7XG59XG5cbmNsYXNzIFN0YXRlbWVudEludGVycHJldGVyIGltcGxlbWVudHMgby5TdGF0ZW1lbnRWaXNpdG9yLCBvLkV4cHJlc3Npb25WaXNpdG9yIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IpIHt9XG4gIGRlYnVnQXN0KGFzdDogby5FeHByZXNzaW9ufG8uU3RhdGVtZW50fG8uVHlwZSk6IHN0cmluZyB7IHJldHVybiBkZWJ1Z091dHB1dEFzdEFzVHlwZVNjcmlwdChhc3QpOyB9XG5cbiAgdmlzaXREZWNsYXJlVmFyU3RtdChzdG10OiBvLkRlY2xhcmVWYXJTdG10LCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICBjb25zdCBpbml0aWFsVmFsdWUgPSBzdG10LnZhbHVlID8gc3RtdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KSA6IHVuZGVmaW5lZDtcbiAgICBjdHgudmFycy5zZXQoc3RtdC5uYW1lLCBpbml0aWFsVmFsdWUpO1xuICAgIGlmIChzdG10Lmhhc01vZGlmaWVyKG8uU3RtdE1vZGlmaWVyLkV4cG9ydGVkKSkge1xuICAgICAgY3R4LmV4cG9ydHMucHVzaChzdG10Lm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFdyaXRlVmFyRXhwcihleHByOiBvLldyaXRlVmFyRXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgY29uc3QgdmFsdWUgPSBleHByLnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGxldCBjdXJyQ3R4ID0gY3R4O1xuICAgIHdoaWxlIChjdXJyQ3R4ICE9IG51bGwpIHtcbiAgICAgIGlmIChjdXJyQ3R4LnZhcnMuaGFzKGV4cHIubmFtZSkpIHtcbiAgICAgICAgY3VyckN0eC52YXJzLnNldChleHByLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgY3VyckN0eCA9IGN1cnJDdHgucGFyZW50ICE7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm90IGRlY2xhcmVkIHZhcmlhYmxlICR7ZXhwci5uYW1lfWApO1xuICB9XG4gIHZpc2l0V3JhcHBlZE5vZGVFeHByKGFzdDogby5XcmFwcGVkTm9kZUV4cHI8YW55PiwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IG5ldmVyIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnRlcnByZXQgYSBXcmFwcGVkTm9kZUV4cHIuJyk7XG4gIH1cbiAgdmlzaXRUeXBlb2ZFeHByKGFzdDogby5UeXBlb2ZFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogbmV2ZXIge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludGVycHJldCBhIFR5cGVvZkV4cHInKTtcbiAgfVxuICB2aXNpdFJlYWRWYXJFeHByKGFzdDogby5SZWFkVmFyRXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgbGV0IHZhck5hbWUgPSBhc3QubmFtZSAhO1xuICAgIGlmIChhc3QuYnVpbHRpbiAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGFzdC5idWlsdGluKSB7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLlN1cGVyOlxuICAgICAgICAgIHJldHVybiBjdHguaW5zdGFuY2UuX19wcm90b19fO1xuICAgICAgICBjYXNlIG8uQnVpbHRpblZhci5UaGlzOlxuICAgICAgICAgIHJldHVybiBjdHguaW5zdGFuY2U7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLkNhdGNoRXJyb3I6XG4gICAgICAgICAgdmFyTmFtZSA9IENBVENIX0VSUk9SX1ZBUjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBvLkJ1aWx0aW5WYXIuQ2F0Y2hTdGFjazpcbiAgICAgICAgICB2YXJOYW1lID0gQ0FUQ0hfU1RBQ0tfVkFSO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBidWlsdGluIHZhcmlhYmxlICR7YXN0LmJ1aWx0aW59YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBjdXJyQ3R4ID0gY3R4O1xuICAgIHdoaWxlIChjdXJyQ3R4ICE9IG51bGwpIHtcbiAgICAgIGlmIChjdXJyQ3R4LnZhcnMuaGFzKHZhck5hbWUpKSB7XG4gICAgICAgIHJldHVybiBjdXJyQ3R4LnZhcnMuZ2V0KHZhck5hbWUpO1xuICAgICAgfVxuICAgICAgY3VyckN0eCA9IGN1cnJDdHgucGFyZW50ICE7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm90IGRlY2xhcmVkIHZhcmlhYmxlICR7dmFyTmFtZX1gKTtcbiAgfVxuICB2aXNpdFdyaXRlS2V5RXhwcihleHByOiBvLldyaXRlS2V5RXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBleHByLnJlY2VpdmVyLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGNvbnN0IGluZGV4ID0gZXhwci5pbmRleC52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjb25zdCB2YWx1ZSA9IGV4cHIudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgcmVjZWl2ZXJbaW5kZXhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZpc2l0V3JpdGVQcm9wRXhwcihleHByOiBvLldyaXRlUHJvcEV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IHJlY2VpdmVyID0gZXhwci5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjb25zdCB2YWx1ZSA9IGV4cHIudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgcmVjZWl2ZXJbZXhwci5uYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHZpc2l0SW52b2tlTWV0aG9kRXhwcihleHByOiBvLkludm9rZU1ldGhvZEV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IHJlY2VpdmVyID0gZXhwci5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbEV4cHJlc3Npb25zKGV4cHIuYXJncywgY3R4KTtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgaWYgKGV4cHIuYnVpbHRpbiAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGV4cHIuYnVpbHRpbikge1xuICAgICAgICBjYXNlIG8uQnVpbHRpbk1ldGhvZC5Db25jYXRBcnJheTpcbiAgICAgICAgICByZXN1bHQgPSByZWNlaXZlci5jb25jYXQoLi4uYXJncyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLlN1YnNjcmliZU9ic2VydmFibGU6XG4gICAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZXIuc3Vic2NyaWJlKHtuZXh0OiBhcmdzWzBdfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLkJpbmQ6XG4gICAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZXIuYmluZCguLi5hcmdzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYnVpbHRpbiBtZXRob2QgJHtleHByLmJ1aWx0aW59YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHJlY2VpdmVyW2V4cHIubmFtZSAhXS5hcHBseShyZWNlaXZlciwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmlzaXRJbnZva2VGdW5jdGlvbkV4cHIoc3RtdDogby5JbnZva2VGdW5jdGlvbkV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IGFyZ3MgPSB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoc3RtdC5hcmdzLCBjdHgpO1xuICAgIGNvbnN0IGZuRXhwciA9IHN0bXQuZm47XG4gICAgaWYgKGZuRXhwciBpbnN0YW5jZW9mIG8uUmVhZFZhckV4cHIgJiYgZm5FeHByLmJ1aWx0aW4gPT09IG8uQnVpbHRpblZhci5TdXBlcikge1xuICAgICAgY3R4Lmluc3RhbmNlLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5hcHBseShjdHguaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZuID0gc3RtdC5mbi52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gIH1cbiAgdmlzaXRSZXR1cm5TdG10KHN0bXQ6IG8uUmV0dXJuU3RhdGVtZW50LCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICByZXR1cm4gbmV3IFJldHVyblZhbHVlKHN0bXQudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCkpO1xuICB9XG4gIHZpc2l0RGVjbGFyZUNsYXNzU3RtdChzdG10OiBvLkNsYXNzU3RtdCwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgY29uc3QgY2xhenogPSBjcmVhdGVEeW5hbWljQ2xhc3Moc3RtdCwgY3R4LCB0aGlzKTtcbiAgICBjdHgudmFycy5zZXQoc3RtdC5uYW1lLCBjbGF6eik7XG4gICAgaWYgKHN0bXQuaGFzTW9kaWZpZXIoby5TdG10TW9kaWZpZXIuRXhwb3J0ZWQpKSB7XG4gICAgICBjdHguZXhwb3J0cy5wdXNoKHN0bXQubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RXhwcmVzc2lvblN0bXQoc3RtdDogby5FeHByZXNzaW9uU3RhdGVtZW50LCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICByZXR1cm4gc3RtdC5leHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICB9XG4gIHZpc2l0SWZTdG10KHN0bXQ6IG8uSWZTdG10LCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICBjb25zdCBjb25kaXRpb24gPSBzdG10LmNvbmRpdGlvbi52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC50cnVlQ2FzZSwgY3R4KTtcbiAgICB9IGVsc2UgaWYgKHN0bXQuZmFsc2VDYXNlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LmZhbHNlQ2FzZSwgY3R4KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRUcnlDYXRjaFN0bXQoc3RtdDogby5UcnlDYXRjaFN0bXQsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC5ib2R5U3RtdHMsIGN0eCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc3QgY2hpbGRDdHggPSBjdHguY3JlYXRlQ2hpbGRXaWh0TG9jYWxWYXJzKCk7XG4gICAgICBjaGlsZEN0eC52YXJzLnNldChDQVRDSF9FUlJPUl9WQVIsIGUpO1xuICAgICAgY2hpbGRDdHgudmFycy5zZXQoQ0FUQ0hfU1RBQ0tfVkFSLCBlLnN0YWNrKTtcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LmNhdGNoU3RtdHMsIGNoaWxkQ3R4KTtcbiAgICB9XG4gIH1cbiAgdmlzaXRUaHJvd1N0bXQoc3RtdDogby5UaHJvd1N0bXQsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHRocm93IHN0bXQuZXJyb3IudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gIH1cbiAgdmlzaXRDb21tZW50U3RtdChzdG10OiBvLkNvbW1lbnRTdG10LCBjb250ZXh0PzogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRKU0RvY0NvbW1lbnRTdG10KHN0bXQ6IG8uSlNEb2NDb21tZW50U3RtdCwgY29udGV4dD86IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0SW5zdGFudGlhdGVFeHByKGFzdDogby5JbnN0YW50aWF0ZUV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IGFyZ3MgPSB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoYXN0LmFyZ3MsIGN0eCk7XG4gICAgY29uc3QgY2xhenogPSBhc3QuY2xhc3NFeHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIHJldHVybiBuZXcgY2xhenooLi4uYXJncyk7XG4gIH1cbiAgdmlzaXRMaXRlcmFsRXhwcihhc3Q6IG8uTGl0ZXJhbEV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkgeyByZXR1cm4gYXN0LnZhbHVlOyB9XG4gIHZpc2l0RXh0ZXJuYWxFeHByKGFzdDogby5FeHRlcm5hbEV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnJlZmxlY3Rvci5yZXNvbHZlRXh0ZXJuYWxSZWZlcmVuY2UoYXN0LnZhbHVlKTtcbiAgfVxuICB2aXNpdENvbmRpdGlvbmFsRXhwcihhc3Q6IG8uQ29uZGl0aW9uYWxFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICBpZiAoYXN0LmNvbmRpdGlvbi52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KSkge1xuICAgICAgcmV0dXJuIGFzdC50cnVlQ2FzZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICB9IGVsc2UgaWYgKGFzdC5mYWxzZUNhc2UgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGFzdC5mYWxzZUNhc2UudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0Tm90RXhwcihhc3Q6IG8uTm90RXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgcmV0dXJuICFhc3QuY29uZGl0aW9uLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICB9XG4gIHZpc2l0QXNzZXJ0Tm90TnVsbEV4cHIoYXN0OiBvLkFzc2VydE5vdE51bGwsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHJldHVybiBhc3QuY29uZGl0aW9uLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICB9XG4gIHZpc2l0Q2FzdEV4cHIoYXN0OiBvLkNhc3RFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICByZXR1cm4gYXN0LnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICB9XG4gIHZpc2l0RnVuY3Rpb25FeHByKGFzdDogby5GdW5jdGlvbkV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IHBhcmFtTmFtZXMgPSBhc3QucGFyYW1zLm1hcCgocGFyYW0pID0+IHBhcmFtLm5hbWUpO1xuICAgIHJldHVybiBfZGVjbGFyZUZuKHBhcmFtTmFtZXMsIGFzdC5zdGF0ZW1lbnRzLCBjdHgsIHRoaXMpO1xuICB9XG4gIHZpc2l0RGVjbGFyZUZ1bmN0aW9uU3RtdChzdG10OiBvLkRlY2xhcmVGdW5jdGlvblN0bXQsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IHBhcmFtTmFtZXMgPSBzdG10LnBhcmFtcy5tYXAoKHBhcmFtKSA9PiBwYXJhbS5uYW1lKTtcbiAgICBjdHgudmFycy5zZXQoc3RtdC5uYW1lLCBfZGVjbGFyZUZuKHBhcmFtTmFtZXMsIHN0bXQuc3RhdGVtZW50cywgY3R4LCB0aGlzKSk7XG4gICAgaWYgKHN0bXQuaGFzTW9kaWZpZXIoby5TdG10TW9kaWZpZXIuRXhwb3J0ZWQpKSB7XG4gICAgICBjdHguZXhwb3J0cy5wdXNoKHN0bXQubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0QmluYXJ5T3BlcmF0b3JFeHByKGFzdDogby5CaW5hcnlPcGVyYXRvckV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IGxocyA9ICgpID0+IGFzdC5saHMudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY29uc3QgcmhzID0gKCkgPT4gYXN0LnJocy52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcblxuICAgIHN3aXRjaCAoYXN0Lm9wZXJhdG9yKSB7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuRXF1YWxzOlxuICAgICAgICByZXR1cm4gbGhzKCkgPT0gcmhzKCk7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuSWRlbnRpY2FsOlxuICAgICAgICByZXR1cm4gbGhzKCkgPT09IHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk5vdEVxdWFsczpcbiAgICAgICAgcmV0dXJuIGxocygpICE9IHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk5vdElkZW50aWNhbDpcbiAgICAgICAgcmV0dXJuIGxocygpICE9PSByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5BbmQ6XG4gICAgICAgIHJldHVybiBsaHMoKSAmJiByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5PcjpcbiAgICAgICAgcmV0dXJuIGxocygpIHx8IHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLlBsdXM6XG4gICAgICAgIHJldHVybiBsaHMoKSArIHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk1pbnVzOlxuICAgICAgICByZXR1cm4gbGhzKCkgLSByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5EaXZpZGU6XG4gICAgICAgIHJldHVybiBsaHMoKSAvIHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk11bHRpcGx5OlxuICAgICAgICByZXR1cm4gbGhzKCkgKiByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5Nb2R1bG86XG4gICAgICAgIHJldHVybiBsaHMoKSAlIHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLkxvd2VyOlxuICAgICAgICByZXR1cm4gbGhzKCkgPCByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5Mb3dlckVxdWFsczpcbiAgICAgICAgcmV0dXJuIGxocygpIDw9IHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLkJpZ2dlcjpcbiAgICAgICAgcmV0dXJuIGxocygpID4gcmhzKCk7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuQmlnZ2VyRXF1YWxzOlxuICAgICAgICByZXR1cm4gbGhzKCkgPj0gcmhzKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gb3BlcmF0b3IgJHthc3Qub3BlcmF0b3J9YCk7XG4gICAgfVxuICB9XG4gIHZpc2l0UmVhZFByb3BFeHByKGFzdDogby5SZWFkUHJvcEV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICBjb25zdCByZWNlaXZlciA9IGFzdC5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICByZXN1bHQgPSByZWNlaXZlclthc3QubmFtZV07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB2aXNpdFJlYWRLZXlFeHByKGFzdDogby5SZWFkS2V5RXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY29uc3QgcHJvcCA9IGFzdC5pbmRleC52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICByZXR1cm4gcmVjZWl2ZXJbcHJvcF07XG4gIH1cbiAgdmlzaXRMaXRlcmFsQXJyYXlFeHByKGFzdDogby5MaXRlcmFsQXJyYXlFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aXNpdEFsbEV4cHJlc3Npb25zKGFzdC5lbnRyaWVzLCBjdHgpO1xuICB9XG4gIHZpc2l0TGl0ZXJhbE1hcEV4cHIoYXN0OiBvLkxpdGVyYWxNYXBFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICBjb25zdCByZXN1bHQ6IHtbazogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIGFzdC5lbnRyaWVzLmZvckVhY2goZW50cnkgPT4gcmVzdWx0W2VudHJ5LmtleV0gPSBlbnRyeS52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB2aXNpdENvbW1hRXhwcihhc3Q6IG8uQ29tbWFFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QucGFydHMsIGNvbnRleHQpO1xuICAgIHJldHVybiB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdO1xuICB9XG4gIHZpc2l0QWxsRXhwcmVzc2lvbnMoZXhwcmVzc2lvbnM6IG8uRXhwcmVzc2lvbltdLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbnMubWFwKChleHByKSA9PiBleHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpKTtcbiAgfVxuXG4gIHZpc2l0QWxsU3RhdGVtZW50cyhzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogUmV0dXJuVmFsdWV8bnVsbCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdG10ID0gc3RhdGVtZW50c1tpXTtcbiAgICAgIGNvbnN0IHZhbCA9IHN0bXQudmlzaXRTdGF0ZW1lbnQodGhpcywgY3R4KTtcbiAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBSZXR1cm5WYWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVjbGFyZUZuKFxuICAgIHZhck5hbWVzOiBzdHJpbmdbXSwgc3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCxcbiAgICB2aXNpdG9yOiBTdGF0ZW1lbnRJbnRlcnByZXRlcik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4gX2V4ZWN1dGVGdW5jdGlvblN0YXRlbWVudHModmFyTmFtZXMsIGFyZ3MsIHN0YXRlbWVudHMsIGN0eCwgdmlzaXRvcik7XG59XG5cbmNvbnN0IENBVENIX0VSUk9SX1ZBUiA9ICdlcnJvcic7XG5jb25zdCBDQVRDSF9TVEFDS19WQVIgPSAnc3RhY2snO1xuIl19