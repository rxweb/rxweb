/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
/**
 * Immutable set of Http headers, with lazy parsing.
 *
 */
var HttpHeaders = /** @class */ (function () {
    function HttpHeaders(headers) {
        var _this = this;
        /**
         * Internal map of lowercased header names to the normalized
         * form of the name (the form seen first).
         */
        this.normalizedNames = new Map();
        /**
         * Queued updates to be materialized the next initialization.
         */
        this.lazyUpdate = null;
        if (!headers) {
            this.headers = new Map();
        }
        else if (typeof headers === 'string') {
            this.lazyInit = function () {
                _this.headers = new Map();
                headers.split('\n').forEach(function (line) {
                    var index = line.indexOf(':');
                    if (index > 0) {
                        var name_1 = line.slice(0, index);
                        var key = name_1.toLowerCase();
                        var value = line.slice(index + 1).trim();
                        _this.maybeSetNormalizedName(name_1, key);
                        if (_this.headers.has(key)) {
                            _this.headers.get(key).push(value);
                        }
                        else {
                            _this.headers.set(key, [value]);
                        }
                    }
                });
            };
        }
        else {
            this.lazyInit = function () {
                _this.headers = new Map();
                Object.keys(headers).forEach(function (name) {
                    var values = headers[name];
                    var key = name.toLowerCase();
                    if (typeof values === 'string') {
                        values = [values];
                    }
                    if (values.length > 0) {
                        _this.headers.set(key, values);
                        _this.maybeSetNormalizedName(name, key);
                    }
                });
            };
        }
    }
    /**
     * Checks for existence of header by given name.
     */
    HttpHeaders.prototype.has = function (name) {
        this.init();
        return this.headers.has(name.toLowerCase());
    };
    /**
     * Returns first header that matches given name.
     */
    HttpHeaders.prototype.get = function (name) {
        this.init();
        var values = this.headers.get(name.toLowerCase());
        return values && values.length > 0 ? values[0] : null;
    };
    /**
     * Returns the names of the headers
     */
    HttpHeaders.prototype.keys = function () {
        this.init();
        return Array.from(this.normalizedNames.values());
    };
    /**
     * Returns list of header values for a given name.
     */
    HttpHeaders.prototype.getAll = function (name) {
        this.init();
        return this.headers.get(name.toLowerCase()) || null;
    };
    HttpHeaders.prototype.append = function (name, value) {
        return this.clone({ name: name, value: value, op: 'a' });
    };
    HttpHeaders.prototype.set = function (name, value) {
        return this.clone({ name: name, value: value, op: 's' });
    };
    HttpHeaders.prototype.delete = function (name, value) {
        return this.clone({ name: name, value: value, op: 'd' });
    };
    HttpHeaders.prototype.maybeSetNormalizedName = function (name, lcName) {
        if (!this.normalizedNames.has(lcName)) {
            this.normalizedNames.set(lcName, name);
        }
    };
    HttpHeaders.prototype.init = function () {
        var _this = this;
        if (!!this.lazyInit) {
            if (this.lazyInit instanceof HttpHeaders) {
                this.copyFrom(this.lazyInit);
            }
            else {
                this.lazyInit();
            }
            this.lazyInit = null;
            if (!!this.lazyUpdate) {
                this.lazyUpdate.forEach(function (update) { return _this.applyUpdate(update); });
                this.lazyUpdate = null;
            }
        }
    };
    HttpHeaders.prototype.copyFrom = function (other) {
        var _this = this;
        other.init();
        Array.from(other.headers.keys()).forEach(function (key) {
            _this.headers.set(key, other.headers.get(key));
            _this.normalizedNames.set(key, other.normalizedNames.get(key));
        });
    };
    HttpHeaders.prototype.clone = function (update) {
        var clone = new HttpHeaders();
        clone.lazyInit =
            (!!this.lazyInit && this.lazyInit instanceof HttpHeaders) ? this.lazyInit : this;
        clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
        return clone;
    };
    HttpHeaders.prototype.applyUpdate = function (update) {
        var key = update.name.toLowerCase();
        switch (update.op) {
            case 'a':
            case 's':
                var value = update.value;
                if (typeof value === 'string') {
                    value = [value];
                }
                if (value.length === 0) {
                    return;
                }
                this.maybeSetNormalizedName(update.name, key);
                var base = (update.op === 'a' ? this.headers.get(key) : undefined) || [];
                base.push.apply(base, tslib_1.__spread(value));
                this.headers.set(key, base);
                break;
            case 'd':
                var toDelete_1 = update.value;
                if (!toDelete_1) {
                    this.headers.delete(key);
                    this.normalizedNames.delete(key);
                }
                else {
                    var existing = this.headers.get(key);
                    if (!existing) {
                        return;
                    }
                    existing = existing.filter(function (value) { return toDelete_1.indexOf(value) === -1; });
                    if (existing.length === 0) {
                        this.headers.delete(key);
                        this.normalizedNames.delete(key);
                    }
                    else {
                        this.headers.set(key, existing);
                    }
                }
                break;
        }
    };
    /**
     * @internal
     */
    HttpHeaders.prototype.forEach = function (fn) {
        var _this = this;
        this.init();
        Array.from(this.normalizedNames.keys())
            .forEach(function (key) { return fn(_this.normalizedNames.get(key), _this.headers.get(key)); });
    };
    return HttpHeaders;
}());
export { HttpHeaders };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy9oZWFkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFRSDs7O0dBR0c7QUFDSDtJQXlCRSxxQkFBWSxPQUFvRDtRQUFoRSxpQkFxQ0M7UUF0REQ7OztXQUdHO1FBQ0ssb0JBQWUsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQVF6RDs7V0FFRztRQUNLLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBR3ZDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1NBQzVDO2FBQU0sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDZCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO2dCQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7b0JBQzlCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTt3QkFDYixJQUFNLE1BQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDbEMsSUFBTSxHQUFHLEdBQUcsTUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDM0MsS0FBSSxDQUFDLHNCQUFzQixDQUFDLE1BQUksRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDdkMs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ZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDbEM7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUNqQztpQkFDRjtnQkFDRCxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCw2QkFBTyxHQUFQLFVBQVEsRUFBNEM7UUFBcEQsaUJBSUM7UUFIQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbEMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsRUFBRSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRyxDQUFDLEVBQTVELENBQTRELENBQUMsQ0FBQztJQUNwRixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBck1ELElBcU1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbnRlcmZhY2UgVXBkYXRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB2YWx1ZT86IHN0cmluZ3xzdHJpbmdbXTtcbiAgb3A6ICdhJ3wncyd8J2QnO1xufVxuXG4vKipcbiAqIEltbXV0YWJsZSBzZXQgb2YgSHR0cCBoZWFkZXJzLCB3aXRoIGxhenkgcGFyc2luZy5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwSGVhZGVycyB7XG4gIC8qKlxuICAgKiBJbnRlcm5hbCBtYXAgb2YgbG93ZXJjYXNlIGhlYWRlciBuYW1lcyB0byB2YWx1ZXMuXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBoZWFkZXJzICE6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcblxuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBtYXAgb2YgbG93ZXJjYXNlZCBoZWFkZXIgbmFtZXMgdG8gdGhlIG5vcm1hbGl6ZWRcbiAgICogZm9ybSBvZiB0aGUgbmFtZSAodGhlIGZvcm0gc2VlbiBmaXJzdCkuXG4gICAqL1xuICBwcml2YXRlIG5vcm1hbGl6ZWROYW1lczogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuICAvKipcbiAgICogQ29tcGxldGUgdGhlIGxhenkgaW5pdGlhbGl6YXRpb24gb2YgdGhpcyBvYmplY3QgKG5lZWRlZCBiZWZvcmUgcmVhZGluZykuXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBsYXp5SW5pdCAhOiBIdHRwSGVhZGVycyB8IEZ1bmN0aW9uIHwgbnVsbDtcblxuICAvKipcbiAgICogUXVldWVkIHVwZGF0ZXMgdG8gYmUgbWF0ZXJpYWxpemVkIHRoZSBuZXh0IGluaXRpYWxpemF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBsYXp5VXBkYXRlOiBVcGRhdGVbXXxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihoZWFkZXJzPzogc3RyaW5nfHtbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW119KSB7XG4gICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaGVhZGVycyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMubGF6eUluaXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcbiAgICAgICAgaGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBsaW5lLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbGluZS5zbGljZShpbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgICAgIHRoaXMubWF5YmVTZXROb3JtYWxpemVkTmFtZShuYW1lLCBrZXkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVhZGVycy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICB0aGlzLmhlYWRlcnMuZ2V0KGtleSkgIS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoa2V5LCBbdmFsdWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sYXp5SW5pdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICAgICAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgIGxldCB2YWx1ZXM6IHN0cmluZ3xzdHJpbmdbXSA9IGhlYWRlcnNbbmFtZV07XG4gICAgICAgICAgY29uc3Qga2V5ID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFsdWVzID0gW3ZhbHVlc107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzLnNldChrZXksIHZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLm1heWJlU2V0Tm9ybWFsaXplZE5hbWUobmFtZSwga2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGZvciBleGlzdGVuY2Ugb2YgaGVhZGVyIGJ5IGdpdmVuIG5hbWUuXG4gICAqL1xuICBoYXMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gdGhpcy5oZWFkZXJzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZmlyc3QgaGVhZGVyIHRoYXQgbWF0Y2hlcyBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZ2V0KG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICB0aGlzLmluaXQoKTtcblxuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuaGVhZGVycy5nZXQobmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gdmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPiAwID8gdmFsdWVzWzBdIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lcyBvZiB0aGUgaGVhZGVyc1xuICAgKi9cbiAga2V5cygpOiBzdHJpbmdbXSB7XG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLm5vcm1hbGl6ZWROYW1lcy52YWx1ZXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsaXN0IG9mIGhlYWRlciB2YWx1ZXMgZm9yIGEgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldEFsbChuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXXxudWxsIHtcbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHJldHVybiB0aGlzLmhlYWRlcnMuZ2V0KG5hbWUudG9Mb3dlckNhc2UoKSkgfHwgbnVsbDtcbiAgfVxuXG4gIGFwcGVuZChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8c3RyaW5nW10pOiBIdHRwSGVhZGVycyB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoe25hbWUsIHZhbHVlLCBvcDogJ2EnfSk7XG4gIH1cblxuICBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfHN0cmluZ1tdKTogSHR0cEhlYWRlcnMge1xuICAgIHJldHVybiB0aGlzLmNsb25lKHtuYW1lLCB2YWx1ZSwgb3A6ICdzJ30pO1xuICB9XG5cbiAgZGVsZXRlIChuYW1lOiBzdHJpbmcsIHZhbHVlPzogc3RyaW5nfHN0cmluZ1tdKTogSHR0cEhlYWRlcnMge1xuICAgIHJldHVybiB0aGlzLmNsb25lKHtuYW1lLCB2YWx1ZSwgb3A6ICdkJ30pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXliZVNldE5vcm1hbGl6ZWROYW1lKG5hbWU6IHN0cmluZywgbGNOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubm9ybWFsaXplZE5hbWVzLmhhcyhsY05hbWUpKSB7XG4gICAgICB0aGlzLm5vcm1hbGl6ZWROYW1lcy5zZXQobGNOYW1lLCBuYW1lKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgaWYgKCEhdGhpcy5sYXp5SW5pdCkge1xuICAgICAgaWYgKHRoaXMubGF6eUluaXQgaW5zdGFuY2VvZiBIdHRwSGVhZGVycykge1xuICAgICAgICB0aGlzLmNvcHlGcm9tKHRoaXMubGF6eUluaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sYXp5SW5pdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXp5SW5pdCA9IG51bGw7XG4gICAgICBpZiAoISF0aGlzLmxhenlVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5sYXp5VXBkYXRlLmZvckVhY2godXBkYXRlID0+IHRoaXMuYXBwbHlVcGRhdGUodXBkYXRlKSk7XG4gICAgICAgIHRoaXMubGF6eVVwZGF0ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb3B5RnJvbShvdGhlcjogSHR0cEhlYWRlcnMpIHtcbiAgICBvdGhlci5pbml0KCk7XG4gICAgQXJyYXkuZnJvbShvdGhlci5oZWFkZXJzLmtleXMoKSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5oZWFkZXJzLnNldChrZXksIG90aGVyLmhlYWRlcnMuZ2V0KGtleSkgISk7XG4gICAgICB0aGlzLm5vcm1hbGl6ZWROYW1lcy5zZXQoa2V5LCBvdGhlci5ub3JtYWxpemVkTmFtZXMuZ2V0KGtleSkgISk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsb25lKHVwZGF0ZTogVXBkYXRlKTogSHR0cEhlYWRlcnMge1xuICAgIGNvbnN0IGNsb25lID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgY2xvbmUubGF6eUluaXQgPVxuICAgICAgICAoISF0aGlzLmxhenlJbml0ICYmIHRoaXMubGF6eUluaXQgaW5zdGFuY2VvZiBIdHRwSGVhZGVycykgPyB0aGlzLmxhenlJbml0IDogdGhpcztcbiAgICBjbG9uZS5sYXp5VXBkYXRlID0gKHRoaXMubGF6eVVwZGF0ZSB8fCBbXSkuY29uY2F0KFt1cGRhdGVdKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5VXBkYXRlKHVwZGF0ZTogVXBkYXRlKTogdm9pZCB7XG4gICAgY29uc3Qga2V5ID0gdXBkYXRlLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBzd2l0Y2ggKHVwZGF0ZS5vcCkge1xuICAgICAgY2FzZSAnYSc6XG4gICAgICBjYXNlICdzJzpcbiAgICAgICAgbGV0IHZhbHVlID0gdXBkYXRlLnZhbHVlICE7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXliZVNldE5vcm1hbGl6ZWROYW1lKHVwZGF0ZS5uYW1lLCBrZXkpO1xuICAgICAgICBjb25zdCBiYXNlID0gKHVwZGF0ZS5vcCA9PT0gJ2EnID8gdGhpcy5oZWFkZXJzLmdldChrZXkpIDogdW5kZWZpbmVkKSB8fCBbXTtcbiAgICAgICAgYmFzZS5wdXNoKC4uLnZhbHVlKTtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldChrZXksIGJhc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICBjb25zdCB0b0RlbGV0ZSA9IHVwZGF0ZS52YWx1ZSBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdG9EZWxldGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgdGhpcy5ub3JtYWxpemVkTmFtZXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGV4aXN0aW5nID0gdGhpcy5oZWFkZXJzLmdldChrZXkpO1xuICAgICAgICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXhpc3RpbmcgPSBleGlzdGluZy5maWx0ZXIodmFsdWUgPT4gdG9EZWxldGUuaW5kZXhPZih2YWx1ZSkgPT09IC0xKTtcbiAgICAgICAgICBpZiAoZXhpc3RpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB0aGlzLm5vcm1hbGl6ZWROYW1lcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzLnNldChrZXksIGV4aXN0aW5nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZm9yRWFjaChmbjogKG5hbWU6IHN0cmluZywgdmFsdWVzOiBzdHJpbmdbXSkgPT4gdm9pZCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIEFycmF5LmZyb20odGhpcy5ub3JtYWxpemVkTmFtZXMua2V5cygpKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4gZm4odGhpcy5ub3JtYWxpemVkTmFtZXMuZ2V0KGtleSkgISwgdGhpcy5oZWFkZXJzLmdldChrZXkpICEpKTtcbiAgfVxufVxuIl19