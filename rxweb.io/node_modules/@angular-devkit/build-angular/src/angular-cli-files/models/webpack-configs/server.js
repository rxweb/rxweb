"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a partial specific to creating a bundle for node
 * @param wco Options which are include the build options and app config
 */
function getServerConfig(wco) {
    const config = {
        devtool: wco.buildOptions.sourceMap ? 'source-map' : false,
        resolve: {
            mainFields: [
                ...(wco.supportES2015 ? ['es2015'] : []),
                'main', 'module',
            ],
        },
        target: 'node',
        output: {
            libraryTarget: 'commonjs'
        },
        node: false,
    };
    if (wco.buildOptions.bundleDependencies == 'none') {
        config.externals = [
            /^@angular/,
            (_, request, callback) => {
                // Absolute & Relative paths are not externals
                if (request.match(/^\.{0,2}\//)) {
                    return callback();
                }
                try {
                    // Attempt to resolve the module via Node
                    const e = require.resolve(request);
                    if (/node_modules/.test(e)) {
                        // It's a node_module
                        callback(null, request);
                    }
                    else {
                        // It's a system thing (.ie util, fs...)
                        callback();
                    }
                }
                catch (_a) {
                    // Node couldn't find it, so it must be user-aliased
                    callback();
                }
            }
        ];
    }
    return config;
}
exports.getServerConfig = getServerConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9tb2RlbHMvd2VicGFjay1jb25maWdzL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUJBQWlCO0FBQ2pCLCtEQUErRDs7QUFJL0Q7OztHQUdHO0FBQ0gseUJBQWdDLEdBQXlCO0lBRXZELE1BQU0sTUFBTSxHQUFRO1FBQ2xCLE9BQU8sRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQzFELE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRTtnQkFDVixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxNQUFNLEVBQUUsUUFBUTthQUNqQjtTQUNGO1FBQ0QsTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNLEVBQUU7WUFDTixhQUFhLEVBQUUsVUFBVTtTQUMxQjtRQUNELElBQUksRUFBRSxLQUFLO0tBQ1osQ0FBQztJQUVGLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLEVBQUU7UUFDakQsTUFBTSxDQUFDLFNBQVMsR0FBRztZQUNqQixXQUFXO1lBQ1gsQ0FBQyxDQUFNLEVBQUUsT0FBWSxFQUFFLFFBQTZDLEVBQUUsRUFBRTtnQkFDdEUsOENBQThDO2dCQUM5QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sUUFBUSxFQUFFLENBQUM7aUJBQ25CO2dCQUVELElBQUk7b0JBQ0YseUNBQXlDO29CQUN6QyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzFCLHFCQUFxQjt3QkFDckIsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztxQkFDekI7eUJBQU07d0JBQ0wsd0NBQXdDO3dCQUN4QyxRQUFRLEVBQUUsQ0FBQztxQkFDWjtpQkFDRjtnQkFBQyxXQUFNO29CQUNOLG9EQUFvRDtvQkFDcEQsUUFBUSxFQUFFLENBQUM7aUJBQ1o7WUFDSCxDQUFDO1NBQ0YsQ0FBQztLQUNIO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQTdDRCwwQ0E2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5cbmltcG9ydCB7IFdlYnBhY2tDb25maWdPcHRpb25zIH0gZnJvbSAnLi4vYnVpbGQtb3B0aW9ucyc7XG5cbi8qKlxuICogUmV0dXJucyBhIHBhcnRpYWwgc3BlY2lmaWMgdG8gY3JlYXRpbmcgYSBidW5kbGUgZm9yIG5vZGVcbiAqIEBwYXJhbSB3Y28gT3B0aW9ucyB3aGljaCBhcmUgaW5jbHVkZSB0aGUgYnVpbGQgb3B0aW9ucyBhbmQgYXBwIGNvbmZpZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VydmVyQ29uZmlnKHdjbzogV2VicGFja0NvbmZpZ09wdGlvbnMpIHtcblxuICBjb25zdCBjb25maWc6IGFueSA9IHtcbiAgICBkZXZ0b29sOiB3Y28uYnVpbGRPcHRpb25zLnNvdXJjZU1hcCA/ICdzb3VyY2UtbWFwJyA6IGZhbHNlLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIG1haW5GaWVsZHM6IFtcbiAgICAgICAgLi4uKHdjby5zdXBwb3J0RVMyMDE1ID8gWydlczIwMTUnXSA6IFtdKSxcbiAgICAgICAgJ21haW4nLCAnbW9kdWxlJyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB0YXJnZXQ6ICdub2RlJyxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIGxpYnJhcnlUYXJnZXQ6ICdjb21tb25qcydcbiAgICB9LFxuICAgIG5vZGU6IGZhbHNlLFxuICB9O1xuXG4gIGlmICh3Y28uYnVpbGRPcHRpb25zLmJ1bmRsZURlcGVuZGVuY2llcyA9PSAnbm9uZScpIHtcbiAgICBjb25maWcuZXh0ZXJuYWxzID0gW1xuICAgICAgL15AYW5ndWxhci8sXG4gICAgICAoXzogYW55LCByZXF1ZXN0OiBhbnksIGNhbGxiYWNrOiAoZXJyb3I/OiBhbnksIHJlc3VsdD86IGFueSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICAvLyBBYnNvbHV0ZSAmIFJlbGF0aXZlIHBhdGhzIGFyZSBub3QgZXh0ZXJuYWxzXG4gICAgICAgIGlmIChyZXF1ZXN0Lm1hdGNoKC9eXFwuezAsMn1cXC8vKSkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBBdHRlbXB0IHRvIHJlc29sdmUgdGhlIG1vZHVsZSB2aWEgTm9kZVxuICAgICAgICAgIGNvbnN0IGUgPSByZXF1aXJlLnJlc29sdmUocmVxdWVzdCk7XG4gICAgICAgICAgaWYgKC9ub2RlX21vZHVsZXMvLnRlc3QoZSkpIHtcbiAgICAgICAgICAgIC8vIEl0J3MgYSBub2RlX21vZHVsZVxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0J3MgYSBzeXN0ZW0gdGhpbmcgKC5pZSB1dGlsLCBmcy4uLilcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvLyBOb2RlIGNvdWxkbid0IGZpbmQgaXQsIHNvIGl0IG11c3QgYmUgdXNlci1hbGlhc2VkXG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF07XG4gIH1cblxuICByZXR1cm4gY29uZmlnO1xufVxuIl19