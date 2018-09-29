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
/**
 * An interface implemented by all Angular type decorators, which allows them to be used as ES7
 * decorators as well as
 * Angular DSL syntax.
 *
 * ES7 syntax:
 *
 * ```
 * \@ng.Component({...})
 * class MyClass {...}
 * ```
 *
 * @record
 */
export function TypeDecorator() { }
/** @type {?} */
export const ANNOTATIONS = '__annotations__';
/** @type {?} */
export const PARAMETERS = '__parameters__';
/** @type {?} */
export const PROP_METADATA = '__prop__metadata__';
/**
 * @suppress {globalThis}
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @param {?=} chainFn
 * @param {?=} typeFn
 * @return {?}
 */
export function makeDecorator(name, props, parentClass, chainFn, typeFn) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function DecoratorFactory(...args) {
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, ...args);
            return this;
        }
        /** @type {?} */
        const annotationInstance = new (/** @type {?} */ (DecoratorFactory))(...args);
        /** @type {?} */
        const TypeDecorator = /** @type {?} */ (function TypeDecorator(cls) {
            typeFn && typeFn(cls, ...args);
            /** @type {?} */
            const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                (/** @type {?} */ (cls))[ANNOTATIONS] :
                Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
            annotations.push(annotationInstance);
            return cls;
        });
        if (chainFn)
            chainFn(TypeDecorator);
        return TypeDecorator;
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.ngMetadataName = name;
    (/** @type {?} */ (DecoratorFactory)).annotationCls = DecoratorFactory;
    return /** @type {?} */ (DecoratorFactory);
}
/**
 * @param {?=} props
 * @return {?}
 */
function makeMetadataCtor(props) {
    return function ctor(...args) {
        if (props) {
            /** @type {?} */
            const values = props(...args);
            for (const propName in values) {
                this[propName] = values[propName];
            }
        }
    };
}
/**
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @return {?}
 */
