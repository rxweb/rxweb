/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * @record
 */
export function ISlimScrollOptions() { }
function ISlimScrollOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.position;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.barBackground;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.barOpacity;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.barWidth;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.barBorderRadius;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.barMargin;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.gridBackground;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.gridOpacity;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.gridWidth;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.gridBorderRadius;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.gridMargin;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.alwaysVisible;
    /** @type {?|undefined} */
    ISlimScrollOptions.prototype.visibleTimeout;
}
export var /** @type {?} */ SLIMSCROLL_DEFAULTS = new InjectionToken('NGX_SLIMSCROLL_DEFAULTS');
var SlimScrollOptions = /** @class */ (function () {
    function SlimScrollOptions(obj) {
        this.position = obj && obj.position ? obj.position : 'right';
        this.barBackground = obj && obj.barBackground ? obj.barBackground : '#343a40';
        this.barOpacity = obj && obj.barOpacity ? obj.barOpacity : '1';
        this.barWidth = obj && obj.barWidth ? obj.barWidth : '12';
        this.barBorderRadius = obj && obj.barBorderRadius ? obj.barBorderRadius : '5';
        this.barMargin = obj && obj.barMargin ? obj.barMargin : '1px 0';
        this.gridBackground = obj && obj.gridBackground ? obj.gridBackground : '#adb5bd';
        this.gridOpacity = obj && obj.gridOpacity ? obj.gridOpacity : '1';
        this.gridWidth = obj && obj.gridWidth ? obj.gridWidth : '8';
        this.gridBorderRadius = obj && obj.gridBorderRadius ? obj.gridBorderRadius : '10';
        this.gridMargin = obj && obj.gridMargin ? obj.gridMargin : '1px 2px';
        this.alwaysVisible = obj && typeof obj.alwaysVisible !== 'undefined' ? obj.alwaysVisible : true;
        this.visibleTimeout = obj && obj.visibleTimeout ? obj.visibleTimeout : 1000;
    }
    /**
     * @param {?=} obj
     * @return {?}
     */
    SlimScrollOptions.prototype.merge = /**
     * @param {?=} obj
     * @return {?}
     */
    function (obj) {
        var /** @type {?} */ result = new SlimScrollOptions();
        result.position = obj && obj.position ? obj.position : this.position;
        result.barBackground = obj && obj.barBackground ? obj.barBackground : this.barBackground;
        result.barOpacity = obj && obj.barOpacity ? obj.barOpacity : this.barOpacity;
        result.barWidth = obj && obj.barWidth ? obj.barWidth : this.barWidth;
        result.barBorderRadius = obj && obj.barBorderRadius ? obj.barBorderRadius : this.barBorderRadius;
        result.barMargin = obj && obj.barMargin ? obj.barMargin : this.barMargin;
        result.gridBackground = obj && obj.gridBackground ? obj.gridBackground : this.gridBackground;
        result.gridOpacity = obj && obj.gridOpacity ? obj.gridOpacity : this.gridBackground;
        result.gridWidth = obj && obj.gridWidth ? obj.gridWidth : this.gridWidth;
        result.gridBorderRadius = obj && obj.gridBorderRadius ? obj.gridBorderRadius : this.gridBorderRadius;
        result.gridMargin = obj && obj.gridMargin ? obj.gridMargin : this.gridMargin;
        result.alwaysVisible = obj && typeof obj.alwaysVisible !== 'undefined' ? obj.alwaysVisible : this.alwaysVisible;
        result.visibleTimeout = obj && obj.visibleTimeout ? obj.visibleTimeout : this.visibleTimeout;
        return result;
    };
    return SlimScrollOptions;
}());
export { SlimScrollOptions };
function SlimScrollOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    SlimScrollOptions.prototype.position;
    /** @type {?} */
    SlimScrollOptions.prototype.barBackground;
    /** @type {?} */
    SlimScrollOptions.prototype.barOpacity;
    /** @type {?} */
    SlimScrollOptions.prototype.barWidth;
    /** @type {?} */
    SlimScrollOptions.prototype.barBorderRadius;
    /** @type {?} */
    SlimScrollOptions.prototype.barMargin;
    /** @type {?} */
    SlimScrollOptions.prototype.gridBackground;
    /** @type {?} */
    SlimScrollOptions.prototype.gridOpacity;
    /** @type {?} */
    SlimScrollOptions.prototype.gridWidth;
    /** @type {?} */
    SlimScrollOptions.prototype.gridBorderRadius;
    /** @type {?} */
    SlimScrollOptions.prototype.gridMargin;
    /** @type {?} */
    SlimScrollOptions.prototype.alwaysVisible;
    /** @type {?} */
    SlimScrollOptions.prototype.visibleTimeout;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpbXNjcm9sbC1vcHRpb25zLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNsaW1zY3JvbGwvIiwic291cmNlcyI6WyJhcHAvbmd4LXNsaW1zY3JvbGwvY2xhc3Nlcy9zbGltc2Nyb2xsLW9wdGlvbnMuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCL0MsTUFBTSxDQUFDLHFCQUFNLG1CQUFtQixHQUMxQixJQUFJLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRXBELElBQUE7SUFlRSwyQkFBWSxHQUF3QjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDN0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzlFLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzlFLElBQUksQ0FBQyxTQUFT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LENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNwRixNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3pFLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNyRyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLGFBQWEsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDaEgsTUFBTSxDQUFDLGNBQWMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUU3RixNQUFNLENBQUMsTUFBTSxDQUFDOzs0QkF2RWxCO0lBeUVDLENBQUE7QUFsREQsNkJBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNsaW1TY3JvbGxPcHRpb25zIH0gZnJvbSAnLi9zbGltc2Nyb2xsLW9wdGlvbnMuY2xhc3MnO1xuaW1wb3J0IHsgSVNsaW1TY3JvbGxFdmVudCB9IGZyb20gJy4vc2xpbXNjcm9sbC1ldmVudC5jbGFzcyc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTbGltU2Nyb2xsT3B0aW9ucyB7XG4gIHBvc2l0aW9uPzogc3RyaW5nO1xuICBiYXJCYWNrZ3JvdW5kPzogc3RyaW5nO1xuICBiYXJPcGFjaXR5Pzogc3RyaW5nO1xuICBiYXJXaWR0aD86IHN0cmluZztcbiAgYmFyQm9yZGVyUmFkaXVzPzogc3RyaW5nO1xuICBiYXJNYXJnaW4/OiBzdHJpbmc7XG4gIGdyaWRCYWNrZ3JvdW5kPzogc3RyaW5nO1xuICBncmlkT3BhY2l0eT86IHN0cmluZztcbiAgZ3JpZFdpZHRoPzogc3RyaW5nO1xuICBncmlkQm9yZGVyUmFkaXVzPzogc3RyaW5nO1xuICBncmlkTWFyZ2luPzogc3RyaW5nO1xuICBhbHdheXNWaXNpYmxlPzogYm9vbGVhbjtcbiAgdmlzaWJsZVRpbWVvdXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBTTElNU0NST0xMX0RFRkFVTFRTOiBJbmplY3Rpb25Ub2tlbjxJU2xpbVNjcm9sbE9wdGlvbnM+XG4gICAgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ05HWF9TTElNU0NST0xMX0RFRkFVTFRTJyk7XG5cbmV4cG9ydCBjbGFzcyBTbGltU2Nyb2xsT3B0aW9ucyBpbXBsZW1lbnRzIElTbGltU2Nyb2xsT3B0aW9ucyB7XG4gIHBvc2l0aW9uPzogc3RyaW5nO1xuICBiYXJCYWNrZ3JvdW5kPzogc3RyaW5nO1xuICBiYXJPcGFjaXR5Pzogc3RyaW5nO1xuICBiYXJXaWR0aD86IHN0cmluZztcbiAgYmFyQm9yZGVyUmFkaXVzPzogc3RyaW5nO1xuICBiYXJNYXJnaW4/OiBzdHJpbmc7XG4gIGdyaWRCYWNrZ3JvdW5kPzogc3RyaW5nO1xuICBncmlkT3BhY2l0eT86IHN0cmluZztcbiAgZ3JpZFdpZHRoPzogc3RyaW5nO1xuICBncmlkQm9yZGVyUmFkaXVzPzogc3RyaW5nO1xuICBncmlkTWFyZ2luPzogc3RyaW5nO1xuICBhbHdheXNWaXNpYmxlPzogYm9vbGVhbjtcbiAgdmlzaWJsZVRpbWVvdXQ/OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3Iob2JqPzogSVNsaW1TY3JvbGxPcHRpb25zKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG9iaiAmJiBvYmoucG9zaXRpb24gPyBvYmoucG9zaXRpb24gOiAncmlnaHQnO1xuICAgIHRoaXMuYmFyQmFja2dyb3VuZCA9IG9iaiAmJiBvYmouYmFyQmFja2dyb3VuZCA/IG9iai5iYXJCYWNrZ3JvdW5kIDogJyMzNDNhNDAnO1xuICAgIHRoaXMuYmFyT3BhY2l0eSA9IG9iaiAmJiBvYmouYmFyT3BhY2l0eSA/IG9iai5iYXJPcGFjaXR5IDogJzEnO1xuICAgIHRoaXMuYmFyV2lkdGggPSBvYmogJiYgb2JqLmJhcldpZHRoID8gb2JqLmJhcldpZHRoIDogJzEyJztcbiAgICB0aGlzLmJhckJvcmRlclJhZGl1cyA9IG9iaiAmJiBvYmouYmFyQm9yZGVyUmFkaXVzID8gb2JqLmJhckJvcmRlclJhZGl1cyA6ICc1JztcbiAgICB0aGlzLmJhck1hcmdpbiA9IG9iaiAmJiBvYmouYmFyTWFyZ2luID8gb2JqLmJhck1hcmdpbiA6ICcxcHggMCc7XG4gICAgdGhpcy5ncmlkQmFja2dyb3VuZCA9IG9iaiAmJiBvYmouZ3JpZEJhY2tncm91bmQgPyBvYmouZ3JpZEJhY2tncm91bmQgOiAnI2FkYjViZCc7XG4gICAgdGhpcy5ncmlkT3BhY2l0eSA9IG9iaiAmJiBvYmouZ3JpZE9wYWNpdHkgPyBvYmouZ3JpZE9wYWNpdHkgOiAnMSc7XG4gICAgdGhpcy5ncmlkV2lkdGggPSBvYmogJiYgb2JqLmdyaWRXaWR0aCA/IG9iai5ncmlkV2lkdGggOiAnOCc7XG4gICAgdGhpcy5ncmlkQm9yZGVyUmFkaXVzID0gb2JqICYmIG9iai5ncmlkQm9yZGVyUmFkaXVzID8gb2JqLmdyaWRCb3JkZXJSYWRpdXMgOiAnMTAnO1xuICAgIHRoaXMuZ3JpZE1hcmdpbiA9IG9iaiAmJiBvYmouZ3JpZE1hcmdpbiA/IG9iai5ncmlkTWFyZ2luIDogJzFweCAycHgnO1xuICAgIHRoaXMuYWx3YXlzVmlzaWJsZSA9IG9iaiAmJiB0eXBlb2Ygb2JqLmFsd2F5c1Zpc2libGUgIT09ICd1bmRlZmluZWQnID8gb2JqLmFsd2F5c1Zpc2libGUgOiB0cnVlO1xuICAgIHRoaXMudmlzaWJsZVRpbWVvdXQgPSBvYmogJiYgb2JqLnZpc2libGVUaW1lb3V0ID8gb2JqLnZpc2libGVUaW1lb3V0IDogMTAwMDtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZShvYmo/OiBJU2xpbVNjcm9sbE9wdGlvbnMpOiBTbGltU2Nyb2xsT3B0aW9ucyB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFNsaW1TY3JvbGxPcHRpb25zKCk7XG5cbiAgICByZXN1bHQucG9zaXRpb24gPSBvYmogJiYgb2JqLnBvc2l0aW9uID8gb2JqLnBvc2l0aW9uIDogdGhpcy5wb3NpdGlvbjtcbiAgICByZXN1bHQuYmFyQmFja2dyb3VuZCA9IG9iaiAmJiBvYmouYmFyQmFja2dyb3VuZCA/IG9iai5iYXJCYWNrZ3JvdW5kIDogdGhpcy5iYXJCYWNrZ3JvdW5kO1xuICAgIHJlc3VsdC5iYXJPcGFjaXR5ID0gb2JqICYmIG9iai5iYXJPcGFjaXR5ID8gb2JqLmJhck9wYWNpdHkgOiB0aGlzLmJhck9wYWNpdHk7XG4gICAgcmVzdWx0LmJhcldpZHRoID0gb2JqICYmIG9iai5iYXJXaWR0aCA/IG9iai5iYXJXaWR0aCA6IHRoaXMuYmFyV2lkdGg7XG4gICAgcmVzdWx0LmJhckJvcmRlclJhZGl1cyA9IG9iaiAmJiBvYmouYmFyQm9yZGVyUmFkaXVzID8gb2JqLmJhckJvcmRlclJhZGl1cyA6IHRoaXMuYmFyQm9yZGVyUmFkaXVzO1xuICAgIHJlc3VsdC5iYXJNYXJnaW4gPSBvYmogJiYgb2JqLmJhck1hcmdpbiA/IG9iai5iYXJNYXJnaW4gOiB0aGlzLmJhck1hcmdpbjtcbiAgICByZXN1bHQuZ3JpZEJhY2tncm91bmQgPSBvYmogJiYgb2JqLmdyaWRCYWNrZ3JvdW5kID8gb2JqLmdyaWRCYWNrZ3JvdW5kIDogdGhpcy5ncmlkQmFja2dyb3VuZDtcbiAgICByZXN1bHQuZ3JpZE9wYWNpdHkgPSBvYmogJiYgb2JqLmdyaWRPcGFjaXR5ID8gb2JqLmdyaWRPcGFjaXR5IDogdGhpcy5ncmlkQmFja2dyb3VuZDtcbiAgICByZXN1bHQuZ3JpZFdpZHRoID0gb2JqICYmIG9iai5ncmlkV2lkdGggPyBvYmouZ3JpZFdpZHRoIDogdGhpcy5ncmlkV2lkdGg7XG4gICAgcmVzdWx0LmdyaWRCb3JkZXJSYWRpdXMgPSBvYmogJiYgb2JqLmdyaWRCb3JkZXJSYWRpdXMgPyBvYmouZ3JpZEJvcmRlclJhZGl1cyA6IHRoaXMuZ3JpZEJvcmRlclJhZGl1cztcbiAgICByZXN1bHQuZ3JpZE1hcmdpbiA9IG9iaiAmJiBvYmouZ3JpZE1hcmdpbiA/IG9iai5ncmlkTWFyZ2luIDogdGhpcy5ncmlkTWFyZ2luO1xuICAgIHJlc3VsdC5hbHdheXNWaXNpYmxlID0gb2JqICYmIHR5cGVvZiBvYmouYWx3YXlzVmlzaWJsZSAhPT0gJ3VuZGVmaW5lZCcgPyBvYmouYWx3YXlzVmlzaWJsZSA6IHRoaXMuYWx3YXlzVmlzaWJsZTtcbiAgICByZXN1bHQudmlzaWJsZVRpbWVvdXQgPSBvYmogJiYgb2JqLnZpc2libGVUaW1lb3V0ID8gb2JqLnZpc2libGVUaW1lb3V0IDogdGhpcy52aXNpYmxlVGltZW91dDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==