"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const path = require("path");
/**
 * Enumerate loaders and their dependencies from this file to let the dependency validator
 * know they are used.
 *
 * require('istanbul-instrumenter-loader')
 *
 */
function getTestConfig(wco) {
    const { root, buildOptions } = wco;
    const extraRules = [];
    const extraPlugins = [];
    // if (buildOptions.codeCoverage && CliConfig.fromProject()) {
    if (buildOptions.codeCoverage) {
        const codeCoverageExclude = buildOptions.codeCoverageExclude;
        const exclude = [
            /\.(e2e|spec)\.ts$/,
            /node_modules/,
        ];
        if (codeCoverageExclude) {
            codeCoverageExclude.forEach((excludeGlob) => {
                const excludeFiles = glob
                    .sync(path.join(root, excludeGlob), { nodir: true })
                    .map(file => path.normalize(file));
                exclude.push(...excludeFiles);
            });
        }
        extraRules.push({
            test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
            options: { esModules: true },
            enforce: 'post',
            exclude,
        });
    }
    return {
        mode: 'development',
        resolve: {
            mainFields: [
                ...(wco.supportES2015 ? ['es2015'] : []),
                'browser', 'module', 'main',
            ],
        },
        devtool: buildOptions.sourceMap ? 'inline-source-map' : 'eval',
        entry: {
            main: path.resolve(root, buildOptions.main),
        },
        module: {
            rules: extraRules,
        },
        plugins: extraPlugins,
        optimization: {
            splitChunks: {
                chunks: ((chunk) => chunk.name !== 'polyfills'),
                cacheGroups: {
                    vendors: false,
                    vendor: {
                        name: 'vendor',
                        chunks: 'initial',
                        test: (module, chunks) => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName)
                                && !chunks.some(({ name }) => name === 'polyfills');
                        },
                    },
                },
            },
        },
    };
}
exports.getTestConfig = getTestConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvbW9kZWxzL3dlYnBhY2stY29uZmlncy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUs3Qjs7Ozs7O0dBTUc7QUFFSCx1QkFDRSxHQUE2QztJQUU3QyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUVuQyxNQUFNLFVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sWUFBWSxHQUFxQixFQUFFLENBQUM7SUFFMUMsOERBQThEO0lBQzlELElBQUksWUFBWSxDQUFDLFlBQVksRUFBRTtRQUM3QixNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztRQUM3RCxNQUFNLE9BQU8sR0FBd0I7WUFDbkMsbUJBQW1CO1lBQ25CLGNBQWM7U0FDZixDQUFDO1FBRUYsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUU7Z0JBQ2xELE1BQU0sWUFBWSxHQUFHLElBQUk7cUJBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztxQkFDbkQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDZCxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSw4QkFBOEI7WUFDMUQsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtZQUM1QixPQUFPLEVBQUUsTUFBTTtZQUNmLE9BQU87U0FDUixDQUFDLENBQUM7S0FDSjtJQUVELE9BQU87UUFDTCxJQUFJLEVBQUUsYUFBYTtRQUNuQixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDeEMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNO2FBQzVCO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFDOUQsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUM7U0FDNUM7UUFDRCxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsVUFBVTtTQUNsQjtRQUNELE9BQU8sRUFBRSxZQUFZO1FBQ3JCLFlBQVksRUFBRTtZQUNaLFdBQVcsRUFBRTtnQkFDWCxNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQXVCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDO2dCQUNqRSxXQUFXLEVBQUU7b0JBQ1gsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsTUFBTSxFQUFFO3dCQUNOLElBQUksRUFBRSxRQUFRO3dCQUNkLE1BQU0sRUFBRSxTQUFTO3dCQUNqQixJQUFJLEVBQUUsQ0FBQyxNQUEyQyxFQUFFLE1BQTBCLEVBQUUsRUFBRTs0QkFDaEYsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUU1RSxPQUFPLHdCQUF3QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7bUNBQzNDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQzt3QkFDeEQsQ0FBQztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7S0FHNkIsQ0FBQztBQUNuQyxDQUFDO0FBdEVELHNDQXNFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IHsgV2VicGFja0NvbmZpZ09wdGlvbnMsIFdlYnBhY2tUZXN0T3B0aW9ucyB9IGZyb20gJy4uL2J1aWxkLW9wdGlvbnMnO1xuXG5cbi8qKlxuICogRW51bWVyYXRlIGxvYWRlcnMgYW5kIHRoZWlyIGRlcGVuZGVuY2llcyBmcm9tIHRoaXMgZmlsZSB0byBsZXQgdGhlIGRlcGVuZGVuY3kgdmFsaWRhdG9yXG4gKiBrbm93IHRoZXkgYXJlIHVzZWQuXG4gKlxuICogcmVxdWlyZSgnaXN0YW5idWwtaW5zdHJ1bWVudGVyLWxvYWRlcicpXG4gKlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXN0Q29uZmlnKFxuICB3Y286IFdlYnBhY2tDb25maWdPcHRpb25zPFdlYnBhY2tUZXN0T3B0aW9ucz4sXG4pOiB3ZWJwYWNrLkNvbmZpZ3VyYXRpb24ge1xuICBjb25zdCB7IHJvb3QsIGJ1aWxkT3B0aW9ucyB9ID0gd2NvO1xuXG4gIGNvbnN0IGV4dHJhUnVsZXM6IHdlYnBhY2suUnVsZVtdID0gW107XG4gIGNvbnN0IGV4dHJhUGx1Z2luczogd2VicGFjay5QbHVnaW5bXSA9IFtdO1xuXG4gIC8vIGlmIChidWlsZE9wdGlvbnMuY29kZUNvdmVyYWdlICYmIENsaUNvbmZpZy5mcm9tUHJvamVjdCgpKSB7XG4gIGlmIChidWlsZE9wdGlvbnMuY29kZUNvdmVyYWdlKSB7XG4gICAgY29uc3QgY29kZUNvdmVyYWdlRXhjbHVkZSA9IGJ1aWxkT3B0aW9ucy5jb2RlQ292ZXJhZ2VFeGNsdWRlO1xuICAgIGNvbnN0IGV4Y2x1ZGU6IChzdHJpbmcgfCBSZWdFeHApW10gPSBbXG4gICAgICAvXFwuKGUyZXxzcGVjKVxcLnRzJC8sXG4gICAgICAvbm9kZV9tb2R1bGVzLyxcbiAgICBdO1xuXG4gICAgaWYgKGNvZGVDb3ZlcmFnZUV4Y2x1ZGUpIHtcbiAgICAgIGNvZGVDb3ZlcmFnZUV4Y2x1ZGUuZm9yRWFjaCgoZXhjbHVkZUdsb2I6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBleGNsdWRlRmlsZXMgPSBnbG9iXG4gICAgICAgICAgLnN5bmMocGF0aC5qb2luKHJvb3QsIGV4Y2x1ZGVHbG9iKSwgeyBub2RpcjogdHJ1ZSB9KVxuICAgICAgICAgIC5tYXAoZmlsZSA9PiBwYXRoLm5vcm1hbGl6ZShmaWxlKSk7XG4gICAgICAgIGV4Y2x1ZGUucHVzaCguLi5leGNsdWRlRmlsZXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXh0cmFSdWxlcy5wdXNoKHtcbiAgICAgIHRlc3Q6IC9cXC4oanN8dHMpJC8sIGxvYWRlcjogJ2lzdGFuYnVsLWluc3RydW1lbnRlci1sb2FkZXInLFxuICAgICAgb3B0aW9uczogeyBlc01vZHVsZXM6IHRydWUgfSxcbiAgICAgIGVuZm9yY2U6ICdwb3N0JyxcbiAgICAgIGV4Y2x1ZGUsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vZGU6ICdkZXZlbG9wbWVudCcsXG4gICAgcmVzb2x2ZToge1xuICAgICAgbWFpbkZpZWxkczogW1xuICAgICAgICAuLi4od2NvLnN1cHBvcnRFUzIwMTUgPyBbJ2VzMjAxNSddIDogW10pLFxuICAgICAgICAnYnJvd3NlcicsICdtb2R1bGUnLCAnbWFpbicsXG4gICAgICBdLFxuICAgIH0sXG4gICAgZGV2dG9vbDogYnVpbGRPcHRpb25zLnNvdXJjZU1hcCA/ICdpbmxpbmUtc291cmNlLW1hcCcgOiAnZXZhbCcsXG4gICAgZW50cnk6IHtcbiAgICAgIG1haW46IHBhdGgucmVzb2x2ZShyb290LCBidWlsZE9wdGlvbnMubWFpbiksXG4gICAgfSxcbiAgICBtb2R1bGU6IHtcbiAgICAgIHJ1bGVzOiBleHRyYVJ1bGVzLFxuICAgIH0sXG4gICAgcGx1Z2luczogZXh0cmFQbHVnaW5zLFxuICAgIG9wdGltaXphdGlvbjoge1xuICAgICAgc3BsaXRDaHVua3M6IHtcbiAgICAgICAgY2h1bmtzOiAoKGNodW5rOiB7IG5hbWU6IHN0cmluZyB9KSA9PiBjaHVuay5uYW1lICE9PSAncG9seWZpbGxzJyksXG4gICAgICAgIGNhY2hlR3JvdXBzOiB7XG4gICAgICAgICAgdmVuZG9yczogZmFsc2UsXG4gICAgICAgICAgdmVuZG9yOiB7XG4gICAgICAgICAgICBuYW1lOiAndmVuZG9yJyxcbiAgICAgICAgICAgIGNodW5rczogJ2luaXRpYWwnLFxuICAgICAgICAgICAgdGVzdDogKG1vZHVsZTogeyBuYW1lRm9yQ29uZGl0aW9uPzogKCkgPT4gc3RyaW5nIH0sIGNodW5rczogeyBuYW1lOiBzdHJpbmcgfVtdKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vZHVsZU5hbWUgPSBtb2R1bGUubmFtZUZvckNvbmRpdGlvbiA/IG1vZHVsZS5uYW1lRm9yQ29uZGl0aW9uKCkgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gL1tcXFxcL11ub2RlX21vZHVsZXNbXFxcXC9dLy50ZXN0KG1vZHVsZU5hbWUpXG4gICAgICAgICAgICAgICAgJiYgIWNodW5rcy5zb21lKCh7IG5hbWUgfSkgPT4gbmFtZSA9PT0gJ3BvbHlmaWxscycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIFdlYnBhY2sgdHlwaW5ncyBkb24ndCB5ZXQgaW5jbHVkZSB0aGUgZnVuY3Rpb24gZm9ybSBmb3IgJ2NodW5rcycsXG4gICAgLy8gb3IgdGhlIGJ1aWx0LWluIHZlbmRvcnMgY2FjaGUgZ3JvdXAuXG4gIH0gYXMge30gYXMgd2VicGFjay5Db25maWd1cmF0aW9uO1xufVxuIl19