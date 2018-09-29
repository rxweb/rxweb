/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵstringify as stringify } from '@angular/core';
/** @typedef {?} */
var StringMap;
/** @type {?} */
let _nextReferenceId = 0;
export class MetadataOverrider {
    constructor() {
        this._references = new Map();
    }
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     * @template C, T
     * @param {?} metadataClass
     * @param {?} oldMetadata
     * @param {?} override
     * @return {?}
     */
    overrideMetadata(metadataClass, oldMetadata, override) {
        /** @type {?} */
        const props = {};
        if (oldMetadata) {
            _valueProps(oldMetadata).forEach((prop) => props[prop] = (/** @type {?} */ (oldMetadata))[prop]);
        }
        if (override.set) {
            if (override.remove || override.add) {
                throw new Error(`Cannot set and add/remove ${stringify(metadataClass)} at the same time!`);
            }
            setMetadata(props, override.set);
        }
        if (override.remove) {
            removeMetadata(props, override.remove, this._references);
        }
        if (override.add) {
            addMetadata(props, override.add);
        }
        return new metadataClass(/** @type {?} */ (props));
    }
}
if (false) {
    /** @type {?} */
    MetadataOverrider.prototype._references;
}
/**
 * @param {?} metadata
 * @param {?} remove
 * @param {?} references
 * @return {?}
 */
function removeMetadata(metadata, remove, references) {
    /** @type {?} */
    const removeObjects = new Set();
    for (const prop in remove) {
        /** @type {?} */
        const removeValue = remove[prop];
        if (removeValue instanceof Array) {
            removeValue.forEach((value) => { removeObjects.add(_propHashKey(prop, value, references)); });
        }
        else {
            removeObjects.add(_propHashKey(prop, removeValue, references));
        }
    }
    for (const prop in metadata) {
        /** @type {?} */
        const propValue = metadata[prop];
        if (propValue instanceof Array) {
            metadata[prop] = propValue.filter((value) => !removeObjects.has(_propHashKey(prop, value, references)));
        }
        else {
            if (removeObjects.has(_propHashKey(prop, propValue, references))) {
                metadata[prop] = undefined;
            }
        }
    }
}
/**
 * @param {?} metadata
 * @param {?} add
 * @return {?}
 */
function addMetadata(metadata, add) {
    for (const prop in add) {
        /** @type {?} */
        const addValue = add[prop];
        /** @type {?} */
        const propValue = metadata[prop];
        if (propValue != null && propValue instanceof Array) {
            metadata[prop] = propValue.concat(addValue);
        }
        else {
            metadata[prop] = addValue;
        }
    }
}
/**
 * @param {?} metadata
 * @param {?} set
 * @return {?}
 */
function setMetadata(metadata, set) {
    for (const prop in set) {
        metadata[prop] = set[prop];
    }
}
/**
 * @param {?} propName
 * @param {?} propValue
 * @param {?} references
 * @return {?}
 */
function _propHashKey(propName, propValue, references) {
    /** @type {?} */
    const replacer = (key, value) => {
        if (typeof value === 'function') {
            value = _serializeReference(value, references);
        }
        return value;
    };
    return `${propName}:${JSON.stringify(propValue, replacer)}`;
}
/**
 * @param {?} ref
 * @param {?} references
 * @return {?}
 */
function _serializeReference(ref, references) {
    /** @type {?} */
    let id = references.get(ref);
    if (!id) {
        id = `${stringify(ref)}${_nextReferenceId++}`;
        references.set(ref, id);
    }
    return id;
}
/**
 * @param {?} obj
 * @return {?}
 */
