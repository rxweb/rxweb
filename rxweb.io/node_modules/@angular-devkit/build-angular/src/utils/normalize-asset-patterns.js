"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class MissingAssetSourceRootException extends core_1.BaseException {
    constructor(path) {
        super(`The ${path} asset path must start with the project source root.`);
    }
}
exports.MissingAssetSourceRootException = MissingAssetSourceRootException;
function normalizeAssetPatterns(assetPatterns, host, root, projectRoot, maybeSourceRoot) {
    // When sourceRoot is not available, we default to ${projectRoot}/src.
    const sourceRoot = maybeSourceRoot || core_1.join(projectRoot, 'src');
    const resolvedSourceRoot = core_1.resolve(root, sourceRoot);
    if (assetPatterns.length === 0) {
        // If there are no asset patterns, return an empty array.
        // It's important to do this because forkJoin with an empty array will immediately complete
        // the observable.
        return rxjs_1.of([]);
    }
    const assetPatternObjectObservables = assetPatterns
        .map(assetPattern => {
        // Normalize string asset patterns to objects.
        if (typeof assetPattern === 'string') {
            const assetPath = core_1.normalize(assetPattern);
            const resolvedAssetPath = core_1.resolve(root, assetPath);
            // Check if the string asset is within sourceRoot.
            if (!resolvedAssetPath.startsWith(resolvedSourceRoot)) {
                throw new MissingAssetSourceRootException(assetPattern);
            }
            return host.isDirectory(resolvedAssetPath).pipe(
            // If the path doesn't exist at all, pretend it is a directory.
            operators_1.catchError(() => rxjs_1.of(true)), operators_1.map(isDirectory => {
                let glob, input, output;
                if (isDirectory) {
                    // Folders get a recursive star glob.
                    glob = '**/*';
                    // Input directory is their original path.
                    input = assetPath;
                }
                else {
                    // Files are their own glob.
                    glob = core_1.basename(assetPath);
                    // Input directory is their original dirname.
                    input = core_1.dirname(assetPath);
                }
                // Output directory for both is the relative path from source root to input.
                output = core_1.relative(resolvedSourceRoot, core_1.resolve(root, input));
                // Return the asset pattern in object format.
                return { glob, input, output };
            }));
        }
        else {
            // It's already an AssetPatternObject, no need to convert.
            return rxjs_1.of(assetPattern);
        }
    });
    // Wait for all the asset patterns and return them as an array.
    return rxjs_1.forkJoin(assetPatternObjectObservables);
}
exports.normalizeAssetPatterns = normalizeAssetPatterns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplLWFzc2V0LXBhdHRlcm5zLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy91dGlscy9ub3JtYWxpemUtYXNzZXQtcGF0dGVybnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FVOEI7QUFDOUIsK0JBQWdEO0FBQ2hELDhDQUFpRDtBQUlqRCxxQ0FBNkMsU0FBUSxvQkFBYTtJQUNoRSxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLE9BQU8sSUFBSSxzREFBc0QsQ0FBQyxDQUFDO0lBQzNFLENBQUM7Q0FDRjtBQUpELDBFQUlDO0FBRUQsZ0NBQ0UsYUFBNkIsRUFDN0IsSUFBb0IsRUFDcEIsSUFBVSxFQUNWLFdBQWlCLEVBQ2pCLGVBQWlDO0lBRWpDLHNFQUFzRTtJQUN0RSxNQUFNLFVBQVUsR0FBRyxlQUFlLElBQUksV0FBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRCxNQUFNLGtCQUFrQixHQUFHLGNBQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFckQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLHlEQUF5RDtRQUN6RCwyRkFBMkY7UUFDM0Ysa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxTQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sNkJBQTZCLEdBQXFDLGFBQWE7U0FDbEYsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ2xCLDhDQUE4QztRQUM5QyxFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLGdCQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUMsTUFBTSxpQkFBaUIsR0FBRyxjQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRW5ELGtEQUFrRDtZQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsTUFBTSxJQUFJLCtCQUErQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUk7WUFDN0MsK0RBQStEO1lBQy9ELHNCQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzFCLGVBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxJQUFZLEVBQUUsS0FBVyxFQUFFLE1BQVksQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDaEIscUNBQXFDO29CQUNyQyxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUNkLDBDQUEwQztvQkFDMUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDcEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTiw0QkFBNEI7b0JBQzVCLElBQUksR0FBRyxlQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzNCLDZDQUE2QztvQkFDN0MsS0FBSyxHQUFHLGNBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFFRCw0RUFBNEU7Z0JBQzVFLE1BQU0sR0FBRyxlQUFRLENBQUMsa0JBQWtCLEVBQUUsY0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUU1RCw2Q0FBNkM7Z0JBQzdDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLDBEQUEwRDtZQUMxRCxNQUFNLENBQUMsU0FBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVMLCtEQUErRDtJQUMvRCxNQUFNLENBQUMsZUFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDakQsQ0FBQztBQTlERCx3REE4REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1xuICBCYXNlRXhjZXB0aW9uLFxuICBQYXRoLFxuICBiYXNlbmFtZSxcbiAgZGlybmFtZSxcbiAgam9pbixcbiAgbm9ybWFsaXplLFxuICByZWxhdGl2ZSxcbiAgcmVzb2x2ZSxcbiAgdmlydHVhbEZzLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmb3JrSm9pbiwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFzc2V0UGF0dGVybiwgQXNzZXRQYXR0ZXJuT2JqZWN0IH0gZnJvbSAnLi4vYnJvd3Nlci9zY2hlbWEnO1xuXG5cbmV4cG9ydCBjbGFzcyBNaXNzaW5nQXNzZXRTb3VyY2VSb290RXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHBhdGg6IFN0cmluZykge1xuICAgIHN1cGVyKGBUaGUgJHtwYXRofSBhc3NldCBwYXRoIG11c3Qgc3RhcnQgd2l0aCB0aGUgcHJvamVjdCBzb3VyY2Ugcm9vdC5gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQXNzZXRQYXR0ZXJucyhcbiAgYXNzZXRQYXR0ZXJuczogQXNzZXRQYXR0ZXJuW10sXG4gIGhvc3Q6IHZpcnR1YWxGcy5Ib3N0LFxuICByb290OiBQYXRoLFxuICBwcm9qZWN0Um9vdDogUGF0aCxcbiAgbWF5YmVTb3VyY2VSb290OiBQYXRoIHwgdW5kZWZpbmVkLFxuKTogT2JzZXJ2YWJsZTxBc3NldFBhdHRlcm5PYmplY3RbXT4ge1xuICAvLyBXaGVuIHNvdXJjZVJvb3QgaXMgbm90IGF2YWlsYWJsZSwgd2UgZGVmYXVsdCB0byAke3Byb2plY3RSb290fS9zcmMuXG4gIGNvbnN0IHNvdXJjZVJvb3QgPSBtYXliZVNvdXJjZVJvb3QgfHwgam9pbihwcm9qZWN0Um9vdCwgJ3NyYycpO1xuICBjb25zdCByZXNvbHZlZFNvdXJjZVJvb3QgPSByZXNvbHZlKHJvb3QsIHNvdXJjZVJvb3QpO1xuXG4gIGlmIChhc3NldFBhdHRlcm5zLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIElmIHRoZXJlIGFyZSBubyBhc3NldCBwYXR0ZXJucywgcmV0dXJuIGFuIGVtcHR5IGFycmF5LlxuICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIGRvIHRoaXMgYmVjYXVzZSBmb3JrSm9pbiB3aXRoIGFuIGVtcHR5IGFycmF5IHdpbGwgaW1tZWRpYXRlbHkgY29tcGxldGVcbiAgICAvLyB0aGUgb2JzZXJ2YWJsZS5cbiAgICByZXR1cm4gb2YoW10pO1xuICB9XG5cbiAgY29uc3QgYXNzZXRQYXR0ZXJuT2JqZWN0T2JzZXJ2YWJsZXM6IE9ic2VydmFibGU8QXNzZXRQYXR0ZXJuT2JqZWN0PltdID0gYXNzZXRQYXR0ZXJuc1xuICAgIC5tYXAoYXNzZXRQYXR0ZXJuID0+IHtcbiAgICAgIC8vIE5vcm1hbGl6ZSBzdHJpbmcgYXNzZXQgcGF0dGVybnMgdG8gb2JqZWN0cy5cbiAgICAgIGlmICh0eXBlb2YgYXNzZXRQYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBhc3NldFBhdGggPSBub3JtYWxpemUoYXNzZXRQYXR0ZXJuKTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRBc3NldFBhdGggPSByZXNvbHZlKHJvb3QsIGFzc2V0UGF0aCk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHN0cmluZyBhc3NldCBpcyB3aXRoaW4gc291cmNlUm9vdC5cbiAgICAgICAgaWYgKCFyZXNvbHZlZEFzc2V0UGF0aC5zdGFydHNXaXRoKHJlc29sdmVkU291cmNlUm9vdCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTWlzc2luZ0Fzc2V0U291cmNlUm9vdEV4Y2VwdGlvbihhc3NldFBhdHRlcm4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhvc3QuaXNEaXJlY3RvcnkocmVzb2x2ZWRBc3NldFBhdGgpLnBpcGUoXG4gICAgICAgICAgLy8gSWYgdGhlIHBhdGggZG9lc24ndCBleGlzdCBhdCBhbGwsIHByZXRlbmQgaXQgaXMgYSBkaXJlY3RvcnkuXG4gICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZih0cnVlKSksXG4gICAgICAgICAgbWFwKGlzRGlyZWN0b3J5ID0+IHtcbiAgICAgICAgICAgIGxldCBnbG9iOiBzdHJpbmcsIGlucHV0OiBQYXRoLCBvdXRwdXQ6IFBhdGg7XG4gICAgICAgICAgICBpZiAoaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgLy8gRm9sZGVycyBnZXQgYSByZWN1cnNpdmUgc3RhciBnbG9iLlxuICAgICAgICAgICAgICBnbG9iID0gJyoqLyonO1xuICAgICAgICAgICAgICAvLyBJbnB1dCBkaXJlY3RvcnkgaXMgdGhlaXIgb3JpZ2luYWwgcGF0aC5cbiAgICAgICAgICAgICAgaW5wdXQgPSBhc3NldFBhdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBGaWxlcyBhcmUgdGhlaXIgb3duIGdsb2IuXG4gICAgICAgICAgICAgIGdsb2IgPSBiYXNlbmFtZShhc3NldFBhdGgpO1xuICAgICAgICAgICAgICAvLyBJbnB1dCBkaXJlY3RvcnkgaXMgdGhlaXIgb3JpZ2luYWwgZGlybmFtZS5cbiAgICAgICAgICAgICAgaW5wdXQgPSBkaXJuYW1lKGFzc2V0UGF0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE91dHB1dCBkaXJlY3RvcnkgZm9yIGJvdGggaXMgdGhlIHJlbGF0aXZlIHBhdGggZnJvbSBzb3VyY2Ugcm9vdCB0byBpbnB1dC5cbiAgICAgICAgICAgIG91dHB1dCA9IHJlbGF0aXZlKHJlc29sdmVkU291cmNlUm9vdCwgcmVzb2x2ZShyb290LCBpbnB1dCkpO1xuXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFzc2V0IHBhdHRlcm4gaW4gb2JqZWN0IGZvcm1hdC5cbiAgICAgICAgICAgIHJldHVybiB7IGdsb2IsIGlucHV0LCBvdXRwdXQgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0J3MgYWxyZWFkeSBhbiBBc3NldFBhdHRlcm5PYmplY3QsIG5vIG5lZWQgdG8gY29udmVydC5cbiAgICAgICAgcmV0dXJuIG9mKGFzc2V0UGF0dGVybik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgLy8gV2FpdCBmb3IgYWxsIHRoZSBhc3NldCBwYXR0ZXJucyBhbmQgcmV0dXJuIHRoZW0gYXMgYW4gYXJyYXkuXG4gIHJldHVybiBmb3JrSm9pbihhc3NldFBhdHRlcm5PYmplY3RPYnNlcnZhYmxlcyk7XG59XG4iXX0=