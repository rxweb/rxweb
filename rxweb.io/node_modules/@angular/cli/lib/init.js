"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
require("symbol-observable");
// symbol polyfill must go first
// tslint:disable-next-line:ordered-imports import-groups
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const fs = require("fs");
const path = require("path");
const semver_1 = require("semver");
const stream_1 = require("stream");
const config_1 = require("../utilities/config");
const packageJson = require('../package.json');
function _fromPackageJson(cwd) {
    cwd = cwd || process.cwd();
    do {
        const packageJsonPath = path.join(cwd, 'node_modules/@angular/cli/package.json');
        if (fs.existsSync(packageJsonPath)) {
            const content = fs.readFileSync(packageJsonPath, 'utf-8');
            if (content) {
                const json = JSON.parse(content);
                if (json['version']) {
                    return new semver_1.SemVer(json['version']);
                }
            }
        }
        // Check the parent.
        cwd = path.dirname(cwd);
    } while (cwd != path.dirname(cwd));
    return null;
}
// Check if we need to profile this CLI run.
if (process.env['NG_CLI_PROFILING']) {
    const profiler = require('v8-profiler'); // tslint:disable-line:no-implicit-dependencies
    profiler.startProfiling();
    const exitHandler = (options) => {
        if (options.cleanup) {
            const cpuProfile = profiler.stopProfiling();
            fs.writeFileSync(path.resolve(process.cwd(), process.env.NG_CLI_PROFILING || '') + '.cpuprofile', JSON.stringify(cpuProfile));
        }
        if (options.exit) {
            process.exit();
        }
    };
    process.on('exit', () => exitHandler({ cleanup: true }));
    process.on('SIGINT', () => exitHandler({ exit: true }));
    process.on('uncaughtException', () => exitHandler({ exit: true }));
}
let cli;
try {
    const projectLocalCli = node_1.resolve('@angular/cli', {
        checkGlobal: false,
        basedir: process.cwd(),
        preserveSymlinks: true,
    });
    // This was run from a global, check local version.
    const globalVersion = new semver_1.SemVer(packageJson['version']);
    let localVersion;
    let shouldWarn = false;
    try {
        localVersion = _fromPackageJson();
        shouldWarn = localVersion != null && globalVersion.compare(localVersion) > 0;
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        shouldWarn = true;
    }
    if (shouldWarn && config_1.isWarningEnabled('versionMismatch')) {
        const warning = core_1.terminal.yellow(core_1.tags.stripIndents `
    Your global Angular CLI version (${globalVersion}) is greater than your local
    version (${localVersion}). The local Angular CLI version is used.

    To disable this warning use "ng config -g cli.warnings.versionMismatch false".
    `);
        // Don't show warning colorised on `ng completion`
        if (process.argv[2] !== 'completion') {
            // eslint-disable-next-line no-console
            console.log(warning);
        }
        else {
            // eslint-disable-next-line no-console
            console.error(warning);
            process.exit(1);
        }
    }
    // No error implies a projectLocalCli, which will load whatever
    // version of ng-cli you have installed in a local package.json
    cli = require(projectLocalCli);
}
catch (_a) {
    // If there is an error, resolve could not find the ng-cli
    // library from a package.json. Instead, include it from a relative
    // path to this script file (which is likely a globally installed
    // npm package). Most common cause for hitting this is `ng new`
    cli = require('./cli');
}
if ('default' in cli) {
    cli = cli['default'];
}
// This is required to support 1.x local versions with a 6+ global
let standardInput;
try {
    standardInput = process.stdin;
}
catch (e) {
    delete process.stdin;
    process.stdin = new stream_1.Duplex();
    standardInput = process.stdin;
}
cli({
    cliArgs: process.argv.slice(2),
    inputStream: standardInput,
    outputStream: process.stdout,
})
    .then((exitCode) => {
    process.exit(exitCode);
})
    .catch((err) => {
    console.log('Unknown error: ' + err.toString());
    process.exit(127);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvbGliL2luaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw2QkFBMkI7QUFDM0IsZ0NBQWdDO0FBQ2hDLHlEQUF5RDtBQUN6RCwrQ0FBc0Q7QUFDdEQsb0RBQW9EO0FBQ3BELHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsbUNBQWdDO0FBQ2hDLG1DQUFnQztBQUNoQyxnREFBdUQ7QUFFdkQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFL0MsMEJBQTBCLEdBQVk7SUFDcEMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFM0IsR0FBRztRQUNELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLHdDQUF3QyxDQUFDLENBQUM7UUFDakYsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFELElBQUksT0FBTyxFQUFFO2dCQUNYLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNuQixPQUFPLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUNwQzthQUNGO1NBQ0Y7UUFFRCxvQkFBb0I7UUFDcEIsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekIsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtJQUVuQyxPQUFPLElBQUksQ0FBQztB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IFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgJ3N5bWJvbC1vYnNlcnZhYmxlJztcbi8vIHN5bWJvbCBwb2x5ZmlsbCBtdXN0IGdvIGZpcnN0XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b3JkZXJlZC1pbXBvcnRzIGltcG9ydC1ncm91cHNcbmltcG9ydCB7IHRhZ3MsIHRlcm1pbmFsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlL25vZGUnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFNlbVZlciB9IGZyb20gJ3NlbXZlcic7XG5pbXBvcnQgeyBEdXBsZXggfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgaXNXYXJuaW5nRW5hYmxlZCB9IGZyb20gJy4uL3V0aWxpdGllcy9jb25maWcnO1xuXG5jb25zdCBwYWNrYWdlSnNvbiA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuXG5mdW5jdGlvbiBfZnJvbVBhY2thZ2VKc29uKGN3ZD86IHN0cmluZykge1xuICBjd2QgPSBjd2QgfHwgcHJvY2Vzcy5jd2QoKTtcblxuICBkbyB7XG4gICAgY29uc3QgcGFja2FnZUpzb25QYXRoID0gcGF0aC5qb2luKGN3ZCwgJ25vZGVfbW9kdWxlcy9AYW5ndWxhci9jbGkvcGFja2FnZS5qc29uJyk7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGFja2FnZUpzb25QYXRoKSkge1xuICAgICAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhwYWNrYWdlSnNvblBhdGgsICd1dGYtOCcpO1xuICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgIGlmIChqc29uWyd2ZXJzaW9uJ10pIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFNlbVZlcihqc29uWyd2ZXJzaW9uJ10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhlIHBhcmVudC5cbiAgICBjd2QgPSBwYXRoLmRpcm5hbWUoY3dkKTtcbiAgfSB3aGlsZSAoY3dkICE9IHBhdGguZGlybmFtZShjd2QpKTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuXG4vLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHByb2ZpbGUgdGhpcyBDTEkgcnVuLlxuaWYgKHByb2Nlc3MuZW52WydOR19DTElfUFJPRklMSU5HJ10pIHtcbiAgY29uc3QgcHJvZmlsZXIgPSByZXF1aXJlKCd2OC1wcm9maWxlcicpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llc1xuICBwcm9maWxlci5zdGFydFByb2ZpbGluZygpO1xuICBjb25zdCBleGl0SGFuZGxlciA9IChvcHRpb25zOiB7IGNsZWFudXA/OiBib29sZWFuLCBleGl0PzogYm9vbGVhbiB9KSA9PiB7XG4gICAgaWYgKG9wdGlvbnMuY2xlYW51cCkge1xuICAgICAgY29uc3QgY3B1UHJvZmlsZSA9IHByb2ZpbGVyLnN0b3BQcm9maWxpbmcoKTtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBwcm9jZXNzLmVudi5OR19DTElfUFJPRklMSU5HIHx8ICcnKSArICcuY3B1cHJvZmlsZScsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGNwdVByb2ZpbGUpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5leGl0KSB7XG4gICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9XG4gIH07XG5cbiAgcHJvY2Vzcy5vbignZXhpdCcsICgpID0+IGV4aXRIYW5kbGVyKHsgY2xlYW51cDogdHJ1ZSB9KSk7XG4gIHByb2Nlc3Mub24oJ1NJR0lOVCcsICgpID0+IGV4aXRIYW5kbGVyKHsgZXhpdDogdHJ1ZSB9KSk7XG4gIHByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKCkgPT4gZXhpdEhhbmRsZXIoeyBleGl0OiB0cnVlIH0pKTtcbn1cblxubGV0IGNsaTtcbnRyeSB7XG4gIGNvbnN0IHByb2plY3RMb2NhbENsaSA9IHJlc29sdmUoXG4gICAgJ0Bhbmd1bGFyL2NsaScsXG4gICAge1xuICAgICAgY2hlY2tHbG9iYWw6IGZhbHNlLFxuICAgICAgYmFzZWRpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXG4gICAgfSxcbiAgKTtcblxuICAvLyBUaGlzIHdhcyBydW4gZnJvbSBhIGdsb2JhbCwgY2hlY2sgbG9jYWwgdmVyc2lvbi5cbiAgY29uc3QgZ2xvYmFsVmVyc2lvbiA9IG5ldyBTZW1WZXIocGFja2FnZUpzb25bJ3ZlcnNpb24nXSk7XG4gIGxldCBsb2NhbFZlcnNpb247XG4gIGxldCBzaG91bGRXYXJuID0gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICBsb2NhbFZlcnNpb24gPSBfZnJvbVBhY2thZ2VKc29uKCk7XG4gICAgc2hvdWxkV2FybiA9IGxvY2FsVmVyc2lvbiAhPSBudWxsICYmIGdsb2JhbFZlcnNpb24uY29tcGFyZShsb2NhbFZlcnNpb24pID4gMDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgICBzaG91bGRXYXJuID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChzaG91bGRXYXJuICYmIGlzV2FybmluZ0VuYWJsZWQoJ3ZlcnNpb25NaXNtYXRjaCcpKSB7XG4gICAgY29uc3Qgd2FybmluZyA9IHRlcm1pbmFsLnllbGxvdyh0YWdzLnN0cmlwSW5kZW50c2BcbiAgICBZb3VyIGdsb2JhbCBBbmd1bGFyIENMSSB2ZXJzaW9uICgke2dsb2JhbFZlcnNpb259KSBpcyBncmVhdGVyIHRoYW4geW91ciBsb2NhbFxuICAgIHZlcnNpb24gKCR7bG9jYWxWZXJzaW9ufSkuIFRoZSBsb2NhbCBBbmd1bGFyIENMSSB2ZXJzaW9uIGlzIHVzZWQuXG5cbiAgICBUbyBkaXNhYmxlIHRoaXMgd2FybmluZyB1c2UgXCJuZyBjb25maWcgLWcgY2xpLndhcm5pbmdzLnZlcnNpb25NaXNtYXRjaCBmYWxzZVwiLlxuICAgIGApO1xuICAgIC8vIERvbid0IHNob3cgd2FybmluZyBjb2xvcmlzZWQgb24gYG5nIGNvbXBsZXRpb25gXG4gICAgaWYgKHByb2Nlc3MuYXJndlsyXSAhPT0gJ2NvbXBsZXRpb24nKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZyh3YXJuaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5lcnJvcih3YXJuaW5nKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gIH1cblxuICAvLyBObyBlcnJvciBpbXBsaWVzIGEgcHJvamVjdExvY2FsQ2xpLCB3aGljaCB3aWxsIGxvYWQgd2hhdGV2ZXJcbiAgLy8gdmVyc2lvbiBvZiBuZy1jbGkgeW91IGhhdmUgaW5zdGFsbGVkIGluIGEgbG9jYWwgcGFja2FnZS5qc29uXG4gIGNsaSA9IHJlcXVpcmUocHJvamVjdExvY2FsQ2xpKTtcbn0gY2F0Y2gge1xuICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciwgcmVzb2x2ZSBjb3VsZCBub3QgZmluZCB0aGUgbmctY2xpXG4gIC8vIGxpYnJhcnkgZnJvbSBhIHBhY2thZ2UuanNvbi4gSW5zdGVhZCwgaW5jbHVkZSBpdCBmcm9tIGEgcmVsYXRpdmVcbiAgLy8gcGF0aCB0byB0aGlzIHNjcmlwdCBmaWxlICh3aGljaCBpcyBsaWtlbHkgYSBnbG9iYWxseSBpbnN0YWxsZWRcbiAgLy8gbnBtIHBhY2thZ2UpLiBNb3N0IGNvbW1vbiBjYXVzZSBmb3IgaGl0dGluZyB0aGlzIGlzIGBuZyBuZXdgXG4gIGNsaSA9IHJlcXVpcmUoJy4vY2xpJyk7XG59XG5cbmlmICgnZGVmYXVsdCcgaW4gY2xpKSB7XG4gIGNsaSA9IGNsaVsnZGVmYXVsdCddO1xufVxuXG4vLyBUaGlzIGlzIHJlcXVpcmVkIHRvIHN1cHBvcnQgMS54IGxvY2FsIHZlcnNpb25zIHdpdGggYSA2KyBnbG9iYWxcbmxldCBzdGFuZGFyZElucHV0O1xudHJ5IHtcbiAgc3RhbmRhcmRJbnB1dCA9IHByb2Nlc3Muc3RkaW47XG59IGNhdGNoIChlKSB7XG4gIGRlbGV0ZSBwcm9jZXNzLnN0ZGluO1xuICBwcm9jZXNzLnN0ZGluID0gbmV3IER1cGxleCgpO1xuICBzdGFuZGFyZElucHV0ID0gcHJvY2Vzcy5zdGRpbjtcbn1cblxuY2xpKHtcbiAgY2xpQXJnczogcHJvY2Vzcy5hcmd2LnNsaWNlKDIpLFxuICBpbnB1dFN0cmVhbTogc3RhbmRhcmRJbnB1dCxcbiAgb3V0cHV0U3RyZWFtOiBwcm9jZXNzLnN0ZG91dCxcbn0pXG4gIC50aGVuKChleGl0Q29kZTogbnVtYmVyKSA9PiB7XG4gICAgcHJvY2Vzcy5leGl0KGV4aXRDb2RlKTtcbiAgfSlcbiAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1Vua25vd24gZXJyb3I6ICcgKyBlcnIudG9TdHJpbmcoKSk7XG4gICAgcHJvY2Vzcy5leGl0KDEyNyk7XG4gIH0pO1xuIl19