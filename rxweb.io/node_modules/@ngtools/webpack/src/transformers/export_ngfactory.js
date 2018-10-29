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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0X25nZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvbmd0b29scy93ZWJwYWNrL3NyYy90cmFuc2Zvcm1lcnMvZXhwb3J0X25nZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtCQUF5QztBQUN6QyxpQ0FBaUM7QUFDakMsK0NBQStEO0FBQy9ELDZDQUF1RjtBQUN2RixxREFBaUQ7QUFFakQseUJBQ0UsZUFBOEMsRUFDOUMsY0FBZ0U7SUFHaEUsTUFBTSxpQkFBaUIsR0FBc0IsVUFBVSxVQUF5QjtRQUM5RSxNQUFNLEdBQUcsR0FBeUIsRUFBRSxDQUFDO1FBRXJDLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3pELE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCwwREFBMEQ7UUFDMUQsTUFBTSxzQkFBc0IsR0FBRyw4QkFBZ0IsQ0FBZ0IsVUFBVSxFQUN2RSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQzthQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRSxJQUFJLHNCQUFzQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE1BQU0sdUJBQXVCLEdBQUcsZUFBUSxDQUFDLGNBQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pGLE1BQU0seUJBQXlCLEdBQUcsS0FBSyx1QkFBdUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFckYsdUNBQXVDO1FBQ3ZDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLHFCQUFxQixFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU07bUJBQzFCLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUU7Z0JBQzFFLE9BQU87YUFDUjtZQUVELE1BQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDLE1BQTRCLENBQUM7WUFDdEUsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLE1BQU07bUJBQ3BDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTTttQkFDeEIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1lBRTlDLElBQUksQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtnQkFDNUUsT0FBTzthQUNSO1lBRUQsZ0NBQWdDO1lBQ2hDLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDN0QsTUFBTSxpQkFBaUIsR0FBRyx5QkFBeUIsR0FBRyxZQUFZLENBQUM7WUFFbkUsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFDNUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUM3RSxFQUFFLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUV2QyxNQUFNLFNBQVMsR0FBRywwQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLElBQUksU0FBUyxFQUFFO2dCQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBZ0IsQ0FDM0IsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLENBQ1YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0lBRUYsT0FBTyw4QkFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDMUMsQ0FBQztBQWpFRCwwQ0FpRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBkaXJuYW1lLCByZWxhdGl2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBjb2xsZWN0RGVlcE5vZGVzLCBnZXRGaXJzdE5vZGUgfSBmcm9tICcuL2FzdF9oZWxwZXJzJztcbmltcG9ydCB7IEFkZE5vZGVPcGVyYXRpb24sIFN0YW5kYXJkVHJhbnNmb3JtLCBUcmFuc2Zvcm1PcGVyYXRpb24gfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgbWFrZVRyYW5zZm9ybSB9IGZyb20gJy4vbWFrZV90cmFuc2Zvcm0nO1xuXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0TmdGYWN0b3J5KFxuICBzaG91bGRUcmFuc2Zvcm06IChmaWxlTmFtZTogc3RyaW5nKSA9PiBib29sZWFuLFxuICBnZXRFbnRyeU1vZHVsZTogKCkgPT4geyBwYXRoOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nIH0gfCBudWxsLFxuKTogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+IHtcblxuICBjb25zdCBzdGFuZGFyZFRyYW5zZm9ybTogU3RhbmRhcmRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICAgIGNvbnN0IG9wczogVHJhbnNmb3JtT3BlcmF0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0IGVudHJ5TW9kdWxlID0gZ2V0RW50cnlNb2R1bGUoKTtcblxuICAgIGlmICghc2hvdWxkVHJhbnNmb3JtKHNvdXJjZUZpbGUuZmlsZU5hbWUpIHx8ICFlbnRyeU1vZHVsZSkge1xuICAgICAgcmV0dXJuIG9wcztcbiAgICB9XG5cbiAgICAvLyBGaW5kIGFsbCBpZGVudGlmaWVycyB1c2luZyB0aGUgZW50cnkgbW9kdWxlIGNsYXNzIG5hbWUuXG4gICAgY29uc3QgZW50cnlNb2R1bGVJZGVudGlmaWVycyA9IGNvbGxlY3REZWVwTm9kZXM8dHMuSWRlbnRpZmllcj4oc291cmNlRmlsZSxcbiAgICAgIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcilcbiAgICAgIC5maWx0ZXIoaWRlbnRpZmllciA9PiBpZGVudGlmaWVyLnRleHQgPT09IGVudHJ5TW9kdWxlLmNsYXNzTmFtZSk7XG5cbiAgICBpZiAoZW50cnlNb2R1bGVJZGVudGlmaWVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZWxhdGl2ZUVudHJ5TW9kdWxlUGF0aCA9IHJlbGF0aXZlKGRpcm5hbWUoc291cmNlRmlsZS5maWxlTmFtZSksIGVudHJ5TW9kdWxlLnBhdGgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRFbnRyeU1vZHVsZVBhdGggPSBgLi8ke3JlbGF0aXZlRW50cnlNb2R1bGVQYXRofWAucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuXG4gICAgLy8gR2V0IHRoZSBtb2R1bGUgcGF0aCBmcm9tIHRoZSBpbXBvcnQuXG4gICAgZW50cnlNb2R1bGVJZGVudGlmaWVycy5mb3JFYWNoKChlbnRyeU1vZHVsZUlkZW50aWZpZXIpID0+IHtcbiAgICAgIGlmICghZW50cnlNb2R1bGVJZGVudGlmaWVyLnBhcmVudFxuICAgICAgICAgIHx8IGVudHJ5TW9kdWxlSWRlbnRpZmllci5wYXJlbnQua2luZCAhPT0gdHMuU3ludGF4S2luZC5FeHBvcnRTcGVjaWZpZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHBvcnRTcGVjID0gZW50cnlNb2R1bGVJZGVudGlmaWVyLnBhcmVudCBhcyB0cy5FeHBvcnRTcGVjaWZpZXI7XG4gICAgICBjb25zdCBtb2R1bGVTcGVjaWZpZXIgPSBleHBvcnRTcGVjLnBhcmVudFxuICAgICAgICAmJiBleHBvcnRTcGVjLnBhcmVudC5wYXJlbnRcbiAgICAgICAgJiYgZXhwb3J0U3BlYy5wYXJlbnQucGFyZW50Lm1vZHVsZVNwZWNpZmllcjtcblxuICAgICAgaWYgKCFtb2R1bGVTcGVjaWZpZXIgfHwgbW9kdWxlU3BlY2lmaWVyLmtpbmQgIT09IHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0aGUgdHJhbnNmb3JtIG9wZXJhdGlvbnMuXG4gICAgICBjb25zdCBmYWN0b3J5Q2xhc3NOYW1lID0gZW50cnlNb2R1bGUuY2xhc3NOYW1lICsgJ05nRmFjdG9yeSc7XG4gICAgICBjb25zdCBmYWN0b3J5TW9kdWxlUGF0aCA9IG5vcm1hbGl6ZWRFbnRyeU1vZHVsZVBhdGggKyAnLm5nZmFjdG9yeSc7XG5cbiAgICAgIGNvbnN0IG5hbWVkRXhwb3J0cyA9IHRzLmNyZWF0ZU5hbWVkRXhwb3J0cyhbdHMuY3JlYXRlRXhwb3J0U3BlY2lmaWVyKHVuZGVmaW5lZCxcbiAgICAgICAgdHMuY3JlYXRlSWRlbnRpZmllcihmYWN0b3J5Q2xhc3NOYW1lKSldKTtcbiAgICAgIGNvbnN0IG5ld0ltcG9ydCA9IHRzLmNyZWF0ZUV4cG9ydERlY2xhcmF0aW9uKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBuYW1lZEV4cG9ydHMsXG4gICAgICAgIHRzLmNyZWF0ZUxpdGVyYWwoZmFjdG9yeU1vZHVsZVBhdGgpKTtcblxuICAgICAgY29uc3QgZmlyc3ROb2RlID0gZ2V0Rmlyc3ROb2RlKHNvdXJjZUZpbGUpO1xuICAgICAgaWYgKGZpcnN0Tm9kZSkge1xuICAgICAgICBvcHMucHVzaChuZXcgQWRkTm9kZU9wZXJhdGlvbihcbiAgICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICAgIGZpcnN0Tm9kZSxcbiAgICAgICAgICBuZXdJbXBvcnQsXG4gICAgICAgICkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wcztcbiAgfTtcblxuICByZXR1cm4gbWFrZVRyYW5zZm9ybShzdGFuZGFyZFRyYW5zZm9ybSk7XG59XG4iXX0=