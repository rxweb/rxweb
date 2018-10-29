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
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpack_1 = require("../webpack");
class WebpackDevServerBuilder {
    constructor(context) {
        this.context = context;
    }
    run(builderConfig) {
        const configPath = core_1.resolve(this.context.workspace.root, core_1.normalize(builderConfig.options.webpackConfig));
        return this.loadWebpackConfig(core_1.getSystemPath(configPath)).pipe(operators_1.concatMap(config => this.runWebpackDevServer(config)));
    }
    loadWebpackConfig(webpackConfigPath) {
        return rxjs_1.from(Promise.resolve().then(() => require(webpackConfigPath)));
    }
    runWebpackDevServer(webpackConfig, devServerCfg, loggingCb = webpack_1.defaultLoggingCb) {
        return new rxjs_1.Observable(obs => {
            const devServerConfig = devServerCfg || webpackConfig.devServer || {};
            devServerConfig.host = devServerConfig.host || 'localhost';
            devServerConfig.port = devServerConfig.port || 8080;
            if (devServerConfig.stats) {
                webpackConfig.stats = devServerConfig.stats;
            }
            // Disable stats reporting by the devserver, we have our own logger.
            devServerConfig.stats = false;
            const webpackCompiler = webpack(webpackConfig);
            const server = new WebpackDevServer(webpackCompiler, devServerConfig);
            webpackCompiler.hooks.done.tap('build-webpack', (stats) => {
                // Log stats.
                loggingCb(stats, webpackConfig, this.context.logger);
                obs.next({ success: !stats.hasErrors() });
            });
            server.listen(devServerConfig.port, devServerConfig.host, (err) => {
                if (err) {
                    obs.error(err);
                }
            });
            // Teardown logic. Close the server when unsubscribed from.
            return () => server.close();
        });
    }
}
exports.WebpackDevServerBuilder = WebpackDevServerBuilder;
exports.default = WebpackDevServerBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX3dlYnBhY2svc3JjL3dlYnBhY2stZGV2LXNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQVFILCtDQUErRTtBQUMvRSwrQkFBd0M7QUFDeEMsOENBQTJDO0FBQzNDLG1DQUFtQztBQUNuQyx1REFBdUQ7QUFDdkQsd0NBQStEO0FBSS9EO0lBRUUsWUFBbUIsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7SUFBSSxDQUFDO0lBRS9DLEdBQUcsQ0FBQyxhQUFrRTtRQUNwRSxNQUFNLFVBQVUsR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUNwRCxnQkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUVsRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzRCxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ3RELENBQUM7SUFDSixDQUFDO0lBRU0saUJBQWlCLENBQUMsaUJBQXlCO1FBQ2hELE9BQU8sV0FBSSxzQ0FBUSxpQkFBaUIsR0FBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTSxtQkFBbUIsQ0FDeEIsYUFBb0MsRUFDcEMsWUFBNkMsRUFDN0MsWUFBNkIsMEJBQWdCO1FBRTdDLE9BQU8sSUFBSSxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sZUFBZSxHQUFHLFlBQVksSUFBSSxhQUFhLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztZQUN0RSxlQUFlLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1lBQzNELGVBQWUsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7WUFFcEQsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFO2dCQUN6QixhQUFhLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUM7YUFDN0M7WUFDRCxvRUFBb0U7WUFDcEUsZUFBZSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFOUIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQWdCLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBRXRFLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDeEQsYUFBYTtnQkFDYixTQUFTLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUVyRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxNQUFNLENBQ1gsZUFBZSxDQUFDLElBQUksRUFDcEIsZUFBZSxDQUFDLElBQUksRUFDcEIsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDTixJQUFJLEdBQUcsRUFBRTtvQkFDUCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtZQUNILENBQUMsQ0FDRixDQUFDO1lBRUYsMkRBQTJEO1lBQzNELE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBekRELDBEQXlEQztBQUdELGtCQUFlLHVCQUF1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBCdWlsZEV2ZW50LFxuICBCdWlsZGVyLFxuICBCdWlsZGVyQ29uZmlndXJhdGlvbixcbiAgQnVpbGRlckNvbnRleHQsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9hcmNoaXRlY3QnO1xuaW1wb3J0IHsgUGF0aCwgZ2V0U3lzdGVtUGF0aCwgbm9ybWFsaXplLCByZXNvbHZlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29uY2F0TWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgd2VicGFjayBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCAqIGFzIFdlYnBhY2tEZXZTZXJ2ZXIgZnJvbSAnd2VicGFjay1kZXYtc2VydmVyJztcbmltcG9ydCB7IExvZ2dpbmdDYWxsYmFjaywgZGVmYXVsdExvZ2dpbmdDYiB9IGZyb20gJy4uL3dlYnBhY2snO1xuaW1wb3J0IHsgV2VicGFja0RldlNlcnZlckJ1aWxkZXJTY2hlbWEgfSBmcm9tICcuL3NjaGVtYSc7XG5cblxuZXhwb3J0IGNsYXNzIFdlYnBhY2tEZXZTZXJ2ZXJCdWlsZGVyIGltcGxlbWVudHMgQnVpbGRlcjxXZWJwYWNrRGV2U2VydmVyQnVpbGRlclNjaGVtYT4ge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZXh0OiBCdWlsZGVyQ29udGV4dCkgeyB9XG5cbiAgcnVuKGJ1aWxkZXJDb25maWc6IEJ1aWxkZXJDb25maWd1cmF0aW9uPFdlYnBhY2tEZXZTZXJ2ZXJCdWlsZGVyU2NoZW1hPik6IE9ic2VydmFibGU8QnVpbGRFdmVudD4ge1xuICAgIGNvbnN0IGNvbmZpZ1BhdGggPSByZXNvbHZlKHRoaXMuY29udGV4dC53b3Jrc3BhY2Uucm9vdCxcbiAgICAgIG5vcm1hbGl6ZShidWlsZGVyQ29uZmlnLm9wdGlvbnMud2VicGFja0NvbmZpZykpO1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZFdlYnBhY2tDb25maWcoZ2V0U3lzdGVtUGF0aChjb25maWdQYXRoKSkucGlwZShcbiAgICAgIGNvbmNhdE1hcChjb25maWcgPT4gdGhpcy5ydW5XZWJwYWNrRGV2U2VydmVyKGNvbmZpZykpLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgbG9hZFdlYnBhY2tDb25maWcod2VicGFja0NvbmZpZ1BhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8d2VicGFjay5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIGZyb20oaW1wb3J0KHdlYnBhY2tDb25maWdQYXRoKSk7XG4gIH1cblxuICBwdWJsaWMgcnVuV2VicGFja0RldlNlcnZlcihcbiAgICB3ZWJwYWNrQ29uZmlnOiB3ZWJwYWNrLkNvbmZpZ3VyYXRpb24sXG4gICAgZGV2U2VydmVyQ2ZnPzogV2VicGFja0RldlNlcnZlci5Db25maWd1cmF0aW9uLFxuICAgIGxvZ2dpbmdDYjogTG9nZ2luZ0NhbGxiYWNrID0gZGVmYXVsdExvZ2dpbmdDYixcbiAgKTogT2JzZXJ2YWJsZTxCdWlsZEV2ZW50PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9icyA9PiB7XG4gICAgICBjb25zdCBkZXZTZXJ2ZXJDb25maWcgPSBkZXZTZXJ2ZXJDZmcgfHwgd2VicGFja0NvbmZpZy5kZXZTZXJ2ZXIgfHwge307XG4gICAgICBkZXZTZXJ2ZXJDb25maWcuaG9zdCA9IGRldlNlcnZlckNvbmZpZy5ob3N0IHx8ICdsb2NhbGhvc3QnO1xuICAgICAgZGV2U2VydmVyQ29uZmlnLnBvcnQgPSBkZXZTZXJ2ZXJDb25maWcucG9ydCB8fCA4MDgwO1xuXG4gICAgICBpZiAoZGV2U2VydmVyQ29uZmlnLnN0YXRzKSB7XG4gICAgICAgIHdlYnBhY2tDb25maWcuc3RhdHMgPSBkZXZTZXJ2ZXJDb25maWcuc3RhdHM7XG4gICAgICB9XG4gICAgICAvLyBEaXNhYmxlIHN0YXRzIHJlcG9ydGluZyBieSB0aGUgZGV2c2VydmVyLCB3ZSBoYXZlIG91ciBvd24gbG9nZ2VyLlxuICAgICAgZGV2U2VydmVyQ29uZmlnLnN0YXRzID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHdlYnBhY2tDb21waWxlciA9IHdlYnBhY2sod2VicGFja0NvbmZpZyk7XG4gICAgICBjb25zdCBzZXJ2ZXIgPSBuZXcgV2VicGFja0RldlNlcnZlcih3ZWJwYWNrQ29tcGlsZXIsIGRldlNlcnZlckNvbmZpZyk7XG5cbiAgICAgIHdlYnBhY2tDb21waWxlci5ob29rcy5kb25lLnRhcCgnYnVpbGQtd2VicGFjaycsIChzdGF0cykgPT4ge1xuICAgICAgICAvLyBMb2cgc3RhdHMuXG4gICAgICAgIGxvZ2dpbmdDYihzdGF0cywgd2VicGFja0NvbmZpZywgdGhpcy5jb250ZXh0LmxvZ2dlcik7XG5cbiAgICAgICAgb2JzLm5leHQoeyBzdWNjZXNzOiAhc3RhdHMuaGFzRXJyb3JzKCkgfSk7XG4gICAgICB9KTtcblxuICAgICAgc2VydmVyLmxpc3RlbihcbiAgICAgICAgZGV2U2VydmVyQ29uZmlnLnBvcnQsXG4gICAgICAgIGRldlNlcnZlckNvbmZpZy5ob3N0LFxuICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgb2JzLmVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgLy8gVGVhcmRvd24gbG9naWMuIENsb3NlIHRoZSBzZXJ2ZXIgd2hlbiB1bnN1YnNjcmliZWQgZnJvbS5cbiAgICAgIHJldHVybiAoKSA9PiBzZXJ2ZXIuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFdlYnBhY2tEZXZTZXJ2ZXJCdWlsZGVyO1xuIl19