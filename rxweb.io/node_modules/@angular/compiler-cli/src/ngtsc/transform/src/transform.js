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
        define("@angular/compiler-cli/src/ngtsc/transform/src/transform", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/src/ngtsc/util/src/visitor", "@angular/compiler-cli/src/ngtsc/transform/src/translator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    var visitor_1 = require("@angular/compiler-cli/src/ngtsc/util/src/visitor");
    var translator_1 = require("@angular/compiler-cli/src/ngtsc/transform/src/translator");
    var NO_DECORATORS = new Set();
    function ivyTransformFactory(compilation, reflector, coreImportsFrom) {
        return function (context) {
            return function (file) {
                return transformIvySourceFile(compilation, context, reflector, coreImportsFrom, file);
            };
        };
    }
    exports.ivyTransformFactory = ivyTransformFactory;
    var IvyVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(IvyVisitor, _super);
        function IvyVisitor(compilation, reflector, importManager, isCore) {
            var _this = _super.call(this) || this;
            _this.compilation = compilation;
            _this.reflector = reflector;
            _this.importManager = importManager;
            _this.isCore = isCore;
            return _this;
        }
        IvyVisitor.prototype.visitClassDeclaration = function (node) {
            var _this = this;
            // Determine if this class has an Ivy field that needs to be added, and compile the field
            // to an expression if so.
            var res = this.compilation.compileIvyFieldFor(node);
            if (res !== undefined) {
                // There is at least one field to add.
                var statements_1 = [];
                var members_1 = tslib_1.__spread(node.members);
                res.forEach(function (field) {
                    // Translate the initializer for the field into TS nodes.
                    var exprNode = translator_1.translateExpression(field.initializer, _this.importManager);
                    // Create a static property declaration for the new field.
                    var property = ts.createProperty(undefined, [ts.createToken(ts.SyntaxKind.StaticKeyword)], field.name, undefined, undefined, exprNode);
                    field.statements.map(function (stmt) { return translator_1.translateStatement(stmt, _this.importManager); })
                        .forEach(function (stmt) { return statements_1.push(stmt); });
                    members_1.push(property);
                });
                // Replace the class declaration with an updated version.
                node = ts.updateClassDeclaration(node, 
                // Remove the decorator which triggered this compilation, leaving the others alone.
                maybeFilterDecorator(node.decorators, this.compilation.ivyDecoratorFor(node).node), node.modifiers, node.name, node.typeParameters, node.heritageClauses || [], 
                // Map over the class members and remove any Angular decorators from them.
                members_1.map(function (member) { return _this._stripAngularDecorators(member); }));
                return { node: node, before: statements_1 };
            }
            return { node: node };
        };
        /**
         * Return all decorators on a `Declaration` which are from @angular/core, or an empty set if none
         * are.
         */
        IvyVisitor.prototype._angularCoreDecorators = function (decl) {
            var _this = this;
            var decorators = this.reflector.getDecoratorsOfDeclaration(decl);
            if (decorators === null) {
                return NO_DECORATORS;
            }
            var coreDecorators = decorators.filter(function (dec) { return _this.isCore || isFromAngularCore(dec); })
                .map(function (dec) { return dec.node; });
            if (coreDecorators.length > 0) {
                return new Set(coreDecorators);
            }
            else {
                return NO_DECORATORS;
            }
        };
        /**
         * Given a `ts.Node`, filter the decorators array and return a version containing only non-Angular
         * decorators.
         *
         * If all decorators are removed (or none existed in the first place), this method returns
         * `undefined`.
         */
        IvyVisitor.prototype._nonCoreDecoratorsOnly = function (node) {
            // Shortcut if the node has no decorators.
            if (node.decorators === undefined) {
                return undefined;
            }
            // Build a Set of the decorators on this node from @angular/core.
            var coreDecorators = this._angularCoreDecorators(node);
            if (coreDecorators.size === node.decorators.length) {
                // If all decorators are to be removed, return `undefined`.
                return undefined;
            }
            else if (coreDecorators.size === 0) {
                // If no decorators need to be removed, return the original decorators array.
                return node.decorators;
            }
            // Filter out the core decorators.
            var filtered = node.decorators.filter(function (dec) { return !coreDecorators.has(dec); });
            // If no decorators survive, return `undefined`. This can only happen if a core decorator is
            // repeated on the node.
            if (filtered.length === 0) {
                return undefined;
            }
            // Create a new `NodeArray` with the filtered decorators that sourcemaps back to the original.
            var array = ts.createNodeArray(filtered);
            array.pos = node.decorators.pos;
            array.end = node.decorators.end;
            return array;
        };
        /**
         * Remove Angular decorators from a `ts.Node` in a shallow manner.
         *
         * This will remove decorators from class elements (getters, setters, properties, methods) as well
         * as parameters of constructors.
         */
        IvyVisitor.prototype._stripAngularDecorators = function (node) {
            var _this = this;
            if (ts.isParameter(node)) {
                // Strip decorators from parameters (probably of the constructor).
                node = ts.updateParameter(node, this._nonCoreDecoratorsOnly(node), node.modifiers, node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer);
            }
            else if (ts.isMethodDeclaration(node) && node.decorators !== undefined) {
                // Strip decorators of methods.
                node = ts.updateMethod(node, this._nonCoreDecoratorsOnly(node), node.modifiers, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body);
            }
            else if (ts.isPropertyDeclaration(node) && node.decorators !== undefined) {
                // Strip decorators of properties.
                node = ts.updateProperty(node, this._nonCoreDecoratorsOnly(node), node.modifiers, node.name, node.questionToken, node.type, node.initializer);
            }
            else if (ts.isGetAccessor(node)) {
                // Strip decorators of getters.
                node = ts.updateGetAccessor(node, this._nonCoreDecoratorsOnly(node), node.modifiers, node.name, node.parameters, node.type, node.body);
            }
            else if (ts.isSetAccessor(node)) {
                // Strip decorators of setters.
                node = ts.updateSetAccessor(node, this._nonCoreDecoratorsOnly(node), node.modifiers, node.name, node.parameters, node.body);
            }
            else if (ts.isConstructorDeclaration(node)) {
                // For constructors, strip decorators of the parameters.
                var parameters = node.parameters.map(function (param) { return _this._stripAngularDecorators(param); });
                node =
                    ts.updateConstructor(node, node.decorators, node.modifiers, parameters, node.body);
            }
            return node;
        };
        return IvyVisitor;
    }(visitor_1.Visitor));
    /**
     * A transformer which operates on ts.SourceFiles and applies changes from an `IvyCompilation`.
     */
    function transformIvySourceFile(compilation, context, reflector, coreImportsFrom, file) {
        var importManager = new translator_1.ImportManager(coreImportsFrom !== null);
        // Recursively scan through the AST and perform any updates requested by the IvyCompilation.
        var sf = visitor_1.visit(file, new IvyVisitor(compilation, reflector, importManager, coreImportsFrom !== null), context);
        // Generate the import statements to prepend.
        var imports = importManager.getAllImports(file.fileName, coreImportsFrom).map(function (i) {
            return ts.createImportDeclaration(undefined, undefined, ts.createImportClause(undefined, ts.createNamespaceImport(ts.createIdentifier(i.as))), ts.createLiteral(i.name));
        });
        // Prepend imports if needed.
        if (imports.length > 0) {
            sf.statements = ts.createNodeArray(tslib_1.__spread(imports, sf.statements));
        }
        return sf;
    }
    function maybeFilterDecorator(decorators, toRemove) {
        if (decorators === undefined) {
            return undefined;
        }
        var filtered = decorators.filter(function (dec) { return ts.getOriginalNode(dec) !== toRemove; });
        if (filtered.length === 0) {
            return undefined;
        }
        return ts.createNodeArray(filtered);
    }
    function isFromAngularCore(decorator) {
        return decorator.import !== null && decorator.import.from === '@angular/core';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy90cmFuc2Zvcm0vc3JjL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFHSCwrQkFBaUM7SUFJakMsNEVBQTRFO0lBSTVFLHVGQUFvRjtJQUVwRixJQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBZ0IsQ0FBQztJQUU5Qyw2QkFDSSxXQUEyQixFQUFFLFNBQXlCLEVBQ3RELGVBQXFDO1FBQ3ZDLE9BQU8sVUFBQyxPQUFpQztZQUN2QyxPQUFPLFVBQUMsSUFBbUI7Z0JBQ3pCLE9BQU8sc0JBQXNCLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hGLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztJQUNKLENBQUM7SUFSRCxrREFRQztJQUVEO1FBQXlCLHNDQUFPO1FBQzlCLG9CQUNZLFdBQTJCLEVBQVUsU0FBeUIsRUFDOUQsYUFBNEIsRUFBVSxNQUFlO1lBRmpFLFlBR0UsaUJBQU8sU0FDUjtZQUhXLGlCQUFXLEdBQVgsV0FBVyxDQUFnQjtZQUFVLGVBQVMsR0FBVCxTQUFTLENBQWdCO1lBQzlELG1CQUFhLEdBQWIsYUFBYSxDQUFlO1lBQVUsWUFBTSxHQUFOLE1BQU0sQ0FBUzs7UUFFakUsQ0FBQztRQUVELDBDQUFxQixHQUFyQixVQUFzQixJQUF5QjtZQUEvQyxpQkF1Q0M7WUFyQ0MseUZBQXlGO1lBQ3pGLDBCQUEwQjtZQUMxQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRELElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsc0NBQXNDO2dCQUN0QyxJQUFNLFlB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QUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsMkJBQTJCLFNBQW9CO1FBQzdDLE9BQU8sU0FBUyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDO0lBQ2hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7V3JhcHBlZE5vZGVFeHByfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtEZWNvcmF0b3IsIFJlZmxlY3Rpb25Ib3N0fSBmcm9tICcuLi8uLi9ob3N0JztcbmltcG9ydCB7cmVsYXRpdmVQYXRoQmV0d2Vlbn0gZnJvbSAnLi4vLi4vdXRpbC9zcmMvcGF0aCc7XG5pbXBvcnQge1Zpc2l0TGlzdEVudHJ5UmVzdWx0LCBWaXNpdG9yLCB2aXNpdH0gZnJvbSAnLi4vLi4vdXRpbC9zcmMvdmlzaXRvcic7XG5cbmltcG9ydCB7Q29tcGlsZVJlc3VsdH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHtJdnlDb21waWxhdGlvbn0gZnJvbSAnLi9jb21waWxhdGlvbic7XG5pbXBvcnQge0ltcG9ydE1hbmFnZXIsIHRyYW5zbGF0ZUV4cHJlc3Npb24sIHRyYW5zbGF0ZVN0YXRlbWVudH0gZnJvbSAnLi90cmFuc2xhdG9yJztcblxuY29uc3QgTk9fREVDT1JBVE9SUyA9IG5ldyBTZXQ8dHMuRGVjb3JhdG9yPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gaXZ5VHJhbnNmb3JtRmFjdG9yeShcbiAgICBjb21waWxhdGlvbjogSXZ5Q29tcGlsYXRpb24sIHJlZmxlY3RvcjogUmVmbGVjdGlvbkhvc3QsXG4gICAgY29yZUltcG9ydHNGcm9tOiB0cy5Tb3VyY2VGaWxlIHwgbnVsbCk6IHRzLlRyYW5zZm9ybWVyRmFjdG9yeTx0cy5Tb3VyY2VGaWxlPiB7XG4gIHJldHVybiAoY29udGV4dDogdHMuVHJhbnNmb3JtYXRpb25Db250ZXh0KTogdHMuVHJhbnNmb3JtZXI8dHMuU291cmNlRmlsZT4gPT4ge1xuICAgIHJldHVybiAoZmlsZTogdHMuU291cmNlRmlsZSk6IHRzLlNvdXJjZUZpbGUgPT4ge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybUl2eVNvdXJjZUZpbGUoY29tcGlsYXRpb24sIGNvbnRleHQsIHJlZmxlY3RvciwgY29yZUltcG9ydHNGcm9tLCBmaWxlKTtcbiAgICB9O1xuICB9O1xufVxuXG5jbGFzcyBJdnlWaXNpdG9yIGV4dGVuZHMgVmlzaXRvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBjb21waWxhdGlvbjogSXZ5Q29tcGlsYXRpb24sIHByaXZhdGUgcmVmbGVjdG9yOiBSZWZsZWN0aW9uSG9zdCxcbiAgICAgIHByaXZhdGUgaW1wb3J0TWFuYWdlcjogSW1wb3J0TWFuYWdlciwgcHJpdmF0ZSBpc0NvcmU6IGJvb2xlYW4pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgdmlzaXRDbGFzc0RlY2xhcmF0aW9uKG5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24pOlxuICAgICAgVmlzaXRMaXN0RW50cnlSZXN1bHQ8dHMuU3RhdGVtZW50LCB0cy5DbGFzc0RlY2xhcmF0aW9uPiB7XG4gICAgLy8gRGV0ZXJtaW5lIGlmIHRoaXMgY2xhc3MgaGFzIGFuIEl2eSBmaWVsZCB0aGF0IG5lZWRzIHRvIGJlIGFkZGVkLCBhbmQgY29tcGlsZSB0aGUgZmllbGRcbiAgICAvLyB0byBhbiBleHByZXNzaW9uIGlmIHNvLlxuICAgIGNvbnN0IHJlcyA9IHRoaXMuY29tcGlsYXRpb24uY29tcGlsZUl2eUZpZWxkRm9yKG5vZGUpO1xuXG4gICAgaWYgKHJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBUaGVyZSBpcyBhdCBsZWFzdCBvbmUgZmllbGQgdG8gYWRkLlxuICAgICAgY29uc3Qgc3RhdGVtZW50czogdHMuU3RhdGVtZW50W10gPSBbXTtcbiAgICAgIGNvbnN0IG1lbWJlcnMgPSBbLi4ubm9kZS5tZW1iZXJzXTtcblxuICAgICAgcmVzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICAvLyBUcmFuc2xhdGUgdGhlIGluaXRpYWxpemVyIGZvciB0aGUgZmllbGQgaW50byBUUyBub2Rlcy5cbiAgICAgICAgY29uc3QgZXhwck5vZGUgPSB0cmFuc2xhdGVFeHByZXNzaW9uKGZpZWxkLmluaXRpYWxpemVyLCB0aGlzLmltcG9ydE1hbmFnZXIpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIHN0YXRpYyBwcm9wZXJ0eSBkZWNsYXJhdGlvbiBmb3IgdGhlIG5ldyBmaWVsZC5cbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSB0cy5jcmVhdGVQcm9wZXJ0eShcbiAgICAgICAgICAgIHVuZGVmaW5lZCwgW3RzLmNyZWF0ZVRva2VuKHRzLlN5bnRheEtpbmQuU3RhdGljS2V5d29yZCldLCBmaWVsZC5uYW1lLCB1bmRlZmluZWQsXG4gICAgICAgICAgICB1bmRlZmluZWQsIGV4cHJOb2RlKTtcblxuICAgICAgICBmaWVsZC5zdGF0ZW1lbnRzLm1hcChzdG10ID0+IHRyYW5zbGF0ZVN0YXRlbWVudChzdG10LCB0aGlzLmltcG9ydE1hbmFnZXIpKVxuICAgICAgICAgICAgLmZvckVhY2goc3RtdCA9PiBzdGF0ZW1lbnRzLnB1c2goc3RtdCkpO1xuXG4gICAgICAgIG1lbWJlcnMucHVzaChwcm9wZXJ0eSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gUmVwbGFjZSB0aGUgY2xhc3MgZGVjbGFyYXRpb24gd2l0aCBhbiB1cGRhdGVkIHZlcnNpb24uXG4gICAgICBub2RlID0gdHMudXBkYXRlQ2xhc3NEZWNsYXJhdGlvbihcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZGVjb3JhdG9yIHdoaWNoIHRyaWdnZXJlZCB0aGlzIGNvbXBpbGF0aW9uLCBsZWF2aW5nIHRoZSBvdGhlcnMgYWxvbmUuXG4gICAgICAgICAgbWF5YmVGaWx0ZXJEZWNvcmF0b3IoXG4gICAgICAgICAgICAgIG5vZGUuZGVjb3JhdG9ycywgdGhpcy5jb21waWxhdGlvbi5pdnlEZWNvcmF0b3JGb3Iobm9kZSkgIS5ub2RlIGFzIHRzLkRlY29yYXRvciksXG4gICAgICAgICAgbm9kZS5tb2RpZmllcnMsIG5vZGUubmFtZSwgbm9kZS50eXBlUGFyYW1ldGVycywgbm9kZS5oZXJpdGFnZUNsYXVzZXMgfHwgW10sXG4gICAgICAgICAgLy8gTWFwIG92ZXIgdGhlIGNsYXNzIG1lbWJlcnMgYW5kIHJlbW92ZSBhbnkgQW5ndWxhciBkZWNvcmF0b3JzIGZyb20gdGhlbS5cbiAgICAgICAgICBtZW1iZXJzLm1hcChtZW1iZXIgPT4gdGhpcy5fc3RyaXBBbmd1bGFyRGVjb3JhdG9ycyhtZW1iZXIpKSk7XG4gICAgICByZXR1cm4ge25vZGUsIGJlZm9yZTogc3RhdGVtZW50c307XG4gICAgfVxuXG4gICAgcmV0dXJuIHtub2RlfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIGRlY29yYXRvcnMgb24gYSBgRGVjbGFyYXRpb25gIHdoaWNoIGFyZSBmcm9tIEBhbmd1bGFyL2NvcmUsIG9yIGFuIGVtcHR5IHNldCBpZiBub25lXG4gICAqIGFyZS5cbiAgICovXG4gIHByaXZhdGUgX2FuZ3VsYXJDb3JlRGVjb3JhdG9ycyhkZWNsOiB0cy5EZWNsYXJhdGlvbik6IFNldDx0cy5EZWNvcmF0b3I+IHtcbiAgICBjb25zdCBkZWNvcmF0b3JzID0gdGhpcy5yZWZsZWN0b3IuZ2V0RGVjb3JhdG9yc09mRGVjbGFyYXRpb24oZGVjbCk7XG4gICAgaWYgKGRlY29yYXRvcnMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBOT19ERUNPUkFUT1JTO1xuICAgIH1cbiAgICBjb25zdCBjb3JlRGVjb3JhdG9ycyA9IGRlY29yYXRvcnMuZmlsdGVyKGRlYyA9PiB0aGlzLmlzQ29yZSB8fCBpc0Zyb21Bbmd1bGFyQ29yZShkZWMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZGVjID0+IGRlYy5ub2RlIGFzIHRzLkRlY29yYXRvcik7XG4gICAgaWYgKGNvcmVEZWNvcmF0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBuZXcgU2V0PHRzLkRlY29yYXRvcj4oY29yZURlY29yYXRvcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTk9fREVDT1JBVE9SUztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBgdHMuTm9kZWAsIGZpbHRlciB0aGUgZGVjb3JhdG9ycyBhcnJheSBhbmQgcmV0dXJuIGEgdmVyc2lvbiBjb250YWluaW5nIG9ubHkgbm9uLUFuZ3VsYXJcbiAgICogZGVjb3JhdG9ycy5cbiAgICpcbiAgICogSWYgYWxsIGRlY29yYXRvcnMgYXJlIHJlbW92ZWQgKG9yIG5vbmUgZXhpc3RlZCBpbiB0aGUgZmlyc3QgcGxhY2UpLCB0aGlzIG1ldGhvZCByZXR1cm5zXG4gICAqIGB1bmRlZmluZWRgLlxuICAgKi9cbiAgcHJpdmF0ZSBfbm9uQ29yZURlY29yYXRvcnNPbmx5KG5vZGU6IHRzLkRlY2xhcmF0aW9uKTogdHMuTm9kZUFycmF5PHRzLkRlY29yYXRvcj58dW5kZWZpbmVkIHtcbiAgICAvLyBTaG9ydGN1dCBpZiB0aGUgbm9kZSBoYXMgbm8gZGVjb3JhdG9ycy5cbiAgICBpZiAobm9kZS5kZWNvcmF0b3JzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIEJ1aWxkIGEgU2V0IG9mIHRoZSBkZWNvcmF0b3JzIG9uIHRoaXMgbm9kZSBmcm9tIEBhbmd1bGFyL2NvcmUuXG4gICAgY29uc3QgY29yZURlY29yYXRvcnMgPSB0aGlzLl9hbmd1bGFyQ29yZURlY29yYXRvcnMobm9kZSk7XG5cbiAgICBpZiAoY29yZURlY29yYXRvcnMuc2l6ZSA9PT0gbm9kZS5kZWNvcmF0b3JzLmxlbmd0aCkge1xuICAgICAgLy8gSWYgYWxsIGRlY29yYXRvcnMgYXJlIHRvIGJlIHJlbW92ZWQsIHJldHVybiBgdW5kZWZpbmVkYC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmIChjb3JlRGVjb3JhdG9ycy5zaXplID09PSAwKSB7XG4gICAgICAvLyBJZiBubyBkZWNvcmF0b3JzIG5lZWQgdG8gYmUgcmVtb3ZlZCwgcmV0dXJuIHRoZSBvcmlnaW5hbCBkZWNvcmF0b3JzIGFycmF5LlxuICAgICAgcmV0dXJuIG5vZGUuZGVjb3JhdG9ycztcbiAgICB9XG5cbiAgICAvLyBGaWx0ZXIgb3V0IHRoZSBjb3JlIGRlY29yYXRvcnMuXG4gICAgY29uc3QgZmlsdGVyZWQgPSBub2RlLmRlY29yYXRvcnMuZmlsdGVyKGRlYyA9PiAhY29yZURlY29yYXRvcnMuaGFzKGRlYykpO1xuXG4gICAgLy8gSWYgbm8gZGVjb3JhdG9ycyBzdXJ2aXZlLCByZXR1cm4gYHVuZGVmaW5lZGAuIFRoaXMgY2FuIG9ubHkgaGFwcGVuIGlmIGEgY29yZSBkZWNvcmF0b3IgaXNcbiAgICAvLyByZXBlYXRlZCBvbiB0aGUgbm9kZS5cbiAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhIG5ldyBgTm9kZUFycmF5YCB3aXRoIHRoZSBmaWx0ZXJlZCBkZWNvcmF0b3JzIHRoYXQgc291cmNlbWFwcyBiYWNrIHRvIHRoZSBvcmlnaW5hbC5cbiAgICBjb25zdCBhcnJheSA9IHRzLmNyZWF0ZU5vZGVBcnJheShmaWx0ZXJlZCk7XG4gICAgYXJyYXkucG9zID0gbm9kZS5kZWNvcmF0b3JzLnBvcztcbiAgICBhcnJheS5lbmQgPSBub2RlLmRlY29yYXRvcnMuZW5kO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgQW5ndWxhciBkZWNvcmF0b3JzIGZyb20gYSBgdHMuTm9kZWAgaW4gYSBzaGFsbG93IG1hbm5lci5cbiAgICpcbiAgICogVGhpcyB3aWxsIHJlbW92ZSBkZWNvcmF0b3JzIGZyb20gY2xhc3MgZWxlbWVudHMgKGdldHRlcnMsIHNldHRlcnMsIHByb3BlcnRpZXMsIG1ldGhvZHMpIGFzIHdlbGxcbiAgICogYXMgcGFyYW1ldGVycyBvZiBjb25zdHJ1Y3RvcnMuXG4gICAqL1xuICBwcml2YXRlIF9zdHJpcEFuZ3VsYXJEZWNvcmF0b3JzPFQgZXh0ZW5kcyB0cy5Ob2RlPihub2RlOiBUKTogVCB7XG4gICAgaWYgKHRzLmlzUGFyYW1ldGVyKG5vZGUpKSB7XG4gICAgICAvLyBTdHJpcCBkZWNvcmF0b3JzIGZyb20gcGFyYW1ldGVycyAocHJvYmFibHkgb2YgdGhlIGNvbnN0cnVjdG9yKS5cbiAgICAgIG5vZGUgPSB0cy51cGRhdGVQYXJhbWV0ZXIoXG4gICAgICAgICAgICAgICAgIG5vZGUsIHRoaXMuX25vbkNvcmVEZWNvcmF0b3JzT25seShub2RlKSwgbm9kZS5tb2RpZmllcnMsIG5vZGUuZG90RG90RG90VG9rZW4sXG4gICAgICAgICAgICAgICAgIG5vZGUubmFtZSwgbm9kZS5xdWVzdGlvblRva2VuLCBub2RlLnR5cGUsIG5vZGUuaW5pdGlhbGl6ZXIpIGFzIFQgJlxuICAgICAgICAgIHRzLlBhcmFtZXRlckRlY2xhcmF0aW9uO1xuICAgIH0gZWxzZSBpZiAodHMuaXNNZXRob2REZWNsYXJhdGlvbihub2RlKSAmJiBub2RlLmRlY29yYXRvcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gU3RyaXAgZGVjb3JhdG9ycyBvZiBtZXRob2RzLlxuICAgICAgbm9kZSA9IHRzLnVwZGF0ZU1ldGhvZChcbiAgICAgICAgICAgICAgICAgbm9kZSwgdGhpcy5fbm9uQ29yZURlY29yYXRvcnNPbmx5KG5vZGUpLCBub2RlLm1vZGlmaWVycywgbm9kZS5hc3Rlcmlza1Rva2VuLFxuICAgICAgICAgICAgICAgICBub2RlLm5hbWUsIG5vZGUucXVlc3Rpb25Ub2tlbiwgbm9kZS50eXBlUGFyYW1ldGVycywgbm9kZS5wYXJhbWV0ZXJzLCBub2RlLnR5cGUsXG4gICAgICAgICAgICAgICAgIG5vZGUuYm9keSkgYXMgVCAmXG4gICAgICAgICAgdHMuTWV0aG9kRGVjbGFyYXRpb247XG4gICAgfSBlbHNlIGlmICh0cy5pc1Byb3BlcnR5RGVjbGFyYXRpb24obm9kZSkgJiYgbm9kZS5kZWNvcmF0b3JzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFN0cmlwIGRlY29yYXRvcnMgb2YgcHJvcGVydGllcy5cbiAgICAgIG5vZGUgPSB0cy51cGRhdGVQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgbm9kZSwgdGhpcy5fbm9uQ29yZURlY29yYXRvcnNPbmx5KG5vZGUpLCBub2RlLm1vZGlmaWVycywgbm9kZS5uYW1lLFxuICAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uVG9rZW4sIG5vZGUudHlwZSwgbm9kZS5pbml0aWFsaXplcikgYXMgVCAmXG4gICAgICAgICAgdHMuUHJvcGVydHlEZWNsYXJhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHRzLmlzR2V0QWNjZXNzb3Iobm9kZSkpIHtcbiAgICAgIC8vIFN0cmlwIGRlY29yYXRvcnMgb2YgZ2V0dGVycy5cbiAgICAgIG5vZGUgPSB0cy51cGRhdGVHZXRBY2Nlc3NvcihcbiAgICAgICAgICAgICAgICAgbm9kZSwgdGhpcy5fbm9uQ29yZURlY29yYXRvcnNPbmx5KG5vZGUpLCBub2RlLm1vZGlmaWVycywgbm9kZS5uYW1lLFxuICAgICAgICAgICAgICAgICBub2RlLnBhcmFtZXRlcnMsIG5vZGUudHlwZSwgbm9kZS5ib2R5KSBhcyBUICZcbiAgICAgICAgICB0cy5HZXRBY2Nlc3NvckRlY2xhcmF0aW9uO1xuICAgIH0gZWxzZSBpZiAodHMuaXNTZXRBY2Nlc3Nvcihub2RlKSkge1xuICAgICAgLy8gU3RyaXAgZGVjb3JhdG9ycyBvZiBzZXR0ZXJzLlxuICAgICAgbm9kZSA9IHRzLnVwZGF0ZVNldEFjY2Vzc29yKFxuICAgICAgICAgICAgICAgICBub2RlLCB0aGlzLl9ub25Db3JlRGVjb3JhdG9yc09ubHkobm9kZSksIG5vZGUubW9kaWZpZXJzLCBub2RlLm5hbWUsXG4gICAgICAgICAgICAgICAgIG5vZGUucGFyYW1ldGVycywgbm9kZS5ib2R5KSBhcyBUICZcbiAgICAgICAgICB0cy5TZXRBY2Nlc3NvckRlY2xhcmF0aW9uO1xuICAgIH0gZWxzZSBpZiAodHMuaXNDb25zdHJ1Y3RvckRlY2xhcmF0aW9uKG5vZGUpKSB7XG4gICAgICAvLyBGb3IgY29uc3RydWN0b3JzLCBzdHJpcCBkZWNvcmF0b3JzIG9mIHRoZSBwYXJhbWV0ZXJzLlxuICAgICAgY29uc3QgcGFyYW1ldGVycyA9IG5vZGUucGFyYW1ldGVycy5tYXAocGFyYW0gPT4gdGhpcy5fc3RyaXBBbmd1bGFyRGVjb3JhdG9ycyhwYXJhbSkpO1xuICAgICAgbm9kZSA9XG4gICAgICAgICAgdHMudXBkYXRlQ29uc3RydWN0b3Iobm9kZSwgbm9kZS5kZWNvcmF0b3JzLCBub2RlLm1vZGlmaWVycywgcGFyYW1ldGVycywgbm9kZS5ib2R5KSBhcyBUICZcbiAgICAgICAgICB0cy5Db25zdHJ1Y3RvckRlY2xhcmF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxufVxuXG4vKipcbiAqIEEgdHJhbnNmb3JtZXIgd2hpY2ggb3BlcmF0ZXMgb24gdHMuU291cmNlRmlsZXMgYW5kIGFwcGxpZXMgY2hhbmdlcyBmcm9tIGFuIGBJdnlDb21waWxhdGlvbmAuXG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybUl2eVNvdXJjZUZpbGUoXG4gICAgY29tcGlsYXRpb246IEl2eUNvbXBpbGF0aW9uLCBjb250ZXh0OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQsIHJlZmxlY3RvcjogUmVmbGVjdGlvbkhvc3QsXG4gICAgY29yZUltcG9ydHNGcm9tOiB0cy5Tb3VyY2VGaWxlIHwgbnVsbCwgZmlsZTogdHMuU291cmNlRmlsZSk6IHRzLlNvdXJjZUZpbGUge1xuICBjb25zdCBpbXBvcnRNYW5hZ2VyID0gbmV3IEltcG9ydE1hbmFnZXIoY29yZUltcG9ydHNGcm9tICE9PSBudWxsKTtcblxuICAvLyBSZWN1cnNpdmVseSBzY2FuIHRocm91Z2ggdGhlIEFTVCBhbmQgcGVyZm9ybSBhbnkgdXBkYXRlcyByZXF1ZXN0ZWQgYnkgdGhlIEl2eUNvbXBpbGF0aW9uLlxuICBjb25zdCBzZiA9IHZpc2l0KFxuICAgICAgZmlsZSwgbmV3IEl2eVZpc2l0b3IoY29tcGlsYXRpb24sIHJlZmxlY3RvciwgaW1wb3J0TWFuYWdlciwgY29yZUltcG9ydHNGcm9tICE9PSBudWxsKSxcbiAgICAgIGNvbnRleHQpO1xuXG4gIC8vIEdlbmVyYXRlIHRoZSBpbXBvcnQgc3RhdGVtZW50cyB0byBwcmVwZW5kLlxuICBjb25zdCBpbXBvcnRzID0gaW1wb3J0TWFuYWdlci5nZXRBbGxJbXBvcnRzKGZpbGUuZmlsZU5hbWUsIGNvcmVJbXBvcnRzRnJvbSkubWFwKGkgPT4ge1xuICAgIHJldHVybiB0cy5jcmVhdGVJbXBvcnREZWNsYXJhdGlvbihcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgICAgIHRzLmNyZWF0ZUltcG9ydENsYXVzZSh1bmRlZmluZWQsIHRzLmNyZWF0ZU5hbWVzcGFjZUltcG9ydCh0cy5jcmVhdGVJZGVudGlmaWVyKGkuYXMpKSksXG4gICAgICAgIHRzLmNyZWF0ZUxpdGVyYWwoaS5uYW1lKSk7XG4gIH0pO1xuXG4gIC8vIFByZXBlbmQgaW1wb3J0cyBpZiBuZWVkZWQuXG4gIGlmIChpbXBvcnRzLmxlbmd0aCA+IDApIHtcbiAgICBzZi5zdGF0ZW1lbnRzID0gdHMuY3JlYXRlTm9kZUFycmF5KFsuLi5pbXBvcnRzLCAuLi5zZi5zdGF0ZW1lbnRzXSk7XG4gIH1cbiAgcmV0dXJuIHNmO1xufVxuXG5mdW5jdGlvbiBtYXliZUZpbHRlckRlY29yYXRvcihcbiAgICBkZWNvcmF0b3JzOiB0cy5Ob2RlQXJyYXk8dHMuRGVjb3JhdG9yPnwgdW5kZWZpbmVkLFxuICAgIHRvUmVtb3ZlOiB0cy5EZWNvcmF0b3IpOiB0cy5Ob2RlQXJyYXk8dHMuRGVjb3JhdG9yPnx1bmRlZmluZWQge1xuICBpZiAoZGVjb3JhdG9ycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBmaWx0ZXJlZCA9IGRlY29yYXRvcnMuZmlsdGVyKGRlYyA9PiB0cy5nZXRPcmlnaW5hbE5vZGUoZGVjKSAhPT0gdG9SZW1vdmUpO1xuICBpZiAoZmlsdGVyZWQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gdHMuY3JlYXRlTm9kZUFycmF5KGZpbHRlcmVkKTtcbn1cblxuZnVuY3Rpb24gaXNGcm9tQW5ndWxhckNvcmUoZGVjb3JhdG9yOiBEZWNvcmF0b3IpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRlY29yYXRvci5pbXBvcnQgIT09IG51bGwgJiYgZGVjb3JhdG9yLmltcG9ydC5mcm9tID09PSAnQGFuZ3VsYXIvY29yZSc7XG59XG4iXX0=