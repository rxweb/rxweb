/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/output/value_util", ["require", "exports", "@angular/compiler/src/util", "@angular/compiler/src/output/output_ast"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require("@angular/compiler/src/util");
    var o = require("@angular/compiler/src/output/output_ast");
    exports.QUOTED_KEYS = '$quoted$';
    function convertValueToOutputAst(ctx, value, type) {
        if (type === void 0) { type = null; }
        return util_1.visitValue(value, new _ValueOutputAstTransformer(ctx), type);
    }
    exports.convertValueToOutputAst = convertValueToOutputAst;
    var _ValueOutputAstTransformer = /** @class */ (function () {
        function _ValueOutputAstTransformer(ctx) {
            this.ctx = ctx;
        }
        _ValueOutputAstTransformer.prototype.visitArray = function (arr, type) {
            var _this = this;
            return o.literalArr(arr.map(function (value) { return util_1.visitValue(value, _this, null); }), type);
        };
        _ValueOutputAstTransformer.prototype.visitStringMap = function (map, type) {
            var _this = this;
            var entries = [];
            var quotedSet = new Set(map && map[exports.QUOTED_KEYS]);
            Object.keys(map).forEach(function (key) {
                entries.push(new o.LiteralMapEntry(key, util_1.visitValue(map[key], _this, null), quotedSet.has(key)));
            });
            return new o.LiteralMapExpr(entries, type);
        };
        _ValueOutputAstTransformer.prototype.visitPrimitive = function (value, type) { return o.literal(value, type); };
        _ValueOutputAstTransformer.prototype.visitOther = function (value, type) {
            if (value instanceof o.Expression) {
                return value;
            }
            else {
                return this.ctx.importExpr(value);
            }
        };
        return _ValueOutputAstTransformer;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWVfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9vdXRwdXQvdmFsdWVfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUdILG1EQUFvRTtJQUVwRSwyREFBa0M7SUFFckIsUUFBQSxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBRXRDLGlDQUNJLEdBQWtCLEVBQUUsS0FBVSxFQUFFLElBQTBCO1FBQTFCLHFCQUFBLEVBQUEsV0FBMEI7UUFDNUQsT0FBTyxpQkFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFIRCwwREFHQztJQUVEO1FBQ0Usb0NBQW9CLEdBQWtCO1lBQWxCLFFBQUcsR0FBSCxHQUFHLENBQWU7UUFBRyxDQUFDO1FBQzFDLCtDQUFVLEdBQVYsVUFBVyxHQUFVLEVBQUUsSUFBWTtZQUFuQyxpQkFFQztZQURDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsaUJBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSSxFQUFFLElBQUksQ0FBQyxFQUE3QixDQUE2QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVELG1EQUFjLEdBQWQsVUFBZSxHQUF5QixFQUFFLElBQWU7WUFBekQsaUJBUUM7WUFQQyxJQUFNLE9BQU8sR0FBd0IsRUFBRSxDQUFDO1lBQ3hDLElBQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsbUJBQVcsQ0FBQyxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUMxQixPQUFPLENBQUMsSUFBSSxDQUNSLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsaUJBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSSxFQUFFLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCxtREFBYyxHQUFkLFVBQWUsS0FBVSxFQUFFLElBQVksSUFBa0IsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekYsK0NBQVUsR0FBVixVQUFXLEtBQVUsRUFBRSxJQUFZO1lBQ2pDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUM7UUFDSCxpQ0FBQztJQUFELENBQUMsQUF6QkQsSUF5QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuaW1wb3J0IHtPdXRwdXRDb250ZXh0LCBWYWx1ZVRyYW5zZm9ybWVyLCB2aXNpdFZhbHVlfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dF9hc3QnO1xuXG5leHBvcnQgY29uc3QgUVVPVEVEX0tFWVMgPSAnJHF1b3RlZCQnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFZhbHVlVG9PdXRwdXRBc3QoXG4gICAgY3R4OiBPdXRwdXRDb250ZXh0LCB2YWx1ZTogYW55LCB0eXBlOiBvLlR5cGUgfCBudWxsID0gbnVsbCk6IG8uRXhwcmVzc2lvbiB7XG4gIHJldHVybiB2aXNpdFZhbHVlKHZhbHVlLCBuZXcgX1ZhbHVlT3V0cHV0QXN0VHJhbnNmb3JtZXIoY3R4KSwgdHlwZSk7XG59XG5cbmNsYXNzIF9WYWx1ZU91dHB1dEFzdFRyYW5zZm9ybWVyIGltcGxlbWVudHMgVmFsdWVUcmFuc2Zvcm1lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY3R4OiBPdXRwdXRDb250ZXh0KSB7fVxuICB2aXNpdEFycmF5KGFycjogYW55W10sIHR5cGU6IG8uVHlwZSk6IG8uRXhwcmVzc2lvbiB7XG4gICAgcmV0dXJuIG8ubGl0ZXJhbEFycihhcnIubWFwKHZhbHVlID0+IHZpc2l0VmFsdWUodmFsdWUsIHRoaXMsIG51bGwpKSwgdHlwZSk7XG4gIH1cblxuICB2aXNpdFN0cmluZ01hcChtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9LCB0eXBlOiBvLk1hcFR5cGUpOiBvLkV4cHJlc3Npb24ge1xuICAgIGNvbnN0IGVudHJpZXM6IG8uTGl0ZXJhbE1hcEVudHJ5W10gPSBbXTtcbiAgICBjb25zdCBxdW90ZWRTZXQgPSBuZXcgU2V0PHN0cmluZz4obWFwICYmIG1hcFtRVU9URURfS0VZU10pO1xuICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZW50cmllcy5wdXNoKFxuICAgICAgICAgIG5ldyBvLkxpdGVyYWxNYXBFbnRyeShrZXksIHZpc2l0VmFsdWUobWFwW2tleV0sIHRoaXMsIG51bGwpLCBxdW90ZWRTZXQuaGFzKGtleSkpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IG8uTGl0ZXJhbE1hcEV4cHIoZW50cmllcywgdHlwZSk7XG4gIH1cblxuICB2aXNpdFByaW1pdGl2ZSh2YWx1ZTogYW55LCB0eXBlOiBvLlR5cGUpOiBvLkV4cHJlc3Npb24geyByZXR1cm4gby5saXRlcmFsKHZhbHVlLCB0eXBlKTsgfVxuXG4gIHZpc2l0T3RoZXIodmFsdWU6IGFueSwgdHlwZTogby5UeXBlKTogby5FeHByZXNzaW9uIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBvLkV4cHJlc3Npb24pIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY3R4LmltcG9ydEV4cHIodmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIl19