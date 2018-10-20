"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const require_project_module_1 = require("../angular-cli-files/utilities/require-project-module");
const service_worker_1 = require("../angular-cli-files/utilities/service-worker");
class AppShellBuilder {
    constructor(context) {
        this.context = context;
    }
    run(builderConfig) {
        const options = builderConfig.options;
        return new rxjs_1.Observable(obs => {
            let success = true;
            const subscription = rxjs_1.merge(this.build(options.serverTarget, {}), 
            // Never run the browser target in watch mode.
            // If service worker is needed, it will be added in this.renderUniversal();
            this.build(options.browserTarget, { watch: false, serviceWorker: false })).subscribe((event) => {
                // TODO: once we support a better build event, add support for merging two event streams
                // together.
                success = success && event.success;
            }, error => {
                obs.error(error);
            }, () => {
                obs.next({ success });
                obs.complete();
            });
            // Allow subscriptions to us to unsubscribe from each builds at the same time.
            return () => subscription.unsubscribe();
        }).pipe(operators_1.switchMap(event => {
            if (!event.success) {
                return rxjs_1.of(event);
            }
            return this.renderUniversal(options);
        }));
    }
    build(targetString, overrides) {
        const architect = this.context.architect;
        const [project, target, configuration] = targetString.split(':');
        // Override browser build watch setting.
        const builderConfig = architect.getBuilderConfiguration({
            project,
            target,
            configuration,
            overrides,
        });
        return architect.run(builderConfig, this.context);
    }
    getServerModuleBundlePath(options) {
        const architect = this.context.architect;
        return new rxjs_1.Observable(obs => {
            if (options.appModuleBundle) {
                obs.next(core_1.join(this.context.workspace.root, options.appModuleBundle));
                return obs.complete();
            }
            else {
                const [project, target, configuration] = options.serverTarget.split(':');
                const builderConfig = architect.getBuilderConfiguration({
                    project,
                    target,
                    configuration,
                });
                return architect.getBuilderDescription(builderConfig).pipe(operators_1.concatMap(description => architect.validateBuilderOptions(builderConfig, description)), operators_1.switchMap(config => {
                    const outputPath = core_1.join(this.context.workspace.root, config.options.outputPath);
                    return this.context.host.list(outputPath).pipe(operators_1.switchMap(files => {
                        const re = /^main\.(?:[a-zA-Z0-9]{20}\.)?(?:bundle\.)?js$/;
                        const maybeMain = files.filter(x => re.test(x))[0];
                        if (!maybeMain) {
                            return rxjs_1.throwError(new Error('Could not find the main bundle.'));
                        }
                        else {
                            return rxjs_1.of(core_1.join(outputPath, maybeMain));
                        }
                    }));
                })).subscribe(obs);
            }
        });
    }
    getBrowserBuilderConfig(options) {
        const architect = this.context.architect;
        const [project, target, configuration] = options.browserTarget.split(':');
        const builderConfig = architect.getBuilderConfiguration({
            project,
            target,
            configuration,
        });
        return architect.getBuilderDescription(builderConfig).pipe(operators_1.concatMap(description => architect.validateBuilderOptions(builderConfig, description)));
    }
    renderUniversal(options) {
        let browserOptions;
        let projectRoot;
        return rxjs_1.forkJoin(this.getBrowserBuilderConfig(options).pipe(operators_1.switchMap(config => {
            browserOptions = config.options;
            projectRoot = core_1.resolve(this.context.workspace.root, config.root);
            const browserIndexOutputPath = core_1.join(core_1.normalize(browserOptions.outputPath), 'index.html');
            const path = core_1.join(this.context.workspace.root, browserIndexOutputPath);
            return this.context.host.read(path).pipe(operators_1.map(x => {
                return [browserIndexOutputPath, x];
            }));
        })), this.getServerModuleBundlePath(options)).pipe(operators_1.switchMap(([[browserIndexOutputPath, indexContent], serverBundlePath]) => {
            const root = this.context.workspace.root;
            require_project_module_1.requireProjectModule(core_1.getSystemPath(root), 'zone.js/dist/zone-node');
            const renderModuleFactory = require_project_module_1.requireProjectModule(core_1.getSystemPath(root), '@angular/platform-server').renderModuleFactory;
            const AppServerModuleNgFactory = require(core_1.getSystemPath(serverBundlePath)).AppServerModuleNgFactory;
            const indexHtml = core_1.virtualFs.fileBufferToString(indexContent);
            const outputIndexPath = core_1.join(root, options.outputIndexPath || browserIndexOutputPath);
            // Render to HTML and overwrite the client index file.
            return rxjs_1.from(renderModuleFactory(AppServerModuleNgFactory, {
                document: indexHtml,
                url: options.route,
            })
                .then((html) => {
                return this.context.host
                    .write(outputIndexPath, core_1.virtualFs.stringToFileBuffer(html))
                    .toPromise();
            })
                .then(() => {
                if (browserOptions.serviceWorker) {
                    return service_worker_1.augmentAppWithServiceWorker(this.context.host, root, projectRoot, core_1.join(root, browserOptions.outputPath), browserOptions.baseHref || '/', browserOptions.ngswConfigPath);
                }
            })
                .then(() => ({ success: true })));
        }));
    }
}
exports.AppShellBuilder = AppShellBuilder;
exports.default = AppShellBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL2FwcC1zaGVsbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWFBLCtDQUFnRztBQUNoRywrQkFBeUU7QUFDekUsOENBQTJEO0FBQzNELGtHQUE2RjtBQUM3RixrRkFBNEY7QUFNNUY7SUFFRSxZQUFtQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFJLENBQUM7SUFFL0MsR0FBRyxDQUFDLGFBQStEO1FBQ2pFLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFFdEMsT0FBTyxJQUFJLGlCQUFVLENBQWEsR0FBRyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE1BQU0sWUFBWSxHQUFHLFlBQUssQ0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztZQUNwQyw4Q0FBOEM7WUFDOUMsMkVBQTJFO1lBQzNFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQzFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBaUIsRUFBRSxFQUFFO2dCQUNoQyx3RkFBd0Y7Z0JBQ3hGLFlBQVk7Z0JBQ1osT0FBTyxHQUFHLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3JDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDVCxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLENBQUMsRUFBRSxHQUFHLEVBQUU7Z0JBQ04sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxRQUFRLEVB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QUFDO1lBRXRGLHNEQUFzRDtZQUN0RCxPQUFPLFdBQUksQ0FDVCxtQkFBbUIsQ0FBQyx3QkFBd0IsRUFBRTtnQkFDNUMsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSzthQUNuQixDQUFDO2lCQUNELElBQUksQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFO2dCQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtxQkFDckIsS0FBSyxDQUFDLGVBQWUsRUFBRSxnQkFBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMxRCxTQUFTLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxJQUFJLGNBQWMsQ0FBQyxhQUFhLEVBQUU7b0JBQ2hDLE9BQU8sNENBQTJCLENBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUNqQixJQUFJLEVBQ0osV0FBVyxFQUNYLFdBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUNyQyxjQUFjLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFDOUIsY0FBYyxDQUFDLGNBQWMsQ0FDOUIsQ0FBQztpQkFDSDtZQUNILENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBektELDBDQXlLQztBQUVELGtCQUFlLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIEJ1aWxkRXZlbnQsXG4gIEJ1aWxkZXIsXG4gIEJ1aWxkZXJDb25maWd1cmF0aW9uLFxuICBCdWlsZGVyQ29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2FyY2hpdGVjdCc7XG5pbXBvcnQgeyBQYXRoLCBnZXRTeXN0ZW1QYXRoLCBqb2luLCBub3JtYWxpemUsIHJlc29sdmUsIHZpcnR1YWxGcyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZvcmtKb2luLCBmcm9tLCBtZXJnZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyByZXF1aXJlUHJvamVjdE1vZHVsZSB9IGZyb20gJy4uL2FuZ3VsYXItY2xpLWZpbGVzL3V0aWxpdGllcy9yZXF1aXJlLXByb2plY3QtbW9kdWxlJztcbmltcG9ydCB7IGF1Z21lbnRBcHBXaXRoU2VydmljZVdvcmtlciB9IGZyb20gJy4uL2FuZ3VsYXItY2xpLWZpbGVzL3V0aWxpdGllcy9zZXJ2aWNlLXdvcmtlcic7XG5pbXBvcnQgeyBCcm93c2VyQnVpbGRlclNjaGVtYSB9IGZyb20gJy4uL2Jyb3dzZXIvc2NoZW1hJztcbmltcG9ydCB7IEJ1aWxkV2VicGFja1NlcnZlclNjaGVtYSB9IGZyb20gJy4uL3NlcnZlci9zY2hlbWEnO1xuaW1wb3J0IHsgQnVpbGRXZWJwYWNrQXBwU2hlbGxTY2hlbWEgfSBmcm9tICcuL3NjaGVtYSc7XG5cblxuZXhwb3J0IGNsYXNzIEFwcFNoZWxsQnVpbGRlciBpbXBsZW1lbnRzIEJ1aWxkZXI8QnVpbGRXZWJwYWNrQXBwU2hlbGxTY2hlbWE+IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGV4dDogQnVpbGRlckNvbnRleHQpIHsgfVxuXG4gIHJ1bihidWlsZGVyQ29uZmlnOiBCdWlsZGVyQ29uZmlndXJhdGlvbjxCdWlsZFdlYnBhY2tBcHBTaGVsbFNjaGVtYT4pOiBPYnNlcnZhYmxlPEJ1aWxkRXZlbnQ+IHtcbiAgICBjb25zdCBvcHRpb25zID0gYnVpbGRlckNvbmZpZy5vcHRpb25zO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPEJ1aWxkRXZlbnQ+KG9icyA9PiB7XG4gICAgICBsZXQgc3VjY2VzcyA9IHRydWU7XG4gICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBtZXJnZShcbiAgICAgICAgdGhpcy5idWlsZChvcHRpb25zLnNlcnZlclRhcmdldCwge30pLFxuICAgICAgICAvLyBOZXZlciBydW4gdGhlIGJyb3dzZXIgdGFyZ2V0IGluIHdhdGNoIG1vZGUuXG4gICAgICAgIC8vIElmIHNlcnZpY2Ugd29ya2VyIGlzIG5lZWRlZCwgaXQgd2lsbCBiZSBhZGRlZCBpbiB0aGlzLnJlbmRlclVuaXZlcnNhbCgpO1xuICAgICAgICB0aGlzLmJ1aWxkKG9wdGlvbnMuYnJvd3NlclRhcmdldCwgeyB3YXRjaDogZmFsc2UsIHNlcnZpY2VXb3JrZXI6IGZhbHNlIH0pLFxuICAgICAgKS5zdWJzY3JpYmUoKGV2ZW50OiBCdWlsZEV2ZW50KSA9PiB7XG4gICAgICAgIC8vIFRPRE86IG9uY2Ugd2Ugc3VwcG9ydCBhIGJldHRlciBidWlsZCBldmVudCwgYWRkIHN1cHBvcnQgZm9yIG1lcmdpbmcgdHdvIGV2ZW50IHN0cmVhbXNcbiAgICAgICAgLy8gdG9nZXRoZXIuXG4gICAgICAgIHN1Y2Nlc3MgPSBzdWNjZXNzICYmIGV2ZW50LnN1Y2Nlc3M7XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIG9icy5lcnJvcihlcnJvcik7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIG9icy5uZXh0KHsgc3VjY2VzcyB9KTtcbiAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQWxsb3cgc3Vic2NyaXB0aW9ucyB0byB1cyB0byB1bnN1YnNjcmliZSBmcm9tIGVhY2ggYnVpbGRzIGF0IHRoZSBzYW1lIHRpbWUuXG4gICAgICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChldmVudCA9PiB7XG4gICAgICAgIGlmICghZXZlbnQuc3VjY2Vzcykge1xuICAgICAgICAgIHJldHVybiBvZihldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJVbml2ZXJzYWwob3B0aW9ucyk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgYnVpbGQodGFyZ2V0U3RyaW5nOiBzdHJpbmcsIG92ZXJyaWRlczoge30pIHtcbiAgICBjb25zdCBhcmNoaXRlY3QgPSB0aGlzLmNvbnRleHQuYXJjaGl0ZWN0O1xuICAgIGNvbnN0IFtwcm9qZWN0LCB0YXJnZXQsIGNvbmZpZ3VyYXRpb25dID0gdGFyZ2V0U3RyaW5nLnNwbGl0KCc6Jyk7XG5cbiAgICAvLyBPdmVycmlkZSBicm93c2VyIGJ1aWxkIHdhdGNoIHNldHRpbmcuXG4gICAgY29uc3QgYnVpbGRlckNvbmZpZyA9IGFyY2hpdGVjdC5nZXRCdWlsZGVyQ29uZmlndXJhdGlvbjx7fT4oe1xuICAgICAgcHJvamVjdCxcbiAgICAgIHRhcmdldCxcbiAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICBvdmVycmlkZXMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXJjaGl0ZWN0LnJ1bihidWlsZGVyQ29uZmlnLCB0aGlzLmNvbnRleHQpO1xuICB9XG5cbiAgZ2V0U2VydmVyTW9kdWxlQnVuZGxlUGF0aChvcHRpb25zOiBCdWlsZFdlYnBhY2tBcHBTaGVsbFNjaGVtYSkge1xuICAgIGNvbnN0IGFyY2hpdGVjdCA9IHRoaXMuY29udGV4dC5hcmNoaXRlY3Q7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8UGF0aD4ob2JzID0+IHtcbiAgICAgIGlmIChvcHRpb25zLmFwcE1vZHVsZUJ1bmRsZSkge1xuICAgICAgICBvYnMubmV4dChqb2luKHRoaXMuY29udGV4dC53b3Jrc3BhY2Uucm9vdCwgb3B0aW9ucy5hcHBNb2R1bGVCdW5kbGUpKTtcblxuICAgICAgICByZXR1cm4gb2JzLmNvbXBsZXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBbcHJvamVjdCwgdGFyZ2V0LCBjb25maWd1cmF0aW9uXSA9IG9wdGlvbnMuc2VydmVyVGFyZ2V0LnNwbGl0KCc6Jyk7XG4gICAgICAgIGNvbnN0IGJ1aWxkZXJDb25maWcgPSBhcmNoaXRlY3QuZ2V0QnVpbGRlckNvbmZpZ3VyYXRpb248QnVpbGRXZWJwYWNrU2VydmVyU2NoZW1hPih7XG4gICAgICAgICAgcHJvamVjdCxcbiAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFyY2hpdGVjdC5nZXRCdWlsZGVyRGVzY3JpcHRpb24oYnVpbGRlckNvbmZpZykucGlwZShcbiAgICAgICAgICBjb25jYXRNYXAoZGVzY3JpcHRpb24gPT4gYXJjaGl0ZWN0LnZhbGlkYXRlQnVpbGRlck9wdGlvbnMoYnVpbGRlckNvbmZpZywgZGVzY3JpcHRpb24pKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoY29uZmlnID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dFBhdGggPSBqb2luKHRoaXMuY29udGV4dC53b3Jrc3BhY2Uucm9vdCwgY29uZmlnLm9wdGlvbnMub3V0cHV0UGF0aCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuaG9zdC5saXN0KG91dHB1dFBhdGgpLnBpcGUoXG4gICAgICAgICAgICAgIHN3aXRjaE1hcChmaWxlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmUgPSAvXm1haW5cXC4oPzpbYS16QS1aMC05XXsyMH1cXC4pPyg/OmJ1bmRsZVxcLik/anMkLztcbiAgICAgICAgICAgICAgICBjb25zdCBtYXliZU1haW4gPSBmaWxlcy5maWx0ZXIoeCA9PiByZS50ZXN0KHgpKVswXTtcblxuICAgICAgICAgICAgICAgIGlmICghbWF5YmVNYWluKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRoZSBtYWluIGJ1bmRsZS4nKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvZihqb2luKG91dHB1dFBhdGgsIG1heWJlTWFpbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pLFxuICAgICAgICApLnN1YnNjcmliZShvYnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0QnJvd3NlckJ1aWxkZXJDb25maWcob3B0aW9uczogQnVpbGRXZWJwYWNrQXBwU2hlbGxTY2hlbWEpIHtcbiAgICBjb25zdCBhcmNoaXRlY3QgPSB0aGlzLmNvbnRleHQuYXJjaGl0ZWN0O1xuICAgIGNvbnN0IFtwcm9qZWN0LCB0YXJnZXQsIGNvbmZpZ3VyYXRpb25dID0gb3B0aW9ucy5icm93c2VyVGFyZ2V0LnNwbGl0KCc6Jyk7XG4gICAgY29uc3QgYnVpbGRlckNvbmZpZyA9IGFyY2hpdGVjdC5nZXRCdWlsZGVyQ29uZmlndXJhdGlvbjxCcm93c2VyQnVpbGRlclNjaGVtYT4oe1xuICAgICAgcHJvamVjdCxcbiAgICAgIHRhcmdldCxcbiAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXJjaGl0ZWN0LmdldEJ1aWxkZXJEZXNjcmlwdGlvbihidWlsZGVyQ29uZmlnKS5waXBlKFxuICAgICAgY29uY2F0TWFwKGRlc2NyaXB0aW9uID0+IGFyY2hpdGVjdC52YWxpZGF0ZUJ1aWxkZXJPcHRpb25zKGJ1aWxkZXJDb25maWcsIGRlc2NyaXB0aW9uKSksXG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlclVuaXZlcnNhbChvcHRpb25zOiBCdWlsZFdlYnBhY2tBcHBTaGVsbFNjaGVtYSk6IE9ic2VydmFibGU8QnVpbGRFdmVudD4ge1xuICAgIGxldCBicm93c2VyT3B0aW9uczogQnJvd3NlckJ1aWxkZXJTY2hlbWE7XG4gICAgbGV0IHByb2plY3RSb290OiBQYXRoO1xuXG4gICAgcmV0dXJuIGZvcmtKb2luKFxuICAgICAgdGhpcy5nZXRCcm93c2VyQnVpbGRlckNvbmZpZyhvcHRpb25zKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoY29uZmlnID0+IHtcbiAgICAgICAgICBicm93c2VyT3B0aW9ucyA9IGNvbmZpZy5vcHRpb25zO1xuICAgICAgICAgIHByb2plY3RSb290ID0gcmVzb2x2ZSh0aGlzLmNvbnRleHQud29ya3NwYWNlLnJvb3QsIGNvbmZpZy5yb290KTtcbiAgICAgICAgICBjb25zdCBicm93c2VySW5kZXhPdXRwdXRQYXRoID0gam9pbihub3JtYWxpemUoYnJvd3Nlck9wdGlvbnMub3V0cHV0UGF0aCksICdpbmRleC5odG1sJyk7XG4gICAgICAgICAgY29uc3QgcGF0aCA9IGpvaW4odGhpcy5jb250ZXh0LndvcmtzcGFjZS5yb290LCBicm93c2VySW5kZXhPdXRwdXRQYXRoKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuaG9zdC5yZWFkKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXA8dmlydHVhbEZzLkZpbGVCdWZmZXIsIFtQYXRoLCB2aXJ0dWFsRnMuRmlsZUJ1ZmZlcl0+KHggPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gW2Jyb3dzZXJJbmRleE91dHB1dFBhdGgsIHhdO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRTZXJ2ZXJNb2R1bGVCdW5kbGVQYXRoKG9wdGlvbnMpLFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW1ticm93c2VySW5kZXhPdXRwdXRQYXRoLCBpbmRleENvbnRlbnRdLCBzZXJ2ZXJCdW5kbGVQYXRoXSkgPT4ge1xuICAgICAgICBjb25zdCByb290ID0gdGhpcy5jb250ZXh0LndvcmtzcGFjZS5yb290O1xuICAgICAgICByZXF1aXJlUHJvamVjdE1vZHVsZShnZXRTeXN0ZW1QYXRoKHJvb3QpLCAnem9uZS5qcy9kaXN0L3pvbmUtbm9kZScpO1xuXG4gICAgICAgIGNvbnN0IHJlbmRlck1vZHVsZUZhY3RvcnkgPSByZXF1aXJlUHJvamVjdE1vZHVsZShcbiAgICAgICAgICBnZXRTeXN0ZW1QYXRoKHJvb3QpLFxuICAgICAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXInLFxuICAgICAgICApLnJlbmRlck1vZHVsZUZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IEFwcFNlcnZlck1vZHVsZU5nRmFjdG9yeSA9IHJlcXVpcmUoXG4gICAgICAgICAgZ2V0U3lzdGVtUGF0aChzZXJ2ZXJCdW5kbGVQYXRoKSxcbiAgICAgICAgKS5BcHBTZXJ2ZXJNb2R1bGVOZ0ZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IGluZGV4SHRtbCA9IHZpcnR1YWxGcy5maWxlQnVmZmVyVG9TdHJpbmcoaW5kZXhDb250ZW50KTtcbiAgICAgICAgY29uc3Qgb3V0cHV0SW5kZXhQYXRoID0gam9pbihyb290LCBvcHRpb25zLm91dHB1dEluZGV4UGF0aCB8fCBicm93c2VySW5kZXhPdXRwdXRQYXRoKTtcblxuICAgICAgICAvLyBSZW5kZXIgdG8gSFRNTCBhbmQgb3ZlcndyaXRlIHRoZSBjbGllbnQgaW5kZXggZmlsZS5cbiAgICAgICAgcmV0dXJuIGZyb20oXG4gICAgICAgICAgcmVuZGVyTW9kdWxlRmFjdG9yeShBcHBTZXJ2ZXJNb2R1bGVOZ0ZhY3RvcnksIHtcbiAgICAgICAgICAgIGRvY3VtZW50OiBpbmRleEh0bWwsXG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMucm91dGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoaHRtbDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0Lmhvc3RcbiAgICAgICAgICAgICAgLndyaXRlKG91dHB1dEluZGV4UGF0aCwgdmlydHVhbEZzLnN0cmluZ1RvRmlsZUJ1ZmZlcihodG1sKSlcbiAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJyb3dzZXJPcHRpb25zLnNlcnZpY2VXb3JrZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGF1Z21lbnRBcHBXaXRoU2VydmljZVdvcmtlcihcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaG9zdCxcbiAgICAgICAgICAgICAgICByb290LFxuICAgICAgICAgICAgICAgIHByb2plY3RSb290LFxuICAgICAgICAgICAgICAgIGpvaW4ocm9vdCwgYnJvd3Nlck9wdGlvbnMub3V0cHV0UGF0aCksXG4gICAgICAgICAgICAgICAgYnJvd3Nlck9wdGlvbnMuYmFzZUhyZWYgfHwgJy8nLFxuICAgICAgICAgICAgICAgIGJyb3dzZXJPcHRpb25zLm5nc3dDb25maWdQYXRoLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKCkgPT4gKHsgc3VjY2VzczogdHJ1ZSB9KSksXG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFNoZWxsQnVpbGRlcjtcbiJdfQ==