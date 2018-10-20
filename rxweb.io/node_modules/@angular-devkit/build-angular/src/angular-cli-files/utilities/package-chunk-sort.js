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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS1jaHVuay1zb3J0LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy91dGlsaXRpZXMvcGFja2FnZS1jaHVuay1zb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxpQkFBaUI7QUFDakIsK0RBQStEOztBQUcvRCwyREFBNEU7QUFFNUUsNkJBQW9DLFNBQWM7SUFDaEQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFL0MsbURBQW1EO0lBQ25EO1FBQ0UsR0FBRyxpQ0FBeUIsQ0FBQyxTQUFTLENBQUMsTUFBMkIsRUFBRSxRQUFRLENBQUM7YUFDMUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDakMsR0FBRyxpQ0FBeUIsQ0FBQyxTQUFTLENBQUMsT0FBNEIsRUFBRSxTQUFTLENBQUM7YUFDNUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7S0FDbEMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDckIsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekIsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQXBCRCxrREFvQkM7QUFFRCwrQ0FBK0M7QUFDL0MsOENBQThDO0FBQzlDLDBCQUFpQyxTQUFjO0lBQzdDLE1BQU0sV0FBVyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRW5ELGNBQWMsSUFBUyxFQUFFLEtBQVU7UUFDakMsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckQsSUFBSSxTQUFTLEdBQUcsVUFBVSxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7YUFBTSxJQUFJLFNBQVMsR0FBRyxVQUFVLEVBQUU7WUFDakMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQztJQUVELGdHQUFnRztJQUNoRyxrQkFBa0I7SUFDakIsSUFBWSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDeEMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBcEJELDRDQW9CQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlXG4vLyBUT0RPOiBjbGVhbnVwIHRoaXMgZmlsZSwgaXQncyBjb3BpZWQgYXMgaXMgZnJvbSBBbmd1bGFyIENMSS5cblxuaW1wb3J0IHsgRXh0cmFFbnRyeVBvaW50IH0gZnJvbSAnLi4vLi4vYnJvd3Nlci9zY2hlbWEnO1xuaW1wb3J0IHsgbm9ybWFsaXplRXh0cmFFbnRyeVBvaW50cyB9IGZyb20gJy4uL21vZGVscy93ZWJwYWNrLWNvbmZpZ3MvdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVFbnRyeVBvaW50cyhhcHBDb25maWc6IGFueSkge1xuICBsZXQgZW50cnlQb2ludHMgPSBbJ3BvbHlmaWxscycsICdzdy1yZWdpc3RlciddO1xuXG4gIC8vIEFkZCBhbGwgc3R5bGVzL3NjcmlwdHMsIGV4Y2VwdCBsYXp5LWxvYWRlZCBvbmVzLlxuICBbXG4gICAgLi4ubm9ybWFsaXplRXh0cmFFbnRyeVBvaW50cyhhcHBDb25maWcuc3R5bGVzIGFzIEV4dHJhRW50cnlQb2ludFtdLCAnc3R5bGVzJylcbiAgICAgIC5maWx0ZXIoZW50cnkgPT4gIWVudHJ5LmxhenkpXG4gICAgICAubWFwKGVudHJ5ID0+IGVudHJ5LmJ1bmRsZU5hbWUpLFxuICAgIC4uLm5vcm1hbGl6ZUV4dHJhRW50cnlQb2ludHMoYXBwQ29uZmlnLnNjcmlwdHMgYXMgRXh0cmFFbnRyeVBvaW50W10sICdzY3JpcHRzJylcbiAgICAgIC5maWx0ZXIoZW50cnkgPT4gIWVudHJ5LmxhenkpXG4gICAgICAubWFwKGVudHJ5ID0+IGVudHJ5LmJ1bmRsZU5hbWUpLFxuICBdLmZvckVhY2goYnVuZGxlTmFtZSA9PiB7XG4gICAgaWYgKGVudHJ5UG9pbnRzLmluZGV4T2YoYnVuZGxlTmFtZSkgPT09IC0xKSB7XG4gICAgICBlbnRyeVBvaW50cy5wdXNoKGJ1bmRsZU5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgZW50cnlQb2ludHMucHVzaCgnbWFpbicpO1xuXG4gIHJldHVybiBlbnRyeVBvaW50cztcbn1cblxuLy8gU29ydCBjaHVua3MgYWNjb3JkaW5nIHRvIGEgcHJlZGVmaW5lZCBvcmRlcjpcbi8vIGlubGluZSwgcG9seWZpbGxzLCBhbGwgc3R5bGVzLCB2ZW5kb3IsIG1haW5cbmV4cG9ydCBmdW5jdGlvbiBwYWNrYWdlQ2h1bmtTb3J0KGFwcENvbmZpZzogYW55KSB7XG4gIGNvbnN0IGVudHJ5UG9pbnRzID0gZ2VuZXJhdGVFbnRyeVBvaW50cyhhcHBDb25maWcpO1xuXG4gIGZ1bmN0aW9uIHNvcnQobGVmdDogYW55LCByaWdodDogYW55KSB7XG4gICAgbGV0IGxlZnRJbmRleCA9IGVudHJ5UG9pbnRzLmluZGV4T2YobGVmdC5uYW1lc1swXSk7XG4gICAgbGV0IHJpZ2h0aW5kZXggPSBlbnRyeVBvaW50cy5pbmRleE9mKHJpZ2h0Lm5hbWVzWzBdKTtcblxuICAgIGlmIChsZWZ0SW5kZXggPiByaWdodGluZGV4KSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGxlZnRJbmRleCA8IHJpZ2h0aW5kZXgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgLy8gV2UgbmVlZCB0byBsaXN0IG9mIGVudHJ5IHBvaW50cyBmb3IgdGhlIEVqZWN0ZWQgd2VicGFjayBjb25maWcgdG8gd29yayAod2UgcmV1c2UgdGhlIGZ1bmN0aW9uXG4gIC8vIGRlZmluZWQgYWJvdmUpLlxuICAoc29ydCBhcyBhbnkpLmVudHJ5UG9pbnRzID0gZW50cnlQb2ludHM7XG4gIHJldHVybiBzb3J0O1xufVxuIl19