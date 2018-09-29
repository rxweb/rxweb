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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX3dlYnBhY2svc3JjL3dlYnBhY2stZGV2LXNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQVFILCtDQUErRTtBQUMvRSwrQkFBd0M7QUFDeEMsOENBQTJDO0FBQzNDLG1DQUFtQztBQUNuQyx1REFBdUQ7QUFDdkQsd0NBQStEO0FBSS9EO0lBRUUsWUFBbUIsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7SUFBSSxDQUFDO0lBRS9DLEdBQUcsQ0FBQyxhQUFrRTtRQUNwRSxNQUFNLFVBQVUsR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUNwRCxnQkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUVsRCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzNELHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDdEQsQ0FBQztJQUNKLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxpQkFBeUI7UUFDaEQsTUFBTSxDQUFDLFdBQUksc0NBQVEsaUJBQWlCLEdBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU0sbUJBQW1CLENBQ3hCLGFBQW9DLEVBQ3BDLFlBQTZDLEVBQzdDLFlBQTZCLDBCQUFnQjtRQUU3QyxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sZUFBZSxHQUFHLFlBQVksSUFBSSxhQUFhLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztZQUN0RSxlQUFlLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1lBQzNELGVBQWUsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLGFBQWEsQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQztZQUM5QyxDQUFDO1lBQ0Qsb0VBQW9FO1lBQ3BFLGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRTlCLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUV0RSxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hELGFBQWE7Z0JBQ2IsU0FBUyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsTUFBTSxDQUNYLGVBQWUsQ0FBQyxJQUFJLEVBQ3BCLGVBQWUsQ0FBQyxJQUFJLEVBQ3BCLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ04sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixDQUFDO1lBQ0gsQ0FBQyxDQUNGLENBQUM7WUFFRiwyREFBMkQ7WUFDM0QsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXpERCwwREF5REM7QUFHRCxrQkFBZSx1QkFBdUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQnVpbGRFdmVudCxcbiAgQnVpbGRlcixcbiAgQnVpbGRlckNvbmZpZ3VyYXRpb24sXG4gIEJ1aWxkZXJDb250ZXh0LFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvYXJjaGl0ZWN0JztcbmltcG9ydCB7IFBhdGgsIGdldFN5c3RlbVBhdGgsIG5vcm1hbGl6ZSwgcmVzb2x2ZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIHdlYnBhY2sgZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgKiBhcyBXZWJwYWNrRGV2U2VydmVyIGZyb20gJ3dlYnBhY2stZGV2LXNlcnZlcic7XG5pbXBvcnQgeyBMb2dnaW5nQ2FsbGJhY2ssIGRlZmF1bHRMb2dnaW5nQ2IgfSBmcm9tICcuLi93ZWJwYWNrJztcbmltcG9ydCB7IFdlYnBhY2tEZXZTZXJ2ZXJCdWlsZGVyU2NoZW1hIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5cbmV4cG9ydCBjbGFzcyBXZWJwYWNrRGV2U2VydmVyQnVpbGRlciBpbXBsZW1lbnRzIEJ1aWxkZXI8V2VicGFja0RldlNlcnZlckJ1aWxkZXJTY2hlbWE+IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGV4dDogQnVpbGRlckNvbnRleHQpIHsgfVxuXG4gIHJ1bihidWlsZGVyQ29uZmlnOiBCdWlsZGVyQ29uZmlndXJhdGlvbjxXZWJwYWNrRGV2U2VydmVyQnVpbGRlclNjaGVtYT4pOiBPYnNlcnZhYmxlPEJ1aWxkRXZlbnQ+IHtcbiAgICBjb25zdCBjb25maWdQYXRoID0gcmVzb2x2ZSh0aGlzLmNvbnRleHQud29ya3NwYWNlLnJvb3QsXG4gICAgICBub3JtYWxpemUoYnVpbGRlckNvbmZpZy5vcHRpb25zLndlYnBhY2tDb25maWcpKTtcblxuICAgIHJldHVybiB0aGlzLmxvYWRXZWJwYWNrQ29uZmlnKGdldFN5c3RlbVBhdGgoY29uZmlnUGF0aCkpLnBpcGUoXG4gICAgICBjb25jYXRNYXAoY29uZmlnID0+IHRoaXMucnVuV2VicGFja0RldlNlcnZlcihjb25maWcpKSxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGxvYWRXZWJwYWNrQ29uZmlnKHdlYnBhY2tDb25maWdQYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHdlYnBhY2suQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiBmcm9tKGltcG9ydCh3ZWJwYWNrQ29uZmlnUGF0aCkpO1xuICB9XG5cbiAgcHVibGljIHJ1bldlYnBhY2tEZXZTZXJ2ZXIoXG4gICAgd2VicGFja0NvbmZpZzogd2VicGFjay5Db25maWd1cmF0aW9uLFxuICAgIGRldlNlcnZlckNmZz86IFdlYnBhY2tEZXZTZXJ2ZXIuQ29uZmlndXJhdGlvbixcbiAgICBsb2dnaW5nQ2I6IExvZ2dpbmdDYWxsYmFjayA9IGRlZmF1bHRMb2dnaW5nQ2IsXG4gICk6IE9ic2VydmFibGU8QnVpbGRFdmVudD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgICAgY29uc3QgZGV2U2VydmVyQ29uZmlnID0gZGV2U2VydmVyQ2ZnIHx8IHdlYnBhY2tDb25maWcuZGV2U2VydmVyIHx8IHt9O1xuICAgICAgZGV2U2VydmVyQ29uZmlnLmhvc3QgPSBkZXZTZXJ2ZXJDb25maWcuaG9zdCB8fCAnbG9jYWxob3N0JztcbiAgICAgIGRldlNlcnZlckNvbmZpZy5wb3J0ID0gZGV2U2VydmVyQ29uZmlnLnBvcnQgfHwgODA4MDtcblxuICAgICAgaWYgKGRldlNlcnZlckNvbmZpZy5zdGF0cykge1xuICAgICAgICB3ZWJwYWNrQ29uZmlnLnN0YXRzID0gZGV2U2VydmVyQ29uZmlnLnN0YXRzO1xuICAgICAgfVxuICAgICAgLy8gRGlzYWJsZSBzdGF0cyByZXBvcnRpbmcgYnkgdGhlIGRldnNlcnZlciwgd2UgaGF2ZSBvdXIgb3duIGxvZ2dlci5cbiAgICAgIGRldlNlcnZlckNvbmZpZy5zdGF0cyA9IGZhbHNlO1xuXG4gICAgICBjb25zdCB3ZWJwYWNrQ29tcGlsZXIgPSB3ZWJwYWNrKHdlYnBhY2tDb25maWcpO1xuICAgICAgY29uc3Qgc2VydmVyID0gbmV3IFdlYnBhY2tEZXZTZXJ2ZXIod2VicGFja0NvbXBpbGVyLCBkZXZTZXJ2ZXJDb25maWcpO1xuXG4gICAgICB3ZWJwYWNrQ29tcGlsZXIuaG9va3MuZG9uZS50YXAoJ2J1aWxkLXdlYnBhY2snLCAoc3RhdHMpID0+IHtcbiAgICAgICAgLy8gTG9nIHN0YXRzLlxuICAgICAgICBsb2dnaW5nQ2Ioc3RhdHMsIHdlYnBhY2tDb25maWcsIHRoaXMuY29udGV4dC5sb2dnZXIpO1xuXG4gICAgICAgIG9icy5uZXh0KHsgc3VjY2VzczogIXN0YXRzLmhhc0Vycm9ycygpIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHNlcnZlci5saXN0ZW4oXG4gICAgICAgIGRldlNlcnZlckNvbmZpZy5wb3J0LFxuICAgICAgICBkZXZTZXJ2ZXJDb25maWcuaG9zdCxcbiAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIG9icy5lcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIC8vIFRlYXJkb3duIGxvZ2ljLiBDbG9zZSB0aGUgc2VydmVyIHdoZW4gdW5zdWJzY3JpYmVkIGZyb20uXG4gICAgICByZXR1cm4gKCkgPT4gc2VydmVyLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBXZWJwYWNrRGV2U2VydmVyQnVpbGRlcjtcbiJdfQ==