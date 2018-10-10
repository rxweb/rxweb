"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const source_map_1 = require("source-map");
const loaderUtils = require('loader-utils');
const build_optimizer_1 = require("./build-optimizer");
function buildOptimizerLoader(content, previousSourceMap) {
    this.cacheable();
    const options = loaderUtils.getOptions(this) || {};
    // Make up names of the intermediate files so we can chain the sourcemaps.
    const inputFilePath = this.resourcePath + '.pre-build-optimizer.js';
    const outputFilePath = this.resourcePath + '.post-build-optimizer.js';
    const boOutput = build_optimizer_1.buildOptimizer({
        content,
        originalFilePath: this.resourcePath,
        inputFilePath,
        outputFilePath,
        emitSourceMap: options.sourceMap,
        isSideEffectFree: this._module
            && this._module.factoryMeta
            && this._module.factoryMeta.sideEffectFree,
    });
    if (boOutput.emitSkipped || boOutput.content === null) {
        // Webpack typings for previousSourceMap are wrong, they are JSON objects and not strings.
        // tslint:disable-next-line:no-any
        this.callback(null, content, previousSourceMap);
        return;
    }
    const intermediateSourceMap = boOutput.sourceMap;
    let newContent = boOutput.content;
    let newSourceMap;
    if (options.sourceMap && intermediateSourceMap) {
        // Webpack doesn't need sourceMappingURL since we pass them on explicitely.
        newContent = newContent.replace(/^\/\/# sourceMappingURL=[^\r\n]*/gm, '');
        if (previousSourceMap) {
            // If there's a previous sourcemap, we have to chain them.
            // See https://github.com/mozilla/source-map/issues/216#issuecomment-150839869 for a simple
            // source map chaining example.
            // Use http://sokra.github.io/source-map-visualization/ to validate sourcemaps make sense.
            // Force the previous sourcemap to use the filename we made up for it.
            // In order for source maps to be chained, the consumed source map `file` needs to be in the
            // consumers source map `sources` array.
            previousSourceMap.file = inputFilePath;
            // Chain the sourcemaps.
            const consumer = new source_map_1.SourceMapConsumer(intermediateSourceMap);
            const generator = source_map_1.SourceMapGenerator.fromSourceMap(consumer);
            generator.applySourceMap(new source_map_1.SourceMapConsumer(previousSourceMap));
            newSourceMap = generator.toJSON();
        }
        else {
            // Otherwise just return our generated sourcemap.
            newSourceMap = intermediateSourceMap;
        }
    }
    // Webpack typings for previousSourceMap are wrong, they are JSON objects and not strings.
    // tslint:disable-next-line:no-any
    this.callback(null, newContent, newSourceMap);
}
exports.default = buildOptimizerLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX29wdGltaXplci9zcmMvYnVpbGQtb3B0aW1pemVyL3dlYnBhY2stbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsMkNBQWlGO0FBR2pGLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU1Qyx1REFBbUQ7QUFPbkQsOEJBQ3VDLE9BQWUsRUFBRSxpQkFBK0I7SUFDckYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLE1BQU0sT0FBTyxHQUFnQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVoRiwwRUFBMEU7SUFDMUUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztJQUNwRSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLDBCQUEwQixDQUFDO0lBRXRFLE1BQU0sUUFBUSxHQUFHLGdDQUFjLENBQUM7UUFDOUIsT0FBTztRQUNQLGdCQUFnQixFQUFFLElBQUksQ0FBQyxZQUFZO1FBQ25DLGFBQWE7UUFDYixjQUFjO1FBQ2QsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTO1FBQ2hDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPO2VBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2VBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWM7S0FDN0QsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsMEZBQTBGO1FBQzFGLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsaUJBQXdCLENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUM7SUFDVCxDQUFDO0lBRUQsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQ2pELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFFbEMsSUFBSSxZQUFZLENBQUM7SUFFakIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7UUFDL0MsMkVBQTJFO1FBQzNFLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTFFLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUN0QiwwREFBMEQ7WUFDMUQsMkZBQTJGO1lBQzNGLCtCQUErQjtZQUMvQiwwRkFBMEY7WUFFMUYsc0VBQXNFO1lBQ3RFLDRGQUE0RjtZQUM1Rix3Q0FBd0M7WUFDeEMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztZQUV2Qyx3QkFBd0I7WUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSw4QkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzlELE1BQU0sU0FBUyxHQUFHLCtCQUFrQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksOEJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ25FLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04saURBQWlEO1lBQ2pELFlBQVksR0FBRyxxQkFBcUIsQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztJQUVELDBGQUEwRjtJQUMxRixrQ0FBa0M7SUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQW1CLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBOURELHVDQThEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFJhd1NvdXJjZU1hcCwgU291cmNlTWFwQ29uc3VtZXIsIFNvdXJjZU1hcEdlbmVyYXRvciB9IGZyb20gJ3NvdXJjZS1tYXAnO1xuaW1wb3J0ICogYXMgd2VicGFjayBmcm9tICd3ZWJwYWNrJzsgIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG5cbmNvbnN0IGxvYWRlclV0aWxzID0gcmVxdWlyZSgnbG9hZGVyLXV0aWxzJyk7XG5cbmltcG9ydCB7IGJ1aWxkT3B0aW1pemVyIH0gZnJvbSAnLi9idWlsZC1vcHRpbWl6ZXInO1xuXG5cbmludGVyZmFjZSBCdWlsZE9wdGltaXplckxvYWRlck9wdGlvbnMge1xuICBzb3VyY2VNYXA6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkT3B0aW1pemVyTG9hZGVyXG4gICh0aGlzOiB3ZWJwYWNrLmxvYWRlci5Mb2FkZXJDb250ZXh0LCBjb250ZW50OiBzdHJpbmcsIHByZXZpb3VzU291cmNlTWFwOiBSYXdTb3VyY2VNYXApIHtcbiAgdGhpcy5jYWNoZWFibGUoKTtcbiAgY29uc3Qgb3B0aW9uczogQnVpbGRPcHRpbWl6ZXJMb2FkZXJPcHRpb25zID0gbG9hZGVyVXRpbHMuZ2V0T3B0aW9ucyh0aGlzKSB8fCB7fTtcblxuICAvLyBNYWtlIHVwIG5hbWVzIG9mIHRoZSBpbnRlcm1lZGlhdGUgZmlsZXMgc28gd2UgY2FuIGNoYWluIHRoZSBzb3VyY2VtYXBzLlxuICBjb25zdCBpbnB1dEZpbGVQYXRoID0gdGhpcy5yZXNvdXJjZVBhdGggKyAnLnByZS1idWlsZC1vcHRpbWl6ZXIuanMnO1xuICBjb25zdCBvdXRwdXRGaWxlUGF0aCA9IHRoaXMucmVzb3VyY2VQYXRoICsgJy5wb3N0LWJ1aWxkLW9wdGltaXplci5qcyc7XG5cbiAgY29uc3QgYm9PdXRwdXQgPSBidWlsZE9wdGltaXplcih7XG4gICAgY29udGVudCxcbiAgICBvcmlnaW5hbEZpbGVQYXRoOiB0aGlzLnJlc291cmNlUGF0aCxcbiAgICBpbnB1dEZpbGVQYXRoLFxuICAgIG91dHB1dEZpbGVQYXRoLFxuICAgIGVtaXRTb3VyY2VNYXA6IG9wdGlvbnMuc291cmNlTWFwLFxuICAgIGlzU2lkZUVmZmVjdEZyZWU6IHRoaXMuX21vZHVsZVxuICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX21vZHVsZS5mYWN0b3J5TWV0YVxuICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX21vZHVsZS5mYWN0b3J5TWV0YS5zaWRlRWZmZWN0RnJlZSxcbiAgfSk7XG5cbiAgaWYgKGJvT3V0cHV0LmVtaXRTa2lwcGVkIHx8IGJvT3V0cHV0LmNvbnRlbnQgPT09IG51bGwpIHtcbiAgICAvLyBXZWJwYWNrIHR5cGluZ3MgZm9yIHByZXZpb3VzU291cmNlTWFwIGFyZSB3cm9uZywgdGhleSBhcmUgSlNPTiBvYmplY3RzIGFuZCBub3Qgc3RyaW5ncy5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgdGhpcy5jYWxsYmFjayhudWxsLCBjb250ZW50LCBwcmV2aW91c1NvdXJjZU1hcCBhcyBhbnkpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW50ZXJtZWRpYXRlU291cmNlTWFwID0gYm9PdXRwdXQuc291cmNlTWFwO1xuICBsZXQgbmV3Q29udGVudCA9IGJvT3V0cHV0LmNvbnRlbnQ7XG5cbiAgbGV0IG5ld1NvdXJjZU1hcDtcblxuICBpZiAob3B0aW9ucy5zb3VyY2VNYXAgJiYgaW50ZXJtZWRpYXRlU291cmNlTWFwKSB7XG4gICAgLy8gV2VicGFjayBkb2Vzbid0IG5lZWQgc291cmNlTWFwcGluZ1VSTCBzaW5jZSB3ZSBwYXNzIHRoZW0gb24gZXhwbGljaXRlbHkuXG4gICAgbmV3Q29udGVudCA9IG5ld0NvbnRlbnQucmVwbGFjZSgvXlxcL1xcLyMgc291cmNlTWFwcGluZ1VSTD1bXlxcclxcbl0qL2dtLCAnJyk7XG5cbiAgICBpZiAocHJldmlvdXNTb3VyY2VNYXApIHtcbiAgICAgIC8vIElmIHRoZXJlJ3MgYSBwcmV2aW91cyBzb3VyY2VtYXAsIHdlIGhhdmUgdG8gY2hhaW4gdGhlbS5cbiAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL2lzc3Vlcy8yMTYjaXNzdWVjb21tZW50LTE1MDgzOTg2OSBmb3IgYSBzaW1wbGVcbiAgICAgIC8vIHNvdXJjZSBtYXAgY2hhaW5pbmcgZXhhbXBsZS5cbiAgICAgIC8vIFVzZSBodHRwOi8vc29rcmEuZ2l0aHViLmlvL3NvdXJjZS1tYXAtdmlzdWFsaXphdGlvbi8gdG8gdmFsaWRhdGUgc291cmNlbWFwcyBtYWtlIHNlbnNlLlxuXG4gICAgICAvLyBGb3JjZSB0aGUgcHJldmlvdXMgc291cmNlbWFwIHRvIHVzZSB0aGUgZmlsZW5hbWUgd2UgbWFkZSB1cCBmb3IgaXQuXG4gICAgICAvLyBJbiBvcmRlciBmb3Igc291cmNlIG1hcHMgdG8gYmUgY2hhaW5lZCwgdGhlIGNvbnN1bWVkIHNvdXJjZSBtYXAgYGZpbGVgIG5lZWRzIHRvIGJlIGluIHRoZVxuICAgICAgLy8gY29uc3VtZXJzIHNvdXJjZSBtYXAgYHNvdXJjZXNgIGFycmF5LlxuICAgICAgcHJldmlvdXNTb3VyY2VNYXAuZmlsZSA9IGlucHV0RmlsZVBhdGg7XG5cbiAgICAgIC8vIENoYWluIHRoZSBzb3VyY2VtYXBzLlxuICAgICAgY29uc3QgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIoaW50ZXJtZWRpYXRlU291cmNlTWFwKTtcbiAgICAgIGNvbnN0IGdlbmVyYXRvciA9IFNvdXJjZU1hcEdlbmVyYXRvci5mcm9tU291cmNlTWFwKGNvbnN1bWVyKTtcbiAgICAgIGdlbmVyYXRvci5hcHBseVNvdXJjZU1hcChuZXcgU291cmNlTWFwQ29uc3VtZXIocHJldmlvdXNTb3VyY2VNYXApKTtcbiAgICAgIG5ld1NvdXJjZU1hcCA9IGdlbmVyYXRvci50b0pTT04oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3RoZXJ3aXNlIGp1c3QgcmV0dXJuIG91ciBnZW5lcmF0ZWQgc291cmNlbWFwLlxuICAgICAgbmV3U291cmNlTWFwID0gaW50ZXJtZWRpYXRlU291cmNlTWFwO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlYnBhY2sgdHlwaW5ncyBmb3IgcHJldmlvdXNTb3VyY2VNYXAgYXJlIHdyb25nLCB0aGV5IGFyZSBKU09OIG9iamVjdHMgYW5kIG5vdCBzdHJpbmdzLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHRoaXMuY2FsbGJhY2sobnVsbCwgbmV3Q29udGVudCwgbmV3U291cmNlTWFwIGFzIGFueSk7XG59XG4iXX0=