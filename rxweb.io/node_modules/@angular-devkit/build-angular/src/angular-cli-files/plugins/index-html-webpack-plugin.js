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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtaHRtbC13ZWJwYWNrLXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvcGx1Z2lucy9pbmRleC1odG1sLXdlYnBhY2stcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0dBTUc7QUFDSCxtQ0FBb0M7QUFFcEMscURBQTJEO0FBRTNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVdqQyxrQkFBa0IsUUFBZ0IsRUFBRSxXQUFvQztJQUN0RSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDN0MsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBVSxFQUFFLElBQVksRUFBRSxFQUFFO1lBQzFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVaLE1BQU0sQ0FBQztZQUNULENBQUM7WUFFRCxJQUFJLE9BQU8sQ0FBQztZQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakYsa0JBQWtCO2dCQUNsQixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJ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QUM7YUFDdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sQ0FBQztZQUNMLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDL0MsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7U0FDNUMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXJNRCx3REFxTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IENvbXBpbGVyLCBjb21waWxhdGlvbiB9IGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IHsgUmF3U291cmNlLCBSZXBsYWNlU291cmNlIH0gZnJvbSAnd2VicGFjay1zb3VyY2VzJztcblxuY29uc3QgcGFyc2U1ID0gcmVxdWlyZSgncGFyc2U1Jyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5kZXhIdG1sV2VicGFja1BsdWdpbk9wdGlvbnMge1xuICBpbnB1dDogc3RyaW5nO1xuICBvdXRwdXQ6IHN0cmluZztcbiAgYmFzZUhyZWY/OiBzdHJpbmc7XG4gIGVudHJ5cG9pbnRzOiBzdHJpbmdbXTtcbiAgZGVwbG95VXJsPzogc3RyaW5nO1xuICBzcmk6IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIHJlYWRGaWxlKGZpbGVuYW1lOiBzdHJpbmcsIGNvbXBpbGF0aW9uOiBjb21waWxhdGlvbi5Db21waWxhdGlvbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb21waWxhdGlvbi5pbnB1dEZpbGVTeXN0ZW0ucmVhZEZpbGUoZmlsZW5hbWUsIChlcnI6IEVycm9yLCBkYXRhOiBCdWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgY29udGVudDtcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA+PSAzICYmIGRhdGFbMF0gPT09IDB4RUYgJiYgZGF0YVsxXSA9PT0gMHhCQiAmJiBkYXRhWzJdID09PSAweEJGKSB7XG4gICAgICAgIC8vIFN0cmlwIFVURi04IEJPTVxuICAgICAgICBjb250ZW50ID0gZGF0YS50b1N0cmluZygndXRmOCcsIDMpO1xuICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+PSAyICYmIGRhdGFbMF0gPT09IDB4RkYgJiYgZGF0YVsxXSA9PT0gMHhGRSkge1xuICAgICAgICAvLyBTdHJpcCBVVEYtMTYgTEUgQk9NXG4gICAgICAgIGNvbnRlbnQgPSBkYXRhLnRvU3RyaW5nKCd1dGYxNmxlJywgMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKGNvbnRlbnQpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGNsYXNzIEluZGV4SHRtbFdlYnBhY2tQbHVnaW4ge1xuICBwcml2YXRlIF9vcHRpb25zOiBJbmRleEh0bWxXZWJwYWNrUGx1Z2luT3B0aW9ucztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogUGFydGlhbDxJbmRleEh0bWxXZWJwYWNrUGx1Z2luT3B0aW9ucz4pIHtcbiAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgaW5wdXQ6ICdpbmRleC5odG1sJyxcbiAgICAgIG91dHB1dDogJ2luZGV4Lmh0bWwnLFxuICAgICAgZW50cnlwb2ludHM6IFsncG9seWZpbGxzJywgJ21haW4nXSxcbiAgICAgIHNyaTogZmFsc2UsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gIH1cblxuICBhcHBseShjb21waWxlcjogQ29tcGlsZXIpIHtcbiAgICBjb21waWxlci5ob29rcy5lbWl0LnRhcFByb21pc2UoJ2luZGV4LWh0bWwtd2VicGFjay1wbHVnaW4nLCBhc3luYyBjb21waWxhdGlvbiA9PiB7XG4gICAgICAvLyBHZXQgaW5wdXQgaHRtbCBmaWxlXG4gICAgICBjb25zdCBpbnB1dENvbnRlbnQgPSBhd2FpdCByZWFkRmlsZSh0aGlzLl9vcHRpb25zLmlucHV0LCBjb21waWxhdGlvbik7XG4gICAgICAoY29tcGlsYXRpb24gYXMgY29tcGlsYXRpb24uQ29tcGlsYXRpb24gJiB7IGZpbGVEZXBlbmRlbmNpZXM6IFNldDxzdHJpbmc+IH0pXG4gICAgICAgIC5maWxlRGVwZW5kZW5jaWVzLmFkZCh0aGlzLl9vcHRpb25zLmlucHV0KTtcblxuXG4gICAgICAvLyBHZXQgYWxsIGZpbGVzIGZvciBzZWxlY3RlZCBlbnRyeXBvaW50c1xuICAgICAgbGV0IHVuZmlsdGVyZWRTb3J0ZWRGaWxlczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZW50cnlOYW1lIG9mIHRoaXMuX29wdGlvbnMuZW50cnlwb2ludHMpIHtcbiAgICAgICAgY29uc3QgZW50cnlwb2ludCA9IGNvbXBpbGF0aW9uLmVudHJ5cG9pbnRzLmdldChlbnRyeU5hbWUpO1xuICAgICAgICBpZiAoZW50cnlwb2ludCAmJiBlbnRyeXBvaW50LmdldEZpbGVzKSB7XG4gICAgICAgICAgdW5maWx0ZXJlZFNvcnRlZEZpbGVzID0gdW5maWx0ZXJlZFNvcnRlZEZpbGVzLmNvbmNhdChlbnRyeXBvaW50LmdldEZpbGVzKCkgfHwgW10pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbHRlciBmaWxlc1xuICAgICAgY29uc3QgZXhpc3RpbmdGaWxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgY29uc3Qgc3R5bGVzaGVldHM6IHN0cmluZ1tdID0gW107XG4gICAgICBjb25zdCBzY3JpcHRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHVuZmlsdGVyZWRTb3J0ZWRGaWxlcykge1xuICAgICAgICBpZiAoZXhpc3RpbmdGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBleGlzdGluZ0ZpbGVzLmFkZChmaWxlKTtcblxuICAgICAgICBpZiAoZmlsZS5lbmRzV2l0aCgnLmpzJykpIHtcbiAgICAgICAgICBzY3JpcHRzLnB1c2goZmlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmlsZS5lbmRzV2l0aCgnLmNzcycpKSB7XG4gICAgICAgICAgc3R5bGVzaGVldHMucHVzaChmaWxlKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIC8vIEZpbmQgdGhlIGhlYWQgYW5kIGJvZHkgZWxlbWVudHNcbiAgICAgIGNvbnN0IHRyZWVBZGFwdGVyID0gcGFyc2U1LnRyZWVBZGFwdGVycy5kZWZhdWx0O1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBwYXJzZTUucGFyc2UoaW5wdXRDb250ZW50LCB7IHRyZWVBZGFwdGVyLCBsb2NhdGlvbkluZm86IHRydWUgfSk7XG4gICAgICBsZXQgaGVhZEVsZW1lbnQ7XG4gICAgICBsZXQgYm9keUVsZW1lbnQ7XG4gICAgICBmb3IgKGNvbnN0IGRvY0NoaWxkIG9mIGRvY3VtZW50LmNoaWxkTm9kZXMpIHtcbiAgICAgICAgaWYgKGRvY0NoaWxkLnRhZ05hbWUgPT09ICdodG1sJykge1xuICAgICAgICAgIGZvciAoY29uc3QgaHRtbENoaWxkIG9mIGRvY0NoaWxkLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChodG1sQ2hpbGQudGFnTmFtZSA9PT0gJ2hlYWQnKSB7XG4gICAgICAgICAgICAgIGhlYWRFbGVtZW50ID0gaHRtbENoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGh0bWxDaGlsZC50YWdOYW1lID09PSAnYm9keScpIHtcbiAgICAgICAgICAgICAgYm9keUVsZW1lbnQgPSBodG1sQ2hpbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghaGVhZEVsZW1lbnQgfHwgIWJvZHlFbGVtZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBoZWFkIGFuZC9vciBib2R5IGVsZW1lbnRzJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIERldGVybWluZSBzY3JpcHQgaW5zZXJ0aW9uIHBvaW50XG4gICAgICBsZXQgc2NyaXB0SW5zZXJ0aW9uUG9pbnQ7XG4gICAgICBpZiAoYm9keUVsZW1lbnQuX19sb2NhdGlvbiAmJiBib2R5RWxlbWVudC5fX2xvY2F0aW9uLmVuZFRhZykge1xuICAgICAgICBzY3JpcHRJbnNlcnRpb25Qb2ludCA9IGJvZHlFbGVtZW50Ll9fbG9jYXRpb24uZW5kVGFnLnN0YXJ0T2Zmc2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTGVzcyBhY2N1cmF0ZSBmYWxsYmFja1xuICAgICAgICAvLyBwYXJzZTUgNC54IGRvZXMgbm90IHByb3ZpZGUgbG9jYXRpb25zIGlmIG1hbGZvcm1lZCBodG1sIGlzIHByZXNlbnRcbiAgICAgICAgc2NyaXB0SW5zZXJ0aW9uUG9pbnQgPSBpbnB1dENvbnRlbnQuaW5kZXhPZignPC9ib2R5PicpO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3R5bGVJbnNlcnRpb25Qb2ludDtcbiAgICAgIGlmIChoZWFkRWxlbWVudC5fX2xvY2F0aW9uICYmIGhlYWRFbGVtZW50Ll9fbG9jYXRpb24uZW5kVGFnKSB7XG4gICAgICAgIHN0eWxlSW5zZXJ0aW9uUG9pbnQgPSBoZWFkRWxlbWVudC5fX2xvY2F0aW9uLmVuZFRhZy5zdGFydE9mZnNldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIExlc3MgYWNjdXJhdGUgZmFsbGJhY2tcbiAgICAgICAgLy8gcGFyc2U1IDQueCBkb2VzIG5vdCBwcm92aWRlIGxvY2F0aW9ucyBpZiBtYWxmb3JtZWQgaHRtbCBpcyBwcmVzZW50XG4gICAgICAgIHN0eWxlSW5zZXJ0aW9uUG9pbnQgPSBpbnB1dENvbnRlbnQuaW5kZXhPZignPC9oZWFkPicpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbmplY3QgaW50byB0aGUgaHRtbFxuICAgICAgY29uc3QgaW5kZXhTb3VyY2UgPSBuZXcgUmVwbGFjZVNvdXJjZShuZXcgUmF3U291cmNlKGlucHV0Q29udGVudCksIHRoaXMuX29wdGlvbnMuaW5wdXQpO1xuXG4gICAgICBjb25zdCBzY3JpcHRFbGVtZW50cyA9IHRyZWVBZGFwdGVyLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIGZvciAoY29uc3Qgc2NyaXB0IG9mIHNjcmlwdHMpIHtcbiAgICAgICAgY29uc3QgYXR0cnMgPSBbXG4gICAgICAgICAgeyBuYW1lOiAndHlwZScsIHZhbHVlOiAndGV4dC9qYXZhc2NyaXB0JyB9LFxuICAgICAgICAgIHsgbmFtZTogJ3NyYycsIHZhbHVlOiAodGhpcy5fb3B0aW9ucy5kZXBsb3lVcmwgfHwgJycpICsgc2NyaXB0IH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc3JpKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGNvbXBpbGF0aW9uLmFzc2V0c1tzY3JpcHRdLnNvdXJjZSgpO1xuICAgICAgICAgIGF0dHJzLnB1c2goLi4udGhpcy5fZ2VuZXJhdGVTcmlBdHRyaWJ1dGVzKGNvbnRlbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0cmVlQWRhcHRlci5jcmVhdGVFbGVtZW50KCdzY3JpcHQnLCB1bmRlZmluZWQsIGF0dHJzKTtcbiAgICAgICAgdHJlZUFkYXB0ZXIuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudHMsIGVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBpbmRleFNvdXJjZS5pbnNlcnQoXG4gICAgICAgIHNjcmlwdEluc2VydGlvblBvaW50LFxuICAgICAgICBwYXJzZTUuc2VyaWFsaXplKHNjcmlwdEVsZW1lbnRzLCB7IHRyZWVBZGFwdGVyIH0pLFxuICAgICAgKTtcblxuICAgICAgLy8gQWRqdXN0IGJhc2UgaHJlZiBpZiBzcGVjaWZpZWRcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5iYXNlSHJlZiA9PSAnc3RyaW5nJykge1xuICAgICAgICBsZXQgYmFzZUVsZW1lbnQ7XG4gICAgICAgIGZvciAoY29uc3QgaGVhZENoaWxkIG9mIGhlYWRFbGVtZW50LmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICBpZiAoaGVhZENoaWxkLnRhZ05hbWUgPT09ICdiYXNlJykge1xuICAgICAgICAgICAgYmFzZUVsZW1lbnQgPSBoZWFkQ2hpbGQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZUZyYWdtZW50ID0gdHJlZUFkYXB0ZXIuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGlmICghYmFzZUVsZW1lbnQpIHtcbiAgICAgICAgICBiYXNlRWxlbWVudCA9IHRyZWVBZGFwdGVyLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnYmFzZScsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHsgbmFtZTogJ2hyZWYnLCB2YWx1ZTogdGhpcy5fb3B0aW9ucy5iYXNlSHJlZiB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdHJlZUFkYXB0ZXIuYXBwZW5kQ2hpbGQoYmFzZUZyYWdtZW50LCBiYXNlRWxlbWVudCk7XG4gICAgICAgICAgaW5kZXhTb3VyY2UuaW5zZXJ0KFxuICAgICAgICAgICAgaGVhZEVsZW1lbnQuX19sb2NhdGlvbi5zdGFydFRhZy5lbmRPZmZzZXQgKyAxLFxuICAgICAgICAgICAgcGFyc2U1LnNlcmlhbGl6ZShiYXNlRnJhZ21lbnQsIHsgdHJlZUFkYXB0ZXIgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgaHJlZkF0dHJpYnV0ZTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBiYXNlRWxlbWVudC5hdHRycykge1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lID09PSAnaHJlZicpIHtcbiAgICAgICAgICAgICAgaHJlZkF0dHJpYnV0ZSA9IGF0dHJpYnV0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhyZWZBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIGhyZWZBdHRyaWJ1dGUudmFsdWUgPSB0aGlzLl9vcHRpb25zLmJhc2VIcmVmO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlRWxlbWVudC5hdHRycy5wdXNoKHsgbmFtZTogJ2hyZWYnLCB2YWx1ZTogdGhpcy5fb3B0aW9ucy5iYXNlSHJlZiB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0cmVlQWRhcHRlci5hcHBlbmRDaGlsZChiYXNlRnJhZ21lbnQsIGJhc2VFbGVtZW50KTtcbiAgICAgICAgICBpbmRleFNvdXJjZS5yZXBsYWNlKFxuICAgICAgICAgICAgYmFzZUVsZW1lbnQuX19sb2NhdGlvbi5zdGFydE9mZnNldCxcbiAgICAgICAgICAgIGJhc2VFbGVtZW50Ll9fbG9jYXRpb24uZW5kT2Zmc2V0LFxuICAgICAgICAgICAgcGFyc2U1LnNlcmlhbGl6ZShiYXNlRnJhZ21lbnQsIHsgdHJlZUFkYXB0ZXIgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdHlsZUVsZW1lbnRzID0gdHJlZUFkYXB0ZXIuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgZm9yIChjb25zdCBzdHlsZXNoZWV0IG9mIHN0eWxlc2hlZXRzKSB7XG4gICAgICAgIGNvbnN0IGF0dHJzID0gW1xuICAgICAgICAgIHsgbmFtZTogJ3JlbCcsIHZhbHVlOiAnc3R5bGVzaGVldCcgfSxcbiAgICAgICAgICB7IG5hbWU6ICdocmVmJywgdmFsdWU6ICh0aGlzLl9vcHRpb25zLmRlcGxveVVybCB8fCAnJykgKyBzdHlsZXNoZWV0IH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc3JpKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGNvbXBpbGF0aW9uLmFzc2V0c1tzdHlsZXNoZWV0XS5zb3VyY2UoKTtcbiAgICAgICAgICBhdHRycy5wdXNoKC4uLnRoaXMuX2dlbmVyYXRlU3JpQXR0cmlidXRlcyhjb250ZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdHJlZUFkYXB0ZXIuY3JlYXRlRWxlbWVudCgnbGluaycsIHVuZGVmaW5lZCwgYXR0cnMpO1xuICAgICAgICB0cmVlQWRhcHRlci5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnRzLCBlbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgaW5kZXhTb3VyY2UuaW5zZXJ0KFxuICAgICAgICBzdHlsZUluc2VydGlvblBvaW50LFxuICAgICAgICBwYXJzZTUuc2VyaWFsaXplKHN0eWxlRWxlbWVudHMsIHsgdHJlZUFkYXB0ZXIgfSksXG4gICAgICApO1xuXG4gICAgICAvLyBBZGQgdG8gY29tcGlsYXRpb24gYXNzZXRzXG4gICAgICBjb21waWxhdGlvbi5hc3NldHNbdGhpcy5fb3B0aW9ucy5vdXRwdXRdID0gaW5kZXhTb3VyY2U7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZVNyaUF0dHJpYnV0ZXMoY29udGVudDogc3RyaW5nKSB7XG4gICAgY29uc3QgYWxnbyA9ICdzaGEzODQnO1xuICAgIGNvbnN0IGhhc2ggPSBjcmVhdGVIYXNoKGFsZ28pXG4gICAgICAudXBkYXRlKGNvbnRlbnQsICd1dGY4JylcbiAgICAgIC5kaWdlc3QoJ2Jhc2U2NCcpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHsgbmFtZTogJ2ludGVncml0eScsIHZhbHVlOiBgJHthbGdvfS0ke2hhc2h9YCB9LFxuICAgICAgeyBuYW1lOiAnY3Jvc3NvcmlnaW4nLCB2YWx1ZTogJ2Fub255bW91cycgfSxcbiAgICBdO1xuICB9XG59XG4iXX0=