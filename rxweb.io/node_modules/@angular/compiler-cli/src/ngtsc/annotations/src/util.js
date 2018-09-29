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
        define("@angular/compiler-cli/src/ngtsc/annotations/src/util", ["require", "exports", "@angular/compiler", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compiler_1 = require("@angular/compiler");
    var ts = require("typescript");
    function getConstructorDependencies(clazz, reflector, isCore) {
        var useType = [];
        var ctorParams = reflector.getConstructorParameters(clazz) || [];
        ctorParams.forEach(function (param, idx) {
            var tokenExpr = param.type;
            var optional = false, self = false, skipSelf = false, host = false;
            var resolved = compiler_1.R3ResolvedDependencyType.Token;
            (param.decorators || []).filter(function (dec) { return isCore || isAngularCore(dec); }).forEach(function (dec) {
                if (dec.name === 'Inject') {
                    if (dec.args === null || dec.args.length !== 1) {
                        throw new Error("Unexpected number of arguments to @Inject().");
                    }
                    tokenExpr = dec.args[0];
                }
                else if (dec.name === 'Optional') {
                    optional = true;
                }
                else if (dec.name === 'SkipSelf') {
                    skipSelf = true;
                }
                else if (dec.name === 'Self') {
                    self = true;
                }
                else if (dec.name === 'Host') {
                    host = true;
                }
                else if (dec.name === 'Attribute') {
                    if (dec.args === null || dec.args.length !== 1) {
                        throw new Error("Unexpected number of arguments to @Attribute().");
                    }
                    tokenExpr = dec.args[0];
                    resolved = compiler_1.R3ResolvedDependencyType.Attribute;
                }
                else {
                    throw new Error("Unexpected decorator " + dec.name + " on parameter.");
                }
            });
            if (tokenExpr === null) {
                throw new Error("No suitable token for parameter " + (param.name || idx) + " of class " + clazz.name.text);
            }
            if (ts.isIdentifier(tokenExpr)) {
                var importedSymbol = reflector.getImportOfIdentifier(tokenExpr);
                if (importedSymbol !== null && importedSymbol.from === '@angular/core') {
                    switch (importedSymbol.name) {
                        case 'ChangeDetectorRef':
                            resolved = compiler_1.R3ResolvedDependencyType.ChangeDetectorRef;
                            break;
                        case 'ElementRef':
                            resolved = compiler_1.R3ResolvedDependencyType.ElementRef;
                            break;
                        case 'Injector':
                            resolved = compiler_1.R3ResolvedDependencyType.Injector;
                            break;
                        case 'TemplateRef':
                            resolved = compiler_1.R3ResolvedDependencyType.TemplateRef;
                            break;
                        case 'ViewContainerRef':
                            resolved = compiler_1.R3ResolvedDependencyType.ViewContainerRef;
                            break;
                        default:
                        // Leave as a Token or Attribute.
                    }
                }
            }
            var token = new compiler_1.WrappedNodeExpr(tokenExpr);
            useType.push({ token: token, optional: optional, self: self, skipSelf: skipSelf, host: host, resolved: resolved });
        });
        return useType;
    }
    exports.getConstructorDependencies = getConstructorDependencies;
    function referenceToExpression(ref, context) {
        var exp = ref.toExpression(context);
        if (exp === null) {
            throw new Error("Could not refer to " + ts.SyntaxKind[ref.node.kind]);
        }
        return exp;
    }
    exports.referenceToExpression = referenceToExpression;
    function isAngularCore(decorator) {
        return decorator.import !== null && decorator.import.from === '@angular/core';
    }
    exports.isAngularCore = isAngularCore;
    /**
     * Unwrap a `ts.Expression`, removing outer type-casts or parentheses until the expression is in its
     * lowest level form.
     *
     * For example, the expression "(foo as Type)" unwraps to "foo".
     */
    function unwrapExpression(node) {
        while (ts.isAsExpression(node) || ts.isParenthesizedExpression(node)) {
            node = node.expression;
        }
        return node;
    }
    exports.unwrapExpression = unwrapExpression;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvYW5ub3RhdGlvbnMvc3JjL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCw4Q0FBOEc7SUFDOUcsK0JBQWlDO0lBS2pDLG9DQUNJLEtBQTBCLEVBQUUsU0FBeUIsRUFDckQsTUFBZTtRQUNqQixJQUFNLE9BQU8sR0FBMkIsRUFBRSxDQUFDO1FBQzNDLElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO1lBQzVCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDM0IsSUFBSSxRQUFRLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsUUFBUSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ25FLElBQUksUUFBUSxHQUFHLG1DQUF3QixDQUFDLEtBQUssQ0FBQztZQUM5QyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsTUFBTSxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQzlFLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQ3pCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7cUJBQ2pF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LEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBc0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUM7U0FDdkU7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFORCxzREFNQztJQUVELHVCQUE4QixTQUFvQjtRQUNoRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQztJQUNoRixDQUFDO0lBRkQsc0NBRUM7SUFFRDs7Ozs7T0FLRztJQUNILDBCQUFpQyxJQUFtQjtRQUNsRCxPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BFLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBTEQsNENBS0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXhwcmVzc2lvbiwgUjNEZXBlbmRlbmN5TWV0YWRhdGEsIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZSwgV3JhcHBlZE5vZGVFeHByfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtEZWNvcmF0b3IsIFJlZmxlY3Rpb25Ib3N0fSBmcm9tICcuLi8uLi9ob3N0JztcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tICcuLi8uLi9tZXRhZGF0YSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25zdHJ1Y3RvckRlcGVuZGVuY2llcyhcbiAgICBjbGF6ejogdHMuQ2xhc3NEZWNsYXJhdGlvbiwgcmVmbGVjdG9yOiBSZWZsZWN0aW9uSG9zdCxcbiAgICBpc0NvcmU6IGJvb2xlYW4pOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdIHtcbiAgY29uc3QgdXNlVHlwZTogUjNEZXBlbmRlbmN5TWV0YWRhdGFbXSA9IFtdO1xuICBjb25zdCBjdG9yUGFyYW1zID0gcmVmbGVjdG9yLmdldENvbnN0cnVjdG9yUGFyYW1ldGVycyhjbGF6eikgfHwgW107XG4gIGN0b3JQYXJhbXMuZm9yRWFjaCgocGFyYW0sIGlkeCkgPT4ge1xuICAgIGxldCB0b2tlbkV4cHIgPSBwYXJhbS50eXBlO1xuICAgIGxldCBvcHRpb25hbCA9IGZhbHNlLCBzZWxmID0gZmFsc2UsIHNraXBTZWxmID0gZmFsc2UsIGhvc3QgPSBmYWxzZTtcbiAgICBsZXQgcmVzb2x2ZWQgPSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuVG9rZW47XG4gICAgKHBhcmFtLmRlY29yYXRvcnMgfHwgW10pLmZpbHRlcihkZWMgPT4gaXNDb3JlIHx8IGlzQW5ndWxhckNvcmUoZGVjKSkuZm9yRWFjaChkZWMgPT4ge1xuICAgICAgaWYgKGRlYy5uYW1lID09PSAnSW5qZWN0Jykge1xuICAgICAgICBpZiAoZGVjLmFyZ3MgPT09IG51bGwgfHwgZGVjLmFyZ3MubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIG51bWJlciBvZiBhcmd1bWVudHMgdG8gQEluamVjdCgpLmApO1xuICAgICAgICB9XG4gICAgICAgIHRva2VuRXhwciA9IGRlYy5hcmdzWzBdO1xuICAgICAgfSBlbHNlIGlmIChkZWMubmFtZSA9PT0gJ09wdGlvbmFsJykge1xuICAgICAgICBvcHRpb25hbCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGRlYy5uYW1lID09PSAnU2tpcFNlbGYnKSB7XG4gICAgICAgIHNraXBTZWxmID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZGVjLm5hbWUgPT09ICdTZWxmJykge1xuICAgICAgICBzZWxmID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZGVjLm5hbWUgPT09ICdIb3N0Jykge1xuICAgICAgICBob3N0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZGVjLm5hbWUgPT09ICdBdHRyaWJ1dGUnKSB7XG4gICAgICAgIGlmIChkZWMuYXJncyA9PT0gbnVsbCB8fCBkZWMuYXJncy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBAQXR0cmlidXRlKCkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5FeHByID0gZGVjLmFyZ3NbMF07XG4gICAgICAgIHJlc29sdmVkID0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkF0dHJpYnV0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBkZWNvcmF0b3IgJHtkZWMubmFtZX0gb24gcGFyYW1ldGVyLmApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0b2tlbkV4cHIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgTm8gc3VpdGFibGUgdG9rZW4gZm9yIHBhcmFtZXRlciAke3BhcmFtLm5hbWUgfHwgaWR4fSBvZiBjbGFzcyAke2NsYXp6Lm5hbWUhLnRleHR9YCk7XG4gICAgfVxuICAgIGlmICh0cy5pc0lkZW50aWZpZXIodG9rZW5FeHByKSkge1xuICAgICAgY29uc3QgaW1wb3J0ZWRTeW1ib2wgPSByZWZsZWN0b3IuZ2V0SW1wb3J0T2ZJZGVudGlmaWVyKHRva2VuRXhwcik7XG4gICAgICBpZiAoaW1wb3J0ZWRTeW1ib2wgIT09IG51bGwgJiYgaW1wb3J0ZWRTeW1ib2wuZnJvbSA9PT0gJ0Bhbmd1bGFyL2NvcmUnKSB7XG4gICAgICAgIHN3aXRjaCAoaW1wb3J0ZWRTeW1ib2wubmFtZSkge1xuICAgICAgICAgIGNhc2UgJ0NoYW5nZURldGVjdG9yUmVmJzpcbiAgICAgICAgICAgIHJlc29sdmVkID0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkNoYW5nZURldGVjdG9yUmVmO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRWxlbWVudFJlZic6XG4gICAgICAgICAgICByZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5FbGVtZW50UmVmO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnSW5qZWN0b3InOlxuICAgICAgICAgICAgcmVzb2x2ZWQgPSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuSW5qZWN0b3I7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdUZW1wbGF0ZVJlZic6XG4gICAgICAgICAgICByZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5UZW1wbGF0ZVJlZjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1ZpZXdDb250YWluZXJSZWYnOlxuICAgICAgICAgICAgcmVzb2x2ZWQgPSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuVmlld0NvbnRhaW5lclJlZjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBMZWF2ZSBhcyBhIFRva2VuIG9yIEF0dHJpYnV0ZS5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB0b2tlbiA9IG5ldyBXcmFwcGVkTm9kZUV4cHIodG9rZW5FeHByKTtcbiAgICB1c2VUeXBlLnB1c2goe3Rva2VuLCBvcHRpb25hbCwgc2VsZiwgc2tpcFNlbGYsIGhvc3QsIHJlc29sdmVkfSk7XG4gIH0pO1xuICByZXR1cm4gdXNlVHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZmVyZW5jZVRvRXhwcmVzc2lvbihyZWY6IFJlZmVyZW5jZSwgY29udGV4dDogdHMuU291cmNlRmlsZSk6IEV4cHJlc3Npb24ge1xuICBjb25zdCBleHAgPSByZWYudG9FeHByZXNzaW9uKGNvbnRleHQpO1xuICBpZiAoZXhwID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgcmVmZXIgdG8gJHt0cy5TeW50YXhLaW5kW3JlZi5ub2RlLmtpbmRdfWApO1xuICB9XG4gIHJldHVybiBleHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FuZ3VsYXJDb3JlKGRlY29yYXRvcjogRGVjb3JhdG9yKTogYm9vbGVhbiB7XG4gIHJldHVybiBkZWNvcmF0b3IuaW1wb3J0ICE9PSBudWxsICYmIGRlY29yYXRvci5pbXBvcnQuZnJvbSA9PT0gJ0Bhbmd1bGFyL2NvcmUnO1xufVxuXG4vKipcbiAqIFVud3JhcCBhIGB0cy5FeHByZXNzaW9uYCwgcmVtb3Zpbmcgb3V0ZXIgdHlwZS1jYXN0cyBvciBwYXJlbnRoZXNlcyB1bnRpbCB0aGUgZXhwcmVzc2lvbiBpcyBpbiBpdHNcbiAqIGxvd2VzdCBsZXZlbCBmb3JtLlxuICpcbiAqIEZvciBleGFtcGxlLCB0aGUgZXhwcmVzc2lvbiBcIihmb28gYXMgVHlwZSlcIiB1bndyYXBzIHRvIFwiZm9vXCIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBFeHByZXNzaW9uKG5vZGU6IHRzLkV4cHJlc3Npb24pOiB0cy5FeHByZXNzaW9uIHtcbiAgd2hpbGUgKHRzLmlzQXNFeHByZXNzaW9uKG5vZGUpIHx8IHRzLmlzUGFyZW50aGVzaXplZEV4cHJlc3Npb24obm9kZSkpIHtcbiAgICBub2RlID0gbm9kZS5leHByZXNzaW9uO1xuICB9XG4gIHJldHVybiBub2RlO1xufVxuIl19