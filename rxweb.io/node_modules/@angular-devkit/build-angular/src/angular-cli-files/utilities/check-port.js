"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const portfinder = require('portfinder');
function checkPort(port, host, basePort = 49152) {
    return new rxjs_1.Observable(obs => {
        portfinder.basePort = basePort;
        // tslint:disable:no-any
        portfinder.getPort({ port, host }, (err, foundPort) => {
            if (err) {
                obs.error(err);
            }
            else if (port !== foundPort && port !== 0) {
                // If the port isn't available and we weren't looking for any port, throw error.
                obs.error(`Port ${port} is already in use. Use '--port' to specify a different port.`);
            }
            else {
                // Otherwise, our found port is good.
                obs.next(foundPort);
                obs.complete();
            }
        });
    });
}
exports.checkPort = checkPort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvdXRpbGl0aWVzL2NoZWNrLXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCwrQkFBa0M7QUFDbEMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBR3pDLG1CQUEwQixJQUFZLEVBQUUsSUFBWSxFQUFFLFFBQVEsR0FBRyxLQUFLO0lBQ3BFLE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDMUIsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDL0Isd0JBQXdCO1FBQ3hCLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFRLEVBQUUsU0FBaUIsRUFBRSxFQUFFO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLGdGQUFnRjtnQkFDaEYsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksK0RBQStELENBQUMsQ0FBQztZQUN6RixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04scUNBQXFDO2dCQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwQixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBakJELDhCQWlCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuY29uc3QgcG9ydGZpbmRlciA9IHJlcXVpcmUoJ3BvcnRmaW5kZXInKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tQb3J0KHBvcnQ6IG51bWJlciwgaG9zdDogc3RyaW5nLCBiYXNlUG9ydCA9IDQ5MTUyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9icyA9PiB7XG4gICAgcG9ydGZpbmRlci5iYXNlUG9ydCA9IGJhc2VQb3J0O1xuICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuICAgIHBvcnRmaW5kZXIuZ2V0UG9ydCh7IHBvcnQsIGhvc3QgfSwgKGVycjogYW55LCBmb3VuZFBvcnQ6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBvYnMuZXJyb3IoZXJyKTtcbiAgICAgIH0gZWxzZSBpZiAocG9ydCAhPT0gZm91bmRQb3J0ICYmIHBvcnQgIT09IDApIHtcbiAgICAgICAgLy8gSWYgdGhlIHBvcnQgaXNuJ3QgYXZhaWxhYmxlIGFuZCB3ZSB3ZXJlbid0IGxvb2tpbmcgZm9yIGFueSBwb3J0LCB0aHJvdyBlcnJvci5cbiAgICAgICAgb2JzLmVycm9yKGBQb3J0ICR7cG9ydH0gaXMgYWxyZWFkeSBpbiB1c2UuIFVzZSAnLS1wb3J0JyB0byBzcGVjaWZ5IGEgZGlmZmVyZW50IHBvcnQuYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UsIG91ciBmb3VuZCBwb3J0IGlzIGdvb2QuXG4gICAgICAgIG9icy5uZXh0KGZvdW5kUG9ydCk7XG4gICAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==