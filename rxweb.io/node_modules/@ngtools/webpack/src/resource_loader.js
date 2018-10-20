"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO: fix typings.
// tslint:disable-next-line:no-global-tslint-disable
// tslint:disable:no-any
const path = require("path");
const vm = require("vm");
const webpack_sources_1 = require("webpack-sources");
const NodeTemplatePlugin = require('webpack/lib/node/NodeTemplatePlugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const LoaderTargetPlugin = require('webpack/lib/LoaderTargetPlugin');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
class WebpackResourceLoader {
    constructor() {
        this._fileDependencies = new Map();
        this._cachedSources = new Map();
        this._cachedEvaluatedSources = new Map();
    }
    update(parentCompilation) {
        this._parentCompilation = parentCompilation;
        this._context = parentCompilation.context;
    }
    getResourceDependencies(filePath) {
        return this._fileDependencies.get(filePath) || [];
    }
    _compile(filePath) {
        if (!this._parentCompilation) {
            throw new Error('WebpackResourceLoader cannot be used without parentCompilation');
        }
        // Simple sanity check.
        if (filePath.match(/\.[jt]s$/)) {
            return Promise.reject('Cannot use a JavaScript or TypeScript file for styleUrl.');
        }
        const outputOptions = { filename: filePath };
        const relativePath = path.relative(this._context || '', filePath);
        const childCompiler = this._parentCompilation.createChildCompiler(relativePath, outputOptions);
        childCompiler.context = this._context;
        new NodeTemplatePlugin(outputOptions).apply(childCompiler);
        new NodeTargetPlugin().apply(childCompiler);
        new SingleEntryPlugin(this._context, filePath).apply(childCompiler);
        new LoaderTargetPlugin('node').apply(childCompiler);
        childCompiler.hooks.thisCompilation.tap('ngtools-webpack', (compilation) => {
            compilation.hooks.additionalAssets.tapAsync('ngtools-webpack', (callback) => {
                if (this._cachedEvaluatedSources.has(compilation.fullHash)) {
                    const cachedEvaluatedSource = this._cachedEvaluatedSources.get(compilation.fullHash);
                    compilation.assets[filePath] = cachedEvaluatedSource;
                    callback();
                    return;
                }
                const asset = compilation.assets[filePath];
                if (asset) {
                    this._evaluate({ outputName: filePath, source: asset.source() })
                        .then(output => {
                        const evaluatedSource = new webpack_sources_1.RawSource(output);
                        this._cachedEvaluatedSources.set(compilation.fullHash, evaluatedSource);
                        compilation.assets[filePath] = evaluatedSource;
                        callback();
                    })
                        .catch(err => callback(err));
                }
                else {
                    callback();
                }
            });
        });
        // Compile and return a promise
        return new Promise((resolve, reject) => {
            childCompiler.compile((err, childCompilation) => {
                // Resolve / reject the promise
                if (childCompilation && childCompilation.errors && childCompilation.errors.length) {
                    const errorDetails = childCompilation.errors.map(function (error) {
                        return error.message + (error.error ? ':\n' + error.error : '');
                    }).join('\n');
                    reject(new Error('Child compilation failed:\n' + errorDetails));
                }
                else if (err) {
                    reject(err);
                }
                else {
                    Object.keys(childCompilation.assets).forEach(assetName => {
                        // Add all new assets to the parent compilation, with the exception of
                        // the file we're loading and its sourcemap.
                        if (assetName !== filePath
                            && assetName !== `${filePath}.map`
                            && this._parentCompilation.assets[assetName] == undefined) {
                            this._parentCompilation.assets[assetName] = childCompilation.assets[assetName];
                        }
                    });
                    // Save the dependencies for this resource.
                    this._fileDependencies.set(filePath, childCompilation.fileDependencies);
                    const compilationHash = childCompilation.fullHash;
                    const maybeSource = this._cachedSources.get(compilationHash);
                    if (maybeSource) {
                        resolve({ outputName: filePath, source: maybeSource });
                    }
                    else {
                        const source = childCompilation.assets[filePath].source();
                        this._cachedSources.set(compilationHash, source);
                        resolve({ outputName: filePath, source });
                    }
                }
            });
        });
    }
    _evaluate({ outputName, source }) {
        try {
            // Evaluate code
            const evaluatedSource = vm.runInNewContext(source, undefined, { filename: outputName });
            if (typeof evaluatedSource == 'string') {
                return Promise.resolve(evaluatedSource);
            }
            return Promise.reject('The loader "' + outputName + '" didn\'t return a string.');
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    get(filePath) {
        return this._compile(filePath)
            .then((result) => result.source);
    }
}
exports.WebpackResourceLoader = WebpackResourceLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VfbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL3Jlc291cmNlX2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILHFCQUFxQjtBQUNyQixvREFBb0Q7QUFDcEQsd0JBQXdCO0FBQ3hCLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIscURBQTRDO0FBRTVDLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQztBQUN0RSxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFRbkU7SUFPRTtRQUpRLHNCQUFpQixHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBQ2hELG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDM0MsNEJBQXVCLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7SUFFaEQsQ0FBQztJQUVoQixNQUFNLENBQUMsaUJBQXNCO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUM1QyxDQUFDO0lBRUQsdUJBQXVCLENBQUMsUUFBZ0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRU8sUUFBUSxDQUFDLFFBQWdCO1FBRS9CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFD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eUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRjtBQS9IRCxzREErSEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyBUT0RPOiBmaXggdHlwaW5ncy5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1nbG9iYWwtdHNsaW50LWRpc2FibGVcbi8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHZtIGZyb20gJ3ZtJztcbmltcG9ydCB7IFJhd1NvdXJjZSB9IGZyb20gJ3dlYnBhY2stc291cmNlcyc7XG5cbmNvbnN0IE5vZGVUZW1wbGF0ZVBsdWdpbiA9IHJlcXVpcmUoJ3dlYnBhY2svbGliL25vZGUvTm9kZVRlbXBsYXRlUGx1Z2luJyk7XG5jb25zdCBOb2RlVGFyZ2V0UGx1Z2luID0gcmVxdWlyZSgnd2VicGFjay9saWIvbm9kZS9Ob2RlVGFyZ2V0UGx1Z2luJyk7XG5jb25zdCBMb2FkZXJUYXJnZXRQbHVnaW4gPSByZXF1aXJlKCd3ZWJwYWNrL2xpYi9Mb2FkZXJUYXJnZXRQbHVnaW4nKTtcbmNvbnN0IFNpbmdsZUVudHJ5UGx1Z2luID0gcmVxdWlyZSgnd2VicGFjay9saWIvU2luZ2xlRW50cnlQbHVnaW4nKTtcblxuXG5pbnRlcmZhY2UgQ29tcGlsYXRpb25PdXRwdXQge1xuICBvdXRwdXROYW1lOiBzdHJpbmc7XG4gIHNvdXJjZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgV2VicGFja1Jlc291cmNlTG9hZGVyIHtcbiAgcHJpdmF0ZSBfcGFyZW50Q29tcGlsYXRpb246IGFueTtcbiAgcHJpdmF0ZSBfY29udGV4dDogc3RyaW5nO1xuICBwcml2YXRlIF9maWxlRGVwZW5kZW5jaWVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICBwcml2YXRlIF9jYWNoZWRTb3VyY2VzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBfY2FjaGVkRXZhbHVhdGVkU291cmNlcyA9IG5ldyBNYXA8c3RyaW5nLCBSYXdTb3VyY2U+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHVwZGF0ZShwYXJlbnRDb21waWxhdGlvbjogYW55KSB7XG4gICAgdGhpcy5fcGFyZW50Q29tcGlsYXRpb24gPSBwYXJlbnRDb21waWxhdGlvbjtcbiAgICB0aGlzLl9jb250ZXh0ID0gcGFyZW50Q29tcGlsYXRpb24uY29udGV4dDtcbiAgfVxuXG4gIGdldFJlc291cmNlRGVwZW5kZW5jaWVzKGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZURlcGVuZGVuY2llcy5nZXQoZmlsZVBhdGgpIHx8IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZShmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxDb21waWxhdGlvbk91dHB1dD4ge1xuXG4gICAgaWYgKCF0aGlzLl9wYXJlbnRDb21waWxhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJwYWNrUmVzb3VyY2VMb2FkZXIgY2Fubm90IGJlIHVzZWQgd2l0aG91dCBwYXJlbnRDb21waWxhdGlvbicpO1xuICAgIH1cblxuICAgIC8vIFNpbXBsZSBzYW5pdHkgY2hlY2suXG4gICAgaWYgKGZpbGVQYXRoLm1hdGNoKC9cXC5banRdcyQvKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdDYW5ub3QgdXNlIGEgSmF2YVNjcmlwdCBvciBUeXBlU2NyaXB0IGZpbGUgZm9yIHN0eWxlVXJsLicpO1xuICAgIH1cblxuICAgIGNvbnN0IG91dHB1dE9wdGlvbnMgPSB7IGZpbGVuYW1lOiBmaWxlUGF0aCB9O1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHBhdGgucmVsYXRpdmUodGhpcy5fY29udGV4dCB8fCAnJywgZmlsZVBhdGgpO1xuICAgIGNvbnN0IGNoaWxkQ29tcGlsZXIgPSB0aGlzLl9wYXJlbnRDb21waWxhdGlvbi5jcmVhdGVDaGlsZENvbXBpbGVyKHJlbGF0aXZlUGF0aCwgb3V0cHV0T3B0aW9ucyk7XG4gICAgY2hpbGRDb21waWxlci5jb250ZXh0ID0gdGhpcy5fY29udGV4dDtcblxuICAgIG5ldyBOb2RlVGVtcGxhdGVQbHVnaW4ob3V0cHV0T3B0aW9ucykuYXBwbHkoY2hpbGRDb21waWxlcik7XG4gICAgbmV3IE5vZGVUYXJnZXRQbHVnaW4oKS5hcHBseShjaGlsZENvbXBpbGVyKTtcbiAgICBuZXcgU2luZ2xlRW50cnlQbHVnaW4odGhpcy5fY29udGV4dCwgZmlsZVBhdGgpLmFwcGx5KGNoaWxkQ29tcGlsZXIpO1xuICAgIG5ldyBMb2FkZXJUYXJnZXRQbHVnaW4oJ25vZGUnKS5hcHBseShjaGlsZENvbXBpbGVyKTtcblxuICAgIGNoaWxkQ29tcGlsZXIuaG9va3MudGhpc0NvbXBpbGF0aW9uLnRhcCgnbmd0b29scy13ZWJwYWNrJywgKGNvbXBpbGF0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmFkZGl0aW9uYWxBc3NldHMudGFwQXN5bmMoJ25ndG9vbHMtd2VicGFjaycsXG4gICAgICAoY2FsbGJhY2s6IChlcnI/OiBFcnJvcikgPT4gdm9pZCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2FjaGVkRXZhbHVhdGVkU291cmNlcy5oYXMoY29tcGlsYXRpb24uZnVsbEhhc2gpKSB7XG4gICAgICAgICAgY29uc3QgY2FjaGVkRXZhbHVhdGVkU291cmNlID0gdGhpcy5fY2FjaGVkRXZhbHVhdGVkU291cmNlcy5nZXQoY29tcGlsYXRpb24uZnVsbEhhc2gpO1xuICAgICAgICAgIGNvbXBpbGF0aW9uLmFzc2V0c1tmaWxlUGF0aF0gPSBjYWNoZWRFdmFsdWF0ZWRTb3VyY2U7XG4gICAgICAgICAgY2FsbGJhY2soKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzc2V0ID0gY29tcGlsYXRpb24uYXNzZXRzW2ZpbGVQYXRoXTtcbiAgICAgICAgaWYgKGFzc2V0KSB7XG4gICAgICAgICAgdGhpcy5fZXZhbHVhdGUoeyBvdXRwdXROYW1lOiBmaWxlUGF0aCwgc291cmNlOiBhc3NldC5zb3VyY2UoKSB9KVxuICAgICAgICAgICAgLnRoZW4ob3V0cHV0ID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZXZhbHVhdGVkU291cmNlID0gbmV3IFJhd1NvdXJjZShvdXRwdXQpO1xuICAgICAgICAgICAgICB0aGlzLl9jYWNoZWRFdmFsdWF0ZWRTb3VyY2VzLnNldChjb21waWxhdGlvbi5mdWxsSGFzaCwgZXZhbHVhdGVkU291cmNlKTtcbiAgICAgICAgICAgICAgY29tcGlsYXRpb24uYXNzZXRzW2ZpbGVQYXRoXSA9IGV2YWx1YXRlZFNvdXJjZTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNhbGxiYWNrKGVycikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gQ29tcGlsZSBhbmQgcmV0dXJuIGEgcHJvbWlzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjaGlsZENvbXBpbGVyLmNvbXBpbGUoKGVycjogRXJyb3IsIGNoaWxkQ29tcGlsYXRpb246IGFueSkgPT4ge1xuICAgICAgICAvLyBSZXNvbHZlIC8gcmVqZWN0IHRoZSBwcm9taXNlXG4gICAgICAgIGlmIChjaGlsZENvbXBpbGF0aW9uICYmIGNoaWxkQ29tcGlsYXRpb24uZXJyb3JzICYmIGNoaWxkQ29tcGlsYXRpb24uZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGVycm9yRGV0YWlscyA9IGNoaWxkQ29tcGlsYXRpb24uZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyb3I6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yLm1lc3NhZ2UgKyAoZXJyb3IuZXJyb3IgPyAnOlxcbicgKyBlcnJvci5lcnJvciA6ICcnKTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdDaGlsZCBjb21waWxhdGlvbiBmYWlsZWQ6XFxuJyArIGVycm9yRGV0YWlscykpO1xuICAgICAgICB9IGVsc2UgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE9iamVjdC5rZXlzKGNoaWxkQ29tcGlsYXRpb24uYXNzZXRzKS5mb3JFYWNoKGFzc2V0TmFtZSA9PiB7XG4gICAgICAgICAgICAvLyBBZGQgYWxsIG5ldyBhc3NldHMgdG8gdGhlIHBhcmVudCBjb21waWxhdGlvbiwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG4gICAgICAgICAgICAvLyB0aGUgZmlsZSB3ZSdyZSBsb2FkaW5nIGFuZCBpdHMgc291cmNlbWFwLlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBhc3NldE5hbWUgIT09IGZpbGVQYXRoXG4gICAgICAgICAgICAgICYmIGFzc2V0TmFtZSAhPT0gYCR7ZmlsZVBhdGh9Lm1hcGBcbiAgICAgICAgICAgICAgJiYgdGhpcy5fcGFyZW50Q29tcGlsYXRpb24uYXNzZXRzW2Fzc2V0TmFtZV0gPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy5fcGFyZW50Q29tcGlsYXRpb24uYXNzZXRzW2Fzc2V0TmFtZV0gPSBjaGlsZENvbXBpbGF0aW9uLmFzc2V0c1thc3NldE5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gU2F2ZSB0aGUgZGVwZW5kZW5jaWVzIGZvciB0aGlzIHJlc291cmNlLlxuICAgICAgICAgIHRoaXMuX2ZpbGVEZXBlbmRlbmNpZXMuc2V0KGZpbGVQYXRoLCBjaGlsZENvbXBpbGF0aW9uLmZpbGVEZXBlbmRlbmNpZXMpO1xuXG4gICAgICAgICAgY29uc3QgY29tcGlsYXRpb25IYXNoID0gY2hpbGRDb21waWxhdGlvbi5mdWxsSGFzaDtcbiAgICAgICAgICBjb25zdCBtYXliZVNvdXJjZSA9IHRoaXMuX2NhY2hlZFNvdXJjZXMuZ2V0KGNvbXBpbGF0aW9uSGFzaCk7XG4gICAgICAgICAgaWYgKG1heWJlU291cmNlKSB7XG4gICAgICAgICAgICByZXNvbHZlKHsgb3V0cHV0TmFtZTogZmlsZVBhdGgsIHNvdXJjZTogbWF5YmVTb3VyY2UgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGNoaWxkQ29tcGlsYXRpb24uYXNzZXRzW2ZpbGVQYXRoXS5zb3VyY2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlZFNvdXJjZXMuc2V0KGNvbXBpbGF0aW9uSGFzaCwgc291cmNlKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSh7IG91dHB1dE5hbWU6IGZpbGVQYXRoLCBzb3VyY2UgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2V2YWx1YXRlKHsgb3V0cHV0TmFtZSwgc291cmNlIH06IENvbXBpbGF0aW9uT3V0cHV0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRXZhbHVhdGUgY29kZVxuICAgICAgY29uc3QgZXZhbHVhdGVkU291cmNlID0gdm0ucnVuSW5OZXdDb250ZXh0KHNvdXJjZSwgdW5kZWZpbmVkLCB7IGZpbGVuYW1lOiBvdXRwdXROYW1lIH0pO1xuXG4gICAgICBpZiAodHlwZW9mIGV2YWx1YXRlZFNvdXJjZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGV2YWx1YXRlZFNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnVGhlIGxvYWRlciBcIicgKyBvdXRwdXROYW1lICsgJ1wiIGRpZG5cXCd0IHJldHVybiBhIHN0cmluZy4nKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0KGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlKGZpbGVQYXRoKVxuICAgICAgLnRoZW4oKHJlc3VsdDogQ29tcGlsYXRpb25PdXRwdXQpID0+IHJlc3VsdC5zb3VyY2UpO1xuICB9XG59XG4iXX0=