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
import { stringify } from '../util';
import { ComponentFactory } from './component_factory';
/**
 * @param {?} component
 * @return {?}
 */
export function noComponentFactoryError(component) {
    /** @type {?} */
    const error = Error(`No component factory found for ${stringify(component)}. Did you add it to @NgModule.entryComponents?`);
    (/** @type {?} */ (error))[ERROR_COMPONENT] = component;
    return error;
}
/** @type {?} */
const ERROR_COMPONENT = 'ngComponent';
/**
 * @param {?} error
 * @return {?}
 */
export function getComponent(error) {
    return (/** @type {?} */ (error))[ERROR_COMPONENT];
}
class _NullComponentFactoryResolver {
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    resolveComponentFactory(component) {
        throw noComponentFactoryError(component);
    }
}
/**
 * @abstract
 */
export class ComponentFactoryResolver {
}
ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
if (false) {
    /** @type {?} */
    ComponentFactoryResolver.NULL;
    /**
     * @abstract
     * @template T
     * @param {?} component
     * @return {?}
     */
    ComponentFactoryResolver.prototype.resolveComponentFactory = function (component) { };
}
export class CodegenComponentFactoryResolver {
    /**
     * @param {?} factories
     * @param {?} _parent
     * @param {?} _ngModule
     */
    constructor(factories, _parent, _ngModule) {
        this._parent = _parent;
        this._ngModule = _ngModule;
        this._factories = new Map();
        for (let i = 0; i < factories.length; i++) {
            /** @type {?} */
            const factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    resolveComponentFactory(component) {
        /** @type {?} */
        let factory = this._factories.get(component);
        if (!factory && this._parent) {
            factory = this._parent.resolveComponentFactory(component);
        }
        if (!factory) {
            throw noComponentFactoryError(component);
        }
        return new ComponentFactoryBoundToModule(factory, this._ngModule);
    }
}
if (false) {
    /** @type {?} */
    CodegenComponentFactoryResolver.prototype._factories;
    /** @type {?} */
    CodegenComponentFactoryResolver.prototype._parent;
    /** @type {?} */
    CodegenComponentFactoryResolver.prototype._ngModule;
}
/**
 * @template C
 */
export class ComponentFactoryBoundToModule extends ComponentFactory {
    /**
     * @param {?} factory
     * @param {?} ngModule
     */
    constructor(factory, ngModule) {
        super();
        this.factory = factory;
        this.ngModule = ngModule;
        this.selector = factory.selector;
        this.componentType = factory.componentType;
        this.ngContentSelectors = factory.ngContentSelectors;
        this.inputs = factory.inputs;
        this.outputs = factory.outputs;
    }
    /**
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    create(injector, projectableNodes, rootSelectorOrNode, ngModule) {
        return this.factory.create(injector, projectableNodes, rootSelectorOrNode, ngModule || this.ngModule);
    }
}
if (false) {
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.selector;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.componentType;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.ngContentSelectors;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.inputs;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.outputs;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.factory;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.ngModule;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X2ZhY3RvcnlfcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvY29tcG9uZW50X2ZhY3RvcnlfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFVQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRWxDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBZSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQUduRSxNQUFNLGtDQUFrQyxTQUFtQjs7SUFDekQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUNmLGtDQUFrQyxTQUFTLENBQUMsU0FBUyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDNUcsbUJBQUMsS0FBWSxFQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQzVDLE9BQU8sS0FBSyxDQUFDO0NBQ2Q7O0FBRUQsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDOzs7OztBQUV0QyxNQUFNLHVCQUF1QixLQUFZO0lBQ3ZDLE9BQU8sbUJBQUMsS0FBWSxFQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7Q0FDeEM7QUFHRDs7Ozs7O0lBQ0UsdUJBQXVCLENBQUksU0FBb0M7UUFDN0QsTUFBTSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMxQztDQUNGOzs7O0FBRUQsTUFBTTs7Z0NBQ29DLElBQUksNkJBQTZCLEVBQUU7Ozs7Ozs7Ozs7OztBQUk3RSxNQUFNOzs7Ozs7SUFHSixZQUNJLFNBQWtDLEVBQVUsT0FBaUMsRUFDckU7UUFEb0MsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFDckUsY0FBUyxHQUFULFNBQVM7MEJBSkEsSUFBSSxHQUFHLEVBQThCO1FBS3hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztZQUN6QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNyRDtLQUNGOzs7Ozs7SUFFRCx1QkFBdUIsQ0FBSSxTQUFvQzs7UUFDN0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksNkJBQTZCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNuRTtDQUNGOzs7Ozs7Ozs7Ozs7QUFFRCxNQUFNLG9DQUF3QyxTQUFRLGdCQUFtQjs7Ozs7SUFPdkUsWUFBb0IsT0FBNEIsRUFBVSxRQUEwQjtRQUNsRixLQUFLLEVBQUUsQ0FBQztRQURVLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFFbEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7S0FDaEM7Ozs7Ozs7O0lBRUQsTUFBTSxDQUNGLFFBQWtCLEVBQUUsZ0JBQTBCLEVBQUUsa0JBQStCLEVBQy9FLFFBQTJCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ3RCLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmfSBmcm9tICcuL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7TmdNb2R1bGVSZWZ9IGZyb20gJy4vbmdfbW9kdWxlX2ZhY3RvcnknO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9Db21wb25lbnRGYWN0b3J5RXJyb3IoY29tcG9uZW50OiBGdW5jdGlvbikge1xuICBjb25zdCBlcnJvciA9IEVycm9yKFxuICAgICAgYE5vIGNvbXBvbmVudCBmYWN0b3J5IGZvdW5kIGZvciAke3N0cmluZ2lmeShjb21wb25lbnQpfS4gRGlkIHlvdSBhZGQgaXQgdG8gQE5nTW9kdWxlLmVudHJ5Q29tcG9uZW50cz9gKTtcbiAgKGVycm9yIGFzIGFueSlbRVJST1JfQ09NUE9ORU5UXSA9IGNvbXBvbmVudDtcbiAgcmV0dXJuIGVycm9yO1xufVxuXG5jb25zdCBFUlJPUl9DT01QT05FTlQgPSAnbmdDb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50KGVycm9yOiBFcnJvcik6IFR5cGU8YW55PiB7XG4gIHJldHVybiAoZXJyb3IgYXMgYW55KVtFUlJPUl9DT01QT05FTlRdO1xufVxuXG5cbmNsYXNzIF9OdWxsQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIGltcGxlbWVudHMgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHtcbiAgcmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50OiB7bmV3ICguLi5hcmdzOiBhbnlbXSk6IFR9KTogQ29tcG9uZW50RmFjdG9yeTxUPiB7XG4gICAgdGhyb3cgbm9Db21wb25lbnRGYWN0b3J5RXJyb3IoY29tcG9uZW50KTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHtcbiAgc3RhdGljIE5VTEw6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciA9IG5ldyBfTnVsbENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcigpO1xuICBhYnN0cmFjdCByZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxUPihjb21wb25lbnQ6IFR5cGU8VD4pOiBDb21wb25lbnRGYWN0b3J5PFQ+O1xufVxuXG5leHBvcnQgY2xhc3MgQ29kZWdlbkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciBpbXBsZW1lbnRzIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB7XG4gIHByaXZhdGUgX2ZhY3RvcmllcyA9IG5ldyBNYXA8YW55LCBDb21wb25lbnRGYWN0b3J5PGFueT4+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBmYWN0b3JpZXM6IENvbXBvbmVudEZhY3Rvcnk8YW55PltdLCBwcml2YXRlIF9wYXJlbnQ6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIHByaXZhdGUgX25nTW9kdWxlOiBOZ01vZHVsZVJlZjxhbnk+KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmYWN0b3JpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGZhY3RvcnkgPSBmYWN0b3JpZXNbaV07XG4gICAgICB0aGlzLl9mYWN0b3JpZXMuc2V0KGZhY3RvcnkuY29tcG9uZW50VHlwZSwgZmFjdG9yeSk7XG4gICAgfVxuICB9XG5cbiAgcmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50OiB7bmV3ICguLi5hcmdzOiBhbnlbXSk6IFR9KTogQ29tcG9uZW50RmFjdG9yeTxUPiB7XG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLl9mYWN0b3JpZXMuZ2V0KGNvbXBvbmVudCk7XG4gICAgaWYgKCFmYWN0b3J5ICYmIHRoaXMuX3BhcmVudCkge1xuICAgICAgZmFjdG9yeSA9IHRoaXMuX3BhcmVudC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgIH1cbiAgICBpZiAoIWZhY3RvcnkpIHtcbiAgICAgIHRocm93IG5vQ29tcG9uZW50RmFjdG9yeUVycm9yKGNvbXBvbmVudCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQ29tcG9uZW50RmFjdG9yeUJvdW5kVG9Nb2R1bGUoZmFjdG9yeSwgdGhpcy5fbmdNb2R1bGUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRGYWN0b3J5Qm91bmRUb01vZHVsZTxDPiBleHRlbmRzIENvbXBvbmVudEZhY3Rvcnk8Qz4ge1xuICByZWFkb25seSBzZWxlY3Rvcjogc3RyaW5nO1xuICByZWFkb25seSBjb21wb25lbnRUeXBlOiBUeXBlPGFueT47XG4gIHJlYWRvbmx5IG5nQ29udGVudFNlbGVjdG9yczogc3RyaW5nW107XG4gIHJlYWRvbmx5IGlucHV0czoge3Byb3BOYW1lOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nfVtdO1xuICByZWFkb25seSBvdXRwdXRzOiB7cHJvcE5hbWU6IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmd9W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PEM+LCBwcml2YXRlIG5nTW9kdWxlOiBOZ01vZHVsZVJlZjxhbnk+KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNlbGVjdG9yID0gZmFjdG9yeS5zZWxlY3RvcjtcbiAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBmYWN0b3J5LmNvbXBvbmVudFR5cGU7XG4gICAgdGhpcy5uZ0NvbnRlbnRTZWxlY3RvcnMgPSBmYWN0b3J5Lm5nQ29udGVudFNlbGVjdG9ycztcbiAgICB0aGlzLmlucHV0cyA9IGZhY3RvcnkuaW5wdXRzO1xuICAgIHRoaXMub3V0cHV0cyA9IGZhY3Rvcnkub3V0cHV0cztcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICAgIGluamVjdG9yOiBJbmplY3RvciwgcHJvamVjdGFibGVOb2Rlcz86IGFueVtdW10sIHJvb3RTZWxlY3Rvck9yTm9kZT86IHN0cmluZ3xhbnksXG4gICAgICBuZ01vZHVsZT86IE5nTW9kdWxlUmVmPGFueT4pOiBDb21wb25lbnRSZWY8Qz4ge1xuICAgIHJldHVybiB0aGlzLmZhY3RvcnkuY3JlYXRlKFxuICAgICAgICBpbmplY3RvciwgcHJvamVjdGFibGVOb2Rlcywgcm9vdFNlbGVjdG9yT3JOb2RlLCBuZ01vZHVsZSB8fCB0aGlzLm5nTW9kdWxlKTtcbiAgfVxufVxuIl19