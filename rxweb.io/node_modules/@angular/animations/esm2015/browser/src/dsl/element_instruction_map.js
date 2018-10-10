/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class ElementInstructionMap {
    constructor() {
        this._map = new Map();
    }
    /**
     * @param {?} element
     * @return {?}
     */
    consume(element) {
        /** @type {?} */
        let instructions = this._map.get(element);
        if (instructions) {
            this._map.delete(element);
        }
        else {
            instructions = [];
        }
        return instructions;
    }
    /**
     * @param {?} element
     * @param {?} instructions
     * @return {?}
     */
    append(element, instructions) {
        /** @type {?} */
        let existingInstructions = this._map.get(element);
        if (!existingInstructions) {
            this._map.set(element, existingInstructions = []);
        }
        existingInstructions.push(...instructions);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    has(element) { return this._map.has(element); }
    /**
     * @return {?}
     */
    clear() { this._map.clear(); }
}
if (false) {
    /** @type {?} */
    ElementInstructionMap.prototype._map;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF9pbnN0cnVjdGlvbl9tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL2RzbC9lbGVtZW50X2luc3RydWN0aW9uX21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBU0EsTUFBTTs7b0JBQ1csSUFBSSxHQUFHLEVBQXVDOzs7Ozs7SUFFN0QsT0FBTyxDQUFDLE9BQVk7O1FBQ2xCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO2FBQU07WUFDTCxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxZQUFZLENBQUM7S0FDckI7Ozs7OztJQUVELE1BQU0sQ0FBQyxPQUFZLEVBQUUsWUFBNEM7O1FBQy9ELElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNuRDtRQUNELG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO0tBQzVDOzs7OztJQUVELEdBQUcsQ0FBQyxPQUFZLElBQWEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFOzs7O0lBRTdELEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Q0FDL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvblRpbWVsaW5lSW5zdHJ1Y3Rpb259IGZyb20gJy4vYW5pbWF0aW9uX3RpbWVsaW5lX2luc3RydWN0aW9uJztcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRJbnN0cnVjdGlvbk1hcCB7XG4gIHByaXZhdGUgX21hcCA9IG5ldyBNYXA8YW55LCBBbmltYXRpb25UaW1lbGluZUluc3RydWN0aW9uW10+KCk7XG5cbiAgY29uc3VtZShlbGVtZW50OiBhbnkpOiBBbmltYXRpb25UaW1lbGluZUluc3RydWN0aW9uW10ge1xuICAgIGxldCBpbnN0cnVjdGlvbnMgPSB0aGlzLl9tYXAuZ2V0KGVsZW1lbnQpO1xuICAgIGlmIChpbnN0cnVjdGlvbnMpIHtcbiAgICAgIHRoaXMuX21hcC5kZWxldGUoZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RydWN0aW9ucyA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb25zO1xuICB9XG5cbiAgYXBwZW5kKGVsZW1lbnQ6IGFueSwgaW5zdHJ1Y3Rpb25zOiBBbmltYXRpb25UaW1lbGluZUluc3RydWN0aW9uW10pIHtcbiAgICBsZXQgZXhpc3RpbmdJbnN0cnVjdGlvbnMgPSB0aGlzLl9tYXAuZ2V0KGVsZW1lbnQpO1xuICAgIGlmICghZXhpc3RpbmdJbnN0cnVjdGlvbnMpIHtcbiAgICAgIHRoaXMuX21hcC5zZXQoZWxlbWVudCwgZXhpc3RpbmdJbnN0cnVjdGlvbnMgPSBbXSk7XG4gICAgfVxuICAgIGV4aXN0aW5nSW5zdHJ1Y3Rpb25zLnB1c2goLi4uaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIGhhcyhlbGVtZW50OiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX21hcC5oYXMoZWxlbWVudCk7IH1cblxuICBjbGVhcigpIHsgdGhpcy5fbWFwLmNsZWFyKCk7IH1cbn1cbiJdfQ==