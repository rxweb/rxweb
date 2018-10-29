"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const exception_1 = require("../exception");
class InvalidPathException extends exception_1.BaseException {
    constructor(path) { super(`Path ${JSON.stringify(path)} is invalid.`); }
}
exports.InvalidPathException = InvalidPathException;
class PathMustBeAbsoluteException extends exception_1.BaseException {
    constructor(path) { super(`Path ${JSON.stringify(path)} must be absolute.`); }
}
exports.PathMustBeAbsoluteException = PathMustBeAbsoluteException;
class PathCannotBeFragmentException extends exception_1.BaseException {
    constructor(path) { super(`Path ${JSON.stringify(path)} cannot be made a fragment.`); }
}
exports.PathCannotBeFragmentException = PathCannotBeFragmentException;
/**
 * The Separator for normalized path.
 * @type {Path}
 */
exports.NormalizedSep = '/';
/**
 * The root of a normalized path.
 * @type {Path}
 */
exports.NormalizedRoot = exports.NormalizedSep;
/**
 * Split a path into multiple path fragments. Each fragments except the last one will end with
 * a path separator.
 * @param {Path} path The path to split.
 * @returns {Path[]} An array of path fragments.
 */
function split(path) {
    const fragments = path.split(exports.NormalizedSep).map(x => fragment(x));
    if (fragments[fragments.length - 1].length === 0) {
        fragments.pop();
    }
    return fragments;
}
exports.split = split;
/**
 *
 */
function extname(path) {
    const base = basename(path);
    const i = base.lastIndexOf('.');
    if (i < 1) {
        return '';
    }
    else {
        return base.substr(i);
    }
}
exports.extname = extname;
/**
 * Return the basename of the path, as a Path. See path.basename
 */
function basename(path) {
    const i = path.lastIndexOf(exports.NormalizedSep);
    if (i == -1) {
        return fragment(path);
    }
    else {
        return fragment(path.substr(path.lastIndexOf(exports.NormalizedSep) + 1));
    }
}
exports.basename = basename;
/**
 * Return the dirname of the path, as a Path. See path.dirname
 */
function dirname(path) {
    const index = path.lastIndexOf(exports.NormalizedSep);
    if (index === -1) {
        return '';
    }
    const endIndex = index === 0 ? 1 : index; // case of file under root: '/file'
    return normalize(path.substr(0, endIndex));
}
exports.dirname = dirname;
/**
 * Join multiple paths together, and normalize the result. Accepts strings that will be
 * normalized as well (but the original must be a path).
 */
function join(p1, ...others) {
    if (others.length > 0) {
        return normalize((p1 ? p1 + exports.NormalizedSep : '') + others.join(exports.NormalizedSep));
    }
    else {
        return p1;
    }
}
exports.join = join;
/**
 * Returns true if a path is absolute.
 */
function isAbsolute(p) {
    return p.startsWith(exports.NormalizedSep);
}
exports.isAbsolute = isAbsolute;
/**
 * Returns a path such that `join(from, relative(from, to)) == to`.
 * Both paths must be absolute, otherwise it does not make much sense.
 */
function relative(from, to) {
    if (!isAbsolute(from)) {
        throw new PathMustBeAbsoluteException(from);
    }
    if (!isAbsolute(to)) {
        throw new PathMustBeAbsoluteException(to);
    }
    let p;
    if (from == to) {
        p = '';
    }
    else {
        const splitFrom = from.split(exports.NormalizedSep);
        const splitTo = to.split(exports.NormalizedSep);
        while (splitFrom.length > 0 && splitTo.length > 0 && splitFrom[0] == splitTo[0]) {
            splitFrom.shift();
            splitTo.shift();
        }
        if (splitFrom.length == 0) {
            p = splitTo.join(exports.NormalizedSep);
        }
        else {
            p = splitFrom.map(_ => '..').concat(splitTo).join(exports.NormalizedSep);
        }
    }
    return normalize(p);
}
exports.relative = relative;
/**
 * Returns a Path that is the resolution of p2, from p1. If p2 is absolute, it will return p2,
 * otherwise will join both p1 and p2.
 */
