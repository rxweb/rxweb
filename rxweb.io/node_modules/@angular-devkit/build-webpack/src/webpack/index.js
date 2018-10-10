"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const webpack = require("webpack");
exports.defaultLoggingCb = (stats, config, logger) => logger.info(stats.toString(config.stats));
class WebpackBuilder {
    constructor(context) {
        this.context = context;
    }
    run(builderConfig) {
        const configPath = core_1.resolve(this.context.workspace.root, core_1.normalize(builderConfig.options.webpackConfig));
        return this.loadWebpackConfig(core_1.getSystemPath(configPath)).pipe(operators_1.concatMap(config => this.runWebpack(config)));
    }
    loadWebpackConfig(webpackConfigPath) {
        return rxjs_1.from(Promise.resolve().then(() => require(webpackConfigPath)));
    }
    runWebpack(config, loggingCb = exports.defaultLoggingCb) {
        return new rxjs_1.Observable(obs => {
            const webpackCompiler = webpack(config);
            const callback = (err, stats) => {
                if (err) {
                    return obs.error(err);
                }
                // Log stats.
                loggingCb(stats, config, this.context.logger);
                obs.next({ success: !stats.hasErrors() });
                if (!config.watch) {
                    obs.complete();
                }
            };
            try {
                if (config.watch) {
                    const watchOptions = config.watchOptions || {};
                    const watching = webpackCompiler.watch(watchOptions, callback);
                    // Teardown logic. Close the watcher when unsubscribed from.
                    return () => watching.close(() => { });
                }
                else {
                    webpackCompiler.run(callback);
                }
            }
            catch (err) {
                if (err) {
                    this.context.logger.error('\nAn error occured during the build:\n' + ((err && err.stack) || err));
                }
                throw err;
            }
        });
    }
}
exports.WebpackBuilder = WebpackBuilder;
exports.default = WebpackBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX3dlYnBhY2svc3JjL3dlYnBhY2svaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFhQSwrQ0FBd0Y7QUFDeEYsK0JBQXdDO0FBQ3hDLDhDQUEyQztBQUMzQyxtQ0FBbUM7QUFRdEIsUUFBQSxnQkFBZ0IsR0FBb0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUU1QztJQUVFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQUksQ0FBQztJQUUvQyxHQUFHLENBQUMsYUFBeUQ7UUFDM0QsTUFBTSxVQUFVLEdBQUcsY0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFDcEQsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFFbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzRCxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUM3QyxDQUFDO0lBQ0osQ0FBQztJQUVNLGlCQUFpQixDQUFDLGlCQUF5QjtRQUNoRCxNQUFNLENBQUMsV0FBSSxzQ0FBUSxpQkFBaUIsR0FBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTSxVQUFVLENBQ2YsTUFBNkIsRUFBRSxTQUFTLEdBQUcsd0JBQWdCO1FBRTNELE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDMUIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhDLE1BQU0sUUFBUSxHQUFzQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDakUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxhQUFhO2dCQUNiLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTlDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUUxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNsQixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2pCLENBQUM7WUFDSCxDQUFDLENBQUM7WUFFRixJQUFJLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO29CQUMvQyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFFL0QsNERBQTREO29CQUM1RCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBQ0gsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ3ZCLHdDQUF3QyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLENBQUM7Z0JBQ0QsTUFBTSxHQUFHLENBQUM7WUFDWixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF6REQsd0NBeURDO0FBRUQsa0JBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgQnVpbGRFdmVudCxcbiAgQnVpbGRlcixcbiAgQnVpbGRlckNvbmZpZ3VyYXRpb24sXG4gIEJ1aWxkZXJDb250ZXh0LFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvYXJjaGl0ZWN0JztcbmltcG9ydCB7IFBhdGgsIGdldFN5c3RlbVBhdGgsIGxvZ2dpbmcsIG5vcm1hbGl6ZSwgcmVzb2x2ZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIHdlYnBhY2sgZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgeyBXZWJwYWNrQnVpbGRlclNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dpbmdDYWxsYmFjayB7XG4gIChzdGF0czogd2VicGFjay5TdGF0cywgY29uZmlnOiB3ZWJwYWNrLkNvbmZpZ3VyYXRpb24sIGxvZ2dlcjogbG9nZ2luZy5Mb2dnZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdExvZ2dpbmdDYjogTG9nZ2luZ0NhbGxiYWNrID0gKHN0YXRzLCBjb25maWcsIGxvZ2dlcikgPT5cbiAgbG9nZ2VyLmluZm8oc3RhdHMudG9TdHJpbmcoY29uZmlnLnN0YXRzKSk7XG5cbmV4cG9ydCBjbGFzcyBXZWJwYWNrQnVpbGRlciBpbXBsZW1lbnRzIEJ1aWxkZXI8V2VicGFja0J1aWxkZXJTY2hlbWE+IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGV4dDogQnVpbGRlckNvbnRleHQpIHsgfVxuXG4gIHJ1bihidWlsZGVyQ29uZmlnOiBCdWlsZGVyQ29uZmlndXJhdGlvbjxXZWJwYWNrQnVpbGRlclNjaGVtYT4pOiBPYnNlcnZhYmxlPEJ1aWxkRXZlbnQ+IHtcbiAgICBjb25zdCBjb25maWdQYXRoID0gcmVzb2x2ZSh0aGlzLmNvbnRleHQud29ya3NwYWNlLnJvb3QsXG4gICAgICBub3JtYWxpemUoYnVpbGRlckNvbmZpZy5vcHRpb25zLndlYnBhY2tDb25maWcpKTtcblxuICAgIHJldHVybiB0aGlzLmxvYWRXZWJwYWNrQ29uZmlnKGdldFN5c3RlbVBhdGgoY29uZmlnUGF0aCkpLnBpcGUoXG4gICAgICBjb25jYXRNYXAoY29uZmlnID0+IHRoaXMucnVuV2VicGFjayhjb25maWcpKSxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGxvYWRXZWJwYWNrQ29uZmlnKHdlYnBhY2tDb25maWdQYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHdlYnBhY2suQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiBmcm9tKGltcG9ydCh3ZWJwYWNrQ29uZmlnUGF0aCkpO1xuICB9XG5cbiAgcHVibGljIHJ1bldlYnBhY2soXG4gICAgY29uZmlnOiB3ZWJwYWNrLkNvbmZpZ3VyYXRpb24sIGxvZ2dpbmdDYiA9IGRlZmF1bHRMb2dnaW5nQ2IsXG4gICk6IE9ic2VydmFibGU8QnVpbGRFdmVudD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgICAgY29uc3Qgd2VicGFja0NvbXBpbGVyID0gd2VicGFjayhjb25maWcpO1xuXG4gICAgICBjb25zdCBjYWxsYmFjazogd2VicGFjay5jb21waWxlci5Db21waWxlckNhbGxiYWNrID0gKGVyciwgc3RhdHMpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBvYnMuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvZyBzdGF0cy5cbiAgICAgICAgbG9nZ2luZ0NiKHN0YXRzLCBjb25maWcsIHRoaXMuY29udGV4dC5sb2dnZXIpO1xuXG4gICAgICAgIG9icy5uZXh0KHsgc3VjY2VzczogIXN0YXRzLmhhc0Vycm9ycygpIH0pO1xuXG4gICAgICAgIGlmICghY29uZmlnLndhdGNoKSB7XG4gICAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChjb25maWcud2F0Y2gpIHtcbiAgICAgICAgICBjb25zdCB3YXRjaE9wdGlvbnMgPSBjb25maWcud2F0Y2hPcHRpb25zIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IHdhdGNoaW5nID0gd2VicGFja0NvbXBpbGVyLndhdGNoKHdhdGNoT3B0aW9ucywgY2FsbGJhY2spO1xuXG4gICAgICAgICAgLy8gVGVhcmRvd24gbG9naWMuIENsb3NlIHRoZSB3YXRjaGVyIHdoZW4gdW5zdWJzY3JpYmVkIGZyb20uXG4gICAgICAgICAgcmV0dXJuICgpID0+IHdhdGNoaW5nLmNsb3NlKCgpID0+IHsgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VicGFja0NvbXBpbGVyLnJ1bihjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgdGhpcy5jb250ZXh0LmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICdcXG5BbiBlcnJvciBvY2N1cmVkIGR1cmluZyB0aGUgYnVpbGQ6XFxuJyArICgoZXJyICYmIGVyci5zdGFjaykgfHwgZXJyKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYnBhY2tCdWlsZGVyO1xuIl19