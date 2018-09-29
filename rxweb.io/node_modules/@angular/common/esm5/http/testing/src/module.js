/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpTestingController } from './api';
import { HttpClientTestingBackend } from './backend';
/**
 * Configures `HttpClientTestingBackend` as the `HttpBackend` used by `HttpClient`.
 *
 * Inject `HttpTestingController` to expect and flush requests in your tests.
 *
 *
 */
var HttpClientTestingModule = /** @class */ (function () {
    function HttpClientTestingModule() {
    }
    HttpClientTestingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        HttpClientModule,
                    ],
                    providers: [
                        HttpClientTestingBackend,
                        { provide: HttpBackend, useExisting: HttpClientTestingBackend },
                        { provide: HttpTestingController, useExisting: HttpClientTestingBackend },
                    ],
                },] }
    ];
    return HttpClientTestingModule;
}());
export { HttpClientTestingModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL2h0dHAvdGVzdGluZy9zcmMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUM1QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFHbkQ7Ozs7OztHQU1HO0FBQ0g7SUFBQTtJQVdBLENBQUM7O2dCQVhBLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3FCQUNqQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsd0JBQXdCO3dCQUN4QixFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFDO3dCQUM3RCxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsd0JBQXdCLEVBQUM7cUJBQ3hFO2lCQUNGOztJQUVELDhCQUFDO0NBQUEsQUFYRCxJQVdDO1NBRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0h0dHBCYWNrZW5kLCBIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtIdHRwVGVzdGluZ0NvbnRyb2xsZXJ9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7SHR0cENsaWVudFRlc3RpbmdCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQnO1xuXG5cbi8qKlxuICogQ29uZmlndXJlcyBgSHR0cENsaWVudFRlc3RpbmdCYWNrZW5kYCBhcyB0aGUgYEh0dHBCYWNrZW5kYCB1c2VkIGJ5IGBIdHRwQ2xpZW50YC5cbiAqXG4gKiBJbmplY3QgYEh0dHBUZXN0aW5nQ29udHJvbGxlcmAgdG8gZXhwZWN0IGFuZCBmbHVzaCByZXF1ZXN0cyBpbiB5b3VyIHRlc3RzLlxuICpcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBIdHRwQ2xpZW50VGVzdGluZ0JhY2tlbmQsXG4gICAge3Byb3ZpZGU6IEh0dHBCYWNrZW5kLCB1c2VFeGlzdGluZzogSHR0cENsaWVudFRlc3RpbmdCYWNrZW5kfSxcbiAgICB7cHJvdmlkZTogSHR0cFRlc3RpbmdDb250cm9sbGVyLCB1c2VFeGlzdGluZzogSHR0cENsaWVudFRlc3RpbmdCYWNrZW5kfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudFRlc3RpbmdNb2R1bGUge1xufVxuIl19