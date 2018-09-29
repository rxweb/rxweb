/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
export var ANNOTATIONS = '__annotations__';
export var PARAMETERS = '__parameters__';
export var PROP_METADATA = '__prop__metadata__';
/**
 * @suppress {globalThis}
 */
export function makeDecorator(name, props, parentClass, chainFn, typeFn) {
    var metaCtor = makeMetadataCtor(props);
    function DecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        if (this instanceof DecoratorFactory) {
            metaCtor.call.apply(metaCtor, tslib_1.__spread([this], args));
            return this;
        }
        var annotationInstance = new ((_a = DecoratorFactory).bind.apply(_a, tslib_1.__spread([void 0], args)))();
        var TypeDecorator = function TypeDecorator(cls) {
            typeFn && typeFn.apply(void 0, tslib_1.__spread([cls], args));
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            var annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                cls[ANNOTATIONS] :
                Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
            annotations.push(annotationInstance);
            return cls;
        };
        if (chainFn)
            chainFn(TypeDecorator);
        return TypeDecorator;
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.ngMetadataName = name;
    DecoratorFactory.annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
function makeMetadataCtor(props) {
    return function ctor() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (props) {
            var values = props.apply(void 0, tslib_1.__spread(args));
            for (var propName in values) {
                this[propName] = values[propName];
            }
        }
    };
}
export function makeParamDecorator(name, props, parentClass) {
    var metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, tslib_1.__spread([void 0], args)))();
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
        function ParamDecorator(cls, unusedKey, index) {
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            var parameters = cls.hasOwnProperty(PARAMETERS) ?
                cls[PARAMETERS] :
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
    ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
export function makePropDecorator(name, props, parentClass) {
    var metaCtor = makeMetadataCtor(props);
    function PropDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var decoratorInstance = new ((_a = PropDecoratorFactory).bind.apply(_a, tslib_1.__spread([void 0], args)))();
        return function PropDecorator(target, name) {
            var constructor = target.constructor;
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            var meta = constructor.hasOwnProperty(PROP_METADATA) ?
                constructor[PROP_METADATA] :
                Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
        };
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.ngMetadataName = name;
    PropDecoratorFactory.annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3V0aWwvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBOEJILE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztBQUM3QyxNQUFNLENBQUMsSUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7QUFDM0MsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDO0FBRWxEOztHQUVHO0FBQ0gsTUFBTSx3QkFDRixJQUFZLEVBQUUsS0FBK0IsRUFBRSxXQUFpQixFQUNoRSxPQUFnQyxFQUFFLE1BQWtEO0lBRXRGLElBQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXpDO1FBQTBCLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7OztRQUN0QyxJQUFJLElBQUksWUFBWSxnQkFBZ0IsRUFBRTtZQUNwQyxRQUFRLENBQUMsSUFBSSxPQUFiLFFBQVEsb0JBQU0sSUFBSSxHQUFLLElBQUksR0FBRTtZQUM3QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxrQkFBa0IsUUFBTyxDQUFBLEtBQU0sZ0JBQWlCLENBQUEsMkNBQUksSUFBSSxLQUFDLENBQUM7UUFDaEUsSUFBTSxhQUFhLEdBQWlDLHVCQUF1QixHQUFjO1lBQ3ZGLE1BQU0sSUFBSSxNQUFNLGlDQUFDLEdBQUcsR0FBSyxJQUFJLEVBQUMsQ0FBQztZQUMvQiwyRkFBMkY7WUFDM0Ysc0RBQXNEO1lBQ3RELElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsR0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxjQUFj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LEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdkU7SUFFRCxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUMvQyxvQkFBcUIsQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUM7SUFDakUsT0FBTyxvQkFBb0IsQ0FBQztBQUM5QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuXG4vKipcbiAqIEFuIGludGVyZmFjZSBpbXBsZW1lbnRlZCBieSBhbGwgQW5ndWxhciB0eXBlIGRlY29yYXRvcnMsIHdoaWNoIGFsbG93cyB0aGVtIHRvIGJlIHVzZWQgYXMgRVM3XG4gKiBkZWNvcmF0b3JzIGFzIHdlbGwgYXNcbiAqIEFuZ3VsYXIgRFNMIHN5bnRheC5cbiAqXG4gKiBFUzcgc3ludGF4OlxuICpcbiAqIGBgYFxuICogQG5nLkNvbXBvbmVudCh7Li4ufSlcbiAqIGNsYXNzIE15Q2xhc3Mgey4uLn1cbiAqIGBgYFxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIEludm9rZSBhcyBFUzcgZGVjb3JhdG9yLlxuICAgKi9cbiAgPFQgZXh0ZW5kcyBUeXBlPGFueT4+KHR5cGU6IFQpOiBUO1xuXG4gIC8vIE1ha2UgVHlwZURlY29yYXRvciBhc3NpZ25hYmxlIHRvIGJ1aWx0LWluIFBhcmFtZXRlckRlY29yYXRvciB0eXBlLlxuICAvLyBQYXJhbWV0ZXJEZWNvcmF0b3IgaXMgZGVjbGFyZWQgaW4gbGliLmQudHMgYXMgYSBgZGVjbGFyZSB0eXBlYFxuICAvLyBzbyB3ZSBjYW5ub3QgZGVjbGFyZSB0aGlzIGludGVyZmFjZSBhcyBhIHN1YnR5cGUuXG4gIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMzc5I2lzc3VlY29tbWVudC0xMjYxNjk0MTdcbiAgKHRhcmdldDogT2JqZWN0LCBwcm9wZXJ0eUtleT86IHN0cmluZ3xzeW1ib2wsIHBhcmFtZXRlckluZGV4PzogbnVtYmVyKTogdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEFOTk9UQVRJT05TID0gJ19fYW5ub3RhdGlvbnNfXyc7XG5leHBvcnQgY29uc3QgUEFSQU1FVEVSUyA9ICdfX3BhcmFtZXRlcnNfXyc7XG5leHBvcnQgY29uc3QgUFJPUF9NRVRBREFUQSA9ICdfX3Byb3BfX21ldGFkYXRhX18nO1xuXG4vKipcbiAqIEBzdXBwcmVzcyB7Z2xvYmFsVGhpc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VEZWNvcmF0b3IoXG4gICAgbmFtZTogc3RyaW5nLCBwcm9wcz86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55LCBwYXJlbnRDbGFzcz86IGFueSxcbiAgICBjaGFpbkZuPzogKGZuOiBGdW5jdGlvbikgPT4gdm9pZCwgdHlwZUZuPzogKHR5cGU6IFR5cGU8YW55PiwgLi4uYXJnczogYW55W10pID0+IHZvaWQpOlxuICAgIHtuZXcgKC4uLmFyZ3M6IGFueVtdKTogYW55OyAoLi4uYXJnczogYW55W10pOiBhbnk7ICguLi5hcmdzOiBhbnlbXSk6IChjbHM6IGFueSkgPT4gYW55O30ge1xuICBjb25zdCBtZXRhQ3RvciA9IG1ha2VNZXRhZGF0YUN0b3IocHJvcHMpO1xuXG4gIGZ1bmN0aW9uIERlY29yYXRvckZhY3RvcnkoLi4uYXJnczogYW55W10pOiAoY2xzOiBhbnkpID0+IGFueSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBEZWNvcmF0b3JGYWN0b3J5KSB7XG4gICAgICBtZXRhQ3Rvci5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgYW5ub3RhdGlvbkluc3RhbmNlID0gbmV3ICg8YW55PkRlY29yYXRvckZhY3RvcnkpKC4uLmFyZ3MpO1xuICAgIGNvbnN0IFR5cGVEZWNvcmF0b3I6IFR5cGVEZWNvcmF0b3IgPSA8VHlwZURlY29yYXRvcj5mdW5jdGlvbiBUeXBlRGVjb3JhdG9yKGNsczogVHlwZTxhbnk+KSB7XG4gICAgICB0eXBlRm4gJiYgdHlwZUZuKGNscywgLi4uYXJncyk7XG4gICAgICAvLyBVc2Ugb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIGltcG9ydGFudCBzaW5jZSBpdCBjcmVhdGVzIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IHdoaWNoXG4gICAgICAvLyBwcmV2ZW50cyB0aGUgcHJvcGVydHkgaXMgY29waWVkIGR1cmluZyBzdWJjbGFzc2luZy5cbiAgICAgIGNvbnN0IGFubm90YXRpb25zID0gY2xzLmhhc093blByb3BlcnR5KEFOTk9UQVRJT05TKSA/XG4gICAgICAgICAgKGNscyBhcyBhbnkpW0FOTk9UQVRJT05TXSA6XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNscywgQU5OT1RBVElPTlMsIHt2YWx1ZTogW119KVtBTk5PVEFUSU9OU107XG4gICAgICBhbm5vdGF0aW9ucy5wdXNoKGFubm90YXRpb25JbnN0YW5jZSk7XG4gICAgICByZXR1cm4gY2xzO1xuICAgIH07XG4gICAgaWYgKGNoYWluRm4pIGNoYWluRm4oVHlwZURlY29yYXRvcik7XG4gICAgcmV0dXJuIFR5cGVEZWNvcmF0b3I7XG4gIH1cblxuICBpZiAocGFyZW50Q2xhc3MpIHtcbiAgICBEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50Q2xhc3MucHJvdG90eXBlKTtcbiAgfVxuXG4gIERlY29yYXRvckZhY3RvcnkucHJvdG90eXBlLm5nTWV0YWRhdGFOYW1lID0gbmFtZTtcbiAgKDxhbnk+RGVjb3JhdG9yRmFjdG9yeSkuYW5ub3RhdGlvbkNscyA9IERlY29yYXRvckZhY3Rvcnk7XG4gIHJldHVybiBEZWNvcmF0b3JGYWN0b3J5IGFzIGFueTtcbn1cblxuZnVuY3Rpb24gbWFrZU1ldGFkYXRhQ3Rvcihwcm9wcz86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogYW55IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHByb3BzKC4uLmFyZ3MpO1xuICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiB2YWx1ZXMpIHtcbiAgICAgICAgdGhpc1twcm9wTmFtZV0gPSB2YWx1ZXNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQYXJhbURlY29yYXRvcihcbiAgICBuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksIHBhcmVudENsYXNzPzogYW55KTogYW55IHtcbiAgY29uc3QgbWV0YUN0b3IgPSBtYWtlTWV0YWRhdGFDdG9yKHByb3BzKTtcbiAgZnVuY3Rpb24gUGFyYW1EZWNvcmF0b3JGYWN0b3J5KC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFBhcmFtRGVjb3JhdG9yRmFjdG9yeSkge1xuICAgICAgbWV0YUN0b3IuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY29uc3QgYW5ub3RhdGlvbkluc3RhbmNlID0gbmV3ICg8YW55PlBhcmFtRGVjb3JhdG9yRmFjdG9yeSkoLi4uYXJncyk7XG5cbiAgICAoPGFueT5QYXJhbURlY29yYXRvcikuYW5ub3RhdGlvbiA9IGFubm90YXRpb25JbnN0YW5jZTtcbiAgICByZXR1cm4gUGFyYW1EZWNvcmF0b3I7XG5cbiAgICBmdW5jdGlvbiBQYXJhbURlY29yYXRvcihjbHM6IGFueSwgdW51c2VkS2V5OiBhbnksIGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgICAgLy8gVXNlIG9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyBpbXBvcnRhbnQgc2luY2UgaXQgY3JlYXRlcyBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSB3aGljaFxuICAgICAgLy8gcHJldmVudHMgdGhlIHByb3BlcnR5IGlzIGNvcGllZCBkdXJpbmcgc3ViY2xhc3NpbmcuXG4gICAgICBjb25zdCBwYXJhbWV0ZXJzID0gY2xzLmhhc093blByb3BlcnR5KFBBUkFNRVRFUlMpID9cbiAgICAgICAgICAoY2xzIGFzIGFueSlbUEFSQU1FVEVSU10gOlxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbHMsIFBBUkFNRVRFUlMsIHt2YWx1ZTogW119KVtQQVJBTUVURVJTXTtcblxuICAgICAgLy8gdGhlcmUgbWlnaHQgYmUgZ2FwcyBpZiBzb21lIGluIGJldHdlZW4gcGFyYW1ldGVycyBkbyBub3QgaGF2ZSBhbm5vdGF0aW9ucy5cbiAgICAgIC8vIHdlIHBhZCB3aXRoIG51bGxzLlxuICAgICAgd2hpbGUgKHBhcmFtZXRlcnMubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHBhcmFtZXRlcnMucHVzaChudWxsKTtcbiAgICAgIH1cblxuICAgICAgKHBhcmFtZXRlcnNbaW5kZXhdID0gcGFyYW1ldGVyc1tpbmRleF0gfHwgW10pLnB1c2goYW5ub3RhdGlvbkluc3RhbmNlKTtcbiAgICAgIHJldHVybiBjbHM7XG4gICAgfVxuICB9XG4gIGlmIChwYXJlbnRDbGFzcykge1xuICAgIFBhcmFtRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudENsYXNzLnByb3RvdHlwZSk7XG4gIH1cbiAgUGFyYW1EZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZS5uZ01ldGFkYXRhTmFtZSA9IG5hbWU7XG4gICg8YW55PlBhcmFtRGVjb3JhdG9yRmFjdG9yeSkuYW5ub3RhdGlvbkNscyA9IFBhcmFtRGVjb3JhdG9yRmFjdG9yeTtcbiAgcmV0dXJuIFBhcmFtRGVjb3JhdG9yRmFjdG9yeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgIG5hbWU6IHN0cmluZywgcHJvcHM/OiAoLi4uYXJnczogYW55W10pID0+IGFueSwgcGFyZW50Q2xhc3M/OiBhbnkpOiBhbnkge1xuICBjb25zdCBtZXRhQ3RvciA9IG1ha2VNZXRhZGF0YUN0b3IocHJvcHMpO1xuXG4gIGZ1bmN0aW9uIFByb3BEZWNvcmF0b3JGYWN0b3J5KC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFByb3BEZWNvcmF0b3JGYWN0b3J5KSB7XG4gICAgICBtZXRhQ3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IGRlY29yYXRvckluc3RhbmNlID0gbmV3ICg8YW55PlByb3BEZWNvcmF0b3JGYWN0b3J5KSguLi5hcmdzKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBQcm9wRGVjb3JhdG9yKHRhcmdldDogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gdGFyZ2V0LmNvbnN0cnVjdG9yO1xuICAgICAgLy8gVXNlIG9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyBpbXBvcnRhbnQgc2luY2UgaXQgY3JlYXRlcyBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSB3aGljaFxuICAgICAgLy8gcHJldmVudHMgdGhlIHByb3BlcnR5IGlzIGNvcGllZCBkdXJpbmcgc3ViY2xhc3NpbmcuXG4gICAgICBjb25zdCBtZXRhID0gY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoUFJPUF9NRVRBREFUQSkgP1xuICAgICAgICAgIChjb25zdHJ1Y3RvciBhcyBhbnkpW1BST1BfTUVUQURBVEFdIDpcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsIFBST1BfTUVUQURBVEEsIHt2YWx1ZToge319KVtQUk9QX01FVEFEQVRBXTtcbiAgICAgIG1ldGFbbmFtZV0gPSBtZXRhLmhhc093blByb3BlcnR5KG5hbWUpICYmIG1ldGFbbmFtZV0gfHwgW107XG4gICAgICBtZXRhW25hbWVdLnVuc2hpZnQoZGVjb3JhdG9ySW5zdGFuY2UpO1xuICAgIH07XG4gIH1cblxuICBpZiAocGFyZW50Q2xhc3MpIHtcbiAgICBQcm9wRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudENsYXNzLnByb3RvdHlwZSk7XG4gIH1cblxuICBQcm9wRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUubmdNZXRhZGF0YU5hbWUgPSBuYW1lO1xuICAoPGFueT5Qcm9wRGVjb3JhdG9yRmFjdG9yeSkuYW5ub3RhdGlvbkNscyA9IFByb3BEZWNvcmF0b3JGYWN0b3J5O1xuICByZXR1cm4gUHJvcERlY29yYXRvckZhY3Rvcnk7XG59XG4iXX0=