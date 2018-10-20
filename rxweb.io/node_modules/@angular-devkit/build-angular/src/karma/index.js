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
const webpack_configs_1 = require("../angular-cli-files/models/webpack-configs");
const read_tsconfig_1 = require("../angular-cli-files/utilities/read-tsconfig");
const require_project_module_1 = require("../angular-cli-files/utilities/require-project-module");
const utils_1 = require("../utils");
const webpackMerge = require('webpack-merge');
class KarmaBuilder {
    constructor(context) {
        this.context = context;
    }
    run(builderConfig) {
        const options = builderConfig.options;
        const root = this.context.workspace.root;
        const projectRoot = core_1.resolve(root, builderConfig.root);
        const host = new core_1.virtualFs.AliasHost(this.context.host);
        return rxjs_1.of(null).pipe(operators_1.concatMap(() => utils_1.normalizeFileReplacements(options.fileReplacements, host, root)), operators_1.tap(fileReplacements => options.fileReplacements = fileReplacements), operators_1.concatMap(() => utils_1.normalizeAssetPatterns(options.assets, host, root, projectRoot, builderConfig.sourceRoot)), 
        // Replace the assets in options with the normalized version.
        operators_1.tap((assetPatternObjects => options.assets = assetPatternObjects)), operators_1.concatMap(() => new rxjs_1.Observable(obs => {
            const karma = require_project_module_1.requireProjectModule(core_1.getSystemPath(projectRoot), 'karma');
            const karmaConfig = core_1.getSystemPath(core_1.resolve(root, core_1.normalize(options.karmaConfig)));
            // TODO: adjust options to account for not passing them blindly to karma.
            // const karmaOptions: any = Object.assign({}, options);
            // tslint:disable-next-line:no-any
            const karmaOptions = {};
            if (options.watch !== undefined) {
                karmaOptions.singleRun = !options.watch;
            }
            // Convert browsers from a string to an array
            if (options.browsers) {
                karmaOptions.browsers = options.browsers.split(',');
            }
            karmaOptions.buildWebpack = {
                root: core_1.getSystemPath(root),
                projectRoot: core_1.getSystemPath(projectRoot),
                options: options,
                webpackConfig: this._buildWebpackConfig(root, projectRoot, host, options),
                // Pass onto Karma to emit BuildEvents.
                successCb: () => obs.next({ success: true }),
                failureCb: () => obs.next({ success: false }),
            };
            // TODO: inside the configs, always use the project root and not the workspace root.
            // Until then we pretend the app root is relative (``) but the same as `projectRoot`.
            karmaOptions.buildWebpack.options.root = '';
            // Assign additional karmaConfig options to the local ngapp config
            karmaOptions.configFile = karmaConfig;
            // Complete the observable once the Karma server returns.
            const karmaServer = new karma.Server(karmaOptions, () => obs.complete());
            karmaServer.start();
            // Cleanup, signal Karma to exit.
            return () => {
                // Karma does not seem to have a way to exit the server gracefully.
                // See https://github.com/karma-runner/karma/issues/2867#issuecomment-369912167
                // TODO: make a PR for karma to add `karmaServer.close(code)`, that
                // calls `disconnectBrowsers(code);`
                // karmaServer.close();
            };
        })));
    }
    _buildWebpackConfig(root, projectRoot, host, options) {
        let wco;
        const tsConfigPath = core_1.getSystemPath(core_1.resolve(root, core_1.normalize(options.tsConfig)));
        const tsConfig = read_tsconfig_1.readTsconfig(tsConfigPath);
        const projectTs = require_project_module_1.requireProjectModule(core_1.getSystemPath(projectRoot), 'typescript');
        const supportES2015 = tsConfig.options.target !== projectTs.ScriptTarget.ES3
            && tsConfig.options.target !== projectTs.ScriptTarget.ES5;
        const compatOptions = Object.assign({}, options, { 
            // Some asset logic inside getCommonConfig needs outputPath to be set.
            outputPath: '' });
        wco = {
            root: core_1.getSystemPath(root),
            projectRoot: core_1.getSystemPath(projectRoot),
            // TODO: use only this.options, it contains all flags and configs items already.
            buildOptions: compatOptions,
            tsConfig,
            tsConfigPath,
            supportES2015,
        };
        wco.buildOptions.progress = utils_1.defaultProgress(wco.buildOptions.progress);
        const webpackConfigs = [
            webpack_configs_1.getCommonConfig(wco),
            webpack_configs_1.getStylesConfig(wco),
            webpack_configs_1.getNonAotTestConfig(wco, host),
            webpack_configs_1.getTestConfig(wco),
        ];
        return webpackMerge(webpackConfigs);
    }
}
exports.KarmaBuilder = KarmaBuilder;
exports.default = KarmaBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL2thcm1hL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBUUgsK0NBQTBGO0FBRTFGLCtCQUFzQztBQUN0Qyw4Q0FBZ0Q7QUFHaEQsaUZBS3FEO0FBQ3JELGdGQUE0RTtBQUM1RSxrR0FBNkY7QUFFN0Ysb0NBQThGO0FBRTlGLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQVE5QztJQUNFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQUksQ0FBQztJQUUvQyxHQUFHLENBQUMsYUFBdUQ7UUFDekQsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDekMsTUFBTSxXQUFXLEdBQUcsY0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWdDLENBQUMsQ0FBQztRQUVwRixPQUFPLFNBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2xCLHFCQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsaUNBQXlCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUNoRixlQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxFQUNwRSxxQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLDhCQUFzQixDQUNwQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRSw2REFBNkQ7UUFDN0QsZUFBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxFQUNsRSxxQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksaUJBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQyxNQUFNLEtBQUssR0FBRyw2Q0FBb0IsQ0FBQyxvQkFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sV0FBVyxHQUFHLG9CQUFhLENBQUMsY0FBTyxDQUFDLElBQUksRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakYseUVBQXlFO1lBQ3pFLHdEQUF3RDtZQUN4RCxrQ0FBa0M7WUFDbEMsTUFBTSxZQUFZLEdBQVEsRUFBRSxDQUFDO1lBRTdCLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQy9CLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2FBQ3pDO1lBRUQsNkNBQTZDO1lBQzdDLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDcEIsWUFBWSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyRDtZQUVELFlBQVksQ0FBQyxZQUFZLEdBQUc7Z0JBQzFCLElBQUksRUFBRSxvQkFBYSxDQUFDLElBQUksQ0FBQztnQkFDekIsV0FBVyxFQUFFLG9CQUFhLENBQUMsV0FBVyxDQUFDO2dCQUN2QyxPQUFPLEVBQUUsT0FBdUM7Z0JBQ2hELGFBQWEsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQzdELE9BQXVDLENBQUM7Z0JBQzFDLHVDQUF1QztnQkFDdkMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQzVDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQzlDLENBQUM7WUFFRixvRkFBb0Y7WUFDcEYscUZBQXFGO1lBQ3JGLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFFNUMsa0VBQWtFO1lBQ2xFLFlBQVksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO1lBRXRDLHlEQUF5RDtZQUN6RCxNQUFNLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVwQixpQ0FBaUM7WUFDakMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsbUVBQW1FO2dCQUNuRSwrRUFBK0U7Z0JBQy9FLG1FQUFtRTtnQkFDbkUsb0NBQW9DO2dCQUNwQyx1QkFBdUI7WUFDekIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVPLG1CQUFtQixDQUN6QixJQUFVLEVBQ1YsV0FBaUIsRUFDakIsSUFBOEIsRUFDOUIsT0FBcUM7UUFFckMsSUFBSSxHQUF5QixDQUFDO1FBRTlCLE1BQU0sWUFBWSxHQUFHLG9CQUFhLENBQUMsY0FBTyxDQUFDLElBQUksRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsTUFBTSxRQUFRLEdBQUcsNEJBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU1QyxNQUFNLFNBQVMsR0FBRyw2Q0FBb0IsQ0FBQyxvQkFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFlBQVksQ0FBYyxDQUFDO1FBRTlGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRztlQUN2RSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUU1RCxNQUFNLGFBQWEscUJBQ2QsT0FBMkM7WUFDOUMsc0VBQXNFO1lBQ3RFLFVBQVUsRUFBRSxFQUFFLEdBQ2YsQ0FBQztRQUVGLEdBQUcsR0FBRztZQUNKLElBQUksRUFBRSxvQkFBYSxDQUFDLElBQUksQ0FBQztZQUN6QixXQUFXLEVBQUUsb0JBQWEsQ0FBQyxXQUFXLENBQUM7WUFDdkMsZ0ZBQWdGO1lBQ2hGLFlBQVksRUFBRSxhQUFhO1lBQzNCLFFBQVE7WUFDUixZQUFZO1lBQ1osYUFBYTtTQUNkLENBQUM7UUFFRixHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyx1QkFBZSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkUsTUFBTSxjQUFjLEdBQVM7WUFDM0IsaUNBQWUsQ0FBQyxHQUFHLENBQUM7WUFDcEIsaUNBQWUsQ0FBQyxHQUFHLENBQUM7WUFDcEIscUNBQW1CLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztZQUM5QiwrQkFBYSxDQUFDLEdBQUcsQ0FBQztTQUNuQixDQUFDO1FBRUYsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGO0FBL0dELG9DQStHQztBQUVELGtCQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQnVpbGRFdmVudCxcbiAgQnVpbGRlcixcbiAgQnVpbGRlckNvbmZpZ3VyYXRpb24sXG4gIEJ1aWxkZXJDb250ZXh0LFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvYXJjaGl0ZWN0JztcbmltcG9ydCB7IFBhdGgsIGdldFN5c3RlbVBhdGgsIG5vcm1hbGl6ZSwgcmVzb2x2ZSwgdmlydHVhbEZzIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBXZWJwYWNrQ29uZmlnT3B0aW9ucyB9IGZyb20gJy4uL2FuZ3VsYXItY2xpLWZpbGVzL21vZGVscy9idWlsZC1vcHRpb25zJztcbmltcG9ydCB7XG4gIGdldENvbW1vbkNvbmZpZyxcbiAgZ2V0Tm9uQW90VGVzdENvbmZpZyxcbiAgZ2V0U3R5bGVzQ29uZmlnLFxuICBnZXRUZXN0Q29uZmlnLFxufSBmcm9tICcuLi9hbmd1bGFyLWNsaS1maWxlcy9tb2RlbHMvd2VicGFjay1jb25maWdzJztcbmltcG9ydCB7IHJlYWRUc2NvbmZpZyB9IGZyb20gJy4uL2FuZ3VsYXItY2xpLWZpbGVzL3V0aWxpdGllcy9yZWFkLXRzY29uZmlnJztcbmltcG9ydCB7IHJlcXVpcmVQcm9qZWN0TW9kdWxlIH0gZnJvbSAnLi4vYW5ndWxhci1jbGktZmlsZXMvdXRpbGl0aWVzL3JlcXVpcmUtcHJvamVjdC1tb2R1bGUnO1xuaW1wb3J0IHsgQXNzZXRQYXR0ZXJuT2JqZWN0LCBDdXJyZW50RmlsZVJlcGxhY2VtZW50IH0gZnJvbSAnLi4vYnJvd3Nlci9zY2hlbWEnO1xuaW1wb3J0IHsgZGVmYXVsdFByb2dyZXNzLCBub3JtYWxpemVBc3NldFBhdHRlcm5zLCBub3JtYWxpemVGaWxlUmVwbGFjZW1lbnRzIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgS2FybWFCdWlsZGVyU2NoZW1hIH0gZnJvbSAnLi9zY2hlbWEnO1xuY29uc3Qgd2VicGFja01lcmdlID0gcmVxdWlyZSgnd2VicGFjay1tZXJnZScpO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplZEthcm1hQnVpbGRlclNjaGVtYSBleHRlbmRzIEthcm1hQnVpbGRlclNjaGVtYSB7XG4gIGFzc2V0czogQXNzZXRQYXR0ZXJuT2JqZWN0W107XG4gIGZpbGVSZXBsYWNlbWVudHM6IEN1cnJlbnRGaWxlUmVwbGFjZW1lbnRbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEthcm1hQnVpbGRlciBpbXBsZW1lbnRzIEJ1aWxkZXI8S2FybWFCdWlsZGVyU2NoZW1hPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZXh0OiBCdWlsZGVyQ29udGV4dCkgeyB9XG5cbiAgcnVuKGJ1aWxkZXJDb25maWc6IEJ1aWxkZXJDb25maWd1cmF0aW9uPEthcm1hQnVpbGRlclNjaGVtYT4pOiBPYnNlcnZhYmxlPEJ1aWxkRXZlbnQ+IHtcbiAgICBjb25zdCBvcHRpb25zID0gYnVpbGRlckNvbmZpZy5vcHRpb25zO1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLmNvbnRleHQud29ya3NwYWNlLnJvb3Q7XG4gICAgY29uc3QgcHJvamVjdFJvb3QgPSByZXNvbHZlKHJvb3QsIGJ1aWxkZXJDb25maWcucm9vdCk7XG4gICAgY29uc3QgaG9zdCA9IG5ldyB2aXJ0dWFsRnMuQWxpYXNIb3N0KHRoaXMuY29udGV4dC5ob3N0IGFzIHZpcnR1YWxGcy5Ib3N0PGZzLlN0YXRzPik7XG5cbiAgICByZXR1cm4gb2YobnVsbCkucGlwZShcbiAgICAgIGNvbmNhdE1hcCgoKSA9PiBub3JtYWxpemVGaWxlUmVwbGFjZW1lbnRzKG9wdGlvbnMuZmlsZVJlcGxhY2VtZW50cywgaG9zdCwgcm9vdCkpLFxuICAgICAgdGFwKGZpbGVSZXBsYWNlbWVudHMgPT4gb3B0aW9ucy5maWxlUmVwbGFjZW1lbnRzID0gZmlsZVJlcGxhY2VtZW50cyksXG4gICAgICBjb25jYXRNYXAoKCkgPT4gbm9ybWFsaXplQXNzZXRQYXR0ZXJucyhcbiAgICAgICAgb3B0aW9ucy5hc3NldHMsIGhvc3QsIHJvb3QsIHByb2plY3RSb290LCBidWlsZGVyQ29uZmlnLnNvdXJjZVJvb3QpKSxcbiAgICAgIC8vIFJlcGxhY2UgdGhlIGFzc2V0cyBpbiBvcHRpb25zIHdpdGggdGhlIG5vcm1hbGl6ZWQgdmVyc2lvbi5cbiAgICAgIHRhcCgoYXNzZXRQYXR0ZXJuT2JqZWN0cyA9PiBvcHRpb25zLmFzc2V0cyA9IGFzc2V0UGF0dGVybk9iamVjdHMpKSxcbiAgICAgIGNvbmNhdE1hcCgoKSA9PiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgICAgICBjb25zdCBrYXJtYSA9IHJlcXVpcmVQcm9qZWN0TW9kdWxlKGdldFN5c3RlbVBhdGgocHJvamVjdFJvb3QpLCAna2FybWEnKTtcbiAgICAgICAgY29uc3Qga2FybWFDb25maWcgPSBnZXRTeXN0ZW1QYXRoKHJlc29sdmUocm9vdCwgbm9ybWFsaXplKG9wdGlvbnMua2FybWFDb25maWcpKSk7XG5cbiAgICAgICAgLy8gVE9ETzogYWRqdXN0IG9wdGlvbnMgdG8gYWNjb3VudCBmb3Igbm90IHBhc3NpbmcgdGhlbSBibGluZGx5IHRvIGthcm1hLlxuICAgICAgICAvLyBjb25zdCBrYXJtYU9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgIGNvbnN0IGthcm1hT3B0aW9uczogYW55ID0ge307XG5cbiAgICAgICAgaWYgKG9wdGlvbnMud2F0Y2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGthcm1hT3B0aW9ucy5zaW5nbGVSdW4gPSAhb3B0aW9ucy53YXRjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnZlcnQgYnJvd3NlcnMgZnJvbSBhIHN0cmluZyB0byBhbiBhcnJheVxuICAgICAgICBpZiAob3B0aW9ucy5icm93c2Vycykge1xuICAgICAgICAgIGthcm1hT3B0aW9ucy5icm93c2VycyA9IG9wdGlvbnMuYnJvd3NlcnMuc3BsaXQoJywnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGthcm1hT3B0aW9ucy5idWlsZFdlYnBhY2sgPSB7XG4gICAgICAgICAgcm9vdDogZ2V0U3lzdGVtUGF0aChyb290KSxcbiAgICAgICAgICBwcm9qZWN0Um9vdDogZ2V0U3lzdGVtUGF0aChwcm9qZWN0Um9vdCksXG4gICAgICAgICAgb3B0aW9uczogb3B0aW9ucyBhcyBOb3JtYWxpemVkS2FybWFCdWlsZGVyU2NoZW1hLFxuICAgICAgICAgIHdlYnBhY2tDb25maWc6IHRoaXMuX2J1aWxkV2VicGFja0NvbmZpZyhyb290LCBwcm9qZWN0Um9vdCwgaG9zdCxcbiAgICAgICAgICAgIG9wdGlvbnMgYXMgTm9ybWFsaXplZEthcm1hQnVpbGRlclNjaGVtYSksXG4gICAgICAgICAgLy8gUGFzcyBvbnRvIEthcm1hIHRvIGVtaXQgQnVpbGRFdmVudHMuXG4gICAgICAgICAgc3VjY2Vzc0NiOiAoKSA9PiBvYnMubmV4dCh7IHN1Y2Nlc3M6IHRydWUgfSksXG4gICAgICAgICAgZmFpbHVyZUNiOiAoKSA9PiBvYnMubmV4dCh7IHN1Y2Nlc3M6IGZhbHNlIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRPRE86IGluc2lkZSB0aGUgY29uZmlncywgYWx3YXlzIHVzZSB0aGUgcHJvamVjdCByb290IGFuZCBub3QgdGhlIHdvcmtzcGFjZSByb290LlxuICAgICAgICAvLyBVbnRpbCB0aGVuIHdlIHByZXRlbmQgdGhlIGFwcCByb290IGlzIHJlbGF0aXZlIChgYCkgYnV0IHRoZSBzYW1lIGFzIGBwcm9qZWN0Um9vdGAuXG4gICAgICAgIGthcm1hT3B0aW9ucy5idWlsZFdlYnBhY2sub3B0aW9ucy5yb290ID0gJyc7XG5cbiAgICAgICAgLy8gQXNzaWduIGFkZGl0aW9uYWwga2FybWFDb25maWcgb3B0aW9ucyB0byB0aGUgbG9jYWwgbmdhcHAgY29uZmlnXG4gICAgICAgIGthcm1hT3B0aW9ucy5jb25maWdGaWxlID0ga2FybWFDb25maWc7XG5cbiAgICAgICAgLy8gQ29tcGxldGUgdGhlIG9ic2VydmFibGUgb25jZSB0aGUgS2FybWEgc2VydmVyIHJldHVybnMuXG4gICAgICAgIGNvbnN0IGthcm1hU2VydmVyID0gbmV3IGthcm1hLlNlcnZlcihrYXJtYU9wdGlvbnMsICgpID0+IG9icy5jb21wbGV0ZSgpKTtcbiAgICAgICAga2FybWFTZXJ2ZXIuc3RhcnQoKTtcblxuICAgICAgICAvLyBDbGVhbnVwLCBzaWduYWwgS2FybWEgdG8gZXhpdC5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAvLyBLYXJtYSBkb2VzIG5vdCBzZWVtIHRvIGhhdmUgYSB3YXkgdG8gZXhpdCB0aGUgc2VydmVyIGdyYWNlZnVsbHkuXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9rYXJtYS1ydW5uZXIva2FybWEvaXNzdWVzLzI4NjcjaXNzdWVjb21tZW50LTM2OTkxMjE2N1xuICAgICAgICAgIC8vIFRPRE86IG1ha2UgYSBQUiBmb3Iga2FybWEgdG8gYWRkIGBrYXJtYVNlcnZlci5jbG9zZShjb2RlKWAsIHRoYXRcbiAgICAgICAgICAvLyBjYWxscyBgZGlzY29ubmVjdEJyb3dzZXJzKGNvZGUpO2BcbiAgICAgICAgICAvLyBrYXJtYVNlcnZlci5jbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgfSkpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFdlYnBhY2tDb25maWcoXG4gICAgcm9vdDogUGF0aCxcbiAgICBwcm9qZWN0Um9vdDogUGF0aCxcbiAgICBob3N0OiB2aXJ0dWFsRnMuSG9zdDxmcy5TdGF0cz4sXG4gICAgb3B0aW9uczogTm9ybWFsaXplZEthcm1hQnVpbGRlclNjaGVtYSxcbiAgKSB7XG4gICAgbGV0IHdjbzogV2VicGFja0NvbmZpZ09wdGlvbnM7XG5cbiAgICBjb25zdCB0c0NvbmZpZ1BhdGggPSBnZXRTeXN0ZW1QYXRoKHJlc29sdmUocm9vdCwgbm9ybWFsaXplKG9wdGlvbnMudHNDb25maWcpKSk7XG4gICAgY29uc3QgdHNDb25maWcgPSByZWFkVHNjb25maWcodHNDb25maWdQYXRoKTtcblxuICAgIGNvbnN0IHByb2plY3RUcyA9IHJlcXVpcmVQcm9qZWN0TW9kdWxlKGdldFN5c3RlbVBhdGgocHJvamVjdFJvb3QpLCAndHlwZXNjcmlwdCcpIGFzIHR5cGVvZiB0cztcblxuICAgIGNvbnN0IHN1cHBvcnRFUzIwMTUgPSB0c0NvbmZpZy5vcHRpb25zLnRhcmdldCAhPT0gcHJvamVjdFRzLlNjcmlwdFRhcmdldC5FUzNcbiAgICAgICYmIHRzQ29uZmlnLm9wdGlvbnMudGFyZ2V0ICE9PSBwcm9qZWN0VHMuU2NyaXB0VGFyZ2V0LkVTNTtcblxuICAgIGNvbnN0IGNvbXBhdE9wdGlvbnM6IHR5cGVvZiB3Y29bJ2J1aWxkT3B0aW9ucyddID0ge1xuICAgICAgLi4ub3B0aW9ucyBhcyB7fSBhcyB0eXBlb2Ygd2NvWydidWlsZE9wdGlvbnMnXSxcbiAgICAgIC8vIFNvbWUgYXNzZXQgbG9naWMgaW5zaWRlIGdldENvbW1vbkNvbmZpZyBuZWVkcyBvdXRwdXRQYXRoIHRvIGJlIHNldC5cbiAgICAgIG91dHB1dFBhdGg6ICcnLFxuICAgIH07XG5cbiAgICB3Y28gPSB7XG4gICAgICByb290OiBnZXRTeXN0ZW1QYXRoKHJvb3QpLFxuICAgICAgcHJvamVjdFJvb3Q6IGdldFN5c3RlbVBhdGgocHJvamVjdFJvb3QpLFxuICAgICAgLy8gVE9ETzogdXNlIG9ubHkgdGhpcy5vcHRpb25zLCBpdCBjb250YWlucyBhbGwgZmxhZ3MgYW5kIGNvbmZpZ3MgaXRlbXMgYWxyZWFkeS5cbiAgICAgIGJ1aWxkT3B0aW9uczogY29tcGF0T3B0aW9ucyxcbiAgICAgIHRzQ29uZmlnLFxuICAgICAgdHNDb25maWdQYXRoLFxuICAgICAgc3VwcG9ydEVTMjAxNSxcbiAgICB9O1xuXG4gICAgd2NvLmJ1aWxkT3B0aW9ucy5wcm9ncmVzcyA9IGRlZmF1bHRQcm9ncmVzcyh3Y28uYnVpbGRPcHRpb25zLnByb2dyZXNzKTtcblxuICAgIGNvbnN0IHdlYnBhY2tDb25maWdzOiB7fVtdID0gW1xuICAgICAgZ2V0Q29tbW9uQ29uZmlnKHdjbyksXG4gICAgICBnZXRTdHlsZXNDb25maWcod2NvKSxcbiAgICAgIGdldE5vbkFvdFRlc3RDb25maWcod2NvLCBob3N0KSxcbiAgICAgIGdldFRlc3RDb25maWcod2NvKSxcbiAgICBdO1xuXG4gICAgcmV0dXJuIHdlYnBhY2tNZXJnZSh3ZWJwYWNrQ29uZmlncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgS2FybWFCdWlsZGVyO1xuIl19