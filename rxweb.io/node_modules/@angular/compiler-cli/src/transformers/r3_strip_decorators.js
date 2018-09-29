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
        define("@angular/compiler-cli/src/transformers/r3_strip_decorators", ["require", "exports", "typescript", "@angular/compiler-cli/src/metadata/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("typescript");
    var metadata_1 = require("@angular/compiler-cli/src/metadata/index");
    function getDecoratorStripTransformerFactory(coreDecorators, reflector, checker) {
        return function (context) {
            return function (sourceFile) {
                var stripDecoratorsFromClassDeclaration = function (node) {
                    if (node.decorators === undefined) {
                        return node;
                    }
                    var decorators = node.decorators.filter(function (decorator) {
                        var callExpr = decorator.expression;
                        if (ts.isCallExpression(callExpr)) {
                            var id = callExpr.expression;
                            if (ts.isIdentifier(id)) {
                                var symbol = resolveToStaticSymbol(id, sourceFile.fileName, reflector, checker);
                                return symbol && coreDecorators.has(symbol);
                            }
                        }
                        return true;
                    });
                    if (decorators.length !== node.decorators.length) {
                        return ts.updateClassDeclaration(node, decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses || [], node.members);
                    }
                    return node;
                };
                var stripDecoratorPropertyAssignment = function (node) {
                    return ts.visitEachChild(node, function (member) {
                        if (!ts.isPropertyDeclaration(member) || !isDecoratorAssignment(member) ||
                            !member.initializer || !ts.isArrayLiteralExpression(member.initializer)) {
                            return member;
                        }
                        var newInitializer = ts.visitEachChild(member.initializer, function (decorator) {
                            if (!ts.isObjectLiteralExpression(decorator)) {
                                return decorator;
                            }
                            var type = lookupProperty(decorator, 'type');
                            if (!type || !ts.isIdentifier(type)) {
                                return decorator;
                            }
                            var symbol = resolveToStaticSymbol(type, sourceFile.fileName, reflector, checker);
                            if (!symbol || !coreDecorators.has(symbol)) {
                                return decorator;
                            }
                            return undefined;
                        }, context);
                        if (newInitializer === member.initializer) {
                            return member;
                        }
                        else if (newInitializer.elements.length === 0) {
                            return undefined;
                        }
                        else {
                            return ts.updateProperty(member, member.decorators, member.modifiers, member.name, member.questionToken, member.type, newInitializer);
                        }
                    }, context);
                };
                return ts.visitEachChild(sourceFile, function (stmt) {
                    if (ts.isClassDeclaration(stmt)) {
                        var decl = stmt;
                        if (stmt.decorators) {
                            decl = stripDecoratorsFromClassDeclaration(stmt);
                        }
                        return stripDecoratorPropertyAssignment(decl);
                    }
                    return stmt;
                }, context);
            };
        };
    }
    exports.getDecoratorStripTransformerFactory = getDecoratorStripTransformerFactory;
    function isDecoratorAssignment(member) {
        if (!ts.isPropertyDeclaration(member)) {
            return false;
        }
        if (!member.modifiers ||
            !member.modifiers.some(function (mod) { return mod.kind === ts.SyntaxKind.StaticKeyword; })) {
            return false;
        }
        if (!ts.isIdentifier(member.name) || member.name.text !== 'decorators') {
            return false;
        }
        if (!member.initializer || !ts.isArrayLiteralExpression(member.initializer)) {
            return false;
        }
        return true;
    }
    function lookupProperty(expr, prop) {
        var decl = expr.properties.find(function (elem) { return !!elem.name && ts.isIdentifier(elem.name) && elem.name.text === prop; });
        if (decl === undefined || !ts.isPropertyAssignment(decl)) {
            return undefined;
        }
        return decl.initializer;
    }
    function resolveToStaticSymbol(id, containingFile, reflector, checker) {
        var res = checker.getSymbolAtLocation(id);
        if (!res || !res.declarations || res.declarations.length === 0) {
            return null;
        }
        var decl = res.declarations[0];
        if (!ts.isImportSpecifier(decl)) {
            return null;
        }
        var moduleSpecifier = decl.parent.parent.parent.moduleSpecifier;
        if (!ts.isStringLiteral(moduleSpecifier)) {
            return null;
        }
        return reflector.tryFindDeclaration(moduleSpecifier.text, id.text, containingFile);
    }
    var StripDecoratorsMetadataTransformer = /** @class */ (function () {
        function StripDecoratorsMetadataTransformer(coreDecorators, reflector) {
            this.coreDecorators = coreDecorators;
            this.reflector = reflector;
        }
        StripDecoratorsMetadataTransformer.prototype.start = function (sourceFile) {
            var _this = this;
            return function (value, node) {
                if (metadata_1.isClassMetadata(value) && ts.isClassDeclaration(node) && value.decorators) {
                    value.decorators = value.decorators.filter(function (d) {
                        if (metadata_1.isMetadataSymbolicCallExpression(d) &&
                            metadata_1.isMetadataImportedSymbolReferenceExpression(d.expression)) {
                            var declaration = _this.reflector.tryFindDeclaration(d.expression.module, d.expression.name, sourceFile.fileName);
                            if (declaration && _this.coreDecorators.has(declaration)) {
                                return false;
                            }
                        }
                        return true;
                    });
                }
                return value;
            };
        };
        return StripDecoratorsMetadataTransformer;
    }());
    exports.StripDecoratorsMetadataTransformer = StripDecoratorsMetadataTransformer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfc3RyaXBfZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvdHJhbnNmb3JtZXJzL3IzX3N0cmlwX2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFHSCwrQkFBaUM7SUFFakMscUVBQTBJO0lBTzFJLDZDQUNJLGNBQWlDLEVBQUUsU0FBMEIsRUFDN0QsT0FBdUI7UUFDekIsT0FBTyxVQUFTLE9BQWlDO1lBQy9DLE9BQU8sVUFBUyxVQUF5QjtnQkFDdkMsSUFBTSxtQ0FBbUMsR0FDckMsVUFBQyxJQUF5QjtvQkFDeEIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTt3QkFDakMsT0FBTyxJQUFJLENBQUM7cUJBQ2I7b0JBQ0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTO3dCQUNqRCxJQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO3dCQUN0QyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDakMsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQzs0QkFDL0IsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dDQUN2QixJQUFNLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0NBQ2xGLE9BQU8sTUFBTSxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQzdDO3lCQUNGO3dCQUNELE9BQU8sSUFBSSxDQUFDO29CQUNkLENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxJQUFJ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LENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQzt3QkFDMUMsSUFBSSwyQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7NEJBQ25DLHNEQUEyQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDN0QsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FDakQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNqRSxJQUFJLFdBQVcsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQ0FDdkQsT0FBTyxLQUFLLENBQUM7NkJBQ2Q7eUJBQ0Y7d0JBQ0QsT0FBTyxJQUFJLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUM7UUFDSixDQUFDO1FBQ0gseUNBQUM7SUFBRCxDQUFDLEFBckJELElBcUJDO0lBckJZLGdGQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTdGF0aWNSZWZsZWN0b3IsIFN0YXRpY1N5bWJvbH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7TWV0YWRhdGFWYWx1ZSwgaXNDbGFzc01ldGFkYXRhLCBpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uLCBpc01ldGFkYXRhU3ltYm9saWNDYWxsRXhwcmVzc2lvbn0gZnJvbSAnLi4vbWV0YWRhdGEnO1xuXG5pbXBvcnQge01ldGFkYXRhVHJhbnNmb3JtZXIsIFZhbHVlVHJhbnNmb3JtfSBmcm9tICcuL21ldGFkYXRhX2NhY2hlJztcblxuZXhwb3J0IHR5cGUgVHJhbnNmb3JtZXIgPSAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkgPT4gdHMuU291cmNlRmlsZTtcbmV4cG9ydCB0eXBlIFRyYW5zZm9ybWVyRmFjdG9yeSA9IChjb250ZXh0OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQpID0+IFRyYW5zZm9ybWVyO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVjb3JhdG9yU3RyaXBUcmFuc2Zvcm1lckZhY3RvcnkoXG4gICAgY29yZURlY29yYXRvcnM6IFNldDxTdGF0aWNTeW1ib2w+LCByZWZsZWN0b3I6IFN0YXRpY1JlZmxlY3RvcixcbiAgICBjaGVja2VyOiB0cy5UeXBlQ2hlY2tlcik6IFRyYW5zZm9ybWVyRmFjdG9yeSB7XG4gIHJldHVybiBmdW5jdGlvbihjb250ZXh0OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IHRzLlNvdXJjZUZpbGUge1xuICAgICAgY29uc3Qgc3RyaXBEZWNvcmF0b3JzRnJvbUNsYXNzRGVjbGFyYXRpb24gPVxuICAgICAgICAgIChub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uKTogdHMuQ2xhc3NEZWNsYXJhdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5kZWNvcmF0b3JzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkZWNvcmF0b3JzID0gbm9kZS5kZWNvcmF0b3JzLmZpbHRlcihkZWNvcmF0b3IgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsRXhwciA9IGRlY29yYXRvci5leHByZXNzaW9uO1xuICAgICAgICAgICAgICBpZiAodHMuaXNDYWxsRXhwcmVzc2lvbihjYWxsRXhwcikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGNhbGxFeHByLmV4cHJlc3Npb247XG4gICAgICAgICAgICAgICAgaWYgKHRzLmlzSWRlbnRpZmllcihpZCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN5bWJvbCA9IHJlc29sdmVUb1N0YXRpY1N5bWJvbChpZCwgc291cmNlRmlsZS5maWxlTmFtZSwgcmVmbGVjdG9yLCBjaGVja2VyKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzeW1ib2wgJiYgY29yZURlY29yYXRvcnMuaGFzKHN5bWJvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGVjb3JhdG9ycy5sZW5ndGggIT09IG5vZGUuZGVjb3JhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRzLnVwZGF0ZUNsYXNzRGVjbGFyYXRpb24oXG4gICAgICAgICAgICAgICAgICBub2RlLCBkZWNvcmF0b3JzLCBub2RlLm1vZGlmaWVycywgbm9kZS5uYW1lLCBub2RlLnR5cGVQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgbm9kZS5oZXJpdGFnZUNsYXVzZXMgfHwgW10sIG5vZGUubWVtYmVycywgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIH07XG5cbiAgICAgIGNvbnN0IHN0cmlwRGVjb3JhdG9yUHJvcGVydHlBc3NpZ25tZW50ID0gKG5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24pOiB0cy5DbGFzc0RlY2xhcmF0aW9uID0+IHtcbiAgICAgICAgcmV0dXJuIHRzLnZpc2l0RWFjaENoaWxkKG5vZGUsIG1lbWJlciA9PiB7XG4gICAgICAgICAgaWYgKCF0cy5pc1Byb3BlcnR5RGVjbGFyYXRpb24obWVtYmVyKSB8fCAhaXNEZWNvcmF0b3JBc3NpZ25tZW50KG1lbWJlcikgfHxcbiAgICAgICAgICAgICAgIW1lbWJlci5pbml0aWFsaXplciB8fCAhdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKG1lbWJlci5pbml0aWFsaXplcikpIHtcbiAgICAgICAgICAgIHJldHVybiBtZW1iZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgbmV3SW5pdGlhbGl6ZXIgPSB0cy52aXNpdEVhY2hDaGlsZChtZW1iZXIuaW5pdGlhbGl6ZXIsIGRlY29yYXRvciA9PiB7XG4gICAgICAgICAgICBpZiAoIXRzLmlzT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24oZGVjb3JhdG9yKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGxvb2t1cFByb3BlcnR5KGRlY29yYXRvciwgJ3R5cGUnKTtcbiAgICAgICAgICAgIGlmICghdHlwZSB8fCAhdHMuaXNJZGVudGlmaWVyKHR5cGUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZWNvcmF0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzeW1ib2wgPSByZXNvbHZlVG9TdGF0aWNTeW1ib2wodHlwZSwgc291cmNlRmlsZS5maWxlTmFtZSwgcmVmbGVjdG9yLCBjaGVja2VyKTtcbiAgICAgICAgICAgIGlmICghc3ltYm9sIHx8ICFjb3JlRGVjb3JhdG9ycy5oYXMoc3ltYm9sKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChuZXdJbml0aWFsaXplciA9PT0gbWVtYmVyLmluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVtYmVyO1xuICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5pdGlhbGl6ZXIuZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHMudXBkYXRlUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgbWVtYmVyLCBtZW1iZXIuZGVjb3JhdG9ycywgbWVtYmVyLm1vZGlmaWVycywgbWVtYmVyLm5hbWUsIG1lbWJlci5xdWVzdGlvblRva2VuLFxuICAgICAgICAgICAgICAgIG1lbWJlci50eXBlLCBuZXdJbml0aWFsaXplcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBjb250ZXh0KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0cy52aXNpdEVhY2hDaGlsZChzb3VyY2VGaWxlLCBzdG10ID0+IHtcbiAgICAgICAgaWYgKHRzLmlzQ2xhc3NEZWNsYXJhdGlvbihzdG10KSkge1xuICAgICAgICAgIGxldCBkZWNsID0gc3RtdDtcbiAgICAgICAgICBpZiAoc3RtdC5kZWNvcmF0b3JzKSB7XG4gICAgICAgICAgICBkZWNsID0gc3RyaXBEZWNvcmF0b3JzRnJvbUNsYXNzRGVjbGFyYXRpb24oc3RtdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdHJpcERlY29yYXRvclByb3BlcnR5QXNzaWdubWVudChkZWNsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RtdDtcbiAgICAgIH0sIGNvbnRleHQpO1xuICAgIH07XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzRGVjb3JhdG9yQXNzaWdubWVudChtZW1iZXI6IHRzLkNsYXNzRWxlbWVudCk6IGJvb2xlYW4ge1xuICBpZiAoIXRzLmlzUHJvcGVydHlEZWNsYXJhdGlvbihtZW1iZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICghbWVtYmVyLm1vZGlmaWVycyB8fFxuICAgICAgIW1lbWJlci5tb2RpZmllcnMuc29tZShtb2QgPT4gbW9kLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuU3RhdGljS2V5d29yZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCF0cy5pc0lkZW50aWZpZXIobWVtYmVyLm5hbWUpIHx8IG1lbWJlci5uYW1lLnRleHQgIT09ICdkZWNvcmF0b3JzJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoIW1lbWJlci5pbml0aWFsaXplciB8fCAhdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKG1lbWJlci5pbml0aWFsaXplcikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGxvb2t1cFByb3BlcnR5KGV4cHI6IHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uLCBwcm9wOiBzdHJpbmcpOiB0cy5FeHByZXNzaW9ufHVuZGVmaW5lZCB7XG4gIGNvbnN0IGRlY2wgPSBleHByLnByb3BlcnRpZXMuZmluZChcbiAgICAgIGVsZW0gPT4gISFlbGVtLm5hbWUgJiYgdHMuaXNJZGVudGlmaWVyKGVsZW0ubmFtZSkgJiYgZWxlbS5uYW1lLnRleHQgPT09IHByb3ApO1xuICBpZiAoZGVjbCA9PT0gdW5kZWZpbmVkIHx8ICF0cy5pc1Byb3BlcnR5QXNzaWdubWVudChkZWNsKSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIGRlY2wuaW5pdGlhbGl6ZXI7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVUb1N0YXRpY1N5bWJvbChcbiAgICBpZDogdHMuSWRlbnRpZmllciwgY29udGFpbmluZ0ZpbGU6IHN0cmluZywgcmVmbGVjdG9yOiBTdGF0aWNSZWZsZWN0b3IsXG4gICAgY2hlY2tlcjogdHMuVHlwZUNoZWNrZXIpOiBTdGF0aWNTeW1ib2x8bnVsbCB7XG4gIGNvbnN0IHJlcyA9IGNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihpZCk7XG4gIGlmICghcmVzIHx8ICFyZXMuZGVjbGFyYXRpb25zIHx8IHJlcy5kZWNsYXJhdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgZGVjbCA9IHJlcy5kZWNsYXJhdGlvbnNbMF07XG4gIGlmICghdHMuaXNJbXBvcnRTcGVjaWZpZXIoZGVjbCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBtb2R1bGVTcGVjaWZpZXIgPSBkZWNsLnBhcmVudCAhLnBhcmVudCAhLnBhcmVudCAhLm1vZHVsZVNwZWNpZmllcjtcbiAgaWYgKCF0cy5pc1N0cmluZ0xpdGVyYWwobW9kdWxlU3BlY2lmaWVyKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZWZsZWN0b3IudHJ5RmluZERlY2xhcmF0aW9uKG1vZHVsZVNwZWNpZmllci50ZXh0LCBpZC50ZXh0LCBjb250YWluaW5nRmlsZSk7XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpcERlY29yYXRvcnNNZXRhZGF0YVRyYW5zZm9ybWVyIGltcGxlbWVudHMgTWV0YWRhdGFUcmFuc2Zvcm1lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29yZURlY29yYXRvcnM6IFNldDxTdGF0aWNTeW1ib2w+LCBwcml2YXRlIHJlZmxlY3RvcjogU3RhdGljUmVmbGVjdG9yKSB7fVxuXG4gIHN0YXJ0KHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBWYWx1ZVRyYW5zZm9ybXx1bmRlZmluZWQge1xuICAgIHJldHVybiAodmFsdWU6IE1ldGFkYXRhVmFsdWUsIG5vZGU6IHRzLk5vZGUpOiBNZXRhZGF0YVZhbHVlID0+IHtcbiAgICAgIGlmIChpc0NsYXNzTWV0YWRhdGEodmFsdWUpICYmIHRzLmlzQ2xhc3NEZWNsYXJhdGlvbihub2RlKSAmJiB2YWx1ZS5kZWNvcmF0b3JzKSB7XG4gICAgICAgIHZhbHVlLmRlY29yYXRvcnMgPSB2YWx1ZS5kZWNvcmF0b3JzLmZpbHRlcihkID0+IHtcbiAgICAgICAgICBpZiAoaXNNZXRhZGF0YVN5bWJvbGljQ2FsbEV4cHJlc3Npb24oZCkgJiZcbiAgICAgICAgICAgICAgaXNNZXRhZGF0YUltcG9ydGVkU3ltYm9sUmVmZXJlbmNlRXhwcmVzc2lvbihkLmV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJhdGlvbiA9IHRoaXMucmVmbGVjdG9yLnRyeUZpbmREZWNsYXJhdGlvbihcbiAgICAgICAgICAgICAgICBkLmV4cHJlc3Npb24ubW9kdWxlLCBkLmV4cHJlc3Npb24ubmFtZSwgc291cmNlRmlsZS5maWxlTmFtZSk7XG4gICAgICAgICAgICBpZiAoZGVjbGFyYXRpb24gJiYgdGhpcy5jb3JlRGVjb3JhdG9ycy5oYXMoZGVjbGFyYXRpb24pKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==