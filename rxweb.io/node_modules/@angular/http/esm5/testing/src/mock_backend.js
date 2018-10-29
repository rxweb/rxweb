/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ReadyState, Request } from '@angular/http';
import { ReplaySubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
/**
 *
 * Mock Connection to represent a {@link Connection} for tests.
 *
 * @usageNotes
 * ### Example of `mockRespond()`
 *
 * ```
 * var connection;
 * backend.connections.subscribe(c => connection = c);
 * http.request('data.json').subscribe(res => console.log(res.text()));
 * connection.mockRespond(new Response(new ResponseOptions({ body: 'fake response' }))); //logs
 * 'fake response'
 * ```
 *
 * ### Example of `mockError()`
 *
 * ```
 * var connection;
 * backend.connections.subscribe(c => connection = c);
 * http.request('data.json').subscribe(res => res, err => console.log(err)));
 * connection.mockError(new Error('error'));
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
var MockConnection = /** @class */ (function () {
    function MockConnection(req) {
        this.response = new ReplaySubject(1).pipe(take(1));
        this.readyState = ReadyState.Open;
        this.request = req;
    }
    /**
     * Sends a mock response to the connection. This response is the value that is emitted to the
     * {@link EventEmitter} returned by {@link Http}.
     *
     */
    MockConnection.prototype.mockRespond = function (res) {
        if (this.readyState === ReadyState.Done || this.readyState === ReadyState.Cancelled) {
            throw new Error('Connection has already been resolved');
        }
        this.readyState = ReadyState.Done;
        this.response.next(res);
        this.response.complete();
    };
    /**
     * Not yet implemented!
     *
     * Sends the provided {@link Response} to the `downloadObserver` of the `Request`
     * associated with this connection.
     */
    MockConnection.prototype.mockDownload = function (res) {
        // this.request.downloadObserver.onNext(res);
        // if (res.bytesLoaded === res.totalBytes) {
        //   this.request.downloadObserver.onCompleted();
        // }
    };
    // TODO(jeffbcross): consider using Response type
    /**
     * Emits the provided error object as an error to the {@link Response} {@link EventEmitter}
     * returned
     * from {@link Http}.
     *
     */
    MockConnection.prototype.mockError = function (err) {
        // Matches ResourceLoader semantics
        this.readyState = ReadyState.Done;
        this.response.error(err);
    };
    return MockConnection;
}());
export { MockConnection };
/**
 * A mock backend for testing the {@link Http} service.
 *
 * This class can be injected in tests, and should be used to override providers
 * to other backends, such as {@link XHRBackend}.
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * import {Injectable, Injector} from '@angular/core';
 * import {async, fakeAsync, tick} from '@angular/core/testing';
 * import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
 * import {Response, ResponseOptions} from '@angular/http';
 * import {MockBackend, MockConnection} from '@angular/http/testing';
 *
 * const HERO_ONE = 'HeroNrOne';
 * const HERO_TWO = 'WillBeAlwaysTheSecond';
 *
 * @Injectable()
 * class HeroService {
 *   constructor(private http: Http) {}
 *
 *   getHeroes(): Promise<String[]> {
 *     return this.http.get('myservices.de/api/heroes')
 *         .toPromise()
 *         .then(response => response.json().data)
 *         .catch(e => this.handleError(e));
 *   }
 *
 *   private handleError(error: any): Promise<any> {
 *     console.error('An error occurred', error);
 *     return Promise.reject(error.message || error);
 *   }
 * }
 *
 * describe('MockBackend HeroService Example', () => {
 *   beforeEach(() => {
 *     this.injector = Injector.create([
 *       {provide: ConnectionBackend, useClass: MockBackend},
 *       {provide: RequestOptions, useClass: BaseRequestOptions},
 *       Http,
 *       HeroService,
 *     ]);
 *     this.heroService = this.injector.get(HeroService);
 *     this.backend = this.injector.get(ConnectionBackend) as MockBackend;
 *     this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
 *   });
 *
 *   it('getHeroes() should query current service url', () => {
 *     this.heroService.getHeroes();
 *     expect(this.lastConnection).toBeDefined('no http service connection at all?');
 *     expect(this.lastConnection.request.url).toMatch(/api\/heroes$/, 'url invalid');
 *   });
 *
 *   it('getHeroes() should return some heroes', fakeAsync(() => {
 *        let result: String[];
 *        this.heroService.getHeroes().then((heroes: String[]) => result = heroes);
 *        this.lastConnection.mockRespond(new Response(new ResponseOptions({
 *          body: JSON.stringify({data: [HERO_ONE, HERO_TWO]}),
 *        })));
 *        tick();
 *        expect(result.length).toEqual(2, 'should contain given amount of heroes');
 *        expect(result[0]).toEqual(HERO_ONE, ' HERO_ONE should be the first hero');
 *        expect(result[1]).toEqual(HERO_TWO, ' HERO_TWO should be the second hero');
 *      }));
 *
 *   it('getHeroes() while server is down', fakeAsync(() => {
 *        let result: String[];
 *        let catchedError: any;
 *        this.heroService.getHeroes()
 *            .then((heroes: String[]) => result = heroes)
 *            .catch((error: any) => catchedError = error);
 *        this.lastConnection.mockError(new Response(new ResponseOptions({
 *          status: 404,
 *          statusText: 'URL not Found',
 *        })));
 *        tick();
 *        expect(result).toBeUndefined();
 *        expect(catchedError).toBeDefined();
 *      }));
 * });
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
var MockBackend = /** @class */ (function () {
    function MockBackend() {
        var _this = this;
        this.connectionsArray = [];
        this.connections = new Subject();
        this.connections.subscribe(function (connection) { return _this.connectionsArray.push(connection); });
        this.pendingConnections = new Subject();
    }
    /**
     * Checks all connections, and raises an exception if any connection has not received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    MockBackend.prototype.verifyNoPendingRequests = function () {
        var pending = 0;
        this.pendingConnections.subscribe(function (c) { return pending++; });
        if (pending > 0)
            throw new Error(pending + " pending connections to be resolved");
    };
    /**
     * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
     * connections, if it's expected that there are connections that have not yet received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    MockBackend.prototype.resolveAllConnections = function () { this.connections.subscribe(function (c) { return c.readyState = 4; }); };
    /**
     * Creates a new {@link MockConnection}. This is equivalent to calling `new
     * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
     * emitter of this `MockBackend` instance. This method will usually only be used by tests
     * against the framework itself, not by end-users.
     */
    MockBackend.prototype.createConnection = function (req) {
        if (!req || !(req instanceof Request)) {
            throw new Error("createConnection requires an instance of Request, got " + req);
        }
        var connection = new MockConnection(req);
        this.connections.next(connection);
        return connection;
    };
    MockBackend = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], MockBackend);
    return MockBackend;
}());
export { MockBackend };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19iYWNrZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvaHR0cC90ZXN0aW5nL3NyYy9tb2NrX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFnQyxVQUFVLEVBQUUsT0FBTyxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBQyxhQUFhLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNIO0lBb0JFLHdCQUFZLEdBQVk7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBUSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsb0NBQVcsR0FBWCxVQUFZLEdBQWE7UUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ25GLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHFDQUFZLEdBQVosVUFBYSxHQUFhO1FBQ3hCLDZDQUE2QztRQUM3Qyw0Q0FBNEM7UUFDNUMsaURBQWlEO1FBQ2pELElBQUk7SUFDTixDQUFDO0lBRUQsaURBQWlEO0lBQ2pEOzs7OztPQUtHO0lBQ0gsa0NBQVMsR0FBVCxVQUFVLEdBQVc7UUFDbkIsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBakVELElBaUVDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUZHO0FBRUg7SUEwQkU7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUN0QixVQUFDLFVBQTBCLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw2Q0FBdUIsR0FBdkI7UUFDRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQWlCLElBQUssT0FBQSxPQUFPLEVBQUUsRUFBVCxDQUFTLENBQUMsQ0FBQztRQUNwRSxJQUFJLE9BQU8sR0FBRyxDQUFDO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBSSxPQUFPLHdDQUFxQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsMkNBQXFCLEdBQXJCLGNBQTBCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBaUIsSUFBSyxPQUFBLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhHOzs7OztPQUtHO0lBQ0gsc0NBQWdCLEdBQWhCLFVBQWlCLEdBQVk7UUFDM0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLE9BQU8sQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQXlELEdBQUssQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQWxFVSxXQUFXO1FBRHZCLFVBQVUsRUFBRTs7T0FDQSxXQUFXLENBbUV2QjtJQUFELGtCQUFDO0NBQUEsQUFuRUQsSUFtRUM7U0FuRVksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29ubmVjdGlvbiwgQ29ubmVjdGlvbkJhY2tlbmQsIFJlYWR5U3RhdGUsIFJlcXVlc3QsIFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7UmVwbGF5U3ViamVjdCwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKipcbiAqXG4gKiBNb2NrIENvbm5lY3Rpb24gdG8gcmVwcmVzZW50IGEge0BsaW5rIENvbm5lY3Rpb259IGZvciB0ZXN0cy5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGUgb2YgYG1vY2tSZXNwb25kKClgXG4gKlxuICogYGBgXG4gKiB2YXIgY29ubmVjdGlvbjtcbiAqIGJhY2tlbmQuY29ubmVjdGlvbnMuc3Vic2NyaWJlKGMgPT4gY29ubmVjdGlvbiA9IGMpO1xuICogaHR0cC5yZXF1ZXN0KCdkYXRhLmpzb24nKS5zdWJzY3JpYmUocmVzID0+IGNvbnNvbGUubG9nKHJlcy50ZXh0KCkpKTtcbiAqIGNvbm5lY3Rpb24ubW9ja1Jlc3BvbmQobmV3IFJlc3BvbnNlKG5ldyBSZXNwb25zZU9wdGlvbnMoeyBib2R5OiAnZmFrZSByZXNwb25zZScgfSkpKTsgLy9sb2dzXG4gKiAnZmFrZSByZXNwb25zZSdcbiAqIGBgYFxuICpcbiAqICMjIyBFeGFtcGxlIG9mIGBtb2NrRXJyb3IoKWBcbiAqXG4gKiBgYGBcbiAqIHZhciBjb25uZWN0aW9uO1xuICogYmFja2VuZC5jb25uZWN0aW9ucy5zdWJzY3JpYmUoYyA9PiBjb25uZWN0aW9uID0gYyk7XG4gKiBodHRwLnJlcXVlc3QoJ2RhdGEuanNvbicpLnN1YnNjcmliZShyZXMgPT4gcmVzLCBlcnIgPT4gY29uc29sZS5sb2coZXJyKSkpO1xuICogY29ubmVjdGlvbi5tb2NrRXJyb3IobmV3IEVycm9yKCdlcnJvcicpKTtcbiAqIGBgYFxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgY2xhc3MgTW9ja0Nvbm5lY3Rpb24gaW1wbGVtZW50cyBDb25uZWN0aW9uIHtcbiAgLy8gVE9ETzogTmFtZSBgcmVhZHlTdGF0ZWAgc2hvdWxkIGNoYW5nZSB0byBiZSBtb3JlIGdlbmVyaWMsIGFuZCBzdGF0ZXMgY291bGQgYmUgbWFkZSB0byBiZSBtb3JlXG4gIC8vIGRlc2NyaXB0aXZlIHRoYW4gUmVzb3VyY2VMb2FkZXIgc3RhdGVzLlxuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbiwgYmFzZWQgb24gYFhNTEh0dHBSZXF1ZXN0LnJlYWR5U3RhdGVgLCBidXQgd2l0aFxuICAgKiBhZGRpdGlvbmFsIHN0YXRlcy4gRm9yIGV4YW1wbGUsIHN0YXRlIDUgaW5kaWNhdGVzIGFuIGFib3J0ZWQgY29ubmVjdGlvbi5cbiAgICovXG4gIHJlYWR5U3RhdGU6IFJlYWR5U3RhdGU7XG5cbiAgLyoqXG4gICAqIHtAbGluayBSZXF1ZXN0fSBpbnN0YW5jZSB1c2VkIHRvIGNyZWF0ZSB0aGUgY29ubmVjdGlvbi5cbiAgICovXG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgLyoqXG4gICAqIHtAbGluayBFdmVudEVtaXR0ZXJ9IG9mIHtAbGluayBSZXNwb25zZX0uIENhbiBiZSBzdWJzY3JpYmVkIHRvIGluIG9yZGVyIHRvIGJlIG5vdGlmaWVkIHdoZW4gYVxuICAgKiByZXNwb25zZSBpcyBhdmFpbGFibGUuXG4gICAqL1xuICByZXNwb25zZTogUmVwbGF5U3ViamVjdDxSZXNwb25zZT47XG5cbiAgY29uc3RydWN0b3IocmVxOiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXNwb25zZSA9IDxhbnk+bmV3IFJlcGxheVN1YmplY3QoMSkucGlwZSh0YWtlKDEpKTtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLk9wZW47XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbW9jayByZXNwb25zZSB0byB0aGUgY29ubmVjdGlvbi4gVGhpcyByZXNwb25zZSBpcyB0aGUgdmFsdWUgdGhhdCBpcyBlbWl0dGVkIHRvIHRoZVxuICAgKiB7QGxpbmsgRXZlbnRFbWl0dGVyfSByZXR1cm5lZCBieSB7QGxpbmsgSHR0cH0uXG4gICAqXG4gICAqL1xuICBtb2NrUmVzcG9uZChyZXM6IFJlc3BvbnNlKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5Eb25lIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29ubmVjdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlc29sdmVkJyk7XG4gICAgfVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuRG9uZTtcbiAgICB0aGlzLnJlc3BvbnNlLm5leHQocmVzKTtcbiAgICB0aGlzLnJlc3BvbnNlLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogTm90IHlldCBpbXBsZW1lbnRlZCFcbiAgICpcbiAgICogU2VuZHMgdGhlIHByb3ZpZGVkIHtAbGluayBSZXNwb25zZX0gdG8gdGhlIGBkb3dubG9hZE9ic2VydmVyYCBvZiB0aGUgYFJlcXVlc3RgXG4gICAqIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNvbm5lY3Rpb24uXG4gICAqL1xuICBtb2NrRG93bmxvYWQocmVzOiBSZXNwb25zZSkge1xuICAgIC8vIHRoaXMucmVxdWVzdC5kb3dubG9hZE9ic2VydmVyLm9uTmV4dChyZXMpO1xuICAgIC8vIGlmIChyZXMuYnl0ZXNMb2FkZWQgPT09IHJlcy50b3RhbEJ5dGVzKSB7XG4gICAgLy8gICB0aGlzLnJlcXVlc3QuZG93bmxvYWRPYnNlcnZlci5vbkNvbXBsZXRlZCgpO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8vIFRPRE8oamVmZmJjcm9zcyk6IGNvbnNpZGVyIHVzaW5nIFJlc3BvbnNlIHR5cGVcbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBwcm92aWRlZCBlcnJvciBvYmplY3QgYXMgYW4gZXJyb3IgdG8gdGhlIHtAbGluayBSZXNwb25zZX0ge0BsaW5rIEV2ZW50RW1pdHRlcn1cbiAgICogcmV0dXJuZWRcbiAgICogZnJvbSB7QGxpbmsgSHR0cH0uXG4gICAqXG4gICAqL1xuICBtb2NrRXJyb3IoZXJyPzogRXJyb3IpIHtcbiAgICAvLyBNYXRjaGVzIFJlc291cmNlTG9hZGVyIHNlbWFudGljc1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuRG9uZTtcbiAgICB0aGlzLnJlc3BvbnNlLmVycm9yKGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBBIG1vY2sgYmFja2VuZCBmb3IgdGVzdGluZyB0aGUge0BsaW5rIEh0dHB9IHNlcnZpY2UuXG4gKlxuICogVGhpcyBjbGFzcyBjYW4gYmUgaW5qZWN0ZWQgaW4gdGVzdHMsIGFuZCBzaG91bGQgYmUgdXNlZCB0byBvdmVycmlkZSBwcm92aWRlcnNcbiAqIHRvIG90aGVyIGJhY2tlbmRzLCBzdWNoIGFzIHtAbGluayBYSFJCYWNrZW5kfS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHthc3luYywgZmFrZUFzeW5jLCB0aWNrfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuICogaW1wb3J0IHtCYXNlUmVxdWVzdE9wdGlvbnMsIENvbm5lY3Rpb25CYWNrZW5kLCBIdHRwLCBSZXF1ZXN0T3B0aW9uc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKiBpbXBvcnQge1Jlc3BvbnNlLCBSZXNwb25zZU9wdGlvbnN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICogaW1wb3J0IHtNb2NrQmFja2VuZCwgTW9ja0Nvbm5lY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2h0dHAvdGVzdGluZyc7XG4gKlxuICogY29uc3QgSEVST19PTkUgPSAnSGVyb05yT25lJztcbiAqIGNvbnN0IEhFUk9fVFdPID0gJ1dpbGxCZUFsd2F5c1RoZVNlY29uZCc7XG4gKlxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgSGVyb1NlcnZpY2Uge1xuICogICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHt9XG4gKlxuICogICBnZXRIZXJvZXMoKTogUHJvbWlzZTxTdHJpbmdbXT4ge1xuICogICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdteXNlcnZpY2VzLmRlL2FwaS9oZXJvZXMnKVxuICogICAgICAgICAudG9Qcm9taXNlKClcbiAqICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpLmRhdGEpXG4gKiAgICAgICAgIC5jYXRjaChlID0+IHRoaXMuaGFuZGxlRXJyb3IoZSkpO1xuICogICB9XG4gKlxuICogICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICogICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyb3IpO1xuICogICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAqICAgfVxuICogfVxuICpcbiAqIGRlc2NyaWJlKCdNb2NrQmFja2VuZCBIZXJvU2VydmljZSBFeGFtcGxlJywgKCkgPT4ge1xuICogICBiZWZvcmVFYWNoKCgpID0+IHtcbiAqICAgICB0aGlzLmluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKFtcbiAqICAgICAgIHtwcm92aWRlOiBDb25uZWN0aW9uQmFja2VuZCwgdXNlQ2xhc3M6IE1vY2tCYWNrZW5kfSxcbiAqICAgICAgIHtwcm92aWRlOiBSZXF1ZXN0T3B0aW9ucywgdXNlQ2xhc3M6IEJhc2VSZXF1ZXN0T3B0aW9uc30sXG4gKiAgICAgICBIdHRwLFxuICogICAgICAgSGVyb1NlcnZpY2UsXG4gKiAgICAgXSk7XG4gKiAgICAgdGhpcy5oZXJvU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KEhlcm9TZXJ2aWNlKTtcbiAqICAgICB0aGlzLmJhY2tlbmQgPSB0aGlzLmluamVjdG9yLmdldChDb25uZWN0aW9uQmFja2VuZCkgYXMgTW9ja0JhY2tlbmQ7XG4gKiAgICAgdGhpcy5iYWNrZW5kLmNvbm5lY3Rpb25zLnN1YnNjcmliZSgoY29ubmVjdGlvbjogYW55KSA9PiB0aGlzLmxhc3RDb25uZWN0aW9uID0gY29ubmVjdGlvbik7XG4gKiAgIH0pO1xuICpcbiAqICAgaXQoJ2dldEhlcm9lcygpIHNob3VsZCBxdWVyeSBjdXJyZW50IHNlcnZpY2UgdXJsJywgKCkgPT4ge1xuICogICAgIHRoaXMuaGVyb1NlcnZpY2UuZ2V0SGVyb2VzKCk7XG4gKiAgICAgZXhwZWN0KHRoaXMubGFzdENvbm5lY3Rpb24pLnRvQmVEZWZpbmVkKCdubyBodHRwIHNlcnZpY2UgY29ubmVjdGlvbiBhdCBhbGw/Jyk7XG4gKiAgICAgZXhwZWN0KHRoaXMubGFzdENvbm5lY3Rpb24ucmVxdWVzdC51cmwpLnRvTWF0Y2goL2FwaVxcL2hlcm9lcyQvLCAndXJsIGludmFsaWQnKTtcbiAqICAgfSk7XG4gKlxuICogICBpdCgnZ2V0SGVyb2VzKCkgc2hvdWxkIHJldHVybiBzb21lIGhlcm9lcycsIGZha2VBc3luYygoKSA9PiB7XG4gKiAgICAgICAgbGV0IHJlc3VsdDogU3RyaW5nW107XG4gKiAgICAgICAgdGhpcy5oZXJvU2VydmljZS5nZXRIZXJvZXMoKS50aGVuKChoZXJvZXM6IFN0cmluZ1tdKSA9PiByZXN1bHQgPSBoZXJvZXMpO1xuICogICAgICAgIHRoaXMubGFzdENvbm5lY3Rpb24ubW9ja1Jlc3BvbmQobmV3IFJlc3BvbnNlKG5ldyBSZXNwb25zZU9wdGlvbnMoe1xuICogICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2RhdGE6IFtIRVJPX09ORSwgSEVST19UV09dfSksXG4gKiAgICAgICAgfSkpKTtcbiAqICAgICAgICB0aWNrKCk7XG4gKiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMiwgJ3Nob3VsZCBjb250YWluIGdpdmVuIGFtb3VudCBvZiBoZXJvZXMnKTtcbiAqICAgICAgICBleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKEhFUk9fT05FLCAnIEhFUk9fT05FIHNob3VsZCBiZSB0aGUgZmlyc3QgaGVybycpO1xuICogICAgICAgIGV4cGVjdChyZXN1bHRbMV0pLnRvRXF1YWwoSEVST19UV08sICcgSEVST19UV08gc2hvdWxkIGJlIHRoZSBzZWNvbmQgaGVybycpO1xuICogICAgICB9KSk7XG4gKlxuICogICBpdCgnZ2V0SGVyb2VzKCkgd2hpbGUgc2VydmVyIGlzIGRvd24nLCBmYWtlQXN5bmMoKCkgPT4ge1xuICogICAgICAgIGxldCByZXN1bHQ6IFN0cmluZ1tdO1xuICogICAgICAgIGxldCBjYXRjaGVkRXJyb3I6IGFueTtcbiAqICAgICAgICB0aGlzLmhlcm9TZXJ2aWNlLmdldEhlcm9lcygpXG4gKiAgICAgICAgICAgIC50aGVuKChoZXJvZXM6IFN0cmluZ1tdKSA9PiByZXN1bHQgPSBoZXJvZXMpXG4gKiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gY2F0Y2hlZEVycm9yID0gZXJyb3IpO1xuICogICAgICAgIHRoaXMubGFzdENvbm5lY3Rpb24ubW9ja0Vycm9yKG5ldyBSZXNwb25zZShuZXcgUmVzcG9uc2VPcHRpb25zKHtcbiAqICAgICAgICAgIHN0YXR1czogNDA0LFxuICogICAgICAgICAgc3RhdHVzVGV4dDogJ1VSTCBub3QgRm91bmQnLFxuICogICAgICAgIH0pKSk7XG4gKiAgICAgICAgdGljaygpO1xuICogICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVVbmRlZmluZWQoKTtcbiAqICAgICAgICBleHBlY3QoY2F0Y2hlZEVycm9yKS50b0JlRGVmaW5lZCgpO1xuICogICAgICB9KSk7XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja0JhY2tlbmQgaW1wbGVtZW50cyBDb25uZWN0aW9uQmFja2VuZCB7XG4gIC8qKlxuICAgKiB7QGxpbmsgRXZlbnRFbWl0dGVyfVxuICAgKiBvZiB7QGxpbmsgTW9ja0Nvbm5lY3Rpb259IGluc3RhbmNlcyB0aGF0IGhhdmUgYmVlbiBjcmVhdGVkIGJ5IHRoaXMgYmFja2VuZC4gQ2FuIGJlIHN1YnNjcmliZWRcbiAgICogdG8gaW4gb3JkZXIgdG8gcmVzcG9uZCB0byBjb25uZWN0aW9ucy5cbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSBvbmx5IGV4aXN0cyBpbiB0aGUgbW9jayBpbXBsZW1lbnRhdGlvbiwgbm90IGluIHJlYWwgQmFja2VuZHMuXG4gICAqL1xuICBjb25uZWN0aW9uczogYW55OyAgLy88TW9ja0Nvbm5lY3Rpb24+XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IHJlcHJlc2VudGF0aW9uIG9mIGBjb25uZWN0aW9uc2AuIFRoaXMgYXJyYXkgd2lsbCBiZSB1cGRhdGVkIHdpdGggZWFjaCBjb25uZWN0aW9uIHRoYXRcbiAgICogaXMgY3JlYXRlZCBieSB0aGlzIGJhY2tlbmQuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgY29ubmVjdGlvbnNBcnJheTogTW9ja0Nvbm5lY3Rpb25bXTtcbiAgLyoqXG4gICAqIHtAbGluayBFdmVudEVtaXR0ZXJ9IG9mIHtAbGluayBNb2NrQ29ubmVjdGlvbn0gaW5zdGFuY2VzIHRoYXQgaGF2ZW4ndCB5ZXQgYmVlbiByZXNvbHZlZCAoaS5lLlxuICAgKiB3aXRoIGEgYHJlYWR5U3RhdGVgXG4gICAqIGxlc3MgdGhhbiA0KS4gVXNlZCBpbnRlcm5hbGx5IHRvIHZlcmlmeSB0aGF0IG5vIGNvbm5lY3Rpb25zIGFyZSBwZW5kaW5nIHZpYSB0aGVcbiAgICogYHZlcmlmeU5vUGVuZGluZ1JlcXVlc3RzYCBtZXRob2QuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgcGVuZGluZ0Nvbm5lY3Rpb25zOiBhbnk7ICAvLyBTdWJqZWN0PE1vY2tDb25uZWN0aW9uPlxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb25zQXJyYXkgPSBbXTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gbmV3IFN1YmplY3QoKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zLnN1YnNjcmliZShcbiAgICAgICAgKGNvbm5lY3Rpb246IE1vY2tDb25uZWN0aW9uKSA9PiB0aGlzLmNvbm5lY3Rpb25zQXJyYXkucHVzaChjb25uZWN0aW9uKSk7XG4gICAgdGhpcy5wZW5kaW5nQ29ubmVjdGlvbnMgPSBuZXcgU3ViamVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBhbGwgY29ubmVjdGlvbnMsIGFuZCByYWlzZXMgYW4gZXhjZXB0aW9uIGlmIGFueSBjb25uZWN0aW9uIGhhcyBub3QgcmVjZWl2ZWQgYSByZXNwb25zZS5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgdmVyaWZ5Tm9QZW5kaW5nUmVxdWVzdHMoKSB7XG4gICAgbGV0IHBlbmRpbmcgPSAwO1xuICAgIHRoaXMucGVuZGluZ0Nvbm5lY3Rpb25zLnN1YnNjcmliZSgoYzogTW9ja0Nvbm5lY3Rpb24pID0+IHBlbmRpbmcrKyk7XG4gICAgaWYgKHBlbmRpbmcgPiAwKSB0aHJvdyBuZXcgRXJyb3IoYCR7cGVuZGluZ30gcGVuZGluZyBjb25uZWN0aW9ucyB0byBiZSByZXNvbHZlZGApO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYHZlcmlmeU5vUGVuZGluZ1JlcXVlc3RzYCB0byByZXNvbHZlIGFueSBub3QteWV0LXJlc29sdmVcbiAgICogY29ubmVjdGlvbnMsIGlmIGl0J3MgZXhwZWN0ZWQgdGhhdCB0aGVyZSBhcmUgY29ubmVjdGlvbnMgdGhhdCBoYXZlIG5vdCB5ZXQgcmVjZWl2ZWQgYSByZXNwb25zZS5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgcmVzb2x2ZUFsbENvbm5lY3Rpb25zKCkgeyB0aGlzLmNvbm5lY3Rpb25zLnN1YnNjcmliZSgoYzogTW9ja0Nvbm5lY3Rpb24pID0+IGMucmVhZHlTdGF0ZSA9IDQpOyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIE1vY2tDb25uZWN0aW9ufS4gVGhpcyBpcyBlcXVpdmFsZW50IHRvIGNhbGxpbmcgYG5ld1xuICAgKiBNb2NrQ29ubmVjdGlvbigpYCwgZXhjZXB0IHRoYXQgaXQgYWxzbyB3aWxsIGVtaXQgdGhlIG5ldyBgQ29ubmVjdGlvbmAgdG8gdGhlIGBjb25uZWN0aW9uc2BcbiAgICogZW1pdHRlciBvZiB0aGlzIGBNb2NrQmFja2VuZGAgaW5zdGFuY2UuIFRoaXMgbWV0aG9kIHdpbGwgdXN1YWxseSBvbmx5IGJlIHVzZWQgYnkgdGVzdHNcbiAgICogYWdhaW5zdCB0aGUgZnJhbWV3b3JrIGl0c2VsZiwgbm90IGJ5IGVuZC11c2Vycy5cbiAgICovXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxOiBSZXF1ZXN0KTogTW9ja0Nvbm5lY3Rpb24ge1xuICAgIGlmICghcmVxIHx8ICEocmVxIGluc3RhbmNlb2YgUmVxdWVzdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY3JlYXRlQ29ubmVjdGlvbiByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBSZXF1ZXN0LCBnb3QgJHtyZXF9YCk7XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgTW9ja0Nvbm5lY3Rpb24ocmVxKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zLm5leHQoY29ubmVjdGlvbik7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gIH1cbn1cbiJdfQ==