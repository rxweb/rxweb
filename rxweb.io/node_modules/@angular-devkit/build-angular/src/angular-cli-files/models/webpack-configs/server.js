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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9tb2RlbHMvd2VicGFjay1jb25maWdzL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUJBQWlCO0FBQ2pCLCtEQUErRDs7QUFJL0Q7OztHQUdHO0FBQ0gseUJBQWdDLEdBQXlCO0lBRXZELE1BQU0sTUFBTSxHQUFRO1FBQ2xCLE9BQU8sRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQzFELE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRTtnQkFDVixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxNQUFNLEVBQUUsUUFBUTthQUNqQjtTQUNGO1FBQ0QsTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNLEVBQUU7WUFDTixhQUFhLEVBQUUsVUFBVTtTQUMxQjtRQUNELElBQUksRUFBRSxLQUFLO0tBQ1osQ0FBQztJQUVGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsU0FBUyxHQUFHO1lBQ2pCLFdBQVc7WUFDWCxDQUFDLENBQU0sRUFBRSxPQUFZLEVBQUUsUUFBNkMsRUFBRSxFQUFFO2dCQUN0RSw4Q0FBOEM7Z0JBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BCLENBQUM7Z0JBRUQsSUFBSSxDQUFDO29CQUNILHlDQUF5QztvQkFDekMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLHFCQUFxQjt3QkFDckIsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTix3Q0FBd0M7d0JBQ3hDLFFBQVEsRUFBRSxDQUFDO29CQUNiLENBQUM7Z0JBQ0gsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxJQUFELENBQUM7b0JBQ1Asb0RBQW9EO29CQUNwRCxRQUFRLEVBQUUsQ0FBQztnQkFDYixDQUFDO1lBQ0gsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBN0NELDBDQTZDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlXG4vLyBUT0RPOiBjbGVhbnVwIHRoaXMgZmlsZSwgaXQncyBjb3BpZWQgYXMgaXMgZnJvbSBBbmd1bGFyIENMSS5cblxuaW1wb3J0IHsgV2VicGFja0NvbmZpZ09wdGlvbnMgfSBmcm9tICcuLi9idWlsZC1vcHRpb25zJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGFydGlhbCBzcGVjaWZpYyB0byBjcmVhdGluZyBhIGJ1bmRsZSBmb3Igbm9kZVxuICogQHBhcmFtIHdjbyBPcHRpb25zIHdoaWNoIGFyZSBpbmNsdWRlIHRoZSBidWlsZCBvcHRpb25zIGFuZCBhcHAgY29uZmlnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXJ2ZXJDb25maWcod2NvOiBXZWJwYWNrQ29uZmlnT3B0aW9ucykge1xuXG4gIGNvbnN0IGNvbmZpZzogYW55ID0ge1xuICAgIGRldnRvb2w6IHdjby5idWlsZE9wdGlvbnMuc291cmNlTWFwID8gJ3NvdXJjZS1tYXAnIDogZmFsc2UsXG4gICAgcmVzb2x2ZToge1xuICAgICAgbWFpbkZpZWxkczogW1xuICAgICAgICAuLi4od2NvLnN1cHBvcnRFUzIwMTUgPyBbJ2VzMjAxNSddIDogW10pLFxuICAgICAgICAnbWFpbicsICdtb2R1bGUnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHRhcmdldDogJ25vZGUnLFxuICAgIG91dHB1dDoge1xuICAgICAgbGlicmFyeVRhcmdldDogJ2NvbW1vbmpzJ1xuICAgIH0sXG4gICAgbm9kZTogZmFsc2UsXG4gIH07XG5cbiAgaWYgKHdjby5idWlsZE9wdGlvbnMuYnVuZGxlRGVwZW5kZW5jaWVzID09ICdub25lJykge1xuICAgIGNvbmZpZy5leHRlcm5hbHMgPSBbXG4gICAgICAvXkBhbmd1bGFyLyxcbiAgICAgIChfOiBhbnksIHJlcXVlc3Q6IGFueSwgY2FsbGJhY2s6IChlcnJvcj86IGFueSwgcmVzdWx0PzogYW55KSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIC8vIEFic29sdXRlICYgUmVsYXRpdmUgcGF0aHMgYXJlIG5vdCBleHRlcm5hbHNcbiAgICAgICAgaWYgKHJlcXVlc3QubWF0Y2goL15cXC57MCwyfVxcLy8pKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIEF0dGVtcHQgdG8gcmVzb2x2ZSB0aGUgbW9kdWxlIHZpYSBOb2RlXG4gICAgICAgICAgY29uc3QgZSA9IHJlcXVpcmUucmVzb2x2ZShyZXF1ZXN0KTtcbiAgICAgICAgICBpZiAoL25vZGVfbW9kdWxlcy8udGVzdChlKSkge1xuICAgICAgICAgICAgLy8gSXQncyBhIG5vZGVfbW9kdWxlXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXF1ZXN0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXQncyBhIHN5c3RlbSB0aGluZyAoLmllIHV0aWwsIGZzLi4uKVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8vIE5vZGUgY291bGRuJ3QgZmluZCBpdCwgc28gaXQgbXVzdCBiZSB1c2VyLWFsaWFzZWRcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIHJldHVybiBjb25maWc7XG59XG4iXX0=