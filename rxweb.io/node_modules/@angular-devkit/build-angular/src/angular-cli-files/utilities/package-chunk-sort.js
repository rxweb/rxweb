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
const utils_1 = require("../models/webpack-configs/utils");
function generateEntryPoints(appConfig) {
    let entryPoints = ['polyfills', 'sw-register'];
    // Add all styles/scripts, except lazy-loaded ones.
    [
        ...utils_1.normalizeExtraEntryPoints(appConfig.styles, 'styles')
            .filter(entry => !entry.lazy)
            .map(entry => entry.bundleName),
        ...utils_1.normalizeExtraEntryPoints(appConfig.scripts, 'scripts')
            .filter(entry => !entry.lazy)
            .map(entry => entry.bundleName),
    ].forEach(bundleName => {
        if (entryPoints.indexOf(bundleName) === -1) {
            entryPoints.push(bundleName);
        }
    });
    entryPoints.push('main');
    return entryPoints;
}
exports.generateEntryPoints = generateEntryPoints;
// Sort chunks according to a predefined order:
// inline, polyfills, all styles, vendor, main
function packageChunkSort(appConfig) {
    const entryPoints = generateEntryPoints(appConfig);
    function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    // We need to list of entry points for the Ejected webpack config to work (we reuse the function
    // defined above).
    sort.entryPoints = entryPoints;
    return sort;
}
exports.packageChunkSort = packageChunkSort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS1jaHVuay1zb3J0LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy91dGlsaXRpZXMvcGFja2FnZS1jaHVuay1zb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxpQkFBaUI7QUFDakIsK0RBQStEOztBQUcvRCwyREFBNEU7QUFFNUUsNkJBQW9DLFNBQWM7SUFDaEQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFL0MsbURBQW1EO0lBQ25EO1FBQ0UsR0FBRyxpQ0FBeUIsQ0FBQyxTQUFTLENBQUMsTUFBMkIsRUFBRSxRQUFRLENBQUM7YUFDMUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDakMsR0FBRyxpQ0FBeUIsQ0FBQyxTQUFTLENBQUMsT0FBNEIsRUFBRSxTQUFTLENBQUM7YUFDNUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7S0FDbEMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDckIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpCLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQXBCRCxrREFvQkM7QUFFRCwrQ0FBK0M7QUFDL0MsOENBQThDO0FBQzlDLDBCQUFpQyxTQUFjO0lBQzdDLE1BQU0sV0FBVyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRW5ELGNBQWMsSUFBUyxFQUFFLEtBQVU7UUFDakMsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckQsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0dBQWdHO0lBQ2hHLGtCQUFrQjtJQUNqQixJQUFZLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQXBCRCw0Q0FvQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5cbmltcG9ydCB7IEV4dHJhRW50cnlQb2ludCB9IGZyb20gJy4uLy4uL2Jyb3dzZXIvc2NoZW1hJztcbmltcG9ydCB7IG5vcm1hbGl6ZUV4dHJhRW50cnlQb2ludHMgfSBmcm9tICcuLi9tb2RlbHMvd2VicGFjay1jb25maWdzL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlRW50cnlQb2ludHMoYXBwQ29uZmlnOiBhbnkpIHtcbiAgbGV0IGVudHJ5UG9pbnRzID0gWydwb2x5ZmlsbHMnLCAnc3ctcmVnaXN0ZXInXTtcblxuICAvLyBBZGQgYWxsIHN0eWxlcy9zY3JpcHRzLCBleGNlcHQgbGF6eS1sb2FkZWQgb25lcy5cbiAgW1xuICAgIC4uLm5vcm1hbGl6ZUV4dHJhRW50cnlQb2ludHMoYXBwQ29uZmlnLnN0eWxlcyBhcyBFeHRyYUVudHJ5UG9pbnRbXSwgJ3N0eWxlcycpXG4gICAgICAuZmlsdGVyKGVudHJ5ID0+ICFlbnRyeS5sYXp5KVxuICAgICAgLm1hcChlbnRyeSA9PiBlbnRyeS5idW5kbGVOYW1lKSxcbiAgICAuLi5ub3JtYWxpemVFeHRyYUVudHJ5UG9pbnRzKGFwcENvbmZpZy5zY3JpcHRzIGFzIEV4dHJhRW50cnlQb2ludFtdLCAnc2NyaXB0cycpXG4gICAgICAuZmlsdGVyKGVudHJ5ID0+ICFlbnRyeS5sYXp5KVxuICAgICAgLm1hcChlbnRyeSA9PiBlbnRyeS5idW5kbGVOYW1lKSxcbiAgXS5mb3JFYWNoKGJ1bmRsZU5hbWUgPT4ge1xuICAgIGlmIChlbnRyeVBvaW50cy5pbmRleE9mKGJ1bmRsZU5hbWUpID09PSAtMSkge1xuICAgICAgZW50cnlQb2ludHMucHVzaChidW5kbGVOYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIGVudHJ5UG9pbnRzLnB1c2goJ21haW4nKTtcblxuICByZXR1cm4gZW50cnlQb2ludHM7XG59XG5cbi8vIFNvcnQgY2h1bmtzIGFjY29yZGluZyB0byBhIHByZWRlZmluZWQgb3JkZXI6XG4vLyBpbmxpbmUsIHBvbHlmaWxscywgYWxsIHN0eWxlcywgdmVuZG9yLCBtYWluXG5leHBvcnQgZnVuY3Rpb24gcGFja2FnZUNodW5rU29ydChhcHBDb25maWc6IGFueSkge1xuICBjb25zdCBlbnRyeVBvaW50cyA9IGdlbmVyYXRlRW50cnlQb2ludHMoYXBwQ29uZmlnKTtcblxuICBmdW5jdGlvbiBzb3J0KGxlZnQ6IGFueSwgcmlnaHQ6IGFueSkge1xuICAgIGxldCBsZWZ0SW5kZXggPSBlbnRyeVBvaW50cy5pbmRleE9mKGxlZnQubmFtZXNbMF0pO1xuICAgIGxldCByaWdodGluZGV4ID0gZW50cnlQb2ludHMuaW5kZXhPZihyaWdodC5uYW1lc1swXSk7XG5cbiAgICBpZiAobGVmdEluZGV4ID4gcmlnaHRpbmRleCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChsZWZ0SW5kZXggPCByaWdodGluZGV4KSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlIG5lZWQgdG8gbGlzdCBvZiBlbnRyeSBwb2ludHMgZm9yIHRoZSBFamVjdGVkIHdlYnBhY2sgY29uZmlnIHRvIHdvcmsgKHdlIHJldXNlIHRoZSBmdW5jdGlvblxuICAvLyBkZWZpbmVkIGFib3ZlKS5cbiAgKHNvcnQgYXMgYW55KS5lbnRyeVBvaW50cyA9IGVudHJ5UG9pbnRzO1xuICByZXR1cm4gc29ydDtcbn1cbiJdfQ==