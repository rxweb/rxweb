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
const insert_import_1 = require("./insert_import");
const interfaces_1 = require("./interfaces");
const make_transform_1 = require("./make_transform");
function registerLocaleData(shouldTransform, getEntryModule, locale) {
    const standardTransform = function (sourceFile) {
        const ops = [];
        const entryModule = getEntryModule();
        if (!shouldTransform(sourceFile.fileName) || !entryModule || !locale) {
            return ops;
        }
        // Find all identifiers using the entry module class name.
        const entryModuleIdentifiers = ast_helpers_1.collectDeepNodes(sourceFile, ts.SyntaxKind.Identifier)
            .filter(identifier => identifier.text === entryModule.className);
        if (entryModuleIdentifiers.length === 0) {
            return [];
        }
        // Find the bootstrap call
        entryModuleIdentifiers.forEach(entryModuleIdentifier => {
            // Figure out if it's a `platformBrowserDynamic().bootstrapModule(AppModule)` call.
            if (!(entryModuleIdentifier.parent
                && entryModuleIdentifier.parent.kind === ts.SyntaxKind.CallExpression)) {
                return;
            }
            const callExpr = entryModuleIdentifier.parent;
            if (callExpr.expression.kind !== ts.SyntaxKind.PropertyAccessExpression) {
                return;
            }
            const propAccessExpr = callExpr.expression;
            if (propAccessExpr.name.text !== 'bootstrapModule'
                || propAccessExpr.expression.kind !== ts.SyntaxKind.CallExpression) {
                return;
            }
            const firstNode = ast_helpers_1.getFirstNode(sourceFile);
            if (!firstNode) {
                return;
            }
            // Create the import node for the locale.
            const localeNamespaceId = ts.createUniqueName('__NgCli_locale_');
            ops.push(...insert_import_1.insertStarImport(sourceFile, localeNamespaceId, `@angular/common/locales/${locale}`, firstNode, true));
            // Create the import node for the registerLocaleData function.
            const regIdentifier = ts.createIdentifier(`registerLocaleData`);
            const regNamespaceId = ts.createUniqueName('__NgCli_locale_');
            ops.push(...insert_import_1.insertStarImport(sourceFile, regNamespaceId, '@angular/common', firstNode, true));
            // Create the register function call
            const registerFunctionCall = ts.createCall(ts.createPropertyAccess(regNamespaceId, regIdentifier), undefined, [ts.createPropertyAccess(localeNamespaceId, 'default')]);
            const registerFunctionStatement = ts.createStatement(registerFunctionCall);
            ops.push(new interfaces_1.AddNodeOperation(sourceFile, firstNode, registerFunctionStatement));
        });
        return ops;
    };
    return make_transform_1.makeTransform(standardTransform);
}
exports.registerLocaleData = registerLocaleData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJfbG9jYWxlX2RhdGEuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL25ndG9vbHMvd2VicGFjay9zcmMvdHJhbnNmb3JtZXJzL3JlZ2lzdGVyX2xvY2FsZV9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUNBQWlDO0FBQ2pDLCtDQUErRDtBQUMvRCxtREFBbUQ7QUFDbkQsNkNBQXVGO0FBQ3ZGLHFEQUFpRDtBQUdqRCw0QkFDRSxlQUE4QyxFQUM5QyxjQUFnRSxFQUNoRSxNQUFjO0lBR2QsTUFBTSxpQkFBaUIsR0FBc0IsVUFBVSxVQUF5QjtRQUM5RSxNQUFNLEdBQUcsR0FBeUIsRUFBRSxDQUFDO1FBRXJDLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BFLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCwwREFBMEQ7UUFDMUQsTUFBTSxzQkFBc0IsR0FBRyw4QkFBZ0IsQ0FBZ0IsVUFBVSxFQUN2RSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQzthQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRSxJQUFJLHNCQUFzQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELDBCQUEwQjtRQUMxQixzQkFBc0IsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNyRCxtRkFBbUY7WUFDbkYsSUFBSSxDQUFDLENBQ0gscUJBQXFCLENBQUMsTUFBTTttQkFDekIscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FDdEUsRUFBRTtnQkFDRCxPQUFPO2FBQ1I7WUFFRCxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxNQUEyQixDQUFDO1lBRW5FLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRTtnQkFDdkUsT0FBTzthQUNSO1lBRUQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLFVBQXlDLENBQUM7WUFFMUUsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxpQkFBaUI7bUJBQzdDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO2dCQUNwRSxPQUFPO2FBQ1I7WUFFRCxNQUFNLFNBQVMsR0FBRywwQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2QsT0FBTzthQUNSO1lBRUQseUNBQXlDO1lBQ3pDLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDakUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLGdDQUFnQixDQUMxQixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLDJCQUEyQixNQUFNLEVBQUUsRUFDbkMsU0FBUyxFQUNULElBQUksQ0FDTCxDQUFDLENBQUM7WUFFSCw4REFBOEQ7WUFDOUQsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDaEUsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDOUQsR0FBRyxDQUFDLElBQUksQ0FDTixHQUFHLGdDQUFnQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUNwRixDQUFDO1lBRUYsb0NBQW9DO1lBQ3BDLE1BQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FDeEMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsRUFDdEQsU0FBUyxFQUNULENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQ3hELENBQUM7WUFDRixNQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUUzRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWdCLENBQzNCLFVBQVUsRUFDVixTQUFTLEVBQ1QseUJBQXlCLENBQzFCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUM7SUFFRixPQUFPLDhCQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBekZELGdEQXlGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgY29sbGVjdERlZXBOb2RlcywgZ2V0Rmlyc3ROb2RlIH0gZnJvbSAnLi9hc3RfaGVscGVycyc7XG5pbXBvcnQgeyBpbnNlcnRTdGFySW1wb3J0IH0gZnJvbSAnLi9pbnNlcnRfaW1wb3J0JztcbmltcG9ydCB7IEFkZE5vZGVPcGVyYXRpb24sIFN0YW5kYXJkVHJhbnNmb3JtLCBUcmFuc2Zvcm1PcGVyYXRpb24gfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgbWFrZVRyYW5zZm9ybSB9IGZyb20gJy4vbWFrZV90cmFuc2Zvcm0nO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckxvY2FsZURhdGEoXG4gIHNob3VsZFRyYW5zZm9ybTogKGZpbGVOYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4sXG4gIGdldEVudHJ5TW9kdWxlOiAoKSA9PiB7IHBhdGg6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcgfSB8IG51bGwsXG4gIGxvY2FsZTogc3RyaW5nLFxuKTogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+IHtcblxuICBjb25zdCBzdGFuZGFyZFRyYW5zZm9ybTogU3RhbmRhcmRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICAgIGNvbnN0IG9wczogVHJhbnNmb3JtT3BlcmF0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0IGVudHJ5TW9kdWxlID0gZ2V0RW50cnlNb2R1bGUoKTtcblxuICAgIGlmICghc2hvdWxkVHJhbnNmb3JtKHNvdXJjZUZpbGUuZmlsZU5hbWUpIHx8ICFlbnRyeU1vZHVsZSB8fCAhbG9jYWxlKSB7XG4gICAgICByZXR1cm4gb3BzO1xuICAgIH1cblxuICAgIC8vIEZpbmQgYWxsIGlkZW50aWZpZXJzIHVzaW5nIHRoZSBlbnRyeSBtb2R1bGUgY2xhc3MgbmFtZS5cbiAgICBjb25zdCBlbnRyeU1vZHVsZUlkZW50aWZpZXJzID0gY29sbGVjdERlZXBOb2Rlczx0cy5JZGVudGlmaWVyPihzb3VyY2VGaWxlLFxuICAgICAgdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKVxuICAgICAgLmZpbHRlcihpZGVudGlmaWVyID0+IGlkZW50aWZpZXIudGV4dCA9PT0gZW50cnlNb2R1bGUuY2xhc3NOYW1lKTtcblxuICAgIGlmIChlbnRyeU1vZHVsZUlkZW50aWZpZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIEZpbmQgdGhlIGJvb3RzdHJhcCBjYWxsXG4gICAgZW50cnlNb2R1bGVJZGVudGlmaWVycy5mb3JFYWNoKGVudHJ5TW9kdWxlSWRlbnRpZmllciA9PiB7XG4gICAgICAvLyBGaWd1cmUgb3V0IGlmIGl0J3MgYSBgcGxhdGZvcm1Ccm93c2VyRHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUpYCBjYWxsLlxuICAgICAgaWYgKCEoXG4gICAgICAgIGVudHJ5TW9kdWxlSWRlbnRpZmllci5wYXJlbnRcbiAgICAgICAgJiYgZW50cnlNb2R1bGVJZGVudGlmaWVyLnBhcmVudC5raW5kID09PSB0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uXG4gICAgICApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2FsbEV4cHIgPSBlbnRyeU1vZHVsZUlkZW50aWZpZXIucGFyZW50IGFzIHRzLkNhbGxFeHByZXNzaW9uO1xuXG4gICAgICBpZiAoY2FsbEV4cHIuZXhwcmVzc2lvbi5raW5kICE9PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BBY2Nlc3NFeHByID0gY2FsbEV4cHIuZXhwcmVzc2lvbiBhcyB0cy5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb247XG5cbiAgICAgIGlmIChwcm9wQWNjZXNzRXhwci5uYW1lLnRleHQgIT09ICdib290c3RyYXBNb2R1bGUnXG4gICAgICAgIHx8IHByb3BBY2Nlc3NFeHByLmV4cHJlc3Npb24ua2luZCAhPT0gdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGdldEZpcnN0Tm9kZShzb3VyY2VGaWxlKTtcblxuICAgICAgaWYgKCFmaXJzdE5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgdGhlIGltcG9ydCBub2RlIGZvciB0aGUgbG9jYWxlLlxuICAgICAgY29uc3QgbG9jYWxlTmFtZXNwYWNlSWQgPSB0cy5jcmVhdGVVbmlxdWVOYW1lKCdfX05nQ2xpX2xvY2FsZV8nKTtcbiAgICAgIG9wcy5wdXNoKC4uLmluc2VydFN0YXJJbXBvcnQoXG4gICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgIGxvY2FsZU5hbWVzcGFjZUlkLFxuICAgICAgICBgQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvJHtsb2NhbGV9YCxcbiAgICAgICAgZmlyc3ROb2RlLFxuICAgICAgICB0cnVlLFxuICAgICAgKSk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgaW1wb3J0IG5vZGUgZm9yIHRoZSByZWdpc3RlckxvY2FsZURhdGEgZnVuY3Rpb24uXG4gICAgICBjb25zdCByZWdJZGVudGlmaWVyID0gdHMuY3JlYXRlSWRlbnRpZmllcihgcmVnaXN0ZXJMb2NhbGVEYXRhYCk7XG4gICAgICBjb25zdCByZWdOYW1lc3BhY2VJZCA9IHRzLmNyZWF0ZVVuaXF1ZU5hbWUoJ19fTmdDbGlfbG9jYWxlXycpO1xuICAgICAgb3BzLnB1c2goXG4gICAgICAgIC4uLmluc2VydFN0YXJJbXBvcnQoc291cmNlRmlsZSwgcmVnTmFtZXNwYWNlSWQsICdAYW5ndWxhci9jb21tb24nLCBmaXJzdE5vZGUsIHRydWUpLFxuICAgICAgKTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSByZWdpc3RlciBmdW5jdGlvbiBjYWxsXG4gICAgICBjb25zdCByZWdpc3RlckZ1bmN0aW9uQ2FsbCA9IHRzLmNyZWF0ZUNhbGwoXG4gICAgICAgIHRzLmNyZWF0ZVByb3BlcnR5QWNjZXNzKHJlZ05hbWVzcGFjZUlkLCByZWdJZGVudGlmaWVyKSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBbdHMuY3JlYXRlUHJvcGVydHlBY2Nlc3MobG9jYWxlTmFtZXNwYWNlSWQsICdkZWZhdWx0JyldLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlZ2lzdGVyRnVuY3Rpb25TdGF0ZW1lbnQgPSB0cy5jcmVhdGVTdGF0ZW1lbnQocmVnaXN0ZXJGdW5jdGlvbkNhbGwpO1xuXG4gICAgICBvcHMucHVzaChuZXcgQWRkTm9kZU9wZXJhdGlvbihcbiAgICAgICAgc291cmNlRmlsZSxcbiAgICAgICAgZmlyc3ROb2RlLFxuICAgICAgICByZWdpc3RlckZ1bmN0aW9uU3RhdGVtZW50LFxuICAgICAgKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3BzO1xuICB9O1xuXG4gIHJldHVybiBtYWtlVHJhbnNmb3JtKHN0YW5kYXJkVHJhbnNmb3JtKTtcbn1cbiJdfQ==