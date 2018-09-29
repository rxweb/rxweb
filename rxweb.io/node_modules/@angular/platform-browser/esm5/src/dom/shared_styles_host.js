/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { getDOM } from './dom_adapter';
import { DOCUMENT } from './dom_tokens';
var SharedStylesHost = /** @class */ (function () {
    function SharedStylesHost() {
        /** @internal */
        this._stylesSet = new Set();
    }
    SharedStylesHost.prototype.addStyles = function (styles) {
        var _this = this;
        var additions = new Set();
        styles.forEach(function (style) {
            if (!_this._stylesSet.has(style)) {
                _this._stylesSet.add(style);
                additions.add(style);
            }
        });
        this.onStylesAdded(additions);
    };
    SharedStylesHost.prototype.onStylesAdded = function (additions) { };
    SharedStylesHost.prototype.getAllStyles = function () { return Array.from(this._stylesSet); };
    SharedStylesHost.decorators = [
        { type: Injectable }
    ];
    return SharedStylesHost;
}());
export { SharedStylesHost };
var DomSharedStylesHost = /** @class */ (function (_super) {
    tslib_1.__extends(DomSharedStylesHost, _super);
    function DomSharedStylesHost(_doc) {
        var _this = _super.call(this) || this;
        _this._doc = _doc;
        _this._hostNodes = new Set();
        _this._styleNodes = new Set();
        _this._hostNodes.add(_doc.head);
        return _this;
    }
    DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
        var _this = this;
        styles.forEach(function (style) {
            var styleEl = _this._doc.createElement('style');
            styleEl.textContent = style;
            _this._styleNodes.add(host.appendChild(styleEl));
        });
    };
    DomSharedStylesHost.prototype.addHost = function (hostNode) {
        this._addStylesToHost(this._stylesSet, hostNode);
        this._hostNodes.add(hostNode);
    };
    DomSharedStylesHost.prototype.removeHost = function (hostNode) { this._hostNodes.delete(hostNode); };
    DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        this._hostNodes.forEach(function (hostNode) { return _this._addStylesToHost(additions, hostNode); });
    };
    DomSharedStylesHost.prototype.ngOnDestroy = function () { this._styleNodes.forEach(function (styleNode) { return getDOM().remove(styleNode); }); };
    DomSharedStylesHost.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DomSharedStylesHost.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return DomSharedStylesHost;
}(SharedStylesHost));
export { DomSharedStylesHost };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDO0lBQUE7UUFFRSxnQkFBZ0I7UUFDTixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztJQWdCM0MsQ0FBQztJQWRDLG9DQUFTLEdBQVQsVUFBVSxNQUFnQjtRQUExQixpQkFTQztRQVJDLElBQU0sU0FBUyxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDbEIsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMvQixLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsd0NBQWEsR0FBYixVQUFjLFNBQXNCLElBQVMsQ0FBQztJQUU5Qyx1Q0FBWSxHQUFaLGNBQTJCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFsQmpFLFVBQVU7O0lBbUJYLHVCQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FsQlksZ0JBQWdCO0FBb0I3QjtJQUN5QywrQ0FBZ0I7SUFHdkQsNkJBQXNDLElBQVM7UUFBL0MsWUFDRSxpQkFBTyxTQUVSO1FBSHFDLFVBQUksR0FBSixJQUFJLENBQUs7UUFGdkMsZ0JBQVUsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1FBQzdCLGlCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUdwQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ2pDLENBQUM7SUFFTyw4Q0FBZ0IsR0FBeEIsVUFBeUIsTUFBbUIsRUFBRSxJQUFVO1FBQXhELGlCQU1DO1FBTEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWE7WUFDM0IsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDNUIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFPLEdBQVAsVUFBUSxRQUFjO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3Q0FBVSxHQUFWLFVBQVcsUUFBYyxJQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV0RSwyQ0FBYSxHQUFiLFVBQWMsU0FBc0I7UUFBcEMsaUJBRUM7UUFEQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQseUNBQVcsR0FBWCxjQUFzQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBNUIzRixVQUFVOzs7O2dEQUlJLE1BQU0sU0FBQyxRQUFROztJQXlCOUIsMEJBQUM7Q0FBQSxBQTdCRCxDQUN5QyxnQkFBZ0IsR0E0QnhEO1NBNUJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuL2RvbV90b2tlbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU3R5bGVzSG9zdCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIF9zdHlsZXNTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBhZGRTdHlsZXMoc3R5bGVzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IGFkZGl0aW9ucyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgIGlmICghdGhpcy5fc3R5bGVzU2V0LmhhcyhzdHlsZSkpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVzU2V0LmFkZChzdHlsZSk7XG4gICAgICAgIGFkZGl0aW9ucy5hZGQoc3R5bGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub25TdHlsZXNBZGRlZChhZGRpdGlvbnMpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KTogdm9pZCB7fVxuXG4gIGdldEFsbFN0eWxlcygpOiBzdHJpbmdbXSB7IHJldHVybiBBcnJheS5mcm9tKHRoaXMuX3N0eWxlc1NldCk7IH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNoYXJlZFN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfaG9zdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBwcml2YXRlIF9zdHlsZU5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faG9zdE5vZGVzLmFkZChfZG9jLmhlYWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU3R5bGVzVG9Ib3N0KHN0eWxlczogU2V0PHN0cmluZz4sIGhvc3Q6IE5vZGUpOiB2b2lkIHtcbiAgICBzdHlsZXMuZm9yRWFjaCgoc3R5bGU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgICAgdGhpcy5fc3R5bGVOb2Rlcy5hZGQoaG9zdC5hcHBlbmRDaGlsZChzdHlsZUVsKSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KHRoaXMuX3N0eWxlc1NldCwgaG9zdE5vZGUpO1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5hZGQoaG9zdE5vZGUpO1xuICB9XG5cbiAgcmVtb3ZlSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQgeyB0aGlzLl9ob3N0Tm9kZXMuZGVsZXRlKGhvc3ROb2RlKTsgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPik6IHZvaWQge1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5mb3JFYWNoKGhvc3ROb2RlID0+IHRoaXMuX2FkZFN0eWxlc1RvSG9zdChhZGRpdGlvbnMsIGhvc3ROb2RlKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5fc3R5bGVOb2Rlcy5mb3JFYWNoKHN0eWxlTm9kZSA9PiBnZXRET00oKS5yZW1vdmUoc3R5bGVOb2RlKSk7IH1cbn1cbiJdfQ==