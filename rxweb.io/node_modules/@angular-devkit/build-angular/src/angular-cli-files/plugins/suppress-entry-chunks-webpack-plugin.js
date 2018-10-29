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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcHJlc3MtZW50cnktY2h1bmtzLXdlYnBhY2stcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9wbHVnaW5zL3N1cHByZXNzLWVudHJ5LWNodW5rcy13ZWJwYWNrLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUJBQWlCO0FBQ2pCLCtEQUErRDs7QUFFL0Qsc0ZBQXNGO0FBQ3RGLDhDQUE4QztBQUU5QztJQUNFLGdCQUFnQixDQUFDO0lBRWpCLEtBQUssQ0FBQyxRQUFhO1FBQ2pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLFdBQWdCLEVBQUUsRUFBRTtZQUNqRiwrQ0FBK0M7WUFDL0MsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzlDLGtFQUFrRTtZQUNsRSxLQUFLLElBQUksVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQy9DLElBQUksVUFBVSxHQUFzQixXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzVELDREQUE0RDtnQkFDNUQsVUFBVSxHQUFHLFVBQVUsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckUsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FDbEMsRUFBRSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO29CQUNwRCxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNoQzthQUNGO1lBQ0QsMENBQTBDO1lBQzFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7Z0JBQ2xFLFdBQVcsQ0FBQyxNQUFNO3FCQUNmLE1BQU0sQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7cUJBQ2hFLE9BQU8sQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO29CQUN0QixJQUFJLFFBQVEsR0FBYSxFQUFFLENBQUM7b0JBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7d0JBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTs0QkFDL0Isa0JBQWtCOzRCQUNsQixPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ2pDOzZCQUFNOzRCQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ3JCO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUNILEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsb0ZBQW9GO1lBQ3BGLHNEQUFzRDtZQUN0RCw4REFBOEQ7WUFDOUQsNkRBQTZEO1lBQzdELDhDQUE4QztZQUM5QyxxQ0FBcUM7WUFDckMsMkVBQTJFO1lBQzNFLGtFQUFrRTtZQUNsRSxrRUFBa0U7WUFDbEUsc0NBQXNDO1lBQ3RDLFFBQVE7UUFDVixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWhERCw0RkFnREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5cbi8vIFJlbW92ZSAuanMgZmlsZXMgZnJvbSBlbnRyeSBwb2ludHMgY29uc2lzdGluZyBlbnRpcmVseSBvZiAuY3NzfHNjc3N8c2Fzc3xsZXNzfHN0eWwuXG4vLyBUbyBiZSB1c2VkIHRvZ2V0aGVyIHdpdGggRXh0cmFjdFRleHRQbHVnaW4uXG5cbmV4cG9ydCBjbGFzcyBTdXBwcmVzc0V4dHJhY3RlZFRleHRDaHVua3NXZWJwYWNrUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBhcHBseShjb21waWxlcjogYW55KTogdm9pZCB7XG4gICAgY29tcGlsZXIuaG9va3MuY29tcGlsYXRpb24udGFwKCdTdXBwcmVzc0V4dHJhY3RlZFRleHRDaHVua3MnLCAoY29tcGlsYXRpb246IGFueSkgPT4ge1xuICAgICAgLy8gZmluZCB3aGljaCBjaHVua3MgaGF2ZSBjc3Mgb25seSBlbnRyeSBwb2ludHNcbiAgICAgIGNvbnN0IGNzc09ubHlDaHVua3M6IHN0cmluZ1tdID0gW107XG4gICAgICBjb25zdCBlbnRyeVBvaW50cyA9IGNvbXBpbGF0aW9uLm9wdGlvbnMuZW50cnk7XG4gICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggZW50cnkgcG9pbnRzIGFyZSBjb21wb3NlZCBlbnRpcmVseSBvZiBjc3MgZmlsZXNcbiAgICAgIGZvciAobGV0IGVudHJ5UG9pbnQgb2YgT2JqZWN0LmtleXMoZW50cnlQb2ludHMpKSB7XG4gICAgICAgIGxldCBlbnRyeUZpbGVzOiBzdHJpbmdbXSB8IHN0cmluZyA9IGVudHJ5UG9pbnRzW2VudHJ5UG9pbnRdO1xuICAgICAgICAvLyB3aGVuIHR5cGUgb2YgZW50cnlGaWxlcyBpcyBub3QgYXJyYXksIG1ha2UgaXQgYXMgYW4gYXJyYXlcbiAgICAgICAgZW50cnlGaWxlcyA9IGVudHJ5RmlsZXMgaW5zdGFuY2VvZiBBcnJheSA/IGVudHJ5RmlsZXMgOiBbZW50cnlGaWxlc107XG4gICAgICAgIGlmIChlbnRyeUZpbGVzLmV2ZXJ5KChlbDogc3RyaW5nKSA9PlxuICAgICAgICAgIGVsLm1hdGNoKC9cXC4oY3NzfHNjc3N8c2Fzc3xsZXNzfHN0eWwpJC8pICE9PSBudWxsKSkge1xuICAgICAgICAgIGNzc09ubHlDaHVua3MucHVzaChlbnRyeVBvaW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIHRoZSBqcyBmaWxlIGZvciBzdXByZXNzZWQgY2h1bmtzXG4gICAgICBjb21waWxhdGlvbi5ob29rcy5hZnRlclNlYWwudGFwKCdTdXBwcmVzc0V4dHJhY3RlZFRleHRDaHVua3MnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBpbGF0aW9uLmNodW5rc1xuICAgICAgICAgIC5maWx0ZXIoKGNodW5rOiBhbnkpID0+IGNzc09ubHlDaHVua3MuaW5kZXhPZihjaHVuay5uYW1lKSAhPT0gLTEpXG4gICAgICAgICAgLmZvckVhY2goKGNodW5rOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdGaWxlczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGNodW5rLmZpbGVzLmZvckVhY2goKGZpbGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICBpZiAoZmlsZS5tYXRjaCgvXFwuanMoXFwubWFwKT8kLykpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUganMgZmlsZXNcbiAgICAgICAgICAgICAgICBkZWxldGUgY29tcGlsYXRpb24uYXNzZXRzW2ZpbGVdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2h1bmsuZmlsZXMgPSBuZXdGaWxlcztcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLy8gUmVtb3ZlIHNjcmlwdHMgdGFncyB3aXRoIGEgY3NzIGZpbGUgYXMgc291cmNlLCBiZWNhdXNlIEh0bWxXZWJwYWNrUGx1Z2luIHdpbGwgdXNlXG4gICAgICAvLyBhIGNzcyBmaWxlIGFzIGEgc2NyaXB0IGZvciBjaHVua3Mgd2l0aG91dCBqcyBmaWxlcy5cbiAgICAgIC8vIFRPRE86IEVuYWJsZSB0aGlzIG9uY2UgSHRtbFdlYnBhY2tQbHVnaW4gc3VwcG9ydHMgV2VicGFjayA0XG4gICAgICAvLyBjb21waWxhdGlvbi5wbHVnaW4oJ2h0bWwtd2VicGFjay1wbHVnaW4tYWx0ZXItYXNzZXQtdGFncycsXG4gICAgICAvLyAgIChodG1sUGx1Z2luRGF0YTogYW55LCBjYWxsYmFjazogYW55KSA9PiB7XG4gICAgICAvLyAgICAgY29uc3QgZmlsdGVyRm4gPSAodGFnOiBhbnkpID0+XG4gICAgICAvLyAgICAgICAhKHRhZy50YWdOYW1lID09PSAnc2NyaXB0JyAmJiB0YWcuYXR0cmlidXRlcy5zcmMubWF0Y2goL1xcLmNzcyQvKSk7XG4gICAgICAvLyAgICAgaHRtbFBsdWdpbkRhdGEuaGVhZCA9IGh0bWxQbHVnaW5EYXRhLmhlYWQuZmlsdGVyKGZpbHRlckZuKTtcbiAgICAgIC8vICAgICBodG1sUGx1Z2luRGF0YS5ib2R5ID0gaHRtbFBsdWdpbkRhdGEuYm9keS5maWx0ZXIoZmlsdGVyRm4pO1xuICAgICAgLy8gICAgIGNhbGxiYWNrKG51bGwsIGh0bWxQbHVnaW5EYXRhKTtcbiAgICAgIC8vICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==