export function makeParamDecorator(name, props, parentClass) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function ParamDecoratorFactory(...args) {
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        /** @type {?} */
        const annotationInstance = new (/** @type {?} */ (ParamDecoratorFactory))(...args);
        (/** @type {?} */ (ParamDecorator)).annotation = annotationInstance;
        return ParamDecorator;
        /**
         * @param {?} cls
         * @param {?} unusedKey
         * @param {?} index
         * @return {?}
         */
        function ParamDecorator(cls, unusedKey, index) {
            /** @type {?} */
            const parameters = cls.hasOwnProperty(PARAMETERS) ?
                (/** @type {?} */ (cls))[PARAMETERS] :
                Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            (parameters[index] = parameters[index] || []).push(annotationInstance);
            return cls;
        }
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.ngMetadataName = name;
    (/** @type {?} */ (ParamDecoratorFactory)).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
/**
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @return {?}
 */
export function makePropDecorator(name, props, parentClass) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function PropDecoratorFactory(...args) {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        /** @type {?} */
        const decoratorInstance = new (/** @type {?} */ (PropDecoratorFactory))(...args);
        return function PropDecorator(target, name) {
            /** @type {?} */
            const constructor = target.constructor;
            /** @type {?} */
            const meta = constructor.hasOwnProperty(PROP_METADATA) ?
                (/** @type {?} */ (constructor))[PROP_METADATA] :
                Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
        };
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.ngMetadataName = name;
    (/** @type {?} */ (PropDecoratorFactory)).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3V0aWwvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQ0EsYUFBYSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7O0FBQzdDLGFBQWEsVUFBVSxHQUFHLGdCQUFnQixDQUFDOztBQUMzQyxhQUFhLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztBQUtsRCxNQUFNLHdCQUNGLElBQVksRUFBRSxLQUErQixFQUFFLFdBQWlCLEVBQ2hFLE9BQWdDLEVBQUUsTUFBa0Q7O0lBRXRGLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUV6QywwQkFBMEIsR0FBRyxJQUFXO1FBQ3RDLElBQUksSUFBSSxZQUFZLGdCQUFnQixFQUFFO1lBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUM7U0FDYjs7UUFFRCxNQUFNLGtCQUFrQixHQUFHLElBQUksbUJBQU0sZ0JBQWdCLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDOztRQUNoRSxNQUFNLGFBQWEscUJBQWlDLHVCQUF1QixHQUFjO1lBQ3ZGLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7O1lBRy9CLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakQsbUJBQUMsR0FBVSxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUMsV0FB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dGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGltcGxlbWVudGVkIGJ5IGFsbCBBbmd1bGFyIHR5cGUgZGVjb3JhdG9ycywgd2hpY2ggYWxsb3dzIHRoZW0gdG8gYmUgdXNlZCBhcyBFUzdcbiAqIGRlY29yYXRvcnMgYXMgd2VsbCBhc1xuICogQW5ndWxhciBEU0wgc3ludGF4LlxuICpcbiAqIEVTNyBzeW50YXg6XG4gKlxuICogYGBgXG4gKiBAbmcuQ29tcG9uZW50KHsuLi59KVxuICogY2xhc3MgTXlDbGFzcyB7Li4ufVxuICogYGBgXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVEZWNvcmF0b3Ige1xuICAvKipcbiAgICogSW52b2tlIGFzIEVTNyBkZWNvcmF0b3IuXG4gICAqL1xuICA8VCBleHRlbmRzIFR5cGU8YW55Pj4odHlwZTogVCk6IFQ7XG5cbiAgLy8gTWFrZSBUeXBlRGVjb3JhdG9yIGFzc2lnbmFibGUgdG8gYnVpbHQtaW4gUGFyYW1ldGVyRGVjb3JhdG9yIHR5cGUuXG4gIC8vIFBhcmFtZXRlckRlY29yYXRvciBpcyBkZWNsYXJlZCBpbiBsaWIuZC50cyBhcyBhIGBkZWNsYXJlIHR5cGVgXG4gIC8vIHNvIHdlIGNhbm5vdCBkZWNsYXJlIHRoaXMgaW50ZXJmYWNlIGFzIGEgc3VidHlwZS5cbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzMzNzkjaXNzdWVjb21tZW50LTEyNjE2OTQxN1xuICAodGFyZ2V0OiBPYmplY3QsIHByb3BlcnR5S2V5Pzogc3RyaW5nfHN5bWJvbCwgcGFyYW1ldGVySW5kZXg/OiBudW1iZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQU5OT1RBVElPTlMgPSAnX19hbm5vdGF0aW9uc19fJztcbmV4cG9ydCBjb25zdCBQQVJBTUVURVJTID0gJ19fcGFyYW1ldGVyc19fJztcbmV4cG9ydCBjb25zdCBQUk9QX01FVEFEQVRBID0gJ19fcHJvcF9fbWV0YWRhdGFfXyc7XG5cbi8qKlxuICogQHN1cHByZXNzIHtnbG9iYWxUaGlzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZURlY29yYXRvcihcbiAgICBuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksIHBhcmVudENsYXNzPzogYW55LFxuICAgIGNoYWluRm4/OiAoZm46IEZ1bmN0aW9uKSA9PiB2b2lkLCB0eXBlRm4/OiAodHlwZTogVHlwZTxhbnk+LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCk6XG4gICAge25ldyAoLi4uYXJnczogYW55W10pOiBhbnk7ICguLi5hcmdzOiBhbnlbXSk6IGFueTsgKC4uLmFyZ3M6IGFueVtdKTogKGNsczogYW55KSA9PiBhbnk7fSB7XG4gIGNvbnN0IG1ldGFDdG9yID0gbWFrZU1ldGFkYXRhQ3Rvcihwcm9wcyk7XG5cbiAgZnVuY3Rpb24gRGVjb3JhdG9yRmFjdG9yeSguLi5hcmdzOiBhbnlbXSk6IChjbHM6IGFueSkgPT4gYW55IHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIERlY29yYXRvckZhY3RvcnkpIHtcbiAgICAgIG1ldGFDdG9yLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uSW5zdGFuY2UgPSBuZXcgKDxhbnk+RGVjb3JhdG9yRmFjdG9yeSkoLi4uYXJncyk7XG4gICAgY29uc3QgVHlwZURlY29yYXRvcjogVHlwZURlY29yYXRvciA9IDxUeXBlRGVjb3JhdG9yPmZ1bmN0aW9uIFR5cGVEZWNvcmF0b3IoY2xzOiBUeXBlPGFueT4pIHtcbiAgICAgIHR5cGVGbiAmJiB0eXBlRm4oY2xzLCAuLi5hcmdzKTtcbiAgICAgIC8vIFVzZSBvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgaXMgaW1wb3J0YW50IHNpbmNlIGl0IGNyZWF0ZXMgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgd2hpY2hcbiAgICAgIC8vIHByZXZlbnRzIHRoZSBwcm9wZXJ0eSBpcyBjb3BpZWQgZHVyaW5nIHN1YmNsYXNzaW5nLlxuICAgICAgY29uc3QgYW5ub3RhdGlvbnMgPSBjbHMuaGFzT3duUHJvcGVydHkoQU5OT1RBVElPTlMpID9cbiAgICAgICAgICAoY2xzIGFzIGFueSlbQU5OT1RBVElPTlNdIDpcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xzLCBBTk5PVEFUSU9OUywge3ZhbHVlOiBbXX0pW0FOTk9UQVRJT05TXTtcbiAgICAgIGFubm90YXRpb25zLnB1c2goYW5ub3RhdGlvbkluc3RhbmNlKTtcbiAgICAgIHJldHVybiBjbHM7XG4gICAgfTtcbiAgICBpZiAoY2hhaW5GbikgY2hhaW5GbihUeXBlRGVjb3JhdG9yKTtcbiAgICByZXR1cm4gVHlwZURlY29yYXRvcjtcbiAgfVxuXG4gIGlmIChwYXJlbnRDbGFzcykge1xuICAgIERlY29yYXRvckZhY3RvcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRDbGFzcy5wcm90b3R5cGUpO1xuICB9XG5cbiAgRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUubmdNZXRhZGF0YU5hbWUgPSBuYW1lO1xuICAoPGFueT5EZWNvcmF0b3JGYWN0b3J5KS5hbm5vdGF0aW9uQ2xzID0gRGVjb3JhdG9yRmFjdG9yeTtcbiAgcmV0dXJuIERlY29yYXRvckZhY3RvcnkgYXMgYW55O1xufVxuXG5mdW5jdGlvbiBtYWtlTWV0YWRhdGFDdG9yKHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpOiBhbnkge1xuICByZXR1cm4gZnVuY3Rpb24gY3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgY29uc3QgdmFsdWVzID0gcHJvcHMoLi4uYXJncyk7XG4gICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIHZhbHVlcykge1xuICAgICAgICB0aGlzW3Byb3BOYW1lXSA9IHZhbHVlc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBhcmFtRGVjb3JhdG9yKFxuICAgIG5hbWU6IHN0cmluZywgcHJvcHM/OiAoLi4uYXJnczogYW55W10pID0+IGFueSwgcGFyZW50Q2xhc3M/OiBhbnkpOiBhbnkge1xuICBjb25zdCBtZXRhQ3RvciA9IG1ha2VNZXRhZGF0YUN0b3IocHJvcHMpO1xuICBmdW5jdGlvbiBQYXJhbURlY29yYXRvckZhY3RvcnkoLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgUGFyYW1EZWNvcmF0b3JGYWN0b3J5KSB7XG4gICAgICBtZXRhQ3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjb25zdCBhbm5vdGF0aW9uSW5zdGFuY2UgPSBuZXcgKDxhbnk+UGFyYW1EZWNvcmF0b3JGYWN0b3J5KSguLi5hcmdzKTtcblxuICAgICg8YW55PlBhcmFtRGVjb3JhdG9yKS5hbm5vdGF0aW9uID0gYW5ub3RhdGlvbkluc3RhbmNlO1xuICAgIHJldHVybiBQYXJhbURlY29yYXRvcjtcblxuICAgIGZ1bmN0aW9uIFBhcmFtRGVjb3JhdG9yKGNsczogYW55LCB1bnVzZWRLZXk6IGFueSwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgICAvLyBVc2Ugb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIGltcG9ydGFudCBzaW5jZSBpdCBjcmVhdGVzIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IHdoaWNoXG4gICAgICAvLyBwcmV2ZW50cyB0aGUgcHJvcGVydHkgaXMgY29waWVkIGR1cmluZyBzdWJjbGFzc2luZy5cbiAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBjbHMuaGFzT3duUHJvcGVydHkoUEFSQU1FVEVSUykgP1xuICAgICAgICAgIChjbHMgYXMgYW55KVtQQVJBTUVURVJTXSA6XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNscywgUEFSQU1FVEVSUywge3ZhbHVlOiBbXX0pW1BBUkFNRVRFUlNdO1xuXG4gICAgICAvLyB0aGVyZSBtaWdodCBiZSBnYXBzIGlmIHNvbWUgaW4gYmV0d2VlbiBwYXJhbWV0ZXJzIGRvIG5vdCBoYXZlIGFubm90YXRpb25zLlxuICAgICAgLy8gd2UgcGFkIHdpdGggbnVsbHMuXG4gICAgICB3aGlsZSAocGFyYW1ldGVycy5sZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgcGFyYW1ldGVycy5wdXNoKG51bGwpO1xuICAgICAgfVxuXG4gICAgICAocGFyYW1ldGVyc1tpbmRleF0gPSBwYXJhbWV0ZXJzW2luZGV4XSB8fCBbXSkucHVzaChhbm5vdGF0aW9uSW5zdGFuY2UpO1xuICAgICAgcmV0dXJuIGNscztcbiAgICB9XG4gIH1cbiAgaWYgKHBhcmVudENsYXNzKSB7XG4gICAgUGFyYW1EZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50Q2xhc3MucHJvdG90eXBlKTtcbiAgfVxuICBQYXJhbURlY29yYXRvckZhY3RvcnkucHJvdG90eXBlLm5nTWV0YWRhdGFOYW1lID0gbmFtZTtcbiAgKDxhbnk+UGFyYW1EZWNvcmF0b3JGYWN0b3J5KS5hbm5vdGF0aW9uQ2xzID0gUGFyYW1EZWNvcmF0b3JGYWN0b3J5O1xuICByZXR1cm4gUGFyYW1EZWNvcmF0b3JGYWN0b3J5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVByb3BEZWNvcmF0b3IoXG4gICAgbmFtZTogc3RyaW5nLCBwcm9wcz86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55LCBwYXJlbnRDbGFzcz86IGFueSk6IGFueSB7XG4gIGNvbnN0IG1ldGFDdG9yID0gbWFrZU1ldGFkYXRhQ3Rvcihwcm9wcyk7XG5cbiAgZnVuY3Rpb24gUHJvcERlY29yYXRvckZhY3RvcnkoLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgUHJvcERlY29yYXRvckZhY3RvcnkpIHtcbiAgICAgIG1ldGFDdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgZGVjb3JhdG9ySW5zdGFuY2UgPSBuZXcgKDxhbnk+UHJvcERlY29yYXRvckZhY3RvcnkpKC4uLmFyZ3MpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIFByb3BEZWNvcmF0b3IodGFyZ2V0OiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgICAgY29uc3QgY29uc3RydWN0b3IgPSB0YXJnZXQuY29uc3RydWN0b3I7XG4gICAgICAvLyBVc2Ugb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIGltcG9ydGFudCBzaW5jZSBpdCBjcmVhdGVzIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IHdoaWNoXG4gICAgICAvLyBwcmV2ZW50cyB0aGUgcHJvcGVydHkgaXMgY29waWVkIGR1cmluZyBzdWJjbGFzc2luZy5cbiAgICAgIGNvbnN0IG1ldGEgPSBjb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eShQUk9QX01FVEFEQVRBKSA/XG4gICAgICAgICAgKGNvbnN0cnVjdG9yIGFzIGFueSlbUFJPUF9NRVRBREFUQV0gOlxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgUFJPUF9NRVRBREFUQSwge3ZhbHVlOiB7fX0pW1BST1BfTUVUQURBVEFdO1xuICAgICAgbWV0YVtuYW1lXSA9IG1ldGEuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgbWV0YVtuYW1lXSB8fCBbXTtcbiAgICAgIG1ldGFbbmFtZV0udW5zaGlmdChkZWNvcmF0b3JJbnN0YW5jZSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChwYXJlbnRDbGFzcykge1xuICAgIFByb3BEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50Q2xhc3MucHJvdG90eXBlKTtcbiAgfVxuXG4gIFByb3BEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZS5uZ01ldGFkYXRhTmFtZSA9IG5hbWU7XG4gICg8YW55PlByb3BEZWNvcmF0b3JGYWN0b3J5KS5hbm5vdGF0aW9uQ2xzID0gUHJvcERlY29yYXRvckZhY3Rvcnk7XG4gIHJldHVybiBQcm9wRGVjb3JhdG9yRmFjdG9yeTtcbn1cbiJdfQ==