"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ts = require("typescript");
const pureFunctionComment = '@__PURE__';
function getPrefixFunctionsTransformer() {
    return (context) => {
        const transformer = (sf) => {
            const topLevelFunctions = findTopLevelFunctions(sf);
            const pureImports = findPureImports(sf);
            const pureImportsComment = `* PURE_IMPORTS_START ${pureImports.join(',')} PURE_IMPORTS_END `;
            const visitor = (node) => {
                // Add the pure imports comment to the first node.
                if (node.parent && node.parent.parent === undefined && node.pos === 0) {
                    const newNode = ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, pureImportsComment, true);
                    // Replace node with modified one.
                    return ts.visitEachChild(newNode, visitor, context);
                }
                // Add pure function comment to top level functions.
                if (topLevelFunctions.has(node)) {
                    const newNode = ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, pureFunctionComment, false);
                    // Replace node with modified one.
                    return ts.visitEachChild(newNode, visitor, context);
                }
                // Otherwise return node as is.
                return ts.visitEachChild(node, visitor, context);
            };
            return ts.visitNode(sf, visitor);
        };
        return transformer;
    };
}
exports.getPrefixFunctionsTransformer = getPrefixFunctionsTransformer;
function findTopLevelFunctions(parentNode) {
    const topLevelFunctions = new Set();
    function cb(node) {
        // Stop recursing into this branch if it's a definition construct.
        // These are function expression, function declaration, class, or arrow function (lambda).
        // The body of these constructs will not execute when loading the module, so we don't
        // need to mark function calls inside them as pure.
        // Class static initializers in ES2015 are an exception we don't cover. They would need similar
        // processing as enums to prevent property setting from causing the class to be retained.
        if (ts.isFunctionDeclaration(node)
            || ts.isFunctionExpression(node)
            || ts.isClassDeclaration(node)
            || ts.isArrowFunction(node)
            || ts.isMethodDeclaration(node)) {
            return;
        }
        let noPureComment = !hasPureComment(node);
        let innerNode = node;
        while (innerNode && ts.isParenthesizedExpression(innerNode)) {
            innerNode = innerNode.expression;
            noPureComment = noPureComment && !hasPureComment(innerNode);
        }
        if (!innerNode) {
            return;
        }
        if (noPureComment) {
            if (ts.isNewExpression(innerNode)) {
                topLevelFunctions.add(node);
            }
            else if (ts.isCallExpression(innerNode)) {
                let expression = innerNode.expression;
                while (expression && ts.isParenthesizedExpression(expression)) {
                    expression = expression.expression;
                }
                if (expression) {
                    if (ts.isFunctionExpression(expression)) {
                        // Skip IIFE's with arguments
                        // This could be improved to check if there are any references to variables
                        if (innerNode.arguments.length === 0) {
                            topLevelFunctions.add(node);
                        }
                    }
                    else {
                        topLevelFunctions.add(node);
                    }
                }
            }
        }
        ts.forEachChild(innerNode, cb);
    }
    ts.forEachChild(parentNode, cb);
    return topLevelFunctions;
}
exports.findTopLevelFunctions = findTopLevelFunctions;
function findPureImports(parentNode) {
    const pureImports = [];
    ts.forEachChild(parentNode, cb);
    function cb(node) {
        if (node.kind === ts.SyntaxKind.ImportDeclaration
            && node.importClause) {
            // Save the path of the import transformed into snake case and remove relative paths.
            const moduleSpecifier = node.moduleSpecifier;
            const pureImport = moduleSpecifier.text
                .replace(/[\/@\-]/g, '_')
                .replace(/^\.+/, '');
            pureImports.push(pureImport);
        }
        ts.forEachChild(node, cb);
    }
    return pureImports;
}
exports.findPureImports = findPureImports;
function hasPureComment(node) {
    if (!node) {
        return false;
    }
    const leadingComment = ts.getSyntheticLeadingComments(node);
    return leadingComment && leadingComment.some((comment) => comment.text === pureFunctionComment);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZml4LWZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfb3B0aW1pemVyL3NyYy90cmFuc2Zvcm1zL3ByZWZpeC1mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCxpQ0FBaUM7QUFHakMsTUFBTSxtQkFBbUIsR0FBRyxXQUFXLENBQUM7QUFFeEM7SUFDRSxNQUFNLENBQUMsQ0FBQyxPQUFpQyxFQUFpQyxFQUFFO1FBQzFFLE1BQU0sV0FBVyxHQUFrQyxDQUFDLEVBQWlCLEVBQUUsRUFBRTtZQUV2RSxNQUFNLGlCQUFpQixHQUFHLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxNQUFNLGtCQUFrQixHQUFHLHdCQUF3QixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztZQUU3RixNQUFNLE9BQU8sR0FBZSxDQUFDLElBQWEsRUFBVyxFQUFFO2dCQUVyRCxrREFBa0Q7Z0JBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEUsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixDQUMzQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFeEUsa0NBQWtDO29CQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUVELG9EQUFvRDtnQkFDcEQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixDQUMzQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFMUUsa0NBQWtDO29CQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUVELCtCQUErQjtnQkFDL0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUM7WUFFRixNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDLENBQUM7QUFDSixDQUFDO0FBckNELHNFQXFDQztBQUVELCtCQUFzQyxVQUFtQjtJQUN2RCxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxFQUFXLENBQUM7SUFFN0MsWUFBWSxJQUFhO1FBQ3ZCLGtFQUFrRTtRQUNsRSwwRkFBMEY7UUFDMUYscUZBQXFGO1FBQ3JGLG1EQUFtRDtRQUNuRCwrRkFBK0Y7UUFDL0YseUZBQXlGO1FBQ3pGLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7ZUFDN0IsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztlQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2VBQzNCLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2VBQ3hCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0QsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELElBQUksYUFBYSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixPQUFPLFNBQVMsSUFBSSxFQUFFLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxTQUFTLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUNqQyxhQUFhLEdBQUcsYUFBYSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxVQUFVLEdBQWtCLFNBQVMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JELE9BQU8sVUFBVSxJQUFJLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUM5RCxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztnQkFDckMsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNmLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hDLDZCQUE2Qjt3QkFDN0IsMkVBQTJFO3dCQUMzRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNyQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzlCLENBQUM7b0JBQ0gsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRWhDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztBQUMzQixDQUFDO0FBMURELHNEQTBEQztBQUVELHlCQUFnQyxVQUFtQjtJQUNqRCxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFDakMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFaEMsWUFBWSxJQUFhO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7ZUFDM0MsSUFBNkIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBRWpELHFGQUFxRjtZQUNyRixNQUFNLGVBQWUsR0FBSSxJQUE2QixDQUFDLGVBQW1DLENBQUM7WUFDM0YsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLElBQUk7aUJBQ3BDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDO2lCQUN4QixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZCLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVELEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFwQkQsMENBb0JDO0FBRUQsd0JBQXdCLElBQWE7SUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUQsTUFBTSxDQUFDLGNBQWMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLENBQUM7QUFDbEcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5cbmNvbnN0IHB1cmVGdW5jdGlvbkNvbW1lbnQgPSAnQF9fUFVSRV9fJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZWZpeEZ1bmN0aW9uc1RyYW5zZm9ybWVyKCk6IHRzLlRyYW5zZm9ybWVyRmFjdG9yeTx0cy5Tb3VyY2VGaWxlPiB7XG4gIHJldHVybiAoY29udGV4dDogdHMuVHJhbnNmb3JtYXRpb25Db250ZXh0KTogdHMuVHJhbnNmb3JtZXI8dHMuU291cmNlRmlsZT4gPT4ge1xuICAgIGNvbnN0IHRyYW5zZm9ybWVyOiB0cy5UcmFuc2Zvcm1lcjx0cy5Tb3VyY2VGaWxlPiA9IChzZjogdHMuU291cmNlRmlsZSkgPT4ge1xuXG4gICAgICBjb25zdCB0b3BMZXZlbEZ1bmN0aW9ucyA9IGZpbmRUb3BMZXZlbEZ1bmN0aW9ucyhzZik7XG4gICAgICBjb25zdCBwdXJlSW1wb3J0cyA9IGZpbmRQdXJlSW1wb3J0cyhzZik7XG4gICAgICBjb25zdCBwdXJlSW1wb3J0c0NvbW1lbnQgPSBgKiBQVVJFX0lNUE9SVFNfU1RBUlQgJHtwdXJlSW1wb3J0cy5qb2luKCcsJyl9IFBVUkVfSU1QT1JUU19FTkQgYDtcblxuICAgICAgY29uc3QgdmlzaXRvcjogdHMuVmlzaXRvciA9IChub2RlOiB0cy5Ob2RlKTogdHMuTm9kZSA9PiB7XG5cbiAgICAgICAgLy8gQWRkIHRoZSBwdXJlIGltcG9ydHMgY29tbWVudCB0byB0aGUgZmlyc3Qgbm9kZS5cbiAgICAgICAgaWYgKG5vZGUucGFyZW50ICYmIG5vZGUucGFyZW50LnBhcmVudCA9PT0gdW5kZWZpbmVkICYmIG5vZGUucG9zID09PSAwKSB7XG4gICAgICAgICAgY29uc3QgbmV3Tm9kZSA9IHRzLmFkZFN5bnRoZXRpY0xlYWRpbmdDb21tZW50KFxuICAgICAgICAgICAgbm9kZSwgdHMuU3ludGF4S2luZC5NdWx0aUxpbmVDb21tZW50VHJpdmlhLCBwdXJlSW1wb3J0c0NvbW1lbnQsIHRydWUpO1xuXG4gICAgICAgICAgLy8gUmVwbGFjZSBub2RlIHdpdGggbW9kaWZpZWQgb25lLlxuICAgICAgICAgIHJldHVybiB0cy52aXNpdEVhY2hDaGlsZChuZXdOb2RlLCB2aXNpdG9yLCBjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBwdXJlIGZ1bmN0aW9uIGNvbW1lbnQgdG8gdG9wIGxldmVsIGZ1bmN0aW9ucy5cbiAgICAgICAgaWYgKHRvcExldmVsRnVuY3Rpb25zLmhhcyhub2RlKSkge1xuICAgICAgICAgIGNvbnN0IG5ld05vZGUgPSB0cy5hZGRTeW50aGV0aWNMZWFkaW5nQ29tbWVudChcbiAgICAgICAgICAgIG5vZGUsIHRzLlN5bnRheEtpbmQuTXVsdGlMaW5lQ29tbWVudFRyaXZpYSwgcHVyZUZ1bmN0aW9uQ29tbWVudCwgZmFsc2UpO1xuXG4gICAgICAgICAgLy8gUmVwbGFjZSBub2RlIHdpdGggbW9kaWZpZWQgb25lLlxuICAgICAgICAgIHJldHVybiB0cy52aXNpdEVhY2hDaGlsZChuZXdOb2RlLCB2aXNpdG9yLCBjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZSByZXR1cm4gbm9kZSBhcyBpcy5cbiAgICAgICAgcmV0dXJuIHRzLnZpc2l0RWFjaENoaWxkKG5vZGUsIHZpc2l0b3IsIGNvbnRleHQpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHRzLnZpc2l0Tm9kZShzZiwgdmlzaXRvcik7XG4gICAgfTtcblxuICAgIHJldHVybiB0cmFuc2Zvcm1lcjtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRUb3BMZXZlbEZ1bmN0aW9ucyhwYXJlbnROb2RlOiB0cy5Ob2RlKTogU2V0PHRzLk5vZGU+IHtcbiAgY29uc3QgdG9wTGV2ZWxGdW5jdGlvbnMgPSBuZXcgU2V0PHRzLk5vZGU+KCk7XG5cbiAgZnVuY3Rpb24gY2Iobm9kZTogdHMuTm9kZSkge1xuICAgIC8vIFN0b3AgcmVjdXJzaW5nIGludG8gdGhpcyBicmFuY2ggaWYgaXQncyBhIGRlZmluaXRpb24gY29uc3RydWN0LlxuICAgIC8vIFRoZXNlIGFyZSBmdW5jdGlvbiBleHByZXNzaW9uLCBmdW5jdGlvbiBkZWNsYXJhdGlvbiwgY2xhc3MsIG9yIGFycm93IGZ1bmN0aW9uIChsYW1iZGEpLlxuICAgIC8vIFRoZSBib2R5IG9mIHRoZXNlIGNvbnN0cnVjdHMgd2lsbCBub3QgZXhlY3V0ZSB3aGVuIGxvYWRpbmcgdGhlIG1vZHVsZSwgc28gd2UgZG9uJ3RcbiAgICAvLyBuZWVkIHRvIG1hcmsgZnVuY3Rpb24gY2FsbHMgaW5zaWRlIHRoZW0gYXMgcHVyZS5cbiAgICAvLyBDbGFzcyBzdGF0aWMgaW5pdGlhbGl6ZXJzIGluIEVTMjAxNSBhcmUgYW4gZXhjZXB0aW9uIHdlIGRvbid0IGNvdmVyLiBUaGV5IHdvdWxkIG5lZWQgc2ltaWxhclxuICAgIC8vIHByb2Nlc3NpbmcgYXMgZW51bXMgdG8gcHJldmVudCBwcm9wZXJ0eSBzZXR0aW5nIGZyb20gY2F1c2luZyB0aGUgY2xhc3MgdG8gYmUgcmV0YWluZWQuXG4gICAgaWYgKHRzLmlzRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlKVxuICAgICAgfHwgdHMuaXNGdW5jdGlvbkV4cHJlc3Npb24obm9kZSlcbiAgICAgIHx8IHRzLmlzQ2xhc3NEZWNsYXJhdGlvbihub2RlKVxuICAgICAgfHwgdHMuaXNBcnJvd0Z1bmN0aW9uKG5vZGUpXG4gICAgICB8fCB0cy5pc01ldGhvZERlY2xhcmF0aW9uKG5vZGUpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG5vUHVyZUNvbW1lbnQgPSAhaGFzUHVyZUNvbW1lbnQobm9kZSk7XG4gICAgbGV0IGlubmVyTm9kZSA9IG5vZGU7XG4gICAgd2hpbGUgKGlubmVyTm9kZSAmJiB0cy5pc1BhcmVudGhlc2l6ZWRFeHByZXNzaW9uKGlubmVyTm9kZSkpIHtcbiAgICAgIGlubmVyTm9kZSA9IGlubmVyTm9kZS5leHByZXNzaW9uO1xuICAgICAgbm9QdXJlQ29tbWVudCA9IG5vUHVyZUNvbW1lbnQgJiYgIWhhc1B1cmVDb21tZW50KGlubmVyTm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKCFpbm5lck5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9QdXJlQ29tbWVudCkge1xuICAgICAgaWYgKHRzLmlzTmV3RXhwcmVzc2lvbihpbm5lck5vZGUpKSB7XG4gICAgICAgIHRvcExldmVsRnVuY3Rpb25zLmFkZChub2RlKTtcbiAgICAgIH0gZWxzZSBpZiAodHMuaXNDYWxsRXhwcmVzc2lvbihpbm5lck5vZGUpKSB7XG4gICAgICAgIGxldCBleHByZXNzaW9uOiB0cy5FeHByZXNzaW9uID0gaW5uZXJOb2RlLmV4cHJlc3Npb247XG4gICAgICAgIHdoaWxlIChleHByZXNzaW9uICYmIHRzLmlzUGFyZW50aGVzaXplZEV4cHJlc3Npb24oZXhwcmVzc2lvbikpIHtcbiAgICAgICAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi5leHByZXNzaW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICAgICAgaWYgKHRzLmlzRnVuY3Rpb25FeHByZXNzaW9uKGV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgICAvLyBTa2lwIElJRkUncyB3aXRoIGFyZ3VtZW50c1xuICAgICAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSBpbXByb3ZlZCB0byBjaGVjayBpZiB0aGVyZSBhcmUgYW55IHJlZmVyZW5jZXMgdG8gdmFyaWFibGVzXG4gICAgICAgICAgICBpZiAoaW5uZXJOb2RlLmFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdG9wTGV2ZWxGdW5jdGlvbnMuYWRkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3BMZXZlbEZ1bmN0aW9ucy5hZGQobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHMuZm9yRWFjaENoaWxkKGlubmVyTm9kZSwgY2IpO1xuICB9XG5cbiAgdHMuZm9yRWFjaENoaWxkKHBhcmVudE5vZGUsIGNiKTtcblxuICByZXR1cm4gdG9wTGV2ZWxGdW5jdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUHVyZUltcG9ydHMocGFyZW50Tm9kZTogdHMuTm9kZSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgcHVyZUltcG9ydHM6IHN0cmluZ1tdID0gW107XG4gIHRzLmZvckVhY2hDaGlsZChwYXJlbnROb2RlLCBjYik7XG5cbiAgZnVuY3Rpb24gY2Iobm9kZTogdHMuTm9kZSkge1xuICAgIGlmIChub2RlLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb25cbiAgICAgICYmIChub2RlIGFzIHRzLkltcG9ydERlY2xhcmF0aW9uKS5pbXBvcnRDbGF1c2UpIHtcblxuICAgICAgLy8gU2F2ZSB0aGUgcGF0aCBvZiB0aGUgaW1wb3J0IHRyYW5zZm9ybWVkIGludG8gc25ha2UgY2FzZSBhbmQgcmVtb3ZlIHJlbGF0aXZlIHBhdGhzLlxuICAgICAgY29uc3QgbW9kdWxlU3BlY2lmaWVyID0gKG5vZGUgYXMgdHMuSW1wb3J0RGVjbGFyYXRpb24pLm1vZHVsZVNwZWNpZmllciBhcyB0cy5TdHJpbmdMaXRlcmFsO1xuICAgICAgY29uc3QgcHVyZUltcG9ydCA9IG1vZHVsZVNwZWNpZmllci50ZXh0XG4gICAgICAgIC5yZXBsYWNlKC9bXFwvQFxcLV0vZywgJ18nKVxuICAgICAgICAucmVwbGFjZSgvXlxcLisvLCAnJyk7XG4gICAgICBwdXJlSW1wb3J0cy5wdXNoKHB1cmVJbXBvcnQpO1xuICAgIH1cblxuICAgIHRzLmZvckVhY2hDaGlsZChub2RlLCBjYik7XG4gIH1cblxuICByZXR1cm4gcHVyZUltcG9ydHM7XG59XG5cbmZ1bmN0aW9uIGhhc1B1cmVDb21tZW50KG5vZGU6IHRzLk5vZGUpIHtcbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGxlYWRpbmdDb21tZW50ID0gdHMuZ2V0U3ludGhldGljTGVhZGluZ0NvbW1lbnRzKG5vZGUpO1xuXG4gIHJldHVybiBsZWFkaW5nQ29tbWVudCAmJiBsZWFkaW5nQ29tbWVudC5zb21lKChjb21tZW50KSA9PiBjb21tZW50LnRleHQgPT09IHB1cmVGdW5jdGlvbkNvbW1lbnQpO1xufVxuIl19