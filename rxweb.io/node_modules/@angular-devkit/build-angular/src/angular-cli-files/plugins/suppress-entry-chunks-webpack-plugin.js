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
// Remove .js files from entry points consisting entirely of .css|scss|sass|less|styl.
// To be used together with ExtractTextPlugin.
class SuppressExtractedTextChunksWebpackPlugin {
    constructor() { }
    apply(compiler) {
        compiler.hooks.compilation.tap('SuppressExtractedTextChunks', (compilation) => {
            // find which chunks have css only entry points
            const cssOnlyChunks = [];
            const entryPoints = compilation.options.entry;
            // determine which entry points are composed entirely of css files
            for (let entryPoint of Object.keys(entryPoints)) {
                let entryFiles = entryPoints[entryPoint];
                // when type of entryFiles is not array, make it as an array
                entryFiles = entryFiles instanceof Array ? entryFiles : [entryFiles];
                if (entryFiles.every((el) => el.match(/\.(css|scss|sass|less|styl)$/) !== null)) {
                    cssOnlyChunks.push(entryPoint);
                }
            }
            // Remove the js file for supressed chunks
            compilation.hooks.afterSeal.tap('SuppressExtractedTextChunks', () => {
                compilation.chunks
                    .filter((chunk) => cssOnlyChunks.indexOf(chunk.name) !== -1)
                    .forEach((chunk) => {
                    let newFiles = [];
                    chunk.files.forEach((file) => {
                        if (file.match(/\.js(\.map)?$/)) {
                            // remove js files
                            delete compilation.assets[file];
                        }
                        else {
                            newFiles.push(file);
                        }
                    });
                    chunk.files = newFiles;
                });
            });
            // Remove scripts tags with a css file as source, because HtmlWebpackPlugin will use
            // a css file as a script for chunks without js files.
            // TODO: Enable this once HtmlWebpackPlugin supports Webpack 4
            // compilation.plugin('html-webpack-plugin-alter-asset-tags',
            //   (htmlPluginData: any, callback: any) => {
            //     const filterFn = (tag: any) =>
            //       !(tag.tagName === 'script' && tag.attributes.src.match(/\.css$/));
            //     htmlPluginData.head = htmlPluginData.head.filter(filterFn);
            //     htmlPluginData.body = htmlPluginData.body.filter(filterFn);
            //     callback(null, htmlPluginData);
            //   });
        });
    }
}
exports.SuppressExtractedTextChunksWebpackPlugin = SuppressExtractedTextChunksWebpackPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcHJlc3MtZW50cnktY2h1bmtzLXdlYnBhY2stcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9wbHVnaW5zL3N1cHByZXNzLWVudHJ5LWNodW5rcy13ZWJwYWNrLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUJBQWlCO0FBQ2pCLCtEQUErRDs7QUFFL0Qsc0ZBQXNGO0FBQ3RGLDhDQUE4QztBQUU5QztJQUNFLGdCQUFnQixDQUFDO0lBRWpCLEtBQUssQ0FBQyxRQUFhO1FBQ2pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLFdBQWdCLEVBQUUsRUFBRTtZQUNqRiwrQ0FBK0M7WUFDL0MsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzlDLGtFQUFrRTtZQUNsRSxHQUFHLENBQUMsQ0FBQyxJQUFJLFVBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxVQUFVLEdBQXNCLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUQsNERBQTREO2dCQUM1RCxVQUFVLEdBQUcsVUFBVSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FDbEMsRUFBRSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDakMsQ0FBQztZQUNILENBQUM7WUFDRCwwQ0FBMEM7WUFDMUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtnQkFDbEUsV0FBVyxDQUFDLE1BQU07cUJBQ2YsTUFBTSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztxQkFDaEUsT0FBTyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7b0JBQ3RCLElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQztvQkFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTt3QkFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hDLGtCQUFrQjs0QkFDbEIsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RCLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsS0FBSyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxvRkFBb0Y7WUFDcEYsc0RBQXNEO1lBQ3RELDhEQUE4RDtZQUM5RCw2REFBNkQ7WUFDN0QsOENBQThDO1lBQzlDLHFDQUFxQztZQUNyQywyRUFBMkU7WUFDM0Usa0VBQWtFO1lBQ2xFLGtFQUFrRTtZQUNsRSxzQ0FBc0M7WUFDdEMsUUFBUTtRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBaERELDRGQWdEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlXG4vLyBUT0RPOiBjbGVhbnVwIHRoaXMgZmlsZSwgaXQncyBjb3BpZWQgYXMgaXMgZnJvbSBBbmd1bGFyIENMSS5cblxuLy8gUmVtb3ZlIC5qcyBmaWxlcyBmcm9tIGVudHJ5IHBvaW50cyBjb25zaXN0aW5nIGVudGlyZWx5IG9mIC5jc3N8c2Nzc3xzYXNzfGxlc3N8c3R5bC5cbi8vIFRvIGJlIHVzZWQgdG9nZXRoZXIgd2l0aCBFeHRyYWN0VGV4dFBsdWdpbi5cblxuZXhwb3J0IGNsYXNzIFN1cHByZXNzRXh0cmFjdGVkVGV4dENodW5rc1dlYnBhY2tQbHVnaW4ge1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGFwcGx5KGNvbXBpbGVyOiBhbnkpOiB2b2lkIHtcbiAgICBjb21waWxlci5ob29rcy5jb21waWxhdGlvbi50YXAoJ1N1cHByZXNzRXh0cmFjdGVkVGV4dENodW5rcycsIChjb21waWxhdGlvbjogYW55KSA9PiB7XG4gICAgICAvLyBmaW5kIHdoaWNoIGNodW5rcyBoYXZlIGNzcyBvbmx5IGVudHJ5IHBvaW50c1xuICAgICAgY29uc3QgY3NzT25seUNodW5rczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGNvbnN0IGVudHJ5UG9pbnRzID0gY29tcGlsYXRpb24ub3B0aW9ucy5lbnRyeTtcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBlbnRyeSBwb2ludHMgYXJlIGNvbXBvc2VkIGVudGlyZWx5IG9mIGNzcyBmaWxlc1xuICAgICAgZm9yIChsZXQgZW50cnlQb2ludCBvZiBPYmplY3Qua2V5cyhlbnRyeVBvaW50cykpIHtcbiAgICAgICAgbGV0IGVudHJ5RmlsZXM6IHN0cmluZ1tdIHwgc3RyaW5nID0gZW50cnlQb2ludHNbZW50cnlQb2ludF07XG4gICAgICAgIC8vIHdoZW4gdHlwZSBvZiBlbnRyeUZpbGVzIGlzIG5vdCBhcnJheSwgbWFrZSBpdCBhcyBhbiBhcnJheVxuICAgICAgICBlbnRyeUZpbGVzID0gZW50cnlGaWxlcyBpbnN0YW5jZW9mIEFycmF5ID8gZW50cnlGaWxlcyA6IFtlbnRyeUZpbGVzXTtcbiAgICAgICAgaWYgKGVudHJ5RmlsZXMuZXZlcnkoKGVsOiBzdHJpbmcpID0+XG4gICAgICAgICAgZWwubWF0Y2goL1xcLihjc3N8c2Nzc3xzYXNzfGxlc3N8c3R5bCkkLykgIT09IG51bGwpKSB7XG4gICAgICAgICAgY3NzT25seUNodW5rcy5wdXNoKGVudHJ5UG9pbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgdGhlIGpzIGZpbGUgZm9yIHN1cHJlc3NlZCBjaHVua3NcbiAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmFmdGVyU2VhbC50YXAoJ1N1cHByZXNzRXh0cmFjdGVkVGV4dENodW5rcycsICgpID0+IHtcbiAgICAgICAgY29tcGlsYXRpb24uY2h1bmtzXG4gICAgICAgICAgLmZpbHRlcigoY2h1bms6IGFueSkgPT4gY3NzT25seUNodW5rcy5pbmRleE9mKGNodW5rLm5hbWUpICE9PSAtMSlcbiAgICAgICAgICAuZm9yRWFjaCgoY2h1bms6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld0ZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgY2h1bmsuZmlsZXMuZm9yRWFjaCgoZmlsZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChmaWxlLm1hdGNoKC9cXC5qcyhcXC5tYXApPyQvKSkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBqcyBmaWxlc1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21waWxhdGlvbi5hc3NldHNbZmlsZV07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaHVuay5maWxlcyA9IG5ld0ZpbGVzO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvLyBSZW1vdmUgc2NyaXB0cyB0YWdzIHdpdGggYSBjc3MgZmlsZSBhcyBzb3VyY2UsIGJlY2F1c2UgSHRtbFdlYnBhY2tQbHVnaW4gd2lsbCB1c2VcbiAgICAgIC8vIGEgY3NzIGZpbGUgYXMgYSBzY3JpcHQgZm9yIGNodW5rcyB3aXRob3V0IGpzIGZpbGVzLlxuICAgICAgLy8gVE9ETzogRW5hYmxlIHRoaXMgb25jZSBIdG1sV2VicGFja1BsdWdpbiBzdXBwb3J0cyBXZWJwYWNrIDRcbiAgICAgIC8vIGNvbXBpbGF0aW9uLnBsdWdpbignaHRtbC13ZWJwYWNrLXBsdWdpbi1hbHRlci1hc3NldC10YWdzJyxcbiAgICAgIC8vICAgKGh0bWxQbHVnaW5EYXRhOiBhbnksIGNhbGxiYWNrOiBhbnkpID0+IHtcbiAgICAgIC8vICAgICBjb25zdCBmaWx0ZXJGbiA9ICh0YWc6IGFueSkgPT5cbiAgICAgIC8vICAgICAgICEodGFnLnRhZ05hbWUgPT09ICdzY3JpcHQnICYmIHRhZy5hdHRyaWJ1dGVzLnNyYy5tYXRjaCgvXFwuY3NzJC8pKTtcbiAgICAgIC8vICAgICBodG1sUGx1Z2luRGF0YS5oZWFkID0gaHRtbFBsdWdpbkRhdGEuaGVhZC5maWx0ZXIoZmlsdGVyRm4pO1xuICAgICAgLy8gICAgIGh0bWxQbHVnaW5EYXRhLmJvZHkgPSBodG1sUGx1Z2luRGF0YS5ib2R5LmZpbHRlcihmaWx0ZXJGbik7XG4gICAgICAvLyAgICAgY2FsbGJhY2sobnVsbCwgaHRtbFBsdWdpbkRhdGEpO1xuICAgICAgLy8gICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19