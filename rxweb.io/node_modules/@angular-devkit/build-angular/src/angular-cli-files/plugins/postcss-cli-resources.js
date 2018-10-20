"use strict";
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
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
const loader_utils_1 = require("loader-utils");
const postcss = require("postcss");
const url = require("url");
function wrapUrl(url) {
    let wrappedUrl;
    const hasSingleQuotes = url.indexOf('\'') >= 0;
    if (hasSingleQuotes) {
        wrappedUrl = `"${url}"`;
    }
    else {
        wrappedUrl = `'${url}'`;
    }
    return `url(${wrappedUrl})`;
}
function resolve(file, base, resolver) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield resolver('./' + file, base);
        }
        catch (err) {
            return resolver(file, base);
        }
    });
}
exports.default = postcss.plugin('postcss-cli-resources', (options) => {
    const { deployUrl, filename, loader } = options;
    const process = (inputUrl, resourceCache) => __awaiter(this, void 0, void 0, function* () {
        // If root-relative or absolute, leave as is
        if (inputUrl.match(/^(?:\w+:\/\/|data:|chrome:|#|\/)/)) {
            return inputUrl;
        }
        // If starts with a caret, remove and return remainder
        // this supports bypassing asset processing
        if (inputUrl.startsWith('^')) {
            return inputUrl.substr(1);
        }
        const cachedUrl = resourceCache.get(inputUrl);
        if (cachedUrl) {
            return cachedUrl;
        }
        const { pathname, hash, search } = url.parse(inputUrl.replace(/\\/g, '/'));
        const resolver = (file, base) => new Promise((resolve, reject) => {
            loader.resolve(base, file, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
        const result = yield resolve(pathname, loader.context, resolver);
        return new Promise((resolve, reject) => {
            loader.fs.readFile(result, (err, content) => {
                if (err) {
                    reject(err);
                    return;
                }
                const outputPath = loader_utils_1.interpolateName({ resourcePath: result }, filename, { content });
                loader.addDependency(result);
                loader.emitFile(outputPath, content, undefined);
                let outputUrl = outputPath.replace(/\\/g, '/');
                if (hash || search) {
                    outputUrl = url.format({ pathname: outputUrl, hash, search });
                }
                if (deployUrl) {
                    outputUrl = url.resolve(deployUrl, outputUrl);
                }
                resourceCache.set(inputUrl, outputUrl);
                resolve(outputUrl);
            });
        });
    });
    return (root) => {
        const urlDeclarations = [];
        root.walkDecls(decl => {
            if (decl.value && decl.value.includes('url')) {
                urlDeclarations.push(decl);
            }
        });
        if (urlDeclarations.length === 0) {
            return;
        }
        const resourceCache = new Map();
        return Promise.all(urlDeclarations.map((decl) => __awaiter(this, void 0, void 0, function* () {
            const value = decl.value;
            const urlRegex = /url\(\s*(?:"([^"]+)"|'([^']+)'|(.+?))\s*\)/g;
            const segments = [];
            let match;
            let lastIndex = 0;
            let modified = false;
            // tslint:disable-next-line:no-conditional-assignment
            while (match = urlRegex.exec(value)) {
                const originalUrl = match[1] || match[2] || match[3];
                let processedUrl;
                try {
                    processedUrl = yield process(originalUrl, resourceCache);
                }
                catch (err) {
                    loader.emitError(decl.error(err.message, { word: originalUrl }).toString());
                    continue;
                }
                if (lastIndex < match.index) {
                    segments.push(value.slice(lastIndex, match.index));
                }
                if (!processedUrl || originalUrl === processedUrl) {
                    segments.push(match[0]);
                }
                else {
                    segments.push(wrapUrl(processedUrl));
                    modified = true;
                }
                lastIndex = match.index + match[0].length;
            }
            if (lastIndex < value.length) {
                segments.push(value.slice(lastIndex));
            }
            if (modified) {
                decl.value = segments.join('');
            }
        })));
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzcy1jbGktcmVzb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9wbHVnaW5zL3Bvc3Rjc3MtY2xpLXJlc291cmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBQWlCO0FBQ2pCLCtEQUErRDs7Ozs7Ozs7OztBQUcvRDs7Ozs7O0dBTUc7QUFDSCwrQ0FBK0M7QUFDL0MsbUNBQW1DO0FBQ25DLDJCQUEyQjtBQUczQixpQkFBaUIsR0FBVztJQUMxQixJQUFJLFVBQVUsQ0FBQztJQUNmLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DLElBQUksZUFBZSxFQUFFO1FBQ25CLFVBQVUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0tBQ3pCO1NBQU07UUFDTCxVQUFVLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztLQUN6QjtJQUVELE9BQU8sT0FBTyxVQUFVLEdBQUcsQ0FBQztBQUM5QixDQUFDO0FBUUQsaUJBQ0UsSUFBWSxFQUNaLElBQVksRUFDWixRQUF5RDs7UUFFekQsSUFBSTtZQUNGLE9BQU8sTUFBTSxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMxQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztDQUFBO0FBRUQsa0JBQWUsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLE9BQW1DLEVBQUUsRUFBRTtJQUM3RixNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFaEQsTUFBTSxPQUFPLEdBQUcsQ0FBTyxRQUFnQixFQUFF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QUFTO2lCQUNWO2dCQUVELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ3BEO2dCQUVELElBQUksQ0FBQyxZQUFZLElBQUksV0FBVyxLQUFLLFlBQVksRUFBRTtvQkFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDekI7cUJBQU07b0JBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDckMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDakI7Z0JBRUQsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzthQUMzQztZQUVELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDO1lBRUQsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgaW50ZXJwb2xhdGVOYW1lIH0gZnJvbSAnbG9hZGVyLXV0aWxzJztcbmltcG9ydCAqIGFzIHBvc3Rjc3MgZnJvbSAncG9zdGNzcyc7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSAndXJsJztcbmltcG9ydCAqIGFzIHdlYnBhY2sgZnJvbSAnd2VicGFjayc7XG5cbmZ1bmN0aW9uIHdyYXBVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsZXQgd3JhcHBlZFVybDtcbiAgY29uc3QgaGFzU2luZ2xlUXVvdGVzID0gdXJsLmluZGV4T2YoJ1xcJycpID49IDA7XG5cbiAgaWYgKGhhc1NpbmdsZVF1b3Rlcykge1xuICAgIHdyYXBwZWRVcmwgPSBgXCIke3VybH1cImA7XG4gIH0gZWxzZSB7XG4gICAgd3JhcHBlZFVybCA9IGAnJHt1cmx9J2A7XG4gIH1cblxuICByZXR1cm4gYHVybCgke3dyYXBwZWRVcmx9KWA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9zdGNzc0NsaVJlc291cmNlc09wdGlvbnMge1xuICBkZXBsb3lVcmw/OiBzdHJpbmc7XG4gIGZpbGVuYW1lOiBzdHJpbmc7XG4gIGxvYWRlcjogd2VicGFjay5sb2FkZXIuTG9hZGVyQ29udGV4dDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZShcbiAgZmlsZTogc3RyaW5nLFxuICBiYXNlOiBzdHJpbmcsXG4gIHJlc29sdmVyOiAoZmlsZTogc3RyaW5nLCBiYXNlOiBzdHJpbmcpID0+IFByb21pc2U8c3RyaW5nPlxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgcmVzb2x2ZXIoJy4vJyArIGZpbGUsIGJhc2UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gcmVzb2x2ZXIoZmlsZSwgYmFzZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcG9zdGNzcy5wbHVnaW4oJ3Bvc3Rjc3MtY2xpLXJlc291cmNlcycsIChvcHRpb25zOiBQb3N0Y3NzQ2xpUmVzb3VyY2VzT3B0aW9ucykgPT4ge1xuICBjb25zdCB7IGRlcGxveVVybCwgZmlsZW5hbWUsIGxvYWRlciB9ID0gb3B0aW9ucztcblxuICBjb25zdCBwcm9jZXNzID0gYXN5bmMgKGlucHV0VXJsOiBzdHJpbmcsIHJlc291cmNlQ2FjaGU6IE1hcDxzdHJpbmcsIHN0cmluZz4pID0+IHtcbiAgICAvLyBJZiByb290LXJlbGF0aXZlIG9yIGFic29sdXRlLCBsZWF2ZSBhcyBpc1xuICAgIGlmIChpbnB1dFVybC5tYXRjaCgvXig/Olxcdys6XFwvXFwvfGRhdGE6fGNocm9tZTp8I3xcXC8pLykpIHtcbiAgICAgIHJldHVybiBpbnB1dFVybDtcbiAgICB9XG4gICAgLy8gSWYgc3RhcnRzIHdpdGggYSBjYXJldCwgcmVtb3ZlIGFuZCByZXR1cm4gcmVtYWluZGVyXG4gICAgLy8gdGhpcyBzdXBwb3J0cyBieXBhc3NpbmcgYXNzZXQgcHJvY2Vzc2luZ1xuICAgIGlmIChpbnB1dFVybC5zdGFydHNXaXRoKCdeJykpIHtcbiAgICAgIHJldHVybiBpbnB1dFVybC5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVkVXJsID0gcmVzb3VyY2VDYWNoZS5nZXQoaW5wdXRVcmwpO1xuICAgIGlmIChjYWNoZWRVcmwpIHtcbiAgICAgIHJldHVybiBjYWNoZWRVcmw7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwYXRobmFtZSwgaGFzaCwgc2VhcmNoIH0gPSB1cmwucGFyc2UoaW5wdXRVcmwucmVwbGFjZSgvXFxcXC9nLCAnLycpKTtcbiAgICBjb25zdCByZXNvbHZlciA9IChmaWxlOiBzdHJpbmcsIGJhc2U6IHN0cmluZykgPT4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsb2FkZXIucmVzb2x2ZShiYXNlLCBmaWxlLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc29sdmUocGF0aG5hbWUgYXMgc3RyaW5nLCBsb2FkZXIuY29udGV4dCwgcmVzb2x2ZXIpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9hZGVyLmZzLnJlYWRGaWxlKHJlc3VsdCwgKGVycjogRXJyb3IsIGNvbnRlbnQ6IEJ1ZmZlcikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IGludGVycG9sYXRlTmFtZShcbiAgICAgICAgICB7IHJlc291cmNlUGF0aDogcmVzdWx0IH0gYXMgd2VicGFjay5sb2FkZXIuTG9hZGVyQ29udGV4dCxcbiAgICAgICAgICBmaWxlbmFtZSxcbiAgICAgICAgICB7IGNvbnRlbnQgfSxcbiAgICAgICAgKTtcblxuICAgICAgICBsb2FkZXIuYWRkRGVwZW5kZW5jeShyZXN1bHQpO1xuICAgICAgICBsb2FkZXIuZW1pdEZpbGUob3V0cHV0UGF0aCwgY29udGVudCwgdW5kZWZpbmVkKTtcblxuICAgICAgICBsZXQgb3V0cHV0VXJsID0gb3V0cHV0UGF0aC5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gICAgICAgIGlmIChoYXNoIHx8IHNlYXJjaCkge1xuICAgICAgICAgIG91dHB1dFVybCA9IHVybC5mb3JtYXQoeyBwYXRobmFtZTogb3V0cHV0VXJsLCBoYXNoLCBzZWFyY2ggfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVwbG95VXJsKSB7XG4gICAgICAgICAgb3V0cHV0VXJsID0gdXJsLnJlc29sdmUoZGVwbG95VXJsLCBvdXRwdXRVcmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb3VyY2VDYWNoZS5zZXQoaW5wdXRVcmwsIG91dHB1dFVybCk7XG5cbiAgICAgICAgcmVzb2x2ZShvdXRwdXRVcmwpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIChyb290KSA9PiB7XG4gICAgY29uc3QgdXJsRGVjbGFyYXRpb25zOiBBcnJheTxwb3N0Y3NzLkRlY2xhcmF0aW9uPiA9IFtdO1xuICAgIHJvb3Qud2Fsa0RlY2xzKGRlY2wgPT4ge1xuICAgICAgaWYgKGRlY2wudmFsdWUgJiYgZGVjbC52YWx1ZS5pbmNsdWRlcygndXJsJykpIHtcbiAgICAgICAgdXJsRGVjbGFyYXRpb25zLnB1c2goZGVjbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodXJsRGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc291cmNlQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHVybERlY2xhcmF0aW9ucy5tYXAoYXN5bmMgZGVjbCA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGRlY2wudmFsdWU7XG4gICAgICBjb25zdCB1cmxSZWdleCA9IC91cmxcXChcXHMqKD86XCIoW15cIl0rKVwifCcoW14nXSspJ3woLis/KSlcXHMqXFwpL2c7XG4gICAgICBjb25zdCBzZWdtZW50czogc3RyaW5nW10gPSBbXTtcblxuICAgICAgbGV0IG1hdGNoO1xuICAgICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgICBsZXQgbW9kaWZpZWQgPSBmYWxzZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25kaXRpb25hbC1hc3NpZ25tZW50XG4gICAgICB3aGlsZSAobWF0Y2ggPSB1cmxSZWdleC5leGVjKHZhbHVlKSkge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFVybCA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8IG1hdGNoWzNdO1xuICAgICAgICBsZXQgcHJvY2Vzc2VkVXJsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHByb2Nlc3NlZFVybCA9IGF3YWl0IHByb2Nlc3Mob3JpZ2luYWxVcmwsIHJlc291cmNlQ2FjaGUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2FkZXIuZW1pdEVycm9yKGRlY2wuZXJyb3IoZXJyLm1lc3NhZ2UsIHsgd29yZDogb3JpZ2luYWxVcmwgfSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdEluZGV4IDwgbWF0Y2guaW5kZXgpIHtcbiAgICAgICAgICBzZWdtZW50cy5wdXNoKHZhbHVlLnNsaWNlKGxhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcHJvY2Vzc2VkVXJsIHx8IG9yaWdpbmFsVXJsID09PSBwcm9jZXNzZWRVcmwpIHtcbiAgICAgICAgICBzZWdtZW50cy5wdXNoKG1hdGNoWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWdtZW50cy5wdXNoKHdyYXBVcmwocHJvY2Vzc2VkVXJsKSk7XG4gICAgICAgICAgbW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChsYXN0SW5kZXggPCB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgc2VnbWVudHMucHVzaCh2YWx1ZS5zbGljZShsYXN0SW5kZXgpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVkKSB7XG4gICAgICAgIGRlY2wudmFsdWUgPSBzZWdtZW50cy5qb2luKCcnKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG59KTtcbiJdfQ==