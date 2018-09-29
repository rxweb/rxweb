"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const path_1 = require("path");
const ts = require("typescript");
const ast_helpers_1 = require("./ast_helpers");
const interfaces_1 = require("./interfaces");
const make_transform_1 = require("./make_transform");
function exportNgFactory(shouldTransform, getEntryModule) {
    const standardTransform = function (sourceFile) {
        const ops = [];
        const entryModule = getEntryModule();
        if (!shouldTransform(sourceFile.fileName) || !entryModule) {
            return ops;
        }
        // Find all identifiers using the entry module class name.
        const entryModuleIdentifiers = ast_helpers_1.collectDeepNodes(sourceFile, ts.SyntaxKind.Identifier)
            .filter(identifier => identifier.text === entryModule.className);
        if (entryModuleIdentifiers.length === 0) {
            return [];
        }
        const relativeEntryModulePath = path_1.relative(path_1.dirname(sourceFile.fileName), entryModule.path);
        const normalizedEntryModulePath = `./${relativeEntryModulePath}`.replace(/\\/g, '/');
        // Get the module path from the import.
        entryModuleIdentifiers.forEach((entryModuleIdentifier) => {
            if (!entryModuleIdentifier.parent
                || entryModuleIdentifier.parent.kind !== ts.SyntaxKind.ExportSpecifier) {
                return;
            }
            const exportSpec = entryModuleIdentifier.parent;
            const moduleSpecifier = exportSpec.parent
                && exportSpec.parent.parent
                && exportSpec.parent.parent.moduleSpecifier;
            if (!moduleSpecifier || moduleSpecifier.kind !== ts.SyntaxKind.StringLiteral) {
                return;
            }
            // Add the transform operations.
            const factoryClassName = entryModule.className + 'NgFactory';
            const factoryModulePath = normalizedEntryModulePath + '.ngfactory';
            const namedExports = ts.createNamedExports([ts.createExportSpecifier(undefined, ts.createIdentifier(factoryClassName))]);
            const newImport = ts.createExportDeclaration(undefined, undefined, namedExports, ts.createLiteral(factoryModulePath));
            const firstNode = ast_helpers_1.getFirstNode(sourceFile);
            if (firstNode) {
                ops.push(new interfaces_1.AddNodeOperation(sourceFile, firstNode, newImport));
            }
        });
        return ops;
    };
    return make_transform_1.makeTransform(standardTransform);
}
exports.exportNgFactory = exportNgFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0X25nZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvbmd0b29scy93ZWJwYWNrL3NyYy90cmFuc2Zvcm1lcnMvZXhwb3J0X25nZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtCQUF5QztBQUN6QyxpQ0FBaUM7QUFDakMsK0NBQStEO0FBQy9ELDZDQUF1RjtBQUN2RixxREFBaUQ7QUFFakQseUJBQ0UsZUFBOEMsRUFDOUMsY0FBZ0U7SUFHaEUsTUFBTSxpQkFBaUIsR0FBc0IsVUFBVSxVQUF5QjtRQUM5RSxNQUFNLEdBQUcsR0FBeUIsRUFBRSxDQUFDO1FBRXJDLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFFRCwwREFBMEQ7UUFDMUQsTUFBTSxzQkFBc0IsR0FBRyw4QkFBZ0IsQ0FBZ0IsVUFBVSxFQUN2RSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQzthQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRSxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUVELE1BQU0sdUJBQXVCLEdBQUcsZUFBUSxDQUFDLGNBQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pGLE1BQU0seUJBQXlCLEdBQUcsS0FBSyx1QkFBdUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFckYsdUNBQXVDO1FBQ3ZDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLHFCQUFxQixFQUFFLEVBQUU7WUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNO21CQUMxQixxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDM0UsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUVELE1BQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDLE1BQTRCLENBQUM7WUFDdEUsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLE1BQU07bUJBQ3BDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTTttQkFDeEIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1lBRTlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxJQUFJLGVBQWUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsZ0NBQWdDO1lBQ2hDLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDN0QsTUFBTSxpQkFBaUIsR0FBRyx5QkFBeUIsR0FBRyxZQUFZLENBQUM7WUFFbkUsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFDNUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUM3RSxFQUFFLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUV2QyxNQUFNLFNBQVMsR0FBRywwQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFnQixDQUMzQixVQUFVLEVBQ1YsU0FBUyxFQUNULFNBQVMsQ0FDVixDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0lBRUYsTUFBTSxDQUFDLDhCQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBakVELDBDQWlFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGRpcm5hbWUsIHJlbGF0aXZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IGNvbGxlY3REZWVwTm9kZXMsIGdldEZpcnN0Tm9kZSB9IGZyb20gJy4vYXN0X2hlbHBlcnMnO1xuaW1wb3J0IHsgQWRkTm9kZU9wZXJhdGlvbiwgU3RhbmRhcmRUcmFuc2Zvcm0sIFRyYW5zZm9ybU9wZXJhdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBtYWtlVHJhbnNmb3JtIH0gZnJvbSAnLi9tYWtlX3RyYW5zZm9ybSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnROZ0ZhY3RvcnkoXG4gIHNob3VsZFRyYW5zZm9ybTogKGZpbGVOYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4sXG4gIGdldEVudHJ5TW9kdWxlOiAoKSA9PiB7IHBhdGg6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcgfSB8IG51bGwsXG4pOiB0cy5UcmFuc2Zvcm1lckZhY3Rvcnk8dHMuU291cmNlRmlsZT4ge1xuXG4gIGNvbnN0IHN0YW5kYXJkVHJhbnNmb3JtOiBTdGFuZGFyZFRyYW5zZm9ybSA9IGZ1bmN0aW9uIChzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKSB7XG4gICAgY29uc3Qgb3BzOiBUcmFuc2Zvcm1PcGVyYXRpb25bXSA9IFtdO1xuXG4gICAgY29uc3QgZW50cnlNb2R1bGUgPSBnZXRFbnRyeU1vZHVsZSgpO1xuXG4gICAgaWYgKCFzaG91bGRUcmFuc2Zvcm0oc291cmNlRmlsZS5maWxlTmFtZSkgfHwgIWVudHJ5TW9kdWxlKSB7XG4gICAgICByZXR1cm4gb3BzO1xuICAgIH1cblxuICAgIC8vIEZpbmQgYWxsIGlkZW50aWZpZXJzIHVzaW5nIHRoZSBlbnRyeSBtb2R1bGUgY2xhc3MgbmFtZS5cbiAgICBjb25zdCBlbnRyeU1vZHVsZUlkZW50aWZpZXJzID0gY29sbGVjdERlZXBOb2Rlczx0cy5JZGVudGlmaWVyPihzb3VyY2VGaWxlLFxuICAgICAgdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKVxuICAgICAgLmZpbHRlcihpZGVudGlmaWVyID0+IGlkZW50aWZpZXIudGV4dCA9PT0gZW50cnlNb2R1bGUuY2xhc3NOYW1lKTtcblxuICAgIGlmIChlbnRyeU1vZHVsZUlkZW50aWZpZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbGF0aXZlRW50cnlNb2R1bGVQYXRoID0gcmVsYXRpdmUoZGlybmFtZShzb3VyY2VGaWxlLmZpbGVOYW1lKSwgZW50cnlNb2R1bGUucGF0aCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEVudHJ5TW9kdWxlUGF0aCA9IGAuLyR7cmVsYXRpdmVFbnRyeU1vZHVsZVBhdGh9YC5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG5cbiAgICAvLyBHZXQgdGhlIG1vZHVsZSBwYXRoIGZyb20gdGhlIGltcG9ydC5cbiAgICBlbnRyeU1vZHVsZUlkZW50aWZpZXJzLmZvckVhY2goKGVudHJ5TW9kdWxlSWRlbnRpZmllcikgPT4ge1xuICAgICAgaWYgKCFlbnRyeU1vZHVsZUlkZW50aWZpZXIucGFyZW50XG4gICAgICAgICAgfHwgZW50cnlNb2R1bGVJZGVudGlmaWVyLnBhcmVudC5raW5kICE9PSB0cy5TeW50YXhLaW5kLkV4cG9ydFNwZWNpZmllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cG9ydFNwZWMgPSBlbnRyeU1vZHVsZUlkZW50aWZpZXIucGFyZW50IGFzIHRzLkV4cG9ydFNwZWNpZmllcjtcbiAgICAgIGNvbnN0IG1vZHVsZVNwZWNpZmllciA9IGV4cG9ydFNwZWMucGFyZW50XG4gICAgICAgICYmIGV4cG9ydFNwZWMucGFyZW50LnBhcmVudFxuICAgICAgICAmJiBleHBvcnRTcGVjLnBhcmVudC5wYXJlbnQubW9kdWxlU3BlY2lmaWVyO1xuXG4gICAgICBpZiAoIW1vZHVsZVNwZWNpZmllciB8fCBtb2R1bGVTcGVjaWZpZXIua2luZCAhPT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHRoZSB0cmFuc2Zvcm0gb3BlcmF0aW9ucy5cbiAgICAgIGNvbnN0IGZhY3RvcnlDbGFzc05hbWUgPSBlbnRyeU1vZHVsZS5jbGFzc05hbWUgKyAnTmdGYWN0b3J5JztcbiAgICAgIGNvbnN0IGZhY3RvcnlNb2R1bGVQYXRoID0gbm9ybWFsaXplZEVudHJ5TW9kdWxlUGF0aCArICcubmdmYWN0b3J5JztcblxuICAgICAgY29uc3QgbmFtZWRFeHBvcnRzID0gdHMuY3JlYXRlTmFtZWRFeHBvcnRzKFt0cy5jcmVhdGVFeHBvcnRTcGVjaWZpZXIodW5kZWZpbmVkLFxuICAgICAgICB0cy5jcmVhdGVJZGVudGlmaWVyKGZhY3RvcnlDbGFzc05hbWUpKV0pO1xuICAgICAgY29uc3QgbmV3SW1wb3J0ID0gdHMuY3JlYXRlRXhwb3J0RGVjbGFyYXRpb24odW5kZWZpbmVkLCB1bmRlZmluZWQsIG5hbWVkRXhwb3J0cyxcbiAgICAgICAgdHMuY3JlYXRlTGl0ZXJhbChmYWN0b3J5TW9kdWxlUGF0aCkpO1xuXG4gICAgICBjb25zdCBmaXJzdE5vZGUgPSBnZXRGaXJzdE5vZGUoc291cmNlRmlsZSk7XG4gICAgICBpZiAoZmlyc3ROb2RlKSB7XG4gICAgICAgIG9wcy5wdXNoKG5ldyBBZGROb2RlT3BlcmF0aW9uKFxuICAgICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgICAgZmlyc3ROb2RlLFxuICAgICAgICAgIG5ld0ltcG9ydCxcbiAgICAgICAgKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3BzO1xuICB9O1xuXG4gIHJldHVybiBtYWtlVHJhbnNmb3JtKHN0YW5kYXJkVHJhbnNmb3JtKTtcbn1cbiJdfQ==