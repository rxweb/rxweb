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
const interfaces_1 = require("./interfaces");
// Remove imports for which all identifiers have been removed.
// Needs type checker, and works even if it's not the first transformer.
// Works by removing imports for symbols whose identifiers have all been removed.
// Doesn't use the `symbol.declarations` because that previous transforms might have removed nodes
// but the type checker doesn't know.
// See https://github.com/Microsoft/TypeScript/issues/17552 for more information.
function elideImports(sourceFile, removedNodes, getTypeChecker) {
    const ops = [];
    if (removedNodes.length === 0) {
        return [];
    }
    const typeChecker = getTypeChecker();
    // Collect all imports and used identifiers
    const specialCaseNames = new Set();
    const usedSymbols = new Set();
    const imports = [];
    ts.forEachChild(sourceFile, function visit(node) {
        // Skip removed nodes
        if (removedNodes.includes(node)) {
            return;
        }
        // Record import and skip
        if (ts.isImportDeclaration(node)) {
            imports.push(node);
            return;
        }
        if (ts.isIdentifier(node)) {
            const symbol = typeChecker.getSymbolAtLocation(node);
            if (symbol) {
                usedSymbols.add(symbol);
            }
        }
        else if (ts.isExportSpecifier(node)) {
            // Export specifiers return the non-local symbol from the above
            // so check the name string instead
            specialCaseNames.add((node.propertyName || node.name).text);
            return;
        }
        else if (ts.isShorthandPropertyAssignment(node)) {
            // Shorthand property assignments return the object property's symbol not the import's
            specialCaseNames.add(node.name.text);
        }
        ts.forEachChild(node, visit);
    });
    if (imports.length === 0) {
        return [];
    }
    const isUnused = (node) => {
        if (specialCaseNames.has(node.text)) {
            return false;
        }
        const symbol = typeChecker.getSymbolAtLocation(node);
        return symbol && !usedSymbols.has(symbol);
    };
    for (const node of imports) {
        if (!node.importClause) {
            // "import 'abc';"
            continue;
        }
        if (node.importClause.name) {
            // "import XYZ from 'abc';"
            if (isUnused(node.importClause.name)) {
                ops.push(new interfaces_1.RemoveNodeOperation(sourceFile, node));
            }
        }
        else if (node.importClause.namedBindings
            && ts.isNamespaceImport(node.importClause.namedBindings)) {
            // "import * as XYZ from 'abc';"
            if (isUnused(node.importClause.namedBindings.name)) {
                ops.push(new interfaces_1.RemoveNodeOperation(sourceFile, node));
            }
        }
        else if (node.importClause.namedBindings
            && ts.isNamedImports(node.importClause.namedBindings)) {
            // "import { XYZ, ... } from 'abc';"
            const specifierOps = [];
            for (const specifier of node.importClause.namedBindings.elements) {
                if (isUnused(specifier.propertyName || specifier.name)) {
                    specifierOps.push(new interfaces_1.RemoveNodeOperation(sourceFile, specifier));
                }
            }
            if (specifierOps.length === node.importClause.namedBindings.elements.length) {
                ops.push(new interfaces_1.RemoveNodeOperation(sourceFile, node));
            }
            else {
                ops.push(...specifierOps);
            }
        }
    }
    return ops;
}
exports.elideImports = elideImports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxpZGVfaW1wb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvbmd0b29scy93ZWJwYWNrL3NyYy90cmFuc2Zvcm1lcnMvZWxpZGVfaW1wb3J0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILGlDQUFpQztBQUNqQyw2Q0FBdUU7QUFHdkUsOERBQThEO0FBQzlELHdFQUF3RTtBQUN4RSxpRkFBaUY7QUFDakYsa0dBQWtHO0FBQ2xHLHFDQUFxQztBQUNyQyxpRkFBaUY7QUFDakYsc0JBQ0UsVUFBeUIsRUFDekIsWUFBdUIsRUFDdkIsY0FBb0M7SUFFcEMsTUFBTSxHQUFHLEdBQXlCLEVBQUUsQ0FBQztJQUVyQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxNQUFNLFdBQVcsR0FBRyxjQUFjLEVBQUUsQ0FBQztJQUVyQywyQ0FBMkM7SUFDM0MsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO0lBQzNDLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUFhLENBQUM7SUFDekMsTUFBTSxPQUFPLEdBQUcsRUFBNEIsQ0FBQztJQUM3QyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxlQUFlLElBQUk7UUFDN0MscUJBQXFCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCx5QkFBeUI7UUFDekIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRW5CLE1BQU0sQ0FBQztRQUNU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SUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYTtlQUM1QixFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLG9DQUFvQztZQUNwQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDeEIsR0FBRyxDQUFDLENBQUMsTUFBTSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDakUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkQsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLGdDQUFtQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDO1lBQ0gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxnQ0FBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDO0FBbkdELG9DQW1HQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUmVtb3ZlTm9kZU9wZXJhdGlvbiwgVHJhbnNmb3JtT3BlcmF0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuXG4vLyBSZW1vdmUgaW1wb3J0cyBmb3Igd2hpY2ggYWxsIGlkZW50aWZpZXJzIGhhdmUgYmVlbiByZW1vdmVkLlxuLy8gTmVlZHMgdHlwZSBjaGVja2VyLCBhbmQgd29ya3MgZXZlbiBpZiBpdCdzIG5vdCB0aGUgZmlyc3QgdHJhbnNmb3JtZXIuXG4vLyBXb3JrcyBieSByZW1vdmluZyBpbXBvcnRzIGZvciBzeW1ib2xzIHdob3NlIGlkZW50aWZpZXJzIGhhdmUgYWxsIGJlZW4gcmVtb3ZlZC5cbi8vIERvZXNuJ3QgdXNlIHRoZSBgc3ltYm9sLmRlY2xhcmF0aW9uc2AgYmVjYXVzZSB0aGF0IHByZXZpb3VzIHRyYW5zZm9ybXMgbWlnaHQgaGF2ZSByZW1vdmVkIG5vZGVzXG4vLyBidXQgdGhlIHR5cGUgY2hlY2tlciBkb2Vzbid0IGtub3cuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNzU1MiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbmV4cG9ydCBmdW5jdGlvbiBlbGlkZUltcG9ydHMoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIHJlbW92ZWROb2RlczogdHMuTm9kZVtdLFxuICBnZXRUeXBlQ2hlY2tlcjogKCkgPT4gdHMuVHlwZUNoZWNrZXIsXG4pOiBUcmFuc2Zvcm1PcGVyYXRpb25bXSB7XG4gIGNvbnN0IG9wczogVHJhbnNmb3JtT3BlcmF0aW9uW10gPSBbXTtcblxuICBpZiAocmVtb3ZlZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHR5cGVDaGVja2VyID0gZ2V0VHlwZUNoZWNrZXIoKTtcblxuICAvLyBDb2xsZWN0IGFsbCBpbXBvcnRzIGFuZCB1c2VkIGlkZW50aWZpZXJzXG4gIGNvbnN0IHNwZWNpYWxDYXNlTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgdXNlZFN5bWJvbHMgPSBuZXcgU2V0PHRzLlN5bWJvbD4oKTtcbiAgY29uc3QgaW1wb3J0cyA9IFtdIGFzIHRzLkltcG9ydERlY2xhcmF0aW9uW107XG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCBmdW5jdGlvbiB2aXNpdChub2RlKSB7XG4gICAgLy8gU2tpcCByZW1vdmVkIG5vZGVzXG4gICAgaWYgKHJlbW92ZWROb2Rlcy5pbmNsdWRlcyhub2RlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlY29yZCBpbXBvcnQgYW5kIHNraXBcbiAgICBpZiAodHMuaXNJbXBvcnREZWNsYXJhdGlvbihub2RlKSkge1xuICAgICAgaW1wb3J0cy5wdXNoKG5vZGUpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRzLmlzSWRlbnRpZmllcihub2RlKSkge1xuICAgICAgY29uc3Qgc3ltYm9sID0gdHlwZUNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihub2RlKTtcbiAgICAgIGlmIChzeW1ib2wpIHtcbiAgICAgICAgdXNlZFN5bWJvbHMuYWRkKHN5bWJvbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0cy5pc0V4cG9ydFNwZWNpZmllcihub2RlKSkge1xuICAgICAgLy8gRXhwb3J0IHNwZWNpZmllcnMgcmV0dXJuIHRoZSBub24tbG9jYWwgc3ltYm9sIGZyb20gdGhlIGFib3ZlXG4gICAgICAvLyBzbyBjaGVjayB0aGUgbmFtZSBzdHJpbmcgaW5zdGVhZFxuICAgICAgc3BlY2lhbENhc2VOYW1lcy5hZGQoKG5vZGUucHJvcGVydHlOYW1lIHx8IG5vZGUubmFtZSkudGV4dCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRzLmlzU2hvcnRoYW5kUHJvcGVydHlBc3NpZ25tZW50KG5vZGUpKSB7XG4gICAgICAvLyBTaG9ydGhhbmQgcHJvcGVydHkgYXNzaWdubWVudHMgcmV0dXJuIHRoZSBvYmplY3QgcHJvcGVydHkncyBzeW1ib2wgbm90IHRoZSBpbXBvcnQnc1xuICAgICAgc3BlY2lhbENhc2VOYW1lcy5hZGQobm9kZS5uYW1lLnRleHQpO1xuICAgIH1cblxuICAgIHRzLmZvckVhY2hDaGlsZChub2RlLCB2aXNpdCk7XG4gIH0pO1xuXG4gIGlmIChpbXBvcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGlzVW51c2VkID0gKG5vZGU6IHRzLklkZW50aWZpZXIpID0+IHtcbiAgICBpZiAoc3BlY2lhbENhc2VOYW1lcy5oYXMobm9kZS50ZXh0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHN5bWJvbCA9IHR5cGVDaGVja2VyLmdldFN5bWJvbEF0TG9jYXRpb24obm9kZSk7XG5cbiAgICByZXR1cm4gc3ltYm9sICYmICF1c2VkU3ltYm9scy5oYXMoc3ltYm9sKTtcbiAgfTtcblxuICBmb3IgKGNvbnN0IG5vZGUgb2YgaW1wb3J0cykge1xuICAgIGlmICghbm9kZS5pbXBvcnRDbGF1c2UpIHtcbiAgICAgIC8vIFwiaW1wb3J0ICdhYmMnO1wiXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5pbXBvcnRDbGF1c2UubmFtZSkge1xuICAgICAgLy8gXCJpbXBvcnQgWFlaIGZyb20gJ2FiYyc7XCJcbiAgICAgIGlmIChpc1VudXNlZChub2RlLmltcG9ydENsYXVzZS5uYW1lKSkge1xuICAgICAgICBvcHMucHVzaChuZXcgUmVtb3ZlTm9kZU9wZXJhdGlvbihzb3VyY2VGaWxlLCBub2RlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzXG4gICAgICAgICAgICAgICAmJiB0cy5pc05hbWVzcGFjZUltcG9ydChub2RlLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzKSkge1xuICAgICAgLy8gXCJpbXBvcnQgKiBhcyBYWVogZnJvbSAnYWJjJztcIlxuICAgICAgaWYgKGlzVW51c2VkKG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3MubmFtZSkpIHtcbiAgICAgICAgb3BzLnB1c2gobmV3IFJlbW92ZU5vZGVPcGVyYXRpb24oc291cmNlRmlsZSwgbm9kZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZS5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5nc1xuICAgICAgICAgICAgICAgJiYgdHMuaXNOYW1lZEltcG9ydHMobm9kZS5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncykpIHtcbiAgICAgIC8vIFwiaW1wb3J0IHsgWFlaLCAuLi4gfSBmcm9tICdhYmMnO1wiXG4gICAgICBjb25zdCBzcGVjaWZpZXJPcHMgPSBbXTtcbiAgICAgIGZvciAoY29uc3Qgc3BlY2lmaWVyIG9mIG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3MuZWxlbWVudHMpIHtcbiAgICAgICAgaWYgKGlzVW51c2VkKHNwZWNpZmllci5wcm9wZXJ0eU5hbWUgfHwgc3BlY2lmaWVyLm5hbWUpKSB7XG4gICAgICAgICAgc3BlY2lmaWVyT3BzLnB1c2gobmV3IFJlbW92ZU5vZGVPcGVyYXRpb24oc291cmNlRmlsZSwgc3BlY2lmaWVyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNwZWNpZmllck9wcy5sZW5ndGggPT09IG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3MuZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIG9wcy5wdXNoKG5ldyBSZW1vdmVOb2RlT3BlcmF0aW9uKHNvdXJjZUZpbGUsIG5vZGUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wcy5wdXNoKC4uLnNwZWNpZmllck9wcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9wcztcbn1cbiJdfQ==