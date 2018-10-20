"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const http = require("http");
const https = require("https");
const Url = require("url");
function request(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const u = Url.parse(url);
        const options = {
            hostname: u.hostname,
            protocol: u.protocol,
            host: u.host,
            port: u.port,
            path: u.path,
            headers: Object.assign({ 'Accept': 'text/html' }, headers),
        };
        function _callback(res) {
            if (!res.statusCode || res.statusCode >= 400) {
                // Consume the rest of the data to free memory.
                res.resume();
                reject(new Error(`Requesting "${url}" returned status code ${res.statusCode}.`));
            }
            else {
                res.setEncoding('utf8');
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(data);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }
        }
        if (u.protocol == 'https:') {
            options.agent = new https.Agent({ rejectUnauthorized: false });
            https.get(options, _callback);
        }
        else if (u.protocol == 'http:') {
            http.get(options, _callback);
        }
        else {
            throw new Error(`Unknown protocol: ${JSON.stringify(u.protocol)}.`);
        }
    });
}
exports.request = request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYXJjaGl0ZWN0L3Rlc3RpbmcvcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFDL0IsMkJBQTJCO0FBRTNCLGlCQUF3QixHQUFXLEVBQUUsT0FBTyxHQUFHLEVBQUU7SUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sT0FBTyxHQUF3QjtZQUNuQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7WUFDcEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO1lBQ3BCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNaLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNaLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNaLE9BQU8sa0JBQUksUUFBUSxFQUFFLFdBQVcsSUFBSyxPQUFPLENBQUU7U0FDL0MsQ0FBQztRQUVGLG1CQUFtQixHQUF5QjtZQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtnQkFDNUMsK0NBQStDO2dCQUMvQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsR0FBRywwQkFBMEIsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsRjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUU7b0JBQ3JCLElBQUksSUFBSSxLQUFLLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2dCQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDakIsSUFBSTt3QkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2Y7b0JBQUMsT0FBTyxHQUFHLEVBQUU7d0JBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNiO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO1FBRUQsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtZQUMxQixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDL0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDL0I7YUFBTSxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUExQ0QsMEJBMENDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCAqIGFzIFVybCBmcm9tICd1cmwnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdCh1cmw6IHN0cmluZywgaGVhZGVycyA9IHt9KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB1ID0gVXJsLnBhcnNlKHVybCk7XG4gICAgY29uc3Qgb3B0aW9uczogaHR0cC5SZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGhvc3RuYW1lOiB1Lmhvc3RuYW1lLFxuICAgICAgcHJvdG9jb2w6IHUucHJvdG9jb2wsXG4gICAgICBob3N0OiB1Lmhvc3QsXG4gICAgICBwb3J0OiB1LnBvcnQsXG4gICAgICBwYXRoOiB1LnBhdGgsXG4gICAgICBoZWFkZXJzOiB7ICdBY2NlcHQnOiAndGV4dC9odG1sJywgLi4uaGVhZGVycyB9LFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfY2FsbGJhY2socmVzOiBodHRwLkluY29taW5nTWVzc2FnZSkge1xuICAgICAgaWYgKCFyZXMuc3RhdHVzQ29kZSB8fCByZXMuc3RhdHVzQ29kZSA+PSA0MDApIHtcbiAgICAgICAgLy8gQ29uc3VtZSB0aGUgcmVzdCBvZiB0aGUgZGF0YSB0byBmcmVlIG1lbW9yeS5cbiAgICAgICAgcmVzLnJlc3VtZSgpO1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBSZXF1ZXN0aW5nIFwiJHt1cmx9XCIgcmV0dXJuZWQgc3RhdHVzIGNvZGUgJHtyZXMuc3RhdHVzQ29kZX0uYCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnNldEVuY29kaW5nKCd1dGY4Jyk7XG4gICAgICAgIGxldCBkYXRhID0gJyc7XG4gICAgICAgIHJlcy5vbignZGF0YScsIGNodW5rID0+IHtcbiAgICAgICAgICBkYXRhICs9IGNodW5rO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1LnByb3RvY29sID09ICdodHRwczonKSB7XG4gICAgICBvcHRpb25zLmFnZW50ID0gbmV3IGh0dHBzLkFnZW50KHsgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSB9KTtcbiAgICAgIGh0dHBzLmdldChvcHRpb25zLCBfY2FsbGJhY2spO1xuICAgIH0gZWxzZSBpZiAodS5wcm90b2NvbCA9PSAnaHR0cDonKSB7XG4gICAgICBodHRwLmdldChvcHRpb25zLCBfY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcHJvdG9jb2w6ICR7SlNPTi5zdHJpbmdpZnkodS5wcm90b2NvbCl9LmApO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=