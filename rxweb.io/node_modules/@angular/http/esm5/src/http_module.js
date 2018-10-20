/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
/**
 * @module
 * @description
 * The http module provides services to perform http requests. To get started, see the {@link Http}
 * class.
 */
import { NgModule } from '@angular/core';
import { BrowserJsonp } from './backends/browser_jsonp';
import { BrowserXhr } from './backends/browser_xhr';
import { JSONPBackend } from './backends/jsonp_backend';
import { CookieXSRFStrategy, XHRBackend } from './backends/xhr_backend';
import { BaseRequestOptions, RequestOptions } from './base_request_options';
import { BaseResponseOptions, ResponseOptions } from './base_response_options';
import { Http, Jsonp } from './http';
import { XSRFStrategy } from './interfaces';
export function _createDefaultCookieXSRFStrategy() {
    return new CookieXSRFStrategy();
}
export function httpFactory(xhrBackend, requestOptions) {
    return new Http(xhrBackend, requestOptions);
}
export function jsonpFactory(jsonpBackend, requestOptions) {
    return new Jsonp(jsonpBackend, requestOptions);
}
/**
 * The module that includes http's providers
 *
 * @deprecated see https://angular.io/guide/http
 */
var HttpModule = /** @class */ (function () {
    function HttpModule() {
    }
    HttpModule = tslib_1.__decorate([
        NgModule({
            providers: [
                // TODO(pascal): use factory type annotations once supported in DI
                // issue: https://github.com/angular/angular/issues/3183
                { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
                BrowserXhr,
                { provide: RequestOptions, useClass: BaseRequestOptions },
                { provide: ResponseOptions, useClass: BaseResponseOptions },
                XHRBackend,
                { provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy },
            ],
        })
    ], HttpModule);
    return HttpModule;
}());
export { HttpModule };
/**
 * The module that includes jsonp's providers
 *
 * @deprecated see https://angular.io/guide/http
 */
var JsonpModule = /** @class */ (function () {
    function JsonpModule() {
    }
    JsonpModule = tslib_1.__decorate([
        NgModule({
            providers: [
                // TODO(pascal): use factory type annotations once supported in DI
                // issue: https://github.com/angular/angular/issues/3183
                { provide: Jsonp, useFactory: jsonpFactory, deps: [JSONPBackend, RequestOptions] },
                BrowserJsonp,
                { provide: RequestOptions, useClass: BaseRequestOptions },
                { provide: ResponseOptions, useClass: BaseResponseOptions },
                JSONPBackend,
            ],
        })
    ], JsonpModule);
    return JsonpModule;
}());
export { JsonpModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9odHRwX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUg7Ozs7O0dBS0c7QUFDSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLG1CQUFtQixFQUFFLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFHMUMsTUFBTTtJQUNKLE9BQU8sSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0FBQ2xDLENBQUM7QUFFRCxNQUFNLHNCQUFzQixVQUFzQixFQUFFLGNBQThCO0lBQ2hGLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxNQUFNLHVCQUF1QixZQUEwQixFQUFFLGNBQThCO0lBQ3JGLE9BQU8sSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFHRDs7OztHQUlHO0FBYUg7SUFBQTtJQUNBLENBQUM7SUFEWSxVQUFVO1FBWnRCLFFBQVEsQ0FBQztZQUNSLFNBQVMsRUFBRTtnQkFDVCxrRUFBa0U7Z0JBQ2xFLHdEQUF3RDtnQkFDeEQsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxFQUFDO2dCQUM1RSxVQUFVO2dCQUNWLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUM7Z0JBQ3ZELEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUM7Z0JBQ3pELFVBQVU7Z0JBQ1YsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxnQ0FBZ0MsRUFBQzthQUN0RTtTQUNGLENBQUM7T0FDVyxVQUFVLENBQ3RCO0lBQUQsaUJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxVQUFVO0FBR3ZCOzs7O0dBSUc7QUFZSDtJQUFBO0lBQ0EsQ0FBQztJQURZLFdBQVc7UUFYdkIsUUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFO2dCQUNULGtFQUFrRTtnQkFDbEUsd0RBQXdEO2dCQUN4RCxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBQUM7Z0JBQ2hGLFlBQVk7Z0JBQ1osRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBQztnQkFDdkQsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQztnQkFDekQsWUFBWTthQUNiO1NBQ0YsQ0FBQztPQUNXLFdBQVcsQ0FDdkI7SUFBRCxrQkFBQztDQUFBLEFBREQsSUFDQztTQURZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgaHR0cCBtb2R1bGUgcHJvdmlkZXMgc2VydmljZXMgdG8gcGVyZm9ybSBodHRwIHJlcXVlc3RzLiBUbyBnZXQgc3RhcnRlZCwgc2VlIHRoZSB7QGxpbmsgSHR0cH1cbiAqIGNsYXNzLlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtCcm93c2VySnNvbnB9IGZyb20gJy4vYmFja2VuZHMvYnJvd3Nlcl9qc29ucCc7XG5pbXBvcnQge0Jyb3dzZXJYaHJ9IGZyb20gJy4vYmFja2VuZHMvYnJvd3Nlcl94aHInO1xuaW1wb3J0IHtKU09OUEJhY2tlbmR9IGZyb20gJy4vYmFja2VuZHMvanNvbnBfYmFja2VuZCc7XG5pbXBvcnQge0Nvb2tpZVhTUkZTdHJhdGVneSwgWEhSQmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kcy94aHJfYmFja2VuZCc7XG5pbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnN9IGZyb20gJy4vYmFzZV9yZXF1ZXN0X29wdGlvbnMnO1xuaW1wb3J0IHtCYXNlUmVzcG9uc2VPcHRpb25zLCBSZXNwb25zZU9wdGlvbnN9IGZyb20gJy4vYmFzZV9yZXNwb25zZV9vcHRpb25zJztcbmltcG9ydCB7SHR0cCwgSnNvbnB9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQge1hTUkZTdHJhdGVneX0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZURlZmF1bHRDb29raWVYU1JGU3RyYXRlZ3koKSB7XG4gIHJldHVybiBuZXcgQ29va2llWFNSRlN0cmF0ZWd5KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodHRwRmFjdG9yeSh4aHJCYWNrZW5kOiBYSFJCYWNrZW5kLCByZXF1ZXN0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMpOiBIdHRwIHtcbiAgcmV0dXJuIG5ldyBIdHRwKHhockJhY2tlbmQsIHJlcXVlc3RPcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25wRmFjdG9yeShqc29ucEJhY2tlbmQ6IEpTT05QQmFja2VuZCwgcmVxdWVzdE9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKTogSnNvbnAge1xuICByZXR1cm4gbmV3IEpzb25wKGpzb25wQmFja2VuZCwgcmVxdWVzdE9wdGlvbnMpO1xufVxuXG5cbi8qKlxuICogVGhlIG1vZHVsZSB0aGF0IGluY2x1ZGVzIGh0dHAncyBwcm92aWRlcnNcbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgLy8gVE9ETyhwYXNjYWwpOiB1c2UgZmFjdG9yeSB0eXBlIGFubm90YXRpb25zIG9uY2Ugc3VwcG9ydGVkIGluIERJXG4gICAgLy8gaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzMxODNcbiAgICB7cHJvdmlkZTogSHR0cCwgdXNlRmFjdG9yeTogaHR0cEZhY3RvcnksIGRlcHM6IFtYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc119LFxuICAgIEJyb3dzZXJYaHIsXG4gICAge3Byb3ZpZGU6IFJlcXVlc3RPcHRpb25zLCB1c2VDbGFzczogQmFzZVJlcXVlc3RPcHRpb25zfSxcbiAgICB7cHJvdmlkZTogUmVzcG9uc2VPcHRpb25zLCB1c2VDbGFzczogQmFzZVJlc3BvbnNlT3B0aW9uc30sXG4gICAgWEhSQmFja2VuZCxcbiAgICB7cHJvdmlkZTogWFNSRlN0cmF0ZWd5LCB1c2VGYWN0b3J5OiBfY3JlYXRlRGVmYXVsdENvb2tpZVhTUkZTdHJhdGVneX0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEh0dHBNb2R1bGUge1xufVxuXG4vKipcbiAqIFRoZSBtb2R1bGUgdGhhdCBpbmNsdWRlcyBqc29ucCdzIHByb3ZpZGVyc1xuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICAvLyBUT0RPKHBhc2NhbCk6IHVzZSBmYWN0b3J5IHR5cGUgYW5ub3RhdGlvbnMgb25jZSBzdXBwb3J0ZWQgaW4gRElcbiAgICAvLyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzE4M1xuICAgIHtwcm92aWRlOiBKc29ucCwgdXNlRmFjdG9yeToganNvbnBGYWN0b3J5LCBkZXBzOiBbSlNPTlBCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc119LFxuICAgIEJyb3dzZXJKc29ucCxcbiAgICB7cHJvdmlkZTogUmVxdWVzdE9wdGlvbnMsIHVzZUNsYXNzOiBCYXNlUmVxdWVzdE9wdGlvbnN9LFxuICAgIHtwcm92aWRlOiBSZXNwb25zZU9wdGlvbnMsIHVzZUNsYXNzOiBCYXNlUmVzcG9uc2VPcHRpb25zfSxcbiAgICBKU09OUEJhY2tlbmQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEpzb25wTW9kdWxlIHtcbn1cbiJdfQ==