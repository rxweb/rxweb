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
        define("@angular/compiler-cli/src/ngtsc/transform/src/declaration", ["require", "exports", "typescript", "@angular/compiler-cli/src/ngtsc/transform/src/translator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("typescript");
    var translator_1 = require("@angular/compiler-cli/src/ngtsc/transform/src/translator");
    /**
     * Processes .d.ts file text and adds static field declarations, with types.
     */
    var DtsFileTransformer = /** @class */ (function () {
        function DtsFileTransformer(coreImportsFrom) {
            this.coreImportsFrom = coreImportsFrom;
            this.ivyFields = new Map();
            this.imports = new translator_1.ImportManager(coreImportsFrom !== null);
        }
        /**
         * Track that a static field was added to the code for a class.
         */
        DtsFileTransformer.prototype.recordStaticField = function (name, decls) { this.ivyFields.set(name, decls); };
        /**
         * Process the .d.ts text for a file and add any declarations which were recorded.
         */
        DtsFileTransformer.prototype.transform = function (dts, tsPath) {
            var _this = this;
            var dtsFile = ts.createSourceFile('out.d.ts', dts, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
            for (var i = dtsFile.statements.length - 1; i >= 0; i--) {
                var stmt = dtsFile.statements[i];
                if (ts.isClassDeclaration(stmt) && stmt.name !== undefined &&
                    this.ivyFields.has(stmt.name.text)) {
                    var decls = this.ivyFields.get(stmt.name.text);
                    var before = dts.substring(0, stmt.end - 1);
                    var after = dts.substring(stmt.end - 1);
                    dts = before +
                        decls
                            .map(function (decl) {
                            var type = translator_1.translateType(decl.type, _this.imports);
                            return "    static " + decl.name + ": " + type + ";\n";
                        })
                            .join('') +
                        after;
                }
            }
            var imports = this.imports.getAllImports(tsPath, this.coreImportsFrom);
            if (imports.length !== 0) {
                dts = imports.map(function (i) { return "import * as " + i.as + " from '" + i.name + "';\n"; }).join('') + dts;
            }
            return dts;
        };
        return DtsFileTransformer;
    }());
    exports.DtsFileTransformer = DtsFileTransformer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjbGFyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL25ndHNjL3RyYW5zZm9ybS9zcmMvZGVjbGFyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCwrQkFBaUM7SUFLakMsdUZBQTBEO0lBSTFEOztPQUVHO0lBQ0g7UUFJRSw0QkFBb0IsZUFBbUM7WUFBbkMsb0JBQWUsR0FBZixlQUFlLENBQW9CO1lBSC9DLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBMkIsQ0FBQztZQUlyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksMEJBQWEsQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVEOztXQUVHO1FBQ0gsOENBQWlCLEdBQWpCLFVBQWtCLElBQVksRUFBRSxLQUFzQixJQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEc7O1dBRUc7UUFDSCxzQ0FBUyxHQUFULFVBQVUsR0FBVyxFQUFFLE1BQWM7WUFBckMsaUJBNkJDO1lBNUJDLElBQU0sT0FBTyxHQUNULEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFGLEtBQUssSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztvQkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQztvQkFDbkQsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUUxQyxHQUFHLEdBQUcsTUFBTTt3QkFDUixLQUFLOzZCQUNBLEdBQUcsQ0FBQyxVQUFBLElBQUk7NEJBQ1AsSUFBTSxJQUFJLEdBQUcsMEJBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDcEQsT0FBTyxnQkFBYyxJQUFJLENBQUMsSUFBSSxVQUFLLElBQUksUUFBSyxDQUFDO3dCQUMvQyxDQUFDLENBQUM7NkJBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDYixLQUFLLENBQUM7aUJBQ1g7YUFDRjtZQUVELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekUsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDeEIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxpQkFBZSxDQUFDLENBQUMsRUFBRSxlQUFVLENBQUMsQ0FBQyxJQUFJLFNBQU0sRUFBekMsQ0FBeUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDbEY7WUFFRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFDSCx5QkFBQztJQUFELENBQUMsQUE5Q0QsSUE4Q0M7SUE5Q1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtyZWxhdGl2ZVBhdGhCZXR3ZWVufSBmcm9tICcuLi8uLi91dGlsL3NyYy9wYXRoJztcblxuaW1wb3J0IHtDb21waWxlUmVzdWx0fSBmcm9tICcuL2FwaSc7XG5pbXBvcnQge0ltcG9ydE1hbmFnZXIsIHRyYW5zbGF0ZVR5cGV9IGZyb20gJy4vdHJhbnNsYXRvcic7XG5cblxuXG4vKipcbiAqIFByb2Nlc3NlcyAuZC50cyBmaWxlIHRleHQgYW5kIGFkZHMgc3RhdGljIGZpZWxkIGRlY2xhcmF0aW9ucywgd2l0aCB0eXBlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIER0c0ZpbGVUcmFuc2Zvcm1lciB7XG4gIHByaXZhdGUgaXZ5RmllbGRzID0gbmV3IE1hcDxzdHJpbmcsIENvbXBpbGVSZXN1bHRbXT4oKTtcbiAgcHJpdmF0ZSBpbXBvcnRzOiBJbXBvcnRNYW5hZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29yZUltcG9ydHNGcm9tOiB0cy5Tb3VyY2VGaWxlfG51bGwpIHtcbiAgICB0aGlzLmltcG9ydHMgPSBuZXcgSW1wb3J0TWFuYWdlcihjb3JlSW1wb3J0c0Zyb20gIT09IG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIHRoYXQgYSBzdGF0aWMgZmllbGQgd2FzIGFkZGVkIHRvIHRoZSBjb2RlIGZvciBhIGNsYXNzLlxuICAgKi9cbiAgcmVjb3JkU3RhdGljRmllbGQobmFtZTogc3RyaW5nLCBkZWNsczogQ29tcGlsZVJlc3VsdFtdKTogdm9pZCB7IHRoaXMuaXZ5RmllbGRzLnNldChuYW1lLCBkZWNscyk7IH1cblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgLmQudHMgdGV4dCBmb3IgYSBmaWxlIGFuZCBhZGQgYW55IGRlY2xhcmF0aW9ucyB3aGljaCB3ZXJlIHJlY29yZGVkLlxuICAgKi9cbiAgdHJhbnNmb3JtKGR0czogc3RyaW5nLCB0c1BhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZHRzRmlsZSA9XG4gICAgICAgIHRzLmNyZWF0ZVNvdXJjZUZpbGUoJ291dC5kLnRzJywgZHRzLCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCBmYWxzZSwgdHMuU2NyaXB0S2luZC5UUyk7XG5cbiAgICBmb3IgKGxldCBpID0gZHRzRmlsZS5zdGF0ZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBzdG10ID0gZHRzRmlsZS5zdGF0ZW1lbnRzW2ldO1xuICAgICAgaWYgKHRzLmlzQ2xhc3NEZWNsYXJhdGlvbihzdG10KSAmJiBzdG10Lm5hbWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIHRoaXMuaXZ5RmllbGRzLmhhcyhzdG10Lm5hbWUudGV4dCkpIHtcbiAgICAgICAgY29uc3QgZGVjbHMgPSB0aGlzLml2eUZpZWxkcy5nZXQoc3RtdC5uYW1lLnRleHQpICE7XG4gICAgICAgIGNvbnN0IGJlZm9yZSA9IGR0cy5zdWJzdHJpbmcoMCwgc3RtdC5lbmQgLSAxKTtcbiAgICAgICAgY29uc3QgYWZ0ZXIgPSBkdHMuc3Vic3RyaW5nKHN0bXQuZW5kIC0gMSk7XG5cbiAgICAgICAgZHRzID0gYmVmb3JlICtcbiAgICAgICAgICAgIGRlY2xzXG4gICAgICAgICAgICAgICAgLm1hcChkZWNsID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0cmFuc2xhdGVUeXBlKGRlY2wudHlwZSwgdGhpcy5pbXBvcnRzKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBgICAgIHN0YXRpYyAke2RlY2wubmFtZX06ICR7dHlwZX07XFxuYDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKCcnKSArXG4gICAgICAgICAgICBhZnRlcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbXBvcnRzID0gdGhpcy5pbXBvcnRzLmdldEFsbEltcG9ydHModHNQYXRoLCB0aGlzLmNvcmVJbXBvcnRzRnJvbSk7XG4gICAgaWYgKGltcG9ydHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICBkdHMgPSBpbXBvcnRzLm1hcChpID0+IGBpbXBvcnQgKiBhcyAke2kuYXN9IGZyb20gJyR7aS5uYW1lfSc7XFxuYCkuam9pbignJykgKyBkdHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGR0cztcbiAgfVxufSJdfQ==