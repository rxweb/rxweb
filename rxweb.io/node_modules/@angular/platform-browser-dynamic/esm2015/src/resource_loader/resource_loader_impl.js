/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
export class ResourceLoaderImpl extends ResourceLoader {
    /**
     * @param {?} url
     * @return {?}
     */
    get(url) {
        /** @type {?} */
        let resolve;
        /** @type {?} */
        let reject;
        /** @type {?} */
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        /** @type {?} */
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'text';
        xhr.onload = function () {
            /** @type {?} */
            const response = xhr.response || xhr.responseText;
            /** @type {?} */
            let status = xhr.status === 1223 ? 204 : xhr.status;
            // fix status code when it is 0 (0 status is undocumented).
            // Occurs when accessing file resources or on Android 4.1 stock browser
            // while retrieving files from application cache.
            if (status === 0) {
                status = response ? 200 : 0;
            }
            if (200 <= status && status <= 300) {
                resolve(response);
            }
            else {
                reject(`Failed to load ${url}`);
            }
        };
        xhr.onerror = function () { reject(`Failed to load ${url}`); };
        xhr.send();
        return promise;
    }
}
ResourceLoaderImpl.decorators = [
    { type: Injectable }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VfbG9hZGVyX2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvc3JjL3Jlc291cmNlX2xvYWRlci9yZXNvdXJjZV9sb2FkZXJfaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBT0EsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJekMsTUFBTSx5QkFBMEIsU0FBUSxjQUFjOzs7OztJQUNwRCxHQUFHLENBQUMsR0FBVzs7UUFDYixJQUFJLE9BQU8sQ0FBd0I7O1FBQ25DLElBQUksTUFBTSxDQUF1Qjs7UUFDakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDL0MsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNkLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDZCxDQUFDLENBQUM7O1FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFFMUIsR0FBRyxDQUFDLE1BQU0sR0FBRzs7WUFJWCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUM7O1lBR2xELElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Ozs7WUFLcEQsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUVELElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO2dCQUNsQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0YsQ0FBQztRQUVGLEdBQUcsQ0FBQyxPQUFPLEdBQUcsY0FBYSxNQUFNLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRTlELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLE9BQU8sT0FBTyxDQUFDO0tBQ2hCOzs7WUF4Q0YsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7UmVzb3VyY2VMb2FkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc291cmNlTG9hZGVySW1wbCBleHRlbmRzIFJlc291cmNlTG9hZGVyIHtcbiAgZ2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsZXQgcmVzb2x2ZTogKHJlc3VsdDogYW55KSA9PiB2b2lkO1xuICAgIGxldCByZWplY3Q6IChlcnJvcjogYW55KSA9PiB2b2lkO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXMsIHJlaikgPT4ge1xuICAgICAgcmVzb2x2ZSA9IHJlcztcbiAgICAgIHJlamVjdCA9IHJlajtcbiAgICB9KTtcbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmVzcG9uc2VUZXh0IGlzIHRoZSBvbGQtc2Nob29sIHdheSBvZiByZXRyaWV2aW5nIHJlc3BvbnNlIChzdXBwb3J0ZWQgYnkgSUU4ICYgOSlcbiAgICAgIC8vIHJlc3BvbnNlL3Jlc3BvbnNlVHlwZSBwcm9wZXJ0aWVzIHdlcmUgaW50cm9kdWNlZCBpbiBSZXNvdXJjZUxvYWRlciBMZXZlbDIgc3BlYyAoc3VwcG9ydGVkXG4gICAgICAvLyBieSBJRTEwKVxuICAgICAgY29uc3QgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2UgfHwgeGhyLnJlc3BvbnNlVGV4dDtcblxuICAgICAgLy8gbm9ybWFsaXplIElFOSBidWcgKGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzE0NTApXG4gICAgICBsZXQgc3RhdHVzID0geGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXM7XG5cbiAgICAgIC8vIGZpeCBzdGF0dXMgY29kZSB3aGVuIGl0IGlzIDAgKDAgc3RhdHVzIGlzIHVuZG9jdW1lbnRlZCkuXG4gICAgICAvLyBPY2N1cnMgd2hlbiBhY2Nlc3NpbmcgZmlsZSByZXNvdXJjZXMgb3Igb24gQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlclxuICAgICAgLy8gd2hpbGUgcmV0cmlldmluZyBmaWxlcyBmcm9tIGFwcGxpY2F0aW9uIGNhY2hlLlxuICAgICAgaWYgKHN0YXR1cyA9PT0gMCkge1xuICAgICAgICBzdGF0dXMgPSByZXNwb25zZSA/IDIwMCA6IDA7XG4gICAgICB9XG5cbiAgICAgIGlmICgyMDAgPD0gc3RhdHVzICYmIHN0YXR1cyA8PSAzMDApIHtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoYEZhaWxlZCB0byBsb2FkICR7dXJsfWApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkgeyByZWplY3QoYEZhaWxlZCB0byBsb2FkICR7dXJsfWApOyB9O1xuXG4gICAgeGhyLnNlbmQoKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuIl19