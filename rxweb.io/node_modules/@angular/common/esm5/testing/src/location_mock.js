/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter, Injectable } from '@angular/core';
/**
 * A spy for {@link Location} that allows tests to fire simulated location events.
 *
 * @experimental
 */
var SpyLocation = /** @class */ (function () {
    function SpyLocation() {
        this.urlChanges = [];
        this._history = [new LocationState('', '', null)];
        this._historyIndex = 0;
        /** @internal */
        this._subject = new EventEmitter();
        /** @internal */
        this._baseHref = '';
        /** @internal */
        this._platformStrategy = null;
    }
    SpyLocation.prototype.setInitialPath = function (url) { this._history[this._historyIndex].path = url; };
    SpyLocation.prototype.setBaseHref = function (url) { this._baseHref = url; };
    SpyLocation.prototype.path = function () { return this._history[this._historyIndex].path; };
    SpyLocation.prototype.state = function () { return this._history[this._historyIndex].state; };
    SpyLocation.prototype.isCurrentPathEqualTo = function (path, query) {
        if (query === void 0) { query = ''; }
        var givenPath = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
        var currPath = this.path().endsWith('/') ? this.path().substring(0, this.path().length - 1) : this.path();
        return currPath == givenPath + (query.length > 0 ? ('?' + query) : '');
    };
    SpyLocation.prototype.simulateUrlPop = function (pathname) {
        this._subject.emit({ 'url': pathname, 'pop': true, 'type': 'popstate' });
    };
    SpyLocation.prototype.simulateHashChange = function (pathname) {
        // Because we don't prevent the native event, the browser will independently update the path
        this.setInitialPath(pathname);
        this.urlChanges.push('hash: ' + pathname);
        this._subject.emit({ 'url': pathname, 'pop': true, 'type': 'hashchange' });
    };
    SpyLocation.prototype.prepareExternalUrl = function (url) {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this._baseHref + url;
    };
    SpyLocation.prototype.go = function (path, query, state) {
        if (query === void 0) { query = ''; }
        if (state === void 0) { state = null; }
        path = this.prepareExternalUrl(path);
        if (this._historyIndex > 0) {
            this._history.splice(this._historyIndex + 1);
        }
        this._history.push(new LocationState(path, query, state));
        this._historyIndex = this._history.length - 1;
        var locationState = this._history[this._historyIndex - 1];
        if (locationState.path == path && locationState.query == query) {
            return;
        }
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push(url);
        this._subject.emit({ 'url': url, 'pop': false });
    };
    SpyLocation.prototype.replaceState = function (path, query, state) {
        if (query === void 0) { query = ''; }
        if (state === void 0) { state = null; }
        path = this.prepareExternalUrl(path);
        var history = this._history[this._historyIndex];
        if (history.path == path && history.query == query) {
            return;
        }
        history.path = path;
        history.query = query;
        history.state = state;
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push('replace: ' + url);
    };
    SpyLocation.prototype.forward = function () {
        if (this._historyIndex < (this._history.length - 1)) {
            this._historyIndex++;
            this._subject.emit({ 'url': this.path(), 'state': this.state(), 'pop': true });
        }
    };
    SpyLocation.prototype.back = function () {
        if (this._historyIndex > 0) {
            this._historyIndex--;
            this._subject.emit({ 'url': this.path(), 'state': this.state(), 'pop': true });
        }
    };
    SpyLocation.prototype.subscribe = function (onNext, onThrow, onReturn) {
        return this._subject.subscribe({ next: onNext, error: onThrow, complete: onReturn });
    };
    SpyLocation.prototype.normalize = function (url) { return null; };
    SpyLocation.decorators = [
        { type: Injectable }
    ];
    return SpyLocation;
}());
export { SpyLocation };
var LocationState = /** @class */ (function () {
    function LocationState(path, query, state) {
        this.path = path;
        this.query = query;
        this.state = state;
    }
    return LocationState;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fbW9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi90ZXN0aW5nL3NyYy9sb2NhdGlvbl9tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSXZEOzs7O0dBSUc7QUFDSDtJQUFBO1FBRUUsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQW9CLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQ2xDLGdCQUFnQjtRQUNoQixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsZ0JBQWdCO1FBQ2hCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsZ0JBQWdCO1FBQ2hCLHNCQUFpQixHQUFxQixJQUFNLENBQUM7SUE0Ri9DLENBQUM7SUExRkMsb0NBQWMsR0FBZCxVQUFlLEdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUU3RSxpQ0FBVyxHQUFYLFVBQVksR0FBVyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVsRCwwQkFBSSxHQUFKLGNBQWlCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV6RCwyQkFBSyxHQUFiLGNBQTBCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUUz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QUFDO0lBQzlFLG9CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb24sIExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbkxpa2V9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogQSBzcHkgZm9yIHtAbGluayBMb2NhdGlvbn0gdGhhdCBhbGxvd3MgdGVzdHMgdG8gZmlyZSBzaW11bGF0ZWQgbG9jYXRpb24gZXZlbnRzLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNweUxvY2F0aW9uIGltcGxlbWVudHMgTG9jYXRpb24ge1xuICB1cmxDaGFuZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIF9oaXN0b3J5OiBMb2NhdGlvblN0YXRlW10gPSBbbmV3IExvY2F0aW9uU3RhdGUoJycsICcnLCBudWxsKV07XG4gIHByaXZhdGUgX2hpc3RvcnlJbmRleDogbnVtYmVyID0gMDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3ViamVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Jhc2VIcmVmOiBzdHJpbmcgPSAnJztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGxhdGZvcm1TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSA9IG51bGwgITtcblxuICBzZXRJbml0aWFsUGF0aCh1cmw6IHN0cmluZykgeyB0aGlzLl9oaXN0b3J5W3RoaXMuX2hpc3RvcnlJbmRleF0ucGF0aCA9IHVybDsgfVxuXG4gIHNldEJhc2VIcmVmKHVybDogc3RyaW5nKSB7IHRoaXMuX2Jhc2VIcmVmID0gdXJsOyB9XG5cbiAgcGF0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faGlzdG9yeVt0aGlzLl9oaXN0b3J5SW5kZXhdLnBhdGg7IH1cblxuICBwcml2YXRlIHN0YXRlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9oaXN0b3J5W3RoaXMuX2hpc3RvcnlJbmRleF0uc3RhdGU7IH1cblxuICBpc0N1cnJlbnRQYXRoRXF1YWxUbyhwYXRoOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcgPSAnJyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGdpdmVuUGF0aCA9IHBhdGguZW5kc1dpdGgoJy8nKSA/IHBhdGguc3Vic3RyaW5nKDAsIHBhdGgubGVuZ3RoIC0gMSkgOiBwYXRoO1xuICAgIGNvbnN0IGN1cnJQYXRoID1cbiAgICAgICAgdGhpcy5wYXRoKCkuZW5kc1dpdGgoJy8nKSA/IHRoaXMucGF0aCgpLnN1YnN0cmluZygwLCB0aGlzLnBhdGgoKS5sZW5ndGggLSAxKSA6IHRoaXMucGF0aCgpO1xuXG4gICAgcmV0dXJuIGN1cnJQYXRoID09IGdpdmVuUGF0aCArIChxdWVyeS5sZW5ndGggPiAwID8gKCc/JyArIHF1ZXJ5KSA6ICcnKTtcbiAgfVxuXG4gIHNpbXVsYXRlVXJsUG9wKHBhdGhuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdWJqZWN0LmVtaXQoeyd1cmwnOiBwYXRobmFtZSwgJ3BvcCc6IHRydWUsICd0eXBlJzogJ3BvcHN0YXRlJ30pO1xuICB9XG5cbiAgc2ltdWxhdGVIYXNoQ2hhbmdlKHBhdGhuYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBCZWNhdXNlIHdlIGRvbid0IHByZXZlbnQgdGhlIG5hdGl2ZSBldmVudCwgdGhlIGJyb3dzZXIgd2lsbCBpbmRlcGVuZGVudGx5IHVwZGF0ZSB0aGUgcGF0aFxuICAgIHRoaXMuc2V0SW5pdGlhbFBhdGgocGF0aG5hbWUpO1xuICAgIHRoaXMudXJsQ2hhbmdlcy5wdXNoKCdoYXNoOiAnICsgcGF0aG5hbWUpO1xuICAgIHRoaXMuX3N1YmplY3QuZW1pdCh7J3VybCc6IHBhdGhuYW1lLCAncG9wJzogdHJ1ZSwgJ3R5cGUnOiAnaGFzaGNoYW5nZSd9KTtcbiAgfVxuXG4gIHByZXBhcmVFeHRlcm5hbFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHVybC5sZW5ndGggPiAwICYmICF1cmwuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICB1cmwgPSAnLycgKyB1cmw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9iYXNlSHJlZiArIHVybDtcbiAgfVxuXG4gIGdvKHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyA9ICcnLCBzdGF0ZTogYW55ID0gbnVsbCkge1xuICAgIHBhdGggPSB0aGlzLnByZXBhcmVFeHRlcm5hbFVybChwYXRoKTtcblxuICAgIGlmICh0aGlzLl9oaXN0b3J5SW5kZXggPiAwKSB7XG4gICAgICB0aGlzLl9oaXN0b3J5LnNwbGljZSh0aGlzLl9oaXN0b3J5SW5kZXggKyAxKTtcbiAgICB9XG4gICAgdGhpcy5faGlzdG9yeS5wdXNoKG5ldyBMb2NhdGlvblN0YXRlKHBhdGgsIHF1ZXJ5LCBzdGF0ZSkpO1xuICAgIHRoaXMuX2hpc3RvcnlJbmRleCA9IHRoaXMuX2hpc3RvcnkubGVuZ3RoIC0gMTtcblxuICAgIGNvbnN0IGxvY2F0aW9uU3RhdGUgPSB0aGlzLl9oaXN0b3J5W3RoaXMuX2hpc3RvcnlJbmRleCAtIDFdO1xuICAgIGlmIChsb2NhdGlvblN0YXRlLnBhdGggPT0gcGF0aCAmJiBsb2NhdGlvblN0YXRlLnF1ZXJ5ID09IHF1ZXJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXJsID0gcGF0aCArIChxdWVyeS5sZW5ndGggPiAwID8gKCc/JyArIHF1ZXJ5KSA6ICcnKTtcbiAgICB0aGlzLnVybENoYW5nZXMucHVzaCh1cmwpO1xuICAgIHRoaXMuX3N1YmplY3QuZW1pdCh7J3VybCc6IHVybCwgJ3BvcCc6IGZhbHNlfSk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUocGF0aDogc3RyaW5nLCBxdWVyeTogc3RyaW5nID0gJycsIHN0YXRlOiBhbnkgPSBudWxsKSB7XG4gICAgcGF0aCA9IHRoaXMucHJlcGFyZUV4dGVybmFsVXJsKHBhdGgpO1xuXG4gICAgY29uc3QgaGlzdG9yeSA9IHRoaXMuX2hpc3RvcnlbdGhpcy5faGlzdG9yeUluZGV4XTtcbiAgICBpZiAoaGlzdG9yeS5wYXRoID09IHBhdGggJiYgaGlzdG9yeS5xdWVyeSA9PSBxdWVyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhpc3RvcnkucGF0aCA9IHBhdGg7XG4gICAgaGlzdG9yeS5xdWVyeSA9IHF1ZXJ5O1xuICAgIGhpc3Rvcnkuc3RhdGUgPSBzdGF0ZTtcblxuICAgIGNvbnN0IHVybCA9IHBhdGggKyAocXVlcnkubGVuZ3RoID4gMCA/ICgnPycgKyBxdWVyeSkgOiAnJyk7XG4gICAgdGhpcy51cmxDaGFuZ2VzLnB1c2goJ3JlcGxhY2U6ICcgKyB1cmwpO1xuICB9XG5cbiAgZm9yd2FyZCgpIHtcbiAgICBpZiAodGhpcy5faGlzdG9yeUluZGV4IDwgKHRoaXMuX2hpc3RvcnkubGVuZ3RoIC0gMSkpIHtcbiAgICAgIHRoaXMuX2hpc3RvcnlJbmRleCsrO1xuICAgICAgdGhpcy5fc3ViamVjdC5lbWl0KHsndXJsJzogdGhpcy5wYXRoKCksICdzdGF0ZSc6IHRoaXMuc3RhdGUoKSwgJ3BvcCc6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBiYWNrKCkge1xuICAgIGlmICh0aGlzLl9oaXN0b3J5SW5kZXggPiAwKSB7XG4gICAgICB0aGlzLl9oaXN0b3J5SW5kZXgtLTtcbiAgICAgIHRoaXMuX3N1YmplY3QuZW1pdCh7J3VybCc6IHRoaXMucGF0aCgpLCAnc3RhdGUnOiB0aGlzLnN0YXRlKCksICdwb3AnOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgc3Vic2NyaWJlKFxuICAgICAgb25OZXh0OiAodmFsdWU6IGFueSkgPT4gdm9pZCwgb25UaHJvdz86ICgoZXJyb3I6IGFueSkgPT4gdm9pZCl8bnVsbCxcbiAgICAgIG9uUmV0dXJuPzogKCgpID0+IHZvaWQpfG51bGwpOiBTdWJzY3JpcHRpb25MaWtlIHtcbiAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5zdWJzY3JpYmUoe25leHQ6IG9uTmV4dCwgZXJyb3I6IG9uVGhyb3csIGNvbXBsZXRlOiBvblJldHVybn0pO1xuICB9XG5cbiAgbm9ybWFsaXplKHVybDogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIG51bGwgITsgfVxufVxuXG5jbGFzcyBMb2NhdGlvblN0YXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHBhdGg6IHN0cmluZywgcHVibGljIHF1ZXJ5OiBzdHJpbmcsIHB1YmxpYyBzdGF0ZTogYW55KSB7fVxufVxuIl19