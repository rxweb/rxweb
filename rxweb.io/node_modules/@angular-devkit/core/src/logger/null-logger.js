"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const rxjs_1 = require("rxjs");
const logger_1 = require("./logger");
class NullLogger extends logger_1.Logger {
    constructor(parent = null) {
        super('', parent);
        this._observable = rxjs_1.EMPTY;
    }
    asApi() {
        return {
            createChild: () => new NullLogger(this),
            log() { },
            debug() { },
            info() { },
            warn() { },
            error() { },
            fatal() { },
        };
    }
}
exports.NullLogger = NullLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbC1sb2dnZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL2xvZ2dlci9udWxsLWxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtCQUE2QjtBQUM3QixxQ0FBNkM7QUFHN0MsZ0JBQXdCLFNBQVEsZUFBTTtJQUNwQyxZQUFZLFNBQXdCLElBQUk7UUFDdEMsS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sQ0FBQztZQUNMLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDdkMsR0FBRyxLQUFJLENBQUM7WUFDUixLQUFLLEtBQUksQ0FBQztZQUNWLElBQUksS0FBSSxDQUFDO1lBQ1QsSUFBSSxLQUFJLENBQUM7WUFDVCxLQUFLLEtBQUksQ0FBQztZQUNWLEtBQUssS0FBSSxDQUFDO1NBQ0UsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFqQkQsZ0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvZ2dlciwgTG9nZ2VyQXBpIH0gZnJvbSAnLi9sb2dnZXInO1xuXG5cbmV4cG9ydCBjbGFzcyBOdWxsTG9nZ2VyIGV4dGVuZHMgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3IocGFyZW50OiBMb2dnZXIgfCBudWxsID0gbnVsbCkge1xuICAgIHN1cGVyKCcnLCBwYXJlbnQpO1xuICAgIHRoaXMuX29ic2VydmFibGUgPSBFTVBUWTtcbiAgfVxuXG4gIGFzQXBpKCk6IExvZ2dlckFwaSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNyZWF0ZUNoaWxkOiAoKSA9PiBuZXcgTnVsbExvZ2dlcih0aGlzKSxcbiAgICAgIGxvZygpIHt9LFxuICAgICAgZGVidWcoKSB7fSxcbiAgICAgIGluZm8oKSB7fSxcbiAgICAgIHdhcm4oKSB7fSxcbiAgICAgIGVycm9yKCkge30sXG4gICAgICBmYXRhbCgpIHt9LFxuICAgIH0gYXMgTG9nZ2VyQXBpO1xuICB9XG59XG4iXX0=