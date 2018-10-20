"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// Host is used instead of ReadonlyHost due to most decorators only supporting Hosts
class WebpackInputHost {
    constructor(inputFileSystem) {
        this.inputFileSystem = inputFileSystem;
    }
    get capabilities() {
        return { synchronous: true };
    }
    write(_path, _content) {
        return rxjs_1.throwError(new Error('Not supported.'));
    }
    delete(_path) {
        return rxjs_1.throwError(new Error('Not supported.'));
    }
    rename(_from, _to) {
        return rxjs_1.throwError(new Error('Not supported.'));
    }
    read(path) {
        return new rxjs_1.Observable(obs => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            try {
                const data = this.inputFileSystem.readFileSync(core_1.getSystemPath(path));
                obs.next(new Uint8Array(data).buffer);
                obs.complete();
            }
            catch (e) {
                obs.error(e);
            }
        });
    }
    list(path) {
        return new rxjs_1.Observable(obs => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            try {
                const names = this.inputFileSystem.readdirSync(core_1.getSystemPath(path));
                obs.next(names.map(name => core_1.fragment(name)));
                obs.complete();
            }
            catch (err) {
                obs.error(err);
            }
        });
    }
    exists(path) {
        return this.stat(path).pipe(operators_1.map(stats => stats != null));
    }
    isDirectory(path) {
        return this.stat(path).pipe(operators_1.map(stats => stats != null && stats.isDirectory()));
    }
    isFile(path) {
        return this.stat(path).pipe(operators_1.map(stats => stats != null && stats.isFile()));
    }
    stat(path) {
        return new rxjs_1.Observable(obs => {
            try {
                const stats = this.inputFileSystem.statSync(core_1.getSystemPath(path));
                obs.next(stats);
                obs.complete();
            }
            catch (e) {
                if (e.code === 'ENOENT') {
                    obs.next(null);
                    obs.complete();
                }
                else {
                    obs.error(e);
                }
            }
        });
    }
    watch(_path, _options) {
        return null;
    }
}
exports.WebpackInputHost = WebpackInputHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1pbnB1dC1ob3N0LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL3dlYnBhY2staW5wdXQtaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUE4RjtBQUU5RiwrQkFBOEM7QUFDOUMsOENBQXFDO0FBR3JDLG9GQUFvRjtBQUNwRjtJQUVFLFlBQTRCLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFJLENBQUM7SUFFakUsSUFBSSxZQUFZO1FBQ2QsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQVcsRUFBRSxRQUFrQztRQUNuRCxPQUFPLGlCQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxNQUFNLENBQUMsS0FBVztRQUNoQixPQUFPLGlCQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxNQUFNLENBQUMsS0FBVyxFQUFFLEdBQVM7UUFDM0IsT0FBTyxpQkFBVSxDQUFDLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVU7UUFDYixPQUFPLElBQUksaUJBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxQiwwRkFBMEY7WUFDMUYsU0FBUztZQUNULElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsb0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQXFCLENBQUMsQ0FBQztnQkFDckQsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2hCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVU7UUFDYixPQUFPLElBQUksaUJBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxQiwwRkFBMEY7WUFDMUYsU0FBUztZQUNULElBQUk7Z0JBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsb0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDaEI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxXQUFXLENBQUMsSUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVU7UUFDYixPQUFPLElBQUksaUJBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxQixJQUFJO2dCQUNGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLG9CQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2hCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDZixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2hCO3FCQUFNO29CQUNMLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2Q7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFXLEVBQUUsUUFBcUM7UUFDdEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFoRkQsNENBZ0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgUGF0aCwgUGF0aEZyYWdtZW50LCBmcmFnbWVudCwgZ2V0U3lzdGVtUGF0aCwgdmlydHVhbEZzIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgU3RhdHMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dEZpbGVTeXN0ZW0gfSBmcm9tICcuL3dlYnBhY2snO1xuXG4vLyBIb3N0IGlzIHVzZWQgaW5zdGVhZCBvZiBSZWFkb25seUhvc3QgZHVlIHRvIG1vc3QgZGVjb3JhdG9ycyBvbmx5IHN1cHBvcnRpbmcgSG9zdHNcbmV4cG9ydCBjbGFzcyBXZWJwYWNrSW5wdXRIb3N0IGltcGxlbWVudHMgdmlydHVhbEZzLkhvc3Q8U3RhdHM+IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgaW5wdXRGaWxlU3lzdGVtOiBJbnB1dEZpbGVTeXN0ZW0pIHsgfVxuXG4gIGdldCBjYXBhYmlsaXRpZXMoKTogdmlydHVhbEZzLkhvc3RDYXBhYmlsaXRpZXMge1xuICAgIHJldHVybiB7IHN5bmNocm9ub3VzOiB0cnVlIH07XG4gIH1cblxuICB3cml0ZShfcGF0aDogUGF0aCwgX2NvbnRlbnQ6IHZpcnR1YWxGcy5GaWxlQnVmZmVyTGlrZSkge1xuICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignTm90IHN1cHBvcnRlZC4nKSk7XG4gIH1cblxuICBkZWxldGUoX3BhdGg6IFBhdGgpIHtcbiAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ05vdCBzdXBwb3J0ZWQuJykpO1xuICB9XG5cbiAgcmVuYW1lKF9mcm9tOiBQYXRoLCBfdG86IFBhdGgpIHtcbiAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ05vdCBzdXBwb3J0ZWQuJykpO1xuICB9XG5cbiAgcmVhZChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTx2aXJ0dWFsRnMuRmlsZUJ1ZmZlcj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgdHJ5K2NhdGNoIHdoZW4gaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0aXZlWC9yeGpzL2lzc3Vlcy8zNzQwIGlzXG4gICAgICAvLyBmaXhlZC5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmlucHV0RmlsZVN5c3RlbS5yZWFkRmlsZVN5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSk7XG4gICAgICAgIG9icy5uZXh0KG5ldyBVaW50OEFycmF5KGRhdGEpLmJ1ZmZlciBhcyBBcnJheUJ1ZmZlcik7XG4gICAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBvYnMuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBsaXN0KHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPFBhdGhGcmFnbWVudFtdPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9icyA9PiB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyB0cnkrY2F0Y2ggd2hlbiBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RpdmVYL3J4anMvaXNzdWVzLzM3NDAgaXNcbiAgICAgIC8vIGZpeGVkLlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSB0aGlzLmlucHV0RmlsZVN5c3RlbS5yZWFkZGlyU3luYyhnZXRTeXN0ZW1QYXRoKHBhdGgpKTtcbiAgICAgICAgb2JzLm5leHQobmFtZXMubWFwKG5hbWUgPT4gZnJhZ21lbnQobmFtZSkpKTtcbiAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgb2JzLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBleGlzdHMocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0YXQocGF0aCkucGlwZShtYXAoc3RhdHMgPT4gc3RhdHMgIT0gbnVsbCkpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0YXQocGF0aCkucGlwZShtYXAoc3RhdHMgPT4gc3RhdHMgIT0gbnVsbCAmJiBzdGF0cy5pc0RpcmVjdG9yeSgpKSk7XG4gIH1cblxuICBpc0ZpbGUocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0YXQocGF0aCkucGlwZShtYXAoc3RhdHMgPT4gc3RhdHMgIT0gbnVsbCAmJiBzdGF0cy5pc0ZpbGUoKSkpO1xuICB9XG5cbiAgc3RhdChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxTdGF0cyB8IG51bGw+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gdGhpcy5pbnB1dEZpbGVTeXN0ZW0uc3RhdFN5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSk7XG4gICAgICAgIG9icy5uZXh0KHN0YXRzKTtcbiAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICAgICAgb2JzLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB3YXRjaChfcGF0aDogUGF0aCwgX29wdGlvbnM/OiB2aXJ0dWFsRnMuSG9zdFdhdGNoT3B0aW9ucyk6IG51bGwge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=