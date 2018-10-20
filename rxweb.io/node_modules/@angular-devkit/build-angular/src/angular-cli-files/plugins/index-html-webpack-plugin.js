"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const crypto_1 = require("crypto");
const webpack_sources_1 = require("webpack-sources");
const parse5 = require('parse5');
function readFile(filename, compilation) {
    return new Promise((resolve, reject) => {
        compilation.inputFileSystem.readFile(filename, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            let content;
            if (data.length >= 3 && data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) {
                // Strip UTF-8 BOM
                content = data.toString('utf8', 3);
            }
            else if (data.length >= 2 && data[0] === 0xFF && data[1] === 0xFE) {
                // Strip UTF-16 LE BOM
                content = data.toString('utf16le', 2);
            }
            else {
                content = data.toString();
            }
            resolve(content);
        });
    });
}
class IndexHtmlWebpackPlugin {
    constructor(options) {
        this._options = Object.assign({ input: 'index.html', output: 'index.html', entrypoints: ['polyfills', 'main'], sri: false }, options);
    }
    apply(compiler) {
        compiler.hooks.emit.tapPromise('index-html-webpack-plugin', (compilation) => __awaiter(this, void 0, void 0, function* () {
            // Get input html file
            const inputContent = yield readFile(this._options.input, compilation);
            compilation
                .fileDependencies.add(this._options.input);
            // Get all files for selected entrypoints
            let unfilteredSortedFiles = [];
            for (const entryName of this._options.entrypoints) {
                const entrypoint = compilation.entrypoints.get(entryName);
                if (entrypoint && entrypoint.getFiles) {
                    unfilteredSortedFiles = unfilteredSortedFiles.concat(entrypoint.getFiles() || []);
                }
            }
            // Filter files
            const existingFiles = new Set();
            const stylesheets = [];
            const scripts = [];
            for (const file of unfilteredSortedFiles) {
                if (existingFiles.has(file)) {
                    continue;
                }
                existingFiles.add(file);
                if (file.endsWith('.js')) {
                    scripts.push(file);
                }
                else if (file.endsWith('.css')) {
                    stylesheets.push(file);
                }
            }
            // Find the head and body elements
            const treeAdapter = parse5.treeAdapters.default;
            const document = parse5.parse(inputContent, { treeAdapter, locationInfo: true });
            let headElement;
            let bodyElement;
            for (const docChild of document.childNodes) {
                if (docChild.tagName === 'html') {
                    for (const htmlChild of docChild.childNodes) {
                        if (htmlChild.tagName === 'head') {
                            headElement = htmlChild;
                        }
                        if (htmlChild.tagName === 'body') {
                            bodyElement = htmlChild;
                        }
                    }
                }
            }
            if (!headElement || !bodyElement) {
                throw new Error('Missing head and/or body elements');
            }
            // Determine script insertion point
            let scriptInsertionPoint;
            if (bodyElement.__location && bodyElement.__location.endTag) {
                scriptInsertionPoint = bodyElement.__location.endTag.startOffset;
            }
            else {
                // Less accurate fallback
                // parse5 4.x does not provide locations if malformed html is present
                scriptInsertionPoint = inputContent.indexOf('</body>');
            }
            let styleInsertionPoint;
            if (headElement.__location && headElement.__location.endTag) {
                styleInsertionPoint = headElement.__location.endTag.startOffset;
            }
            else {
                // Less accurate fallback
                // parse5 4.x does not provide locations if malformed html is present
                styleInsertionPoint = inputContent.indexOf('</head>');
            }
            // Inject into the html
            const indexSource = new webpack_sources_1.ReplaceSource(new webpack_sources_1.RawSource(inputContent), this._options.input);
            const scriptElements = treeAdapter.createDocumentFragment();
            for (const script of scripts) {
                const attrs = [
                    { name: 'type', value: 'text/javascript' },
                    { name: 'src', value: (this._options.deployUrl || '') + script },
                ];
                if (this._options.sri) {
                    const content = compilation.assets[script].source();
                    attrs.push(...this._generateSriAttributes(content));
                }
                const element = treeAdapter.createElement('script', undefined, attrs);
                treeAdapter.appendChild(scriptElements, element);
            }
            indexSource.insert(scriptInsertionPoint, parse5.serialize(scriptElements, { treeAdapter }));
            // Adjust base href if specified
            if (typeof this._options.baseHref == 'string') {
                let baseElement;
                for (const headChild of headElement.childNodes) {
                    if (headChild.tagName === 'base') {
                        baseElement = headChild;
                    }
                }
                const baseFragment = treeAdapter.createDocumentFragment();
                if (!baseElement) {
                    baseElement = treeAdapter.createElement('base', undefined, [
                        { name: 'href', value: this._options.baseHref },
                    ]);
                    treeAdapter.appendChild(baseFragment, baseElement);
                    indexSource.insert(headElement.__location.startTag.endOffset + 1, parse5.serialize(baseFragment, { treeAdapter }));
                }
                else {
                    let hrefAttribute;
                    for (const attribute of baseElement.attrs) {
                        if (attribute.name === 'href') {
                            hrefAttribute = attribute;
                        }
                    }
                    if (hrefAttribute) {
                        hrefAttribute.value = this._options.baseHref;
                    }
                    else {
                        baseElement.attrs.push({ name: 'href', value: this._options.baseHref });
                    }
                    treeAdapter.appendChild(baseFragment, baseElement);
                    indexSource.replace(baseElement.__location.startOffset, baseElement.__location.endOffset, parse5.serialize(baseFragment, { treeAdapter }));
                }
            }
            const styleElements = treeAdapter.createDocumentFragment();
            for (const stylesheet of stylesheets) {
                const attrs = [
                    { name: 'rel', value: 'stylesheet' },
                    { name: 'href', value: (this._options.deployUrl || '') + stylesheet },
                ];
                if (this._options.sri) {
                    const content = compilation.assets[stylesheet].source();
                    attrs.push(...this._generateSriAttributes(content));
                }
                const element = treeAdapter.createElement('link', undefined, attrs);
                treeAdapter.appendChild(styleElements, element);
            }
            indexSource.insert(styleInsertionPoint, parse5.serialize(styleElements, { treeAdapter }));
            // Add to compilation assets
            compilation.assets[this._options.output] = indexSource;
        }));
    }
    _generateSriAttributes(content) {
        const algo = 'sha384';
        const hash = crypto_1.createHash(algo)
            .update(content, 'utf8')
            .digest('base64');
        return [
            { name: 'integrity', value: `${algo}-${hash}` },
            { name: 'crossorigin', value: 'anonymous' },
        ];
    }
}
exports.IndexHtmlWebpackPlugin = IndexHtmlWebpackPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtaHRtbC13ZWJwYWNrLXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvcGx1Z2lucy9pbmRleC1odG1sLXdlYnBhY2stcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0dBTUc7QUFDSCxtQ0FBb0M7QUFFcEMscURBQTJEO0FBRTNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVdqQyxrQkFBa0IsUUFBZ0IsRUFBRSxXQUFvQztJQUN0RSxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzdDLFdBQVcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQVUsRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUMxRSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRVosT0FBTzthQUNSO1lBRUQsSUFBSSxPQUFPLENBQUM7WUFDWixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNoRixrQkFBa0I7Z0JBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNwQztpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDbkUsc0JBQXNC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TUFBTSxJQUFJLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLENBQUM7YUFDMUIsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7YUFDdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBCLE9BQU87WUFDTCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFO1lBQy9DLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO1NBQzVDLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFyTUQsd0RBcU1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBDb21waWxlciwgY29tcGlsYXRpb24gfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IFJhd1NvdXJjZSwgUmVwbGFjZVNvdXJjZSB9IGZyb20gJ3dlYnBhY2stc291cmNlcyc7XG5cbmNvbnN0IHBhcnNlNSA9IHJlcXVpcmUoJ3BhcnNlNScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4SHRtbFdlYnBhY2tQbHVnaW5PcHRpb25zIHtcbiAgaW5wdXQ6IHN0cmluZztcbiAgb3V0cHV0OiBzdHJpbmc7XG4gIGJhc2VIcmVmPzogc3RyaW5nO1xuICBlbnRyeXBvaW50czogc3RyaW5nW107XG4gIGRlcGxveVVybD86IHN0cmluZztcbiAgc3JpOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiByZWFkRmlsZShmaWxlbmFtZTogc3RyaW5nLCBjb21waWxhdGlvbjogY29tcGlsYXRpb24uQ29tcGlsYXRpb24pOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29tcGlsYXRpb24uaW5wdXRGaWxlU3lzdGVtLnJlYWRGaWxlKGZpbGVuYW1lLCAoZXJyOiBFcnJvciwgZGF0YTogQnVmZmVyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IGNvbnRlbnQ7XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPj0gMyAmJiBkYXRhWzBdID09PSAweEVGICYmIGRhdGFbMV0gPT09IDB4QkIgJiYgZGF0YVsyXSA9PT0gMHhCRikge1xuICAgICAgICAvLyBTdHJpcCBVVEYtOCBCT01cbiAgICAgICAgY29udGVudCA9IGRhdGEudG9TdHJpbmcoJ3V0ZjgnLCAzKTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPj0gMiAmJiBkYXRhWzBdID09PSAweEZGICYmIGRhdGFbMV0gPT09IDB4RkUpIHtcbiAgICAgICAgLy8gU3RyaXAgVVRGLTE2IExFIEJPTVxuICAgICAgICBjb250ZW50ID0gZGF0YS50b1N0cmluZygndXRmMTZsZScsIDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShjb250ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBjbGFzcyBJbmRleEh0bWxXZWJwYWNrUGx1Z2luIHtcbiAgcHJpdmF0ZSBfb3B0aW9uczogSW5kZXhIdG1sV2VicGFja1BsdWdpbk9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IFBhcnRpYWw8SW5kZXhIdG1sV2VicGFja1BsdWdpbk9wdGlvbnM+KSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgIGlucHV0OiAnaW5kZXguaHRtbCcsXG4gICAgICBvdXRwdXQ6ICdpbmRleC5odG1sJyxcbiAgICAgIGVudHJ5cG9pbnRzOiBbJ3BvbHlmaWxscycsICdtYWluJ10sXG4gICAgICBzcmk6IGZhbHNlLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuICB9XG5cbiAgYXBwbHkoY29tcGlsZXI6IENvbXBpbGVyKSB7XG4gICAgY29tcGlsZXIuaG9va3MuZW1pdC50YXBQcm9taXNlKCdpbmRleC1odG1sLXdlYnBhY2stcGx1Z2luJywgYXN5bmMgY29tcGlsYXRpb24gPT4ge1xuICAgICAgLy8gR2V0IGlucHV0IGh0bWwgZmlsZVxuICAgICAgY29uc3QgaW5wdXRDb250ZW50ID0gYXdhaXQgcmVhZEZpbGUodGhpcy5fb3B0aW9ucy5pbnB1dCwgY29tcGlsYXRpb24pO1xuICAgICAgKGNvbXBpbGF0aW9uIGFzIGNvbXBpbGF0aW9uLkNvbXBpbGF0aW9uICYgeyBmaWxlRGVwZW5kZW5jaWVzOiBTZXQ8c3RyaW5nPiB9KVxuICAgICAgICAuZmlsZURlcGVuZGVuY2llcy5hZGQodGhpcy5fb3B0aW9ucy5pbnB1dCk7XG5cblxuICAgICAgLy8gR2V0IGFsbCBmaWxlcyBmb3Igc2VsZWN0ZWQgZW50cnlwb2ludHNcbiAgICAgIGxldCB1bmZpbHRlcmVkU29ydGVkRmlsZXM6IHN0cmluZ1tdID0gW107XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5TmFtZSBvZiB0aGlzLl9vcHRpb25zLmVudHJ5cG9pbnRzKSB7XG4gICAgICAgIGNvbnN0IGVudHJ5cG9pbnQgPSBjb21waWxhdGlvbi5lbnRyeXBvaW50cy5nZXQoZW50cnlOYW1lKTtcbiAgICAgICAgaWYgKGVudHJ5cG9pbnQgJiYgZW50cnlwb2ludC5nZXRGaWxlcykge1xuICAgICAgICAgIHVuZmlsdGVyZWRTb3J0ZWRGaWxlcyA9IHVuZmlsdGVyZWRTb3J0ZWRGaWxlcy5jb25jYXQoZW50cnlwb2ludC5nZXRGaWxlcygpIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBGaWx0ZXIgZmlsZXNcbiAgICAgIGNvbnN0IGV4aXN0aW5nRmlsZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGNvbnN0IHN0eWxlc2hlZXRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgY29uc3Qgc2NyaXB0czogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB1bmZpbHRlcmVkU29ydGVkRmlsZXMpIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nRmlsZXMuaGFzKGZpbGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZXhpc3RpbmdGaWxlcy5hZGQoZmlsZSk7XG5cbiAgICAgICAgaWYgKGZpbGUuZW5kc1dpdGgoJy5qcycpKSB7XG4gICAgICAgICAgc2NyaXB0cy5wdXNoKGZpbGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGZpbGUuZW5kc1dpdGgoJy5jc3MnKSkge1xuICAgICAgICAgIHN0eWxlc2hlZXRzLnB1c2goZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIHRoZSBoZWFkIGFuZCBib2R5IGVsZW1lbnRzXG4gICAgICBjb25zdCB0cmVlQWRhcHRlciA9IHBhcnNlNS50cmVlQWRhcHRlcnMuZGVmYXVsdDtcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gcGFyc2U1LnBhcnNlKGlucHV0Q29udGVudCwgeyB0cmVlQWRhcHRlciwgbG9jYXRpb25JbmZvOiB0cnVlIH0pO1xuICAgICAgbGV0IGhlYWRFbGVtZW50O1xuICAgICAgbGV0IGJvZHlFbGVtZW50O1xuICAgICAgZm9yIChjb25zdCBkb2NDaGlsZCBvZiBkb2N1bWVudC5jaGlsZE5vZGVzKSB7XG4gICAgICAgIGlmIChkb2NDaGlsZC50YWdOYW1lID09PSAnaHRtbCcpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGh0bWxDaGlsZCBvZiBkb2NDaGlsZC5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICBpZiAoaHRtbENoaWxkLnRhZ05hbWUgPT09ICdoZWFkJykge1xuICAgICAgICAgICAgICBoZWFkRWxlbWVudCA9IGh0bWxDaGlsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChodG1sQ2hpbGQudGFnTmFtZSA9PT0gJ2JvZHknKSB7XG4gICAgICAgICAgICAgIGJvZHlFbGVtZW50ID0gaHRtbENoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWhlYWRFbGVtZW50IHx8ICFib2R5RWxlbWVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaGVhZCBhbmQvb3IgYm9keSBlbGVtZW50cycpO1xuICAgICAgfVxuXG4gICAgICAvLyBEZXRlcm1pbmUgc2NyaXB0IGluc2VydGlvbiBwb2ludFxuICAgICAgbGV0IHNjcmlwdEluc2VydGlvblBvaW50O1xuICAgICAgaWYgKGJvZHlFbGVtZW50Ll9fbG9jYXRpb24gJiYgYm9keUVsZW1lbnQuX19sb2NhdGlvbi5lbmRUYWcpIHtcbiAgICAgICAgc2NyaXB0SW5zZXJ0aW9uUG9pbnQgPSBib2R5RWxlbWVudC5fX2xvY2F0aW9uLmVuZFRhZy5zdGFydE9mZnNldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIExlc3MgYWNjdXJhdGUgZmFsbGJhY2tcbiAgICAgICAgLy8gcGFyc2U1IDQueCBkb2VzIG5vdCBwcm92aWRlIGxvY2F0aW9ucyBpZiBtYWxmb3JtZWQgaHRtbCBpcyBwcmVzZW50XG4gICAgICAgIHNjcmlwdEluc2VydGlvblBvaW50ID0gaW5wdXRDb250ZW50LmluZGV4T2YoJzwvYm9keT4nKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHN0eWxlSW5zZXJ0aW9uUG9pbnQ7XG4gICAgICBpZiAoaGVhZEVsZW1lbnQuX19sb2NhdGlvbiAmJiBoZWFkRWxlbWVudC5fX2xvY2F0aW9uLmVuZFRhZykge1xuICAgICAgICBzdHlsZUluc2VydGlvblBvaW50ID0gaGVhZEVsZW1lbnQuX19sb2NhdGlvbi5lbmRUYWcuc3RhcnRPZmZzZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMZXNzIGFjY3VyYXRlIGZhbGxiYWNrXG4gICAgICAgIC8vIHBhcnNlNSA0LnggZG9lcyBub3QgcHJvdmlkZSBsb2NhdGlvbnMgaWYgbWFsZm9ybWVkIGh0bWwgaXMgcHJlc2VudFxuICAgICAgICBzdHlsZUluc2VydGlvblBvaW50ID0gaW5wdXRDb250ZW50LmluZGV4T2YoJzwvaGVhZD4nKTtcbiAgICAgIH1cblxuICAgICAgLy8gSW5qZWN0IGludG8gdGhlIGh0bWxcbiAgICAgIGNvbnN0IGluZGV4U291cmNlID0gbmV3IFJlcGxhY2VTb3VyY2UobmV3IFJhd1NvdXJjZShpbnB1dENvbnRlbnQpLCB0aGlzLl9vcHRpb25zLmlucHV0KTtcblxuICAgICAgY29uc3Qgc2NyaXB0RWxlbWVudHMgPSB0cmVlQWRhcHRlci5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBmb3IgKGNvbnN0IHNjcmlwdCBvZiBzY3JpcHRzKSB7XG4gICAgICAgIGNvbnN0IGF0dHJzID0gW1xuICAgICAgICAgIHsgbmFtZTogJ3R5cGUnLCB2YWx1ZTogJ3RleHQvamF2YXNjcmlwdCcgfSxcbiAgICAgICAgICB7IG5hbWU6ICdzcmMnLCB2YWx1ZTogKHRoaXMuX29wdGlvbnMuZGVwbG95VXJsIHx8ICcnKSArIHNjcmlwdCB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNyaSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb21waWxhdGlvbi5hc3NldHNbc2NyaXB0XS5zb3VyY2UoKTtcbiAgICAgICAgICBhdHRycy5wdXNoKC4uLnRoaXMuX2dlbmVyYXRlU3JpQXR0cmlidXRlcyhjb250ZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdHJlZUFkYXB0ZXIuY3JlYXRlRWxlbWVudCgnc2NyaXB0JywgdW5kZWZpbmVkLCBhdHRycyk7XG4gICAgICAgIHRyZWVBZGFwdGVyLmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnRzLCBlbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgaW5kZXhTb3VyY2UuaW5zZXJ0KFxuICAgICAgICBzY3JpcHRJbnNlcnRpb25Qb2ludCxcbiAgICAgICAgcGFyc2U1LnNlcmlhbGl6ZShzY3JpcHRFbGVtZW50cywgeyB0cmVlQWRhcHRlciB9KSxcbiAgICAgICk7XG5cbiAgICAgIC8vIEFkanVzdCBiYXNlIGhyZWYgaWYgc3BlY2lmaWVkXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMuYmFzZUhyZWYgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGV0IGJhc2VFbGVtZW50O1xuICAgICAgICBmb3IgKGNvbnN0IGhlYWRDaGlsZCBvZiBoZWFkRWxlbWVudC5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgaWYgKGhlYWRDaGlsZC50YWdOYW1lID09PSAnYmFzZScpIHtcbiAgICAgICAgICAgIGJhc2VFbGVtZW50ID0gaGVhZENoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJhc2VGcmFnbWVudCA9IHRyZWVBZGFwdGVyLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICBpZiAoIWJhc2VFbGVtZW50KSB7XG4gICAgICAgICAgYmFzZUVsZW1lbnQgPSB0cmVlQWRhcHRlci5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2Jhc2UnLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICB7IG5hbWU6ICdocmVmJywgdmFsdWU6IHRoaXMuX29wdGlvbnMuYmFzZUhyZWYgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRyZWVBZGFwdGVyLmFwcGVuZENoaWxkKGJhc2VGcmFnbWVudCwgYmFzZUVsZW1lbnQpO1xuICAgICAgICAgIGluZGV4U291cmNlLmluc2VydChcbiAgICAgICAgICAgIGhlYWRFbGVtZW50Ll9fbG9jYXRpb24uc3RhcnRUYWcuZW5kT2Zmc2V0ICsgMSxcbiAgICAgICAgICAgIHBhcnNlNS5zZXJpYWxpemUoYmFzZUZyYWdtZW50LCB7IHRyZWVBZGFwdGVyIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGhyZWZBdHRyaWJ1dGU7XG4gICAgICAgICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYmFzZUVsZW1lbnQuYXR0cnMpIHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUubmFtZSA9PT0gJ2hyZWYnKSB7XG4gICAgICAgICAgICAgIGhyZWZBdHRyaWJ1dGUgPSBhdHRyaWJ1dGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChocmVmQXR0cmlidXRlKSB7XG4gICAgICAgICAgICBocmVmQXR0cmlidXRlLnZhbHVlID0gdGhpcy5fb3B0aW9ucy5iYXNlSHJlZjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmFzZUVsZW1lbnQuYXR0cnMucHVzaCh7IG5hbWU6ICdocmVmJywgdmFsdWU6IHRoaXMuX29wdGlvbnMuYmFzZUhyZWYgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJlZUFkYXB0ZXIuYXBwZW5kQ2hpbGQoYmFzZUZyYWdtZW50LCBiYXNlRWxlbWVudCk7XG4gICAgICAgICAgaW5kZXhTb3VyY2UucmVwbGFjZShcbiAgICAgICAgICAgIGJhc2VFbGVtZW50Ll9fbG9jYXRpb24uc3RhcnRPZmZzZXQsXG4gICAgICAgICAgICBiYXNlRWxlbWVudC5fX2xvY2F0aW9uLmVuZE9mZnNldCxcbiAgICAgICAgICAgIHBhcnNlNS5zZXJpYWxpemUoYmFzZUZyYWdtZW50LCB7IHRyZWVBZGFwdGVyIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3R5bGVFbGVtZW50cyA9IHRyZWVBZGFwdGVyLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIGZvciAoY29uc3Qgc3R5bGVzaGVldCBvZiBzdHlsZXNoZWV0cykge1xuICAgICAgICBjb25zdCBhdHRycyA9IFtcbiAgICAgICAgICB7IG5hbWU6ICdyZWwnLCB2YWx1ZTogJ3N0eWxlc2hlZXQnIH0sXG4gICAgICAgICAgeyBuYW1lOiAnaHJlZicsIHZhbHVlOiAodGhpcy5fb3B0aW9ucy5kZXBsb3lVcmwgfHwgJycpICsgc3R5bGVzaGVldCB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNyaSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb21waWxhdGlvbi5hc3NldHNbc3R5bGVzaGVldF0uc291cmNlKCk7XG4gICAgICAgICAgYXR0cnMucHVzaCguLi50aGlzLl9nZW5lcmF0ZVNyaUF0dHJpYnV0ZXMoY29udGVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRyZWVBZGFwdGVyLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnLCB1bmRlZmluZWQsIGF0dHJzKTtcbiAgICAgICAgdHJlZUFkYXB0ZXIuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50cywgZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGluZGV4U291cmNlLmluc2VydChcbiAgICAgICAgc3R5bGVJbnNlcnRpb25Qb2ludCxcbiAgICAgICAgcGFyc2U1LnNlcmlhbGl6ZShzdHlsZUVsZW1lbnRzLCB7IHRyZWVBZGFwdGVyIH0pLFxuICAgICAgKTtcblxuICAgICAgLy8gQWRkIHRvIGNvbXBpbGF0aW9uIGFzc2V0c1xuICAgICAgY29tcGlsYXRpb24uYXNzZXRzW3RoaXMuX29wdGlvbnMub3V0cHV0XSA9IGluZGV4U291cmNlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVTcmlBdHRyaWJ1dGVzKGNvbnRlbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IGFsZ28gPSAnc2hhMzg0JztcbiAgICBjb25zdCBoYXNoID0gY3JlYXRlSGFzaChhbGdvKVxuICAgICAgLnVwZGF0ZShjb250ZW50LCAndXRmOCcpXG4gICAgICAuZGlnZXN0KCdiYXNlNjQnKTtcblxuICAgIHJldHVybiBbXG4gICAgICB7IG5hbWU6ICdpbnRlZ3JpdHknLCB2YWx1ZTogYCR7YWxnb30tJHtoYXNofWAgfSxcbiAgICAgIHsgbmFtZTogJ2Nyb3Nzb3JpZ2luJywgdmFsdWU6ICdhbm9ueW1vdXMnIH0sXG4gICAgXTtcbiAgfVxufVxuIl19