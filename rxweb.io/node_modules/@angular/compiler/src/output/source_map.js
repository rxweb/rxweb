/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/output/source_map", ["require", "exports", "@angular/compiler/src/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require("@angular/compiler/src/util");
    // https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit
    var VERSION = 3;
    var JS_B64_PREFIX = '# sourceMappingURL=data:application/json;base64,';
    var SourceMapGenerator = /** @class */ (function () {
        function SourceMapGenerator(file) {
            if (file === void 0) { file = null; }
            this.file = file;
            this.sourcesContent = new Map();
            this.lines = [];
            this.lastCol0 = 0;
            this.hasMappings = false;
        }
        // The content is `null` when the content is expected to be loaded using the URL
        SourceMapGenerator.prototype.addSource = function (url, content) {
            if (content === void 0) { content = null; }
            if (!this.sourcesContent.has(url)) {
                this.sourcesContent.set(url, content);
            }
            return this;
        };
        SourceMapGenerator.prototype.addLine = function () {
            this.lines.push([]);
            this.lastCol0 = 0;
            return this;
        };
        SourceMapGenerator.prototype.addMapping = function (col0, sourceUrl, sourceLine0, sourceCol0) {
            if (!this.currentLine) {
                throw new Error("A line must be added before mappings can be added");
            }
            if (sourceUrl != null && !this.sourcesContent.has(sourceUrl)) {
                throw new Error("Unknown source file \"" + sourceUrl + "\"");
            }
            if (col0 == null) {
                throw new Error("The column in the generated code must be provided");
            }
            if (col0 < this.lastCol0) {
                throw new Error("Mapping should be added in output order");
            }
            if (sourceUrl && (sourceLine0 == null || sourceCol0 == null)) {
                throw new Error("The source location must be provided when a source url is provided");
            }
            this.hasMappings = true;
            this.lastCol0 = col0;
            this.currentLine.push({ col0: col0, sourceUrl: sourceUrl, sourceLine0: sourceLine0, sourceCol0: sourceCol0 });
            return this;
        };
        Object.defineProperty(SourceMapGenerator.prototype, "currentLine", {
            get: function () { return this.lines.slice(-1)[0]; },
            enumerable: true,
            configurable: true
        });
        SourceMapGenerator.prototype.toJSON = function () {
            var _this = this;
            if (!this.hasMappings) {
                return null;
            }
            var sourcesIndex = new Map();
            var sources = [];
            var sourcesContent = [];
            Array.from(this.sourcesContent.keys()).forEach(function (url, i) {
                sourcesIndex.set(url, i);
                sources.push(url);
                sourcesContent.push(_this.sourcesContent.get(url) || null);
            });
            var mappings = '';
            var lastCol0 = 0;
            var lastSourceIndex = 0;
            var lastSourceLine0 = 0;
            var lastSourceCol0 = 0;
            this.lines.forEach(function (segments) {
                lastCol0 = 0;
                mappings += segments
                    .map(function (segment) {
                    // zero-based starting column of the line in the generated code
                    var segAsStr = toBase64VLQ(segment.col0 - lastCol0);
                    lastCol0 = segment.col0;
                    if (segment.sourceUrl != null) {
                        // zero-based index into the “sources” list
                        segAsStr +=
                            toBase64VLQ(sourcesIndex.get(segment.sourceUrl) - lastSourceIndex);
                        lastSourceIndex = sourcesIndex.get(segment.sourceUrl);
                        // the zero-based starting line in the original source
                        segAsStr += toBase64VLQ(segment.sourceLine0 - lastSourceLine0);
                        lastSourceLine0 = segment.sourceLine0;
                        // the zero-based starting column in the original source
                        segAsStr += toBase64VLQ(segment.sourceCol0 - lastSourceCol0);
                        lastSourceCol0 = segment.sourceCol0;
                    }
                    return segAsStr;
                })
                    .join(',');
                mappings += ';';
            });
            mappings = mappings.slice(0, -1);
            return {
                'file': this.file || '',
                'version': VERSION,
                'sourceRoot': '',
                'sources': sources,
                'sourcesContent': sourcesContent,
                'mappings': mappings,
            };
        };
        SourceMapGenerator.prototype.toJsComment = function () {
            return this.hasMappings ? '//' + JS_B64_PREFIX + toBase64String(JSON.stringify(this, null, 0)) :
                '';
        };
        return SourceMapGenerator;
    }());
    exports.SourceMapGenerator = SourceMapGenerator;
    function toBase64String(value) {
        var b64 = '';
        value = util_1.utf8Encode(value);
        for (var i = 0; i < value.length;) {
            var i1 = value.charCodeAt(i++);
            var i2 = value.charCodeAt(i++);
            var i3 = value.charCodeAt(i++);
            b64 += toBase64Digit(i1 >> 2);
            b64 += toBase64Digit(((i1 & 3) << 4) | (isNaN(i2) ? 0 : i2 >> 4));
            b64 += isNaN(i2) ? '=' : toBase64Digit(((i2 & 15) << 2) | (i3 >> 6));
            b64 += isNaN(i2) || isNaN(i3) ? '=' : toBase64Digit(i3 & 63);
        }
        return b64;
    }
    exports.toBase64String = toBase64String;
    function toBase64VLQ(value) {
        value = value < 0 ? ((-value) << 1) + 1 : value << 1;
        var out = '';
        do {
            var digit = value & 31;
            value = value >> 5;
            if (value > 0) {
                digit = digit | 32;
            }
            out += toBase64Digit(digit);
        } while (value > 0);
        return out;
    }
    var B64_DIGITS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    function toBase64Digit(value) {
        if (value < 0 || value >= 64) {
            throw new Error("Can only encode value in the range [0, 63]");
        }
        return B64_DIGITS[value];
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlX21hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9vdXRwdXQvc291cmNlX21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILG1EQUFtQztJQUVuQyx1RkFBdUY7SUFDdkYsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLElBQU0sYUFBYSxHQUFHLGtEQUFrRCxDQUFDO0lBa0J6RTtRQU1FLDRCQUFvQixJQUF3QjtZQUF4QixxQkFBQSxFQUFBLFdBQXdCO1lBQXhCLFNBQUksR0FBSixJQUFJLENBQW9CO1lBTHBDLG1CQUFjLEdBQTZCLElBQUksR0FBRyxFQUFFLENBQUM7WUFDckQsVUFBSyxHQUFnQixFQUFFLENBQUM7WUFDeEIsYUFBUSxHQUFXLENBQUMsQ0FBQztZQUNyQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVtQixDQUFDO1FBRWhELGdGQUFnRjtRQUNoRixzQ0FBUyxHQUFULFVBQVUsR0FBVyxFQUFFLE9BQTJCO1lBQTNCLHdCQUFBLEVBQUEsY0FBMkI7WUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxvQ0FBTyxHQUFQO1lBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDbEIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsdUNBQVUsR0FBVixVQUFXLElBQVksRUFBRSxTQUFrQixFQUFFLFdBQW9CLEVBQUUsVUFBbUI7WUFD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QUUsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBZEQsd0NBY0M7SUFFRCxxQkFBcUIsS0FBYTtRQUNoQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBRXJELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEdBQUc7WUFDRCxJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ25CLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDYixLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNwQjtZQUNELEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0IsUUFBUSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBRXBCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELElBQU0sVUFBVSxHQUFHLGtFQUFrRSxDQUFDO0lBRXRGLHVCQUF1QixLQUFhO1FBQ2xDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRSxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtRQUVELE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7dXRmOEVuY29kZX0gZnJvbSAnLi4vdXRpbCc7XG5cbi8vIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMVUxUkdBZWhRd1J5cFVUb3ZGMUtSbHBpT0Z6ZTBiLV8yZ2M2ZkFIMEtZMGsvZWRpdFxuY29uc3QgVkVSU0lPTiA9IDM7XG5cbmNvbnN0IEpTX0I2NF9QUkVGSVggPSAnIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJztcblxudHlwZSBTZWdtZW50ID0ge1xuICBjb2wwOiBudW1iZXIsXG4gIHNvdXJjZVVybD86IHN0cmluZyxcbiAgc291cmNlTGluZTA/OiBudW1iZXIsXG4gIHNvdXJjZUNvbDA/OiBudW1iZXIsXG59O1xuXG5leHBvcnQgdHlwZSBTb3VyY2VNYXAgPSB7XG4gIHZlcnNpb246IG51bWJlcixcbiAgZmlsZT86IHN0cmluZyxcbiAgc291cmNlUm9vdDogc3RyaW5nLFxuICBzb3VyY2VzOiBzdHJpbmdbXSxcbiAgc291cmNlc0NvbnRlbnQ6IChzdHJpbmcgfCBudWxsKVtdLFxuICBtYXBwaW5nczogc3RyaW5nLFxufTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZU1hcEdlbmVyYXRvciB7XG4gIHByaXZhdGUgc291cmNlc0NvbnRlbnQ6IE1hcDxzdHJpbmcsIHN0cmluZ3xudWxsPiA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSBsaW5lczogU2VnbWVudFtdW10gPSBbXTtcbiAgcHJpdmF0ZSBsYXN0Q29sMDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBoYXNNYXBwaW5ncyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZTogc3RyaW5nfG51bGwgPSBudWxsKSB7fVxuXG4gIC8vIFRoZSBjb250ZW50IGlzIGBudWxsYCB3aGVuIHRoZSBjb250ZW50IGlzIGV4cGVjdGVkIHRvIGJlIGxvYWRlZCB1c2luZyB0aGUgVVJMXG4gIGFkZFNvdXJjZSh1cmw6IHN0cmluZywgY29udGVudDogc3RyaW5nfG51bGwgPSBudWxsKTogdGhpcyB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZXNDb250ZW50Lmhhcyh1cmwpKSB7XG4gICAgICB0aGlzLnNvdXJjZXNDb250ZW50LnNldCh1cmwsIGNvbnRlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZExpbmUoKTogdGhpcyB7XG4gICAgdGhpcy5saW5lcy5wdXNoKFtdKTtcbiAgICB0aGlzLmxhc3RDb2wwID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZE1hcHBpbmcoY29sMDogbnVtYmVyLCBzb3VyY2VVcmw/OiBzdHJpbmcsIHNvdXJjZUxpbmUwPzogbnVtYmVyLCBzb3VyY2VDb2wwPzogbnVtYmVyKTogdGhpcyB7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRMaW5lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgbGluZSBtdXN0IGJlIGFkZGVkIGJlZm9yZSBtYXBwaW5ncyBjYW4gYmUgYWRkZWRgKTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZVVybCAhPSBudWxsICYmICF0aGlzLnNvdXJjZXNDb250ZW50Lmhhcyhzb3VyY2VVcmwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gc291cmNlIGZpbGUgXCIke3NvdXJjZVVybH1cImApO1xuICAgIH1cbiAgICBpZiAoY29sMCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBjb2x1bW4gaW4gdGhlIGdlbmVyYXRlZCBjb2RlIG11c3QgYmUgcHJvdmlkZWRgKTtcbiAgICB9XG4gICAgaWYgKGNvbDAgPCB0aGlzLmxhc3RDb2wwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hcHBpbmcgc2hvdWxkIGJlIGFkZGVkIGluIG91dHB1dCBvcmRlcmApO1xuICAgIH1cbiAgICBpZiAoc291cmNlVXJsICYmIChzb3VyY2VMaW5lMCA9PSBudWxsIHx8IHNvdXJjZUNvbDAgPT0gbnVsbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNvdXJjZSBsb2NhdGlvbiBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gYSBzb3VyY2UgdXJsIGlzIHByb3ZpZGVkYCk7XG4gICAgfVxuXG4gICAgdGhpcy5oYXNNYXBwaW5ncyA9IHRydWU7XG4gICAgdGhpcy5sYXN0Q29sMCA9IGNvbDA7XG4gICAgdGhpcy5jdXJyZW50TGluZS5wdXNoKHtjb2wwLCBzb3VyY2VVcmwsIHNvdXJjZUxpbmUwLCBzb3VyY2VDb2wwfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIGdldCBjdXJyZW50TGluZSgpOiBTZWdtZW50W118bnVsbCB7IHJldHVybiB0aGlzLmxpbmVzLnNsaWNlKC0xKVswXTsgfVxuXG4gIHRvSlNPTigpOiBTb3VyY2VNYXB8bnVsbCB7XG4gICAgaWYgKCF0aGlzLmhhc01hcHBpbmdzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VzSW5kZXggPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgIGNvbnN0IHNvdXJjZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3Qgc291cmNlc0NvbnRlbnQ6IChzdHJpbmcgfCBudWxsKVtdID0gW107XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuc291cmNlc0NvbnRlbnQua2V5cygpKS5mb3JFYWNoKCh1cmw6IHN0cmluZywgaTogbnVtYmVyKSA9PiB7XG4gICAgICBzb3VyY2VzSW5kZXguc2V0KHVybCwgaSk7XG4gICAgICBzb3VyY2VzLnB1c2godXJsKTtcbiAgICAgIHNvdXJjZXNDb250ZW50LnB1c2godGhpcy5zb3VyY2VzQ29udGVudC5nZXQodXJsKSB8fCBudWxsKTtcbiAgICB9KTtcblxuICAgIGxldCBtYXBwaW5nczogc3RyaW5nID0gJyc7XG4gICAgbGV0IGxhc3RDb2wwOiBudW1iZXIgPSAwO1xuICAgIGxldCBsYXN0U291cmNlSW5kZXg6IG51bWJlciA9IDA7XG4gICAgbGV0IGxhc3RTb3VyY2VMaW5lMDogbnVtYmVyID0gMDtcbiAgICBsZXQgbGFzdFNvdXJjZUNvbDA6IG51bWJlciA9IDA7XG5cbiAgICB0aGlzLmxpbmVzLmZvckVhY2goc2VnbWVudHMgPT4ge1xuICAgICAgbGFzdENvbDAgPSAwO1xuXG4gICAgICBtYXBwaW5ncyArPSBzZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICAgIC5tYXAoc2VnbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6ZXJvLWJhc2VkIHN0YXJ0aW5nIGNvbHVtbiBvZiB0aGUgbGluZSBpbiB0aGUgZ2VuZXJhdGVkIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWdBc1N0ciA9IHRvQmFzZTY0VkxRKHNlZ21lbnQuY29sMCAtIGxhc3RDb2wwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RDb2wwID0gc2VnbWVudC5jb2wwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VnbWVudC5zb3VyY2VVcmwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6ZXJvLWJhc2VkIGluZGV4IGludG8gdGhlIOKAnHNvdXJjZXPigJ0gbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdBc1N0ciArPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9CYXNlNjRWTFEoc291cmNlc0luZGV4LmdldChzZWdtZW50LnNvdXJjZVVybCkgISAtIGxhc3RTb3VyY2VJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTb3VyY2VJbmRleCA9IHNvdXJjZXNJbmRleC5nZXQoc2VnbWVudC5zb3VyY2VVcmwpICE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSB6ZXJvLWJhc2VkIHN0YXJ0aW5nIGxpbmUgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdBc1N0ciArPSB0b0Jhc2U2NFZMUShzZWdtZW50LnNvdXJjZUxpbmUwICEgLSBsYXN0U291cmNlTGluZTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U291cmNlTGluZTAgPSBzZWdtZW50LnNvdXJjZUxpbmUwICE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSB6ZXJvLWJhc2VkIHN0YXJ0aW5nIGNvbHVtbiBpbiB0aGUgb3JpZ2luYWwgc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ0FzU3RyICs9IHRvQmFzZTY0VkxRKHNlZ21lbnQuc291cmNlQ29sMCAhIC0gbGFzdFNvdXJjZUNvbDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U291cmNlQ29sMCA9IHNlZ21lbnQuc291cmNlQ29sMCAhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VnQXNTdHI7XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuam9pbignLCcpO1xuICAgICAgbWFwcGluZ3MgKz0gJzsnO1xuICAgIH0pO1xuXG4gICAgbWFwcGluZ3MgPSBtYXBwaW5ncy5zbGljZSgwLCAtMSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgJ2ZpbGUnOiB0aGlzLmZpbGUgfHwgJycsXG4gICAgICAndmVyc2lvbic6IFZFUlNJT04sXG4gICAgICAnc291cmNlUm9vdCc6ICcnLFxuICAgICAgJ3NvdXJjZXMnOiBzb3VyY2VzLFxuICAgICAgJ3NvdXJjZXNDb250ZW50Jzogc291cmNlc0NvbnRlbnQsXG4gICAgICAnbWFwcGluZ3MnOiBtYXBwaW5ncyxcbiAgICB9O1xuICB9XG5cbiAgdG9Kc0NvbW1lbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5oYXNNYXBwaW5ncyA/ICcvLycgKyBKU19CNjRfUFJFRklYICsgdG9CYXNlNjRTdHJpbmcoSlNPTi5zdHJpbmdpZnkodGhpcywgbnVsbCwgMCkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0Jhc2U2NFN0cmluZyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IGI2NCA9ICcnO1xuICB2YWx1ZSA9IHV0ZjhFbmNvZGUodmFsdWUpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDspIHtcbiAgICBjb25zdCBpMSA9IHZhbHVlLmNoYXJDb2RlQXQoaSsrKTtcbiAgICBjb25zdCBpMiA9IHZhbHVlLmNoYXJDb2RlQXQoaSsrKTtcbiAgICBjb25zdCBpMyA9IHZhbHVlLmNoYXJDb2RlQXQoaSsrKTtcbiAgICBiNjQgKz0gdG9CYXNlNjREaWdpdChpMSA+PiAyKTtcbiAgICBiNjQgKz0gdG9CYXNlNjREaWdpdCgoKGkxICYgMykgPDwgNCkgfCAoaXNOYU4oaTIpID8gMCA6IGkyID4+IDQpKTtcbiAgICBiNjQgKz0gaXNOYU4oaTIpID8gJz0nIDogdG9CYXNlNjREaWdpdCgoKGkyICYgMTUpIDw8IDIpIHwgKGkzID4+IDYpKTtcbiAgICBiNjQgKz0gaXNOYU4oaTIpIHx8IGlzTmFOKGkzKSA/ICc9JyA6IHRvQmFzZTY0RGlnaXQoaTMgJiA2Myk7XG4gIH1cblxuICByZXR1cm4gYjY0O1xufVxuXG5mdW5jdGlvbiB0b0Jhc2U2NFZMUSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgdmFsdWUgPSB2YWx1ZSA8IDAgPyAoKC12YWx1ZSkgPDwgMSkgKyAxIDogdmFsdWUgPDwgMTtcblxuICBsZXQgb3V0ID0gJyc7XG4gIGRvIHtcbiAgICBsZXQgZGlnaXQgPSB2YWx1ZSAmIDMxO1xuICAgIHZhbHVlID0gdmFsdWUgPj4gNTtcbiAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICBkaWdpdCA9IGRpZ2l0IHwgMzI7XG4gICAgfVxuICAgIG91dCArPSB0b0Jhc2U2NERpZ2l0KGRpZ2l0KTtcbiAgfSB3aGlsZSAodmFsdWUgPiAwKTtcblxuICByZXR1cm4gb3V0O1xufVxuXG5jb25zdCBCNjRfRElHSVRTID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG5mdW5jdGlvbiB0b0Jhc2U2NERpZ2l0KHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID49IDY0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gb25seSBlbmNvZGUgdmFsdWUgaW4gdGhlIHJhbmdlIFswLCA2M11gKTtcbiAgfVxuXG4gIHJldHVybiBCNjRfRElHSVRTW3ZhbHVlXTtcbn1cbiJdfQ==