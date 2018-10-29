"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const path = require("path");
const ts = require("typescript");
function resolveWithPaths(request, callback, compilerOptions, host, cache) {
    if (!request || !request.request || !compilerOptions.paths) {
        callback(null, request);
        return;
    }
    // Only work on Javascript/TypeScript issuers.
    if (!request.contextInfo.issuer || !request.contextInfo.issuer.match(/\.[jt]s$/)) {
        callback(null, request);
        return;
    }
    const originalRequest = request.request.trim();
    // Relative requests are not mapped
    if (originalRequest.startsWith('.') || originalRequest.startsWith('/')) {
        callback(null, request);
        return;
    }
    // Amd requests are not mapped
    if (originalRequest.startsWith('!!webpack amd')) {
        callback(null, request);
        return;
    }
    // check if any path mapping rules are relevant
    const pathMapOptions = [];
    for (const pattern in compilerOptions.paths) {
        // get potentials and remove duplicates; JS Set maintains insertion order
        const potentials = Array.from(new Set(compilerOptions.paths[pattern]));
        if (potentials.length === 0) {
            // no potential replacements so skip
            continue;
        }
        // can only contain zero or one
        const starIndex = pattern.indexOf('*');
        if (starIndex === -1) {
            if (pattern === originalRequest) {
                pathMapOptions.push({
                    starIndex,
                    partial: '',
                    potentials,
                });
            }
        }
        else if (starIndex === 0 && pattern.length === 1) {
            pathMapOptions.push({
                starIndex,
                partial: originalRequest,
                potentials,
            });
        }
        else if (starIndex === pattern.length - 1) {
            if (originalRequest.startsWith(pattern.slice(0, -1))) {
                pathMapOptions.push({
                    starIndex,
                    partial: originalRequest.slice(pattern.length - 1),
                    potentials,
                });
            }
        }
        else {
            const [prefix, suffix] = pattern.split('*');
            if (originalRequest.startsWith(prefix) && originalRequest.endsWith(suffix)) {
                pathMapOptions.push({
                    starIndex,
                    partial: originalRequest.slice(prefix.length).slice(0, -suffix.length),
                    potentials,
                });
            }
        }
    }
    if (pathMapOptions.length === 0) {
        callback(null, request);
        return;
    }
    // exact matches take priority then largest prefix match
    pathMapOptions.sort((a, b) => {
        if (a.starIndex === -1) {
            return -1;
        }
        else if (b.starIndex === -1) {
            return 1;
        }
        else {
            return b.starIndex - a.starIndex;
        }
    });
    if (pathMapOptions[0].potentials.length === 1) {
        const onlyPotential = pathMapOptions[0].potentials[0];
        let replacement;
        const starIndex = onlyPotential.indexOf('*');
        if (starIndex === -1) {
            replacement = onlyPotential;
        }
        else if (starIndex === onlyPotential.length - 1) {
            replacement = onlyPotential.slice(0, -1) + pathMapOptions[0].partial;
        }
        else {
            const [prefix, suffix] = onlyPotential.split('*');
            replacement = prefix + pathMapOptions[0].partial + suffix;
        }
        request.request = path.resolve(compilerOptions.baseUrl || '', replacement);
        callback(null, request);
        return;
    }
    // TODO: The following is used when there is more than one potential and will not be
    //       needed once this is turned into a full webpack resolver plugin
    const moduleResolver = ts.resolveModuleName(originalRequest, request.contextInfo.issuer, compilerOptions, host, cache);
    const moduleFilePath = moduleResolver.resolvedModule
        && moduleResolver.resolvedModule.resolvedFileName;
    // If there is no result, let webpack try to resolve
    if (!moduleFilePath) {
        callback(null, request);
        return;
    }
    // If TypeScript gives us a `.d.ts`, it is probably a node module
    if (moduleFilePath.endsWith('.d.ts')) {
        // If in a package, let webpack resolve the package
        const packageRootPath = path.join(path.dirname(moduleFilePath), 'package.json');
        if (!host.fileExists(packageRootPath)) {
            // Otherwise, if there is a file with a .js extension use that
            const jsFilePath = moduleFilePath.slice(0, -5) + '.js';
            if (host.fileExists(jsFilePath)) {
                request.request = jsFilePath;
            }
        }
        callback(null, request);
        return;
    }
    request.request = moduleFilePath;
    callback(null, request);
}
exports.resolveWithPaths = resolveWithPaths;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aHMtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL3BhdGhzLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFPakMsMEJBQ0UsT0FBbUMsRUFDbkMsUUFBOEMsRUFDOUMsZUFBbUMsRUFDbkMsSUFBcUIsRUFDckIsS0FBZ0M7SUFFaEMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFO1FBQzFELFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEIsT0FBTztLQUNSO0lBRUQsOENBQThDO0lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNoRixRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXhCLE9BQU87S0FDUjtJQUVELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFL0MsbUNBQW1DO0lBQ25DLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3RFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEIsT0FBTztLQUNSO0lBRUQsOEJBQThCO0lBQzlCLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUMvQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXhCLE9BQU87S0FDUjtJQUVELCtDQUErQztJQUMvQyxNQUFNLGNB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QUFPO0tBQ1I7SUFFRCxpRUFBaUU7SUFDakUsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3BDLG1EQUFtRDtRQUNuRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDckMsOERBQThEO1lBQzlELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3ZELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7YUFDOUI7U0FDRjtRQUVELFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEIsT0FBTztLQUNSO0lBRUQsT0FBTyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7SUFDakMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBOUpELDRDQThKQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIENhbGxiYWNrLFxuICBOb3JtYWxNb2R1bGVGYWN0b3J5UmVxdWVzdCxcbn0gZnJvbSAnLi93ZWJwYWNrJztcblxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVdpdGhQYXRocyhcbiAgcmVxdWVzdDogTm9ybWFsTW9kdWxlRmFjdG9yeVJlcXVlc3QsXG4gIGNhbGxiYWNrOiBDYWxsYmFjazxOb3JtYWxNb2R1bGVGYWN0b3J5UmVxdWVzdD4sXG4gIGNvbXBpbGVyT3B0aW9uczogdHMuQ29tcGlsZXJPcHRpb25zLFxuICBob3N0OiB0cy5Db21waWxlckhvc3QsXG4gIGNhY2hlPzogdHMuTW9kdWxlUmVzb2x1dGlvbkNhY2hlLFxuKSB7XG4gIGlmICghcmVxdWVzdCB8fCAhcmVxdWVzdC5yZXF1ZXN0IHx8ICFjb21waWxlck9wdGlvbnMucGF0aHMpIHtcbiAgICBjYWxsYmFjayhudWxsLCByZXF1ZXN0KTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIE9ubHkgd29yayBvbiBKYXZhc2NyaXB0L1R5cGVTY3JpcHQgaXNzdWVycy5cbiAgaWYgKCFyZXF1ZXN0LmNvbnRleHRJbmZvLmlzc3VlciB8fCAhcmVxdWVzdC5jb250ZXh0SW5mby5pc3N1ZXIubWF0Y2goL1xcLltqdF1zJC8pKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBvcmlnaW5hbFJlcXVlc3QgPSByZXF1ZXN0LnJlcXVlc3QudHJpbSgpO1xuXG4gIC8vIFJlbGF0aXZlIHJlcXVlc3RzIGFyZSBub3QgbWFwcGVkXG4gIGlmIChvcmlnaW5hbFJlcXVlc3Quc3RhcnRzV2l0aCgnLicpIHx8IG9yaWdpbmFsUmVxdWVzdC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICBjYWxsYmFjayhudWxsLCByZXF1ZXN0KTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEFtZCByZXF1ZXN0cyBhcmUgbm90IG1hcHBlZFxuICBpZiAob3JpZ2luYWxSZXF1ZXN0LnN0YXJ0c1dpdGgoJyEhd2VicGFjayBhbWQnKSkge1xuICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gY2hlY2sgaWYgYW55IHBhdGggbWFwcGluZyBydWxlcyBhcmUgcmVsZXZhbnRcbiAgY29uc3QgcGF0aE1hcE9wdGlvbnMgPSBbXTtcbiAgZm9yIChjb25zdCBwYXR0ZXJuIGluIGNvbXBpbGVyT3B0aW9ucy5wYXRocykge1xuICAgIC8vIGdldCBwb3RlbnRpYWxzIGFuZCByZW1vdmUgZHVwbGljYXRlczsgSlMgU2V0IG1haW50YWlucyBpbnNlcnRpb24gb3JkZXJcbiAgICBjb25zdCBwb3RlbnRpYWxzID0gQXJyYXkuZnJvbShuZXcgU2V0KGNvbXBpbGVyT3B0aW9ucy5wYXRoc1twYXR0ZXJuXSkpO1xuICAgIGlmIChwb3RlbnRpYWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gbm8gcG90ZW50aWFsIHJlcGxhY2VtZW50cyBzbyBza2lwXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBjYW4gb25seSBjb250YWluIHplcm8gb3Igb25lXG4gICAgY29uc3Qgc3RhckluZGV4ID0gcGF0dGVybi5pbmRleE9mKCcqJyk7XG4gICAgaWYgKHN0YXJJbmRleCA9PT0gLTEpIHtcbiAgICAgIGlmIChwYXR0ZXJuID09PSBvcmlnaW5hbFJlcXVlc3QpIHtcbiAgICAgICAgcGF0aE1hcE9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgc3RhckluZGV4LFxuICAgICAgICAgIHBhcnRpYWw6ICcnLFxuICAgICAgICAgIHBvdGVudGlhbHMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhckluZGV4ID09PSAwICYmIHBhdHRlcm4ubGVuZ3RoID09PSAxKSB7XG4gICAgICBwYXRoTWFwT3B0aW9ucy5wdXNoKHtcbiAgICAgICAgc3RhckluZGV4LFxuICAgICAgICBwYXJ0aWFsOiBvcmlnaW5hbFJlcXVlc3QsXG4gICAgICAgIHBvdGVudGlhbHMsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHN0YXJJbmRleCA9PT0gcGF0dGVybi5sZW5ndGggLSAxKSB7XG4gICAgICBpZiAob3JpZ2luYWxSZXF1ZXN0LnN0YXJ0c1dpdGgocGF0dGVybi5zbGljZSgwLCAtMSkpKSB7XG4gICAgICAgIHBhdGhNYXBPcHRpb25zLnB1c2goe1xuICAgICAgICAgIHN0YXJJbmRleCxcbiAgICAgICAgICBwYXJ0aWFsOiBvcmlnaW5hbFJlcXVlc3Quc2xpY2UocGF0dGVybi5sZW5ndGggLSAxKSxcbiAgICAgICAgICBwb3RlbnRpYWxzLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgW3ByZWZpeCwgc3VmZml4XSA9IHBhdHRlcm4uc3BsaXQoJyonKTtcbiAgICAgIGlmIChvcmlnaW5hbFJlcXVlc3Quc3RhcnRzV2l0aChwcmVmaXgpICYmIG9yaWdpbmFsUmVxdWVzdC5lbmRzV2l0aChzdWZmaXgpKSB7XG4gICAgICAgIHBhdGhNYXBPcHRpb25zLnB1c2goe1xuICAgICAgICAgIHN0YXJJbmRleCxcbiAgICAgICAgICBwYXJ0aWFsOiBvcmlnaW5hbFJlcXVlc3Quc2xpY2UocHJlZml4Lmxlbmd0aCkuc2xpY2UoMCwgLXN1ZmZpeC5sZW5ndGgpLFxuICAgICAgICAgIHBvdGVudGlhbHMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChwYXRoTWFwT3B0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICBjYWxsYmFjayhudWxsLCByZXF1ZXN0KTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGV4YWN0IG1hdGNoZXMgdGFrZSBwcmlvcml0eSB0aGVuIGxhcmdlc3QgcHJlZml4IG1hdGNoXG4gIHBhdGhNYXBPcHRpb25zLnNvcnQoKGEsIGIpID0+IHtcbiAgICBpZiAoYS5zdGFySW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmIChiLnN0YXJJbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYi5zdGFySW5kZXggLSBhLnN0YXJJbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChwYXRoTWFwT3B0aW9uc1swXS5wb3RlbnRpYWxzLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IG9ubHlQb3RlbnRpYWwgPSBwYXRoTWFwT3B0aW9uc1swXS5wb3RlbnRpYWxzWzBdO1xuICAgIGxldCByZXBsYWNlbWVudDtcbiAgICBjb25zdCBzdGFySW5kZXggPSBvbmx5UG90ZW50aWFsLmluZGV4T2YoJyonKTtcbiAgICBpZiAoc3RhckluZGV4ID09PSAtMSkge1xuICAgICAgcmVwbGFjZW1lbnQgPSBvbmx5UG90ZW50aWFsO1xuICAgIH0gZWxzZSBpZiAoc3RhckluZGV4ID09PSBvbmx5UG90ZW50aWFsLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJlcGxhY2VtZW50ID0gb25seVBvdGVudGlhbC5zbGljZSgwLCAtMSkgKyBwYXRoTWFwT3B0aW9uc1swXS5wYXJ0aWFsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBbcHJlZml4LCBzdWZmaXhdID0gb25seVBvdGVudGlhbC5zcGxpdCgnKicpO1xuICAgICAgcmVwbGFjZW1lbnQgPSBwcmVmaXggKyBwYXRoTWFwT3B0aW9uc1swXS5wYXJ0aWFsICsgc3VmZml4O1xuICAgIH1cblxuICAgIHJlcXVlc3QucmVxdWVzdCA9IHBhdGgucmVzb2x2ZShjb21waWxlck9wdGlvbnMuYmFzZVVybCB8fCAnJywgcmVwbGFjZW1lbnQpO1xuICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gVE9ETzogVGhlIGZvbGxvd2luZyBpcyB1c2VkIHdoZW4gdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBwb3RlbnRpYWwgYW5kIHdpbGwgbm90IGJlXG4gIC8vICAgICAgIG5lZWRlZCBvbmNlIHRoaXMgaXMgdHVybmVkIGludG8gYSBmdWxsIHdlYnBhY2sgcmVzb2x2ZXIgcGx1Z2luXG5cbiAgY29uc3QgbW9kdWxlUmVzb2x2ZXIgPSB0cy5yZXNvbHZlTW9kdWxlTmFtZShcbiAgICBvcmlnaW5hbFJlcXVlc3QsXG4gICAgcmVxdWVzdC5jb250ZXh0SW5mby5pc3N1ZXIsXG4gICAgY29tcGlsZXJPcHRpb25zLFxuICAgIGhvc3QsXG4gICAgY2FjaGUsXG4gICk7XG5cbiAgY29uc3QgbW9kdWxlRmlsZVBhdGggPSBtb2R1bGVSZXNvbHZlci5yZXNvbHZlZE1vZHVsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICYmIG1vZHVsZVJlc29sdmVyLnJlc29sdmVkTW9kdWxlLnJlc29sdmVkRmlsZU5hbWU7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gcmVzdWx0LCBsZXQgd2VicGFjayB0cnkgdG8gcmVzb2x2ZVxuICBpZiAoIW1vZHVsZUZpbGVQYXRoKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBJZiBUeXBlU2NyaXB0IGdpdmVzIHVzIGEgYC5kLnRzYCwgaXQgaXMgcHJvYmFibHkgYSBub2RlIG1vZHVsZVxuICBpZiAobW9kdWxlRmlsZVBhdGguZW5kc1dpdGgoJy5kLnRzJykpIHtcbiAgICAvLyBJZiBpbiBhIHBhY2thZ2UsIGxldCB3ZWJwYWNrIHJlc29sdmUgdGhlIHBhY2thZ2VcbiAgICBjb25zdCBwYWNrYWdlUm9vdFBhdGggPSBwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKG1vZHVsZUZpbGVQYXRoKSwgJ3BhY2thZ2UuanNvbicpO1xuICAgIGlmICghaG9zdC5maWxlRXhpc3RzKHBhY2thZ2VSb290UGF0aCkpIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgaWYgdGhlcmUgaXMgYSBmaWxlIHdpdGggYSAuanMgZXh0ZW5zaW9uIHVzZSB0aGF0XG4gICAgICBjb25zdCBqc0ZpbGVQYXRoID0gbW9kdWxlRmlsZVBhdGguc2xpY2UoMCwgLTUpICsgJy5qcyc7XG4gICAgICBpZiAoaG9zdC5maWxlRXhpc3RzKGpzRmlsZVBhdGgpKSB7XG4gICAgICAgIHJlcXVlc3QucmVxdWVzdCA9IGpzRmlsZVBhdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICByZXF1ZXN0LnJlcXVlc3QgPSBtb2R1bGVGaWxlUGF0aDtcbiAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdCk7XG59XG4iXX0=