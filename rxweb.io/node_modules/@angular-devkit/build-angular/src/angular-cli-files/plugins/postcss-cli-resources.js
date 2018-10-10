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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzcy1jbGktcmVzb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9wbHVnaW5zL3Bvc3Rjc3MtY2xpLXJlc291cmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBQWlCO0FBQ2pCLCtEQUErRDs7Ozs7Ozs7OztBQUcvRDs7Ozs7O0dBTUc7QUFDSCwrQ0FBK0M7QUFDL0MsbUNBQW1DO0FBQ25DLDJCQUEyQjtBQUczQixpQkFBaUIsR0FBVztJQUMxQixJQUFJLFVBQVUsQ0FBQztJQUNmLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsVUFBVSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sVUFBVSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsR0FBRyxDQUFDO0FBQzlCLENBQUM7QUFRRCxpQkFDRSxJQUFZLEVBQ1osSUFBWSxFQUNaLFFBQXlEOztRQUV6RCxJQUFJLENBQUM7WUFDSCxNQUFNLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCxrQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUMsT0FBbUMsRUFBRSxFQUFFO0lB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QztZQUM1QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGVcbi8vIFRPRE86IGNsZWFudXAgdGhpcyBmaWxlLCBpdCdzIGNvcGllZCBhcyBpcyBmcm9tIEFuZ3VsYXIgQ0xJLlxuXG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGludGVycG9sYXRlTmFtZSB9IGZyb20gJ2xvYWRlci11dGlscyc7XG5pbXBvcnQgKiBhcyBwb3N0Y3NzIGZyb20gJ3Bvc3Rjc3MnO1xuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgKiBhcyB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snO1xuXG5mdW5jdGlvbiB3cmFwVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IHdyYXBwZWRVcmw7XG4gIGNvbnN0IGhhc1NpbmdsZVF1b3RlcyA9IHVybC5pbmRleE9mKCdcXCcnKSA+PSAwO1xuXG4gIGlmIChoYXNTaW5nbGVRdW90ZXMpIHtcbiAgICB3cmFwcGVkVXJsID0gYFwiJHt1cmx9XCJgO1xuICB9IGVsc2Uge1xuICAgIHdyYXBwZWRVcmwgPSBgJyR7dXJsfSdgO1xuICB9XG5cbiAgcmV0dXJuIGB1cmwoJHt3cmFwcGVkVXJsfSlgO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvc3Rjc3NDbGlSZXNvdXJjZXNPcHRpb25zIHtcbiAgZGVwbG95VXJsPzogc3RyaW5nO1xuICBmaWxlbmFtZTogc3RyaW5nO1xuICBsb2FkZXI6IHdlYnBhY2subG9hZGVyLkxvYWRlckNvbnRleHQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc29sdmUoXG4gIGZpbGU6IHN0cmluZyxcbiAgYmFzZTogc3RyaW5nLFxuICByZXNvbHZlcjogKGZpbGU6IHN0cmluZywgYmFzZTogc3RyaW5nKSA9PiBQcm9taXNlPHN0cmluZz5cbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IHJlc29sdmVyKCcuLycgKyBmaWxlLCBiYXNlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHJlc29sdmVyKGZpbGUsIGJhc2UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBvc3Rjc3MucGx1Z2luKCdwb3N0Y3NzLWNsaS1yZXNvdXJjZXMnLCAob3B0aW9uczogUG9zdGNzc0NsaVJlc291cmNlc09wdGlvbnMpID0+IHtcbiAgY29uc3QgeyBkZXBsb3lVcmwsIGZpbGVuYW1lLCBsb2FkZXIgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgcHJvY2VzcyA9IGFzeW5jIChpbnB1dFVybDogc3RyaW5nLCByZXNvdXJjZUNhY2hlOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSA9PiB7XG4gICAgLy8gSWYgcm9vdC1yZWxhdGl2ZSBvciBhYnNvbHV0ZSwgbGVhdmUgYXMgaXNcbiAgICBpZiAoaW5wdXRVcmwubWF0Y2goL14oPzpcXHcrOlxcL1xcL3xkYXRhOnxjaHJvbWU6fCN8XFwvKS8pKSB7XG4gICAgICByZXR1cm4gaW5wdXRVcmw7XG4gICAgfVxuICAgIC8vIElmIHN0YXJ0cyB3aXRoIGEgY2FyZXQsIHJlbW92ZSBhbmQgcmV0dXJuIHJlbWFpbmRlclxuICAgIC8vIHRoaXMgc3VwcG9ydHMgYnlwYXNzaW5nIGFzc2V0IHByb2Nlc3NpbmdcbiAgICBpZiAoaW5wdXRVcmwuc3RhcnRzV2l0aCgnXicpKSB7XG4gICAgICByZXR1cm4gaW5wdXRVcmwuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlZFVybCA9IHJlc291cmNlQ2FjaGUuZ2V0KGlucHV0VXJsKTtcbiAgICBpZiAoY2FjaGVkVXJsKSB7XG4gICAgICByZXR1cm4gY2FjaGVkVXJsO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcGF0aG5hbWUsIGhhc2gsIHNlYXJjaCB9ID0gdXJsLnBhcnNlKGlucHV0VXJsLnJlcGxhY2UoL1xcXFwvZywgJy8nKSk7XG4gICAgY29uc3QgcmVzb2x2ZXIgPSAoZmlsZTogc3RyaW5nLCBiYXNlOiBzdHJpbmcpID0+IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9hZGVyLnJlc29sdmUoYmFzZSwgZmlsZSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNvbHZlKHBhdGhuYW1lIGFzIHN0cmluZywgbG9hZGVyLmNvbnRleHQsIHJlc29sdmVyKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxvYWRlci5mcy5yZWFkRmlsZShyZXN1bHQsIChlcnI6IEVycm9yLCBjb250ZW50OiBCdWZmZXIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG91dHB1dFBhdGggPSBpbnRlcnBvbGF0ZU5hbWUoXG4gICAgICAgICAgeyByZXNvdXJjZVBhdGg6IHJlc3VsdCB9IGFzIHdlYnBhY2subG9hZGVyLkxvYWRlckNvbnRleHQsXG4gICAgICAgICAgZmlsZW5hbWUsXG4gICAgICAgICAgeyBjb250ZW50IH0sXG4gICAgICAgICk7XG5cbiAgICAgICAgbG9hZGVyLmFkZERlcGVuZGVuY3kocmVzdWx0KTtcbiAgICAgICAgbG9hZGVyLmVtaXRGaWxlKG91dHB1dFBhdGgsIGNvbnRlbnQsIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgbGV0IG91dHB1dFVybCA9IG91dHB1dFBhdGgucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuICAgICAgICBpZiAoaGFzaCB8fCBzZWFyY2gpIHtcbiAgICAgICAgICBvdXRwdXRVcmwgPSB1cmwuZm9ybWF0KHsgcGF0aG5hbWU6IG91dHB1dFVybCwgaGFzaCwgc2VhcmNoIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlcGxveVVybCkge1xuICAgICAgICAgIG91dHB1dFVybCA9IHVybC5yZXNvbHZlKGRlcGxveVVybCwgb3V0cHV0VXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc291cmNlQ2FjaGUuc2V0KGlucHV0VXJsLCBvdXRwdXRVcmwpO1xuXG4gICAgICAgIHJlc29sdmUob3V0cHV0VXJsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAocm9vdCkgPT4ge1xuICAgIGNvbnN0IHVybERlY2xhcmF0aW9uczogQXJyYXk8cG9zdGNzcy5EZWNsYXJhdGlvbj4gPSBbXTtcbiAgICByb290LndhbGtEZWNscyhkZWNsID0+IHtcbiAgICAgIGlmIChkZWNsLnZhbHVlICYmIGRlY2wudmFsdWUuaW5jbHVkZXMoJ3VybCcpKSB7XG4gICAgICAgIHVybERlY2xhcmF0aW9ucy5wdXNoKGRlY2wpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHVybERlY2xhcmF0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZXNvdXJjZUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh1cmxEZWNsYXJhdGlvbnMubWFwKGFzeW5jIGRlY2wgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBkZWNsLnZhbHVlO1xuICAgICAgY29uc3QgdXJsUmVnZXggPSAvdXJsXFwoXFxzKig/OlwiKFteXCJdKylcInwnKFteJ10rKSd8KC4rPykpXFxzKlxcKS9nO1xuICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgIGxldCBtYXRjaDtcbiAgICAgIGxldCBsYXN0SW5kZXggPSAwO1xuICAgICAgbGV0IG1vZGlmaWVkID0gZmFsc2U7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uZGl0aW9uYWwtYXNzaWdubWVudFxuICAgICAgd2hpbGUgKG1hdGNoID0gdXJsUmVnZXguZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxVcmwgPSBtYXRjaFsxXSB8fCBtYXRjaFsyXSB8fCBtYXRjaFszXTtcbiAgICAgICAgbGV0IHByb2Nlc3NlZFVybDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwcm9jZXNzZWRVcmwgPSBhd2FpdCBwcm9jZXNzKG9yaWdpbmFsVXJsLCByZXNvdXJjZUNhY2hlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9hZGVyLmVtaXRFcnJvcihkZWNsLmVycm9yKGVyci5tZXNzYWdlLCB7IHdvcmQ6IG9yaWdpbmFsVXJsIH0pLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3RJbmRleCA8IG1hdGNoLmluZGV4KSB7XG4gICAgICAgICAgc2VnbWVudHMucHVzaCh2YWx1ZS5zbGljZShsYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXByb2Nlc3NlZFVybCB8fCBvcmlnaW5hbFVybCA9PT0gcHJvY2Vzc2VkVXJsKSB7XG4gICAgICAgICAgc2VnbWVudHMucHVzaChtYXRjaFswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VnbWVudHMucHVzaCh3cmFwVXJsKHByb2Nlc3NlZFVybCkpO1xuICAgICAgICAgIG1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3RJbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBpZiAobGFzdEluZGV4IDwgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHNlZ21lbnRzLnB1c2godmFsdWUuc2xpY2UobGFzdEluZGV4KSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllZCkge1xuICAgICAgICBkZWNsLnZhbHVlID0gc2VnbWVudHMuam9pbignJyk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xufSk7XG4iXX0=