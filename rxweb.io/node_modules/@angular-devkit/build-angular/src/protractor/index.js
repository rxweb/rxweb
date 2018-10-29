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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const url = require("url");
const require_project_module_1 = require("../angular-cli-files/utilities/require-project-module");
const utils_1 = require("../utils");
class ProtractorBuilder {
    constructor(context) {
        this.context = context;
    }
    run(builderConfig) {
        const options = builderConfig.options;
        const root = this.context.workspace.root;
        const projectRoot = core_1.resolve(root, builderConfig.root);
        // const projectSystemRoot = getSystemPath(projectRoot);
        // TODO: verify using of(null) to kickstart things is a pattern.
        return rxjs_1.of(null).pipe(operators_1.concatMap(() => options.devServerTarget ? this._startDevServer(options) : rxjs_1.of(null)), operators_1.concatMap(() => options.webdriverUpdate ? this._updateWebdriver(projectRoot) : rxjs_1.of(null)), operators_1.concatMap(() => this._runProtractor(root, options)), operators_1.take(1));
    }
    // Note: this method mutates the options argument.
    _startDevServer(options) {
        const architect = this.context.architect;
        const [project, targetName, configuration] = options.devServerTarget.split(':');
        // Override browser build watch setting.
        const overrides = { watch: false, host: options.host, port: options.port };
        const targetSpec = { project, target: targetName, configuration, overrides };
        const builderConfig = architect.getBuilderConfiguration(targetSpec);
        let devServerDescription;
        let baseUrl;
        return architect.getBuilderDescription(builderConfig).pipe(operators_1.tap(description => devServerDescription = description), operators_1.concatMap(devServerDescription => architect.validateBuilderOptions(builderConfig, devServerDescription)), operators_1.concatMap(() => {
            // Compute baseUrl from devServerOptions.
            if (options.devServerTarget && builderConfig.options.publicHost) {
                let publicHost = builderConfig.options.publicHost;
                if (!/^\w+:\/\//.test(publicHost)) {
                    publicHost = `${builderConfig.options.ssl
                        ? 'https'
                        : 'http'}://${publicHost}`;
                }
                const clientUrl = url.parse(publicHost);
                baseUrl = url.format(clientUrl);
            }
            else if (options.devServerTarget) {
                baseUrl = url.format({
                    protocol: builderConfig.options.ssl ? 'https' : 'http',
                    hostname: options.host,
                    port: builderConfig.options.port.toString(),
                });
            }
            // Save the computed baseUrl back so that Protractor can use it.
            options.baseUrl = baseUrl;
            return rxjs_1.of(this.context.architect.getBuilder(devServerDescription, this.context));
        }), operators_1.concatMap(builder => builder.run(builderConfig)));
    }
    _updateWebdriver(projectRoot) {
        // The webdriver-manager update command can only be accessed via a deep import.
        const webdriverDeepImport = 'webdriver-manager/built/lib/cmds/update';
        let webdriverUpdate; // tslint:disable-line:no-any
        try {
            // When using npm, webdriver is within protractor/node_modules.
            webdriverUpdate = require_project_module_1.requireProjectModule(core_1.getSystemPath(projectRoot), `protractor/node_modules/${webdriverDeepImport}`);
        }
        catch (_a) {
            try {
                // When using yarn, webdriver is found as a root module.
                webdriverUpdate = require_project_module_1.requireProjectModule(core_1.getSystemPath(projectRoot), webdriverDeepImport);
            }
            catch (_b) {
                throw new Error(core_1.tags.stripIndents `
          Cannot automatically find webdriver-manager to update.
          Update webdriver-manager manually and run 'ng e2e --no-webdriver-update' instead.
        `);
            }
        }
        // run `webdriver-manager update --standalone false --gecko false --quiet`
        // if you change this, update the command comment in prev line, and in `eject` task
        return rxjs_1.from(webdriverUpdate.program.run({
            standalone: false,
            gecko: false,
            quiet: true,
        }));
    }
    _runProtractor(root, options) {
        const additionalProtractorConfig = {
            elementExplorer: options.elementExplorer,
            baseUrl: options.baseUrl,
            spec: options.specs.length ? options.specs : undefined,
            suite: options.suite,
        };
        // TODO: Protractor manages process.exit itself, so this target will allways quit the
        // process. To work around this we run it in a subprocess.
        // https://github.com/angular/protractor/issues/4160
        return utils_1.runModuleAsObservableFork(root, 'protractor/built/launcher', 'init', [
            core_1.getSystemPath(core_1.resolve(root, core_1.normalize(options.protractorConfig))),
            additionalProtractorConfig,
        ]);
    }
}
exports.ProtractorBuilder = ProtractorBuilder;
exports.default = ProtractorBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL3Byb3RyYWN0b3IvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFTSCwrQ0FBcUY7QUFDckYsK0JBQTRDO0FBQzVDLDhDQUFzRDtBQUN0RCwyQkFBMkI7QUFDM0Isa0dBQTZGO0FBRTdGLG9DQUFxRDtBQWVyRDtJQUVFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQUksQ0FBQztJQUUvQyxHQUFHLENBQUMsYUFBNkQ7UUFFL0QsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDekMsTUFBTSxXQUFXLEdBQUcsY0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsd0RBQXdEO1FBRXhELGdFQUFnRTtRQUNoRSxPQUFPLFNBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2xCLHFCQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ25GLHFCQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDeEYscUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FB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Q2pFLDBCQUEwQjtTQUMzQixDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFsSEQsOENBa0hDO0FBRUQsa0JBQWUsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEJ1aWxkRXZlbnQsXG4gIEJ1aWxkZXIsXG4gIEJ1aWxkZXJDb25maWd1cmF0aW9uLFxuICBCdWlsZGVyQ29udGV4dCxcbiAgQnVpbGRlckRlc2NyaXB0aW9uLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvYXJjaGl0ZWN0JztcbmltcG9ydCB7IFBhdGgsIGdldFN5c3RlbVBhdGgsIG5vcm1hbGl6ZSwgcmVzb2x2ZSwgdGFncyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHsgcmVxdWlyZVByb2plY3RNb2R1bGUgfSBmcm9tICcuLi9hbmd1bGFyLWNsaS1maWxlcy91dGlsaXRpZXMvcmVxdWlyZS1wcm9qZWN0LW1vZHVsZSc7XG5pbXBvcnQgeyBEZXZTZXJ2ZXJCdWlsZGVyT3B0aW9ucyB9IGZyb20gJy4uL2Rldi1zZXJ2ZXInO1xuaW1wb3J0IHsgcnVuTW9kdWxlQXNPYnNlcnZhYmxlRm9yayB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFByb3RyYWN0b3JCdWlsZGVyT3B0aW9ucyB7XG4gIHByb3RyYWN0b3JDb25maWc6IHN0cmluZztcbiAgZGV2U2VydmVyVGFyZ2V0Pzogc3RyaW5nO1xuICBzcGVjczogc3RyaW5nW107XG4gIHN1aXRlPzogc3RyaW5nO1xuICBlbGVtZW50RXhwbG9yZXI6IGJvb2xlYW47XG4gIHdlYmRyaXZlclVwZGF0ZTogYm9vbGVhbjtcbiAgcG9ydD86IG51bWJlcjtcbiAgaG9zdDogc3RyaW5nO1xuICBiYXNlVXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm90cmFjdG9yQnVpbGRlciBpbXBsZW1lbnRzIEJ1aWxkZXI8UHJvdHJhY3RvckJ1aWxkZXJPcHRpb25zPiB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNvbnRleHQ6IEJ1aWxkZXJDb250ZXh0KSB7IH1cblxuICBydW4oYnVpbGRlckNvbmZpZzogQnVpbGRlckNvbmZpZ3VyYXRpb248UHJvdHJhY3RvckJ1aWxkZXJPcHRpb25zPik6IE9ic2VydmFibGU8QnVpbGRFdmVudD4ge1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IGJ1aWxkZXJDb25maWcub3B0aW9ucztcbiAgICBjb25zdCByb290ID0gdGhpcy5jb250ZXh0LndvcmtzcGFjZS5yb290O1xuICAgIGNvbnN0IHByb2plY3RSb290ID0gcmVzb2x2ZShyb290LCBidWlsZGVyQ29uZmlnLnJvb3QpO1xuICAgIC8vIGNvbnN0IHByb2plY3RTeXN0ZW1Sb290ID0gZ2V0U3lzdGVtUGF0aChwcm9qZWN0Um9vdCk7XG5cbiAgICAvLyBUT0RPOiB2ZXJpZnkgdXNpbmcgb2YobnVsbCkgdG8ga2lja3N0YXJ0IHRoaW5ncyBpcyBhIHBhdHRlcm4uXG4gICAgcmV0dXJuIG9mKG51bGwpLnBpcGUoXG4gICAgICBjb25jYXRNYXAoKCkgPT4gb3B0aW9ucy5kZXZTZXJ2ZXJUYXJnZXQgPyB0aGlzLl9zdGFydERldlNlcnZlcihvcHRpb25zKSA6IG9mKG51bGwpKSxcbiAgICAgIGNvbmNhdE1hcCgoKSA9PiBvcHRpb25zLndlYmRyaXZlclVwZGF0ZSA/IHRoaXMuX3VwZGF0ZVdlYmRyaXZlcihwcm9qZWN0Um9vdCkgOiBvZihudWxsKSksXG4gICAgICBjb25jYXRNYXAoKCkgPT4gdGhpcy5fcnVuUHJvdHJhY3Rvcihyb290LCBvcHRpb25zKSksXG4gICAgICB0YWtlKDEpLFxuICAgICk7XG4gIH1cblxuICAvLyBOb3RlOiB0aGlzIG1ldGhvZCBtdXRhdGVzIHRoZSBvcHRpb25zIGFyZ3VtZW50LlxuICBwcml2YXRlIF9zdGFydERldlNlcnZlcihvcHRpb25zOiBQcm90cmFjdG9yQnVpbGRlck9wdGlvbnMpIHtcbiAgICBjb25zdCBhcmNoaXRlY3QgPSB0aGlzLmNvbnRleHQuYXJjaGl0ZWN0O1xuICAgIGNvbnN0IFtwcm9qZWN0LCB0YXJnZXROYW1lLCBjb25maWd1cmF0aW9uXSA9IChvcHRpb25zLmRldlNlcnZlclRhcmdldCBhcyBzdHJpbmcpLnNwbGl0KCc6Jyk7XG4gICAgLy8gT3ZlcnJpZGUgYnJvd3NlciBidWlsZCB3YXRjaCBzZXR0aW5nLlxuICAgIGNvbnN0IG92ZXJyaWRlcyA9IHsgd2F0Y2g6IGZhbHNlLCBob3N0OiBvcHRpb25zLmhvc3QsIHBvcnQ6IG9wdGlvbnMucG9ydCB9O1xuICAgIGNvbnN0IHRhcmdldFNwZWMgPSB7IHByb2plY3QsIHRhcmdldDogdGFyZ2V0TmFtZSwgY29uZmlndXJhdGlvbiwgb3ZlcnJpZGVzIH07XG4gICAgY29uc3QgYnVpbGRlckNvbmZpZyA9IGFyY2hpdGVjdC5nZXRCdWlsZGVyQ29uZmlndXJhdGlvbjxEZXZTZXJ2ZXJCdWlsZGVyT3B0aW9ucz4odGFyZ2V0U3BlYyk7XG4gICAgbGV0IGRldlNlcnZlckRlc2NyaXB0aW9uOiBCdWlsZGVyRGVzY3JpcHRpb247XG4gICAgbGV0IGJhc2VVcmw6IHN0cmluZztcblxuICAgIHJldHVybiBhcmNoaXRlY3QuZ2V0QnVpbGRlckRlc2NyaXB0aW9uKGJ1aWxkZXJDb25maWcpLnBpcGUoXG4gICAgICB0YXAoZGVzY3JpcHRpb24gPT4gZGV2U2VydmVyRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiksXG4gICAgICBjb25jYXRNYXAoZGV2U2VydmVyRGVzY3JpcHRpb24gPT4gYXJjaGl0ZWN0LnZhbGlkYXRlQnVpbGRlck9wdGlvbnMoXG4gICAgICAgIGJ1aWxkZXJDb25maWcsIGRldlNlcnZlckRlc2NyaXB0aW9uKSksXG4gICAgICBjb25jYXRNYXAoKCkgPT4ge1xuICAgICAgICAvLyBDb21wdXRlIGJhc2VVcmwgZnJvbSBkZXZTZXJ2ZXJPcHRpb25zLlxuICAgICAgICBpZiAob3B0aW9ucy5kZXZTZXJ2ZXJUYXJnZXQgJiYgYnVpbGRlckNvbmZpZy5vcHRpb25zLnB1YmxpY0hvc3QpIHtcbiAgICAgICAgICBsZXQgcHVibGljSG9zdCA9IGJ1aWxkZXJDb25maWcub3B0aW9ucy5wdWJsaWNIb3N0O1xuICAgICAgICAgIGlmICghL15cXHcrOlxcL1xcLy8udGVzdChwdWJsaWNIb3N0KSkge1xuICAgICAgICAgICAgcHVibGljSG9zdCA9IGAke2J1aWxkZXJDb25maWcub3B0aW9ucy5zc2xcbiAgICAgICAgICAgICAgPyAnaHR0cHMnXG4gICAgICAgICAgICAgIDogJ2h0dHAnfTovLyR7cHVibGljSG9zdH1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBjbGllbnRVcmwgPSB1cmwucGFyc2UocHVibGljSG9zdCk7XG4gICAgICAgICAgYmFzZVVybCA9IHVybC5mb3JtYXQoY2xpZW50VXJsKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmRldlNlcnZlclRhcmdldCkge1xuICAgICAgICAgIGJhc2VVcmwgPSB1cmwuZm9ybWF0KHtcbiAgICAgICAgICAgIHByb3RvY29sOiBidWlsZGVyQ29uZmlnLm9wdGlvbnMuc3NsID8gJ2h0dHBzJyA6ICdodHRwJyxcbiAgICAgICAgICAgIGhvc3RuYW1lOiBvcHRpb25zLmhvc3QsXG4gICAgICAgICAgICBwb3J0OiBidWlsZGVyQ29uZmlnLm9wdGlvbnMucG9ydC50b1N0cmluZygpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgY29tcHV0ZWQgYmFzZVVybCBiYWNrIHNvIHRoYXQgUHJvdHJhY3RvciBjYW4gdXNlIGl0LlxuICAgICAgICBvcHRpb25zLmJhc2VVcmwgPSBiYXNlVXJsO1xuXG4gICAgICAgIHJldHVybiBvZih0aGlzLmNvbnRleHQuYXJjaGl0ZWN0LmdldEJ1aWxkZXIoZGV2U2VydmVyRGVzY3JpcHRpb24sIHRoaXMuY29udGV4dCkpO1xuICAgICAgfSksXG4gICAgICBjb25jYXRNYXAoYnVpbGRlciA9PiBidWlsZGVyLnJ1bihidWlsZGVyQ29uZmlnKSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVdlYmRyaXZlcihwcm9qZWN0Um9vdDogUGF0aCkge1xuICAgIC8vIFRoZSB3ZWJkcml2ZXItbWFuYWdlciB1cGRhdGUgY29tbWFuZCBjYW4gb25seSBiZSBhY2Nlc3NlZCB2aWEgYSBkZWVwIGltcG9ydC5cbiAgICBjb25zdCB3ZWJkcml2ZXJEZWVwSW1wb3J0ID0gJ3dlYmRyaXZlci1tYW5hZ2VyL2J1aWx0L2xpYi9jbWRzL3VwZGF0ZSc7XG4gICAgbGV0IHdlYmRyaXZlclVwZGF0ZTogYW55OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gdXNpbmcgbnBtLCB3ZWJkcml2ZXIgaXMgd2l0aGluIHByb3RyYWN0b3Ivbm9kZV9tb2R1bGVzLlxuICAgICAgd2ViZHJpdmVyVXBkYXRlID0gcmVxdWlyZVByb2plY3RNb2R1bGUoZ2V0U3lzdGVtUGF0aChwcm9qZWN0Um9vdCksXG4gICAgICAgIGBwcm90cmFjdG9yL25vZGVfbW9kdWxlcy8ke3dlYmRyaXZlckRlZXBJbXBvcnR9YCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBXaGVuIHVzaW5nIHlhcm4sIHdlYmRyaXZlciBpcyBmb3VuZCBhcyBhIHJvb3QgbW9kdWxlLlxuICAgICAgICB3ZWJkcml2ZXJVcGRhdGUgPSByZXF1aXJlUHJvamVjdE1vZHVsZShnZXRTeXN0ZW1QYXRoKHByb2plY3RSb290KSwgd2ViZHJpdmVyRGVlcEltcG9ydCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRhZ3Muc3RyaXBJbmRlbnRzYFxuICAgICAgICAgIENhbm5vdCBhdXRvbWF0aWNhbGx5IGZpbmQgd2ViZHJpdmVyLW1hbmFnZXIgdG8gdXBkYXRlLlxuICAgICAgICAgIFVwZGF0ZSB3ZWJkcml2ZXItbWFuYWdlciBtYW51YWxseSBhbmQgcnVuICduZyBlMmUgLS1uby13ZWJkcml2ZXItdXBkYXRlJyBpbnN0ZWFkLlxuICAgICAgICBgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBydW4gYHdlYmRyaXZlci1tYW5hZ2VyIHVwZGF0ZSAtLXN0YW5kYWxvbmUgZmFsc2UgLS1nZWNrbyBmYWxzZSAtLXF1aWV0YFxuICAgIC8vIGlmIHlvdSBjaGFuZ2UgdGhpcywgdXBkYXRlIHRoZSBjb21tYW5kIGNvbW1lbnQgaW4gcHJldiBsaW5lLCBhbmQgaW4gYGVqZWN0YCB0YXNrXG4gICAgcmV0dXJuIGZyb20od2ViZHJpdmVyVXBkYXRlLnByb2dyYW0ucnVuKHtcbiAgICAgIHN0YW5kYWxvbmU6IGZhbHNlLFxuICAgICAgZ2Vja286IGZhbHNlLFxuICAgICAgcXVpZXQ6IHRydWUsXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcnVuUHJvdHJhY3Rvcihyb290OiBQYXRoLCBvcHRpb25zOiBQcm90cmFjdG9yQnVpbGRlck9wdGlvbnMpOiBPYnNlcnZhYmxlPEJ1aWxkRXZlbnQ+IHtcbiAgICBjb25zdCBhZGRpdGlvbmFsUHJvdHJhY3RvckNvbmZpZyA9IHtcbiAgICAgIGVsZW1lbnRFeHBsb3Jlcjogb3B0aW9ucy5lbGVtZW50RXhwbG9yZXIsXG4gICAgICBiYXNlVXJsOiBvcHRpb25zLmJhc2VVcmwsXG4gICAgICBzcGVjOiBvcHRpb25zLnNwZWNzLmxlbmd0aCA/IG9wdGlvbnMuc3BlY3MgOiB1bmRlZmluZWQsXG4gICAgICBzdWl0ZTogb3B0aW9ucy5zdWl0ZSxcbiAgICB9O1xuXG4gICAgLy8gVE9ETzogUHJvdHJhY3RvciBtYW5hZ2VzIHByb2Nlc3MuZXhpdCBpdHNlbGYsIHNvIHRoaXMgdGFyZ2V0IHdpbGwgYWxsd2F5cyBxdWl0IHRoZVxuICAgIC8vIHByb2Nlc3MuIFRvIHdvcmsgYXJvdW5kIHRoaXMgd2UgcnVuIGl0IGluIGEgc3VicHJvY2Vzcy5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9wcm90cmFjdG9yL2lzc3Vlcy80MTYwXG4gICAgcmV0dXJuIHJ1bk1vZHVsZUFzT2JzZXJ2YWJsZUZvcmsoXG4gICAgICByb290LFxuICAgICAgJ3Byb3RyYWN0b3IvYnVpbHQvbGF1bmNoZXInLFxuICAgICAgJ2luaXQnLFxuICAgICAgW1xuICAgICAgICBnZXRTeXN0ZW1QYXRoKHJlc29sdmUocm9vdCwgbm9ybWFsaXplKG9wdGlvbnMucHJvdHJhY3RvckNvbmZpZykpKSxcbiAgICAgICAgYWRkaXRpb25hbFByb3RyYWN0b3JDb25maWcsXG4gICAgICBdLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvdHJhY3RvckJ1aWxkZXI7XG4iXX0=