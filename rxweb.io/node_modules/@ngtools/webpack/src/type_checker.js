"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const ts = require("typescript");
const benchmark_1 = require("./benchmark");
const compiler_host_1 = require("./compiler_host");
const gather_diagnostics_1 = require("./gather_diagnostics");
const ngtools_api_1 = require("./ngtools_api");
// This file should run in a child process with the AUTO_START_ARG argument
var MESSAGE_KIND;
(function (MESSAGE_KIND) {
    MESSAGE_KIND[MESSAGE_KIND["Init"] = 0] = "Init";
    MESSAGE_KIND[MESSAGE_KIND["Update"] = 1] = "Update";
})(MESSAGE_KIND = exports.MESSAGE_KIND || (exports.MESSAGE_KIND = {}));
class TypeCheckerMessage {
    constructor(kind) {
        this.kind = kind;
    }
}
exports.TypeCheckerMessage = TypeCheckerMessage;
class InitMessage extends TypeCheckerMessage {
    constructor(compilerOptions, basePath, jitMode, rootNames) {
        super(MESSAGE_KIND.Init);
        this.compilerOptions = compilerOptions;
        this.basePath = basePath;
        this.jitMode = jitMode;
        this.rootNames = rootNames;
    }
}
exports.InitMessage = InitMessage;
class UpdateMessage extends TypeCheckerMessage {
    constructor(rootNames, changedCompilationFiles) {
        super(MESSAGE_KIND.Update);
        this.rootNames = rootNames;
        this.changedCompilationFiles = changedCompilationFiles;
    }
}
exports.UpdateMessage = UpdateMessage;
exports.AUTO_START_ARG = '9d93e901-158a-4cf9-ba1b-2f0582ffcfeb';
class TypeChecker {
    constructor(_compilerOptions, _basePath, _JitMode, _rootNames) {
        this._compilerOptions = _compilerOptions;
        this._JitMode = _JitMode;
        this._rootNames = _rootNames;
        benchmark_1.time('TypeChecker.constructor');
        const compilerHost = new compiler_host_1.WebpackCompilerHost(_compilerOptions, _basePath);
        compilerHost.enableCaching();
        // We don't set a async resource loader on the compiler host because we only support
        // html templates, which are the only ones that can throw errors, and those can be loaded
        // synchronously.
        // If we need to also report errors on styles then we'll need to ask the main thread
        // for these resources.
        this._compilerHost = ngtools_api_1.createCompilerHost({
            options: this._compilerOptions,
            tsHost: compilerHost,
        });
        benchmark_1.timeEnd('TypeChecker.constructor');
    }
    _update(rootNames, changedCompilationFiles) {
        benchmark_1.time('TypeChecker._update');
        this._rootNames = rootNames;
        changedCompilationFiles.forEach((fileName) => {
            this._compilerHost.invalidate(fileName);
        });
        benchmark_1.timeEnd('TypeChecker._update');
    }
    _createOrUpdateProgram() {
        if (this._JitMode) {
            // Create the TypeScript program.
            benchmark_1.time('TypeChecker._createOrUpdateProgram.ts.createProgram');
            this._program = ts.createProgram(this._rootNames, this._compilerOptions, this._compilerHost, this._program);
            benchmark_1.timeEnd('TypeChecker._createOrUpdateProgram.ts.createProgram');
        }
        else {
            benchmark_1.time('TypeChecker._createOrUpdateProgram.ng.createProgram');
            // Create the Angular program.
            this._program = ngtools_api_1.createProgram({
                rootNames: this._rootNames,
                options: this._compilerOptions,
                host: this._compilerHost,
                oldProgram: this._program,
            });
            benchmark_1.timeEnd('TypeChecker._createOrUpdateProgram.ng.createProgram');
        }
    }
    _diagnose(cancellationToken) {
        const allDiagnostics = gather_diagnostics_1.gatherDiagnostics(this._program, this._JitMode, 'TypeChecker', cancellationToken);
        // Report diagnostics.
        if (!cancellationToken.isCancellationRequested()) {
            const errors = allDiagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error);
            const warnings = allDiagnostics.filter((d) => d.category === ts.DiagnosticCategory.Warning);
            if (errors.length > 0) {
                const message = ngtools_api_1.formatDiagnostics(errors);
                console.error(core_1.terminal.bold(core_1.terminal.red('ERROR in ' + message)));
            }
            else {
                // Reset the changed file tracker only if there are no errors.
                this._compilerHost.resetChangedFileTracker();
            }
            if (warnings.length > 0) {
                const message = ngtools_api_1.formatDiagnostics(warnings);
                console.log(core_1.terminal.bold(core_1.terminal.yellow('WARNING in ' + message)));
            }
        }
    }
    update(rootNames, changedCompilationFiles, cancellationToken) {
        this._update(rootNames, changedCompilationFiles);
        this._createOrUpdateProgram();
        this._diagnose(cancellationToken);
    }
}
exports.TypeChecker = TypeChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZV9jaGVja2VyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL3R5cGVfY2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUFnRDtBQUNoRCxpQ0FBaUM7QUFDakMsMkNBQTRDO0FBQzVDLG1EQUFzRDtBQUN0RCw2REFBNEU7QUFDNUUsK0NBT3VCO0FBR3ZCLDJFQUEyRTtBQUczRSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIsK0NBQUksQ0FBQTtJQUNKLG1EQUFNLENBQUE7QUFDUixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFFRDtJQUNFLFlBQW1CLElBQWtCO1FBQWxCLFNBQUksR0FBSixJQUFJLENBQWM7SUFBSSxDQUFDO0NBQzNDO0FBRkQsZ0RBRUM7QUFFRCxpQkFBeUIsU0FBUSxrQkFBa0I7SUFDakQsWUFDUyxlQUFtQyxFQUNuQyxRQUFnQixFQUNoQixPQUFnQixFQUNoQixTQUFtQjtRQUUxQixLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTGxCLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBVTtJQUc1QixDQUFDO0NBQ0Y7QUFURCxrQ0FTQztBQUVELG1CQUEyQixTQUFRLGtCQUFrQjtJQUNuRCxZQUFtQixTQUFtQixFQUFTLHVCQUFpQztRQUM5RSxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRFYsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFTLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBVTtJQUVoRixDQUFDO0NBQ0Y7QUFKRCxzQ0FJQztBQUVZLFFBQUEsY0FBYyxHQUFHLHNDQUFzQyxDQUFDO0FBRXJFO0lBSUUsWUFDVSxnQkFBaUMsRUFDekMsU0FBaUIsRUFDVCxRQUFpQixFQUNqQixVQUFvQjtRQUhwQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsZUFBVSxHQUFWLFVBQVUsQ0FBVTtRQUU1QixnQkFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDaEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxtQ0FBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxRSxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0Isb0ZBQW9GO1FBQ3BGLHlGQUF5RjtRQUN6RixpQkFBaUI7UUFDakIsb0ZBQW9GO1FBQ3BGLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGdDQUFrQixDQUFDO1lBQ3RDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQzlCLE1BQU0sRUFBRSxZQUFZO1NBQ3JCLENBQXVDLENBQUM7UUFDekMsbUJBQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyxPQUFPLENBQUMsU0FBbUIsRUFBRSx1QkFBaUM7UUFDcEUsZ0JBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsbUJBQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxzQkFBc0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLGlDQUFpQztZQUNqQyxnQkFBSSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUM5QixJQUFJLENBQUMsVUFBVSxFQUNmLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFFBQXNCLENBQ2QsQ0FBQztZQUNoQixtQkFBTyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7U0FDaEU7YUFBTTtZQUNMLGdCQUFJLENBQUMscURBQXFELENBQUMsQ0FBQztZQUM1RCw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRywyQkFBYSxDQUFDO2dCQUM1QixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQzFCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2dCQUM5QixJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7Z0JBQ3hCLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBbUI7YUFDckMsQ0FBWSxDQUFDO1lBQ2QsbUJBQU8sQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQztJQUVPLFNBQVMsQ0FBQyxpQkFBb0M7UUFDcEQsTUFBTSxjQUFjLEdBQUcsc0NBQWlCLENBQ3RDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVsRSxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDaEQsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEYsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUYsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckIsTUFBTSxPQUFPLEdBQUcsK0JBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBUSxDQUFDLElBQUksQ0FBQyxlQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0wsOERBQThEO2dCQUM5RCxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDOUM7WUFFRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixNQUFNLE9BQU8sR0FBRywrQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLGVBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RTtTQUNGO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFtQixFQUFFLHVCQUFpQyxFQUN0RCxpQkFBb0M7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNGO0FBeEZELGtDQXdGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IHRlcm1pbmFsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyB0aW1lLCB0aW1lRW5kIH0gZnJvbSAnLi9iZW5jaG1hcmsnO1xuaW1wb3J0IHsgV2VicGFja0NvbXBpbGVySG9zdCB9IGZyb20gJy4vY29tcGlsZXJfaG9zdCc7XG5pbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlbiwgZ2F0aGVyRGlhZ25vc3RpY3MgfSBmcm9tICcuL2dhdGhlcl9kaWFnbm9zdGljcyc7XG5pbXBvcnQge1xuICBDb21waWxlckhvc3QsXG4gIENvbXBpbGVyT3B0aW9ucyxcbiAgUHJvZ3JhbSxcbiAgY3JlYXRlQ29tcGlsZXJIb3N0LFxuICBjcmVhdGVQcm9ncmFtLFxuICBmb3JtYXREaWFnbm9zdGljcyxcbn0gZnJvbSAnLi9uZ3Rvb2xzX2FwaSc7XG5cblxuLy8gVGhpcyBmaWxlIHNob3VsZCBydW4gaW4gYSBjaGlsZCBwcm9jZXNzIHdpdGggdGhlIEFVVE9fU1RBUlRfQVJHIGFyZ3VtZW50XG5cblxuZXhwb3J0IGVudW0gTUVTU0FHRV9LSU5EIHtcbiAgSW5pdCxcbiAgVXBkYXRlLFxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHlwZUNoZWNrZXJNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGtpbmQ6IE1FU1NBR0VfS0lORCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbml0TWVzc2FnZSBleHRlbmRzIFR5cGVDaGVja2VyTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb21waWxlck9wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucyxcbiAgICBwdWJsaWMgYmFzZVBhdGg6IHN0cmluZyxcbiAgICBwdWJsaWMgaml0TW9kZTogYm9vbGVhbixcbiAgICBwdWJsaWMgcm9vdE5hbWVzOiBzdHJpbmdbXSxcbiAgKSB7XG4gICAgc3VwZXIoTUVTU0FHRV9LSU5ELkluaXQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVNZXNzYWdlIGV4dGVuZHMgVHlwZUNoZWNrZXJNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJvb3ROYW1lczogc3RyaW5nW10sIHB1YmxpYyBjaGFuZ2VkQ29tcGlsYXRpb25GaWxlczogc3RyaW5nW10pIHtcbiAgICBzdXBlcihNRVNTQUdFX0tJTkQuVXBkYXRlKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQVVUT19TVEFSVF9BUkcgPSAnOWQ5M2U5MDEtMTU4YS00Y2Y5LWJhMWItMmYwNTgyZmZjZmViJztcblxuZXhwb3J0IGNsYXNzIFR5cGVDaGVja2VyIHtcbiAgcHJpdmF0ZSBfcHJvZ3JhbTogdHMuUHJvZ3JhbSB8IFByb2dyYW07XG4gIHByaXZhdGUgX2NvbXBpbGVySG9zdDogV2VicGFja0NvbXBpbGVySG9zdCAmIENvbXBpbGVySG9zdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jb21waWxlck9wdGlvbnM6IENvbXBpbGVyT3B0aW9ucyxcbiAgICBfYmFzZVBhdGg6IHN0cmluZyxcbiAgICBwcml2YXRlIF9KaXRNb2RlOiBib29sZWFuLFxuICAgIHByaXZhdGUgX3Jvb3ROYW1lczogc3RyaW5nW10sXG4gICkge1xuICAgIHRpbWUoJ1R5cGVDaGVja2VyLmNvbnN0cnVjdG9yJyk7XG4gICAgY29uc3QgY29tcGlsZXJIb3N0ID0gbmV3IFdlYnBhY2tDb21waWxlckhvc3QoX2NvbXBpbGVyT3B0aW9ucywgX2Jhc2VQYXRoKTtcbiAgICBjb21waWxlckhvc3QuZW5hYmxlQ2FjaGluZygpO1xuICAgIC8vIFdlIGRvbid0IHNldCBhIGFzeW5jIHJlc291cmNlIGxvYWRlciBvbiB0aGUgY29tcGlsZXIgaG9zdCBiZWNhdXNlIHdlIG9ubHkgc3VwcG9ydFxuICAgIC8vIGh0bWwgdGVtcGxhdGVzLCB3aGljaCBhcmUgdGhlIG9ubHkgb25lcyB0aGF0IGNhbiB0aHJvdyBlcnJvcnMsIGFuZCB0aG9zZSBjYW4gYmUgbG9hZGVkXG4gICAgLy8gc3luY2hyb25vdXNseS5cbiAgICAvLyBJZiB3ZSBuZWVkIHRvIGFsc28gcmVwb3J0IGVycm9ycyBvbiBzdHlsZXMgdGhlbiB3ZSdsbCBuZWVkIHRvIGFzayB0aGUgbWFpbiB0aHJlYWRcbiAgICAvLyBmb3IgdGhlc2UgcmVzb3VyY2VzLlxuICAgIHRoaXMuX2NvbXBpbGVySG9zdCA9IGNyZWF0ZUNvbXBpbGVySG9zdCh7XG4gICAgICBvcHRpb25zOiB0aGlzLl9jb21waWxlck9wdGlvbnMsXG4gICAgICB0c0hvc3Q6IGNvbXBpbGVySG9zdCxcbiAgICB9KSBhcyBDb21waWxlckhvc3QgJiBXZWJwYWNrQ29tcGlsZXJIb3N0O1xuICAgIHRpbWVFbmQoJ1R5cGVDaGVja2VyLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGUocm9vdE5hbWVzOiBzdHJpbmdbXSwgY2hhbmdlZENvbXBpbGF0aW9uRmlsZXM6IHN0cmluZ1tdKSB7XG4gICAgdGltZSgnVHlwZUNoZWNrZXIuX3VwZGF0ZScpO1xuICAgIHRoaXMuX3Jvb3ROYW1lcyA9IHJvb3ROYW1lcztcbiAgICBjaGFuZ2VkQ29tcGlsYXRpb25GaWxlcy5mb3JFYWNoKChmaWxlTmFtZSkgPT4ge1xuICAgICAgdGhpcy5fY29tcGlsZXJIb3N0LmludmFsaWRhdGUoZmlsZU5hbWUpO1xuICAgIH0pO1xuICAgIHRpbWVFbmQoJ1R5cGVDaGVja2VyLl91cGRhdGUnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbSgpIHtcbiAgICBpZiAodGhpcy5fSml0TW9kZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBUeXBlU2NyaXB0IHByb2dyYW0uXG4gICAgICB0aW1lKCdUeXBlQ2hlY2tlci5fY3JlYXRlT3JVcGRhdGVQcm9ncmFtLnRzLmNyZWF0ZVByb2dyYW0nKTtcbiAgICAgIHRoaXMuX3Byb2dyYW0gPSB0cy5jcmVhdGVQcm9ncmFtKFxuICAgICAgICB0aGlzLl9yb290TmFtZXMsXG4gICAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucyxcbiAgICAgICAgdGhpcy5fY29tcGlsZXJIb3N0LFxuICAgICAgICB0aGlzLl9wcm9ncmFtIGFzIHRzLlByb2dyYW0sXG4gICAgICApIGFzIHRzLlByb2dyYW07XG4gICAgICB0aW1lRW5kKCdUeXBlQ2hlY2tlci5fY3JlYXRlT3JVcGRhdGVQcm9ncmFtLnRzLmNyZWF0ZVByb2dyYW0nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGltZSgnVHlwZUNoZWNrZXIuX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbS5uZy5jcmVhdGVQcm9ncmFtJyk7XG4gICAgICAvLyBDcmVhdGUgdGhlIEFuZ3VsYXIgcHJvZ3JhbS5cbiAgICAgIHRoaXMuX3Byb2dyYW0gPSBjcmVhdGVQcm9ncmFtKHtcbiAgICAgICAgcm9vdE5hbWVzOiB0aGlzLl9yb290TmFtZXMsXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2NvbXBpbGVyT3B0aW9ucyxcbiAgICAgICAgaG9zdDogdGhpcy5fY29tcGlsZXJIb3N0LFxuICAgICAgICBvbGRQcm9ncmFtOiB0aGlzLl9wcm9ncmFtIGFzIFByb2dyYW0sXG4gICAgICB9KSBhcyBQcm9ncmFtO1xuICAgICAgdGltZUVuZCgnVHlwZUNoZWNrZXIuX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbS5uZy5jcmVhdGVQcm9ncmFtJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGlhZ25vc2UoY2FuY2VsbGF0aW9uVG9rZW46IENhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgY29uc3QgYWxsRGlhZ25vc3RpY3MgPSBnYXRoZXJEaWFnbm9zdGljcyhcbiAgICAgIHRoaXMuX3Byb2dyYW0sIHRoaXMuX0ppdE1vZGUsICdUeXBlQ2hlY2tlcicsIGNhbmNlbGxhdGlvblRva2VuKTtcblxuICAgIC8vIFJlcG9ydCBkaWFnbm9zdGljcy5cbiAgICBpZiAoIWNhbmNlbGxhdGlvblRva2VuLmlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKCkpIHtcbiAgICAgIGNvbnN0IGVycm9ycyA9IGFsbERpYWdub3N0aWNzLmZpbHRlcigoZCkgPT4gZC5jYXRlZ29yeSA9PT0gdHMuRGlhZ25vc3RpY0NhdGVnb3J5LkVycm9yKTtcbiAgICAgIGNvbnN0IHdhcm5pbmdzID0gYWxsRGlhZ25vc3RpY3MuZmlsdGVyKChkKSA9PiBkLmNhdGVnb3J5ID09PSB0cy5EaWFnbm9zdGljQ2F0ZWdvcnkuV2FybmluZyk7XG5cbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZm9ybWF0RGlhZ25vc3RpY3MoZXJyb3JzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcih0ZXJtaW5hbC5ib2xkKHRlcm1pbmFsLnJlZCgnRVJST1IgaW4gJyArIG1lc3NhZ2UpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXNldCB0aGUgY2hhbmdlZCBmaWxlIHRyYWNrZXIgb25seSBpZiB0aGVyZSBhcmUgbm8gZXJyb3JzLlxuICAgICAgICB0aGlzLl9jb21waWxlckhvc3QucmVzZXRDaGFuZ2VkRmlsZVRyYWNrZXIoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdhcm5pbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGZvcm1hdERpYWdub3N0aWNzKHdhcm5pbmdzKTtcbiAgICAgICAgY29uc29sZS5sb2codGVybWluYWwuYm9sZCh0ZXJtaW5hbC55ZWxsb3coJ1dBUk5JTkcgaW4gJyArIG1lc3NhZ2UpKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShyb290TmFtZXM6IHN0cmluZ1tdLCBjaGFuZ2VkQ29tcGlsYXRpb25GaWxlczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW46IENhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgdGhpcy5fdXBkYXRlKHJvb3ROYW1lcywgY2hhbmdlZENvbXBpbGF0aW9uRmlsZXMpO1xuICAgIHRoaXMuX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbSgpO1xuICAgIHRoaXMuX2RpYWdub3NlKGNhbmNlbGxhdGlvblRva2VuKTtcbiAgfVxufVxuIl19