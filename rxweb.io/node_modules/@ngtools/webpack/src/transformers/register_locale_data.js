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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJfbG9jYWxlX2RhdGEuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL25ndG9vbHMvd2VicGFjay9zcmMvdHJhbnNmb3JtZXJzL3JlZ2lzdGVyX2xvY2FsZV9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUNBQWlDO0FBQ2pDLCtDQUErRDtBQUMvRCxtREFBbUQ7QUFDbkQsNkNBQXVGO0FBQ3ZGLHFEQUFpRDtBQUdqRCw0QkFDRSxlQUE4QyxFQUM5QyxjQUFnRSxFQUNoRSxNQUFjO0lBR2QsTUFBTSxpQkFBaUIsR0FBc0IsVUFBVSxVQUF5QjtRQUM5RSxNQUFNLEdBQUcsR0FBeUIsRUFBRSxDQUFDO1FBRXJDLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckUsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFFRCwwREFBMEQ7UUFDMUQsTUFBTSxzQkFBc0IsR0FBRyw4QkFBZ0IsQ0FBZ0IsVUFBVSxFQUN2RSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQzthQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRSxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUVELDBCQUEwQjtRQUMxQixzQkFBc0IsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNyRCxtRkFBbUY7WUFDbkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNILHFCQUFxQixDQUFDLE1BQU07bUJBQ3pCLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQ3RFLENBQUMsQ0FBQyxDQUFDO2dCQUNGLE1BQU0sQ0FBQztZQUNULENBQUM7WUFFRCxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxNQUEyQixDQUFDO1lBRW5FLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLFVBQXlDLENBQUM7WUFFMUUsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCO21CQUM3QyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sQ0FBQztZQUNULENBQUM7WUFFRCxNQUFNLFNBQVMsR0FBRywwQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZixNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQseUNBQXlDO1lBQ3pDLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDakUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLGdDQUFnQixDQUMxQixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLDJCQUEyQixNQUFNLEVBQUUsRUFDbkMsU0FBUyxFQUNULElBQUksQ0FDTCxDQUFDLENBQUM7WUFFSCw4REFBOEQ7WUFDOUQsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDaEUsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDOUQsR0FBRyxDQUFDLElBQUksQ0FDTixHQUFHLGdDQUFnQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUNwRixDQUFDO1lBRUYsb0NBQW9DO1lBQ3BDLE1BQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FDeEMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsRUFDdEQsU0FBUyxFQUNULENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQ3hELENBQUM7WUFDRixNQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUUzRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWdCLENBQzNCLFVBQVUsRUFDVixTQUFTLEVBQ1QseUJBQXlCLENBQzFCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUMsQ0FBQztJQUVGLE1BQU0sQ0FBQyw4QkFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDMUMsQ0FBQztBQXpGRCxnREF5RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IGNvbGxlY3REZWVwTm9kZXMsIGdldEZpcnN0Tm9kZSB9IGZyb20gJy4vYXN0X2hlbHBlcnMnO1xuaW1wb3J0IHsgaW5zZXJ0U3RhckltcG9ydCB9IGZyb20gJy4vaW5zZXJ0X2ltcG9ydCc7XG5pbXBvcnQgeyBBZGROb2RlT3BlcmF0aW9uLCBTdGFuZGFyZFRyYW5zZm9ybSwgVHJhbnNmb3JtT3BlcmF0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IG1ha2VUcmFuc2Zvcm0gfSBmcm9tICcuL21ha2VfdHJhbnNmb3JtJztcblxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJMb2NhbGVEYXRhKFxuICBzaG91bGRUcmFuc2Zvcm06IChmaWxlTmFtZTogc3RyaW5nKSA9PiBib29sZWFuLFxuICBnZXRFbnRyeU1vZHVsZTogKCkgPT4geyBwYXRoOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nIH0gfCBudWxsLFxuICBsb2NhbGU6IHN0cmluZyxcbik6IHRzLlRyYW5zZm9ybWVyRmFjdG9yeTx0cy5Tb3VyY2VGaWxlPiB7XG5cbiAgY29uc3Qgc3RhbmRhcmRUcmFuc2Zvcm06IFN0YW5kYXJkVHJhbnNmb3JtID0gZnVuY3Rpb24gKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpIHtcbiAgICBjb25zdCBvcHM6IFRyYW5zZm9ybU9wZXJhdGlvbltdID0gW107XG5cbiAgICBjb25zdCBlbnRyeU1vZHVsZSA9IGdldEVudHJ5TW9kdWxlKCk7XG5cbiAgICBpZiAoIXNob3VsZFRyYW5zZm9ybShzb3VyY2VGaWxlLmZpbGVOYW1lKSB8fCAhZW50cnlNb2R1bGUgfHwgIWxvY2FsZSkge1xuICAgICAgcmV0dXJuIG9wcztcbiAgICB9XG5cbiAgICAvLyBGaW5kIGFsbCBpZGVudGlmaWVycyB1c2luZyB0aGUgZW50cnkgbW9kdWxlIGNsYXNzIG5hbWUuXG4gICAgY29uc3QgZW50cnlNb2R1bGVJZGVudGlmaWVycyA9IGNvbGxlY3REZWVwTm9kZXM8dHMuSWRlbnRpZmllcj4oc291cmNlRmlsZSxcbiAgICAgIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcilcbiAgICAgIC5maWx0ZXIoaWRlbnRpZmllciA9PiBpZGVudGlmaWVyLnRleHQgPT09IGVudHJ5TW9kdWxlLmNsYXNzTmFtZSk7XG5cbiAgICBpZiAoZW50cnlNb2R1bGVJZGVudGlmaWVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBGaW5kIHRoZSBib290c3RyYXAgY2FsbFxuICAgIGVudHJ5TW9kdWxlSWRlbnRpZmllcnMuZm9yRWFjaChlbnRyeU1vZHVsZUlkZW50aWZpZXIgPT4ge1xuICAgICAgLy8gRmlndXJlIG91dCBpZiBpdCdzIGEgYHBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKWAgY2FsbC5cbiAgICAgIGlmICghKFxuICAgICAgICBlbnRyeU1vZHVsZUlkZW50aWZpZXIucGFyZW50XG4gICAgICAgICYmIGVudHJ5TW9kdWxlSWRlbnRpZmllci5wYXJlbnQua2luZCA9PT0gdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvblxuICAgICAgKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNhbGxFeHByID0gZW50cnlNb2R1bGVJZGVudGlmaWVyLnBhcmVudCBhcyB0cy5DYWxsRXhwcmVzc2lvbjtcblxuICAgICAgaWYgKGNhbGxFeHByLmV4cHJlc3Npb24ua2luZCAhPT0gdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wQWNjZXNzRXhwciA9IGNhbGxFeHByLmV4cHJlc3Npb24gYXMgdHMuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uO1xuXG4gICAgICBpZiAocHJvcEFjY2Vzc0V4cHIubmFtZS50ZXh0ICE9PSAnYm9vdHN0cmFwTW9kdWxlJ1xuICAgICAgICB8fCBwcm9wQWNjZXNzRXhwci5leHByZXNzaW9uLmtpbmQgIT09IHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaXJzdE5vZGUgPSBnZXRGaXJzdE5vZGUoc291cmNlRmlsZSk7XG5cbiAgICAgIGlmICghZmlyc3ROb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ3JlYXRlIHRoZSBpbXBvcnQgbm9kZSBmb3IgdGhlIGxvY2FsZS5cbiAgICAgIGNvbnN0IGxvY2FsZU5hbWVzcGFjZUlkID0gdHMuY3JlYXRlVW5pcXVlTmFtZSgnX19OZ0NsaV9sb2NhbGVfJyk7XG4gICAgICBvcHMucHVzaCguLi5pbnNlcnRTdGFySW1wb3J0KFxuICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICBsb2NhbGVOYW1lc3BhY2VJZCxcbiAgICAgICAgYEBhbmd1bGFyL2NvbW1vbi9sb2NhbGVzLyR7bG9jYWxlfWAsXG4gICAgICAgIGZpcnN0Tm9kZSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICkpO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIGltcG9ydCBub2RlIGZvciB0aGUgcmVnaXN0ZXJMb2NhbGVEYXRhIGZ1bmN0aW9uLlxuICAgICAgY29uc3QgcmVnSWRlbnRpZmllciA9IHRzLmNyZWF0ZUlkZW50aWZpZXIoYHJlZ2lzdGVyTG9jYWxlRGF0YWApO1xuICAgICAgY29uc3QgcmVnTmFtZXNwYWNlSWQgPSB0cy5jcmVhdGVVbmlxdWVOYW1lKCdfX05nQ2xpX2xvY2FsZV8nKTtcbiAgICAgIG9wcy5wdXNoKFxuICAgICAgICAuLi5pbnNlcnRTdGFySW1wb3J0KHNvdXJjZUZpbGUsIHJlZ05hbWVzcGFjZUlkLCAnQGFuZ3VsYXIvY29tbW9uJywgZmlyc3ROb2RlLCB0cnVlKSxcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgcmVnaXN0ZXIgZnVuY3Rpb24gY2FsbFxuICAgICAgY29uc3QgcmVnaXN0ZXJGdW5jdGlvbkNhbGwgPSB0cy5jcmVhdGVDYWxsKFxuICAgICAgICB0cy5jcmVhdGVQcm9wZXJ0eUFjY2VzcyhyZWdOYW1lc3BhY2VJZCwgcmVnSWRlbnRpZmllciksXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgW3RzLmNyZWF0ZVByb3BlcnR5QWNjZXNzKGxvY2FsZU5hbWVzcGFjZUlkLCAnZGVmYXVsdCcpXSxcbiAgICAgICk7XG4gICAgICBjb25zdCByZWdpc3RlckZ1bmN0aW9uU3RhdGVtZW50ID0gdHMuY3JlYXRlU3RhdGVtZW50KHJlZ2lzdGVyRnVuY3Rpb25DYWxsKTtcblxuICAgICAgb3BzLnB1c2gobmV3IEFkZE5vZGVPcGVyYXRpb24oXG4gICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgIGZpcnN0Tm9kZSxcbiAgICAgICAgcmVnaXN0ZXJGdW5jdGlvblN0YXRlbWVudCxcbiAgICAgICkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wcztcbiAgfTtcblxuICByZXR1cm4gbWFrZVRyYW5zZm9ybShzdGFuZGFyZFRyYW5zZm9ybSk7XG59XG4iXX0=