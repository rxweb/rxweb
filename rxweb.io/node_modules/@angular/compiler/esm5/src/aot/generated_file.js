/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { areAllEquivalent } from '../output/output_ast';
import { TypeScriptEmitter } from '../output/ts_emitter';
var GeneratedFile = /** @class */ (function () {
    function GeneratedFile(srcFileUrl, genFileUrl, sourceOrStmts) {
        this.srcFileUrl = srcFileUrl;
        this.genFileUrl = genFileUrl;
        if (typeof sourceOrStmts === 'string') {
            this.source = sourceOrStmts;
            this.stmts = null;
        }
        else {
            this.source = null;
            this.stmts = sourceOrStmts;
        }
    }
    GeneratedFile.prototype.isEquivalent = function (other) {
        if (this.genFileUrl !== other.genFileUrl) {
            return false;
        }
        if (this.source) {
            return this.source === other.source;
        }
        if (other.stmts == null) {
            return false;
        }
        // Note: the constructor guarantees that if this.source is not filled,
        // then this.stmts is.
        return areAllEquivalent(this.stmts, other.stmts);
    };
    return GeneratedFile;
}());
export { GeneratedFile };
export function toTypeScript(file, preamble) {
    if (preamble === void 0) { preamble = ''; }
    if (!file.stmts) {
        throw new Error("Illegal state: No stmts present on GeneratedFile " + file.genFileUrl);
    }
    return new TypeScriptEmitter().emitStatements(file.genFileUrl, file.stmts, preamble);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkX2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvYW90L2dlbmVyYXRlZF9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBWSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXZEO0lBSUUsdUJBQ1csVUFBa0IsRUFBUyxVQUFrQixFQUFFLGFBQWlDO1FBQWhGLGVBQVUsR0FBVixVQUFVLENBQVE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3RELElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ25CO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsS0FBb0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDeEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0Qsc0VBQXNFO1FBQ3RFLHNCQUFzQjtRQUN0QixPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFPLEVBQUUsS0FBSyxDQUFDLEtBQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUE3QkQsSUE2QkM7O0FBRUQsTUFBTSx1QkFBdUIsSUFBbUIsRUFBRSxRQUFxQjtJQUFyQix5QkFBQSxFQUFBLGFBQXFCO0lBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBb0QsSUFBSSxDQUFDLFVBQVksQ0FBQyxDQUFDO0tBQ3hGO0lBQ0QsT0FBTyxJQUFJLGlCQUFpQixFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN2RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N0YXRlbWVudCwgYXJlQWxsRXF1aXZhbGVudH0gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtUeXBlU2NyaXB0RW1pdHRlcn0gZnJvbSAnLi4vb3V0cHV0L3RzX2VtaXR0ZXInO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVkRmlsZSB7XG4gIHB1YmxpYyBzb3VyY2U6IHN0cmluZ3xudWxsO1xuICBwdWJsaWMgc3RtdHM6IFN0YXRlbWVudFtdfG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgc3JjRmlsZVVybDogc3RyaW5nLCBwdWJsaWMgZ2VuRmlsZVVybDogc3RyaW5nLCBzb3VyY2VPclN0bXRzOiBzdHJpbmd8U3RhdGVtZW50W10pIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZU9yU3RtdHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZU9yU3RtdHM7XG4gICAgICB0aGlzLnN0bXRzID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICAgICAgdGhpcy5zdG10cyA9IHNvdXJjZU9yU3RtdHM7XG4gICAgfVxuICB9XG5cbiAgaXNFcXVpdmFsZW50KG90aGVyOiBHZW5lcmF0ZWRGaWxlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZ2VuRmlsZVVybCAhPT0gb3RoZXIuZ2VuRmlsZVVybCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZSA9PT0gb3RoZXIuc291cmNlO1xuICAgIH1cbiAgICBpZiAob3RoZXIuc3RtdHMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBOb3RlOiB0aGUgY29uc3RydWN0b3IgZ3VhcmFudGVlcyB0aGF0IGlmIHRoaXMuc291cmNlIGlzIG5vdCBmaWxsZWQsXG4gICAgLy8gdGhlbiB0aGlzLnN0bXRzIGlzLlxuICAgIHJldHVybiBhcmVBbGxFcXVpdmFsZW50KHRoaXMuc3RtdHMgISwgb3RoZXIuc3RtdHMgISk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvVHlwZVNjcmlwdChmaWxlOiBHZW5lcmF0ZWRGaWxlLCBwcmVhbWJsZTogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICBpZiAoIWZpbGUuc3RtdHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYElsbGVnYWwgc3RhdGU6IE5vIHN0bXRzIHByZXNlbnQgb24gR2VuZXJhdGVkRmlsZSAke2ZpbGUuZ2VuRmlsZVVybH1gKTtcbiAgfVxuICByZXR1cm4gbmV3IFR5cGVTY3JpcHRFbWl0dGVyKCkuZW1pdFN0YXRlbWVudHMoZmlsZS5nZW5GaWxlVXJsLCBmaWxlLnN0bXRzLCBwcmVhbWJsZSk7XG59XG4iXX0=