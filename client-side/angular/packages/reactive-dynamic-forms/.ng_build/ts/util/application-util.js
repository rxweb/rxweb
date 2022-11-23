export class ApplicationUtil {
    /**
     * @param {?} control
     * @return {?}
     */
    static getRootFormGroup(control) {
        if (control.parent) {
            return this.getRootFormGroup(control.parent);
        }
        return /** @type {?} */ (control);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static isObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    }
}
//# sourceMappingURL=application-util.js.map