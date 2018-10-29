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
exports.NodeWatchFileSystem = require('webpack/lib/node/NodeWatchFileSystem');
class VirtualFileSystemDecorator {
    constructor(_inputFileSystem, _webpackCompilerHost) {
        this._inputFileSystem = _inputFileSystem;
        this._webpackCompilerHost = _webpackCompilerHost;
    }
    _readFileSync(path) {
        if (this._webpackCompilerHost.fileExists(path)) {
            return this._webpackCompilerHost.readFileBuffer(path) || null;
        }
        return null;
    }
    _statSync(path) {
        if (this._webpackCompilerHost.fileExists(path)) {
            return this._webpackCompilerHost.stat(path);
        }
        return null;
    }
    getVirtualFilesPaths() {
        return this._webpackCompilerHost.getNgFactoryPaths();
    }
    stat(path, callback) {
        const result = this._statSync(path);
        if (result) {
            callback(null, result);
        }
        else {
            this._inputFileSystem.stat(path, callback);
        }
    }
    readdir(path, callback) {
        this._inputFileSystem.readdir(path, callback);
    }
    readFile(path, callback) {
        const result = this._readFileSync(path);
        if (result) {
            callback(null, result);
        }
        else {
            this._inputFileSystem.readFile(path, callback);
        }
    }
    readJson(path, callback) {
        this._inputFileSystem.readJson(path, callback);
    }
    readlink(path, callback) {
        this._inputFileSystem.readlink(path, callback);
    }
    statSync(path) {
        const result = this._statSync(path);
        return result || this._inputFileSystem.statSync(path);
    }
    readdirSync(path) {
        return this._inputFileSystem.readdirSync(path);
    }
    readFileSync(path) {
        const result = this._readFileSync(path);
        return result || this._inputFileSystem.readFileSync(path);
    }
    readJsonSync(path) {
        return this._inputFileSystem.readJsonSync(path);
    }
    readlinkSync(path) {
        return this._inputFileSystem.readlinkSync(path);
    }
    purge(changes) {
        if (typeof changes === 'string') {
            this._webpackCompilerHost.invalidate(changes);
        }
        else if (Array.isArray(changes)) {
            changes.forEach((fileName) => this._webpackCompilerHost.invalidate(fileName));
        }
        if (this._inputFileSystem.purge) {
            this._inputFileSystem.purge(changes);
        }
    }
}
exports.VirtualFileSystemDecorator = VirtualFileSystemDecorator;
class VirtualWatchFileSystemDecorator extends exports.NodeWatchFileSystem {
    constructor(_virtualInputFileSystem, _replacements) {
        super(_virtualInputFileSystem);
        this._virtualInputFileSystem = _virtualInputFileSystem;
        this._replacements = _replacements;
    }
    watch(files, dirs, missing, startTime, options, callback, // tslint:disable-line:no-any
    callbackUndelayed) {
        const reverseReplacements = new Map();
        const reverseTimestamps = (map) => {
            for (const entry of Array.from(map.entries())) {
                const original = reverseReplacements.get(entry[0]);
                if (original) {
                    map.set(original, entry[1]);
                    map.delete(entry[0]);
                }
            }
            return map;
        };
        const newCallbackUndelayed = (filename, timestamp) => {
            const original = reverseReplacements.get(filename);
            if (original) {
                this._virtualInputFileSystem.purge(original);
                callbackUndelayed(original, timestamp);
            }
            else {
                callbackUndelayed(filename, timestamp);
            }
        };
        const newCallback = (err, filesModified, contextModified, missingModified, fileTimestamps, contextTimestamps) => {
            // Update fileTimestamps with timestamps from virtual files.
            const virtualFilesStats = this._virtualInputFileSystem.getVirtualFilesPaths()
                .map((fileName) => ({
                path: fileName,
                mtime: +this._virtualInputFileSystem.statSync(fileName).mtime,
            }));
            virtualFilesStats.forEach(stats => fileTimestamps.set(stats.path, +stats.mtime));
            callback(err, filesModified.map(value => reverseReplacements.get(value) || value), contextModified.map(value => reverseReplacements.get(value) || value), missingModified.map(value => reverseReplacements.get(value) || value), reverseTimestamps(fileTimestamps), reverseTimestamps(contextTimestamps));
        };
        const mapReplacements = (original) => {
            if (!this._replacements) {
                return original;
            }
            const replacements = this._replacements;
            return original.map(file => {
                if (typeof replacements === 'function') {
                    const replacement = core_1.getSystemPath(replacements(core_1.normalize(file)));
                    if (replacement !== file) {
                        reverseReplacements.set(replacement, file);
                    }
                    return replacement;
                }
                else {
                    const replacement = replacements.get(core_1.normalize(file));
                    if (replacement) {
                        const fullReplacement = core_1.getSystemPath(replacement);
                        reverseReplacements.set(fullReplacement, file);
                        return fullReplacement;
                    }
                    else {
                        return file;
                    }
                }
            });
        };
        const watcher = super.watch(mapReplacements(files), mapReplacements(dirs), mapReplacements(missing), startTime, options, newCallback, newCallbackUndelayed);
        return {
            close: () => watcher.close(),
            pause: () => watcher.pause(),
            getFileTimestamps: () => reverseTimestamps(watcher.getFileTimestamps()),
            getContextTimestamps: () => reverseTimestamps(watcher.getContextTimestamps()),
        };
    }
}
exports.VirtualWatchFileSystemDecorator = VirtualWatchFileSystemDecorator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbF9maWxlX3N5c3RlbV9kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL25ndG9vbHMvd2VicGFjay9zcmMvdmlydHVhbF9maWxlX3N5c3RlbV9kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBc0U7QUFLekQsUUFBQSxtQkFBbUIsR0FBaUMsT0FBTyxDQUN0RSxzQ0FBc0MsQ0FBQyxDQUFDO0FBRTFDO0lBQ0UsWUFDVSxnQkFBaUMsRUFDakMsb0JBQXlDO1FBRHpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtJQUMvQyxDQUFDO0lBRUcsYUFBYSxDQUFDLElBQVk7UUFDaEMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUM7U0FDL0Q7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxTQUFTLENBQUMsSUFBWTtRQUM1QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZLEVBQUUsUUFBeUI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLE1BQU0sRUFBRTtZ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O1lBQzVCLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3ZFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzlFLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE5R0QsMEVBOEdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgUGF0aCwgZ2V0U3lzdGVtUGF0aCwgbm9ybWFsaXplIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgU3RhdHMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBXZWJwYWNrQ29tcGlsZXJIb3N0IH0gZnJvbSAnLi9jb21waWxlcl9ob3N0JztcbmltcG9ydCB7IENhbGxiYWNrLCBJbnB1dEZpbGVTeXN0ZW0sIE5vZGVXYXRjaEZpbGVTeXN0ZW1JbnRlcmZhY2UgfSBmcm9tICcuL3dlYnBhY2snO1xuXG5leHBvcnQgY29uc3QgTm9kZVdhdGNoRmlsZVN5c3RlbTogTm9kZVdhdGNoRmlsZVN5c3RlbUludGVyZmFjZSA9IHJlcXVpcmUoXG4gICd3ZWJwYWNrL2xpYi9ub2RlL05vZGVXYXRjaEZpbGVTeXN0ZW0nKTtcblxuZXhwb3J0IGNsYXNzIFZpcnR1YWxGaWxlU3lzdGVtRGVjb3JhdG9yIGltcGxlbWVudHMgSW5wdXRGaWxlU3lzdGVtIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfaW5wdXRGaWxlU3lzdGVtOiBJbnB1dEZpbGVTeXN0ZW0sXG4gICAgcHJpdmF0ZSBfd2VicGFja0NvbXBpbGVySG9zdDogV2VicGFja0NvbXBpbGVySG9zdCxcbiAgKSB7IH1cblxuICBwcml2YXRlIF9yZWFkRmlsZVN5bmMocGF0aDogc3RyaW5nKTogQnVmZmVyIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX3dlYnBhY2tDb21waWxlckhvc3QuZmlsZUV4aXN0cyhwYXRoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3dlYnBhY2tDb21waWxlckhvc3QucmVhZEZpbGVCdWZmZXIocGF0aCkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX3N0YXRTeW5jKHBhdGg6IHN0cmluZyk6IFN0YXRzIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX3dlYnBhY2tDb21waWxlckhvc3QuZmlsZUV4aXN0cyhwYXRoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3dlYnBhY2tDb21waWxlckhvc3Quc3RhdChwYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFZpcnR1YWxGaWxlc1BhdGhzKCkge1xuICAgIHJldHVybiB0aGlzLl93ZWJwYWNrQ29tcGlsZXJIb3N0LmdldE5nRmFjdG9yeVBhdGhzKCk7XG4gIH1cblxuICBzdGF0KHBhdGg6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrPFN0YXRzPik6IHZvaWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3N0YXRTeW5jKHBhdGgpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lucHV0RmlsZVN5c3RlbS5zdGF0KHBhdGgsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICByZWFkZGlyKHBhdGg6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrPHN0cmluZ1tdPik6IHZvaWQge1xuICAgIHRoaXMuX2lucHV0RmlsZVN5c3RlbS5yZWFkZGlyKHBhdGgsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlYWRGaWxlKHBhdGg6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrPEJ1ZmZlcj4pOiB2b2lkIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9yZWFkRmlsZVN5bmMocGF0aCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5wdXRGaWxlU3lzdGVtLnJlYWRGaWxlKHBhdGgsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICByZWFkSnNvbihwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYmFjazx7fT4pOiB2b2lkIHtcbiAgICB0aGlzLl9pbnB1dEZpbGVTeXN0ZW0ucmVhZEpzb24ocGF0aCwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVhZGxpbmsocGF0aDogc3RyaW5nLCBjYWxsYmFjazogQ2FsbGJhY2s8c3RyaW5nPik6IHZvaWQge1xuICAgIHRoaXMuX2lucHV0RmlsZVN5c3RlbS5yZWFkbGluayhwYXRoLCBjYWxsYmFjayk7XG4gIH1cblxuICBzdGF0U3luYyhwYXRoOiBzdHJpbmcpOiBTdGF0cyB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fc3RhdFN5bmMocGF0aCk7XG5cbiAgICByZXR1cm4gcmVzdWx0IHx8IHRoaXMuX2lucHV0RmlsZVN5c3RlbS5zdGF0U3luYyhwYXRoKTtcbiAgfVxuXG4gIHJlYWRkaXJTeW5jKHBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRGaWxlU3lzdGVtLnJlYWRkaXJTeW5jKHBhdGgpO1xuICB9XG5cbiAgcmVhZEZpbGVTeW5jKHBhdGg6IHN0cmluZyk6IEJ1ZmZlciB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fcmVhZEZpbGVTeW5jKHBhdGgpO1xuXG4gICAgcmV0dXJuIHJlc3VsdCB8fCB0aGlzLl9pbnB1dEZpbGVTeXN0ZW0ucmVhZEZpbGVTeW5jKHBhdGgpO1xuICB9XG5cbiAgcmVhZEpzb25TeW5jKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0RmlsZVN5c3RlbS5yZWFkSnNvblN5bmMocGF0aCk7XG4gIH1cblxuICByZWFkbGlua1N5bmMocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRGaWxlU3lzdGVtLnJlYWRsaW5rU3luYyhwYXRoKTtcbiAgfVxuXG4gIHB1cmdlKGNoYW5nZXM/OiBzdHJpbmdbXSB8IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgY2hhbmdlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3dlYnBhY2tDb21waWxlckhvc3QuaW52YWxpZGF0ZShjaGFuZ2VzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hhbmdlcykpIHtcbiAgICAgIGNoYW5nZXMuZm9yRWFjaCgoZmlsZU5hbWU6IHN0cmluZykgPT4gdGhpcy5fd2VicGFja0NvbXBpbGVySG9zdC5pbnZhbGlkYXRlKGZpbGVOYW1lKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9pbnB1dEZpbGVTeXN0ZW0ucHVyZ2UpIHtcbiAgICAgIHRoaXMuX2lucHV0RmlsZVN5c3RlbS5wdXJnZShjaGFuZ2VzKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpcnR1YWxXYXRjaEZpbGVTeXN0ZW1EZWNvcmF0b3IgZXh0ZW5kcyBOb2RlV2F0Y2hGaWxlU3lzdGVtIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdmlydHVhbElucHV0RmlsZVN5c3RlbTogVmlydHVhbEZpbGVTeXN0ZW1EZWNvcmF0b3IsXG4gICAgcHJpdmF0ZSBfcmVwbGFjZW1lbnRzPzogTWFwPFBhdGgsIFBhdGg+IHwgKChwYXRoOiBQYXRoKSA9PiBQYXRoKSxcbiAgKSB7XG4gICAgc3VwZXIoX3ZpcnR1YWxJbnB1dEZpbGVTeXN0ZW0pO1xuICB9XG5cbiAgd2F0Y2goXG4gICAgZmlsZXM6IHN0cmluZ1tdLFxuICAgIGRpcnM6IHN0cmluZ1tdLFxuICAgIG1pc3Npbmc6IHN0cmluZ1tdLFxuICAgIHN0YXJ0VGltZTogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIG9wdGlvbnM6IHt9LFxuICAgIGNhbGxiYWNrOiBhbnksICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgIGNhbGxiYWNrVW5kZWxheWVkOiAoZmlsZW5hbWU6IHN0cmluZywgdGltZXN0YW1wOiBudW1iZXIpID0+IHZvaWQsXG4gICkge1xuICAgIGNvbnN0IHJldmVyc2VSZXBsYWNlbWVudHMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgIGNvbnN0IHJldmVyc2VUaW1lc3RhbXBzID0gKG1hcDogTWFwPHN0cmluZywgbnVtYmVyPikgPT4ge1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBBcnJheS5mcm9tKG1hcC5lbnRyaWVzKCkpKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsID0gcmV2ZXJzZVJlcGxhY2VtZW50cy5nZXQoZW50cnlbMF0pO1xuICAgICAgICBpZiAob3JpZ2luYWwpIHtcbiAgICAgICAgICBtYXAuc2V0KG9yaWdpbmFsLCBlbnRyeVsxXSk7XG4gICAgICAgICAgbWFwLmRlbGV0ZShlbnRyeVswXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xuXG4gICAgY29uc3QgbmV3Q2FsbGJhY2tVbmRlbGF5ZWQgPSAoZmlsZW5hbWU6IHN0cmluZywgdGltZXN0YW1wOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsID0gcmV2ZXJzZVJlcGxhY2VtZW50cy5nZXQoZmlsZW5hbWUpO1xuICAgICAgaWYgKG9yaWdpbmFsKSB7XG4gICAgICAgIHRoaXMuX3ZpcnR1YWxJbnB1dEZpbGVTeXN0ZW0ucHVyZ2Uob3JpZ2luYWwpO1xuICAgICAgICBjYWxsYmFja1VuZGVsYXllZChvcmlnaW5hbCwgdGltZXN0YW1wKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrVW5kZWxheWVkKGZpbGVuYW1lLCB0aW1lc3RhbXApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBuZXdDYWxsYmFjayA9IChcbiAgICAgIGVycjogRXJyb3IgfCBudWxsLFxuICAgICAgZmlsZXNNb2RpZmllZDogc3RyaW5nW10sXG4gICAgICBjb250ZXh0TW9kaWZpZWQ6IHN0cmluZ1tdLFxuICAgICAgbWlzc2luZ01vZGlmaWVkOiBzdHJpbmdbXSxcbiAgICAgIGZpbGVUaW1lc3RhbXBzOiBNYXA8c3RyaW5nLCBudW1iZXI+LFxuICAgICAgY29udGV4dFRpbWVzdGFtcHM6IE1hcDxzdHJpbmcsIG51bWJlcj4sXG4gICAgKSA9PiB7XG4gICAgICAvLyBVcGRhdGUgZmlsZVRpbWVzdGFtcHMgd2l0aCB0aW1lc3RhbXBzIGZyb20gdmlydHVhbCBmaWxlcy5cbiAgICAgIGNvbnN0IHZpcnR1YWxGaWxlc1N0YXRzID0gdGhpcy5fdmlydHVhbElucHV0RmlsZVN5c3RlbS5nZXRWaXJ0dWFsRmlsZXNQYXRocygpXG4gICAgICAgIC5tYXAoKGZpbGVOYW1lKSA9PiAoe1xuICAgICAgICAgIHBhdGg6IGZpbGVOYW1lLFxuICAgICAgICAgIG10aW1lOiArdGhpcy5fdmlydHVhbElucHV0RmlsZVN5c3RlbS5zdGF0U3luYyhmaWxlTmFtZSkubXRpbWUsXG4gICAgICAgIH0pKTtcbiAgICAgIHZpcnR1YWxGaWxlc1N0YXRzLmZvckVhY2goc3RhdHMgPT4gZmlsZVRpbWVzdGFtcHMuc2V0KHN0YXRzLnBhdGgsICtzdGF0cy5tdGltZSkpO1xuICAgICAgY2FsbGJhY2soXG4gICAgICAgIGVycixcbiAgICAgICAgZmlsZXNNb2RpZmllZC5tYXAodmFsdWUgPT4gcmV2ZXJzZVJlcGxhY2VtZW50cy5nZXQodmFsdWUpIHx8IHZhbHVlKSxcbiAgICAgICAgY29udGV4dE1vZGlmaWVkLm1hcCh2YWx1ZSA9PiByZXZlcnNlUmVwbGFjZW1lbnRzLmdldCh2YWx1ZSkgfHwgdmFsdWUpLFxuICAgICAgICBtaXNzaW5nTW9kaWZpZWQubWFwKHZhbHVlID0+IHJldmVyc2VSZXBsYWNlbWVudHMuZ2V0KHZhbHVlKSB8fCB2YWx1ZSksXG4gICAgICAgIHJldmVyc2VUaW1lc3RhbXBzKGZpbGVUaW1lc3RhbXBzKSxcbiAgICAgICAgcmV2ZXJzZVRpbWVzdGFtcHMoY29udGV4dFRpbWVzdGFtcHMpLFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbWFwUmVwbGFjZW1lbnRzID0gKG9yaWdpbmFsOiBzdHJpbmdbXSk6IHN0cmluZ1tdID0+IHtcbiAgICAgIGlmICghdGhpcy5fcmVwbGFjZW1lbnRzKSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlcGxhY2VtZW50cyA9IHRoaXMuX3JlcGxhY2VtZW50cztcblxuICAgICAgcmV0dXJuIG9yaWdpbmFsLm1hcChmaWxlID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXBsYWNlbWVudHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlbWVudCA9IGdldFN5c3RlbVBhdGgocmVwbGFjZW1lbnRzKG5vcm1hbGl6ZShmaWxlKSkpO1xuICAgICAgICAgIGlmIChyZXBsYWNlbWVudCAhPT0gZmlsZSkge1xuICAgICAgICAgICAgcmV2ZXJzZVJlcGxhY2VtZW50cy5zZXQocmVwbGFjZW1lbnQsIGZpbGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXBsYWNlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50cy5nZXQobm9ybWFsaXplKGZpbGUpKTtcbiAgICAgICAgICBpZiAocmVwbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxSZXBsYWNlbWVudCA9IGdldFN5c3RlbVBhdGgocmVwbGFjZW1lbnQpO1xuICAgICAgICAgICAgcmV2ZXJzZVJlcGxhY2VtZW50cy5zZXQoZnVsbFJlcGxhY2VtZW50LCBmaWxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZ1bGxSZXBsYWNlbWVudDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZpbGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2F0Y2hlciA9IHN1cGVyLndhdGNoKFxuICAgICAgbWFwUmVwbGFjZW1lbnRzKGZpbGVzKSxcbiAgICAgIG1hcFJlcGxhY2VtZW50cyhkaXJzKSxcbiAgICAgIG1hcFJlcGxhY2VtZW50cyhtaXNzaW5nKSxcbiAgICAgIHN0YXJ0VGltZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBuZXdDYWxsYmFjayxcbiAgICAgIG5ld0NhbGxiYWNrVW5kZWxheWVkLFxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2xvc2U6ICgpID0+IHdhdGNoZXIuY2xvc2UoKSxcbiAgICAgIHBhdXNlOiAoKSA9PiB3YXRjaGVyLnBhdXNlKCksXG4gICAgICBnZXRGaWxlVGltZXN0YW1wczogKCkgPT4gcmV2ZXJzZVRpbWVzdGFtcHMod2F0Y2hlci5nZXRGaWxlVGltZXN0YW1wcygpKSxcbiAgICAgIGdldENvbnRleHRUaW1lc3RhbXBzOiAoKSA9PiByZXZlcnNlVGltZXN0YW1wcyh3YXRjaGVyLmdldENvbnRleHRUaW1lc3RhbXBzKCkpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==