function _valueProps(obj) {
    /** @type {?} */
    const props = [];
    // regular public props
    Object.keys(obj).forEach((prop) => {
        if (!prop.startsWith('_')) {
            props.push(prop);
        }
    });
    /** @type {?} */
    let proto = obj;
    while (proto = Object.getPrototypeOf(proto)) {
        Object.keys(proto).forEach((protoProp) => {
            /** @type {?} */
            const desc = Object.getOwnPropertyDescriptor(proto, protoProp);
            if (!protoProp.startsWith('_') && desc && 'get' in desc) {
                props.push(protoProp);
            }
        });
    }
    return props;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGFfb3ZlcnJpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3Rpbmcvc3JjL21ldGFkYXRhX292ZXJyaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBT3RELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRXpCLE1BQU07OzJCQUNrQixJQUFJLEdBQUcsRUFBZTs7Ozs7Ozs7Ozs7SUFLNUMsZ0JBQWdCLENBQ1osYUFBcUMsRUFBRSxXQUFjLEVBQUUsUUFBNkI7O1FBQ3RGLE1BQU0sS0FBSyxHQUFjLEVBQUUsQ0FBQztRQUM1QixJQUFJLFdBQVcsRUFBRTtZQUNmLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxtQkFBTSxXQUFXLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3BGO1FBRUQsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQ2hCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixTQUFTLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDNUY7WUFDRCxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNuQixjQUFjLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxRQUFRLENB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IEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWV0YWRhdGFPdmVycmlkZX0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcblxudHlwZSBTdHJpbmdNYXAgPSB7XG4gIFtrZXk6IHN0cmluZ106IGFueVxufTtcblxubGV0IF9uZXh0UmVmZXJlbmNlSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFPdmVycmlkZXIge1xuICBwcml2YXRlIF9yZWZlcmVuY2VzID0gbmV3IE1hcDxhbnksIHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBtZXRhZGF0YSBjbGFzc1xuICAgKiBiYXNlZCBvbiBhbiBvbGQgaW5zdGFuY2UgYW5kIG92ZXJyaWRlcy5cbiAgICovXG4gIG92ZXJyaWRlTWV0YWRhdGE8QyBleHRlbmRzIFQsIFQ+KFxuICAgICAgbWV0YWRhdGFDbGFzczoge25ldyAob3B0aW9uczogVCk6IEM7fSwgb2xkTWV0YWRhdGE6IEMsIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPFQ+KTogQyB7XG4gICAgY29uc3QgcHJvcHM6IFN0cmluZ01hcCA9IHt9O1xuICAgIGlmIChvbGRNZXRhZGF0YSkge1xuICAgICAgX3ZhbHVlUHJvcHMob2xkTWV0YWRhdGEpLmZvckVhY2goKHByb3ApID0+IHByb3BzW3Byb3BdID0gKDxhbnk+b2xkTWV0YWRhdGEpW3Byb3BdKTtcbiAgICB9XG5cbiAgICBpZiAob3ZlcnJpZGUuc2V0KSB7XG4gICAgICBpZiAob3ZlcnJpZGUucmVtb3ZlIHx8IG92ZXJyaWRlLmFkZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBzZXQgYW5kIGFkZC9yZW1vdmUgJHtzdHJpbmdpZnkobWV0YWRhdGFDbGFzcyl9IGF0IHRoZSBzYW1lIHRpbWUhYCk7XG4gICAgICB9XG4gICAgICBzZXRNZXRhZGF0YShwcm9wcywgb3ZlcnJpZGUuc2V0KTtcbiAgICB9XG4gICAgaWYgKG92ZXJyaWRlLnJlbW92ZSkge1xuICAgICAgcmVtb3ZlTWV0YWRhdGEocHJvcHMsIG92ZXJyaWRlLnJlbW92ZSwgdGhpcy5fcmVmZXJlbmNlcyk7XG4gICAgfVxuICAgIGlmIChvdmVycmlkZS5hZGQpIHtcbiAgICAgIGFkZE1ldGFkYXRhKHByb3BzLCBvdmVycmlkZS5hZGQpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IG1ldGFkYXRhQ2xhc3MoPGFueT5wcm9wcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWV0YWRhdGEobWV0YWRhdGE6IFN0cmluZ01hcCwgcmVtb3ZlOiBhbnksIHJlZmVyZW5jZXM6IE1hcDxhbnksIHN0cmluZz4pIHtcbiAgY29uc3QgcmVtb3ZlT2JqZWN0cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IHByb3AgaW4gcmVtb3ZlKSB7XG4gICAgY29uc3QgcmVtb3ZlVmFsdWUgPSByZW1vdmVbcHJvcF07XG4gICAgaWYgKHJlbW92ZVZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJlbW92ZVZhbHVlLmZvckVhY2goXG4gICAgICAgICAgKHZhbHVlOiBhbnkpID0+IHsgcmVtb3ZlT2JqZWN0cy5hZGQoX3Byb3BIYXNoS2V5KHByb3AsIHZhbHVlLCByZWZlcmVuY2VzKSk7IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVPYmplY3RzLmFkZChfcHJvcEhhc2hLZXkocHJvcCwgcmVtb3ZlVmFsdWUsIHJlZmVyZW5jZXMpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHByb3AgaW4gbWV0YWRhdGEpIHtcbiAgICBjb25zdCBwcm9wVmFsdWUgPSBtZXRhZGF0YVtwcm9wXTtcbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIG1ldGFkYXRhW3Byb3BdID0gcHJvcFZhbHVlLmZpbHRlcihcbiAgICAgICAgICAodmFsdWU6IGFueSkgPT4gIXJlbW92ZU9iamVjdHMuaGFzKF9wcm9wSGFzaEtleShwcm9wLCB2YWx1ZSwgcmVmZXJlbmNlcykpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlbW92ZU9iamVjdHMuaGFzKF9wcm9wSGFzaEtleShwcm9wLCBwcm9wVmFsdWUsIHJlZmVyZW5jZXMpKSkge1xuICAgICAgICBtZXRhZGF0YVtwcm9wXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkTWV0YWRhdGEobWV0YWRhdGE6IFN0cmluZ01hcCwgYWRkOiBhbnkpIHtcbiAgZm9yIChjb25zdCBwcm9wIGluIGFkZCkge1xuICAgIGNvbnN0IGFkZFZhbHVlID0gYWRkW3Byb3BdO1xuICAgIGNvbnN0IHByb3BWYWx1ZSA9IG1ldGFkYXRhW3Byb3BdO1xuICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgbWV0YWRhdGFbcHJvcF0gPSBwcm9wVmFsdWUuY29uY2F0KGFkZFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWV0YWRhdGFbcHJvcF0gPSBhZGRWYWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0TWV0YWRhdGEobWV0YWRhdGE6IFN0cmluZ01hcCwgc2V0OiBhbnkpIHtcbiAgZm9yIChjb25zdCBwcm9wIGluIHNldCkge1xuICAgIG1ldGFkYXRhW3Byb3BdID0gc2V0W3Byb3BdO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9wcm9wSGFzaEtleShwcm9wTmFtZTogYW55LCBwcm9wVmFsdWU6IGFueSwgcmVmZXJlbmNlczogTWFwPGFueSwgc3RyaW5nPik6IHN0cmluZyB7XG4gIGNvbnN0IHJlcGxhY2VyID0gKGtleTogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUgPSBfc2VyaWFsaXplUmVmZXJlbmNlKHZhbHVlLCByZWZlcmVuY2VzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIHJldHVybiBgJHtwcm9wTmFtZX06JHtKU09OLnN0cmluZ2lmeShwcm9wVmFsdWUsIHJlcGxhY2VyKX1gO1xufVxuXG5mdW5jdGlvbiBfc2VyaWFsaXplUmVmZXJlbmNlKHJlZjogYW55LCByZWZlcmVuY2VzOiBNYXA8YW55LCBzdHJpbmc+KTogc3RyaW5nIHtcbiAgbGV0IGlkID0gcmVmZXJlbmNlcy5nZXQocmVmKTtcbiAgaWYgKCFpZCkge1xuICAgIGlkID0gYCR7c3RyaW5naWZ5KHJlZil9JHtfbmV4dFJlZmVyZW5jZUlkKyt9YDtcbiAgICByZWZlcmVuY2VzLnNldChyZWYsIGlkKTtcbiAgfVxuICByZXR1cm4gaWQ7XG59XG5cblxuZnVuY3Rpb24gX3ZhbHVlUHJvcHMob2JqOiBhbnkpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHByb3BzOiBzdHJpbmdbXSA9IFtdO1xuICAvLyByZWd1bGFyIHB1YmxpYyBwcm9wc1xuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goKHByb3ApID0+IHtcbiAgICBpZiAoIXByb3Auc3RhcnRzV2l0aCgnXycpKSB7XG4gICAgICBwcm9wcy5wdXNoKHByb3ApO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZ2V0dGVyc1xuICBsZXQgcHJvdG8gPSBvYmo7XG4gIHdoaWxlIChwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90bykpIHtcbiAgICBPYmplY3Qua2V5cyhwcm90bykuZm9yRWFjaCgocHJvdG9Qcm9wKSA9PiB7XG4gICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgcHJvdG9Qcm9wKTtcbiAgICAgIGlmICghcHJvdG9Qcm9wLnN0YXJ0c1dpdGgoJ18nKSAmJiBkZXNjICYmICdnZXQnIGluIGRlc2MpIHtcbiAgICAgICAgcHJvcHMucHVzaChwcm90b1Byb3ApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBwcm9wcztcbn1cbiJdfQ==