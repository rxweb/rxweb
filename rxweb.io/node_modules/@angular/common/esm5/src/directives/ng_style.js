/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, KeyValueDiffers, Renderer2 } from '@angular/core';
/**
 * @ngModule CommonModule
 *
 * @usageNotes
 * ```
 * <some-element [ngStyle]="{'font-style': styleExp}">...</some-element>
 *
 * <some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
 *
 * <some-element [ngStyle]="objExp">...</some-element>
 * ```
 *
 * @description
 *
 * Update an HTML element styles.
 *
 * The styles are updated according to the value of the expression evaluation:
 * - keys are style names with an optional `.<unit>` suffix (ie 'top.px', 'font-style.em'),
 * - values are the values assigned to those properties (expressed in the given unit).
 *
 *
 */
var NgStyle = /** @class */ (function () {
    function NgStyle(_differs, _ngEl, _renderer) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    Object.defineProperty(NgStyle.prototype, "ngStyle", {
        set: function (values) {
            this._ngStyle = values;
            if (!this._differ && values) {
                this._differ = this._differs.find(values).create();
            }
        },
        enumerable: true,
        configurable: true
    });
    NgStyle.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._ngStyle);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    };
    NgStyle.prototype._applyChanges = function (changes) {
        var _this = this;
        changes.forEachRemovedItem(function (record) { return _this._setStyle(record.key, null); });
        changes.forEachAddedItem(function (record) { return _this._setStyle(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { return _this._setStyle(record.key, record.currentValue); });
    };
    NgStyle.prototype._setStyle = function (nameAndUnit, value) {
        var _a = tslib_1.__read(nameAndUnit.split('.'), 2), name = _a[0], unit = _a[1];
        value = value != null && unit ? "" + value + unit : value;
        if (value != null) {
            this._renderer.setStyle(this._ngEl.nativeElement, name, value);
        }
        else {
            this._renderer.removeStyle(this._ngEl.nativeElement, name);
        }
    };
    NgStyle.decorators = [
        { type: Directive, args: [{ selector: '[ngStyle]' },] }
    ];
    /** @nocollapse */
    NgStyle.ctorParameters = function () { return [
        { type: KeyValueDiffers },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    NgStyle.propDecorators = {
        ngStyle: [{ type: Input }]
    };
    return NgStyle;
}());
export { NgStyle };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfc3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmdfc3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQVcsVUFBVSxFQUFFLEtBQUssRUFBbUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0g7SUFPRSxpQkFDWSxRQUF5QixFQUFVLEtBQWlCLEVBQVUsU0FBb0I7UUFBbEYsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUFHLENBQUM7SUFFbEcsc0JBQ0ksNEJBQU87YUFEWCxVQUNZLE1BQStCO1lBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLE1BQU0sRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNwRDtRQUNILENBQUM7OztPQUFBO0lBRUQsMkJBQVMsR0FBVDtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM3QjtTQUNGO0lBQ0gsQ0FBQztJQUVPLCtCQUFhLEdBQXJCLFVBQXNCLE9BQStDO1FBQXJFLGlCQUlDO1FBSEMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7UUFDekUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO1FBQ3RGLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQS9DLENBQStDLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRU8sMkJBQVMsR0FBakIsVUFBa0IsV0FBbUIsRUFBRSxLQUFtQztRQUNsRSxJQUFBLDhDQUFxQyxFQUFwQyxZQUFJLEVBQUUsWUFBSSxDQUEyQjtRQUM1QyxLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUcsS0FBSyxHQUFHLElBQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRTFELElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBZSxDQUFDLENBQUM7U0FDMUU7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQzs7Z0JBMUNGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUM7Ozs7Z0JBeEI4QyxlQUFlO2dCQUFuRSxVQUFVO2dCQUEyRCxTQUFTOzs7MEJBa0N2RyxLQUFLOztJQWlDUixjQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0ExQ1ksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIElucHV0LCBLZXlWYWx1ZUNoYW5nZXMsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBgYGBcbiAqIDxzb21lLWVsZW1lbnQgW25nU3R5bGVdPVwieydmb250LXN0eWxlJzogc3R5bGVFeHB9XCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKlxuICogPHNvbWUtZWxlbWVudCBbbmdTdHlsZV09XCJ7J21heC13aWR0aC5weCc6IHdpZHRoRXhwfVwiPi4uLjwvc29tZS1lbGVtZW50PlxuICpcbiAqIDxzb21lLWVsZW1lbnQgW25nU3R5bGVdPVwib2JqRXhwXCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBVcGRhdGUgYW4gSFRNTCBlbGVtZW50IHN0eWxlcy5cbiAqXG4gKiBUaGUgc3R5bGVzIGFyZSB1cGRhdGVkIGFjY29yZGluZyB0byB0aGUgdmFsdWUgb2YgdGhlIGV4cHJlc3Npb24gZXZhbHVhdGlvbjpcbiAqIC0ga2V5cyBhcmUgc3R5bGUgbmFtZXMgd2l0aCBhbiBvcHRpb25hbCBgLjx1bml0PmAgc3VmZml4IChpZSAndG9wLnB4JywgJ2ZvbnQtc3R5bGUuZW0nKSxcbiAqIC0gdmFsdWVzIGFyZSB0aGUgdmFsdWVzIGFzc2lnbmVkIHRvIHRob3NlIHByb3BlcnRpZXMgKGV4cHJlc3NlZCBpbiB0aGUgZ2l2ZW4gdW5pdCkuXG4gKlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdTdHlsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ1N0eWxlIGltcGxlbWVudHMgRG9DaGVjayB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9uZ1N0eWxlICE6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfZGlmZmVyICE6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgc3RyaW5nfG51bWJlcj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9kaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsIHByaXZhdGUgX25nRWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgQElucHV0KClcbiAgc2V0IG5nU3R5bGUodmFsdWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkge1xuICAgIHRoaXMuX25nU3R5bGUgPSB2YWx1ZXM7XG4gICAgaWYgKCF0aGlzLl9kaWZmZXIgJiYgdmFsdWVzKSB7XG4gICAgICB0aGlzLl9kaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQodmFsdWVzKS5jcmVhdGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuX2RpZmZlcikge1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX25nU3R5bGUpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBzdHJpbmd8bnVtYmVyPik6IHZvaWQge1xuICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKChyZWNvcmQpID0+IHRoaXMuX3NldFN0eWxlKHJlY29yZC5rZXksIG51bGwpKTtcbiAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKHJlY29yZCkgPT4gdGhpcy5fc2V0U3R5bGUocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSkpO1xuICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKChyZWNvcmQpID0+IHRoaXMuX3NldFN0eWxlKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFN0eWxlKG5hbWVBbmRVbml0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8bnVtYmVyfG51bGx8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgY29uc3QgW25hbWUsIHVuaXRdID0gbmFtZUFuZFVuaXQuc3BsaXQoJy4nKTtcbiAgICB2YWx1ZSA9IHZhbHVlICE9IG51bGwgJiYgdW5pdCA/IGAke3ZhbHVlfSR7dW5pdH1gIDogdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCBuYW1lLCB2YWx1ZSBhcyBzdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsIG5hbWUpO1xuICAgIH1cbiAgfVxufVxuIl19