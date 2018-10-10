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
                        test: /[\\/]node_modules[\\/]/,
                    },
                },
            },
        },
    };
}
exports.getTestConfig = getTestConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvbW9kZWxzL3dlYnBhY2stY29uZmlncy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUs3Qjs7Ozs7O0dBTUc7QUFFSCx1QkFDRSxHQUE2QztJQUU3QyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUVuQyxNQUFNLFVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sWUFBWSxHQUFxQixFQUFFLENBQUM7SUFFMUMsOERBQThEO0lBQzlELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sbUJBQW1CLEdBQUcsWUFBWSxDQUFDLG1CQUFtQixDQUFDO1FBQzdELE1BQU0sT0FBTyxHQUF3QjtZQUNuQyxtQkFBbUI7WUFDbkIsY0FBYztTQUNmLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDeEIsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBbUIsRUFBRSxFQUFFO2dCQUNsRCxNQUFNLFlBQVksR0FBRyxJQUFJO3FCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7cUJBQ25ELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDZCxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSw4QkFBOEI7WUFDMUQsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtZQUM1QixPQUFPLEVBQUUsTUFBTTtZQUNmLE9BQU87U0FDUixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDO1FBQ0wsSUFBSSxFQUFFLGFBQWE7UUFDbkIsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFO2dCQUNWLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3hDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTTthQUM1QjtTQUNGO1FBQ0QsT0FBTyxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQzlELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDO1NBQzVDO1FBQ0QsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLFVBQVU7U0FDbEI7UUFDRCxPQUFPLEVBQUUsWUFBWTtRQUNyQixZQUFZLEVBQUU7WUFDWixXQUFXLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUF1QixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQztnQkFDakUsV0FBVyxFQUFFO29CQUNYLE9BQU8sRUFBRSxLQUFLO29CQUNkLE1BQU0sRUFBRTt3QkFDTixJQUFJLEVBQUUsUUFBUTt3QkFDZCxNQUFNLEVBQUUsU0FBUzt3QkFDakIsSUFBSSxFQUFFLHdCQUF3QjtxQkFDL0I7aUJBQ0Y7YUFDRjtTQUNGO0tBRzZCLENBQUM7QUFDbkMsQ0FBQztBQWpFRCxzQ0FpRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIGdsb2IgZnJvbSAnZ2xvYic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgd2VicGFjayBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IFdlYnBhY2tDb25maWdPcHRpb25zLCBXZWJwYWNrVGVzdE9wdGlvbnMgfSBmcm9tICcuLi9idWlsZC1vcHRpb25zJztcblxuXG4vKipcbiAqIEVudW1lcmF0ZSBsb2FkZXJzIGFuZCB0aGVpciBkZXBlbmRlbmNpZXMgZnJvbSB0aGlzIGZpbGUgdG8gbGV0IHRoZSBkZXBlbmRlbmN5IHZhbGlkYXRvclxuICoga25vdyB0aGV5IGFyZSB1c2VkLlxuICpcbiAqIHJlcXVpcmUoJ2lzdGFuYnVsLWluc3RydW1lbnRlci1sb2FkZXInKVxuICpcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGVzdENvbmZpZyhcbiAgd2NvOiBXZWJwYWNrQ29uZmlnT3B0aW9uczxXZWJwYWNrVGVzdE9wdGlvbnM+LFxuKTogd2VicGFjay5Db25maWd1cmF0aW9uIHtcbiAgY29uc3QgeyByb290LCBidWlsZE9wdGlvbnMgfSA9IHdjbztcblxuICBjb25zdCBleHRyYVJ1bGVzOiB3ZWJwYWNrLlJ1bGVbXSA9IFtdO1xuICBjb25zdCBleHRyYVBsdWdpbnM6IHdlYnBhY2suUGx1Z2luW10gPSBbXTtcblxuICAvLyBpZiAoYnVpbGRPcHRpb25zLmNvZGVDb3ZlcmFnZSAmJiBDbGlDb25maWcuZnJvbVByb2plY3QoKSkge1xuICBpZiAoYnVpbGRPcHRpb25zLmNvZGVDb3ZlcmFnZSkge1xuICAgIGNvbnN0IGNvZGVDb3ZlcmFnZUV4Y2x1ZGUgPSBidWlsZE9wdGlvbnMuY29kZUNvdmVyYWdlRXhjbHVkZTtcbiAgICBjb25zdCBleGNsdWRlOiAoc3RyaW5nIHwgUmVnRXhwKVtdID0gW1xuICAgICAgL1xcLihlMmV8c3BlYylcXC50cyQvLFxuICAgICAgL25vZGVfbW9kdWxlcy8sXG4gICAgXTtcblxuICAgIGlmIChjb2RlQ292ZXJhZ2VFeGNsdWRlKSB7XG4gICAgICBjb2RlQ292ZXJhZ2VFeGNsdWRlLmZvckVhY2goKGV4Y2x1ZGVHbG9iOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgZXhjbHVkZUZpbGVzID0gZ2xvYlxuICAgICAgICAgIC5zeW5jKHBhdGguam9pbihyb290LCBleGNsdWRlR2xvYiksIHsgbm9kaXI6IHRydWUgfSlcbiAgICAgICAgICAubWFwKGZpbGUgPT4gcGF0aC5ub3JtYWxpemUoZmlsZSkpO1xuICAgICAgICBleGNsdWRlLnB1c2goLi4uZXhjbHVkZUZpbGVzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4dHJhUnVsZXMucHVzaCh7XG4gICAgICB0ZXN0OiAvXFwuKGpzfHRzKSQvLCBsb2FkZXI6ICdpc3RhbmJ1bC1pbnN0cnVtZW50ZXItbG9hZGVyJyxcbiAgICAgIG9wdGlvbnM6IHsgZXNNb2R1bGVzOiB0cnVlIH0sXG4gICAgICBlbmZvcmNlOiAncG9zdCcsXG4gICAgICBleGNsdWRlLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb2RlOiAnZGV2ZWxvcG1lbnQnLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIG1haW5GaWVsZHM6IFtcbiAgICAgICAgLi4uKHdjby5zdXBwb3J0RVMyMDE1ID8gWydlczIwMTUnXSA6IFtdKSxcbiAgICAgICAgJ2Jyb3dzZXInLCAnbW9kdWxlJywgJ21haW4nLFxuICAgICAgXSxcbiAgICB9LFxuICAgIGRldnRvb2w6IGJ1aWxkT3B0aW9ucy5zb3VyY2VNYXAgPyAnaW5saW5lLXNvdXJjZS1tYXAnIDogJ2V2YWwnLFxuICAgIGVudHJ5OiB7XG4gICAgICBtYWluOiBwYXRoLnJlc29sdmUocm9vdCwgYnVpbGRPcHRpb25zLm1haW4pLFxuICAgIH0sXG4gICAgbW9kdWxlOiB7XG4gICAgICBydWxlczogZXh0cmFSdWxlcyxcbiAgICB9LFxuICAgIHBsdWdpbnM6IGV4dHJhUGx1Z2lucyxcbiAgICBvcHRpbWl6YXRpb246IHtcbiAgICAgIHNwbGl0Q2h1bmtzOiB7XG4gICAgICAgIGNodW5rczogKChjaHVuazogeyBuYW1lOiBzdHJpbmcgfSkgPT4gY2h1bmsubmFtZSAhPT0gJ3BvbHlmaWxscycpLFxuICAgICAgICBjYWNoZUdyb3Vwczoge1xuICAgICAgICAgIHZlbmRvcnM6IGZhbHNlLFxuICAgICAgICAgIHZlbmRvcjoge1xuICAgICAgICAgICAgbmFtZTogJ3ZlbmRvcicsXG4gICAgICAgICAgICBjaHVua3M6ICdpbml0aWFsJyxcbiAgICAgICAgICAgIHRlc3Q6IC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXS8sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBXZWJwYWNrIHR5cGluZ3MgZG9uJ3QgeWV0IGluY2x1ZGUgdGhlIGZ1bmN0aW9uIGZvcm0gZm9yICdjaHVua3MnLFxuICAgIC8vIG9yIHRoZSBidWlsdC1pbiB2ZW5kb3JzIGNhY2hlIGdyb3VwLlxuICB9IGFzIHt9IGFzIHdlYnBhY2suQ29uZmlndXJhdGlvbjtcbn1cbiJdfQ==