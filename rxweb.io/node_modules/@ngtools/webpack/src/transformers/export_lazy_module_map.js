"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const path = require("path");
const ts = require("typescript");
const ast_helpers_1 = require("./ast_helpers");
const interfaces_1 = require("./interfaces");
const make_transform_1 = require("./make_transform");
function exportLazyModuleMap(shouldTransform, lazyRoutesCb) {
    const standardTransform = function (sourceFile) {
        const ops = [];
        const lazyRoutes = lazyRoutesCb();
        if (!shouldTransform(sourceFile.fileName)) {
            return ops;
        }
        const dirName = path.normalize(path.dirname(sourceFile.fileName));
        const modules = Object.keys(lazyRoutes)
            .map((loadChildrenString) => {
            const [, moduleName] = loadChildrenString.split('#');
            const modulePath = lazyRoutes[loadChildrenString];
            return {
                modulePath,
                moduleName,
                loadChildrenString,
            };
        });
        modules.forEach((module, index) => {
            const modulePath = module.modulePath;
            if (!modulePath) {
                return;
            }
            let relativePath = path.relative(dirName, modulePath).replace(/\\/g, '/');
            if (!(relativePath.startsWith('./') || relativePath.startsWith('../'))) {
                // 'a/b/c' is a relative path for Node but an absolute path for TS, so we must convert it.
                relativePath = `./${relativePath}`;
            }
            // Create the new namespace import node.
            const namespaceImport = ts.createNamespaceImport(ts.createIdentifier(`__lazy_${index}__`));
            const importClause = ts.createImportClause(undefined, namespaceImport);
            const newImport = ts.createImportDeclaration(undefined, undefined, importClause, ts.createLiteral(relativePath));
            const firstNode = ast_helpers_1.getFirstNode(sourceFile);
            if (firstNode) {
                ops.push(new interfaces_1.AddNodeOperation(sourceFile, firstNode, newImport));
            }
        });
        const lazyModuleObjectLiteral = ts.createObjectLiteral(modules.map((mod, idx) => {
            let [modulePath, moduleName] = mod.loadChildrenString.split('#');
            if (modulePath.match(/\.ngfactory/)) {
                modulePath = modulePath.replace('.ngfactory', '');
                moduleName = moduleName.replace('NgFactory', '');
            }
            return ts.createPropertyAssignment(ts.createLiteral(`${modulePath}#${moduleName}`), ts.createPropertyAccess(ts.createIdentifier(`__lazy_${idx}__`), mod.moduleName));
        }));
        const lazyModuleVariableStmt = ts.createVariableStatement([ts.createToken(ts.SyntaxKind.ExportKeyword)], [ts.createVariableDeclaration('LAZY_MODULE_MAP', undefined, lazyModuleObjectLiteral)]);
        const lastNode = ast_helpers_1.getLastNode(sourceFile);
        if (lastNode) {
            ops.push(new interfaces_1.AddNodeOperation(sourceFile, lastNode, undefined, lazyModuleVariableStmt));
        }
        return ops;
    };
    return make_transform_1.makeTransform(standardTransform);
}
exports.exportLazyModuleMap = exportLazyModuleMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0X2xhenlfbW9kdWxlX21hcC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvbmd0b29scy93ZWJwYWNrL3NyYy90cmFuc2Zvcm1lcnMvZXhwb3J0X2xhenlfbW9kdWxlX21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFFakMsK0NBQTBEO0FBQzFELDZDQUF1RjtBQUN2RixxREFBaUQ7QUFFakQsNkJBQ0UsZUFBOEMsRUFDOUMsWUFBZ0M7SUFHaEMsTUFBTSxpQkFBaUIsR0FBc0IsVUFBVSxVQUF5QjtRQUM5RSxNQUFNLEdBQUcsR0FBeUIsRUFBRSxDQUFDO1FBRXJDLE1BQU0sVUFBVSxHQUFHLFlBQVksRUFBRSxDQUFDO1FBRWxDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFbEUsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDcEMsR0FBRyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUMxQixNQUFNLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFbEQsT0FBTztnQkFDTCxVQUFVO2dCQUNWLFVBQVU7Z0JBQ1Ysa0JBQWtCO2FBQ25CLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVMLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDaEMs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MUMsQ0FBQztBQS9FRCxrREErRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMYXp5Um91dGVNYXAgfSBmcm9tICcuLi9sYXp5X3JvdXRlcyc7XG5pbXBvcnQgeyBnZXRGaXJzdE5vZGUsIGdldExhc3ROb2RlIH0gZnJvbSAnLi9hc3RfaGVscGVycyc7XG5pbXBvcnQgeyBBZGROb2RlT3BlcmF0aW9uLCBTdGFuZGFyZFRyYW5zZm9ybSwgVHJhbnNmb3JtT3BlcmF0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IG1ha2VUcmFuc2Zvcm0gfSBmcm9tICcuL21ha2VfdHJhbnNmb3JtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydExhenlNb2R1bGVNYXAoXG4gIHNob3VsZFRyYW5zZm9ybTogKGZpbGVOYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4sXG4gIGxhenlSb3V0ZXNDYjogKCkgPT4gTGF6eVJvdXRlTWFwLFxuKTogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+IHtcblxuICBjb25zdCBzdGFuZGFyZFRyYW5zZm9ybTogU3RhbmRhcmRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICAgIGNvbnN0IG9wczogVHJhbnNmb3JtT3BlcmF0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0IGxhenlSb3V0ZXMgPSBsYXp5Um91dGVzQ2IoKTtcblxuICAgIGlmICghc2hvdWxkVHJhbnNmb3JtKHNvdXJjZUZpbGUuZmlsZU5hbWUpKSB7XG4gICAgICByZXR1cm4gb3BzO1xuICAgIH1cblxuICAgIGNvbnN0IGRpck5hbWUgPSBwYXRoLm5vcm1hbGl6ZShwYXRoLmRpcm5hbWUoc291cmNlRmlsZS5maWxlTmFtZSkpO1xuXG4gICAgY29uc3QgbW9kdWxlcyA9IE9iamVjdC5rZXlzKGxhenlSb3V0ZXMpXG4gICAgICAubWFwKChsb2FkQ2hpbGRyZW5TdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgWywgbW9kdWxlTmFtZV0gPSBsb2FkQ2hpbGRyZW5TdHJpbmcuc3BsaXQoJyMnKTtcbiAgICAgICAgY29uc3QgbW9kdWxlUGF0aCA9IGxhenlSb3V0ZXNbbG9hZENoaWxkcmVuU3RyaW5nXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgbW9kdWxlTmFtZSxcbiAgICAgICAgICBsb2FkQ2hpbGRyZW5TdHJpbmcsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIG1vZHVsZXMuZm9yRWFjaCgobW9kdWxlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgbW9kdWxlUGF0aCA9IG1vZHVsZS5tb2R1bGVQYXRoO1xuICAgICAgaWYgKCFtb2R1bGVQYXRoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlbGF0aXZlUGF0aCA9IHBhdGgucmVsYXRpdmUoZGlyTmFtZSwgbW9kdWxlUGF0aCkucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuICAgICAgaWYgKCEocmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgoJy4vJykgfHwgcmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgoJy4uLycpKSkge1xuICAgICAgICAvLyAnYS9iL2MnIGlzIGEgcmVsYXRpdmUgcGF0aCBmb3IgTm9kZSBidXQgYW4gYWJzb2x1dGUgcGF0aCBmb3IgVFMsIHNvIHdlIG11c3QgY29udmVydCBpdC5cbiAgICAgICAgcmVsYXRpdmVQYXRoID0gYC4vJHtyZWxhdGl2ZVBhdGh9YDtcbiAgICAgIH1cbiAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IG5hbWVzcGFjZSBpbXBvcnQgbm9kZS5cbiAgICAgIGNvbnN0IG5hbWVzcGFjZUltcG9ydCA9IHRzLmNyZWF0ZU5hbWVzcGFjZUltcG9ydCh0cy5jcmVhdGVJZGVudGlmaWVyKGBfX2xhenlfJHtpbmRleH1fX2ApKTtcbiAgICAgIGNvbnN0IGltcG9ydENsYXVzZSA9IHRzLmNyZWF0ZUltcG9ydENsYXVzZSh1bmRlZmluZWQsIG5hbWVzcGFjZUltcG9ydCk7XG4gICAgICBjb25zdCBuZXdJbXBvcnQgPSB0cy5jcmVhdGVJbXBvcnREZWNsYXJhdGlvbih1bmRlZmluZWQsIHVuZGVmaW5lZCwgaW1wb3J0Q2xhdXNlLFxuICAgICAgICB0cy5jcmVhdGVMaXRlcmFsKHJlbGF0aXZlUGF0aCkpO1xuXG4gICAgICBjb25zdCBmaXJzdE5vZGUgPSBnZXRGaXJzdE5vZGUoc291cmNlRmlsZSk7XG4gICAgICBpZiAoZmlyc3ROb2RlKSB7XG4gICAgICAgIG9wcy5wdXNoKG5ldyBBZGROb2RlT3BlcmF0aW9uKHNvdXJjZUZpbGUsIGZpcnN0Tm9kZSwgbmV3SW1wb3J0KSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBsYXp5TW9kdWxlT2JqZWN0TGl0ZXJhbCA9IHRzLmNyZWF0ZU9iamVjdExpdGVyYWwoXG4gICAgICBtb2R1bGVzLm1hcCgobW9kLCBpZHgpID0+IHtcbiAgICAgICAgbGV0IFttb2R1bGVQYXRoLCBtb2R1bGVOYW1lXSA9IG1vZC5sb2FkQ2hpbGRyZW5TdHJpbmcuc3BsaXQoJyMnKTtcbiAgICAgICAgaWYgKG1vZHVsZVBhdGgubWF0Y2goL1xcLm5nZmFjdG9yeS8pKSB7XG4gICAgICAgICAgbW9kdWxlUGF0aCA9IG1vZHVsZVBhdGgucmVwbGFjZSgnLm5nZmFjdG9yeScsICcnKTtcbiAgICAgICAgICBtb2R1bGVOYW1lID0gbW9kdWxlTmFtZS5yZXBsYWNlKCdOZ0ZhY3RvcnknLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHMuY3JlYXRlUHJvcGVydHlBc3NpZ25tZW50KFxuICAgICAgICAgIHRzLmNyZWF0ZUxpdGVyYWwoYCR7bW9kdWxlUGF0aH0jJHttb2R1bGVOYW1lfWApLFxuICAgICAgICAgIHRzLmNyZWF0ZVByb3BlcnR5QWNjZXNzKHRzLmNyZWF0ZUlkZW50aWZpZXIoYF9fbGF6eV8ke2lkeH1fX2ApLCBtb2QubW9kdWxlTmFtZSkpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IGxhenlNb2R1bGVWYXJpYWJsZVN0bXQgPSB0cy5jcmVhdGVWYXJpYWJsZVN0YXRlbWVudChcbiAgICAgIFt0cy5jcmVhdGVUb2tlbih0cy5TeW50YXhLaW5kLkV4cG9ydEtleXdvcmQpXSxcbiAgICAgIFt0cy5jcmVhdGVWYXJpYWJsZURlY2xhcmF0aW9uKCdMQVpZX01PRFVMRV9NQVAnLCB1bmRlZmluZWQsIGxhenlNb2R1bGVPYmplY3RMaXRlcmFsKV0sXG4gICAgKTtcblxuICAgIGNvbnN0IGxhc3ROb2RlID0gZ2V0TGFzdE5vZGUoc291cmNlRmlsZSk7XG4gICAgaWYgKGxhc3ROb2RlKSB7XG4gICAgICBvcHMucHVzaChuZXcgQWRkTm9kZU9wZXJhdGlvbihzb3VyY2VGaWxlLCBsYXN0Tm9kZSwgdW5kZWZpbmVkLCBsYXp5TW9kdWxlVmFyaWFibGVTdG10KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wcztcbiAgfTtcblxuICByZXR1cm4gbWFrZVRyYW5zZm9ybShzdGFuZGFyZFRyYW5zZm9ybSk7XG59XG4iXX0=