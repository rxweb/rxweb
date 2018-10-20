"use strict";
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_sources_1 = require("webpack-sources");
const loader_utils_1 = require("loader-utils");
const path = require("path");
const Chunk = require('webpack/lib/Chunk');
const EntryPoint = require('webpack/lib/Entrypoint');
function addDependencies(compilation, scripts) {
    if (compilation.fileDependencies.add) {
        // Webpack 4+ uses a Set
        for (const script of scripts) {
            compilation.fileDependencies.add(script);
        }
    }
    else {
        // Webpack 3
        compilation.fileDependencies.push(...scripts);
    }
}
function hook(compiler, action) {
    if (compiler.hooks) {
        // Webpack 4
        compiler.hooks.thisCompilation.tap('scripts-webpack-plugin', (compilation) => {
            compilation.hooks.additionalAssets.tapAsync('scripts-webpack-plugin', (callback) => action(compilation, callback));
        });
    }
    else {
        // Webpack 3
        compiler.plugin('this-compilation', (compilation) => {
            compilation.plugin('additional-assets', (callback) => action(compilation, callback));
        });
    }
}
class ScriptsWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
    }
    shouldSkip(compilation, scripts) {
        if (this._lastBuildTime == undefined) {
            this._lastBuildTime = Date.now();
            return false;
        }
        for (let i = 0; i < scripts.length; i++) {
            let scriptTime;
            if (compilation.fileTimestamps.get) {
                // Webpack 4+ uses a Map
                scriptTime = compilation.fileTimestamps.get(scripts[i]);
            }
            else {
                // Webpack 3
                scriptTime = compilation.fileTimestamps[scripts[i]];
            }
            if (!scriptTime || scriptTime > this._lastBuildTime) {
                this._lastBuildTime = Date.now();
                return false;
            }
        }
        return true;
    }
    _insertOutput(compilation, { filename, source }, cached = false) {
        const chunk = new Chunk(this.options.name);
        chunk.rendered = !cached;
        chunk.id = this.options.name;
        chunk.ids = [chunk.id];
        chunk.files.push(filename);
        const entrypoint = new EntryPoint(this.options.name);
        entrypoint.pushChunk(chunk);
        compilation.entrypoints.set(this.options.name, entrypoint);
        compilation.chunks.push(chunk);
        compilation.assets[filename] = source;
    }
    apply(compiler) {
        if (!this.options.scripts || this.options.scripts.length === 0) {
            return;
        }
        const scripts = this.options.scripts
            .filter(script => !!script)
            .map(script => path.resolve(this.options.basePath || '', script));
        hook(compiler, (compilation, callback) => {
            if (this.shouldSkip(compilation, scripts)) {
                if (this._cachedOutput) {
                    this._insertOutput(compilation, this._cachedOutput, true);
                }
                addDependencies(compilation, scripts);
                callback();
                return;
            }
            const sourceGetters = scripts.map(fullPath => {
                return new Promise((resolve, reject) => {
                    compilation.inputFileSystem.readFile(fullPath, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const content = data.toString();
                        let source;
                        if (this.options.sourceMap) {
                            // TODO: Look for source map file (for '.min' scripts, etc.)
                            let adjustedPath = fullPath;
                            if (this.options.basePath) {
                                adjustedPath = path.relative(this.options.basePath, fullPath);
                            }
                            source = new webpack_sources_1.OriginalSource(content, adjustedPath);
                        }
                        else {
                            source = new webpack_sources_1.RawSource(content);
                        }
                        resolve(source);
                    });
                });
            });
            Promise.all(sourceGetters)
                .then(sources => {
                const concatSource = new webpack_sources_1.ConcatSource();
                sources.forEach(source => {
                    concatSource.add(source);
                    concatSource.add('\n;');
                });
                const combinedSource = new webpack_sources_1.CachedSource(concatSource);
                const filename = loader_utils_1.interpolateName({ resourcePath: 'scripts.js' }, this.options.filename, { content: combinedSource.source() });
                const output = { filename, source: combinedSource };
                this._insertOutput(compilation, output);
                this._cachedOutput = output;
                addDependencies(compilation, scripts);
                callback();
            })
                .catch((err) => callback(err));
        });
    }
}
exports.ScriptsWebpackPlugin = ScriptsWebpackPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy13ZWJwYWNrLXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvcGx1Z2lucy9zY3JpcHRzLXdlYnBhY2stcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsK0RBQStEOztBQWlCL0QscURBQWdHO0FBQ2hHLCtDQUErQztBQUMvQyw2QkFBNkI7QUFFN0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDM0MsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFlckQseUJBQXlCLFdBQWdCLEVBQUUsT0FBaUI7SUFDMUQsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFO1FBQ3BDLHdCQUF3QjtRQUN4QixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUM1QixXQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFDO0tBQ0Y7U0FBTTtRQUNMLFlBQVk7UUFDWixXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7S0FDL0M7QUFDSCxDQUFDO0FBRUQsY0FBYyxRQUFhLEVBQUUsTUFBbUU7SUFDOUYsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2xCLFlBQVk7UUFDWixRQUFRLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxXQUFnQixFQUFFLEVBQUU7WUFDaEYsV0FBVyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQ3pDLHdCQUF3QixFQUN4QixDQUFDLFFBQStCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENB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QkFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Z0JBQzVCLGVBQWUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRXRDLFFBQVEsRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF2SEQsb0RBdUhDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGVcbi8vIFRPRE86IGNsZWFudXAgdGhpcyBmaWxlLCBpdCdzIGNvcGllZCBhcyBpcyBmcm9tIEFuZ3VsYXIgQ0xJLlxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBDb21waWxlciwgbG9hZGVyIH0gZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgeyBDYWNoZWRTb3VyY2UsIENvbmNhdFNvdXJjZSwgT3JpZ2luYWxTb3VyY2UsIFJhd1NvdXJjZSwgU291cmNlIH0gZnJvbSAnd2VicGFjay1zb3VyY2VzJztcbmltcG9ydCB7IGludGVycG9sYXRlTmFtZSB9IGZyb20gJ2xvYWRlci11dGlscyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBDaHVuayA9IHJlcXVpcmUoJ3dlYnBhY2svbGliL0NodW5rJyk7XG5jb25zdCBFbnRyeVBvaW50ID0gcmVxdWlyZSgnd2VicGFjay9saWIvRW50cnlwb2ludCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdHNXZWJwYWNrUGx1Z2luT3B0aW9ucyB7XG4gIG5hbWU6IHN0cmluZztcbiAgc291cmNlTWFwOiBib29sZWFuO1xuICBzY3JpcHRzOiBzdHJpbmdbXTtcbiAgZmlsZW5hbWU6IHN0cmluZztcbiAgYmFzZVBhdGg6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFNjcmlwdE91dHB1dCB7XG4gIGZpbGVuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZTogQ2FjaGVkU291cmNlO1xufVxuXG5mdW5jdGlvbiBhZGREZXBlbmRlbmNpZXMoY29tcGlsYXRpb246IGFueSwgc2NyaXB0czogc3RyaW5nW10pOiB2b2lkIHtcbiAgaWYgKGNvbXBpbGF0aW9uLmZpbGVEZXBlbmRlbmNpZXMuYWRkKSB7XG4gICAgLy8gV2VicGFjayA0KyB1c2VzIGEgU2V0XG4gICAgZm9yIChjb25zdCBzY3JpcHQgb2Ygc2NyaXB0cykge1xuICAgICAgY29tcGlsYXRpb24uZmlsZURlcGVuZGVuY2llcy5hZGQoc2NyaXB0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gV2VicGFjayAzXG4gICAgY29tcGlsYXRpb24uZmlsZURlcGVuZGVuY2llcy5wdXNoKC4uLnNjcmlwdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhvb2soY29tcGlsZXI6IGFueSwgYWN0aW9uOiAoY29tcGlsYXRpb246IGFueSwgY2FsbGJhY2s6IChlcnI/OiBFcnJvcikgPT4gdm9pZCkgPT4gdm9pZCkge1xuICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAvLyBXZWJwYWNrIDRcbiAgICBjb21waWxlci5ob29rcy50aGlzQ29tcGlsYXRpb24udGFwKCdzY3JpcHRzLXdlYnBhY2stcGx1Z2luJywgKGNvbXBpbGF0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmFkZGl0aW9uYWxBc3NldHMudGFwQXN5bmMoXG4gICAgICAgICdzY3JpcHRzLXdlYnBhY2stcGx1Z2luJyxcbiAgICAgICAgKGNhbGxiYWNrOiAoZXJyPzogRXJyb3IpID0+IHZvaWQpID0+IGFjdGlvbihjb21waWxhdGlvbiwgY2FsbGJhY2spLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBXZWJwYWNrIDNcbiAgICBjb21waWxlci5wbHVnaW4oJ3RoaXMtY29tcGlsYXRpb24nLCAoY29tcGlsYXRpb246IGFueSkgPT4ge1xuICAgICAgY29tcGlsYXRpb24ucGx1Z2luKFxuICAgICAgICAnYWRkaXRpb25hbC1hc3NldHMnLFxuICAgICAgICAoY2FsbGJhY2s6IChlcnI/OiBFcnJvcikgPT4gdm9pZCkgPT4gYWN0aW9uKGNvbXBpbGF0aW9uLCBjYWxsYmFjayksXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRzV2VicGFja1BsdWdpbiB7XG4gIHByaXZhdGUgX2xhc3RCdWlsZFRpbWU/OiBudW1iZXI7XG4gIHByaXZhdGUgX2NhY2hlZE91dHB1dD86IFNjcmlwdE91dHB1dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IFBhcnRpYWw8U2NyaXB0c1dlYnBhY2tQbHVnaW5PcHRpb25zPiA9IHt9KSB7IH1cblxuICBzaG91bGRTa2lwKGNvbXBpbGF0aW9uOiBhbnksIHNjcmlwdHM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2xhc3RCdWlsZFRpbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9sYXN0QnVpbGRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzY3JpcHRUaW1lO1xuICAgICAgaWYgKGNvbXBpbGF0aW9uLmZpbGVUaW1lc3RhbXBzLmdldCkge1xuICAgICAgICAvLyBXZWJwYWNrIDQrIHVzZXMgYSBNYXBcbiAgICAgICAgc2NyaXB0VGltZSA9IGNvbXBpbGF0aW9uLmZpbGVUaW1lc3RhbXBzLmdldChzY3JpcHRzW2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlYnBhY2sgM1xuICAgICAgICBzY3JpcHRUaW1lID0gY29tcGlsYXRpb24uZmlsZVRpbWVzdGFtcHNbc2NyaXB0c1tpXV07XG4gICAgICB9XG4gICAgICBpZiAoIXNjcmlwdFRpbWUgfHwgc2NyaXB0VGltZSA+IHRoaXMuX2xhc3RCdWlsZFRpbWUpIHtcbiAgICAgICAgdGhpcy5fbGFzdEJ1aWxkVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2luc2VydE91dHB1dChjb21waWxhdGlvbjogYW55LCB7IGZpbGVuYW1lLCBzb3VyY2UgfTogU2NyaXB0T3V0cHV0LCBjYWNoZWQgPSBmYWxzZSkge1xuICAgIGNvbnN0IGNodW5rID0gbmV3IENodW5rKHRoaXMub3B0aW9ucy5uYW1lKTtcbiAgICBjaHVuay5yZW5kZXJlZCA9ICFjYWNoZWQ7XG4gICAgY2h1bmsuaWQgPSB0aGlzLm9wdGlvbnMubmFtZTtcbiAgICBjaHVuay5pZHMgPSBbY2h1bmsuaWRdO1xuICAgIGNodW5rLmZpbGVzLnB1c2goZmlsZW5hbWUpO1xuXG4gICAgY29uc3QgZW50cnlwb2ludCA9IG5ldyBFbnRyeVBvaW50KHRoaXMub3B0aW9ucy5uYW1lKTtcbiAgICBlbnRyeXBvaW50LnB1c2hDaHVuayhjaHVuayk7XG5cbiAgICBjb21waWxhdGlvbi5lbnRyeXBvaW50cy5zZXQodGhpcy5vcHRpb25zLm5hbWUsIGVudHJ5cG9pbnQpO1xuICAgIGNvbXBpbGF0aW9uLmNodW5rcy5wdXNoKGNodW5rKTtcbiAgICBjb21waWxhdGlvbi5hc3NldHNbZmlsZW5hbWVdID0gc291cmNlO1xuICB9XG5cbiAgYXBwbHkoY29tcGlsZXI6IENvbXBpbGVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuc2NyaXB0cyB8fCB0aGlzLm9wdGlvbnMuc2NyaXB0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzY3JpcHRzID0gdGhpcy5vcHRpb25zLnNjcmlwdHNcbiAgICAgIC5maWx0ZXIoc2NyaXB0ID0+ICEhc2NyaXB0KVxuICAgICAgLm1hcChzY3JpcHQgPT4gcGF0aC5yZXNvbHZlKHRoaXMub3B0aW9ucy5iYXNlUGF0aCB8fCAnJywgc2NyaXB0KSk7XG5cbiAgICBob29rKGNvbXBpbGVyLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICBpZiAodGhpcy5zaG91bGRTa2lwKGNvbXBpbGF0aW9uLCBzY3JpcHRzKSkge1xuICAgICAgICBpZiAodGhpcy5fY2FjaGVkT3V0cHV0KSB7XG4gICAgICAgICAgdGhpcy5faW5zZXJ0T3V0cHV0KGNvbXBpbGF0aW9uLCB0aGlzLl9jYWNoZWRPdXRwdXQsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkRGVwZW5kZW5jaWVzKGNvbXBpbGF0aW9uLCBzY3JpcHRzKTtcbiAgICAgICAgY2FsbGJhY2soKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvdXJjZUdldHRlcnMgPSBzY3JpcHRzLm1hcChmdWxsUGF0aCA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxTb3VyY2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb21waWxhdGlvbi5pbnB1dEZpbGVTeXN0ZW0ucmVhZEZpbGUoZnVsbFBhdGgsIChlcnI6IEVycm9yLCBkYXRhOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGRhdGEudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgbGV0IHNvdXJjZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc291cmNlTWFwKSB7XG4gICAgICAgICAgICAgIC8vIFRPRE86IExvb2sgZm9yIHNvdXJjZSBtYXAgZmlsZSAoZm9yICcubWluJyBzY3JpcHRzLCBldGMuKVxuXG4gICAgICAgICAgICAgIGxldCBhZGp1c3RlZFBhdGggPSBmdWxsUGF0aDtcbiAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXNlUGF0aCkge1xuICAgICAgICAgICAgICAgIGFkanVzdGVkUGF0aCA9IHBhdGgucmVsYXRpdmUodGhpcy5vcHRpb25zLmJhc2VQYXRoLCBmdWxsUGF0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc291cmNlID0gbmV3IE9yaWdpbmFsU291cmNlKGNvbnRlbnQsIGFkanVzdGVkUGF0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzb3VyY2UgPSBuZXcgUmF3U291cmNlKGNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHNvdXJjZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIFByb21pc2UuYWxsKHNvdXJjZUdldHRlcnMpXG4gICAgICAgIC50aGVuKHNvdXJjZXMgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbmNhdFNvdXJjZSA9IG5ldyBDb25jYXRTb3VyY2UoKTtcbiAgICAgICAgICBzb3VyY2VzLmZvckVhY2goc291cmNlID0+IHtcbiAgICAgICAgICAgIGNvbmNhdFNvdXJjZS5hZGQoc291cmNlKTtcbiAgICAgICAgICAgIGNvbmNhdFNvdXJjZS5hZGQoJ1xcbjsnKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGNvbWJpbmVkU291cmNlID0gbmV3IENhY2hlZFNvdXJjZShjb25jYXRTb3VyY2UpO1xuICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gaW50ZXJwb2xhdGVOYW1lKFxuICAgICAgICAgICAgeyByZXNvdXJjZVBhdGg6ICdzY3JpcHRzLmpzJyB9IGFzIGxvYWRlci5Mb2FkZXJDb250ZXh0LFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZpbGVuYW1lIGFzIHN0cmluZyxcbiAgICAgICAgICAgIHsgY29udGVudDogY29tYmluZWRTb3VyY2Uuc291cmNlKCkgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3Qgb3V0cHV0ID0geyBmaWxlbmFtZSwgc291cmNlOiBjb21iaW5lZFNvdXJjZSB9O1xuICAgICAgICAgIHRoaXMuX2luc2VydE91dHB1dChjb21waWxhdGlvbiwgb3V0cHV0KTtcbiAgICAgICAgICB0aGlzLl9jYWNoZWRPdXRwdXQgPSBvdXRwdXQ7XG4gICAgICAgICAgYWRkRGVwZW5kZW5jaWVzKGNvbXBpbGF0aW9uLCBzY3JpcHRzKTtcblxuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4gY2FsbGJhY2soZXJyKSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==