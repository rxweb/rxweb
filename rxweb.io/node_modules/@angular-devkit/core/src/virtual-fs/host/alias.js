"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const path_1 = require("../path");
const resolver_1 = require("./resolver");
/**
 * A Virtual Host that allow to alias some paths to other paths.
 *
 * This does not verify, when setting an alias, that the target or source exist. Neither does it
 * check whether it's a file or a directory. Please not that directories are also renamed/replaced.
 *
 * No recursion is done on the resolution, which means the following is perfectly valid then:
 *
 * ```
 *     host.aliases.set(normalize('/file/a'), normalize('/file/b'));
 *     host.aliases.set(normalize('/file/b'), normalize('/file/a'));
 * ```
 *
 * This will result in a proper swap of two files for each others.
 *
 * @example
 *   const host = new SimpleMemoryHost();
 *   host.write(normalize('/some/file'), content).subscribe();
 *
 *   const aHost = new AliasHost(host);
 *   aHost.read(normalize('/some/file'))
 *     .subscribe(x => expect(x).toBe(content));
 *   aHost.aliases.set(normalize('/some/file'), normalize('/other/path');
 *
 *   // This file will not exist because /other/path does not exist.
 *   aHost.read(normalize('/some/file'))
 *     .subscribe(undefined, err => expect(err.message).toMatch(/does not exist/));
 *
 * @example
 *   const host = new SimpleMemoryHost();
 *   host.write(normalize('/some/folder/file'), content).subscribe();
 *
 *   const aHost = new AliasHost(host);
 *   aHost.read(normalize('/some/folder/file'))
 *     .subscribe(x => expect(x).toBe(content));
 *   aHost.aliases.set(normalize('/some'), normalize('/other');
 *
 *   // This file will not exist because /other/path does not exist.
 *   aHost.read(normalize('/some/folder/file'))
 *     .subscribe(undefined, err => expect(err.message).toMatch(/does not exist/));
 *
 *   // Create the file with new content and verify that this has the new content.
 *   aHost.write(normalize('/other/folder/file'), content2).subscribe();
 *   aHost.read(normalize('/some/folder/file'))
 *     .subscribe(x => expect(x).toBe(content2));
 */
