"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const path = require("path");
const semver_1 = require("semver");
const config_1 = require("../utilities/config");
const require_project_module_1 = require("../utilities/require-project-module");
class Version {
    constructor(_version = null) {
        this._version = _version;
        this._semver = null;
        this._semver = _version ? new semver_1.SemVer(_version) : null;
    }
    isAlpha() { return this.qualifier == 'alpha'; }
    isBeta() { return this.qualifier == 'beta'; }
    isReleaseCandidate() { return this.qualifier == 'rc'; }
    isKnown() { return this._version !== null; }
    isLocal() { return this.isKnown() && this._version && path.isAbsolute(this._version); }
    isGreaterThanOrEqualTo(other) {
        return this._semver !== null && this._semver.compare(other) >= 0;
    }
    get major() { return this._semver ? this._semver.major : 0; }
    get minor() { return this._semver ? this._semver.minor : 0; }
    get patch() { return this._semver ? this._semver.patch : 0; }
    get qualifier() { return this._semver ? this._semver.prerelease[0] : ''; }
    get extra() { return this._semver ? this._semver.prerelease[1] : ''; }
    toString() { return this._version; }
    static assertCompatibleAngularVersion(projectRoot) {
        let angularPkgJson;
        let rxjsPkgJson;
        const isInside = (base, potential) => {
            const absoluteBase = path.resolve(base);
            const absolutePotential = path.resolve(potential);
            const relativePotential = path.relative(absoluteBase, absolutePotential);
            if (!relativePotential.startsWith('..') && !path.isAbsolute(relativePotential)) {
                return true;
            }
            return false;
        };
        try {
            const resolveOptions = {
                basedir: projectRoot,
                checkGlobal: false,
                checkLocal: true,
            };
            const angularPackagePath = node_1.resolve('@angular/core/package.json', resolveOptions);
            const rxjsPackagePath = node_1.resolve('rxjs/package.json', resolveOptions);
            if (!isInside(projectRoot, angularPackagePath)
                || !isInside(projectRoot, rxjsPackagePath)) {
                throw new Error();
            }
            angularPkgJson = require(angularPackagePath);
            rxjsPkgJson = require(rxjsPackagePath);
        }
        catch (_a) {
            console.error(core_1.terminal.bold(core_1.terminal.red(core_1.tags.stripIndents `
        You seem to not be depending on "@angular/core" and/or "rxjs". This is an error.
      `)));
            process.exit(2);
        }
        if (!(angularPkgJson && angularPkgJson['version'] && rxjsPkgJson && rxjsPkgJson['version'])) {
            console.error(core_1.terminal.bold(core_1.terminal.red(core_1.tags.stripIndents `
        Cannot determine versions of "@angular/core" and/or "rxjs".
        This likely means your local installation is broken. Please reinstall your packages.
      `)));
            process.exit(2);
        }
        const angularVersion = new Version(angularPkgJson['version']);
        const rxjsVersion = new Version(rxjsPkgJson['version']);
        if (angularVersion.isLocal()) {
            console.warn(core_1.terminal.yellow('Using a local version of angular. Proceeding with care...'));
            return;
        }
        if (!angularVersion.isGreaterThanOrEqualTo(new semver_1.SemVer('5.0.0'))) {
            console.error(core_1.terminal.bold(core_1.terminal.red(core_1.tags.stripIndents `
          This version of CLI is only compatible with Angular version 5.0.0 or higher.

          Please visit the link below to find instructions on how to update Angular.
          https://angular-update-guide.firebaseapp.com/
        ` + '\n')));
            process.exit(3);
        }
        else if (angularVersion.isGreaterThanOrEqualTo(new semver_1.SemVer('6.0.0-rc.0'))
            && !rxjsVersion.isGreaterThanOrEqualTo(new semver_1.SemVer('5.6.0-forward-compat.0'))
            && !rxjsVersion.isGreaterThanOrEqualTo(new semver_1.SemVer('6.0.0-beta.0'))) {
            console.error(core_1.terminal.bold(core_1.terminal.red(core_1.tags.stripIndents `
          This project uses version ${rxjsVersion} of RxJs, which is not supported by Angular v6.
          The official RxJs version that is supported is 5.6.0-forward-compat.0 and greater.

          Please visit the link below to find instructions on how to update RxJs.
          https://docs.google.com/document/d/12nlLt71VLKb-z3YaSGzUfx6mJbc34nsMXtByPUN35cg/edit#
        ` + '\n')));
            process.exit(3);
        }
        else if (angularVersion.isGreaterThanOrEqualTo(new semver_1.SemVer('6.0.0-rc.0'))
            && !rxjsVersion.isGreaterThanOrEqualTo(new semver_1.SemVer('6.0.0-beta.0'))) {
            console.warn(core_1.terminal.bold(core_1.terminal.red(core_1.tags.stripIndents `
          This project uses a temporary compatibility version of RxJs (${rxjsVersion}).

          Please visit the link below to find instructions on how to update RxJs.
          https://docs.google.com/document/d/12nlLt71VLKb-z3YaSGzUfx6mJbc34nsMXtByPUN35cg/edit#
        ` + '\n')));
        }
    }
    static assertTypescriptVersion(projectRoot) {
        if (!config_1.isWarningEnabled('typescriptMismatch')) {
            return;
        }
        let compilerVersion, tsVersion;
        try {
            compilerVersion = require_project_module_1.requireProjectModule(projectRoot, '@angular/compiler-cli').VERSION.full;
            tsVersion = require_project_module_1.requireProjectModule(projectRoot, 'typescript').version;
        }
        catch (_a) {
            console.error(core_1.terminal.bold(core_1.terminal.red(core_1.tags.stripIndents `
        Versions of @angular/compiler-cli and typescript could not be determined.
        The most common reason for this is a broken npm install.

        Please make sure your package.json contains both @angular/compiler-cli and typescript in
        devDependencies, then delete node_modules and package-lock.json (if you have one) and
        run npm install again.
      `)));
            process.exit(2);
            return;
        }
        const versionCombos = [
            { compiler: '>=2.3.1 <3.0.0', typescript: '>=2.0.2 <2.3.0' },
            { compiler: '>=4.0.0-beta.0 <5.0.0', typescript: '>=2.1.0 <2.4.0' },
            { compiler: '>=5.0.0-beta.0 <5.1.0', typescript: '>=2.4.2 <2.5.0' },
            { compiler: '>=5.1.0-beta.0 <5.2.0', typescript: '>=2.4.2 <2.6.0' },
            { compiler: '>=5.2.0-beta.0 <6.0.0', typescript: '>=2.4.2 <2.7.0' },
            { compiler: '>=6.0.0-beta.0 <6.1.0-beta.0', typescript: '>=2.7.0 <2.8.0' },
            { compiler: '>=6.1.0-beta.0 <6.1.0-rc.0', typescript: '>=2.7.2 <2.9.0' },
            { compiler: '>=6.1.0-rc.0 <7.0.0', typescript: '>=2.7.2 <2.10.0' },
        ];
        const currentCombo = versionCombos.find((combo) => semver_1.satisfies(compilerVersion, combo.compiler));
        if (currentCombo && !semver_1.satisfies(tsVersion, currentCombo.typescript)) {
            // First line of warning looks weird being split in two, disable tslint for it.
            console.log((core_1.terminal.yellow('\n' + core_1.tags.stripIndent `
        @angular/compiler-cli@${compilerVersion} requires typescript@'${currentCombo.typescript}' but ${tsVersion} was found instead.
        Using this version can result in undefined behaviour and difficult to debug problems.

        Please run the following command to install a compatible version of TypeScript.

            npm install typescript@'${currentCombo.typescript}'

        To disable this warning run "ng config cli.warnings.typescriptMismatch false".
      ` + '\n')));
        }
    }
}
exports.Version = Version;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvdXBncmFkZS92ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsK0NBQXNEO0FBQ3RELG9EQUFvRDtBQUNwRCw2QkFBNkI7QUFDN0IsbUNBQTJDO0FBQzNDLGdEQUF1RDtBQUN2RCxnRkFBMkU7QUFHM0U7SUFFRSxZQUFvQixXQUEwQixJQUFJO1FBQTlCLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBRDFDLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3hELENBQUM7SUFFRCxPQUFPLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3QyxrQkFBa0IsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTVDLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLHNCQUFzQixDQUFDLEtBQWE7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFD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SUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxrQkFBUyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUUvRixFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxrQkFBUyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLCtFQUErRTtZQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsV0FBSSxDQUFDLFdBQVcsQ0FBQTtnQ0FDMUIsZUFBZSx5QkFDdkMsWUFBWSxDQUFDLFVBQVUsU0FBUyxTQUFTOzs7OztzQ0FLWCxZQUFZLENBQUMsVUFBVTs7O09BR3RELEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7Q0FFRjtBQXBLRCwwQkFvS0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IHRhZ3MsIHRlcm1pbmFsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlL25vZGUnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFNlbVZlciwgc2F0aXNmaWVzIH0gZnJvbSAnc2VtdmVyJztcbmltcG9ydCB7IGlzV2FybmluZ0VuYWJsZWQgfSBmcm9tICcuLi91dGlsaXRpZXMvY29uZmlnJztcbmltcG9ydCB7IHJlcXVpcmVQcm9qZWN0TW9kdWxlIH0gZnJvbSAnLi4vdXRpbGl0aWVzL3JlcXVpcmUtcHJvamVjdC1tb2R1bGUnO1xuXG5cbmV4cG9ydCBjbGFzcyBWZXJzaW9uIHtcbiAgcHJpdmF0ZSBfc2VtdmVyOiBTZW1WZXIgfCBudWxsID0gbnVsbDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmVyc2lvbjogc3RyaW5nIHwgbnVsbCA9IG51bGwpIHtcbiAgICB0aGlzLl9zZW12ZXIgPSBfdmVyc2lvbiA/IG5ldyBTZW1WZXIoX3ZlcnNpb24pIDogbnVsbDtcbiAgfVxuXG4gIGlzQWxwaGEoKSB7IHJldHVybiB0aGlzLnF1YWxpZmllciA9PSAnYWxwaGEnOyB9XG4gIGlzQmV0YSgpIHsgcmV0dXJuIHRoaXMucXVhbGlmaWVyID09ICdiZXRhJzsgfVxuICBpc1JlbGVhc2VDYW5kaWRhdGUoKSB7IHJldHVybiB0aGlzLnF1YWxpZmllciA9PSAncmMnOyB9XG4gIGlzS25vd24oKSB7IHJldHVybiB0aGlzLl92ZXJzaW9uICE9PSBudWxsOyB9XG5cbiAgaXNMb2NhbCgpIHsgcmV0dXJuIHRoaXMuaXNLbm93bigpICYmIHRoaXMuX3ZlcnNpb24gJiYgcGF0aC5pc0Fic29sdXRlKHRoaXMuX3ZlcnNpb24pOyB9XG4gIGlzR3JlYXRlclRoYW5PckVxdWFsVG8ob3RoZXI6IFNlbVZlcikge1xuICAgIHJldHVybiB0aGlzLl9zZW12ZXIgIT09IG51bGwgJiYgdGhpcy5fc2VtdmVyLmNvbXBhcmUob3RoZXIpID49IDA7XG4gIH1cblxuICBnZXQgbWFqb3IoKSB7IHJldHVybiB0aGlzLl9zZW12ZXIgPyB0aGlzLl9zZW12ZXIubWFqb3IgOiAwOyB9XG4gIGdldCBtaW5vcigpIHsgcmV0dXJuIHRoaXMuX3NlbXZlciA/IHRoaXMuX3NlbXZlci5taW5vciA6IDA7IH1cbiAgZ2V0IHBhdGNoKCkgeyByZXR1cm4gdGhpcy5fc2VtdmVyID8gdGhpcy5fc2VtdmVyLnBhdGNoIDogMDsgfVxuICBnZXQgcXVhbGlmaWVyKCkgeyByZXR1cm4gdGhpcy5fc2VtdmVyID8gdGhpcy5fc2VtdmVyLnByZXJlbGVhc2VbMF0gOiAnJzsgfVxuICBnZXQgZXh0cmEoKSB7IHJldHVybiB0aGlzLl9zZW12ZXIgPyB0aGlzLl9zZW12ZXIucHJlcmVsZWFzZVsxXSA6ICcnOyB9XG5cbiAgdG9TdHJpbmcoKSB7IHJldHVybiB0aGlzLl92ZXJzaW9uOyB9XG5cbiAgc3RhdGljIGFzc2VydENvbXBhdGlibGVBbmd1bGFyVmVyc2lvbihwcm9qZWN0Um9vdDogc3RyaW5nKSB7XG4gICAgbGV0IGFuZ3VsYXJQa2dKc29uO1xuICAgIGxldCByeGpzUGtnSnNvbjtcblxuICAgIGNvbnN0IGlzSW5zaWRlID0gKGJhc2U6IHN0cmluZywgcG90ZW50aWFsOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgIGNvbnN0IGFic29sdXRlQmFzZSA9IHBhdGgucmVzb2x2ZShiYXNlKTtcbiAgICAgIGNvbnN0IGFic29sdXRlUG90ZW50aWFsID0gcGF0aC5yZXNvbHZlKHBvdGVudGlhbCk7XG4gICAgICBjb25zdCByZWxhdGl2ZVBvdGVudGlhbCA9IHBhdGgucmVsYXRpdmUoYWJzb2x1dGVCYXNlLCBhYnNvbHV0ZVBvdGVudGlhbCk7XG4gICAgICBpZiAoIXJlbGF0aXZlUG90ZW50aWFsLnN0YXJ0c1dpdGgoJy4uJykgJiYgIXBhdGguaXNBYnNvbHV0ZShyZWxhdGl2ZVBvdGVudGlhbCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc29sdmVPcHRpb25zID0ge1xuICAgICAgICBiYXNlZGlyOiBwcm9qZWN0Um9vdCxcbiAgICAgICAgY2hlY2tHbG9iYWw6IGZhbHNlLFxuICAgICAgICBjaGVja0xvY2FsOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGFuZ3VsYXJQYWNrYWdlUGF0aCA9IHJlc29sdmUoJ0Bhbmd1bGFyL2NvcmUvcGFja2FnZS5qc29uJywgcmVzb2x2ZU9wdGlvbnMpO1xuICAgICAgY29uc3Qgcnhqc1BhY2thZ2VQYXRoID0gcmVzb2x2ZSgncnhqcy9wYWNrYWdlLmpzb24nLCByZXNvbHZlT3B0aW9ucyk7XG5cbiAgICAgIGlmICghaXNJbnNpZGUocHJvamVjdFJvb3QsIGFuZ3VsYXJQYWNrYWdlUGF0aClcbiAgICAgICAgICB8fCAhaXNJbnNpZGUocHJvamVjdFJvb3QsIHJ4anNQYWNrYWdlUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICB9XG5cbiAgICAgIGFuZ3VsYXJQa2dKc29uID0gcmVxdWlyZShhbmd1bGFyUGFja2FnZVBhdGgpO1xuICAgICAgcnhqc1BrZ0pzb24gPSByZXF1aXJlKHJ4anNQYWNrYWdlUGF0aCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBjb25zb2xlLmVycm9yKHRlcm1pbmFsLmJvbGQodGVybWluYWwucmVkKHRhZ3Muc3RyaXBJbmRlbnRzYFxuICAgICAgICBZb3Ugc2VlbSB0byBub3QgYmUgZGVwZW5kaW5nIG9uIFwiQGFuZ3VsYXIvY29yZVwiIGFuZC9vciBcInJ4anNcIi4gVGhpcyBpcyBhbiBlcnJvci5cbiAgICAgIGApKSk7XG4gICAgICBwcm9jZXNzLmV4aXQoMik7XG4gICAgfVxuXG4gICAgaWYgKCEoYW5ndWxhclBrZ0pzb24gJiYgYW5ndWxhclBrZ0pzb25bJ3ZlcnNpb24nXSAmJiByeGpzUGtnSnNvbiAmJiByeGpzUGtnSnNvblsndmVyc2lvbiddKSkge1xuICAgICAgY29uc29sZS5lcnJvcih0ZXJtaW5hbC5ib2xkKHRlcm1pbmFsLnJlZCh0YWdzLnN0cmlwSW5kZW50c2BcbiAgICAgICAgQ2Fubm90IGRldGVybWluZSB2ZXJzaW9ucyBvZiBcIkBhbmd1bGFyL2NvcmVcIiBhbmQvb3IgXCJyeGpzXCIuXG4gICAgICAgIFRoaXMgbGlrZWx5IG1lYW5zIHlvdXIgbG9jYWwgaW5zdGFsbGF0aW9uIGlzIGJyb2tlbi4gUGxlYXNlIHJlaW5zdGFsbCB5b3VyIHBhY2thZ2VzLlxuICAgICAgYCkpKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgyKTtcbiAgICB9XG5cbiAgICBjb25zdCBhbmd1bGFyVmVyc2lvbiA9IG5ldyBWZXJzaW9uKGFuZ3VsYXJQa2dKc29uWyd2ZXJzaW9uJ10pO1xuICAgIGNvbnN0IHJ4anNWZXJzaW9uID0gbmV3IFZlcnNpb24ocnhqc1BrZ0pzb25bJ3ZlcnNpb24nXSk7XG5cbiAgICBpZiAoYW5ndWxhclZlcnNpb24uaXNMb2NhbCgpKSB7XG4gICAgICBjb25zb2xlLndhcm4odGVybWluYWwueWVsbG93KCdVc2luZyBhIGxvY2FsIHZlcnNpb24gb2YgYW5ndWxhci4gUHJvY2VlZGluZyB3aXRoIGNhcmUuLi4nKSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWFuZ3VsYXJWZXJzaW9uLmlzR3JlYXRlclRoYW5PckVxdWFsVG8obmV3IFNlbVZlcignNS4wLjAnKSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IodGVybWluYWwuYm9sZCh0ZXJtaW5hbC5yZWQodGFncy5zdHJpcEluZGVudHNgXG4gICAgICAgICAgVGhpcyB2ZXJzaW9uIG9mIENMSSBpcyBvbmx5IGNvbXBhdGlibGUgd2l0aCBBbmd1bGFyIHZlcnNpb24gNS4wLjAgb3IgaGlnaGVyLlxuXG4gICAgICAgICAgUGxlYXNlIHZpc2l0IHRoZSBsaW5rIGJlbG93IHRvIGZpbmQgaW5zdHJ1Y3Rpb25zIG9uIGhvdyB0byB1cGRhdGUgQW5ndWxhci5cbiAgICAgICAgICBodHRwczovL2FuZ3VsYXItdXBkYXRlLWd1aWRlLmZpcmViYXNlYXBwLmNvbS9cbiAgICAgICAgYCArICdcXG4nKSkpO1xuICAgICAgcHJvY2Vzcy5leGl0KDMpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBhbmd1bGFyVmVyc2lvbi5pc0dyZWF0ZXJUaGFuT3JFcXVhbFRvKG5ldyBTZW1WZXIoJzYuMC4wLXJjLjAnKSlcbiAgICAgICYmICFyeGpzVmVyc2lvbi5pc0dyZWF0ZXJUaGFuT3JFcXVhbFRvKG5ldyBTZW1WZXIoJzUuNi4wLWZvcndhcmQtY29tcGF0LjAnKSlcbiAgICAgICYmICFyeGpzVmVyc2lvbi5pc0dyZWF0ZXJUaGFuT3JFcXVhbFRvKG5ldyBTZW1WZXIoJzYuMC4wLWJldGEuMCcpKVxuICAgICkge1xuICAgICAgY29uc29sZS5lcnJvcih0ZXJtaW5hbC5ib2xkKHRlcm1pbmFsLnJlZCh0YWdzLnN0cmlwSW5kZW50c2BcbiAgICAgICAgICBUaGlzIHByb2plY3QgdXNlcyB2ZXJzaW9uICR7cnhqc1ZlcnNpb259IG9mIFJ4SnMsIHdoaWNoIGlzIG5vdCBzdXBwb3J0ZWQgYnkgQW5ndWxhciB2Ni5cbiAgICAgICAgICBUaGUgb2ZmaWNpYWwgUnhKcyB2ZXJzaW9uIHRoYXQgaXMgc3VwcG9ydGVkIGlzIDUuNi4wLWZvcndhcmQtY29tcGF0LjAgYW5kIGdyZWF0ZXIuXG5cbiAgICAgICAgICBQbGVhc2UgdmlzaXQgdGhlIGxpbmsgYmVsb3cgdG8gZmluZCBpbnN0cnVjdGlvbnMgb24gaG93IHRvIHVwZGF0ZSBSeEpzLlxuICAgICAgICAgIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMTJubEx0NzFWTEtiLXozWWFTR3pVZng2bUpiYzM0bnNNWHRCeVBVTjM1Y2cvZWRpdCNcbiAgICAgICAgYCArICdcXG4nKSkpO1xuICAgICAgcHJvY2Vzcy5leGl0KDMpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBhbmd1bGFyVmVyc2lvbi5pc0dyZWF0ZXJUaGFuT3JFcXVhbFRvKG5ldyBTZW1WZXIoJzYuMC4wLXJjLjAnKSlcbiAgICAgICYmICFyeGpzVmVyc2lvbi5pc0dyZWF0ZXJUaGFuT3JFcXVhbFRvKG5ldyBTZW1WZXIoJzYuMC4wLWJldGEuMCcpKVxuICAgICkge1xuICAgICAgY29uc29sZS53YXJuKHRlcm1pbmFsLmJvbGQodGVybWluYWwucmVkKHRhZ3Muc3RyaXBJbmRlbnRzYFxuICAgICAgICAgIFRoaXMgcHJvamVjdCB1c2VzIGEgdGVtcG9yYXJ5IGNvbXBhdGliaWxpdHkgdmVyc2lvbiBvZiBSeEpzICgke3J4anNWZXJzaW9ufSkuXG5cbiAgICAgICAgICBQbGVhc2UgdmlzaXQgdGhlIGxpbmsgYmVsb3cgdG8gZmluZCBpbnN0cnVjdGlvbnMgb24gaG93IHRvIHVwZGF0ZSBSeEpzLlxuICAgICAgICAgIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMTJubEx0NzFWTEtiLXozWWFTR3pVZng2bUpiYzM0bnNNWHRCeVBVTjM1Y2cvZWRpdCNcbiAgICAgICAgYCArICdcXG4nKSkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3NlcnRUeXBlc2NyaXB0VmVyc2lvbihwcm9qZWN0Um9vdDogc3RyaW5nKSB7XG4gICAgaWYgKCFpc1dhcm5pbmdFbmFibGVkKCd0eXBlc2NyaXB0TWlzbWF0Y2gnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgY29tcGlsZXJWZXJzaW9uOiBzdHJpbmcsIHRzVmVyc2lvbjogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBjb21waWxlclZlcnNpb24gPSByZXF1aXJlUHJvamVjdE1vZHVsZShwcm9qZWN0Um9vdCwgJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaScpLlZFUlNJT04uZnVsbDtcbiAgICAgIHRzVmVyc2lvbiA9IHJlcXVpcmVQcm9qZWN0TW9kdWxlKHByb2plY3RSb290LCAndHlwZXNjcmlwdCcpLnZlcnNpb247XG4gICAgfSBjYXRjaCB7XG4gICAgICBjb25zb2xlLmVycm9yKHRlcm1pbmFsLmJvbGQodGVybWluYWwucmVkKHRhZ3Muc3RyaXBJbmRlbnRzYFxuICAgICAgICBWZXJzaW9ucyBvZiBAYW5ndWxhci9jb21waWxlci1jbGkgYW5kIHR5cGVzY3JpcHQgY291bGQgbm90IGJlIGRldGVybWluZWQuXG4gICAgICAgIFRoZSBtb3N0IGNvbW1vbiByZWFzb24gZm9yIHRoaXMgaXMgYSBicm9rZW4gbnBtIGluc3RhbGwuXG5cbiAgICAgICAgUGxlYXNlIG1ha2Ugc3VyZSB5b3VyIHBhY2thZ2UuanNvbiBjb250YWlucyBib3RoIEBhbmd1bGFyL2NvbXBpbGVyLWNsaSBhbmQgdHlwZXNjcmlwdCBpblxuICAgICAgICBkZXZEZXBlbmRlbmNpZXMsIHRoZW4gZGVsZXRlIG5vZGVfbW9kdWxlcyBhbmQgcGFja2FnZS1sb2NrLmpzb24gKGlmIHlvdSBoYXZlIG9uZSkgYW5kXG4gICAgICAgIHJ1biBucG0gaW5zdGFsbCBhZ2Fpbi5cbiAgICAgIGApKSk7XG4gICAgICBwcm9jZXNzLmV4aXQoMik7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJzaW9uQ29tYm9zID0gW1xuICAgICAgeyBjb21waWxlcjogJz49Mi4zLjEgPDMuMC4wJywgdHlwZXNjcmlwdDogJz49Mi4wLjIgPDIuMy4wJyB9LFxuICAgICAgeyBjb21waWxlcjogJz49NC4wLjAtYmV0YS4wIDw1LjAuMCcsIHR5cGVzY3JpcHQ6ICc+PTIuMS4wIDwyLjQuMCcgfSxcbiAgICAgIHsgY29tcGlsZXI6ICc+PTUuMC4wLWJldGEuMCA8NS4xLjAnLCB0eXBlc2NyaXB0OiAnPj0yLjQuMiA8Mi41LjAnIH0sXG4gICAgICB7IGNvbXBpbGVyOiAnPj01LjEuMC1iZXRhLjAgPDUuMi4wJywgdHlwZXNjcmlwdDogJz49Mi40LjIgPDIuNi4wJyB9LFxuICAgICAgeyBjb21waWxlcjogJz49NS4yLjAtYmV0YS4wIDw2LjAuMCcsIHR5cGVzY3JpcHQ6ICc+PTIuNC4yIDwyLjcuMCcgfSxcbiAgICAgIHsgY29tcGlsZXI6ICc+PTYuMC4wLWJldGEuMCA8Ni4xLjAtYmV0YS4wJywgdHlwZXNjcmlwdDogJz49Mi43LjAgPDIuOC4wJyB9LFxuICAgICAgeyBjb21waWxlcjogJz49Ni4xLjAtYmV0YS4wIDw2LjEuMC1yYy4wJywgdHlwZXNjcmlwdDogJz49Mi43LjIgPDIuOS4wJyB9LFxuICAgICAgeyBjb21waWxlcjogJz49Ni4xLjAtcmMuMCA8Ny4wLjAnLCB0eXBlc2NyaXB0OiAnPj0yLjcuMiA8Mi4xMC4wJyB9LFxuICAgIF07XG5cbiAgICBjb25zdCBjdXJyZW50Q29tYm8gPSB2ZXJzaW9uQ29tYm9zLmZpbmQoKGNvbWJvKSA9PiBzYXRpc2ZpZXMoY29tcGlsZXJWZXJzaW9uLCBjb21iby5jb21waWxlcikpO1xuXG4gICAgaWYgKGN1cnJlbnRDb21ibyAmJiAhc2F0aXNmaWVzKHRzVmVyc2lvbiwgY3VycmVudENvbWJvLnR5cGVzY3JpcHQpKSB7XG4gICAgICAvLyBGaXJzdCBsaW5lIG9mIHdhcm5pbmcgbG9va3Mgd2VpcmQgYmVpbmcgc3BsaXQgaW4gdHdvLCBkaXNhYmxlIHRzbGludCBmb3IgaXQuXG4gICAgICBjb25zb2xlLmxvZygodGVybWluYWwueWVsbG93KCdcXG4nICsgdGFncy5zdHJpcEluZGVudGBcbiAgICAgICAgQGFuZ3VsYXIvY29tcGlsZXItY2xpQCR7Y29tcGlsZXJWZXJzaW9ufSByZXF1aXJlcyB0eXBlc2NyaXB0QCcke1xuICAgICAgICBjdXJyZW50Q29tYm8udHlwZXNjcmlwdH0nIGJ1dCAke3RzVmVyc2lvbn0gd2FzIGZvdW5kIGluc3RlYWQuXG4gICAgICAgIFVzaW5nIHRoaXMgdmVyc2lvbiBjYW4gcmVzdWx0IGluIHVuZGVmaW5lZCBiZWhhdmlvdXIgYW5kIGRpZmZpY3VsdCB0byBkZWJ1ZyBwcm9ibGVtcy5cblxuICAgICAgICBQbGVhc2UgcnVuIHRoZSBmb2xsb3dpbmcgY29tbWFuZCB0byBpbnN0YWxsIGEgY29tcGF0aWJsZSB2ZXJzaW9uIG9mIFR5cGVTY3JpcHQuXG5cbiAgICAgICAgICAgIG5wbSBpbnN0YWxsIHR5cGVzY3JpcHRAJyR7Y3VycmVudENvbWJvLnR5cGVzY3JpcHR9J1xuXG4gICAgICAgIFRvIGRpc2FibGUgdGhpcyB3YXJuaW5nIHJ1biBcIm5nIGNvbmZpZyBjbGkud2FybmluZ3MudHlwZXNjcmlwdE1pc21hdGNoIGZhbHNlXCIuXG4gICAgICBgICsgJ1xcbicpKSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==