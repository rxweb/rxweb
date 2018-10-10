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
import { Injectable } from '@angular/core';
import { ReadyState, Request } from '@angular/http';
import { ReplaySubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
/**
 *
 * Mock Connection to represent a {\@link Connection} for tests.
 *
 * @deprecated see https://angular.io/guide/http
 */
export class MockConnection {
    /**
     * @param {?} req
     */
    constructor(req) {
        this.response = /** @type {?} */ (new ReplaySubject(1).pipe(take(1)));
        this.readyState = ReadyState.Open;
        this.request = req;
    }
    /**
     * Sends a mock response to the connection. This response is the value that is emitted to the
     * {\@link EventEmitter} returned by {\@link Http}.
     *
     * ### Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => console.log(res.text()));
     * connection.mockRespond(new Response(new ResponseOptions({ body: 'fake response' }))); //logs
     * 'fake response'
     * ```
     *
     * @param {?} res
     * @return {?}
     */
    mockRespond(res) {
        if (this.readyState === ReadyState.Done || this.readyState === ReadyState.Cancelled) {
            throw new Error('Connection has already been resolved');
        }
        this.readyState = ReadyState.Done;
        this.response.next(res);
        this.response.complete();
    }
    /**
     * Not yet implemented!
     *
     * Sends the provided {\@link Response} to the `downloadObserver` of the `Request`
     * associated with this connection.
     * @param {?} res
     * @return {?}
     */
    mockDownload(res) {
        // this.request.downloadObserver.onNext(res);
        // if (res.bytesLoaded === res.totalBytes) {
        //   this.request.downloadObserver.onCompleted();
        // }
    }
    /**
     * Emits the provided error object as an error to the {\@link Response} {\@link EventEmitter}
     * returned
     * from {\@link Http}.
     *
     * ### Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => res, err => console.log(err)));
     * connection.mockError(new Error('error'));
     * ```
     *
     * @param {?=} err
     * @return {?}
     */
    mockError(err) {
        // Matches ResourceLoader semantics
        this.readyState = ReadyState.Done;
        this.response.error(err);
    }
}
if (false) {
    /**
     * Describes the state of the connection, based on `XMLHttpRequest.readyState`, but with
     * additional states. For example, state 5 indicates an aborted connection.
     * @type {?}
     */
    MockConnection.prototype.readyState;
    /**
     * {\@link Request} instance used to create the connection.
     * @type {?}
     */
    MockConnection.prototype.request;
    /**
     * {\@link EventEmitter} of {\@link Response}. Can be subscribed to in order to be notified when a
     * response is available.
     * @type {?}
     */
    MockConnection.prototype.response;
}
/**
 * A mock backend for testing the {\@link Http} service.
 *
 * This class can be injected in tests, and should be used to override providers
 * to other backends, such as {\@link XHRBackend}.
 *
 * ### Example
 *
 * ```
 * import {Injectable, Injector} from '\@angular/core';
 * import {async, fakeAsync, tick} from '\@angular/core/testing';
 * import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '\@angular/http';
 * import {Response, ResponseOptions} from '\@angular/http';
 * import {MockBackend, MockConnection} from '\@angular/http/testing';
 *
 * const HERO_ONE = 'HeroNrOne';
 * const HERO_TWO = 'WillBeAlwaysTheSecond';
 *
 * \@Injectable()
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
 * This method only exists in the mock implementation, not in real Backends.
 *
 * @deprecated see https://angular.io/guide/http
 */
export class MockBackend {
    constructor() {
        this.connectionsArray = [];
        this.connections = new Subject();
        this.connections.subscribe((connection) => this.connectionsArray.push(connection));
        this.pendingConnections = new Subject();
    }
    /**
     * Checks all connections, and raises an exception if any connection has not received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     * @return {?}
     */
    verifyNoPendingRequests() {
        /** @type {?} */
        let pending = 0;
        this.pendingConnections.subscribe((c) => pending++);
        if (pending > 0)
            throw new Error(`${pending} pending connections to be resolved`);
    }
    /**
     * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
     * connections, if it's expected that there are connections that have not yet received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     * @return {?}
     */
    resolveAllConnections() { this.connections.subscribe((c) => c.readyState = 4); }
    /**
     * Creates a new {\@link MockConnection}. This is equivalent to calling `new
     * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
     * emitter of this `MockBackend` instance. This method will usually only be used by tests
     * against the framework itself, not by end-users.
     * @param {?} req
     * @return {?}
     */
    createConnection(req) {
        if (!req || !(req instanceof Request)) {
            throw new Error(`createConnection requires an instance of Request, got ${req}`);
        }
        /** @type {?} */
        const connection = new MockConnection(req);
        this.connections.next(connection);
        return connection;
    }
}
MockBackend.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockBackend.ctorParameters = () => [];
if (false) {
    /**
     * {\@link EventEmitter}
     * of {\@link MockConnection} instances that have been created by this backend. Can be subscribed
     * to in order to respond to connections.
     *
     * ### Example
     *
     * ```
     * import {Injector} from '\@angular/core';
     * import {fakeAsync, tick} from '\@angular/core/testing';
     * import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '\@angular/http';
     * import {Response, ResponseOptions} from '\@angular/http';
     * import {MockBackend, MockConnection} from '\@angular/http/testing';
     *
     * it('should get a response', fakeAsync(() => {
     *      let connection:
     *          MockConnection;  // this will be set when a new connection is emitted from the
     *                           // backend.
     *      let text: string;    // this will be set from mock response
     *      let injector = Injector.create([
     *        {provide: ConnectionBackend, useClass: MockBackend},
     *        {provide: RequestOptions, useClass: BaseRequestOptions},
     *        Http,
     *      ]);
     *      let backend = injector.get(ConnectionBackend);
     *      let http = injector.get(Http);
     *      backend.connections.subscribe((c: MockConnection) => connection = c);
     *      http.request('something.json').toPromise().then((res: any) => text = res.text());
     *      connection.mockRespond(new Response(new ResponseOptions({body: 'Something'})));
     *      tick();
     *      expect(text).toBe('Something');
     *    }));
     * ```
     *
     * This property only exists in the mock implementation, not in real Backends.
     * @type {?}
     */
    MockBackend.prototype.connections;
    /**
     * An array representation of `connections`. This array will be updated with each connection that
     * is created by this backend.
     *
     * This property only exists in the mock implementation, not in real Backends.
     * @type {?}
     */
    MockBackend.prototype.connectionsArray;
    /**
     * {\@link EventEmitter} of {\@link MockConnection} instances that haven't yet been resolved (i.e.
     * with a `readyState`
     * less than 4). Used internally to verify that no connections are pending via the
     * `verifyNoPendingRequests` method.
     *
     * This property only exists in the mock implementation, not in real Backends.
     * @type {?}
     */
    MockBackend.prototype.pendingConnections;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19iYWNrZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvaHR0cC90ZXN0aW5nL3NyYy9tb2NrX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE9BQU8sRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsYUFBYSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFTcEMsTUFBTTs7OztJQW9CSixZQUFZLEdBQVk7UUFDdEIsSUFBSSxDQUFDLFFBQVEscUJBQVEsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0tBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQkQsV0FBVyxDQUFDLEdBQWE7UUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ25GLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzFCOzs7Ozs7Ozs7SUFRRCxZQUFZLENBQUMsR0FBYTs7Ozs7S0FLekI7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtCRCxTQUFTLENBQUMsR0FBVzs7UUFFbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFCO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEZELE1BQU07SUF1REo7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FDdEIsQ0FBQyxVQUEwQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7S0FDekM7Ozs7Ozs7SUFPRCx1QkFBdUI7O1FBQ3JCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBaUIsRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLE9BQU8sR0FBRyxDQUFDO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLE9BQU8scUNBQXFDLENBQUMsQ0FBQztLQUNuRjs7Ozs7Ozs7SUFRRCxxQkFBcUIsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7O0lBUWhHLGdCQUFnQixDQUFDLEdBQVk7UUFDM0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLE9BQU8sQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDakY7O1FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsT0FBTyxVQUFVLENBQUM7S0FDbkI7OztZQWhHRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb25uZWN0aW9uLCBDb25uZWN0aW9uQmFja2VuZCwgUmVhZHlTdGF0ZSwgUmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHtSZXBsYXlTdWJqZWN0LCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKlxuICpcbiAqIE1vY2sgQ29ubmVjdGlvbiB0byByZXByZXNlbnQgYSB7QGxpbmsgQ29ubmVjdGlvbn0gZm9yIHRlc3RzLlxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgY2xhc3MgTW9ja0Nvbm5lY3Rpb24gaW1wbGVtZW50cyBDb25uZWN0aW9uIHtcbiAgLy8gVE9ETzogTmFtZSBgcmVhZHlTdGF0ZWAgc2hvdWxkIGNoYW5nZSB0byBiZSBtb3JlIGdlbmVyaWMsIGFuZCBzdGF0ZXMgY291bGQgYmUgbWFkZSB0byBiZSBtb3JlXG4gIC8vIGRlc2NyaXB0aXZlIHRoYW4gUmVzb3VyY2VMb2FkZXIgc3RhdGVzLlxuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbiwgYmFzZWQgb24gYFhNTEh0dHBSZXF1ZXN0LnJlYWR5U3RhdGVgLCBidXQgd2l0aFxuICAgKiBhZGRpdGlvbmFsIHN0YXRlcy4gRm9yIGV4YW1wbGUsIHN0YXRlIDUgaW5kaWNhdGVzIGFuIGFib3J0ZWQgY29ubmVjdGlvbi5cbiAgICovXG4gIHJlYWR5U3RhdGU6IFJlYWR5U3RhdGU7XG5cbiAgLyoqXG4gICAqIHtAbGluayBSZXF1ZXN0fSBpbnN0YW5jZSB1c2VkIHRvIGNyZWF0ZSB0aGUgY29ubmVjdGlvbi5cbiAgICovXG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgLyoqXG4gICAqIHtAbGluayBFdmVudEVtaXR0ZXJ9IG9mIHtAbGluayBSZXNwb25zZX0uIENhbiBiZSBzdWJzY3JpYmVkIHRvIGluIG9yZGVyIHRvIGJlIG5vdGlmaWVkIHdoZW4gYVxuICAgKiByZXNwb25zZSBpcyBhdmFpbGFibGUuXG4gICAqL1xuICByZXNwb25zZTogUmVwbGF5U3ViamVjdDxSZXNwb25zZT47XG5cbiAgY29uc3RydWN0b3IocmVxOiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXNwb25zZSA9IDxhbnk+bmV3IFJlcGxheVN1YmplY3QoMSkucGlwZSh0YWtlKDEpKTtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLk9wZW47XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbW9jayByZXNwb25zZSB0byB0aGUgY29ubmVjdGlvbi4gVGhpcyByZXNwb25zZSBpcyB0aGUgdmFsdWUgdGhhdCBpcyBlbWl0dGVkIHRvIHRoZVxuICAgKiB7QGxpbmsgRXZlbnRFbWl0dGVyfSByZXR1cm5lZCBieSB7QGxpbmsgSHR0cH0uXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgY29ubmVjdGlvbjtcbiAgICogYmFja2VuZC5jb25uZWN0aW9ucy5zdWJzY3JpYmUoYyA9PiBjb25uZWN0aW9uID0gYyk7XG4gICAqIGh0dHAucmVxdWVzdCgnZGF0YS5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiBjb25zb2xlLmxvZyhyZXMudGV4dCgpKSk7XG4gICAqIGNvbm5lY3Rpb24ubW9ja1Jlc3BvbmQobmV3IFJlc3BvbnNlKG5ldyBSZXNwb25zZU9wdGlvbnMoeyBib2R5OiAnZmFrZSByZXNwb25zZScgfSkpKTsgLy9sb2dzXG4gICAqICdmYWtlIHJlc3BvbnNlJ1xuICAgKiBgYGBcbiAgICpcbiAgICovXG4gIG1vY2tSZXNwb25kKHJlczogUmVzcG9uc2UpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkRvbmUgfHwgdGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkNhbmNlbGxlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25uZWN0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVzb2x2ZWQnKTtcbiAgICB9XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5Eb25lO1xuICAgIHRoaXMucmVzcG9uc2UubmV4dChyZXMpO1xuICAgIHRoaXMucmVzcG9uc2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3QgeWV0IGltcGxlbWVudGVkIVxuICAgKlxuICAgKiBTZW5kcyB0aGUgcHJvdmlkZWQge0BsaW5rIFJlc3BvbnNlfSB0byB0aGUgYGRvd25sb2FkT2JzZXJ2ZXJgIG9mIHRoZSBgUmVxdWVzdGBcbiAgICogYXNzb2NpYXRlZCB3aXRoIHRoaXMgY29ubmVjdGlvbi5cbiAgICovXG4gIG1vY2tEb3dubG9hZChyZXM6IFJlc3BvbnNlKSB7XG4gICAgLy8gdGhpcy5yZXF1ZXN0LmRvd25sb2FkT2JzZXJ2ZXIub25OZXh0KHJlcyk7XG4gICAgLy8gaWYgKHJlcy5ieXRlc0xvYWRlZCA9PT0gcmVzLnRvdGFsQnl0ZXMpIHtcbiAgICAvLyAgIHRoaXMucmVxdWVzdC5kb3dubG9hZE9ic2VydmVyLm9uQ29tcGxldGVkKCk7XG4gICAgLy8gfVxuICB9XG5cbiAgLy8gVE9ETyhqZWZmYmNyb3NzKTogY29uc2lkZXIgdXNpbmcgUmVzcG9uc2UgdHlwZVxuICAvKipcbiAgICogRW1pdHMgdGhlIHByb3ZpZGVkIGVycm9yIG9iamVjdCBhcyBhbiBlcnJvciB0byB0aGUge0BsaW5rIFJlc3BvbnNlfSB7QGxpbmsgRXZlbnRFbWl0dGVyfVxuICAgKiByZXR1cm5lZFxuICAgKiBmcm9tIHtAbGluayBIdHRwfS5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBjb25uZWN0aW9uO1xuICAgKiBiYWNrZW5kLmNvbm5lY3Rpb25zLnN1YnNjcmliZShjID0+IGNvbm5lY3Rpb24gPSBjKTtcbiAgICogaHR0cC5yZXF1ZXN0KCdkYXRhLmpzb24nKS5zdWJzY3JpYmUocmVzID0+IHJlcywgZXJyID0+IGNvbnNvbGUubG9nKGVycikpKTtcbiAgICogY29ubmVjdGlvbi5tb2NrRXJyb3IobmV3IEVycm9yKCdlcnJvcicpKTtcbiAgICogYGBgXG4gICAqXG4gICAqL1xuICBtb2NrRXJyb3IoZXJyPzogRXJyb3IpIHtcbiAgICAvLyBNYXRjaGVzIFJlc291cmNlTG9hZGVyIHNlbWFudGljc1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuRG9uZTtcbiAgICB0aGlzLnJlc3BvbnNlLmVycm9yKGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBBIG1vY2sgYmFja2VuZCBmb3IgdGVzdGluZyB0aGUge0BsaW5rIEh0dHB9IHNlcnZpY2UuXG4gKlxuICogVGhpcyBjbGFzcyBjYW4gYmUgaW5qZWN0ZWQgaW4gdGVzdHMsIGFuZCBzaG91bGQgYmUgdXNlZCB0byBvdmVycmlkZSBwcm92aWRlcnNcbiAqIHRvIG90aGVyIGJhY2tlbmRzLCBzdWNoIGFzIHtAbGluayBYSFJCYWNrZW5kfS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQge2FzeW5jLCBmYWtlQXN5bmMsIHRpY2t9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG4gKiBpbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgQ29ubmVjdGlvbkJhY2tlbmQsIEh0dHAsIFJlcXVlc3RPcHRpb25zfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqIGltcG9ydCB7UmVzcG9uc2UsIFJlc3BvbnNlT3B0aW9uc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKiBpbXBvcnQge01vY2tCYWNrZW5kLCBNb2NrQ29ubmVjdGlvbn0gZnJvbSAnQGFuZ3VsYXIvaHR0cC90ZXN0aW5nJztcbiAqXG4gKiBjb25zdCBIRVJPX09ORSA9ICdIZXJvTnJPbmUnO1xuICogY29uc3QgSEVST19UV08gPSAnV2lsbEJlQWx3YXlzVGhlU2Vjb25kJztcbiAqXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBIZXJvU2VydmljZSB7XG4gKiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge31cbiAqXG4gKiAgIGdldEhlcm9lcygpOiBQcm9taXNlPFN0cmluZ1tdPiB7XG4gKiAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ215c2VydmljZXMuZGUvYXBpL2hlcm9lcycpXG4gKiAgICAgICAgIC50b1Byb21pc2UoKVxuICogICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkuZGF0YSlcbiAqICAgICAgICAgLmNhdGNoKGUgPT4gdGhpcy5oYW5kbGVFcnJvcihlKSk7XG4gKiAgIH1cbiAqXG4gKiAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG4gKiAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7XG4gKiAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICogICB9XG4gKiB9XG4gKlxuICogZGVzY3JpYmUoJ01vY2tCYWNrZW5kIEhlcm9TZXJ2aWNlIEV4YW1wbGUnLCAoKSA9PiB7XG4gKiAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICogICAgIHRoaXMuaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoW1xuICogICAgICAge3Byb3ZpZGU6IENvbm5lY3Rpb25CYWNrZW5kLCB1c2VDbGFzczogTW9ja0JhY2tlbmR9LFxuICogICAgICAge3Byb3ZpZGU6IFJlcXVlc3RPcHRpb25zLCB1c2VDbGFzczogQmFzZVJlcXVlc3RPcHRpb25zfSxcbiAqICAgICAgIEh0dHAsXG4gKiAgICAgICBIZXJvU2VydmljZSxcbiAqICAgICBdKTtcbiAqICAgICB0aGlzLmhlcm9TZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoSGVyb1NlcnZpY2UpO1xuICogICAgIHRoaXMuYmFja2VuZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KENvbm5lY3Rpb25CYWNrZW5kKSBhcyBNb2NrQmFja2VuZDtcbiAqICAgICB0aGlzLmJhY2tlbmQuY29ubmVjdGlvbnMuc3Vic2NyaWJlKChjb25uZWN0aW9uOiBhbnkpID0+IHRoaXMubGFzdENvbm5lY3Rpb24gPSBjb25uZWN0aW9uKTtcbiAqICAgfSk7XG4gKlxuICogICBpdCgnZ2V0SGVyb2VzKCkgc2hvdWxkIHF1ZXJ5IGN1cnJlbnQgc2VydmljZSB1cmwnLCAoKSA9PiB7XG4gKiAgICAgdGhpcy5oZXJvU2VydmljZS5nZXRIZXJvZXMoKTtcbiAqICAgICBleHBlY3QodGhpcy5sYXN0Q29ubmVjdGlvbikudG9CZURlZmluZWQoJ25vIGh0dHAgc2VydmljZSBjb25uZWN0aW9uIGF0IGFsbD8nKTtcbiAqICAgICBleHBlY3QodGhpcy5sYXN0Q29ubmVjdGlvbi5yZXF1ZXN0LnVybCkudG9NYXRjaCgvYXBpXFwvaGVyb2VzJC8sICd1cmwgaW52YWxpZCcpO1xuICogICB9KTtcbiAqXG4gKiAgIGl0KCdnZXRIZXJvZXMoKSBzaG91bGQgcmV0dXJuIHNvbWUgaGVyb2VzJywgZmFrZUFzeW5jKCgpID0+IHtcbiAqICAgICAgICBsZXQgcmVzdWx0OiBTdHJpbmdbXTtcbiAqICAgICAgICB0aGlzLmhlcm9TZXJ2aWNlLmdldEhlcm9lcygpLnRoZW4oKGhlcm9lczogU3RyaW5nW10pID0+IHJlc3VsdCA9IGhlcm9lcyk7XG4gKiAgICAgICAgdGhpcy5sYXN0Q29ubmVjdGlvbi5tb2NrUmVzcG9uZChuZXcgUmVzcG9uc2UobmV3IFJlc3BvbnNlT3B0aW9ucyh7XG4gKiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7ZGF0YTogW0hFUk9fT05FLCBIRVJPX1RXT119KSxcbiAqICAgICAgICB9KSkpO1xuICogICAgICAgIHRpY2soKTtcbiAqICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyLCAnc2hvdWxkIGNvbnRhaW4gZ2l2ZW4gYW1vdW50IG9mIGhlcm9lcycpO1xuICogICAgICAgIGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwoSEVST19PTkUsICcgSEVST19PTkUgc2hvdWxkIGJlIHRoZSBmaXJzdCBoZXJvJyk7XG4gKiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXSkudG9FcXVhbChIRVJPX1RXTywgJyBIRVJPX1RXTyBzaG91bGQgYmUgdGhlIHNlY29uZCBoZXJvJyk7XG4gKiAgICAgIH0pKTtcbiAqXG4gKiAgIGl0KCdnZXRIZXJvZXMoKSB3aGlsZSBzZXJ2ZXIgaXMgZG93bicsIGZha2VBc3luYygoKSA9PiB7XG4gKiAgICAgICAgbGV0IHJlc3VsdDogU3RyaW5nW107XG4gKiAgICAgICAgbGV0IGNhdGNoZWRFcnJvcjogYW55O1xuICogICAgICAgIHRoaXMuaGVyb1NlcnZpY2UuZ2V0SGVyb2VzKClcbiAqICAgICAgICAgICAgLnRoZW4oKGhlcm9lczogU3RyaW5nW10pID0+IHJlc3VsdCA9IGhlcm9lcylcbiAqICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiBjYXRjaGVkRXJyb3IgPSBlcnJvcik7XG4gKiAgICAgICAgdGhpcy5sYXN0Q29ubmVjdGlvbi5tb2NrRXJyb3IobmV3IFJlc3BvbnNlKG5ldyBSZXNwb25zZU9wdGlvbnMoe1xuICogICAgICAgICAgc3RhdHVzOiA0MDQsXG4gKiAgICAgICAgICBzdGF0dXNUZXh0OiAnVVJMIG5vdCBGb3VuZCcsXG4gKiAgICAgICAgfSkpKTtcbiAqICAgICAgICB0aWNrKCk7XG4gKiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVVuZGVmaW5lZCgpO1xuICogICAgICAgIGV4cGVjdChjYXRjaGVkRXJyb3IpLnRvQmVEZWZpbmVkKCk7XG4gKiAgICAgIH0pKTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja0JhY2tlbmQgaW1wbGVtZW50cyBDb25uZWN0aW9uQmFja2VuZCB7XG4gIC8qKlxuICAgKiB7QGxpbmsgRXZlbnRFbWl0dGVyfVxuICAgKiBvZiB7QGxpbmsgTW9ja0Nvbm5lY3Rpb259IGluc3RhbmNlcyB0aGF0IGhhdmUgYmVlbiBjcmVhdGVkIGJ5IHRoaXMgYmFja2VuZC4gQ2FuIGJlIHN1YnNjcmliZWRcbiAgICogdG8gaW4gb3JkZXIgdG8gcmVzcG9uZCB0byBjb25uZWN0aW9ucy5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIGltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICAgKiBpbXBvcnQge2Zha2VBc3luYywgdGlja30gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbiAgICogaW1wb3J0IHtCYXNlUmVxdWVzdE9wdGlvbnMsIENvbm5lY3Rpb25CYWNrZW5kLCBIdHRwLCBSZXF1ZXN0T3B0aW9uc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gICAqIGltcG9ydCB7UmVzcG9uc2UsIFJlc3BvbnNlT3B0aW9uc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gICAqIGltcG9ydCB7TW9ja0JhY2tlbmQsIE1vY2tDb25uZWN0aW9ufSBmcm9tICdAYW5ndWxhci9odHRwL3Rlc3RpbmcnO1xuICAgKlxuICAgKiBpdCgnc2hvdWxkIGdldCBhIHJlc3BvbnNlJywgZmFrZUFzeW5jKCgpID0+IHtcbiAgICogICAgICBsZXQgY29ubmVjdGlvbjpcbiAgICogICAgICAgICAgTW9ja0Nvbm5lY3Rpb247ICAvLyB0aGlzIHdpbGwgYmUgc2V0IHdoZW4gYSBuZXcgY29ubmVjdGlvbiBpcyBlbWl0dGVkIGZyb20gdGhlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmFja2VuZC5cbiAgICogICAgICBsZXQgdGV4dDogc3RyaW5nOyAgICAvLyB0aGlzIHdpbGwgYmUgc2V0IGZyb20gbW9jayByZXNwb25zZVxuICAgKiAgICAgIGxldCBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZShbXG4gICAqICAgICAgICB7cHJvdmlkZTogQ29ubmVjdGlvbkJhY2tlbmQsIHVzZUNsYXNzOiBNb2NrQmFja2VuZH0sXG4gICAqICAgICAgICB7cHJvdmlkZTogUmVxdWVzdE9wdGlvbnMsIHVzZUNsYXNzOiBCYXNlUmVxdWVzdE9wdGlvbnN9LFxuICAgKiAgICAgICAgSHR0cCxcbiAgICogICAgICBdKTtcbiAgICogICAgICBsZXQgYmFja2VuZCA9IGluamVjdG9yLmdldChDb25uZWN0aW9uQmFja2VuZCk7XG4gICAqICAgICAgbGV0IGh0dHAgPSBpbmplY3Rvci5nZXQoSHR0cCk7XG4gICAqICAgICAgYmFja2VuZC5jb25uZWN0aW9ucy5zdWJzY3JpYmUoKGM6IE1vY2tDb25uZWN0aW9uKSA9PiBjb25uZWN0aW9uID0gYyk7XG4gICAqICAgICAgaHR0cC5yZXF1ZXN0KCdzb21ldGhpbmcuanNvbicpLnRvUHJvbWlzZSgpLnRoZW4oKHJlczogYW55KSA9PiB0ZXh0ID0gcmVzLnRleHQoKSk7XG4gICAqICAgICAgY29ubmVjdGlvbi5tb2NrUmVzcG9uZChuZXcgUmVzcG9uc2UobmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keTogJ1NvbWV0aGluZyd9KSkpO1xuICAgKiAgICAgIHRpY2soKTtcbiAgICogICAgICBleHBlY3QodGV4dCkudG9CZSgnU29tZXRoaW5nJyk7XG4gICAqICAgIH0pKTtcbiAgICogYGBgXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgY29ubmVjdGlvbnM6IGFueTsgIC8vPE1vY2tDb25uZWN0aW9uPlxuXG4gIC8qKlxuICAgKiBBbiBhcnJheSByZXByZXNlbnRhdGlvbiBvZiBgY29ubmVjdGlvbnNgLiBUaGlzIGFycmF5IHdpbGwgYmUgdXBkYXRlZCB3aXRoIGVhY2ggY29ubmVjdGlvbiB0aGF0XG4gICAqIGlzIGNyZWF0ZWQgYnkgdGhpcyBiYWNrZW5kLlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IG9ubHkgZXhpc3RzIGluIHRoZSBtb2NrIGltcGxlbWVudGF0aW9uLCBub3QgaW4gcmVhbCBCYWNrZW5kcy5cbiAgICovXG4gIGNvbm5lY3Rpb25zQXJyYXk6IE1vY2tDb25uZWN0aW9uW107XG4gIC8qKlxuICAgKiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBvZiB7QGxpbmsgTW9ja0Nvbm5lY3Rpb259IGluc3RhbmNlcyB0aGF0IGhhdmVuJ3QgeWV0IGJlZW4gcmVzb2x2ZWQgKGkuZS5cbiAgICogd2l0aCBhIGByZWFkeVN0YXRlYFxuICAgKiBsZXNzIHRoYW4gNCkuIFVzZWQgaW50ZXJuYWxseSB0byB2ZXJpZnkgdGhhdCBubyBjb25uZWN0aW9ucyBhcmUgcGVuZGluZyB2aWEgdGhlXG4gICAqIGB2ZXJpZnlOb1BlbmRpbmdSZXF1ZXN0c2AgbWV0aG9kLlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IG9ubHkgZXhpc3RzIGluIHRoZSBtb2NrIGltcGxlbWVudGF0aW9uLCBub3QgaW4gcmVhbCBCYWNrZW5kcy5cbiAgICovXG4gIHBlbmRpbmdDb25uZWN0aW9uczogYW55OyAgLy8gU3ViamVjdDxNb2NrQ29ubmVjdGlvbj5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uc0FycmF5ID0gW107XG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IG5ldyBTdWJqZWN0KCk7XG4gICAgdGhpcy5jb25uZWN0aW9ucy5zdWJzY3JpYmUoXG4gICAgICAgIChjb25uZWN0aW9uOiBNb2NrQ29ubmVjdGlvbikgPT4gdGhpcy5jb25uZWN0aW9uc0FycmF5LnB1c2goY29ubmVjdGlvbikpO1xuICAgIHRoaXMucGVuZGluZ0Nvbm5lY3Rpb25zID0gbmV3IFN1YmplY3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgYWxsIGNvbm5lY3Rpb25zLCBhbmQgcmFpc2VzIGFuIGV4Y2VwdGlvbiBpZiBhbnkgY29ubmVjdGlvbiBoYXMgbm90IHJlY2VpdmVkIGEgcmVzcG9uc2UuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIG9ubHkgZXhpc3RzIGluIHRoZSBtb2NrIGltcGxlbWVudGF0aW9uLCBub3QgaW4gcmVhbCBCYWNrZW5kcy5cbiAgICovXG4gIHZlcmlmeU5vUGVuZGluZ1JlcXVlc3RzKCkge1xuICAgIGxldCBwZW5kaW5nID0gMDtcbiAgICB0aGlzLnBlbmRpbmdDb25uZWN0aW9ucy5zdWJzY3JpYmUoKGM6IE1vY2tDb25uZWN0aW9uKSA9PiBwZW5kaW5nKyspO1xuICAgIGlmIChwZW5kaW5nID4gMCkgdGhyb3cgbmV3IEVycm9yKGAke3BlbmRpbmd9IHBlbmRpbmcgY29ubmVjdGlvbnMgdG8gYmUgcmVzb2x2ZWRgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGB2ZXJpZnlOb1BlbmRpbmdSZXF1ZXN0c2AgdG8gcmVzb2x2ZSBhbnkgbm90LXlldC1yZXNvbHZlXG4gICAqIGNvbm5lY3Rpb25zLCBpZiBpdCdzIGV4cGVjdGVkIHRoYXQgdGhlcmUgYXJlIGNvbm5lY3Rpb25zIHRoYXQgaGF2ZSBub3QgeWV0IHJlY2VpdmVkIGEgcmVzcG9uc2UuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIG9ubHkgZXhpc3RzIGluIHRoZSBtb2NrIGltcGxlbWVudGF0aW9uLCBub3QgaW4gcmVhbCBCYWNrZW5kcy5cbiAgICovXG4gIHJlc29sdmVBbGxDb25uZWN0aW9ucygpIHsgdGhpcy5jb25uZWN0aW9ucy5zdWJzY3JpYmUoKGM6IE1vY2tDb25uZWN0aW9uKSA9PiBjLnJlYWR5U3RhdGUgPSA0KTsgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHtAbGluayBNb2NrQ29ubmVjdGlvbn0uIFRoaXMgaXMgZXF1aXZhbGVudCB0byBjYWxsaW5nIGBuZXdcbiAgICogTW9ja0Nvbm5lY3Rpb24oKWAsIGV4Y2VwdCB0aGF0IGl0IGFsc28gd2lsbCBlbWl0IHRoZSBuZXcgYENvbm5lY3Rpb25gIHRvIHRoZSBgY29ubmVjdGlvbnNgXG4gICAqIGVtaXR0ZXIgb2YgdGhpcyBgTW9ja0JhY2tlbmRgIGluc3RhbmNlLiBUaGlzIG1ldGhvZCB3aWxsIHVzdWFsbHkgb25seSBiZSB1c2VkIGJ5IHRlc3RzXG4gICAqIGFnYWluc3QgdGhlIGZyYW1ld29yayBpdHNlbGYsIG5vdCBieSBlbmQtdXNlcnMuXG4gICAqL1xuICBjcmVhdGVDb25uZWN0aW9uKHJlcTogUmVxdWVzdCk6IE1vY2tDb25uZWN0aW9uIHtcbiAgICBpZiAoIXJlcSB8fCAhKHJlcSBpbnN0YW5jZW9mIFJlcXVlc3QpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNyZWF0ZUNvbm5lY3Rpb24gcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgUmVxdWVzdCwgZ290ICR7cmVxfWApO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IE1vY2tDb25uZWN0aW9uKHJlcSk7XG4gICAgdGhpcy5jb25uZWN0aW9ucy5uZXh0KGNvbm5lY3Rpb24pO1xuICAgIHJldHVybiBjb25uZWN0aW9uO1xuICB9XG59XG4iXX0=