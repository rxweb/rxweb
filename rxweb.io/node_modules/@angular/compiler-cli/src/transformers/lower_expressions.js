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
        define("@angular/compiler-cli/src/transformers/lower_expressions", ["require", "exports", "tslib", "@angular/compiler", "typescript", "@angular/compiler-cli/src/metadata/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var ts = require("typescript");
    var index_1 = require("@angular/compiler-cli/src/metadata/index");
    function toMap(items, select) {
        return new Map(items.map(function (i) { return [select(i), i]; }));
    }
    // We will never lower expressions in a nested lexical scope so avoid entering them.
    // This also avoids a bug in TypeScript 2.3 where the lexical scopes get out of sync
    // when using visitEachChild.
    function isLexicalScope(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.TypeLiteral:
            case ts.SyntaxKind.ArrayType:
                return true;
        }
        return false;
    }
    function transformSourceFile(sourceFile, requests, context) {
        var inserts = [];
        // Calculate the range of interesting locations. The transform will only visit nodes in this
        // range to improve the performance on large files.
        var locations = Array.from(requests.keys());
        var min = Math.min.apply(Math, tslib_1.__spread(locations));
        var max = Math.max.apply(Math, tslib_1.__spread(locations));
        // Visit nodes matching the request and synthetic nodes added by tsickle
        function shouldVisit(pos, end) {
            return (pos <= max && end >= min) || pos == -1;
        }
        function visitSourceFile(sourceFile) {
            function topLevelStatement(node) {
                var declarations = [];
                function visitNode(node) {
                    // Get the original node before tsickle
                    var _a = ts.getOriginalNode(node), pos = _a.pos, end = _a.end, kind = _a.kind, originalParent = _a.parent;
                    var nodeRequest = requests.get(pos);
                    if (nodeRequest && nodeRequest.kind == kind && nodeRequest.end == end) {
                        // This node is requested to be rewritten as a reference to the exported name.
                        if (originalParent && originalParent.kind === ts.SyntaxKind.VariableDeclaration) {
                            // As the value represents the whole initializer of a variable declaration,
                            // just refer to that variable. This e.g. helps to preserve closure comments
                            // at the right place.
                            var varParent = originalParent;
                            if (varParent.name.kind === ts.SyntaxKind.Identifier) {
                                var varName = varParent.name.text;
                                var exportName_1 = nodeRequest.name;
                                declarations.push({
                                    name: exportName_1,
                                    node: ts.createIdentifier(varName),
                                    order: 1 /* AfterStmt */
                                });
                                return node;
                            }
                        }
                        // Record that the node needs to be moved to an exported variable with the given name
                        var exportName = nodeRequest.name;
                        declarations.push({ name: exportName, node: node, order: 0 /* BeforeStmt */ });
                        return ts.createIdentifier(exportName);
                    }
                    var result = node;
                    if (shouldVisit(pos, end) && !isLexicalScope(node)) {
                        result = ts.visitEachChild(node, visitNode, context);
                    }
                    return result;
                }
                // Get the original node before tsickle
                var _a = ts.getOriginalNode(node), pos = _a.pos, end = _a.end;
                var resultStmt;
                if (shouldVisit(pos, end)) {
                    resultStmt = ts.visitEachChild(node, visitNode, context);
                }
                else {
                    resultStmt = node;
                }
                if (declarations.length) {
                    inserts.push({ relativeTo: resultStmt, declarations: declarations });
                }
                return resultStmt;
            }
            var newStatements = sourceFile.statements.map(topLevelStatement);
            if (inserts.length) {
                // Insert the declarations relative to the rewritten statement that references them.
                var insertMap_1 = toMap(inserts, function (i) { return i.relativeTo; });
                var tmpStatements_1 = [];
                newStatements.forEach(function (statement) {
                    var insert = insertMap_1.get(statement);
                    if (insert) {
                        var before = insert.declarations.filter(function (d) { return d.order === 0 /* BeforeStmt */; });
                        if (before.length) {
                            tmpStatements_1.push(createVariableStatementForDeclarations(before));
                        }
                        tmpStatements_1.push(statement);
                        var after = insert.declarations.filter(function (d) { return d.order === 1 /* AfterStmt */; });
                        if (after.length) {
                            tmpStatements_1.push(createVariableStatementForDeclarations(after));
                        }
                    }
                    else {
                        tmpStatements_1.push(statement);
                    }
                });
                // Insert an exports clause to export the declarations
                tmpStatements_1.push(ts.createExportDeclaration(
                /* decorators */ undefined, 
                /* modifiers */ undefined, ts.createNamedExports(inserts
                    .reduce(function (accumulator, insert) { return tslib_1.__spread(accumulator, insert.declarations); }, [])
                    .map(function (declaration) { return ts.createExportSpecifier(
                /* propertyName */ undefined, declaration.name); }))));
                newStatements = tmpStatements_1;
            }
            // Note: We cannot use ts.updateSourcefile here as
            // it does not work well with decorators.
            // See https://github.com/Microsoft/TypeScript/issues/17384
            var newSf = ts.getMutableClone(sourceFile);
            if (!(sourceFile.flags & ts.NodeFlags.Synthesized)) {
                newSf.flags &= ~ts.NodeFlags.Synthesized;
            }
            newSf.statements = ts.setTextRange(ts.createNodeArray(newStatements), sourceFile.statements);
            return newSf;
        }
        return visitSourceFile(sourceFile);
    }
    function createVariableStatementForDeclarations(declarations) {
        var varDecls = declarations.map(function (i) { return ts.createVariableDeclaration(i.name, /* type */ undefined, i.node); });
        return ts.createVariableStatement(
        /* modifiers */ undefined, ts.createVariableDeclarationList(varDecls, ts.NodeFlags.Const));
    }
    function getExpressionLoweringTransformFactory(requestsMap, program) {
        // Return the factory
        return function (context) { return function (sourceFile) {
            // We need to use the original SourceFile for reading metadata, and not the transformed one.
            var originalFile = program.getSourceFile(sourceFile.fileName);
            if (originalFile) {
                var requests = requestsMap.getRequests(originalFile);
                if (requests && requests.size) {
                    return transformSourceFile(sourceFile, requests, context);
                }
            }
            return sourceFile;
        }; };
    }
    exports.getExpressionLoweringTransformFactory = getExpressionLoweringTransformFactory;
    function isEligibleForLowering(node) {
        if (node) {
            switch (node.kind) {
                case ts.SyntaxKind.SourceFile:
                case ts.SyntaxKind.Decorator:
                    // Lower expressions that are local to the module scope or
                    // in a decorator.
                    return true;
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.EnumDeclaration:
                case ts.SyntaxKind.FunctionDeclaration:
                    // Don't lower expressions in a declaration.
                    return false;
                case ts.SyntaxKind.VariableDeclaration:
                    // Avoid lowering expressions already in an exported variable declaration
                    return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) == 0;
            }
            return isEligibleForLowering(node.parent);
        }
        return true;
    }
    function isPrimitive(value) {
        return Object(value) !== value;
    }
    function isRewritten(value) {
        return index_1.isMetadataGlobalReferenceExpression(value) && compiler_1.isLoweredSymbol(value.name);
    }
    function isLiteralFieldNamed(node, names) {
        if (node.parent && node.parent.kind == ts.SyntaxKind.PropertyAssignment) {
            var property = node.parent;
            if (property.parent && property.parent.kind == ts.SyntaxKind.ObjectLiteralExpression &&
                property.name && property.name.kind == ts.SyntaxKind.Identifier) {
                var propertyName = property.name;
                return names.has(propertyName.text);
            }
        }
        return false;
    }
    var LowerMetadataTransform = /** @class */ (function () {
        function LowerMetadataTransform(lowerableFieldNames) {
            this.requests = new Map();
            this.lowerableFieldNames = new Set(lowerableFieldNames);
        }
        // RequestMap
        LowerMetadataTransform.prototype.getRequests = function (sourceFile) {
            var result = this.requests.get(sourceFile.fileName);
            if (!result) {
                // Force the metadata for this source file to be collected which
                // will recursively call start() populating the request map;
                this.cache.getMetadata(sourceFile);
                // If we still don't have the requested metadata, the file is not a module
                // or is a declaration file so return an empty map.
                result = this.requests.get(sourceFile.fileName) || new Map();
            }
            return result;
        };
        // MetadataTransformer
        LowerMetadataTransform.prototype.connect = function (cache) { this.cache = cache; };
        LowerMetadataTransform.prototype.start = function (sourceFile) {
            var _this = this;
            var identNumber = 0;
            var freshIdent = function () { return compiler_1.createLoweredSymbol(identNumber++); };
            var requests = new Map();
            this.requests.set(sourceFile.fileName, requests);
            var replaceNode = function (node) {
                var name = freshIdent();
                requests.set(node.pos, { name: name, kind: node.kind, location: node.pos, end: node.end });
                return { __symbolic: 'reference', name: name };
            };
            var isExportedSymbol = (function () {
                var exportTable;
                return function (node) {
                    if (node.kind == ts.SyntaxKind.Identifier) {
                        var ident = node;
                        if (!exportTable) {
                            exportTable = createExportTableFor(sourceFile);
                        }
                        return exportTable.has(ident.text);
                    }
                    return false;
                };
            })();
            var isExportedPropertyAccess = function (node) {
                if (node.kind === ts.SyntaxKind.PropertyAccessExpression) {
                    var pae = node;
                    if (isExportedSymbol(pae.expression)) {
                        return true;
                    }
                }
                return false;
            };
            var hasLowerableParentCache = new Map();
            var shouldBeLowered = function (node) {
                if (node === undefined) {
                    return false;
                }
                var lowerable = false;
                if ((node.kind === ts.SyntaxKind.ArrowFunction ||
                    node.kind === ts.SyntaxKind.FunctionExpression) &&
                    isEligibleForLowering(node)) {
                    lowerable = true;
                }
                else if (isLiteralFieldNamed(node, _this.lowerableFieldNames) && isEligibleForLowering(node) &&
                    !isExportedSymbol(node) && !isExportedPropertyAccess(node)) {
                    lowerable = true;
                }
                return lowerable;
            };
            var hasLowerableParent = function (node) {
                if (node === undefined) {
                    return false;
                }
                if (!hasLowerableParentCache.has(node)) {
                    hasLowerableParentCache.set(node, shouldBeLowered(node.parent) || hasLowerableParent(node.parent));
                }
                return hasLowerableParentCache.get(node);
            };
            var isLowerable = function (node) {
                if (node === undefined) {
                    return false;
                }
                return shouldBeLowered(node) && !hasLowerableParent(node);
            };
            return function (value, node) {
                if (!isPrimitive(value) && !isRewritten(value) && isLowerable(node)) {
                    return replaceNode(node);
                }
                return value;
            };
        };
        return LowerMetadataTransform;
    }());
    exports.LowerMetadataTransform = LowerMetadataTransform;
    function createExportTableFor(sourceFile) {
        var exportTable = new Set();
        // Lazily collect all the exports from the source file
        ts.forEachChild(sourceFile, function scan(node) {
            var e_1, _a;
            switch (node.kind) {
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.InterfaceDeclaration:
                    if ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) != 0) {
                        var classDeclaration = node;
                        var name = classDeclaration.name;
                        if (name)
                            exportTable.add(name.text);
                    }
                    break;
                case ts.SyntaxKind.VariableStatement:
                    var variableStatement = node;
                    try {
                        for (var _b = tslib_1.__values(variableStatement.declarationList.declarations), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var declaration = _c.value;
                            scan(declaration);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    break;
                case ts.SyntaxKind.VariableDeclaration:
                    var variableDeclaration = node;
                    if ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) != 0 &&
                        variableDeclaration.name.kind == ts.SyntaxKind.Identifier) {
                        var name = variableDeclaration.name;
                        exportTable.add(name.text);
                    }
                    break;
                case ts.SyntaxKind.ExportDeclaration:
                    var exportDeclaration = node;
                    var moduleSpecifier = exportDeclaration.moduleSpecifier, exportClause = exportDeclaration.exportClause;
                    if (!moduleSpecifier && exportClause) {
                        exportClause.elements.forEach(function (spec) { exportTable.add(spec.name.text); });
                    }
            }
        });
        return exportTable;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93ZXJfZXhwcmVzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL3RyYW5zZm9ybWVycy9sb3dlcl9leHByZXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSCw4Q0FBdUU7SUFDdkUsK0JBQWlDO0lBRWpDLGtFQUEwSTtJQXlCMUksZUFBcUIsS0FBVSxFQUFFLE1BQXNCO1FBQ3JELE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBUyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELG9GQUFvRjtJQUNwRixvRkFBb0Y7SUFDcEYsNkJBQTZCO0lBQzdCLHdCQUF3QixJQUFhO1FBQ25DLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ2pDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQztZQUN0QyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztZQUNuQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7WUFDcEMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUNoQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQy9CLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTO2dCQUMxQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsNkJBQ0ksVUFB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d0JBQ2xFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7d0JBQzdELElBQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQXFCLENBQUM7d0JBQ3ZELFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUM1QjtvQkFDRCxNQUFNO2dCQUNSLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7b0JBQ2xDLElBQU0saUJBQWlCLEdBQUcsSUFBNEIsQ0FBQztvQkFDaEQsSUFBQSxtREFBZSxFQUFFLDZDQUFZLENBQXNCO29CQUMxRCxJQUFJLENBQUMsZUFBZSxJQUFJLFlBQVksRUFBRTt3QkFDcEMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLElBQU0sV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzdFO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y3JlYXRlTG93ZXJlZFN5bWJvbCwgaXNMb3dlcmVkU3ltYm9sfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtDb2xsZWN0b3JPcHRpb25zLCBNZXRhZGF0YUNvbGxlY3RvciwgTWV0YWRhdGFWYWx1ZSwgTW9kdWxlTWV0YWRhdGEsIGlzTWV0YWRhdGFHbG9iYWxSZWZlcmVuY2VFeHByZXNzaW9ufSBmcm9tICcuLi9tZXRhZGF0YS9pbmRleCc7XG5pbXBvcnQge01ldGFkYXRhQ2FjaGUsIE1ldGFkYXRhVHJhbnNmb3JtZXIsIFZhbHVlVHJhbnNmb3JtfSBmcm9tICcuL21ldGFkYXRhX2NhY2hlJztcblxuZXhwb3J0IGludGVyZmFjZSBMb3dlcmluZ1JlcXVlc3Qge1xuICBraW5kOiB0cy5TeW50YXhLaW5kO1xuICBsb2NhdGlvbjogbnVtYmVyO1xuICBlbmQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBSZXF1ZXN0TG9jYXRpb25NYXAgPSBNYXA8bnVtYmVyLCBMb3dlcmluZ1JlcXVlc3Q+O1xuXG5jb25zdCBlbnVtIERlY2xhcmF0aW9uT3JkZXIgeyBCZWZvcmVTdG10LCBBZnRlclN0bXQgfVxuXG5pbnRlcmZhY2UgRGVjbGFyYXRpb24ge1xuICBuYW1lOiBzdHJpbmc7XG4gIG5vZGU6IHRzLk5vZGU7XG4gIG9yZGVyOiBEZWNsYXJhdGlvbk9yZGVyO1xufVxuXG5pbnRlcmZhY2UgRGVjbGFyYXRpb25JbnNlcnQge1xuICBkZWNsYXJhdGlvbnM6IERlY2xhcmF0aW9uW107XG4gIHJlbGF0aXZlVG86IHRzLk5vZGU7XG59XG5cbmZ1bmN0aW9uIHRvTWFwPFQsIEs+KGl0ZW1zOiBUW10sIHNlbGVjdDogKGl0ZW06IFQpID0+IEspOiBNYXA8SywgVD4ge1xuICByZXR1cm4gbmV3IE1hcChpdGVtcy5tYXA8W0ssIFRdPihpID0+IFtzZWxlY3QoaSksIGldKSk7XG59XG5cbi8vIFdlIHdpbGwgbmV2ZXIgbG93ZXIgZXhwcmVzc2lvbnMgaW4gYSBuZXN0ZWQgbGV4aWNhbCBzY29wZSBzbyBhdm9pZCBlbnRlcmluZyB0aGVtLlxuLy8gVGhpcyBhbHNvIGF2b2lkcyBhIGJ1ZyBpbiBUeXBlU2NyaXB0IDIuMyB3aGVyZSB0aGUgbGV4aWNhbCBzY29wZXMgZ2V0IG91dCBvZiBzeW5jXG4vLyB3aGVuIHVzaW5nIHZpc2l0RWFjaENoaWxkLlxuZnVuY3Rpb24gaXNMZXhpY2FsU2NvcGUobm9kZTogdHMuTm9kZSk6IGJvb2xlYW4ge1xuICBzd2l0Y2ggKG5vZGUua2luZCkge1xuICAgIGNhc2UgdHMuU3ludGF4S2luZC5BcnJvd0Z1bmN0aW9uOlxuICAgIGNhc2UgdHMuU3ludGF4S2luZC5GdW5jdGlvbkV4cHJlc3Npb246XG4gICAgY2FzZSB0cy5TeW50YXhLaW5kLkZ1bmN0aW9uRGVjbGFyYXRpb246XG4gICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRXhwcmVzc2lvbjpcbiAgICBjYXNlIHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvbjpcbiAgICBjYXNlIHRzLlN5bnRheEtpbmQuRnVuY3Rpb25UeXBlOlxuICAgIGNhc2UgdHMuU3ludGF4S2luZC5UeXBlTGl0ZXJhbDpcbiAgICBjYXNlIHRzLlN5bnRheEtpbmQuQXJyYXlUeXBlOlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1Tb3VyY2VGaWxlKFxuICAgIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIHJlcXVlc3RzOiBSZXF1ZXN0TG9jYXRpb25NYXAsXG4gICAgY29udGV4dDogdHMuVHJhbnNmb3JtYXRpb25Db250ZXh0KTogdHMuU291cmNlRmlsZSB7XG4gIGNvbnN0IGluc2VydHM6IERlY2xhcmF0aW9uSW5zZXJ0W10gPSBbXTtcblxuICAvLyBDYWxjdWxhdGUgdGhlIHJhbmdlIG9mIGludGVyZXN0aW5nIGxvY2F0aW9ucy4gVGhlIHRyYW5zZm9ybSB3aWxsIG9ubHkgdmlzaXQgbm9kZXMgaW4gdGhpc1xuICAvLyByYW5nZSB0byBpbXByb3ZlIHRoZSBwZXJmb3JtYW5jZSBvbiBsYXJnZSBmaWxlcy5cbiAgY29uc3QgbG9jYXRpb25zID0gQXJyYXkuZnJvbShyZXF1ZXN0cy5rZXlzKCkpO1xuICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5sb2NhdGlvbnMpO1xuICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5sb2NhdGlvbnMpO1xuXG4gIC8vIFZpc2l0IG5vZGVzIG1hdGNoaW5nIHRoZSByZXF1ZXN0IGFuZCBzeW50aGV0aWMgbm9kZXMgYWRkZWQgYnkgdHNpY2tsZVxuICBmdW5jdGlvbiBzaG91bGRWaXNpdChwb3M6IG51bWJlciwgZW5kOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHBvcyA8PSBtYXggJiYgZW5kID49IG1pbikgfHwgcG9zID09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gdmlzaXRTb3VyY2VGaWxlKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiB0cy5Tb3VyY2VGaWxlIHtcbiAgICBmdW5jdGlvbiB0b3BMZXZlbFN0YXRlbWVudChub2RlOiB0cy5TdGF0ZW1lbnQpOiB0cy5TdGF0ZW1lbnQge1xuICAgICAgY29uc3QgZGVjbGFyYXRpb25zOiBEZWNsYXJhdGlvbltdID0gW107XG5cbiAgICAgIGZ1bmN0aW9uIHZpc2l0Tm9kZShub2RlOiB0cy5Ob2RlKTogdHMuTm9kZSB7XG4gICAgICAgIC8vIEdldCB0aGUgb3JpZ2luYWwgbm9kZSBiZWZvcmUgdHNpY2tsZVxuICAgICAgICBjb25zdCB7cG9zLCBlbmQsIGtpbmQsIHBhcmVudDogb3JpZ2luYWxQYXJlbnR9ID0gdHMuZ2V0T3JpZ2luYWxOb2RlKG5vZGUpO1xuICAgICAgICBjb25zdCBub2RlUmVxdWVzdCA9IHJlcXVlc3RzLmdldChwb3MpO1xuICAgICAgICBpZiAobm9kZVJlcXVlc3QgJiYgbm9kZVJlcXVlc3Qua2luZCA9PSBraW5kICYmIG5vZGVSZXF1ZXN0LmVuZCA9PSBlbmQpIHtcbiAgICAgICAgICAvLyBUaGlzIG5vZGUgaXMgcmVxdWVzdGVkIHRvIGJlIHJld3JpdHRlbiBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZXhwb3J0ZWQgbmFtZS5cbiAgICAgICAgICBpZiAob3JpZ2luYWxQYXJlbnQgJiYgb3JpZ2luYWxQYXJlbnQua2luZCA9PT0gdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgICAvLyBBcyB0aGUgdmFsdWUgcmVwcmVzZW50cyB0aGUgd2hvbGUgaW5pdGlhbGl6ZXIgb2YgYSB2YXJpYWJsZSBkZWNsYXJhdGlvbixcbiAgICAgICAgICAgIC8vIGp1c3QgcmVmZXIgdG8gdGhhdCB2YXJpYWJsZS4gVGhpcyBlLmcuIGhlbHBzIHRvIHByZXNlcnZlIGNsb3N1cmUgY29tbWVudHNcbiAgICAgICAgICAgIC8vIGF0IHRoZSByaWdodCBwbGFjZS5cbiAgICAgICAgICAgIGNvbnN0IHZhclBhcmVudCA9IG9yaWdpbmFsUGFyZW50IGFzIHRzLlZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICBpZiAodmFyUGFyZW50Lm5hbWUua2luZCA9PT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhck5hbWUgPSB2YXJQYXJlbnQubmFtZS50ZXh0O1xuICAgICAgICAgICAgICBjb25zdCBleHBvcnROYW1lID0gbm9kZVJlcXVlc3QubmFtZTtcbiAgICAgICAgICAgICAgZGVjbGFyYXRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IGV4cG9ydE5hbWUsXG4gICAgICAgICAgICAgICAgbm9kZTogdHMuY3JlYXRlSWRlbnRpZmllcih2YXJOYW1lKSxcbiAgICAgICAgICAgICAgICBvcmRlcjogRGVjbGFyYXRpb25PcmRlci5BZnRlclN0bXRcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBSZWNvcmQgdGhhdCB0aGUgbm9kZSBuZWVkcyB0byBiZSBtb3ZlZCB0byBhbiBleHBvcnRlZCB2YXJpYWJsZSB3aXRoIHRoZSBnaXZlbiBuYW1lXG4gICAgICAgICAgY29uc3QgZXhwb3J0TmFtZSA9IG5vZGVSZXF1ZXN0Lm5hbWU7XG4gICAgICAgICAgZGVjbGFyYXRpb25zLnB1c2goe25hbWU6IGV4cG9ydE5hbWUsIG5vZGUsIG9yZGVyOiBEZWNsYXJhdGlvbk9yZGVyLkJlZm9yZVN0bXR9KTtcbiAgICAgICAgICByZXR1cm4gdHMuY3JlYXRlSWRlbnRpZmllcihleHBvcnROYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gbm9kZTtcbiAgICAgICAgaWYgKHNob3VsZFZpc2l0KHBvcywgZW5kKSAmJiAhaXNMZXhpY2FsU2NvcGUobm9kZSkpIHtcbiAgICAgICAgICByZXN1bHQgPSB0cy52aXNpdEVhY2hDaGlsZChub2RlLCB2aXNpdE5vZGUsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgb3JpZ2luYWwgbm9kZSBiZWZvcmUgdHNpY2tsZVxuICAgICAgY29uc3Qge3BvcywgZW5kfSA9IHRzLmdldE9yaWdpbmFsTm9kZShub2RlKTtcbiAgICAgIGxldCByZXN1bHRTdG10OiB0cy5TdGF0ZW1lbnQ7XG4gICAgICBpZiAoc2hvdWxkVmlzaXQocG9zLCBlbmQpKSB7XG4gICAgICAgIHJlc3VsdFN0bXQgPSB0cy52aXNpdEVhY2hDaGlsZChub2RlLCB2aXNpdE5vZGUsIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0U3RtdCA9IG5vZGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWNsYXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIGluc2VydHMucHVzaCh7cmVsYXRpdmVUbzogcmVzdWx0U3RtdCwgZGVjbGFyYXRpb25zfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0U3RtdDtcbiAgICB9XG5cbiAgICBsZXQgbmV3U3RhdGVtZW50cyA9IHNvdXJjZUZpbGUuc3RhdGVtZW50cy5tYXAodG9wTGV2ZWxTdGF0ZW1lbnQpO1xuXG4gICAgaWYgKGluc2VydHMubGVuZ3RoKSB7XG4gICAgICAvLyBJbnNlcnQgdGhlIGRlY2xhcmF0aW9ucyByZWxhdGl2ZSB0byB0aGUgcmV3cml0dGVuIHN0YXRlbWVudCB0aGF0IHJlZmVyZW5jZXMgdGhlbS5cbiAgICAgIGNvbnN0IGluc2VydE1hcCA9IHRvTWFwKGluc2VydHMsIGkgPT4gaS5yZWxhdGl2ZVRvKTtcbiAgICAgIGNvbnN0IHRtcFN0YXRlbWVudHM6IHRzLlN0YXRlbWVudFtdID0gW107XG4gICAgICBuZXdTdGF0ZW1lbnRzLmZvckVhY2goc3RhdGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgaW5zZXJ0ID0gaW5zZXJ0TWFwLmdldChzdGF0ZW1lbnQpO1xuICAgICAgICBpZiAoaW5zZXJ0KSB7XG4gICAgICAgICAgY29uc3QgYmVmb3JlID0gaW5zZXJ0LmRlY2xhcmF0aW9ucy5maWx0ZXIoZCA9PiBkLm9yZGVyID09PSBEZWNsYXJhdGlvbk9yZGVyLkJlZm9yZVN0bXQpO1xuICAgICAgICAgIGlmIChiZWZvcmUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0bXBTdGF0ZW1lbnRzLnB1c2goY3JlYXRlVmFyaWFibGVTdGF0ZW1lbnRGb3JEZWNsYXJhdGlvbnMoYmVmb3JlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRtcFN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xuICAgICAgICAgIGNvbnN0IGFmdGVyID0gaW5zZXJ0LmRlY2xhcmF0aW9ucy5maWx0ZXIoZCA9PiBkLm9yZGVyID09PSBEZWNsYXJhdGlvbk9yZGVyLkFmdGVyU3RtdCk7XG4gICAgICAgICAgaWYgKGFmdGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgdG1wU3RhdGVtZW50cy5wdXNoKGNyZWF0ZVZhcmlhYmxlU3RhdGVtZW50Rm9yRGVjbGFyYXRpb25zKGFmdGVyKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRtcFN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSW5zZXJ0IGFuIGV4cG9ydHMgY2xhdXNlIHRvIGV4cG9ydCB0aGUgZGVjbGFyYXRpb25zXG4gICAgICB0bXBTdGF0ZW1lbnRzLnB1c2godHMuY3JlYXRlRXhwb3J0RGVjbGFyYXRpb24oXG4gICAgICAgICAgLyogZGVjb3JhdG9ycyAqLyB1bmRlZmluZWQsXG4gICAgICAgICAgLyogbW9kaWZpZXJzICovIHVuZGVmaW5lZCxcbiAgICAgICAgICB0cy5jcmVhdGVOYW1lZEV4cG9ydHMoXG4gICAgICAgICAgICAgIGluc2VydHNcbiAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgICAgICAgKGFjY3VtdWxhdG9yLCBpbnNlcnQpID0+IFsuLi5hY2N1bXVsYXRvciwgLi4uaW5zZXJ0LmRlY2xhcmF0aW9uc10sXG4gICAgICAgICAgICAgICAgICAgICAgW10gYXMgRGVjbGFyYXRpb25bXSlcbiAgICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb24gPT4gdHMuY3JlYXRlRXhwb3J0U3BlY2lmaWVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBwcm9wZXJ0eU5hbWUgKi8gdW5kZWZpbmVkLCBkZWNsYXJhdGlvbi5uYW1lKSkpKSk7XG5cbiAgICAgIG5ld1N0YXRlbWVudHMgPSB0bXBTdGF0ZW1lbnRzO1xuICAgIH1cbiAgICAvLyBOb3RlOiBXZSBjYW5ub3QgdXNlIHRzLnVwZGF0ZVNvdXJjZWZpbGUgaGVyZSBhc1xuICAgIC8vIGl0IGRvZXMgbm90IHdvcmsgd2VsbCB3aXRoIGRlY29yYXRvcnMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTczODRcbiAgICBjb25zdCBuZXdTZiA9IHRzLmdldE11dGFibGVDbG9uZShzb3VyY2VGaWxlKTtcbiAgICBpZiAoIShzb3VyY2VGaWxlLmZsYWdzICYgdHMuTm9kZUZsYWdzLlN5bnRoZXNpemVkKSkge1xuICAgICAgbmV3U2YuZmxhZ3MgJj0gfnRzLk5vZGVGbGFncy5TeW50aGVzaXplZDtcbiAgICB9XG4gICAgbmV3U2Yuc3RhdGVtZW50cyA9IHRzLnNldFRleHRSYW5nZSh0cy5jcmVhdGVOb2RlQXJyYXkobmV3U3RhdGVtZW50cyksIHNvdXJjZUZpbGUuc3RhdGVtZW50cyk7XG4gICAgcmV0dXJuIG5ld1NmO1xuICB9XG5cbiAgcmV0dXJuIHZpc2l0U291cmNlRmlsZShzb3VyY2VGaWxlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmFyaWFibGVTdGF0ZW1lbnRGb3JEZWNsYXJhdGlvbnMoZGVjbGFyYXRpb25zOiBEZWNsYXJhdGlvbltdKTogdHMuVmFyaWFibGVTdGF0ZW1lbnQge1xuICBjb25zdCB2YXJEZWNscyA9IGRlY2xhcmF0aW9ucy5tYXAoXG4gICAgICBpID0+IHRzLmNyZWF0ZVZhcmlhYmxlRGVjbGFyYXRpb24oaS5uYW1lLCAvKiB0eXBlICovIHVuZGVmaW5lZCwgaS5ub2RlIGFzIHRzLkV4cHJlc3Npb24pKTtcbiAgcmV0dXJuIHRzLmNyZWF0ZVZhcmlhYmxlU3RhdGVtZW50KFxuICAgICAgLyogbW9kaWZpZXJzICovIHVuZGVmaW5lZCwgdHMuY3JlYXRlVmFyaWFibGVEZWNsYXJhdGlvbkxpc3QodmFyRGVjbHMsIHRzLk5vZGVGbGFncy5Db25zdCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXhwcmVzc2lvbkxvd2VyaW5nVHJhbnNmb3JtRmFjdG9yeShcbiAgICByZXF1ZXN0c01hcDogUmVxdWVzdHNNYXAsIHByb2dyYW06IHRzLlByb2dyYW0pOiAoY29udGV4dDogdHMuVHJhbnNmb3JtYXRpb25Db250ZXh0KSA9PlxuICAgIChzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKSA9PiB0cy5Tb3VyY2VGaWxlIHtcbiAgLy8gUmV0dXJuIHRoZSBmYWN0b3J5XG4gIHJldHVybiAoY29udGV4dDogdHMuVHJhbnNmb3JtYXRpb25Db250ZXh0KSA9PiAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IHRzLlNvdXJjZUZpbGUgPT4ge1xuICAgIC8vIFdlIG5lZWQgdG8gdXNlIHRoZSBvcmlnaW5hbCBTb3VyY2VGaWxlIGZvciByZWFkaW5nIG1ldGFkYXRhLCBhbmQgbm90IHRoZSB0cmFuc2Zvcm1lZCBvbmUuXG4gICAgY29uc3Qgb3JpZ2luYWxGaWxlID0gcHJvZ3JhbS5nZXRTb3VyY2VGaWxlKHNvdXJjZUZpbGUuZmlsZU5hbWUpO1xuICAgIGlmIChvcmlnaW5hbEZpbGUpIHtcbiAgICAgIGNvbnN0IHJlcXVlc3RzID0gcmVxdWVzdHNNYXAuZ2V0UmVxdWVzdHMob3JpZ2luYWxGaWxlKTtcbiAgICAgIGlmIChyZXF1ZXN0cyAmJiByZXF1ZXN0cy5zaXplKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1Tb3VyY2VGaWxlKHNvdXJjZUZpbGUsIHJlcXVlc3RzLCBjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZUZpbGU7XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdHNNYXAgeyBnZXRSZXF1ZXN0cyhzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogUmVxdWVzdExvY2F0aW9uTWFwOyB9XG5cbmludGVyZmFjZSBNZXRhZGF0YUFuZExvd2VyaW5nUmVxdWVzdHMge1xuICBtZXRhZGF0YTogTW9kdWxlTWV0YWRhdGF8dW5kZWZpbmVkO1xuICByZXF1ZXN0czogUmVxdWVzdExvY2F0aW9uTWFwO1xufVxuXG5mdW5jdGlvbiBpc0VsaWdpYmxlRm9yTG93ZXJpbmcobm9kZTogdHMuTm9kZSB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICBpZiAobm9kZSkge1xuICAgIHN3aXRjaCAobm9kZS5raW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuU291cmNlRmlsZTpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5EZWNvcmF0b3I6XG4gICAgICAgIC8vIExvd2VyIGV4cHJlc3Npb25zIHRoYXQgYXJlIGxvY2FsIHRvIHRoZSBtb2R1bGUgc2NvcGUgb3JcbiAgICAgICAgLy8gaW4gYSBkZWNvcmF0b3IuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW50ZXJmYWNlRGVjbGFyYXRpb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRW51bURlY2xhcmF0aW9uOlxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkZ1bmN0aW9uRGVjbGFyYXRpb246XG4gICAgICAgIC8vIERvbid0IGxvd2VyIGV4cHJlc3Npb25zIGluIGEgZGVjbGFyYXRpb24uXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uOlxuICAgICAgICAvLyBBdm9pZCBsb3dlcmluZyBleHByZXNzaW9ucyBhbHJlYWR5IGluIGFuIGV4cG9ydGVkIHZhcmlhYmxlIGRlY2xhcmF0aW9uXG4gICAgICAgIHJldHVybiAodHMuZ2V0Q29tYmluZWRNb2RpZmllckZsYWdzKG5vZGUpICYgdHMuTW9kaWZpZXJGbGFncy5FeHBvcnQpID09IDA7XG4gICAgfVxuICAgIHJldHVybiBpc0VsaWdpYmxlRm9yTG93ZXJpbmcobm9kZS5wYXJlbnQpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QodmFsdWUpICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaXNSZXdyaXR0ZW4odmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNNZXRhZGF0YUdsb2JhbFJlZmVyZW5jZUV4cHJlc3Npb24odmFsdWUpICYmIGlzTG93ZXJlZFN5bWJvbCh2YWx1ZS5uYW1lKTtcbn1cblxuZnVuY3Rpb24gaXNMaXRlcmFsRmllbGROYW1lZChub2RlOiB0cy5Ob2RlLCBuYW1lczogU2V0PHN0cmluZz4pOiBib29sZWFuIHtcbiAgaWYgKG5vZGUucGFyZW50ICYmIG5vZGUucGFyZW50LmtpbmQgPT0gdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFzc2lnbm1lbnQpIHtcbiAgICBjb25zdCBwcm9wZXJ0eSA9IG5vZGUucGFyZW50IGFzIHRzLlByb3BlcnR5QXNzaWdubWVudDtcbiAgICBpZiAocHJvcGVydHkucGFyZW50ICYmIHByb3BlcnR5LnBhcmVudC5raW5kID09IHRzLlN5bnRheEtpbmQuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24gJiZcbiAgICAgICAgcHJvcGVydHkubmFtZSAmJiBwcm9wZXJ0eS5uYW1lLmtpbmQgPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eS5uYW1lIGFzIHRzLklkZW50aWZpZXI7XG4gICAgICByZXR1cm4gbmFtZXMuaGFzKHByb3BlcnR5TmFtZS50ZXh0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgY2xhc3MgTG93ZXJNZXRhZGF0YVRyYW5zZm9ybSBpbXBsZW1lbnRzIFJlcXVlc3RzTWFwLCBNZXRhZGF0YVRyYW5zZm9ybWVyIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgY2FjaGUgITogTWV0YWRhdGFDYWNoZTtcbiAgcHJpdmF0ZSByZXF1ZXN0cyA9IG5ldyBNYXA8c3RyaW5nLCBSZXF1ZXN0TG9jYXRpb25NYXA+KCk7XG4gIHByaXZhdGUgbG93ZXJhYmxlRmllbGROYW1lczogU2V0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IobG93ZXJhYmxlRmllbGROYW1lczogc3RyaW5nW10pIHtcbiAgICB0aGlzLmxvd2VyYWJsZUZpZWxkTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4obG93ZXJhYmxlRmllbGROYW1lcyk7XG4gIH1cblxuICAvLyBSZXF1ZXN0TWFwXG4gIGdldFJlcXVlc3RzKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBSZXF1ZXN0TG9jYXRpb25NYXAge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3RzLmdldChzb3VyY2VGaWxlLmZpbGVOYW1lKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgLy8gRm9yY2UgdGhlIG1ldGFkYXRhIGZvciB0aGlzIHNvdXJjZSBmaWxlIHRvIGJlIGNvbGxlY3RlZCB3aGljaFxuICAgICAgLy8gd2lsbCByZWN1cnNpdmVseSBjYWxsIHN0YXJ0KCkgcG9wdWxhdGluZyB0aGUgcmVxdWVzdCBtYXA7XG4gICAgICB0aGlzLmNhY2hlLmdldE1ldGFkYXRhKHNvdXJjZUZpbGUpO1xuXG4gICAgICAvLyBJZiB3ZSBzdGlsbCBkb24ndCBoYXZlIHRoZSByZXF1ZXN0ZWQgbWV0YWRhdGEsIHRoZSBmaWxlIGlzIG5vdCBhIG1vZHVsZVxuICAgICAgLy8gb3IgaXMgYSBkZWNsYXJhdGlvbiBmaWxlIHNvIHJldHVybiBhbiBlbXB0eSBtYXAuXG4gICAgICByZXN1bHQgPSB0aGlzLnJlcXVlc3RzLmdldChzb3VyY2VGaWxlLmZpbGVOYW1lKSB8fCBuZXcgTWFwPG51bWJlciwgTG93ZXJpbmdSZXF1ZXN0PigpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gTWV0YWRhdGFUcmFuc2Zvcm1lclxuICBjb25uZWN0KGNhY2hlOiBNZXRhZGF0YUNhY2hlKTogdm9pZCB7IHRoaXMuY2FjaGUgPSBjYWNoZTsgfVxuXG4gIHN0YXJ0KHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBWYWx1ZVRyYW5zZm9ybXx1bmRlZmluZWQge1xuICAgIGxldCBpZGVudE51bWJlciA9IDA7XG4gICAgY29uc3QgZnJlc2hJZGVudCA9ICgpID0+IGNyZWF0ZUxvd2VyZWRTeW1ib2woaWRlbnROdW1iZXIrKyk7XG4gICAgY29uc3QgcmVxdWVzdHMgPSBuZXcgTWFwPG51bWJlciwgTG93ZXJpbmdSZXF1ZXN0PigpO1xuICAgIHRoaXMucmVxdWVzdHMuc2V0KHNvdXJjZUZpbGUuZmlsZU5hbWUsIHJlcXVlc3RzKTtcblxuICAgIGNvbnN0IHJlcGxhY2VOb2RlID0gKG5vZGU6IHRzLk5vZGUpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBmcmVzaElkZW50KCk7XG4gICAgICByZXF1ZXN0cy5zZXQobm9kZS5wb3MsIHtuYW1lLCBraW5kOiBub2RlLmtpbmQsIGxvY2F0aW9uOiBub2RlLnBvcywgZW5kOiBub2RlLmVuZH0pO1xuICAgICAgcmV0dXJuIHtfX3N5bWJvbGljOiAncmVmZXJlbmNlJywgbmFtZX07XG4gICAgfTtcblxuICAgIGNvbnN0IGlzRXhwb3J0ZWRTeW1ib2wgPSAoKCkgPT4ge1xuICAgICAgbGV0IGV4cG9ydFRhYmxlOiBTZXQ8c3RyaW5nPjtcbiAgICAgIHJldHVybiAobm9kZTogdHMuTm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcikge1xuICAgICAgICAgIGNvbnN0IGlkZW50ID0gbm9kZSBhcyB0cy5JZGVudGlmaWVyO1xuXG4gICAgICAgICAgaWYgKCFleHBvcnRUYWJsZSkge1xuICAgICAgICAgICAgZXhwb3J0VGFibGUgPSBjcmVhdGVFeHBvcnRUYWJsZUZvcihzb3VyY2VGaWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGV4cG9ydFRhYmxlLmhhcyhpZGVudC50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBpc0V4cG9ydGVkUHJvcGVydHlBY2Nlc3MgPSAobm9kZTogdHMuTm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUua2luZCA9PT0gdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24pIHtcbiAgICAgICAgY29uc3QgcGFlID0gbm9kZSBhcyB0cy5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb247XG4gICAgICAgIGlmIChpc0V4cG9ydGVkU3ltYm9sKHBhZS5leHByZXNzaW9uKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhc0xvd2VyYWJsZVBhcmVudENhY2hlID0gbmV3IE1hcDx0cy5Ob2RlLCBib29sZWFuPigpO1xuXG4gICAgY29uc3Qgc2hvdWxkQmVMb3dlcmVkID0gKG5vZGU6IHRzLk5vZGUgfCB1bmRlZmluZWQpOiBib29sZWFuID0+IHtcbiAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbGV0IGxvd2VyYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgaWYgKChub2RlLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQXJyb3dGdW5jdGlvbiB8fFxuICAgICAgICAgICBub2RlLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuRnVuY3Rpb25FeHByZXNzaW9uKSAmJlxuICAgICAgICAgIGlzRWxpZ2libGVGb3JMb3dlcmluZyhub2RlKSkge1xuICAgICAgICBsb3dlcmFibGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBpc0xpdGVyYWxGaWVsZE5hbWVkKG5vZGUsIHRoaXMubG93ZXJhYmxlRmllbGROYW1lcykgJiYgaXNFbGlnaWJsZUZvckxvd2VyaW5nKG5vZGUpICYmXG4gICAgICAgICAgIWlzRXhwb3J0ZWRTeW1ib2wobm9kZSkgJiYgIWlzRXhwb3J0ZWRQcm9wZXJ0eUFjY2Vzcyhub2RlKSkge1xuICAgICAgICBsb3dlcmFibGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxvd2VyYWJsZTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFzTG93ZXJhYmxlUGFyZW50ID0gKG5vZGU6IHRzLk5vZGUgfCB1bmRlZmluZWQpOiBib29sZWFuID0+IHtcbiAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFoYXNMb3dlcmFibGVQYXJlbnRDYWNoZS5oYXMobm9kZSkpIHtcbiAgICAgICAgaGFzTG93ZXJhYmxlUGFyZW50Q2FjaGUuc2V0KFxuICAgICAgICAgICAgbm9kZSwgc2hvdWxkQmVMb3dlcmVkKG5vZGUucGFyZW50KSB8fCBoYXNMb3dlcmFibGVQYXJlbnQobm9kZS5wYXJlbnQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNMb3dlcmFibGVQYXJlbnRDYWNoZS5nZXQobm9kZSkgITtcbiAgICB9O1xuXG4gICAgY29uc3QgaXNMb3dlcmFibGUgPSAobm9kZTogdHMuTm9kZSB8IHVuZGVmaW5lZCk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hvdWxkQmVMb3dlcmVkKG5vZGUpICYmICFoYXNMb3dlcmFibGVQYXJlbnQobm9kZSk7XG4gICAgfTtcblxuICAgIHJldHVybiAodmFsdWU6IE1ldGFkYXRhVmFsdWUsIG5vZGU6IHRzLk5vZGUpOiBNZXRhZGF0YVZhbHVlID0+IHtcbiAgICAgIGlmICghaXNQcmltaXRpdmUodmFsdWUpICYmICFpc1Jld3JpdHRlbih2YWx1ZSkgJiYgaXNMb3dlcmFibGUobm9kZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlcGxhY2VOb2RlKG5vZGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRXhwb3J0VGFibGVGb3Ioc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IFNldDxzdHJpbmc+IHtcbiAgY29uc3QgZXhwb3J0VGFibGUgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgLy8gTGF6aWx5IGNvbGxlY3QgYWxsIHRoZSBleHBvcnRzIGZyb20gdGhlIHNvdXJjZSBmaWxlXG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCBmdW5jdGlvbiBzY2FuKG5vZGUpIHtcbiAgICBzd2l0Y2ggKG5vZGUua2luZCkge1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRnVuY3Rpb25EZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgaWYgKCh0cy5nZXRDb21iaW5lZE1vZGlmaWVyRmxhZ3Mobm9kZSkgJiB0cy5Nb2RpZmllckZsYWdzLkV4cG9ydCkgIT0gMCkge1xuICAgICAgICAgIGNvbnN0IGNsYXNzRGVjbGFyYXRpb24gPVxuICAgICAgICAgICAgICBub2RlIGFzKHRzLkNsYXNzRGVjbGFyYXRpb24gfCB0cy5GdW5jdGlvbkRlY2xhcmF0aW9uIHwgdHMuSW50ZXJmYWNlRGVjbGFyYXRpb24pO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBjbGFzc0RlY2xhcmF0aW9uLm5hbWU7XG4gICAgICAgICAgaWYgKG5hbWUpIGV4cG9ydFRhYmxlLmFkZChuYW1lLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlU3RhdGVtZW50OlxuICAgICAgICBjb25zdCB2YXJpYWJsZVN0YXRlbWVudCA9IG5vZGUgYXMgdHMuVmFyaWFibGVTdGF0ZW1lbnQ7XG4gICAgICAgIGZvciAoY29uc3QgZGVjbGFyYXRpb24gb2YgdmFyaWFibGVTdGF0ZW1lbnQuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9ucykge1xuICAgICAgICAgIHNjYW4oZGVjbGFyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb246XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlRGVjbGFyYXRpb24gPSBub2RlIGFzIHRzLlZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgIGlmICgodHMuZ2V0Q29tYmluZWRNb2RpZmllckZsYWdzKG5vZGUpICYgdHMuTW9kaWZpZXJGbGFncy5FeHBvcnQpICE9IDAgJiZcbiAgICAgICAgICAgIHZhcmlhYmxlRGVjbGFyYXRpb24ubmFtZS5raW5kID09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcikge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB2YXJpYWJsZURlY2xhcmF0aW9uLm5hbWUgYXMgdHMuSWRlbnRpZmllcjtcbiAgICAgICAgICBleHBvcnRUYWJsZS5hZGQobmFtZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FeHBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgY29uc3QgZXhwb3J0RGVjbGFyYXRpb24gPSBub2RlIGFzIHRzLkV4cG9ydERlY2xhcmF0aW9uO1xuICAgICAgICBjb25zdCB7bW9kdWxlU3BlY2lmaWVyLCBleHBvcnRDbGF1c2V9ID0gZXhwb3J0RGVjbGFyYXRpb247XG4gICAgICAgIGlmICghbW9kdWxlU3BlY2lmaWVyICYmIGV4cG9ydENsYXVzZSkge1xuICAgICAgICAgIGV4cG9ydENsYXVzZS5lbGVtZW50cy5mb3JFYWNoKHNwZWMgPT4geyBleHBvcnRUYWJsZS5hZGQoc3BlYy5uYW1lLnRleHQpOyB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBleHBvcnRUYWJsZTtcbn1cbiJdfQ==