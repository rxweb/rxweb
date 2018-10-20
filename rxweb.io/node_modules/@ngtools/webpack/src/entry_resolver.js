"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const fs = require("fs");
const path_1 = require("path");
const ts = require("typescript");
const refactor_1 = require("./refactor");
function _recursiveSymbolExportLookup(refactor, symbolName, host, program) {
    // Check this file.
    const hasSymbol = refactor.findAstNodes(null, ts.SyntaxKind.ClassDeclaration)
        .some((cd) => {
        return cd.name != undefined && cd.name.text == symbolName;
    });
    if (hasSymbol) {
        return refactor.fileName;
    }
    // We found the bootstrap variable, now we just need to get where it's imported.
    const exports = refactor.findAstNodes(null, ts.SyntaxKind.ExportDeclaration)
        .map(node => node);
    for (const decl of exports) {
        if (!decl.moduleSpecifier || decl.moduleSpecifier.kind !== ts.SyntaxKind.StringLiteral) {
            continue;
        }
        const modulePath = decl.moduleSpecifier.text;
        const resolvedModule = ts.resolveModuleName(modulePath, refactor.fileName, program.getCompilerOptions(), host);
        if (!resolvedModule.resolvedModule || !resolvedModule.resolvedModule.resolvedFileName) {
            return null;
        }
        const module = resolvedModule.resolvedModule.resolvedFileName;
        if (!decl.exportClause) {
            const moduleRefactor = new refactor_1.TypeScriptFileRefactor(module, host, program);
            const maybeModule = _recursiveSymbolExportLookup(moduleRefactor, symbolName, host, program);
            if (maybeModule) {
                return maybeModule;
            }
            continue;
        }
        const binding = decl.exportClause;
        for (const specifier of binding.elements) {
            if (specifier.name.text == symbolName) {
                // If it's a directory, load its index and recursively lookup.
                if (fs.statSync(module).isDirectory()) {
                    const indexModule = path_1.join(module, 'index.ts');
                    if (fs.existsSync(indexModule)) {
                        const indexRefactor = new refactor_1.TypeScriptFileRefactor(indexModule, host, program);
                        const maybeModule = _recursiveSymbolExportLookup(indexRefactor, symbolName, host, program);
                        if (maybeModule) {
                            return maybeModule;
                        }
                    }
                }
                // Create the source and verify that the symbol is at least a class.
                const source = new refactor_1.TypeScriptFileRefactor(module, host, program);
                const hasSymbol = source.findAstNodes(null, ts.SyntaxKind.ClassDeclaration)
                    .some((cd) => {
                    return cd.name != undefined && cd.name.text == symbolName;
                });
                if (hasSymbol) {
                    return module;
                }
            }
        }
    }
    return null;
}
function _symbolImportLookup(refactor, symbolName, host, program) {
    // We found the bootstrap variable, now we just need to get where it's imported.
    const imports = refactor.findAstNodes(null, ts.SyntaxKind.ImportDeclaration)
        .map(node => node);
    for (const decl of imports) {
        if (!decl.importClause || !decl.moduleSpecifier) {
            continue;
        }
        if (decl.moduleSpecifier.kind !== ts.SyntaxKind.StringLiteral) {
            continue;
        }
        const resolvedModule = ts.resolveModuleName(decl.moduleSpecifier.text, refactor.fileName, program.getCompilerOptions(), host);
        if (!resolvedModule.resolvedModule || !resolvedModule.resolvedModule.resolvedFileName) {
            continue;
        }
        const module = resolvedModule.resolvedModule.resolvedFileName;
        if (decl.importClause.namedBindings
            && decl.importClause.namedBindings.kind == ts.SyntaxKind.NamespaceImport) {
            const binding = decl.importClause.namedBindings;
            if (binding.name.text == symbolName) {
                // This is a default export.
                return module;
            }
        }
        else if (decl.importClause.namedBindings
            && decl.importClause.namedBindings.kind == ts.SyntaxKind.NamedImports) {
            const binding = decl.importClause.namedBindings;
            for (const specifier of binding.elements) {
                if (specifier.name.text == symbolName) {
                    // Create the source and recursively lookup the import.
                    const source = new refactor_1.TypeScriptFileRefactor(module, host, program);
                    const maybeModule = _recursiveSymbolExportLookup(source, symbolName, host, program);
                    if (maybeModule) {
                        return maybeModule;
                    }
                }
            }
        }
    }
    return null;
}
function resolveEntryModuleFromMain(mainPath, host, program) {
    const source = new refactor_1.TypeScriptFileRefactor(mainPath, host, program);
    const bootstrap = source.findAstNodes(source.sourceFile, ts.SyntaxKind.CallExpression, true)
        .map(node => node)
        .filter(call => {
        const access = call.expression;
        return access.kind == ts.SyntaxKind.PropertyAccessExpression
            && access.name.kind == ts.SyntaxKind.Identifier
            && (access.name.text == 'bootstrapModule'
                || access.name.text == 'bootstrapModuleFactory');
    })
        .map(node => node.arguments[0])
        .filter(node => node.kind == ts.SyntaxKind.Identifier);
    if (bootstrap.length != 1) {
        return null;
    }
    const bootstrapSymbolName = bootstrap[0].text;
    const module = _symbolImportLookup(source, bootstrapSymbolName, host, program);
    if (module) {
        return `${module.replace(/\.ts$/, '')}#${bootstrapSymbolName}`;
    }
    // shrug... something bad happened and we couldn't find the import statement.
    throw new Error('Tried to find bootstrap code, but could not. Specify either '
        + 'statically analyzable bootstrap code or pass in an entryModule '
        + 'to the plugins options.');
}
exports.resolveEntryModuleFromMain = resolveEntryModuleFromMain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlfcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL25ndG9vbHMvd2VicGFjay9zcmMvZW50cnlfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCx5QkFBeUI7QUFDekIsK0JBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyx5Q0FBb0Q7QUFHcEQsc0NBQXNDLFFBQWdDLEVBQ2hDLFVBQWtCLEVBQ2xCLElBQXFCLEVBQ3JCLE9BQW1CO0lBQ3ZELG1CQUFtQjtJQUNuQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDO1NBQzFFLElBQUksQ0FBQyxDQUFDLEVBQXVCLEVBQUUsRUFBRTtRQUNoQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNMLElBQUksU0FBUyxFQUFFO1FBQ2IsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDO0tBQzFCO0lBRUQsZ0ZBQWdGO0lBQ2hGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUM7U0FDekUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBNEIsQ0FBQyxDQUFDO0lBRTdDLEtBQUssTUFBTSxJQUFJLElBQUksT0FBTyxFQUFFO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQ3RGLFNBQVM7U0FDVjtRQUVELE1BQU0sVUFBVSxHQUFJLElBQUksQ0FBQyxlQUFvQyxDQUFDLElBQUksQ0FB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RSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV6RCxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUMsTUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRSxJQUFJLE1BQU0sRUFBRTtRQUNWLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0tBQ2hFO0lBRUQsNkVBQTZFO0lBQzdFLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThEO1VBQzFFLGlFQUFpRTtVQUNqRSx5QkFBeUIsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUEvQkQsZ0VBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBUeXBlU2NyaXB0RmlsZVJlZmFjdG9yIH0gZnJvbSAnLi9yZWZhY3Rvcic7XG5cblxuZnVuY3Rpb24gX3JlY3Vyc2l2ZVN5bWJvbEV4cG9ydExvb2t1cChyZWZhY3RvcjogVHlwZVNjcmlwdEZpbGVSZWZhY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3N0OiB0cy5Db21waWxlckhvc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW06IHRzLlByb2dyYW0pOiBzdHJpbmcgfCBudWxsIHtcbiAgLy8gQ2hlY2sgdGhpcyBmaWxlLlxuICBjb25zdCBoYXNTeW1ib2wgPSByZWZhY3Rvci5maW5kQXN0Tm9kZXMobnVsbCwgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uKVxuICAgIC5zb21lKChjZDogdHMuQ2xhc3NEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIGNkLm5hbWUgIT0gdW5kZWZpbmVkICYmIGNkLm5hbWUudGV4dCA9PSBzeW1ib2xOYW1lO1xuICAgIH0pO1xuICBpZiAoaGFzU3ltYm9sKSB7XG4gICAgcmV0dXJuIHJlZmFjdG9yLmZpbGVOYW1lO1xuICB9XG5cbiAgLy8gV2UgZm91bmQgdGhlIGJvb3RzdHJhcCB2YXJpYWJsZSwgbm93IHdlIGp1c3QgbmVlZCB0byBnZXQgd2hlcmUgaXQncyBpbXBvcnRlZC5cbiAgY29uc3QgZXhwb3J0cyA9IHJlZmFjdG9yLmZpbmRBc3ROb2RlcyhudWxsLCB0cy5TeW50YXhLaW5kLkV4cG9ydERlY2xhcmF0aW9uKVxuICAgIC5tYXAobm9kZSA9PiBub2RlIGFzIHRzLkV4cG9ydERlY2xhcmF0aW9uKTtcblxuICBmb3IgKGNvbnN0IGRlY2wgb2YgZXhwb3J0cykge1xuICAgIGlmICghZGVjbC5tb2R1bGVTcGVjaWZpZXIgfHwgZGVjbC5tb2R1bGVTcGVjaWZpZXIua2luZCAhPT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGVQYXRoID0gKGRlY2wubW9kdWxlU3BlY2lmaWVyIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQ7XG4gICAgY29uc3QgcmVzb2x2ZWRNb2R1bGUgPSB0cy5yZXNvbHZlTW9kdWxlTmFtZShcbiAgICAgIG1vZHVsZVBhdGgsIHJlZmFjdG9yLmZpbGVOYW1lLCBwcm9ncmFtLmdldENvbXBpbGVyT3B0aW9ucygpLCBob3N0KTtcbiAgICBpZiAoIXJlc29sdmVkTW9kdWxlLnJlc29sdmVkTW9kdWxlIHx8ICFyZXNvbHZlZE1vZHVsZS5yZXNvbHZlZE1vZHVsZS5yZXNvbHZlZEZpbGVOYW1lKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGUgPSByZXNvbHZlZE1vZHVsZS5yZXNvbHZlZE1vZHVsZS5yZXNvbHZlZEZpbGVOYW1lO1xuICAgIGlmICghZGVjbC5leHBvcnRDbGF1c2UpIHtcbiAgICAgIGNvbnN0IG1vZHVsZVJlZmFjdG9yID0gbmV3IFR5cGVTY3JpcHRGaWxlUmVmYWN0b3IobW9kdWxlLCBob3N0LCBwcm9ncmFtKTtcbiAgICAgIGNvbnN0IG1heWJlTW9kdWxlID0gX3JlY3Vyc2l2ZVN5bWJvbEV4cG9ydExvb2t1cChtb2R1bGVSZWZhY3Rvciwgc3ltYm9sTmFtZSwgaG9zdCwgcHJvZ3JhbSk7XG4gICAgICBpZiAobWF5YmVNb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlTW9kdWxlO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgYmluZGluZyA9IGRlY2wuZXhwb3J0Q2xhdXNlIGFzIHRzLk5hbWVkRXhwb3J0cztcbiAgICBmb3IgKGNvbnN0IHNwZWNpZmllciBvZiBiaW5kaW5nLmVsZW1lbnRzKSB7XG4gICAgICBpZiAoc3BlY2lmaWVyLm5hbWUudGV4dCA9PSBzeW1ib2xOYW1lKSB7XG4gICAgICAgIC8vIElmIGl0J3MgYSBkaXJlY3RvcnksIGxvYWQgaXRzIGluZGV4IGFuZCByZWN1cnNpdmVseSBsb29rdXAuXG4gICAgICAgIGlmIChmcy5zdGF0U3luYyhtb2R1bGUpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICBjb25zdCBpbmRleE1vZHVsZSA9IGpvaW4obW9kdWxlLCAnaW5kZXgudHMnKTtcbiAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhpbmRleE1vZHVsZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4UmVmYWN0b3IgPSBuZXcgVHlwZVNjcmlwdEZpbGVSZWZhY3RvcihpbmRleE1vZHVsZSwgaG9zdCwgcHJvZ3JhbSk7XG4gICAgICAgICAgICBjb25zdCBtYXliZU1vZHVsZSA9IF9yZWN1cnNpdmVTeW1ib2xFeHBvcnRMb29rdXAoXG4gICAgICAgICAgICAgIGluZGV4UmVmYWN0b3IsIHN5bWJvbE5hbWUsIGhvc3QsIHByb2dyYW0pO1xuICAgICAgICAgICAgaWYgKG1heWJlTW9kdWxlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYXliZU1vZHVsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgdGhlIHNvdXJjZSBhbmQgdmVyaWZ5IHRoYXQgdGhlIHN5bWJvbCBpcyBhdCBsZWFzdCBhIGNsYXNzLlxuICAgICAgICBjb25zdCBzb3VyY2UgPSBuZXcgVHlwZVNjcmlwdEZpbGVSZWZhY3Rvcihtb2R1bGUsIGhvc3QsIHByb2dyYW0pO1xuICAgICAgICBjb25zdCBoYXNTeW1ib2wgPSBzb3VyY2UuZmluZEFzdE5vZGVzKG51bGwsIHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvbilcbiAgICAgICAgICAuc29tZSgoY2Q6IHRzLkNsYXNzRGVjbGFyYXRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZC5uYW1lICE9IHVuZGVmaW5lZCAmJiBjZC5uYW1lLnRleHQgPT0gc3ltYm9sTmFtZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaGFzU3ltYm9sKSB7XG4gICAgICAgICAgcmV0dXJuIG1vZHVsZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBfc3ltYm9sSW1wb3J0TG9va3VwKHJlZmFjdG9yOiBUeXBlU2NyaXB0RmlsZVJlZmFjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2xOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IHRzLkNvbXBpbGVySG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbTogdHMuUHJvZ3JhbSk6IHN0cmluZyB8IG51bGwge1xuICAvLyBXZSBmb3VuZCB0aGUgYm9vdHN0cmFwIHZhcmlhYmxlLCBub3cgd2UganVzdCBuZWVkIHRvIGdldCB3aGVyZSBpdCdzIGltcG9ydGVkLlxuICBjb25zdCBpbXBvcnRzID0gcmVmYWN0b3IuZmluZEFzdE5vZGVzKG51bGwsIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb24pXG4gICAgLm1hcChub2RlID0+IG5vZGUgYXMgdHMuSW1wb3J0RGVjbGFyYXRpb24pO1xuXG4gIGZvciAoY29uc3QgZGVjbCBvZiBpbXBvcnRzKSB7XG4gICAgaWYgKCFkZWNsLmltcG9ydENsYXVzZSB8fCAhZGVjbC5tb2R1bGVTcGVjaWZpZXIpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZGVjbC5tb2R1bGVTcGVjaWZpZXIua2luZCAhPT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNvbHZlZE1vZHVsZSA9IHRzLnJlc29sdmVNb2R1bGVOYW1lKFxuICAgICAgKGRlY2wubW9kdWxlU3BlY2lmaWVyIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQsXG4gICAgICByZWZhY3Rvci5maWxlTmFtZSwgcHJvZ3JhbS5nZXRDb21waWxlck9wdGlvbnMoKSwgaG9zdCk7XG4gICAgaWYgKCFyZXNvbHZlZE1vZHVsZS5yZXNvbHZlZE1vZHVsZSB8fCAhcmVzb2x2ZWRNb2R1bGUucmVzb2x2ZWRNb2R1bGUucmVzb2x2ZWRGaWxlTmFtZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kdWxlID0gcmVzb2x2ZWRNb2R1bGUucmVzb2x2ZWRNb2R1bGUucmVzb2x2ZWRGaWxlTmFtZTtcbiAgICBpZiAoZGVjbC5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5nc1xuICAgICAgICAmJiBkZWNsLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzLmtpbmQgPT0gdHMuU3ludGF4S2luZC5OYW1lc3BhY2VJbXBvcnQpIHtcbiAgICAgIGNvbnN0IGJpbmRpbmcgPSBkZWNsLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzIGFzIHRzLk5hbWVzcGFjZUltcG9ydDtcbiAgICAgIGlmIChiaW5kaW5nLm5hbWUudGV4dCA9PSBzeW1ib2xOYW1lKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYSBkZWZhdWx0IGV4cG9ydC5cbiAgICAgICAgcmV0dXJuIG1vZHVsZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRlY2wuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3NcbiAgICAgICAgICAgICAgICYmIGRlY2wuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3Mua2luZCA9PSB0cy5TeW50YXhLaW5kLk5hbWVkSW1wb3J0cykge1xuICAgICAgY29uc3QgYmluZGluZyA9IGRlY2wuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3MgYXMgdHMuTmFtZWRJbXBvcnRzO1xuICAgICAgZm9yIChjb25zdCBzcGVjaWZpZXIgb2YgYmluZGluZy5lbGVtZW50cykge1xuICAgICAgICBpZiAoc3BlY2lmaWVyLm5hbWUudGV4dCA9PSBzeW1ib2xOYW1lKSB7XG4gICAgICAgICAgLy8gQ3JlYXRlIHRoZSBzb3VyY2UgYW5kIHJlY3Vyc2l2ZWx5IGxvb2t1cCB0aGUgaW1wb3J0LlxuICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IG5ldyBUeXBlU2NyaXB0RmlsZVJlZmFjdG9yKG1vZHVsZSwgaG9zdCwgcHJvZ3JhbSk7XG4gICAgICAgICAgY29uc3QgbWF5YmVNb2R1bGUgPSBfcmVjdXJzaXZlU3ltYm9sRXhwb3J0TG9va3VwKHNvdXJjZSwgc3ltYm9sTmFtZSwgaG9zdCwgcHJvZ3JhbSk7XG4gICAgICAgICAgaWYgKG1heWJlTW9kdWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF5YmVNb2R1bGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVFbnRyeU1vZHVsZUZyb21NYWluKG1haW5QYXRoOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9zdDogdHMuQ29tcGlsZXJIb3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW06IHRzLlByb2dyYW0pOiBzdHJpbmcgfCBudWxsIHtcbiAgY29uc3Qgc291cmNlID0gbmV3IFR5cGVTY3JpcHRGaWxlUmVmYWN0b3IobWFpblBhdGgsIGhvc3QsIHByb2dyYW0pO1xuXG4gIGNvbnN0IGJvb3RzdHJhcCA9IHNvdXJjZS5maW5kQXN0Tm9kZXMoc291cmNlLnNvdXJjZUZpbGUsIHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb24sIHRydWUpXG4gICAgLm1hcChub2RlID0+IG5vZGUgYXMgdHMuQ2FsbEV4cHJlc3Npb24pXG4gICAgLmZpbHRlcihjYWxsID0+IHtcbiAgICAgIGNvbnN0IGFjY2VzcyA9IGNhbGwuZXhwcmVzc2lvbiBhcyB0cy5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb247XG5cbiAgICAgIHJldHVybiBhY2Nlc3Mua2luZCA9PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvblxuICAgICAgICAgICYmIGFjY2Vzcy5uYW1lLmtpbmQgPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyXG4gICAgICAgICAgJiYgKGFjY2Vzcy5uYW1lLnRleHQgPT0gJ2Jvb3RzdHJhcE1vZHVsZSdcbiAgICAgICAgICAgICAgfHwgYWNjZXNzLm5hbWUudGV4dCA9PSAnYm9vdHN0cmFwTW9kdWxlRmFjdG9yeScpO1xuICAgIH0pXG4gICAgLm1hcChub2RlID0+IG5vZGUuYXJndW1lbnRzWzBdIGFzIHRzLklkZW50aWZpZXIpXG4gICAgLmZpbHRlcihub2RlID0+IG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpO1xuXG4gIGlmIChib290c3RyYXAubGVuZ3RoICE9IDEpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBib290c3RyYXBTeW1ib2xOYW1lID0gYm9vdHN0cmFwWzBdLnRleHQ7XG4gIGNvbnN0IG1vZHVsZSA9IF9zeW1ib2xJbXBvcnRMb29rdXAoc291cmNlLCBib290c3RyYXBTeW1ib2xOYW1lLCBob3N0LCBwcm9ncmFtKTtcbiAgaWYgKG1vZHVsZSkge1xuICAgIHJldHVybiBgJHttb2R1bGUucmVwbGFjZSgvXFwudHMkLywgJycpfSMke2Jvb3RzdHJhcFN5bWJvbE5hbWV9YDtcbiAgfVxuXG4gIC8vIHNocnVnLi4uIHNvbWV0aGluZyBiYWQgaGFwcGVuZWQgYW5kIHdlIGNvdWxkbid0IGZpbmQgdGhlIGltcG9ydCBzdGF0ZW1lbnQuXG4gIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZmluZCBib290c3RyYXAgY29kZSwgYnV0IGNvdWxkIG5vdC4gU3BlY2lmeSBlaXRoZXIgJ1xuICAgICsgJ3N0YXRpY2FsbHkgYW5hbHl6YWJsZSBib290c3RyYXAgY29kZSBvciBwYXNzIGluIGFuIGVudHJ5TW9kdWxlICdcbiAgICArICd0byB0aGUgcGx1Z2lucyBvcHRpb25zLicpO1xufVxuIl19