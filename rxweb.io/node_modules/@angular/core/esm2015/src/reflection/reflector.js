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
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export class Reflector {
    /**
     * @param {?} reflectionCapabilities
     */
    constructor(reflectionCapabilities) {
        this.reflectionCapabilities = reflectionCapabilities;
    }
    /**
     * @param {?} caps
     * @return {?}
     */
    updateCapabilities(caps) { this.reflectionCapabilities = caps; }
    /**
     * @param {?} type
     * @return {?}
     */
    factory(type) { return this.reflectionCapabilities.factory(type); }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    parameters(typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    }
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    hasLifecycleHook(type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getter(name) { return this.reflectionCapabilities.getter(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    setter(name) { return this.reflectionCapabilities.setter(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    method(name) { return this.reflectionCapabilities.method(name); }
    /**
     * @param {?} type
     * @return {?}
     */
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
    /**
     * @param {?} type
     * @return {?}
     */
    resourceUri(type) { return this.reflectionCapabilities.resourceUri(type); }
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    resolveIdentifier(name, moduleUrl, members, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
    }
    /**
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    resolveEnum(identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    }
}
if (false) {
    /** @type {?} */
    Reflector.prototype.reflectionCapabilities;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVmbGVjdGlvbi9yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU07Ozs7SUFDSixZQUFtQixzQkFBc0Q7UUFBdEQsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFnQztLQUFJOzs7OztJQUU3RSxrQkFBa0IsQ0FBQyxJQUFvQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsRUFBRTs7Ozs7SUFFaEcsT0FBTyxDQUFDLElBQWUsSUFBYyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFeEYsVUFBVSxDQUFDLFVBQXFCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMzRDs7Ozs7SUFFRCxXQUFXLENBQUMsVUFBcUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzVEOzs7OztJQUVELFlBQVksQ0FBQyxVQUFxQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0Q7Ozs7OztJQUVELGdCQUFnQixDQUFDLElBQVMsRUFBRSxVQUFrQjtRQUM1QyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDdkU7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVksSUFBYyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFbkYsTUFBTSxDQUFDLElBQVksSUFBYyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFbkYsTUFBTSxDQUFDLElBQVksSUFBYyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFbkYsU0FBUyxDQUFDLElBQVMsSUFBWSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFcEYsV0FBVyxDQUFDLElBQVMsSUFBWSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7SUFFeEYsaUJBQWlCLENBQUMsSUFBWSxFQUFFLFNBQWlCLEVBQUUsT0FBaUIsRUFBRSxPQUFZO1FBQ2hGLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3pGOzs7Ozs7SUFFRCxXQUFXLENBQUMsVUFBZSxFQUFFLElBQVk7UUFDdkMsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNsRTtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXN9IGZyb20gJy4vcGxhdGZvcm1fcmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMnO1xuaW1wb3J0IHtHZXR0ZXJGbiwgTWV0aG9kRm4sIFNldHRlckZufSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHtQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXN9O1xuZXhwb3J0IHtHZXR0ZXJGbiwgTWV0aG9kRm4sIFNldHRlckZufTtcblxuLyoqXG4gKiBQcm92aWRlcyBhY2Nlc3MgdG8gcmVmbGVjdGlvbiBkYXRhIGFib3V0IHN5bWJvbHMuIFVzZWQgaW50ZXJuYWxseSBieSBBbmd1bGFyXG4gKiB0byBwb3dlciBkZXBlbmRlbmN5IGluamVjdGlvbiBhbmQgY29tcGlsYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVmbGVjdGlvbkNhcGFiaWxpdGllczogUGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzKSB7fVxuXG4gIHVwZGF0ZUNhcGFiaWxpdGllcyhjYXBzOiBQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXMpIHsgdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gY2FwczsgfVxuXG4gIGZhY3RvcnkodHlwZTogVHlwZTxhbnk+KTogRnVuY3Rpb24geyByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmZhY3RvcnkodHlwZSk7IH1cblxuICBwYXJhbWV0ZXJzKHR5cGVPckZ1bmM6IFR5cGU8YW55Pik6IGFueVtdW10ge1xuICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucGFyYW1ldGVycyh0eXBlT3JGdW5jKTtcbiAgfVxuXG4gIGFubm90YXRpb25zKHR5cGVPckZ1bmM6IFR5cGU8YW55Pik6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmFubm90YXRpb25zKHR5cGVPckZ1bmMpO1xuICB9XG5cbiAgcHJvcE1ldGFkYXRhKHR5cGVPckZ1bmM6IFR5cGU8YW55Pik6IHtba2V5OiBzdHJpbmddOiBhbnlbXX0ge1xuICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucHJvcE1ldGFkYXRhKHR5cGVPckZ1bmMpO1xuICB9XG5cbiAgaGFzTGlmZWN5Y2xlSG9vayh0eXBlOiBhbnksIGxjUHJvcGVydHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaGFzTGlmZWN5Y2xlSG9vayh0eXBlLCBsY1Byb3BlcnR5KTtcbiAgfVxuXG4gIGdldHRlcihuYW1lOiBzdHJpbmcpOiBHZXR0ZXJGbiB7IHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuZ2V0dGVyKG5hbWUpOyB9XG5cbiAgc2V0dGVyKG5hbWU6IHN0cmluZyk6IFNldHRlckZuIHsgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5zZXR0ZXIobmFtZSk7IH1cblxuICBtZXRob2QobmFtZTogc3RyaW5nKTogTWV0aG9kRm4geyByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLm1ldGhvZChuYW1lKTsgfVxuXG4gIGltcG9ydFVyaSh0eXBlOiBhbnkpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmltcG9ydFVyaSh0eXBlKTsgfVxuXG4gIHJlc291cmNlVXJpKHR5cGU6IGFueSk6IHN0cmluZyB7IHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucmVzb3VyY2VVcmkodHlwZSk7IH1cblxuICByZXNvbHZlSWRlbnRpZmllcihuYW1lOiBzdHJpbmcsIG1vZHVsZVVybDogc3RyaW5nLCBtZW1iZXJzOiBzdHJpbmdbXSwgcnVudGltZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnJlc29sdmVJZGVudGlmaWVyKG5hbWUsIG1vZHVsZVVybCwgbWVtYmVycywgcnVudGltZSk7XG4gIH1cblxuICByZXNvbHZlRW51bShpZGVudGlmaWVyOiBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5yZXNvbHZlRW51bShpZGVudGlmaWVyLCBuYW1lKTtcbiAgfVxufVxuIl19