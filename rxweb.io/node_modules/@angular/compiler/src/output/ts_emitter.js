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
        define("@angular/compiler/src/output/ts_emitter", ["require", "exports", "tslib", "@angular/compiler/src/output/abstract_emitter", "@angular/compiler/src/output/output_ast"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var abstract_emitter_1 = require("@angular/compiler/src/output/abstract_emitter");
    var o = require("@angular/compiler/src/output/output_ast");
    var _debugFilePath = '/debug/lib';
    function debugOutputAstAsTypeScript(ast) {
        var converter = new _TsEmitterVisitor();
        var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot();
        var asts = Array.isArray(ast) ? ast : [ast];
        asts.forEach(function (ast) {
            if (ast instanceof o.Statement) {
                ast.visitStatement(converter, ctx);
            }
            else if (ast instanceof o.Expression) {
                ast.visitExpression(converter, ctx);
            }
            else if (ast instanceof o.Type) {
                ast.visitType(converter, ctx);
            }
            else {
                throw new Error("Don't know how to print debug info for " + ast);
            }
        });
        return ctx.toSource();
    }
    exports.debugOutputAstAsTypeScript = debugOutputAstAsTypeScript;
    var TypeScriptEmitter = /** @class */ (function () {
        function TypeScriptEmitter() {
        }
        TypeScriptEmitter.prototype.emitStatementsAndContext = function (genFilePath, stmts, preamble, emitSourceMaps, referenceFilter, importFilter) {
            if (preamble === void 0) { preamble = ''; }
            if (emitSourceMaps === void 0) { emitSourceMaps = true; }
            var converter = new _TsEmitterVisitor(referenceFilter, importFilter);
            var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot();
            converter.visitAllStatements(stmts, ctx);
            var preambleLines = preamble ? preamble.split('\n') : [];
            converter.reexports.forEach(function (reexports, exportedModuleName) {
                var reexportsCode = reexports.map(function (reexport) { return reexport.name + " as " + reexport.as; }).join(',');
                preambleLines.push("export {" + reexportsCode + "} from '" + exportedModuleName + "';");
            });
            converter.importsWithPrefixes.forEach(function (prefix, importedModuleName) {
                // Note: can't write the real word for import as it screws up system.js auto detection...
                preambleLines.push("imp" +
                    ("ort * as " + prefix + " from '" + importedModuleName + "';"));
            });
            var sm = emitSourceMaps ?
                ctx.toSourceMapGenerator(genFilePath, preambleLines.length).toJsComment() :
                '';
            var lines = tslib_1.__spread(preambleLines, [ctx.toSource(), sm]);
            if (sm) {
                // always add a newline at the end, as some tools have bugs without it.
                lines.push('');
            }
            ctx.setPreambleLineCount(preambleLines.length);
            return { sourceText: lines.join('\n'), context: ctx };
        };
        TypeScriptEmitter.prototype.emitStatements = function (genFilePath, stmts, preamble) {
            if (preamble === void 0) { preamble = ''; }
            return this.emitStatementsAndContext(genFilePath, stmts, preamble).sourceText;
        };
        return TypeScriptEmitter;
    }());
    exports.TypeScriptEmitter = TypeScriptEmitter;
    var _TsEmitterVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(_TsEmitterVisitor, _super);
        function _TsEmitterVisitor(referenceFilter, importFilter) {
            var _this = _super.call(this, false) || this;
            _this.referenceFilter = referenceFilter;
            _this.importFilter = importFilter;
            _this.typeExpression = 0;
            _this.importsWithPrefixes = new Map();
            _this.reexports = new Map();
            return _this;
        }
        _TsEmitterVisitor.prototype.visitType = function (t, ctx, defaultType) {
            if (defaultType === void 0) { defaultType = 'any'; }
            if (t) {
                this.typeExpression++;
                t.visitType(this, ctx);
                this.typeExpression--;
            }
            else {
                ctx.print(null, defaultType);
            }
        };
        _TsEmitterVisitor.prototype.visitLiteralExpr = function (ast, ctx) {
            var value = ast.value;
            if (value == null && ast.type != o.INFERRED_TYPE) {
                ctx.print(ast, "(" + value + " as any)");
                return null;
            }
            return _super.prototype.visitLiteralExpr.call(this, ast, ctx);
        };
        // Temporary workaround to support strictNullCheck enabled consumers of ngc emit.
        // In SNC mode, [] have the type never[], so we cast here to any[].
        // TODO: narrow the cast to a more explicit type, or use a pattern that does not
        // start with [].concat. see https://github.com/angular/angular/pull/11846
        _TsEmitterVisitor.prototype.visitLiteralArrayExpr = function (ast, ctx) {
            if (ast.entries.length === 0) {
                ctx.print(ast, '(');
            }
            var result = _super.prototype.visitLiteralArrayExpr.call(this, ast, ctx);
            if (ast.entries.length === 0) {
                ctx.print(ast, ' as any[])');
            }
            return result;
        };
        _TsEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
            this._visitIdentifier(ast.value, ast.typeParams, ctx);
            return null;
        };
        _TsEmitterVisitor.prototype.visitAssertNotNullExpr = function (ast, ctx) {
            var result = _super.prototype.visitAssertNotNullExpr.call(this, ast, ctx);
            ctx.print(ast, '!');
            return result;
        };
        _TsEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
            if (stmt.hasModifier(o.StmtModifier.Exported) && stmt.value instanceof o.ExternalExpr &&
                !stmt.type) {
                // check for a reexport
                var _a = stmt.value.value, name_1 = _a.name, moduleName = _a.moduleName;
                if (moduleName) {
                    var reexports = this.reexports.get(moduleName);
                    if (!reexports) {
                        reexports = [];
                        this.reexports.set(moduleName, reexports);
                    }
                    reexports.push({ name: name_1, as: stmt.name });
                    return null;
                }
            }
            if (stmt.hasModifier(o.StmtModifier.Exported)) {
                ctx.print(stmt, "export ");
            }
            if (stmt.hasModifier(o.StmtModifier.Final)) {
                ctx.print(stmt, "const");
            }
            else {
                ctx.print(stmt, "var");
            }
            ctx.print(stmt, " " + stmt.name);
            this._printColonType(stmt.type, ctx);
            if (stmt.value) {
                ctx.print(stmt, " = ");
                stmt.value.visitExpression(this, ctx);
            }
            ctx.println(stmt, ";");
            return null;
        };
        _TsEmitterVisitor.prototype.visitWrappedNodeExpr = function (ast, ctx) {
            throw new Error('Cannot visit a WrappedNodeExpr when outputting Typescript.');
        };
        _TsEmitterVisitor.prototype.visitCastExpr = function (ast, ctx) {
            ctx.print(ast, "(<");
            ast.type.visitType(this, ctx);
            ctx.print(ast, ">");
            ast.value.visitExpression(this, ctx);
            ctx.print(ast, ")");
            return null;
        };
        _TsEmitterVisitor.prototype.visitInstantiateExpr = function (ast, ctx) {
            ctx.print(ast, "new ");
            this.typeExpression++;
            ast.classExpr.visitExpression(this, ctx);
            this.typeExpression--;
            ctx.print(ast, "(");
            this.visitAllExpressions(ast.args, ctx, ',');
            ctx.print(ast, ")");
            return null;
        };
        _TsEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
            var _this = this;
            ctx.pushClass(stmt);
            if (stmt.hasModifier(o.StmtModifier.Exported)) {
                ctx.print(stmt, "export ");
            }
            ctx.print(stmt, "class " + stmt.name);
            if (stmt.parent != null) {
                ctx.print(stmt, " extends ");
                this.typeExpression++;
                stmt.parent.visitExpression(this, ctx);
                this.typeExpression--;
            }
            ctx.println(stmt, " {");
            ctx.incIndent();
            stmt.fields.forEach(function (field) { return _this._visitClassField(field, ctx); });
            if (stmt.constructorMethod != null) {
                this._visitClassConstructor(stmt, ctx);
            }
            stmt.getters.forEach(function (getter) { return _this._visitClassGetter(getter, ctx); });
            stmt.methods.forEach(function (method) { return _this._visitClassMethod(method, ctx); });
            ctx.decIndent();
            ctx.println(stmt, "}");
            ctx.popClass();
            return null;
        };
        _TsEmitterVisitor.prototype._visitClassField = function (field, ctx) {
            if (field.hasModifier(o.StmtModifier.Private)) {
                // comment out as a workaround for #10967
                ctx.print(null, "/*private*/ ");
            }
            if (field.hasModifier(o.StmtModifier.Static)) {
                ctx.print(null, 'static ');
            }
            ctx.print(null, field.name);
            this._printColonType(field.type, ctx);
            if (field.initializer) {
                ctx.print(null, ' = ');
                field.initializer.visitExpression(this, ctx);
            }
            ctx.println(null, ";");
        };
        _TsEmitterVisitor.prototype._visitClassGetter = function (getter, ctx) {
            if (getter.hasModifier(o.StmtModifier.Private)) {
                ctx.print(null, "private ");
            }
            ctx.print(null, "get " + getter.name + "()");
            this._printColonType(getter.type, ctx);
            ctx.println(null, " {");
            ctx.incIndent();
            this.visitAllStatements(getter.body, ctx);
            ctx.decIndent();
            ctx.println(null, "}");
        };
        _TsEmitterVisitor.prototype._visitClassConstructor = function (stmt, ctx) {
            ctx.print(stmt, "constructor(");
            this._visitParams(stmt.constructorMethod.params, ctx);
            ctx.println(stmt, ") {");
            ctx.incIndent();
            this.visitAllStatements(stmt.constructorMethod.body, ctx);
            ctx.decIndent();
            ctx.println(stmt, "}");
        };
        _TsEmitterVisitor.prototype._visitClassMethod = function (method, ctx) {
            if (method.hasModifier(o.StmtModifier.Private)) {
                ctx.print(null, "private ");
            }
            ctx.print(null, method.name + "(");
            this._visitParams(method.params, ctx);
            ctx.print(null, ")");
            this._printColonType(method.type, ctx, 'void');
            ctx.println(null, " {");
            ctx.incIndent();
            this.visitAllStatements(method.body, ctx);
            ctx.decIndent();
            ctx.println(null, "}");
        };
        _TsEmitterVisitor.prototype.visitFunctionExpr = function (ast, ctx) {
            if (ast.name) {
                ctx.print(ast, 'function ');
                ctx.print(ast, ast.name);
            }
            ctx.print(ast, "(");
            this._visitParams(ast.params, ctx);
            ctx.print(ast, ")");
            this._printColonType(ast.type, ctx, 'void');
            if (!ast.name) {
                ctx.print(ast, " => ");
            }
            ctx.println(ast, '{');
            ctx.incIndent();
            this.visitAllStatements(ast.statements, ctx);
            ctx.decIndent();
            ctx.print(ast, "}");
            return null;
        };
        _TsEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
            if (stmt.hasModifier(o.StmtModifier.Exported)) {
                ctx.print(stmt, "export ");
            }
            ctx.print(stmt, "function " + stmt.name + "(");
            this._visitParams(stmt.params, ctx);
            ctx.print(stmt, ")");
            this._printColonType(stmt.type, ctx, 'void');
            ctx.println(stmt, " {");
            ctx.incIndent();
            this.visitAllStatements(stmt.statements, ctx);
            ctx.decIndent();
            ctx.println(stmt, "}");
            return null;
        };
        _TsEmitterVisitor.prototype.visitTryCatchStmt = function (stmt, ctx) {
            ctx.println(stmt, "try {");
            ctx.incIndent();
            this.visitAllStatements(stmt.bodyStmts, ctx);
            ctx.decIndent();
            ctx.println(stmt, "} catch (" + abstract_emitter_1.CATCH_ERROR_VAR.name + ") {");
            ctx.incIndent();
            var catchStmts = [abstract_emitter_1.CATCH_STACK_VAR.set(abstract_emitter_1.CATCH_ERROR_VAR.prop('stack', null)).toDeclStmt(null, [
                    o.StmtModifier.Final
                ])].concat(stmt.catchStmts);
            this.visitAllStatements(catchStmts, ctx);
            ctx.decIndent();
            ctx.println(stmt, "}");
            return null;
        };
        _TsEmitterVisitor.prototype.visitBuiltinType = function (type, ctx) {
            var typeStr;
            switch (type.name) {
                case o.BuiltinTypeName.Bool:
                    typeStr = 'boolean';
                    break;
                case o.BuiltinTypeName.Dynamic:
                    typeStr = 'any';
                    break;
                case o.BuiltinTypeName.Function:
                    typeStr = 'Function';
                    break;
                case o.BuiltinTypeName.Number:
                    typeStr = 'number';
                    break;
                case o.BuiltinTypeName.Int:
                    typeStr = 'number';
                    break;
                case o.BuiltinTypeName.String:
                    typeStr = 'string';
                    break;
                case o.BuiltinTypeName.None:
                    typeStr = 'never';
                    break;
                default:
                    throw new Error("Unsupported builtin type " + type.name);
            }
            ctx.print(null, typeStr);
            return null;
        };
        _TsEmitterVisitor.prototype.visitExpressionType = function (ast, ctx) {
            var _this = this;
            ast.value.visitExpression(this, ctx);
            if (ast.typeParams !== null) {
                ctx.print(null, '<');
                this.visitAllObjects(function (type) { return _this.visitType(type, ctx); }, ast.typeParams, ctx, ',');
                ctx.print(null, '>');
            }
            return null;
        };
        _TsEmitterVisitor.prototype.visitArrayType = function (type, ctx) {
            this.visitType(type.of, ctx);
            ctx.print(null, "[]");
            return null;
        };
        _TsEmitterVisitor.prototype.visitMapType = function (type, ctx) {
            ctx.print(null, "{[key: string]:");
            this.visitType(type.valueType, ctx);
            ctx.print(null, "}");
            return null;
        };
        _TsEmitterVisitor.prototype.getBuiltinMethodName = function (method) {
            var name;
            switch (method) {
                case o.BuiltinMethod.ConcatArray:
                    name = 'concat';
                    break;
                case o.BuiltinMethod.SubscribeObservable:
                    name = 'subscribe';
                    break;
                case o.BuiltinMethod.Bind:
                    name = 'bind';
                    break;
                default:
                    throw new Error("Unknown builtin method: " + method);
            }
            return name;
        };
        _TsEmitterVisitor.prototype._visitParams = function (params, ctx) {
            var _this = this;
            this.visitAllObjects(function (param) {
                ctx.print(null, param.name);
                _this._printColonType(param.type, ctx);
            }, params, ctx, ',');
        };
        _TsEmitterVisitor.prototype._visitIdentifier = function (value, typeParams, ctx) {
            var _this = this;
            var name = value.name, moduleName = value.moduleName;
            if (this.referenceFilter && this.referenceFilter(value)) {
                ctx.print(null, '(null as any)');
                return;
            }
            if (moduleName && (!this.importFilter || !this.importFilter(value))) {
                var prefix = this.importsWithPrefixes.get(moduleName);
                if (prefix == null) {
                    prefix = "i" + this.importsWithPrefixes.size;
                    this.importsWithPrefixes.set(moduleName, prefix);
                }
                ctx.print(null, prefix + ".");
            }
            ctx.print(null, name);
            if (this.typeExpression > 0) {
                // If we are in a type expression that refers to a generic type then supply
                // the required type parameters. If there were not enough type parameters
                // supplied, supply any as the type. Outside a type expression the reference
                // should not supply type parameters and be treated as a simple value reference
                // to the constructor function itself.
                var suppliedParameters = typeParams || [];
                if (suppliedParameters.length > 0) {
                    ctx.print(null, "<");
                    this.visitAllObjects(function (type) { return type.visitType(_this, ctx); }, typeParams, ctx, ',');
                    ctx.print(null, ">");
                }
            }
        };
        _TsEmitterVisitor.prototype._printColonType = function (type, ctx, defaultType) {
            if (type !== o.INFERRED_TYPE) {
                ctx.print(null, ':');
                this.visitType(type, ctx, defaultType);
            }
        };
        return _TsEmitterVisitor;
    }(abstract_emitter_1.AbstractEmitterVisitor));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNfZW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9vdXRwdXQvdHNfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFNSCxrRkFBa0k7SUFDbEksMkRBQWtDO0lBRWxDLElBQU0sY0FBYyxHQUFHLFlBQVksQ0FBQztJQUVwQyxvQ0FBMkMsR0FBZ0Q7UUFFekYsSUFBTSxTQUFTLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQzFDLElBQU0sR0FBRyxHQUFHLHdDQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9DLElBQU0sSUFBSSxHQUFVLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNmLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUU7Z0JBQzlCLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RDLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQy9CO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTBDLEdBQUssQ0FBQyxDQUFDO2FBQ2xFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJ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LEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUM7UUFDSCx3QkFBQztJQUFELENBQUMsQUE3V0QsQ0FBZ0MseUNBQXNCLEdBNldyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG5pbXBvcnQge1N0YXRpY1N5bWJvbH0gZnJvbSAnLi4vYW90L3N0YXRpY19zeW1ib2wnO1xuaW1wb3J0IHtDb21waWxlSWRlbnRpZmllck1ldGFkYXRhfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcblxuaW1wb3J0IHtBYnN0cmFjdEVtaXR0ZXJWaXNpdG9yLCBDQVRDSF9FUlJPUl9WQVIsIENBVENIX1NUQUNLX1ZBUiwgRW1pdHRlclZpc2l0b3JDb250ZXh0LCBPdXRwdXRFbWl0dGVyfSBmcm9tICcuL2Fic3RyYWN0X2VtaXR0ZXInO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dF9hc3QnO1xuXG5jb25zdCBfZGVidWdGaWxlUGF0aCA9ICcvZGVidWcvbGliJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnT3V0cHV0QXN0QXNUeXBlU2NyaXB0KGFzdDogby5TdGF0ZW1lbnQgfCBvLkV4cHJlc3Npb24gfCBvLlR5cGUgfCBhbnlbXSk6XG4gICAgc3RyaW5nIHtcbiAgY29uc3QgY29udmVydGVyID0gbmV3IF9Uc0VtaXR0ZXJWaXNpdG9yKCk7XG4gIGNvbnN0IGN0eCA9IEVtaXR0ZXJWaXNpdG9yQ29udGV4dC5jcmVhdGVSb290KCk7XG4gIGNvbnN0IGFzdHM6IGFueVtdID0gQXJyYXkuaXNBcnJheShhc3QpID8gYXN0IDogW2FzdF07XG5cbiAgYXN0cy5mb3JFYWNoKChhc3QpID0+IHtcbiAgICBpZiAoYXN0IGluc3RhbmNlb2Ygby5TdGF0ZW1lbnQpIHtcbiAgICAgIGFzdC52aXNpdFN0YXRlbWVudChjb252ZXJ0ZXIsIGN0eCk7XG4gICAgfSBlbHNlIGlmIChhc3QgaW5zdGFuY2VvZiBvLkV4cHJlc3Npb24pIHtcbiAgICAgIGFzdC52aXNpdEV4cHJlc3Npb24oY29udmVydGVyLCBjdHgpO1xuICAgIH0gZWxzZSBpZiAoYXN0IGluc3RhbmNlb2Ygby5UeXBlKSB7XG4gICAgICBhc3QudmlzaXRUeXBlKGNvbnZlcnRlciwgY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEb24ndCBrbm93IGhvdyB0byBwcmludCBkZWJ1ZyBpbmZvIGZvciAke2FzdH1gKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY3R4LnRvU291cmNlKCk7XG59XG5cbmV4cG9ydCB0eXBlIFJlZmVyZW5jZUZpbHRlciA9IChyZWZlcmVuY2U6IG8uRXh0ZXJuYWxSZWZlcmVuY2UpID0+IGJvb2xlYW47XG5cbmV4cG9ydCBjbGFzcyBUeXBlU2NyaXB0RW1pdHRlciBpbXBsZW1lbnRzIE91dHB1dEVtaXR0ZXIge1xuICBlbWl0U3RhdGVtZW50c0FuZENvbnRleHQoXG4gICAgICBnZW5GaWxlUGF0aDogc3RyaW5nLCBzdG10czogby5TdGF0ZW1lbnRbXSwgcHJlYW1ibGU6IHN0cmluZyA9ICcnLFxuICAgICAgZW1pdFNvdXJjZU1hcHM6IGJvb2xlYW4gPSB0cnVlLCByZWZlcmVuY2VGaWx0ZXI/OiBSZWZlcmVuY2VGaWx0ZXIsXG4gICAgICBpbXBvcnRGaWx0ZXI/OiBSZWZlcmVuY2VGaWx0ZXIpOiB7c291cmNlVGV4dDogc3RyaW5nLCBjb250ZXh0OiBFbWl0dGVyVmlzaXRvckNvbnRleHR9IHtcbiAgICBjb25zdCBjb252ZXJ0ZXIgPSBuZXcgX1RzRW1pdHRlclZpc2l0b3IocmVmZXJlbmNlRmlsdGVyLCBpbXBvcnRGaWx0ZXIpO1xuXG4gICAgY29uc3QgY3R4ID0gRW1pdHRlclZpc2l0b3JDb250ZXh0LmNyZWF0ZVJvb3QoKTtcblxuICAgIGNvbnZlcnRlci52aXNpdEFsbFN0YXRlbWVudHMoc3RtdHMsIGN0eCk7XG5cbiAgICBjb25zdCBwcmVhbWJsZUxpbmVzID0gcHJlYW1ibGUgPyBwcmVhbWJsZS5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICBjb252ZXJ0ZXIucmVleHBvcnRzLmZvckVhY2goKHJlZXhwb3J0cywgZXhwb3J0ZWRNb2R1bGVOYW1lKSA9PiB7XG4gICAgICBjb25zdCByZWV4cG9ydHNDb2RlID1cbiAgICAgICAgICByZWV4cG9ydHMubWFwKHJlZXhwb3J0ID0+IGAke3JlZXhwb3J0Lm5hbWV9IGFzICR7cmVleHBvcnQuYXN9YCkuam9pbignLCcpO1xuICAgICAgcHJlYW1ibGVMaW5lcy5wdXNoKGBleHBvcnQgeyR7cmVleHBvcnRzQ29kZX19IGZyb20gJyR7ZXhwb3J0ZWRNb2R1bGVOYW1lfSc7YCk7XG4gICAgfSk7XG5cbiAgICBjb252ZXJ0ZXIuaW1wb3J0c1dpdGhQcmVmaXhlcy5mb3JFYWNoKChwcmVmaXgsIGltcG9ydGVkTW9kdWxlTmFtZSkgPT4ge1xuICAgICAgLy8gTm90ZTogY2FuJ3Qgd3JpdGUgdGhlIHJlYWwgd29yZCBmb3IgaW1wb3J0IGFzIGl0IHNjcmV3cyB1cCBzeXN0ZW0uanMgYXV0byBkZXRlY3Rpb24uLi5cbiAgICAgIHByZWFtYmxlTGluZXMucHVzaChcbiAgICAgICAgICBgaW1wYCArXG4gICAgICAgICAgYG9ydCAqIGFzICR7cHJlZml4fSBmcm9tICcke2ltcG9ydGVkTW9kdWxlTmFtZX0nO2ApO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc20gPSBlbWl0U291cmNlTWFwcyA/XG4gICAgICAgIGN0eC50b1NvdXJjZU1hcEdlbmVyYXRvcihnZW5GaWxlUGF0aCwgcHJlYW1ibGVMaW5lcy5sZW5ndGgpLnRvSnNDb21tZW50KCkgOlxuICAgICAgICAnJztcbiAgICBjb25zdCBsaW5lcyA9IFsuLi5wcmVhbWJsZUxpbmVzLCBjdHgudG9Tb3VyY2UoKSwgc21dO1xuICAgIGlmIChzbSkge1xuICAgICAgLy8gYWx3YXlzIGFkZCBhIG5ld2xpbmUgYXQgdGhlIGVuZCwgYXMgc29tZSB0b29scyBoYXZlIGJ1Z3Mgd2l0aG91dCBpdC5cbiAgICAgIGxpbmVzLnB1c2goJycpO1xuICAgIH1cbiAgICBjdHguc2V0UHJlYW1ibGVMaW5lQ291bnQocHJlYW1ibGVMaW5lcy5sZW5ndGgpO1xuICAgIHJldHVybiB7c291cmNlVGV4dDogbGluZXMuam9pbignXFxuJyksIGNvbnRleHQ6IGN0eH07XG4gIH1cblxuICBlbWl0U3RhdGVtZW50cyhnZW5GaWxlUGF0aDogc3RyaW5nLCBzdG10czogby5TdGF0ZW1lbnRbXSwgcHJlYW1ibGU6IHN0cmluZyA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdFN0YXRlbWVudHNBbmRDb250ZXh0KGdlbkZpbGVQYXRoLCBzdG10cywgcHJlYW1ibGUpLnNvdXJjZVRleHQ7XG4gIH1cbn1cblxuXG5jbGFzcyBfVHNFbWl0dGVyVmlzaXRvciBleHRlbmRzIEFic3RyYWN0RW1pdHRlclZpc2l0b3IgaW1wbGVtZW50cyBvLlR5cGVWaXNpdG9yIHtcbiAgcHJpdmF0ZSB0eXBlRXhwcmVzc2lvbiA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWZlcmVuY2VGaWx0ZXI/OiBSZWZlcmVuY2VGaWx0ZXIsIHByaXZhdGUgaW1wb3J0RmlsdGVyPzogUmVmZXJlbmNlRmlsdGVyKSB7XG4gICAgc3VwZXIoZmFsc2UpO1xuICB9XG5cbiAgaW1wb3J0c1dpdGhQcmVmaXhlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIHJlZXhwb3J0cyA9IG5ldyBNYXA8c3RyaW5nLCB7bmFtZTogc3RyaW5nLCBhczogc3RyaW5nfVtdPigpO1xuXG4gIHZpc2l0VHlwZSh0OiBvLlR5cGV8bnVsbCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQsIGRlZmF1bHRUeXBlOiBzdHJpbmcgPSAnYW55Jykge1xuICAgIGlmICh0KSB7XG4gICAgICB0aGlzLnR5cGVFeHByZXNzaW9uKys7XG4gICAgICB0LnZpc2l0VHlwZSh0aGlzLCBjdHgpO1xuICAgICAgdGhpcy50eXBlRXhwcmVzc2lvbi0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHgucHJpbnQobnVsbCwgZGVmYXVsdFR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbEV4cHIoYXN0OiBvLkxpdGVyYWxFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY29uc3QgdmFsdWUgPSBhc3QudmFsdWU7XG4gICAgaWYgKHZhbHVlID09IG51bGwgJiYgYXN0LnR5cGUgIT0gby5JTkZFUlJFRF9UWVBFKSB7XG4gICAgICBjdHgucHJpbnQoYXN0LCBgKCR7dmFsdWV9IGFzIGFueSlgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXIudmlzaXRMaXRlcmFsRXhwcihhc3QsIGN0eCk7XG4gIH1cblxuXG4gIC8vIFRlbXBvcmFyeSB3b3JrYXJvdW5kIHRvIHN1cHBvcnQgc3RyaWN0TnVsbENoZWNrIGVuYWJsZWQgY29uc3VtZXJzIG9mIG5nYyBlbWl0LlxuICAvLyBJbiBTTkMgbW9kZSwgW10gaGF2ZSB0aGUgdHlwZSBuZXZlcltdLCBzbyB3ZSBjYXN0IGhlcmUgdG8gYW55W10uXG4gIC8vIFRPRE86IG5hcnJvdyB0aGUgY2FzdCB0byBhIG1vcmUgZXhwbGljaXQgdHlwZSwgb3IgdXNlIGEgcGF0dGVybiB0aGF0IGRvZXMgbm90XG4gIC8vIHN0YXJ0IHdpdGggW10uY29uY2F0LiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9wdWxsLzExODQ2XG4gIHZpc2l0TGl0ZXJhbEFycmF5RXhwcihhc3Q6IG8uTGl0ZXJhbEFycmF5RXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGlmIChhc3QuZW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGN0eC5wcmludChhc3QsICcoJyk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHN1cGVyLnZpc2l0TGl0ZXJhbEFycmF5RXhwcihhc3QsIGN0eCk7XG4gICAgaWYgKGFzdC5lbnRyaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3R4LnByaW50KGFzdCwgJyBhcyBhbnlbXSknKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZpc2l0RXh0ZXJuYWxFeHByKGFzdDogby5FeHRlcm5hbEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICB0aGlzLl92aXNpdElkZW50aWZpZXIoYXN0LnZhbHVlLCBhc3QudHlwZVBhcmFtcywgY3R4KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0QXNzZXJ0Tm90TnVsbEV4cHIoYXN0OiBvLkFzc2VydE5vdE51bGwsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjb25zdCByZXN1bHQgPSBzdXBlci52aXNpdEFzc2VydE5vdE51bGxFeHByKGFzdCwgY3R4KTtcbiAgICBjdHgucHJpbnQoYXN0LCAnIScpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2aXNpdERlY2xhcmVWYXJTdG10KHN0bXQ6IG8uRGVjbGFyZVZhclN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBpZiAoc3RtdC5oYXNNb2RpZmllcihvLlN0bXRNb2RpZmllci5FeHBvcnRlZCkgJiYgc3RtdC52YWx1ZSBpbnN0YW5jZW9mIG8uRXh0ZXJuYWxFeHByICYmXG4gICAgICAgICFzdG10LnR5cGUpIHtcbiAgICAgIC8vIGNoZWNrIGZvciBhIHJlZXhwb3J0XG4gICAgICBjb25zdCB7bmFtZSwgbW9kdWxlTmFtZX0gPSBzdG10LnZhbHVlLnZhbHVlO1xuICAgICAgaWYgKG1vZHVsZU5hbWUpIHtcbiAgICAgICAgbGV0IHJlZXhwb3J0cyA9IHRoaXMucmVleHBvcnRzLmdldChtb2R1bGVOYW1lKTtcbiAgICAgICAgaWYgKCFyZWV4cG9ydHMpIHtcbiAgICAgICAgICByZWV4cG9ydHMgPSBbXTtcbiAgICAgICAgICB0aGlzLnJlZXhwb3J0cy5zZXQobW9kdWxlTmFtZSwgcmVleHBvcnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZWV4cG9ydHMucHVzaCh7bmFtZTogbmFtZSAhLCBhczogc3RtdC5uYW1lfSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RtdC5oYXNNb2RpZmllcihvLlN0bXRNb2RpZmllci5FeHBvcnRlZCkpIHtcbiAgICAgIGN0eC5wcmludChzdG10LCBgZXhwb3J0IGApO1xuICAgIH1cbiAgICBpZiAoc3RtdC5oYXNNb2RpZmllcihvLlN0bXRNb2RpZmllci5GaW5hbCkpIHtcbiAgICAgIGN0eC5wcmludChzdG10LCBgY29uc3RgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LnByaW50KHN0bXQsIGB2YXJgKTtcbiAgICB9XG4gICAgY3R4LnByaW50KHN0bXQsIGAgJHtzdG10Lm5hbWV9YCk7XG4gICAgdGhpcy5fcHJpbnRDb2xvblR5cGUoc3RtdC50eXBlLCBjdHgpO1xuICAgIGlmIChzdG10LnZhbHVlKSB7XG4gICAgICBjdHgucHJpbnQoc3RtdCwgYCA9IGApO1xuICAgICAgc3RtdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oc3RtdCwgYDtgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0V3JhcHBlZE5vZGVFeHByKGFzdDogby5XcmFwcGVkTm9kZUV4cHI8YW55PiwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBuZXZlciB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdmlzaXQgYSBXcmFwcGVkTm9kZUV4cHIgd2hlbiBvdXRwdXR0aW5nIFR5cGVzY3JpcHQuJyk7XG4gIH1cblxuICB2aXNpdENhc3RFeHByKGFzdDogby5DYXN0RXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludChhc3QsIGAoPGApO1xuICAgIGFzdC50eXBlICEudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGFzdCwgYD5gKTtcbiAgICBhc3QudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGFzdCwgYClgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0SW5zdGFudGlhdGVFeHByKGFzdDogby5JbnN0YW50aWF0ZUV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoYXN0LCBgbmV3IGApO1xuICAgIHRoaXMudHlwZUV4cHJlc3Npb24rKztcbiAgICBhc3QuY2xhc3NFeHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIHRoaXMudHlwZUV4cHJlc3Npb24tLTtcbiAgICBjdHgucHJpbnQoYXN0LCBgKGApO1xuICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuYXJncywgY3R4LCAnLCcpO1xuICAgIGN0eC5wcmludChhc3QsIGApYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdERlY2xhcmVDbGFzc1N0bXQoc3RtdDogby5DbGFzc1N0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHVzaENsYXNzKHN0bXQpO1xuICAgIGlmIChzdG10Lmhhc01vZGlmaWVyKG8uU3RtdE1vZGlmaWVyLkV4cG9ydGVkKSkge1xuICAgICAgY3R4LnByaW50KHN0bXQsIGBleHBvcnQgYCk7XG4gICAgfVxuICAgIGN0eC5wcmludChzdG10LCBgY2xhc3MgJHtzdG10Lm5hbWV9YCk7XG4gICAgaWYgKHN0bXQucGFyZW50ICE9IG51bGwpIHtcbiAgICAgIGN0eC5wcmludChzdG10LCBgIGV4dGVuZHMgYCk7XG4gICAgICB0aGlzLnR5cGVFeHByZXNzaW9uKys7XG4gICAgICBzdG10LnBhcmVudC52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICAgIHRoaXMudHlwZUV4cHJlc3Npb24tLTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oc3RtdCwgYCB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHN0bXQuZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB0aGlzLl92aXNpdENsYXNzRmllbGQoZmllbGQsIGN0eCkpO1xuICAgIGlmIChzdG10LmNvbnN0cnVjdG9yTWV0aG9kICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3Zpc2l0Q2xhc3NDb25zdHJ1Y3RvcihzdG10LCBjdHgpO1xuICAgIH1cbiAgICBzdG10LmdldHRlcnMuZm9yRWFjaCgoZ2V0dGVyKSA9PiB0aGlzLl92aXNpdENsYXNzR2V0dGVyKGdldHRlciwgY3R4KSk7XG4gICAgc3RtdC5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4gdGhpcy5fdmlzaXRDbGFzc01ldGhvZChtZXRob2QsIGN0eCkpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnRsbihzdG10LCBgfWApO1xuICAgIGN0eC5wb3BDbGFzcygpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXRDbGFzc0ZpZWxkKGZpZWxkOiBvLkNsYXNzRmllbGQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KSB7XG4gICAgaWYgKGZpZWxkLmhhc01vZGlmaWVyKG8uU3RtdE1vZGlmaWVyLlByaXZhdGUpKSB7XG4gICAgICAvLyBjb21tZW50IG91dCBhcyBhIHdvcmthcm91bmQgZm9yICMxMDk2N1xuICAgICAgY3R4LnByaW50KG51bGwsIGAvKnByaXZhdGUqLyBgKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkLmhhc01vZGlmaWVyKG8uU3RtdE1vZGlmaWVyLlN0YXRpYykpIHtcbiAgICAgIGN0eC5wcmludChudWxsLCAnc3RhdGljICcpO1xuICAgIH1cbiAgICBjdHgucHJpbnQobnVsbCwgZmllbGQubmFtZSk7XG4gICAgdGhpcy5fcHJpbnRDb2xvblR5cGUoZmllbGQudHlwZSwgY3R4KTtcbiAgICBpZiAoZmllbGQuaW5pdGlhbGl6ZXIpIHtcbiAgICAgIGN0eC5wcmludChudWxsLCAnID0gJyk7XG4gICAgICBmaWVsZC5pbml0aWFsaXplci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4obnVsbCwgYDtgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0Q2xhc3NHZXR0ZXIoZ2V0dGVyOiBvLkNsYXNzR2V0dGVyLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCkge1xuICAgIGlmIChnZXR0ZXIuaGFzTW9kaWZpZXIoby5TdG10TW9kaWZpZXIuUHJpdmF0ZSkpIHtcbiAgICAgIGN0eC5wcmludChudWxsLCBgcHJpdmF0ZSBgKTtcbiAgICB9XG4gICAgY3R4LnByaW50KG51bGwsIGBnZXQgJHtnZXR0ZXIubmFtZX0oKWApO1xuICAgIHRoaXMuX3ByaW50Q29sb25UeXBlKGdldHRlci50eXBlLCBjdHgpO1xuICAgIGN0eC5wcmludGxuKG51bGwsIGAge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhnZXR0ZXIuYm9keSwgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4obnVsbCwgYH1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0Q2xhc3NDb25zdHJ1Y3RvcihzdG10OiBvLkNsYXNzU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpIHtcbiAgICBjdHgucHJpbnQoc3RtdCwgYGNvbnN0cnVjdG9yKGApO1xuICAgIHRoaXMuX3Zpc2l0UGFyYW1zKHN0bXQuY29uc3RydWN0b3JNZXRob2QucGFyYW1zLCBjdHgpO1xuICAgIGN0eC5wcmludGxuKHN0bXQsIGApIHtgKTtcbiAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC5jb25zdHJ1Y3Rvck1ldGhvZC5ib2R5LCBjdHgpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnRsbihzdG10LCBgfWApO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXRDbGFzc01ldGhvZChtZXRob2Q6IG8uQ2xhc3NNZXRob2QsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KSB7XG4gICAgaWYgKG1ldGhvZC5oYXNNb2RpZmllcihvLlN0bXRNb2RpZmllci5Qcml2YXRlKSkge1xuICAgICAgY3R4LnByaW50KG51bGwsIGBwcml2YXRlIGApO1xuICAgIH1cbiAgICBjdHgucHJpbnQobnVsbCwgYCR7bWV0aG9kLm5hbWV9KGApO1xuICAgIHRoaXMuX3Zpc2l0UGFyYW1zKG1ldGhvZC5wYXJhbXMsIGN0eCk7XG4gICAgY3R4LnByaW50KG51bGwsIGApYCk7XG4gICAgdGhpcy5fcHJpbnRDb2xvblR5cGUobWV0aG9kLnR5cGUsIGN0eCwgJ3ZvaWQnKTtcbiAgICBjdHgucHJpbnRsbihudWxsLCBgIHtgKTtcbiAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMobWV0aG9kLmJvZHksIGN0eCk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKG51bGwsIGB9YCk7XG4gIH1cblxuICB2aXNpdEZ1bmN0aW9uRXhwcihhc3Q6IG8uRnVuY3Rpb25FeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgaWYgKGFzdC5uYW1lKSB7XG4gICAgICBjdHgucHJpbnQoYXN0LCAnZnVuY3Rpb24gJyk7XG4gICAgICBjdHgucHJpbnQoYXN0LCBhc3QubmFtZSk7XG4gICAgfVxuICAgIGN0eC5wcmludChhc3QsIGAoYCk7XG4gICAgdGhpcy5fdmlzaXRQYXJhbXMoYXN0LnBhcmFtcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYXN0LCBgKWApO1xuICAgIHRoaXMuX3ByaW50Q29sb25UeXBlKGFzdC50eXBlLCBjdHgsICd2b2lkJyk7XG4gICAgaWYgKCFhc3QubmFtZSkge1xuICAgICAgY3R4LnByaW50KGFzdCwgYCA9PiBgKTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oYXN0LCAneycpO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhhc3Quc3RhdGVtZW50cywgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50KGFzdCwgYH1gKTtcblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXREZWNsYXJlRnVuY3Rpb25TdG10KHN0bXQ6IG8uRGVjbGFyZUZ1bmN0aW9uU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGlmIChzdG10Lmhhc01vZGlmaWVyKG8uU3RtdE1vZGlmaWVyLkV4cG9ydGVkKSkge1xuICAgICAgY3R4LnByaW50KHN0bXQsIGBleHBvcnQgYCk7XG4gICAgfVxuICAgIGN0eC5wcmludChzdG10LCBgZnVuY3Rpb24gJHtzdG10Lm5hbWV9KGApO1xuICAgIHRoaXMuX3Zpc2l0UGFyYW1zKHN0bXQucGFyYW1zLCBjdHgpO1xuICAgIGN0eC5wcmludChzdG10LCBgKWApO1xuICAgIHRoaXMuX3ByaW50Q29sb25UeXBlKHN0bXQudHlwZSwgY3R4LCAndm9pZCcpO1xuICAgIGN0eC5wcmludGxuKHN0bXQsIGAge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LnN0YXRlbWVudHMsIGN0eCk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKHN0bXQsIGB9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdFRyeUNhdGNoU3RtdChzdG10OiBvLlRyeUNhdGNoU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludGxuKHN0bXQsIGB0cnkge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LmJvZHlTdG10cywgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oc3RtdCwgYH0gY2F0Y2ggKCR7Q0FUQ0hfRVJST1JfVkFSLm5hbWV9KSB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIGNvbnN0IGNhdGNoU3RtdHMgPVxuICAgICAgICBbPG8uU3RhdGVtZW50PkNBVENIX1NUQUNLX1ZBUi5zZXQoQ0FUQ0hfRVJST1JfVkFSLnByb3AoJ3N0YWNrJywgbnVsbCkpLnRvRGVjbFN0bXQobnVsbCwgW1xuICAgICAgICAgIG8uU3RtdE1vZGlmaWVyLkZpbmFsXG4gICAgICAgIF0pXS5jb25jYXQoc3RtdC5jYXRjaFN0bXRzKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhjYXRjaFN0bXRzLCBjdHgpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnRsbihzdG10LCBgfWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRCdWlsdGluVHlwZSh0eXBlOiBvLkJ1aWx0aW5UeXBlLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgbGV0IHR5cGVTdHI6IHN0cmluZztcbiAgICBzd2l0Y2ggKHR5cGUubmFtZSkge1xuICAgICAgY2FzZSBvLkJ1aWx0aW5UeXBlTmFtZS5Cb29sOlxuICAgICAgICB0eXBlU3RyID0gJ2Jvb2xlYW4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluVHlwZU5hbWUuRHluYW1pYzpcbiAgICAgICAgdHlwZVN0ciA9ICdhbnknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluVHlwZU5hbWUuRnVuY3Rpb246XG4gICAgICAgIHR5cGVTdHIgPSAnRnVuY3Rpb24nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluVHlwZU5hbWUuTnVtYmVyOlxuICAgICAgICB0eXBlU3RyID0gJ251bWJlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJ1aWx0aW5UeXBlTmFtZS5JbnQ6XG4gICAgICAgIHR5cGVTdHIgPSAnbnVtYmVyJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQnVpbHRpblR5cGVOYW1lLlN0cmluZzpcbiAgICAgICAgdHlwZVN0ciA9ICdzdHJpbmcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluVHlwZU5hbWUuTm9uZTpcbiAgICAgICAgdHlwZVN0ciA9ICduZXZlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBidWlsdGluIHR5cGUgJHt0eXBlLm5hbWV9YCk7XG4gICAgfVxuICAgIGN0eC5wcmludChudWxsLCB0eXBlU3RyKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0RXhwcmVzc2lvblR5cGUoYXN0OiBvLkV4cHJlc3Npb25UeXBlLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgYXN0LnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGlmIChhc3QudHlwZVBhcmFtcyAhPT0gbnVsbCkge1xuICAgICAgY3R4LnByaW50KG51bGwsICc8Jyk7XG4gICAgICB0aGlzLnZpc2l0QWxsT2JqZWN0cyh0eXBlID0+IHRoaXMudmlzaXRUeXBlKHR5cGUsIGN0eCksIGFzdC50eXBlUGFyYW1zLCBjdHgsICcsJyk7XG4gICAgICBjdHgucHJpbnQobnVsbCwgJz4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEFycmF5VHlwZSh0eXBlOiBvLkFycmF5VHlwZSwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHRoaXMudmlzaXRUeXBlKHR5cGUub2YsIGN0eCk7XG4gICAgY3R4LnByaW50KG51bGwsIGBbXWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRNYXBUeXBlKHR5cGU6IG8uTWFwVHlwZSwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludChudWxsLCBge1trZXk6IHN0cmluZ106YCk7XG4gICAgdGhpcy52aXNpdFR5cGUodHlwZS52YWx1ZVR5cGUsIGN0eCk7XG4gICAgY3R4LnByaW50KG51bGwsIGB9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRCdWlsdGluTWV0aG9kTmFtZShtZXRob2Q6IG8uQnVpbHRpbk1ldGhvZCk6IHN0cmluZyB7XG4gICAgbGV0IG5hbWU6IHN0cmluZztcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgY2FzZSBvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXk6XG4gICAgICAgIG5hbWUgPSAnY29uY2F0JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQnVpbHRpbk1ldGhvZC5TdWJzY3JpYmVPYnNlcnZhYmxlOlxuICAgICAgICBuYW1lID0gJ3N1YnNjcmliZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJ1aWx0aW5NZXRob2QuQmluZDpcbiAgICAgICAgbmFtZSA9ICdiaW5kJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYnVpbHRpbiBtZXRob2Q6ICR7bWV0aG9kfWApO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0UGFyYW1zKHBhcmFtczogby5GblBhcmFtW10sIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogdm9pZCB7XG4gICAgdGhpcy52aXNpdEFsbE9iamVjdHMocGFyYW0gPT4ge1xuICAgICAgY3R4LnByaW50KG51bGwsIHBhcmFtLm5hbWUpO1xuICAgICAgdGhpcy5fcHJpbnRDb2xvblR5cGUocGFyYW0udHlwZSwgY3R4KTtcbiAgICB9LCBwYXJhbXMsIGN0eCwgJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0SWRlbnRpZmllcihcbiAgICAgIHZhbHVlOiBvLkV4dGVybmFsUmVmZXJlbmNlLCB0eXBlUGFyYW1zOiBvLlR5cGVbXXxudWxsLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IHZvaWQge1xuICAgIGNvbnN0IHtuYW1lLCBtb2R1bGVOYW1lfSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLnJlZmVyZW5jZUZpbHRlciAmJiB0aGlzLnJlZmVyZW5jZUZpbHRlcih2YWx1ZSkpIHtcbiAgICAgIGN0eC5wcmludChudWxsLCAnKG51bGwgYXMgYW55KScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobW9kdWxlTmFtZSAmJiAoIXRoaXMuaW1wb3J0RmlsdGVyIHx8ICF0aGlzLmltcG9ydEZpbHRlcih2YWx1ZSkpKSB7XG4gICAgICBsZXQgcHJlZml4ID0gdGhpcy5pbXBvcnRzV2l0aFByZWZpeGVzLmdldChtb2R1bGVOYW1lKTtcbiAgICAgIGlmIChwcmVmaXggPT0gbnVsbCkge1xuICAgICAgICBwcmVmaXggPSBgaSR7dGhpcy5pbXBvcnRzV2l0aFByZWZpeGVzLnNpemV9YDtcbiAgICAgICAgdGhpcy5pbXBvcnRzV2l0aFByZWZpeGVzLnNldChtb2R1bGVOYW1lLCBwcmVmaXgpO1xuICAgICAgfVxuICAgICAgY3R4LnByaW50KG51bGwsIGAke3ByZWZpeH0uYCk7XG4gICAgfVxuICAgIGN0eC5wcmludChudWxsLCBuYW1lICEpO1xuXG4gICAgaWYgKHRoaXMudHlwZUV4cHJlc3Npb24gPiAwKSB7XG4gICAgICAvLyBJZiB3ZSBhcmUgaW4gYSB0eXBlIGV4cHJlc3Npb24gdGhhdCByZWZlcnMgdG8gYSBnZW5lcmljIHR5cGUgdGhlbiBzdXBwbHlcbiAgICAgIC8vIHRoZSByZXF1aXJlZCB0eXBlIHBhcmFtZXRlcnMuIElmIHRoZXJlIHdlcmUgbm90IGVub3VnaCB0eXBlIHBhcmFtZXRlcnNcbiAgICAgIC8vIHN1cHBsaWVkLCBzdXBwbHkgYW55IGFzIHRoZSB0eXBlLiBPdXRzaWRlIGEgdHlwZSBleHByZXNzaW9uIHRoZSByZWZlcmVuY2VcbiAgICAgIC8vIHNob3VsZCBub3Qgc3VwcGx5IHR5cGUgcGFyYW1ldGVycyBhbmQgYmUgdHJlYXRlZCBhcyBhIHNpbXBsZSB2YWx1ZSByZWZlcmVuY2VcbiAgICAgIC8vIHRvIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBpdHNlbGYuXG4gICAgICBjb25zdCBzdXBwbGllZFBhcmFtZXRlcnMgPSB0eXBlUGFyYW1zIHx8IFtdO1xuICAgICAgaWYgKHN1cHBsaWVkUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGN0eC5wcmludChudWxsLCBgPGApO1xuICAgICAgICB0aGlzLnZpc2l0QWxsT2JqZWN0cyh0eXBlID0+IHR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCksIHR5cGVQYXJhbXMgISwgY3R4LCAnLCcpO1xuICAgICAgICBjdHgucHJpbnQobnVsbCwgYD5gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9wcmludENvbG9uVHlwZSh0eXBlOiBvLlR5cGV8bnVsbCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQsIGRlZmF1bHRUeXBlPzogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGUgIT09IG8uSU5GRVJSRURfVFlQRSkge1xuICAgICAgY3R4LnByaW50KG51bGwsICc6Jyk7XG4gICAgICB0aGlzLnZpc2l0VHlwZSh0eXBlLCBjdHgsIGRlZmF1bHRUeXBlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==