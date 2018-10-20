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
const ast_helpers_1 = require("./ast_helpers");
const interfaces_1 = require("./interfaces");
const make_transform_1 = require("./make_transform");
function replaceResources(shouldTransform) {
    const standardTransform = function (sourceFile) {
        const ops = [];
        if (!shouldTransform(sourceFile.fileName)) {
            return ops;
        }
        const replacements = findResources(sourceFile);
        if (replacements.length > 0) {
            // Add the replacement operations.
            ops.push(...(replacements.map((rep) => rep.replaceNodeOperation)));
            // If we added a require call, we need to also add typings for it.
            // The typings need to be compatible with node typings, but also work by themselves.
            // interface NodeRequire {(id: string): any;}
            const nodeRequireInterface = ts.createInterfaceDeclaration([], [], 'NodeRequire', [], [], [
                ts.createCallSignature([], [
                    ts.createParameter([], [], undefined, 'id', undefined, ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)),
                ], ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)),
            ]);
            // declare var require: NodeRequire;
            const varRequire = ts.createVariableStatement([ts.createToken(ts.SyntaxKind.DeclareKeyword)], [ts.createVariableDeclaration('require', ts.createTypeReferenceNode('NodeRequire', []))]);
            ops.push(new interfaces_1.AddNodeOperation(sourceFile, ast_helpers_1.getFirstNode(sourceFile), nodeRequireInterface));
            ops.push(new interfaces_1.AddNodeOperation(sourceFile, ast_helpers_1.getFirstNode(sourceFile), varRequire));
        }
        return ops;
    };
    return make_transform_1.makeTransform(standardTransform);
}
exports.replaceResources = replaceResources;
function findResources(sourceFile) {
    const replacements = [];
    // Find all object literals.
    ast_helpers_1.collectDeepNodes(sourceFile, ts.SyntaxKind.ObjectLiteralExpression)
        // Get all their property assignments.
        .map(node => ast_helpers_1.collectDeepNodes(node, ts.SyntaxKind.PropertyAssignment))
        // Flatten into a single array (from an array of array<property assignments>).
        .reduce((prev, curr) => curr ? prev.concat(curr) : prev, [])
        // We only want property assignments for the templateUrl/styleUrls keys.
        .filter((node) => {
        const key = _getContentOfKeyLiteral(node.name);
        if (!key) {
            // key is an expression, can't do anything.
            return false;
        }
        return key == 'templateUrl' || key == 'styleUrls';
    })
        // Replace templateUrl/styleUrls key with template/styles, and and paths with require('path').
        .forEach((node) => {
        const key = _getContentOfKeyLiteral(node.name);
        if (key == 'templateUrl') {
            const resourcePath = _getResourceRequest(node.initializer, sourceFile);
            const requireCall = _createRequireCall(resourcePath);
            const propAssign = ts.createPropertyAssignment('template', requireCall);
            replacements.push({
                resourcePaths: [resourcePath],
                replaceNodeOperation: new interfaces_1.ReplaceNodeOperation(sourceFile, node, propAssign),
            });
        }
        else if (key == 'styleUrls') {
            const arr = ast_helpers_1.collectDeepNodes(node, ts.SyntaxKind.ArrayLiteralExpression);
            if (!arr || arr.length == 0 || arr[0].elements.length == 0) {
                return;
            }
            const stylePaths = arr[0].elements.map((element) => {
                return _getResourceRequest(element, sourceFile);
            });
            const requireArray = ts.createArrayLiteral(stylePaths.map((path) => _createRequireCall(path)));
            const propAssign = ts.createPropertyAssignment('styles', requireArray);
            replacements.push({
                resourcePaths: stylePaths,
                replaceNodeOperation: new interfaces_1.ReplaceNodeOperation(sourceFile, node, propAssign),
            });
        }
    });
    return replacements;
}
exports.findResources = findResources;
function _getContentOfKeyLiteral(node) {
    if (!node) {
        return null;
    }
    else if (node.kind == ts.SyntaxKind.Identifier) {
        return node.text;
    }
    else if (node.kind == ts.SyntaxKind.StringLiteral) {
        return node.text;
    }
    else {
        return null;
    }
}
function _getResourceRequest(element, sourceFile) {
    if (element.kind === ts.SyntaxKind.StringLiteral ||
        element.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
        const url = element.text;
        // If the URL does not start with ./ or ../, prepends ./ to it.
        return `${/^\.?\.\//.test(url) ? '' : './'}${url}`;
    }
    else {
        // if not string, just use expression directly
        return element.getFullText(sourceFile);
    }
}
function _createRequireCall(path) {
    return ts.createCall(ts.createIdentifier('require'), [], [ts.createLiteral(path)]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZV9yZXNvdXJjZXMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL25ndG9vbHMvd2VicGFjay9zcmMvdHJhbnNmb3JtZXJzL3JlcGxhY2VfcmVzb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUNBQWlDO0FBQ2pDLCtDQUErRDtBQUMvRCw2Q0FLc0I7QUFDdEIscURBQWlEO0FBR2pELDBCQUNFLGVBQThDO0lBRTlDLE1BQU0saUJBQWlCLEdBQXNCLFVBQVUsVUFBeUI7UUFDOUUsTUFBTSxHQUFHLEdBQXlCLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QyxPQUFPLEdBQUcsQ0FBQztTQUNaO1FBRUQsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRS9DLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFM0Isa0NBQWtDO1lBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRSxrRUFBa0U7WUFDbEUsb0ZBQW9GO1lBRXBGLDZDQUE2QztZQUM3QyxNQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUN4RixFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFO29CQUN6QixFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQ25ELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFD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LENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtRQUNuRCxPQUFRLElBQXlCLENBQUMsSUFBSSxDQUFDO0tBQ3hDO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQUVELDZCQUE2QixPQUFzQixFQUFFLFVBQXlCO0lBQzVFLElBQ0UsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWE7UUFDNUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLDZCQUE2QixFQUM1RDtRQUNBLE1BQU0sR0FBRyxHQUFJLE9BQTRCLENBQUMsSUFBSSxDQUFDO1FBRS9DLCtEQUErRDtRQUMvRCxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7S0FDcEQ7U0FBTTtRQUNMLDhDQUE4QztRQUM5QyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEM7QUFDSCxDQUFDO0FBRUQsNEJBQTRCLElBQVk7SUFDdEMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUNsQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQzlCLEVBQUUsRUFDRixDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDekIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IGNvbGxlY3REZWVwTm9kZXMsIGdldEZpcnN0Tm9kZSB9IGZyb20gJy4vYXN0X2hlbHBlcnMnO1xuaW1wb3J0IHtcbiAgQWRkTm9kZU9wZXJhdGlvbixcbiAgUmVwbGFjZU5vZGVPcGVyYXRpb24sXG4gIFN0YW5kYXJkVHJhbnNmb3JtLFxuICBUcmFuc2Zvcm1PcGVyYXRpb24sXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBtYWtlVHJhbnNmb3JtIH0gZnJvbSAnLi9tYWtlX3RyYW5zZm9ybSc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VSZXNvdXJjZXMoXG4gIHNob3VsZFRyYW5zZm9ybTogKGZpbGVOYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4sXG4pOiB0cy5UcmFuc2Zvcm1lckZhY3Rvcnk8dHMuU291cmNlRmlsZT4ge1xuICBjb25zdCBzdGFuZGFyZFRyYW5zZm9ybTogU3RhbmRhcmRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICAgIGNvbnN0IG9wczogVHJhbnNmb3JtT3BlcmF0aW9uW10gPSBbXTtcblxuICAgIGlmICghc2hvdWxkVHJhbnNmb3JtKHNvdXJjZUZpbGUuZmlsZU5hbWUpKSB7XG4gICAgICByZXR1cm4gb3BzO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcGxhY2VtZW50cyA9IGZpbmRSZXNvdXJjZXMoc291cmNlRmlsZSk7XG5cbiAgICBpZiAocmVwbGFjZW1lbnRzLmxlbmd0aCA+IDApIHtcblxuICAgICAgLy8gQWRkIHRoZSByZXBsYWNlbWVudCBvcGVyYXRpb25zLlxuICAgICAgb3BzLnB1c2goLi4uKHJlcGxhY2VtZW50cy5tYXAoKHJlcCkgPT4gcmVwLnJlcGxhY2VOb2RlT3BlcmF0aW9uKSkpO1xuXG4gICAgICAvLyBJZiB3ZSBhZGRlZCBhIHJlcXVpcmUgY2FsbCwgd2UgbmVlZCB0byBhbHNvIGFkZCB0eXBpbmdzIGZvciBpdC5cbiAgICAgIC8vIFRoZSB0eXBpbmdzIG5lZWQgdG8gYmUgY29tcGF0aWJsZSB3aXRoIG5vZGUgdHlwaW5ncywgYnV0IGFsc28gd29yayBieSB0aGVtc2VsdmVzLlxuXG4gICAgICAvLyBpbnRlcmZhY2UgTm9kZVJlcXVpcmUgeyhpZDogc3RyaW5nKTogYW55O31cbiAgICAgIGNvbnN0IG5vZGVSZXF1aXJlSW50ZXJmYWNlID0gdHMuY3JlYXRlSW50ZXJmYWNlRGVjbGFyYXRpb24oW10sIFtdLCAnTm9kZVJlcXVpcmUnLCBbXSwgW10sIFtcbiAgICAgICAgdHMuY3JlYXRlQ2FsbFNpZ25hdHVyZShbXSwgW1xuICAgICAgICAgIHRzLmNyZWF0ZVBhcmFtZXRlcihbXSwgW10sIHVuZGVmaW5lZCwgJ2lkJywgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHMuY3JlYXRlS2V5d29yZFR5cGVOb2RlKHRzLlN5bnRheEtpbmQuU3RyaW5nS2V5d29yZCksXG4gICAgICAgICAgKSxcbiAgICAgICAgXSwgdHMuY3JlYXRlS2V5d29yZFR5cGVOb2RlKHRzLlN5bnRheEtpbmQuQW55S2V5d29yZCkpLFxuICAgICAgXSk7XG5cbiAgICAgIC8vIGRlY2xhcmUgdmFyIHJlcXVpcmU6IE5vZGVSZXF1aXJlO1xuICAgICAgY29uc3QgdmFyUmVxdWlyZSA9IHRzLmNyZWF0ZVZhcmlhYmxlU3RhdGVtZW50KFxuICAgICAgICBbdHMuY3JlYXRlVG9rZW4odHMuU3ludGF4S2luZC5EZWNsYXJlS2V5d29yZCldLFxuICAgICAgICBbdHMuY3JlYXRlVmFyaWFibGVEZWNsYXJhdGlvbigncmVxdWlyZScsIHRzLmNyZWF0ZVR5cGVSZWZlcmVuY2VOb2RlKCdOb2RlUmVxdWlyZScsIFtdKSldLFxuICAgICAgKTtcblxuICAgICAgb3BzLnB1c2gobmV3IEFkZE5vZGVPcGVyYXRpb24oc291cmNlRmlsZSwgZ2V0Rmlyc3ROb2RlKHNvdXJjZUZpbGUpLCBub2RlUmVxdWlyZUludGVyZmFjZSkpO1xuICAgICAgb3BzLnB1c2gobmV3IEFkZE5vZGVPcGVyYXRpb24oc291cmNlRmlsZSwgZ2V0Rmlyc3ROb2RlKHNvdXJjZUZpbGUpLCB2YXJSZXF1aXJlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wcztcbiAgfTtcblxuICByZXR1cm4gbWFrZVRyYW5zZm9ybShzdGFuZGFyZFRyYW5zZm9ybSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb3VyY2VSZXBsYWNlbWVudCB7XG4gIHJlc291cmNlUGF0aHM6IHN0cmluZ1tdO1xuICByZXBsYWNlTm9kZU9wZXJhdGlvbjogUmVwbGFjZU5vZGVPcGVyYXRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUmVzb3VyY2VzKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBSZXNvdXJjZVJlcGxhY2VtZW50W10ge1xuICBjb25zdCByZXBsYWNlbWVudHM6IFJlc291cmNlUmVwbGFjZW1lbnRbXSA9IFtdO1xuXG4gIC8vIEZpbmQgYWxsIG9iamVjdCBsaXRlcmFscy5cbiAgY29sbGVjdERlZXBOb2Rlczx0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbj4oc291cmNlRmlsZSwgdHMuU3ludGF4S2luZC5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbilcbiAgICAvLyBHZXQgYWxsIHRoZWlyIHByb3BlcnR5IGFzc2lnbm1lbnRzLlxuICAgIC5tYXAobm9kZSA9PiBjb2xsZWN0RGVlcE5vZGVzPHRzLlByb3BlcnR5QXNzaWdubWVudD4obm9kZSwgdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFzc2lnbm1lbnQpKVxuICAgIC8vIEZsYXR0ZW4gaW50byBhIHNpbmdsZSBhcnJheSAoZnJvbSBhbiBhcnJheSBvZiBhcnJheTxwcm9wZXJ0eSBhc3NpZ25tZW50cz4pLlxuICAgIC5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IGN1cnIgPyBwcmV2LmNvbmNhdChjdXJyKSA6IHByZXYsIFtdKVxuICAgIC8vIFdlIG9ubHkgd2FudCBwcm9wZXJ0eSBhc3NpZ25tZW50cyBmb3IgdGhlIHRlbXBsYXRlVXJsL3N0eWxlVXJscyBrZXlzLlxuICAgIC5maWx0ZXIoKG5vZGU6IHRzLlByb3BlcnR5QXNzaWdubWVudCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gX2dldENvbnRlbnRPZktleUxpdGVyYWwobm9kZS5uYW1lKTtcbiAgICAgIGlmICgha2V5KSB7XG4gICAgICAgIC8vIGtleSBpcyBhbiBleHByZXNzaW9uLCBjYW4ndCBkbyBhbnl0aGluZy5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ga2V5ID09ICd0ZW1wbGF0ZVVybCcgfHwga2V5ID09ICdzdHlsZVVybHMnO1xuICAgIH0pXG4gICAgLy8gUmVwbGFjZSB0ZW1wbGF0ZVVybC9zdHlsZVVybHMga2V5IHdpdGggdGVtcGxhdGUvc3R5bGVzLCBhbmQgYW5kIHBhdGhzIHdpdGggcmVxdWlyZSgncGF0aCcpLlxuICAgIC5mb3JFYWNoKChub2RlOiB0cy5Qcm9wZXJ0eUFzc2lnbm1lbnQpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IF9nZXRDb250ZW50T2ZLZXlMaXRlcmFsKG5vZGUubmFtZSk7XG5cbiAgICAgIGlmIChrZXkgPT0gJ3RlbXBsYXRlVXJsJykge1xuICAgICAgICBjb25zdCByZXNvdXJjZVBhdGggPSBfZ2V0UmVzb3VyY2VSZXF1ZXN0KG5vZGUuaW5pdGlhbGl6ZXIsIHNvdXJjZUZpbGUpO1xuICAgICAgICBjb25zdCByZXF1aXJlQ2FsbCA9IF9jcmVhdGVSZXF1aXJlQ2FsbChyZXNvdXJjZVBhdGgpO1xuICAgICAgICBjb25zdCBwcm9wQXNzaWduID0gdHMuY3JlYXRlUHJvcGVydHlBc3NpZ25tZW50KCd0ZW1wbGF0ZScsIHJlcXVpcmVDYWxsKTtcbiAgICAgICAgcmVwbGFjZW1lbnRzLnB1c2goe1xuICAgICAgICAgIHJlc291cmNlUGF0aHM6IFtyZXNvdXJjZVBhdGhdLFxuICAgICAgICAgIHJlcGxhY2VOb2RlT3BlcmF0aW9uOiBuZXcgUmVwbGFjZU5vZGVPcGVyYXRpb24oc291cmNlRmlsZSwgbm9kZSwgcHJvcEFzc2lnbiksXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT0gJ3N0eWxlVXJscycpIHtcbiAgICAgICAgY29uc3QgYXJyID0gY29sbGVjdERlZXBOb2Rlczx0cy5BcnJheUxpdGVyYWxFeHByZXNzaW9uPihub2RlLFxuICAgICAgICAgIHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbik7XG4gICAgICAgIGlmICghYXJyIHx8IGFyci5sZW5ndGggPT0gMCB8fCBhcnJbMF0uZWxlbWVudHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdHlsZVBhdGhzID0gYXJyWzBdLmVsZW1lbnRzLm1hcCgoZWxlbWVudDogdHMuRXhwcmVzc2lvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBfZ2V0UmVzb3VyY2VSZXF1ZXN0KGVsZW1lbnQsIHNvdXJjZUZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXF1aXJlQXJyYXkgPSB0cy5jcmVhdGVBcnJheUxpdGVyYWwoXG4gICAgICAgICAgc3R5bGVQYXRocy5tYXAoKHBhdGgpID0+IF9jcmVhdGVSZXF1aXJlQ2FsbChwYXRoKSksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcHJvcEFzc2lnbiA9IHRzLmNyZWF0ZVByb3BlcnR5QXNzaWdubWVudCgnc3R5bGVzJywgcmVxdWlyZUFycmF5KTtcbiAgICAgICAgcmVwbGFjZW1lbnRzLnB1c2goe1xuICAgICAgICAgIHJlc291cmNlUGF0aHM6IHN0eWxlUGF0aHMsXG4gICAgICAgICAgcmVwbGFjZU5vZGVPcGVyYXRpb246IG5ldyBSZXBsYWNlTm9kZU9wZXJhdGlvbihzb3VyY2VGaWxlLCBub2RlLCBwcm9wQXNzaWduKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIHJlcGxhY2VtZW50cztcblxufVxuXG5mdW5jdGlvbiBfZ2V0Q29udGVudE9mS2V5TGl0ZXJhbChub2RlPzogdHMuTm9kZSk6IHN0cmluZyB8IG51bGwge1xuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIChub2RlIGFzIHRzLklkZW50aWZpZXIpLnRleHQ7XG4gIH0gZWxzZSBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbCkge1xuICAgIHJldHVybiAobm9kZSBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRSZXNvdXJjZVJlcXVlc3QoZWxlbWVudDogdHMuRXhwcmVzc2lvbiwgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICBpZiAoXG4gICAgZWxlbWVudC5raW5kID09PSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWwgfHxcbiAgICBlbGVtZW50LmtpbmQgPT09IHRzLlN5bnRheEtpbmQuTm9TdWJzdGl0dXRpb25UZW1wbGF0ZUxpdGVyYWxcbiAgKSB7XG4gICAgY29uc3QgdXJsID0gKGVsZW1lbnQgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dDtcblxuICAgIC8vIElmIHRoZSBVUkwgZG9lcyBub3Qgc3RhcnQgd2l0aCAuLyBvciAuLi8sIHByZXBlbmRzIC4vIHRvIGl0LlxuICAgIHJldHVybiBgJHsvXlxcLj9cXC5cXC8vLnRlc3QodXJsKSA/ICcnIDogJy4vJ30ke3VybH1gO1xuICB9IGVsc2Uge1xuICAgIC8vIGlmIG5vdCBzdHJpbmcsIGp1c3QgdXNlIGV4cHJlc3Npb24gZGlyZWN0bHlcbiAgICByZXR1cm4gZWxlbWVudC5nZXRGdWxsVGV4dChzb3VyY2VGaWxlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlUmVxdWlyZUNhbGwocGF0aDogc3RyaW5nKSB7XG4gIHJldHVybiB0cy5jcmVhdGVDYWxsKFxuICAgIHRzLmNyZWF0ZUlkZW50aWZpZXIoJ3JlcXVpcmUnKSxcbiAgICBbXSxcbiAgICBbdHMuY3JlYXRlTGl0ZXJhbChwYXRoKV0sXG4gICk7XG59XG4iXX0=