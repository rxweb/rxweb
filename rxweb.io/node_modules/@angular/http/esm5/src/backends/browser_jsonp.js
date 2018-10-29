/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var _nextRequestId = 0;
export var JSONP_HOME = '__ng_jsonp__';
var _jsonpConnections = null;
function _getJsonpConnections() {
    var w = typeof window == 'object' ? window : {};
    if (_jsonpConnections === null) {
        _jsonpConnections = w[JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
// Make sure not to evaluate this in a non-browser environment!
var BrowserJsonp = /** @class */ (function () {
    function BrowserJsonp() {
    }
    // Construct a <script> element with the specified URL
    BrowserJsonp.prototype.build = function (url) {
        var node = document.createElement('script');
        node.src = url;
        return node;
    };
    BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
    BrowserJsonp.prototype.requestCallback = function (id) { return JSONP_HOME + "." + id + ".finished"; };
    BrowserJsonp.prototype.exposeConnection = function (id, connection) {
        var connections = _getJsonpConnections();
        connections[id] = connection;
    };
    BrowserJsonp.prototype.removeConnection = function (id) {
        var connections = _getJsonpConnections();
        connections[id] = null;
    };
    // Attach the <script> element to the DOM
    BrowserJsonp.prototype.send = function (node) { document.body.appendChild((node)); };
    // Remove <script> element from the DOM
    BrowserJsonp.prototype.cleanup = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild((node));
        }
    };
    BrowserJsonp = tslib_1.__decorate([
        Injectable()
    ], BrowserJsonp);
    return BrowserJsonp;
}());
export { BrowserJsonp };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9qc29ucC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2JhY2tlbmRzL2Jyb3dzZXJfanNvbnAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxjQUFjLENBQUM7QUFDekMsSUFBSSxpQkFBaUIsR0FBOEIsSUFBSSxDQUFDO0FBRXhEO0lBQ0UsSUFBTSxDQUFDLEdBQXlCLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEUsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7UUFDOUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUN4QztJQUNELE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQztBQUVELCtEQUErRDtBQUUvRDtJQUFBO0lBK0JBLENBQUM7SUE5QkMsc0RBQXNEO0lBQ3RELDRCQUFLLEdBQUwsVUFBTSxHQUFXO1FBQ2YsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELG9DQUFhLEdBQWIsY0FBMEIsT0FBTyxVQUFRLGNBQWMsRUFBSSxDQUFDLENBQUMsQ0FBQztJQUU5RCxzQ0FBZSxHQUFmLFVBQWdCLEVBQVUsSUFBWSxPQUFVLFVBQVUsU0FBSSxFQUFFLGNBQVcsQ0FBQyxDQUFDLENBQUM7SUFFOUUsdUNBQWdCLEdBQWhCLFVBQWlCLEVBQVUsRUFBRSxVQUFlO1FBQzFDLElBQU0sV0FBVyxHQUFHLG9CQUFvQixFQUFFLENBQUM7UUFDM0MsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLEVBQVU7UUFDekIsSUFBTSxXQUFXLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztRQUMzQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsMkJBQUksR0FBSixVQUFLLElBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVELHVDQUF1QztJQUN2Qyw4QkFBTyxHQUFQLFVBQVEsSUFBUztRQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBOUJVLFlBQVk7UUFEeEIsVUFBVSxFQUFFO09BQ0EsWUFBWSxDQStCeEI7SUFBRCxtQkFBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBfbmV4dFJlcXVlc3RJZCA9IDA7XG5leHBvcnQgY29uc3QgSlNPTlBfSE9NRSA9ICdfX25nX2pzb25wX18nO1xubGV0IF9qc29ucENvbm5lY3Rpb25zOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsID0gbnVsbDtcblxuZnVuY3Rpb24gX2dldEpzb25wQ29ubmVjdGlvbnMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCB3OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgPyB3aW5kb3cgOiB7fTtcbiAgaWYgKF9qc29ucENvbm5lY3Rpb25zID09PSBudWxsKSB7XG4gICAgX2pzb25wQ29ubmVjdGlvbnMgPSB3W0pTT05QX0hPTUVdID0ge307XG4gIH1cbiAgcmV0dXJuIF9qc29ucENvbm5lY3Rpb25zO1xufVxuXG4vLyBNYWtlIHN1cmUgbm90IHRvIGV2YWx1YXRlIHRoaXMgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCFcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VySnNvbnAge1xuICAvLyBDb25zdHJ1Y3QgYSA8c2NyaXB0PiBlbGVtZW50IHdpdGggdGhlIHNwZWNpZmllZCBVUkxcbiAgYnVpbGQodXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBub2RlLnNyYyA9IHVybDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIG5leHRSZXF1ZXN0SUQoKTogc3RyaW5nIHsgcmV0dXJuIGBfX3JlcSR7X25leHRSZXF1ZXN0SWQrK31gOyB9XG5cbiAgcmVxdWVzdENhbGxiYWNrKGlkOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gYCR7SlNPTlBfSE9NRX0uJHtpZH0uZmluaXNoZWRgOyB9XG5cbiAgZXhwb3NlQ29ubmVjdGlvbihpZDogc3RyaW5nLCBjb25uZWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBjb25uZWN0aW9ucyA9IF9nZXRKc29ucENvbm5lY3Rpb25zKCk7XG4gICAgY29ubmVjdGlvbnNbaWRdID0gY29ubmVjdGlvbjtcbiAgfVxuXG4gIHJlbW92ZUNvbm5lY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gX2dldEpzb25wQ29ubmVjdGlvbnMoKTtcbiAgICBjb25uZWN0aW9uc1tpZF0gPSBudWxsO1xuICB9XG5cbiAgLy8gQXR0YWNoIHRoZSA8c2NyaXB0PiBlbGVtZW50IHRvIHRoZSBET01cbiAgc2VuZChub2RlOiBhbnkpIHsgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCg8Tm9kZT4obm9kZSkpOyB9XG5cbiAgLy8gUmVtb3ZlIDxzY3JpcHQ+IGVsZW1lbnQgZnJvbSB0aGUgRE9NXG4gIGNsZWFudXAobm9kZTogYW55KSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKDxOb2RlPihub2RlKSk7XG4gICAgfVxuICB9XG59XG4iXX0=