function resolve(p1, p2) {
    if (isAbsolute(p2)) {
        return p2;
    }
    else {
        return join(p1, p2);
    }
}
exports.resolve = resolve;
function fragment(path) {
    if (path.indexOf(exports.NormalizedSep) != -1) {
        throw new PathCannotBeFragmentException(path);
    }
    return path;
}
exports.fragment = fragment;
/**
 * Normalize a string into a Path. This is the only mean to get a Path type from a string that
 * represents a system path. Normalization includes:
 *   - Windows backslashes `\\` are replaced with `/`.
 *   - Windows drivers are replaced with `/X/`, where X is the drive letter.
 *   - Absolute paths starts with `/`.
 *   - Multiple `/` are replaced by a single one.
 *   - Path segments `.` are removed.
 *   - Path segments `..` are resolved.
 *   - If a path is absolute, having a `..` at the start is invalid (and will throw).
 */
function normalize(path) {
    if (path == '' || path == '.') {
        return '';
    }
    else if (path == exports.NormalizedRoot) {
        return exports.NormalizedRoot;
    }
    // Match absolute windows path.
    const original = path;
    if (path.match(/^[A-Z]:[\/\\]/i)) {
        path = '\\' + path[0] + '\\' + path.substr(3);
    }
    // We convert Windows paths as well here.
    const p = path.split(/[\/\\]/g);
    let relative = false;
    let i = 1;
    // Special case the first one.
    if (p[0] != '') {
        p.unshift('.');
        relative = true;
    }
    while (i < p.length) {
        if (p[i] == '.') {
            p.splice(i, 1);
        }
        else if (p[i] == '..') {
            if (i < 2 && !relative) {
                throw new InvalidPathException(original);
            }
            else if (i >= 2 && p[i - 1] != '..') {
                p.splice(i - 1, 2);
                i--;
            }
            else {
                i++;
            }
        }
        else if (p[i] == '') {
            p.splice(i, 1);
        }
        else {
            i++;
        }
    }
    if (p.length == 1) {
        return p[0] == '' ? exports.NormalizedSep : '';
    }
    else {
        if (p[0] == '.') {
            p.shift();
        }
        return p.join(exports.NormalizedSep);
    }
}
exports.normalize = normalize;
exports.path = (strings, ...values) => {
    return normalize(String.raw(strings, ...values));
};
function asWindowsPath(path) {
    const drive = path.match(/^\/(\w)\/(.*)$/);
    if (drive) {
        return `${drive[1]}:\\${drive[2].replace(/\//g, '\\')}`;
    }
    return path.replace(/\//g, '\\');
}
exports.asWindowsPath = asWindowsPath;
function asPosixPath(path) {
    return path;
}
exports.asPosixPath = asPosixPath;
function getSystemPath(path) {
    if (process.platform.startsWith('win32')) {
        return asWindowsPath(path);
    }
    else {
        return asPosixPath(path);
    }
}
exports.getSystemPath = getSystemPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdmlydHVhbC1mcy9wYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsNENBQTZDO0FBSTdDLDBCQUFrQyxTQUFRLHlCQUFhO0lBQ3JELFlBQVksSUFBWSxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqRjtBQUZELG9EQUVDO0FBQ0QsaUNBQXlDLFNBQVEseUJBQWE7SUFDNUQsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdkY7QUFGRCxrRUFFQztBQUNELG1DQUEyQyxTQUFRLHlCQUFhO0lBQzlELFlBQVksSUFBWSxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hHO0FBRkQsc0VBRUM7QUFrQkQ7OztHQUdHO0FBQ1UsUUFBQSxhQUFhLEdBQUcsR0FBVyxDQUFDO0FBR3pDOzs7R0FHRztBQUNVLFFBQUEsY0FBYyxHQUFHLHFCQUFxQixDQUFDO0FBR3BEOzs7OztHQUtHO0FBQ0gsZUFBc0IsSUFBVTtJQUM5QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDaEQsU0FBUyxDQUFDLEdBQUcsRUFB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SSxDQUFnQixDQUFDO0FBQ2xELENBQUM7QUFQRCxzQ0FPQztBQUVELHFCQUE0QixJQUFVO0lBQ3BDLE9BQU8sSUFBMkIsQ0FBQztBQUNyQyxDQUFDO0FBRkQsa0NBRUM7QUFFRCx1QkFBOEIsSUFBVTtJQUN0QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO1NBQU07UUFDTCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtBQUNILENBQUM7QUFORCxzQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgVGVtcGxhdGVUYWcgfSBmcm9tICcuLi91dGlscy9saXRlcmFscyc7XG5cblxuZXhwb3J0IGNsYXNzIEludmFsaWRQYXRoRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykgeyBzdXBlcihgUGF0aCAke0pTT04uc3RyaW5naWZ5KHBhdGgpfSBpcyBpbnZhbGlkLmApOyB9XG59XG5leHBvcnQgY2xhc3MgUGF0aE11c3RCZUFic29sdXRlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykgeyBzdXBlcihgUGF0aCAke0pTT04uc3RyaW5naWZ5KHBhdGgpfSBtdXN0IGJlIGFic29sdXRlLmApOyB9XG59XG5leHBvcnQgY2xhc3MgUGF0aENhbm5vdEJlRnJhZ21lbnRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7IHN1cGVyKGBQYXRoICR7SlNPTi5zdHJpbmdpZnkocGF0aCl9IGNhbm5vdCBiZSBtYWRlIGEgZnJhZ21lbnQuYCk7IH1cbn1cblxuXG4vKipcbiAqIEEgUGF0aCByZWNvZ25pemVkIGJ5IG1vc3QgbWV0aG9kcyBpbiB0aGUgRGV2S2l0LlxuICovXG5leHBvcnQgdHlwZSBQYXRoID0gc3RyaW5nICYge1xuICBfX1BSSVZBVEVfREVWS0lUX1BBVEg6IHZvaWQ7XG59O1xuXG4vKipcbiAqIEEgUGF0aCBmcmFnbWVudCAoZmlsZSBvciBkaXJlY3RvcnkgbmFtZSkgcmVjb2duaXplZCBieSBtb3N0IG1ldGhvZHMgaW4gdGhlIERldktpdC5cbiAqL1xuZXhwb3J0IHR5cGUgUGF0aEZyYWdtZW50ID0gUGF0aCAmIHtcbiAgX19QUklWQVRFX0RFVktJVF9QQVRIX0ZSQUdNRU5UOiB2b2lkO1xufTtcblxuXG4vKipcbiAqIFRoZSBTZXBhcmF0b3IgZm9yIG5vcm1hbGl6ZWQgcGF0aC5cbiAqIEB0eXBlIHtQYXRofVxuICovXG5leHBvcnQgY29uc3QgTm9ybWFsaXplZFNlcCA9ICcvJyBhcyBQYXRoO1xuXG5cbi8qKlxuICogVGhlIHJvb3Qgb2YgYSBub3JtYWxpemVkIHBhdGguXG4gKiBAdHlwZSB7UGF0aH1cbiAqL1xuZXhwb3J0IGNvbnN0IE5vcm1hbGl6ZWRSb290ID0gTm9ybWFsaXplZFNlcCBhcyBQYXRoO1xuXG5cbi8qKlxuICogU3BsaXQgYSBwYXRoIGludG8gbXVsdGlwbGUgcGF0aCBmcmFnbWVudHMuIEVhY2ggZnJhZ21lbnRzIGV4Y2VwdCB0aGUgbGFzdCBvbmUgd2lsbCBlbmQgd2l0aFxuICogYSBwYXRoIHNlcGFyYXRvci5cbiAqIEBwYXJhbSB7UGF0aH0gcGF0aCBUaGUgcGF0aCB0byBzcGxpdC5cbiAqIEByZXR1cm5zIHtQYXRoW119IEFuIGFycmF5IG9mIHBhdGggZnJhZ21lbnRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaXQocGF0aDogUGF0aCk6IFBhdGhGcmFnbWVudFtdIHtcbiAgY29uc3QgZnJhZ21lbnRzID0gcGF0aC5zcGxpdChOb3JtYWxpemVkU2VwKS5tYXAoeCA9PiBmcmFnbWVudCh4KSk7XG4gIGlmIChmcmFnbWVudHNbZnJhZ21lbnRzLmxlbmd0aCAtIDFdLmxlbmd0aCA9PT0gMCkge1xuICAgIGZyYWdtZW50cy5wb3AoKTtcbiAgfVxuXG4gIHJldHVybiBmcmFnbWVudHM7XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dG5hbWUocGF0aDogUGF0aCk6IHN0cmluZyB7XG4gIGNvbnN0IGJhc2UgPSBiYXNlbmFtZShwYXRoKTtcbiAgY29uc3QgaSA9IGJhc2UubGFzdEluZGV4T2YoJy4nKTtcbiAgaWYgKGkgPCAxKSB7XG4gICAgcmV0dXJuICcnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlLnN1YnN0cihpKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmV0dXJuIHRoZSBiYXNlbmFtZSBvZiB0aGUgcGF0aCwgYXMgYSBQYXRoLiBTZWUgcGF0aC5iYXNlbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZW5hbWUocGF0aDogUGF0aCk6IFBhdGhGcmFnbWVudCB7XG4gIGNvbnN0IGkgPSBwYXRoLmxhc3RJbmRleE9mKE5vcm1hbGl6ZWRTZXApO1xuICBpZiAoaSA9PSAtMSkge1xuICAgIHJldHVybiBmcmFnbWVudChwYXRoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnJhZ21lbnQocGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihOb3JtYWxpemVkU2VwKSArIDEpKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmV0dXJuIHRoZSBkaXJuYW1lIG9mIHRoZSBwYXRoLCBhcyBhIFBhdGguIFNlZSBwYXRoLmRpcm5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpcm5hbWUocGF0aDogUGF0aCk6IFBhdGgge1xuICBjb25zdCBpbmRleCA9IHBhdGgubGFzdEluZGV4T2YoTm9ybWFsaXplZFNlcCk7XG4gIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gJycgYXMgUGF0aDtcbiAgfVxuXG4gIGNvbnN0IGVuZEluZGV4ID0gaW5kZXggPT09IDAgPyAxIDogaW5kZXg7IC8vIGNhc2Ugb2YgZmlsZSB1bmRlciByb290OiAnL2ZpbGUnXG5cbiAgcmV0dXJuIG5vcm1hbGl6ZShwYXRoLnN1YnN0cigwLCBlbmRJbmRleCkpO1xufVxuXG5cbi8qKlxuICogSm9pbiBtdWx0aXBsZSBwYXRocyB0b2dldGhlciwgYW5kIG5vcm1hbGl6ZSB0aGUgcmVzdWx0LiBBY2NlcHRzIHN0cmluZ3MgdGhhdCB3aWxsIGJlXG4gKiBub3JtYWxpemVkIGFzIHdlbGwgKGJ1dCB0aGUgb3JpZ2luYWwgbXVzdCBiZSBhIHBhdGgpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gam9pbihwMTogUGF0aCwgLi4ub3RoZXJzOiBzdHJpbmdbXSk6IFBhdGgge1xuICBpZiAob3RoZXJzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gbm9ybWFsaXplKChwMSA/IHAxICsgTm9ybWFsaXplZFNlcCA6ICcnKSArIG90aGVycy5qb2luKE5vcm1hbGl6ZWRTZXApKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcDE7XG4gIH1cbn1cblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIHBhdGggaXMgYWJzb2x1dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Fic29sdXRlKHA6IFBhdGgpIHtcbiAgcmV0dXJuIHAuc3RhcnRzV2l0aChOb3JtYWxpemVkU2VwKTtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgYSBwYXRoIHN1Y2ggdGhhdCBgam9pbihmcm9tLCByZWxhdGl2ZShmcm9tLCB0bykpID09IHRvYC5cbiAqIEJvdGggcGF0aHMgbXVzdCBiZSBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGl0IGRvZXMgbm90IG1ha2UgbXVjaCBzZW5zZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlKGZyb206IFBhdGgsIHRvOiBQYXRoKTogUGF0aCB7XG4gIGlmICghaXNBYnNvbHV0ZShmcm9tKSkge1xuICAgIHRocm93IG5ldyBQYXRoTXVzdEJlQWJzb2x1dGVFeGNlcHRpb24oZnJvbSk7XG4gIH1cbiAgaWYgKCFpc0Fic29sdXRlKHRvKSkge1xuICAgIHRocm93IG5ldyBQYXRoTXVzdEJlQWJzb2x1dGVFeGNlcHRpb24odG8pO1xuICB9XG5cbiAgbGV0IHA6IHN0cmluZztcblxuICBpZiAoZnJvbSA9PSB0bykge1xuICAgIHAgPSAnJztcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzcGxpdEZyb20gPSBmcm9tLnNwbGl0KE5vcm1hbGl6ZWRTZXApO1xuICAgIGNvbnN0IHNwbGl0VG8gPSB0by5zcGxpdChOb3JtYWxpemVkU2VwKTtcblxuICAgIHdoaWxlIChzcGxpdEZyb20ubGVuZ3RoID4gMCAmJiBzcGxpdFRvLmxlbmd0aCA+IDAgJiYgc3BsaXRGcm9tWzBdID09IHNwbGl0VG9bMF0pIHtcbiAgICAgIHNwbGl0RnJvbS5zaGlmdCgpO1xuICAgICAgc3BsaXRUby5zaGlmdCgpO1xuICAgIH1cblxuICAgIGlmIChzcGxpdEZyb20ubGVuZ3RoID09IDApIHtcbiAgICAgIHAgPSBzcGxpdFRvLmpvaW4oTm9ybWFsaXplZFNlcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHAgPSBzcGxpdEZyb20ubWFwKF8gPT4gJy4uJykuY29uY2F0KHNwbGl0VG8pLmpvaW4oTm9ybWFsaXplZFNlcCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZShwKTtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgYSBQYXRoIHRoYXQgaXMgdGhlIHJlc29sdXRpb24gb2YgcDIsIGZyb20gcDEuIElmIHAyIGlzIGFic29sdXRlLCBpdCB3aWxsIHJldHVybiBwMixcbiAqIG90aGVyd2lzZSB3aWxsIGpvaW4gYm90aCBwMSBhbmQgcDIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlKHAxOiBQYXRoLCBwMjogUGF0aCkge1xuICBpZiAoaXNBYnNvbHV0ZShwMikpIHtcbiAgICByZXR1cm4gcDI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGpvaW4ocDEsIHAyKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmcmFnbWVudChwYXRoOiBzdHJpbmcpOiBQYXRoRnJhZ21lbnQge1xuICBpZiAocGF0aC5pbmRleE9mKE5vcm1hbGl6ZWRTZXApICE9IC0xKSB7XG4gICAgdGhyb3cgbmV3IFBhdGhDYW5ub3RCZUZyYWdtZW50RXhjZXB0aW9uKHBhdGgpO1xuICB9XG5cbiAgcmV0dXJuIHBhdGggYXMgUGF0aEZyYWdtZW50O1xufVxuXG5cbi8qKlxuICogTm9ybWFsaXplIGEgc3RyaW5nIGludG8gYSBQYXRoLiBUaGlzIGlzIHRoZSBvbmx5IG1lYW4gdG8gZ2V0IGEgUGF0aCB0eXBlIGZyb20gYSBzdHJpbmcgdGhhdFxuICogcmVwcmVzZW50cyBhIHN5c3RlbSBwYXRoLiBOb3JtYWxpemF0aW9uIGluY2x1ZGVzOlxuICogICAtIFdpbmRvd3MgYmFja3NsYXNoZXMgYFxcXFxgIGFyZSByZXBsYWNlZCB3aXRoIGAvYC5cbiAqICAgLSBXaW5kb3dzIGRyaXZlcnMgYXJlIHJlcGxhY2VkIHdpdGggYC9YL2AsIHdoZXJlIFggaXMgdGhlIGRyaXZlIGxldHRlci5cbiAqICAgLSBBYnNvbHV0ZSBwYXRocyBzdGFydHMgd2l0aCBgL2AuXG4gKiAgIC0gTXVsdGlwbGUgYC9gIGFyZSByZXBsYWNlZCBieSBhIHNpbmdsZSBvbmUuXG4gKiAgIC0gUGF0aCBzZWdtZW50cyBgLmAgYXJlIHJlbW92ZWQuXG4gKiAgIC0gUGF0aCBzZWdtZW50cyBgLi5gIGFyZSByZXNvbHZlZC5cbiAqICAgLSBJZiBhIHBhdGggaXMgYWJzb2x1dGUsIGhhdmluZyBhIGAuLmAgYXQgdGhlIHN0YXJ0IGlzIGludmFsaWQgKGFuZCB3aWxsIHRocm93KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoOiBzdHJpbmcpOiBQYXRoIHtcbiAgaWYgKHBhdGggPT0gJycgfHwgcGF0aCA9PSAnLicpIHtcbiAgICByZXR1cm4gJycgYXMgUGF0aDtcbiAgfSBlbHNlIGlmIChwYXRoID09IE5vcm1hbGl6ZWRSb290KSB7XG4gICAgcmV0dXJuIE5vcm1hbGl6ZWRSb290O1xuICB9XG5cbiAgLy8gTWF0Y2ggYWJzb2x1dGUgd2luZG93cyBwYXRoLlxuICBjb25zdCBvcmlnaW5hbCA9IHBhdGg7XG4gIGlmIChwYXRoLm1hdGNoKC9eW0EtWl06W1xcL1xcXFxdL2kpKSB7XG4gICAgcGF0aCA9ICdcXFxcJyArIHBhdGhbMF0gKyAnXFxcXCcgKyBwYXRoLnN1YnN0cigzKTtcbiAgfVxuXG4gIC8vIFdlIGNvbnZlcnQgV2luZG93cyBwYXRocyBhcyB3ZWxsIGhlcmUuXG4gIGNvbnN0IHAgPSBwYXRoLnNwbGl0KC9bXFwvXFxcXF0vZyk7XG4gIGxldCByZWxhdGl2ZSA9IGZhbHNlO1xuICBsZXQgaSA9IDE7XG5cbiAgLy8gU3BlY2lhbCBjYXNlIHRoZSBmaXJzdCBvbmUuXG4gIGlmIChwWzBdICE9ICcnKSB7XG4gICAgcC51bnNoaWZ0KCcuJyk7XG4gICAgcmVsYXRpdmUgPSB0cnVlO1xuICB9XG5cbiAgd2hpbGUgKGkgPCBwLmxlbmd0aCkge1xuICAgIGlmIChwW2ldID09ICcuJykge1xuICAgICAgcC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChwW2ldID09ICcuLicpIHtcbiAgICAgIGlmIChpIDwgMiAmJiAhcmVsYXRpdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRQYXRoRXhjZXB0aW9uKG9yaWdpbmFsKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA+PSAyICYmIHBbaSAtIDFdICE9ICcuLicpIHtcbiAgICAgICAgcC5zcGxpY2UoaSAtIDEsIDIpO1xuICAgICAgICBpLS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwW2ldID09ICcnKSB7XG4gICAgICBwLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwLmxlbmd0aCA9PSAxKSB7XG4gICAgcmV0dXJuIHBbMF0gPT0gJycgPyBOb3JtYWxpemVkU2VwIDogJycgYXMgUGF0aDtcbiAgfSBlbHNlIHtcbiAgICBpZiAocFswXSA9PSAnLicpIHtcbiAgICAgIHAuc2hpZnQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcC5qb2luKE5vcm1hbGl6ZWRTZXApIGFzIFBhdGg7XG4gIH1cbn1cblxuXG5leHBvcnQgY29uc3QgcGF0aDogVGVtcGxhdGVUYWc8UGF0aD4gPSAoc3RyaW5ncywgLi4udmFsdWVzKSA9PiB7XG4gIHJldHVybiBub3JtYWxpemUoU3RyaW5nLnJhdyhzdHJpbmdzLCAuLi52YWx1ZXMpKTtcbn07XG5cblxuLy8gUGxhdGZvcm0tc3BlY2lmaWMgcGF0aHMuXG5leHBvcnQgdHlwZSBXaW5kb3dzUGF0aCA9IHN0cmluZyAmIHtcbiAgX19QUklWQVRFX0RFVktJVF9XSU5ET1dTX1BBVEg6IHZvaWQ7XG59O1xuZXhwb3J0IHR5cGUgUG9zaXhQYXRoID0gc3RyaW5nICYge1xuICBfX1BSSVZBVEVfREVWS0lUX1BPU0lYX1BBVEg6IHZvaWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYXNXaW5kb3dzUGF0aChwYXRoOiBQYXRoKTogV2luZG93c1BhdGgge1xuICBjb25zdCBkcml2ZSA9IHBhdGgubWF0Y2goL15cXC8oXFx3KVxcLyguKikkLyk7XG4gIGlmIChkcml2ZSkge1xuICAgIHJldHVybiBgJHtkcml2ZVsxXX06XFxcXCR7ZHJpdmVbMl0ucmVwbGFjZSgvXFwvL2csICdcXFxcJyl9YCBhcyBXaW5kb3dzUGF0aDtcbiAgfVxuXG4gIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLy9nLCAnXFxcXCcpIGFzIFdpbmRvd3NQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNQb3NpeFBhdGgocGF0aDogUGF0aCk6IFBvc2l4UGF0aCB7XG4gIHJldHVybiBwYXRoIGFzIHN0cmluZyBhcyBQb3NpeFBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTeXN0ZW1QYXRoKHBhdGg6IFBhdGgpOiBzdHJpbmcge1xuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybS5zdGFydHNXaXRoKCd3aW4zMicpKSB7XG4gICAgcmV0dXJuIGFzV2luZG93c1BhdGgocGF0aCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFzUG9zaXhQYXRoKHBhdGgpO1xuICB9XG59XG4iXX0=