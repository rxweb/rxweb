/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NoopAnimationPlayer } from '@angular/animations';
import { hypenatePropsObject } from '../shared';
export class DirectStylePlayer extends NoopAnimationPlayer {
    /**
     * @param {?} element
     * @param {?} styles
     */
    constructor(element, styles) {
        super();
        this.element = element;
        this._startingStyles = {};
        this.__initialized = false;
        this._styles = hypenatePropsObject(styles);
    }
    /**
     * @return {?}
     */
    init() {
        if (this.__initialized || !this._startingStyles)
            return;
        this.__initialized = true;
        Object.keys(this._styles).forEach(prop => {
            /** @type {?} */ ((this._startingStyles))[prop] = this.element.style[prop];
        });
        super.init();
    }
    /**
     * @return {?}
     */
    play() {
        if (!this._startingStyles)
            return;
        this.init();
        Object.keys(this._styles)
            .forEach(prop => this.element.style.setProperty(prop, this._styles[prop]));
        super.play();
    }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._startingStyles)
            return;
        Object.keys(this._startingStyles).forEach(prop => {
            /** @type {?} */
            const value = /** @type {?} */ ((this._startingStyles))[prop];
            if (value) {
                this.element.style.setProperty(prop, value);
            }
            else {
                this.element.style.removeProperty(prop);
            }
        });
        this._startingStyles = null;
        super.destroy();
    }
}
if (false) {
    /** @type {?} */
    DirectStylePlayer.prototype._startingStyles;
    /** @type {?} */
    DirectStylePlayer.prototype.__initialized;
    /** @type {?} */
    DirectStylePlayer.prototype._styles;
    /** @type {?} */
    DirectStylePlayer.prototype.element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0X3N0eWxlX3BsYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvcmVuZGVyL2Nzc19rZXlmcmFtZXMvZGlyZWN0X3N0eWxlX3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBT0EsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRTlDLE1BQU0sd0JBQXlCLFNBQVEsbUJBQW1COzs7OztJQUt4RCxZQUFtQixPQUFZLEVBQUUsTUFBNEI7UUFDM0QsS0FBSyxFQUFFLENBQUM7UUFEUyxZQUFPLEdBQVAsT0FBTyxDQUFLOytCQUpzQixFQUFFOzZCQUMvQixLQUFLO1FBSzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDNUM7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7WUFBRSxPQUFPO1FBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTsrQkFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ3hELENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNkOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZTtZQUFFLE9BQU87UUFDbEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2Q7Ozs7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO1lBQUUsT0FBTztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7O1lBQy9DLE1BQU0sS0FBSyxzQkFBRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksRUFBRTtZQUMzQyxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzdDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QztTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNqQjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtOb29wQW5pbWF0aW9uUGxheWVyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7aHlwZW5hdGVQcm9wc09iamVjdH0gZnJvbSAnLi4vc2hhcmVkJztcblxuZXhwb3J0IGNsYXNzIERpcmVjdFN0eWxlUGxheWVyIGV4dGVuZHMgTm9vcEFuaW1hdGlvblBsYXllciB7XG4gIHByaXZhdGUgX3N0YXJ0aW5nU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsID0ge307XG4gIHByaXZhdGUgX19pbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBhbnksIHN0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3N0eWxlcyA9IGh5cGVuYXRlUHJvcHNPYmplY3Qoc3R5bGVzKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKHRoaXMuX19pbml0aWFsaXplZCB8fCAhdGhpcy5fc3RhcnRpbmdTdHlsZXMpIHJldHVybjtcbiAgICB0aGlzLl9faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX3N0eWxlcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIHRoaXMuX3N0YXJ0aW5nU3R5bGVzICFbcHJvcF0gPSB0aGlzLmVsZW1lbnQuc3R5bGVbcHJvcF07XG4gICAgfSk7XG4gICAgc3VwZXIuaW5pdCgpO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZiAoIXRoaXMuX3N0YXJ0aW5nU3R5bGVzKSByZXR1cm47XG4gICAgdGhpcy5pbml0KCk7XG4gICAgT2JqZWN0LmtleXModGhpcy5fc3R5bGVzKVxuICAgICAgICAuZm9yRWFjaChwcm9wID0+IHRoaXMuZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLCB0aGlzLl9zdHlsZXNbcHJvcF0pKTtcbiAgICBzdXBlci5wbGF5KCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5fc3RhcnRpbmdTdHlsZXMpIHJldHVybjtcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9zdGFydGluZ1N0eWxlcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fc3RhcnRpbmdTdHlsZXMgIVtwcm9wXTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3ApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3N0YXJ0aW5nU3R5bGVzID0gbnVsbDtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==