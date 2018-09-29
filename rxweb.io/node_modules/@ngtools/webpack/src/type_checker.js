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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZV9jaGVja2VyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL3R5cGVfY2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUFnRDtBQUNoRCxpQ0FBaUM7QUFDakMsMkNBQTRDO0FBQzVDLG1EQUFzRDtBQUN0RCw2REFBNEU7QUFDNUUsK0NBT3VCO0FBR3ZCLDJFQUEyRTtBQUczRSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIsK0NBQUksQ0FBQTtJQUNKLG1EQUFNLENBQUE7QUFDUixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFFRDtJQUNFLFlBQW1CLElBQWtCO1FBQWxCLFNBQUksR0FBSixJQUFJLENBQWM7SUFBSSxDQUFDO0NBQzNDO0FBRkQsZ0RBRUM7QUFFRCxpQkFBeUIsU0FBUSxrQkFBa0I7SUFDakQsWUFDUyxlQUFtQyxFQUNuQyxRQUFnQixFQUNoQixPQUFnQixFQUNoQixTQUFtQjtRQUUxQixLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTGxCLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBVTtJQUc1QixDQUFDO0NBQ0Y7QUFURCxrQ0FTQztBQUVELG1CQUEyQixTQUFRLGtCQUFrQjtJQUNuRCxZQUFtQixTQUFtQixFQUFTLHVCQUFpQztRQUM5RSxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRFYsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFTLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBVTtJQUVoRixDQUFDO0NBQ0Y7QUFKRCxzQ0FJQztBQUVZLFFBQUEsY0FBYyxHQUFHLHNDQUFzQyxDQUFDO0FBRXJFO0lB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QUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sT0FBTyxHQUFHLCtCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQVEsQ0FBQyxJQUFJLENBQUMsZUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTiw4REFBOEQ7Z0JBQzlELElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLE9BQU8sR0FBRywrQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLGVBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsU0FBbUIsRUFBRSx1QkFBaUMsRUFDdEQsaUJBQW9DO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRjtBQXhGRCxrQ0F3RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyB0ZXJtaW5hbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgdGltZSwgdGltZUVuZCB9IGZyb20gJy4vYmVuY2htYXJrJztcbmltcG9ydCB7IFdlYnBhY2tDb21waWxlckhvc3QgfSBmcm9tICcuL2NvbXBpbGVyX2hvc3QnO1xuaW1wb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW4sIGdhdGhlckRpYWdub3N0aWNzIH0gZnJvbSAnLi9nYXRoZXJfZGlhZ25vc3RpY3MnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZXJIb3N0LFxuICBDb21waWxlck9wdGlvbnMsXG4gIFByb2dyYW0sXG4gIGNyZWF0ZUNvbXBpbGVySG9zdCxcbiAgY3JlYXRlUHJvZ3JhbSxcbiAgZm9ybWF0RGlhZ25vc3RpY3MsXG59IGZyb20gJy4vbmd0b29sc19hcGknO1xuXG5cbi8vIFRoaXMgZmlsZSBzaG91bGQgcnVuIGluIGEgY2hpbGQgcHJvY2VzcyB3aXRoIHRoZSBBVVRPX1NUQVJUX0FSRyBhcmd1bWVudFxuXG5cbmV4cG9ydCBlbnVtIE1FU1NBR0VfS0lORCB7XG4gIEluaXQsXG4gIFVwZGF0ZSxcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFR5cGVDaGVja2VyTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBraW5kOiBNRVNTQUdFX0tJTkQpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5pdE1lc3NhZ2UgZXh0ZW5kcyBUeXBlQ2hlY2tlck1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29tcGlsZXJPcHRpb25zOiB0cy5Db21waWxlck9wdGlvbnMsXG4gICAgcHVibGljIGJhc2VQYXRoOiBzdHJpbmcsXG4gICAgcHVibGljIGppdE1vZGU6IGJvb2xlYW4sXG4gICAgcHVibGljIHJvb3ROYW1lczogc3RyaW5nW10sXG4gICkge1xuICAgIHN1cGVyKE1FU1NBR0VfS0lORC5Jbml0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlTWVzc2FnZSBleHRlbmRzIFR5cGVDaGVja2VyTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByb290TmFtZXM6IHN0cmluZ1tdLCBwdWJsaWMgY2hhbmdlZENvbXBpbGF0aW9uRmlsZXM6IHN0cmluZ1tdKSB7XG4gICAgc3VwZXIoTUVTU0FHRV9LSU5ELlVwZGF0ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEFVVE9fU1RBUlRfQVJHID0gJzlkOTNlOTAxLTE1OGEtNGNmOS1iYTFiLTJmMDU4MmZmY2ZlYic7XG5cbmV4cG9ydCBjbGFzcyBUeXBlQ2hlY2tlciB7XG4gIHByaXZhdGUgX3Byb2dyYW06IHRzLlByb2dyYW0gfCBQcm9ncmFtO1xuICBwcml2YXRlIF9jb21waWxlckhvc3Q6IFdlYnBhY2tDb21waWxlckhvc3QgJiBDb21waWxlckhvc3Q7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY29tcGlsZXJPcHRpb25zOiBDb21waWxlck9wdGlvbnMsXG4gICAgX2Jhc2VQYXRoOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBfSml0TW9kZTogYm9vbGVhbixcbiAgICBwcml2YXRlIF9yb290TmFtZXM6IHN0cmluZ1tdLFxuICApIHtcbiAgICB0aW1lKCdUeXBlQ2hlY2tlci5jb25zdHJ1Y3RvcicpO1xuICAgIGNvbnN0IGNvbXBpbGVySG9zdCA9IG5ldyBXZWJwYWNrQ29tcGlsZXJIb3N0KF9jb21waWxlck9wdGlvbnMsIF9iYXNlUGF0aCk7XG4gICAgY29tcGlsZXJIb3N0LmVuYWJsZUNhY2hpbmcoKTtcbiAgICAvLyBXZSBkb24ndCBzZXQgYSBhc3luYyByZXNvdXJjZSBsb2FkZXIgb24gdGhlIGNvbXBpbGVyIGhvc3QgYmVjYXVzZSB3ZSBvbmx5IHN1cHBvcnRcbiAgICAvLyBodG1sIHRlbXBsYXRlcywgd2hpY2ggYXJlIHRoZSBvbmx5IG9uZXMgdGhhdCBjYW4gdGhyb3cgZXJyb3JzLCBhbmQgdGhvc2UgY2FuIGJlIGxvYWRlZFxuICAgIC8vIHN5bmNocm9ub3VzbHkuXG4gICAgLy8gSWYgd2UgbmVlZCB0byBhbHNvIHJlcG9ydCBlcnJvcnMgb24gc3R5bGVzIHRoZW4gd2UnbGwgbmVlZCB0byBhc2sgdGhlIG1haW4gdGhyZWFkXG4gICAgLy8gZm9yIHRoZXNlIHJlc291cmNlcy5cbiAgICB0aGlzLl9jb21waWxlckhvc3QgPSBjcmVhdGVDb21waWxlckhvc3Qoe1xuICAgICAgb3B0aW9uczogdGhpcy5fY29tcGlsZXJPcHRpb25zLFxuICAgICAgdHNIb3N0OiBjb21waWxlckhvc3QsXG4gICAgfSkgYXMgQ29tcGlsZXJIb3N0ICYgV2VicGFja0NvbXBpbGVySG9zdDtcbiAgICB0aW1lRW5kKCdUeXBlQ2hlY2tlci5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlKHJvb3ROYW1lczogc3RyaW5nW10sIGNoYW5nZWRDb21waWxhdGlvbkZpbGVzOiBzdHJpbmdbXSkge1xuICAgIHRpbWUoJ1R5cGVDaGVja2VyLl91cGRhdGUnKTtcbiAgICB0aGlzLl9yb290TmFtZXMgPSByb290TmFtZXM7XG4gICAgY2hhbmdlZENvbXBpbGF0aW9uRmlsZXMuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcbiAgICAgIHRoaXMuX2NvbXBpbGVySG9zdC5pbnZhbGlkYXRlKGZpbGVOYW1lKTtcbiAgICB9KTtcbiAgICB0aW1lRW5kKCdUeXBlQ2hlY2tlci5fdXBkYXRlJyk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPclVwZGF0ZVByb2dyYW0oKSB7XG4gICAgaWYgKHRoaXMuX0ppdE1vZGUpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgVHlwZVNjcmlwdCBwcm9ncmFtLlxuICAgICAgdGltZSgnVHlwZUNoZWNrZXIuX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbS50cy5jcmVhdGVQcm9ncmFtJyk7XG4gICAgICB0aGlzLl9wcm9ncmFtID0gdHMuY3JlYXRlUHJvZ3JhbShcbiAgICAgICAgdGhpcy5fcm9vdE5hbWVzLFxuICAgICAgICB0aGlzLl9jb21waWxlck9wdGlvbnMsXG4gICAgICAgIHRoaXMuX2NvbXBpbGVySG9zdCxcbiAgICAgICAgdGhpcy5fcHJvZ3JhbSBhcyB0cy5Qcm9ncmFtLFxuICAgICAgKSBhcyB0cy5Qcm9ncmFtO1xuICAgICAgdGltZUVuZCgnVHlwZUNoZWNrZXIuX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbS50cy5jcmVhdGVQcm9ncmFtJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWUoJ1R5cGVDaGVja2VyLl9jcmVhdGVPclVwZGF0ZVByb2dyYW0ubmcuY3JlYXRlUHJvZ3JhbScpO1xuICAgICAgLy8gQ3JlYXRlIHRoZSBBbmd1bGFyIHByb2dyYW0uXG4gICAgICB0aGlzLl9wcm9ncmFtID0gY3JlYXRlUHJvZ3JhbSh7XG4gICAgICAgIHJvb3ROYW1lczogdGhpcy5fcm9vdE5hbWVzLFxuICAgICAgICBvcHRpb25zOiB0aGlzLl9jb21waWxlck9wdGlvbnMsXG4gICAgICAgIGhvc3Q6IHRoaXMuX2NvbXBpbGVySG9zdCxcbiAgICAgICAgb2xkUHJvZ3JhbTogdGhpcy5fcHJvZ3JhbSBhcyBQcm9ncmFtLFxuICAgICAgfSkgYXMgUHJvZ3JhbTtcbiAgICAgIHRpbWVFbmQoJ1R5cGVDaGVja2VyLl9jcmVhdGVPclVwZGF0ZVByb2dyYW0ubmcuY3JlYXRlUHJvZ3JhbScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RpYWdub3NlKGNhbmNlbGxhdGlvblRva2VuOiBDYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIGNvbnN0IGFsbERpYWdub3N0aWNzID0gZ2F0aGVyRGlhZ25vc3RpY3MoXG4gICAgICB0aGlzLl9wcm9ncmFtLCB0aGlzLl9KaXRNb2RlLCAnVHlwZUNoZWNrZXInLCBjYW5jZWxsYXRpb25Ub2tlbik7XG5cbiAgICAvLyBSZXBvcnQgZGlhZ25vc3RpY3MuXG4gICAgaWYgKCFjYW5jZWxsYXRpb25Ub2tlbi5pc0NhbmNlbGxhdGlvblJlcXVlc3RlZCgpKSB7XG4gICAgICBjb25zdCBlcnJvcnMgPSBhbGxEaWFnbm9zdGljcy5maWx0ZXIoKGQpID0+IGQuY2F0ZWdvcnkgPT09IHRzLkRpYWdub3N0aWNDYXRlZ29yeS5FcnJvcik7XG4gICAgICBjb25zdCB3YXJuaW5ncyA9IGFsbERpYWdub3N0aWNzLmZpbHRlcigoZCkgPT4gZC5jYXRlZ29yeSA9PT0gdHMuRGlhZ25vc3RpY0NhdGVnb3J5Lldhcm5pbmcpO1xuXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGZvcm1hdERpYWdub3N0aWNzKGVycm9ycyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGVybWluYWwuYm9sZCh0ZXJtaW5hbC5yZWQoJ0VSUk9SIGluICcgKyBtZXNzYWdlKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgdGhlIGNoYW5nZWQgZmlsZSB0cmFja2VyIG9ubHkgaWYgdGhlcmUgYXJlIG5vIGVycm9ycy5cbiAgICAgICAgdGhpcy5fY29tcGlsZXJIb3N0LnJlc2V0Q2hhbmdlZEZpbGVUcmFja2VyKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh3YXJuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBmb3JtYXREaWFnbm9zdGljcyh3YXJuaW5ncyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRlcm1pbmFsLmJvbGQodGVybWluYWwueWVsbG93KCdXQVJOSU5HIGluICcgKyBtZXNzYWdlKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUocm9vdE5hbWVzOiBzdHJpbmdbXSwgY2hhbmdlZENvbXBpbGF0aW9uRmlsZXM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuOiBDYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIHRoaXMuX3VwZGF0ZShyb290TmFtZXMsIGNoYW5nZWRDb21waWxhdGlvbkZpbGVzKTtcbiAgICB0aGlzLl9jcmVhdGVPclVwZGF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLl9kaWFnbm9zZShjYW5jZWxsYXRpb25Ub2tlbik7XG4gIH1cbn1cbiJdfQ==