class AliasHost extends resolver_1.ResolverHost {
    constructor() {
        super(...arguments);
        this._aliases = new Map();
    }
    _resolve(path) {
        let maybeAlias = this._aliases.get(path);
        const sp = path_1.split(path);
        const remaining = [];
        // Also resolve all parents of the requested files, only picking the first one that matches.
        // This can have surprising behaviour when aliases are inside another alias. It will always
        // use the closest one to the file.
        while (!maybeAlias && sp.length > 0) {
            const p = path_1.join(path_1.NormalizedRoot, ...sp);
            maybeAlias = this._aliases.get(p);
            if (maybeAlias) {
                maybeAlias = path_1.join(maybeAlias, ...remaining);
            }
            // Allow non-null-operator because we know sp.length > 0 (condition on while).
            remaining.unshift(sp.pop()); // tslint:disable-line:non-null-operator
        }
        return maybeAlias || path;
    }
    get aliases() { return this._aliases; }
}
exports.AliasHost = AliasHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL3ZpcnR1YWwtZnMvaG9zdC9hbGlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILGtDQUEwRTtBQUMxRSx5Q0FBMEM7QUFHMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDRztBQUNILGVBQW1ELFNBQVEsdUJBQW9CO0lBQS9FOztRQUNZLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBYyxDQUFDO0lBeUI3QyxDQUFDO0lBdkJXLFFBQVEsQ0FBQyxJQUFVO1FBQzNCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sRUFBRSxHQUFHLFlBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixNQUFNLFNBQVMsR0FBbUIsRUFBRSxDQUFDO1FBRXJDLDRGQUE0RjtRQUM1RiwyRkFBMkY7UUFDM0YsbUNBQW1DO1FBQ25DLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxDQUFDLEdBQUcsV0FBSSxDQUFDLHFCQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN0QyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxHQUFHLFdBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQzthQUM3QztZQUNELDhFQUE4RTtZQUM5RSxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUksQ0FBQyxDQUFDLENBQUUsd0NBQXdDO1NBQ3pFO1FBRUQsT0FBTyxVQUFVLElBQUksSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLE9BQU8sS0FBc0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztDQUN6RDtBQTFCRCw4QkEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBOb3JtYWxpemVkUm9vdCwgUGF0aCwgUGF0aEZyYWdtZW50LCBqb2luLCBzcGxpdCB9IGZyb20gJy4uL3BhdGgnO1xuaW1wb3J0IHsgUmVzb2x2ZXJIb3N0IH0gZnJvbSAnLi9yZXNvbHZlcic7XG5cblxuLyoqXG4gKiBBIFZpcnR1YWwgSG9zdCB0aGF0IGFsbG93IHRvIGFsaWFzIHNvbWUgcGF0aHMgdG8gb3RoZXIgcGF0aHMuXG4gKlxuICogVGhpcyBkb2VzIG5vdCB2ZXJpZnksIHdoZW4gc2V0dGluZyBhbiBhbGlhcywgdGhhdCB0aGUgdGFyZ2V0IG9yIHNvdXJjZSBleGlzdC4gTmVpdGhlciBkb2VzIGl0XG4gKiBjaGVjayB3aGV0aGVyIGl0J3MgYSBmaWxlIG9yIGEgZGlyZWN0b3J5LiBQbGVhc2Ugbm90IHRoYXQgZGlyZWN0b3JpZXMgYXJlIGFsc28gcmVuYW1lZC9yZXBsYWNlZC5cbiAqXG4gKiBObyByZWN1cnNpb24gaXMgZG9uZSBvbiB0aGUgcmVzb2x1dGlvbiwgd2hpY2ggbWVhbnMgdGhlIGZvbGxvd2luZyBpcyBwZXJmZWN0bHkgdmFsaWQgdGhlbjpcbiAqXG4gKiBgYGBcbiAqICAgICBob3N0LmFsaWFzZXMuc2V0KG5vcm1hbGl6ZSgnL2ZpbGUvYScpLCBub3JtYWxpemUoJy9maWxlL2InKSk7XG4gKiAgICAgaG9zdC5hbGlhc2VzLnNldChub3JtYWxpemUoJy9maWxlL2InKSwgbm9ybWFsaXplKCcvZmlsZS9hJykpO1xuICogYGBgXG4gKlxuICogVGhpcyB3aWxsIHJlc3VsdCBpbiBhIHByb3BlciBzd2FwIG9mIHR3byBmaWxlcyBmb3IgZWFjaCBvdGhlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqICAgY29uc3QgaG9zdCA9IG5ldyBTaW1wbGVNZW1vcnlIb3N0KCk7XG4gKiAgIGhvc3Qud3JpdGUobm9ybWFsaXplKCcvc29tZS9maWxlJyksIGNvbnRlbnQpLnN1YnNjcmliZSgpO1xuICpcbiAqICAgY29uc3QgYUhvc3QgPSBuZXcgQWxpYXNIb3N0KGhvc3QpO1xuICogICBhSG9zdC5yZWFkKG5vcm1hbGl6ZSgnL3NvbWUvZmlsZScpKVxuICogICAgIC5zdWJzY3JpYmUoeCA9PiBleHBlY3QoeCkudG9CZShjb250ZW50KSk7XG4gKiAgIGFIb3N0LmFsaWFzZXMuc2V0KG5vcm1hbGl6ZSgnL3NvbWUvZmlsZScpLCBub3JtYWxpemUoJy9vdGhlci9wYXRoJyk7XG4gKlxuICogICAvLyBUaGlzIGZpbGUgd2lsbCBub3QgZXhpc3QgYmVjYXVzZSAvb3RoZXIvcGF0aCBkb2VzIG5vdCBleGlzdC5cbiAqICAgYUhvc3QucmVhZChub3JtYWxpemUoJy9zb21lL2ZpbGUnKSlcbiAqICAgICAuc3Vic2NyaWJlKHVuZGVmaW5lZCwgZXJyID0+IGV4cGVjdChlcnIubWVzc2FnZSkudG9NYXRjaCgvZG9lcyBub3QgZXhpc3QvKSk7XG4gKlxuICogQGV4YW1wbGVcbiAqICAgY29uc3QgaG9zdCA9IG5ldyBTaW1wbGVNZW1vcnlIb3N0KCk7XG4gKiAgIGhvc3Qud3JpdGUobm9ybWFsaXplKCcvc29tZS9mb2xkZXIvZmlsZScpLCBjb250ZW50KS5zdWJzY3JpYmUoKTtcbiAqXG4gKiAgIGNvbnN0IGFIb3N0ID0gbmV3IEFsaWFzSG9zdChob3N0KTtcbiAqICAgYUhvc3QucmVhZChub3JtYWxpemUoJy9zb21lL2ZvbGRlci9maWxlJykpXG4gKiAgICAgLnN1YnNjcmliZSh4ID0+IGV4cGVjdCh4KS50b0JlKGNvbnRlbnQpKTtcbiAqICAgYUhvc3QuYWxpYXNlcy5zZXQobm9ybWFsaXplKCcvc29tZScpLCBub3JtYWxpemUoJy9vdGhlcicpO1xuICpcbiAqICAgLy8gVGhpcyBmaWxlIHdpbGwgbm90IGV4aXN0IGJlY2F1c2UgL290aGVyL3BhdGggZG9lcyBub3QgZXhpc3QuXG4gKiAgIGFIb3N0LnJlYWQobm9ybWFsaXplKCcvc29tZS9mb2xkZXIvZmlsZScpKVxuICogICAgIC5zdWJzY3JpYmUodW5kZWZpbmVkLCBlcnIgPT4gZXhwZWN0KGVyci5tZXNzYWdlKS50b01hdGNoKC9kb2VzIG5vdCBleGlzdC8pKTtcbiAqXG4gKiAgIC8vIENyZWF0ZSB0aGUgZmlsZSB3aXRoIG5ldyBjb250ZW50IGFuZCB2ZXJpZnkgdGhhdCB0aGlzIGhhcyB0aGUgbmV3IGNvbnRlbnQuXG4gKiAgIGFIb3N0LndyaXRlKG5vcm1hbGl6ZSgnL290aGVyL2ZvbGRlci9maWxlJyksIGNvbnRlbnQyKS5zdWJzY3JpYmUoKTtcbiAqICAgYUhvc3QucmVhZChub3JtYWxpemUoJy9zb21lL2ZvbGRlci9maWxlJykpXG4gKiAgICAgLnN1YnNjcmliZSh4ID0+IGV4cGVjdCh4KS50b0JlKGNvbnRlbnQyKSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBbGlhc0hvc3Q8U3RhdHNUIGV4dGVuZHMgb2JqZWN0ID0ge30+IGV4dGVuZHMgUmVzb2x2ZXJIb3N0PFN0YXRzVD4ge1xuICBwcm90ZWN0ZWQgX2FsaWFzZXMgPSBuZXcgTWFwPFBhdGgsIFBhdGg+KCk7XG5cbiAgcHJvdGVjdGVkIF9yZXNvbHZlKHBhdGg6IFBhdGgpIHtcbiAgICBsZXQgbWF5YmVBbGlhcyA9IHRoaXMuX2FsaWFzZXMuZ2V0KHBhdGgpO1xuICAgIGNvbnN0IHNwID0gc3BsaXQocGF0aCk7XG4gICAgY29uc3QgcmVtYWluaW5nOiBQYXRoRnJhZ21lbnRbXSA9IFtdO1xuXG4gICAgLy8gQWxzbyByZXNvbHZlIGFsbCBwYXJlbnRzIG9mIHRoZSByZXF1ZXN0ZWQgZmlsZXMsIG9ubHkgcGlja2luZyB0aGUgZmlyc3Qgb25lIHRoYXQgbWF0Y2hlcy5cbiAgICAvLyBUaGlzIGNhbiBoYXZlIHN1cnByaXNpbmcgYmVoYXZpb3VyIHdoZW4gYWxpYXNlcyBhcmUgaW5zaWRlIGFub3RoZXIgYWxpYXMuIEl0IHdpbGwgYWx3YXlzXG4gICAgLy8gdXNlIHRoZSBjbG9zZXN0IG9uZSB0byB0aGUgZmlsZS5cbiAgICB3aGlsZSAoIW1heWJlQWxpYXMgJiYgc3AubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcCA9IGpvaW4oTm9ybWFsaXplZFJvb3QsIC4uLnNwKTtcbiAgICAgIG1heWJlQWxpYXMgPSB0aGlzLl9hbGlhc2VzLmdldChwKTtcblxuICAgICAgaWYgKG1heWJlQWxpYXMpIHtcbiAgICAgICAgbWF5YmVBbGlhcyA9IGpvaW4obWF5YmVBbGlhcywgLi4ucmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIC8vIEFsbG93IG5vbi1udWxsLW9wZXJhdG9yIGJlY2F1c2Ugd2Uga25vdyBzcC5sZW5ndGggPiAwIChjb25kaXRpb24gb24gd2hpbGUpLlxuICAgICAgcmVtYWluaW5nLnVuc2hpZnQoc3AucG9wKCkgISk7ICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vbi1udWxsLW9wZXJhdG9yXG4gICAgfVxuXG4gICAgcmV0dXJuIG1heWJlQWxpYXMgfHwgcGF0aDtcbiAgfVxuXG4gIGdldCBhbGlhc2VzKCk6IE1hcDxQYXRoLCBQYXRoPiB7IHJldHVybiB0aGlzLl9hbGlhc2VzOyB9XG59XG4iXX0=