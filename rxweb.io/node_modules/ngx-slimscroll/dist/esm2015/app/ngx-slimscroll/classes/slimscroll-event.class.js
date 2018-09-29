/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function ISlimScrollEvent() { }
function ISlimScrollEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ISlimScrollEvent.prototype.type;
    /** @type {?|undefined} */
    ISlimScrollEvent.prototype.y;
    /** @type {?|undefined} */
    ISlimScrollEvent.prototype.percent;
    /** @type {?|undefined} */
    ISlimScrollEvent.prototype.duration;
    /** @type {?|undefined} */
    ISlimScrollEvent.prototype.easing;
}
export class SlimScrollEvent {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        this.type = obj.type;
        this.y = obj && obj.y ? obj.y : 0;
        this.percent = obj && obj.percent ? obj.percent : 0;
        this.duration = obj && obj.duration ? obj.duration : 0;
        this.easing = obj && obj.easing ? obj.easing : 'linear';
    }
}
function SlimScrollEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    SlimScrollEvent.prototype.type;
    /** @type {?} */
    SlimScrollEvent.prototype.y;
    /** @type {?} */
    SlimScrollEvent.prototype.percent;
    /** @type {?} */
    SlimScrollEvent.prototype.duration;
    /** @type {?} */
    SlimScrollEvent.prototype.easing;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpbXNjcm9sbC1ldmVudC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zbGltc2Nyb2xsLyIsInNvdXJjZXMiOlsiYXBwL25neC1zbGltc2Nyb2xsL2NsYXNzZXMvc2xpbXNjcm9sbC1ldmVudC5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVBLE1BQU07Ozs7SUFTSixZQUFZLEdBQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7S0FDekQ7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSVNsaW1TY3JvbGxFdmVudCB7XG4gIHR5cGU6ICdzY3JvbGxUb0JvdHRvbScgfCAnc2Nyb2xsVG9Ub3AnIHwgJ3Njcm9sbFRvUGVyY2VudCcgfCAnc2Nyb2xsVG8nIHwgJ3JlY2FsY3VsYXRlJztcbiAgeT86IG51bWJlcjtcbiAgcGVyY2VudD86IG51bWJlcjtcbiAgZHVyYXRpb24/OiBudW1iZXI7XG4gIGVhc2luZz86ICdsaW5lYXInIHwgJ2luUXVhZCcgfCAnb3V0UXVhZCcgfCAnaW5PdXRRdWFkJyB8ICdpbkN1YmljJyB8XG4gICAgJ291dEN1YmljJyB8ICdpbk91dEN1YmljJyB8ICdpblF1YXJ0JyB8ICdvdXRRdWFydCcgfCAnaW5PdXRRdWFydCcgfFxuICAgICdpblF1aW50JyB8ICdvdXRRdWludCcgfCAnaW5PdXRRdWludCc7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGltU2Nyb2xsRXZlbnQgaW1wbGVtZW50cyBJU2xpbVNjcm9sbEV2ZW50IHtcbiAgdHlwZTogJ3Njcm9sbFRvQm90dG9tJyB8ICdzY3JvbGxUb1RvcCcgfCAnc2Nyb2xsVG9QZXJjZW50JyB8ICdzY3JvbGxUbycgfCAncmVjYWxjdWxhdGUnO1xuICB5PzogbnVtYmVyO1xuICBwZXJjZW50PzogbnVtYmVyO1xuICBkdXJhdGlvbj86IG51bWJlcjtcbiAgZWFzaW5nOiAnbGluZWFyJyB8ICdpblF1YWQnIHwgJ291dFF1YWQnIHwgJ2luT3V0UXVhZCcgfCAnaW5DdWJpYycgfFxuICAgICdvdXRDdWJpYycgfCAnaW5PdXRDdWJpYycgfCAnaW5RdWFydCcgfCAnb3V0UXVhcnQnIHwgJ2luT3V0UXVhcnQnIHxcbiAgICAnaW5RdWludCcgfCAnb3V0UXVpbnQnIHwgJ2luT3V0UXVpbnQnO1xuXG4gIGNvbnN0cnVjdG9yKG9iaj86IElTbGltU2Nyb2xsRXZlbnQpIHtcbiAgICB0aGlzLnR5cGUgPSBvYmoudHlwZTtcbiAgICB0aGlzLnkgPSBvYmogJiYgb2JqLnkgPyBvYmoueSA6IDA7XG4gICAgdGhpcy5wZXJjZW50ID0gb2JqICYmIG9iai5wZXJjZW50ID8gb2JqLnBlcmNlbnQgOiAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSBvYmogJiYgb2JqLmR1cmF0aW9uID8gb2JqLmR1cmF0aW9uIDogMDtcbiAgICB0aGlzLmVhc2luZyA9IG9iaiAmJiBvYmouZWFzaW5nID8gb2JqLmVhc2luZyA6ICdsaW5lYXInO1xuICB9XG59XG4iXX0=